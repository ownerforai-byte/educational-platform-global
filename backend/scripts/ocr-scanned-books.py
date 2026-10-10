#!/usr/bin/env python3
"""
OCR SCANNED BOOKS -> page-delimited text (the input `ingest-books.ts` already knows).

WHY THIS EXISTS
---------------
`scripts/ingest-books.ts` reads a book's text layer with `pdftotext`, then
`src/ai/book-ingest.ts` cleans it, finds chapters, chunks them, and writes
`backend/kb/books/**` records. That chain is the platform's whole "a local book
becomes a source" story.

It cannot read a *scanned* book. `book-ingest.ts` says so itself: pages with no
text layer are "DETECTED and reported rather than silently ingested as empty
records — see `scanReport`". The Asmita "Old is Gold" question banks are exactly
that: 4000x3000 JPEG scans at ~342 DPI with a ~20-character watermark as the
only extractable text. `pdftotext` returns nothing for them.

So this script produces what `pdftotext` would have: one block of text per PDF
page, pages separated by a form feed (`\f`, exactly `splitPdfPages`' contract).
Everything downstream — de-hyphenation, running-head removal, chapter detection,
chunking, record writing, sink classification — is then the EXISTING code,
unchanged and already tested.

ENGINE
------
Windows.Media.Ocr via the `winocr` package: the OCR engine already installed in
the OS, no model download, ~1 s per page. Measured against the alternative
(`rapidocr-onnxruntime`, PP-OCRv4) on this very scan:

  * speed        1.0 s/page   vs  25 s/page
  * word spacing "inclination of the string"  vs  "inclinationofthe string"

Spacing is the whole ballgame for this use: the tutor is instructed to paste
verified prose and polish its grammar, so it needs WORDS. An engine that runs
words together would have to reconstruct boundaries before it could teach.
RapidOCR is kept only as a fallback engine (`--engine rapidocr`) for a machine
without the Windows OCR language pack.

READING ORDER
-------------
Each PDF page here is a two-page SPREAD (~11.7 x 8.3 in) of a two-column book,
so the raw line order interleaves four text columns and a question's solution
lands next to a different question's statement. `xy_cut` therefore reorders the
recognised lines by real geometry: recursively split on the widest vertical
whitespace gutter (a column boundary), else fall back to top-to-bottom. This is
the classic XY-cut, and it is what makes per-page text coherent enough to split
into question/solution pairs later.

RESUMABLE
---------
One text file per page under `<out>/<slug>.pages/NNNN.txt`. Re-running skips
pages already on disk, so a crash, a reboot or a kill costs one page, not three
hours. The combined `<out>/<slug>.ocr.txt` is written at the end (and can be
rebuilt from the page files with `--combine-only`, which needs no OCR engine).

USAGE
-----
  python scripts/ocr-scanned-books.py --pdf "C:\\x\\Physics OIG.pdf" --subject physics --class 11
  python scripts/ocr-scanned-books.py --pdf ... --pages 10-20     # a sample
  python scripts/ocr-scanned-books.py --combine-only --pdf ...    # rebuild .ocr.txt
  python scripts/ocr-scanned-books.py --check --pdf ...           # report only

Output lands in `backend/kb-ocr/<slug>/` by default (`--out` to change). That
folder is scratch: the committed artifact is the JSON the TS ingest step writes.
"""
from __future__ import annotations

import argparse
import asyncio
import io
import os
import re
import sys
import time

# ── args ────────────────────────────────────────────────────────────────────


def parse_pages(spec: str | None, total: int) -> list[int]:
    """`"3-9,40,77-"` -> ordered 0-based page indexes. `None` -> every page."""
    if not spec:
        return list(range(total))
    picked: list[int] = []
    for part in spec.split(","):
        part = part.strip()
        if not part:
            continue
        m = re.fullmatch(r"(\d+)?\s*-\s*(\d+)?", part)
        if m:
            start = int(m.group(1)) if m.group(1) else 1
            end = int(m.group(2)) if m.group(2) else total
            picked.extend(range(start - 1, min(end, total)))
        elif part.isdigit():
            picked.append(int(part) - 1)
        else:
            raise SystemExit(f"--pages: cannot parse {part!r}")
    return sorted({p for p in picked if 0 <= p < total})


def slugify(value: str, max_len: int = 60) -> str:
    s = re.sub(r"[^A-Za-z0-9]+", "-", value).strip("-").lower()
    return (s or "book")[:max_len].rstrip("-")


# ── reading order ───────────────────────────────────────────────────────────

Line = tuple[float, float, float, str]  # x0, y0, x1, text


def widest_gutter(
    lines: list[Line], lo: int, hi: int, min_width: int, cover_tol: int
) -> tuple[int, int] | None:
    """
    The widest x-range in `[x0, x1)` that almost no LINE covers — a column gutter.

    This is a coverage-profile XY-cut. The two obvious alternatives both fail on
    these scans, measured:

    * an exact zero-coverage test (the textbook XY-cut) needs a whitespace band no
      line crosses. One wide heading or figure spanning the gutter destroys it,
      and on the page that needed the split most (Physics p12) it found nothing
      and left the four columns interleaved line-by-line.
    * the IMAGE ink profile finds the gutter even when a line crosses it, but its
      width test cannot tell a real gutter (13 px) from a wide inter-word space
      (12 px) at 300 DPI, so it split pages on word spaces (measured: Physics p20
      — a 176 px gutter at 44.7% existed and was still missed by a width
      threshold tuned for a different page).

    Coverage answers both: a gutter is where the number of lines spanning x is
    near zero (a couple of spanning headings are tolerated by `cover_tol`), while
    inside a justified column almost every x is covered by every line, so a word
    space never looks quiet.
    """
    if hi - lo < min_width * 3:
        return None
    span = hi - lo
    cover = [0] * span
    for l in lines:
        a = max(0, int(l[0]) - lo)
        b = min(span, int(l[2]) - lo)
        for i in range(a, b):
            cover[i] += 1

    # Only the requested window may produce the split, so the centre-band search
    # at depth 0 cannot wander out to an outer margin.
    best: tuple[int, int] | None = None
    run = 0
    for i, c in enumerate(cover):
        if c <= cover_tol:
            run += 1
            continue
        if run >= min_width and (best is None or run > best[1] - best[0]):
            best = (i - run, i)
        run = 0
    if run >= min_width and (best is None or run > best[1] - best[0]):
        best = (span - run, span)
    if not best:
        return None
    return best[0] + lo, best[1] + lo


def reading_order(lines: list[Line], x0: int = 0, x1: int | None = None, depth: int = 0) -> list[Line]:
    """
    Recognised lines -> the order a reader walks them.

    Every content page of these books is a two-page SPREAD of a two-column book,
    so the raw engine order interleaves up to FOUR text columns and a solution
    lands beside a different question's statement. The gutter is found from line
    coverage, the LINE SET is split at it (a line is assigned by its centre, so a
    glyph is never cut in half), and each side is recursed into — which is what
    finds the four columns on a spread rather than only the two halves.

    A page with no real gutter (a chapter opener laid out across the full spread)
    falls back to top-to-bottom, which is already correct for it.
    """
    falls_back = sorted(lines, key=lambda l: (l[1], l[0]))
    if len(lines) <= 3 or depth > 4:
        return falls_back
    if x1 is None:
        x1 = int(max(l[2] for l in lines)) + 1
        x0 = 0
    width = x1 - x0
    if width < 240:
        return falls_back

    # At depth 0 the spread's own gutter is looked for in the middle, so a wide
    # outer margin or a paragraph indent is never mistaken for it. Deeper, the
    # whole region is searched for a column gutter.
    if depth == 0:
        lo, hi = x0 + int(width * 0.34), x0 + int(width * 0.66)
    else:
        lo, hi = x0, x1

    # Tolerate a couple of spanning lines at any x, scaled to the region, and
    # never more than a small share of it.
    cover_tol = max(1, min(3, int(len(lines) * 0.03)))
    run = widest_gutter(lines, lo, hi, max(8, width // 200), cover_tol)
    if run is None:
        return falls_back

    split = (run[0] + run[1]) / 2
    left = [l for l in lines if (l[0] + l[2]) / 2 < split]
    right = [l for l in lines if (l[0] + l[2]) / 2 >= split]
    if not left or not right:
        return falls_back

    return reading_order(left, x0, int(split), depth + 1) + reading_order(
        right, int(split), x1, depth + 1
    )


# ── engines ─────────────────────────────────────────────────────────────────


class WindowsEngine:
    """
    Windows.Media.Ocr. `read()` returns `(x0, y0, x1, text)` per line, with the
    box folded up from the line's words — an `OcrLine` itself carries no rect.
    """

    name = "winocr"

    def __init__(self, lang: str = "en"):
        import winocr  # imported late so --combine-only works without it

        self._winocr = winocr
        self.lang = lang

    async def read(self, image):
        res = await self._winocr.recognize_pil(image, self.lang)
        lines: list[tuple[float, float, float, str]] = []
        for ln in res.lines:
            text = (ln.text or "").strip()
            if not text:
                continue
            x0 = y0 = float("inf")
            x1 = 0.0
            for w in ln.words:
                r = w.bounding_rect
                x0 = min(x0, float(r.x))
                y0 = min(y0, float(r.y))
                x1 = max(x1, float(r.x) + float(r.width))
            if x0 == float("inf"):
                continue
            lines.append((x0, y0, x1, text))
        return lines


class RapidEngine:
    """PP-OCRv4 fallback for machines without the Windows OCR language pack."""

    name = "rapidocr"

    def __init__(self, **_):
        from rapidocr_onnxruntime import RapidOCR

        self._ocr = RapidOCR(params={"Global.use_cls": False, "Rec.rec_batch_num": 16})

    async def read(self, image):
        import numpy as np

        res, _ = self._ocr(np.asarray(image))
        out: list[tuple[float, float, float, str]] = []
        for box, text, _score in res or []:
            xs = [float(p[0]) for p in box]
            ys = [float(p[1]) for p in box]
            out.append((min(xs), min(ys), max(xs), str(text).strip()))
        return out


# ── page -> text ────────────────────────────────────────────────────────────


async def page_text(doc, index: int, engine, dpi: int) -> str:
    """One PDF page -> reading-ordered text."""
    from PIL import Image, ImageOps

    pix = doc[index].get_pixmap(dpi=dpi)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    # Grayscale first: the engine is colour-agnostic and this is ~30% faster.
    if img.mode != "L":
        img = ImageOps.grayscale(img)

    lines = await engine.read(img)
    if not lines:
        return ""

    # Only a landscape page is a spread worth splitting — a portrait cover or a
    # single-page insert is left in the engine's own order.
    landscape = img.size[0] > img.size[1] * 1.15
    ordered = reading_order(lines, 0, img.size[0]) if landscape else sorted(lines, key=lambda l: (l[1], l[0]))

    # One line per output line: line breaks are left as the reader sees them.
    # `cleanPage()` downstream owns paragraph repair (de-hyphenation, re-joining
    # wrapped lines), and guessing at it twice is what corrupts it.
    return "\n".join(text for _x0, _y0, _x1, text in ordered)


def combine(page_dir: str, slug: str, out_path: str, total: int) -> tuple[int, int]:
    """Rebuild the form-feed-joined text from the per-page files."""
    parts: list[str] = []
    filled = 0
    for i in range(total):
        p = os.path.join(page_dir, f"{i:04d}.txt")
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as fh:
                body = fh.read()
            if body.strip():
                filled += 1
            parts.append(body)
        else:
            parts.append("")
    text = "\f".join(parts)
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(text)
    return filled, len(text)


async def main() -> int:
    ap = argparse.ArgumentParser(description="OCR a scanned book PDF to page-delimited text.")
    ap.add_argument("--pdf", required=True, help="path to the scanned PDF")
    ap.add_argument("--subject", default="", help="subject slug, used only for the slug/label")
    ap.add_argument("--class", dest="class_level", default="", help="class level, label only")
    ap.add_argument("--out", default="kb-ocr", help="output root (default: backend/kb-ocr)")
    ap.add_argument("--dpi", type=int, default=300, help="render DPI (default 300)")
    ap.add_argument("--lang", default="en", help="OCR language (default en)")
    ap.add_argument("--engine", default="winocr", choices=["winocr", "rapidocr"])
    ap.add_argument("--pages", default=None, help="page spec, e.g. 1-20 or 3,7,9-")
    ap.add_argument("--limit", type=int, default=0, help="stop after N pages (0 = all)")
    ap.add_argument("--combine-only", action="store_true", help="rebuild .ocr.txt, no OCR")
    ap.add_argument("--check", action="store_true", help="report progress and exit")
    args = ap.parse_args()

    import fitz  # PyMuPDF

    if not os.path.exists(args.pdf):
        raise SystemExit(f"PDF not found: {args.pdf}")

    stem = os.path.splitext(os.path.basename(args.pdf))[0]
    slug = slugify(f"{args.subject}-{stem}" if args.subject else stem)
    root = os.path.abspath(args.out)
    page_dir = os.path.join(root, slug, f"{slug}.pages")
    out_txt = os.path.join(root, slug, f"{slug}.ocr.txt")
    os.makedirs(page_dir, exist_ok=True)

    doc = fitz.open(args.pdf)
    total = doc.page_count
    wanted = parse_pages(args.pages, total)
    print(f"{os.path.basename(args.pdf)}: {total} pages, {len(wanted)} selected, dpi {args.dpi}")
    print(f"  page dir : {page_dir}")
    print(f"  combined : {out_txt}")

    if args.combine_only:
        filled, chars = combine(page_dir, slug, out_txt, total)
        print(f"combine-only: {filled}/{total} pages with text, {chars} chars -> {out_txt}")
        doc.close()
        return 0

    done = sum(
        1
        for i in wanted
        if os.path.exists(os.path.join(page_dir, f"{i:04d}.txt"))
    )
    if args.check:
        print(f"progress: {done}/{len(wanted)} pages already OCR'd")
        doc.close()
        return 0

    engine = WindowsEngine(args.lang) if args.engine == "winocr" else RapidEngine()
    print(f"  engine   : {engine.name}")

    todo = [i for i in wanted if not os.path.exists(os.path.join(page_dir, f"{i:04d}.txt"))]
    if args.limit:
        todo = todo[: args.limit]
    print(f"  to do    : {len(todo)} page(s)\n")

    started = time.time()
    wrote = 0
    for n, i in enumerate(todo, 1):
        t0 = time.time()
        try:
            text = await page_text(doc, i, engine, args.dpi)
        except Exception as exc:  # one bad page must not kill a 900-page run
            text = ""
            print(f"  ! page {i + 1}: {type(exc).__name__}: {exc}", file=sys.stderr)
        with open(os.path.join(page_dir, f"{i:04d}.txt"), "w", encoding="utf-8") as fh:
            fh.write(text)
        wrote += 1
        if n % 5 == 0 or n == len(todo):
            rate = (time.time() - started) / max(1, n)
            left = (len(todo) - n) * rate
            print(
                f"  [{n}/{len(todo)}] page {i + 1}: {len(text)} chars "
                f"({time.time() - t0:.1f}s; ~{left / 60:.0f} min left)",
                flush=True,
            )

    doc.close()
    filled, chars = combine(page_dir, slug, out_txt, total)
    print(f"\ndone: {wrote} page(s) OCR'd this run, {filled}/{total} with text, {chars} chars")
    print(f"  -> {out_txt}")
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
