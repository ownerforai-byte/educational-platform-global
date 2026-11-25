# Physics class-11 — dc-circuits + ideal-gas full enrichment (6 files)
PART_A = [
    {
        "file": "class-11/physics/dc-circuits/02-ohm-s-law-electrical-resistance-resistivity-conductivity.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: resistance is geometry plus material\n\nOhm's law, $V = IR$ at constant temperature, is a *material* statement about proportionality, not a definition of resistance. The resistance of a specimen separates into two factors: $R = \\rho L/A$ — resistivity $\\rho$ is the material's property (copper $1.7\\times10^{-8}\\,\\Omega$m, nichrome ~100× larger), while $L/A$ is pure geometry. Doubling a wire's length doubles R; doubling its diameter quarters R (area quadruples). Conductivity $\\sigma = 1/\\rho$ is the microscopic twin, tied to carrier density and mobility by $\\sigma = ne\\mu$. Because $\rho$ drifts with temperature ($\\rho = \\rho_0(1+\\alpha\\Delta T)$ for metals), every Ohm's-law statement is secretly 'at constant temperature' — a filament measured cold and hot gives different R."),
             "table1": {"title": "R, ρ and σ — who owns which factor",
                        "headers": ["Quantity", "Formula", "Depends on", "Unit"],
                        "rows": [
                            ["Resistance R", "$V/I$", "material + geometry", "ohm (&#937;)"],
                            ["Resistivity ρ", "$RA/L$", "material + temperature only", "&#937;m"],
                            ["Conductivity σ", "1/ρ = neμ", "carrier density &#215; mobility", "S/m"],
                            ["Temperature effect", "$\\rho = \\rho_0(1+\\alpha\\Delta T)$", "&#945; &gt; 0 metals, &lt; 0 semiconductors", "&#8212;"],
                        ]},
             "table2": {"title": "Geometry effects on a wire's resistance",
                        "headers": ["Change", "Effect on R", "Reason"],
                        "rows": [
                            ["Length doubled", "R doubles", "R &#8746; L"],
                            ["Diameter doubled", "R quarters", "A &#8746; d&#178;"],
                            ["Same mass, stretched to 2L", "R &#215;4", "A halves too"],
                            ["Same volume, drawn to 3L", "R &#215;9", "A = V/L shrinks 3&#215;"],
                        ]},
             "svg": ("R = ρL/A — long thin wire resists, short fat wire conducts",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"80\" y=\"90\" width=\"220\" height=\"24\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"190\" y=\"80\" fill=\"#1d4ed8\">long + thin &#8594; large R</text>"
                     "<rect x=\"380\" y=\"70\" width=\"110\" height=\"64\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"470\" y=\"60\" fill=\"#166534\">short + fat &#8594; small R</text>"
                     "<text x=\"320\" y=\"200\" fill=\"#374151\">R = &#961;L/A</text>"
                     "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">same material both wires; geometry alone changes R</text>"
                     "</g>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("V-I straight line through the origin — Ohm's law",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\"/>"
                     "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"100\" y1=\"200\" x2=\"520\" y2=\"80\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">V</text>"
                     "<text x=\"590\" y=\"230\" fill=\"#111827\">I</text>"
                     "<text x=\"420\" y=\"70\" fill=\"#1d4ed8\">slope = R (constant)</text>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#6b7280\">straight line through the origin at constant temperature = ohmic</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/dc-circuits/03-current-voltage-relations-and-ohmic-and-non-ohmic-resistance.json",
        "blocks": [
            {"after": "**Ohmic conductor:** obeys Ohm's law. The $I$-$V$ graph is a",
             "md": ("### Deep dive: the I–V curve is the fingerprint\n\nAn ohmic conductor's I–V graph is a straight line through the origin whose slope is $1/R$ — the same R whether you read it at 1 V or 10 V. Non-ohmic devices bend the line for physical reasons: a filament's R grows with temperature (curve flattens), a diode conducts in one direction only (asymmetric curve), a thermistor's R *falls* as it warms (curve steepens). Reading the graph is a scored skill: the *slope at a point* gives the dynamic conductance, while $V/I$ at a point gives the static resistance — for curved graphs the two differ, which is the definition of non-ohmic behaviour."),
             "table1": {"title": "Ohmic vs non-ohmic devices",
                        "headers": ["Device", "I–V shape", "R behaviour", "Why"],
                        "rows": [
                            ["Metal wire (constant T)", "straight line", "constant", "ions scatter, not electrons"],
                            ["Filament lamp", "flattening curve", "R rises when hot", "tungsten &#945; &gt; 0"],
                            ["Thermistor (NTC)", "steepening curve", "R falls when hot", "more carriers released"],
                            ["Diode", "asymmetric", "R tiny one way, huge the other", "junction barrier"],
                            ["Electrolyte", "roughly linear at low V", "near-ohmic", "ion drift limited"],
                        ]},
             "table2": {"title": "Reading an I–V graph correctly",
                        "headers": ["Question", "Read", "Formula"],
                        "rows": [
                            ["Static resistance at a point", "V/I from origin to point", "$R = V/I$"],
                            ["Dynamic resistance at a point", "slope of the tangent", "$r = dV/dI$"],
                            ["Ohmic check", "are they equal everywhere?", "yes &#8594; ohmic"],
                            ["Slope units", "V/A = &#937;", "steeper = smaller R"],
                        ]},
             "svg": ("I-V curves — ohmic line vs filament vs diode",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"230\" x2=\"580\" y2=\"230\"/>"
                     "<line x1=\"80\" y1=\"230\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"100\" y1=\"220\" x2=\"400\" y2=\"70\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M100 220 C 250 150, 400 100, 540 80\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<path d=\"M300 230 L 300 226 L 420 60 L 424 64\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"300\" y=\"55\" fill=\"#1d4ed8\">ohmic (straight)</text>"
                     "<text x=\"430\" y=\"120\" fill=\"#a16207\">filament (flattens)</text>"
                     "<text x=\"480\" y=\"45\" fill=\"#166534\">diode (one-way)</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">I</text>"
                     "<text x=\"590\" y=\"250\" fill=\"#111827\">V</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\">only the straight line through the origin obeys Ohm's law</text>"
                     "</svg>"),
            },
            {"after": "**Temperature coefficient of filament:** tungsten has $\\\\\\\\a",
             "svg": ("Thermistor vs filament — opposite temperature responses",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"185\" y=\"100\" fill=\"#166534\">thermistor (NTC)</text>"
                     "<text x=\"185\" y=\"125\" fill=\"#374151\" font-size=\"12\">hotter &#8594; more carriers</text>"
                     "<text x=\"185\" y=\"150\" fill=\"#374151\" font-size=\"12\">R falls</text>"
                     "<rect x=\"340\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"455\" y=\"100\" fill=\"#a16207\">filament (tungsten)</text>"
                     "<text x=\"455\" y=\"125\" fill=\"#374151\" font-size=\"12\">hotter &#8594; more scattering</text>"
                     "<text x=\"455\" y=\"150\" fill=\"#374151\" font-size=\"12\">R rises</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">carrier release vs lattice scattering — opposite signs of the effect</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/dc-circuits/03-current-voltage-relations-ohmic-and-non-ohmic-resistance.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: why the origin matters\n\nThe defining test for ohmic behaviour is not just a straight I–V graph — the line must pass through the *origin*, so that zero voltage gives zero current and the ratio $V/I$ is the same constant everywhere. A straight line that misses the origin (a diode's reverse leakage, or a curve with an offset) is non-ohmic even though it looks linear. Temperature is the hidden variable: a metal wire measured at one temperature is ohmic, but the same wire heating up as current flows bends its own curve — which is why the law is stated 'at constant temperature'. NEB one-markers ask exactly this: *state the two conditions* (constant temperature, proportionality through the origin)."),
             "table1": {"title": "The two-part Ohm's law test",
                        "headers": ["Condition", "What to check", "Failure example"],
                        "rows": [
                            ["Straight line", "I &#8746; V at fixed T", "filament, thermistor"],
                            ["Through the origin", "I = 0 when V = 0", "diode (threshold), rectifier"],
                            ["Constant temperature", "re-measure gives same line", "wire that heats under test"],
                            ["Same R both directions", "reverse the battery", "diode, electrolytic cell"],
                        ]},
             "table2": {"title": "I–V graph vocabulary",
                        "headers": ["Term", "Meaning", "Units"],
                        "rows": [
                            ["Slope of I–V", "conductance G = 1/R", "siemens (S)"],
                            ["V/I at a point", "static resistance", "&#937;"],
                            ["dV/dI at a point", "dynamic resistance", "&#937;"],
                            ["Equal slopes both ways", "symmetric, ohmic", "&#8212;"],
                        ]},
             "svg": ("Through the origin or not — the ohmic test",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\"/>"
                     "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"100\" y1=\"200\" x2=\"300\" y2=\"90\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<line x1=\"300\" y1=\"90\" x2=\"500\" y2=\"90\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"130\" fill=\"#1d4ed8\">ohmic: through origin</text>"
                     "<text x=\"430\" y=\"75\" fill=\"#166534\">diode: needs threshold V</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\">a straight line that misses the origin is still non-ohmic</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Constant temperature — the hidden condition",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<text x=\"180\" y=\"80\" fill=\"#374151\">measured cold</text>"
                     "<path d=\"M100 200 L 260 100\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"110\" fill=\"#1d4ed8\">R = 10 &#937;</text>"
                     "<text x=\"460\" y=\"80\" fill=\"#374151\">measured hot</text>"
                     "<path d=\"M380 200 L 540 130\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"460\" y=\"140\" fill=\"#991b1b\">R = 15 &#937;</text>"
                     "</g>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">same wire, two temperatures — Ohm's law holds only at fixed T</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/dc-circuits/06-emf-internal-resistance-and-cells-in-combination.json",
        "blocks": [
            {"after": "**EMF ($\\mathcal{E}$):** the open-circuit voltage of a sourc",
             "md": ("### Deep dive: the terminal voltage is what the circuit actually gets\n\nA real cell is an ideal EMF in series with an internal resistance $r$. When it drives current I, the terminals show $V = \\mathcal{E} - Ir$ — less than the EMF, and the difference $Ir$ is heat wasted inside the cell. With no current (open circuit) $V = \\mathcal{E}$; while *charging*, current is forced backwards and $V = \\mathcal{E} + Ir$ exceeds the EMF. For n identical cells in series, $\\mathcal{E}_{eq} = n\\mathcal{E}$, $r_{eq} = nr$; in parallel, EMF stays $\\mathcal{E}$ but $r_{eq} = r/n$ — which is why parallel banks deliver more current without overheating. The maximum-power theorem (load R = r) follows from maximising $I^2R$ over R."),
             "table1": {"title": "EMF vs terminal voltage",
                        "headers": ["Situation", "Terminal voltage V", "Comment"],
                        "rows": [
                            ["Open circuit (I = 0)", "$V = \\mathcal{E}$", "EMF measured directly"],
                            ["Discharging", "$V = \\mathcal{E} - Ir$", "less than EMF"],
                            ["Charging", "$V = \\mathcal{E} + Ir$", "more than EMF"],
                            ["Short circuit (R = 0)", "$I_{sc} = \\mathcal{E}/r$", "V = 0, dangerous current"],
                            ["Maximum power to load", "R = r", "$P_{max} = \\mathcal{E}&#178;/4r$"],
                        ]},
             "table2": {"title": "Cells in combination (n identical cells)",
                        "headers": ["Combination", "EMF", "Internal resistance", "Best for"],
                        "rows": [
                            ["Series (n cells)", "$n\\mathcal{E}$", "$nr$", "high-voltage needs"],
                            ["Parallel (n cells)", "$\\mathcal{E}$", "$r/n$", "high-current needs"],
                            ["Mixed grid (m rows &#215; n)", "$n\\mathcal{E}$", "$nr/m$", "matched to load R = nr/m"],
                        ]},
             "svg": ("Real cell = EMF + internal r — terminal voltage drops with I",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"100\" y=\"100\" width=\"90\" height=\"70\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"145\" y=\"130\" fill=\"#a16207\">EMF &#8496;</text>"
                     "<text x=\"145\" y=\"150\" fill=\"#6b7280\" font-size=\"11\">+ r inside</text>"
                     "<line x1=\"190\" y1=\"135\" x2=\"280\" y2=\"135\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<rect x=\"280\" y=\"110\" width=\"60\" height=\"50\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"310\" y=\"140\" fill=\"#1d4ed8\">R</text>"
                     "<line x1=\"340\" y1=\"135\" x2=\"420\" y2=\"135\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"420\" y1=\"135\" x2=\"420\" y2=\"100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"420\" y1=\"100\" x2=\"100\" y2=\"100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<line x1=\"100\" y1=\"100\" x2=\"100\" y2=\"135\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<text x=\"480\" y=\"130\" fill=\"#374151\">V = &#8496; &#8722; Ir</text>"
                     "<text x=\"480\" y=\"155\" fill=\"#6b7280\" font-size=\"12\">open: V = &#8496;</text>"
                     "<text x=\"480\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">short: I = &#8496;/r</text>"
                     "</g>"
                     "</svg>"),
            },
            {"after": "**Real cell behavior:** as a cell discharges, its EMF slowly",
             "svg": ("V = E - Ir — the terminal-voltage line",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\"/>"
                     "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"100\" y1=\"80\" x2=\"480\" y2=\"200\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"90\" y=\"70\" fill=\"#1d4ed8\">&#8496;</text>"
                     "<text x=\"480\" y=\"225\" fill=\"#374151\">I</text>"
                     "<text x=\"300\" y=\"120\" fill=\"#1d4ed8\">V = &#8496; &#8722; Ir</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">V</text>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#6b7280\">slope = &#8722;r; intercept = &#8496;</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/dc-circuits/07-work-and-power-in-electrical-circuits.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: one watt, three formulas — pick by what is shared\n\nElectrical work is $W = VIt$ and power $P = VI = I^2R = V^2/R$; the three forms are algebraically identical *only* when you know which quantity is common to the elements. In series, the same I flows, so comparing $I^2R$ is honest — the larger R dissipates more. In parallel, the same V sits across each branch, so comparing $V^2/R$ is honest — the smaller R dissipates more. Mixing the forms up is the classic NEB error. The kilowatt-hour is the commercial unit: 1 kWh = 3.6 MJ, the energy a 1 kW load uses in one hour, and it is what the electricity meter reads."),
             "table1": {"title": "Power formulas and when each is the honest comparison",
                        "headers": ["Formula", "Best when", "Series example", "Parallel example"],
                        "rows": [
                            ["$P = VI$", "always valid", "&#8212;", "&#8212;"],
                            ["$P = I&#178;R$", "same I (series)", "bigger R wins", "misleading"],
                            ["$P = V&#178;/R$", "same V (parallel)", "misleading", "smaller R wins"],
                            ["Energy", "$W = Pt = VIt$", "1 kWh = 3.6 MJ", "&#8212;"],
                        ]},
             "table2": {"title": "Everyday power ratings (NEB context)",
                        "headers": ["Appliance", "Power", "Energy in 1 h"],
                        "rows": [
                            ["LED bulb", "9 W", "9 Wh"],
                            ["Filament bulb", "60 W", "60 Wh"],
                            ["Fan", "75 W", "75 Wh"],
                            ["Heater", "1500 W", "1.5 kWh"],
                            ["1 unit (kWh)", "1000 W for 1 h", "3.6 MJ"],
                        ]},
             "svg": ("Series vs parallel — which R dissipates more",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"230\" height=\"110\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"185\" y=\"100\" fill=\"#1d4ed8\">series (same I)</text>"
                     "<text x=\"185\" y=\"125\" fill=\"#374151\" font-size=\"12\">P = I&#178;R</text>"
                     "<text x=\"185\" y=\"150\" fill=\"#374151\" font-size=\"12\">bigger R &#8594; more heat</text>"
                     "<rect x=\"340\" y=\"70\" width=\"230\" height=\"110\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"455\" y=\"100\" fill=\"#166534\">parallel (same V)</text>"
                     "<text x=\"455\" y=\"125\" fill=\"#374151\" font-size=\"12\">P = V&#178;/R</text>"
                     "<text x=\"455\" y=\"150\" fill=\"#374151\" font-size=\"12\">smaller R &#8594; more heat</text>"
                     "</g>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">use the formula with the shared quantity</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("1 kWh = 3.6 MJ — the meter's unit",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"140\" y=\"70\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"220\" y=\"100\" fill=\"#1d4ed8\">1 kWh</text>"
                     "<text x=\"220\" y=\"125\" fill=\"#374151\" font-size=\"12\">1000 W &#215; 1 h</text>"
                     "<rect x=\"360\" y=\"70\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"440\" y=\"100\" fill=\"#166534\">= 3.6 MJ</text>"
                     "<text x=\"440\" y=\"125\" fill=\"#374151\" font-size=\"12\">= 3.6&#215;10&#8310; J</text>"
                     "</g>"
                     "<text x=\"320\" y=\"195\" text-anchor=\"middle\" fill=\"#6b7280\">1 unit on the electricity bill = 1 kWh</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/ideal-gas/04-derivation-of-pressure-exerted-by-gas.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: pressure from momentum bookkeeping\n\nThe kinetic-theory derivation turns molecular chaos into a clean formula in four moves. (1) A molecule hitting a wall head-on reverses its momentum, delivering $2mv_x$. (2) The round trip to the opposite wall takes $2L/v_x$, so one molecule strikes that wall $v_x/2L$ times per second, exerting $mv_x^2/L$. (3) Summing over N molecules and dividing by the wall area $L^2$ gives $P = \\frac{Nm\\overline{v_x^2}}{L^3} = \\frac{Nm\\overline{v_x^2}}{V}$. (4) Isotropy makes $\\overline{v_x^2} = \\frac{1}{3}\\overline{v^2}$, so $P = \\frac{1}{3}\\frac{Nm}{V}\\overline{v^2} = \\frac{1}{3}\\rho\\overline{v^2}$. Comparing with $PV = NkT$ yields $\\frac{1}{2}m\\overline{v^2} = \\frac{3}{2}kT$ — absolute temperature *is* mean kinetic energy."),
             "table1": {"title": "The four steps of the derivation",
                        "headers": ["Step", "Statement", "Result"],
                        "rows": [
                            ["1. Collision", "elastic head-on bounce reverses $v_x$", "momentum delivered $2mv_x$"],
                            ["2. Round trip", "time between hits $2L/v_x$", "force from one molecule $mv_x&#178;/L$"],
                            ["3. Sum over N", "average and divide by area", "$P = Nm\\overline{v_x&#178;}/V$"],
                            ["4. Isotropy", "$\\overline{v_x&#178;} = \\overline{v&#178;}/3$", "$P = \\frac{1}{3}\\rho\\overline{v&#178;}$"],
                        ]},
             "table2": {"title": "What the derivation buys you",
                        "headers": ["Comparison", "Result", "Meaning"],
                        "rows": [
                            ["$P = \\frac{1}{3}\\rho\\overline{v&#178;}$ vs $PV = NkT$", "$\\frac{1}{2}m\\overline{v&#178;} = \\frac{3}{2}kT$", "temperature = mean KE"],
                            ["r.m.s. speed", "$v_{rms} = \\sqrt{3kT/m} = \\sqrt{3RT/M}$", "lighter gas &#8594; faster"],
                            ["Doubling T (kelvin)", "$v_{rms}$ grows by $\\sqrt{2}$", "KE &#8746; T"],
                            ["Same T, H&#8322; vs O&#8322;", "$v_{rms}$ ratio 4:1", "mass ratio 16:1 inverted"],
                        ]},
             "svg": ("Molecule bouncing between walls — momentum 2mv per hit",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#374151\" stroke-width=\"3\">"
                     "<line x1=\"160\" y1=\"60\" x2=\"160\" y2=\"200\"/>"
                     "<line x1=\"480\" y1=\"60\" x2=\"480\" y2=\"200\"/>"
                     "</g>"
                     "<line x1=\"160\" y1=\"60\" x2=\"160\" y2=\"200\" stroke=\"#374151\" stroke-width=\"6\"/>"
                     "<line x1=\"480\" y1=\"60\" x2=\"480\" y2=\"200\" stroke=\"#374151\" stroke-width=\"6\"/>"
                     "<circle cx=\"320\" cy=\"130\" r=\"7\" fill=\"#991b1b\"/>"
                     "<path d=\"M320 130 L 470 130\" stroke=\"#1d4ed8\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<path d=\"M470 130 L 456 123 L 456 137 Z\" fill=\"#1d4ed8\"/>"
                     "<path d=\"M320 130 L 170 130\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<path d=\"M170 130 L 184 123 L 184 137 Z\" fill=\"#166534\"/>"
                     "<text x=\"320\" y=\"60\" text-anchor=\"middle\" fill=\"#374151\">L</text>"
                     "<text x=\"500\" y=\"135\" fill=\"#1d4ed8\">hits wall: &#916;p = 2mv</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">P = &#8531;&#961;v&#178;(rms) and &#189;m&#8901;v&#178;(rms) = &#8532;kT</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Isotropy — the three components share v² equally",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"200\" cy=\"120\" r=\"55\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<path d=\"M200 120 L 255 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M200 120 L 200 65\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M200 120 L 240 160\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"285\" y=\"115\" fill=\"#1d4ed8\">vx&#178;</text>"
                     "<text x=\"200\" y=\"50\" fill=\"#166534\">vy&#178;</text>"
                     "<text x=\"255\" y=\"175\" fill=\"#a16207\">vz&#178;</text>"
                     "<text x=\"450\" y=\"105\" fill=\"#374151\">v&#178; = vx&#178; + vy&#178; + vz&#178;</text>"
                     "<text x=\"450\" y=\"130\" fill=\"#991b1b\">each = &#8531;v&#178; on average</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
