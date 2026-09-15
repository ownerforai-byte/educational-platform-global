import re

with open('frontend/components/derivations/derivation-visual.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix K > 1 and K < 1 patterns in text elements
content = content.replace('>K > 1:', '{"K < 1: products favored"};');
content = content.replace('>K < 1:', '{"K > 1: reactants favored"};');

with open('frontend/components/derivations/derivation-visual.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed comparison operators")
