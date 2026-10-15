"""Fix unescaped double-quotes inside JSON string values."""
import json, re, sys

TARGETS = [
    "content/ravikishan/class-11-notes/physics/reflection-at-curved-mirror/mindmap/mindmap.json",
    "content/ravikishan/class-11-notes/physics/solids/mindmap/mindmap.json",
]

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Try parsing first
    try:
        json.loads(content)
        print(f"ALREADY VALID: {path}")
        return
    except json.JSONDecodeError:
        pass

    # Strategy: process line by line, escape unescaped inner quotes
    lines = content.splitlines(True)
    fixed = []
    for line in lines:
        stripped = line.strip()
        # Only process lines that look like JSON string values
        # e.g.   "some text here",
        trail = ""
        core = stripped
        if core.endswith(","):
            trail = ","
            core = core[:-1]

        if core.startswith('"') and core.endswith('"') and len(core) > 2:
            inner = core[1:-1]
            # Check for unescaped quotes (not preceded by backslash)
            if re.search(r'(?<!\\)"', inner):
                # Escape all unescaped inner quotes
                inner_fixed = re.sub(r'(?<!\\)"', r'\\"', inner)
                indent = line[: len(line) - len(line.lstrip())]
                newline_char = "\n" if line.endswith("\n") else ""
                line = f'{indent}"{inner_fixed}"{trail}{newline_char}'

        fixed.append(line)

    result = "".join(fixed)

    # Verify
    try:
        json.loads(result)
        with open(path, "w", encoding="utf-8") as f:
            f.write(result)
        print(f"FIXED and VALID: {path}")
    except json.JSONDecodeError as e:
        print(f"STILL BROKEN after fix: {path} => {e}")
        sys.exit(1)

for t in TARGETS:
    fix_file(t)
