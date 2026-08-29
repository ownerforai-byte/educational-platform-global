import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

p = r"C:\Users\ASUS\Desktop\educational-platform-global\lib\syllabus.ts"
txt = open(p, "r", encoding="utf-8").read()

start = txt.find('slug: "class-11-notes"')
end = txt.find('slug: "class-11e"')
block = txt[start:end]

subjects = re.findall(r'slug: "([^"]+)",\s+name: "([^"]+)"', block)
units = re.findall(r'id: "([^"]+)",\s+title: "([^"]+)"', block)

print("Subjects:", subjects)
print("Units:", units)
