# Mathematics SVG topups — class-12 units: vectors, DE, differentiation, integration, LP, probability, 3-D (43 files)
TOPICS = [
    {"file": "class-11/mathematics/trigonometry/02-trigonometric-equations-and-general-values.json",
     "blocks": [{"after": "**NEB 2023 (verified PYQ): Find cos⁻¹(√3/2) + sin⁻¹(1/2). ",
                 "svg": ("General solutions repeat around the circle",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"320\" cy=\"110\" r=\"70\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M320 110 L 390 110\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<path d=\"M320 110 L 250 110\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<circle cx=\"390\" cy=\"110\" r=\"5\" fill=\"#991b1b\"/>"
                         "<circle cx=\"250\" cy=\"110\" r=\"5\" fill=\"#991b1b\"/>"
                         "<text x=\"320\" y=\"210\" fill=\"#6b7280\" font-size=\"12\">sin &#952; = k &#8594; &#952; = n&#960; + (&#8722;1)&#8319;&#945;</text>"
                         "</g></svg>"),
                }]},
    # ---------- class-11 vectors ----------
    {"file": "class-11/mathematics/vectors/01-collinear-and-non-collinear-vectors-coplanar-and-non-coplanar-vectors.json",
     "blocks": [{"after": "**NEB-style (2m): Show that a = î + ĵ + k̂, b = 2î + 2ĵ + ",
                 "svg": ("Collinear = parallel; coplanar = share a flat",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 160 L 320 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M120 160 L 260 160\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"240\" y=\"190\" fill=\"#374151\">collinear: b = &#955;a</text>"
                         "<path d=\"M400 160 L 560 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M400 160 L 480 80\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M400 160 L 540 110\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                         "<text x=\"480\" y=\"195\" fill=\"#374151\">coplanar: [a b c] = 0</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/mathematics/vectors/02-dot-product-and-its-applications.json",
     "blocks": [{"after": "**NEB 2024 (verified PYQ): Find the angle between a = î + ĵ ",
                 "svg": ("Dot product = projection of one vector on the other",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 160 L 420 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M140 160 L 300 60\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M300 60 L 300 160\" stroke=\"#a16207\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"430\" y=\"165\" fill=\"#1d4ed8\">b</text>"
                         "<text x=\"290\" y=\"50\" fill=\"#166534\">a</text>"
                         "<text x=\"360\" y=\"120\" fill=\"#a16207\">a&#183;b = |a||b|cos&#952;</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/mathematics/vectors/02-linear-combination-of-vectors-linearly-dependent-and-independent-vectors.json",
     "blocks": [{"after": "**NEB-style (2m): Prove that any three vectors including the",
                 "svg": ("Dependent vectors lie in a plane; independent span space",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 160 L 300 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M120 160 L 300 200\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"210\" y=\"220\" fill=\"#374151\">dependent: one is a mix</text>"
                         "<path d=\"M400 160 L 540 130\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M400 160 L 540 190\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M400 160 L 480 60\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                         "<text x=\"480\" y=\"220\" fill=\"#374151\">independent: full 3-D span</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/mathematics/vectors/03-cross-product-and-its-applications.json",
     "blocks": [{"after": "**NEB 2021 (verified PYQ): Given a = î − 2ĵ + 3k̂ and b = 3î",
                 "svg": ("Cross product: perpendicular to both, size = area",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M160 160 L 380 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 160 L 320 60\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 160 L 380 160 L 320 60 Z\" fill=\"#eff6ff\" opacity=\"0.5\"/>"
                         "<path d=\"M160 160 L 240 30\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"400\" y=\"165\" fill=\"#1d4ed8\">a</text>"
                         "<text x=\"310\" y=\"50\" fill=\"#166534\">b</text>"
                         "<text x=\"230\" y=\"25\" fill=\"#991b1b\">a&#215;b &#8869; both</text>"
                         "<text x=\"470\" y=\"200\" fill=\"#6b7280\">|a&#215;b| = parallelogram area</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/mathematics/vectors/05-applications-work-torque-angular-momentum.json",
     "blocks": [{"after": "**NEB-style (2m): Why does a door open easiest when pushed a",
                 "svg": ("Torque: force times lever arm, biggest at the rim",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"220\" cy=\"110\" r=\"10\" fill=\"#374151\"/>"
                         "<rect x=\"240\" y=\"100\" width=\"260\" height=\"20\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<path d=\"M500 90 L 500 60\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"540\" y=\"55\" fill=\"#166534\">F at rim</text>"
                         "<path d=\"M270 90 L 270 60\" stroke=\"#9ca3af\" stroke-width=\"2\"/>"
                         "<text x=\"300\" y=\"55\" fill=\"#6b7280\">F at hinge: no turn</text>"
                         "<text x=\"320\" y=\"195\" fill=\"#374151\">&#964; = r &#215; F</text>"
                         "</g></svg>"),
                }]},
    # ---------- class-12 units ----------
    {"file": "class-12/mathematics/differential-equations/01-formation-of-differential-equations.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Family of curves → one differential equation",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 160 C 180 80, 260 80, 340 160\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M140 160 C 220 60, 300 60, 380 160\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<path d=\"M180 160 C 260 40, 340 40, 420 160\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<text x=\"320\" y=\"200\" fill=\"#374151\">one parameter &#8594; differentiate once to eliminate it</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differential-equations/02-solving-first-order-first-degree-equations-variable-separable-homogeneous-linear.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Three solution routes for first-order ODEs",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"70\" y=\"60\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"150\" y=\"95\" fill=\"#1d4ed8\">separable</text>"
                         "<text x=\"150\" y=\"125\" fill=\"#374151\" font-size=\"12\">f(y)dy = g(x)dx</text>"
                         "<rect x=\"250\" y=\"60\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"330\" y=\"95\" fill=\"#a16207\">homogeneous</text>"
                         "<text x=\"330\" y=\"125\" fill=\"#374151\" font-size=\"12\">put y = vx</text>"
                         "<rect x=\"430\" y=\"60\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"510\" y=\"95\" fill=\"#166534\">linear</text>"
                         "<text x=\"510\" y=\"125\" fill=\"#374151\" font-size=\"12\">integrating factor</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differential-equations/03-applications-growth-and-decay-population-dynamics.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Exponential growth and decay: dN/dt = kN",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"80\" y1=\"200\" x2=\"580\" y2=\"200\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M100 190 C 250 180, 400 130, 560 50\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M100 60 C 250 70, 400 130, 560 195\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"470\" y=\"70\" fill=\"#166534\">growth (k &gt; 0)</text>"
                         "<text x=\"470\" y=\"160\" fill=\"#991b1b\">decay (k &lt; 0)</text>"
                         "<text x=\"90\" y=\"50\" fill=\"#111827\">N</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">t</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/01-derivatives-of-algebraic-trigonometric-inverse-trigonometric-exponential-and-logarithmic-functio.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Standard derivatives at a glance",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"80\" y=\"60\" width=\"150\" height=\"80\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"155\" y=\"95\" fill=\"#1d4ed8\">x&#8319; &#8594; n x&#8319;&#8315;&#185;</text>"
                         "<rect x=\"250\" y=\"60\" width=\"150\" height=\"80\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"325\" y=\"95\" fill=\"#a16207\">sin &#8594; cos</text>"
                         "<rect x=\"420\" y=\"60\" width=\"150\" height=\"80\" rx=\"8\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"495\" y=\"95\" fill=\"#166534\">e^x &#8594; e^x</text>"
                         "<text x=\"320\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">ln x &#8594; 1/x; tan&#8315;&#185;x &#8594; 1/(1+x&#178;)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/02-rules-of-differentiation-product-rule-quotient-rule-chain-rule.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Product, quotient, chain — the three engines",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"70\" y=\"60\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"150\" y=\"95\" fill=\"#1d4ed8\">product</text>"
                         "<text x=\"150\" y=\"125\" fill=\"#374151\" font-size=\"12\">(uv)&#8242; = u&#8242;v + uv&#8242;</text>"
                         "<rect x=\"250\" y=\"60\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"330\" y=\"95\" fill=\"#a16207\">quotient</text>"
                         "<text x=\"330\" y=\"125\" fill=\"#374151\" font-size=\"12\">(u/v)&#8242; = (u&#8242;v&#8722;uv&#8242;)/v&#178;</text>"
                         "<rect x=\"430\" y=\"60\" width=\"160\" height=\"80\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"510\" y=\"95\" fill=\"#166534\">chain</text>"
                         "<text x=\"510\" y=\"125\" fill=\"#374151\" font-size=\"12\">f&#8242;(g(x))&#183;g&#8242;(x)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/03-derivatives-of-parametric-and-implicit-functions.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Implicit: differentiate through y with the chain rule",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"320\" cy=\"100\" r=\"60\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<text x=\"320\" y=\"105\" fill=\"#1d4ed8\">x&#178;+y&#178;=r&#178;</text>"
                         "<text x=\"320\" y=\"190\" fill=\"#6b7280\" font-size=\"12\">2x + 2y dy/dx = 0 &#8594; dy/dx = &#8722;x/y</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/04-higher-order-derivatives.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Differentiate again and again",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"140\" cy=\"100\" r=\"16\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"140\" y=\"105\" fill=\"#1d4ed8\">f</text>"
                         "<circle cx=\"300\" cy=\"100\" r=\"16\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"300\" y=\"105\" fill=\"#a16207\">f&#8242;</text>"
                         "<circle cx=\"460\" cy=\"100\" r=\"16\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"460\" y=\"105\" fill=\"#166534\">f&#8243;</text>"
                         "<path d=\"M160 100 L 278 100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M320 100 L 438 100\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<text x=\"320\" y=\"60\" fill=\"#374151\">each pass asks: how fast is the previous rate changing?</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/06-leibniz-s-theorem-for-nth-derivative.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Leibniz: the product rule raised to the nth power",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<text x=\"320\" y=\"90\" fill=\"#374151\">(uv)&#8319; = &#931; &#8319;C&#7522; u&#8319;&#8315;&#7522; v&#8342;</text>"
                         "<text x=\"320\" y=\"140\" fill=\"#6b7280\" font-size=\"12\">binomial coefficients choose who differentiates how often</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/07-geometric-interpretation-tangent-and-normal.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Tangent slope m, normal slope −1/m",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 170 C 240 60, 420 60, 560 170\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"320\" cy=\"95\" r=\"6\" fill=\"#991b1b\"/>"
                         "<line x1=\"200\" y1=\"120\" x2=\"440\" y2=\"70\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<line x1=\"260\" y1=\"20\" x2=\"380\" y2=\"170\" stroke=\"#a16207\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"460\" y=\"60\" fill=\"#166534\">tangent</text>"
                         "<text x=\"250\" y=\"25\" fill=\"#a16207\">normal</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/08-monotonicity-maxima-and-minima-first-and-second-derivative-tests.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("First derivative sign, second derivative shape",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 170 C 180 70, 260 70, 340 140 C 400 190, 460 190, 560 90\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"220\" cy=\"85\" r=\"5\" fill=\"#991b1b\"/>"
                         "<circle cx=\"420\" cy=\"190\" r=\"5\" fill=\"#166534\"/>"
                         "<text x=\"220\" y=\"65\" fill=\"#991b1b\">f&#8243; &lt; 0 max</text>"
                         "<text x=\"440\" y=\"215\" fill=\"#166534\">f&#8243; &gt; 0 min</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/differentiation/09-applications-rate-of-change-approximation-error-estimation.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Linear approximation: dA ≈ (dA/dr)·dr",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 170 C 240 90, 420 80, 560 70\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"320\" cy=\"102\" r=\"5\" fill=\"#991b1b\"/>"
                         "<line x1=\"240\" y1=\"125\" x2=\"420\" y2=\"85\" stroke=\"#a16207\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"320\" y=\"80\" fill=\"#991b1b\">tangent replaces the curve nearby</text>"
                         "<text x=\"320\" y=\"200\" fill=\"#6b7280\" font-size=\"12\">small changes ride the tangent line</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/integration/01-integration-as-inverse-of-differentiation.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Integration undoes differentiation (+ C)",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M180 100 L 300 100\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M300 100 L 285 93 L 285 107 Z\" fill=\"#1d4ed8\"/>"
                         "<text x=\"240\" y=\"85\" fill=\"#1d4ed8\">differentiate</text>"
                         "<path d=\"M460 100 L 340 100\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M340 100 L 355 93 L 355 107 Z\" fill=\"#166534\"/>"
                         "<text x=\"400\" y=\"85\" fill=\"#166534\">integrate (+C)</text>"
                         "<text x=\"240\" y=\"140\" fill=\"#374151\">F(x)</text>"
                         "<text x=\"420\" y=\"140\" fill=\"#374151\">F&#8242;(x)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/integration/02-standard-integrals-and-methods-substitution-parts-partial-fractions.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Pick the method the integrand suggests",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"70\" y=\"55\" width=\"160\" height=\"90\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"150\" y=\"90\" fill=\"#1d4ed8\">substitution</text>"
                         "<text x=\"150\" y=\"120\" fill=\"#374151\" font-size=\"12\">see f(g(x))g&#8242;(x)</text>"
                         "<rect x=\"250\" y=\"55\" width=\"160\" height=\"90\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"330\" y=\"90\" fill=\"#a16207\">by parts</text>"
                         "<text x=\"330\" y=\"120\" fill=\"#374151\" font-size=\"12\">product of types</text>"
                         "<rect x=\"430\" y=\"55\" width=\"160\" height=\"90\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"510\" y=\"90\" fill=\"#166534\">partial fractions</text>"
                         "<text x=\"510\" y=\"120\" fill=\"#374151\" font-size=\"12\">rational function</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/integration/03-definite-integrals-and-properties.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Definite integral: signed area from a to b",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"80\" y1=\"110\" x2=\"580\" y2=\"110\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M140 110 C 220 40, 320 40, 400 110\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M140 110 C 220 180, 320 180, 400 110\" fill=\"none\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M140 110 C 220 40, 320 40, 400 110 L 400 110 C 320 180, 220 180, 140 110 Z\" fill=\"#fefce8\" opacity=\"0.5\"/>"
                         "<text x=\"270\" y=\"60\" fill=\"#1d4ed8\">+ area</text>"
                         "<text x=\"270\" y=\"175\" fill=\"#166534\">&#8722; area</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/integration/04-integration-of-trigonometric-functions.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Trig integrals: identities first, then integrate",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 100 C 160 50, 220 150, 280 100 C 340 50, 400 150, 460 100 C 500 70, 540 130, 570 100\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<text x=\"320\" y=\"45\" fill=\"#374151\">sin&#178;x = (1&#8722;cos2x)/2 lowers the power</text>"
                         "<text x=\"320\" y=\"180\" fill=\"#6b7280\" font-size=\"12\">odd powers: split and substitute</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/integration/05-applications-area-under-curve-area-between-two-curves.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Shaded area between the curves",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 160 C 240 60, 400 60, 520 160\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M120 160 L 520 160\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M120 160 C 240 60, 400 60, 520 160 Z\" fill=\"#fefce8\" opacity=\"0.6\"/>"
                         "<text x=\"320\" y=\"95\" fill=\"#a16207\">A = &#8747;(y_top &#8722; y_bottom) dx</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/linear-programming/01-linear-programming-formulation-of-lpp.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("LPP anatomy: objective + constraints",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"110\" y=\"60\" width=\"180\" height=\"80\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"200\" y=\"95\" fill=\"#a16207\">objective Z</text>"
                         "<text x=\"200\" y=\"125\" fill=\"#374151\" font-size=\"12\">maximise / minimise</text>"
                         "<rect x=\"370\" y=\"60\" width=\"180\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"460\" y=\"95\" fill=\"#1d4ed8\">constraints</text>"
                         "<text x=\"460\" y=\"125\" fill=\"#374151\" font-size=\"12\">linear inequalities</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/linear-programming/02-graphical-method-for-solving-lpp-with-two-variables.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Feasible region and the optimal corner",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"100\" y1=\"200\" x2=\"560\" y2=\"200\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<line x1=\"100\" y1=\"200\" x2=\"100\" y2=\"50\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M100 200 L 100 90 L 260 90 L 420 200 Z\" fill=\"#f0fdf4\" opacity=\"0.7\" stroke=\"#166534\"/>"
                         "<circle cx=\"260\" cy=\"90\" r=\"6\" fill=\"#991b1b\"/>"
                         "<text x=\"300\" y=\"75\" fill=\"#991b1b\">optimum corner</text>"
                         "<text x=\"260\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">the objective is extreme at a vertex (corner-point theorem)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/linear-programming/03-maximization-and-minimization-problems.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Iso-profit lines slide until they leave the region",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 190 L 400 60\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<path d=\"M160 210 L 440 80\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<path d=\"M200 230 L 480 100\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"470\" y=\"70\" fill=\"#166534\">Z increases this way</text>"
                         "<text x=\"320\" y=\"250\" fill=\"#6b7280\" font-size=\"12\">stop at the last feasible corner</text>"
                         "</g></svg>"),
                }]},
]
