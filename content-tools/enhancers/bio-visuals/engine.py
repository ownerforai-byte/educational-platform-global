"""Reusable engine: insert tables + SVG diagrams into biology topic notes.

Pack format (a Python file in this folder defining TOPICS):

TOPICS = [
    {
        "file": "class-12/biology/heredity-and-evolution/03-linkage-and-crossing-over.json",
        "blocks": [
            {"after": "# Linkage and crossing over", "md": "...intro paragraph..."},
            {"after": "## 3. Classified tables", "table": ("Title", ["H1","H2"], [["a","b"], ...])},
            {"after": "## 4. Diagrams and figures", "svg": ("Caption", "<svg viewBox=...>...</svg>")},
        ],
    },
]

Rules:
  - "after" is a unique substring of one existing notes entry; the new block is
    inserted immediately after it (so blocks land in the notes' own concept
    order = chronological order of concepts).
  - Idempotent: each block carries a signature (table title / svg caption /
    first 40 chars of md); if it is already present anywhere in the file the
    block is skipped.
  - Junk generator lines (Scope./Tested./Fact./one-line definition moulds) are
    dropped from the notes at the source so pages render clean.
  - If the file also has enrichedContent.notes, the same insertions are applied
    there (anchor must exist there too, else loud failure).
  - Loud failure on missing anchor; nothing is half-written (all-or-nothing per
    file, file rewritten only after every block resolved).

Usage:
  python engine.py --pack class-12-heredity           # apply
  python engine.py --pack class-12-heredity --check   # dry run
"""
import importlib
import json
import os
import sys

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                    "..", "..", "..", "content", "notes", "concepts")

# Generator-mould junk dropped from notes at the source (build strips most of
# these too; dropping here keeps the authored file == shipped page).
JUNK_PREFIXES = (
    "**Scope.**",
    "**Tested.**",
    "**Fact.**",
    "Covers only:",
    "Out of scope here:",
)
JUNK_CONTAINS = ("one-line definition + one-line exam use",)


def md_table(title, header, rows):
    lines = ["**%s**" % title, ""]
    lines.append("| " + " | ".join(header) + " |")
    lines.append("|" + "|".join(["---"] * len(header)) + "|")
    for r in rows:
        lines.append("| " + " | ".join(r) + " |")
    return "\n".join(lines)


def md_svg(caption, body):
    body = body.strip()
    if not body.startswith("<svg"):
        raise ValueError("svg body must start with <svg: %r" % caption)
    return "```svg %s\n%s\n```" % (caption, body)


def signature(block):
    if "table" in block:
        return block["table"][0]
    if "svg" in block:
        return block["svg"][0]
    return block["md"][:40]


def render(block):
    if "table" in block:
        t = block["table"]
        return md_table(t[0], t[1], t[2])
    if "svg" in block:
        c = block["svg"]
        return md_svg(c[0], c[1])
    return block["md"]


def is_junk(entry):
    s = entry.strip()
    return (s.startswith(JUNK_PREFIXES)
            or any(c in s for c in JUNK_CONTAINS))


def apply_to(notes, blocks, label, dry):
    """Insert blocks into one notes list. Returns list of change descriptions."""
    changes = []
    # Reverse order: inserting at a later anchor first never shifts an earlier
    # anchor's index, and several blocks after the SAME anchor keep their
    # authored order (each lands directly under the previous one).
    for block in reversed(blocks):
        sig = signature(block)
        if any(sig in n for n in notes):
            changes.append("  SKIP (present) %s :: %s" % (label, sig))
            continue
        anchor = block["after"]
        idx = next((i for i, n in enumerate(notes) if anchor in n), None)
        if idx is None:
            raise SystemExit("ANCHOR NOT FOUND in %s: %r" % (label, anchor))
        notes.insert(idx + 1, render(block))
        changes.append("  insert @%d %s :: %s" % (idx + 1, label, sig))
    changes.reverse()
    return changes


def expand_blocks(blocks):
    """A block may carry several content keys (md, table, svg). The engine
    renders one type per block, so expand multi-key blocks into one block per
    key, preserving authored order (md, table, svg)."""
    out = []
    for b in blocks:
        keys = [k for k in ("md", "table", "svg") if k in b]
        if len(keys) <= 1:
            out.append(b)
            continue
        for k in keys:
            nb = {"after": b["after"], k: b[k]}
            out.append(nb)
    return out


def run_pack(pack_name, dry):
    mod = importlib.import_module("packs." + pack_name)
    total = 0
    for topic in mod.TOPICS:
        topic = dict(topic)
        topic["blocks"] = expand_blocks(topic.get("blocks", []))
        rel = topic["file"]
        path = os.path.normpath(os.path.join(BASE, rel))
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        notes = d.get("notes")
        if notes is None:
            raise SystemExit("NO notes array: " + rel)
        before = len(notes)
        # drop generator junk at the source
        cleaned = [n for n in notes if not is_junk(n)]
        dropped = before - len(cleaned)
        d["notes"] = cleaned
        changes = []
        if dropped:
            changes.append("  dropped %d junk line(s) %s" % (dropped, rel))
        changes += apply_to(d["notes"], topic["blocks"], rel, dry)
        enriched = d.get("enrichedContent")
        if isinstance(enriched, dict) and isinstance(enriched.get("notes"), list):
            enotes = enriched["notes"]
            if any(is_junk(n) for n in enotes):
                enriched["notes"] = [n for n in enotes if not is_junk(n)]
            try:
                changes += apply_to(enriched["notes"], topic["blocks"],
                                    rel + " [enriched]", dry)
            except SystemExit:
                changes.append("  NOTE enriched anchor missing (skipped sync) " + rel)
        # schema guards
        if len(d["notes"]) > 80:
            raise SystemExit("notes > 80 after insert: " + rel)
        for n in d["notes"]:
            if len(n) > 20000:
                raise SystemExit("note block > 20000 chars: " + rel)
        if not dry:
            with open(path, "w", encoding="utf-8", newline="\n") as f:
                json.dump(d, f, ensure_ascii=False, indent=2)
                f.write("\n")
        total += len(changes)
        for c in changes:
            print(c)
    print("%s: %d change(s)%s" % (pack_name, total, " (DRY RUN)" if dry else ""))


if __name__ == "__main__":
    args = sys.argv[1:]
    dry = "--check" in args
    packs = []
    for a in args:
        if a.startswith("--pack="):
            packs.append(a[len("--pack="):])
        elif a.startswith("--pack") and " " not in a:
            pass
    # accept both "--pack NAME" and "--pack=NAME"
    it = iter(args)
    for a in it:
        if a == "--pack":
            packs.append(next(it))
    if not packs:
        packs = ["class-12-heredity"]
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    for p in packs:
        run_pack(p, dry)
