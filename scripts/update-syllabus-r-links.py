import re

p = r"C:\Users\ASUS\Desktop\educational-platform-global\lib\syllabus.ts"
txt = open(p, "r", encoding="utf-8").read()

# Only modify the first class block (class-11-notes)
first_class_match = re.search(r'(slug: "class-11-notes".*?subjects: \[)', txt, re.S)
if not first_class_match:
    print("Class 11 block not found")
    exit(1)

subjects_block_start = first_class_match.end()
# Find the end of the first class block
rest = txt[subjects_block_start:]
# Find the next top-level object after subjects array
next_class = re.search(r'\n  \},\n  \{', rest)
if next_class:
    subjects_block_end = subjects_block_start + next_class.start()
else:
    subjects_block_end = len(txt)

subjects_block = txt[subjects_block_start:subjects_block_end]

# Map subject slug to R notes URL
url_map = {
    "biology": "/r-notes?subject=biology",
    "chemistry": "/r-notes?subject=chemistry",
    "english": "/r-notes?subject=english",
    "mathematics": "/r-notes?subject=mathematics",
    "nepali": "/r-notes?subject=nepali",
    "physics": "/r-notes?subject=physics",
}

for slug, url in url_map.items():
    pattern = rf'(slug: "{slug}",\n\s+name: "[^"]+",\n\s+description: "[^"]+",)'
    replacement = rf'\1\n        notesUrl: "{url}",'
    subjects_block = re.sub(pattern, replacement, subjects_block, count=1)

new_txt = txt[:subjects_block_start] + subjects_block + txt[subjects_block_end:]
open(p, "w", encoding="utf-8").write(new_txt)
print("Updated Class 11 subjects with notesUrl")
