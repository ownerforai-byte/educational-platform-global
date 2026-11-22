#!/usr/bin/env python
# Populate PYQ answers - chemistry batch 5: oxidation-and-reduction, states-of-matter, stoichiometry
import json

A = {}

A['oxidation-and-reduction/01-neb-2023.json'] = {0: (
"**Oxidation half (oxalate → CO₂):** C in C₂O₄²⁻ is +3; in CO₂ it is +4 — each carbon loses 1 e⁻. "
"**Oxidation:** C₂O₄²⁻ → 2CO₂ + 2e⁻ (charges: −2 = 0 −2 ✓). "
"**Reduction half (permanganate → Mn²⁺):** Mn is +7 in MnO₄⁻ and +2 in Mn²⁺ — gain of 5 e⁻; balance O "
"with H₂O and H with H⁺: **MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O** (charges: −1 + 8 − 5 = +2 ✓). "
"**Combine:** multiply oxidation × 5, reduction × 2 (electrons = 10): "
"5C₂O₄²⁻ → 10CO₂ + 10e⁻; 2MnO₄⁻ + 16H⁺ + 10e⁻ → 2Mn²⁺ + 8H₂O. "
"**Add and cancel:** **2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O**. "
"**Check:** charges: −2 −10 +16 = +4; right: +4 ✓. Atoms balanced. "
"**Deep point:** the two checks — electron count (10 = 10) and charge balance (+4 = +4) — are what "
"make the answer self-verifying; the charge check is the one most answers skip.")}

A['oxidation-and-reduction/02-neb-2022.json'] = {0: (
"H₂O₂ contains oxygen at **−1**, the intermediate oxidation state between O₂ (0) and oxide O²⁻ (−2) — "
"it can therefore either **fall to −2 (acting as oxidising agent, being reduced)** or **rise to 0 "
"(acting as reducing agent, being oxidised)**. **As oxidising agent (O goes −1 → −2):** "
"H₂O₂ + 2Fe²⁺ + 2H⁺ → 2Fe³⁺ + 2H₂O (Fe²⁺ oxidised, H₂O₂ reduced); "
"also 2KI + H₂O₂ + H₂SO₄ → I₂ + K₂SO₄ + 2H₂O. **As reducing agent (O goes −1 → 0):** "
"H₂O₂ + Cl₂ → 2HCl + O₂ (Cl₂ reduced, H₂O₂ oxidised); "
"also 2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 8H₂O + 5O₂. "
"**Deep point:** the intermediate oxidation state is the whole answer — any species sitting between "
"two stable states can walk either way, and H₂O₂'s −1 oxygen is the textbook middle rung.")}

A['oxidation-and-reduction/03-neb-2021.json'] = {0: (
"**Molar mass:** K₂Cr₂O₇ = 2(39) + 2(52) + 7(16) = 78 + 104 + 112 = **294 g/mol**. "
"**Change per formula unit:** each Cr goes from +6 to +3 (in Cr³⁺), gaining 3 e⁻; two Cr atoms ⟹ "
"**n-factor = 6** electrons gained per K₂Cr₂O₇ in acidic medium "
"(Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O). "
"**Equivalent mass = molar mass / n-factor = 294 / 6 = 49.** "
"**Deep point:** the n-factor is the entire calculation — count electrons gained per formula unit "
"(2 Cr × 3), and the 'acidic medium' phrase is what licenses the Cr₂O₇²⁻ half-equation that reveals it.")}

A['oxidation-and-reduction/04-neb-2024.json'] = {
0: ("**Rules:** (1) free element = 0; (2) monatomic ion = its charge; (3) O is usually −2 (peroxide −1, "
"OF₂ +2); (4) H is +1 with non-metals, −1 with metals; (5) F is always −1; (6) the sum of oxidation "
"numbers = the species' charge. **Mn in KMnO₄:** +1 (K) + Mn + 4(−2) = 0 ⟹ Mn = **+7**. "
"**Cr in K₂Cr₂O₇:** 2(+1) + 2Cr + 7(−2) = 0 ⟹ 2Cr = 12 ⟹ Cr = **+6**. "
"**Deep point:** rule (6) is the working engine — everything else is bookkeeping around it, and "
"KMnO₄/K₂Cr₂O₇ are the two stock examples because their +7/+6 states are what make them oxidants."),
1: ("**Reduction half:** MnO₄⁻ → Mn²⁺ — Mn +7 → +2, gain 5 e⁻; balance O with H₂O, H with H⁺: "
"**MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O**. "
"**Oxidation half:** Fe²⁺ → Fe³⁺ + e⁻ (loss of 1 e⁻). "
"**Combine:** multiply the Fe half by 5 (electrons = 5): "
"5Fe²⁺ → 5Fe³⁺ + 5e⁻. **Add and cancel electrons:** "
"**MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O**. "
"**Check:** charges: −1 +10 +8 = +17; right: +2 +15 = +17 ✓; atoms balanced. "
"**Deep point:** this is the titration backbone of permanganometry — one MnO₄⁻ oxidises five Fe²⁺, "
"and the 1:5 ratio is the number every KMnO₄/Fe²⁺ calculation runs on."),
2: ("**Oxidising agent:** the species that is itself **reduced** (gains electrons/causes oxidation). "
"**Reducing agent:** the species that is itself **oxidised** (loses electrons/causes reduction). "
"**In Zn + CuSO₄ → ZnSO₄ + Cu:** Zn goes 0 → +2 (loses electrons, is oxidised) ⟹ **Zn is the "
"reducing agent**; Cu²⁺ goes +2 → 0 (gains electrons, is reduced) ⟹ **Cu²⁺ (CuSO₄) is the oxidising "
"agent**. **Deep point:** the agent is named for the damage it does to the other species, not for "
"what happens to it — the oxidising agent is the one that gets reduced."),
3: ("**Electrochemical series:** the arrangement of elements (and their electrodes) in order of "
"**standard reduction potentials**, from strongest reducing agent (most negative E°, e.g. Li) to "
"strongest oxidising agent (most positive E°, e.g. F₂). A metal **displaces any metal below it** in "
"the series from its salt solution. **Why zinc displaces copper:** zinc stands **above** copper "
"(E°(Zn²⁺/Zn) = −0.76 V vs E°(Cu²⁺/Cu) = +0.34 V) — zinc is the stronger reducing agent, so it "
"donates electrons to Cu²⁺ ions spontaneously: Zn + Cu²⁺ → Zn²⁺ + Cu; the cell potential "
"E° = 0.34 − (−0.76) = **+1.10 V > 0**, confirming the reaction is feasible. Copper cannot do the "
"reverse (E° would be negative). **Deep point:** displacement is potential arithmetic — a positive "
"E°cell is the series' verdict written in volts."),
4: ("H₂O₂'s oxygen is at **−1** — intermediate between O₂ (0) and oxide (−2) — so it can be reduced to "
"−2 (**oxidising agent**) or oxidised to 0 (**reducing agent**). "
"**As oxidising agent (O: −1 → −2):** H₂O₂ + 2Fe²⁺ + 2H⁺ → 2Fe³⁺ + 2H₂O "
"(or 2KI + H₂O₂ + H₂SO₄ → I₂ + K₂SO₄ + 2H₂O). "
"**As reducing agent (O: −1 → 0):** H₂O₂ + Cl₂ → 2HCl + O₂ "
"(or 2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → K₂SO₄ + 2MnSO₄ + 8H₂O + 5O₂). "
"**Deep point:** the intermediate oxidation state is the licence for both roles — the same −1 oxygen "
"can fall or rise, and the two half-equations are the two directions of that walk."),
5: ("**Fluorine is the strongest oxidising halogen because:** (1) it has the **most positive standard "
"reduction potential** (E°(F₂/F⁻) = +2.87 V) — the F₂ molecule's weak F–F bond (small atoms, strong "
"lone-pair repulsion) makes it easy to split, and the tiny F⁻ ion formed is **strongly hydrated**, "
"releasing large hydration energy; (2) **high electronegativity and small size** give fluorine the "
"greatest pull on electrons; (3) the **low bond dissociation energy** of F₂ (158 kJ/mol vs Cl₂ "
"242) means less energy is spent breaking the molecule for every electron gained. Down the group "
"(F > Cl > Br > I) the atoms grow larger and less electronegative, so oxidising power falls "
"regularly. **Deep point:** the anomaly worth quoting is F₂'s *weak* bond — the small atom's lone "
"pairs repel so hard that the molecule splits easily, which is the counter-intuitive half of the "
"answer.")}

A['states-of-matter/01-neb-2023.json'] = {0: (
"**Boyle's law:** at constant temperature, the volume of a fixed mass of gas is **inversely "
"proportional to its pressure**: V ∝ 1/P (T, n fixed) ⟹ PV = constant. "
"**Charles's law:** at constant pressure, the volume of a fixed mass of gas is **directly "
"proportional to its absolute temperature**: V ∝ T (P, n fixed) ⟹ V/T = constant. "
"**Deriving PV = nRT:** start with Boyle: V ∝ 1/P. Add Charles: V ∝ T. Add Avogadro: V ∝ n. "
"Combining all three: V ∝ nT/P ⟹ **V = constant × nT/P**, where the constant is universal (R): "
"**PV = nRT**. (Equivalently: from Boyle PV = k₁; from Charles V = k₂T; combining for a fixed n gives "
"PV/T = constant for any state change of a fixed gas, and normalising to 1 mole at STP fixes the "
"constant as R = 8.314 J K⁻¹ mol⁻¹.) **Deep point:** the ideal gas equation is the three laws sharing "
"one proportionality — each law holds two variables fixed, and the equation is what happens when "
"nothing is fixed.")}

A['states-of-matter/02-neb-2021.json'] = {0: (
"**Charles's law (constant P):** V₁/T₁ = V₂/T₂, with temperatures in kelvin. "
"**Convert:** T₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K. "
"**Solve:** V₂ = V₁ × T₂/T₁ = 500 × 400/300 = **666.7 cm³ ≈ 667 cm³**. "
"**Deep point:** the only trap in the question is the temperature scale — 27 °C and 127 °C differ by "
"100 °C but by 4/3 in kelvin; every gas-law arithmetic starts with +273.")}

A['states-of-matter/03-neb-2024.json'] = {
0: ("**Boyle's law:** at constant T (and n), V ∝ 1/P ⟹ PV = constant. **Charles's law:** at constant "
"P (and n), V ∝ T (kelvin) ⟹ V/T = constant. **Derivation:** combining the proportionalities with "
"Avogadro's (V ∝ n): V ∝ nT/P. Writing the proportionality as the universal gas constant R "
"(8.314 J K⁻¹ mol⁻¹) gives **PV = nRT** — which reduces to Boyle's law (PV = const at n, T fixed), "
"Charles's law (V/T = const at n, P fixed) and Avogadro's law (V/n = const at T, P fixed). "
"**Deep point:** one equation, three special cases — the derivation's logic is that each named law "
"is the ideal gas equation with two of the four variables frozen."),
1: ("**Graham's law:** the rate of diffusion of a gas is **inversely proportional to the square root of "
"its density/molar mass**: r ∝ 1/√M, so r₁/r₂ = √(M₂/M₁). "
"**Apply:** r(H₂)/r(unknown) = 4 = √(M_unknown/M_H₂) = √(M/2). "
"**Solve:** square both sides: 16 = M/2 ⟹ **M_unknown = 32 g/mol** — the gas is oxygen (O₂). "
"**Deep point:** the squaring step is where the factor of 4 becomes 16 — forgetting it is the one "
"way to lose this question."),
2: ("**Dalton's law of partial pressures:** the total pressure of a mixture of non-reacting gases is "
"the **sum of the partial pressures** each gas would exert alone in the same volume at the same "
"temperature: P_total = p₁ + p₂ + p₃ + … (each partial pressure pᵢ = xᵢ P_total). "
"**Why aqueous tension is subtracted:** a gas collected **over water** is saturated with water vapour "
"— the bubbles contain both the gas and water vapour, and the vapour contributes its own pressure "
"(the **aqueous tension**, which depends only on temperature). The dry gas's true pressure is "
"therefore P_gas = P_atm − aqueous tension; only after this subtraction can P V = nRT give the gas's "
"actual number of moles. **Deep point:** the collected 'sample' is a mixture, and Dalton's law is "
"precisely the tool that says so — subtracting aqueous tension is Dalton's law applied to the "
"eudiometer."),
3: ("**Postulates of the kinetic molecular theory:** (1) gases consist of a very large number of tiny "
"particles (molecules) in **continuous random motion**; (2) the volume of the molecules themselves is "
"**negligible** compared with the container's volume (most of a gas is empty space); (3) molecules "
"exert **no attractive/repulsive forces** on one another between collisions; (4) **collisions are "
"perfectly elastic** — total kinetic energy is conserved; (5) the **average kinetic energy of the "
"molecules is proportional to the absolute temperature** (KE ∝ T); (6) pressure arises from molecules "
"**colliding with the container walls**, transferring momentum. **Deep point:** postulates (2) and "
"(3) are exactly what real molecules violate at high pressure and low temperature — which is why "
"they are precisely the two corrections van der Waals' equation adds."),
4: ("**Conditions of maximum deviation:** **high pressure and low temperature.** "
"**Explanation via van der Waals' equation:** (P + a n²/V²)(V − nb) = nRT. The two correction terms "
"are the two failed postulates: **nb** corrects for molecular volume (postulate 2) — at **high "
"pressure** the molecules are pushed close together, so their own volume is no longer negligible "
"compared with V; **a n²/V²** corrects for intermolecular attraction (postulate 3) — at **low "
"temperature** the molecules move slowly enough for attractive forces to matter, pulling them "
"together and making the observed pressure lower than ideal. Both corrections are negligible in the "
"ideal regime (low P, high T) and both become dominant together at **high P, low T** — near "
"condensation the deviation is largest and the gas liquefies. **Deep point:** the two correction "
"terms are the kinetic theory's failed postulates written as algebra — read the equation as a list "
"of apologies and the conditions of deviation fall out."),
5: ("**Boyle's law (isothermal, fixed n):** P₁V₁ = P₂V₂. "
"**Solve:** V₂ = P₁V₁/P₂ = (3 atm × 2 L)/1 atm = **6 L**. "
"**Check:** quartering the pressure doubles... — here pressure falls by a factor of 3, so volume "
"triples: 2 L → 6 L ✓. **Deep point:** the inverse check is the fastest error-catcher — pressure "
"divided by 3, volume multiplied by 3, and the arithmetic confirms what the intuition already "
"knows.")}

A['stoichiometry/01-neb-2023.json'] = {
0: ("**Mole concept:** the mole is the amount of substance containing **6.022 × 10²³ (Avogadro's "
"number)** elementary entities — the number of atoms in exactly 12 g of carbon-12; it converts "
"between mass (grams), number of particles, and (for gases) volume. "
"**Molecules in 36 g of water:** molar mass H₂O = 18 g/mol ⟹ n = 36/18 = 2 mol. "
"N = n × N_A = 2 × 6.022 × 10²³ = **1.2044 × 10²⁴ molecules**. "
"**Deep point:** the two-step bridge grams → moles → particles is the whole of formula-based "
"stoichiometry, and 36 g of water being exactly 2 mol is the question's built-in kindness."),
1: ("**Equation:** 2Mg + O₂ → 2MgO. **Moles:** Mg = 4.8/24 = 0.2 mol; O₂ = 6.4/32 = 0.2 mol. "
"**Stoichiometric requirement:** 2 mol Mg needs 1 mol O₂ ⟹ 0.2 mol Mg needs **0.1 mol O₂**. "
"Available O₂ = 0.2 mol > 0.1 ⟹ **O₂ is in excess; Mg is the limiting reactant.** "
"**Product:** 2 mol Mg → 2 mol MgO ⟹ 0.2 mol Mg gives 0.2 mol MgO = 0.2 × 40 = **8.0 g MgO**. "
"(Leftover O₂: 0.1 mol = 3.2 g.) **Deep point:** the limiting-reactant test is always 'moles "
"available vs moles required' — comparing 0.2 with 0.2 is the trap; comparing 0.2 Mg against the "
"0.1 O₂ it *needs* is the answer.")}

A['stoichiometry/02-neb-2022.json'] = {0: (
"**Take 100 g of compound:** C 40 g, H 6.67 g, O 53.33 g. "
"**Moles:** C = 40/12 = 3.33; H = 6.67/1 = 6.67; O = 53.33/16 = 3.33. "
"**Divide by the smallest (3.33):** C = 1; H = 2; O = 1. "
"**Empirical formula: CH₂O.** (Molar mass 30 — consistent with formaldehyde; if M = 180, the "
"molecular formula would be C₆H₁₂O₆.) **Deep point:** the method is fixed — percentage → grams "
"(assume 100 g) → moles → divide by smallest — and the 'divide by smallest' step is where the "
"subscripts are born.")}

A['stoichiometry/03-neb-2020.json'] = {0: (
"**Assume 100 g:** C 40.0 g, H 6.7 g, O 53.3 g. "
"**Moles:** C = 40.0/12 = 3.33; H = 6.7/1 = 6.7; O = 53.3/16 = 3.33. "
"**Divide by smallest (3.33):** C = 1.0; H = 2.0; O = 1.0. "
"**Empirical formula: CH₂O.** (With molar mass 180 the molecular formula is C₆H₁₂O₆ — glucose.) "
"**Deep point:** the H division (6.7/3.33 ≈ 2.0) is where rounding discipline matters — empirical "
"ratios are integers only after the arithmetic, not before.")}

A['stoichiometry/04-neb-2024.json'] = {
0: ("**Mole concept:** the amount of substance containing 6.022 × 10²³ elementary entities — defined "
"as the number of atoms in exactly 12 g of carbon-12; it links mass, particle count and gas volume. "
"**Molecules in 36 g of water:** n = 36/18 = 2 mol ⟹ N = 2 × 6.022 × 10²³ = "
"**1.2044 × 10²⁴ molecules**. **Deep point:** grams → moles → particles; the mole is the only "
"currency both a balance and an Avogadro counter accept."),
1: ("**Assume 100 g:** C 40 g, H 6.67 g, O 53.33 g. **Moles:** C = 3.33; H = 6.67; O = 3.33. "
"**Divide by smallest:** C 1 : H 2 : O 1 ⟹ **empirical formula CH₂O**. "
"**Deep point:** percentage → grams (100 g assumed) → moles → divide by smallest — four steps, one "
"formula."),
2: ("**Equation:** 2H₂ + O₂ → 2H₂O. **Moles:** H₂ = 10/2 = 5 mol; O₂ = 64/32 = 2 mol. "
"**Requirement:** 5 mol H₂ needs 2.5 mol O₂, but only 2 mol is available ⟹ **O₂ is the limiting "
"reagent** (H₂ is in excess: 5 mol H₂ > 4 mol needed for 2 mol O₂). "
"**Water formed:** 1 mol O₂ → 2 mol H₂O ⟹ 2 mol O₂ → 4 mol H₂O = 4 × 18 = **72 g of water**. "
"**Deep point:** the check runs both ways — whichever reagent's requirement exceeds its supply is "
"the limiting one, and the product is always computed from the limiting reagent's moles, never the "
"excess's."),
3: ("**Moles of NaOH:** n = 4 g / 40 g/mol = 0.1 mol. **Volume:** 250 mL = 0.250 L. "
"**Molarity:** M = n/V = 0.1/0.250 = **0.4 M**. "
"**Deep point:** the litre conversion is the whole question — 250 mL is 0.25 L, and molarity is "
"mol per litre, not per 100 mL; 0.1 mol in 250 mL is 0.4 M because four 250 mL portions make a litre."),
4: ("**Empirical formula mass:** CH₂O = 12 + 2 + 16 = 30 g/mol. "
"**Multiplier:** n = molar mass / empirical mass = 180/30 = 6. "
"**Molecular formula: (CH₂O)₆ = C₆H₁₂O₆** (glucose). "
"**Deep point:** the molecular formula is always a whole-number multiple of the empirical one, and "
"the molar mass ÷ empirical mass quotient is that multiple — 6 here, never a fraction."),
5: ("**Percentage yield = (actual yield / theoretical yield) × 100** "
"= (40/50) × 100 = **80%**. "
"**Deep point:** the definition carries the answer — 'theoretical' is what the limiting reagent "
"promised, 'actual' is what the flask delivered, and the ratio is the experiment's honesty "
"score.")}

def main():
    for key, ans in A.items():
        f = 'content/practice/questions/class-11/chemistry/' + key
        d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
        qs = d if isinstance(d, list) else d.get('questions', [])
        for i, text in ans.items():
            assert i < len(qs), (key, i)
            assert not (qs[i].get('answer') or '').strip(), (key, i)
            qs[i]['answer'] = text
        assert all((q.get('answer') or '').strip() for q in qs), key
        open(f, 'w', encoding='utf-8-sig', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
        print('filled', key, f'({len(ans)} answers, {len(qs)} questions)')

main()
