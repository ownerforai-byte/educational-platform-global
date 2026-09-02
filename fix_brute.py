#!/usr/bin/env python3
"""Fix broken JSON files by using regex to repair escape sequences."""

import json, os, re, sys

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'

VALID_ESCAPES = set('"\\\/bfnrt')  # valid chars after backslash in JSON
UNICODE_ESCAPES = {'u'}

def fix_backslash_issues(content):
    """Fix invalid JSON escape sequences by doubling single backslashes
    that are followed by non-escape characters."""
    result = []
    i = 0
    while i < len(content):
        if content[i] == '\\' and i + 1 < len(content):
            nxt = content[i + 1]
            if nxt in VALID_ESCAPES or nxt in UNICODE_ESCAPES:
                result.append(content[i])
                i += 1
                continue
            # Invalid escape: this is LaTeX like \, \text \approx etc.
            # The file has a single backslash but needs a double backslash
            result.append('\\\\')
            i += 1
            continue
        result.append(content[i])
        i += 1
    return ''.join(result)

def fix_unescaped_quotes(content):
    """Fix unescaped double quotes inside JSON string values."""
    # We need to find " that are NOT preceded by an odd number of backslashes
    # (odd number = escaped quote, even = unescaped)
    result = []
    i = 0
    while i < len(content):
        c = content[i]
        if c == '"':
            # Count preceding backslashes
            j = i - 1
            bs_count = 0
            while j >= 0 and content[j] == '\\':
                bs_count += 1
                j -= 1
            if bs_count % 2 == 0:
                # Even (including 0) = unescaped quote
                result.append('\\"')
            # else: odd = escaped, leave as is
        result.append(c)
        i += 1
    return ''.join(result)

files = {
    'solids/concepts/03-intrinsic-and-extrinsic-semiconductors.json': 'backslash',
    'recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json': 'backslash',
    'quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json': 'quote',
    'quantity-of-heat/concepts/02-specific-heat-capacity-definition.json': 'quote',
    'quantity-of-heat/concepts/03-specific-heat-units-and-dimensions.json': 'quote',
    'quantity-of-heat/concepts/04-heat-capacity-thermal-capacity.json': 'quote',
    'quantity-of-heat/concepts/05-principle-of-calorimetry.json': 'quote',
    'quantity-of-heat/concepts/06-newtons-law-of-cooling-statement.json': 'quote',
    'quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json': 'quote',
    'nuclear-physics/concepts/02-atomic-mass-isotopes.json': 'backslash',
    'dc-circuits/concepts/03-current-voltage-relations-and-ohmic-and-non-ohmic-resistance.json': 'backslash',
    'dc-circuits/concepts/05-potential-divider.json': 'backslash',
    'dc-circuits/concepts/06-emf-internal-resistance-and-cells-in-combination.json': 'backslash',
    'dc-circuits/concepts/07-work-and-power-in-electrical-circuits.json': 'backslash',
    'heat-and-temperature/concepts/temperature-scales.json': 'quote',
    'work-energy-and-power/concepts/01-work-done-by-constant-and-variable-force.json': 'backslash',
    'ideal-gas/concepts/02-molecular-properties-of-matter.json': 'backslash',
    'ideal-gas/concepts/06-boltzmann-constant-root-mean-square-speed.json': 'backslash',
}

for rel_path, fix_type in files.items():
    fp = os.path.join(base, rel_path)
    if not os.path.exists(fp):
        print(f'SKIP: {rel_path} not found')
        continue

    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    if fix_type == 'backslash':
        content = fix_backslash_issues(content)
    else:
        content = fix_unescaped_quotes(content)

    if content != original:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'FIXED: {rel_path}')
    else:
        print(f'NO CHANGE: {rel_path}')

    # Verify
    try:
        with open(fp, 'r', encoding='utf-8') as f:
            data = json.load(f)
        notes = len(data.get('notes', []))
        conf = len(data.get('confusion', []))
        pract = len(data.get('practice', []))
        facts = len(data.get('universalFacts', []))
        ok = notes >= 8 and conf >= 3 and pract >= 3 and facts >= 3
        status = 'OK' if ok else 'NEEDS EXPANSION'
        print(f'  -> notes={notes} conf={conf} pract={pract} facts={facts} [{status}]')
    except Exception as e:
        print(f'  -> STILL BROKEN: {e}')

print('\nDone!')
