import json, os, re

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'

def fix_json_backslashes(content):
    """Fix invalid single backslashes in JSON strings.

    Strategy: scan character by character. When we see a backslash,
    check if it's followed by a valid JSON escape char. If not,
    double it (so \, becomes \\, in the raw file = valid JSON).
    """
    valid_escapes = set('"\\\/bfnrt')
    result = []
    i = 0
    while i < len(content):
        if content[i] == '\\' and i + 1 < len(content):
            next_char = content[i + 1]
            if next_char not in valid_escapes:
                # Invalid JSON escape - double the backslash
                result.append('\\\\')
                i += 1
                continue
        result.append(content[i])
        i += 1
    return ''.join(result)

def fix_unescaped_quotes(content):
    """Fix unescaped double quotes inside JSON string values."""
    # Find all unescaped quotes by scanning
    result = []
    i = 0
    in_key = False
    while i < len(content):
        c = content[i]
        if c == '"' and i > 0 and content[i-1] != '\\':
            # This might be an unescaped quote in a string value
            result.append('\\"')
        elif c == '"' and i > 0 and content[i-1] == '\\':
            # Check if it's a double-backslash before (meaning escaped quote)
            j = i - 1
            bs_count = 0
            while j >= 0 and content[j] == '\\':
                bs_count += 1
                j -= 1
            if bs_count % 2 == 1:
                # Odd number of backslashes = this quote is escaped (legitimate)
                pass
            else:
                # Even number = unescaped quote
                result.append('\\"')
        result.append(c)
        i += 1
    return ''.join(result)

files_to_fix = [
    ('solids/concepts/03-intrinsic-and-extrinsic-semiconductors.json', 'backslash'),
    ('recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json', 'backslash'),
    ('quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json', 'quote'),
    ('quantity-of-heat/concepts/02-specific-heat-capacity-definition.json', 'quote'),
    ('quantity-of-heat/concepts/03-specific-heat-units-and-dimensions.json', 'quote'),
    ('quantity-of-heat/concepts/04-heat-capacity-thermal-capacity.json', 'quote'),
    ('quantity-of-heat/concepts/05-principle-of-calorimetry.json', 'quote'),
    ('quantity-of-heat/concepts/06-newtons-law-of-cooling-statement.json', 'quote'),
    ('quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json', 'quote'),
    ('nuclear-physics/concepts/02-atomic-mass-isotopes.json', 'backslash'),
    ('dc-circuits/concepts/03-current-voltage-relations-and-ohmic-and-non-ohmic-resistance.json', 'backslash'),
    ('dc-circuits/concepts/05-potential-divider.json', 'backslash'),
    ('dc-circuits/concepts/06-emf-internal-resistance-and-cells-in-combination.json', 'backslash'),
    ('dc-circuits/concepts/07-work-and-power-in-electrical-circuits.json', 'backslash'),
    ('heat-and-temperature/concepts/temperature-scales.json', 'quote'),
    ('work-energy-and-power/concepts/01-work-done-by-constant-and-variable-force.json', 'backslash'),
    ('ideal-gas/concepts/01-ideal-gas-equation.json', 'backslash'),
    ('ideal-gas/concepts/02-molecular-properties-of-matter.json', 'backslash'),
    ('ideal-gas/concepts/06-boltzmann-constant-root-mean-square-speed.json', 'backslash'),
]

all_ok = True
for rel_path, fix_type in files_to_fix:
    fp = os.path.join(base, rel_path)
    if not os.path.exists(fp):
        print('SKIP: ' + rel_path + ' not found')
        continue

    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    if fix_type == 'backslash':
        content = fix_json_backslashes(content)
    else:
        content = fix_unescaped_quotes(content)

    if content != original:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed: ' + rel_path)
    else:
        print('No change: ' + rel_path)

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
        print('  -> notes=' + str(notes) + ' conf=' + str(conf) + ' pract=' + str(pract) + ' facts=' + str(facts) + ' [' + status + ']')
    except Exception as e:
        print('  -> STILL BROKEN: ' + str(e))
        all_ok = False

print()
if all_ok:
    print('ALL FILES FIXED SUCCESSFULLY!')
else:
    print('Some files still have issues')
