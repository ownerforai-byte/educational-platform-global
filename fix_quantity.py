import json, os, re

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'
fp = os.path.join(base, 'quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json')

with open(fp, 'r', encoding='utf-8') as f:
    content = f.read()

print("First 500 chars:")
print(repr(content[:500]))
print()
# Find unescaped quotes
in_string = False
quote_count = 0
for i, c in enumerate(content):
    if c == '"':
        # Check if preceded by backslash
        if i > 0 and content[i-1] == '\\':
            # Check if it's an escaped quote or part of \\\"
            # Count preceding backslashes
            j = i - 1
            bs_count = 0
            while j >= 0 and content[j] == '\\':
                bs_count += 1
                j -= 1
            if bs_count % 2 == 0:
                # Even number of backslashes before quote = unescaped quote
                print(f"UNESCAPED QUOTE at pos {i}: ...{repr(content[max(0,i-60):i+20])}...")
            else:
                # Odd number = escaped quote (legitimate)
                pass
