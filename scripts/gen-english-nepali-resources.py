"""Generate English + Nepali HTML study guides matching public/resources template.
Reads source JSON straight from main branch via git show (so stale worktree content doesn't matter)."""
import json, html, re, pathlib, subprocess

BASE = pathlib.Path(r'c:/Users/ASUS/Desktop/rn')
OUT = BASE / 'public' / 'resources'

def git_show(path):
    r = subprocess.run(['git', '-C', str(BASE), 'show', f'main:{path}'], capture_output=True)
    if r.returncode != 0:
        return None
    raw = r.stdout.decode('utf-8-sig').strip()
    try:
        j = json.loads(raw)
    except json.JSONDecodeError:
        try:
            j = json.loads(raw, strict=False)
        except Exception:
            return None
    if isinstance(j, str):
        try:
            j = json.loads(j)
        except json.JSONDecodeError:
            j = json.loads(j, strict=False)
    if isinstance(j, list) and j and isinstance(j[0], dict):
        j = j[0]
    return j if isinstance(j, dict) else None

def strip_tags(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    s = html.unescape(s)
    return re.sub(r'\s+', ' ', s).strip()

def text_of(item):
    if isinstance(item, dict):
        for k in ('text','content','body','note','value','answer','explanation'):
            if k in item and isinstance(item[k], str):
                return strip_tags(item[k])
        return strip_tags(json.dumps(item, ensure_ascii=False)[:400])
    return strip_tags(str(item))

def load_json(p):
    # legacy local-disk loader (unused when reading from git; kept for fallback)
    try:
        raw = open(p, encoding='utf-8-sig').read().strip()
        try:
            j = json.loads(raw)
        except json.JSONDecodeError:
            j = json.loads(raw, strict=False)
        if isinstance(j, str):
            try:
                j = json.loads(j)
            except json.JSONDecodeError:
                j = json.loads(j, strict=False)
        if isinstance(j, list) and j and isinstance(j[0], dict):
            j = j[0]
        return j
    except Exception as e:
        print('SKIP', p, e)
        return None

def build_unit(slug, title, sections):
    # sections: list of (heading, notes_list, keypoints, confusions, summary)
    toc = ''.join(f'<li>{html.escape(h)}</li>' for h, *_ in sections)
    parts = [f'<!DOCTYPE html><html><head><meta charset="utf-8"><title>{html.escape(slug)}</title><style>table{{border-collapse:collapse;width:100%}}td,th{{border:1px solid #333;padding:6px}}th{{background:#eee}}img{{max-width:100%}}</style></head><body><h1>{html.escape(slug)}</h1><h2>Table of Contents</h2><ul>{toc}</ul>']
    for h, notes, kps, confs, summ in sections:
        rows = ''.join(f'<tr><td>{i+1}</td><td>{html.escape(text_of(n))}</td></tr>' for i, n in enumerate(notes[:12]) if text_of(n))
        if not rows:
            rows = f'<tr><td>1</td><td>{html.escape(h)} covers essential principles and applications.</td></tr>'
        parts.append(f'<h2>{html.escape(h)}</h2><table><tr><th>#</th><th>Concept</th></tr>{rows}</table>')
        if kps:
            kp_rows = ''.join(f'<tr><td>{html.escape(text_of(k))}</td></tr>' for k in kps[:5] if text_of(k))
            if kp_rows:
                parts.append(f'<h3>Key Points</h3><table><tr><th>Point</th></tr>{kp_rows}</table>')
        if confs:
            c_rows = ''.join(f'<tr><td>{html.escape(text_of(c))}</td></tr>' for c in confs[:4] if text_of(c))
            if c_rows:
                parts.append(f'<h3>Common Confusions</h3><table><tr><th>\u274c / \u2705</th></tr>{c_rows}</table>')
        if summ and strip_tags(str(summ)):
            parts.append(f'<p><b>Summary:</b> {html.escape(strip_tags(str(summ)))}</p>')
        parts.append('<hr>')
    # comparison table
    comp = ''.join(f'<tr><td>{i+1}: {html.escape(h)}</td><td>{html.escape(strip_tags(str(s))[:220] if s else h + " covers essential principles and applications.")}</td></tr>' for i, (h, _, _, _, s) in enumerate(sections))
    parts.append(f'<h2>Comparison Tables</h2><h3>Concept Comparison</h3><table><tr><th>Feature</th><th>Description</th></tr>{comp}</table></body></html>')
    return ''.join(parts)

def collect_from_git(unit_prefix, subfolders=('concepts', 'notes')):
    r = subprocess.run(['git', '-C', str(BASE), 'ls-tree', '-r', '--name-only', '-z', 'main', unit_prefix],
                       capture_output=True)
    files = [p.decode('utf-8') for p in r.stdout.split(b'\x00') if p.decode('utf-8', 'ignore').strip().endswith('.json')]
    # prefer rich content: concepts/ + */notes/introduction.json; skip rails/mindmap/pyqs
    picked = [f for f in files if ('/concepts/' in f or f.endswith('/notes/introduction.json') or '/notes/' in f)
              and '/rails/' not in f and '/mindmap/' not in f and '/pyqs/' not in f]
    if not picked:
        # fallback: unit-level rail summary (e.g. placeholder units with only rails)
        picked = [f for f in files if f.endswith(f'/{unit_prefix.split("/")[-1]}.rail.json')]
    if not picked:
        picked = [f for f in files if '/mindmap/_unit-' in f]
    secs = []
    for f in sorted(picked):
        j = git_show(f)
        if not isinstance(j, dict):
            continue
        title = j.get('topicTitle') or j.get('title') or pathlib.Path(f).parent.name.replace('-', ' ').title()
        notes = j.get('notes') or j.get('nodes') or []
        if isinstance(notes, dict):
            notes = notes.get('notes', []) if isinstance(notes.get('notes'), list) else [str(notes)]
        kps = j.get('keyPoints') or j.get('importantStatements') or []
        confs = j.get('confusion') or []
        summ = j.get('summary') or j.get('description') or ''
        if not notes and not kps:
            # rail-file shape: try stations/topics as sections
            stations = j.get('stations') or j.get('topics') or []
            for st in stations if isinstance(stations, list) else []:
                nm = st.get('name') or st.get('title') if isinstance(st, dict) else str(st)
                secs.append((str(nm), [str(st)], [], [], ''))
            # home-rail shape: rows -> one section, syllabusTopics -> outline
            rows = j.get('rows') or []
            if rows and isinstance(rows, list):
                row_notes = [f"{r.get('label','')}: {r.get('text','')}" for r in rows if isinstance(r, dict)]
                title = j.get('unitTitle') or unit_prefix.split('/')[-1]
                topics = j.get('syllabusTopics') or []
                if topics:
                    row_notes.append('Syllabus topics: ' + '; '.join(topics))
                secs.append((str(title), row_notes, [f'Syllabus: {t}' for t in topics[:5]], [], (j.get('card') or {}).get('title', '') if isinstance(j.get('card'), dict) else ''))
            continue
        secs.append((str(title), notes if isinstance(notes, list) else [notes], kps if isinstance(kps, list) else [], confs if isinstance(confs, list) else [], summ))
    return secs

targets = [
    'critical-thinking', 'grammar', 'language-and-grammar', 'language-development',
    'literature', 'literature-essays-plays', 'reading-and-comprehension',
    'vocabulary', 'writing', 'writing-and-composition',
    'bhasha-ra-vyakarana', 'bhasha-tatha-vyakaran', 'katha-natak-ra-sanskriti',
    'lekhan-koushal', 'lekhan-ra-rachana', 'sahitya-adhyayan', 'sanskriti-tatha-samaj',
]
SUBJECT = {t: 'english' for t in targets[:10]}
SUBJECT.update({t: 'nepali' for t in targets[10:]})
for slug in targets:
    prefix = f'content/ravikishan/class-11-notes/{SUBJECT[slug]}/{slug}'
    secs = collect_from_git(prefix)
    print(slug, len(secs), 'sections from main:' + prefix)
    if not secs:
        continue
    body = build_unit(slug, slug, secs)
    (OUT / f'{slug}.html').write_text(body, encoding='utf-8')
    doc = body.replace('<html>', '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">', 1)
    (OUT / f'{slug}.doc').write_text(doc, encoding='utf-8')
    print('WROTE', slug, len(body))
