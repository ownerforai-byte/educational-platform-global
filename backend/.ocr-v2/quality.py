#!/usr/bin/env python
"""Compare OCR quality of two combined .ocr.txt files.

Counts the defect classes the rail emitter must reject, normalised per 1000
sentences, so DPI/engine variants can be ranked on the same footing.
"""
import re
import sys

MASH = re.compile(r"[A-Za-z][0-9][A-Za-z]|[0-9][A-Za-z][0-9]|\b[A-Za-z]+[0-9][A-Za-z]*\b")
BRACKET_IN_WORD = re.compile(r"[A-Za-z][([][A-Za-z]|[A-Za-z][)\]][A-Za-z]")
DOUBLE_SPACE = re.compile(r"  +")
LOWER_AFTER_STOP = re.compile(r"\.\s*[a-z]")
FUSED_QUESTION = re.compile(r"\b\d{2,3}\s+(?:Old|Q\.)\b")
REPLACEMENT = re.compile("\uFFFD")
# A run of >=4 consonant-heavy letters with no vowel is usually a glyph fusion.
NONWORD = re.compile(r"\b[bcdfghjklmnpqrstvwxz]{5,}\b", re.I)

SENT = re.compile(r"[.!?]+\s|[\n\f]")

CLASSES = {
    "letter/digit mash": MASH,
    "bracket in word": BRACKET_IN_WORD,
    "double space": DOUBLE_SPACE,
    "lowercase after stop": LOWER_AFTER_STOP,
    "page marker fused": FUSED_QUESTION,
    "replacement char": REPLACEMENT,
    "consonant run": NONWORD,
}


def words(text):
    return re.findall(r"\S+", text)


def report(path, label):
    with open(path, encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    sents = max(1, len(SENT.findall(text)))
    wc = len(words(text))
    out = {"label": label, "chars": len(text), "words": wc, "sentences": sents}
    hits = {}
    for name, rx in CLASSES.items():
        hits[name] = len(rx.findall(text))
    out["hits"] = hits
    out["total_hits"] = sum(hits.values())
    out["per_1k_sent"] = round(out["total_hits"] / sents * 1000, 1)
    return out


def main():
    rows = [report(p, p.split("/")[-1][:40]) for p in sys.argv[1:]]
    names = list(CLASSES)
    hdr = f"{'file':<42}{'words':>8}{'sents':>8}" + "".join(f"{n[:11]:>13}" for n in names) + f"{'TOT/1k':>9}"
    print(hdr)
    print("-" * len(hdr))
    for r in rows:
        line = f"{r['label']:<42}{r['words']:>8}{r['sentences']:>8}"
        line += "".join(f"{r['hits'][n]:>13}" for n in names)
        line += f"{r['per_1k_sent']:>9}"
        print(line)
    if len(rows) == 2:
        a, b = rows
        print(f"\ndelta (B - A) total hits: {b['total_hits'] - a['total_hits']:+}")
        print(f"per-1k-sentence: A={a['per_1k_sent']}  B={b['per_1k_sent']}")


if __name__ == "__main__":
    main()
