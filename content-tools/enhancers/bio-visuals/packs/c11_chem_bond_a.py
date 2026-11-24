# Chemistry class-11 — Chemical bonding part A (octet, ionic, covalent, Lewis, VSEPR)
PART_A = [
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/01-valence-shell-valence-electron-and-octet-theory.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — octet theory: the rule, its basis and its exceptions\n\n"
                    "Kossel and Lewis (1916) explained bonding by the drive toward a noble-gas valence shell "
                    "(ns²np⁶, eight electrons). Atoms achieve it by **transfer** (ionic), **sharing** "
                    "(covalent) or **donation of a pair** (coordinate). The rule works because filled s + p "
                    "subshells are especially stable — but it is a rule of thumb, not a law:\n\n"
                    "- **Incomplete octet** — BeCl₂ (4 e⁻ around Be), BF₃ (6 e⁻ around B): electron-deficient, "
                    "hence strong Lewis acids.\n"
                    "- **Expanded octet** — only from period 3 onward, where empty d orbitals allow 10 or 12 "
                    "electrons: PCl₅, SF₆, H₂SO₄.\n"
                    "- **Odd-electron molecules** — NO (11 valence e⁻), NO₂, ClO₂ cannot reach an octet for "
                    "every atom.\n\n"
                    "Valence electrons (outer-shell count) and valency (combining capacity) are different "
                    "numbers: chlorine has 7 valence electrons but valency 1, because one electron short of an "
                    "octet is all it needs."),
             "table": ("Octet rule — compliance, exception, consequence",
                       ["Case", "Electrons around central atom", "Examples", "Chemical consequence"],
                       [["Octet complete", "8", "CH&#8324;, NH&#8323;, H&#8322;O, NaCl (ions)", "Stable, largely unreactive"],
                        ["Incomplete octet", "4&#8211;6", "BeCl&#8322;, BF&#8323;", "Lewis acids; accept electron pairs"],
                        ["Expanded octet", "10&#8211;12", "PCl&#8325;, SF&#8326;, H&#8322;SO&#8324;", "Higher valences; period 3+ only"],
                        ["Odd electron", "7, 9, 11", "NO, NO&#8322;, ClO&#8322;", "Paramagnetic, reactive radicals"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Three roads to an octet — transfer, share, donate",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"40\" y=\"50\" width=\"160\" height=\"90\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"120\" y=\"78\" text-anchor=\"middle\" fill=\"#1d4ed8\">ionic (transfer)</text>"
                     "<text x=\"120\" y=\"100\" text-anchor=\"middle\">Na &#8594; Na&#8314; + e&#8315;</text>"
                     "<text x=\"120\" y=\"120\" text-anchor=\"middle\">Cl + e&#8315; &#8594; Cl&#8315;</text>"
                     "<rect x=\"240\" y=\"50\" width=\"160\" height=\"90\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"320\" y=\"78\" text-anchor=\"middle\" fill=\"#166534\">covalent (share)</text>"
                     "<text x=\"320\" y=\"100\" text-anchor=\"middle\">Cl&#8211;Cl, H&#8322;, CH&#8324;</text>"
                     "<text x=\"320\" y=\"120\" text-anchor=\"middle\">shared pair counts for both</text>"
                     "<rect x=\"440\" y=\"50\" width=\"160\" height=\"90\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"520\" y=\"78\" text-anchor=\"middle\" fill=\"#a16207\">coordinate (donate)</text>"
                     "<text x=\"520\" y=\"100\" text-anchor=\"middle\">NH&#8324;&#8314;, H&#8323;O&#8314;</text>"
                     "<text x=\"520\" y=\"120\" text-anchor=\"middle\">both e&#8315; from one atom</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"120\" y1=\"140\" x2=\"290\" y2=\"190\"/>"
                     "<line x1=\"320\" y1=\"140\" x2=\"320\" y2=\"190\"/>"
                     "<line x1=\"520\" y1=\"140\" x2=\"350\" y2=\"190\"/>"
                     "</g>"
                     "<rect x=\"230\" y=\"190\" width=\"180\" height=\"46\" rx=\"10\" fill=\"#111827\"/>"
                     "<text x=\"320\" y=\"218\" text-anchor=\"middle\" fill=\"#ffffff\">octet: 8 e&#8315; in valence shell</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">exceptions: BeCl&#8322;/BF&#8323; (too few), PCl&#8325;/SF&#8326; (too many), NO/NO&#8322; (odd)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/02-ionic-bond-and-its-properties.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — what an ionic bond really is, and Fajans' rules\n\n"
                    "An ionic bond is the **electrostatic attraction between oppositely charged ions**, not a "
                    "shared pair. It forms when the electronegativity difference is large (typically > 1.7) "
                    "and the lattice energy released outweighs the ionisation + electron-affinity cost. "
                    "Properties follow directly: high melting points (strong 3-D lattice), brittleness "
                    "(shifting a layer brings like charges face-to-face), conduction only when molten or "
                    "dissolved (ions must be free to move), and solubility in polar solvents.\n\n"
                    "No ionic bond is perfectly ionic — the cation distorts the anion's electron cloud, "
                    "adding covalent character. Fajans' rules quantify this: covalent character increases "
                    "with (1) small cation, (2) large anion, (3) high cation charge, (4) pseudo-noble-gas "
                    "(18-electron) cation configuration. Hence LiCl is more covalent than NaCl, and AgI is "
                    "the most covalent of the silver halides — the classic NEB ranking question."),
             "table": ("Ionic bond properties and Fajans' trend",
                       ["Property / trend", "Explanation", "Example"],
                       [["High melting point", "Strong 3-D electrostatic lattice", "MgO 2852&#176;C vs NaCl 801&#176;C (2+/2&#8722; charges pack harder)"],
                        ["Brittle", "Layer shift aligns like charges &#8594; repulsion", "NaCl crystal cleaves"],
                        ["Conducts only molten/aqueous", "Ions fixed in the solid lattice", "Solid NaCl insulates; molten conducts"],
                        ["Soluble in polar solvents", "Water hydrates and screens the ions", "NaCl in water; insoluble in hexane"],
                        ["Covalent character &#8593;", "Small cation / large anion / high charge / 18e&#8315; cation", "LiCl &gt; NaCl; AgI most covalent of AgX"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Lattice vs hydration — the energy account of dissolving an ionic solid",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"60\" y=\"60\" width=\"200\" height=\"60\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"160\" y=\"86\" text-anchor=\"middle\" fill=\"#1d4ed8\">lattice energy (endothermic)</text>"
                     "<text x=\"160\" y=\"106\" text-anchor=\"middle\" fill=\"#374151\">NaCl(s) &#8594; Na&#8314;(g) + Cl&#8722;(g)  +788 kJ/mol</text>"
                     "<rect x=\"60\" y=\"170\" width=\"200\" height=\"60\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"160\" y=\"196\" text-anchor=\"middle\" fill=\"#166534\">hydration energy (exothermic)</text>"
                     "<text x=\"160\" y=\"216\" text-anchor=\"middle\" fill=\"#374151\">ions + water &#8594; hydrated ions  &#8722;784 kJ/mol</text>"
                     "<line x1=\"260\" y1=\"90\" x2=\"360\" y2=\"90\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<line x1=\"360\" y1=\"90\" x2=\"360\" y2=\"200\" stroke=\"#6b7280\" stroke-width=\"2\" stroke-dasharray=\"4 3\"/>"
                     "<line x1=\"360\" y1=\"200\" x2=\"260\" y2=\"200\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<rect x=\"420\" y=\"110\" width=\"180\" height=\"70\" rx=\"10\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"510\" y=\"138\" text-anchor=\"middle\" fill=\"#111827\">net: slight input</text>"
                     "<text x=\"510\" y=\"158\" text-anchor=\"middle\" fill=\"#6b7280\">dissolution needs entropy</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">smaller/higher-charge ions: both energies grow — MgO's huge lattice energy explains its 2852&#176;C m.p.</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/03-covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — covalent, coordinate and the properties that follow\n\n"
                    "A covalent bond is a **shared pair** with contributions from both atoms (H₂, Cl₂, CH₄); "
                    "a coordinate (dative) bond is a shared pair **both electrons of which come from one "
                    "atom** — the donor needs a lone pair, the acceptor an empty orbital. NH₄⁺ and H₃O⁺ are "
                    "the standard examples: once formed, all N–H (or O–H) bonds are identical, so the "
                    "dative label is bookkeeping, not a real distinction.\n\n"
                    "Properties follow from the molecule, not the bond: covalent compounds are gases/"
                    "volatile liquids/soft solids (weak intermolecular forces between discrete molecules), "
                    "poor conductors (no ions), soluble in non-polar solvents, with lower melting points "
                    "than ionic lattices. Two refinements lift the answer to full marks: (1) network "
                    "covalent solids — diamond, quartz — are covalent throughout and melt above 1500 °C; "
                    "(2) hydrogen-bonded molecules — H₂O, HF, NH₃ — boil far above the trend of their "
                    "hydride families."),
             "table": ("Covalent vs coordinate bond — formation and examples",
                       ["Feature", "Covalent", "Coordinate (dative)"],
                       [["Electron source", "One from each atom", "Both from the donor"],
                        ["Requirement", "Half-filled orbitals overlap", "Donor lone pair + acceptor empty orbital"],
                        ["Examples", "H&#8322;, Cl&#8322;, HCl, CH&#8324;", "NH&#8324;&#8314; (N&#8594;H), H&#8323;O&#8314; (O&#8594;H), BF&#8323;&#183;NH&#8323;"],
                        ["After formation", "Shared pair", "Indistinguishable from covalent"],
                        ["Properties", "Discrete molecules, low m.p., non-conducting", "Same as covalent once formed"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Coordinate bond formation — NH₃ donates its lone pair to H⁺",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"15\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<text x=\"150\" y=\"90\" text-anchor=\"middle\" fill=\"#111827\">H</text>"
                     "<text x=\"150\" y=\"190\" text-anchor=\"middle\" fill=\"#111827\">H</text>"
                     "<text x=\"105\" y=\"140\" text-anchor=\"middle\" fill=\"#111827\">H&#8211;N&#8211;H</text>"
                     "<text x=\"150\" y=\"140\" text-anchor=\"middle\" fill=\"#111827\">N</text>"
                     "<circle cx=\"196\" cy=\"140\" r=\"14\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<text x=\"196\" y=\"146\" text-anchor=\"middle\" fill=\"#a16207\">:</text>"
                     "<text x=\"230\" y=\"145\" fill=\"#1d4ed8\" font-size=\"20\">+</text>"
                     "<text x=\"280\" y=\"145\" fill=\"#991b1b\" font-size=\"20\">H&#8314;</text>"
                     "<path d=\"M212 140 L 262 140\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"238\" y=\"128\" text-anchor=\"middle\" fill=\"#a16207\">lone pair donated</text>"
                     "<text x=\"420\" y=\"140\" fill=\"#166534\" font-size=\"17\">&#8594; [NH&#8324;]&#8314;</text>"
                     "<text x=\"420\" y=\"168\" fill=\"#374151\" font-size=\"13\">all four N&#8211;H bonds identical;</text>"
                     "<text x=\"420\" y=\"188\" fill=\"#374151\" font-size=\"13\">the dative arrow is bookkeeping</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">same story for H&#8322;O + H&#8314; &#8594; H&#8323;O&#8314; (hydronium)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/04-lewis-dot-structure-of-some-common-compounds-of-s-and-p-block-elements.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — a reliable procedure for any Lewis structure\n\n"
                    "Work the same five steps every time: (1) count **total valence electrons** (add for "
                    "anions, subtract for cations); (2) pick the least electronegative atom (never H) as "
                    "central; (3) draw single bonds and complete octets of outer atoms; (4) put leftover "
                    "electrons on the central atom; (5) if the central atom falls short of an octet, convert "
                    "lone pairs into double/triple bonds, and check formal charges to pick the best "
                    "structure.\n\n"
                    "Formal charge = valence e⁻ − (nonbonding e⁻ + ½ bonding e⁻). The best structure "
                    "minimises formal charges and puts negative charge on the more electronegative atom — "
                    "which is why the CO₃²⁻ three-form resonance set and the O₃ structure (central O = +1, "
                    "terminal O = −1) are the exam standards. Watch the two traps: total electrons ≠ dots "
                    "on one atom (CO₂ has 16), and BF₃ is *correctly* drawn with 6 electrons on boron — "
                    "forcing a double bond would put formal charges the wrong way."),
             "table": ("Lewis structures of the standard exam set",
                       ["Species", "Total valence e&#8315;", "Structure (skeleton)", "Note"],
                       [["H&#8322;O", "8", "H&#8211;O&#8211;H with 2 lone pairs on O", "Bent, 104.5&#176;"],
                        ["NH&#8323;", "8", "N with 3 N&#8211;H + 1 lone pair", "Pyramidal, 107&#176;"],
                        ["CH&#8324;", "8", "C with 4 C&#8211;H bonds", "Tetrahedral, 109.5&#176;"],
                        ["CO&#8322;", "16", "O=C=O, two double bonds", "Linear, no lone pairs on C"],
                        ["CO&#8323;&#178;&#8722;", "24", "One C=O + two C&#8211;O&#8315;, resonance over 3 forms", "All C&#8211;O equal (129 pm)"],
                        ["BF&#8323;", "24", "B with 3 B&#8211;F, 6 e&#8315; on B", "Electron-deficient Lewis acid"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Lewis workflow — five steps from formula to structure",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"40\" y=\"40\" width=\"170\" height=\"44\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"125\" y=\"60\" text-anchor=\"middle\">1. count valence e&#8315;</text>"
                     "<text x=\"125\" y=\"76\" text-anchor=\"middle\" fill=\"#6b7280\">add for anions, cut for cations</text>"
                     "<rect x=\"40\" y=\"110\" width=\"170\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"125\" y=\"130\" text-anchor=\"middle\">2. least electronegative = central</text>"
                     "<text x=\"125\" y=\"146\" text-anchor=\"middle\" fill=\"#6b7280\">(never H)</text>"
                     "<rect x=\"40\" y=\"180\" width=\"170\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"125\" y=\"200\" text-anchor=\"middle\">3. single bonds + outer octets</text>"
                     "<rect x=\"40\" y=\"250\" width=\"170\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"125\" y=\"270\" text-anchor=\"middle\">4. leftover e&#8315; on central atom</text>"
                     "<rect x=\"430\" y=\"110\" width=\"170\" height=\"60\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"515\" y=\"132\" text-anchor=\"middle\" fill=\"#166534\">5. short of octet?</text>"
                     "<text x=\"515\" y=\"152\" text-anchor=\"middle\" fill=\"#374151\">turn lone pairs into &#960; bonds</text>"
                     "<rect x=\"430\" y=\"200\" width=\"170\" height=\"60\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"515\" y=\"222\" text-anchor=\"middle\" fill=\"#a16207\">check formal charges</text>"
                     "<text x=\"515\" y=\"242\" text-anchor=\"middle\" fill=\"#374151\">FC = V &#8722; (N + B/2)</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"210\" y1=\"62\" x2=\"240\" y2=\"62\"/><line x1=\"240\" y1=\"62\" x2=\"240\" y2=\"132\"/><line x1=\"240\" y1=\"132\" x2=\"210\" y2=\"132\"/>"
                     "<line x1=\"210\" y1=\"132\" x2=\"240\" y2=\"132\"/><line x1=\"240\" y1=\"132\" x2=\"240\" y2=\"202\"/><line x1=\"240\" y1=\"202\" x2=\"210\" y2=\"202\"/>"
                     "<line x1=\"210\" y1=\"272\" x2=\"300\" y2=\"272\"/><line x1=\"300\" y1=\"272\" x2=\"300\" y2=\"230\"/><line x1=\"300\" y1=\"230\" x2=\"430\" y2=\"140\"/>"
                     "<line x1=\"430\" y1=\"140\" x2=\"430\" y2=\"230\"/><line x1=\"430\" y1=\"230\" x2=\"300\" y2=\"272\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"305\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">CO&#8322;: 16 e&#8315; total &#8594; O=C=O &#183; BF&#8323;: 6 e&#8315; on B is correct — do not force an octet</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/06-vsepr-theory-and-shapes-of-simple-molecules-bef2-bf3-ch4-ch3cl-pcl5-sf6-h2o-nh3-co2-h2s-ph3.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — VSEPR: count domains, then let lone pairs compress\n\n"
                    "VSEPR treats every electron domain (bonding pair, multiple bond counted **once**, lone "
                    "pair) as a charge cloud that repels the others; the molecule adopts the geometry that "
                    "maximises their separation. Repulsion strength: lone pair–lone pair > lone pair–bond "
                    "pair > bond pair–bond pair, so lone pairs compress the angles made by bonding pairs.\n\n"
                    "The canonical set: BeF₂ 2 domains linear 180°; BF₃ 3 domains trigonal planar 120°; CH₄ "
                    "4 domains tetrahedral 109.5°; PCl₅ 5 domains trigonal bipyramidal (120° equatorial, 90° "
                    "axial); SF₆ 6 domains octahedral 90°. With lone pairs the *shape* changes while the "
                    "*domain geometry* stays: NH₃ (4 domains, 1 lone pair) pyramidal 107°; H₂O (4 domains, "
                    "2 lone pairs) bent 104.5°; PH₃ 93.6° (nearly pure p-bonding, weak hybridisation). H₂S "
                    "at 92° shows the same — \u201cH₂O bent, H₂S more so\u201d is the standard NEB contrast."),
             "table": ("VSEPR master table — domains, lone pairs, shape, angle",
                       ["Molecule", "Domains", "Lone pairs", "Shape", "Bond angle"],
                       [["BeF&#8322; / CO&#8322;", "2", "0", "Linear", "180&#176;"],
                        ["BF&#8323;", "3", "0", "Trigonal planar", "120&#176;"],
                        ["CH&#8324; / CH&#8323;Cl", "4", "0", "Tetrahedral", "109.5&#176;"],
                        ["PCl&#8325;", "5", "0", "Trigonal bipyramidal", "120&#176; / 90&#176;"],
                        ["SF&#8326;", "6", "0", "Octahedral", "90&#176;"],
                        ["NH&#8323;", "4", "1", "Trigonal pyramidal", "107&#176;"],
                        ["H&#8322;O", "4", "2", "Bent (V-shape)", "104.5&#176;"],
                        ["H&#8322;S / PH&#8323;", "4", "2 / 1", "Bent / pyramidal", "&#8776;92&#176; / 93.6&#176;"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Lone pairs compress — NH₃ 107°, H₂O 104.5°, CH₄ 109.5°",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<circle cx=\"120\" cy=\"110\" r=\"9\" fill=\"#111827\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"120\" y1=\"110\" x2=\"70\" y2=\"70\"/><line x1=\"120\" y1=\"110\" x2=\"170\" y2=\"70\"/>"
                     "<line x1=\"120\" y1=\"110\" x2=\"120\" y2=\"170\"/><line x1=\"120\" y1=\"110\" x2=\"75\" y2=\"150\"/>"
                     "</g>"
                     "<text x=\"120\" y=\"200\" text-anchor=\"middle\" fill=\"#111827\">CH&#8324;: 109.5&#176;</text>"
                     "</g>"
                     "<g>"
                     "<circle cx=\"320\" cy=\"110\" r=\"9\" fill=\"#111827\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"320\" y1=\"110\" x2=\"275\" y2=\"72\"/><line x1=\"320\" y1=\"110\" x2=\"365\" y2=\"72\"/>"
                     "<line x1=\"320\" y1=\"110\" x2=\"320\" y2=\"170\"/>"
                     "</g>"
                     "<ellipse cx=\"285\" cy=\"145\" rx=\"14\" ry=\"10\" fill=\"#a16207\"/>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#111827\">NH&#8323;: 107&#176; (1 lone pair)</text>"
                     "</g>"
                     "<g>"
                     "<circle cx=\"520\" cy=\"110\" r=\"9\" fill=\"#111827\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"520\" y1=\"110\" x2=\"478\" y2=\"75\"/><line x1=\"520\" y1=\"110\" x2=\"562\" y2=\"75\"/>"
                     "</g>"
                     "<ellipse cx=\"495\" cy=\"150\" rx=\"14\" ry=\"10\" fill=\"#a16207\"/>"
                     "<ellipse cx=\"545\" cy=\"150\" rx=\"14\" ry=\"10\" fill=\"#a16207\"/>"
                     "<text x=\"520\" y=\"200\" text-anchor=\"middle\" fill=\"#111827\">H&#8322;O: 104.5&#176; (2 lone pairs)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#374151\">repulsion: lp&#8211;lp &gt; lp&#8211;bp &gt; bp&#8211;bp &#8594; each lone pair squeezes the bonding angle</text>"
                     "<text x=\"320\" y=\"272\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">multiple bonds count once: CO&#8322; has 2 domains &#8594; linear 180&#176;</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
