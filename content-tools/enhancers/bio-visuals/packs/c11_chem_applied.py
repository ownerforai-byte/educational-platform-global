# Chemistry class-11 — fundamentals-of-applied + modern-chemical-manufactures (12 files)
PART_A = [
    {
        "file": "class-11/chemistry/fundamentals-of-applied-chemistry/01-fundamentals-of-applied-chemistry-chemical-industry-and-its-importance.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — the vocabulary of the plant floor\n\n"
                    "Applied chemistry is chemistry carried out at scale, where the vocabulary changes: "
                    "**raw material** (input, often an ore, brine, air or crude fraction), **unit process** "
                    "(a chemical transformation step such as nitration or oxidation), **unit operation** "
                    "(a physical step such as filtration, distillation, drying), **batch vs continuous "
                    "processing**, **yield** (actual/theoretical × 100) and **tonnage** (the production "
                    "scale that decides process choice). Two ratios govern every plant: the **conversion** "
                    "(fraction of reactant consumed) and the **selectivity** (fraction of converted "
                    "reactant that becomes the wanted product). A process can have 90% conversion and be "
                    "worthless if selectivity is 5%."),
             "table": ("Key terms of the chemical industry — term, meaning, example",
                       ["Term", "Meaning", "Example"],
                       [["Raw material", "Input substance processed further", "N&#8322; + H&#8322; for NH&#8323;; brine for NaOH"],
                        ["Unit process", "Chemical transformation step", "Oxidation of SO&#8322; &#8594; SO&#8323;"],
                        ["Unit operation", "Physical step, no chemical change", "Filtration, distillation, crystallisation"],
                        ["Yield", "Actual output / theoretical &#215; 100", "Contact process &#8776; 98%"],
                        ["Tonnage", "Annual production scale", "H&#8322;SO&#8324;: ~10&#8312; kg/yr worldwide"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Raw material → unit processes + operations → product — the value chain",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<rect x=\"40\" y=\"95\" width=\"120\" height=\"60\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"100\" y=\"120\" text-anchor=\"middle\" fill=\"#a16207\">raw material</text>"
                     "<text x=\"100\" y=\"140\" text-anchor=\"middle\" fill=\"#6b7280\">ore, brine, air</text>"
                     "<rect x=\"220\" y=\"60\" width=\"200\" height=\"130\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"88\" text-anchor=\"middle\" fill=\"#1d4ed8\">chemical plant</text>"
                     "<text x=\"320\" y=\"112\" text-anchor=\"middle\" fill=\"#374151\">unit processes (chemical)</text>"
                     "<text x=\"320\" y=\"132\" text-anchor=\"middle\" fill=\"#374151\">unit operations (physical)</text>"
                     "<text x=\"320\" y=\"152\" text-anchor=\"middle\" fill=\"#374151\">quality control</text>"
                     "<text x=\"320\" y=\"172\" text-anchor=\"middle\" fill=\"#6b7280\">conversion &#183; selectivity &#183; yield</text>"
                     "<rect x=\"480\" y=\"95\" width=\"120\" height=\"60\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"540\" y=\"120\" text-anchor=\"middle\" fill=\"#166534\">product</text>"
                     "<text x=\"540\" y=\"140\" text-anchor=\"middle\" fill=\"#6b7280\">fertiliser, acid</text>"
                     "<path d=\"M165 125 L 215 125\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M425 125 L 475 125\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<text x=\"320\" y=\"230\" text-anchor=\"middle\" fill=\"#374151\">value is created at each transformation — cost is added too</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamentals-of-applied-chemistry/02-stages-in-producing-a-new-product.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — the pilot plant: where laboratory chemistry meets economics\n\n"
                    "A new product moves through defined stages: **(1) idea and market survey** — is "
                    "anyone going to buy this? **(2) laboratory synthesis** — small grams, prove the "
                    "chemistry; **(3) pilot plant** — kilogram scale in miniature equipment to surface "
                    "scale-up problems (heat removal, mixing, materials of construction); **(4) "
                    "semi-works/plant trial** — optimise conditions and estimate costs; **(5) full-scale "
                    "production** with continuous quality control; **(6) marketing and feedback**. Each "
                    "stage multiplies cost roughly tenfold — which is why the \u201ckill decision\u201d "
                    "after the pilot stage is the most important management act in industrial chemistry: "
                    "a product abandoned in the pilot plant costs lakhs; one that fails in the full plant "
                    "costs crores."),
             "table": ("Stages of product development — what happens, what it costs to be wrong",
                       ["Stage", "Scale / purpose", "Cost of failure"],
                       [["Idea + market survey", "Paper study; demand estimate", "Negligible"],
                        ["Laboratory synthesis", "Grams; prove feasibility", "Small"],
                        ["Pilot plant", "Kilograms; expose scale-up problems", "Moderate — the last cheap exit"],
                        ["Semi-works trial", "Optimise; engineering data", "High"],
                        ["Full production", "Tons/day; QC in line", "Very high"],
                        ["Marketing + feedback", "Launch; reformulate on feedback", "Reputation as well as money"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("The cost ladder — every stage multiplies spend about tenfold",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g fill=\"#eff6ff\" stroke=\"#1d4ed8\">"
                     "<rect x=\"60\" y=\"240\" width=\"90\" height=\"30\"/>"
                     "<rect x=\"160\" y=\"200\" width=\"90\" height=\"70\"/>"
                     "<rect x=\"260\" y=\"160\" width=\"90\" height=\"110\"/>"
                     "<rect x=\"360\" y=\"120\" width=\"90\" height=\"150\"/>"
                     "<rect x=\"460\" y=\"70\" width=\"90\" height=\"200\"/>"
                     "</g>"
                     "<g font-size=\"11\" fill=\"#1d4ed8\" text-anchor=\"middle\">"
                     "<text x=\"105\" y=\"258\">idea</text>"
                     "<text x=\"205\" y=\"238\">lab</text>"
                     "<text x=\"305\" y=\"218\">pilot</text>"
                     "<text x=\"405\" y=\"198\">semi-works</text>"
                     "<text x=\"505\" y=\"172\">full plant</text>"
                     "</g>"
                     "<path d=\"M150 250 C 250 180, 350 140, 505 60\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#991b1b\">cost &#8776; &#215;10 per stage — kill decisions get expensive fast</text>"
                     "<text x=\"320\" y=\"288\" text-anchor=\"middle\" fill=\"#6b7280\">the pilot-plant exit is the last cheap decision point</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamentals-of-applied-chemistry/03-economics-of-production-cash-flow-in-the-production-cycle.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — why raw materials dominate the cost sheet\n\n"
                    "Break a typical heavy-chemical cost: **raw materials 40–60%**, utilities (steam, "
                    "power, cooling water) 10–20%, labour 5–10%, maintenance 5%, depreciation and "
                    "overhead the rest. Two consequences: (1) plants are sited near cheap raw material or "
                    "cheap energy, not near markets (the fertiliser plant sits by the gas field); (2) "
                    "process improvements attack raw-material efficiency first — catalysts that raise "
                    "conversion from 90% to 97% save more than any labour cut.\n\n"
                    "The **cash-flow cycle**: cash → buy raw material → process (value added) → sell "
                    "product → cash returns later. The gap between paying for inputs and receiving for "
                    "outputs must be financed by **working capital**; the longer the cycle, the more "
                    "capital is locked up — which is why batch industries with slow inventory (pharma) "
                    "price differently from continuous commodity plants."),
             "table": ("Where the money goes in a heavy-chemical plant",
                       ["Cost item", "Share of production cost", "Levers to reduce"],
                       [["Raw materials", "40&#8211;60%", "Better conversion/selectivity, recycling unreacted feed"],
                        ["Utilities", "10&#8211;20%", "Heat integration, better catalysts (lower T)"],
                        ["Labour", "5&#8211;10%", "Automation, continuous processing"],
                        ["Maintenance", "&#8776;5%", "Corrosion-resistant materials, preventive schedules"],
                        ["Depreciation + overhead", "10&#8211;20%", "Longer-lived equipment, scale"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("The cash-flow cycle — pay now, get paid later",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g font-size=\"14\" fill=\"#111827\" text-anchor=\"middle\">"
                     "<circle cx=\"320\" cy=\"70\" r=\"34\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"320\" y=\"75\">cash</text>"
                     "<circle cx=\"490\" cy=\"160\" r=\"34\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"490\" y=\"157\">raw</text><text x=\"490\" y=\"172\">material</text>"
                     "<circle cx=\"320\" cy=\"250\" r=\"34\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"320\" y=\"247\">process:</text><text x=\"320\" y=\"262\">value added</text>"
                     "<circle cx=\"150\" cy=\"160\" r=\"34\" fill=\"#fdf2f8\" stroke=\"#be185d\"/>"
                     "<text x=\"150\" y=\"157\">product</text><text x=\"150\" y=\"172\">sold</text>"
                     "</g>"
                     "<g stroke=\"#374151\" stroke-width=\"2\">"
                     "<path d=\"M355 90 L 462 137\" fill=\"none\"/>"
                     "<path d=\"M482 195 L 350 232\" fill=\"none\"/>"
                     "<path d=\"M285 235 L 165 192\" fill=\"none\"/>"
                     "<path d=\"M162 128 L 292 85\" fill=\"none\"/>"
                     "</g>"
                     "<g fill=\"#374151\">"
                     "<path d=\"M462 137 L 447 133 L 455 145 Z\"/>"
                     "<path d=\"M350 232 L 361 221 L 366 235 Z\"/>"
                     "<path d=\"M165 192 L 172 178 L 181 190 Z\"/>"
                     "<path d=\"M292 85 L 278 82 L 285 94 Z\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"160\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"14\">working capital bridges the gap</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamentals-of-applied-chemistry/04-running-a-chemical-plant-designing-a-chemical-plant.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — safety is designed in, not bolted on\n\n"
                    "Plant design begins with the **flowsheet**: reactors, separators, heat exchangers, "
                    "pumps and their interconnection. Then come the layers of protection: (1) **inherent "
                    "safety** — choose less hazardous chemistry (dilute instead of pure, water as solvent "
                    "instead of benzene); (2) **engineered controls** — relief valves, interlocks, "
                    "fail-safe instrumentation; (3) **procedural controls** — operating manuals, permits; "
                    "(4) **emergency response** — bunds, scrubbers, evacuation. Running the plant adds "
                    "**quality control** (sample every batch or stream), **maintenance** (planned "
                    "shutdowns beat breakdowns) and **material selection** (stainless for acids, "
                    "glass-lined steel for HCl) — corrosion is the silent tax on every plant."),
             "table": ("Layers of plant protection — from best to last resort",
                       ["Layer", "Principle", "Example"],
                       [["Inherent safety", "Remove the hazard itself", "Dilute acid handling instead of concentrated"],
                        ["Engineered controls", "Hardware that fails safe", "Relief valve, interlock, burst disc"],
                        ["Procedural controls", "Written discipline", "Permit-to-work, lockout-tagout"],
                        ["Emergency response", "Limit the damage", "Bunds, gas scrubbers, evacuation drills"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("The protection onion — layers around the hazard",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g fill=\"none\" stroke-width=\"2\">"
                     "<circle cx=\"320\" cy=\"150\" r=\"34\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"66\" fill=\"none\" stroke=\"#a16207\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"98\" fill=\"none\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"130\" fill=\"none\" stroke=\"#166534\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"155\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"12\">hazard</text>"
                     "<text x=\"320\" y=\"93\" text-anchor=\"middle\" fill=\"#a16207\">engineered controls</text>"
                     "<text x=\"320\" y=\"58\" text-anchor=\"middle\" fill=\"#1d4ed8\">procedural controls</text>"
                     "<text x=\"320\" y=\"296\" text-anchor=\"middle\" fill=\"#166534\">inherent safety + emergency response — design removes the hazard first</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamentals-of-applied-chemistry/05-continuous-and-batch-processing.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — batch vs continuous: the tonnage decision\n\n"
                    "**Batch processing** charges fixed amounts, reacts, discharges, cleans, repeats — "
                    "right for small tonnage, many products in one plant (pharmaceuticals, dyes, "
                    "speciality chemicals), and for reactions that are slow or hard to control. "
                    "**Continuous processing** feeds reactants and withdraws product without stopping — "
                    "right for huge single-product tonnage (ammonia, sulfuric acid, cement) because: "
                    "steady-state operation gives uniform quality; heat integration becomes possible; "
                    "labour per tonne collapses; and automation keeps dangerous conditions inside "
                    "instrument limits. The crossover is economic, not chemical: below roughly a few "
                    "thousand tonnes/year, batch wins on flexibility; above it, continuous wins on unit "
                    "cost."),
             "table": ("Batch vs continuous — every dimension compared",
                       ["Aspect", "Batch", "Continuous"],
                       [["Throughput", "Low, flexible", "High, fixed"],
                        ["Products per plant", "Many", "One (or few)"],
                        ["Quality consistency", "Batch-to-batch variation", "Steady state, uniform"],
                        ["Labour and automation", "More manual", "Highly automated"],
                        ["Typical industries", "Pharma, dyes, food", "Ammonia, H&#8322;SO&#8324;, cement, petroleum"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Batch pot vs continuous flow — the tonnage crossover",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g>"
                     "<rect x=\"90\" y=\"80\" width=\"120\" height=\"100\" rx=\"14\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"150\" y=\"135\" text-anchor=\"middle\" fill=\"#1d4ed8\">batch</text>"
                     "<text x=\"150\" y=\"205\" text-anchor=\"middle\" fill=\"#374151\">charge &#8594; react &#8594; discharge</text>"
                     "<text x=\"150\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\">flexible, small scale</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"380\" y=\"80\" width=\"170\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<path d=\"M370 105 L 380 105\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M550 105 L 560 105\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<text x=\"465\" y=\"135\" text-anchor=\"middle\" fill=\"#166534\">continuous</text>"
                     "<text x=\"465\" y=\"205\" text-anchor=\"middle\" fill=\"#374151\">feed in, product out, nonstop</text>"
                     "<text x=\"465\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\">steady state, huge scale</text>"
                     "</g>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#374151\">crossover is economic: tonnage decides, chemistry follows</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/fundamentals-of-applied-chemistry/06-environmental-impact-of-the-chemical-industry.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — the three media and the response hierarchy\n\n"
                    "Industrial chemistry touches air, water and land. **Air**: SO₂ and NOₓ → acid rain; "
                    "CO₂ → warming; particulates and VOCs → smog. **Water**: heavy metals (Hg, Cd, Pb), "
                    "cyanides, and nutrient run-off → eutrophication. **Land**: solid residues, "
                    "tailings, and persistent organics. The response hierarchy runs: **prevent** (greener "
                    "chemistry — catalytic selectivity, atom economy, aqueous solvents), **treat at "
                    "source** (scrubbers for SO₂, electrostatic precipitators for dust, effluent treatment "
                    "plants before discharge), **recycle** (solvent and catalyst loops), and only then "
                    "**dilute/dispose**. Modern regulation enforces the first two — end-of-pipe treatment "
                    "is the expensive last line, not the plan."),
             "table": ("Pollutant → effect → control",
                       ["Medium", "Pollutant", "Effect", "Control"],
                       [["Air", "SO&#8322;, NO&#8339;", "Acid rain", "Scrubbing (CaCO&#8323; slurry), low-S fuel"],
                        ["Air", "CO&#8322;", "Global warming", "Efficiency, capture, process choice"],
                        ["Water", "Hg, Cd, Pb", "Bioaccumulation, Minamata", "Precipitation, ion exchange"],
                        ["Water", "N, P nutrients", "Eutrophication, algal bloom", "Tertiary treatment, runoff control"],
                        ["Land", "Solid residues", "Leaching into groundwater", "Secure landfill, reuse as by-product"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Response hierarchy — prevent before treat before dispose",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g font-size=\"14\" text-anchor=\"middle\">"
                     "<rect x=\"190\" y=\"40\" width=\"260\" height=\"44\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"320\" y=\"68\" fill=\"#166534\">1. Prevent — greener chemistry, atom economy</text>"
                     "<rect x=\"170\" y=\"100\" width=\"300\" height=\"44\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"128\" fill=\"#1d4ed8\">2. Treat at source — scrubbers, ETP</text>"
                     "<rect x=\"190\" y=\"160\" width=\"260\" height=\"44\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"320\" y=\"188\" fill=\"#a16207\">3. Recycle — solvent and catalyst loops</text>"
                     "<rect x=\"230\" y=\"220\" width=\"180\" height=\"44\" rx=\"8\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"248\" fill=\"#991b1b\">4. Dispose — last resort</text>"
                     "</g>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/modern-chemical-manufactures/01-manufacture-of-ammonia-by-haber-s-process-principle-and-flow-sheet-diagram-only.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — Haber: an equilibrium argument turned into 150 million tonnes\n\n"
                    "N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ, Δn = −2. Le Chatelier says high pressure and low "
                    "temperature favour ammonia — but low temperature is uselessly slow. The industrial "
                    "compromise: **200–300 atm, 450–500 °C, Fe catalyst (with Mo or K₂O/Al₂O₅ promoters)**, "
                    "and continuous removal of NH₃ by liquefaction. Even so, per pass only ~15–20% "
                    "converts; the unreacted N₂/H₂ is **recycled**, so overall conversion approaches "
                    "quantitative. Hydrogen comes from steam reforming of natural gas (CH₄ + H₂O → CO + "
                    "3H₂, then water-gas shift); nitrogen from fractional distillation of liquid air. "
                    "Uses: fertilisers (urea, ammonium sulfate), nitric acid (Ostwald), refrigerant, "
                    "explosives via HNO₃."),
             "table": ("Haber conditions — the equilibrium-rate compromise",
                       ["Variable", "Equilibrium wants", "Rate wants", "Industrial choice"],
                       [["Pressure", "High (fewer moles)", "High", "200&#8211;300 atm"],
                        ["Temperature", "Low (exothermic)", "High", "450&#8211;500&#176;C compromise"],
                        ["Catalyst", "No effect on position", "High", "Fe with promoters"],
                        ["NH&#8323; removal", "Shift right", "—", "Liquefaction loop"],
                        ["Per-pass conversion", "—", "—", "&#8776;15&#8211;20%, recycled to &#8776;100%"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("The Haber loop — react, condense, recycle",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"250\" y=\"70\" width=\"140\" height=\"70\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"98\" text-anchor=\"middle\" fill=\"#991b1b\">converter</text>"
                     "<text x=\"320\" y=\"118\" text-anchor=\"middle\" fill=\"#374151\">Fe cat., 450&#176;C, 250 atm</text>"
                     "<rect x=\"470\" y=\"70\" width=\"120\" height=\"70\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"530\" y=\"98\" text-anchor=\"middle\" fill=\"#1d4ed8\">condenser</text>"
                     "<text x=\"530\" y=\"118\" text-anchor=\"middle\" fill=\"#374151\">NH&#8323; liquefies</text>"
                     "<circle cx=\"320\" cy=\"220\" r=\"30\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"320\" y=\"217\" text-anchor=\"middle\" fill=\"#166534\">recycle</text>"
                     "<text x=\"320\" y=\"232\" text-anchor=\"middle\" fill=\"#166534\">N&#8322;+H&#8322;</text>"
                     "<path d=\"M395 105 L 465 105\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M470 140 C 470 220, 420 220, 352 220\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M288 220 C 240 220, 250 160, 258 122\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M258 122 L 252 136 L 265 134 Z\" fill=\"#166534\"/>"
                     "<path d=\"M200 105 L 245 105\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"170\" y=\"98\" text-anchor=\"middle\" fill=\"#a16207\">N&#8322; + 3H&#8322;</text>"
                     "<text x=\"320\" y=\"278\" text-anchor=\"middle\" fill=\"#6b7280\">per pass 15&#8211;20%; recycling makes the overall yield near-complete</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/modern-chemical-manufactures/02-manufacture-of-nitric-acid-by-ostwald-s-process.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — Ostwald: three steps, one catalyst, one absorber\n\n"
                    "**Step 1** — catalytic oxidation: 4NH₃ + 5O₂ → 4NO + 6H₂O, ΔH = −905 kJ, over Pt/Rh "
                    "gauze at ~800–900 °C. The mixture must be lean in ammonia (≈10%) because NH₃ + O₂ "
                    "can otherwise burn to N₂ — selectivity is everything. **Step 2** — cooling plus "
                    "excess air: 2NO + O₂ → 2NO₂ (brown gas; this step is slow and favored by low T, so "
                    "the gases are cooled first). **Step 3** — absorption in water: 3NO₂ + H₂O → 2HNO₃ + "
                    "NO; the NO is re-oxidised and recycled, so overall: 4NH₃ + 8O₂ → 4HNO₃ + 4H₂O "
                    "(68% concentrated by distillation; 98% with concentrated H₂SO₄ dehydration). Uses: "
                    "fertilisers (ammonium nitrate), explosives (TNT, nitroglycerine), aqua regia, "
                    "pickling of metals."),
             "table": ("Ostwald steps — equation, conditions, purpose",
                       ["Step", "Equation", "Conditions", "Watch for"],
                       [["1 Oxidation", "4NH&#8323; + 5O&#8322; &#8594; 4NO + 6H&#8322;O", "Pt/Rh, 800&#8211;900&#176;C, &#8776;10% NH&#8323;", "Lean mixture or N&#8322; forms instead"],
                        ["2 Oxidation", "2NO + O&#8322; &#8594; 2NO&#8322;", "Cool, excess air", "Favoured by low T — cool first"],
                        ["3 Absorption", "3NO&#8322; + H&#8322;O &#8594; 2HNO&#8323; + NO", "Counter-current water", "NO recycled, not wasted"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Ostwald train — converter, cooler-oxidiser, absorber with NO recycle",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"50\" y=\"90\" width=\"140\" height=\"70\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"120\" y=\"118\" text-anchor=\"middle\" fill=\"#991b1b\">Pt/Rh converter</text>"
                     "<text x=\"120\" y=\"138\" text-anchor=\"middle\" fill=\"#374151\">NH&#8323; + O&#8322; &#8594; NO</text>"
                     "<rect x=\"260\" y=\"90\" width=\"140\" height=\"70\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"330\" y=\"118\" text-anchor=\"middle\" fill=\"#a16207\">cool + oxidise</text>"
                     "<text x=\"330\" y=\"138\" text-anchor=\"middle\" fill=\"#374151\">NO &#8594; NO&#8322; (brown)</text>"
                     "<rect x=\"470\" y=\"90\" width=\"130\" height=\"70\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"535\" y=\"118\" text-anchor=\"middle\" fill=\"#1d4ed8\">absorber</text>"
                     "<text x=\"535\" y=\"138\" text-anchor=\"middle\" fill=\"#374151\">NO&#8322; + H&#8322;O</text>"
                     "<path d=\"M195 125 L 255 125\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M405 125 L 465 125\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M500 165 C 500 230, 330 230, 330 165\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"415\" y=\"242\" text-anchor=\"middle\" fill=\"#166534\">NO recycled</text>"
                     "<path d=\"M535 165 L 535 210 L 610 210\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"575\" y=\"228\" text-anchor=\"middle\" fill=\"#1d4ed8\">HNO&#8323;</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\">overall: 4NH&#8323; + 8O&#8322; &#8594; 4HNO&#8323; + 4H&#8322;O — 68% acid by distillation</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/modern-chemical-manufactures/03-manufacture-of-sulphuric-acid-by-contact-process.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — the contact process: why the absorber absorbs into acid, not water\n\n"
                    "S (or FeS₂/pyrite) → SO₂ (roaster or burner) → SO₃ over V₂O₅ catalyst at ~450 °C, "
                    "1–2 atm (2SO₂ + O₂ ⇌ 2SO₃, ΔH = −196 kJ, exothermic and mole-reducing, so moderate "
                    "T and slight pressure) → absorption. The subtle design point NEB asks: SO₃ is "
                    "**absorbed in concentrated H₂SO₄ (98%) to form oleum H₂S₂O₇**, not in water — direct "
                    "SO₃ + H₂O forms a stubborn acid-mist that escapes the absorber. Oleum is then diluted "
                    "to the required strength. Double-absorption plants pass gas through the absorber "
                    "twice, reaching >99.5% conversion. Uses: H₂SO₄ is the classic tonnage king — "
                    "fertilisers (superphosphate), paints (TiO₂), detergents, batteries, steel pickling."),
             "table": ("Contact process — stage by stage",
                       ["Stage", "Change", "Conditions", "Note"],
                       [["SO&#8322; generation", "S + O&#8322; &#8594; SO&#8322;", "Burner/roaster, dry air", "Gas must be dry and dust-free"],
                        ["Catalytic oxidation", "2SO&#8322; + O&#8322; &#8646; 2SO&#8323;", "V&#8322;O&#8325;, 450&#176;C, 1&#8211;2 atm", "Exothermic, &#916;n = &#8722;1"],
                        ["Absorption", "SO&#8323; + H&#8322;SO&#8324; &#8594; H&#8322;S&#8322;O&#8327;", "98% acid absorber", "Never absorb into water (mist)"],
                        ["Dilution", "H&#8322;S&#8322;O&#8327; + H&#8322;O &#8594; 2H&#8322;SO&#8324;", "To target strength", "Oleum = fuming H&#8322;SO&#8324;"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Contact process — oleum absorption avoids the acid-mist problem",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"50\" y=\"95\" width=\"120\" height=\"65\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"110\" y=\"122\" text-anchor=\"middle\" fill=\"#a16207\">S burner</text>"
                     "<text x=\"110\" y=\"142\" text-anchor=\"middle\" fill=\"#374151\">SO&#8322;</text>"
                     "<rect x=\"240\" y=\"95\" width=\"140\" height=\"65\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"310\" y=\"122\" text-anchor=\"middle\" fill=\"#991b1b\">V&#8322;O&#8325; converter</text>"
                     "<text x=\"310\" y=\"142\" text-anchor=\"middle\" fill=\"#374151\">450&#176;C, SO&#8323;</text>"
                     "<rect x=\"450\" y=\"95\" width=\"140\" height=\"65\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"520\" y=\"122\" text-anchor=\"middle\" fill=\"#1d4ed8\">98% H&#8322;SO&#8324;</text>"
                     "<text x=\"520\" y=\"142\" text-anchor=\"middle\" fill=\"#374151\">oleum out</text>"
                     "<path d=\"M175 127 L 235 127\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M385 127 L 445 127\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M520 165 L 520 215 L 380 215 L 380 250\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"450\" y=\"240\" text-anchor=\"middle\" fill=\"#1d4ed8\">dilute &#8594; H&#8322;SO&#8324;</text>"
                     "<text x=\"230\" y=\"250\" text-anchor=\"middle\" fill=\"#991b1b\" font-size=\"12\">water absorber &#8594; acid mist (bad)</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\">double absorption &#8594; &gt;99.5% conversion</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/modern-chemical-manufactures/04-manufacture-of-sodium-hydroxide-by-diaphragm-cell.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — the diaphragm cell: keeping the products apart\n\n"
                    "Brine is electrolysed: at the **cathode** 2H₂O + 2e⁻ → H₂ + 2OH⁻ (NaOH forms in the "
                    "catholyte); at the **anode** 2Cl⁻ → Cl₂ + 2e⁻. The whole engineering problem is "
                    "keeping the three products separated — NaOH meeting Cl₂ makes bleach (NaClO), and "
                    "Cl₂ meeting H₂ is explosive. The **diaphragm** (asbestos or polymer) between the "
                    "electrodes lets ions pass under hydrostatic flow but slows mixing; brine flows "
                    "anode → cathode, so Cl₂ stays in the anolyte and OH⁻ accumulates in the catholyte. "
                    "Cell liquor leaves at ~10–12% NaOH with salt, concentrated and the salt crystallises "
                    "out. Products: Cl₂ (PVC, bleach, water treatment), H₂ (fuel, hydrogenation), NaOH "
                    "(soap, paper, alumina). Mercury-cell and membrane-cell are the alternatives; the "
                    "membrane cell is the modern green choice."),
             "table": ("Diaphragm cell — electrode reactions and products",
                       ["Location", "Reaction", "Product", "Use"],
                       [["Anode (+)", "2Cl&#8315; &#8594; Cl&#8322; + 2e&#8315;", "Chlorine", "PVC, bleach, disinfectant"],
                        ["Cathode (&#8722;)", "2H&#8322;O + 2e&#8315; &#8594; H&#8322; + 2OH&#8315;", "Hydrogen + OH&#8315;", "Fuel, hydrogenation; NaOH"],
                        ["Diaphragm", "Ion passage only", "Separates Cl&#8322;/H&#8322;/NaOH", "Prevents NaClO and explosive mix"],
                        ["Cell liquor", "&#8776;10&#8211;12% NaOH + NaCl", "Concentrated; salt removed", "Commercial caustic soda"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Diaphragm cell — anode, cathode, and the barrier between",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"90\" y=\"70\" width=\"460\" height=\"150\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"315\" y=\"70\" width=\"10\" height=\"150\" fill=\"#a16207\"/>"
                     "<text x=\"322\" y=\"60\" text-anchor=\"middle\" fill=\"#a16207\">diaphragm</text>"
                     "<g>"
                     "<rect x=\"120\" y=\"100\" width=\"16\" height=\"90\" fill=\"#991b1b\"/>"
                     "<text x=\"128\" y=\"240\" text-anchor=\"middle\" fill=\"#991b1b\">anode (+)</text>"
                     "<text x=\"200\" y=\"120\" text-anchor=\"middle\" fill=\"#111827\">Cl&#8315; &#8594; Cl&#8322;&#8593;</text>"
                     "</g>"
                     "<g>"
                     "<rect x=\"505\" y=\"100\" width=\"16\" height=\"90\" fill=\"#1d4ed8\"/>"
                     "<text x=\"513\" y=\"240\" text-anchor=\"middle\" fill=\"#1d4ed8\">cathode (&#8722;)</text>"
                     "<text x=\"440\" y=\"120\" text-anchor=\"middle\" fill=\"#111827\">H&#8322;&#8593; + OH&#8315;</text>"
                     "</g>"
                     "<path d=\"M250 145 L 310 145\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<path d=\"M310 145 L 298 139 L 298 151 Z\" fill=\"#374151\"/>"
                     "<text x=\"280\" y=\"132\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"11\">brine flow</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\">NaOH + Cl&#8322; would make NaClO; H&#8322; + Cl&#8322; is explosive — separation is the design</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/modern-chemical-manufactures/05-manufacture-of-sodium-carbonate-by-ammonia-soda-or-solvay-process.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — Solvay: ammonia as a recyclable carrier of CO₂\n\n"
                    "Brine (NaCl) + limestone (CaCO₃) + ammonia produce NaHCO₃, which calcines to "
                    "Na₂CO₃. The elegant part is the **ammonia cycle**: NH₃ is absorbed in brine, CO₂ "
                    "(from CaCO₃ calcination) precipitates NaHCO₃ because it is the least soluble thing "
                    "in the four-ion system, and NH₃ is recovered from the mother liquor by milk-of-lime "
                    "(2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2NH₃↑ + 2H₂O) and returned. So ammonia is a *carrier*, "
                    "not a reactant — used over and over. The by-product CaCl₂ finds use as a "
                    "de-icing/desiccating agent. NaHCO₃ precipitates because of the common-ion effect and "
                    "its low solubility at 30 °C; everything else stays dissolved."),
             "table": ("Solvay chemistry — reaction, location, purpose",
                       ["Reaction", "Where", "Purpose"],
                       [["CaCO&#8323; &#8594; CaO + CO&#8322;", "Kiln", "CO&#8322; source"],
                        ["NH&#8323; + H&#8322;O + CO&#8322; &#8594; NH&#8324;HCO&#8323;", "Absorber", "Bicarbonate carrier"],
                        ["NaCl + NH&#8324;HCO&#8323; &#8594; NaHCO&#8323;&#8595; + NH&#8324;Cl", "Carbonator", "Product precipitation"],
                        ["2NaHCO&#8323; &#8594; Na&#8322;CO&#8323; + CO&#8322; + H&#8322;O", "Calciner", "Final product; CO&#8322; recycled"],
                        ["2NH&#8324;Cl + Ca(OH)&#8322; &#8594; CaCl&#8322; + 2NH&#8323;&#8593; + 2H&#8322;O", "Ammonia still", "NH&#8323; recovery — the cycle closes"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("The ammonia cycle — a carrier, not a reactant",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<rect x=\"70\" y=\"60\" width=\"150\" height=\"55\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"145\" y=\"85\" text-anchor=\"middle\" fill=\"#1d4ed8\">brine + NH&#8323;</text>"
                     "<text x=\"145\" y=\"103\" text-anchor=\"middle\" fill=\"#374151\">absorber</text>"
                     "<rect x=\"300\" y=\"60\" width=\"150\" height=\"55\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"375\" y=\"85\" text-anchor=\"middle\" fill=\"#a16207\">carbonator</text>"
                     "<text x=\"375\" y=\"103\" text-anchor=\"middle\" fill=\"#374151\">NaHCO&#8323;&#8595;</text>"
                     "<rect x=\"490\" y=\"60\" width=\"110\" height=\"55\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"545\" y=\"85\" text-anchor=\"middle\" fill=\"#166534\">calciner</text>"
                     "<text x=\"545\" y=\"103\" text-anchor=\"middle\" fill=\"#374151\">Na&#8322;CO&#8323;</text>"
                     "<rect x=\"300\" y=\"200\" width=\"150\" height=\"55\" rx=\"10\" fill=\"#fdf2f8\" stroke=\"#be185d\"/>"
                     "<text x=\"375\" y=\"225\" text-anchor=\"middle\" fill=\"#be185d\">ammonia still</text>"
                     "<text x=\"375\" y=\"243\" text-anchor=\"middle\" fill=\"#374151\">NH&#8323; recovered</text>"
                     "<path d=\"M225 88 L 295 88\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M455 88 L 485 88\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M545 120 C 545 175, 500 200, 455 215\" fill=\"none\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<path d=\"M295 228 L 225 228\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M225 228 L 238 221 L 238 235 Z\" fill=\"#166534\"/>"
                     "<text x=\"255\" y=\"218\" text-anchor=\"middle\" fill=\"#166534\">NH&#8323; returns</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\">NH&#8323; circulates; only NaCl, CaCO&#8323; and water are consumed</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/modern-chemical-manufactures/06-fertilizers-chemical-fertilizers-types-of-chemical-fertilizers-production-of-urea-with-flow-shee.json",
        "blocks": [
            {"after": "## 4. Deep Conceptual",
             "md": ("### Deep dive — N, P, K: what each nutrient actually does\n\n"
                    "**Nitrogen** builds amino acids, proteins and chlorophyll — deficiency shows as "
                    "general yellowing (chlorosis) of older leaves. Sources: urea CO(NH₂)₂ (46% N, the "
                    "world standard), ammonium sulfate (21% N, acidifying), ammonium nitrate, and "
                    "calcium ammonium nitrate. **Phosphorus** drives root growth, flowering, energy "
                    "transfer (ATP) — deficiency purples leaves and stunts roots. Sources: single "
                    "superphosphate (Ca(H₂PO₄)₂ + gypsum, from rock phosphate + H₂SO₄), triple "
                    "superphosphate, DAP. **Potassium** regulates water balance, enzyme activation and "
                    "stress tolerance — deficiency browns leaf margins. Source: muriate of potash KCl. "
                    "Fertilisers are graded N-P-K (e.g. 10-26-26); urea dominates because its N content "
                    "per rupee is unbeatable, but it loses N by volatilisation unless incorporated into "
                    "soil."),
             "table": ("The three macronutrients — role, deficiency, fertiliser",
                       ["Nutrient", "Role in plant", "Deficiency sign", "Common fertiliser (% nutrient)"],
                       [["N", "Proteins, chlorophyll", "Yellowing of older leaves", "Urea (46% N); (NH&#8324;)&#8322;SO&#8324; (21% N)"],
                        ["P", "Roots, ATP, flowering", "Purple tinge, stunted roots", "SSP (16% P&#8322;O&#8325); DAP"],
                        ["K", "Water balance, enzymes", "Brown leaf margins", "Muriate of potash KCl (60% K&#8322;O)"]]),
        },
            {"after": "## 6. Common Confusions",
             "svg": ("Nutrient → role → deficiency — reading the leaf",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g font-size=\"14\" text-anchor=\"middle\">"
                     "<rect x=\"60\" y=\"60\" width=\"150\" height=\"50\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"135\" y=\"85\" fill=\"#166534\">N — urea</text>"
                     "<text x=\"135\" y=\"102\" fill=\"#6b7280\" font-size=\"12\">leaf: yellow, older first</text>"
                     "<rect x=\"245\" y=\"60\" width=\"150\" height=\"50\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"85\" fill=\"#1d4ed8\">P — SSP/DAP</text>"
                     "<text x=\"320\" y=\"102\" fill=\"#6b7280\" font-size=\"12\">leaf: purple; roots stunted</text>"
                     "<rect x=\"430\" y=\"60\" width=\"150\" height=\"50\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"505\" y=\"85\" fill=\"#a16207\">K — KCl</text>"
                     "<text x=\"505\" y=\"102\" fill=\"#6b7280\" font-size=\"12\">leaf: brown margins</text>"
                     "</g>"
                     "<text x=\"320\" y=\"170\" text-anchor=\"middle\" fill=\"#374151\">grade N-P-K (e.g. 10-26-26) = % N, % P&#8322;O&#8325;, % K&#8322;O</text>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">urea wins on N per rupee; incorporate into soil or N volatilises as NH&#8323;</text>"
                     "</svg>"),
        },
        ],
    },
]
TOPICS = list(PART_A)
