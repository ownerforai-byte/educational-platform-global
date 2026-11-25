# Physics class-11 — electrostatics + capacitor full enrichment (6 files)
PART_A = [
    {
        "file": "class-11/physics/capacitor/02-combination-capacitors.json",
        "blocks": [
            {"after": "**Series Combination Theory:** In a series arrangement, capa",
             "md": ("### Deep dive: series and parallel are exact opposites\n\nIn series, every plate chain carries the *same charge* Q while voltages divide, so $1/C_s = 1/C_1 + 1/C_2 + ...$ and the equivalent is smaller than the smallest capacitor — the pair behaves like a thinner effective gap. In parallel, all capacitors share the *same voltage* while charges add, so $C_p = C_1 + C_2 + ...$ and the equivalent is larger than the largest. A memory hook: capacitors combine exactly like resistors with the roles of series and parallel swapped. NEB's trick question — two identical capacitors in series store half the energy of one at the same voltage, because $U = \\frac{1}{2}CV^2$ and $C$ halved."),
             "table1": {"title": "Series vs parallel capacitors",
                        "headers": ["Property", "Series", "Parallel"],
                        "rows": [
                            ["Charge", "same Q on each", "Q divides: $q_i = C_iV$"],
                            ["Voltage", "divides: $V_i = Q/C_i$", "same V across each"],
                            ["Equivalent", "$1/C_s = \\sum 1/C_i$", "$C_p = \\sum C_i$"],
                            ["Compared to members", "smaller than smallest", "larger than largest"],
                            ["Energy at same V", "less than one alone", "more than one alone"],
                        ]},
             "table2": {"title": "Capacitor vs resistor combination rules",
                        "headers": ["Arrangement", "Capacitors", "Resistors"],
                        "rows": [
                            ["Series", "$1/C_s = \\sum 1/C_i$ (shrinks)", "$R_s = \\sum R_i$ (grows)"],
                            ["Parallel", "$C_p = \\sum C_i$ (grows)", "$1/R_p = \\sum 1/R_i$ (shrinks)"],
                            ["Same charge flows?", "yes in series", "yes in series"],
                            ["Same voltage across?", "yes in parallel", "yes in parallel"],
                        ]},
             "svg": ("Series vs parallel capacitors — charge vs voltage bookkeeping",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<line x1=\"90\" y1=\"100\" x2=\"160\" y2=\"100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"160\" y1=\"80\" x2=\"160\" y2=\"120\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<line x1=\"175\" y1=\"80\" x2=\"175\" y2=\"120\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<line x1=\"175\" y1=\"100\" x2=\"245\" y2=\"100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"245\" y1=\"80\" x2=\"245\" y2=\"120\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<line x1=\"260\" y1=\"80\" x2=\"260\" y2=\"120\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<line x1=\"260\" y1=\"100\" x2=\"330\" y2=\"100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<text x=\"210\" y=\"145\" fill=\"#1d4ed8\">series: same Q, V divides</text>"
                     "<line x1=\"90\" y1=\"220\" x2=\"120\" y2=\"220\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"120\" y1=\"200\" x2=\"120\" y2=\"240\" stroke=\"#a16207\" stroke-width=\"3\"/>"
                     "<line x1=\"135\" y1=\"200\" x2=\"135\" y2=\"240\" stroke=\"#a16207\" stroke-width=\"3\"/>"
                     "<line x1=\"120\" y1=\"220\" x2=\"300\" y2=\"220\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"180\" y1=\"200\" x2=\"180\" y2=\"240\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<line x1=\"195\" y1=\"200\" x2=\"195\" y2=\"240\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<line x1=\"180\" y1=\"220\" x2=\"300\" y2=\"220\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"300\" y1=\"220\" x2=\"300\" y2=\"190\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"300\" y1=\"190\" x2=\"90\" y2=\"190\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"90\" y1=\"190\" x2=\"90\" y2=\"220\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<text x=\"210\" y=\"265\" fill=\"#a16207\">parallel: same V, Q adds</text>"
                     "</g>"
                     "</svg>"),
            },
            {"after": "**Redistribution of Charge & Loss of Energy:** When two isol",
             "svg": ("Two identical capacitors in series — half the energy",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"80\" y=\"70\" width=\"220\" height=\"100\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"190\" y=\"100\" fill=\"#1d4ed8\">one capacitor</text>"
                     "<text x=\"190\" y=\"125\" fill=\"#374151\" font-size=\"12\">U = &#189;CV&#178;</text>"
                     "<rect x=\"340\" y=\"70\" width=\"220\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"450\" y=\"100\" fill=\"#166534\">two in series</text>"
                     "<text x=\"450\" y=\"125\" fill=\"#374151\" font-size=\"12\">C/2 &#8594; U = &#188;CV&#178;</text>"
                     "<text x=\"450\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">half the energy of one</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">same V, half the C, half the stored energy</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/capacitor/03-energy-charged-capacitor.json",
        "blocks": [
            {"after": "**Physical Origin of Stored Energy:** Charging a capacitor i",
             "md": ("### Deep dive: where the energy lives — in the field, not the plates\n\nCharging moves charge *against* the growing repulsion, so the external source does work $W = \\int_0^Q (q/C)\\,dq = \\frac{1}{2}QV = \\frac{1}{2}CV^2$. Modern electrodynamics locates that energy in the electric field itself, with density $u = \\frac{1}{2}\\varepsilon_0 E^2$ — which is why pulling the plates of an *isolated* charged capacitor apart *raises* the stored energy: Q is fixed, C falls, and the field does negative work on you (you feel the attraction as you pull). Conversely, with a battery still connected (V fixed), pulling apart *lowers* the energy and the battery absorbs the difference. This isolated-vs-connected distinction is NEB's favourite conceptual trap."),
             "table1": {"title": "Energy formulas — three equivalent faces",
                        "headers": ["Given", "Formula", "Use when"],
                        "rows": [
                            ["Charge Q known", "$U = Q&#178;/2C$", "isolated capacitor after disconnect"],
                            ["Voltage V known", "$U = \\frac{1}{2}CV&#178;$", "battery still connected"],
                            ["Both known", "$U = \\frac{1}{2}QV$", "quick check: half of QV"],
                            ["Field density", "$u = \\frac{1}{2}\\varepsilon_0E&#178;$", "energy per unit volume"],
                            ["Units", "joule (J)", "all forms equivalent"],
                        ]},
             "table2": {"title": "Pulling the plates apart — isolated vs connected",
                        "headers": ["Setup", "What stays fixed", "C", "U", "Who pays"],
                        "rows": [
                            ["Isolated (battery removed)", "Q", "falls (1/d)", "rises", "your muscles do work"],
                            ["Connected to battery", "V", "falls (1/d)", "falls", "charge flows back to battery"],
                            ["Isolated, plates pushed together", "Q", "rises", "falls", "field does work on you"],
                            ["Energy density between plates", "&#8212;", "&#8212;", "$\\frac{1}{2}\\varepsilon_0E&#178;$", "stored in the field"],
                        ]},
             "svg": ("Charging work — q/C grows, area under the graph = ½QV",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"90\" y1=\"220\" x2=\"560\" y2=\"220\"/>"
                     "<line x1=\"90\" y1=\"220\" x2=\"90\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M110 220 L 500 80\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M110 220 L 500 80 L 500 220 Z\" fill=\"#eff6ff\" stroke=\"none\"/>"
                     "<text x=\"300\" y=\"130\" text-anchor=\"middle\" fill=\"#1d4ed8\">work = area = &#189;QV</text>"
                     "<text x=\"90\" y=\"55\" fill=\"#111827\">V = q/C</text>"
                     "<text x=\"570\" y=\"240\" fill=\"#111827\">q</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">each extra dq costs (q/C)dq against the growing repulsion</text>"
                     "</svg>"),
            },
            {"after": "Pulling the plates of an isolated charged capacitor farther ",
             "svg": ("Isolated vs battery-connected — energy moves opposite ways",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"185\" y=\"100\" fill=\"#991b1b\">isolated (Q fixed)</text>"
                     "<text x=\"185\" y=\"125\" fill=\"#374151\" font-size=\"12\">pull apart &#8594; U rises</text>"
                     "<text x=\"185\" y=\"150\" fill=\"#374151\" font-size=\"12\">you do work against attraction</text>"
                     "<rect x=\"340\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"455\" y=\"100\" fill=\"#166534\">battery connected (V fixed)</text>"
                     "<text x=\"455\" y=\"125\" fill=\"#374151\" font-size=\"12\">pull apart &#8594; U falls</text>"
                     "<text x=\"455\" y=\"150\" fill=\"#374151\" font-size=\"12\">charge returns to the battery</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">the fixed quantity decides which way the energy moves</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/capacitor/04-dielectric-effect.json",
        "blocks": [
            {"after": "**Dielectrics & Classification:** A dielectric is an insulat",
             "md": ("### Deep dive: polarization fights the field, capacitance wins\n\nA dielectric contains no free charges, but its molecules *polarize*: the external field stretches or aligns molecular dipoles, producing bound surface charges that create an opposing field $E_p$. The net field inside falls to $E = E_0/K$ ($K$ = dielectric constant), and since $V$ falls at fixed Q, capacitance rises to $C = KC_0$. Every practical capacitor exploits this — paper (K ≈ 2–3), mica (≈ 5–6), ceramics and electrolytics with K in the thousands. Polar molecules (water, K ≈ 80) align with the field; non-polar molecules (N₂, H₂) merely distort. The susceptibility link $K = 1 + \\chi$ closes the loop with the polarization $P = \\varepsilon_0\\chi E$."),
             "table1": {"title": "Dielectric constants and consequences",
                        "headers": ["Material", "K (dielectric constant)", "Use"],
                        "rows": [
                            ["Vacuum", "1", "reference"],
                            ["Air", "&#8776; 1.0006", "practically 1"],
                            ["Paper", "2&#8211;3", "capacitor dielectric"],
                            ["Mica", "5&#8211;6", "high-quality capacitors"],
                            ["Water", "&#8776; 80", "strongly polar solvent"],
                        ]},
             "table2": {"title": "Inserting a dielectric — isolated vs connected",
                        "headers": ["Setup", "Fixed quantity", "C", "V", "U", "Q"],
                        "rows": [
                            ["Isolated", "Q", "&#8594; KC&#8320;", "falls to V/K", "falls to U/K", "same"],
                            ["Battery connected", "V", "&#8594; KC&#8320;", "same", "rises to KU", "rises to KQ"],
                            ["Field inside", "&#8212;", "&#8212;", "E = E&#8320;/K", "&#8212;", "&#8212;"],
                            ["Force on dielectric", "&#8212;", "&#8212;", "pulled inward", "&#8212;", "&#8212;"],
                        ]},
             "svg": ("Polarization — bound charges oppose the applied field",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"200\" y=\"90\" width=\"240\" height=\"100\" fill=\"#f3f4f6\" stroke=\"#6b7280\"/>"
                     "<text x=\"320\" y=\"145\" text-anchor=\"middle\" fill=\"#374151\">dielectric slab</text>"
                     "<g text-anchor=\"middle\" font-size=\"11\">"
                     "<text x=\"215\" y=\"80\" fill=\"#991b1b\">&#8722;&#8722;&#8722;&#8722;&#8722;&#8722;</text>"
                     "<text x=\"425\" y=\"80\" fill=\"#1d4ed8\">++++++</text>"
                     "</g>"
                     "<path d=\"M100 140 L 190 140\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M190 140 L 176 133 L 176 147 Z\" fill=\"#1d4ed8\"/>"
                     "<path d=\"M450 140 L 540 140\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M540 140 L 526 133 L 526 147 Z\" fill=\"#1d4ed8\"/>"
                     "<text x=\"120\" y=\"125\" fill=\"#1d4ed8\">E&#8320; applied</text>"
                     "<text x=\"320\" y=\"235\" text-anchor=\"middle\" fill=\"#166534\">net inside: E = E&#8320;/K &#8594; C = KC&#8320;</text>"
                     "</svg>"),
            },
            {"after": "**Relation Between Susceptibility and Dielectric Constant:**",
             "svg": ("Polar vs non-polar molecules under a field",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<text x=\"160\" y=\"80\" fill=\"#1d4ed8\">polar (H&#8322;O)</text>"
                     "<text x=\"160\" y=\"110\" fill=\"#374151\">dipoles align with E</text>"
                     "<text x=\"160\" y=\"135\" fill=\"#6b7280\" font-size=\"12\">permanent dipole moment</text>"
                     "<text x=\"480\" y=\"80\" fill=\"#166534\">non-polar (N&#8322;, H&#8322;)</text>"
                     "<text x=\"480\" y=\"110\" fill=\"#374151\">molecules distort only</text>"
                     "<text x=\"480\" y=\"135\" fill=\"#6b7280\" font-size=\"12\">induced dipole moment</text>"
                     "</g>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">both raise K; polar materials raise it far more</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/electric-charges/02-charging-by-induction.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: rearranging charge without transferring it\n\nInduction works because a charged object's field pushes one sign of charge away and pulls the other toward it *inside* a neutral conductor, splitting it into two oppositely charged regions while the total stays zero. The trick is grounding at the right moment: earth the near side (or the far side, depending on the setup) and the like charges escape, leaving a net charge of the *opposite* sign when the field source is removed. The charged rod never touches the sphere and never loses charge — it can be reused indefinitely, which is exactly how a gold-leaf electroscope tests charge sign. Induction needs a conductor (mobile electrons); insulators only polarize locally, which is why a charged balloon still attracts neutral paper bits."),
             "table1": {"title": "Induction step by step (negatively charged rod)",
                        "headers": ["Step", "Action", "Result on the sphere"],
                        "rows": [
                            ["1", "bring &#8722;rod near, don't touch", "electrons flee to far side; near side +"],
                            ["2", "earth the far side (or near side)", "excess electrons drain to earth"],
                            ["3", "break the earth connection", "sphere left with net + charge"],
                            ["4", "remove the rod", "charge spreads uniformly; rod unchanged"],
                        ]},
             "table2": {"title": "Charging methods compared",
                        "headers": ["Method", "Contact?", "Charged object changes?", "Works on insulators?"],
                        "rows": [
                            ["Friction", "rubbing", "both objects charge", "yes"],
                            ["Conduction", "touch", "sharer loses charge", "poorly (local only)"],
                            ["Induction", "no", "no (reusable)", "no (needs mobile charges)"],
                            ["Electroscope use", "induction", "no", "tests sign of charge"],
                        ]},
             "svg": ("Induction sequence — rod near, earth, remove",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"90\" y=\"130\" width=\"90\" height=\"26\" rx=\"8\" fill=\"#991b1b\"/>"
                     "<text x=\"135\" y=\"120\" fill=\"#991b1b\">&#8722; rod</text>"
                     "<circle cx=\"300\" cy=\"143\" r=\"34\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"300\" y=\"100\" fill=\"#1d4ed8\">+ +</text>"
                     "<text x=\"300\" y=\"200\" fill=\"#1d4ed8\">&#8722; &#8722;</text>"
                     "<path d=\"M300 177 L 300 240\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<text x=\"300\" y=\"260\" fill=\"#6b7280\">earth (step 2)</text>"
                     "<text x=\"135\" y=\"230\" fill=\"#6b7280\" font-size=\"12\">no contact needed</text>"
                     "<text x=\"480\" y=\"140\" fill=\"#374151\">after earthing + removing rod:</text>"
                     "<text x=\"480\" y=\"165\" fill=\"#166534\">sphere is net +</text>"
                     "<text x=\"480\" y=\"190\" fill=\"#6b7280\" font-size=\"12\">rod never lost charge</text>"
                     "</g>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Conductor vs insulator under a charged rod",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"185\" y=\"100\" fill=\"#1d4ed8\">conductor</text>"
                     "<text x=\"185\" y=\"125\" fill=\"#374151\" font-size=\"12\">electrons migrate</text>"
                     "<text x=\"185\" y=\"150\" fill=\"#374151\" font-size=\"12\">full induction possible</text>"
                     "<rect x=\"340\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"455\" y=\"100\" fill=\"#a16207\">insulator</text>"
                     "<text x=\"455\" y=\"125\" fill=\"#374151\" font-size=\"12\">molecules polarize locally</text>"
                     "<text x=\"455\" y=\"150\" fill=\"#374151\" font-size=\"12\">attraction only, no induction</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">mobile charges separate induction from mere polarization</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/electric-charges/04-force-between-multiple-electric-charges.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: superposition is vector addition of Coulomb forces\n\nCoulomb's law gives the force between one *pair* of charges; the principle of superposition extends it to any number: the net force on a charge is the vector sum of the pair forces, each computed as if the others were absent. Three consequences NEB tests. First, pair forces are unaffected by other charges — no shielding in electrostatics. Second, symmetry can cancel components: for a charge at the centre of a square with equal charges at the corners, opposite pairs cancel and the net force is zero. Third, equilibrium of a test charge between two like charges requires the *third* charge to be negative and placed nearer the weaker (more distant) charge."),
             "table1": {"title": "Superposition — the working recipe",
                        "headers": ["Step", "Action", "Note"],
                        "rows": [
                            ["1", "draw each pair force on the target charge", "arrows away from like, toward unlike"],
                            ["2", "compute magnitudes $F = kq_1q_2/r&#178;$", "ignore other charges for each pair"],
                            ["3", "resolve into components", "axes along the geometry"],
                            ["4", "add components, recombine", "$F = \\sqrt{F_x&#178;+F_y&#178;}$"],
                            ["5", "check symmetry first", "cancellation can shortcut the algebra"],
                        ]},
             "table2": {"title": "Classic symmetric arrangements",
                        "headers": ["Arrangement", "Net force on centre charge", "Reason"],
                        "rows": [
                            ["Equal charges at square corners, test at centre", "zero", "opposite pairs cancel"],
                            ["Two equal like charges, test at midpoint", "zero", "equal and opposite"],
                            ["Two equal unlike charges, test at midpoint", "zero", "equal and opposite"],
                            ["Equilateral triangle of equal charges", "zero net on system centre", "symmetry"],
                            ["Two like charges, test off-centre", "toward the nearer charge's push", "no cancellation"],
                        ]},
             "svg": ("Superposition — three pair forces add as vectors",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"200\" cy=\"80\" r=\"10\" fill=\"#991b1b\"/>"
                     "<circle cx=\"440\" cy=\"80\" r=\"10\" fill=\"#991b1b\"/>"
                     "<circle cx=\"320\" cy=\"210\" r=\"10\" fill=\"#1d4ed8\"/>"
                     "<text x=\"200\" y=\"60\" fill=\"#991b1b\">q&#8321; (+)</text>"
                     "<text x=\"440\" y=\"60\" fill=\"#991b1b\">q&#8322; (+)</text>"
                     "<text x=\"320\" y=\"240\" fill=\"#1d4ed8\">q&#8320; (test, +)</text>"
                     "</g>"
                     "<path d=\"M320 200 L 235 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M235 120 L 247 132 L 251 116 Z\" fill=\"#1d4ed8\"/>"
                     "<path d=\"M320 200 L 405 120\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M405 120 L 393 132 L 389 116 Z\" fill=\"#166534\"/>"
                     "<text x=\"230\" y=\"140\" fill=\"#1d4ed8\">F&#8321;</text>"
                     "<text x=\"400\" y=\"140\" fill=\"#166534\">F&#8322;</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#374151\">net force = F&#8321; + F&#8322; (vector sum); each pair acts as if alone</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Square of charges — centre charge feels zero net force",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"240\" cy=\"70\" r=\"9\" fill=\"#991b1b\"/>"
                     "<circle cx=\"400\" cy=\"70\" r=\"9\" fill=\"#991b1b\"/>"
                     "<circle cx=\"240\" cy=\"190\" r=\"9\" fill=\"#991b1b\"/>"
                     "<circle cx=\"400\" cy=\"190\" r=\"9\" fill=\"#991b1b\"/>"
                     "<circle cx=\"320\" cy=\"130\" r=\"8\" fill=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"235\" fill=\"#374151\">equal charges at corners: pair forces cancel in opposite pairs</text>"
                     "<text x=\"320\" y=\"258\" fill=\"#991b1b\" font-size=\"12\">net force on the centre charge = 0</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/potential-potential-difference-and-potential-energy/02-equipotential-surfaces.json",
        "blocks": [
            {"after": "**Definition of an Equipotential Surface:** An equipotential",
             "md": ("### Deep dive: the geometry that encodes the field\n\nAn equipotential surface joins points of equal potential, and two geometric facts make it powerful. First, the field is always *perpendicular* to the surface — any component along it would do work moving a charge along the surface, contradicting equal potential. Second, no work is done moving a charge *along* the surface ($W = q\\Delta V = 0$), while moving between surfaces costs $W = q(V_1 - V_2)$. Surfaces crowd where the field is strong (close to a charge, near a charged plate edge) and spread where it is weak. For a point charge the surfaces are concentric spheres; for a uniform field, parallel planes; for a dipole, lobed surfaces perpendicular to the field lines everywhere."),
             "table1": {"title": "Equipotential surfaces for standard fields",
                        "headers": ["Field source", "Equipotential shape", "Spacing"],
                        "rows": [
                            ["Point charge", "concentric spheres", "widen with r (V &#8746; 1/r)"],
                            ["Uniform field (plates)", "parallel planes", "equal spacing"],
                            ["Dipole", "lobed surfaces", "crowded near charges"],
                            ["Isolated conductor", "the conductor itself + outer spheres", "constant V inside"],
                        ]},
             "table2": {"title": "Properties NEB expects you to state",
                        "headers": ["Property", "Statement", "Consequence"],
                        "rows": [
                            ["Perpendicularity", "E &#8869; surface at every point", "field lines cross surfaces at 90&#176;"],
                            ["No work along surface", "$W = q\\Delta V = 0$", "free movement along the surface"],
                            ["Work between surfaces", "$W = q(V_1 - V_2)$", "path-independent"],
                            ["Crowding", "closer surfaces = stronger E", "read field strength from the map"],
                            ["Conductor surface", "whole conductor is equipotential", "E = 0 inside"],
                        ]},
             "svg": ("Equipotential surfaces ⊥ field lines — point charge and plates",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g fill=\"none\" stroke-width=\"1.5\">"
                     "<circle cx=\"180\" cy=\"140\" r=\"30\" stroke=\"#991b1b\"/>"
                     "<circle cx=\"180\" cy=\"140\" r=\"60\" stroke=\"#a16207\"/>"
                     "<circle cx=\"180\" cy=\"140\" r=\"95\" stroke=\"#166534\"/>"
                     "</g>"
                     "<circle cx=\"180\" cy=\"140\" r=\"6\" fill=\"#111827\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"1.5\">"
                     "<line x1=\"180\" y1=\"140\" x2=\"290\" y2=\"140\"/>"
                     "<line x1=\"180\" y1=\"110\" x2=\"280\" y2=\"110\"/>"
                     "<line x1=\"180\" y1=\"170\" x2=\"280\" y2=\"170\"/>"
                     "</g>"
                     "<text x=\"180\" y=\"250\" text-anchor=\"middle\" fill=\"#374151\">point charge: spheres &#8869; radial lines</text>"
                     "<g stroke=\"#a16207\" stroke-width=\"1.5\">"
                     "<line x1=\"420\" y1=\"80\" x2=\"420\" y2=\"200\"/>"
                     "<line x1=\"540\" y1=\"80\" x2=\"540\" y2=\"200\"/>"
                     "</g>"
                     "<text x=\"420\" y=\"70\" text-anchor=\"middle\" fill=\"#a16207\">+ plate</text>"
                     "<text x=\"540\" y=\"70\" text-anchor=\"middle\" fill=\"#1d4ed8\">&#8722; plate</text>"
                     "<path d=\"M425 140 L 535 140\" stroke=\"#374151\" stroke-width=\"1.5\"/>"
                     "<path d=\"M535 140 L 521 133 L 521 147 Z\" fill=\"#374151\"/>"
                     "<text x=\"480\" y=\"250\" text-anchor=\"middle\" fill=\"#374151\">plates: planes &#8869; uniform field</text>"
                     "</svg>"),
            },
            {"after": "**Work and Energy Relations for Equipotential Surfaces:** Mo",
             "svg": ("No work along the surface; qΔV between surfaces",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"320\" cy=\"110\" r=\"80\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<circle cx=\"320\" cy=\"110\" r=\"45\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M250 90 C 290 70, 350 70, 390 90\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"320\" y=\"60\" fill=\"#a16207\">along: W = 0</text>"
                     "<path d=\"M320 65 L 320 30\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"380\" y=\"40\" fill=\"#1d4ed8\">between: W = q&#916;V</text>"
                     "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">closer rings = stronger field</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
