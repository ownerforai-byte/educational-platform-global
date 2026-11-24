"""Split pack blocks that carry more than one content key (md/table/svg).

The engine renders exactly one content type per block, so a block dict with
both "md" and "table" silently drops the md. This script splits every block
into one dict per content key, preserving key order (md, table, svg) and the
shared "after" anchor.

    python splitblocks.py packs/FILE.py [packs/FILE2.py ...]
"""
import sys

CONTENT_KEYS = ["md", "table", "svg"]

for fn in sys.argv[1:]:
    src = open(fn, encoding="utf-8").read()
    # Find block dicts: from '{"after":' to the matching close. We do a simple
    # brace-depth scan over the file and rebuild dicts that contain 2+ keys.
    out = []
    i = 0
    n = len(src)
    changed = 0
    while i < n:
        j = src.find('{"after"', i)
        if j < 0:
            out.append(src[i:])
            break
        out.append(src[i:j])
        # scan to matching close brace
        depth = 0
        k = j
        while k < n:
            c = src[k]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    break
            k += 1
        block_src = src[j:k + 1]
        keys = [key for key in CONTENT_KEYS if ('"%s":' % key) in block_src]
        if len(keys) > 1:
            # split into per-key dicts
            indent = "            "
            parts = []
            for key in keys:
                # extract "key": ( ... ) value text
                marker = '"%s":' % key
                p = block_src.index(marker)
                # value starts after the colon; capture balanced parens
                q = block_src.index("(", p)
                depth2 = 0
                m = q
                while m < len(block_src):
                    if block_src[m] == "(":
                        depth2 += 1
                    elif block_src[m] == ")":
                        depth2 -= 1
                        if depth2 == 0:
                            break
                    m += 1
                value = block_src[q:m + 1]
                after = block_src[block_src.index('"after":') + len('"after":'):p].strip().rstrip(",").strip()
                parts.append('{%s"after": %s,\n%s "%s": %s}' % (indent, after, indent, key, value))
            out.append(",\n".join(parts))
            changed += 1
        else:
            out.append(block_src)
        i = k + 1
    open(fn, "w", encoding="utf-8", newline="\n").write("".join(out))
    print("%s: split %d multi-key block(s)" % (fn, changed))
