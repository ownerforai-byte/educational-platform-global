#!/usr/bin/env python3
import json, os, re, sys

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'

def fix_file_backslash(fp):
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    valid_json_escapes = set('"\\\/bfnrt')

    result = []
    i = 0
    in_string = False
    string_started = False

    while i < len(content):
        c = content[i]

        if not in_string:
            if c == '"':
                in_string = True
                result.append(c)
            else:
                result.append(c)
            i += 1
            continue

        # Inside a string
        if string_started and c == '\\':
            # Escape character inside string
            if i + 1 < len(content):
                nxt = content[i + 1]
                if nxt in valid_json_escapes:
                    # Valid JSON escape - keep as is
                    result.append(c)
                    i += 1
                    continue
                else:
                    # Invalid JSON escape (LaTeX like \text, \approx)
                    # Double the backslash
                    result.append('\\\\')
                    i += 1
                    continue
            else:
                # Trailing backslash
                result.append('\\\\')
                i += 1
                continue
        elif string_started and c == '"':
            # Closing quote
            in_string = False
            string_started = False
            result.append(c)
        elif not string_started:
            # First char after opening quote
            string_started = True
            result.append(c)
        else:
            result.append(c)
        i += 1

    return ''.join(result)

def fix_file_quotes(fp):
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all unescaped double quotes inside string values
    # Approach: tokenize by finding string boundaries
    result = []
    i = 0
    in_string = False
    string_start = -1

    while i < len(content):
        c = content[i]

        if not in_string:
            if c == '"':
                in_string = True
                string_start = i
                result.append(c)
            else:
                result.append(c)
            i += 1
            continue

        # Count preceding backslashes to see if quote is escaped
        j = i - 1
        bs_count = 0
        while j >= 0 and content[j] == '\\':
            bs_count += 1
            j -= 1

        if c == '"' and bs_count % 2 == 0:
            # Unescaped quote - this terminates the string prematurely
            # We need to escape it
            result.append('\\"')
            # This doesn't end the string; continue scanning
        elif c == '"' and bs_count % 2 == 1:
            # Escaped quote - keep as is
            result.append(c)
            # Check if this is the closing quote
            if bs_count == 1:
                # Single backslash before quote = escaped quote
                pass
            i += 1
            continue
        else:
            result.append(c)
            i += 1
            continue

        # Check if this quote closes the string
        # It closes if the number of backslashes before it is even (including 0)
        if c == '"' and bs_count % 2 == 0:
            # But we need to check: is this the REAL closing quote?
            # A real closing quote has no backslash before it (bs_count == 0)
            # OR it has an even number of backslashes (meaning the previous ones escaped each other)
            if bs_count == 0:
                # This is the real closing quote
                in_string = False
                string_start = -1
            else:
                # Even number of backslashes before quote - these are escaped pairs
                # The quote is effectively unescaped
                # We already added \" above, so don't add another
                pass
        i += 1

    return ''.join(result)

def verify(fp):
    try:
        with open(fp, 'r', encoding='utf-8') as f:
            data = json.load(f)
        notes = len(data.get('notes', []))
        conf = len(data.get('confusion', []))
        pract = len(data.get('practice', []))
        facts = len(data.get('universalFacts', []))
        ok = notes >= 8 and conf >= 3 and pract >= 3 and facts >= 3
        status = 'OK' if ok else 'NEEDS EXPANSION'
        return True, notes, conf, pract, facts, status
    except Exception as e:
        return False, 0, 0, 0, 0, str(e)

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
    print(f'--- {rel_path} ---')

    ok, notes, conf, pract, facts, status = verify(fp)
    print(f'  Before: notes={notes} conf={conf} pract={pract} facts={facts} [{status}]')

    if ok:
        print('  Already valid JSON')
        continue

    with open(fp, 'r', encoding='utf-8') as f:
        original = f.read()

    if fix_type == 'backslash':
        new_content = fix_file_backslash(fp)
    else:
        new_content = fix_file_quotes(fp)

    if new_content != original:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print('  Fixed')
    else:
        print('  No change needed')

    ok, notes, conf, pract, facts, status = verify(fp)
    print(f'  After:  notes={notes} conf={conf} pract={pract} facts={facts} [{status}]')
    print()

print('Done!')
