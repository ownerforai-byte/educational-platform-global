# Physics class-11 — dynamics + work-energy + elasticity full enrichment
PART_A = [
    {
        "file": "class-11/physics/dynamics/01-linear-momentum-and-impulse.json",
        "blocks": [
            {"after": "**Type 2 — alternate treatment:** this version emphasises the momentum",
             "md": ("### Deep dive: impulse as the bridge between force and momentum\n\nNewton's second law in its original form is $F = d\\vec{p}/dt$, not $F = m\\vec{a}$ — the two agree only when mass is constant. Integrating over the contact time gives the impulse–momentum theorem: $\\vec{J} = \\int F\\,dt = \\Delta\\vec{p}$. This is why airbags, crumple zones and bending knees all reduce injury: they stretch the stopping time $\\Delta t$, so the same momentum change $m\\Delta v$ is delivered by a smaller average force ($F_{avg} = \\Delta p/\\Delta t$). NEB favourite: a cricket player lowering his hands while catching — the ball's momentum change is fixed, but the longer contact time cuts the force. Impulse is also the area under a force–time graph, which is how variable-force problems are scored."),
             "table1": {"title": "Momentum vs impulse — parallel structure",
                        "headers": ["Property", "Momentum $\\vec{p}$", "Impulse $\\vec{J}$"],
                        "rows": [
                            ["Definition", "$\\vec{p} = m\\vec{v}$", "$\\vec{J} = \\vec{F}_{avg}\\,\\Delta t = \\int F\\,dt$"],
                            ["Nature", "vector", "vector (same direction as $\\Delta\\vec{p}$)"],
                            ["SI unit", "kg·m/s (= N·s)", "N·s (identical to momentum's unit)"],
                            ["Governing law", "$\\vec{F}_{net} = d\\vec{p}/dt$", "$\\vec{J} = \\Delta\\vec{p}$"],
                            ["Graph meaning", "slope of p–t graph = force", "area under F–t graph"],
                        ]},
             "table2": {"title": "Impulse in safety design — same Δp, different Δt",
                        "headers": ["Scenario", "Momentum change", "Time stretched by", "Effect on force"],
                        "rows": [
                            ["Airbag in a crash", "fixed by speed change", "soft bag adds ~0.1 s", "force drops several-fold"],
                            ["Crumple zone", "fixed", "car front folds", "peak force on cabin falls"],
                            ["Bending knees on landing", "fixed", "legs flex over ~0.3 s", "joints feel less force"],
                            ["Catching a ball with lowered hands", "fixed", "hands move back with ball", "palm sting reduced"],
                            ["Hard floor vs jumper's mat", "fixed", "mat compresses", "mat hurts less"],
                        ]},
             "svg": ("Impulse = area under the force-time curve = change in momentum",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M100 220 C 150 90, 300 90, 380 220\" fill=\"#eff6ff\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"240\" y=\"70\" fill=\"#1d4ed8\">F(t) during contact</text>"
                     "<text x=\"240\" y=\"245\" text-anchor=\"middle\" fill=\"#374151\">area = impulse J = &#916;p</text>"
                     "<text x=\"90\" y=\"55\" fill=\"#111827\">F</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">t</text>"
                     "<text x=\"500\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">wider, flatter bump</text>"
                     "<text x=\"500\" y=\"170\" fill=\"#6b7280\" font-size=\"12\">= smaller peak force</text>"
                     "</svg>"),
            },
            {"after": "**NEB exam focus:** define momentum and impulse with units; state and ",
             "svg": ("Airbag logic — stretch Δt, shrink Favg",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"80\" y=\"80\" width=\"200\" height=\"90\" rx=\"10\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"180\" y=\"110\" fill=\"#991b1b\">no airbag</text>"
                     "<text x=\"180\" y=\"135\" fill=\"#374151\" font-size=\"12\">&#916;t &#8776; 0.01 s</text>"
                     "<text x=\"180\" y=\"158\" fill=\"#374151\" font-size=\"12\">F huge &#8594; injury</text>"
                     "<rect x=\"360\" y=\"80\" width=\"200\" height=\"90\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"460\" y=\"110\" fill=\"#166534\">with airbag</text>"
                     "<text x=\"460\" y=\"135\" fill=\"#374151\" font-size=\"12\">&#916;t &#8776; 0.1 s</text>"
                     "<text x=\"460\" y=\"158\" fill=\"#374151\" font-size=\"12\">F = &#916;p/&#916;t smaller &#8594; safe</text>"
                     "</g>"
                     "<text x=\"320\" y=\"215\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"13\">same momentum change, longer time, smaller force</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/dynamics/05-solid-friction-laws-and-verifications.json",
        "blocks": [
            {"after": "**What friction is:** a contact force that opposes relative motion (or",
             "md": ("### Deep dive: the two-coefficient picture\n\nFriction is really two regimes separated by the point of slipping. While the surfaces are static, friction self-adjusts from 0 up to a ceiling $f_s \\le \\mu_s N$; the moment sliding starts it drops to the roughly constant kinetic value $f_k = \\mu_k N$, with $\\mu_k < \\mu_s$ — which is why a heavy crate jerks loose and then slides more easily. The classic laws (independent of apparent area, proportional to normal reaction) hold for dry, unlubricated surfaces; the area-independence is *apparent*-area only, because the real microscopic contact area grows in proportion to $N$. On an incline, slipping begins at $\\tan\\theta = \\mu_s$, giving a clean experimental route to $\\mu_s$ that NEB asks as a verification practical."),
             "table1": {"title": "Static vs kinetic friction",
                        "headers": ["Property", "Static friction", "Kinetic friction"],
                        "rows": [
                            ["Acts when", "no relative sliding", "surfaces sliding"],
                            ["Magnitude", "self-adjusting, $0 \\le f_s \\le \\mu_s N$", "nearly constant, $f_k = \\mu_k N$"],
                            ["Coefficient", "$\\mu_s$ (larger)", "$\\mu_k$ (smaller, $\\mu_k < \\mu_s$)"],
                            ["Direction", "opposes *impending* motion", "opposes actual sliding"],
                            ["On an incline", "slips when $\\tan\\theta > \\mu_s$", "$a = g(\\sin\\theta - \\mu_k\\cos\\theta)$"],
                        ]},
             "table2": {"title": "Laws of friction and their limits",
                        "headers": ["Law", "Statement", "Limit / caveat"],
                        "rows": [
                            ["Normal dependence", "$f \\propto N$", "holds for dry surfaces; fails under lubrication"],
                            ["Area independence", "f independent of apparent area", "true only for *apparent* area; real contact area &#8746; N"],
                            ["Speed independence", "$f_k$ roughly speed-independent", "only at moderate speeds"],
                            ["Material pair dependence", "&#956; depends on both surfaces", "rubber-on-road &#8776; 1; ice-on-ice &#8776; 0.05"],
                        ]},
             "svg": ("Friction vs applied force — rise, peak, drop to kinetic",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M100 220 L 240 100\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<path d=\"M240 100 L 280 130\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                     "<path d=\"M280 130 L 560 130\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<text x=\"150\" y=\"140\" fill=\"#1d4ed8\">static: f = applied</text>"
                     "<text x=\"240\" y=\"85\" text-anchor=\"middle\" fill=\"#991b1b\">peak &#956;sN</text>"
                     "<text x=\"420\" y=\"118\" fill=\"#166534\">kinetic: &#956;kN (constant)</text>"
                     "<text x=\"90\" y=\"55\" fill=\"#111827\">f</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">applied force</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">slip starts when applied force exceeds &#956;sN; friction then drops to &#956;kN</text>"
                     "</svg>"),
            },
            {"after": "**NEB exam focus:** distinguish static vs kinetic friction; solve slop",
             "svg": ("Incline verification — block slips when tanθ = μs",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<path d=\"M100 200 L 520 200 L 520 90 Z\" fill=\"#f3f4f6\" stroke=\"#6b7280\"/>"
                     "<rect x=\"300\" y=\"155\" width=\"60\" height=\"34\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"140\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">raise θ slowly</text>"
                     "<text x=\"420\" y=\"120\" fill=\"#374151\">slips when tan θ = &#956;s</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#374151\">mg sin θ (down slope) vs &#956;s mg cos θ (up slope)</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/work-energy-and-power/01-work-done-by-constant-and-variable-force.json",
        "blocks": [
            {"after": "**Definition of work (constant force):** $W = F s \\\\\\\\cos\\",
             "md": ("### Deep dive: work as the area under the F–s graph\n\nFor a constant force, $W = Fs\\cos\\theta$ is the whole story: the component of force *along* the displacement does the work, the perpendicular component does none. For a variable force the definition survives as an integral, $W = \\int F\\,ds$, which is exactly the area under the force–distance graph — the spring case ($F = kx$) giving the triangular area $\\frac{1}{2}kx^2$ is the canonical NEB example. The sign convention carries physics: positive work feeds energy into the body, negative work (friction, or lifting against gravity) drains it, and zero work means either $\\theta = 90°$ (uniform circular motion) or zero displacement (holding a load stationary)."),
             "table1": {"title": "Work: sign, size and special cases",
                        "headers": ["Case", "Angle θ", "Work", "Energy bookkeeping"],
                        "rows": [
                            ["Force aids motion", "0° &#8804; θ &lt; 90°", "positive", "kinetic energy rises"],
                            ["Force opposes motion", "90° &lt; θ &#8804; 180°", "negative", "energy drained (friction, braking)"],
                            ["Force &#8869; displacement", "θ = 90°", "zero", "uniform circular motion"],
                            ["No displacement", "s = 0", "zero", "holding a load still"],
                            ["Variable force", "&#8212;", "$W = &#8747;F&#8901;ds$", "area under F&#8211;s graph"],
                        ]},
             "table2": {"title": "Canonical work results worth memorising",
                        "headers": ["Situation", "Force law", "Work done"],
                        "rows": [
                            ["Constant force", "F constant", "$W = Fs\\cos\\theta$"],
                            ["Stretching a spring", "$F = kx$", "$W = \\frac{1}{2}kx^2$ (triangle under graph)"],
                            ["Lifting at constant speed", "$F = mg$ upward", "$W = mgh$ (stored as PE)"],
                            ["Friction over distance s", "$f = \\mu N$ opposing", "$W = -\\mu N s$ (heat)"],
                            ["Circular motion (centripetal)", "$F \\perp v$ always", "$W = 0$"],
                        ]},
             "svg": ("Work = area under the F-s graph — rectangle vs spring triangle",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"60\"/>"
                     "</g>"
                     "<rect x=\"110\" y=\"110\" width=\"180\" height=\"110\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"200\" y=\"95\" text-anchor=\"middle\" fill=\"#1d4ed8\">constant F: rectangle, W = Fs</text>"
                     "<path d=\"M360 220 L 540 100 L 540 220 Z\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<text x=\"450\" y=\"85\" text-anchor=\"middle\" fill=\"#166534\">spring F=kx: triangle, W = &#189;kx&#178;</text>"
                     "<text x=\"90\" y=\"55\" fill=\"#111827\">F</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">s</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">both areas are work; slope of the spring line is k</text>"
                     "</svg>"),
            },
            {"after": "**Example - work by external agent stretching a spring:** Slowly stret",
             "svg": ("Zero work in circular motion — force always ⊥ velocity",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"280\" cy=\"130\" r=\"70\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<circle cx=\"280\" cy=\"60\" r=\"6\" fill=\"#991b1b\"/>"
                     "<path d=\"M280 60 L 350 60\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                     "<path d=\"M350 60 L 336 53 L 336 67 Z\" fill=\"#166534\"/>"
                     "<path d=\"M280 60 L 280 130\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"370\" y=\"50\" fill=\"#166534\">v (tangent)</text>"
                     "<text x=\"300\" y=\"100\" fill=\"#a16207\">F (radial)</text>"
                     "<text x=\"490\" y=\"120\" fill=\"#374151\">F &#8869; v at every point</text>"
                     "<text x=\"490\" y=\"145\" fill=\"#991b1b\">W = Fs cos 90&#176; = 0</text>"
                     "<text x=\"490\" y=\"170\" fill=\"#6b7280\">speed stays constant</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/elasticity/03-elastic-modulus-young-bulk-shear.json",
        "blocks": [
            {"after": "**Young's modulus (E):** the ratio of longitudinal stress to longitudi",
             "md": ("### Deep dive: one modulus per way of deforming\n\nStress is always force per area, but *which* deformation you invite selects the modulus. Pull a wire along its length and strain is the fractional length change, giving Young's modulus $E = (F/A)/(\\Delta L/L)$. Squeeze a body from all sides and strain is the fractional volume change, giving bulk modulus $B = -p/(\\Delta V/V)$ — the minus sign records that pressure up means volume down. Twist or slide the shape and strain is the shear angle, giving shear modulus $\\eta$. Solids have all three; liquids have only $B$ (they flow under shear); gases have $B$ too but it depends on the process (isothermal vs adiabatic). NEB's favourite numericals: elongation of a wire under a hanging load and the compression of a liquid under pressure."),
             "table1": {"title": "The three moduli at a glance",
                        "headers": ["Modulus", "Stress", "Strain", "Typical SI magnitude"],
                        "rows": [
                            ["Young's $E$", "longitudinal (F/A)", "$\\Delta L/L$", "steel &#8776; 2&#215;10&#185;&#185; Pa"],
                            ["Bulk $B$", "volume (pressure p)", "$-\\Delta V/V$", "water &#8776; 2.2&#215;10&#8313; Pa"],
                            ["Shear $\\eta$", "tangential (F/A)", "shear angle θ", "steel &#8776; 8&#215;10&#185;&#176; Pa"],
                            ["Poisson ratio link", "lateral/longitudinal strain", "&#963; = 0.2&#8211;0.3 metals", "dimensionless"],
                        ]},
             "table2": {"title": "Which modulus for which situation",
                        "headers": ["Situation", "Modulus used", "Reason"],
                        "rows": [
                            ["Wire stretched by a load", "Young's E", "deformation along the length"],
                            ["Liquid compressed in a cylinder", "Bulk B", "volume change under pressure"],
                            ["Girder twisted by a couple", "Shear η", "shape change, volume constant"],
                            ["Rubber band pulled", "Young's E (low)", "large strain for small stress"],
                            ["Squashing a solid block", "Bulk B", "pressure from all sides"],
                        ]},
             "svg": ("Three deformations, three moduli",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"90\" y=\"80\" width=\"40\" height=\"100\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"95\" y=\"60\" width=\"30\" height=\"100\" fill=\"none\" stroke=\"#1d4ed8\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"110\" y=\"210\" fill=\"#1d4ed8\">stretch &#8594; E</text>"
                     "<rect x=\"280\" y=\"90\" width=\"80\" height=\"80\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                     "<rect x=\"290\" y=\"100\" width=\"60\" height=\"60\" fill=\"none\" stroke=\"#166534\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"320\" y=\"210\" fill=\"#166534\">squeeze &#8594; B</text>"
                     "<rect x=\"470\" y=\"90\" width=\"80\" height=\"80\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<path d=\"M470 170 L 480 178 L 550 178 L 540 170\" fill=\"none\" stroke=\"#a16207\" stroke-dasharray=\"4 3\"/>"
                     "<text x=\"510\" y=\"210\" fill=\"#a16207\">shear &#8594; η</text>"
                     "</g>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">stress/strain in each mode defines that modulus</text>"
                     "</svg>"),
            },
            {"after": "**Which modulus to use?** stretching a wire → Young's modulus; squeezi",
             "svg": ("Stress-strain curve — elastic region, yield, fracture",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"80\" y1=\"220\" x2=\"580\" y2=\"220\"/>"
                     "<line x1=\"80\" y1=\"220\" x2=\"80\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M100 220 L 200 120 L 300 90 L 400 80 L 480 130 L 520 200\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                     "<text x=\"150\" y=\"110\" fill=\"#166534\">elastic (Hooke obeys)</text>"
                     "<text x=\"380\" y=\"65\" fill=\"#a16207\">plastic</text>"
                     "<text x=\"530\" y=\"225\" fill=\"#991b1b\">fracture</text>"
                     "<text x=\"90\" y=\"55\" fill=\"#111827\">stress</text>"
                     "<text x=\"590\" y=\"240\" fill=\"#111827\">strain</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\">slope of the straight part = Young's modulus</text>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
