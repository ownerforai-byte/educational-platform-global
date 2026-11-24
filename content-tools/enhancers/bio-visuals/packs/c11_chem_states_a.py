# Chemistry class-11 — States of matter part A (gas laws, kinetic theory, ideal/real gas)
PART_A = [
    {
        "file": "class-11/chemistry/states-of-matter/01-gas-laws.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the gas laws as one connected story\n\n"
                    "Each gas law isolates **two** of the four variables P, V, n, T and holds the other two "
                    "fixed; the combined gas equation and PV = nRT are just the laws multiplied together. "
                    "Boyle (P ∝ 1/V at fixed n, T) is the compression story — doubling P halves V because the "
                    "same number of molecules now strike the walls twice as often. Charles (V ∝ T at fixed P, n) "
                    "is the expansion story — hotter molecules hit harder and need more room for the same "
                    "pressure; extrapolating V to zero gives absolute zero at −273.15 °C. Avogadro (V ∝ n at "
                    "fixed P, T) is the counting story — equal volumes of gases at the same T and P hold equal "
                    "numbers of molecules, which is why molar volume is 22.4 L at STP (0 °C, 1 atm) and "
                    "22.7 L at SATP (25 °C, 1 bar). Dalton's law (P_total = ΣP_i) is the mixing story — each gas "
                    "acts as if alone, so partial pressure = mole fraction × total pressure. Every NEB numerical "
                    "is one of these five stories with numbers attached.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — the gas laws as one connected story\n\n"
                    "Each gas law isolates **two** of the four variables P, V, n, T and holds the other two "
                    "fixed; the combined gas equation and PV = nRT are just the laws multiplied together. "
                    "Boyle (P ∝ 1/V at fixed n, T) is the compression story — doubling P halves V because the "
                    "same number of molecules now strike the walls twice as often. Charles (V ∝ T at fixed P, n) "
                    "is the expansion story — hotter molecules hit harder and need more room for the same "
                    "pressure; extrapolating V to zero gives absolute zero at −273.15 °C. Avogadro (V ∝ n at "
                    "fixed P, T) is the counting story — equal volumes of gases at the same T and P hold equal "
                    "numbers of molecules, which is why molar volume is 22.4 L at STP (0 °C, 1 atm) and "
                    "22.7 L at SATP (25 °C, 1 bar). Dalton's law (P_total = ΣP_i) is the mixing story — each gas "
                    "acts as if alone, so partial pressure = mole fraction × total pressure. Every NEB numerical "
                    "is one of these five stories with numbers attached."),
             "table": ("The five gas laws at a glance",
                       ["Law", "Relation", "Held constant", "Graph shape", "Typical NEB numerical"],
                       [["Boyle's law", "P ∝ 1/V, PV = k", "n, T", "P–V hyperbola; PV vs P horizontal line", "Gas compressed from 6 L at 1 atm to 2 L — find P"],
                        ["Charles' law", "V ∝ T (K), V/T = k", "P, n", "V–T straight line through origin", "Gas at 546 K and 2 V — find V at 273 K"],
                        ["Gay-Lussac (Amonton)", "P ∝ T (K)", "V, n", "P–T straight line through origin", "Aerosol can heated from 300 K to 450 K — find P"],
                        ["Avogadro's law", "V ∝ n", "P, T", "V–n straight line through origin", "Volume of 0.25 mol gas at STP = 5.6 L"],
                        ["Dalton's law", "P_total = P₁ + P₂ + …", "V, T", "—", "Gas collected over water: subtract aqueous tension"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Gas-law graphs — the shapes NEB asks you to sketch",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"50\" y1=\"120\" x2=\"190\" y2=\"120\"/>"
                     "<line x1=\"50\" y1=\"120\" x2=\"50\" y2=\"30\"/>"
                     "<line x1=\"250\" y1=\"120\" x2=\"390\" y2=\"120\"/>"
                     "<line x1=\"250\" y1=\"120\" x2=\"250\" y2=\"30\"/>"
                     "<line x1=\"450\" y1=\"120\" x2=\"590\" y2=\"120\"/>"
                     "<line x1=\"450\" y1=\"120\" x2=\"450\" y2=\"30\"/>"
                     "</g>"
                     "<path d=\"M60 40 Q 90 95 180 112\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"115\" y=\"140\" text-anchor=\"middle\" fill=\"#111827\">Boyle: P&#8211;V hyperbola</text>"
                     "<line x1=\"260\" y1=\"110\" x2=\"380\" y2=\"40\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"315\" y=\"140\" text-anchor=\"middle\" fill=\"#111827\">Charles: V&#8211;T straight line</text>"
                     "<line x1=\"460\" y1=\"110\" x2=\"580\" y2=\"40\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"515\" y=\"140\" text-anchor=\"middle\" fill=\"#111827\">Gay-Lussac: P&#8211;T line</text>"
                     "<text x=\"320\" y=\"185\" text-anchor=\"middle\" fill=\"#374151\" font-size=\"14\">extrapolate the Charles/Gay-Lussac lines back: they cut the T axis at &#8722;273.15&#176;C — absolute zero</text>"
                     "<text x=\"320\" y=\"210\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">at fixed n: each law holds two of P, V, T constant and links the other two</text>"
                     "<text x=\"320\" y=\"240\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">combined: P&#8321;V&#8321;/T&#8321; = P&#8322;V&#8322;/T&#8322; &#8594; PV = nRT</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/01-gaseous-state-kinetic-theory-of-gas-and-its-postulates.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — from postulates to the pressure equation\n\n"
                    "The kinetic theory earns its marks by *deriving*, not just listing. Take the postulates "
                    "(huge number of tiny molecules in ceaseless random motion; molecular volume negligible; no "
                    "intermolecular forces except during collisions; collisions perfectly elastic; pressure is "
                    "wall-collision momentum transfer) and two results follow:\n\n"
                    "- **Pressure equation:** PV = ⅓ m N c²_rms for N molecules of mass m — pressure is two-thirds "
                    "of the translational kinetic-energy density of the gas.\n"
                    "- **Temperature meaning:** comparing with PV = nRT gives ½ m c²_rms = (3/2) kT per molecule — "
                    "absolute temperature is a direct measure of average translational kinetic energy, identical "
                    "for every gas at the same T.\n\n"
                    "From the same framework come the speed families: c_rms = √(3RT/M), c_avg = √(8RT/πM), "
                    "c_mp = √(2RT/M), always in the ratio c_mp : c_avg : c_rms = 1 : 1.128 : 1.225. The speed "
                    "distribution is the Maxwell–Boltzmann curve: it broadens and its peak shifts right and down "
                    "as T rises — the standard NEB sketch.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — from postulates to the pressure equation\n\n"
                    "The kinetic theory earns its marks by *deriving*, not just listing. Take the postulates "
                    "(huge number of tiny molecules in ceaseless random motion; molecular volume negligible; no "
                    "intermolecular forces except during collisions; collisions perfectly elastic; pressure is "
                    "wall-collision momentum transfer) and two results follow:\n\n"
                    "- **Pressure equation:** PV = ⅓ m N c²_rms for N molecules of mass m — pressure is two-thirds "
                    "of the translational kinetic-energy density of the gas.\n"
                    "- **Temperature meaning:** comparing with PV = nRT gives ½ m c²_rms = (3/2) kT per molecule — "
                    "absolute temperature is a direct measure of average translational kinetic energy, identical "
                    "for every gas at the same T.\n\n"
                    "From the same framework come the speed families: c_rms = √(3RT/M), c_avg = √(8RT/πM), "
                    "c_mp = √(2RT/M), always in the ratio c_mp : c_avg : c_rms = 1 : 1.128 : 1.225. The speed "
                    "distribution is the Maxwell–Boltzmann curve: it broadens and its peak shifts right and down "
                    "as T rises — the standard NEB sketch."),
             "table": ("Molecular speeds of common gases at 300 K",
                       ["Gas", "M (g/mol)", "c_rms (m/s)", "c_avg (m/s)", "c_mp (m/s)"],
                       [["H₂", "2.02", "1930", "1780", "1576"],
                        ["He", "4.00", "1370", "1264", "1119"],
                        ["O₂", "32", "483", "445", "394"],
                        ["CO₂", "44", "412", "380", "336"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Maxwell–Boltzmann speed distribution at two temperatures",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<line x1=\"60\" y1=\"240\" x2=\"590\" y2=\"240\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<line x1=\"60\" y1=\"240\" x2=\"60\" y2=\"40\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#111827\">molecular speed c &#8594;</text>"
                     "<text x=\"40\" y=\"140\" text-anchor=\"middle\" fill=\"#111827\" transform=\"rotate(-90 40 140)\">fraction of molecules</text>"
                     "<path d=\"M80 235 C 140 235, 150 70, 220 70 C 280 70, 300 200, 360 235\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"205\" y=\"58\" fill=\"#1d4ed8\" font-size=\"13\">low T — narrow, tall peak</text>"
                     "<path d=\"M80 238 C 180 238, 220 110, 320 110 C 400 110, 450 200, 540 236\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"330\" y=\"98\" fill=\"#991b1b\" font-size=\"13\">high T — broader, flatter, peak shifted right</text>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">area under each curve is the same (all molecules); c_rms = &#8730;(3RT/M)</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/03-ideal-gas-and-ideal-gas-equation-universal-gas-constant-and-its-significance.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — R is the bridge between the mechanical and the thermal\n\n"
                    "PV = nRT compresses all the gas laws into one line, and the universal gas constant "
                    "R = 8.314 J K⁻¹ mol⁻¹ = 0.0821 L atm K⁻¹ mol⁻¹ is its pivot. R's physical meaning comes "
                    "from PV = nRT rewritten as R = PV/nT — the work done per mole per kelvin; numerically it "
                    "equals the molar gas-law constant that links energy and temperature, the same 8.314 J that "
                    "appears as the gas constant in kinetic theory (½mc² = 3RT/2) and in the Arrhenius equation.\n\n"
                    "Units discipline wins or loses NEB numericals: use SI (Pa, m³, K) with 8.314, or litre-atm "
                    "with 0.0821 — never mix. Two derived forms cover most questions: PV = mRT/M (m = mass, "
                    "M = molar mass) for molar-mass-from-density problems, and P = dRT/M linking density d. "
                    "Remember the ideal-gas conditions the equation assumes: negligible molecular volume, no "
                    "intermolecular forces — exactly the assumptions that fail near liquefaction.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — R is the bridge between the mechanical and the thermal\n\n"
                    "PV = nRT compresses all the gas laws into one line, and the universal gas constant "
                    "R = 8.314 J K⁻¹ mol⁻¹ = 0.0821 L atm K⁻¹ mol⁻¹ is its pivot. R's physical meaning comes "
                    "from PV = nRT rewritten as R = PV/nT — the work done per mole per kelvin; numerically it "
                    "equals the molar gas-law constant that links energy and temperature, the same 8.314 J that "
                    "appears as the gas constant in kinetic theory (½mc² = 3RT/2) and in the Arrhenius equation.\n\n"
                    "Units discipline wins or loses NEB numericals: use SI (Pa, m³, K) with 8.314, or litre-atm "
                    "with 0.0821 — never mix. Two derived forms cover most questions: PV = mRT/M (m = mass, "
                    "M = molar mass) for molar-mass-from-density problems, and P = dRT/M linking density d. "
                    "Remember the ideal-gas conditions the equation assumes: negligible molecular volume, no "
                    "intermolecular forces — exactly the assumptions that fail near liquefaction."),
             "table": ("Values and uses of R",
                       ["Form of R", "Value", "Use with units", "Example"],
                       [["SI", "8.314 J K⁻¹ mol⁻¹", "P in Pa, V in m³", "P = nRT/V for 0.5 mol in 0.01 m³ at 300 K → 1.25 × 10⁵ Pa"],
                        ["Litre-atmosphere", "0.0821 L atm K⁻¹ mol⁻¹", "P in atm, V in L", "V of 2 mol at 1 atm, 273 K = 44.6 L"],
                        ["Calorie form", "1.987 cal K⁻¹ mol⁻¹", "older thermochemistry data", "rarely needed; ≈ 2 cal"],
                        ["Per molecule (Boltzmann)", "k = R/N_A = 1.38 × 10⁻²³ J/K", "single-molecule KE = 3kT/2", "KE of one O₂ molecule at 300 K"]])},
            {"after": "## 7. Exam Application",
             "svg": ("One equation, four routes — how PV = nRT is reached and used",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<rect x=\"240\" y=\"40\" width=\"160\" height=\"52\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"320\" y=\"72\" text-anchor=\"middle\" fill=\"#1d4ed8\" font-size=\"19\">PV = nRT</text>"
                     "<g font-size=\"13\" fill=\"#111827\">"
                     "<rect x=\"40\" y=\"130\" width=\"150\" height=\"46\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"115\" y=\"150\" text-anchor=\"middle\">Boyle + Charles</text>"
                     "<text x=\"115\" y=\"168\" text-anchor=\"middle\" fill=\"#6b7280\">combined gas eq.</text>"
                     "<rect x=\"240\" y=\"130\" width=\"160\" height=\"46\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"320\" y=\"150\" text-anchor=\"middle\">kinetic theory</text>"
                     "<text x=\"320\" y=\"168\" text-anchor=\"middle\" fill=\"#6b7280\">PV = &#8531;mNc&#178;</text>"
                     "<rect x=\"450\" y=\"130\" width=\"150\" height=\"46\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"525\" y=\"150\" text-anchor=\"middle\">Avogadro</text>"
                     "<text x=\"525\" y=\"168\" text-anchor=\"middle\" fill=\"#6b7280\">V &#8733; n</text>"
                     "</g>"
                     "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                     "<line x1=\"115\" y1=\"130\" x2=\"290\" y2=\"92\"/>"
                     "<line x1=\"320\" y1=\"130\" x2=\"320\" y2=\"92\"/>"
                     "<line x1=\"525\" y1=\"130\" x2=\"350\" y2=\"92\"/>"
                     "</g>"
                     "<g font-size=\"13\" fill=\"#374151\">"
                     "<rect x=\"40\" y=\"230\" width=\"150\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"115\" y=\"250\" text-anchor=\"middle\">molar mass: M = mRT/PV</text>"
                     "<rect x=\"240\" y=\"230\" width=\"160\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"320\" y=\"250\" text-anchor=\"middle\">density: d = PM/RT</text>"
                     "<rect x=\"450\" y=\"230\" width=\"150\" height=\"44\" rx=\"8\" fill=\"#f9fafb\" stroke=\"#9ca3af\"/>"
                     "<text x=\"525\" y=\"250\" text-anchor=\"middle\">partial pressure: P&#8345; = x&#8345;P</text>"
                     "</g>"
                     "<g stroke=\"#6b7280\" stroke-width=\"2\" stroke-dasharray=\"4 3\">"
                     "<line x1=\"115\" y1=\"230\" x2=\"290\" y2=\"92\"/>"
                     "<line x1=\"320\" y1=\"230\" x2=\"320\" y2=\"92\"/>"
                     "<line x1=\"525\" y1=\"230\" x2=\"350\" y2=\"92\"/>"
                     "</g>"
                     "<text x=\"320\" y=\"300\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">R = 8.314 J K&#8315;&#185; mol&#8315;&#185; = 0.0821 L atm K&#8315;&#185; mol&#8315;&#185; — pick units first, then compute</text>"
                     "</svg>"),
        },
        ],
    },
    {
        "file": "class-11/chemistry/states-of-matter/03-real-gas-deviation.json",
        "blocks": [
            {            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — reading the van der Waals equation term by term\n\n"
                    "(P + an²/V²)(V − nb) = nRT patches the two failed ideal assumptions. The **a term** adds "
                    "pressure: real molecules attract, so observed wall pressure is *less* than ideal — a large "
                    "a (NH₃ 4.17, CO₂ 3.59, H₂O 5.46 in L² atm mol⁻²) means easy liquefaction. The **b term** "
                    "subtracts volume: molecules occupy real space (b ≈ 4 × actual molecular volume per mole), "
                    "so the free volume is less than V.\n\n"
                    "The compressibility factor Z = PV/nRT is the scoreboard: Z = 1 ideal; Z < 1 attraction "
                    "dominates (moderate pressure, easily liquefied gases); Z > 1 repulsion/volume dominates "
                    "(high pressure, or H₂ and He whose a is so small that the b term wins almost immediately). "
                    "Every gas is ideal in the low-P, high-T limit — the deviations curve back to Z = 1 as "
                    "P → 0. Temperature matters: above the Boyle temperature the a-effect is thermally swamped "
                    "and Z ≥ 1 throughout.")},
{            "after": "## 4. Detailed Explanation",
             "md": ("### Deep dive — reading the van der Waals equation term by term\n\n"
                    "(P + an²/V²)(V − nb) = nRT patches the two failed ideal assumptions. The **a term** adds "
                    "pressure: real molecules attract, so observed wall pressure is *less* than ideal — a large "
                    "a (NH₃ 4.17, CO₂ 3.59, H₂O 5.46 in L² atm mol⁻²) means easy liquefaction. The **b term** "
                    "subtracts volume: molecules occupy real space (b ≈ 4 × actual molecular volume per mole), "
                    "so the free volume is less than V.\n\n"
                    "The compressibility factor Z = PV/nRT is the scoreboard: Z = 1 ideal; Z < 1 attraction "
                    "dominates (moderate pressure, easily liquefied gases); Z > 1 repulsion/volume dominates "
                    "(high pressure, or H₂ and He whose a is so small that the b term wins almost immediately). "
                    "Every gas is ideal in the low-P, high-T limit — the deviations curve back to Z = 1 as "
                    "P → 0. Temperature matters: above the Boyle temperature the a-effect is thermally swamped "
                    "and Z ≥ 1 throughout."),
             "table": ("van der Waals constants and compressibility behaviour",
                       ["Gas", "a (L² atm mol⁻²)", "b (L mol⁻¹)", "Behaviour of Z", "Liquefaction"],
                       [["H₂", "0.244", "0.0266", "Z > 1 almost always (a too small)", "Very hard — T above Boyle T"],
                        ["He", "0.034", "0.0237", "Z > 1", "Hardest of all gases"],
                        ["N₂", "1.39", "0.0391", "Z &lt; 1 then > 1", "Moderate (77 K)"],
                        ["CO₂", "3.59", "0.0427", "Strong Z minimum", "Easy (~31 °C critical)"],
                        ["NH₃", "4.17", "0.0371", "Strong Z minimum", "Easy — room-T pressure liquefaction"]])},
            {"after": "## 7. Exam Application",
             "svg": ("Compressibility factor Z vs pressure — attraction vs volume",
                     "<svg viewBox=\"0 0 640 320\" font-family=\"Segoe UI\" font-size=\"14\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"320\" fill=\"#ffffff\"/>"
                     "<line x1=\"60\" y1=\"260\" x2=\"600\" y2=\"260\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<line x1=\"60\" y1=\"260\" x2=\"60\" y2=\"40\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<line x1=\"60\" y1=\"150\" x2=\"600\" y2=\"150\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                     "<text x=\"596\" y=\"144\" text-anchor=\"end\" fill=\"#6b7280\" font-size=\"12\">Z = 1 (ideal)</text>"
                     "<text x=\"320\" y=\"290\" text-anchor=\"middle\" fill=\"#111827\">pressure &#8594;</text>"
                     "<text x=\"40\" y=\"150\" text-anchor=\"middle\" fill=\"#111827\" transform=\"rotate(-90 40 150)\">Z = PV/nRT</text>"
                     "<path d=\"M70 150 C 150 190, 250 210, 380 150 C 470 100, 540 70, 590 55\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"225\" fill=\"#1d4ed8\" font-size=\"13\">CO&#8322;/NH&#8323;: dip below 1 (attraction), then rise</text>"
                     "<path d=\"M70 150 C 160 128, 300 100, 590 60\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"330\" y=\"90\" fill=\"#991b1b\" font-size=\"13\">H&#8322;/He: Z &gt; 1 from the start (tiny a, b dominates)</text>"
                     "<text x=\"320\" y=\"310\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">as P &#8594; 0 every curve returns to Z = 1 — ideality is a limit, not a substance</text>"
                     "</svg>"),
        },
        ],
    },
]

TOPICS = list(PART_A)
