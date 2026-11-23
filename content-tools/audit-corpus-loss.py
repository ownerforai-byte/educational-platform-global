#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Audit the corpus builder's content-loss refusal: for every flagged file,
compare shipped-manifest note chars vs source-file note chars. A rewrite is an
upgrade when the source carries MORE total teaching text than the manifest."""
import json, subprocess, re

out = subprocess.run(
    ["node", "scripts/build/build-content-corpus.mjs", "--check"],
    capture_output=True, text=True, encoding="utf-8",
).stdout + subprocess.run(
    ["node", "scripts/build/build-content-corpus.mjs", "--check"],
    capture_output=True, text=True, encoding="utf-8",
).stderr

paths = sorted(set(re.findall(r"\s+× (notes/concepts/\S+\.json)", out)))
print("flagged files:", len(paths))

m = json.load(open("frontend/public/data/content/manifest.json", encoding="utf-8"))
shipped = {it["path"]: it.get("data", {}) for it in m}

def chars(notes):
    return sum(len(n) for n in (notes or []) if isinstance(n, str))

regressions = []
upgrades = 0
for p in paths:
    src = json.load(open("content/" + p, encoding="utf-8"))
    sc, hc = chars(src.get("notes")), chars(shipped.get(p, {}).get("notes"))
    if sc < hc:
        regressions.append((p, hc, sc))
    else:
        upgrades += 1

print("upgrades (source richer):", upgrades)
print("regressions (source thinner):", len(regressions))
for p, hc, sc in regressions[:15]:
    print("  ", p.split("/")[-1][:60], hc, "->", sc)
json.dump([{"path": p, "shipped": hc, "source": sc} for p, hc, sc in regressions],
          open("content-tools/corpus-loss-regressions.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=2)
