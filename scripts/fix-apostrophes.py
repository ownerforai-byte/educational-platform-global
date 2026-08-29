import os
import re

base = r"C:\Users\ASUS\Desktop\educational-platform-global"
skip = ["node_modules", ".git", "content", "dist"]
count = 0

for root, dirs, files in os.walk(base):
    if any(s in root for s in skip):
        continue
    for f in files:
        if not f.endswith((".ts", ".tsx", ".js", ".json", ".md")):
            continue
        p = os.path.join(root, f)
        try:
            txt = open(p, "r", encoding="utf-8", errors="ignore").read()
        except Exception:
            continue
        if "&apos;" in txt:
            txt = txt.replace("&apos;", "'")
            try:
                open(p, "w", encoding="utf-8").write(txt)
                count += 1
            except Exception:
                pass

print("Updated", count, "files")
