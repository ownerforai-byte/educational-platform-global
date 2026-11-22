#!/usr/bin/env python
# Fill the one missed chemistry answer: atomic-structure/03-neb-2022 (no BOM)
import json

f = 'content/practice/questions/class-11/chemistry/atomic-structure/03-neb-2022.json'
d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
qs = d if isinstance(d, list) else d.get('questions', [])
assert not (qs[0].get('answer') or '').strip()

qs[0]['answer'] = (
"**Energy of the second orbit:** E₂ = −2.18 × 10⁻¹⁸ / n² = −2.18 × 10⁻¹⁸ / 4 = "
"**−5.45 × 10⁻¹⁹ J**. "
"**Photon wavelength (n = 3 → n = 2):** "
"ΔE = E₃ − E₂ = −2.18 × 10⁻¹⁸ (1/9 − 1/4) = −2.18 × 10⁻¹⁸ × (−5/36) = "
"+3.028 × 10⁻¹⁹ J (energy released). "
"**Wavelength:** ΔE = hc/λ ⟹ λ = hc/ΔE = (6.626 × 10⁻³⁴ × 3 × 10⁸) / (3.028 × 10⁻¹⁹) "
"= (1.9878 × 10⁻²⁵)/(3.028 × 10⁻¹⁹) = 6.563 × 10⁻⁷ m = **656.3 nm** — the red Hα line of the "
"Balmer series. "
"**Deep point:** the 656 nm result is the Balmer series' first line — the calculation's real check "
"is that a 3→2 hydrogen transition must land in the visible red, and it does.")

if isinstance(d, list):
    open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
else:
    open(f, 'w', encoding='utf-8', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
print('filled atomic-structure/03-neb-2022.json')
