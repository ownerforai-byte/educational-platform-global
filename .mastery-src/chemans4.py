#!/usr/bin/env python
# Populate PYQ answers - chemistry batch 4: foundation, fundamental-principles, hydrocarbons, manufactures
import json

A = {}

A['foundation-and-fundamentals/01-neb-2023.json'] = {0: (
"**Mass = density × volume:** m = 0.8792 g/cm³ × 45.6 cm³ = 40.09152 g. "
"**Significant figures:** the volume (45.6) has 3 sig figs, the density 4 — the answer takes the "
"**fewer: 3 sig figs** ⟹ **m = 40.1 g**. **Deep point:** the multiplication rule is 'fewest sig figs "
"wins' — the calculator's eight digits are a lie about the measurement's precision, and 40.1 g is the "
"honest answer.")}

A['foundation-and-fundamentals/02-neb-2022.json'] = {0: (
"**Answer: (b) mole.** The mole is the SI base unit for **amount of substance** — defined as exactly "
"6.02214076 × 10²³ elementary entities (Avogadro's number). Gram and kilogram measure **mass**; the "
"millimole is a derived submultiple, not a base unit. **Deep point:** 'amount of substance' counts "
"particles, not mass — one mole of H₂ and one mole of O₂ have the same number of molecules and very "
"different masses, which is the whole point of the unit.")}

A['foundation-and-fundamentals/03-neb-2021.json'] = {0: (
"**Mean value:** (10.4 + 10.6)/2 = **10.5 cm**. "
"**Absolute error of each reading:** |10.4 − 10.5| = 0.1 cm; |10.6 − 10.5| = 0.1 cm ⟹ mean absolute "
"error = **±0.1 cm**. **Result:** length = 10.5 ± 0.1 cm. **Comment on precision:** the two readings "
"agree within ±0.1 cm (≈±1%), so the data are **reasonably precise and self-consistent** — the "
"readings scatter by about the limit of a normal cm-scale's estimation (0.1 cm), suggesting no "
"systematic error but a measurement uncertainty of one decimal place. Reporting beyond 0.1 cm "
"(e.g. 10.50 cm) would overstate the precision. **Deep point:** the error bar is part of the "
"measurement — a length quoted without its ± is a claim, not a measurement.")}

A['foundation-and-fundamentals/04-neb-2024.json'] = {
0: ("**Dalton's atomic theory:** (1) matter consists of tiny indivisible particles called **atoms**; "
"(2) atoms of a given element are **identical** in mass and properties; (3) atoms of different "
"elements differ in mass and properties; (4) compounds form when atoms **combine in small whole-number "
"ratios**; (5) atoms are **neither created nor destroyed** in chemical reactions — only rearranged. "
"**Two drawbacks:** (1) atoms **are divisible** — they contain subatomic particles (electrons, "
"protons, neutrons); (2) atoms of the same element are **not all identical** — isotopes differ in "
"mass. (Also: his theory could not explain why atoms bond, and treated matter as purely particulate, "
"ignoring the wave nature later revealed.) **Deep point:** the theory's five postulates are right "
"about combination ratios and conservation — its failures are precisely the two discoveries of the "
"next century, the electron and the isotope."),
1: ("**Law of multiple proportions:** when two elements combine to form **more than one compound**, the "
"masses of one element that combine with a **fixed mass** of the other are in a ratio of **small "
"whole numbers**. **Carbon oxides:** in CO, 16 g of oxygen combines with 12 g of carbon; in CO₂, "
"32 g of oxygen combines with 12 g of carbon. **With carbon fixed at 12 g, the oxygen masses are "
"16 : 32 = 1 : 2** — a small whole-number ratio, exactly as the law requires (the extra oxygen in "
"CO₂ is exactly double). **Deep point:** the law is the chemical evidence for atoms — whole-number "
"ratios are what discrete, identical particles must produce."),
2: ("**Avogadro's law:** equal volumes of all gases, at the same temperature and pressure, contain "
"**equal numbers of molecules** (V ∝ n at fixed T, P). **Two applications:** (1) **molar volume** — "
"one mole of any ideal gas occupies 22.4 L at STP, the bridge between gas volume and moles in every "
"stoichiometric calculation; (2) **deducing molecular formulae** — combining Gay-Lussac's law of "
"gaseous volumes with Avogadro's law proved that hydrogen, oxygen, nitrogen etc. are **diatomic "
"molecules** (e.g. 1 volume H₂ + 1 volume Cl₂ → 2 volumes HCl forces H₂ and Cl₂ to contain 2 atoms "
"each), settling the atomic-mass scale. **Deep point:** the law is why chemistry can count by "
"measuring volume — for gases, the measuring cylinder is a particle counter."),
3: ("**Moles of Fe:** n = m/M = 5.6 g / 56 g/mol = 0.1 mol. "
"**Atoms:** N = n × N_A = 0.1 × 6.022 × 10²³ = **6.022 × 10²² atoms**. "
"**Deep point:** the two-step bridge — grams → moles → particles — is the single most-used chain in "
"chemistry; the mole ratio (0.1) is the number worth checking before touching the exponent."),
4: ("**Molar mass of urea:** CO(NH₂)₂ = 12 + 16 + 2(14 + 2×1) = 12 + 16 + 32 = **60 g/mol**. "
"**Mass of N per mole:** 2 × 14 = 28 g. "
"**Percentage:** %N = (28/60) × 100 = **46.67% ≈ 46.7%**. "
"**Deep point:** the 46% figure is why urea rules the fertiliser market — every stoichiometry here is "
"an economics argument in disguise."),
5: ("**Gay-Lussac's law of gaseous volumes:** when gases react (or are produced) at the same temperature "
"and pressure, the **volumes of the gaseous reactants and products are in simple whole-number "
"ratios**. **Example:** 1 volume of hydrogen + 1 volume of chlorine → 2 volumes of hydrogen chloride "
"(H₂ + Cl₂ → 2HCl) — the ratio 1 : 1 : 2; similarly 2 volumes H₂ + 1 volume O₂ → 2 volumes steam "
"(2H₂ + O₂ → 2H₂O). **Deep point:** the law is Avogadro's law's experimental half — simple volume "
"ratios are only possible because equal volumes hold equal numbers of molecules.")}

A['fundamental-principles-of-organic-chemistry/01-neb-2024.json'] = {0: (
"CH₃CH(OH)CH₂CH₃ — the OH is the principal group, so numbering starts from the nearest end to it: "
"C-1 = CH₃, C-2 = CH(OH), C-3 = CH₂, C-4 = CH₃ ⟹ parent **butane**, OH at **C-2**. "
"**IUPAC name: butan-2-ol** (sec-butyl alcohol). **Deep point:** both ends are CH₃, so the tie is "
"broken by the functional group's locant — numbering from the right would put OH at C-3, which is "
"why the OH end wins.")}

A['fundamental-principles-of-organic-chemistry/02-neb-2023.json'] = {0: (
"**Resonance:** the representation of a single real molecule by two or more Lewis structures "
"(**contributing structures**) that differ only in π-electron/lone-pair placement — nuclei never "
"move. The real molecule is the **resonance hybrid**, more stable (by the resonance energy) than any "
"single structure. **Ozone, O₃:** two structures — O=O–O (with a positive charge on the singly-bonded "
"terminal O) and ⁻O–O=O (mirror image); the hybrid has two **equal O–O bonds of 128 pm**, between "
"single (148 pm) and double (121 pm) lengths, and a bent shape (≈117°). **Benzene, C₆H₆:** the two "
"**Kekulé structures** with three alternating C=C bonds, related by shifting the π bonds one position "
"around the ring; the hybrid has **six equal C–C bonds of 139 pm** and the ~152 kJ/mol resonance "
"energy that makes it aromatic. **Deep point:** the measured bond lengths are the experiment's "
"verdict on resonance — 128 pm and 139 pm are exactly the numbers 'between' predicts, and no single "
"drawn structure could give them.")}

A['hydrocarbons/01-neb-2023.json'] = {0: (
"**Reaction:** ethene adds hydrogen across the double bond in the presence of a nickel catalyst: "
"CH₂=CH₂ + H₂ --(Ni, ~150–200 °C)--> CH₃–CH₃ (ethane). (Lab-scale alternative: catalytic Pd/Pt at "
"room temperature.) **Mechanism (surface catalysis):** (1) **adsorption** — H₂ molecules adsorb onto "
"the nickel surface and the H–H bond is split by the metal into surface-bound H atoms (the metal "
"dissociates what heat alone barely touches); (2) ethene adsorbs **π-side down** onto the surface, "
"weakening its π bond; (3) the two surface H atoms add **one to each carbon** (syn addition, both "
"from the metal face); (4) **desorption** — the product ethane, having no π bond to hold it, leaves "
"the surface, freeing the catalyst for the next molecule. The catalyst's role is to lower the "
"activation energy by providing a surface where both reactants are activated simultaneously. "
"**Deep point:** heterogeneous catalysis is adsorption chemistry — the metal's whole job is to break "
"H₂ into atoms and hold the alkene still while they find it.")}

A['hydrocarbons/02-neb-2022.json'] = {0: (
"**Ozonolysis of but-2-ene (CH₃–CH=CH–CH₃):** ozone adds across the double bond to give the molozonide, "
"which rearranges to the ozonide; the reductive workup with **zinc and water** cleaves the C=C "
"completely, with each carbon of the double bond becoming a **carbonyl**: "
"CH₃–CH=CH–CH₃ + O₃ + H₂O --(Zn)--> **2 CH₃CHO** (ethanal, acetaldehyde) + ZnO (+ H₂O₂ consumed by Zn). "
"**Identification:** the products are **two molecules of ethanal** — identical, because but-2-ene is "
"symmetrical. The Zn prevents over-oxidation of the aldehyde to acid (which oxidative workup H₂O₂ "
"would give, yielding ethanoic acid instead). **Deep point:** ozonolysis is the double bond's "
"dissection — the products' carbonyl carbons mark exactly where the C=C used to be, which is why the "
"reaction is the classical tool for locating double bonds in unknown alkenes.")}

A['hydrocarbons/03-neb-2020.json'] = {0: (
"**Free-radical chain mechanism (CH₄ + Cl₂ --UV--> CH₃Cl + HCl, then further substitution):** "
"**Step 1 — initiation:** UV light homolyses Cl₂: Cl₂ --hν--> 2Cl• (two chlorine radicals). "
"**Step 2 — propagation:** (a) Cl• abstracts H from methane: Cl• + CH₄ → HCl + •CH₃; "
"(b) the methyl radical attacks Cl₂: •CH₃ + Cl₂ → CH₃Cl + Cl• — the radical regenerated in (b) feeds "
"step (a), so the chain continues thousands of cycles per initiation event. "
"**Step 3 — termination:** radicals combine and the chain dies: Cl• + Cl• → Cl₂; •CH₃ + •CH₃ → "
"CH₃–CH₃ (ethane by-product); •CH₃ + Cl• → CH₃Cl. "
"**Why a mixture:** the product CH₃Cl is itself chlorinatable — Cl• abstracts its H too, giving "
"CH₂Cl₂, then CHCl₃, then CCl₄; the reaction cannot 'stop' at monochloride because every product "
"still has C–H bonds and the same radical machinery keeps working ⟹ a mixture of CH₃Cl, CH₂Cl₂, "
"CHCl₃ and CCl₄ (plus ethane) results. Excess methane suppresses over-chlorination. "
"**Deep point:** radical substitution is a chain reaction with no memory — each product re-enters as "
"a substrate, and the mixture is the thermodynamic signature of a mechanism that cannot count.")}

A['hydrocarbons/04-neb-2024.json'] = {
0: ("**Reaction:** CH₂=CH₂ + H₂ --(Ni, ~150–200 °C)--> CH₃–CH₃. **Mechanism (surface catalysis):** "
"(1) H₂ **adsorbs** on the nickel surface and dissociates into surface H atoms; (2) ethene adsorbs "
"π-side down, its π bond weakened; (3) the two H atoms add **syn** (one to each carbon, from the "
"metal face); (4) the saturated ethane **desorbs**, freeing the site. The catalyst lowers the "
"activation energy by activating both reactants on one surface. **Deep point:** heterogeneous "
"hydrogenation is adsorption chemistry — the metal splits H₂ so the alkene never has to."),
1: ("**Markovnikov's rule:** when an unsymmetrical reagent (HX) adds to an unsymmetrical alkene, the "
"**hydrogen attaches to the carbon that already carries more hydrogens** ('the rich get richer'), so "
"the halogen goes to the more substituted carbon — the rule's real basis is that addition proceeds "
"via the **more stable carbocation**. **Applied to propene + HBr:** CH₃–CH=CH₂ + HBr — H adds to the "
"terminal CH₂ (which has 2 H), leaving the carbocation on the middle carbon (secondary, more stable "
"than primary): CH₃–CH⁺–CH₃; Br⁻ then attacks ⟹ **CH₃–CHBr–CH₃ (2-bromopropane, isopropyl bromide)** "
"is the major product, not 1-bromopropane. **Deep point:** the rule is a shortcut for a stability "
"argument — name the carbocation and the regiochemistry explains itself (and peroxide effects "
"invert it precisely because the radical mechanism ranks stabilities differently)."),
2: ("**Wurtz reaction:** an alkyl halide reacts with sodium in dry ether, coupling two alkyl groups: "
"2CH₃CH₂Br? — for **ethane**: 2CH₃Br + 2Na --(dry ether)--> **CH₃–CH₃** + 2NaBr "
"(or 2CH₃Cl + 2Na → C₂H₆ + 2NaCl). The mechanism is radical/metal-organic (R• or RNa intermediates) "
"and works best for making symmetrical higher alkanes. **Deep point:** the Wurtz reaction doubles — "
"it always builds the C–C bond between two identical halides cleanly, and mixed halides give "
"statistical mixtures, which is its practical limitation."),
3: ("**Ozonolysis of ethene:** CH₂=CH₂ + O₃ → ozonide --(Zn/H₂O)--> **2 HCHO (methanol→formaldehyde, "
"i.e. methanal)** + H₂O₂ (consumed by Zn). Each carbon of the double bond becomes a carbonyl; since "
"each ethene carbon carries two hydrogens, each gives **methanal (formaldehyde, HCHO)**. "
"**Deep point:** the products' identity confirms the rule — a =CH₂ end always yields HCHO, which is "
"how ozonolysis diagnoses terminal double bonds."),
4: ("**Why acetylene (ethyne) is acidic:** the ≡C–H bond involves an **sp-hybridised carbon** — 50% "
"s-character, which holds the electrons closer to the nucleus and makes the carbon effectively more "
"electronegative; the C–H bond is therefore more polarised (Cδ⁻–Hδ⁺) than in sp² (ethene) or sp³ "
"(ethane) carbons, and the H can be released as a proton to a strong base: "
"HC≡CH + 2Na --(liquid NH₃)--> **NaC≡CNa (disodium acetylide)** + H₂; or "
"HC≡CH + NaNH₂ → HC≡CNa + NH₃. **Chemical test:** pass ethyne through **ammoniacal silver nitrate** "
"— a white precipitate of **silver acetylide (Ag₂C₂)** forms: HC≡CH + 2[Ag(NH₃)₂]⁺ + 2OH⁻ → "
"AgC≡CAg↓ + 2NH₄⁺ + 2H₂O (ammoniacal CuCl gives the red Cu₂C₂). Ethene and ethane give no "
"precipitate. **Deep point:** acidity in hydrocarbons is hybridisation in disguise — the s-character "
"ladder sp > sp² > sp³ is why only terminal alkynes form acetylides, and the precipitate tests are "
"that ladder made visible."),
5: ("**Bromine water test:** add bromine water (red-brown) to each gas/liquid in turn. "
"**Ethane (alkane):** no reaction in the dark — the red colour persists (saturated; substitution "
"needs UV light, not bromine water). **Ethene (alkene):** decolourises rapidly — adds Br₂ across the "
"double bond to give 1,2-dibromoethane (colourless). **Ethyne (alkyne):** also decolourises — adds "
"Br₂ (up to two equivalents, tetrabromoethane). **So bromine water alone separates ethane from the "
"unsaturated pair but NOT ethene from ethyne** — for that, use the **ammoniacal AgNO₃ test**: ethyne "
"gives a white Ag₂C₂ precipitate, ethene nothing. **Deep point:** the question's trap is that two "
"unsaturations look identical to one — the acetylide test is the tiebreaker the answer must name.")}

A['modern-chemical-manufactures/01-neb-2024.json'] = {0: (
"**The process:** nitrogen (from fractional distillation of liquid air) and hydrogen (steam reforming "
"of natural gas: CH₄ + H₂O → CO + 3H₂, then CO + H₂O → CO₂ + H₂ with CO₂ removed) are purified and "
"compressed to **200–300 atm** and passed over a **finely divided iron catalyst (promoted with "
"K₂O/Al₂O₃)** at **450–500 °C**: N₂ + 3H₂ ⇌ 2NH₃ + 92 kJ. Exit gases are cooled — ammonia (bp "
"−33 °C) liquefies in the condenser and is drawn off; unreacted N₂/H₂ are **recycled**, raising "
"overall conversion from ~15% per pass to ~97%. **Why high pressure (three layers):** (1) "
"**equilibrium** — 4 mol gas → 2 mol, so Le Chatelier shifts toward ammonia as pressure rises; "
"(2) **rate** — higher pressure increases collision frequency on the catalyst, speeding the slow N₂ "
"activation; (3) **separation** — high pressure raises NH₃'s dew point so the condenser works "
"efficiently. **Deep point:** the three justifications are independent — a complete answer names all "
"three and draws the recycle arrow.")}

A['modern-chemical-manufactures/02-neb-2023.json'] = {0: (
"**Hard water:** water that does not easily lather with soap because of dissolved **calcium and "
"magnesium salts** — the Ca²⁺/Mg²⁺ react with soap to form insoluble scum "
"(2C₁₇H₃₅COO⁻Na⁺ + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓ + 2Na⁺), wasting soap. **Temporary hardness** = dissolved "
"bicarbonates Ca(HCO₃)₂/Mg(HCO₃)₂ (removed by boiling); **permanent hardness** = dissolved "
"chlorides/sulphates (boiling will not remove it). **Removal with washing soda (Na₂CO₃·10H₂O)** — "
"it removes **both** kinds, because carbonate precipitates the Ca²⁺/Mg²⁺ ions whichever salt they "
"came from: "
"**Temporary:** Ca(HCO₃)₂ + Na₂CO₃ → **CaCO₃↓** + 2NaHCO₃ (and Mg(HCO₃)₂ + Na₂CO₃ → MgCO₃↓ + "
"2NaHCO₃). **Permanent:** CaCl₂ + Na₂CO₃ → **CaCO₃↓** + 2NaCl; CaSO₄ + Na₂CO₃ → CaCO₃↓ + Na₂SO₄ "
"(similarly Mg²⁺ → MgCO₃↓). With the hardness ions gone as insoluble carbonates, the water lathers "
"freely. (Boiling removes only temporary hardness: Ca(HCO₃)₂ --Δ--> CaCO₃↓ + H₂O + CO₂.) "
"**Deep point:** washing soda's power is ion-removal, not salt-removal — it does not care which "
"anion brought the Ca²⁺ in, which is why one reagent cures both hardnesses.")}

A['modern-chemical-manufactures/03-neb-2022.json'] = {
0: ("**The Contact process** makes sulphuric acid by catalytic oxidation of SO₂ over V₂O₅. "
"**Key reactions and conditions:** (1) S + O₂ → SO₂ (or 4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂); (2) gas "
"purification (dust chamber, scrubber, drying tower, arsenic remover) to protect the catalyst from "
"poisoning; (3) **2SO₂ + O₂ ⇌ 2SO₃ + 196 kJ over V₂O₅ at ~450 °C, 1–2 atm**, excess air — ~99% "
"conversion, so no added pressure is needed; (4) SO₃ absorbed in **98% H₂SO₄** to oleum "
"(H₂SO₄ + SO₃ → H₂S₂O₇), then diluted: H₂S₂O₇ + H₂O → 2H₂SO₄. **Deep point:** the two design "
"decisions — low pressure (the equilibrium is already nearly complete) and oleum absorption (water "
"would give an uncondensable acid fog) — are where the marks concentrate."),
1: ("**The Solvay (ammonia–soda) process** makes Na₂CO₃ from brine and limestone with recycled "
"ammonia. **Step 1:** ammoniated brine is carbonated with kiln CO₂: NH₃ + CO₂ + H₂O → NH₄HCO₃. "
"**Step 2:** the sparingly soluble bicarbonate precipitates: NH₄HCO₃ + NaCl → NaHCO₃↓ + NH₄Cl. "
"**Step 3:** calcination: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂ (CO₂ recycled to step 1). "
"**Step 4:** ammonia recovery with lime (from CaCO₃ → CaO + CO₂): "
"2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃↑ + 2H₂O. **Net:** 2NaCl + CaCO₃ → Na₂CO₃ + CaCl₂. "
"**Deep point:** ammonia enters every step and vanishes from the net equation — the recycled carrier "
"is the process's whole economy, and the NaHCO₃ precipitation is selectivity by solubility, not "
"reaction.")}

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
