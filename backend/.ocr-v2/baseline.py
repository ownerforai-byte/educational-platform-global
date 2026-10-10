#!/usr/bin/env python
"""Snapshot kb/books records: count + text bytes per subject, plus per-file hashes.

Usage:
  python .ocr-v2/baseline.py snapshot <out.json>
  python .ocr-v2/baseline.py compare  <baseline.json>
"""
import hashlib
import json
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
BOOKS = os.path.join(ROOT, "kb", "books")


def digest(rec):
    """Length + sha1 of the record's text bodies, so re-ingest changes are visible."""
    h = hashlib.sha1()

    def collect(val, into):
        if isinstance(val, str):
            into.append(val)
        elif isinstance(val, list):
            for item in val:
                collect(item, into)
        elif isinstance(val, dict):
            for key in ("text", "content", "body", "textbookText"):
                collect(val.get(key), into)

    texts = []
    for key in ("textbookText", "content", "text", "body", "question", "answer", "solution"):
        collect(rec.get(key), texts)
    blob = "\n".join(texts)
    h.update(blob.encode("utf-8", "replace"))
    return len(blob), h.hexdigest()


def snapshot():
    out = {}
    for subject in sorted(os.listdir(BOOKS)):
        sdir = os.path.join(BOOKS, subject)
        if not os.path.isdir(sdir):
            continue
        files = sorted(f for f in os.listdir(sdir) if f.endswith(".json"))
        total_chars = 0
        per_file = {}
        for fname in files:
            path = os.path.join(sdir, fname)
            try:
                with open(path, encoding="utf-8") as fh:
                    rec = json.load(fh)
            except Exception as exc:  # noqa: BLE001
                per_file[fname] = {"error": str(exc)}
                continue
            n, h = digest(rec)
            total_chars += n
            per_file[fname] = {"chars": n, "sha1": h}
        out[subject] = {"files": len(files), "chars": total_chars, "per_file": per_file}
    return out


def summarize(snap):
    total_files = sum(v["files"] for v in snap.values())
    total_chars = sum(v["chars"] for v in snap.values())
    return {
        subject: {"files": v["files"], "chars": v["chars"], "KiB": round(v["chars"] / 1024, 1)}
        for subject, v in sorted(snap.items())
    } | {"TOTAL": {"files": total_files, "chars": total_chars, "KiB": round(total_chars / 1024, 1)}}


def main():
    mode = sys.argv[1]
    path = sys.argv[2]
    if mode == "snapshot":
        snap = snapshot()
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(snap, fh, indent=1, sort_keys=True)
        print(json.dumps(summarize(snap), indent=1))
    elif mode == "compare":
        with open(path, encoding="utf-8") as fh:
            base = json.load(fh)
        cur = snapshot()
        base_sum, cur_sum = summarize(base), summarize(cur)
        print(f"{'subject':<14}{'files':>14}{'chars':>16}")
        for subject in sorted(set(base_sum) | set(cur_sum)):
            b = base_sum.get(subject, {"files": 0, "chars": 0})
            c = cur_sum.get(subject, {"files": 0, "chars": 0})
            df = c["files"] - b["files"]
            dc = c["chars"] - b["chars"]
            print(f"{subject:<14}{b['files']:>6} ->{c['files']:>5} ({df:+}){b['chars']:>9} ->{c['chars']:>7} ({dc:+})")
        changed = []
        for subject in sorted(set(base) & set(cur)):
            bp, cp = base[subject]["per_file"], cur[subject]["per_file"]
            for fname in sorted(set(bp) & set(cp)):
                if bp[fname].get("sha1") != cp[fname].get("sha1"):
                    changed.append(f"{subject}/{fname}")
        print(f"\nfiles with changed text: {len(changed)}")
        for line in changed[:40]:
            print("  ~", line)
        if len(changed) > 40:
            print(f"  ... and {len(changed) - 40} more")
    else:
        raise SystemExit("usage: baseline.py snapshot|compare <path>")


if __name__ == "__main__":
    main()
