# Chemistry class-11 — atomic duplicates + stoichiometry + states stubs (16 files)
PART_A = [
    {
        "file": "class-11/chemistry/atomic-structure/01-rutherford-alpha-particle-scattering.json",
        "blocks": [
            {"after": "### Apparatus, quantity by quantity",
             "md": ("### Deep dive — why every design choice matters\n\n"
                    "The experiment works because each choice removes an alternative explanation: the "
                    "**gold foil** is beaten to ~1000 atoms thick so an α suffers at most a few "
                    "collisions (multi-scattering would blur the angles); **gold** is dense, "
                    "malleable, and high-Z (strong Coulomb repulsion); the **ZnS screen** flashes "
                    "visibly on each α hit, letting Geiger and Marsden count events for months; the "
                    "**vacuum** stops air from absorbing α particles (range only a few cm); and the "
                    "**movable microscope** sweeps through angles up to 150°, where the shocking "
                    "1-in-8000 reflections appear. The data: most α pass straight through (&gt;99%), "
                    "a few deflect &gt; 90° — impossible for a plum-pudding charge spread."),
             "table": ("Design choice → alternative ruled out",
                       ["Choice", "Why", "Alternative ruled out"],
                       [["Gold, &#8776;1000 atoms thick", "Single-scattering regime", "Multi-scattering blur"],
                        ["High-Z target", "Strong repulsion, visible deflection", "Weak-signal experiment"],
                        ["ZnS screen + microscope", "Count individual &#945; hits", "Only averages measurable"],
                        ["Evacuated chamber", "&#945; range preserved", "Air absorption"],
                        ["Rotatable detector to 150&#176;", "Catch back-scatter", "Large-angle events missed"]]),
        },
            {"after": "### The counting data (Geiger–Marsden)",
             "svg": ("Alpha scattering — most pass, few bounce: the nuclear atom",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"230\" y=\"70\" width=\"30\" height=\"160\" fill=\"#fde68a\" stroke=\"#a16207\"/>"
                     "<text x=\"245\" y=\"255\" text-anchor=\"middle\" fill=\"#a16207\">gold foil</text>"
                     "<circle cx=\"560\" cy=\"40\" r=\"12\" fill=\"#991b1b\"/>"
                     "<text x=\"560\" y=\"24\" text-anchor=\"middle\" fill=\"#991b1b\">&#945; source</text>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\" fill=\"none\">"
                     "<path d=\"M555 50 L 300 100 L 60 100\"/>"
                     "<path d=\"M555 55 L 300 115 L 60 130\"/>"
                     "<path d=\"M555 60 L 300 130 L 60 165\"/>"
                     "<path d=\"M560 55 L 400 90 C 350 105, 330 130, 340 170\"/>"
                     "</g>"
                     "<circle cx=\"345\" cy=\"150\" r=\"9\" fill=\"#111827\"/>"
                     "<text x=\"345\" y=\"180\" text-anchor=\"middle\" fill=\"#111827\">nucleus</text>"
                     "<text x=\"110\" y=\"90\" fill=\"#166534\">most pass straight (&gt;99%)</text>"
                     "<text x=\"420\" y=\"200\" fill=\"#991b1b\">1 in 8000 bounces back</text>"
                     "<text x=\"320\" y=\"288\" text-anchor=\"middle\" fill=\"#6b7280\">conclusion: a tiny, dense, positive nucleus — not a spread-out pudding</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/02-rutherford-stability-crisis.json",
        "blocks": [
            {"after": "### The classical argument",
             "md": ("### Deep dive — the collapse time, worked out\n\n"
                    "Classical electrodynamics says an accelerating charge radiates energy at a rate "
                    "proportional to a² (the acceleration). For the Rutherford hydrogen electron "
                    "(r ≈ 0.5 × 10⁻¹⁰ m, v ≈ 2.2 × 10⁶ m/s) the radiated power is enormous compared "
                    "with the electron's kinetic energy, giving a **spiral-in time of about 10⁻¹¹ s** — "
                    "in one hundred-thousandth of a nanosecond the atom should collapse. Worse, as the "
                    "electron spirals it should emit a *continuous* smear of frequencies, but real atoms "
                    "show sharp **line spectra** (hydrogen: exactly four visible lines). Two failures, "
                    "one root cause: classical mechanics plus classical electromagnetism cannot describe "
                    "the atom. Bohr's fix — quantised orbits — addressed both at once."),
             "table": ("The stability crisis — prediction vs observation",
                       ["Quantity", "Rutherford model predicts", "Observed"],
                       [["Atom lifetime", "&#8776;10&#8315;&#185;&#185; s collapse", "Atoms are stable forever"],
                        ["Emitted spectrum", "Continuous smear while spiralling", "Sharp lines (H: 4 visible)"],
                        ["Electron path", "Spiral into nucleus", "Fixed energy states"],
                        ["Root cause", "Accelerating charge must radiate", "Quantum mechanics needed"]]),
        },
            {"after": "### Two observable failures follow",
             "svg": ("The classical death spiral — and what spectra say instead",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\">"
                     "<circle cx=\"180\" cy=\"140\" r=\"70\"/>"
                     "<circle cx=\"180\" cy=\"140\" r=\"46\"/>"
                     "<circle cx=\"180\" cy=\"140\" r=\"26\"/>"
                     "</g>"
                     "<circle cx=\"180\" cy=\"140\" r=\"10\" fill=\"#111827\"/>"
                     "<text x=\"180\" y=\"235\" text-anchor=\"middle\" fill=\"#991b1b\">classical: spiral in, ~10&#8315;&#185;&#185; s</text>"
                     "<g fill=\"#1d4ed8\">"
                     "<rect x=\"400\" y=\"80\" width=\"4\" height=\"0\"/>"
                     "<line x1=\"400\" y1=\"80\" x2=\"400\" y2=\"120\" stroke-width=\"4\"/>"
                     "<line x1=\"440\" y1=\"80\" x2=\"440\" y2=\"110\" stroke-width=\"4\"/>"
                     "<line x1=\"480\" y1=\"80\" x2=\"480\" y2=\"95\" stroke-width=\"4\"/>"
                     "<line x1=\"520\" y1=\"80\" x2=\"520\" y2=\"87\" stroke-width=\"4\"/>"
                     "</g>"
                     "<text x=\"460\" y=\"70\" text-anchor=\"middle\" fill=\"#1d4ed8\">observed: sharp lines</text>"
                     "<text x=\"460\" y=\"235\" text-anchor=\"middle\" fill=\"#1d4ed8\">Balmer series (H)</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\">Bohr: quantised orbits fix both failures at once</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/08-orbitals-shapes.json",
        "blocks": [
            {"after": "### 2. Orbital vs orbit",
             "md": ("### Deep dive — reading the shapes: nodes, lobes and orientation\n\n"
                    "An orbital is the region of &#8776;90% probability density. **s orbitals** are "
                    "spherical and non-directional; size grows with n (1s &lt; 2s &lt; 3s) and each s "
                    "above 1s contains a spherical **radial node** (n−1 of them). **p orbitals** "
                    "(n ≥ 2) are dumbbell-shaped with a nodal plane through the nucleus, oriented "
                    "along x, y and z — three of each, degenerate. **d orbitals** (n ≥ 3) have four "
                    "cloverleaf shapes (d_xy, d_yz, d_zx, d_x²−y²) plus the doughnut-with-collar "
                    "d_z² — five in all. The count rule: orbitals per shell = n², electrons = 2n². "
                    "Shapes matter chemically: orbital overlap direction sets bond angles, which is "
                    "the bridge to hybridisation and VSEPR."),
             "table": ("Orbital census — shapes, nodes, capacity",
                       ["Type", "Shape", "Orientation", "Nodes", "First appears"],
                       [["s", "Sphere", "None (non-directional)", "n&#8722;1 radial", "n = 1"],
                        ["p", "Dumbbell", "x, y, z (3-fold)", "1 nodal plane", "n = 2"],
                        ["d", "Cloverleaf + d_z&#178;", "5 orientations", "2 nodal planes/surfaces", "n = 3"],
                        ["f", "Multi-lobed", "7 orientations", "3 nodes", "n = 4"]]),
        },
            {"after": "### 3. Shape of s orbitals",
             "svg": ("s is a sphere, p is a dumbbell, d is a cloverleaf",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<circle cx=\"120\" cy=\"130\" r=\"60\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"120\" cy=\"130\" r=\"24\" fill=\"#ffffff\" stroke=\"#9ca3af\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"120\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">s: spherical + radial node</text>"
                     "</g>"
                     "<g>"
                     "<ellipse cx=\"300\" cy=\"100\" rx=\"24\" ry=\"46\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<ellipse cx=\"300\" cy=\"170\" rx=\"24\" ry=\"46\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"300\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">p: dumbbell, nodal plane</text>"
                     "</g>"
                     "<g>"
                     "<ellipse cx=\"490\" cy=\"95\" rx=\"20\" ry=\"38\" fill=\"#fefce8\" stroke=\"#a16207\" transform=\"rotate(45 490 95)\"/>"
                     "<ellipse cx=\"490\" cy=\"175\" rx=\"20\" ry=\"38\" fill=\"#fefce8\" stroke=\"#a16207\" transform=\"rotate(45 490 175)\"/>"
                     "<ellipse cx=\"450\" cy=\"135\" rx=\"20\" ry=\"38\" fill=\"#fefce8\" stroke=\"#a16207\" transform=\"rotate(-45 450 135)\"/>"
                     "<ellipse cx=\"530\" cy=\"135\" rx=\"20\" ry=\"38\" fill=\"#fefce8\" stroke=\"#a16207\" transform=\"rotate(-45 530 135)\"/>"
                     "<text x=\"490\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">d: cloverleaf (d_x&#178;&#8722;y&#178;)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"262\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">orbitals per shell = n&#178;; electrons per shell = 2n&#178;</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/atomic-structure/rutherford-s-atomic-model.json",
        "blocks": [
            {"after": "### Features (six points)",
             "md": ("### Deep dive — the numbers behind the nuclear atom\n\n"
                    "From the scattering data: nuclear radius R ≈ 1.2 × 10⁻¹⁵ × A^(1/3) m, so for gold "
                    "R_nucleus ≈ 7 × 10⁻¹⁵ m against an atomic radius of ≈ 1.4 × 10⁻¹⁰ m — the nucleus "
                    "occupies about **10⁻¹⁴ of the atomic volume**, yet carries 99.9% of the mass. The "
                    "**distance of closest approach** for a head-on α (r₀ = 2Ze²/4πε₀·K) sets the upper "
                    "bound on nuclear size: alphas that bounce must have turned before touching the "
                    "nucleus. Three limitations follow: (1) stability — Maxwell demands a spiralling "
                    "electron radiate and collapse in ~10⁻¹¹ s; (2) line spectra — a spiralling emitter "
                    "gives a continuum, not sharp lines; (3) no explanation of chemical behaviour or "
                    "electron arrangement."),
             "table": ("Scale facts of the nuclear atom",
                       ["Quantity", "Value", "Meaning"],
                       [["Nuclear radius (Au)", "&#8776;7 &#215; 10&#8315;&#185;&#8309; m", "From R &#8776; 1.2&#215;10&#8315;&#185;&#8309;A^(1/3)"],
                        ["Atomic radius (Au)", "&#8776;1.4 &#215; 10&#8315;&#185;&#8304; m", "Electron cloud boundary"],
                        ["Volume fraction", "&#8776;10&#8315;&#185;&#8308;", "Nucleus is tiny but nearly all the mass"],
                        ["Closest approach r&#8320;", "2Ze&#178;/4&#960;&#949;&#8320;K", "Head-on &#945; turns back here"],
                        ["Predicted lifetime", "&#8776;10&#8315;&#185;&#185; s", "The stability failure"]]),
        },
            {"after": "### Successes (three points)",
             "svg": ("Scale of the nuclear atom — a marble in a football stadium",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<circle cx=\"320\" cy=\"140\" r=\"110\" fill=\"none\" stroke=\"#9ca3af\" stroke-dasharray=\"5 5\"/>"
                     "<text x=\"320\" y=\"42\" text-anchor=\"middle\" fill=\"#6b7280\">electron cloud boundary</text>"
                     "<circle cx=\"320\" cy=\"140\" r=\"9\" fill=\"#111827\"/>"
                     "<text x=\"320\" y=\"170\" text-anchor=\"middle\" fill=\"#111827\">nucleus</text>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#374151\">nucleus &#8776; 10&#8315;&#185;&#8308; of the volume, 99.9% of the mass</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">if the atom were a stadium, the nucleus would be a marble at the centre</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/01-law-of-conservation-of-mass.json",
        "blocks": [
            {"after": "### Experimental verification (Landolt, 1893)",
             "md": ("### Deep dive — weighing reactions in sealed glass\n\n"
                    "Landolt sealed reacting solutions (AgNO₃ with NaCl; later dozens of pairs) in "
                    "separate arms of an H-shaped glass vessel, weighed the whole assembly, tipped the "
                    "solutions together, waited for the reaction, and weighed again — balance agreement "
                    "to ~1 part in 10⁶. Mass is conserved because chemical reactions only **rearrange** "
                    "atoms; the atoms themselves are indestructible at chemical energies. The law is the "
                    "foundation of **stoichiometry**: balance equations by conserving each element, and "
                    "mass relationships follow. Its limits: nuclear reactions convert mass to energy "
                    "(E = mc²), so conservation of mass is really conservation of mass–energy; and in "
                    "open vessels gases escape — the classic apparent violation (burning magnesium gains "
                    "mass because it grabs oxygen from the air)."),
             "table": ("Conservation of mass — verification and limits",
                       ["Aspect", "Detail"],
                       [["Landolt test", "Sealed H-vessel; AgNO&#8323; + NaCl; &#916;m &#8776; 10&#8315;&#8310; of total"],
                        ["Microscopic reason", "Atoms rearrange; none created or destroyed"],
                        ["Apparent violations", "Open vessel: gases enter or escape (Mg + O&#8322; gains mass)"],
                        ["True limit", "Nuclear reactions: mass&#8211;energy conserved, not mass alone"],
                        ["Practical use", "Balanced equations give all mass relationships"]]),
        },
            {"after": "### Statement and history",
             "svg": ("Landolt's H-vessel — react inside, weigh the same",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<path d=\"M240 70 L 240 180 L 320 180 L 320 70\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"5\"/>"
                     "<rect x=\"225\" y=\"70\" width=\"30\" height=\"110\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"305\" y=\"70\" width=\"30\" height=\"110\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"240\" y=\"55\" text-anchor=\"middle\" fill=\"#1d4ed8\">AgNO&#8323;</text>"
                     "<text x=\"320\" y=\"55\" text-anchor=\"middle\" fill=\"#166534\">NaCl</text>"
                     "<path d=\"M200 200 L 360 200\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<text x=\"280\" y=\"225\" text-anchor=\"middle\" fill=\"#374151\">tip to mix &#8594; AgCl&#8595; forms</text>"
                     "<path d=\"M150 245 L 410 245\" stroke=\"#a16207\" stroke-width=\"4\"/>"
                     "<text x=\"280\" y=\"268\" text-anchor=\"middle\" fill=\"#a16207\">balance reads the same before and after</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/02-law-of-definite-proportions.json",
        "blocks": [
            {"after": "### The classic data",
             "md": ("### Deep dive — fixed ratios mean fixed composition, everywhere\n\n"
                    "Proust's law: a compound always contains the same elements in the same mass ratio, "
                    "whatever its source or method of preparation. Water is the standard proof — H:O = "
                    "1:8 whether from river, rain, sea, or made by burning hydrogen in oxygen; copper "
                    "carbonate made four different ways gives the same Cu:C:O ratio. The law **follows "
                    "from Dalton's atomic theory**: a compound is a fixed ratio of whole atoms, and "
                    "atoms have fixed masses, so the mass ratio must be fixed. Its limits: **non-"
                    "stoichiometric compounds** (FeO₀.₉₅–FeO, wüstite) have variable composition because "
                    "of lattice vacancies; and **isotopes** make the ratio depend slightly on the source's "
                    "isotopic mix. Both are advanced exceptions NEB may ask about."),
             "table": ("Definite proportions — proofs and exceptions",
                       ["Evidence", "Result", "Status"],
                       [["Water from any source", "H : O = 1 : 8", "Classic confirmation"],
                        ["CuCO&#8323; made 4 ways", "Same Cu : C : O", "Preparation-independent"],
                        ["W&#252;stite FeO_x", "x = 0.95&#8211;0.99", "Non-stoichiometric exception"],
                        ["Isotopic variation", "Tiny ratio shifts", "Source-dependent isotope mix"]]),
        },
            {"after": "### Statement and history",
             "svg": ("One ratio, four sources — the law of definite proportions",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g font-size=\"14\" text-anchor=\"middle\">"
                     "<rect x=\"60\" y=\"60\" width=\"120\" height=\"46\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"120\" y=\"88\" fill=\"#1d4ed8\">river</text>"
                     "<rect x=\"200\" y=\"60\" width=\"120\" height=\"46\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"260\" y=\"88\" fill=\"#1d4ed8\">rain</text>"
                     "<rect x=\"340\" y=\"60\" width=\"120\" height=\"46\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"400\" y=\"88\" fill=\"#1d4ed8\">sea</text>"
                     "<rect x=\"480\" y=\"60\" width=\"120\" height=\"46\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"540\" y=\"88\" fill=\"#1d4ed8\">synthesised</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"120\" y1=\"110\" x2=\"300\" y2=\"160\"/>"
                     "<line x1=\"260\" y1=\"110\" x2=\"310\" y2=\"160\"/>"
                     "<line x1=\"400\" y1=\"110\" x2=\"330\" y2=\"160\"/>"
                     "<line x1=\"540\" y1=\"110\" x2=\"350\" y2=\"160\"/>"
                     "</g>"
                     "<rect x=\"240\" y=\"165\" width=\"180\" height=\"50\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"330\" y=\"196\" text-anchor=\"middle\" fill=\"#166534\">H : O = 1 : 8, always</text>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#6b7280\">fixed atom ratios &#215; fixed atomic masses = fixed mass ratio</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/02-laws-stoichiometry.json",
        "blocks": [
            {"after": "### 2. Law of conservation of mass (Lavoisier, 1774)",
             "md": ("### Deep dive — the four laws as one ladder\n\n"
                    "The laws of chemical combination build on each other: **conservation of mass** "
                    "(Lavoisier) says total mass is fixed; **definite proportions** (Proust) says each "
                    "compound has a fixed composition; **multiple proportions** (Dalton) says when two "
                    "elements form several compounds, the masses of one that combine with a fixed mass "
                    "of the other are in small whole-number ratios (CO and CO₂: 12:16 and 12:32 — "
                    "oxygen ratio 1:2); **reciprocal proportions** (Richter) says masses that combine "
                    "separately with a third element combine in the same or simple multiple ratio with "
                    "each other (H:O = 1:8, C:O = 3:8 → C:H = 3:1 in CH₄). Together they force the "
                    "existence of **atoms with fixed masses** — the historical road to atomic theory."),
             "table": ("The four combination laws — statement and standard data",
                       ["Law", "Statement (short)", "Standard data"],
                       [["Conservation of mass", "Mass constant in reactions", "Landolt sealed-vessel tests"],
                        ["Definite proportions", "Fixed composition per compound", "Water H:O = 1:8 from any source"],
                        ["Multiple proportions", "Small whole-number ratios", "CO 12:16 vs CO&#8322; 12:32 (1:2)"],
                        ["Reciprocal proportions", "Common third element bridges", "H:O 1:8, C:O 3:8 &#8594; C:H 3:1"]]),
        },
            {"after": "### 2. Law of conservation of mass (Lavoisier, 1774)",
             "svg": ("CO and CO₂ — the 1:2 oxygen ratio that proves atoms",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"160\" cy=\"110\" r=\"16\" fill=\"#374151\"/>"
                     "<circle cx=\"220\" cy=\"110\" r=\"12\" fill=\"#991b1b\"/>"
                     "<text x=\"190\" y=\"160\" fill=\"#111827\">CO: C:O = 12:16</text>"
                     "<circle cx=\"420\" cy=\"110\" r=\"16\" fill=\"#374151\"/>"
                     "<circle cx=\"470\" cy=\"110\" r=\"12\" fill=\"#991b1b\"/>"
                     "<circle cx=\"520\" cy=\"110\" r=\"12\" fill=\"#991b1b\"/>"
                     "<text x=\"470\" y=\"160\" fill=\"#111827\">CO&#8322;: C:O = 12:32</text>"
                     "</g>"
                     "<text x=\"320\" y=\"210\" text-anchor=\"middle\" fill=\"#1d4ed8\">oxygen per fixed 12 g C: 16 : 32 = 1 : 2</text>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">small whole numbers &#8594; atoms combine as indivisible units</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/03-law-of-multiple-proportions.json",
        "blocks": [
            {"after": "### Standard data sets",
             "md": ("### Deep dive — the data sets that made Dalton famous\n\n"
                    "The classic verifications: **carbon oxides** — in CO, 12 g C carries 16 g O; in CO₂, "
                    "12 g C carries 32 g O; oxygen ratio 16:32 = 1:2. **Iron oxides** — FeO (Fe:O = "
                    "56:16) and Fe₂O₃ (112:48 = 56:24); oxygen per 56 g Fe: 16:24 = 2:3. **Nitrogen "
                    "oxides** — N₂O, NO, N₂O₃, NO₂, N₂O₅ give oxygen masses 8, 16, 24, 32, 40 per 28 g "
                    "N — the 1:2:3:4:5 ladder, the most beautiful whole-number series in chemistry. "
                    "**Sulfur oxides** — SO₂ and SO₃: oxygen per 32 g S = 32:48 = 2:3. Each series is "
                    "only explicable if the combining units are discrete atoms in whole-number counts."),
             "table": ("Multiple proportions — the standard series",
                       ["Pair/series", "Fixed element mass", "Other element masses", "Ratio"],
                       [["CO, CO&#8322;", "12 g C", "16, 32 g O", "1 : 2"],
                        ["FeO, Fe&#8322;O&#8323;", "56 g Fe", "16, 24 g O", "2 : 3"],
                        ["N&#8322;O &#8594; N&#8322;O&#8325;", "28 g N", "8, 16, 24, 32, 40 g O", "1:2:3:4:5"],
                        ["SO&#8322;, SO&#8323;", "32 g S", "32, 48 g O", "2 : 3"]]),
        },
            {"after": "### Statement and history",
             "svg": ("The nitrogen-oxide ladder — 1:2:3:4:5",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g fill=\"#1d4ed8\">"
                     "<rect x=\"90\" y=\"200\" width=\"70\" height=\"20\"/>"
                     "<rect x=\"190\" y=\"180\" width=\"70\" height=\"40\"/>"
                     "<rect x=\"290\" y=\"160\" width=\"70\" height=\"60\"/>"
                     "<rect x=\"390\" y=\"140\" width=\"70\" height=\"80\"/>"
                     "<rect x=\"490\" y=\"120\" width=\"70\" height=\"100\"/>"
                     "</g>"
                     "<g font-size=\"13\" fill=\"#111827\" text-anchor=\"middle\">"
                     "<text x=\"125\" y=\"240\">N&#8322;O: 8</text>"
                     "<text x=\"225\" y=\"240\">NO: 16</text>"
                     "<text x=\"325\" y=\"240\">N&#8322;O&#8323;: 24</text>"
                     "<text x=\"425\" y=\"240\">NO&#8322;: 32</text>"
                     "<text x=\"525\" y=\"240\">N&#8322;O&#8325;: 40</text>"
                     "</g>"
                     "<text x=\"320\" y=\"60\" text-anchor=\"middle\" fill=\"#374151\">grams of oxygen combined with a fixed 28 g of nitrogen</text>"
                     "<text x=\"320\" y=\"92\" text-anchor=\"middle\" fill=\"#1d4ed8\">8 : 16 : 24 : 32 : 40 = 1 : 2 : 3 : 4 : 5</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/04-law-of-reciprocal-proportions.json",
        "blocks": [
            {"after": "### The standard verification (H as reference)",
             "md": ("### Deep dive — the bridge element trick\n\n"
                    "Two elements rarely combine with each other directly in every pair, but both "
                    "combine with hydrogen. The law says their combining ratios with H predict their "
                    "ratio with each other: H:O = 1:8 (water), H:C = 1:3 (methane) → predicted C:O = "
                    "3:8, and CO₂ gives exactly 12:32 = 3:8. When the predicted ratio is not exact, it "
                    "is a **simple multiple** (CH₄ vs C₂H₆ etc.). Worked numbers: in H₂O, 1 g H combines "
                    "with 8 g O; in CH₄, 1 g H combines with 3 g C; so 3 g C should combine with 8 g O — "
                    "CO₂ (12:32 = 3:8) confirms it. The law is really a corollary of definite "
                    "proportions plus multiple proportions, and it underlies the historical definition "
                    "of **equivalent weights**."),
             "table": ("Reciprocal proportions — the H-bridge calculation",
                       ["Compound", "Ratio with H", "Prediction"],
                       [["H&#8322;O", "H : O = 1 : 8", "—"],
                        ["CH&#8324;", "H : C = 1 : 3", "—"],
                        ["Predicted C : O", "3 : 8", "from the H bridge"],
                        ["CO&#8322; observed", "C : O = 12 : 32 = 3 : 8", "Confirmed exactly"]]),
        },
            {"after": "### Statement",
             "svg": ("Hydrogen as the bridge — predicting C:O from two other ratios",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\" font-size=\"15\">"
                     "<circle cx=\"320\" cy=\"80\" r=\"26\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"86\" fill=\"#1d4ed8\">H</text>"
                     "<circle cx=\"160\" cy=\"210\" r=\"26\" fill=\"#374151\"/>"
                     "<text x=\"160\" y=\"216\" fill=\"#ffffff\">C</text>"
                     "<circle cx=\"480\" cy=\"210\" r=\"26\" fill=\"#991b1b\"/>"
                     "<text x=\"480\" y=\"216\" fill=\"#ffffff\">O</text>"
                     "</g>"
                     "<g stroke=\"#374151\" stroke-width=\"2\">"
                     "<line x1=\"295\" y1=\"100\" x2=\"185\" y2=\"188\"/>"
                     "<line x1=\"345\" y1=\"100\" x2=\"455\" y2=\"188\"/>"
                     "</g>"
                     "<text x=\"200\" y=\"130\" fill=\"#374151\" font-size=\"13\">CH&#8324;: H:C = 1:3</text>"
                     "<text x=\"400\" y=\"130\" fill=\"#374151\" font-size=\"13\">H&#8322;O: H:O = 1:8</text>"
                     "<line x1=\"195\" y1=\"210\" x2=\"445\" y2=\"210\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#a16207\">predicted C:O = 3:8 — CO&#8322; confirms (12:32)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/04-mole-concept.json",
        "blocks": [
            {"after": "### 3. Relation with number of particles",
             "md": ("### Deep dive — the mole as a counting unit, with the three bridges\n\n"
                    "One mole = 6.022 × 10²³ particles (Avogadro's number), the count of carbon-12 atoms "
                    "in exactly 12 g. Three bridges convert between the quantities NEB computes: "
                    "**mass ⇌ moles** via n = m/M; **particles ⇌ moles** via N = n·N_A; **gas volume "
                    "⇌ moles** via V = n·22.4 L at STP (0 °C, 1 atm). Watch the atoms-vs-molecules "
                    "trap: 1 mol O₂ contains 2 mol O atoms and 2 × 6.022 × 10²³ atoms; 1 mol H₂SO₄ "
                    "contains 2 mol H, 1 mol S, 4 mol O. Quick sanity checks: 18 g water ≈ 1 mol ≈ "
                    "6.022 × 10²³ molecules; 22.4 L of any ideal gas at STP ≈ 1 mol; 1 mol of electrons "
                    "carries 96,500 C (Faraday)."),
             "table": ("The mole — three bridges and one trap",
                       ["Bridge", "Formula", "Example"],
                       [["Mass &#8646; mol", "n = m/M", "36 g H&#8322;O = 2 mol"],
                        ["Particles &#8646; mol", "N = n &#215; 6.022&#215;10&#178;&#179;", "0.5 mol CO&#8322; = 3.011&#215;10&#178;&#179; molecules"],
                        ["Gas volume &#8646; mol (STP)", "V = n &#215; 22.4 L", "5.6 L O&#8322; = 0.25 mol"],
                        ["Atoms vs molecules", "multiply atoms per molecule", "1 mol O&#8322; = 2 mol O atoms"]]),
        },
            {"after": "### 1. Meaning of the mole",
             "svg": ("The mole triangle — mass, particles, volume all meet at n",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g font-size=\"14\" text-anchor=\"middle\">"
                     "<circle cx=\"320\" cy=\"70\" r=\"34\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"67\">n</text><text x=\"320\" y=\"82\">moles</text>"
                     "<circle cx=\"150\" cy=\"230\" r=\"34\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"150\" y=\"227\">m</text><text x=\"150\" y=\"242\">mass (g)</text>"
                     "<circle cx=\"490\" cy=\"230\" r=\"34\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"490\" y=\"227\">N</text><text x=\"490\" y=\"242\">particles</text>"
                     "</g>"
                     "<g stroke=\"#374151\" stroke-width=\"2\">"
                     "<line x1=\"290\" y1=\"98\" x2=\"175\" y2=\"200\"/>"
                     "<line x1=\"350\" y1=\"98\" x2=\"465\" y2=\"200\"/>"
                     "<line x1=\"190\" y1=\"230\" x2=\"450\" y2=\"230\"/>"
                     "</g>"
                     "<g font-size=\"12\" fill=\"#6b7280\" text-anchor=\"middle\">"
                     "<text x=\"195\" y=\"150\">n = m/M</text>"
                     "<text x=\"450\" y=\"150\">N = n&#183;N_A</text>"
                     "<text x=\"320\" y=\"222\">V = n&#215;22.4 L (STP)</text>"
                     "</g>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/stoichiometry/05-verifying-whole-number-ratios.json",
        "blocks": [
            {"after": "### Worked pattern 1 — a binary oxide",
             "md": ("### Deep dive — the five-step ratio machine\n\n"
                    "(1) Take each percentage as grams in 100 g of compound. (2) Divide by the atomic "
                    "mass → moles of each element. (3) Divide all by the smallest → preliminary ratio. "
                    "(4) If fractions remain (0.5, 1.33, 1.5, 1.67), multiply by 2, 3, 2, 3 "
                    "respectively → whole numbers. (5) Read off the empirical formula; with a molar "
                    "mass, divide to get the molecular formula. Worked: 60% metal (A = 20) and 40% O → "
                    "3 mol metal : 2.5 mol O → divide by 2.5 → 1.2 : 1 → ×5 → 6 : 5 → A₆O₅. The same "
                    "machine verifies the combination laws: run it on CO and CO₂ and the oxygen ratio "
                    "1:2 pops out automatically."),
             "table": ("The five steps — with the fraction multipliers",
                       ["Step", "Operation", "Example (60% M, 40% O)"],
                       [["1", "% &#8594; grams (per 100 g)", "60 g M, 40 g O"],
                        ["2", "Divide by atomic mass", "60/20 = 3; 40/16 = 2.5"],
                        ["3", "Divide by smallest", "1.2 : 1"],
                        ["4", "Clear fractions (&#215;2,3,2,3)", "&#215;5 &#8594; 6 : 5"],
                        ["5", "Empirical formula", "M&#8326;O&#8325;"]]),
        },
            {"after": "### The standard five-step method",
             "svg": ("Percent → moles → ratio → whole numbers → formula",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g font-size=\"13\" text-anchor=\"middle\">"
                     "<rect x=\"40\" y=\"90\" width=\"100\" height=\"50\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"90\" y=\"112\" fill=\"#1d4ed8\">%</text>"
                     "<text x=\"90\" y=\"130\" fill=\"#6b7280\" font-size=\"11\">60, 40</text>"
                     "<rect x=\"170\" y=\"90\" width=\"100\" height=\"50\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"220\" y=\"112\" fill=\"#1d4ed8\">moles</text>"
                     "<text x=\"220\" y=\"130\" fill=\"#6b7280\" font-size=\"11\">3, 2.5</text>"
                     "<rect x=\"300\" y=\"90\" width=\"100\" height=\"50\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"350\" y=\"112\" fill=\"#a16207\">ratio</text>"
                     "<text x=\"350\" y=\"130\" fill=\"#6b7280\" font-size=\"11\">1.2 : 1</text>"
                     "<rect x=\"430\" y=\"90\" width=\"90\" height=\"50\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"475\" y=\"112\" fill=\"#a16207\">whole</text>"
                     "<text x=\"475\" y=\"130\" fill=\"#6b7280\" font-size=\"11\">6 : 5</text>"
                     "<rect x=\"550\" y=\"90\" width=\"60\" height=\"50\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"580\" y=\"120\" fill=\"#166534\">M&#8326;O&#8325;</text>"
                     "</g>"
                     "<g stroke=\"#374151\" stroke-width=\"2\">"
                     "<line x1=\"140\" y1=\"115\" x2=\"165\" y2=\"115\"/>"
                     "<line x1=\"270\" y1=\"115\" x2=\"295\" y2=\"115\"/>"
                     "<line x1=\"400\" y1=\"115\" x2=\"425\" y2=\"115\"/>"
                     "<line x1=\"520\" y1=\"115\" x2=\"545\" y2=\"115\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"210\" text-anchor=\"middle\" fill=\"#6b7280\">fractions 0.5, 1.33, 1.5, 1.67 &#8594; multiply by 2, 3, 2, 3</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/02-kinetic-theory-gas.json",
        "blocks": [
            {"after": "### 2. Postulates (state them in order)",
             "md": ("### Deep dive — from postulates to pV = ½Nmv̄² in four moves\n\n"
                    "The postulates: point molecules, negligible volume; no intermolecular forces "
                    "except collisions; perfectly elastic collisions (KE conserved); random motion with "
                    "a Maxwell–Boltzmann speed spread; absolute temperature measures average KE (½m·v̄² "
                    "= 3/2 kT). The derivation chain: momentum change per wall hit = 2mvₓ; collisions "
                    "per unit area per time from the number density and speed; pressure = rate of "
                    "momentum transfer = (1/3)ρv̄² → **pV = ⅓Nmv̄² = ⅔·KE_total**. Comparing with "
                    "pV = RT for one mole gives v_rms = √(3RT/M) — heavier gases move slower at the "
                    "same T (O₂ ≈ 460 m/s at 300 K; H₂ four times faster, which is why H₂ leaks through "
                    "pinholes fastest — Graham's law falls out too)."),
             "table": ("Postulate → consequence chain",
                       ["Postulate", "Leads to"],
                       [["Point molecules", "pV = nRT works at low p"],
                        ["No attractions", "Ideal behaviour; real gases deviate when attractions matter"],
                        ["Elastic collisions", "Total KE constant at fixed T"],
                        ["Random motion, speed spread", "v_rms &gt; v_avg &gt; v_mp"],
                        ["KE &#8746; T", "½m·v&#772;&#178; = 3/2 kT; v_rms = &#8730;(3RT/M)"]]),
        },
            {"after": "### 1. Meaning and purpose",
             "svg": ("Momentum transfer is pressure — the kinetic picture",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"100\" y=\"60\" width=\"440\" height=\"160\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"160\" cy=\"100\" r=\"5\"/><circle cx=\"240\" cy=\"140\" r=\"5\"/>"
                     "<circle cx=\"320\" cy=\"90\" r=\"5\"/><circle cx=\"400\" cy=\"150\" r=\"5\"/>"
                     "<circle cx=\"480\" cy=\"110\" r=\"5\"/><circle cx=\"200\" cy=\"180\" r=\"5\"/>"
                     "<circle cx=\"360\" cy=\"190\" r=\"5\"/><circle cx=\"460\" cy=\"185\" r=\"5\"/>"
                     "</g>"
                     "<path d=\"M160 100 L 200 130\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M200 130 L 165 155\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M165 155 L 172 141 L 178 152 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#374151\">each wall hit transfers 2mv&#8339; of momentum — billions per second = pressure</text>"
                     "<text x=\"320\" y=\"272\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">pV = &#8531;(KE_total); with pV = RT &#8594; v_rms = &#8730;(3RT/M)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/06-ideal-gas-and-universal-gas-constant.json",
        "blocks": [
            {"after": "### 3. Meaning and value of R (universal gas constan",
             "md": ("### Deep dive — R: one constant, many costumes\n\n"
                    "R = PV/nT is the same for every ideal gas — that is what makes it *universal*. Its "
                    "numerical value depends only on units: **8.314 J mol⁻¹K⁻¹** (SI), **0.0821 L atm "
                    "mol⁻¹K⁻¹** (chemistry working units), 8.314 kPa·dm³, 1.987 cal, and 62.36 L mmHg. "
                    "The ideal gas itself is hypothetical: zero molecular volume, zero attractions. Real "
                    "gases obey it best at **low pressure and high temperature** — exactly where both "
                    "corrections vanish. Two standard uses: **molar-mass determination** (M = mRT/PV "
                    "from a weighed gas sample) and **density** (d = PM/RT, so density is proportional "
                    "to molar mass at fixed T and P — the basis of Graham's effusion comparisons)."),
             "table": ("R in its unit costumes",
                       ["Units of P, V", "Value of R", "Use"],
                       [["Pa, m&#179;", "8.314 J mol&#8315;&#185;K&#8315;&#185;", "SI calculations, energy"],
                        ["atm, L", "0.0821 L atm mol&#8315;&#185;K&#8315;&#185;", "Standard chemistry numericals"],
                        ["kPa, dm&#179;", "8.314 kPa dm&#179; mol&#8315;&#185;K&#8315;&#185;", "SI-pressure variants"],
                        ["cal", "1.987 cal mol&#8315;&#185;K&#8315;&#185;", "Thermodynamics"],
                        ["mmHg, L", "62.36 L mmHg mol&#8315;&#185;K&#8315;&#185;", "Barometric data"]]),
        },
            {"after": "### 2. The ideal gas equation",
             "svg": ("One constant, every gas — R across the unit systems",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"200\" y=\"50\" width=\"240\" height=\"54\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"84\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"18\">PV = nRT</text>"
                     "<g font-size=\"13\" fill=\"#111827\" text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"170\" width=\"140\" height=\"46\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"140\" y=\"190\">8.314 J</text>"
                     "<text x=\"140\" y=\"207\" fill=\"#6b7280\" font-size=\"11\">Pa, m&#179; (SI)</text>"
                     "<rect x=\"250\" y=\"170\" width=\"140\" height=\"46\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"320\" y=\"190\">0.0821 L atm</text>"
                     "<text x=\"320\" y=\"207\" fill=\"#6b7280\" font-size=\"11\">chemistry numericals</text>"
                     "<rect x=\"430\" y=\"170\" width=\"140\" height=\"46\" rx=\"8\" fill=\"#fdf2f8\" stroke=\"#be185d\"/>"
                     "<text x=\"500\" y=\"190\">1.987 cal</text>"
                     "<text x=\"500\" y=\"207\" fill=\"#6b7280\" font-size=\"11\">thermodynamics</text>"
                     "</g>"
                     "<text x=\"320\" y=\"255\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">same constant, different costumes — match R to your units</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/07-liquid-crystals-and-applications.json",
        "blocks": [
            {"after": "### 2. Characteristics",
             "md": ("### Deep dive — the in-between state and its three phases\n\n"
                    "Liquid crystals flow like liquids but keep long-range orientational order like "
                    "crystals. Rod-like molecules with strong shape anisotropy (aromatic rings, ester "
                    "or azo linkages) form them between the solid and the isotropic liquid over a "
                    "**narrow temperature range**. Three ordered phases: **nematic** (threads; "
                    "molecules aligned parallel, positions random — the simplest and the LCD workhorse), "
                    "**smectic** (soap-like; layered order on top of alignment), **cholesteric** "
                    "(cholesterol-like; layers twisted into a helix that rotates colour with "
                    "temperature — used in thermometers and mood rings). Applications: LCDs (twisted "
                    "nematic cells switched by voltage), temperature sensing (cholesteric colour "
                    "shift), and window films."),
             "table": ("Liquid-crystal phases — order and use",
                       ["Phase", "Order", "Visual analogy", "Use"],
                       [["Nematic", "Parallel alignment, random positions", "Threads", "LCD displays"],
                        ["Smectic", "Aligned + layered", "Soap films", "Study of order"],
                        ["Cholesteric", "Helical twist between layers", "Spiral staircase", "Thermometers, colour films"]]),
        },
            {"after": "### 1. Meaning",
             "svg": ("Solid → nematic → smectic → liquid — order melting away stepwise",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"12\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"70\" y1=\"70\" x2=\"70\" y2=\"210\"/>"
                     "<line x1=\"90\" y1=\"70\" x2=\"90\" y2=\"210\"/>"
                     "<line x1=\"110\" y1=\"70\" x2=\"110\" y2=\"210\"/>"
                     "<line x1=\"130\" y1=\"70\" x2=\"130\" y2=\"210\"/>"
                     "</g>"
                     "<text x=\"100\" y=\"240\" text-anchor=\"middle\" fill=\"#1d4ed8\">solid: full order</text>"
                     "<g stroke=\"#166534\" stroke-width=\"2\">"
                     "<line x1=\"230\" y1=\"80\" x2=\"230\" y2=\"120\"/>"
                     "<line x1=\"250\" y1=\"90\" x2=\"250\" y2=\"130\"/>"
                     "<line x1=\"270\" y1=\"70\" x2=\"270\" y2=\"110\"/>"
                     "<line x1=\"230\" y1=\"160\" x2=\"230\" y2=\"200\"/>"
                     "<line x1=\"250\" y1=\"170\" x2=\"250\" y2=\"210\"/>"
                     "<line x1=\"270\" y1=\"150\" x2=\"270\" y2=\"190\"/>"
                     "</g>"
                     "<text x=\"255\" y=\"240\" text-anchor=\"middle\" fill=\"#166534\">smectic: layers</text>"
                     "<g stroke=\"#a16207\" stroke-width=\"2\">"
                     "<line x1=\"400\" y1=\"75\" x2=\"400\" y2=\"205\"/>"
                     "<line x1=\"425\" y1=\"85\" x2=\"425\" y2=\"195\"/>"
                     "<line x1=\"450\" y1=\"70\" x2=\"450\" y2=\"210\"/>"
                     "</g>"
                     "<text x=\"425\" y=\"240\" text-anchor=\"middle\" fill=\"#a16207\">nematic: aligned only</text>"
                     "<g stroke=\"#991b1b\" stroke-width=\"2\">"
                     "<line x1=\"560\" y1=\"80\" x2=\"575\" y2=\"120\"/>"
                     "<line x1=\"595\" y1=\"75\" x2=\"580\" y2=\"115\"/>"
                     "<line x1=\"555\" y1=\"160\" x2=\"570\" y2=\"200\"/>"
                     "<line x1=\"600\" y1=\"165\" x2=\"585\" y2=\"195\"/>"
                     "</g>"
                     "<text x=\"580\" y=\"240\" text-anchor=\"middle\" fill=\"#991b1b\">liquid: random</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">narrow T window between solid and liquid — order is partial and switchable</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/08-efflorescent-deliquescent-and-hygroscopic-solids.json",
        "blocks": [
            {"after": "### 3. Deliquescent and hygroscopic solids",
             "md": ("### Deep dive — three behaviours, one variable: vapour pressure\n\n"
                    "What a solid does with atmospheric moisture depends on the comparison between the "
                    "**vapour pressure of water in the air** and the **water-vapour pressure over the "
                    "solid's saturated solution**. If the solid's saturated-solution vapour pressure is "
                    "**higher** than the air's, the solid *loses* water — efflorescence (Na₂SO₄·10H₂O, "
                    "washing soda, Glauber's salt crumbles to powder). If **lower**, the solid *drinks* "
                    "water until it dissolves in its own absorbed water — deliquescence (CaCl₂, P₂O₅, "
                    "NaOH, ZnCl₂ — often to a complete solution). If roughly comparable, the surface "
                    "just adsorbs moisture without dissolving — hygroscopicity (quicklime CaO, silica "
                    "gel, CuO). Desiccators exploit the deliquescent class: CaCl₂ or silica gel keep "
                    "the chamber dry."),
             "table": ("Efflorescent vs deliquescent vs hygroscopic",
                       ["Behaviour", "Direction of water flow", "Condition", "Examples"],
                       [["Efflorescent", "Solid &#8594; air (loses water)", "Sat. solution v.p. &gt; air v.p.", "Na&#8322;SO&#8324;&#183;10H&#8322;O, washing soda"],
                        ["Deliquescent", "Air &#8594; solid (dissolves itself)", "Sat. solution v.p. &lt; air v.p.", "CaCl&#8322;, NaOH, P&#8322;O&#8325;, ZnCl&#8322;"],
                        ["Hygroscopic", "Adsorbs moisture only", "Comparable v.p.; no dissolution", "CaO, silica gel, CuO"]]),
        },
            {"after": "### 4. Crystallization and crystal growth",
             "svg": ("One comparison decides — vapour pressure of the saturated solution vs the air",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g font-size=\"14\" text-anchor=\"middle\">"
                     "<rect x=\"60\" y=\"90\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"135\" y=\"125\" fill=\"#1d4ed8\">efflorescent</text>"
                     "<text x=\"135\" y=\"148\" fill=\"#374151\" font-size=\"12\">v.p.(sat) &gt; v.p.(air)</text>"
                     "<text x=\"135\" y=\"166\" fill=\"#6b7280\" font-size=\"12\">loses water</text>"
                     "<rect x=\"245\" y=\"90\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"320\" y=\"125\" fill=\"#166534\">hygroscopic</text>"
                     "<text x=\"320\" y=\"148\" fill=\"#374151\" font-size=\"12\">&#8776; comparable</text>"
                     "<text x=\"320\" y=\"166\" fill=\"#6b7280\" font-size=\"12\">adsorbs only</text>"
                     "<rect x=\"430\" y=\"90\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"505\" y=\"125\" fill=\"#991b1b\">deliquescent</text>"
                     "<text x=\"505\" y=\"148\" fill=\"#374151\" font-size=\"12\">v.p.(sat) &lt; v.p.(air)</text>"
                     "<text x=\"505\" y=\"166\" fill=\"#6b7280\" font-size=\"12\">drinks water, dissolves</text>"
                     "</g>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#374151\">compare the saturated-solution vapour pressure with the air&#8217;s</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">desiccators use deliquescent CaCl&#8322; or silica gel to keep the chamber dry</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/09-unit-crystal-lattice-and-unit-cell.json",
        "blocks": [
            {"after": "### 3. Types of unit cell",
             "md": ("### Deep dive — counting particles per cell: the shared-corner arithmetic\n\n"
                    "A unit cell is the smallest repeating block; stacking it in 3D rebuilds the whole "
                    "crystal. Particles on boundaries are shared: **corner = 1/8**, **face-centre = "
                    "1/2**, **edge = 1/4**, body-centre = 1 (all its own). Counting gives: primitive "
                    "(simple) cubic = 8 × 1/8 = **1 particle**; body-centred cubic (BCC) = 8 × 1/8 + 1 "
                    "= **2**; face-centred cubic (FCC) = 8 × 1/8 + 6 × 1/2 = **4**. Coordination numbers "
                    "follow: 6 (SC), 8 (BCC), 12 (FCC) — FCC and HCP are the closest-packed arrangements "
                    "with 74% packing efficiency. Six lattice parameters (three edge lengths a, b, c and "
                    "three angles α, β, γ) generate the seven crystal systems, cubic being the most "
                    "symmetric (a = b = c, all 90°)."),
             "table": ("Unit-cell census — particles per cell and coordination",
                       ["Cell type", "Contribution arithmetic", "Particles/cell", "Coordination no."],
                       [["Simple cubic", "8 corners &#215; 1/8", "1", "6"],
                        ["Body-centred (BCC)", "8&#215;1/8 + 1 body", "2", "8"],
                        ["Face-centred (FCC)", "8&#215;1/8 + 6&#215;1/2", "4", "12"],
                        ["Hexagonal close-packed", "hcp stacking", "6 (conventional)", "12"]]),
        },
            {"after": "### 2. Lattice parameters and crystal systems",
             "svg": ("Corner and face sharing — how the census works",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<rect x=\"100\" y=\"80\" width=\"110\" height=\"110\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"100\" cy=\"80\" r=\"9\"/><circle cx=\"210\" cy=\"80\" r=\"9\"/>"
                     "<circle cx=\"100\" cy=\"190\" r=\"9\"/><circle cx=\"210\" cy=\"190\" r=\"9\"/>"
                     "</g>"
                     "<text x=\"155\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">SC: 8 &#215; 1/8 = 1</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"300\" y=\"80\" width=\"110\" height=\"110\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<g fill=\"#a16207\">"
                     "<circle cx=\"300\" cy=\"80\" r=\"8\"/><circle cx=\"410\" cy=\"80\" r=\"8\"/>"
                     "<circle cx=\"300\" cy=\"190\" r=\"8\"/><circle cx=\"410\" cy=\"190\" r=\"8\"/>"
                     "<circle cx=\"355\" cy=\"135\" r=\"8\"/>"
                     "</g>"
                     "<text x=\"355\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">FCC: 8&#215;1/8 + 6&#215;1/2 = 4</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"500\" y=\"80\" width=\"110\" height=\"110\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<g fill=\"#166534\">"
                     "<circle cx=\"500\" cy=\"80\" r=\"8\"/><circle cx=\"610\" cy=\"80\" r=\"8\"/>"
                     "<circle cx=\"500\" cy=\"190\" r=\"8\"/><circle cx=\"610\" cy=\"190\" r=\"8\"/>"
                     "<circle cx=\"555\" cy=\"135\" r=\"9\"/>"
                     "</g>"
                     "<text x=\"555\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">BCC: +1 body = 2</text>"
                     "</g>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">corner = 1/8, face = 1/2, edge = 1/4 — the arithmetic behind every census</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
