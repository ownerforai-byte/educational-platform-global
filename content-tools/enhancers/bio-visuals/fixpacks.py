"""Fix pack files: insert missing block-dict closing braces.

A block dict inside "blocks": [...] that ends with `),` must be closed with
`},` before the next `{"after"` block or the `],` list terminator. Run on any
pack file after writing:

    python fixpacks.py packs/FILE.py [packs/FILE2.py ...]
"""
import re
import sys

for fn in sys.argv[1:]:
    lines = open(fn, encoding="utf-8").read().split("\n")
    out = []
    for ln in lines:
        if out and (re.match(r"^\s*\{[\"']", ln) or re.match(r"^\s*\],\s*$", ln)):
            prev = out[-1].rstrip()
            if prev.endswith("),"):
                out.append("        },")
        out.append(ln)
    open(fn, "w", encoding="utf-8", newline="\n").write("\n".join(out))
    print("fixed", fn)
