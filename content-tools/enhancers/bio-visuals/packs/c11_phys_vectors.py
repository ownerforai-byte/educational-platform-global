# Physics class-11 — vectors full enrichment (5 files: md + 2 tables + 1 svg each)
PART_A = [
    {
        "file": "class-11/physics/vectors/04-law-of-parallelogram-of-vectors.json",
        "blocks": [
            {"after": "**Statement**: If two vectors acting at a point are represen",
             "md": ("### Deep dive: why the parallelogram law is the addition law\n\nThe parallelogram law is not a separate rule to memorise — it is the *definition* of vector addition made geometric. Placing $\\vec{P}$ and $\\vec{Q}$ tail-to-tail and completing the parallelogram forces the diagonal to carry both magnitudes and directions simultaneously, which is exactly what a physical resultant must do. Two forces of 3 N and 4 N acting at 90° give $R = \\sqrt{3^2 + 4^2} = 5$ N — the diagonal of a 3-by-4 rectangle. The same law then predicts every intermediate angle: at 0° the resultant is $P + Q$ (maximum), at 180° it is $|P - Q|$ (minimum), and the resultant always lies between these extremes. NEB papers love the special case $P = Q$ at angle $\\theta$: then $R = 2P\\cos(\\theta/2)$ and the resultant bisects the angle between them — a result worth memorising because it recurs in equilibrium and relative-velocity questions."),
             "table1": {"title": "Resultant magnitude and direction — special angles",
                        "headers": ["Angle between P and Q", "Resultant R", "Direction of R"],
                        "rows": [
                            ["0° (same direction)", "$R = P + Q$ (maximum)", "along P and Q"],
                            ["90° (perpendicular)", "$R = \\sqrt{P^2 + Q^2}$", "$\\tan\\alpha = Q/P$ with P"],
                            ["180° (opposite)", "$R = |P - Q|$ (minimum)", "along the larger vector"],
                            ["120° with P = Q", "$R = P$ (equilateral case)", "bisects the angle"],
                            ["General angle θ", "$R = \\sqrt{P^2 + Q^2 + 2PQ\\cos\\theta}$", "$\\tan\\alpha = \\dfrac{Q\\sin\\theta}{P + Q\\cos\\theta}$"],
                        ]},
             "table2": {"title": "Common NEB traps with the parallelogram law",
                        "headers": ["Trap", "Why it is wrong", "Correct approach"],
                        "rows": [
                            ["Adding magnitudes directly", "vectors carry direction; 3 N + 4 N is not always 7 N", "use $R = \\sqrt{P^2+Q^2+2PQ\\cos\\theta}$"],
                            ["Ignoring the angle unit", "cos(30 rad) ≠ cos(30°)", "keep the calculator in degree mode for NEB"],
                            ["Using the wrong diagonal", "the diagonal of the *other* parallelogram gives $\\vec{P} - \\vec{Q}$", "resultant = diagonal through the common tail"],
                            ["Assuming R bisects the angle", "only true when P = Q", "use $\\tan\\alpha = Q\\sin\\theta/(P+Q\\cos\\theta)$"],
                        ]},
             "svg": ("Parallelogram law — P and Q from a common tail, resultant diagonal",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#374151\" stroke-width=\"2\" fill=\"none\">"
                     "<path d=\"M120 200 L 320 200\"/>"
                     "<path d=\"M120 200 L 220 90\"/>"
                     "<path d=\"M320 200 L 420 90\"/>"
                     "<path d=\"M220 90 L 420 90\"/>"
                     "</g>"
                     "<path d=\"M120 200 L 420 90\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M420 90 L 400 102 L 404 84 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"225\" y=\"225\" fill=\"#1d4ed8\">P</text>"
                     "<text x=\"150\" y=\"140\" fill=\"#166534\">Q</text>"
                     "<text x=\"290\" y=\"130\" fill=\"#991b1b\">R (resultant)</text>"
                     "<text x=\"135\" y=\"220\" fill=\"#6b7280\" font-size=\"12\">θ</text>"
                     "<text x=\"320\" y=\"260\" text-anchor=\"middle\" fill=\"#374151\">R = &#8730;(P&#178; + Q&#178; + 2PQ cos θ), diagonal through the common tail</text>"
                     "</svg>"),
            },
            {"after": "**Polygon of velocities**: just as force polygons check equi",
             "svg": ("Triangle law as the two-vector special case of the polygon law",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#374151\" stroke-width=\"2\" fill=\"none\">"
                     "<path d=\"M150 180 L 300 180\"/>"
                     "<path d=\"M300 180 L 370 90\"/>"
                     "</g>"
                     "<path d=\"M150 180 L 370 90\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M370 90 L 352 100 L 360 82 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"225\" y=\"200\" fill=\"#1d4ed8\">P (head to tail)</text>"
                     "<text x=\"350\" y=\"150\" fill=\"#166534\">Q</text>"
                     "<text x=\"240\" y=\"125\" fill=\"#991b1b\">R closes the triangle</text>"
                     "<text x=\"320\" y=\"230\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">triangle law: two vectors head-to-tail; polygon law: any number, closing side = resultant</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/vectors/06-resolution-of-a-vector.json",
        "blocks": [
            {"after": "**Definition**: the process of splitting (breaking) a vector",
             "md": ("### Deep dive: resolution is the inverse of addition\n\nResolving a vector answers the question \"which two known-direction vectors add up to this one?\" — the exact reverse of the parallelogram law. Because infinitely many pairs can add to a given vector, resolution only becomes unique when the two directions are fixed; the useful choice is the perpendicular pair (rectangular components). For a vector $\\vec{A}$ at angle $\\theta$ to the x-axis, $A_x = A\\cos\\theta$ and $A_y = A\\sin\\theta$, with $A = \\sqrt{A_x^2 + A_y^2}$ and $\\tan\\theta = A_y/A_x$ recovering the angle. This pair is the workhorse of NEB mechanics: weight splits into $mg\\sin\\theta$ (along an incline) and $mg\\cos\\theta$ (into it), and projectile velocity splits into a constant $u\\cos\\theta$ and a decaying $u\\sin\\theta - gt$."),
             "table1": {"title": "Resolution vocabulary — one vector, many component pairs",
                        "headers": ["Term", "Meaning", "Example for A at θ to x-axis"],
                        "rows": [
                            ["Component", "one vector of the resolved pair", "$A_x = A\\cos\\theta$ along x"],
                            ["Rectangular components", "pair at 90° to each other", "$A_x, A_y$ — unique pair"],
                            ["Non-rectangular components", "pair at any chosen angle", "infinitely many choices"],
                            ["Resolution", "splitting one vector into components", "the inverse of addition"],
                            ["Recomposition", "$A = \\sqrt{A_x^2 + A_y^2}$", "Pythagoras recovers |A|"],
                        ]},
             "table2": {"title": "Standard resolutions met again and again",
                        "headers": ["Situation", "Component along motion", "Component across motion"],
                        "rows": [
                            ["Weight on incline (θ to horizontal)", "$mg\\sin\\theta$ down the slope", "$mg\\cos\\theta$ into the slope"],
                            ["Projectile launch (θ to horizontal)", "$u\\cos\\theta$ (constant)", "$u\\sin\\theta$ (decays by gt)"],
                            ["Pull at angle θ to horizontal", "$F\\cos\\theta$ (does work)", "$F\\sin\\theta$ (may lift)"],
                            ["Banked-track normal reaction", "$N\\cos\\theta$ (supports weight)", "$N\\sin\\theta$ (provides centripetal force)"],
                        ]},
             "svg": ("Rectangular resolution — Ax = A cosθ, Ay = A sinθ",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"120\" y1=\"220\" x2=\"560\" y2=\"220\"/>"
                     "<line x1=\"120\" y1=\"220\" x2=\"120\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M120 220 L 400 100\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M400 100 L 380 104 L 388 118 Z\" fill=\"#991b1b\"/>"
                     "<path d=\"M120 220 L 400 220\" stroke=\"#1d4ed8\" stroke-width=\"2.5\" stroke-dasharray=\"6 4\"/>"
                     "<path d=\"M400 220 L 400 100\" stroke=\"#166534\" stroke-width=\"2.5\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"260\" y=\"245\" fill=\"#1d4ed8\">Ax = A cos θ</text>"
                     "<text x=\"410\" y=\"165\" fill=\"#166534\">Ay = A sin θ</text>"
                     "<text x=\"250\" y=\"150\" fill=\"#991b1b\">A</text>"
                     "<text x=\"150\" y=\"205\" fill=\"#6b7280\" font-size=\"12\">θ</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#374151\">A = &#8730;(Ax&#178; + Ay&#178;), tan θ = Ay/Ax</text>"
                     "</svg>"),
            },
            {"after": "**Resolution in physics problems**: in projectile motion, $v",
             "svg": ("Resolution is not unique — rectangular components are",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<text x=\"180\" y=\"70\" fill=\"#374151\">one vector A</text>"
                     "<path d=\"M120 200 L 260 120\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M120 200 L 230 200\" stroke=\"#1d4ed8\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                     "<path d=\"M230 200 L 260 120\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                     "<text x=\"180\" y=\"225\" fill=\"#1d4ed8\">pair 1 (rectangular)</text>"
                     "<path d=\"M380 200 L 470 200\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                     "<path d=\"M380 200 L 510 120\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M470 200 L 510 120\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                     "<text x=\"450\" y=\"225\" fill=\"#a16207\">pair 2 (oblique) — also valid</text>"
                     "</g>"
                     "<text x=\"320\" y=\"60\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">infinitely many pairs rebuild A; only the rectangular pair is unique</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/vectors/07-resolution-of-vectors-finding-components.json",
        "blocks": [
            {"after": "**Standard formulas**: for a vector $\\vec{F}$ of magnitude $",
             "md": ("### Deep dive: choosing the reference axis wisely\n\nThe component formulas only give correct answers when the angle is measured from the axis along which you want the cosine component. The classic NEB error is using $F\\cos 30°$ for the y-component when the 30° was measured from the y-axis — there the y-component is $F\\cos 30°$ and the x-component is $F\\sin 30°$. A safe habit: sketch the axes, mark the angle at the axis you measured from, and remember *cosine goes with the angle's own axis, sine with the other*. When a vector is specified relative to a slope rather than the horizontal, resolve along and perpendicular to the slope instead — the algebra almost always shortens."),
             "table1": {"title": "Component formulas — angle measured from x-axis vs y-axis",
                        "headers": ["Angle measured from", "Component along that axis", "Component along the other axis"],
                        "rows": [
                            ["x-axis (θ)", "$F_x = F\\cos\\theta$", "$F_y = F\\sin\\theta$"],
                            ["y-axis (φ)", "$F_y = F\\cos\\phi$", "$F_x = F\\sin\\phi$"],
                            ["Slope (θ to slope)", "$F_{\\parallel} = F\\cos\\theta$", "$F_{\\perp} = F\\sin\\theta$"],
                            ["Relation between θ and φ", "$\\theta + \\phi = 90°$", "$\\cos\\theta = \\sin\\phi$"],
                        ]},
             "table2": {"title": "Worked component values worth memorising",
                        "headers": ["Vector", "Angle", "x-component", "y-component"],
                        "rows": [
                            ["10 N", "30° from x-axis", "8.66 N", "5.0 N"],
                            ["10 N", "30° from y-axis", "5.0 N", "8.66 N"],
                            ["10 N", "45° from x-axis", "7.07 N", "7.07 N"],
                            ["10 N", "60° from x-axis", "5.0 N", "8.66 N"],
                            ["10 N", "0° from x-axis", "10 N", "0"],
                        ]},
             "svg": ("Same 10 N force, two reference axes — components swap",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke=\"#9ca3af\" stroke-width=\"1.5\">"
                     "<line x1=\"100\" y1=\"230\" x2=\"560\" y2=\"230\"/>"
                     "<line x1=\"100\" y1=\"230\" x2=\"100\" y2=\"60\"/>"
                     "</g>"
                     "<path d=\"M100 230 L 260 130\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M260 130 L 242 138 L 250 152 Z\" fill=\"#991b1b\"/>"
                     "<text x=\"190\" y=\"165\" fill=\"#991b1b\">F = 10 N</text>"
                     "<text x=\"120\" y=\"215\" fill=\"#6b7280\" font-size=\"12\">30&#176;</text>"
                     "<text x=\"300\" y=\"120\" fill=\"#1d4ed8\">from x-axis: Fx = 8.66 N, Fy = 5 N</text>"
                     "<text x=\"300\" y=\"150\" fill=\"#166534\">from y-axis: Fy = 8.66 N, Fx = 5 N</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#374151\">cos goes with the measured axis; sin with the other</text>"
                     "</svg>"),
            },
            {"after": "**Vector resolution is unique for rectangular components**: ",
             "svg": ("Slope-based resolution — weight along and into the incline",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<path d=\"M100 220 L 500 220 L 500 100 Z\" fill=\"#f3f4f6\" stroke=\"#6b7280\"/>"
                     "<path d=\"M200 220 L 330 163\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                     "<path d=\"M330 163 L 312 168 L 320 182 Z\" fill=\"#991b1b\"/>"
                     "<path d=\"M200 220 L 200 130\" stroke=\"#166534\" stroke-width=\"2.5\" stroke-dasharray=\"6 4\"/>"
                     "<text x=\"290\" y=\"150\" fill=\"#991b1b\">mg sin θ (down slope)</text>"
                     "<text x=\"210\" y=\"120\" fill=\"#166534\">mg cos θ</text>"
                     "<text x=\"120\" y=\"245\" fill=\"#6b7280\" font-size=\"12\">θ</text>"
                     "<text x=\"320\" y=\"270\" text-anchor=\"middle\" fill=\"#374151\">resolve along the slope, not the horizontal — algebra shortens</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/vectors/08-types-of-vectors.json",
        "blocks": [
            {"after": "**Like (parallel) vectors**: vectors having the same directi",
             "md": ("### Deep dive: classification drives the arithmetic\n\nKnowing *which kind* of vectors you hold tells you which operation is legal. Equal vectors must agree in magnitude, direction *and* unit — a 5 N force east is not equal to a 5 N force north. Parallel (like) vectors add by simple magnitude addition; anti-parallel vectors subtract; perpendicular vectors demand Pythagoras. The zero vector is the odd one out: it has no defined direction, which is why division by the zero vector is meaningless and why $\\vec{0}$ has no unit vector. Position vectors, negative vectors and co-initial/co-terminal pairs are the vocabulary NEB uses to phrase geometry-flavoured one-mark questions."),
             "table1": {"title": "Vector types and their defining tests",
                        "headers": ["Type", "Defining condition", "Example"],
                        "rows": [
                            ["Equal", "same magnitude, direction and unit", "$\\vec{A} = \\vec{B}$: both 5 N east"],
                            ["Negative", "same magnitude, opposite direction", "$\\vec{-A}$: 5 N west vs 5 N east"],
                            ["Like (parallel)", "same direction, any magnitudes", "3 N and 7 N both east"],
                            ["Unlike (anti-parallel)", "opposite directions", "3 N east, 7 N west"],
                            ["Co-initial", "same starting point", "two forces from one corner"],
                            ["Unit vector", "magnitude exactly 1", "$\\hat{A} = \\vec{A}/A$"],
                        ]},
             "table2": {"title": "What each classification implies for addition",
                        "headers": ["Pair type", "Resultant magnitude", "Resultant direction"],
                        "rows": [
                            ["Like vectors", "$R = A + B$", "the common direction"],
                            ["Anti-parallel", "$R = |A - B|$", "along the larger vector"],
                            ["Perpendicular", "$R = \\sqrt{A^2 + B^2}$", "$\\tan\\alpha = B/A$ from A"],
                            ["Equal at 120°", "$R = A$", "bisects the angle"],
                            ["Zero vector involved", "$R$ = the other vector", "unchanged"],
                        ]},
             "svg": ("Like, unlike, equal and negative vectors side by side",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<g stroke-width=\"3\">"
                     "<path d=\"M80 80 L 180 80\" stroke=\"#1d4ed8\"/>"
                     "<path d=\"M80 110 L 230 110\" stroke=\"#1d4ed8\"/>"
                     "<path d=\"M360 80 L 460 80\" stroke=\"#166534\"/>"
                     "<path d=\"M460 110 L 360 110\" stroke=\"#991b1b\"/>"
                     "</g>"
                     "<text x=\"130\" y=\"60\" text-anchor=\"middle\" fill=\"#1d4ed8\">like (parallel)</text>"
                     "<text x=\"410\" y=\"60\" text-anchor=\"middle\" fill=\"#166534\">unlike (anti-parallel)</text>"
                     "<text x=\"130\" y=\"145\" fill=\"#374151\">same direction, different sizes</text>"
                     "<text x=\"410\" y=\"145\" fill=\"#374151\">same size, opposite directions</text>"
                     "<g stroke-width=\"3\">"
                     "<path d=\"M80 220 L 180 220\" stroke=\"#a16207\"/>"
                     "<path d=\"M360 220 L 460 220\" stroke=\"#a16207\"/>"
                     "</g>"
                     "<text x=\"270\" y=\"225\" fill=\"#374151\">= equal vectors</text>"
                     "<text x=\"320\" y=\"265\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">negative vector = equal magnitude, opposite direction</text>"
                     "</svg>"),
            },
            {"after": "**Coplanarity test for three vectors**: three vectors $\\vec{",
             "svg": ("The zero vector — no direction, no unit vector",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"180\" cy=\"100\" r=\"6\" fill=\"#1d4ed8\"/>"
                     "<text x=\"180\" y=\"140\" fill=\"#1d4ed8\">zero vector: point only</text>"
                     "<text x=\"180\" y=\"165\" fill=\"#6b7280\" font-size=\"12\">no direction &#8594; no unit vector</text>"
                     "<path d=\"M400 100 L 500 100\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<text x=\"450\" y=\"140\" fill=\"#166534\">unit vector: |A| = 1</text>"
                     "<text x=\"450\" y=\"165\" fill=\"#6b7280\" font-size=\"12\">A&#770; = A/|A| keeps direction</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/vectors/10-multiplication-of-vectors-scalar-dot-product.json",
        "blocks": [
            {"after": "**Definition**: the scalar product (or dot product) of two v",
             "md": ("### Deep dive: the dot product measures alignment\n\n$\\vec{a}\\cdot\\vec{b} = ab\\cos\\theta$ rewards alignment and punishes perpendicularity: it is maximum when the vectors point the same way, zero when they are at 90°, and negative when they oppose. That single fact powers three NEB workhorses — work ($W = \\vec{F}\\cdot\\vec{d}$, so a force perpendicular to motion does no work), power ($P = \\vec{F}\\cdot\\vec{v}$), and the perpendicularity test ($\\vec{a}\\cdot\\vec{b} = 0 \\iff \\vec{a} \\perp \\vec{b}$). In component form $\\vec{a}\\cdot\\vec{b} = a_xb_x + a_yb_y + a_zb_z$, which lets you compute angles between vectors without ever measuring them. The projection reading $\\vec{a}\\cdot\\vec{b} = a(b\\cos\\theta)$ says the dot product is the length of one vector times the shadow the other casts on it."),
             "table1": {"title": "Dot product behaviour across angles",
                        "headers": ["Angle θ", "cos θ", "a·b", "Meaning"],
                        "rows": [
                            ["0°", "1", "$+ab$ (maximum)", "fully aligned"],
                            ["90°", "0", "0", "perpendicular — no work done"],
                            ["180°", "&#8722;1", "$&#8722;ab$ (minimum)", "fully opposed"],
                            ["60°", "0.5", "$0.5ab$", "partially aligned"],
                            ["120°", "&#8722;0.5", "$&#8722;0.5ab$", "partially opposed"],
                        ]},
             "table2": {"title": "Dot product identities NEB expects",
                        "headers": ["Identity", "Statement", "Use"],
                        "rows": [
                            ["Commutativity", "$\\vec{a}\\cdot\\vec{b} = \\vec{b}\\cdot\\vec{a}$", "order never matters"],
                            ["Component form", "$a_xb_x + a_yb_y + a_zb_z$", "compute angles algebraically"],
                            ["Perpendicularity test", "$\\vec{a}\\cdot\\vec{b} = 0 \\iff \\vec{a} \\perp \\vec{b}$", "prove ⊥ in one line"],
                            ["Self product", "$\\vec{a}\\cdot\\vec{a} = a^2$", "magnitude from components"],
                            ["Angle formula", "$\\cos\\theta = \\dfrac{\\vec{a}\\cdot\\vec{b}}{ab}$", "angle between any two vectors"],
                            ["Work", "$W = \\vec{F}\\cdot\\vec{d}$", "force × displacement along F"],
                        ]},
             "svg": ("Dot product as projection — a(b cosθ)",
                     "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                     "<path d=\"M120 200 L 340 200\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<path d=\"M340 200 L 328 192 L 328 208 Z\" fill=\"#1d4ed8\"/>"
                     "<path d=\"M120 200 L 260 90\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<path d=\"M260 90 L 244 98 L 254 112 Z\" fill=\"#166534\"/>"
                     "<path d=\"M260 90 L 260 200\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                     "<path d=\"M120 200 L 260 200\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                     "<text x=\"235\" y=\"225\" fill=\"#a16207\">b cos θ (projection)</text>"
                     "<text x=\"350\" y=\"205\" fill=\"#1d4ed8\">a</text>"
                     "<text x=\"270\" y=\"80\" fill=\"#166534\">b</text>"
                     "<text x=\"150\" y=\"185\" fill=\"#6b7280\" font-size=\"12\">θ</text>"
                     "<text x=\"320\" y=\"260\" text-anchor=\"middle\" fill=\"#374151\">a&#183;b = a(b cos θ) = ab cos θ — length times shadow</text>"
                     "</svg>"),
            },
            {"after": "**Negative unit vector**: $-\\hat{A}$ is also a unit vector (",
             "svg": ("Perpendicularity test — dot product zero means 90°",
                     "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M140 180 L 260 180\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                     "<path d=\"M140 180 L 140 70\" stroke=\"#166534\" stroke-width=\"3\"/>"
                     "<text x=\"200\" y=\"205\" fill=\"#1d4ed8\">a = (3, 0)</text>"
                     "<text x=\"110\" y=\"120\" fill=\"#166534\">b = (0, 4)</text>"
                     "<text x=\"160\" y=\"165\" fill=\"#6b7280\" font-size=\"12\">90&#176;</text>"
                     "<text x=\"440\" y=\"105\" fill=\"#374151\">a&#183;b = 3&#215;0 + 0&#215;4 = 0</text>"
                     "<text x=\"440\" y=\"130\" fill=\"#991b1b\">&#8756; a &#8869; b</text>"
                     "</g>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
