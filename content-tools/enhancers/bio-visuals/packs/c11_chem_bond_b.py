# Chemistry class-11 — Chemical bonding part B (resonance, VBT, hybridisation, dipole, H-bond, metallic)
PART_A = [
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/05-resonance.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — resonance in molecules, not just in benzene\n\n"
                    "Whenever a single Lewis structure cannot place the electrons correctly, the real "
                    "structure is the resonance hybrid of all valid contributors. The standard cases:\n\n"
                    "- **O₃** — two equal contributors; both O–O bonds are identical at 128 pm, between a "
                    "single (148 pm) and a double (110 pm) bond.\n"
                    "- **CO₃²⁻** — three equal contributors; all three C–O bonds 129 pm, and the three "
                    "negative charges are shared equally over the oxygens.\n"
                    "- **CO₂, benzene, carboxylate, nitrate** — the same logic gives equal bonds where a "
                    "single formula predicts unequal ones.\n\n"
                    "Resonance energy = energy of the most stable contributor − energy of the hybrid (a "
                    "stabilisation, always positive in effect). Quality beats quantity: a contributor with "
                    "full octets, minimal formal charge and negative charge on the electronegative atom "
                    "contributes far more than a charge-separated oddity. And the golden rule for diagrams: "
                    "atoms and σ bonds never move — only π electrons and lone pairs shift."),
             "table": ("Resonance cases and the bond lengths that prove them",
                       ["Molecule", "Contributors", "Predicted (single formula)", "Observed", "Meaning"],
                       [["O&#8323;", "2 equal", "1 single + 1 double", "Both 128 pm", "Hybrid is real"],
                        ["CO&#8323;&#178;&#8722;", "3 equal", "1 C=O + 2 C&#8211;O", "All 129 pm", "Charge spread equally"],
                        ["Benzene", "2 Kekul&#233;", "3 C=C + 3 C&#8211;C", "All 139 pm", "Delocalisation energy ~150 kJ/mol"],
                        ["NO&#8323;&#8722;", "3 equal", "1 N=O + 2 N&#8211;O", "All equal", "Nitrate symmetry"],
                        ["Carboxylate RCOO&#8722;", "2 equal", "C=O + C&#8211;O", "Both &#8776; 125 pm", "Acid strength basis"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Ozone — two contributors, one hybrid, one measured bond length",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g font-size=\"15\" fill=\"#111827\" text-anchor=\"middle\">"
                     "<text x=\"110\" y=\"120\">O</text>"
                     "<text x=\"170\" y=\"90\">O</text>"
                     "<text x=\"110\" y=\"150\" fill=\"#1d4ed8\">&#8211;</text>"
                     "<text x=\"145\" y=\"105\" fill=\"#1d4ed8\">=</text>"
                     "</g>"
                     "<text x=\"110\" y=\"190\" text-anchor=\"middle\" fill=\"#374151\">contributor I</text>"
                     "<g font-size=\"15\" fill=\"#111827\" text-anchor=\"middle\">"
                     "<text x=\"310\" y=\"120\">O</text>"
                     "<text x=\"370\" y=\"90\">O</text>"
                     "<text x=\"330\" y=\"105\" fill=\"#1d4ed8\">=</text>"
                     "<text x=\"372\" y=\"150\" fill=\"#1d4ed8\">&#8211;</text>"
                     "</g>"
                     "<text x=\"340\" y=\"190\" text-anchor=\"middle\" fill=\"#374151\">contributor II</text>"
                     "<text x=\"225\" y=\"120\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"26\">&#8596;</text>"
                     "<text x=\"500\" y=\"105\" text-anchor=\"middle\" fill=\"#166534\" font-size=\"15\">hybrid:</text>"
                     "<text x=\"500\" y=\"130\" text-anchor=\"middle\" fill=\"#166534\" font-size=\"15\">both bonds 128 pm</text>"
                     "<text x=\"500\" y=\"155\" text-anchor=\"middle\" fill=\"#166534\" font-size=\"13\">(single 148, double 110)</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">only &#960; electrons and lone pairs move; atoms and &#963; bonds stay put</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/07-elementary-idea-of-valence-bond-theory.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — σ and π: why the first bond is always the strong one\n\n"
                    "Valence bond theory says a bond forms when two half-filled atomic orbitals overlap and "
                    "the paired electrons localise between the nuclei. The **overlap decides everything**:\n\n"
                    "- **σ (sigma)** — head-on overlap along the internuclear axis (s–s, s–p, p–p). "
                    "Symmetric about the axis, no nodal plane containing it; strongest because the "
                    "electron density sits directly between the nuclei.\n"
                    "- **π (pi)** — sideways overlap of parallel p orbitals, above and below the axis, "
                    "with a nodal plane through the nuclei. Weaker (C=C total 610 kJ/mol = σ 348 + π 262; "
                    "C–C single 348) and prevents rotation — the origin of cis–trans isomerism.\n\n"
                    "Rules NEB tests: a π bond never exists alone — between two atoms the first bond is "
                    "always σ, additional bonds are π (double = 1σ + 1π, triple = 1σ + 2π). A σ bond "
                    "offers free rotation; π locks the geometry. And a π bond's electrons are more "
                    "exposed, which is why alkenes are the reactive site in addition reactions."),
             "table": ("σ vs π — overlap, strength, consequences",
                       ["Feature", "σ bond", "π bond"],
                       [["Overlap", "Head-on along the axis", "Sideways, parallel p orbitals"],
                        ["Electron density", "Between the nuclei", "Above and below the axis"],
                        ["Nodal plane", "None containing the axis", "One plane through both nuclei"],
                        ["Strength (C–C)", "348 kJ/mol", "adds &#8776;262 kJ/mol"],
                        ["Rotation", "Free rotation possible", "Rotation breaks the bond &#8594; cis/trans isomers"],
                        ["Existence", "Can exist alone", "Only with a &#963; between the same atoms"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Head-on σ vs sideways π — the double bond is one of each",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<circle cx=\"150\" cy=\"150\" r=\"26\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"250\" cy=\"150\" r=\"26\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<ellipse cx=\"200\" cy=\"150\" rx=\"30\" ry=\"14\" fill=\"#1d4ed8\" opacity=\"0.5\"/>"
                     "<text x=\"200\" y=\"210\" text-anchor=\"middle\" fill=\"#111827\">&#963;: head-on overlap</text>"
                     "<text x=\"200\" y=\"230\" text-anchor=\"middle\" fill=\"#6b7280\">density between nuclei, strongest</text>"
                     "</g>"
                     "<g>"
                     "<circle cx=\"450\" cy=\"120\" r=\"24\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"550\" cy=\"120\" r=\"24\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<ellipse cx=\"500\" cy=\"90\" rx=\"28\" ry=\"10\" fill=\"#991b1b\" opacity=\"0.55\"/>"
                     "<ellipse cx=\"500\" cy=\"150\" rx=\"28\" ry=\"10\" fill=\"#991b1b\" opacity=\"0.55\"/>"
                     "<text x=\"500\" y=\"210\" text-anchor=\"middle\" fill=\"#111827\">&#960;: sideways overlap</text>"
                     "<text x=\"500\" y=\"230\" text-anchor=\"middle\" fill=\"#6b7280\">lobes above and below; nodal plane through nuclei</text>"
                     "</g>"
                     "<text x=\"320\" y=\"275\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"13\">C=C = 1&#963; (348) + 1&#960; (262) = 610 kJ/mol; C&#8801;C = 1&#963; + 2&#960; = 812 kJ/mol</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/08-hybridization-involving-s-and-p-orbitals-only.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — hybridisation: mixing, geometry and s-character\n\n"
                    "Hybridisation mixes atomic orbitals of *one atom* (similar energy) into new equivalent "
                    "hybrids pointed where the bonds need to go. The count of hybrids equals the count of "
                    "mixed orbitals; the geometry follows the hybrid type:\n\n"
                    "- **sp** — one s + one p; two hybrids at 180°, two unhybridised p remain for two π "
                    "bonds (ethyne HC≡CH, BeCl₂, CO₂).\n"
                    "- **sp²** — one s + two p; three hybrids at 120° trigonal planar, one p left for π "
                    "(ethene, BF₃, graphite).\n"
                    "- **sp³** — one s + three p; four hybrids at 109.5° tetrahedral (CH₄). With lone "
                    "pairs the hybrids still exist: NH₃ (1 lp → 107°), H₂O (2 lp → 104.5°).\n\n"
                    "Two consequences NEB loves: more s-character pulls electrons closer, so bond length "
                    "shrinks and electronegativity rises (sp C–H 106 pm < sp² 108.5 < sp³ 109.4; and "
                    "ethyne's C–H is more acidic). And hybridisation is inferred from geometry, not the "
                    "other way round — count σ domains, then name the hybrid."),
             "table": ("sp, sp², sp³ — geometry, examples, s-character effects",
                       ["Hybrid", "Mixed from", "Geometry / angle", "π orbitals left", "Examples"],
                       [["sp", "1 s + 1 p", "Linear 180&#176;", "2", "C&#8322;H&#8322;, BeCl&#8322;, CO&#8322;"],
                        ["sp&#178;", "1 s + 2 p", "Trigonal planar 120&#176;", "1", "C&#8322;H&#8324;, BF&#8323;, graphite"],
                        ["sp&#179;", "1 s + 3 p", "Tetrahedral 109.5&#176;", "0", "CH&#8324;; NH&#8323; 107&#176;; H&#8322;O 104.5&#176;"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Ethene and ethyne — hybrids make the σ frame, p orbitals make the π bonds",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<circle cx=\"200\" cy=\"120\" r=\"11\" fill=\"#111827\"/>"
                     "<circle cx=\"280\" cy=\"120\" r=\"11\" fill=\"#111827\"/>"
                     "<line x1=\"211\" y1=\"120\" x2=\"269\" y2=\"120\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<ellipse cx=\"240\" cy=\"95\" rx=\"30\" ry=\"9\" fill=\"#991b1b\" opacity=\"0.5\"/>"
                     "<ellipse cx=\"240\" cy=\"145\" rx=\"30\" ry=\"9\" fill=\"#991b1b\" opacity=\"0.5\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"189\" y1=\"112\" x2=\"150\" y2=\"85\"/><line x1=\"189\" y1=\"128\" x2=\"150\" y2=\"155\"/>"
                     "<line x1=\"291\" y1=\"112\" x2=\"330\" y2=\"85\"/><line x1=\"291\" y1=\"128\" x2=\"330\" y2=\"155\"/>"
                     "</g>"
                     "<text x=\"240\" y=\"200\" text-anchor=\"middle\" fill=\"#111827\">ethene: sp&#178; + 1&#960; (planar, 120&#176;)</text>"
                     "</g>"
                     "<g>"
                     "<circle cx=\"480\" cy=\"120\" r=\"10\" fill=\"#111827\"/>"
                     "<circle cx=\"540\" cy=\"120\" r=\"10\" fill=\"#111827\"/>"
                     "<line x1=\"490\" y1=\"120\" x2=\"530\" y2=\"120\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<ellipse cx=\"510\" cy=\"92\" rx=\"26\" ry=\"8\" fill=\"#991b1b\" opacity=\"0.5\"/>"
                     "<ellipse cx=\"510\" cy=\"148\" rx=\"26\" ry=\"8\" fill=\"#991b1b\" opacity=\"0.5\"/>"
                     "<ellipse cx=\"510\" cy=\"70\" rx=\"26\" ry=\"8\" fill=\"#a16207\" opacity=\"0.5\"/>"
                     "<ellipse cx=\"510\" cy=\"170\" rx=\"26\" ry=\"8\" fill=\"#a16207\" opacity=\"0.5\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"471\" y1=\"115\" x2=\"440\" y2=\"95\"/><line x1=\"471\" y1=\"125\" x2=\"440\" y2=\"145\"/>"
                     "<line x1=\"549\" y1=\"115\" x2=\"580\" y2=\"95\"/><line x1=\"549\" y1=\"125\" x2=\"580\" y2=\"145\"/>"
                     "</g>"
                     "<text x=\"510\" y=\"210\" text-anchor=\"middle\" fill=\"#111827\">ethyne: sp + 2&#960; (linear, 180&#176;)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#374151\">more s-character &#8594; shorter bonds, higher electronegativity, more acidic C&#8211;H</text>"
                     "<text x=\"320\" y=\"278\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">count &#963; domains first; hybridisation is the explanation, geometry the observation</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/09-bond-characteristics-bond-length-ionic-character-dipole-moment.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — dipole moment: the vector that measures uneven sharing\n\n"
                    "When two different atoms share a pair unequally, the bond becomes a dipole: μ = q × d, "
                    "measured in debye (1 D = 3.336 × 10⁻³⁰ C·m). The chemists' arrow (crossed) points from "
                    "δ+ to δ−; the physicists' vector points the opposite way — a one-mark trap.\n\n"
                    "Molecular dipole = **vector sum** of bond dipoles, so geometry decides: CO₂ has two "
                    "polar C=O bonds but μ = 0 (linear, cancellation); H₂O is bent at 104.5° so the dipoles "
                    "add to 1.85 D; BF₃ (trigonal planar) cancels to zero while NH₃ (pyramidal) gives "
                    "1.47 D. Percent ionic character = (μ_observed / μ_ionic) × 100: HF is 1.91 D against a "
                    "theoretical fully-ionic 4.18 D → about 43% ionic — polar covalent, not ionic.\n\n"
                    "Bond length follows from size and order: H–F 91.8 < H–Cl 127.4 < H–Br 141.4 < H–I "
                    "160.9 pm (bigger halogen); and C–C 154 > C=C 134 > C≡C 120 pm (higher order pulls "
                    "harder)."),
             "table": ("Dipole moments and bond lengths — the numbers to quote",
                       ["Species", "Shape", "μ (D)", "Why"],
                       [["CO&#8322;", "Linear", "0", "Two equal C=O dipoles cancel"],
                        ["BF&#8323;", "Trigonal planar", "0", "Three dipoles at 120&#176; cancel"],
                        ["H&#8322;O", "Bent 104.5&#176;", "1.85", "Dipoles add across the angle"],
                        ["NH&#8323;", "Pyramidal", "1.47", "Lone-pair direction adds"],
                        ["HF", "—", "1.91 (&#8776;43% ionic)", "Most polar of the HX series"],
                        ["CCl&#8324;", "Tetrahedral", "0", "Four equal dipoles cancel"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Vector addition of bond dipoles — geometry decides the molecular dipole",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<circle cx=\"130\" cy=\"120\" r=\"10\" fill=\"#111827\"/>"
                     "<circle cx=\"80\" cy=\"75\" r=\"8\" fill=\"#1d4ed8\"/>"
                     "<circle cx=\"180\" cy=\"75\" r=\"8\" fill=\"#1d4ed8\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"122\" y1=\"113\" x2=\"90\" y2=\"84\"/><line x1=\"138\" y1=\"113\" x2=\"170\" y2=\"84\"/>"
                     "</g>"
                     "<text x=\"130\" y=\"165\" text-anchor=\"middle\" fill=\"#111827\">CO&#8322; linear: &#956; = 0</text>"
                     "<text x=\"130\" y=\"186\" text-anchor=\"middle\" fill=\"#6b7280\">equal, opposite, cancel</text>"
                     "</g>"
                     "<g>"
                     "<circle cx=\"350\" cy=\"100\" r=\"10\" fill=\"#111827\"/>"
                     "<circle cx=\"305\" cy=\"70\" r=\"8\" fill=\"#1d4ed8\"/>"
                     "<circle cx=\"395\" cy=\"70\" r=\"8\" fill=\"#1d4ed8\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"343\" y1=\"93\" x2=\"315\" y2=\"78\"/><line x1=\"357\" y1=\"93\" x2=\"385\" y2=\"78\"/>"
                     "</g>"
                     "<path d=\"M350 100 L 350 60\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M350 60 L 344 74 L 356 74 Z\" fill=\"#166534\"/>"
                     "<text x=\"350\" y=\"165\" text-anchor=\"middle\" fill=\"#111827\">H&#8322;O bent: &#956; = 1.85 D</text>"
                     "<text x=\"350\" y=\"186\" text-anchor=\"middle\" fill=\"#6b7280\">net vector points to O side</text>"
                     "</g>"
                     "<g>"
                     "<text x=\"540\" y=\"90\" text-anchor=\"middle\" fill=\"#111827\" font-size=\"15\">% ionic =</text>"
                     "<text x=\"540\" y=\"115\" text-anchor=\"middle\" fill=\"#111827\" font-size=\"14\">(&#956;obs / &#956;ionic) &#215; 100</text>"
                     "<text x=\"540\" y=\"145\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">HF: 1.91/4.18 &#8776; 43%</text>"
                     "</g>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#374151\">bond dipoles are vectors — molecular dipole is their sum</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">chemists' crossed arrow points &#948;+ &#8594; &#948;&#8722; (opposite to the physics vector)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/10-vander-waal-s-force-and-molecular-solids-hydrogen-bonding-and-its-application.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the weak-force hierarchy and hydrogen bonding\n\n"
                    "Intermolecular forces rank: ion–ion (> 100 kJ/mol) > hydrogen bond (10–40) > "
                    "dipole–dipole (5–25) > London dispersion (0.5–10, but growing with electron count). "
                    "Dispersion forces exist in *every* substance — momentary dipoles induced by electron "
                    "motion — which is why I₂ is solid while F₂ is gas: more electrons, bigger polarisable "
                    "cloud, stronger dispersion.\n\n"
                    "Hydrogen bonding needs **H bonded to F, O or N** and a lone pair on the acceptor. "
                    "Consequences NEB asks for: H₂O (b.p. 100 °C) vs H₂S (−60 °C); NH₃ > PH₃; HF > HCl; "
                    "ice less dense than water (open tetrahedral H-bond lattice); o-nitrophenol (intramolecular "
                    "H-bond, volatile, less soluble) vs p-nitrophenol (intermolecular, higher b.p., "
                    "water-soluble) — the classic contrast pair. Note the direction: intramolecular "
                    "H-bonding *lowers* boiling point (molecules stick to themselves, not to neighbours)."),
             "table": ("Intermolecular forces — strength, requirement, evidence",
                       ["Force", "Strength (kJ/mol)", "Requirement", "Evidence"],
                       [["Ion&#8211;ion", "&gt; 100", "Charged species", "NaCl lattice"],
                        ["H-bond", "10&#8211;40", "H on F/O/N + lone-pair acceptor", "H&#8322;O 100&#176;C vs H&#8322;S &#8722;60&#176;C"],
                        ["Dipole&#8211;dipole", "5&#8211;25", "Permanent dipoles", "HCl b.p. &#8722;85&#176;C vs Ar &#8722;186&#176;C"],
                        ["London dispersion", "0.5&#8211;10", "None — universal, grows with size", "I&#8322; solid, F&#8322; gas; pentane &gt; butane"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Intermolecular H-bond raises b.p.; intramolecular lowers it",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<text x=\"150\" y=\"60\" text-anchor=\"middle\" fill=\"#111827\">p-nitrophenol: intermolecular</text>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\" stroke-dasharray=\"5 3\">"
                     "<line x1=\"120\" y1=\"110\" x2=\"180\" y2=\"110\"/>"
                     "<line x1=\"240\" y1=\"110\" x2=\"300\" y2=\"110\"/>"
                     "</g>"
                     "<g fill=\"#111827\">"
                     "<circle cx=\"105\" cy=\"110\" r=\"12\"/><circle cx=\"195\" cy=\"110\" r=\"12\"/>"
                     "<circle cx=\"225\" cy=\"110\" r=\"12\"/><circle cx=\"315\" cy=\"110\" r=\"12\"/>"
                     "</g>"
                     "<text x=\"150\" y=\"150\" text-anchor=\"middle\" fill=\"#166534\">molecules chain to neighbours</text>"
                     "<text x=\"150\" y=\"172\" text-anchor=\"middle\" fill=\"#166534\">higher b.p., water-soluble</text>"
                     "</g>"
                     "<g>"
                     "<text x=\"480\" y=\"60\" text-anchor=\"middle\" fill=\"#111827\">o-nitrophenol: intramolecular</text>"
                     "<circle cx=\"450\" cy=\"110\" r=\"26\" fill=\"none\" stroke=\"#111827\" stroke-width=\"2\"/>"
                     "<path d=\"M450 84 C 470 60, 500 60, 505 84\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"5 3\"/>"
                     "<text x=\"480\" y=\"150\" text-anchor=\"middle\" fill=\"#991b1b\">H-bond inside one molecule</text>"
                     "<text x=\"480\" y=\"172\" text-anchor=\"middle\" fill=\"#991b1b\">lower b.p., steam-volatile</text>"
                     "</g>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#374151\">boiling-point evidence: H&#8322;O 100&#176;C &#183; HF 19.5&#176;C &#183; NH&#8323; &#8722;33&#176;C &#183; H&#8322;S &#8722;60&#176;C</text>"
                     "<text x=\"320\" y=\"253\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">ice floats: the open H-bond tetrahedral lattice is less dense than liquid water</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-bonding-and-shapes-of-molecules/11-metallic-bonding-and-properties-of-metallic-solids.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the electron-sea model explains every metal property\n\n"
                    "Metallic bonding: low-electronegativity atoms release their valence electrons into a "
                    "**delocalised sea** surrounding a lattice of positive kernels. One model, every "
                    "property:\n\n"
                    "- **Conductivity** — the sea carries charge; heating increases lattice vibrations and "
                    "*lowers* conductivity (resistance up), the opposite of semiconductors.\n"
                    "- **Malleability/ductility** — the non-directional sea re-forms after layers shift; an "
                    "ionic lattice would shatter instead.\n"
                    "- **Lustre** — the free electrons absorb and re-emit light across the visible range.\n"
                    "- **Thermal conductivity** — free electrons carry kinetic energy.\n"
                    "- **Melting-point range** — bond strength follows the number of delocalised electrons "
                    "and cation charge/size: W 3410 °C vs Na 98 °C vs Hg liquid.\n\n"
                    "Distinguish from covalent solids (localized shared pairs) and ionic solids (fixed "
                    "ions): the delocalisation is the whole point — \u201cmetals conduct in the solid\u201d "
                    "is the one-line answer."),
             "table": ("Electron-sea model — property, mechanism, contrast",
                       ["Property", "Mechanism in the electron sea", "Contrast with"],
                       [["Electrical conduction (solid)", "Delocalised e&#8315; drift under field", "Ionic solid: ions locked, no conduction"],
                        ["Malleable and ductile", "Non-directional sea re-forms after layer slip", "Ionic brittle: like charges meet"],
                        ["Lustre", "e&#8315; absorb and re-emit visible light", "Covalent/ionic: fixed e&#8315;, dull"],
                        ["Thermal conduction", "Free e&#8315; transport kinetic energy", "Molecular solids: slow phonon only"],
                        ["M.p. range 98&#8211;3410&#176;C", "Strength &#8747; delocalised e&#8315; per atom, charge/size", "Molecular solids all &lt; 400&#176;C"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("The electron sea — cation kernels in a mobile cloud of valence electrons",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"90\" y=\"60\" width=\"460\" height=\"170\" rx=\"12\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"150\" cy=\"110\" r=\"16\"/><circle cx=\"250\" cy=\"110\" r=\"16\"/>"
                     "<circle cx=\"350\" cy=\"110\" r=\"16\"/><circle cx=\"450\" cy=\"110\" r=\"16\"/>"
                     "<circle cx=\"150\" cy=\"180\" r=\"16\"/><circle cx=\"250\" cy=\"180\" r=\"16\"/>"
                     "<circle cx=\"350\" cy=\"180\" r=\"16\"/><circle cx=\"450\" cy=\"180\" r=\"16\"/>"
                     "</g>"
                     "<g font-size=\"12\" fill=\"#ffffff\" text-anchor=\"middle\">"
                     "<text x=\"150\" y=\"115\">+</text><text x=\"250\" y=\"115\">+</text>"
                     "<text x=\"350\" y=\"115\">+</text><text x=\"450\" y=\"115\">+</text>"
                     "<text x=\"150\" y=\"185\">+</text><text x=\"250\" y=\"185\">+</text>"
                     "<text x=\"350\" y=\"185\">+</text><text x=\"450\" y=\"185\">+</text>"
                     "</g>"
                     "<g fill=\"#991b1b\">"
                     "<circle cx=\"200\" cy=\"95\" r=\"4\"/><circle cx=\"300\" cy=\"130\" r=\"4\"/>"
                     "<circle cx=\"400\" cy=\"95\" r=\"4\"/><circle cx=\"500\" cy=\"130\" r=\"4\"/>"
                     "<circle cx=\"200\" cy=\"165\" r=\"4\"/><circle cx=\"300\" cy=\"195\" r=\"4\"/>"
                     "<circle cx=\"400\" cy=\"165\" r=\"4\"/><circle cx=\"500\" cy=\"195\" r=\"4\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"260\" text-anchor=\"middle\" fill=\"#374151\">+ = metal cation kernels &#183; red = delocalised valence electrons</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">non-directional bonding &#8594; layers slip without shattering &#8594; malleable, ductile, conducting</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
