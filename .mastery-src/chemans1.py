#!/usr/bin/env python
# Populate PYQ answers - chemistry batch 1: applied-chemistry, aromatic-hydrocarbons
import json

A = {}

A['applied-chemistry/01-neb-2023.json'] = {
0: ("Black-and-white photography is a redox process on a silver-halide emulsion. **Exposure:** the plate/film "
"carries AgBr grains suspended in gelatin. Light falling on a grain excites Br⁻ ions and reduces a few "
"Ag⁺ ions to metallic silver atoms — AgBr --hν--> Ag + 1/2Br₂ (roughly Ag⁺ + e⁻ → Ag). These few silver "
"atoms form the **latent image** — invisible, but marking the exposed grains as reducible. "
"**Development:** the film is bathed in a mild reducing developer (e.g. quinol/hydroquinone or "
"metol in alkaline solution), which reduces *exposed* grains far faster than unexposed ones, turning the "
"latent image into a visible black deposit of finely divided silver: C₆H₄(OH)₂ + 2AgBr → C₆H₄O₂ "
"(quinone) + 2Ag + 2HBr. A negative forms — dark where light struck. **Fixing:** unexposed AgBr must be "
"removed or it would blacken on further exposure. The fixer is sodium thiosulphate (hypo), which "
"dissolves AgBr by complexing the silver: AgBr + 2Na₂S₂O₃ → Na₃[Ag(S₂O₃)₂] + NaBr. The print is then "
"washed and dried. **Deep point:** the whole process is selectivity by reduction rate — exposed grains "
"reduce in seconds, unexposed grains in hours; the developer exploits that gap and the fixer removes "
"what the developer must not touch.")}

A['applied-chemistry/02-neb-2021.json'] = {
0: ("**Why alloys are harder:** a pure metal's atoms are uniform spheres in a regular lattice whose planes "
"slip easily past one another — that slip is metallic malleability, but also softness. In an alloy, "
"atoms of a different size (e.g. zinc or tin in copper) disturb the lattice: the slip planes become "
"irregular and dislocations are pinned, so deformation requires more force ⟹ the alloy is harder and "
"stronger than either pure component. **Brass:** copper + zinc, typically **60–90% Cu, 40–10% Zn** "
"(e.g. ~70% Cu / 30% Zn for cartridge brass). **Brass vs pure gold for ornaments and instruments:** "
"pure gold is very soft (it dents and wears away; pure 24-carat gold loses shape and polish on contact); "
"brass is hard, takes a high golden polish resembling gold, resists tarnishing and corrosion, machines "
"and casts well, and is far cheaper — so ornaments, musical instruments (trumpets, horns) and fittings "
"keep their shape and shine where pure gold would deform. **Deep point:** alloying is defect engineering "
"deliberately introduced into a lattice — the impurity that would be a flaw in a pure substance is the "
"design feature that gives the mixture its strength.")}

A['applied-chemistry/03-neb-2020.json'] = {
0: ("**Preparation:** plaster of Paris is prepared by gently heating **gypsum** (CaSO₄·2H₂O) to about "
"100–120 °C (393 K), removing three-quarters of its water of crystallisation: "
"CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O. The product is calcium sulphate hemihydrate — a white powder. "
"Overheating must be avoided: above ~200 °C it forms the anhydrous 'dead burnt' plaster which absorbs "
"water too slowly to set. **Setting:** when the powder is mixed with water it recombines to reform "
"gypsum as interlocking needle crystals, which bind the mass into a hard solid: "
"CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O. Slight expansion on setting makes it fill moulds sharply — the basis "
"of casts, moulds, surgical bandages and wall plaster. **Why not a permanent building material:** the "
"setting reaction is reversible — plaster of Paris is **soluble in water and absorbs moisture**, so "
"damp conditions rehydrate and soften it; it crumbles and loses strength in rain or humidity. "
"Permanent construction therefore uses the insoluble, hydraulically hardening **cement/lime** instead. "
"**Deep point:** the same hydration chemistry that makes PoP set in minutes (a medical blessing) makes "
"it fail in the rain (an architectural disqualification) — one equilibrium, two opposite verdicts.")}

A['applied-chemistry/03-neb-2024.json'] = {
0: ("**The process:** nitrogen (from fractional distillation of liquid air) and hydrogen (from steam "
"reforming of natural gas: CH₄ + H₂O → CO + 3H₂, then the shift reaction CO + H₂O → CO₂ + H₂ with CO₂ "
"removed) are purified (catalyst poisons removed), compressed to **200–300 atm**, and passed over a "
"**finely divided iron catalyst promoted with K₂O/Al₂O₃** at **450–500 °C**: "
"N₂ + 3H₂ ⇌ 2NH₃ + 92 kJ. Exit gases are cooled in a condenser — ammonia (bp −33 °C) liquefies and is "
"drawn off; unreacted N₂/H₂ are recompressed and **recycled**, lifting overall conversion from ~15% per "
"pass to ~97%. **Why high pressure (three layers):** (1) **equilibrium** — the forward step reduces 4 mol "
"of gas to 2 mol, so Le Chatelier's principle shifts the balance toward ammonia as pressure rises; "
"(2) **rate** — high pressure packs more molecules per volume, increasing collision frequency on the "
"catalyst and speeding the slow N₂ activation; (3) **separation** — high pressure raises ammonia's dew "
"point so the condenser liquefies it efficiently. **Deep point:** the three layers are independent — "
"even without the equilibrium argument, rate and condensation would still justify the pressure.")}

A['applied-chemistry/03-neb-2024.json'][1] = (
"**The Contact process** is the industrial manufacture of sulphuric acid by catalytic oxidation of SO₂ "
"to SO₃ over vanadium(V) oxide. **Key reactions and conditions:** (1) sulphur burned in dry air: "
"S + O₂ → SO₂ (or pyrite roasted: 4FeS₂ + 11O₂ → 2Fe₂O₃ + 8SO₂); (2) gas **purified** (dust chamber, "
"scrubber, drying tower, arsenic remover) because dust and arsenic **poison the catalyst**; (3) the "
"contact step: **2SO₂ + O₂ ⇌ 2SO₃ + 196 kJ over V₂O₅ at ~450 °C and 1–2 atm** with excess air — the "
"equilibrium is already ~99% converted, so higher pressure is not worth the cost; (4) SO₃ is absorbed "
"in **concentrated (98%) H₂SO₄**, not water, forming oleum: H₂SO₄ + SO₃ → H₂S₂O₇; the oleum is then "
"diluted: H₂S₂O₇ + H₂O → 2H₂SO₄ (98% acid). **Deep point:** two design decisions carry the marks — the "
"low pressure (the pressureless equilibrium already gives ~99%) and the oleum absorption (direct water "
"boils off an uncondensable acid fog).")

A['applied-chemistry/03-neb-2024.json'][2] = (
"**Step 1 — catalytic oxidation:** ammonia (about 10% in air, below the explosive limit) passes over a "
"**platinum–rhodium gauze at 800–900 °C** for a fraction of a second: 4NH₃ + 5O₂ → 4NO + 6H₂O. "
"**Step 2 — oxidation of NO:** the hot gas is **rapidly cooled** (waste-heat boilers) and treated with "
"more air in cooling/oxidation towers: 2NO + O₂ → 2NO₂ (brown gas). **Step 3 — absorption:** NO₂ with "
"excess air is absorbed in water in packed towers: 4NO₂ + O₂ + 2H₂O → 4HNO₃, giving ~50–60% acid, "
"concentrated by distillation toward the 68% azeotrope. **Deep point:** the process's elegance is its "
"temperature choreography — 900 °C to make NO, a rapid quench to freeze it (the NO/NO₂ equilibrium "
"favours NO at high temperature), then cool towers where oxidation and absorption complete the acid.")

A['applied-chemistry/03-neb-2024.json'][3] = (
"**Inputs:** brine (NaCl), limestone (CaCO₃), recycled ammonia. **Step 1:** brine is saturated with "
"ammonia and carbonated with kiln CO₂: NH₃ + CO₂ + H₂O → NH₄HCO₃. **Step 2:** the sparingly soluble "
"sodium bicarbonate precipitates: NH₄HCO₃ + NaCl → NaHCO₃↓ + NH₄Cl (filtered). **Step 3:** calcination "
"gives the soda and returns CO₂: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂. **Step 4:** ammonia is recovered from "
"the mother liquor with lime (from CaCO₃ → CaO + CO₂): 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃↑ + 2H₂O — the "
"NH₃ returns to step 1. **Net:** 2NaCl + CaCO₃ → Na₂CO₃ + CaCl₂. **Deep point:** ammonia appears in "
"every step yet vanishes from the net equation — it is the process's recycled carrier, and the "
"efficiency of its recovery tower decides the plant's economy.")

A['applied-chemistry/03-neb-2024.json'][4] = (
"**NPK fertilisers** are mixed fertilisers supplying the three primary nutrients in one product; the "
"grade numbers give the percentages of **N, P₂O₅-equivalent and K₂O-equivalent** (e.g. 15:15:15 "
"contains 15% of each). **Why urea leads:** (1) **highest nitrogen content** — 46% N (28/60), against "
"35% for ammonium nitrate and 21% for ammonium sulphate, so every tonne shipped carries the least "
"ballast; (2) **safe handling** — non-explosive and thermally stable, unlike ammonium nitrate; (3) "
"**cheap manufacture** from the two commodities of one integrated complex — Haber NH₃ and reformer CO₂ "
"(2NH₃ + CO₂ → NH₂COONH₄ → CO(NH₂)₂ + H₂O); (4) convenient solid prills and gradual soil release via "
"urease hydrolysis. **Deep point:** a fertiliser is a shipped commodity before it is a soil chemistry — "
"nutrient density plus the explosives problem decide the market long before agronomy is consulted.")

A['applied-chemistry/03-neb-2024.json'][5] = (
"**Manufacture:** limestone and clay are ground, blended and **calcined in a rotary kiln at "
"~1400–1500 °C**, where the mixture partly fuses into clinker (mainly calcium silicates, Ca₃SiO₅ and "
"Ca₂SiO₄, with some aluminate); the clinker is cooled and ground with **2–3% gypsum**, which controls "
"the setting time, giving Portland cement. **Setting:** when water is added, the silicates and "
"aluminates **hydrate** — the calcium silicates form interlocking fibres of calcium silicate hydrate "
"gel plus Ca(OH)₂, which grow through the mass and bind the aggregate; the paste hardens over days into "
"a stone-like solid. The reaction is exothermic, and the gypsum's role is to slow the otherwise "
"flash-setting aluminate phase so the concrete stays workable. **Deep point:** cement's value lies in a "
"controlled solid-state hydration rather than solution chemistry — and the stoichiometrically tiny "
"gypsum dose does an outsized job.")

A['aromatic-hydrocarbons/01-neb-2022.json'] = {
0: ("All three are electrophilic substitutions on the ring. **(a) Nitration:** concentrated HNO₃ + "
"concentrated H₂SO₄ at **50–60 °C** (below 60 °C to limit dinitration): C₆H₆ + HNO₃ --(conc. H₂SO₄, "
"50–60 °C)--> C₆H₅NO₂ + H₂O. The sulphuric acid generates the electrophile NO₂⁺ (nitronium ion). "
"**(b) Sulphonation:** benzene + **fuming sulphuric acid** (SO₃ in conc. H₂SO₄), gently warmed: "
"C₆H₆ + SO₃ --> C₆H₅SO₃H (benzene sulphonic acid); the electrophile is SO₃/HOSO₂⁺. **(c) Chlorination:** "
"benzene + Cl₂ in the presence of **anhydrous AlCl₃** (a Lewis-acid catalyst), dry conditions, room "
"temperature: C₆H₆ + Cl₂ --(anhyd. AlCl₃)--> C₆H₅Cl + HCl; the catalyst polarises Cl₂ to generate the "
"electrophilic chlorine (Cl⁺-like) species. In each case HCl/H₂O is eliminated and the ring's π system "
"is preserved. **Deep point:** one mechanism, three electrophiles — NO₂⁺, SO₃, and polarised Cl₂ — "
"which is why every benzene substitution answer starts with 'the electrophile is…'.")}

A['aromatic-hydrocarbons/02-neb-2021.json'] = {
0: ("**Resonance** is the representation of a single real molecule by two or more Lewis structures "
"(**contributing/resonance structures**) that differ only in the placement of π electrons and lone "
"pairs — never in the positions of the nuclei. The real molecule is a **resonance hybrid** with energy "
"lower than any single contributing structure; the stabilisation is the **resonance energy**. "
"**Benzene's contributing structures:** the two Kekulé structures with alternating single and double "
"bonds, related by shifting the three π bonds around the ring: "
"[C with alternating C=C bonds, structure I] ↔ [the same ring with the double bonds shifted one place, "
"structure II]. **Two consequences:** (1) **all six C–C bonds are equal** (139 pm — intermediate "
"between a single bond, 154 pm, and a double bond, 134 pm), so benzene is a regular hexagon; "
"(2) **resonance stabilisation (~152 kJ/mol)** makes benzene unusually stable — it undergoes "
"substitution (preserving the ring) rather than addition (destroying it), and its hydrogenation heat "
"(208 kJ for 3 H₂) is far less than three isolated double bonds would give (3 × 120 = 360 kJ). "
"**Deep point:** the resonance hybrid is the reality and the Kekulé drawings are its bookkeeping — the "
"139 pm bond length is the single measurement that proves it.")}

A['aromatic-hydrocarbons/03-neb-2020.json'] = {
0: ("**Why substitution, not addition:** electrophilic **addition** would use up the ring's π system and "
"destroy the aromatic sextet, losing the ~152 kJ/mol resonance energy; electrophilic **substitution** "
"temporarily disturbs the aromaticity in the σ-complex but **restores it** when H⁺ is expelled — the "
"net result keeps the stabilised ring. The energy bar for full addition is therefore much higher, and "
"substitution wins despite needing a catalyst. (The hydrogenation data proves it: 208 kJ for three "
"additions instead of the expected 360 kJ.) **Directing effects:** a **–CH₃ group is electron-donating "
"(+I effect)** — it enriches the ortho and para positions, so electrophiles attack there; toluene "
"nitrates mainly to o- and p-nitrotoluene, and faster than benzene itself (activating group). A "
"**–NO₂ group is electron-withdrawing (−I and −M)** — it depletes the ortho/para positions and leaves "
"the meta position relatively electron-rich; nitrobenzene nitrates mainly to m-dinitrobenzene, and more "
"slowly than benzene (deactivating group). **Deep point:** the director's identity is read from where "
"it pushes or pulls electron density, and its speed effect (activating/deactivating) follows the same "
"sign — donors direct o,p and accelerate; withdrawers direct meta and retard.")}

A['aromatic-hydrocarbons/04-neb-2024.json'] = {
0: ("**Hückel's rule:** a planar, cyclic, fully conjugated system is aromatic if it contains **(4n + 2) π "
"electrons** (n = 0, 1, 2, …). **Benzene:** six sp² carbons, each contributing one π electron to a "
"cyclic, planar, fully conjugated system ⟹ **6 π electrons = 4(1) + 2**, satisfying the rule with "
"n = 1. The six π electrons fill three bonding molecular orbitals in a closed shell, giving the extra "
"stabilisation (~152 kJ/mol resonance energy) that defines aromaticity. **Deep point:** the rule's "
"counterpart matters too — cyclic conjugated systems with 4n π electrons (cyclobutadiene, 4) are "
"*antiaromatic* and destabilised, which is why the count, not the ring size, is the test.")}

A['aromatic-hydrocarbons/04-neb-2024.json'][1] = (
"**Mechanism (electrophilic aromatic substitution):** **Step 1 — electrophile generation:** conc. "
"H₂SO₄ protonates nitric acid: HNO₃ + 2H₂SO₄ → **NO₂⁺** (nitronium ion) + H₃O⁺ + 2HSO₄⁻. "
"**Step 2 — σ-complex formation:** the ring's π electrons attack NO₂⁺, forming a **σ-complex "
"(arenium ion)** in which the attacked carbon bears both the H and the NO₂ and the positive charge is "
"delocalised over the ortho/para carbons — the aromatic sextet is temporarily broken. "
"**Step 3 — proton loss:** HSO₄⁻ removes the proton from the sp³ carbon, restoring the aromatic sextet: "
"C₆H₆ + HNO₃ --(conc. H₂SO₄, 50–60 °C)--> C₆H₅NO₂ + H₂O. The rate-determining step is the σ-complex "
"formation; the fast deprotonation is what pays back the resonance energy. **Deep point:** the "
"mechanism's bookkeeping — two electrons in, one proton out — is why substitution preserves the ring "
"while addition would spend it.")

A['aromatic-hydrocarbons/04-neb-2024.json'][2] = (
"**Friedel–Crafts alkylation:** introduction of an alkyl group (–R) onto the benzene ring using an "
"alkyl halide (R–Cl) with anhydrous **AlCl₃** as Lewis-acid catalyst: "
"C₆H₆ + CH₃Cl --(anhyd. AlCl₃)--> C₆H₅CH₃ + HCl. The catalyst generates the electrophile "
"(CH₃⁺-like R⁺ from R–Cl·AlCl₃ complex). **A limitation:** the alkyl group introduced is "
"electron-donating, so the product (e.g. toluene) is **more reactive than benzene** and alkylates "
"further — giving polyalkylated mixtures rather than clean monoalkylation; over-alkylation is the "
"classic drawback (also, aryl/vinyl halides and strongly deactivated rings fail). **Deep point:** the "
"limitation is self-inflicted by the mechanism — the reaction's own product is a better substrate, so "
"the only way to stop at monoalkylation is to use a large excess of benzene.")

A['aromatic-hydrocarbons/04-neb-2024.json'][3] = (
"**Ortho–para directors** donate electron density into the ring (or stabilise the o/p σ-complex), "
"enriching those positions for the incoming electrophile: **–CH₃** (and other alkyls, +I), **–OH, –NH₂, "
"–OCH₃** (lone-pair donation, +M). **Meta directors** withdraw electron density (−I/−M), deactivating "
"o/p more than meta, which becomes the preferred site: **–NO₂**, **–COOH, –CHO, –CN, –SO₃H** "
"(and –NR₃⁺). **Generalisation:** almost every substituent with a lone pair on the atom bonded to the "
"ring directs o,p; every group with a multiple bond to an electronegative atom directs meta. "
"**Deep point:** directing power and activating power usually share a sign — donors direct o,p and "
"speed the ring up; withdrawers direct meta and slow it down — the two questions are one question.")

A['aromatic-hydrocarbons/04-neb-2024.json'][4] = (
"Toluene's methyl side chain is oxidised all the way to the carboxyl group by hot alkaline KMnO₄ "
"(followed by acidification): C₆H₅CH₃ --[KMnO₄/KOH, heat]--> C₆H₅COOK --[H⁺]--> **C₆H₅COOH** "
"(benzoic acid) + MnO₂. Whatever the side-chain length, oxidation cuts it back to the ring's carboxyl "
"carbon — toluene, ethylbenzene and propylbenzene all give benzoic acid. **Deep point:** the reaction "
"is a reminder that the ring directs the side chain's fate — the benzylic position's weakness to "
"oxidation is what makes every alkylbenzene a benzoic-acid precursor.")

A['aromatic-hydrocarbons/04-neb-2024.json'][5] = (
"**The two Kekulé structures:** the regular hexagon of six carbons with three alternating double bonds, "
"and its partner with the double bonds shifted by one position (structure I: C1=C2, C3=C4, C5=C6; "
"structure II: C2=C3, C4=C5, C6=C1). **Why all bonds are equal:** the real molecule is the **resonance "
"hybrid** of these two structures — the six π electrons are delocalised cyclically over all six "
"carbons, so no single bond is 'a double bond' and none is 'a single bond'; every C–C bond is identical "
"at **139 pm**, exactly intermediate between a C–C single bond (154 pm) and a C=C double bond "
"(134 pm). **Deep point:** equal bond length is the experimental verdict on resonance — the two Kekulé "
"drawings are bookkeeping, the delocalised sextet is the molecule.")

def main():
    for key, ans in A.items():
        f = 'content/practice/questions/class-11/chemistry/' + key
        d = json.loads(open(f, 'rb').read().decode('utf-8-sig'))
        qs = d if isinstance(d, list) else d.get('questions', [])
        for i, text in ans.items():
            assert i < len(qs), (key, i)
            assert not (qs[i].get('answer') or '').strip(), (key, i)
            qs[i]['answer'] = text
        filled = sum(1 for q in qs if (q.get('answer') or '').strip())
        assert filled == len(qs), (key, filled, len(qs))
        if isinstance(d, list):
            open(f, 'w', encoding='utf-8-sig', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
        else:
            open(f, 'w', encoding='utf-8-sig', newline='\n').write(json.dumps(d, ensure_ascii=False, indent=2))
        print('filled', key, f'({len(ans)} answers, {len(qs)} questions)')

main()
