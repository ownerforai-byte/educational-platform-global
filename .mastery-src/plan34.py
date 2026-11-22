import io, re
p = "docs/guides/chemistry-xi-mastery-plan.md"
s = io.open(p, encoding="utf-8").read()
note = ("- Session 29 - Fundamental Principles figure campaign (rows 103-111, 9/9): 63 theme-aware figures (7/topic) via "
        ".mastery-src/figfpo_b1-b3.py + figreg_fpo.py; all 63 keywords verified against canonical JSONs (one miss - silver nitrate "
        "absent from row 104 JSON, switched to agno3 before insertion). Registry entries are per-TOPIC slugs (not unit slug) - "
        "first attempt used the unit slug and failed the topic-doc-view test; restructured into 9 topic blocks. A dropped-file-tail "
        "bug during restructuring was caught (getTopicFigures vanished) and restored; a duplicate }; was removed. One raw '>' in JSX "
        "text (carbocation stability order) escaped as &gt;. tsc clean; topic-doc-view 14/14.\n")
anchor = "- Session 16 \u2014"
i = s.find(anchor)
assert i > 0
s = s[:i] + note + s[i:]
io.open(p, "w", encoding="utf-8", newline="").write(s)
print("session 29 note added")
