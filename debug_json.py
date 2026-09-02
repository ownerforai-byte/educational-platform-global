import json, os

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'

fp = os.path.join(base, 'solids/concepts/03-intrinsic-and-extrinsic-semiconductors.json')
with open(fp, 'rb') as fh:
    raw = fh.read()

# Show raw bytes around the error position (char 1905)
print('Total bytes:', len(raw))
start = max(0, 1850)
end = min(len(raw), 1970)
snippet = raw[start:end]
# Show each byte
for i, b in enumerate(snippet):
    if b < 32 or b > 126:
        print(f'  offset {start+i}: 0x{b:02x} (non-ASCII)')
    elif b == ord('\\'):
        # Show what follows
        next_b = snippet[i+1] if i+1 < len(snippet) else None
        print(f'  offset {start+i}: backslash, next=0x{next_b:02x} ({chr(next_b) if next_b and next_b < 128 else "?"})')

print()
print('Raw snippet (start=1850, end=1970):')
print(snippet.decode('utf-8', errors='replace'))
