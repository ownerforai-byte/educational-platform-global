import re

with open('frontend/components/derivations/derivation-visual.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all K > 1 and K < 1 patterns in text elements
content = content.replace('>K > 1:', '{'>'K < 1:'}')
content = content.replace('>K < 1:', '{'>'K > 1:'}')

# Fix any other problematic comparison operators in text tags
# Replace patterns like <text ...>K > 1:</text> with proper JSX
content = content.replace('>K > 1:</text>', '{"K < 1: products favored"};</text>')
content = content.replace('>K < 1:</text>', '{"K > 1: reactants favored"};</text>')

# Fix Cation Size < Parent Atom
content = content.replace('Cation Size < Parent Atom', "Cation Size {'<'} Parent Atom")
content = content.replace('Parent Atom < Anion Size', "Parent Atom {'<'} Anion Size")

# Fix metallic character line
content = content.replace('Increases down & left', 'Increases down &amp; left')

with open('frontend/components/derivations/derivation-visual.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed build errors")
