# Chemistry class-11 — final stub topups (10 files)
PART_A = [
    {
        "file": "class-11/chemistry/basic-concept-of-organic-chemistry/05-preliminary-idea-of-cracking-and-reforming-quality-of-gasoline-octane-number-cetane-number-and-gasoline-additive.json",
        "blocks": [
            {"after": "Homologous series: same functional group, differ by",
             "md": ("### Deep dive — cracking, reforming and the octane number\n\n"
                    "**Cracking** breaks big alkane molecules into smaller, more useful ones by heat "
                    "and catalyst: C₁₀H₂₂ → C₈H₁₈ + C₂H₄ (petrol + alkene feedstock). **Reforming** "
                    "rearranges straight-chain alkanes into branched and aromatic isomers without "
                    "changing carbon count: hexane → benzene + hydrogen (aromatisation); it upgrades "
                    "quality, not quantity. **Octane number** measures knock resistance with "
                    "iso-octane (2,2,4-trimethylpentane) = 100 and n-heptane = 0; petrol quoted as 87 "
                    "octane knocks like an 87% iso-octane blend. Branching, aromatics and oxygenates "
                    "(ethanol, MTBE) raise the number; lead additives did too, now banned for health."),
             "table": ("Cracking vs reforming vs octane rating",
                       ["Process", "What changes", "Purpose", "Example"],
                       [["Cracking", "Chain length decreases", "Petrol + alkene feedstock", "C&#8321;&#8320;H&#8322;&#8322; &#8594; C&#8328;H&#8321;&#8328; + C&#8322;H&#8324;"],
                        ["Reforming", "Structure only (isomerisation)", "Raise octane; make aromatics", "Hexane &#8594; benzene + H&#8322;"],
                        ["Octane number", "Knock resistance scale", "Grade petrol", "iso-octane 100; n-heptane 0"]]),
        },
            {"after": "Functional groups: -OH (alcohol), -COOH (carboxylic",
             "svg": ("Cracking and reforming — cut the chain, or rearrange it",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"80\" y1=\"90\" x2=\"220\" y2=\"90\"/>"
                     "</g>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"80\" cy=\"90\" r=\"6\"/><circle cx=\"150\" cy=\"90\" r=\"6\"/>"
                     "<circle cx=\"220\" cy=\"90\" r=\"6\"/>"
                     "</g>"
                     "<path d=\"M150 90 L 150 60\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<text x=\"150\" y=\"45\" text-anchor=\"middle\" fill=\"#991b1b\">crack</text>"
                     "<text x=\"150\" y=\"125\" text-anchor=\"middle\" fill=\"#374151\">C&#8321;&#8320; &#8594; C&#8328; + C&#8322; (shorter chains)</text>"
                     "<g stroke=\"#166534\" stroke-width=\"2\">"
                     "<line x1=\"400\" y1=\"90\" x2=\"540\" y2=\"90\"/>"
                     "</g>"
                     "<g fill=\"#166534\">"
                     "<circle cx=\"400\" cy=\"90\" r=\"6\"/><circle cx=\"470\" cy=\"90\" r=\"6\"/>"
                     "<circle cx=\"540\" cy=\"90\" r=\"6\"/>"
                     "</g>"
                     "<path d=\"M470 90 C 470 55, 540 55, 540 90\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"470\" y=\"45\" text-anchor=\"middle\" fill=\"#a16207\">reform (branch/ring)</text>"
                     "<text x=\"470\" y=\"125\" text-anchor=\"middle\" fill=\"#374151\">same C count, better octane</text>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#374151\">octane number: iso-octane = 100, n-heptane = 0</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">branching and aromatics raise the number; lead additives banned</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/03-covalent-bond-and-coordinate-covalent-bond-and-properties-of-covalent-compounds.json",
        "blocks": [
            {"after": "Lone pairs compress bond angles.",
             "md": ("### Deep dive — covalent, coordinate, and the properties that follow\n\n"
                    "A **covalent bond** shares a pair, each atom contributing one electron (H₂, Cl₂, "
                    "CH₄). A **coordinate (dative) bond** shares a pair donated by one atom alone — "
                    "NH₄⁺ (N donates its lone pair to H⁺), H₃O⁺, NH₃·BF₃, and every metal-complex "
                    "bond. Once formed, a dative bond is indistinguishable from a normal covalent "
                    "bond; only the bookkeeping of origin differs. Properties of covalent substances "
                    "follow from discrete molecules: low melting/boiling points (weak intermolecular "
                    "forces, not weak bonds), poor conductors (no ions or free electrons), soluble in "
                    "non-polar solvents, and molecular formulas rather than formula units. Network "
                    "covalent exceptions — diamond, SiO₂, SiC — melt extremely high because *every* "
                    "atom is covalently bonded throughout the crystal."),
             "table": ("Covalent vs coordinate bond, and the property logic",
                       ["Aspect", "Covalent", "Coordinate (dative)"],
                       [["Electron origin", "One from each atom", "Both from the donor"],
                        ["Example", "H&#8322;, CH&#8324;, Cl&#8322;", "NH&#8324;&#8314;, H&#8323;O&#8314;, NH&#8323;&#183;BF&#8323;"],
                        ["After formation", "Identical to covalent", "Indistinguishable from covalent"],
                        ["Donor requirement", "—", "Lone pair + acceptor vacancy"]]),
        },
            {"after": "VSEPR theory predicts molecular geometry from electr",
             "svg": ("NH₄⁺ — the dative bond that becomes an ordinary bond",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"320\" cy=\"120\" r=\"24\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"126\" fill=\"#1d4ed8\">N</text>"
                     "<circle cx=\"250\" cy=\"90\" r=\"14\" fill=\"#ffffff\" stroke=\"#374151\"/>"
                     "<text x=\"250\" y=\"95\" fill=\"#374151\">H</text>"
                     "<circle cx=\"390\" cy=\"90\" r=\"14\" fill=\"#ffffff\" stroke=\"#374151\"/>"
                     "<text x=\"390\" y=\"95\" fill=\"#374151\">H</text>"
                     "<circle cx=\"290\" cy=\"180\" r=\"14\" fill=\"#ffffff\" stroke=\"#374151\"/>"
                     "<text x=\"290\" y=\"185\" fill=\"#374151\">H</text>"
                     "<circle cx=\"355\" cy=\"180\" r=\"14\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"355\" y=\"185\" fill=\"#a16207\">H&#8314;</text>"
                     "</g>"
                     "<g stroke=\"#374151\" stroke-width=\"2\">"
                     "<line x1=\"302\" y1=\"108\" x2=\"262\" y2=\"94\"/>"
                     "<line x1=\"338\" y1=\"108\" x2=\"378\" y2=\"94\"/>"
                     "<line x1=\"308\" y1=\"138\" x2=\"296\" y2=\"168\"/>"
                     "</g>"
                     "<path d=\"M348 170 L 330 142\" stroke=\"#a16207\" stroke-width=\"2.5\" stroke-dasharray=\"5 3\"/>"
                     "<path d=\"M330 142 L 328 156 L 340 150 Z\" fill=\"#a16207\"/>"
                     "<text x=\"420\" y=\"150\" fill=\"#a16207\">lone pair donated</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#374151\">NH&#8323; + H&#8314; &#8594; NH&#8324;&#8314; — after formation all four N&#8211;H bonds are identical</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-equilibrium/05-le-chatlier-s-principle.json",
        "blocks": [
            {"after": "pH = -log[H⁺].",
             "md": ("### Deep dive — the principle in one table\n\n"
                    "Le Chatelier: a system at equilibrium responds to a disturbance by opposing it. "
                    "Increase pressure → shift toward fewer gas moles; increase temperature → shift "
                    "endothermic; add reactant or remove product → shift forward; catalyst → no "
                    "shift. The classic applications: Haber (N₂ + 3H₂ ⇌ 2NH₃, exothermic, 4→2 moles) "
                    "wants high pressure and moderate temperature; contact process (2SO₂ + O₂ ⇌ "
                    "2SO₃) the same. Remember: only temperature changes K itself; concentration and "
                    "pressure change the position, not the constant."),
             "table": ("Disturbance → response",
                       ["Disturbance", "Shift", "Example"],
                       [["&#8593; Pressure", "Fewer gas moles", "Haber: more NH&#8323;"],
                        ["&#8593; Temperature", "Endothermic side", "Exothermic Haber: less NH&#8323;"],
                        ["Add reactant / remove product", "Forward", "Liquefy NH&#8323; continuously"],
                        ["Catalyst", "No shift", "Faster equilibrium only"]]),
        },
            {"after": "Le Chatelier's principle.",
             "svg": ("Disturb → oppose — the principle as a feedback loop",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<rect x=\"220\" y=\"90\" width=\"200\" height=\"70\" rx=\"12\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"120\" text-anchor=\"middle\" fill=\"#1d4ed8\">equilibrium</text>"
                     "<text x=\"320\" y=\"142\" text-anchor=\"middle\" fill=\"#374151\">Q = K</text>"
                     "<path d=\"M120 125 L 215 125\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<path d=\"M215 125 L 200 118 L 200 132 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"120\" y=\"108\" text-anchor=\"middle\" fill=\"#991b1b\">disturbance</text>"
                     "<path d=\"M425 125 L 520 125\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M520 125 L 505 118 L 505 132 Z\" fill=\"#166534\"/>"
                     "<text x=\"540\" y=\"108\" text-anchor=\"middle\" fill=\"#166534\">opposes it</text>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#374151\">only temperature changes K; position shifts, constant stays</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemistry-of-metals/03-refining-of-metals.json",
        "blocks": [
            {"after": "Alloys: mixtures of metals.",
             "md": ("### Deep dive — the four refining routes and when each is chosen\n\n"
                    "Crude metal from reduction still carries impurities; refining picks a route by "
                    "the impurity and the metal's own properties: **(1) liquation** — low-melting "
                    "metal (Sn, Bi) flows down a sloping hearth, high-melting impurities stay; "
                    "**(2) distillation** — volatile metals (Zn, Hg, Cd) boil off and condense pure; "
                    "**(3) poling** — molten Cu stirs with green wood; hydrocarbons reduce the Cu₂O "
                    "surface oxide; **(4) electrolytic refining** — the universal modern method: "
                    "crude anode dissolves, pure metal deposits on the cathode, precious metals "
                    "collect as anode mud (Cu refining yields Ag, Au, Pt from the mud). Choice logic: "
                    "volatile → distil; low-melting → liquation; oxide film → poling; everything "
                    "else → electrolysis."),
             "table": ("Refining methods — principle, metal, note",
                       ["Method", "Principle", "Typical metal", "Note"],
                       [["Liquation", "Low m.p. flows off a slope", "Sn, Bi", "Impurities stay behind"],
                        ["Distillation", "Volatility difference", "Zn, Hg, Cd", "Boil off, condense pure"],
                        ["Poling", "Reducing gases from green wood", "Cu (Cu&#8322;O removal)", "Old but classic"],
                        ["Electrolytic", "Anode dissolves, cathode deposits", "Cu, Al, Zn, Ni", "Anode mud gives Ag/Au/Pt"]]),
        },
            {"after": "Extraction: smelting, electrolysis.",
             "svg": ("Electrolytic refining — crude in at the anode, pure out at the cathode",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"90\" y=\"70\" width=\"460\" height=\"130\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"100\" text-anchor=\"middle\" fill=\"#1d4ed8\">electrolyte: CuSO&#8324; solution</text>"
                     "<rect x=\"140\" y=\"110\" width=\"18\" height=\"70\" fill=\"#991b1b\"/>"
                     "<text x=\"149\" y=\"225\" text-anchor=\"middle\" fill=\"#991b1b\">crude anode (+)</text>"
                     "<rect x=\"480\" y=\"110\" width=\"18\" height=\"70\" fill=\"#1d4ed8\"/>"
                     "<text x=\"489\" y=\"225\" text-anchor=\"middle\" fill=\"#1d4ed8\">pure cathode (&#8722;)</text>"
                     "<g fill=\"#374151\">"
                     "<circle cx=\"280\" cy=\"160\" r=\"6\"/><circle cx=\"320\" cy=\"150\" r=\"6\"/>"
                     "<circle cx=\"360\" cy=\"165\" r=\"6\"/><circle cx=\"420\" cy=\"155\" r=\"6\"/>"
                     "</g>"
                     "<text x=\"350\" y=\"200\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">anode mud: Ag, Au, Pt settle below</text>"
                     "<path d=\"M170 145 L 470 145\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"320\" y=\"262\" text-anchor=\"middle\" fill=\"#374151\">Cu&#178;&#8314; dissolves at the anode, deposits pure at the cathode; impurities drop as mud</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/classification-of-elements-and-periodic-table/05-periodic-trend-and-periodicity.json",
        "blocks": [
            {"after": "### 2. Atomic radii",
             "md": ("### Deep dive — the trends as one story, with the two famous dips\n\n"
                    "One engine drives everything: Z_eff rises across a period (radius falls, IE and "
                    "EN rise, metallic character falls) and n rises down a group (radius grows, IE "
                    "and EN fall, metallic character rises). The **two IE dips** across period 2 are "
                    "the exam favourite: Be→B because the new 2p electron sits outside the 2s pair "
                    "(easier to remove than a 2s), and N→O because the fourth p electron must pair "
                    "up, adding repulsion to an already half-filled stable p³. Similarly EA: Cl > F "
                    "because F's compact 2p shell repels the incoming electron more than Cl's roomier "
                    "3p."),
             "table": ("Six trends and their exceptions",
                       ["Trend", "Across", "Down", "Exception"],
                       [["Radius", "&#8595;", "&#8593;", "noble gases measured as van der Waals"],
                        ["IE", "&#8593;", "&#8595;", "Be&#8594;B, N&#8594;O dips"],
                        ["EA", "&#8593;", "&#8595;", "F &lt; Cl"],
                        ["EN", "&#8593;", "&#8595;", "&#8212;"],
                        ["Metallic character", "&#8595;", "&#8593;", "&#8212;"],
                        ["Oxide acidity", "basic &#8594; acidic", "more basic", "Al&#8322;O&#8323; amphoteric"]]),
        },
            {"after": "### 4. Ionisation energy (IE)",
             "svg": ("The two IE dips across period 2 — Be→B and N→O",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"60\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"60\" y1=\"220\" x2=\"60\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M80 190 C 120 140, 150 130, 175 128 L 205 145 C 240 110, 270 100, 295 98 L 325 118 C 360 85, 400 75, 440 72 L 560 62\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<g fill=\"#111827\" font-size=\"12\" text-anchor=\"middle\">"
                     "<text x=\"80\" y=\"240\">Li</text><text x=\"140\" y=\"240\">Be</text>"
                     "<text x=\"205\" y=\"240\">B</text><text x=\"265\" y=\"240\">C</text>"
                     "<text x=\"325\" y=\"240\">N</text><text x=\"390\" y=\"240\">O</text>"
                     "<text x=\"450\" y=\"240\">F</text><text x=\"560\" y=\"240\">Ne</text>"
                     "</g>"
                     "<text x=\"180\" y=\"175\" fill=\"#991b1b\" font-size=\"12\">dip 1: 2p &lt; 2s</text>"
                     "<text x=\"340\" y=\"150\" fill=\"#991b1b\" font-size=\"12\">dip 2: pairing in p&#8308;</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">subshell stability, not size, explains the dips</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/foundation-and-fundamentals/02-basic-concepts-atoms-molecules-relative-masses-and-formulae.json",
        "blocks": [
            {"after": "Pure substances: elements and compounds.",
             "md": ("### Deep dive — the mass vocabulary of chemistry\n\n"
                    "**Atomic mass** is measured relative to C-12 (= 12 exactly); **molecular mass** "
                    "sums atomic masses over the formula; **formula mass** serves ionic compounds "
                    "(NaCl has no molecules). The **mole** counts 6.022 × 10²³ units; **molar mass** "
                    "is g/mol. Distinguish **empirical formula** (simplest whole-number ratio, from "
                    "percentage data) from **molecular formula** (actual count; = n × empirical, "
                    "where n = molar mass ÷ empirical-formula mass — glucose CH₂O, 30 g/mol "
                    "empirical, 180 g/mol molecular → C₆H₁₂O₆). Percentage composition comes straight "
                    "from the formula: % element = (atoms × atomic mass / formula mass) × 100."),
             "table": ("Mass vocabulary — term, definition, example",
                       ["Term", "Definition", "Example"],
                       [["Atomic mass", "Relative to C-12 = 12", "O = 16.0"],
                        ["Molecular mass", "Sum over the molecule", "H&#8322;O = 18"],
                        ["Formula mass", "Ionic formula sum", "NaCl = 58.5"],
                        ["Molar mass", "g per mole", "CO&#8322; = 44 g/mol"],
                        ["Empirical formula", "Simplest ratio", "CH&#8322;O (glucose)"],
                        ["Molecular formula", "n &#215; empirical", "C&#8326;H&#8321;&#8322;O&#8326; (n = 6)"]]),
        },
            {"after": "Matter: anything with mass and volume.",
             "svg": ("Empirical → molecular — the multiplier n from molar mass",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<rect x=\"80\" y=\"90\" width=\"180\" height=\"70\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"170\" y=\"120\" text-anchor=\"middle\" fill=\"#1d4ed8\">empirical: CH&#8322;O</text>"
                     "<text x=\"170\" y=\"145\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">30 g/mol</text>"
                     "<rect x=\"380\" y=\"90\" width=\"180\" height=\"70\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"470\" y=\"120\" text-anchor=\"middle\" fill=\"#166534\">molecular: C&#8326;H&#8321;&#8322;O&#8326;</text>"
                     "<text x=\"470\" y=\"145\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">180 g/mol</text>"
                     "<path d=\"M265 125 L 375 125\" stroke=\"#a16207\" stroke-width=\"3\"/>"
                     "<text x=\"320\" y=\"112\" text-anchor=\"middle\" fill=\"#a16207\">n = 180/30 = 6</text>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#374151\">molecular formula = n &#215; empirical formula</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamental-principles-of-organic-chemistry/02-qualitative-analysis-of-organic-compounds-detection-of-n-s-and-halogens-by-lassigne-s-test.json",
        "blocks": [
            {"after": "Electronic effects: inductive, resonance, electromeric",
             "md": ("### Deep dive — Lassaigne's test, element by element\n\n"
                    "Covalent organics must be **decomposed to ions** before ionic tests work: fuse "
                    "with sodium metal, extract the fused mass in water → Lassaigne's extract. "
                    "**N**: Na + C + N → NaCN; extract + FeSO₄ + heat + H₂SO₄ → Prussian blue "
                    "Fe₄[Fe(CN)₆]₃. **S**: Na₂S → violet with sodium nitroprusside, or black Ag₂S / "
                    "lead acetate paper. **Halogen**: NaX + AgNO₃ → white AgCl (soluble in NH₃), "
                    "cream AgBr (partly soluble), yellow AgI (insoluble). **P**: Na₃PO₄ → yellow "
                    "ammonium phosphomolybdate with nitric acid + ammonium molybdate. Note the trap: "
                    "if both N and S are present they form NaSCN → blood-red ferric thiocyanate "
                    "instead of Prussian blue."),
             "table": ("Lassaigne's test — conversion and confirmatory colour",
                       ["Element", "In the extract", "Reagent", "Positive result"],
                       [["N", "NaCN", "FeSO&#8324;, heat, H&#8322;SO&#8324;", "Prussian blue"],
                        ["S", "Na&#8322;S", "Sodium nitroprusside", "Violet"],
                        ["S (alt.)", "Na&#8322;S", "Lead acetate paper", "Black PbS"],
                        ["Cl/Br/I", "NaX", "AgNO&#8323; + NH&#8323;", "White/cream/yellow AgX"],
                        ["P", "Na&#8323;PO&#8324;", "(NH&#8324;)&#8322;MoO&#8324; + HNO&#8323;", "Yellow phosphomolybdate"]]),
        },
            {"after": "Intermediates: carbocations, carbanions, free radicals",
             "svg": ("Lassaigne's flow — fuse, extract, test",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"60\" y=\"90\" width=\"150\" height=\"60\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"135\" y=\"115\" text-anchor=\"middle\" fill=\"#991b1b\">organic + Na</text>"
                     "<text x=\"135\" y=\"135\" text-anchor=\"middle\" fill=\"#374151\">red-hot fusion</text>"
                     "<rect x=\"260\" y=\"90\" width=\"150\" height=\"60\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"335\" y=\"115\" text-anchor=\"middle\" fill=\"#1d4ed8\">extract in water</text>"
                     "<text x=\"335\" y=\"135\" text-anchor=\"middle\" fill=\"#374151\">Lassaigne&#8217;s extract</text>"
                     "<rect x=\"460\" y=\"90\" width=\"140\" height=\"60\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"530\" y=\"115\" text-anchor=\"middle\" fill=\"#166534\">ionic tests</text>"
                     "<text x=\"530\" y=\"135\" text-anchor=\"middle\" fill=\"#374151\">N, S, X, P</text>"
                     "<path d=\"M215 120 L 255 120\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M415 120 L 455 120\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#374151\">covalent compounds give no ions until fused with sodium</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">N + S together &#8594; NaSCN &#8594; blood-red, not Prussian blue</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamental-principles-of-organic-chemistry/04-concept-of-geometrical-isomerism-and-optical-isomerism-d-and-l-form.json",
        "blocks": [
            {"after": "Intermediates: carbocations, carbanions, free radica",
             "md": ("### Deep dive — the two stereoisomerisms and their tests\n\n"
                    "**Geometrical (cis–trans)** arises from a **double bond or ring** that blocks "
                    "rotation, with two different groups on each doubly-bonded carbon: cis = like "
                    "groups on the same side, trans = opposite. cis-2-butene (m.p. −139 °C) and "
                    "trans-2-butene (−106 °C) differ in dipole, boiling point and stability (trans "
                    "more stable, less steric crowding). Requirement: C=C with Cᵃᵇ=Cᵃᵇ-type "
                    "substitution; Cᵃᵃ=Cᵇᵇ cannot show it. **Optical isomerism** needs a **chiral "
                    "carbon** — four different groups (lactic acid CH₃CHOHCOOH, glycine is exempt "
                    "because it has two H). Enantiomers rotate plane-polarised light equally but "
                    "oppositely (dextrorotatory +, laevorotatory −); a 50:50 mixture is a racemic "
                    "mixture, optically inactive by external compensation. Physical properties "
                    "identical except the light rotation and chiral-environment reactions."),
             "table": ("Geometrical vs optical isomerism",
                       ["Aspect", "Geometrical (cis/trans)", "Optical (enantiomers)"],
                       [["Cause", "Restricted rotation (C=C or ring)", "Chiral centre (4 different groups)"],
                        ["Requirement", "Two different groups on each C", "One C with a, b, c, d all different"],
                        ["Example", "cis- and trans-2-butene", "d- and l-lactic acid"],
                        ["Property difference", "m.p., b.p., dipole differ", "Identical except light rotation"],
                        ["Detection", "Physical constants", "Polarimeter (+/&#8722; rotation)"]]),
        },
            {"after": "Reaction mechanisms: step-by-step electron movemen",
             "svg": ("cis/trans of 2-butene — rotation is the locked door",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\" font-size=\"14\">"
                     "<circle cx=\"220\" cy=\"110\" r=\"12\" fill=\"#111827\"/>"
                     "<circle cx=\"300\" cy=\"110\" r=\"12\" fill=\"#111827\"/>"
                     "<text x=\"260\" y=\"100\" fill=\"#1d4ed8\">C=C</text>"
                     "<text x=\"220\" y=\"80\" fill=\"#374151\">CH&#8323;</text>"
                     "<text x=\"300\" y=\"80\" fill=\"#374151\">CH&#8323;</text>"
                     "<text x=\"220\" y=\"150\" fill=\"#374151\">H</text>"
                     "<text x=\"300\" y=\"150\" fill=\"#374151\">H</text>"
                     "</g>"
                     "<text x=\"260\" y=\"185\" text-anchor=\"middle\" fill=\"#166534\">cis (b.p. 3.7&#176;C, &#956; = 0.33 D)</text>"
                     "<g text-anchor=\"middle\" font-size=\"14\">"
                     "<circle cx=\"470\" cy=\"110\" r=\"12\" fill=\"#111827\"/>"
                     "<circle cx=\"550\" cy=\"110\" r=\"12\" fill=\"#111827\"/>"
                     "<text x=\"510\" y=\"100\" fill=\"#1d4ed8\">C=C</text>"
                     "<text x=\"470\" y=\"80\" fill=\"#374151\">CH&#8323;</text>"
                     "<text x=\"550\" y=\"150\" fill=\"#374151\">CH&#8323;</text>"
                     "<text x=\"470\" y=\"150\" fill=\"#374151\">H</text>"
                     "<text x=\"550\" y=\"80\" fill=\"#374151\">H</text>"
                     "</g>"
                     "<text x=\"510\" y=\"185\" text-anchor=\"middle\" fill=\"#991b1b\">trans (b.p. 0.9&#176;C, &#956; = 0)</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">no rotation about C=C — two distinct geometries, two compounds</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamental-principles-of-organic-chemistry/06-inductive-effect-plus-i-and-minus-i-effect.json",
        "blocks": [
            {"after": "Intermediates: carbocations, carbanions, free radica",
             "md": ("### Deep dive — the permanent, distance-decaying effect\n\n"
                    "The inductive effect is the **permanent polarisation of σ bonds**: a more "
                    "electronegative atom pulls electron density through the σ framework. **−I** "
                    "groups (electron-withdrawing): −NO₂ > −CN > −COOH > −F > −Cl > −Br > −I > "
                    "−OH. **+I** groups (electron-releasing): alkyl (tert > sec > prim), −O⁻, "
                    "metal atoms. Three consequences: (1) **acid strength** — ClCH₂COOH (pK_a 2.9) "
                    "is far stronger than CH₃COOH (4.76) because −I stabilises the carboxylate; "
                    "the effect fades with distance (Cl at C-2 gives 4.5, at C-3 gives 4.8); "
                    "(2) **base strength** — +I alkyls raise electron density on N (CH₃NH₂ > NH₃ "
                    "in the gas phase); (3) **carbocation stability** — +I alkyls stabilise "
                    "3° > 2° > 1°. Inductive is permanent, transmitted through σ bonds, and dies "
                    "off within 3–4 bonds — unlike resonance, which needs π systems."),
             "table": ("Inductive effects — order series and consequences",
                       ["Effect", "Order (strongest first)", "Consequence"],
                       [["&#8722;I (withdrawing)", "NO&#8322; &gt; CN &gt; COOH &gt; F &gt; Cl &gt; Br &gt; I", "Acid strength up (ClCH&#8322;COOH pK_a 2.9)"],
                        ["+I (releasing)", "R&#8323;C &gt; R&#8322;CH &gt; RCH&#8322; &gt; CH&#8323;", "Carbocation stability 3&#176; &gt; 2&#176; &gt; 1&#176;"],
                        ["Distance decay", "C-1 &gt; C-2 &gt; C-3", "ClCH&#8322;COOH 2.9; ClCH&#8322;CH&#8322;COOH 4.5"]]),
        },
            {"after": "Electronic effects: inductive, resonance, electromer",
             "svg": ("−I pulls through the σ chain — and fades with distance",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g font-size=\"15\" text-anchor=\"middle\">"
                     "<circle cx=\"110\" cy=\"140\" r=\"22\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"110\" y=\"146\" fill=\"#991b1b\">Cl</text>"
                     "<circle cx=\"240\" cy=\"140\" r=\"16\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"240\" y=\"146\" fill=\"#1d4ed8\">C1</text>"
                     "<circle cx=\"370\" cy=\"140\" r=\"16\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"370\" y=\"146\" fill=\"#1d4ed8\">C2</text>"
                     "<circle cx=\"500\" cy=\"140\" r=\"20\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"500\" y=\"135\" fill=\"#166534\">COOH</text>"
                     "<text x=\"500\" y=\"158\" fill=\"#166534\" font-size=\"12\">&#948;+</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"132\" y1=\"140\" x2=\"222\" y2=\"140\"/>"
                     "<line x1=\"256\" y1=\"140\" x2=\"352\" y2=\"140\"/>"
                     "<line x1=\"386\" y1=\"140\" x2=\"478\" y2=\"140\"/>"
                     "</g>"
                     "<g fill=\"#1d4ed8\">"
                     "<path d=\"M222 140 L 208 134 L 208 146 Z\"/>"
                     "<path d=\"M352 140 L 338 134 L 338 146 Z\"/>"
                     "<path d=\"M478 140 L 464 134 L 464 146 Z\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"90\" text-anchor=\"middle\" fill=\"#991b1b\">&#948;&#8722; pulls electron density along the &#963; chain</text>"
                     "<text x=\"320\" y=\"220\" text-anchor=\"middle\" fill=\"#374151\">strength fades: Cl at C-1 &#8594; pK_a 2.9; at C-2 &#8594; 4.5; at C-3 &#8594; 4.8</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamental-principles-of-organic-chemistry/07-resonance-effect-plus-r-and-minus-r-effect.json",
        "blocks": [
            {"after": "Intermediates: carbocations, carbanions, free radica",
             "md": ("### Deep dive — +R and −R through the π system\n\n"
                    "The resonance (mesomeric) effect transmits charge **through π systems**. "
                    "**+R donors** push electrons into the ring: −OH, −OR, −NH₂, −NHR, −Cl, −SH "
                    "— they make ortho/para positions electron-rich and activate electrophilic "
                    "substitution (aniline is so activated it brominates in water without a "
                    "catalyst). **−R withdrawers** pull electrons out: −NO₂, −CN, −CHO, −COOH, "
                    "−SO₃H — they deplete ortho/para positions and deactivate (nitrobenzene needs "
                    "fuming HNO₃/H₂SO₄ and gives meta). Compare with inductive: resonance is "
                    "stronger when a π path exists, needs coplanarity, and does not decay with "
                    "distance along the conjugated system. In phenol, +R from OH raises electron "
                    "density so much that the ring attacks Br₂ three times at once — 2,4,6-"
                    "tribromophenol instantly."),
             "table": ("+R donors vs −R withdrawers",
                       ["Class", "Groups (strength order)", "Ring effect", "Substitution"],
                       [["+R donors", "NH&#8322; &gt; OH &gt; OR &gt; halogens", "o/p electron-rich, activated", "Fast, o/p products"],
                        ["&#8722;R withdrawers", "NO&#8322; &gt; CN &gt; CHO &gt; COOH", "o/p depleted, deactivated", "Slow, meta products"],
                        ["Halogens (special)", "&#8722;I wins over +R", "Deactivated but o/p-directing", "Slow, o/p products"]]),
        },
            {"after": "Electronic effects: inductive, resonance, electromer",
             "svg": ("+R donation vs −R withdrawal — where the ring gets rich or poor",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<circle cx=\"180\" cy=\"150\" r=\"55\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<circle cx=\"180\" cy=\"150\" r=\"38\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"1.5\"/>"
                     "<text x=\"180\" y=\"155\" text-anchor=\"middle\" fill=\"#1d4ed8\">ring</text>"
                     "<text x=\"180\" y=\"70\" text-anchor=\"middle\" fill=\"#166534\">&#8722;OH (+R)</text>"
                     "<path d=\"M180 82 C 180 95, 180 85, 180 92\" stroke=\"#166534\" stroke-width=\"0\"/>"
                     "<path d=\"M180 85 L 180 100\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M180 100 L 174 88 L 186 88 Z\" fill=\"#166534\"/>"
                     "<text x=\"180\" y=\"235\" text-anchor=\"middle\" fill=\"#166534\">o/p rich &#8594; fast substitution</text>"
                     "</g>"
                     "<g>"
                     "<circle cx=\"470\" cy=\"150\" r=\"55\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<circle cx=\"470\" cy=\"150\" r=\"38\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"1.5\"/>"
                     "<text x=\"470\" y=\"155\" text-anchor=\"middle\" fill=\"#1d4ed8\">ring</text>"
                     "<text x=\"470\" y=\"70\" text-anchor=\"middle\" fill=\"#991b1b\">&#8722;NO&#8322; (&#8722;R)</text>"
                     "<path d=\"M470 100 L 470 85\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<path d=\"M470 85 L 464 97 L 476 97 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"470\" y=\"235\" text-anchor=\"middle\" fill=\"#991b1b\">o/p poor &#8594; meta products</text>"
                     "</g>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">resonance needs a &#960; path and coplanarity; it does not fade with distance</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
