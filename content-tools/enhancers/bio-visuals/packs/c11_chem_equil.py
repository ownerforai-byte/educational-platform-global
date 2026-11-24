# Chemistry class-11 — Chemical equilibrium (6 files)
PART_A = [
    {
        "file": "class-11/chemistry/chemical-equilibrium/01-physical-and-chemical-equilibrium-dynamic-nature-of-chemical-equilibrium.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — dynamic equilibrium: same rates, not zero activity\n\n"
                    "At equilibrium the forward and backward reactions run **at equal rates** — molecules "
                    "react constantly in both directions, but the macroscopic concentrations stop changing. "
                    "The four characteristics NEB lists: (1) measurable only in a closed system; (2) dynamic "
                    "(both reactions continue); (3) concentrations constant but not necessarily equal; (4) "
                    "self-restoring — a shifted system returns when the disturbance is removed.\n\n"
                    "Physical equilibria follow the same logic: evaporation ⇌ condensation in a closed "
                    "flask, dissolution ⇌ crystallisation of a saturated solution, N₂O₄ ⇌ 2NO₂ phase "
                    "equilibria. The test question \u201cwhy can a reversible reaction never go to "
                    "completion?\u201d answers itself: as products accumulate the reverse rate rises until "
                    "it equals the forward rate — completion would require zero reverse rate, which no "
                    "finite K allows."),
             "table": ("Characteristics of dynamic equilibrium",
                       ["Characteristic", "Statement", "Everyday analogue"],
                       [["Closed system", "Nothing enters or leaves", "Sealed soft drink: CO&#8322; gas &#8646; dissolved"],
                        ["Dynamic", "Forward = backward rate &#8800; 0", "Population of a city with equal in/out migration"],
                        ["Constant, not equal", "Concentrations fixed at unequal values", "Water level steady with equal in/out flow"],
                        ["Self-restoring", "Remove disturbance &#8594; system returns", "Thermostat returning to set temperature"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Dynamic equilibrium — rates equal, reactions alive",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"15\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"80\" y=\"90\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"160\" y=\"125\" text-anchor=\"middle\" fill=\"#1d4ed8\">reactants</text>"
                     "<text x=\"160\" y=\"150\" text-anchor=\"middle\" fill=\"#374151\">[A], [B]</text>"
                     "<rect x=\"400\" y=\"90\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"480\" y=\"125\" text-anchor=\"middle\" fill=\"#166534\">products</text>"
                     "<text x=\"480\" y=\"150\" text-anchor=\"middle\" fill=\"#374151\">[C], [D]</text>"
                     "<path d=\"M245 105 L 395 105\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<path d=\"M395 105 L 380 98 L 380 112 Z\" fill=\"#1d4ed8\"/>"
                     "<path d=\"M395 155 L 245 155\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M245 155 L 260 148 L 260 162 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"95\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"13\">rate(f)</text>"
                     "<text x=\"320\" y=\"178\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"13\">rate(b)</text>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#111827\">at equilibrium: rate(f) = rate(b) &#8800; 0</text>"
                     "<text x=\"320\" y=\"252\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">concentrations constant — molecules still reacting both ways</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-equilibrium/02-law-of-mass-action.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — writing K correctly: the five rules that cost marks\n\n"
                    "Guldberg and Waage (1864): at equilibrium the rate of each direction is proportional to "
                    "the product of the active masses raised to their stoichiometric powers; setting the two "
                    "rates equal gives the equilibrium expression. The rules that decide full marks:\n\n"
                    "1. **Pure solids and pure liquids are omitted** — their active mass is constant and "
                    "already folded into K (CaCO₃ ⇌ CaO + CO₂ gives K = p(CO₂)).\n"
                    "2. **Use activities, approximate with molar concentrations** for dilute solutions; use "
                    "partial pressures for gases (Kp).\n"
                    "3. **K is written for the equation as given** — reversing the reaction inverts K; "
                    "multiplying by n raises K to the nth power (N₂ + 3H₂ ⇌ 2NH₃ vs ½N₂ + 3/2H₂ ⇌ NH₃ "
                    "differ by K → √K).\n"
                    "4. **K depends only on temperature** — quote the temperature or the answer is "
                    "meaningless.\n"
                    "5. **Units**: Kc carries units of (mol/L)^Δn; when Δn = 0 it is dimensionless."),
             "table": ("Manipulating K — the algebra NEB tests",
                       ["Operation on the equation", "Effect on K", "Example (H&#8322; + I&#8322; &#8646; 2HI, K = 49)"],
                       [["Reverse the equation", "K &#8594; 1/K", "2HI &#8646; H&#8322; + I&#8322;: K = 1/49"],
                        ["Multiply by n", "K &#8594; K&#8319;", "&#189;H&#8322; + &#189;I&#8322; &#8646; HI: K = &#8730;49 = 7"],
                        ["Add two equations", "K = K&#8321; &#215; K&#8322;", "Hess-style combination"],
                        ["Δn = 0 reaction", "K dimensionless; Kp = Kc", "H&#8322; + I&#8322; &#8646; 2HI"],
                        ["Solids present", "Drop them from the expression", "CaCO&#8323; &#8646; CaO + CO&#8322;: K = p(CO&#8322;)"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Building the equilibrium expression — what enters, what stays out",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"70\" y=\"50\" width=\"500\" height=\"60\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"78\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"16\">K = [C]&#7511;[D]&#7513; / [A]&#7471;[B]&#7504;</text>"
                     "<text x=\"320\" y=\"98\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"13\">for aA + bB &#8646; cC + dD — powers = stoichiometric coefficients</text>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"70\" y=\"150\" width=\"230\" height=\"50\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"185\" y=\"172\" text-anchor=\"middle\" fill=\"#166534\">include: gases, solutes</text>"
                     "<text x=\"185\" y=\"190\" text-anchor=\"middle\" fill=\"#6b7280\">as partial pressures or mol/L</text>"
                     "<rect x=\"340\" y=\"150\" width=\"230\" height=\"50\" rx=\"8\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"455\" y=\"172\" text-anchor=\"middle\" fill=\"#991b1b\">omit: pure solids, pure liquids</text>"
                     "<text x=\"455\" y=\"190\" text-anchor=\"middle\" fill=\"#6b7280\">constant active mass &#8594; inside K</text>"
                     "</g>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#374151\">CaCO&#8323;(s) &#8646; CaO(s) + CO&#8322;(g) &#8594; K = p(CO&#8322;) only</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">K depends on temperature alone — always quote T</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-equilibrium/03-expression-for-equilibrium-constant-and-its-importance.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — K tells you the destination, Q tells you where you are\n\n"
                    "The reaction quotient Q has K's formula with *any* set of concentrations. Comparing Q "
                    "with K predicts the direction of spontaneous change:\n\n"
                    "- **Q < K** — too few products; the reaction runs forward.\n"
                    "- **Q = K** — at equilibrium; no net change.\n"
                    "- **Q > K** — too many products; the reaction runs backward.\n\n"
                    "The size of K measures the *position*: K ≈ 10³ or more means the equilibrium lies far "
                    "right (reaction \u201cgoes\u201d); K ≈ 10⁻³ or less means far left; intermediate K "
                    "means a measurable mixture. But K says nothing about *speed* — a large K with a slow "
                    "rate still needs a catalyst or time (diamond → graphite has enormous K yet diamonds "
                    "persist). And K ≠ yield percentage: yield also depends on starting amounts and removal "
                    "of products."),
             "table": ("Reading K and Q — the prediction table",
                       ["Comparison", "Meaning", "Direction of change"],
                       [["Q &lt; K", "Products depleted relative to equilibrium", "Net forward reaction"],
                        ["Q = K", "System at equilibrium", "No net change"],
                        ["Q &gt; K", "Products excessive", "Net backward reaction"],
                        ["K &#8776; 10&#179; or larger", "Equilibrium far to the right", "Reaction nearly complete"],
                        ["K &#8776; 10&#8315;&#179; or smaller", "Equilibrium far to the left", "Little product forms"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Q versus K — the compass that predicts the direction",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<line x1=\"70\" y1=\"160\" x2=\"570\" y2=\"160\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<circle cx=\"320\" cy=\"160\" r=\"9\" fill=\"#166534\"/>"
                     "<text x=\"320\" y=\"190\" text-anchor=\"middle\" fill=\"#166534\">Q = K: equilibrium</text>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2.5\">"
                     "<line x1=\"120\" y1=\"160\" x2=\"290\" y2=\"160\"/>"
                     "</g>"
                     "<path d=\"M290 160 L 275 153 L 275 167 Z\" fill=\"#1d4ed8\"/>"
                     "<text x=\"150\" y=\"140\" fill=\"#1d4ed8\">Q &lt; K &#8594; forward</text>"
                     "<g stroke=\"#991b1b\" stroke-width=\"2.5\">"
                     "<line x1=\"520\" y1=\"160\" x2=\"350\" y2=\"160\"/>"
                     "</g>"
                     "<path d=\"M350 160 L 365 153 L 365 167 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"450\" y=\"140\" fill=\"#991b1b\">Q &gt; K &#8594; backward</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#374151\">K sets the destination; Q reports the current position</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">large K = far right; K says nothing about rate — diamond &#8594; graphite is slow despite huge K</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-equilibrium/04-relationship-between-kp-and-kc.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the bridge Kp = Kc(RT)^Δn and how to use it\n\n"
                    "For gas-phase equilibria, substituting p = cRT into the Kp expression gives "
                    "**Kp = Kc(RT)^Δn**, where Δn = (moles of gaseous products) − (moles of gaseous "
                    "reactants). Three regimes:\n\n"
                    "- **Δn = 0** — Kp = Kc (H₂ + I₂ ⇌ 2HI; N₂ + O₂ ⇌ 2NO).\n"
                    "- **Δn > 0** — Kp > Kc at T > 1/R (in K): N₂O₄ ⇌ 2NO₂ (Δn = +1); NH₄Cl decomposition "
                    "(Δn = +1).\n"
                    "- **Δn < 0** — Kp < Kc: N₂ + 3H₂ ⇌ 2NH₃ (Δn = −2).\n\n"
                    "Numerical discipline: T in **kelvin**, R matched to the pressure unit (0.0821 L atm for "
                    "atm-based Kp, 8.314 J or 8.314 kPa·dm³ for SI). Worked standard: for N₂O₄ ⇌ 2NO₂ with "
                    "Kc = 0.16 at 273 K... use T = 300 K → Kp = 0.16 × 0.0821 × 300 ≈ 3.9 — the factor RT "
                    "converts concentration units into pressure units."),
             "table": ("Kp vs Kc — Δn decides the relation",
                       ["Reaction", "&#916;n (gas)", "Relation", "Comment"],
                       [["H&#8322; + I&#8322; &#8646; 2HI", "0", "Kp = Kc", "Moles unchanged"],
                        ["N&#8322; + O&#8322; &#8646; 2NO", "0", "Kp = Kc", "Same"],
                        ["N&#8322;O&#8324; &#8646; 2NO&#8322;", "+1", "Kp = Kc(RT)", "Kp &gt; Kc above 1/0.0821 &#8776; 12 K"],
                        ["NH&#8324;Cl(s) &#8646; NH&#8323;(g) + HCl(g)", "+1", "Kp = Kc(RT)", "Solid omitted from &#916;n"],
                        ["N&#8322; + 3H&#8322; &#8646; 2NH&#8323;", "&#8722;2", "Kp = Kc(RT)&#8315;&#178;", "Kp &lt; Kc"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("Δn decides — the three regimes of Kp = Kc(RT)^Δn",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"200\" y=\"40\" width=\"240\" height=\"50\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"72\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"17\">Kp = Kc(RT)&#8710;n</text>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"60\" y=\"150\" width=\"160\" height=\"70\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"140\" y=\"175\" text-anchor=\"middle\" fill=\"#166534\">&#916;n = 0</text>"
                     "<text x=\"140\" y=\"196\" text-anchor=\"middle\">Kp = Kc</text>"
                     "<rect x=\"240\" y=\"150\" width=\"160\" height=\"70\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"320\" y=\"175\" text-anchor=\"middle\" fill=\"#a16207\">&#916;n &gt; 0</text>"
                     "<text x=\"320\" y=\"196\" text-anchor=\"middle\">Kp &gt; Kc</text>"
                     "<rect x=\"420\" y=\"150\" width=\"160\" height=\"70\" rx=\"8\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"500\" y=\"175\" text-anchor=\"middle\" fill=\"#991b1b\">&#916;n &lt; 0</text>"
                     "<text x=\"500\" y=\"196\" text-anchor=\"middle\">Kp &lt; Kc</text>"
                     "</g>"
                     "<g font-size=\"12\" fill=\"#6b7280\" text-anchor=\"middle\">"
                     "<text x=\"140\" y=\"245\">H&#8322; + I&#8322; &#8646; 2HI</text>"
                     "<text x=\"320\" y=\"245\">N&#8322;O&#8324; &#8646; 2NO&#8322;</text>"
                     "<text x=\"500\" y=\"245\">N&#8322; + 3H&#8322; &#8646; 2NH&#8323;</text>"
                     "</g>"
                     "<text x=\"320\" y=\"280\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">T in kelvin; R = 0.0821 L atm (atm) or 8.314 (SI)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/chemical-equilibrium/05-le-chatelier-s-principle-numericals-not-required.json",
        "blocks": [
            {"after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — Le Chatelier applied to the reactions NEB quotes\n\n"
                    "\u201cWhen a system at equilibrium is disturbed, it shifts in the direction that "
                    "opposes the disturbance.\u201d Apply it to the three industrial favourites:\n\n"
                    "- **Haber process** N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ: high pressure (4 → 2 moles, "
                    "150–300 atm) favours NH₃; low temperature favours NH₃ but slows the rate, so ~450 °C "
                    "is the compromise; continuous removal of NH₃ (liquefaction) pulls the equilibrium "
                    "right; excess N₂ or H₂ does the same.\n"
                    "- **Contact process** 2SO₂ + O₂ ⇌ 2SO₃, ΔH = −196 kJ: same logic — excess air, "
                    "moderate T (~450 °C), 1–2 atm.\n"
                    "- **N₂O₄ ⇌ 2NO₂, ΔH = +57 kJ**: heating deepens the brown colour (forward, "
                    "endothermic); compression *lightens* it at first (shift to fewer moles) — the "
                    "temporary colour jump on compression is the classic subtlety.\n\n"
                    "Catalysts never shift equilibrium — they speed both directions equally, cutting the "
                    "time to reach the same position. Temperature is the only variable that changes K "
                    "itself."),
             "table": ("Le Chatelier applied — disturbance, shift, industrial use",
                       ["Disturbance", "System responds by", "Haber example", "Rule"],
                       [["&#8593; Pressure", "Fewer gas moles", "More NH&#8323; (4 &#8594; 2 mol)", "Shift to lower volume"],
                        ["&#8593; Temperature", "Endothermic direction", "Less NH&#8323; (forward exothermic)", "Only T changes K"],
                        ["&#8593; Reactant conc.", "Consume it", "Excess N&#8322;/H&#8322; &#8594; more NH&#8323;", "Cheap reagent in excess"],
                        ["Remove product", "Replace it", "Liquefy and remove NH&#8323;", "Continuous yield"],
                        ["Add catalyst", "No shift", "Fe catalyst speeds both ways", "Faster equilibrium, same K"]]),
        },
            {"after": "## 7. Exam Application",
             "svg": ("N₂O₄ ⇌ 2NO₂ — colour tells you the shift instantly",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"60\" y=\"60\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#f3f4f6\" stroke=\"#9ca3af\"/>"
                     "<text x=\"135\" y=\"100\" text-anchor=\"middle\" fill=\"#374151\">pale: N&#8322;O&#8324;</text>"
                     "<text x=\"135\" y=\"125\" text-anchor=\"middle\" fill=\"#6b7280\">colourless gas</text>"
                     "<rect x=\"430\" y=\"60\" width=\"150\" height=\"90\" rx=\"10\" fill=\"#7f1d1d\" stroke=\"#991b1b\"/>"
                     "<text x=\"505\" y=\"100\" text-anchor=\"middle\" fill=\"#fecaca\">dark: NO&#8322;</text>"
                     "<text x=\"505\" y=\"125\" text-anchor=\"middle\" fill=\"#fecaca\">brown gas</text>"
                     "<path d=\"M215 90 L 425 90\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M425 90 L 410 83 L 410 97 Z\" fill=\"#1d4ed8\"/>"
                     "<path d=\"M425 125 L 215 125\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<path d=\"M215 125 L 230 118 L 230 132 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"80\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"13\">heat &#8594; forward (endothermic) &#8594; darker</text>"
                     "<text x=\"320\" y=\"148\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"13\">compress &#8594; backward (2 &#8594; 1 mol) &#8594; lighter</text>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#111827\">&#916;H = +57 kJ; &#916;n = +1</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">on sudden compression the colour first darkens (concentration), then fades (shift) — quote both stages</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
