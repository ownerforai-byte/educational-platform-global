# Physics SVG topups — optics + modern + misc (45 files)
TOPICS = [
    # ---------- dispersion ----------
    {"file": "class-11/physics/dispersion/01-pure-spectrum-and-dispersive-power.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Prism splits white light: violet bends most",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M280 60 L 220 180 L 340 180 Z\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M120 100 L 265 120\" stroke=\"#9ca3af\" stroke-width=\"2.5\"/>"
                         "<path d=\"M330 130 L 520 175\" stroke=\"#7c3aed\" stroke-width=\"2\"/>"
                         "<path d=\"M330 128 L 520 150\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M330 125 L 520 120\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<path d=\"M330 122 L 520 90\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                         "<text x=\"545\" y=\"180\" fill=\"#7c3aed\">violet</text>"
                         "<text x=\"545\" y=\"95\" fill=\"#991b1b\">red</text>"
                         "<text x=\"150\" y=\"90\" fill=\"#6b7280\">white light</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/dispersion/02-chromatic-and-spherical-aberration.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Spherical aberration: marginal rays focus short",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"300\" cy=\"110\" rx=\"20\" ry=\"70\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M120 70 L 300 70 L 360 100\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M120 110 L 300 110 L 400 110\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"430\" y=\"105\" fill=\"#166534\">paraxial focus</text>"
                         "<text x=\"380\" y=\"90\" fill=\"#1d4ed8\">marginal focus</text>"
                         "<text x=\"320\" y=\"200\" fill=\"#6b7280\" font-size=\"12\">stop down the aperture or use parabolic surfaces</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/dispersion/03-achromatism-and-its-applications.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Achromatic pair: crown + flint cancel dispersion",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M240 60 L 190 160 L 290 160 Z\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<path d=\"M300 160 L 350 60 L 400 160 Z\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<path d=\"M100 110 L 230 110\" stroke=\"#9ca3af\" stroke-width=\"2.5\"/>"
                         "<path d=\"M410 110 L 540 110\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"215\" y=\"50\" fill=\"#1d4ed8\">crown</text>"
                         "<text x=\"350\" y=\"50\" fill=\"#991b1b\">flint</text>"
                         "<text x=\"500\" y=\"95\" fill=\"#166534\">no colour split</text>"
                         "</g></svg>"),
                }]},
    # ---------- lenses ----------
    {"file": "class-11/physics/lenses/01-spherical-lenses-angular-magnification.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Simple microscope: object inside f gives a magnified virtual image",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"320\" cy=\"120\" rx=\"16\" ry=\"80\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M260 160 L 310 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"255\" cy=\"160\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M330 160 L 440 100\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<circle cx=\"450\" cy=\"95\" r=\"12\" fill=\"#991b1b\"/>"
                         "<text x=\"480\" y=\"90\" fill=\"#991b1b\">enlarged virtual image</text>"
                         "<text x=\"230\" y=\"190\" fill=\"#1d4ed8\">object &lt; f</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/lenses/02-lens-maker-s-formula.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Lens-maker's formula: glass and shape set f",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"320\" cy=\"110\" rx=\"18\" ry=\"75\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"320\" y=\"210\" fill=\"#374151\">1/f = (n&#8722;1)(1/R&#8321; &#8722; 1/R&#8322;)</text>"
                         "<text x=\"180\" y=\"60\" fill=\"#6b7280\">R&#8321;</text>"
                         "<text x=\"470\" y=\"60\" fill=\"#6b7280\">R&#8322;</text>"
                         "<text x=\"150\" y=\"170\" fill=\"#6b7280\">in air</text>"
                         "<text x=\"500\" y=\"170\" fill=\"#6b7280\">in water: f lengthens</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/lenses/03-power-of-a-lens.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Thin lenses in contact: powers add",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"290\" cy=\"110\" rx=\"14\" ry=\"70\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<ellipse cx=\"330\" cy=\"110\" rx=\"14\" ry=\"70\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<text x=\"310\" y=\"210\" fill=\"#374151\">P = P&#8321; + P&#8322;, P = 1/f (dioptre)</text>"
                         "<text x=\"240\" y=\"40\" fill=\"#1d4ed8\">+2 D</text>"
                         "<text x=\"380\" y=\"40\" fill=\"#991b1b\">&#8722;0.5 D</text>"
                         "</g></svg>"),
                }]},
    # ---------- nuclear ----------
    {"file": "class-11/physics/nuclear-physics/02-atomic-mass-isotopes.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Isotopes of hydrogen: same Z, different N",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"140\" cy=\"100\" r=\"10\" fill=\"#991b1b\"/>"
                         "<text x=\"140\" y=\"150\" fill=\"#374151\">&#185;H</text>"
                         "<circle cx=\"320\" cy=\"100\" r=\"10\" fill=\"#991b1b\"/>"
                         "<circle cx=\"345\" cy=\"100\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<text x=\"330\" y=\"150\" fill=\"#374151\">&#178;H (deuterium)</text>"
                         "<circle cx=\"520\" cy=\"100\" r=\"10\" fill=\"#991b1b\"/>"
                         "<circle cx=\"545\" cy=\"100\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"495\" cy=\"100\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<text x=\"520\" y=\"150\" fill=\"#374151\">&#179;H (tritium)</text>"
                         "<text x=\"320\" y=\"50\" fill=\"#6b7280\">red = proton, blue = neutron</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/nuclear-physics/03-atomic-mass-isotopes.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Mass spectrometer separates isotopes by path radius",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 120 L 260 120\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M260 120 C 300 60, 380 60, 430 100\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M260 120 C 300 180, 380 180, 430 140\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<text x=\"470\" y=\"100\" fill=\"#1d4ed8\">light isotope</text>"
                         "<text x=\"470\" y=\"150\" fill=\"#a16207\">heavy isotope</text>"
                         "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">r = mv/qB: heavier ions curve wider</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/nuclear-physics/05-mass-defect-packing-fraction-binding-energy-per-nucleon.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Packing fraction measures tightness of packing",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"100\" y1=\"110\" x2=\"560\" y2=\"110\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"200\" cy=\"80\" r=\"8\" fill=\"#991b1b\"/>"
                         "<text x=\"200\" y=\"60\" fill=\"#991b1b\">light: positive</text>"
                         "<circle cx=\"440\" cy=\"140\" r=\"8\" fill=\"#166534\"/>"
                         "<text x=\"440\" y=\"170\" fill=\"#166534\">medium/heavy: negative</text>"
                         "<text x=\"320\" y=\"50\" fill=\"#374151\">packing fraction = &#916;m/A</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/nuclear-physics/07-nuclear-fission-and-fusion.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Fission splits heavy; fusion joins light — both release energy",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"170\" cy=\"120\" r=\"34\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                         "<text x=\"170\" y=\"125\" fill=\"#991b1b\">U</text>"
                         "<path d=\"M210 120 L 260 120\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M260 120 L 245 113 L 245 127 Z\" fill=\"#374151\"/>"
                         "<circle cx=\"300\" cy=\"90\" r=\"22\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<circle cx=\"300\" cy=\"150\" r=\"22\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"170\" y=\"190\" fill=\"#991b1b\">fission (&#8776;200 MeV)</text>"
                         "<circle cx=\"470\" cy=\"90\" r=\"16\" fill=\"#dcfce7\" stroke=\"#166534\"/>"
                         "<circle cx=\"470\" cy=\"150\" r=\"16\" fill=\"#dcfce7\" stroke=\"#166534\"/>"
                         "<path d=\"M470 106 L 470 134\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<circle cx=\"470\" cy=\"120\" r=\"22\" fill=\"#fef08a\" stroke=\"#a16207\"/>"
                         "<text x=\"470\" y=\"190\" fill=\"#166534\">fusion (stars, H&#8594;He)</text>"
                         "</g></svg>"),
                }]},
    # ---------- physical quantities ----------
    {"file": "class-11/physics/physical-quantities/01-precision-and-significant-figures.json",
     "blocks": [{"after": "## 6. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Significant figures track the instrument's precision",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"120\" y1=\"100\" x2=\"520\" y2=\"100\" stroke=\"#374151\" stroke-width=\"3\"/>"
                         "<g stroke=\"#374151\" stroke-width=\"1.5\">"
                         "<line x1=\"120\" y1=\"90\" x2=\"120\" y2=\"110\"/>"
                         "<line x1=\"220\" y1=\"90\" x2=\"220\" y2=\"110\"/>"
                         "<line x1=\"320\" y1=\"90\" x2=\"320\" y2=\"110\"/>"
                         "<line x1=\"420\" y1=\"90\" x2=\"420\" y2=\"110\"/>"
                         "</g>"
                         "<text x=\"120\" y=\"135\" fill=\"#374151\">1.0</text>"
                         "<text x=\"220\" y=\"135\" fill=\"#374151\">2.0</text>"
                         "<text x=\"320\" y=\"135\" fill=\"#374151\">3.0</text>"
                         "<text x=\"420\" y=\"135\" fill=\"#374151\">4.0 cm</text>"
                         "<text x=\"320\" y=\"185\" fill=\"#6b7280\" font-size=\"12\">quote results to the precision you can actually read</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/physical-quantities/02-dimensions-and-uses-of-dimensional-analysis.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Dimensions check an equation before you trust it",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"110\" y=\"70\" width=\"190\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"205\" y=\"100\" fill=\"#166534\">s = ut + &#189;at&#178;</text>"
                         "<text x=\"205\" y=\"130\" fill=\"#374151\" font-size=\"12\">L = L &#10003;</text>"
                         "<rect x=\"350\" y=\"70\" width=\"190\" height=\"80\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<text x=\"445\" y=\"100\" fill=\"#991b1b\">s = ut + at</text>"
                         "<text x=\"445\" y=\"130\" fill=\"#374151\" font-size=\"12\">L &#8800; LT&#8315;&#185; &#10007;</text>"
                         "<text x=\"320\" y=\"195\" fill=\"#6b7280\" font-size=\"12\">dimensions cannot catch a wrong pure number</text>"
                         "</g></svg>"),
                }]},
    # ---------- recent trends (second variants) ----------
    {"file": "class-11/physics/recent-trends-in-physics/01-particle-physics-particles-and-antiparticles-quarks-baryons-and-mesons-and-leptons-neutrinos.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Baryons are triplets; mesons are quark–antiquark pairs",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"180\" cy=\"90\" r=\"14\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                         "<circle cx=\"210\" cy=\"110\" r=\"14\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<circle cx=\"180\" cy=\"130\" r=\"14\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                         "<text x=\"195\" y=\"170\" fill=\"#374151\">baryon: q q q</text>"
                         "<circle cx=\"440\" cy=\"90\" r=\"14\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                         "<circle cx=\"470\" cy=\"110\" r=\"14\" fill=\"#fbcfe8\" stroke=\"#991b1b\"/>"
                         "<text x=\"455\" y=\"170\" fill=\"#374151\">meson: q q&#772;</text>"
                         "<text x=\"320\" y=\"50\" fill=\"#6b7280\">leptons (e, &#957;) never feel the strong force</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/recent-trends-in-physics/02-universe-big-bang-and-hubble-law-expansion-of-the-universe.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Expansion timeline of the universe",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"120\" cy=\"120\" r=\"8\" fill=\"#991b1b\"/>"
                         "<text x=\"120\" y=\"160\" fill=\"#991b1b\">Big Bang</text>"
                         "<circle cx=\"260\" cy=\"120\" r=\"26\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<text x=\"260\" y=\"180\" fill=\"#a16207\">nucleosynthesis</text>"
                         "<circle cx=\"420\" cy=\"120\" r=\"44\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<text x=\"420\" y=\"200\" fill=\"#1d4ed8\">first stars</text>"
                         "<circle cx=\"580\" cy=\"120\" r=\"58\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"580\" y=\"210\" fill=\"#166534\">today 13.8 Gyr</text>"
                         "</g></svg>"),
                }]},
    # ---------- curved mirror ----------
    {"file": "class-11/physics/reflection-at-curved-mirror/01-real-and-virtual-images.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Concave mirror: real inverted image in front",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M520 60 A 220 220 0 0 0 520 200\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"5\"/>"
                         "<line x1=\"200\" y1=\"50\" x2=\"200\" y2=\"210\" stroke=\"#9ca3af\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>"
                         "<path d=\"M180 170 L 520 170\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M520 170 L 300 110\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<circle cx=\"300\" cy=\"110\" r=\"6\" fill=\"#991b1b\"/>"
                         "<text x=\"160\" y=\"175\" fill=\"#1d4ed8\">object</text>"
                         "<text x=\"330\" y=\"100\" fill=\"#991b1b\">real image</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/reflection-at-curved-mirror/02-mirror-formula.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("1/v + 1/u = 1/f with the principal focus marked",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M540 60 A 240 240 0 0 0 540 180\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"5\"/>"
                         "<line x1=\"200\" y1=\"50\" x2=\"200\" y2=\"190\" stroke=\"#9ca3af\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>"
                         "<circle cx=\"340\" cy=\"120\" r=\"5\" fill=\"#166534\"/>"
                         "<text x=\"340\" y=\"105\" fill=\"#166534\">F</text>"
                         "<path d=\"M180 150 L 540 150\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M540 150 L 300 100\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<circle cx=\"300\" cy=\"100\" r=\"5\" fill=\"#991b1b\"/>"
                         "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">1/v + 1/u = 1/f; magnification m = &#8722;v/u</text>"
                         "</g></svg>"),
                }]},
    # ---------- refraction at plane surfaces ----------
    {"file": "class-11/physics/refraction-at-plane-surfaces/01-laws-of-refraction-refractive-index.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Snell's law at an air–glass boundary",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<rect x=\"0\" y=\"130\" width=\"640\" height=\"130\" fill=\"#eff6ff\"/>"
                         "<line x1=\"0\" y1=\"130\" x2=\"640\" y2=\"130\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<line x1=\"320\" y1=\"30\" x2=\"320\" y2=\"250\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<path d=\"M140 60 L 320 130\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M320 130 L 430 250\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"150\" y=\"50\" fill=\"#1d4ed8\">incident</text>"
                         "<text x=\"445\" y=\"245\" fill=\"#166534\">refracted</text>"
                         "<text x=\"320\" y=\"275\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">n&#8321;sin i = n&#8322;sin r</text>"
                         "</svg>"),
                }]},
    {"file": "class-11/physics/refraction-at-plane-surfaces/02-relation-between-refractive-indices.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Reversibility: n₂₁ = 1/n₁₂",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"110\" y=\"60\" width=\"180\" height=\"110\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"200\" y=\"120\" fill=\"#1d4ed8\">water n = 1.33</text>"
                         "<rect x=\"370\" y=\"60\" width=\"180\" height=\"110\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"460\" y=\"120\" fill=\"#a16207\">glass n = 1.5</text>"
                         "<text x=\"320\" y=\"210\" fill=\"#374151\">n_wg = n_g/n_w &#8776; 1.13</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/refraction-at-plane-surfaces/03-lateral-shift.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Glass slab: ray emerges parallel but shifted",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<rect x=\"180\" y=\"70\" width=\"280\" height=\"100\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<path d=\"M80 120 L 240 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M240 120 L 320 155\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<path d=\"M320 155 L 560 155\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"560\" y=\"140\" fill=\"#166534\">parallel, shifted</text>"
                         "<text x=\"320\" y=\"215\" fill=\"#6b7280\" font-size=\"12\">lateral shift grows with thickness, n and angle</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/refraction-at-plane-surfaces/04-total-internal-reflection.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Beyond the critical angle: total internal reflection",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"130\" fill=\"#eff6ff\"/>"
                         "<line x1=\"0\" y1=\"130\" x2=\"640\" y2=\"130\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M140 60 L 320 130\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M320 130 L 140 200\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"110\" y=\"50\" fill=\"#1d4ed8\">i &gt; C</text>"
                         "<text x=\"110\" y=\"225\" fill=\"#991b1b\">all reflected inside</text>"
                         "<text x=\"480\" y=\"110\" fill=\"#6b7280\">sin C = 1/n</text>"
                         "<text x=\"320\" y=\"250\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">fibre optics and mirages live on this effect</text>"
                         "</svg>"),
                }]},
    # ---------- prisms ----------
    {"file": "class-11/physics/refraction-through-prisms/01-minimum-deviation-condition.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Deviation vs incidence: a minimum at the symmetric pass",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"80\" y1=\"200\" x2=\"580\" y2=\"200\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<line x1=\"80\" y1=\"200\" x2=\"80\" y2=\"50\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M100 80 C 220 140, 320 155, 420 140 C 500 130, 550 120, 570 115\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"320\" cy=\"155\" r=\"5\" fill=\"#991b1b\"/>"
                         "<text x=\"320\" y=\"185\" fill=\"#991b1b\">&#948;min</text>"
                         "<text x=\"90\" y=\"45\" fill=\"#111827\">&#948;</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">i</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/refraction-through-prisms/02-relation-between-the-angle-of-prism-minimum-deviation-and-refractive-index.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("At δmin the ray runs parallel to the prism base",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M320 50 L 220 190 L 420 190 Z\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M120 110 L 265 125\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M265 125 L 375 125\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M375 125 L 530 140\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"90\" y=\"100\" fill=\"#1d4ed8\">in</text>"
                         "<text x=\"545\" y=\"135\" fill=\"#991b1b\">out</text>"
                         "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">n = sin((A+&#948;min)/2)/sin(A/2)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/refraction-through-prisms/03-deviation-in-small-angle-prism.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Thin prism: δ = (n−1)A, independent of incidence",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M300 60 L 260 160 L 340 160 Z\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M120 110 L 270 110\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M330 110 L 540 130\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"320\" y=\"195\" fill=\"#374151\">small A &#8594; tiny, constant deviation</text>"
                         "</g></svg>"),
                }]},
    # ---------- solids ----------
    {"file": "class-11/physics/solids/01-energy-bands-in-solids-qualitative-ideas.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Atomic levels smear into bands in a solid",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<g stroke=\"#1d4ed8\" stroke-width=\"2\">"
                         "<line x1=\"140\" y1=\"70\" x2=\"140\" y2=\"70\"/>"
                         "</g>"
                         "<circle cx=\"140\" cy=\"70\" r=\"4\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"140\" cy=\"120\" r=\"4\" fill=\"#1d4ed8\"/>"
                         "<text x=\"140\" y=\"170\" fill=\"#374151\" font-size=\"12\">single atom: sharp levels</text>"
                         "<rect x=\"380\" y=\"60\" width=\"160\" height=\"24\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<rect x=\"380\" y=\"120\" width=\"160\" height=\"24\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"460\" y=\"170\" fill=\"#374151\" font-size=\"12\">solid: continuous bands</text>"
                         "<text x=\"320\" y=\"40\" fill=\"#6b7280\">N atoms &#8594; N levels per state</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/solids/02-difference-between-metals-insulators-and-semiconductors-using-band-theory.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Gap width sorts conductors, semiconductors, insulators",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"80\" y=\"70\" width=\"140\" height=\"90\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"150\" y=\"185\" fill=\"#1d4ed8\">metal: no gap</text>"
                         "<rect x=\"260\" y=\"120\" width=\"140\" height=\"40\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<rect x=\"260\" y=\"70\" width=\"140\" height=\"30\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"330\" y=\"110\" fill=\"#a16207\">small gap</text>"
                         "<text x=\"330\" y=\"185\" fill=\"#a16207\">semiconductor</text>"
                         "<rect x=\"440\" y=\"140\" width=\"140\" height=\"20\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<rect x=\"440\" y=\"60\" width=\"140\" height=\"30\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"510\" y=\"120\" fill=\"#991b1b\">large gap</text>"
                         "<text x=\"510\" y=\"185\" fill=\"#991b1b\">insulator</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/solids/03-intrinsic-and-extrinsic-semiconductors.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Doping: pentavalent gives n-type, trivalent gives p-type",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"110\" y=\"60\" width=\"180\" height=\"110\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"200\" y=\"100\" fill=\"#1d4ed8\">n-type (P in Si)</text>"
                         "<text x=\"200\" y=\"130\" fill=\"#374151\" font-size=\"12\">extra electron</text>"
                         "<rect x=\"370\" y=\"60\" width=\"180\" height=\"110\" rx=\"8\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<text x=\"460\" y=\"100\" fill=\"#991b1b\">p-type (B in Si)</text>"
                         "<text x=\"460\" y=\"130\" fill=\"#374151\" font-size=\"12\">extra hole</text>"
                         "<text x=\"320\" y=\"200\" fill=\"#6b7280\" font-size=\"12\">both stay neutral; only the carriers change</text>"
                         "</g></svg>"),
                }]},
    # ---------- communication ----------
    {"file": "class-12/physics/communication-systems/01-elements-of-a-communication-system.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Transmitter → channel → receiver",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"80\" y=\"70\" width=\"140\" height=\"60\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"150\" y=\"105\" fill=\"#1d4ed8\">transmitter</text>"
                         "<rect x=\"260\" y=\"70\" width=\"140\" height=\"60\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"330\" y=\"105\" fill=\"#a16207\">channel</text>"
                         "<rect x=\"440\" y=\"70\" width=\"140\" height=\"60\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"510\" y=\"105\" fill=\"#166534\">receiver</text>"
                         "<path d=\"M220 100 L 255 100\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                         "<path d=\"M400 100 L 435 100\" stroke=\"#374151\" stroke-width=\"2.5\"/>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/communication-systems/02-modulation-amplitude-modulation-and-frequency-modulation.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("AM rides on the peaks; FM rides on the frequency",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M80 80 C 110 50, 140 50, 170 80 C 200 110, 230 110, 260 80 C 290 50, 320 50, 350 80 C 380 110, 410 110, 440 80 C 470 50, 500 50, 530 80\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M80 80 L 530 80\" stroke=\"#9ca3af\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>"
                         "<text x=\"300\" y=\"40\" fill=\"#1d4ed8\">AM: amplitude varies</text>"
                         "<path d=\"M80 170 C 95 140, 110 140, 125 170 C 140 200, 155 200, 170 170 C 185 145, 200 145, 215 170 C 230 195, 245 195, 260 170 C 275 150, 290 150, 305 170 C 320 190, 335 190, 350 170\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"300\" y=\"135\" fill=\"#166534\">FM: frequency varies</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/communication-systems/03-bandwidth-and-propagation-of-electromagnetic-waves.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Ground, sky and space-wave paths",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M60 200 L 580 200\" stroke=\"#374151\" stroke-width=\"3\"/>"
                         "<path d=\"M100 200 C 200 160, 400 160, 500 200\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<text x=\"300\" y=\"155\" fill=\"#1d4ed8\">ground wave</text>"
                         "<path d=\"M100 200 C 200 60, 420 60, 520 195\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                         "<text x=\"320\" y=\"55\" fill=\"#166534\">sky wave (ionosphere bounce)</text>"
                         "<text x=\"320\" y=\"230\" fill=\"#6b7280\" font-size=\"12\">microwaves need line of sight: space wave</text>"
                         "</g></svg>"),
                }]},
    # ---------- modern physics ----------
    {"file": "class-12/physics/modern-physics/01-photoelectric-effect-and-einstein-s-photoelectric-equation.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Photoelectric effect: photon in, electron out",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"160\" y=\"70\" width=\"60\" height=\"120\" fill=\"#a16207\"/>"
                         "<text x=\"190\" y=\"215\" fill=\"#a16207\">metal plate</text>"
                         "<path d=\"M80 110 L 150 110\" stroke=\"#7c3aed\" stroke-width=\"2.5\"/>"
                         "<path d=\"M150 110 L 135 103 L 135 117 Z\" fill=\"#7c3aed\"/>"
                         "<text x=\"80\" y=\"95\" fill=\"#7c3aed\">h&#957;</text>"
                         "<circle cx=\"300\" cy=\"90\" r=\"7\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M300 90 L 420 50\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<text x=\"450\" y=\"45\" fill=\"#1d4ed8\">e&#8315; with KE = h&#957; &#8722; &#966;</text>"
                         "<text x=\"320\" y=\"235\" fill=\"#6b7280\" font-size=\"12\">below the threshold frequency nothing happens, however bright</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/modern-physics/02-de-broglie-wavelength-and-matter-waves.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("λ = h/p: electrons diffract like waves",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"180\" cy=\"110\" r=\"10\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M195 110 L 300 110\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                         "<rect x=\"300\" y=\"60\" width=\"24\" height=\"100\" fill=\"#374151\"/>"
                         "<rect x=\"324\" y=\"90\" width=\"6\" height=\"40\" fill=\"#374151\"/>"
                         "<path d=\"M330 110 C 400 70, 480 70, 560 90\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                         "<path d=\"M330 110 C 400 150, 480 150, 560 130\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                         "<text x=\"470\" y=\"60\" fill=\"#991b1b\">diffraction pattern</text>"
                         "<text x=\"180\" y=\"80\" fill=\"#1d4ed8\">electron</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/modern-physics/03-atom-bohr-s-model-and-hydrogen-spectrum.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Bohr orbits and spectral line transitions",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"220\" cy=\"120\" r=\"8\" fill=\"#991b1b\"/>"
                         "<circle cx=\"220\" cy=\"120\" r=\"30\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"220\" cy=\"120\" r=\"55\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"220\" cy=\"120\" r=\"80\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"220\" cy=\"90\" r=\"5\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M220 90 C 250 100, 250 140, 225 118\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"1.5\"/>"
                         "<path d=\"M420 70 L 420 130\" stroke=\"#7c3aed\" stroke-width=\"2\"/>"
                         "<path d=\"M460 90 L 460 130\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M500 110 L 500 130\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"470\" y=\"180\" fill=\"#374151\">Balmer lines: n&#8594;2</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/modern-physics/04-nucleus-binding-energy-nuclear-fission-and-fusion.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Chain reaction: one fission triggers more",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"200\" cy=\"120\" r=\"24\" fill=\"#fecaca\" stroke=\"#991b1b\"/>"
                         "<circle cx=\"360\" cy=\"70\" r=\"18\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<circle cx=\"360\" cy=\"170\" r=\"18\" fill=\"#bfdbfe\" stroke=\"#1d4ed8\"/>"
                         "<circle cx=\"500\" cy=\"40\" r=\"13\" fill=\"#dcfce7\" stroke=\"#166534\"/>"
                         "<circle cx=\"520\" cy=\"100\" r=\"13\" fill=\"#dcfce7\" stroke=\"#166534\"/>"
                         "<circle cx=\"500\" cy=\"200\" r=\"13\" fill=\"#dcfce7\" stroke=\"#166534\"/>"
                         "<path d=\"M224 120 C 280 100, 310 85, 342 75\" fill=\"none\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M224 120 C 280 140, 310 155, 342 165\" fill=\"none\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<text x=\"320\" y=\"230\" fill=\"#6b7280\" font-size=\"12\">each fission releases 2&#8211;3 neutrons &#8594; chain reaction</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/modern-physics/05-semiconductors-intrinsic-and-extrinsic-p-n-junction-diode-transistor.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("p–n junction: forward bias conducts, reverse blocks",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"160\" y=\"80\" width=\"140\" height=\"80\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<rect x=\"300\" y=\"80\" width=\"140\" height=\"80\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"230\" y=\"125\" fill=\"#991b1b\">p</text>"
                         "<text x=\"370\" y=\"125\" fill=\"#1d4ed8\">n</text>"
                         "<line x1=\"300\" y1=\"70\" x2=\"300\" y2=\"170\" stroke=\"#374151\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/>"
                         "<path d=\"M110 120 L 155 120\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M155 120 L 140 113 L 140 127 Z\" fill=\"#166534\"/>"
                         "<text x=\"90\" y=\"105\" fill=\"#166534\">forward</text>"
                         "<text x=\"320\" y=\"215\" fill=\"#6b7280\" font-size=\"12\">depletion layer thins in forward bias, widens in reverse</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/modern-physics/06-logic-gates-and-or-not-nand-nor.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("NAND and NOR are universal gates",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 70 L 220 70 A 30 30 0 0 1 220 130 L 140 130 Z\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<circle cx=\"256\" cy=\"100\" r=\"7\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<text x=\"180\" y=\"105\" fill=\"#1d4ed8\">NAND</text>"
                         "<path d=\"M140 170 C 180 170, 190 145, 220 145 C 190 145, 180 195, 140 195 Z\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<circle cx=\"236\" cy=\"170\" r=\"7\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                         "<text x=\"180\" y=\"175\" fill=\"#991b1b\">NOR</text>"
                         "<text x=\"450\" y=\"100\" fill=\"#374151\">any logic circuit</text>"
                         "<text x=\"450\" y=\"130\" fill=\"#374151\">can be built from</text>"
                         "<text x=\"450\" y=\"160\" fill=\"#374151\">NAND alone</text>"
                         "</g></svg>"),
                }]},
    # ---------- ray optics ----------
    {"file": "class-12/physics/ray-optics/01-reflection-at-plane-and-curved-surfaces-mirrors.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Law of reflection: i = r on a plane mirror",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"120\" y1=\"160\" x2=\"520\" y2=\"160\" stroke=\"#374151\" stroke-width=\"4\"/>"
                         "<line x1=\"320\" y1=\"50\" x2=\"320\" y2=\"220\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<path d=\"M160 80 L 320 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M320 160 L 480 80\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"140\" y=\"70\" fill=\"#1d4ed8\">incident</text>"
                         "<text x=\"500\" y=\"70\" fill=\"#166534\">reflected</text>"
                         "<text x=\"320\" y=\"240\" fill=\"#6b7280\" font-size=\"12\">i = r; the normal bisects them</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/ray-optics/02-refraction-at-plane-surfaces-total-internal-reflection.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Optical fibre traps light by repeated TIR",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"110\" y=\"70\" width=\"420\" height=\"70\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<path d=\"M120 105 L 240 90 L 360 120 L 480 90 L 520 105\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                         "<text x=\"320\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">each bounce exceeds the critical angle: signal stays inside</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/ray-optics/03-refraction-through-prisms-angle-of-deviation-and-minimum-deviation.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Prism deviation geometry",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M320 50 L 210 190 L 430 190 Z\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M110 105 L 265 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M265 120 L 380 120\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M380 120 L 540 145\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">&#948; = (i&#8321;+i&#8322;) &#8722; A; minimum when the pass is symmetric</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/ray-optics/04-thin-lenses-lens-maker-s-formula-and-power-of-lens.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Thin lens: three principal rays build the image",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"320\" cy=\"130\" rx=\"14\" ry=\"85\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M160 170 L 310 170\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M330 170 L 500 110\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M160 170 L 320 170 L 500 170\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<circle cx=\"500\" cy=\"110\" r=\"5\" fill=\"#991b1b\"/>"
                         "<circle cx=\"500\" cy=\"170\" r=\"5\" fill=\"#991b1b\"/>"
                         "<text x=\"140\" y=\"195\" fill=\"#1d4ed8\">object</text>"
                         "<text x=\"530\" y=\"120\" fill=\"#991b1b\">image</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/ray-optics/05-combination-of-lenses-and-mirrors.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Two lenses in contact: 1/F = 1/f₁ + 1/f₂",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"290\" cy=\"110\" rx=\"14\" ry=\"70\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<ellipse cx=\"330\" cy=\"110\" rx=\"14\" ry=\"70\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                         "<path d=\"M120 140 L 275 140\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M345 140 L 520 110\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"320\" y=\"210\" fill=\"#374151\">powers add; equivalent focal length shortens</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/ray-optics/06-optical-instruments-microscope-and-telescope.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Compound microscope: objective then eyepiece",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"260\" cy=\"120\" rx=\"12\" ry=\"45\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<ellipse cx=\"400\" cy=\"120\" rx=\"12\" ry=\"35\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M160 160 L 250 160\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M275 140 L 390 120\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"200\" y=\"200\" fill=\"#1d4ed8\">objective (short f)</text>"
                         "<text x=\"420\" y=\"190\" fill=\"#a16207\">eyepiece (long f)</text>"
                         "<text x=\"320\" y=\"50\" fill=\"#374151\">M = m&#8320; &#215; m&#8342;</text>"
                         "</g></svg>"),
                }]},
    # ---------- wave optics ----------
    {"file": "class-12/physics/wave-optics/01-wavefront-and-huygens-principle.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Huygens: every point on a wavefront is a source",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"150\" y1=\"50\" x2=\"150\" y2=\"170\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                         "<g fill=\"#991b1b\">"
                         "<circle cx=\"150\" cy=\"70\" r=\"3\"/><circle cx=\"150\" cy=\"110\" r=\"3\"/><circle cx=\"150\" cy=\"150\" r=\"3\"/>"
                         "</g>"
                         "<g fill=\"none\" stroke=\"#a16207\" stroke-width=\"1.5\">"
                         "<path d=\"M150 70 A 40 40 0 0 1 190 110\"/>"
                         "<path d=\"M150 150 A 40 40 0 0 0 190 110\"/>"
                         "</g>"
                         "<line x1=\"250\" y1=\"50\" x2=\"250\" y2=\"170\" stroke=\"#166534\" stroke-width=\"3\"/>"
                         "<text x=\"320\" y=\"200\" fill=\"#6b7280\" font-size=\"12\">the new wavefront is the envelope of the secondary wavelets</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/wave-optics/02-interference-of-light-young-s-double-slit-experiment.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Young's double slit: bright and dark fringes",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"220\" y=\"50\" width=\"14\" height=\"160\" fill=\"#374151\"/>"
                         "<rect x=\"220\" y=\"110\" width=\"14\" height=\"20\" fill=\"#374151\"/>"
                         "<path d=\"M120 130 L 215 130\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<path d=\"M236 100 C 330 90, 420 100, 520 120\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M236 130 C 330 130, 420 130, 520 130\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<g fill=\"#991b1b\">"
                         "<rect x=\"560\" y=\"70\" width=\"8\" height=\"12\"/>"
                         "<rect x=\"560\" y=\"100\" width=\"8\" height=\"12\"/>"
                         "<rect x=\"560\" y=\"130\" width=\"8\" height=\"12\"/>"
                         "<rect x=\"560\" y=\"160\" width=\"8\" height=\"12\"/>"
                         "</g>"
                         "<text x=\"320\" y=\"235\" fill=\"#6b7280\" font-size=\"12\">&#946; = &#955;D/d: path difference decides bright or dark</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/wave-optics/03-diffraction-of-light-single-slit-diffraction.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Single-slit pattern: central maximum twice as wide",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"80\" y1=\"200\" x2=\"580\" y2=\"200\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M100 60 C 180 60, 260 60, 340 60 C 420 60, 500 60, 560 60\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M180 60 C 240 90, 320 95, 420 90 C 480 87, 520 80, 560 75\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<path d=\"M180 60 C 240 30, 320 25, 420 30 C 480 33, 520 40, 560 45\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<text x=\"320\" y=\"40\" fill=\"#1d4ed8\">central maximum</text>"
                         "<text x=\"470\" y=\"110\" fill=\"#a16207\">side maxima</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">&#952;</text>"
                         "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">minima at a sin&#952; = m&#955;</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/physics/wave-optics/04-polarization-brewster-s-law-and-polaroids.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Polaroid passes one E-direction only",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"240\" y=\"60\" width=\"20\" height=\"100\" fill=\"#9ca3af\"/>"
                         "<path d=\"M100 110 L 235 110\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M265 110 L 400 110\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M100 90 L 235 90\" stroke=\"#1d4ed8\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"170\" y=\"80\" fill=\"#1d4ed8\">unpolarised</text>"
                         "<text x=\"360\" y=\"95\" fill=\"#166534\">plane polarised</text>"
                         "<text x=\"320\" y=\"195\" fill=\"#6b7280\" font-size=\"12\">tan &#952;B = n: at Brewster&#8217;s angle the reflected ray is fully polarised</text>"
                         "</g></svg>"),
                }]},
]
