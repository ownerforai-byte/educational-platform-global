import json, os, re

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'
fp = os.path.join(base, 'solids/concepts/03-intrinsic-and-extrinsic-semiconductors.json')

with open(fp, 'r', encoding='utf-8') as f:
    content = f.read()

# The issue: single backslashes before LaTeX like \, \text are invalid JSON
# In JSON, a backslash must be escaped as \\
# So \, should become \\, and \text should become \\text
# But \\ already in the file (from previous fix) should become \\\\

# Let's check what we have
print("First 2000 chars of content:")
print(repr(content[:2000]))
print()
print("Checking for patterns:")
# Find all backslash sequences
for m in re.finditer(r'\\.', content):
    print(f"  Found backslash + '{m.group()}' at pos {m.start()}")
    if m.start() > 2000:
        break
