# Physics class-11 — recent trends + refraction + solids + thermal expansion (9 files)
PART_A = [
    {
        "file": "class-11/physics/recent-trends-in-physics/01-particles-and-antiparticles-quarks-and-leptons.json",
        "blocks": [
            {"after": "**Elementary particles:** Particles with no known internal s",
             "md": ("### Deep dive: the particle zoo in one table\n\nMatter is built from fermions (quarks and leptons, spin &#189;) and forces are carried by bosons (spin 1). Quarks feel the strong force and carry fractional charges (+&#8532; or &#8722;&#8531;); leptons do not feel the strong force. For every particle there is an antiparticle with the same mass and opposite charge &#8212; the positron was the first seen (1932), and the antiproton followed in 1955. Baryons (proton, neutron) are quark triplets; mesons are quark&#8211;antiquark pairs. The Standard Model needs only 12 matter fermions plus force carriers, and the 2015 Nobel Prize confirmed that even neutrinos oscillate between flavours, so they must have mass."),
             "table1": {"title": "The first-generation matter particles",
                        "headers": ["Particle", "Type", "Charge", "Rest energy"],
                        "rows": [
                            ["up (u)", "quark", "+&#8532; e", "&#8776; 2.2 MeV"],
                            ["down (d)", "quark", "&#8722;&#8531; e", "&#8776; 4.7 MeV"],
                            ["electron (e&#8315;)", "lepton", "&#8722;1 e", "0.511 MeV"],
                            ["neutrino (&#957;)", "lepton", "0", "&lt; 1 eV"],
                            ["proton = uud", "baryon", "+1 e", "938.3 MeV"],
                            ["neutron = udd", "baryon", "0", "939.6 MeV"],
                        ]},
             "table2": {"title": "Particles vs antiparticles",
                        "headers": ["Property", "Particle", "Antiparticle"],
                        "rows": [
                            ["Mass", "same", "same"],
                            ["Charge", "+Q", "&#8722;Q"],
                            ["Lepton/baryon number", "+1", "&#8722;1"],
                            ["Example", "e&#8315;, p", "e&#8314;, p&#772; (antiproton)"],
                            ["Together", "annihilate to &#947;", "pair-create from &#947;"],
                        ]},
             "svg": ("Matter map — quarks build baryons, leptons stand alone",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"150\" cy=\"90\" r=\"16\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                     "<circle cx=\"180\" cy=\"110\" r=\"16\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"150\" cy=\"130\" r=\"16\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                     "<text x=\"165\" y=\"170\" fill=\"#374151\">proton = uud</text>"
                     "<circle cx=\"430\" cy=\"90\" r=\"16\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"460\" cy=\"110\" r=\"16\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"430\" cy=\"130\" r=\"16\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                     "<text x=\"445\" y=\"170\" fill=\"#374151\">neutron = udd</text>"
                     "<circle cx=\"590\" cy=\"110\" r=\"12\" fill=\"#dcfce7\" stroke=\"#166534\"/>"
                     "<text x=\"590\" y=\"150\" fill=\"#166534\">e&#8315; lepton</text>"
                     "</g>"
                     "<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#374151\">red = up quark (+&#8532;), blue = down quark (&#8722;&#8531;)</text>"
                     "<text x=\"320\" y=\"235\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">every particle has an antiparticle: same mass, opposite charge</text>"
                     "</svg>"),
            },
            {"after": "**Neutrino oscillations:** The 2015 Nobel Prize in Physics w",
             "svg": ("Annihilation and pair creation — the two-way street",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M110 120 L 290 120\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"200\" y=\"105\" fill=\"#a16207\">&#947; &#8805; 1.022 MeV</text>"
                     "<path d=\"M290 120 L 400 60\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M290 120 L 400 180\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"430\" y=\"58\" fill=\"#1d4ed8\">e&#8315;</text>"
                     "<text x=\"430\" y=\"190\" fill=\"#166534\">e&#8314;</text>"
                     "</g>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">reverse: e&#8315;e&#8314; annihilation &#8594; two 0.511 MeV &#947; back-to-back</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/recent-trends-in-physics/02-big-bang-and-hubble-law-expansion-of-the-universe.json",
        "blocks": [
            {"after": "**Big Bang theory:** The prevailing cosmological model descr",
             "md": ("### Deep dive: redshift as the engine of cosmology\n\nHubble compared the distances of nearby galaxies (from Cepheid variable stars) with their recession speeds (from the redshift of their spectral lines, $z = \\Delta\\lambda/\\lambda$) and found $v = H_0 d$: the farther a galaxy, the faster it recedes. This is not galaxies flying through space but *space itself stretching* — every observer sees the same law from anywhere, and the wavelength of light stretches with the space it crosses. Running the expansion backwards leads to a hot, dense beginning 13.8 billion years ago; the 2.7 K cosmic microwave background is the cooled afterglow, and the light-element abundances (about 75% hydrogen, 25% helium) match Big-Bang nucleosynthesis exactly."),
             "table1": {"title": "Hubble's law in symbols",
                        "headers": ["Quantity", "Symbol/Formula", "Value or unit"],
                        "rows": [
                            ["Recessional velocity", "$v = H_0 d$", "km/s"],
                            ["Hubble constant", "$H_0$", "&#8776; 70 km/s per Mpc"],
                            ["Redshift", "$z = \\Delta\\lambda/\\lambda = v/c$ (small z)", "dimensionless"],
                            ["Age estimate", "$t &#8776; 1/H_0$", "&#8776; 14 billion years"],
                            ["1 Mpc", "3.09&#215;10&#185;&#8313; m", "megaparsec"],
                        ]},
             "table2": {"title": "Evidence for the Big Bang",
                        "headers": ["Evidence", "Observation", "Prediction matched"],
                        "rows": [
                            ["Galaxy redshifts", "v &#8746; d (Hubble law)", "expanding universe"],
                            ["Cosmic microwave background", "2.7 K blackbody from every direction", "cooled afterglow"],
                            ["Light-element abundance", "&#8776; 75% H, 25% He by mass", "nucleosynthesis at 3 min"],
                            ["Dark night sky (Olbers)", "finite age of stars", "universe has a beginning"],
                        ]},
             "svg": ("Hubble law — farther galaxies recede faster",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\"/>"
                     "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"100\" y1=\"190\" x2=\"540\" y2=\"70\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"90\" y=\"70\" fill=\"#1d4ed8\">v</text>"
                     "<text x=\"590\" y=\"230\" fill=\"#111827\">d</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\">v = H&#8320;d: slope H&#8320; &#8776; 70 km/s per Mpc, same from every galaxy</text>"
                     "</svg>"),
            },
            {"after": "**Inflationary cosmology:** In the first 10⁻³² seconds, the ",
             "svg": ("Redshift — expansion stretches the wavelength",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M80 80 q 15 -18 30 0 t 30 0 t 30 0 t 30 0 t 30 0\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<text x=\"140\" y=\"55\" fill=\"#1d4ed8\">emitted λ (blue)</text>"
                     "<path d=\"M360 80 q 25 -18 50 0 t 50 0 t 50 0\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<text x=\"470\" y=\"55\" fill=\"#991b1b\">received λ (red)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"150\" text-anchor=\"middle\" fill=\"#374151\">z = &#916;λ/λ = v/c</text>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">space stretches; the light rides the stretch</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/recent-trends-in-physics/03-dark-matter-black-hole-and-gravitational-wave.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: three windows on the invisible\n\n**Dark matter** betrays itself only by gravity: galaxy rotation curves stay flat far from the centre instead of falling as Kepler predicts, so each galaxy must carry several times more mass than its stars show. It neither emits nor absorbs light &#8212; hence *dark*. **Black holes** are masses so compressed that escape velocity exceeds c inside the Schwarzschild radius $r_s = 2GM/c^2$ (3 km per solar mass); nothing, not even light, gets out, though infalling matter glows in X-rays before crossing. **Gravitational waves** are ripples of spacetime itself, predicted by general relativity and first detected by LIGO in 2015 from two merging black holes; the arms of the 4 km interferometer changed length by about 10⁻¹&#8311; m &#8212; a thousandth of a proton diameter."),
             "table1": {"title": "The invisible inventory of the universe",
                        "headers": ["Component", "Share of mass-energy", "How we know"],
                        "rows": [
                            ["Ordinary matter", "&#8776; 5%", "emits/absorbs light"],
                            ["Dark matter", "&#8776; 27%", "rotation curves, lensing"],
                            ["Dark energy", "&#8776; 68%", "accelerating expansion"],
                        ]},
             "table2": {"title": "Black-hole and gravitational-wave key numbers",
                        "headers": ["Quantity", "Formula/value", "Meaning"],
                        "rows": [
                            ["Schwarzschild radius", "$r_s = 2GM/c^2$", "3 km per solar mass"],
                            ["Event horizon", "r = r_s", "one-way surface"],
                            ["LIGO detection", "GW150914 (2015)", "two &#8776;30 M&#8342; black holes merging"],
                            ["Strain measured", "&#8776; 10&#8315;&#178;&#185;", "one part in 10&#178;&#185;"],
                        ]},
             "svg": ("Flat rotation curve — the fingerprint of dark matter",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<path d=\"M100 200 C 160 130, 220 110, 300 100 C 400 92, 500 92, 570 92\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<path d=\"M100 200 C 180 160, 260 180, 340 205 C 420 218, 500 219, 570 219\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"300\" y=\"70\" fill=\"#991b1b\">observed: flat</text>"
                     "<text x=\"330\" y=\"190\" fill=\"#1d4ed8\">stars-only prediction</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">v</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">r</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">missing gravity &#8594; dark matter halo</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("LIGO — two 4 km arms, one tiny stretch",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<line x1=\"120\" y1=\"120\" x2=\"520\" y2=\"120\" stroke=\"#1d4ed8\" stroke-width=\"4\"/>"
                     "<line x1=\"120\" y1=\"120\" x2=\"120\" y2=\"40\" stroke=\"#1d4ed8\" stroke-width=\"4\"/>"
                     "<circle cx=\"120\" cy=\"120\" r=\"8\" fill=\"#111827\"/>"
                     "<text x=\"320\" y=\"110\" fill=\"#1d4ed8\">4 km vacuum arm</text>"
                     "<text x=\"120\" y=\"30\" fill=\"#1d4ed8\">4 km</text>"
                     "<text x=\"120\" y=\"150\" fill=\"#374151\">beam splitter</text>"
                     "</g>"
                     "<text x=\"320\" y=\"195\" text-anchor=\"middle\" fill=\"#6b7280\">a passing wave changes arm length by ~10&#8315;&#185;&#8312; m — one part in 10&#178;&#185;</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/refraction-at-plane-surfaces/01-laws-of-refraction-and-refractive-index.json",
        "blocks": [
            {"after": "**Snell's law (First law of refraction):** When light passes",
             "md": ("### Deep dive: why light bends — speed change at the boundary\n\nRefraction happens because light travels slower in a medium ($v = c/n$); crossing into glass at an angle bends the ray toward the normal, exactly as a marching band slows on one side and wheels around. Snell's law $n_1\\sin i = n_2\\sin r$ follows from Fermat's principle of least time. The refractive index depends on wavelength (dispersion), so blue bends more than red — prisms split white light. Two invariants connect the two media: $n_1 v_1 = n_2 v_2$ (frequency unchanged, wavelength scales as $\\lambda_n = \\lambda/n$) and $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$. When $\\sin\\theta$ on the dense side would exceed 1, refraction becomes impossible and total internal reflection takes over — the working principle of optical fibres."),
             "table1": {"title": "Refractive indices (sodium D line, 589 nm)",
                        "headers": ["Medium", "n", "Speed of light"],
                        "rows": [
                            ["Vacuum", "1 (exactly)", "3.00&#215;10&#8312; m/s"],
                            ["Air", "1.0003", "&#8776; same as vacuum"],
                            ["Water", "1.33", "2.26&#215;10&#8312; m/s"],
                            ["Crown glass", "1.52", "1.97&#215;10&#8312; m/s"],
                            ["Diamond", "2.42", "1.24&#215;10&#8312; m/s"],
                        ]},
             "table2": {"title": "What changes and what does not across a boundary",
                        "headers": ["Quantity", "Changes?", "Relation"],
                        "rows": [
                            ["Frequency", "no", "set by the source"],
                            ["Speed", "yes", "$v = c/n$"],
                            ["Wavelength", "yes", "$\\lambda_n = \\lambda/n$"],
                            ["Direction", "yes (if oblique)", "$n_1\\sin i = n_2\\sin r$"],
                        ]},
             "svg": ("Refraction at a plane surface — toward the normal in glass",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<rect x=\"0\" y=\"140\" width=\"640\" height=\"140\" fill=\"#eff6ff\"/>"
                     "<line x1=\"0\" y1=\"140\" x2=\"640\" y2=\"140\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<line x1=\"320\" y1=\"30\" x2=\"320\" y2=\"270\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                     "<path d=\"M140 60 L 320 140\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M320 140 L 440 260\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"150\" y=\"50\" fill=\"#1d4ed8\">incident (air)</text>"
                     "<text x=\"450\" y=\"255\" fill=\"#166534\">refracted (glass)</text>"
                     "<text x=\"335\" y=\"55\" fill=\"#6b7280\">normal</text>"
                     "<text x=\"320\" y=\"275\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">n&#8321; sin i = n&#8322; sin r; slower medium bends the ray toward the normal</text>"
                     "</svg>"),
            },
            {"after": "**Wave optical interpretation:** The phase change upon refle",
             "svg": ("Marching-band picture of refraction",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<rect x=\"0\" y=\"110\" width=\"640\" height=\"110\" fill=\"#fefce8\"/>"
                     "<line x1=\"0\" y1=\"110\" x2=\"640\" y2=\"110\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<g fill=\"#1d4ed8\">"
                     "<circle cx=\"200\" cy=\"70\" r=\"5\"/><circle cx=\"230\" cy=\"70\" r=\"5\"/>"
                     "<circle cx=\"260\" cy=\"70\" r=\"5\"/><circle cx=\"290\" cy=\"70\" r=\"5\"/>"
                     "</g>"
                     "<g fill=\"#166534\">"
                     "<circle cx=\"290\" cy=\"150\" r=\"5\"/><circle cx=\"310\" cy=\"150\" r=\"5\"/>"
                     "<circle cx=\"330\" cy=\"150\" r=\"5\"/><circle cx=\"350\" cy=\"150\" r=\"5\"/>"
                     "</g>"
                     "<text x=\"200\" y=\"50\" fill=\"#1d4ed8\">fast rows in air</text>"
                     "<text x=\"360\" y=\"180\" fill=\"#166534\">slow rows in glass: row pivots &#8594; ray bends</text>"
                     "<text x=\"320\" y=\"210\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">one side slows first, so the wavefront turns — Snell's law in pictures</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/solids/01-energy-bands-in-solids.json",
        "blocks": [
            {"after": "The valence band contains bonding electrons; the conduction ",
             "md": ("### Deep dive: bands, gaps and the conductor/insulator switch\n\nWhen N atoms bond into a solid, each atomic level splits into N closely spaced levels — effectively a continuous *band*. The valence band holds the bonding electrons; the conduction band is the first empty band where electrons can move freely. What separates them is the *forbidden gap* $E_g$, and its width decides everything: conductors have overlapping bands (no gap), insulators have huge gaps (diamond &#8776; 5.5 eV), and semiconductors have small gaps (silicon &#8776; 1.1 eV) that thermal energy at room temperature can occasionally bridge — which is why a semiconductor conducts a little, and conducts far more when heated or doped. Resistance *falls* with temperature in a semiconductor, the opposite of a metal."),
             "table1": {"title": "Band pictures of the three classes",
                        "headers": ["Class", "Band situation", "Gap Eg", "Behaviour with T"],
                        "rows": [
                            ["Conductor", "valence and conduction overlap", "none", "resistance rises (metal)"],
                            ["Semiconductor", "small gap between bands", "&#8776; 1 eV (Si 1.1)", "resistance falls"],
                            ["Insulator", "large gap", "&gt; 3 eV (diamond 5.5)", "stays non-conducting"],
                        ]},
             "table2": {"title": "Band-gap energies at 300 K",
                        "headers": ["Material", "Eg (eV)", "Use"],
                        "rows": [
                            ["Ge", "0.66", "early transistors, IR detectors"],
                            ["Si", "1.12", "workhorse of electronics"],
                            ["GaAs", "1.43", "LEDs, lasers"],
                            ["Diamond", "5.5", "insulator / UV optics"],
                        ]},
             "svg": ("Energy bands — gap size decides the class",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"150\" width=\"140\" height=\"50\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"70\" y=\"110\" width=\"140\" height=\"30\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                     "<text x=\"140\" y=\"230\" fill=\"#1d4ed8\">conductor: overlap</text>"
                     "<rect x=\"250\" y=\"170\" width=\"140\" height=\"40\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"250\" y=\"110\" width=\"140\" height=\"30\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"155\" fill=\"#a16207\">small gap</text>"
                     "<text x=\"320\" y=\"230\" fill=\"#a16207\">semiconductor</text>"
                     "<rect x=\"430\" y=\"200\" width=\"140\" height=\"30\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"430\" y=\"80\" width=\"140\" height=\"30\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"500\" y=\"150\" fill=\"#991b1b\">big gap</text>"
                     "<text x=\"500\" y=\"260\" fill=\"#991b1b\">insulator</text>"
                     "</g>"
                     "<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#374151\">blue = filled valence band, red-tinted = conduction band</text>"
                     "</svg>"),
            },
            {"after": "In a solid the atomic levels spread into bands. A conductor ",
             "svg": ("Temperature switch: metal vs semiconductor resistance",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M100 70 C 220 90, 380 130, 540 180\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M100 180 C 220 160, 380 110, 540 70\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"220\" y=\"70\" fill=\"#1d4ed8\">metal: R rises</text>"
                     "<text x=\"400\" y=\"200\" fill=\"#166534\">semiconductor: R falls</text>"
                     "<text x=\"90\" y=\"55\" fill=\"#111827\">R</text>"
                     "<text x=\"590\" y=\"205\" fill=\"#111827\">T</text>"
                     "</g>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">heat frees carriers in a semiconductor; heat only scatters electrons in a metal</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/thermal-expansion/02-cubical-and-superficial-expansion.json",
        "blocks": [
            {"after": "**Superficial (area) expansion:** When a solid sheet is heat",
             "md": ("### Deep dive: one coefficient, three powers\n\nA solid expands by the same fractional amount in every direction, so the three coefficients are not independent: $\x08eta = 2\ gammalpha$ and $\x13b3 = 3\ gammalpha$ (to first order). Each area grows as $A = A_0(1 + \x08eta\ gammadT)$ and each volume as $V = V_0(1 + \x13b3\ gammadT)$. The coefficients themselves depend slightly on temperature, but NEB problems treat them as constant. A neat consequence: *holes* expand like the surrounding material — a heated washer's inner diameter grows, which is why a tight metal lid loosens under hot water."),
             "table1": {"title": "The three expansion coefficients",
                        "headers": ["Expansion", "Coefficient", "Relation", "Example (aluminium)"],
                        "rows": [
                            ["Linear", "\x08b1lpha", "&#8212;", "23&#215;10&#8315;&#8310; /K"],
                            ["Superficial", "\x08b2", "\x08b2 = 2\x08b1lpha", "46&#215;10&#8315;&#8310; /K"],
                            ["Cubical", "\x13b3", "\x13b3 = 3\x08b1lpha", "69&#215;10&#8315;&#8310; /K"],
                        ]},
             "table2": {"title": "Formulas at a glance",
                        "headers": ["Quantity", "Formula", "Fractional change"],
                        "rows": [
                            ["Length", "$L = L_0(1 + \x08b1lpha\ gammadT)$", "\x08b1lpha\ gammadT"],
                            ["Area", "$A = A_0(1 + \x08b2\ gammadT)$", "\x08b2\ gammadT = 2\x08b1lpha\ gammadT"],
                            ["Volume", "$V = V_0(1 + \x13b3\ gammadT)$", "\x13b3\ gammadT = 3\x08b1lpha\ gammadT"],
                            ["Density", "$\x1c1 = \x1c1_0/(1 + \x13b3\ gammadT)$", "falls as V rises"],
                        ]},
             "svg": ("A heated square grows in both directions — area scales as 2α",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"150\" y=\"70\" width=\"140\" height=\"100\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"220\" y=\"195\" fill=\"#1d4ed8\">A&#8320; at T</text>"
                     "<rect x=\"370\" y=\"60\" width=\"152\" height=\"110\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"446\" y=\"195\" fill=\"#a16207\">A at T+&#916;T</text>"
                     "</g>"
                     "<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#374151\">every linear size &#215;(1+\x08b1lpha&#916;T) &#8594; area &#215;(1+2\x08b1lpha&#916;T)</text>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">the same logic gives volume &#215;(1+3\x08b1lpha&#916;T)</text>"
                     "</svg>"),
            },
            {"after": "**Dimensional analysis:** $[\\alpha] = [\\beta] = [\\gamma] = [",
             "svg": ("Holes expand with the metal — the hot-water lid trick",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"200\" cy=\"120\" r=\"70\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"10\"/>"
                     "<circle cx=\"200\" cy=\"120\" r=\"45\" fill=\"#ffffff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"200\" y=\"215\" fill=\"#1d4ed8\">cold: hole r</text>"
                     "<circle cx=\"460\" cy=\"120\" r=\"78\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"10\"/>"
                     "<circle cx=\"460\" cy=\"120\" r=\"50\" fill=\"#ffffff\" stroke=\"#a16207\"/>"
                     "<text x=\"460\" y=\"215\" fill=\"#a16207\">hot: hole r &#8593;</text>"
                     "</g>"
                     "<text x=\"320\" y=\"45\" text-anchor=\"middle\" fill=\"#374151\">the hole is drawn by the expanding metal around it</text>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
