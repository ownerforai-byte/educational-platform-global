# Physics class-11 — gravitation full enrichment (7 files)
PART_A = [
    {
        "file": "class-11/physics/gravitation/02-gravitational-field-strength.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: gravity as a field, not a contact push\n\nThe field concept lets gravity act across empty space: at every point around a mass, the field strength $g = GM/r^2$ assigns the acceleration a unit mass would feel there. Two structural facts follow. First, $g$ falls as $1/r^2$ — doubling the distance from Earth's centre quarters the field. Second, the field is a *vector* field, so fields from several masses add by vector superposition, which is exactly how the net field at the Earth–Moon L1 point can be zero. Near the surface $g \\approx 9.8$ N/kg barely changes over a few kilometres, which is why projectile problems may treat it as uniform while satellite problems may not."),
             "table1": {"title": "Field strength g — how it varies",
                        "headers": ["Location", "Distance from centre", "g value", "Comment"],
                        "rows": [
                            ["Earth's surface", "$r = R$", "&#8776; 9.8 N/kg", "standard value"],
                            ["Height h above surface", "$r = R + h$", "$g' = gR&#178;/(R+h)&#178;$", "falls as 1/r&#178;"],
                            ["At 2R from centre", "doubled", "g/4", "inverse-square check"],
                            ["At depth d", "$r = R - d$", "$g' = g(1 - d/R)$", "linear fall, zero at centre"],
                            ["Earth's centre", "r = 0", "0", "shell theorem: outside layers cancel"],
                        ]},
             "table2": {"title": "Field language NEB expects",
                        "headers": ["Term", "Definition", "Unit"],
                        "rows": [
                            ["Gravitational field strength", "force per unit test mass", "N/kg (= m/s&#178;)"],
                            ["Field line", "path a test mass would follow", "&#8212;"],
                            ["Superposition", "$\\vec{g}_{net} = \\sum \\vec{g}_i$", "vector sum"],
                            ["Point of zero field", "fields from two masses cancel", "between Earth and Moon, closer to Moon"],
                            ["Uniform field", "same g everywhere", "valid only over small height ranges"],
                        ]},
             "svg": ("Field lines around Earth — density falls as 1/r²",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"55\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"155\" text-anchor=\"middle\" fill=\"#1d4ed8\">Earth</text>"
                     "<g stroke=\"#6b7280\" stroke-width=\"1.5\" fill=\"none\">"
                     "<path d=\"M320 85 L 320 30\"/><path d=\"M320 215 L 320 270\"/>"
                     "<path d=\"M255 150 L 200 150\"/><path d=\"M385 150 L 440 150\"/>"
                     "<path d=\"M270 105 L 220 65\"/><path d=\"M370 105 L 420 65\"/>"
                     "<path d=\"M270 195 L 220 235\"/><path d=\"M370 195 L 420 235\"/>"
                     "</g>"
                     "<text x=\"470\" y=\"120\" fill=\"#374151\">g = GM/r&#178;</text>"
                     "<text x=\"470\" y=\"145\" fill=\"#374151\">denser lines = stronger field</text>"
                     "<text x=\"470\" y=\"170\" fill=\"#6b7280\">falls off as 1/r&#178;</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Zero-field point between Earth and Moon",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<circle cx=\"150\" cy=\"110\" r=\"34\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"150\" y=\"115\" text-anchor=\"middle\" fill=\"#1d4ed8\">Earth</text>"
                     "<circle cx=\"530\" cy=\"110\" r=\"14\" fill=\"#f3f4f6\" stroke=\"#6b7280\"/>"
                     "<text x=\"530\" y=\"160\" text-anchor=\"middle\" fill=\"#6b7280\">Moon</text>"
                     "<circle cx=\"440\" cy=\"110\" r=\"6\" fill=\"#991b1b\"/>"
                     "<text x=\"440\" y=\"90\" text-anchor=\"middle\" fill=\"#991b1b\">g = 0 here</text>"
                     "<text x=\"320\" y=\"210\" text-anchor=\"middle\" fill=\"#374151\">closer to the Moon because Earth's field is stronger</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/gravitation/03-gravitational-potential-and-potential-energy.json",
        "blocks": [
            {"after": "**Gravitational potential V:** the work done per unit mass i",
             "md": ("### Deep dive: why gravitational potential is negative\n\nPotential is defined *relative to infinity*, where it is taken as zero. Since gravity attracts, bringing a unit mass from infinity toward a mass M means the field does positive work on it — so the stored (potential) energy must fall below zero: $V = -GM/r$. The negative sign is not a convention quirk; it encodes that a bound system has less energy than a free one, and that energy $+GMm/r$ must be *supplied* to escape (the escape-energy idea). Potential energy of a pair is $U = -GMm/r$, and near the surface this reduces to the familiar $mgh$ because $GM/r^2 = g$ there. NEB loves asking for the *total* energy of an orbiting satellite: $E = -GMm/2r$, half the potential energy."),
             "table1": {"title": "Potential vs potential energy vs field",
                        "headers": ["Quantity", "Formula", "Unit", "Meaning"],
                        "rows": [
                            ["Field strength g", "$GM/r&#178;$", "N/kg", "force per unit mass"],
                            ["Potential V", "$-GM/r$", "J/kg", "work per unit mass from infinity"],
                            ["Potential energy U", "$-GMm/r$", "J", "energy of the mass M + m pair"],
                            ["Near-surface limit", "$U \\approx mgh$", "J", "g constant over small h"],
                            ["Orbit total energy", "$-GMm/2r$", "J", "half the potential energy"],
                        ]},
             "table2": {"title": "Escape and binding — the negative-energy picture",
                        "headers": ["Situation", "Total energy", "Bound?"],
                        "rows": [
                            ["Body at rest at infinity", "0", "marginally free"],
                            ["Satellite in circular orbit", "$-GMm/2r$ &lt; 0", "bound"],
                            ["Body at escape speed", "0", "just escapes"],
                            ["Body slower than escape speed", "&lt; 0", "falls back"],
                            ["Energy to escape from orbit r", "$+GMm/2r$ must be added", "&#8212;"],
                        ]},
             "svg": ("Potential well — V = -GM/r deepens toward the mass",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<path d=\"M60 80 C 180 80, 220 240, 320 240 C 420 240, 460 80, 580 80\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<circle cx=\"320\" cy=\"240\" r=\"12\" fill=\"#991b1b\"/>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#991b1b\">mass M</text>"
                     "<text x=\"110\" y=\"65\" fill=\"#374151\">V = 0 at infinity</text>"
                     "<text x=\"320\" y=\"225\" text-anchor=\"middle\" fill=\"#166534\">V = &#8722;GM/r (deepest at surface)</text>"
                     "<text x=\"320\" y=\"40\" text-anchor=\"middle\" fill=\"#6b7280\">potential well: energy +GMm/r needed to climb out</text>"
                     "</svg>"),
            },
            {"after": "**Superposition:** for multiple masses, $V = \\sum\\left(-\\fra",
             "svg": ("Equipotential spheres — concentric around the mass",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g fill=\"none\" stroke-width=\"2\">"
                     "<circle cx=\"320\" cy=\"140\" r=\"30\" stroke=\"#991b1b\"/>"
                     "<circle cx=\"320\" cy=\"140\" r=\"60\" stroke=\"#a16207\"/>"
                     "<circle cx=\"320\" cy=\"140\" r=\"95\" stroke=\"#166534\"/>"
                     "<circle cx=\"320\" cy=\"140\" r=\"130\" stroke=\"#1d4ed8\"/>"
                     "</g>"
                     "<circle cx=\"320\" cy=\"140\" r=\"8\" fill=\"#111827\"/>"
                     "<text x=\"320\" y=\"180\" text-anchor=\"middle\" fill=\"#374151\">closer sphere = more negative V</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">no work is done moving a mass along an equipotential surface</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/gravitation/04-variation-of-g-due-to-altitude-and-depth.json",
        "blocks": [
            {"after": "**g above the surface (altitude):** at height h above Earth'",
             "md": ("### Deep dive: two different curves — one inverse-square, one linear\n\nAbove the surface the whole mass acts from the centre, so $g' = gR^2/(R+h)^2$ — an inverse-square fall that starts slow (only ~1% down at 32 km) but collapses rapidly far out. Below the surface the shell theorem takes over: shells outside your radius exert *zero* net force, so only the mass inside your radius counts and $g' = g(1 - d/R)$ — a straight-line decrease to zero at the centre. The two curves meet smoothly at the surface with the same slope, giving the classic V-shape NEB asks you to sketch: $g$ maximum at the surface, falling both up and down. (Earth's rotation lowers the *measured* $g$ slightly at the equator, but that is a separate effect.)"),
             "table1": {"title": "g above vs below the surface",
                        "headers": ["Position", "Formula", "Behaviour", "Example"],
                        "rows": [
                            ["Height h", "$g' = gR&#178;/(R+h)&#178;$", "inverse-square fall", "h = R &#8594; g/4"],
                            ["Height h &#8810; R", "$g' \\approx g(1 - 2h/R)$", "nearly linear for small h", "h = 32 km &#8594; ~1% loss"],
                            ["Depth d", "$g' = g(1 - d/R)$", "linear fall", "d = R/2 &#8594; g/2"],
                            ["Centre of Earth", "g = 0", "all shells cancel", "weightless at the centre"],
                            ["Both curves meet", "g = 9.8 at surface", "same slope there", "V-shape sketch"],
                        ]},
             "table2": {"title": "NEB numerical patterns",
                        "headers": ["Asked quantity", "Set up", "Answer shape"],
                        "rows": [
                            ["h where g halves", "$R&#178;/(R+h)&#178; = 1/2$", "$h = R(\\sqrt{2} - 1)$"],
                            ["d where g halves", "$1 - d/R = 1/2$", "$d = R/2$"],
                            ["Ratio g(h)/g(d) equal", "equate both formulas", "h and d relate via R"],
                            ["g at 2R from centre", "g/4", "inverse-square"],
                            ["Weight at depth d", "$W' = W(1 - d/R)$", "linear in d"],
                        ]},
             "svg": ("g vs distance — falls linearly inside, inverse-square outside",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"50\"/>"
                     "</g>"
                     "<line x1=\"320\" y1=\"220\" x2=\"320\" y2=\"60\" stroke=\"#9ca3af\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>"
                     "<path d=\"M100 220 L 320 90\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M320 90 C 380 130, 460 180, 560 205\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"180\" y=\"150\" fill=\"#166534\">inside: linear</text>"
                     "<text x=\"440\" y=\"150\" fill=\"#1d4ed8\">outside: 1/r&#178;</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#374151\">surface: g maximum = 9.8</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">depth d on the left, height h on the right</text>"
                     "</svg>"),
            },
            {"after": "**Altitude formula for satellites:** for an orbit at height ",
             "svg": ("Same percentage loss — altitude vs depth are not symmetric",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"80\" y=\"70\" width=\"220\" height=\"100\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"190\" y=\"100\" fill=\"#1d4ed8\">go UP by h = R/2</text>"
                     "<text x=\"190\" y=\"125\" fill=\"#374151\" font-size=\"12\">g' = g/(1.5)&#178; = 0.44g</text>"
                     "<text x=\"190\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">inverse-square bites hard</text>"
                     "<rect x=\"340\" y=\"70\" width=\"220\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"450\" y=\"100\" fill=\"#166534\">go DOWN by d = R/2</text>"
                     "<text x=\"450\" y=\"125\" fill=\"#374151\" font-size=\"12\">g' = g(1 &#8722; 0.5) = 0.5g</text>"
                     "<text x=\"450\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">linear, gentler</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">same distance, different loss — the two laws differ</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/gravitation/05-centre-of-mass-and-centre-of-gravity.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: one point that behaves like the whole body\n\nThe centre of mass is the mass-weighted average position, $\\vec{r}_{cm} = \\sum m_i\\vec{r}_i/\\sum m_i$ — the single point whose motion obeys $\\vec{F}_{net} = M\\vec{a}_{cm}$ exactly, no matter how the body spins or deforms. The centre of gravity is where the *weight* resultant acts; in a uniform field the two coincide, which is why introductory physics uses them interchangeably. In a non-uniform field (a very tall rocket) they separate slightly. The practical power: a body balanced at its centre of mass stays balanced, and for a symmetric body the centre of mass sits on the symmetry axis — half-way for a rod, two-thirds along a triangle's median, at the geometric centre for a uniform disc."),
             "table1": {"title": "Centre of mass vs centre of gravity",
                        "headers": ["Aspect", "Centre of mass", "Centre of gravity"],
                        "rows": [
                            ["Definition", "mass-weighted average position", "point where weight resultant acts"],
                            ["Depends on", "mass distribution only", "mass distribution + field"],
                            ["Uniform field", "coincide", "coincide"],
                            ["Non-uniform field", "unchanged", "shifts slightly"],
                            ["Use in problems", "$F = Ma_{cm}$, collisions", "stability, balancing, torque of weight"],
                        ]},
             "table2": {"title": "Centre of mass of standard bodies",
                        "headers": ["Body (uniform)", "Centre of mass location", "Note"],
                        "rows": [
                            ["Rod", "midpoint", "on the axis"],
                            ["Triangle (lamina)", "intersection of medians", "1/3 from each side's midpoint"],
                            ["Disc / sphere", "geometric centre", "symmetry"],
                            ["Two masses m, 2m", "2/3 of the way to the 2m mass", "closer to heavier mass"],
                            ["L-shaped / composite", "split into parts, weight and average", "no shortcut — compute"],
                        ]},
             "svg": ("Centre of mass of two masses — closer to the heavier one",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<line x1=\"120\" y1=\"120\" x2=\"520\" y2=\"120\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                     "<circle cx=\"120\" cy=\"120\" r=\"14\" fill=\"#1d4ed8\"/>"
                     "<text x=\"120\" y=\"160\" text-anchor=\"middle\" fill=\"#1d4ed8\">m</text>"
                     "<circle cx=\"520\" cy=\"120\" r=\"20\" fill=\"#991b1b\"/>"
                     "<text x=\"520\" y=\"165\" text-anchor=\"middle\" fill=\"#991b1b\">2m</text>"
                     "<circle cx=\"387\" cy=\"120\" r=\"7\" fill=\"#a16207\"/>"
                     "<text x=\"387\" y=\"100\" text-anchor=\"middle\" fill=\"#a16207\">CM</text>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#374151\">CM divides the line in inverse ratio of masses (1:2)</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Stability — the plumb line from CM must fall inside the base",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M180 200 L 280 200 L 265 90 L 195 90 Z\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<circle cx=\"230\" cy=\"130\" r=\"6\" fill=\"#a16207\"/>"
                     "<path d=\"M230 130 L 230 200\" stroke=\"#a16207\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"230\" y=\"235\" fill=\"#166534\">stable: line inside base</text>"
                     "<path d=\"M420 200 L 520 200 L 505 90 L 435 90 Z\" fill=\"#fef2f2\" stroke=\"#991b1b\" transform=\"rotate(9 470 200)\"/>"
                     "<circle cx=\"470\" cy=\"130\" r=\"6\" fill=\"#a16207\"/>"
                     "<path d=\"M470 130 L 470 215\" stroke=\"#a16207\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"470\" y=\"245\" fill=\"#991b1b\">tips: line outside base</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/gravitation/06-motion-of-a-satellite-orbital-velocity-and-time-period.json",
        "blocks": [
            {"after": "**Orbital velocity (v₀):** a satellite stays in a circular o",
             "md": ("### Deep dive: gravity supplies exactly the centripetal force\n\nA circular orbit is a permanent state of free fall: gravity $GMm/r^2$ plays the role of the centripetal force $mv^2/r$, and setting them equal gives $v_0 = \\sqrt{GM/r}$ — orbital speed *falls* with orbit radius. Three consequences NEB recycles constantly. Kinetic energy $= GMm/2r$, potential energy $= -GMm/r$, total energy $= -GMm/2r$; the period obeys Kepler's third law, $T^2 \\propto r^3$; and the escape speed $\\sqrt{2GM/r}$ is exactly $\\sqrt{2}$ times the orbital speed at the same radius. Close to the surface ($r \\approx R$) this gives $v_0 \\approx 7.9$ km/s and $T \\approx 84$ minutes — the theoretical minimum period."),
             "table1": {"title": "Circular-orbit formula set",
                        "headers": ["Quantity", "Formula", "Near-surface value"],
                        "rows": [
                            ["Orbital speed", "$v_0 = \\sqrt{GM/r}$", "&#8776; 7.9 km/s"],
                            ["Time period", "$T = 2\\pi\\sqrt{r&#179;/GM}$", "&#8776; 84 min"],
                            ["Kinetic energy", "$GMm/2r$", "&#8212;"],
                            ["Potential energy", "$-GMm/r$", "&#8212;"],
                            ["Total energy", "$-GMm/2r$", "negative = bound"],
                            ["Escape speed", "$\\sqrt{2GM/r} = \\sqrt{2}\\,v_0$", "&#8776; 11.2 km/s"],
                        ]},
             "table2": {"title": "Kepler's third law in orbit problems",
                        "headers": ["Orbit radius", "Relative period", "Relative speed"],
                        "rows": [
                            ["r", "T", "v"],
                            ["2r", "$2^{3/2}T \\approx 2.83T$", "$v/\\sqrt{2}$"],
                            ["4r", "$8T$", "$v/2$"],
                            ["9r", "$27T$", "$v/3$"],
                            ["Rule", "$T^2 \\propto r^3$", "$v \\propto 1/\\sqrt{r}$"],
                        ]},
             "svg": ("Satellite in circular orbit — gravity as centripetal force",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<circle cx=\"280\" cy=\"150\" r=\"55\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"280\" y=\"155\" text-anchor=\"middle\" fill=\"#1d4ed8\">Earth</text>"
                     "<circle cx=\"280\" cy=\"150\" r=\"110\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                     "<circle cx=\"280\" cy=\"40\" r=\"8\" fill=\"#991b1b\"/>"
                     "<path d=\"M280 40 L 360 40\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M360 40 L 346 33 L 346 47 Z\" fill=\"#166534\"/>"
                     "<path d=\"M280 48 L 280 95\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"380\" y=\"35\" fill=\"#166534\">v&#8320; (tangent)</text>"
                     "<text x=\"300\" y=\"80\" fill=\"#a16207\">F = GMm/r&#178;</text>"
                     "<text x=\"320\" y=\"285\" text-anchor=\"middle\" fill=\"#374151\">v&#8320; = &#8730;(GM/r), T&#178; &#8746; r&#179; — gravity *is* the centripetal force</text>"
                     "</svg>"),
            },
            {"after": "**Orbit changes:** to transfer between circular orbits, a Ho",
             "svg": ("Total orbital energy is negative — binding energy",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"220\" height=\"100\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"180\" y=\"100\" fill=\"#1d4ed8\">KE = +GMm/2r</text>"
                     "<text x=\"180\" y=\"125\" fill=\"#374151\" font-size=\"12\">PE = &#8722;GMm/r</text>"
                     "<text x=\"180\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">E = &#8722;GMm/2r (bound)</text>"
                     "<rect x=\"350\" y=\"70\" width=\"220\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"460\" y=\"100\" fill=\"#166534\">to escape</text>"
                     "<text x=\"460\" y=\"125\" fill=\"#374151\" font-size=\"12\">add +GMm/2r</text>"
                     "<text x=\"460\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">E = 0 &#8594; free</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">binding energy = |E| = GMm/2r</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/gravitation/09-geostationary-satellite.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: the three conditions, and why the height is fixed\n\nA geostationary satellite must (1) orbit directly above the equator, (2) revolve west-to-east, the same direction as Earth's rotation, and (3) have a period of exactly one sidereal day (23 h 56 min 4 s). Kepler's third law then leaves no freedom: $T = 24$ h fixes $r \\approx 42,400$ km from the centre, i.e. about 35,800 km above the surface — which is why every TV satellite sits at the same altitude. At that height $g \\approx 0.22$ m/s², just enough to curve the satellite's path around Earth. The practical payoff is a satellite that appears *stationary* in the sky, so fixed dish antennas work."),
             "table1": {"title": "Geostationary conditions and numbers",
                        "headers": ["Requirement", "Value", "Why"],
                        "rows": [
                            ["Orbital plane", "equatorial", "stays over one longitude"],
                            ["Direction", "west &#8594; east", "matches Earth's spin"],
                            ["Period", "23 h 56 min 4 s", "one sidereal day"],
                            ["Orbit radius", "&#8776; 42,400 km", "from Kepler's third law"],
                            ["Height above surface", "&#8776; 35,800 km", "r &#8722; R"],
                            ["Orbital speed", "&#8776; 3.1 km/s", "v = 2&#960;r/T"],
                        ]},
             "table2": {"title": "Geostationary vs low-orbit satellites",
                        "headers": ["Property", "Geostationary", "Low Earth orbit (e.g. ISS)"],
                        "rows": [
                            ["Height", "&#8776; 35,800 km", "&#8776; 400 km"],
                            ["Period", "24 h", "&#8776; 90 min"],
                            ["Appears", "fixed in the sky", "crosses overhead every ~90 min"],
                            ["Uses", "TV, weather, communication", "ISS, imaging, GPS (~20,200 km MEO)"],
                            ["Signal delay", "&#8776; 0.24 s round trip", "a few ms"],
                        ]},
             "svg": ("Geostationary belt — satellites fixed over the equator",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<circle cx=\"320\" cy=\"150\" r=\"50\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"320\" y=\"155\" text-anchor=\"middle\" fill=\"#1d4ed8\">Earth</text>"
                     "<circle cx=\"320\" cy=\"150\" r=\"115\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"6 4\"/>"
                     "<circle cx=\"435\" cy=\"150\" r=\"6\" fill=\"#991b1b\"/>"
                     "<circle cx=\"320\" cy=\"35\" r=\"6\" fill=\"#991b1b\"/>"
                     "<circle cx=\"205\" cy=\"150\" r=\"6\" fill=\"#991b1b\"/>"
                     "<text x=\"470\" y=\"130\" fill=\"#991b1b\">fixed spots</text>"
                     "<text x=\"320\" y=\"290\" text-anchor=\"middle\" fill=\"#374151\">r &#8776; 42,400 km, T = 24 h, above the equator only</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Why the orbit must be equatorial — a tilted track drifts",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"180\" cy=\"130\" r=\"45\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<ellipse cx=\"180\" cy=\"130\" rx=\"100\" ry=\"20\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                     "<text x=\"180\" y=\"185\" fill=\"#166534\">equatorial: stays put</text>"
                     "<circle cx=\"460\" cy=\"130\" r=\"45\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<ellipse cx=\"460\" cy=\"130\" rx=\"100\" ry=\"20\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2\" transform=\"rotate(-25 460 130)\"/>"
                     "<text x=\"460\" y=\"185\" fill=\"#991b1b\">tilted: drifts N-S daily</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/gravitation/09-gps.json",
        "blocks": [
            {"after": "**What GPS is:** the Global Positioning System is a satellit",
             "md": ("### Deep dive: trilateration, four clocks and relativistic corrections\n\nGPS fixes a position by *trilateration*, not triangulation: each satellite broadcasts its position plus an atomic-clock timestamp; the receiver multiplies the signal delay by c to get a distance 'sphere', and three spheres intersect at one point. A fourth satellite is needed because a cheap receiver clock is not synchronised with the atomic clocks — solving for the clock offset removes it. Two relativistic effects then matter at the level of nanoseconds: special relativity slows the satellite clocks by ~7 μs/day (orbital speed), while general relativity speeds them up by ~45 μs/day (weaker gravity at 20,200 km). The net +38 μs/day would cause ~10 km of error per day if uncorrected — the cleanest everyday proof that both relativities are real."),
             "table1": {"title": "How a GPS fix is built",
                        "headers": ["Step", "What happens", "What it yields"],
                        "rows": [
                            ["1. Broadcast", "satellite sends position + clock time", "known signal origin"],
                            ["2. Delay", "receiver measures travel time", "pseudorange = c&#215;t"],
                            ["3. Trilaterate", "3 spheres intersect", "latitude, longitude, altitude"],
                            ["4. Fourth satellite", "solves receiver clock offset", "accurate 3-D fix + time"],
                        ]},
             "table2": {"title": "GPS numbers and the relativity budget",
                        "headers": ["Item", "Value", "Effect if ignored"],
                        "rows": [
                            ["Orbit height", "&#8776; 20,200 km (MEO)", "&#8212;"],
                            ["Period", "&#8776; 12 h", "&#8212;"],
                            ["Satellites visible", "&#8805; 4 at any time", "no unique fix"],
                            ["Special relativity", "&#8722;7 &#956;s/day (clocks slow)", "position error grows"],
                            ["General relativity", "+45 &#956;s/day (clocks fast)", "&#8212;"],
                            ["Net", "+38 &#956;s/day", "&#8776; 10 km/day error"],
                        ]},
             "svg": ("GPS trilateration — three spheres, one point",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g fill=\"none\" stroke-width=\"1.5\">"
                     "<circle cx=\"200\" cy=\"80\" r=\"60\" stroke=\"#1d4ed8\" stroke-dasharray=\"5 4\"/>"
                     "<circle cx=\"440\" cy=\"80\" r=\"70\" stroke=\"#166534\" stroke-dasharray=\"5 4\"/>"
                     "<circle cx=\"320\" cy=\"200\" r=\"80\" stroke=\"#a16207\" stroke-dasharray=\"5 4\"/>"
                     "</g>"
                     "<circle cx=\"200\" cy=\"80\" r=\"6\" fill=\"#1d4ed8\"/>"
                     "<circle cx=\"440\" cy=\"80\" r=\"6\" fill=\"#166534\"/>"
                     "<circle cx=\"320\" cy=\"200\" r=\"6\" fill=\"#a16207\"/>"
                     "<circle cx=\"330\" cy=\"130\" r=\"8\" fill=\"#991b1b\"/>"
                     "<text x=\"330\" y=\"160\" text-anchor=\"middle\" fill=\"#991b1b\">you</text>"
                     "<text x=\"200\" y=\"60\" text-anchor=\"middle\" fill=\"#1d4ed8\">SAT 1</text>"
                     "<text x=\"440\" y=\"60\" text-anchor=\"middle\" fill=\"#166534\">SAT 2</text>"
                     "<text x=\"320\" y=\"235\" text-anchor=\"middle\" fill=\"#a16207\">SAT 3</text>"
                     "<text x=\"320\" y=\"268\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">4th satellite removes the receiver's clock error</text>"
                     "</svg>"),
            },
            {"after": "**Applications:** navigation (cars, ships, aircraft), mappin",
             "svg": ("Why GPS clocks tick differently — speed vs altitude",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"70\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"185\" y=\"100\" fill=\"#991b1b\">special relativity</text>"
                     "<text x=\"185\" y=\"125\" fill=\"#374151\" font-size=\"12\">orbital speed &#8594; clock slow</text>"
                     "<text x=\"185\" y=\"150\" fill=\"#374151\" font-size=\"12\">&#8722;7 &#956;s/day</text>"
                     "<rect x=\"340\" y=\"70\" width=\"230\" height=\"100\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"455\" y=\"100\" fill=\"#166534\">general relativity</text>"
                     "<text x=\"455\" y=\"125\" fill=\"#374151\" font-size=\"12\">weaker gravity &#8594; clock fast</text>"
                     "<text x=\"455\" y=\"150\" fill=\"#374151\" font-size=\"12\">+45 &#956;s/day</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">net +38 &#956;s/day must be pre-corrected or positions drift ~10 km/day</text>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
