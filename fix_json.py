import json, os, re

base = r'C:\Users\ASUS\desktop\rn\content\ravikishan\class-11-notes\physics'

files_to_fix = [
    'solids/concepts/03-intrinsic-and-extrinsic-semiconductors.json',
    'recent-trends-in-physics/concepts/01-particles-and-antiparticles-quarks-and-leptons.json',
    'quantity-of-heat/concepts/01-heat-mass-and-temperature-dependency.json',
    'quantity-of-heat/concepts/02-specific-heat-capacity-definition.json',
    'quantity-of-heat/concepts/03-specific-heat-units-and-dimensions.json',
    'quantity-of-heat/concepts/04-heat-capacity-thermal-capacity.json',
    'quantity-of-heat/concepts/05-principle-of-calorimetry.json',
    'quantity-of-heat/concepts/06-newtons-law-of-cooling-statement.json',
    'quantity-of-heat/concepts/07-newtons-law-rate-of-fall-of-temperature.json',
    'nuclear-physics/concepts/02-atomic-mass-isotopes.json',
    'dc-circuits/concepts/03-current-voltage-relations-and-ohmic-and-non-ohmic-resistance.json',
    'dc-circuits/concepts/05-potential-divider.json',
    'dc-circuits/concepts/06-emf-internal-resistance-and-cells-in-combination.json',
    'dc-circuits/concepts/07-work-and-power-in-electrical-circuits.json',
    'heat-and-temperature/concepts/temperature-scales.json',
    'work-energy-and-power/concepts/01-work-done-by-constant-and-variable-force.json',
    'ideal-gas/concepts/01-ideal-gas-equation.json',
    'ideal-gas/concepts/02-molecular-properties-of-matter.json',
    'ideal-gas/concepts/06-boltzmann-constant-root-mean-square-speed.json',
]

for f in files_to_fix:
    fp = os.path.join(base, f)
    if not os.path.exists(fp):
        print('SKIP: ' + f + ' not found')
        continue
    with open(fp, 'r', encoding='utf-8') as fh:
        text = fh.read()
    original = text
    # Fix double-escaped backslashes: replace \\\\ with \\
    text = text.replace('\\', '\\')
    # Fix smart quotes and dashes
    text = text.replace('\u2014', '-').replace('\u2013', '-')
    text = text.replace('\u201c', '"').replace('\u201d', '"')
    text = text.replace('\u2018', "'").replace('\u2019', "'")
    if text != original:
        with open(fp, 'w', encoding='utf-8') as fh:
            fh.write(text)
        print('Fixed: ' + f)
    else:
        print('No change: ' + f)

# Verify all fixed
print('\n=== VERIFICATION ===')
for f in files_to_fix:
    fp = os.path.join(base, f)
    try:
        with open(fp, 'r', encoding='utf-8') as fh:
            data = json.load(fh)
        notes = len(data.get('notes', []))
        conf = len(data.get('confusion', []))
        pract = len(data.get('practice', []))
        facts = len(data.get('universalFacts', []))
        ok = notes >= 8 and conf >= 3 and pract >= 3 and facts >= 3
        status = 'OK' if ok else 'NEEDS EXPANSION'
        print(f + ': notes=' + str(notes) + ' confusion=' + str(conf) + ' practice=' + str(pract) + ' facts=' + str(facts) + ' [' + status + ']')
    except Exception as e:
        print(f + ': STILL BROKEN - ' + str(e))
