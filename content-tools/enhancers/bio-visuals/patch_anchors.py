import json, re, sys
anchors = json.load(open('C:/Users/ASUS/desktop/rn/reports/c11phys-extra-anchors.json', encoding='utf-8'))
pack = sys.argv[1]
src = open(pack, encoding='utf-8').read()
BS = chr(92)
def esc(s):
    return s.replace(BS, BS+BS).replace('"', BS+'"').replace('\n', BS+'n')
patched = 0
for m in re.finditer(r'\{"file": "([^"]+)",\n  "blocks": \[\{"after": "PLACEHOLDER"', src):
    rel = m.group(1)
    key = 'content/notes/concepts/' + rel
    if key not in anchors:
        print('NO ANCHOR for', rel); continue
    block = '{"file": "' + rel + '",\n  "blocks": [{"after": "PLACEHOLDER"'
    repl = '{"file": "' + rel + '",\n  "blocks": [{"after": "' + esc(anchors[key]) + '"'
    src = src.replace(block, repl, 1)
    patched += 1
open(pack, 'w', encoding='utf-8').write(src)
print('patched anchors:', patched)
