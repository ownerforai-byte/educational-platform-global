# Mathematics SVG topups — probability, 3-D geometry, vector algebra (20 files)
TOPICS = [
    # ---------- probability (7) ----------
    {"file": "class-12/mathematics/probability/01-conditional-probability-and-multiplication-theorem.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Conditional probability: shrink the sample space",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"100\" y=\"40\" width=\"300\" height=\"140\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"140\" y=\"30\" fill=\"#1d4ed8\">S</text>"
                         "<ellipse cx=\"250\" cy=\"110\" rx=\"90\" ry=\"50\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"250\" y=\"115\" fill=\"#a16207\">B</text>"
                         "<text x=\"160\" y=\"115\" fill=\"#166534\">A&#8741;B</text>"
                         "<text x=\"500\" y=\"115\" fill=\"#6b7280\">P(A|B) = P(A&#8741;B)/P(B)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/probability/02-independent-events.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Independent events: knowing B tells nothing about A",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<ellipse cx=\"260\" cy=\"110\" rx=\"110\" ry=\"60\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<ellipse cx=\"380\" cy=\"110\" rx=\"110\" ry=\"60\" fill=\"#f0fdf4\" stroke=\"#166534\" opacity=\"0.6\"/>"
                         "<text x=\"200\" y=\"115\" fill=\"#1d4ed8\">A</text>"
                         "<text x=\"440\" y=\"115\" fill=\"#166534\">B</text>"
                         "<text x=\"320\" y=\"115\" fill=\"#374151\">A&#8741;B</text>"
                         "<text x=\"320\" y=\"200\" fill=\"#6b7280\">independence: P(A&#8741;B) = P(A)&#183;P(B)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/probability/03-bayes-theorem-and-its-applications.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Bayes: prior + evidence → posterior",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"90\" y=\"60\" width=\"140\" height=\"70\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"160\" y=\"100\" fill=\"#1d4ed8\">prior P(H)</text>"
                         "<rect x=\"280\" y=\"60\" width=\"140\" height=\"70\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"350\" y=\"100\" fill=\"#a16207\">evidence E</text>"
                         "<rect x=\"470\" y=\"60\" width=\"140\" height=\"70\" rx=\"10\" fill=\"#f0fdf4\" stroke=\"#166534\"/>"
                         "<text x=\"540\" y=\"100\" fill=\"#166534\">posterior</text>"
                         "<path d=\"M230 95 L 275 95\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M420 95 L 465 95\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/probability/04-random-variable-and-its-probability-distribution.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Distribution of a discrete random variable",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"100\" y1=\"180\" x2=\"560\" y2=\"180\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<g fill=\"#1d4ed8\">"
                         "<rect x=\"150\" y=\"160\" width=\"30\" height=\"20\"/>"
                         "<rect x=\"240\" y=\"120\" width=\"30\" height=\"60\"/>"
                         "<rect x=\"330\" y=\"80\" width=\"30\" height=\"100\"/>"
                         "<rect x=\"420\" y=\"140\" width=\"30\" height=\"40\"/>"
                         "</g>"
                         "<text x=\"320\" y=\"210\" fill=\"#6b7280\" font-size=\"12\">heights are probabilities; &#931;p&#8342; = 1</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/probability/05-mean-variance-and-standard-deviation-of-a-random-variable.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Mean balances the distribution; σ measures spread",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"100\" y1=\"180\" x2=\"560\" y2=\"180\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<g fill=\"#1d4ed8\">"
                         "<rect x=\"160\" y=\"140\" width=\"30\" height=\"40\"/>"
                         "<rect x=\"250\" y=\"90\" width=\"30\" height=\"90\"/>"
                         "<rect x=\"340\" y=\"90\" width=\"30\" height=\"90\"/>"
                         "<rect x=\"430\" y=\"140\" width=\"30\" height=\"40\"/>"
                         "</g>"
                         "<line x1=\"325\" y1=\"60\" x2=\"325\" y2=\"180\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"325\" y=\"50\" fill=\"#991b1b\">mean &#956;</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/probability/06-binomial-distribution-definition-mean-variance.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Binomial: n independent yes/no trials",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"100\" y1=\"180\" x2=\"560\" y2=\"180\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<g fill=\"#1d4ed8\">"
                         "<rect x=\"150\" y=\"170\" width=\"34\" height=\"10\"/>"
                         "<rect x=\"230\" y=\"140\" width=\"34\" height=\"40\"/>"
                         "<rect x=\"310\" y=\"90\" width=\"34\" height=\"90\"/>"
                         "<rect x=\"390\" y=\"140\" width=\"34\" height=\"40\"/>"
                         "<rect x=\"470\" y=\"170\" width=\"34\" height=\"10\"/>"
                         "</g>"
                         "<text x=\"320\" y=\"210\" fill=\"#6b7280\" font-size=\"12\">mean np, variance npq; q = 1&#8722;p</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/probability/07-poisson-distribution-definition-mean-variance.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Poisson: rare events per interval",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"100\" y1=\"180\" x2=\"560\" y2=\"180\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<g fill=\"#166534\">"
                         "<rect x=\"170\" y=\"120\" width=\"34\" height=\"60\"/>"
                         "<rect x=\"250\" y=\"70\" width=\"34\" height=\"110\"/>"
                         "<rect x=\"330\" y=\"100\" width=\"34\" height=\"80\"/>"
                         "<rect x=\"410\" y=\"150\" width=\"34\" height=\"30\"/>"
                         "</g>"
                         "<text x=\"320\" y=\"210\" fill=\"#6b7280\" font-size=\"12\">mean = variance = &#955;</text>"
                         "</g></svg>"),
                }]},
    # ---------- three-dimensional geometry (5) ----------
    {"file": "class-12/mathematics/three-dimensional-geometry/01-direction-cosines-and-direction-ratios-of-a-line.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Direction cosines: angles with the three axes",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M180 190 L 460 190\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M180 190 L 180 60\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M180 190 L 120 150\" stroke=\"#374151\" stroke-width=\"2\"/>"
                         "<path d=\"M180 190 L 420 80\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"480\" y=\"195\" fill=\"#111827\">x</text>"
                         "<text x=\"180\" y=\"50\" fill=\"#111827\">z</text>"
                         "<text x=\"105\" y=\"145\" fill=\"#111827\">y</text>"
                         "<text x=\"440\" y=\"70\" fill=\"#991b1b\">r: cos&#945;, cos&#946;, cos&#947;</text>"
                         "<text x=\"300\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">l&#178;+m&#178;+n&#178; = 1</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/three-dimensional-geometry/02-equation-of-a-line-in-space-standard-and-general-form.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("A line = one point + one direction",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 170 L 540 70\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"220\" cy=\"150\" r=\"6\" fill=\"#991b1b\"/>"
                         "<text x=\"220\" y=\"180\" fill=\"#991b1b\">point a</text>"
                         "<path d=\"M260 140 L 310 127\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"330\" y=\"120\" fill=\"#166534\">direction b</text>"
                         "<text x=\"440\" y=\"200\" fill=\"#6b7280\" font-size=\"12\">r = a + &#955;b</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/three-dimensional-geometry/03-equation-of-a-plane-normal-form-general-form.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("A plane = point + normal vector",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 160 L 460 120 L 560 190 L 240 210 Z\" fill=\"#eff6ff\" opacity=\"0.7\" stroke=\"#1d4ed8\"/>"
                         "<path d=\"M350 140 L 350 50\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"390\" y=\"60\" fill=\"#991b1b\">normal n</text>"
                         "<circle cx=\"300\" cy=\"150\" r=\"5\" fill=\"#166534\"/>"
                         "<text x=\"270\" y=\"170\" fill=\"#166534\">point</text>"
                         "<text x=\"320\" y=\"205\" fill=\"#6b7280\" font-size=\"12\">n&#183;r = d</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/three-dimensional-geometry/04-angle-between-two-lines-two-planes-and-a-line-and-a-plane.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Angles come from dot products of directions and normals",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 160 L 320 100\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M120 160 L 320 160\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"330\" y=\"95\" fill=\"#1d4ed8\">b&#8321;</text>"
                         "<text x=\"330\" y=\"165\" fill=\"#166534\">b&#8322;</text>"
                         "<text x=\"480\" y=\"110\" fill=\"#6b7280\" font-size=\"12\">cos&#952; = |b&#8321;&#183;b&#8322;|/(|b&#8321;||b&#8322;|)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/three-dimensional-geometry/05-distance-of-a-point-from-a-plane-and-line.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Perpendicular foot gives the shortest distance",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 170 L 480 130 L 560 190 L 200 210 Z\" fill=\"#eff6ff\" opacity=\"0.7\" stroke=\"#1d4ed8\"/>"
                         "<circle cx=\"260\" cy=\"60\" r=\"6\" fill=\"#991b1b\"/>"
                         "<path d=\"M260 60 L 300 155\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"230\" y=\"50\" fill=\"#991b1b\">P</text>"
                         "<text x=\"340\" y=\"150\" fill=\"#166534\">d = |n&#183;r&#8722;d|/|n|</text>"
                         "</g></svg>"),
                }]},
    # ---------- vector algebra (6) ----------
    {"file": "class-12/mathematics/vector-algebra/01-scalar-and-vector-quantities-types-of-vectors.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("A vector carries magnitude and direction",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 130 L 380 70\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M380 70 L 362 74 L 372 84 Z\" fill=\"#1d4ed8\"/>"
                         "<text x=\"270\" y=\"85\" fill=\"#1d4ed8\">|a|, direction</text>"
                         "<text x=\"480\" y=\"110\" fill=\"#6b7280\" font-size=\"12\">equal vectors: same size and direction</text>"
                         "<text x=\"480\" y=\"140\" fill=\"#6b7280\" font-size=\"12\">negative vector: reversed arrow</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/vector-algebra/02-addition-subtraction-and-scalar-multiplication-of-vectors.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Triangle law and the parallelogram it builds",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 160 L 340 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M340 160 L 260 70\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M140 160 L 260 70\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"240\" y=\"180\" fill=\"#1d4ed8\">a</text>"
                         "<text x=\"320\" y=\"115\" fill=\"#166534\">b</text>"
                         "<text x=\"180\" y=\"110\" fill=\"#991b1b\">a + b</text>"
                         "<text x=\"480\" y=\"120\" fill=\"#6b7280\" font-size=\"12\">&#955;a stretches or flips</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/vector-algebra/03-dot-product-scalar-product-and-its-applications.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Dot product: number, zero when perpendicular",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M160 160 L 400 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 160 L 300 70\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"420\" y=\"165\" fill=\"#1d4ed8\">a</text>"
                         "<text x=\"290\" y=\"60\" fill=\"#166534\">b</text>"
                         "<text x=\"480\" y=\"100\" fill=\"#6b7280\" font-size=\"12\">a&#183;b = |a||b|cos&#952;</text>"
                         "<text x=\"480\" y=\"130\" fill=\"#6b7280\" font-size=\"12\">a &#8869; b &#8660; a&#183;b = 0</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/vector-algebra/04-cross-product-vector-product-and-its-applications.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Right-hand rule for a × b",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M160 160 L 380 160\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 160 L 300 80\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 160 L 220 40\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"400\" y=\"165\" fill=\"#1d4ed8\">a</text>"
                         "<text x=\"290\" y=\"70\" fill=\"#166534\">b</text>"
                         "<text x=\"210\" y=\"30\" fill=\"#991b1b\">a&#215;b</text>"
                         "<text x=\"470\" y=\"200\" fill=\"#6b7280\" font-size=\"12\">curl a toward b; thumb gives the direction</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/vector-algebra/05-scalar-and-vector-triple-products.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Scalar triple product = volume of the parallelepiped",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M160 170 L 360 170\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 170 L 240 100\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M160 170 L 200 60\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                         "<path d=\"M360 170 L 440 100 L 280 90 L 240 100\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<path d=\"M240 100 L 280 90 L 240 30 L 200 60\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"480\" y=\"120\" fill=\"#6b7280\" font-size=\"12\">[a b c] = a&#183;(b&#215;c)</text>"
                         "<text x=\"480\" y=\"150\" fill=\"#6b7280\" font-size=\"12\">zero &#8660; coplanar</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-12/mathematics/vector-algebra/06-applications-work-torque-angular-momentum.json",
     "blocks": [{"after": "## 8. Exam Zone, practice and textbook exercises",
                 "svg": ("Work is a dot product; torque is a cross product",
                         "<svg viewBox=\"0 0 640 200\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"200\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"80\" y=\"60\" width=\"220\" height=\"80\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"190\" y=\"95\" fill=\"#1d4ed8\">W = F&#183;d</text>"
                         "<text x=\"190\" y=\"125\" fill=\"#374151\" font-size=\"12\">scalar, no turn</text>"
                         "<rect x=\"350\" y=\"60\" width=\"220\" height=\"80\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"460\" y=\"95\" fill=\"#a16207\">&#964; = r&#215;F</text>"
                         "<text x=\"460\" y=\"125\" fill=\"#374151\" font-size=\"12\">vector, turning effect</text>"
                         "</g></svg>"),
                }]},
]
