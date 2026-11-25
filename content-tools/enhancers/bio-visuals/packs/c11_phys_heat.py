# Physics class-11 — lenses + nuclear + heat + blackbody full enrichment (9 files)
PART_A = [
    {
        "file": "class-11/physics/lenses/01-spherical-lenses-and-angular-magnification.json",
        "blocks": [
            {"after": "A spherical lens has two refracting surfaces that are port",
             "md": ("### Deep dive: two refractions in one glass\n\nA lens is two curved refracting surfaces back to back: rays bend entering the glass and bend again leaving it, so the net effect is convergence (convex) or divergence (concave). The lens-maker's formula $1/f = (n-1)(1/R_1 - 1/R_2)$ shows focal length is a property of the glass ($n$) and the surface curvatures — which is why an air bubble inside water behaves like a *diverging* lens (the refractive indices swap roles). The Cartesian convention $m = h_i/h_o = v/u$ keeps signs automatic if you keep them consistent. Angular magnification $M = \\theta/\\theta_0$ compares the angle *with* the instrument to the angle *without* — the eye cares about angles on the retina, not image size."),
             "table1": {"title": "Lens vocabulary and sign conventions",
                        "headers": ["Term", "Meaning", "Sign (Cartesian)"],
                        "rows": [
                            ["Focal length f", "distance from optical centre to focus", "+ convex, &#8722; concave"],
                            ["Object distance u", "object to lens", "negative for real objects"],
                            ["Image distance v", "lens to image", "+ real (opposite side), &#8722; virtual"],
                            ["Linear magnification", "$m = v/u = h_i/h_o$", "+ erect, &#8722; inverted"],
                            ["Power", "$P = 1/f$ (f in metres)", "dioptre (D)"],
                        ]},
             "table2": {"title": "Convex lens image cases (u = object distance)",
                        "headers": ["Object position", "Image position", "Nature", "Use"],
                        "rows": [
                            ["Beyond 2f", "between f and 2f", "real, inverted, smaller", "camera"],
                            ["At 2f", "at 2f", "real, inverted, same size", "photocopier 1:1"],
                            ["Between f and 2f", "beyond 2f", "real, inverted, enlarged", "projector"],
                            ["At f", "at infinity", "rays parallel", "collimator"],
                            ["Inside f", "same side, enlarged", "virtual, erect", "magnifying glass"],
                        ]},
             "svg": ("Convex lens — three principal rays building the real image",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<line x1=\"320\" y1=\"50\" x2=\"320\" y2=\"250\" stroke=\"#a16207\" stroke-width=\"6\"/>"
                     "<ellipse cx=\"320\" cy=\"150\" rx=\"14\" ry=\"100\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<line x1=\"320\" y1=\"50\" x2=\"320\" y2=\"250\" stroke=\"#9ca3af\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>"
                     "<path d=\"M140 170 L 320 170\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M320 170 L 520 110\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M140 170 L 320 110\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M320 110 L 520 110\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<circle cx=\"520\" cy=\"110\" r=\"5\" fill=\"#991b1b\"/>"
                     "<text x=\"120\" y=\"185\" fill=\"#374151\">object</text>"
                     "<text x=\"540\" y=\"115\" fill=\"#991b1b\">real image</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">rays through the optical centre go straight; parallel rays meet at F</text>"
                     "</svg>"),
            },
            {"after": "Angular magnification compares the angle subtended by the ",
             "svg": ("Angular magnification — angle with vs without the lens",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"110\" cy=\"130\" r=\"8\" fill=\"#111827\"/>"
                     "<text x=\"110\" y=\"165\" fill=\"#374151\">object</text>"
                     "<circle cx=\"560\" cy=\"130\" r=\"14\" fill=\"#f3f4f6\" stroke=\"#6b7280\"/>"
                     "<text x=\"560\" y=\"170\" fill=\"#374151\">eye</text>"
                     "<path d=\"M560 130 L 150 100\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                     "<path d=\"M560 130 L 150 160\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                     "<text x=\"300\" y=\"90\" fill=\"#1d4ed8\">&#952; with lens (larger)</text>"
                     "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">M = &#952;/&#952;&#8320; — the retina image grows because the angle grows</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/nuclear-physics/01-nucleus-discovery-of-nucleus.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: what the scattering angles really said\n\nRutherford's team fired alpha particles at gold foil and watched the angles. Most alphas sailed straight through — the atom is mostly empty. About 1 in 8000 bounced back through large angles, which Thomson's plum-pudding model could not produce at any rate. Geiger–Marsden maths then forced a tiny, dense, positive nucleus: the rebound probability implied a collision distance of order $10^{-14}$ m, ten thousand times smaller than the atom. The Coulomb repulsion $F = kq_1q_2/r^2$ at that distance is enormous, which is why a head-on alpha can reverse. The experiment is the template for all scattering physics — the same logic later probed the nucleus with electrons."),
             "table1": {"title": "Observations and conclusions",
                        "headers": ["Observation", "Fraction", "Conclusion"],
                        "rows": [
                            ["Alphas pass straight through", "most (&gt; 99%)", "atom mostly empty space"],
                            ["Small deflections", "some", "positive charge concentrated, not spread"],
                            ["Large-angle rebound", "&#8776; 1 in 8000", "tiny, dense, positive nucleus"],
                            ["Backward scattering (90&#176;+)", "very rare", "impossible in plum-pudding model"],
                        ]},
             "table2": {"title": "Scale of the nuclear atom",
                        "headers": ["Quantity", "Value", "Ratio"],
                        "rows": [
                            ["Atomic radius", "&#8776; 10&#8315;&#185;&#8320; m", "1"],
                            ["Nuclear radius", "&#8776; 10&#8315;&#185;&#8304; m", "1/10,000"],
                            ["Volume fraction of nucleus", "$10^&#8722;12$", "nearly all mass, almost no volume"],
                            ["Density of nuclear matter", "&#8776; 2&#215;10&#185;&#8311; kg/m&#179;", "&#8776; 10&#185;&#8308; &#215; water"],
                        ]},
             "svg": ("Rutherford scattering — most pass, few bounce",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<circle cx=\"420\" cy=\"150\" r=\"10\" fill=\"#a16207\"/>"
                     "<text x=\"420\" y=\"185\" text-anchor=\"middle\" fill=\"#a16207\">nucleus</text>"
                     "<path d=\"M80 140 L 405 145\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M435 155 L 610 155\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<path d=\"M415 145 C 460 90, 520 70, 600 60\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                     "<path d=\"M420 165 C 470 210, 530 230, 600 245\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<text x=\"90\" y=\"128\" fill=\"#1d4ed8\">&#945;-beam</text>"
                     "<text x=\"560\" y=\"175\" fill=\"#166534\">most pass</text>"
                     "<text x=\"540\" y=\"50\" fill=\"#991b1b\">few rebound</text>"
                     "<text x=\"540\" y=\"265\" fill=\"#a16207\">small deflections</text>"
                     "<text x=\"320\" y=\"290\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">Coulomb repulsion from a tiny positive core explains every angle</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Plum pudding vs nuclear atom — which survives the test",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"160\" cy=\"110\" r=\"55\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<g fill=\"#991b1b\">"
                     "<circle cx=\"140\" cy=\"95\" r=\"4\"/><circle cx=\"180\" cy=\"105\" r=\"4\"/>"
                     "<circle cx=\"150\" cy=\"130\" r=\"4\"/><circle cx=\"185\" cy=\"130\" r=\"4\"/>"
                     "</g>"
                     "<text x=\"160\" y=\"195\" fill=\"#1d4ed8\">Thomson: charge spread out</text>"
                     "<circle cx=\"470\" cy=\"110\" r=\"55\" fill=\"none\" stroke=\"#166534\"/>"
                     "<circle cx=\"470\" cy=\"110\" r=\"6\" fill=\"#991b1b\"/>"
                     "<text x=\"470\" y=\"195\" fill=\"#166534\">Rutherford: tiny dense core</text>"
                     "</g>"
                     "<text x=\"320\" y=\"35\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">only the nuclear model predicts large-angle scattering</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/nuclear-physics/02-nuclear-density-mass-number-atomic-number.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: Z, A and the density that never changes\n\nThe atomic number Z counts protons and fixes the element's identity; the mass number A counts nucleons (protons + neutrons). Isotopes share Z but differ in A (¹H, ²H, ³H); isobars share A but differ in Z (¹⁴C and ¹⁴N). Nuclear mass is measured in atomic mass units, 1 u = 1.6605×10⁻²⁷ kg. The striking fact is that nuclear density is *independent of A*: radius grows as $R = R_0A^{1/3}$, so volume grows as A while mass grows as A — their ratio stays $\\rho \\approx 2.3\\times10^{17}$ kg/m³ for every nucleus from helium to uranium. Nucleons are incompressible: squeezing more into a nucleus just makes it bigger, not denser."),
             "table1": {"title": "Z, A, N — the nuclear bookkeeping",
                        "headers": ["Symbol", "Meaning", "Example (²³⁸U)"],
                        "rows": [
                            ["Z (atomic number)", "proton count = element identity", "92"],
                            ["N (neutron number)", "neutron count", "146"],
                            ["A (mass number)", "Z + N nucleons", "238"],
                            ["Isotope", "same Z, different A", "²³⁵U vs ²³⁸U"],
                            ["Isobar", "same A, different Z", "¹⁴C vs ¹⁴N"],
                        ]},
             "table2": {"title": "Nuclear size and density formulas",
                        "headers": ["Quantity", "Formula", "Value"],
                        "rows": [
                            ["Nuclear radius", "$R = R_0A^{1/3}$, $R_0 = 1.2$ fm", "grows slowly with A"],
                            ["Nuclear volume", "$V = \\frac{4}{3}\\pi R&#179; &#8746; A$", "proportional to A"],
                            ["Nuclear density", "$\\rho = \\dfrac{1.66&#215;10^&#8722;27 A}{\\frac{4}{3}\\pi R_0&#179;A}$", "&#8776; 2.3&#215;10&#185;&#8311; kg/m&#179;, constant"],
                            ["1 u", "1.6605&#215;10&#8315;&#178;&#8311; kg", "931.5 MeV/c&#178;"],
                        ]},
             "svg": ("Radius grows as A^(1/3) — density stays constant",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"140\" cy=\"130\" r=\"30\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"140\" y=\"190\" fill=\"#1d4ed8\">A = 4 (He)</text>"
                     "<circle cx=\"320\" cy=\"130\" r=\"48\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"210\" fill=\"#1d4ed8\">A = 16 (O)</text>"
                     "<circle cx=\"510\" cy=\"130\" r=\"75\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"510\" y=\"235\" fill=\"#1d4ed8\">A = 64 (Cu-ish)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"45\" text-anchor=\"middle\" fill=\"#374151\">R &#8746; A^(1/3): double A, radius grows only 26%</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">mass &#8746; A and volume &#8746; A &#8594; density constant &#8776; 2.3&#215;10&#185;&#8311; kg/m&#179;</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Isotopes vs isobars — same Z vs same A",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"185\" y=\"100\" fill=\"#1d4ed8\">isotopes</text>"
                     "<text x=\"185\" y=\"125\" fill=\"#374151\" font-size=\"12\">same Z, different A</text>"
                     "<text x=\"185\" y=\"150\" fill=\"#374151\" font-size=\"12\">&#185;H, &#178;H, &#179;H</text>"
                     "<rect x=\"340\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"455\" y=\"100\" fill=\"#166534\">isobars</text>"
                     "<text x=\"455\" y=\"125\" fill=\"#374151\" font-size=\"12\">same A, different Z</text>"
                     "<text x=\"455\" y=\"150\" fill=\"#374151\" font-size=\"12\">&#185;&#8308;C and &#185;&#8308;N</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">Z fixes the element; A fixes the mass</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/nuclear-physics/04-einstein-s-mass-energy-relation.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: mass defect is the binding energy\n\nEinstein's relation $E = mc^2$ says mass is a form of energy with an enormous exchange rate: 1 kg ↔ 9×10¹⁶ J, and 1 u ↔ 931.5 MeV. In nuclei the assembled mass is *less* than the sum of its parts — the mass defect $\\Delta m = (Zm_p + Nm_n) - M_{nucleus}$ — and that missing mass is the binding energy $BE = \\Delta mc^2$ that holds the nucleus together. Per nucleon, BE/A peaks near iron (A ≈ 56, ≈ 8.8 MeV), which is why fusion releases energy below iron and fission above it. NEB numericals: compute $\\Delta m$ in u, multiply by 931.5, and quote MeV; or find the energy of annihilating an electron–positron pair (1.022 MeV)."),
             "table1": {"title": "Mass–energy conversion factors",
                        "headers": ["Quantity", "Value", "Use"],
                        "rows": [
                            ["1 u in kg", "1.6605&#215;10&#8315;&#178;&#8311; kg", "nuclear masses"],
                            ["1 u in energy", "931.5 MeV", "binding-energy sums"],
                            ["1 kg in energy", "9&#215;10&#185;&#8310; J", "E = mc&#178; macroscopic"],
                            ["Electron rest energy", "0.511 MeV", "pair creation needs 1.022 MeV"],
                            ["Proton rest energy", "938.3 MeV", "&#8212;"],
                        ]},
             "table2": {"title": "Binding energy per nucleon — the fusion/fission map",
                        "headers": ["Nucleus", "BE/A (MeV)", "Energy direction"],
                        "rows": [
                            ["&#178;H (deuteron)", "&#8776; 1.1", "fusion releases"],
                            ["&#8308;He", "&#8776; 7.1", "fusion releases strongly"],
                            ["&#8322;&#8310;Fe (iron, A &#8776; 56)", "&#8776; 8.8 (peak)", "neither — most bound"],
                            ["&#178;&#8321;&#8320;U", "&#8776; 7.6", "fission releases"],
                        ]},
             "svg": ("Mass defect — assembled nucleus is lighter than its parts",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"150\" cy=\"100\" r=\"14\" fill=\"#991b1b\"/>"
                     "<text x=\"150\" y=\"140\" fill=\"#991b1b\">2 protons</text>"
                     "<circle cx=\"150\" cy=\"190\" r=\"14\" fill=\"#1d4ed8\"/>"
                     "<text x=\"150\" y=\"230\" fill=\"#1d4ed8\">2 neutrons</text>"
                     "<circle cx=\"460\" cy=\"140\" r=\"40\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"460\" y=\"145\" fill=\"#166534\">&#8308;He</text>"
                     "</g>"
                     "<path d=\"M240 145 L 400 145\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                     "<path d=\"M400 145 L 386 138 L 386 152 Z\" fill=\"#374151\"/>"
                     "<text x=\"320\" y=\"130\" text-anchor=\"middle\" fill=\"#374151\">mass defect &#916;m</text>"
                     "<text x=\"320\" y=\"170\" text-anchor=\"middle\" fill=\"#a16207\">BE = &#916;mc&#178; = 28.3 MeV</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">the missing mass is the glue</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("BE/A curve — fusion below iron, fission above",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<path d=\"M100 200 C 160 90, 240 70, 300 68 C 360 70, 460 90, 560 110\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<circle cx=\"300\" cy=\"68\" r=\"5\" fill=\"#991b1b\"/>"
                     "<text x=\"300\" y=\"50\" text-anchor=\"middle\" fill=\"#991b1b\">Fe-56: 8.8 MeV peak</text>"
                     "<text x=\"150\" y=\"240\" fill=\"#166534\">fusion gains (light side)</text>"
                     "<text x=\"480\" y=\"240\" fill=\"#a16207\">fission gains (heavy side)</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">BE/A</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">A</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\">nuclei climb toward the iron peak and release energy doing it</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/nuclear-physics/06-creation-and-annihilation.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: energy ↔ matter, both directions with the books balanced\n\nPair creation turns a photon into a particle–antiparticle pair; annihilation turns the pair back into photons. Both are governed by strict conservation laws. Energy: a photon needs $E \\ge 2m_ec^2 = 1.022$ MeV to make an electron–positron pair (and it must happen near a nucleus so momentum is conserved — a lone photon in vacuum cannot). Momentum: the pair's total momentum must match the photon's, hence the third body. Charge: +1 and −1 sum to the photon's zero. Angular momentum, lepton number and baryon number all balance too. Annihilation of a slow pair gives two 0.511 MeV photons flying back-to-back — the basis of PET medical imaging."),
             "table1": {"title": "Conservation laws in pair creation and annihilation",
                        "headers": ["Law", "Pair creation (&#947; &#8594; e&#8315;e&#8314;)", "Annihilation (e&#8315;e&#8314; &#8594; &#947;&#947;)"],
                        "rows": [
                            ["Energy", "$E_&#947; &#8805; 1.022$ MeV", "two photons, 0.511 MeV each (slow pair)"],
                            ["Momentum", "needs a nearby nucleus", "photons back-to-back"],
                            ["Charge", "+1 + (&#8722;1) = 0", "0 = 0 + 0"],
                            ["Lepton number", "0 = (+1) + (&#8722;1)", "0 = 0"],
                        ]},
             "table2": {"title": "Everyday and cosmic appearances",
                        "headers": ["Process", "Where seen", "Signature"],
                        "rows": [
                            ["Pair creation", "cosmic-ray showers, near nuclei", "tracks from a single point"],
                            ["Annihilation", "positron emission tomography (PET)", "two 511 keV &#947; rays opposite"],
                            ["&#946;&#8314; decay source", "proton-rich nuclei", "positron then annihilation"],
                            ["Pair instability", "massive stars", "core collapse trigger"],
                        ]},
             "svg": ("Pair creation and annihilation — the reversible bookkeeping",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M100 140 L 300 140\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"125\" fill=\"#a16207\">&#947; (&#8805; 1.022 MeV)</text>"
                     "<path d=\"M300 140 L 420 60\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M300 140 L 420 220\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"450\" y=\"55\" fill=\"#1d4ed8\">e&#8315;</text>"
                     "<text x=\"450\" y=\"230\" fill=\"#166534\">e&#8314;</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">annihilation runs the arrow backwards: two 0.511 MeV &#947; back-to-back</text>"
                     "</g>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("PET scan principle — annihilation photons detected in pairs",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<ellipse cx=\"320\" cy=\"130\" rx=\"110\" ry=\"70\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"130\" fill=\"#991b1b\">body + tracer</text>"
                     "<circle cx=\"320\" cy=\"130\" r=\"5\" fill=\"#111827\"/>"
                     "<path d=\"M315 125 L 180 60\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<path d=\"M325 135 L 460 200\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                     "<rect x=\"120\" y=\"40\" width=\"60\" height=\"24\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"460\" y=\"196\" width=\"60\" height=\"24\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"245\" fill=\"#374151\">two 511 keV photons, opposite directions &#8594; detectors ring up the line</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/quantity-of-heat/01-newton-s-law-of-cooling.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: exponential decay of the temperature gap\n\nNewton's law of cooling states that the rate of heat loss is proportional to the temperature *difference* between the body and its surroundings: $dT/dt = -k(T - T_s)$. Integrating gives $T - T_s = (T_0 - T_s)e^{-kt}$ — the gap decays exponentially, so the body cools fast at first and ever more slowly as it approaches $T_s$ (it never quite reaches it). The law is reliable only for small excess temperatures (forced convection, gentle draughts); at large ΔT, radiation ($\\propto T^4$) and vigorous convection take over. The practical NEB use: from two temperature readings at two times, $k$ follows and any future temperature can be predicted — the standard 'when will the tea reach 40°C' problem."),
             "table1": {"title": "The cooling law in three forms",
                        "headers": ["Form", "Equation", "Use"],
                        "rows": [
                            ["Differential", "$dT/dt = -k(T - T_s)$", "statement of the law"],
                            ["Integrated", "$T = T_s + (T_0 - T_s)e^{-kt}$", "temperature at time t"],
                            ["Log form", "$\\ln(T - T_s) = \\ln(T_0 - T_s) - kt$", "straight line; slope = &#8722;k"],
                            ["Half-gap time", "$t_{1/2} = \\ln 2/k$", "gap halves every fixed interval"],
                        ]},
             "table2": {"title": "Validity and failure of the law",
                        "headers": ["Condition", "Law holds?", "Reason"],
                        "rows": [
                            ["Small excess temperature (&lt; ~20&#176;C)", "yes", "linearises the T&#8308; radiation term"],
                            ["Gentle forced convection", "yes", "heat flow &#8746; &#916;T"],
                            ["Large &#916;T (red-hot object)", "no", "radiation &#8746; T&#8308; dominates"],
                            ["Changing ambient Ts", "no", "law assumes fixed surroundings"],
                        ]},
             "svg": ("Exponential cooling — the gap halves every fixed interval",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"80\" y1=\"170\" x2=\"580\" y2=\"170\" stroke=\"#166534\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                     "<text x=\"590\" y=\"175\" fill=\"#166534\">Ts</text>"
                     "<path d=\"M90 70 C 180 100, 260 135, 340 152 C 420 165, 500 168, 570 169\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"150\" y=\"60\" fill=\"#1d4ed8\">T&#8320;</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">T</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">t</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">T &#8722; Ts = (T&#8320; &#8722; Ts)e^(&#8722;kt): fast at first, then creeping</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Log plot makes cooling a straight line — slope = -k",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\"/>"
                     "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"100\" y1=\"80\" x2=\"520\" y2=\"190\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"90\" y=\"70\" fill=\"#1d4ed8\">ln(T &#8722; Ts)</text>"
                     "<text x=\"590\" y=\"230\" fill=\"#111827\">t</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\">straight line &#8594; slope = &#8722;k &#8594; k is the cooling constant</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/quantity-of-heat/11-unknown-specific-heat-via-cooling-rates.json",
        "blocks": [
            {"after": "**Definition:** Specific heat capacity ($c$) is the amount",
             "md": ("### Deep dive: the method of cooling rates\n\nWhen a hot liquid cools, the heat it loses per second is $mc\\,dT/dt$. If the same calorimeter is filled first with water and then with the unknown liquid, and both are cooled through the *same temperature range* in the *same enclosure*, the rate of heat loss to the surroundings is identical in the two runs. Equating the loss rates gives $\\frac{m_w c_w + W}{t_w} = \\frac{m_l c_l + W}{t_l}$, where W is the water-equivalent of the calorimeter and $t_w, t_l$ are the cooling times. Solving for $c_l$ needs no knowledge of k or the emissivity — the enclosure cancels. This is the classic NEB practical: measure two cooling times, weigh the liquids, find c."),
             "table1": {"title": "Cooling-rate method — the two-run setup",
                        "headers": ["Run", "Fill", "Measure", "Purpose"],
                        "rows": [
                            ["1", "water, mass $m_w$", "cooling time $t_w$ over &#916;T", "reference with known $c_w$"],
                            ["2", "liquid, mass $m_l$", "cooling time $t_l$ over same &#916;T", "unknown c"],
                            ["Both", "same calorimeter", "same &#916;T range", "heat-loss rate cancels"],
                        ]},
             "table2": {"title": "Working formula and error sources",
                        "headers": ["Item", "Statement", "Watch for"],
                        "rows": [
                            ["Formula", "$c_l = \\dfrac{(m_w c_w + W)t_l - W}{m_l}\\cdot\\dfrac{1}{t_l}$", "keep the water-equivalent W"],
                            ["Simplified (W small)", "$\\dfrac{m_w c_w}{t_w} = \\dfrac{m_l c_l}{t_l}$", "only if W negligible"],
                            ["Error 1", "different &#916;T ranges", "cooling rate is not constant"],
                            ["Error 2", "draughts or stirring differences", "changes the loss rate between runs"],
                        ]},
             "svg": ("Same calorimeter, two liquids, same ΔT — rates equate",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"100\" y=\"80\" width=\"120\" height=\"110\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"160\" y=\"70\" fill=\"#1d4ed8\">run 1: water</text>"
                     "<text x=\"160\" y=\"140\" fill=\"#1d4ed8\">m_w, t_w</text>"
                     "<rect x=\"420\" y=\"80\" width=\"120\" height=\"110\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"480\" y=\"70\" fill=\"#a16207\">run 2: liquid</text>"
                     "<text x=\"480\" y=\"140\" fill=\"#a16207\">m_l, t_l</text>"
                     "</g>"
                     "<text x=\"320\" y=\"150\" text-anchor=\"middle\" fill=\"#374151\">same &#916;T, same enclosure</text>"
                     "<text x=\"320\" y=\"235\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">loss rates equal &#8594; (m_w c_w + W)/t_w = (m_l c_l + W)/t_l</text>"
                     "</svg>"),
            },
            {"after": "**Real-world application:** Quality control in food indust",
             "svg": ("Cooling curves of two liquids — the flatter one has larger c",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\"/>"
                     "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<path d=\"M90 70 C 180 110, 300 160, 560 195\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M90 70 C 200 130, 360 180, 560 200\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"200\" y=\"95\" fill=\"#1d4ed8\">water (cools faster)</text>"
                     "<text x=\"380\" y=\"150\" fill=\"#a16207\">liquid (cools slower &#8594; larger c)</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\">same &#916;T: the liquid that takes longer stores more heat per kg</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/quantity-of-heat/13-newtons-law-limitations.json",
        "blocks": [
            {"after": "Newton's law of cooling states: $\\frac{dT}{dt} = -k(T - T_",
             "md": ("### Deep dive: where the straight-line approximation breaks\n\nNewton's law is the first term of a Taylor expansion of the true heat-loss physics. Radiation alone follows Stefan–Boltzmann, $P = e\\sigma A(T^4 - T_s^4)$; for small excess $\\Delta T$ this factorises to $\\approx 4e\\sigma AT_s^3\\,\\Delta T$, which *is* proportional to ΔT — that is why the law works for gently warm objects in a fixed environment. Push the excess temperature up and the $T^4$ curvature shows: cooling accelerates beyond the linear prediction. Other failures are environmental: moving air (forced convection changes k), changing ambient temperature, phase changes on the surface (evaporation adds a latent-heat channel), and very small objects where the lumped-capacitance assumption (uniform body temperature) fails."),
             "table1": {"title": "Limitations and their physical reasons",
                        "headers": ["Limitation", "Why it fails", "Regime where it matters"],
                        "rows": [
                            ["Large temperature excess", "radiation grows as T&#8308;, not linearly", "red-hot metals, furnaces"],
                            ["Forced convection (wind)", "k depends on air speed", "cooling in a draught"],
                            ["Changing ambient Ts", "law assumes fixed surroundings", "room warming during the run"],
                            ["Evaporation", "latent heat adds a loss channel", "wet surfaces, sweating"],
                            ["Non-uniform body temperature", "lumped model breaks down", "large solids, poor conductors"],
                        ]},
             "table2": {"title": "When the law is safe to use",
                        "headers": ["Condition", "Typical numbers", "Error scale"],
                        "rows": [
                            ["Excess &#916;T &#8810; Ts (kelvin)", "&#916;T &lt; ~20 K at Ts &#8776; 300 K", "a few percent"],
                            ["Natural, gentle convection", "still air, small object", "law holds"],
                            ["No phase change on surface", "dry surface", "law holds"],
                            ["Short time span", "Ts steady over the run", "law holds"],
                        ]},
             "svg": ("Linear law vs T⁴ reality — the gap widens when hot",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"90\" y1=\"100\" x2=\"560\" y2=\"180\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M90 100 C 250 115, 420 150, 560 200\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"330\" y=\"120\" fill=\"#1d4ed8\">Newton (linear in &#916;T)</text>"
                     "<text x=\"430\" y=\"180\" fill=\"#991b1b\">Stefan&#8211;Boltzmann (T&#8308;)</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">heat-loss rate</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">&#916;T</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">they agree only for small excess temperature</text>"
                     "</svg>"),
            },
            {"after": "**Limitation reminder:** Newton's law is an approximation. Real coolin",
             "svg": ("Validity window of Newton's law of cooling",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"90\" y=\"80\" width=\"220\" height=\"60\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"200\" y=\"105\" fill=\"#166534\">small &#916;T: law holds</text>"
                     "<text x=\"200\" y=\"125\" fill=\"#6b7280\" font-size=\"12\">tea cooling on a table</text>"
                     "<rect x=\"350\" y=\"80\" width=\"220\" height=\"60\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"460\" y=\"105\" fill=\"#991b1b\">large &#916;T: law fails</text>"
                     "<text x=\"460\" y=\"125\" fill=\"#6b7280\" font-size=\"12\">glowing metal, T&#8308; radiation</text>"
                     "</g>"
                     "<text x=\"320\" y=\"190\" text-anchor=\"middle\" fill=\"#374151\">the law is a small-difference approximation, not a universal rule</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/rate-of-heat-flow/04-black-body-radiation.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: the perfect emitter that defines the scale\n\nA black body absorbs every wavelength falling on it and, by Kirchhoff's logic, is also the best possible emitter at every wavelength. Its spectrum is a smooth hump (Planck's law) whose *total* power obeys Stefan–Boltzmann, $P = e\\sigma AT^4$ with $\\sigma = 5.67\\times10^{-8}$ W m⁻² K⁻⁴; the *peak* wavelength obeys Wien's law, $\\lambda_{max}T = 2.9\\times10^{-3}$ m·K. Together they explain everyday colour shifts: a body at 300 K peaks near 10 μm (invisible infrared), at 1000 K it glows dull red, at 6000 K (the Sun) it peaks at 500 nm — right in the visible. The T⁴ dependence is why doubling the absolute temperature multiplies radiated power sixteen-fold."),
             "table1": {"title": "The two radiation laws",
                        "headers": ["Law", "Statement", "Reads as"],
                        "rows": [
                            ["Stefan&#8211;Boltzmann", "$P = e\\sigma AT^4$", "total power &#8746; T&#8308;"],
                            ["Wien", "$\\lambda_{max}T = 2.9&#215;10^&#8722;3$ m&#183;K", "hotter &#8594; peak shifts bluer"],
                            ["Kirchhoff", "good absorber = good emitter", "e = 1 for a black body"],
                            ["Prevost theory", "all bodies radiate continuously", "net exchange decides heating"],
                        ]},
             "table2": {"title": "Peak wavelengths across temperature",
                        "headers": ["T (K)", "λ_max", "Where the peak sits"],
                        "rows": [
                            ["300 (room)", "&#8776; 9.7 &#956;m", "far infrared (invisible)"],
                            ["1000 (dull red)", "&#8776; 2.9 &#956;m", "near infrared + red tail"],
                            ["3000 (tungsten lamp)", "&#8776; 970 nm", "red-heavy visible"],
                            ["5800 (Sun)", "&#8776; 500 nm", "middle of the visible band"],
                        ]},
             "svg": ("Black-body spectra — hotter peaks shift bluer and taller",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<path d=\"M160 210 C 240 200, 300 185, 380 200 C 460 212, 520 216, 570 218\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M130 210 C 210 170, 260 120, 320 110 C 380 120, 450 170, 540 205\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<path d=\"M110 210 C 170 120, 220 70, 270 62 C 330 68, 420 130, 520 195\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<text x=\"300\" y=\"48\" fill=\"#991b1b\">6000 K</text>"
                     "<text x=\"300\" y=\"100\" fill=\"#a16207\">3000 K</text>"
                     "<text x=\"340\" y=\"190\" fill=\"#166534\">300 K</text>"
                     "<text x=\"90\" y=\"45\" fill=\"#111827\">power</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">λ</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">hotter: taller peak, shifted to shorter λ (Wien) and much more total power (T&#8308;)</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Doubling absolute temperature ×16 the radiated power",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"80\" y=\"70\" width=\"220\" height=\"90\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"190\" y=\"100\" fill=\"#1d4ed8\">T = 300 K</text>"
                     "<text x=\"190\" y=\"125\" fill=\"#374151\" font-size=\"12\">P &#8746; 300&#8308;</text>"
                     "<rect x=\"340\" y=\"70\" width=\"220\" height=\"90\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"450\" y=\"100\" fill=\"#a16207\">T = 600 K</text>"
                     "<text x=\"450\" y=\"125\" fill=\"#374151\" font-size=\"12\">P &#8746; 600&#8308; = 16 &#215; 300&#8308;</text>"
                     "</g>"
                     "<text x=\"320\" y=\"195\" text-anchor=\"middle\" fill=\"#6b7280\">P = e&#963;AT&#8308;: the fourth power is why heat radiates so fiercely</text>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
