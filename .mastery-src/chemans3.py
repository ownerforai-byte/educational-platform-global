#!/usr/bin/env python
# Populate PYQ answers - chemistry batch 3: equilibrium, metals, non-metals, classification
import json

A = {}

A['chemical-equilibrium/01-neb-2024.json'] = {
0: ("**Le Chatelier's principle:** when a system at equilibrium is subjected to a change in concentration, "
"pressure or temperature, the equilibrium shifts in the direction that **opposes (cancels) the change**. "
"**Applied to N₂(g) + 3H₂(g) ⇌ 2NH₃(g):** increasing the pressure increases the system's total "
"concentration/pressure; the equilibrium responds by shifting toward the side with **fewer moles of "
"gas** — 4 mol (1 N₂ + 3 H₂) on the left, 2 mol (2 NH₃) on the right — so the equilibrium shifts "
"**to the right (forward), toward ammonia**, partially relieving the imposed pressure. This is exactly "
"why the Haber plant runs at 200–300 atm. **Deep point:** the principle gives direction, never size — "
"it tells you which way, and Kc tells you how far."),
1: ("**Kc expression:** Kc = [NH₃]² / ([N₂]·[H₂]³) = 0.5. **Substitute:** "
"0.5 = [NH₃]² / (1.0 × (0.5)³) = [NH₃]² / (1.0 × 0.125) = [NH₃]² / 0.125. "
"**Solve:** [NH₃]² = 0.5 × 0.125 = 0.0625 ⟹ **[NH₃] = √0.0625 = 0.25 M**. "
"**Check:** 0.0625/(0.125) = 0.5 ✓. **Deep point:** the whole question is one algebra line once the "
"expression is written with its powers — the cube on [H₂] is where every lost mark lives.")}

A['chemical-equilibrium/02-neb-2022.json'] = {0: (
"N₂O₄(g) ⇌ 2NO₂(g), ΔH = +57 kJ/mol (endothermic forward; NO₂ is the brown gas). "
"**(a) Increasing pressure:** the equilibrium shifts toward **fewer moles of gas** — 1 mol N₂O₄ vs "
"2 mol NO₂ ⟹ shifts **left, toward colourless N₂O₄** (the brown colour fades), partially opposing the "
"pressure rise. **(b) Lowering temperature:** the forward reaction is **endothermic**, so cooling "
"removes heat and the equilibrium shifts in the **exothermic direction — left, toward N₂O₄** (colour "
"fades); Kc itself decreases on cooling. **(c) Adding more N₂O₄ at constant volume:** the concentration "
"(partial pressure) of N₂O₄ rises; the equilibrium shifts **forward, toward NO₂**, consuming part of "
"the added N₂O₄ — at constant volume the total pressure rises and part of the added gas remains, but "
"the mole fraction of NO₂ increases. (Note: adding an inert gas at constant volume changes nothing.) "
"**Deep point:** three disturbances, three different tools — mole count for pressure, ΔH sign for "
"temperature, concentration for addition; the constant-volume clause in (c) is what rules out the "
"inert-gas red herring.")}

A['chemistry-of-metals/01-neb-2023.json'] = {
0: ("**Downs process — electrolysis of molten NaCl.** **Why not aqueous brine:** water is reduced at the "
"cathode before Na⁺, so metallic sodium requires the *dry molten* salt; **why the mixture:** pure NaCl "
"melts at 801 °C (wasteful and corrosive), so it is mixed with **CaCl₂ (and NaF)** which lowers the "
"melting point to ~600 °C and improves conductivity. **The cell:** a steel tank lined with refractory "
"brick; a **graphite anode** in the centre releases **Cl₂** (collected in an inverted funnel/hood); a "
"**ring-shaped steel cathode** surrounds it, around which molten **sodium** collects (density lower "
"than the melt) and rises up a pipe into a collector. A **steel-gauze diaphragm** between the "
"electrodes keeps the Na from the Cl₂ (they would recombine — and Na + Cl₂ is violent). "
"**Reactions:** cathode: Na⁺ + e⁻ → Na (molten metal); anode: 2Cl⁻ → Cl₂ + 2e⁻; "
"overall: 2NaCl --electrolysis--> 2Na + Cl₂. The CaCl₂ is not reduced (Ca²⁺ needs a higher potential "
"than Na⁺ at these conditions). Calcium contamination of the sodium is controlled by keeping the "
"temperature just above Na's melting point, where Ca's solubility in Na is low. **Deep point:** the "
"process is three engineering answers to one chemistry — lower the melting point, separate the "
"products, and let density do the collection."),
1: ("**Downs cell (sodium):** electrolyte **molten NaCl + CaCl₂** (m.p. lowered to ~600 °C); graphite "
"anode: **2Cl⁻ → Cl₂ + 2e⁻**; steel cathode: **Na⁺ + e⁻ → Na (liquid metal)**, collected by floating; "
"steel-gauze diaphragm separates the products; metal obtained **molten (liquid)**. "
"**Fused MgCl₂ cell (magnesium):** electrolyte **molten (fused) MgCl₂** (often with NaCl/KCl to lower "
"the melting point); graphite anode: **2Cl⁻ → Cl₂ + 2e⁻**; steel cathode: **Mg²⁺ + 2e⁻ → Mg (molten "
"metal)**, which floats on the denser electrolyte and is skimmed; chlorine is a by-product at both "
"cells. **Comparison:** the chemistry is identical (cation reduced, chloride oxidised — both metals "
"come out **molten** because the electrolyte must be fused); the differences are operational — Downs "
"uses a mixed electrolyte purely to lower the melting point and a diaphragm to stop Na + Cl₂ "
"recombination, while the Mg cell's melt runs hotter (~700 °C) and skims its metal off the surface. "
"**Deep point:** both cells are the same electrochemistry in different vessels — the syllabus point is "
"that reactive metals (Na, Mg, Al) are won from their **molten** compounds, never from solution.")}

A['chemistry-of-metals/02-neb-2022.json'] = {0: (
"**Why carbon reduction fails:** aluminium sits high in the activity series — Al₂O₃ is far too stable "
"(ΔH formation very large) for carbon to reduce it at any attainable temperature; carbon would need to "
"strip oxygen from a oxide more stable than CO₂'s own formation energy, so the reaction is "
"thermodynamically unfavourable (Al is above the 'carbon line' in the Ellingham diagram at all "
"practical temperatures). **The answer — electrolysis in molten cryolite:** purified alumina is "
"dissolved in **molten cryolite (Na₃AlF₆)** with some CaF₂/AlF₃ — the cryolite lowers the operating "
"temperature from Al₂O₃'s 2000+ °C melting point to ~950–980 °C and raises conductivity. In the "
"**Hall–Héroult cell** (steel-lined with carbon, carbon blocks as anode): "
"**cathode: Al³⁺ + 3e⁻ → Al** (molten aluminium collects at the bottom and is tapped); "
"**anode: 2O²⁻ → O₂ + 4e⁻** (the oxygen burns away the carbon anodes: C + O₂ → CO₂, so anodes are "
"consumed); overall: 2Al₂O₃ → 4Al + 3O₂. **Deep point:** the activity series is the decision table of "
"extraction — below carbon, reduce with carbon; above carbon, spend electricity, and cryolite exists "
"to make that electricity affordable.")}

A['chemistry-of-metals/03-neb-2024.json'] = {
0: ("**Downs process — electrolysis of molten NaCl.** **Why molten:** in aqueous brine water is reduced "
"at the cathode before Na⁺, so metallic sodium needs the dry fused salt. **Why the mixture:** pure "
"NaCl melts at 801 °C; adding **CaCl₂/NaF** lowers the melting point to ~600 °C and improves "
"conductivity, saving energy. **The cell:** steel tank with refractory lining; central **graphite "
"anode** evolves **Cl₂** (collected under a hood); surrounding **steel ring cathode** where "
"**Na⁺ + e⁻ → Na**; the molten sodium (less dense than the melt) floats and is drawn off through a "
"pipe; a **steel-gauze diaphragm** keeps Na and Cl₂ apart (they would recombine violently). "
"**Reactions:** cathode Na⁺ + e⁻ → Na; anode 2Cl⁻ → Cl₂ + 2e⁻; overall "
"2NaCl → 2Na + Cl₂. The Ca²⁺ is not reduced under operating conditions. **Deep point:** three "
"engineering answers to one chemistry — melt it lower (CaCl₂), separate the products (gauze), and let "
"density collect the metal."),
1: ("**Hall–Héroult process:** purified **bauxite-derived alumina (Al₂O₃)** is dissolved in **molten "
"cryolite (Na₃AlF₆)** plus fluorspar (CaF₂) — the cryolite lowers the working temperature from "
"Al₂O₃'s ~2000 °C to **~950–980 °C** and raises the melt's conductivity. **The cell:** a steel shell "
"lined with **carbon** (the cathode) with suspended **carbon blocks** as anodes. "
"**Cathode:** Al³⁺ + 3e⁻ → **Al (molten)** — collects on the cell floor and is siphoned off. "
"**Anode:** 2O²⁻ → O₂ + 4e⁻; the oxygen oxidises the carbon anode (C + O₂ → CO₂), so **anodes are "
"consumed** and replaced periodically. **Overall:** 2Al₂O₃ → 4Al + 3O₂. The process is continuous and "
"enormously electricity-hungry — aluminium is 'congealed electricity'. **Deep point:** cryolite is the "
"process's economic key — it changes nothing chemically (a flux), but by dropping the temperature it "
"converts an impossible electrolysis into the world's aluminium supply."),
2: ("**Calcination:** heating the ore **in the absence (or limited supply) of air** to remove volatile "
"matter — drives off water of hydration, CO₂ from carbonates, converts hydroxides to oxides. "
"**Example:** ZnCO₃ --heat--> ZnO + CO₂ (calamine → zinc oxide); also CaCO₃ → CaO + CO₂. "
"**Roasting:** heating the ore **in excess air** below its melting point — converts sulphide ores to "
"oxides (and removes As/Sb as volatile oxides), with SO₂ released. **Example:** "
"2ZnS + 3O₂ → 2ZnO + 2SO₂ (zinc blende → zinc oxide). **Deep point:** the one-line discriminator is "
"the atmosphere — no air (calcination, carbonates/hydroxides) versus excess air (roasting, sulphides)."),
3: ("**Froth flotation:** a **concentration process for sulphide ores** — finely powdered ore is "
"suspended in water with **pine oil** and a frothing agent; compressed air stirs up a froth, and the "
"sulphide particles (rendered water-repelling by the oil) attach to the air bubbles and rise with the "
"froth, while the heavier gangue (silica) sinks and is discarded. The froth is skimmed and broken to "
"give the concentrated ore; collectors (xanthates) and depressants tune selectivity. **Used for:** "
"**sulphide ores** — galena (PbS), zinc blende (ZnS), copper pyrites (CuFeS₂), cinnabar (HgS). "
"**Deep point:** the method exploits one physical difference — sulphides are wetted by oil, gangue by "
"water — which is why oxide and carbonate ores never use it (they use gravity/leaching instead)."),
4: ("**Electrolytic refining of copper:** the impure copper (from the converter, ~99% Cu with Ag, Au, "
"Ni, Fe, Zn) is cast as the **anode**; a thin sheet of **pure copper is the cathode**; the electrolyte "
"is **acidified copper sulphate solution (CuSO₄ + H₂SO₄)**. **At the anode:** Cu → Cu²⁺ + 2e⁻ — the "
"impure copper dissolves. **At the cathode:** Cu²⁺ + 2e⁻ → Cu — pure copper (99.99%) deposits on the "
"cathode sheet. **The impurities' fate:** more active metals (Fe, Zn, Ni) stay dissolved as ions in "
"the electrolyte; less active metals (**Ag, Au, Pt**) do not dissolve — they fall to the cell bottom "
"as the valuable **anode mud/slime**, from which silver and gold are commercially recovered. "
"**Deep point:** the anode mud pays for the process — copper refining is the classic case where the "
"'impurity' is precious metal and the economics run backwards."),
5: ("**Brass:** **copper + zinc** (typically ~60–90% Cu, 40–10% Zn) — use: musical instruments, "
"cartridge cases, ornaments, hardware (golden polish, machinable, corrosion-resistant). "
"**Bronze:** **copper + tin** (typically ~88% Cu, 12% Sn) — use: statues, medals, bearings, ship "
"propellers (hard, castable, seawater-resistant). **Stainless steel:** **iron + chromium (+ nickel)** "
"— typically ~18% Cr, 8% Ni (18/8 steel) with the rest Fe — use: cutlery, surgical instruments, "
"kitchenware and chemical plant (the chromium forms a passive Cr₂O₃ film that resists rust). "
"**Deep point:** each alloy is one element's contribution read as a property — Zn gives brass its "
"machinability, Sn gives bronze its casting and corrosion behaviour, Cr gives steel its passive skin.")}

A['chemistry-of-non-metals/01-neb-2024.json'] = {0: (
"**Order of increasing acid strength:** HClO < HClO₂ < HClO₃ < HClO₄ "
"(Ka: 3.0 × 10⁻⁸ < 4.0 × 10⁻² < 5 × 10¹ < 10¹⁰). **Explanation:** in these oxoacids the acidic H is on "
"an –OH group whose O–H bond must break to release H⁺. As the number of oxygen atoms attached to "
"chlorine rises (0, 1, 2, 3 extra O), the electronegative oxygens **pull electron density away from "
"the Cl and the O–H bond**, increasing the polarity of O–H and — more decisively — **stabilising the "
"conjugate base** (the negative charge of ClOₙ⁻ is delocalised over more equivalent oxygen atoms: "
"ClO⁻ has 1 O, ClO₄⁻ has 4). A more stable conjugate base ⟹ a stronger parent acid. Hence strength "
"rises with oxidation state/number of terminal oxygens. **Deep point:** oxoacid strength is a "
"conjugate-base stability story — count the oxygens, rank the acids; the Ka ladder (10⁻⁸ to 10¹⁰) is "
"an eighteen-order-of-magnitude confirmation.")}

A['chemistry-of-non-metals/02-neb-2023.json'] = {0: (
"**Why helium, not nitrogen, in diving tanks:** under the high pressures of deep diving, large amounts "
"of any breathed gas dissolve in the blood (Henry's law). **Nitrogen is poorly soluble-but-sticky:** it "
"dissolves in fatty nerve tissue and, on rapid ascent, bubbles out of solution — **nitrogen narcosis** "
"(the intoxicating 'rapture of the deep' at depth) and **caisson disease/decompression sickness** "
"(painful, even fatal, bubbles in joints and blood). **Helium is far less soluble** in blood and fat "
"(its small, non-polar, monatomic atoms interact weakly), so it does not cause narcosis and leaves the "
"body quickly on decompression — allowing safe deep dives. It is also non-flammable (unlike hydrogen) "
"and chemically inert. Its drawbacks (high-pitched voice distortion, high thermal conductivity causing "
"chill) are managed with suit heaters. **Deep point:** the choice is Henry's law applied to physiology "
"— what dissolves under pressure must come out under pressure, and helium is the gas that barely "
"dissolves at all.")}

A['chemistry-of-non-metals/03-neb-2022.json'] = {0: (
"**Structure:** ozone is O₃ — a **bent (angular) molecule** (angle ≈117°) with **delocalised bonding**: "
"the central O is sp²-like, and the π electrons are spread over all three atoms, giving two equal "
"O–O bonds of length **128 pm** (intermediate between a single bond, 148 pm, and a double bond, "
"121 pm). It is best written as a **resonance hybrid** of O=O–O⁺ ↔ ⁻O–O=O structures. It is a pale "
"blue gas with a characteristic sharp smell (the 'smell of lightning'), diamagnetic, and heavier than "
"O₂. **Properties:** (1) **powerful oxidising agent** — stronger than O₂ (E° ≈ +2.07 V): it bleaches "
"dyes and vegetable colours, oxidises sulphides, iodides (2KI + O₃ + H₂O → 2KOH + I₂ + O₂ — the basis "
"of its estimation), and kills bacteria/viruses (water sterilisation); (2) **thermodynamically "
"unstable** — decomposes to O₂, especially on heating, catalysis or UV: 2O₃ → 3O₂; (3) **absorbs "
"UV radiation** — the stratospheric ozone layer shields life from UV-B/C; (4) **toxic in the lower "
"atmosphere** — a component of photochemical smog, irritating lungs. **Deep point:** ozone is oxygen's "
"metastable cousin — 142 kJ/mol above O₂, which is exactly the energy budget it spends on being the "
"strongest common oxidant and the planet's UV shield.")}

A['chemistry-of-non-metals/04-neb-2021.json'] = {0: (
"**Step 1 — catalytic oxidation of ammonia:** ammonia (~10% in air) is passed over a **platinum–"
"rhodium gauze at 800–900 °C** with millisecond contact: 4NH₃ + 5O₂ → 4NO + 6H₂O. "
"**Step 2 — oxidation of NO:** the gas is **rapidly cooled** (the 2NO + O₂ ⇌ 2NO₂ equilibrium favours "
"NO₂ only at low temperature) and treated with more air: 2NO + O₂ → 2NO₂. "
"**Step 3 — absorption:** NO₂ with excess air is absorbed in water in packed towers: "
"4NO₂ + O₂ + 2H₂O → 4HNO₃ (≈50–60% acid, concentrated by distillation toward the 68% azeotrope). "
"**Catalyst and conditions:** Pt–Rh gauze, 800–900 °C, ~10% NH₃ in air, rapid quench, excess air in "
"the absorption towers. **Deep point:** the process runs hot → quenched → cool; each stage's "
"condition is the previous stage's equilibrium consequence, and the quench between steps 1 and 2 is "
"the mark most answers forget.")}

A['classification-of-elements-and-periodic-table/01-neb-2024.json'] = {0: (
"**Z = 19 — potassium (K):** configuration [Ar] 4s¹ ⟹ **period 4, group 1** (alkali metal). "
"**Z = 20 — calcium (Ca):** [Ar] 4s² ⟹ **period 4, group 2** (alkaline earth). "
"**Z = 31 — gallium (Ga):** [Ar] 3d¹⁰ 4s² 4p¹ ⟹ **period 4, group 13** (boron family — a p-block "
"element following the first transition series). **Z = 36 — krypton (Kr):** [Ar] 3d¹⁰ 4s² 4p⁶ ⟹ "
"**period 4, group 18** (noble gas). **Z = 55 — caesium (Cs):** [Xe] 6s¹ ⟹ **period 6, group 1** "
"(alkali metal). **Deep point:** the method is always the same — write the configuration, and the "
"highest n gives the period while the valence subshell's column gives the group (s¹→1, s²→2, "
"p-block: group = 12 + valence p-electrons, ns²np⁶→18).")}

A['classification-of-elements-and-periodic-table/02-neb-2022.json'] = {0: (
"**(a) IE₁(Mg) > IE₁(Al):** Mg is 3s² — its outer electron is removed from a **fully filled, "
"penetrating 3s orbital**; Al is 3s²3p¹ — its first electron sits in the **higher-energy, less-"
"penetrating 3p orbital**, already shielded and easier to remove. Filled-subshell stability plus "
"orbital penetration beat the naive left-to-right increase: 738 vs 578 kJ/mol. (The same pairing "
"explains Be > B.) **(b) r(Na) > r(Cl):** across the period from Na to Cl, **nuclear charge rises "
"(+11 → +17) while the shell count stays the same (n = 3)** — each added proton pulls the same shell "
"inward, so the radius shrinks steadily from 186 pm (Na) to 99 pm (Cl). The trend is a tug-of-war "
"between constant shielding and rising Zeff, and Zeff wins. **Deep point:** both irregularities are "
"one principle — the electron removed (or held) is judged by its subshell and its shielding, not by "
"the element's position alone; 'filled/penetrating subshell' and 'rising Zeff' are the two phrases "
"that score.")}

A['classification-of-elements-and-periodic-table/03-neb-2021.json'] = {0: (
"**Mendeleev's law:** the properties of elements are a periodic function of their **atomic masses**. "
"**Modern periodic law:** the properties of elements are a periodic function of their **atomic "
"numbers**. **Three differences:** (1) **basis** — atomic mass (Mendeleev) vs atomic number (modern); "
"the modern law is grounded in nuclear charge, the quantity that actually determines electronic "
"configuration; (2) **anomalies removed** — Mendeleev had to place pairs out of mass order (Ar/K, "
"Co/Ni, Te/I); by atomic number they fall into their correct groups naturally, with no inversions; "
"(3) **isotopes explained** — isotopes of an element have different masses but the same atomic number, "
"so they occupy one position in the modern table (Mendeleev's mass-based table could not accommodate "
"them); additionally, the modern table's blocks (s/p/d/f) follow directly from electron "
"configuration, giving the long form its structure. **Deep point:** the change from mass to number is "
"the change from a property that misorders (mass) to the property that causes periodicity (Z ⟹ "
"configuration ⟹ properties) — every improvement in the table flows from that single correction.")}

A['classification-of-elements/01-neb-2022.json'] = {0: (
"**Modern periodic law:** the physical and chemical properties of the elements are a periodic function "
"of their **atomic numbers**. **How it improved on Mendeleev's law (based on atomic mass):** "
"(1) **anomalous pairs resolved** — Ar (39.9) before K (39.1), Co before Ni, Te before I now sit in "
"their chemically correct groups without mass-order inversions, because nuclear charge, not mass, "
"orders the table; (2) **isotopes accommodated** — isotopes share one atomic number and hence one "
"position, where Mendeleev's mass-based table had no place for them; (3) **electronic justification** "
"— atomic number fixes the electron configuration, and configuration (same valence-shell electrons "
"recurring at regular Z intervals) is the true cause of periodicity, so the modern table's periods, "
"groups and s/p/d/f blocks follow from structure rather than from sorted masses. **Deep point:** "
"Mendeleev's table worked because mass *mostly* tracked atomic number; the modern law replaced the "
"correlation with the cause.")}

A['classification-of-elements/02-neb-2024.json'] = {
0: ("**Modern periodic law:** element properties are a periodic function of **atomic number**. "
"**Improvements on Mendeleev (mass-based):** (1) anomalous pairs (Ar/K, Co/Ni, Te/I) fall into correct "
"groups with no inversions; (2) isotopes (same Z, different mass) share one position; (3) the table "
"gains an electronic foundation — periods/groups/blocks follow directly from electron configuration, "
"which atomic number determines. **Deep point:** mass misordered three pairs and every isotope; "
"atomic number fixes all four with one change of basis."),
1: ("**s-block:** the last electron enters an **ns** orbital — groups 1–2 (e.g. **Na**). **p-block:** "
"the last electron enters an **np** orbital — groups 13–18 (e.g. **Cl**). **d-block:** the last "
"electron enters a **(n−1)d** orbital — groups 3–12, the transition elements (e.g. **Fe**). "
"**f-block:** the last electron enters a **(n−2)f** orbital — the lanthanides and actinides, placed "
"below the main table (e.g. **Ce**). **Deep point:** the block is simply the address of the "
"differentiating electron — the one electron that makes the element different from its predecessor."),
2: ("**Ionisation energy (IE₁):** the minimum energy required to remove the most loosely bound electron "
"from an isolated gaseous atom: M(g) + IE₁ → M⁺(g) + e⁻ (measured in kJ/mol). **Why N > O:** nitrogen "
"is 2s²2p³ — the three p orbitals are **half-filled**, an exchange-energy-stabilised, symmetrical "
"configuration; oxygen is 2s²2p⁴ — its fourth p electron is **paired**, and removing it relieves the "
"pairing repulsion. So although O is further right (higher Zeff), the electron it loses is the easier "
"one: IE₁(N) = 1402 > IE₁(O) = 1314 kJ/mol. **Deep point:** the N/O inversion is the same story as "
"Be/B and Mg/Al — half-filled (or filled) stability and pairing repulsion override the period trend "
"at exactly those two points."),
3: ("**Electronegativity:** the tendency of an atom to attract the **shared pair of electrons** toward "
"itself in a covalent bond (Pauling scale, F = 4.0). **Across a period:** increases (left → right) — "
"nuclear charge rises while the shell count is constant, so Zeff and the pull on shared electrons "
"rise (Li 1.0 → F 4.0). **Down a group:** decreases — new shells enlarge the atom and screen the "
"nucleus, so the shared pair is pulled less strongly (F 4.0 → Cs 0.7). **Most electronegative "
"element: fluorine.** **Deep point:** electronegativity is ionisation energy and electron affinity "
"blended into one bond-context number — its trends mirror IE's because the cause (Zeff) is shared."),
4: ("**Across a period:** the atomic radius **decreases** — nuclear charge (Z) rises while electrons "
"enter the **same shell**, so shielding stays roughly constant and Zeff pulls the shell inward "
"(Na 186 pm → Cl 99 pm). **Down a group:** the radius **increases** — each element adds a **new "
"shell** (higher n), whose outer electrons stand farther out and are screened by the inner shells; "
"the added shells outweigh the rising Z (Li 152 pm → Cs 262 pm). **Deep point:** one sentence per "
"direction — across, same shell + more protons = smaller; down, extra shell + extra shielding = "
"bigger."),
5: ("**Diagonal relationship:** the similarity in properties between an element and the element "
"**diagonally down-right** of it in period 2/3 (Li–Mg, Be–Al, B–Si). **Example — Li and Mg:** both "
"form nitrides directly (Li₃N, Mg₃N₂), both give normal carbonates that decompose on heating "
"(Li₂CO₃, MgCO₃ — unlike the other alkali/alkaline-earth carbonates), both form covalent organo-"
"compounds, similar solubilities of fluorides/phosphates. **Cause:** the diagonal pair has **similar "
"charge/size (ionic potential)** — moving right raises charge, moving down raises size; the diagonal "
"step raises both, leaving the charge-to-radius ratio (polarising power) nearly unchanged, so the "
"two elements polarise anions similarly and behave alike. **Deep point:** periodicity is vertical, "
"but ionic potential is a ratio — and the diagonal is the direction along which that ratio "
"constant-walks.")}

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
