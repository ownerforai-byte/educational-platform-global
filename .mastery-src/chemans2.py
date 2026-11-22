#!/usr/bin/env python
# Populate PYQ answers - chemistry batch 2: atomic-structure, basic-concept, bio-inorganic, bonding
import json

A = {}

A['atomic-structure/01-neb-2024.json'] = {0: (
"Sodium (Z = 11) has the configuration 1s² 2s² 2p⁶ 3s¹ — the valence electron is in the 3s subshell. "
"**n = 3** (third shell), **l = 0** (s subshell), **mₗ = 0** (the only value allowed for l = 0), "
"**mₛ = +½** (spin up — either spin is allowed, +½ is conventionally listed). So the four quantum "
"numbers are **(3, 0, 0, +½)**. **Deep point:** the four numbers are a full address — shell, subshell, "
"orbital, spin — and the s subshell's single orbital is why mₗ has no choice.")}

A['atomic-structure/02-neb-2023.json'] = {
0: ("**Aufbau's principle:** electrons fill atomic orbitals in order of increasing energy — the lowest-"
"energy orbital available is occupied first. The filling order follows the (n + l) rule: 1s < 2s < 2p < "
"3s < 3p < 4s < 3d < 4p … (a lower (n+l) fills first; ties go to the lower n). **Example — potassium "
"(Z = 19):** after argon's 1s² 2s² 2p⁶ 3s² 3p⁶ (18 electrons), the 19th electron enters **4s**, not "
"3d, because 4s (n + l = 4) lies below 3d (n + l = 3+2 = 5): configuration [Ar] 4s¹. The same logic "
"places calcium's next electron in 4s² before the transition series begins. **Deep point:** Aufbau is "
"an energy-ordering statement, not a shell-counting rule — the 4s-before-3d inversion is its signature "
"evidence."),
1: ("Check each set against the quantum-number rules: **n = 3** allows **l = 0, 1, 2**; for **l = 1** "
"(p), **mₗ = −1, 0, +1** only; **mₛ = ±½** always. **(a)** n = 3, l = 1, mₗ = +1, mₛ = +½ — all valid "
"(a 3p electron). **(b)** n = 3, l = 1, **mₗ = +2** — **NOT possible**: mₗ must lie between −l and +l, "
"and +2 exceeds l = 1. **(c)** n = 3, l = 1, mₗ = −1, mₛ = −½ — valid (a 3p electron). **(d)** n = 3, "
"l = 0, mₗ = 0, mₛ = +½ — valid (a 3s electron). **Answer: set (b) is impossible.** **Deep point:** the "
"chain |mₗ| ≤ l ≤ n is the only tool needed — one violated link condemns the whole set.")}

A['basic-concept-of-organic-chemistry/01-neb-2024.json'] = {0: (
"**(a) CH₃CH₂CH₂COOH** — four carbons with the carboxyl carbon as C-1: **butanoic acid**. "
"**(b) CH₃CHO** — two-carbon aldehyde: **ethanal**. **(c) HOCH₂CH₂OH** — two-carbon diol with OH on "
"both carbons: **ethane-1,2-diol** (ethylene glycol). **(d) CH₃CH(CH₃)COOH** — the chain is numbered "
"from the –COOH carbon: C-1 = COOH, C-2 carries the methyl: **2-methylpropanoic acid**. "
"**Deep point:** two rules decide every name — the principal group fixes C-1, and the longest chain "
"carrying it is the parent; (d) is the classic trap where numbering from the wrong end gives the wrong "
"locant.")}

A['basic-concept-of-organic-chemistry/02-neb-2023.json'] = {0: (
"CH₃CH(CH₃)CH₂CH₂CH(CH₂CH₃)CH₂OH. The **–OH is the principal group**, so numbering starts from the "
"carbon bearing it: C-1 = CH₂OH, C-2 = CH(CH₂CH₃) — an **ethyl at C-2**, C-3 = CH₂, C-4 = CH₂, "
"C-5 = CH(CH₃) — a **methyl at C-5**, C-6 = CH₃. Parent chain: **hexan-1-ol**. Substituents: "
"2-ethyl and 5-methyl, cited alphabetically. **IUPAC name: 2-ethyl-5-methylhexan-1-ol.** "
"**Deep point:** the OH end must win the numbering even though the other end gives a lower first "
"substituent locant — the principal group outranks substituent alphabetics.")}

A['basic-concept-of-organic-chemistry/03-neb-2022.json'] = {0: (
"**Functional group:** an atom or group of atoms (e.g. –OH, –CHO, –COOH, –Cl, C=C) that determines the "
"characteristic chemical reactions of a compound — the reactive site the rest of the molecule follows. "
"**Homologous series:** a family of compounds with the **same functional group, the same general "
"formula, and successive members differing by –CH₂– (14 mass units)**, whose physical properties vary "
"gradually while chemical properties stay similar. **Three characteristics:** (1) same general formula "
"and same functional group throughout the series; (2) consecutive members differ by a –CH₂– unit, so "
"molecular formulae differ by CH₂ (14 u); (3) gradation in physical properties (m.p./b.p. rise with "
"chain length) with similar chemical properties, and members can be prepared by similar general "
"methods. **Alkanols:** general formula **CₙH₂ₙ₊₁OH** (or CₙH₂ₙ₊₂O); examples **CH₃OH (methanol)** and "
"**C₂H₅OH (ethanol)**. **Deep point:** the homologous –CH₂– increment is why organic chemistry is "
"predictable — one functional group's chemistry, learned once, covers an infinite family.")}

A['bio-inorganic-chemistry/01-neb-2023.json'] = {0: (
"**Chlorophyll:** a porphyrin-ring complex of magnesium — **C₅₅H₇₂O₅N₄Mg** for chlorophyll-a (chlorophyll-b "
"differs by one oxygen, C₅₅H₇₀O₆N₄Mg); the Mg²⁺ sits at the centre of the four-nitrogen porphyrin ring. "
"**Role of magnesium:** Mg²⁺ at the chlorophyll centre absorbs red and blue-violet light and enables "
"the **photochemical electron transfer of photosynthesis** — the light-driven process that converts "
"CO₂ and H₂O into carbohydrate; magnesium is also an activator of many enzymes (ATP-using reactions) "
"and a constituent of the leaf's green pigment, so it is the metal of the plant's energy economy. "
"**Magnesium deficiency:** chlorophyll cannot form, so leaves turn **yellow between the veins "
"(chlorosis)** — the older leaves first, because Mg is mobile in the plant; photosynthesis and growth "
"fall, and yields drop. The agricultural remedy is magnesium salts (e.g. MgSO₄/Epsom salt) in the soil. "
"**Deep point:** one metal, one ring, and the colour of the living world — Mg²⁺'s role in chlorophyll "
"makes it the plant-side twin of iron's role in haemoglobin.")}

A['bio-inorganic-chemistry/02-neb-2022.json'] = {0: (
"**Answer: (c) iron.** Iron is the central atom of the **haem** group in haemoglobin — each of the four "
"haem units holds one Fe²⁺, which binds O₂ reversibly; without iron the haemoglobin molecule cannot be "
"completed and **iron-deficiency anaemia** results. (Zinc, copper and iodine are essential trace "
"elements — enzyme cofactors, and the thyroid's iodine — but none sits in haemoglobin.) **Deep point:** "
"the metal at the centre of the porphyrin ring decides the molecule's job — Fe²⁺ for oxygen transport "
"in blood, Mg²⁺ for light capture in chlorophyll.")}

A['bio-inorganic-chemistry/03-neb-2021.json'] = {0: (
"**Role of haemoglobin:** haemoglobin is the tetrameric protein (two α, two β chains, each carrying a "
"haem group with one **Fe²⁺**) that transports **oxygen from the lungs to the tissues**: in the lungs' "
"high O₂ pressure each Fe²⁺ binds one O₂ reversibly (Hb + 4O₂ → Hb(O₂)₄, oxyhaemoglobin, bright red); "
"in the tissues' low O₂ pressure the oxygen is released to the cells' respiration. It also carries a "
"fraction of CO₂ and buffers blood pH. **Carboxyhaemoglobin:** when carbon monoxide is inhaled it "
"binds to the same Fe²⁺ site as O₂ but **200–300 times more strongly** and essentially irreversibly, "
"forming the cherry-red **carboxyhaemoglobin (HbCO)**: Hb + CO → HbCO. **Why CO poisoning is fatal:** "
"the blocked sites can no longer carry O₂, and — worse — CO binding *increases* the affinity of the "
"remaining sites for O₂, so the little oxygen still bound is not released to the tissues. The blood's "
"transport capacity collapses: tissues suffocate (headache, unconsciousness, death) even though the "
"lungs are full of air. Treatment is pure/high-pressure O₂ to displace the CO. **Deep point:** "
"carboxyhaemoglobin is chemistry's sharpest lesson in competitive binding — CO wins the site not by "
"being more abundant but by binding three hundred times harder.")}

A['bio-inorganic-chemistry/04-neb-2024.json'] = {
0: ("**Sodium (Na⁺) and potassium (K⁺):** the principal extracellular and intracellular cations — they "
"regulate **osmotic balance and water distribution**, maintain the body's acid–base (pH) balance, and "
"generate the **nerve-impulse membrane potential** (the Na⁺/K⁺ pump) that underlies every nerve signal "
"and muscle contraction. **Calcium:** ~99% of the body's calcium is in **bones and teeth** (as "
"hydroxyapatite); ionic Ca²⁺ triggers **muscle contraction, blood clotting** and neurotransmitter "
"release, and is essential to cell signalling. **Magnesium:** the **central atom of chlorophyll** (in "
"plants), and in humans a cofactor of **over 300 enzymes** — including all ATP-using reactions — "
"supporting nerve and muscle function and protein synthesis. **Deep point:** the four metals split the "
"body's work by mobility and binding — Na⁺/K⁺ in solution doing fast signalling, Ca²⁺ switching "
"between crystal and signal, Mg²⁺ locked into enzyme and pigment centres."),
1: ("**Iron in haemoglobin:** Fe²⁺ sits at the centre of each haem porphyrin ring, where its open "
"coordination site binds **O₂ reversibly** — the chemistry of oxygen transport. **Magnesium in "
"chlorophyll:** Mg²⁺ sits at the centre of the porphyrin ring, where its electron configuration enables "
"the **light absorption and electron transfer** of photosynthesis. **Deficiency of iron:** haemoglobin "
"cannot be completed ⟹ **iron-deficiency anaemia** — pale, small red cells, fatigue and breathlessness "
"from oxygen starvation. **Deficiency of magnesium:** chlorophyll cannot form ⟹ **chlorosis** (yellow "
"leaves), collapsing photosynthesis and growth. **Deep point:** the two metals are biological "
"counterparts — both porphyrin-centre ions, one moving O₂ through animals, the other harvesting light "
"in plants; each deficiency starves its organism of its energy source."),
2: ("**Role of iodine:** iodine is selectively taken up by the **thyroid gland** and used to synthesise "
"the thyroid hormones **thyroxine (T₄) and triiodothyronine (T₃)**, which regulate the body's **basal "
"metabolic rate**, growth and mental development. **Deficiency disorder:** **goitre** — the thyroid "
"enlarges (visible swelling at the neck) as it strains to produce hormone without iodine; in children "
"severe deficiency causes **cretinism** (stunted growth, mental retardation). Prevention is iodised "
"salt. **Deep point:** iodine is the only element with a single-organ monopoly — the thyroid takes it "
"up against a 30-fold gradient, which is why a pinch of iodised salt reaches one specific gland."),
3: ("**Metalloenzymes:** enzymes that contain a **metal ion at (or near) the active site as an essential "
"part of the catalyst** — the metal binds substrates, activates water, or shuttles electrons; remove "
"the metal and the enzyme is inactive. **Carbonic anhydrase** is the classic example: a **zinc (Zn²⁺) "
"metalloenzyme** in red cells that catalyses CO₂ + H₂O ⇌ H₂CO₃ (then HCO₃⁻ + H⁺) — the reaction that "
"lets blood carry CO₂ as bicarbonate. **Mechanism:** Zn²⁺ at the active site binds and polarises a "
"water molecule (lowering its pKa enormously), generating a bound **OH⁻** that attacks CO₂ thousands "
"of times per second — the zinc is doing to water what an acid does, by coordination. **Deep point:** "
"the metal ion is the enzyme's chemical hand — carbonic anhydrase's Zn²⁺ turns a reaction that takes "
"seconds uncatalysed into one that runs ~10⁶ times per second, which is why you can breathe."),
4: ("**Lead (Pb):** accumulates in bone and soft tissue; damages the **nervous system** (neurotoxic — "
"learning impairment, especially in children), causes **anaemia** (blocks haem synthesis enzymes), "
"kidney damage and elevated blood pressure; sources include leaded paint, batteries, contaminated "
"water pipes. **Mercury (Hg):** organic **methylmercury** bioaccumulates in the food chain and attacks "
"the **central nervous system** (tremor, memory loss, numbness) — the classic **Minamata disease** "
"came from mercury-contaminated fish; inorganic mercury vapour damages kidneys and lungs; prenatal "
"exposure severely harms fetal brain development. **Deep point:** both are cumulative poisons — the "
"dose that matters is the lifetime body burden, which is why their regulation is set on chronic "
"exposure, not acute symptoms."),
5: ("**Role of cobalt:** cobalt is the central metal of **vitamin B₁₂ (cyanocobalamin)** — the only "
"vitamin containing a metal. It is essential for **red blood cell formation**, DNA synthesis and the "
"health of the myelin nerve sheath; cobalt deficiency (as B₁₂ deficiency) causes **pernicious "
"anaemia**. **Its vitamin: vitamin B₁₂** (cobalamin). **Deep point:** cobalt's entire biological "
"identity is that one coordination complex — the body needs it in micrograms, but without it the "
"blood-making machinery stops.")}

A['chemical-bonding-and-shapes-of-molecules/01-neb-2022.json'] = {0: (
"**Lewis dot structure of CO₂:** O=C=O — each oxygen shares **two electron pairs** with the carbon "
"(two double bonds), giving carbon 8 electrons and each oxygen 8; two lone pairs remain on each oxygen. "
"(In dots: :Ö=C=Ö: with two lone pairs on each O.) **Molecular shape:** the central carbon has **two "
"electron domains** (the two double bonds), no lone pairs ⟹ sp hybridisation, bond angle 180° ⟹ "
"**linear**. **Deep point:** the double bonds count as one domain each in VSEPR — the shape question "
"is answered by counting domains, not bonds.")}

A['chemical-bonding-and-shapes-of-molecules/01-neb-2023.json'] = {0: (
"In ethene each carbon is **sp² hybridised**: one 2s and two 2p orbitals mix to give three sp² orbitals "
"in a plane at 120°, leaving one unhybridised 2p orbital perpendicular to the plane. **Sigma bonds:** "
"each carbon uses two sp² orbitals to overlap with the 1s orbitals of two H atoms (two C–H σ bonds "
"each), and the remaining sp² orbitals of the two carbons overlap **head-on** to form the **C–C σ "
"bond** — all five σ bonds lie in the plane. **Pi bond:** the two unhybridised 2p orbitals overlap "
"**sideways** above and below the molecular plane to form the **π bond** of the C=C. **H–C–H angle:** "
"the sp² geometry gives **≈120°** (measured ≈117°, slightly compressed by the π cloud's repulsion). "
"**Deep point:** the σ/π division is a division of overlap geometry — head-on σ gives free rotation, "
"sideways π locks the plane, which is why ethene is rigid and flat.")}

A['chemical-bonding-and-shapes-of-molecules/02-neb-2022.json'] = {0: (
"**(a) PCl₅:** central P has 5 bond pairs, no lone pairs ⟹ **trigonal bipyramidal**, sp³d, angles "
"120° (equatorial) / 90° (axial). **(b) SF₆:** 6 bond pairs ⟹ **octahedral**, sp³d², 90°. "
"**(c) BeCl₂:** 2 bond pairs ⟹ **linear**, sp, 180°. **(d) H₂S:** 2 bond pairs + 2 lone pairs on S ⟹ "
"**bent (V-shaped)**, sp³, angle **≈92°** — far below the 109.5° tetrahedral angle because two lone "
"pairs squeeze the bonds hard (and S's large size weakens hybridisation). **Deep point:** the count "
"is always 'bond pairs + lone pairs' — the lone pairs decide the shape's family and squeeze its "
"angles.")}

A['chemical-bonding-and-shapes-of-molecules/02-neb-2024.json'] = {
0: ("**Lewis dot structure of CO₂:** O=C=O — two C=O double bonds, each oxygen keeping two lone pairs; "
"every atom completes its octet (carbon 8, each oxygen 8). **Shape:** the carbon has two electron "
"domains (the two double bonds) and no lone pairs ⟹ sp hybridisation, 180° ⟹ **linear**. "
"**Deep point:** a double bond is one VSEPR domain — count domains, not bonds."),
1: ("**H₂O:** two O–H bond pairs + **two lone pairs** on O ⟹ four domains, sp³ parent geometry ⟹ "
"**bent (V-shaped)**, angle **104.5°** — compressed from 109.5° by the two lone pairs' extra "
"repulsion. **NH₃:** three N–H bond pairs + **one lone pair** on N ⟹ four domains, sp³ ⟹ "
"**pyramidal**, angle **107°** — compressed less, by one lone pair. **Deep point:** the lone-pair "
"ladder is the answer's spine — 2 lone pairs > 1 lone pair > 0 gives 104.5° < 107° < 109.5° "
"for H₂O < NH₃ < CH₄."),
2: ("**Ionic bond:** complete **transfer** of electron(s) from a metal to a non-metal, producing "
"oppositely charged ions held by electrostatic attraction — e.g. **NaCl** (Na → Na⁺ + e⁻; Cl + e⁻ → "
"Cl⁻). Properties: crystalline, high m.p., conducts when molten/dissolved. **Covalent bond:** "
"**sharing** of an electron pair between two non-metals — e.g. **H₂** (or CH₄); the shared pair counts "
"toward both octets. Properties: molecular, low m.p., non-conducting. **Deep point:** the two bonds "
"are the two answers to one question — what happens to the valence electrons: given away (ionic) or "
"shared (covalent)."),
3: ("**Fajans' rules:** a bond between a cation and an anion acquires covalent character when the "
"**cation is small and highly charged** (high polarising power) and the **anion is large and highly "
"charged** (high polarisability) — the cation distorts the anion's electron cloud and shares part of "
"it. **LiCl vs NaCl:** Li⁺ is **smaller** than Na⁺ (both 1+), so Li⁺ polarises Cl⁻ more strongly ⟹ "
"**LiCl has greater covalent character** than NaCl — seen in its greater solubility in organic "
"solvents and lower melting point. **Deep point:** polarisation is the bridge concept — ionic and "
"covalent are ends of a scale, and Fajans' rules tell you where a given pair sits on it."),
4: ("**Hydrogen bonding:** the attraction between a hydrogen bonded to a small, highly electronegative "
"atom (**N, O, F**) and a lone pair on another such atom — X–H···:Y; it is a strong dipole–dipole "
"interaction, weaker than a covalent bond but far stronger than ordinary van der Waals forces. "
"**Water's high boiling point:** every H₂O can form up to **four H-bonds** (two via its H atoms, two "
"via oxygen's lone pairs), building a 3-D network; vaporising water must break this network, so water "
"boils at 100 °C where comparable hydrides (H₂S 60 °C, H₂Se, H₂Te) boil far lower — the anomaly is "
"the network's cost. **Deep point:** the boiling point measures the energy of the *inter*molecular "
"handshakes, and hydrogen bonds are the firmest handshakes molecular chemistry offers."),
5: ("Both NH₃ and CH₄ have four electron pairs around the central atom, but the **pair types differ**: "
"CH₄ has **four bond pairs** ⟹ regular tetrahedral, 109.5°; NH₃ has **three bond pairs + one lone "
"pair** ⟹ the lone pair occupies a tetrahedral position but is invisible in the molecular shape, "
"leaving a **pyramid** (trigonal pyramidal). The lone pair also repels the bond pairs more than they "
"repel each other, compressing the H–N–H angle to 107°. **Deep point:** 'shape' means the shape of "
"the atoms, not of the electron cloud — the lone pair is real (it shapes the angles) but unseen "
"(it is not drawn in the molecular geometry).")}

A['chemical-bonding-and-shapes-of-molecules/03-neb-2020.json'] = {0: (
"**VSEPR on NH₃:** the central N has 5 valence electrons ⟹ **three N–H bond pairs + one lone pair** "
"(four electron domains) ⟹ parent geometry **tetrahedral**, hybridisation **sp³**. The molecular shape "
"(atoms only) is **trigonal pyramidal**; the lone pair repels the three bond pairs more strongly than "
"bond pairs repel each other, compressing the H–N–H angle from 109.5° to **107°**. **Why less than "
"methane's 109.5°:** CH₄ has four bond pairs and no lone pair — a perfectly regular tetrahedron; NH₃'s "
"**lone pair occupies more angular space** (it is held by one nucleus only, closer to N, and fatter) "
"and pushes the three bonding pairs together. The lone-pair ladder: H₂O (2 lp) 104.5° < NH₃ (1 lp) "
"107° < CH₄ (0 lp) 109.5°. **Deep point:** one sentence carries the mark — a lone pair, held by one "
"nucleus, spreads wider than a bond pair held by two, so it steals angle space from the bonds.")}

A['chemical-bonding-and-shapes-of-molecules/04-neb-2024.json'] = {
0: ("**Postulates of VSEPR theory:** (1) electron pairs around a central atom arrange themselves to be "
"**as far apart as possible** — mutual repulsion minimised; (2) repulsion order: **lone pair–lone pair "
"> lone pair–bond pair > bond pair–bond pair**; (3) double/triple bonds count as **one domain**; "
"(4) the molecular shape is described by atom positions, with lone pairs shaping angles but invisible "
"in the shape. **CH₄:** carbon has four bond pairs, no lone pairs ⟹ four domains spread to a regular "
"**tetrahedron**, sp³, **109.5°**. **Deep point:** postulate (2) is the working engine — every "
"angle-compression argument in the topic is postulate (2) applied once."),
1: ("**BF₃:** boron has 3 bond pairs, no lone pairs ⟹ three domains ⟹ **trigonal planar**, sp², "
"120° (an incomplete octet — B is content with 6 electrons). **PCl₅:** phosphorus has 5 bond pairs ⟹ "
"five domains ⟹ **trigonal bipyramidal**, sp³d — three equatorial P–Cl at 120°, two axial at 90° to "
"the plane. **Deep point:** the expanded octets of PCl₅ (and SF₆) are why 'always eight electrons' "
"is a second-row rule, not a universal law — third-row atoms have room for sp³d/sp³d²."),
2: ("**CO₂:** carbon has **two electron domains** (two C=O double bonds), no lone pairs ⟹ sp, "
"**linear**, 180°. **H₂O:** oxygen has **four domains** — two bond pairs + **two lone pairs** ⟹ sp³ "
"parent tetrahedron with the two lone pairs occupying two corners ⟹ **bent**, 104.5°. **The "
"contrast:** the difference is not the central atom's identity but its **lone-pair count** — carbon "
"spends all four valence electrons in bonds (0 lone pairs); oxygen, with six valence electrons, keeps "
"two pairs to itself. Lone pairs push the remaining bonds together, bending the molecule. "
"**Deep point:** same family (domains decide), different occupancy (lone pairs bend) — CO₂ and H₂O "
"are the cleanest demonstration that shape is a count of domains, not of atoms."),
3: ("**Hybridisation:** the mathematical mixing of an atom's atomic orbitals (of slightly different "
"energies) into an equal number of **equivalent hybrid orbitals** oriented for maximum overlap — "
"hybrids are for σ bonds and lone pairs; unhybridised p orbitals make π bonds. **sp³ in methane:** "
"carbon's 2s and three 2p orbitals mix to give **four sp³ hybrids** pointing to the corners of a "
"tetrahedron (109.5°); each overlaps head-on with a hydrogen 1s orbital, forming four identical "
"C–H σ bonds ⟹ CH₄ is **regular tetrahedral**, all angles 109.5°, all bonds equal. **Deep point:** "
"hybridisation is the theory that makes VSEPR's shapes chemically mechanical — the four equivalent "
"bonds of methane are impossible to explain with raw s and p orbitals."),
4: ("**SF₆:** six bond pairs on S, no lone pairs ⟹ **octahedral**, sp³d², all F–S–F angles 90°. "
"**IF₇:** seven bond pairs on I, no lone pairs ⟹ **pentagonal bipyramidal**, sp³d³ — five equatorial "
"I–F at 72°, two axial at 90° to the plane. Both are expanded-octet species (12 and 14 electrons "
"around the central atom), possible only for large third/fifth-row atoms with accessible d orbitals. "
"**Deep point:** the VSEPR ladder continues past the tetrahedron — 5, 6, 7 domains map to trigonal "
"bipyramidal, octahedral, pentagonal bipyramidal, and the exam expects all three names."),
5: ("NH₃ boils at −33 °C, PH₃ at −88 °C — a 55° gap. **The cause is hydrogen bonding:** in NH₃ the H "
"atoms are bonded to highly electronegative **nitrogen**, so each N–H is strongly polarised and NH₃ "
"molecules hydrogen-bond to one another's lone pairs — extra intermolecular attraction that vaporisa-"
"tion must pay for. In PH₃ the P–H bond is barely polar (P and H have nearly equal electronegativities), "
"so PH₃ molecules attract each other only by weak van der Waals forces. **Shape's role:** both are "
"pyramidal with a lone pair, so geometry is *not* the difference — the lone pair in NH₃ is a hydrogen-"
"bond **acceptor**, which is what makes the N···H–N handshake possible. **Deep point:** the exam "
"phrase is 'hydrogen bonding requires H on N, O or F' — PH₃ has the lone pair but not the polarised "
"H, and the boiling-point gap is the receipt.")}

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
