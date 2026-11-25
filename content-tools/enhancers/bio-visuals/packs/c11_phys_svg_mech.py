# Physics SVG topups — mechanics group (vectors, kinematics, dynamics, circular, work-energy, elasticity)
def A(name):
    return name

TOPICS = [
    # ---------- vectors ----------
    {"file": "class-11/physics/vectors/01-triangle-parallelogram-and-polygon-laws-of-vectors.json",
     "blocks": [{"after": "## 6. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Parallelogram law — diagonal is the resultant",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M140 190 L 340 190\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M140 190 L 220 90\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M340 190 L 220 90\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<path d=\"M140 190 L 420 90\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<path d=\"M220 90 L 420 90\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"240\" y=\"215\" fill=\"#1d4ed8\">P</text>"
                         "<text x=\"130\" y=\"130\" fill=\"#166534\">Q</text>"
                         "<text x=\"430\" y=\"80\" fill=\"#991b1b\">R = P + Q</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/vectors/02-addition-of-vectors-same-and-opposite-directions.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Same direction adds, opposite direction subtracts",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M80 60 L 240 60\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                         "<path d=\"M240 60 L 400 60\" stroke=\"#166534\" stroke-width=\"3\"/>"
                         "<path d=\"M80 60 L 400 60\" stroke=\"#991b1b\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/>"
                         "<text x=\"240\" y=\"40\" fill=\"#374151\">same direction: |A| + |B|</text>"
                         "<path d=\"M80 160 L 240 160\" stroke=\"#1d4ed8\" stroke-width=\"3\"/>"
                         "<path d=\"M240 160 L 120 160\" stroke=\"#166534\" stroke-width=\"3\"/>"
                         "<text x=\"240\" y=\"200\" fill=\"#374151\">opposite: |A| &#8722; |B|, along the bigger one</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/vectors/02-resolution-of-vectors-unit-vectors.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Resolution into x and y components",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 200 L 520 200\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M120 200 L 120 60\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M120 200 L 460 90\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M460 90 L 460 200\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<path d=\"M120 90 L 460 90\" stroke=\"#166534\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"300\" y=\"120\" fill=\"#1d4ed8\">A</text>"
                         "<text x=\"490\" y=\"150\" fill=\"#166534\">A&#8342; = A cos&#952;</text>"
                         "<text x=\"180\" y=\"80\" fill=\"#166534\">A&#8342; = A sin&#952;</text>"
                         "<text x=\"250\" y=\"240\" fill=\"#6b7280\">unit vectors &#303;d; and &#303;j; carry the directions</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/vectors/03-scalar-and-vector-products.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Dot product vs cross product geometry",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 180 L 260 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M100 180 L 240 180\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"210\" y=\"205\" fill=\"#374151\">A&#183;B = AB cos&#952; (scalar)</text>"
                         "<path d=\"M420 180 L 560 120\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M420 180 L 560 180\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<circle cx=\"490\" cy=\"70\" r=\"6\" fill=\"#991b1b\"/>"
                         "<text x=\"490\" y=\"50\" fill=\"#991b1b\">A&#215;B &#8869; both</text>"
                         "<text x=\"490\" y=\"205\" fill=\"#374151\">|A&#215;B| = AB sin&#952; (area)</text>"
                         "</g></svg>"),
                }]},
    # ---------- kinematics ----------
    {"file": "class-11/physics/kinematics/01-instantaneous-velocity-and-acceleration.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Slope of the tangent is the instantaneous velocity",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M90 200 C 220 190, 340 150, 540 60\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<line x1=\"300\" y1=\"160\" x2=\"440\" y2=\"80\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                         "<circle cx=\"370\" cy=\"122\" r=\"5\" fill=\"#111827\"/>"
                         "<text x=\"470\" y=\"70\" fill=\"#991b1b\">tangent</text>"
                         "<text x=\"90\" y=\"45\" fill=\"#111827\">x</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">t</text>"
                         "<text x=\"320\" y=\"250\" fill=\"#6b7280\" font-size=\"12\">v = dx/dt: slope at the point, not the chord</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/kinematics/02-relative-velocity.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Relative velocity — subtract the frames",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 170 L 300 170\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<text x=\"200\" y=\"195\" fill=\"#1d4ed8\">v&#8321; (car A)</text>"
                         "<path d=\"M100 170 L 220 90\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"150\" y=\"80\" fill=\"#166534\">v&#8322; (car B)</text>"
                         "<path d=\"M220 90 L 300 170\" stroke=\"#991b1b\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>"
                         "<text x=\"330\" y=\"120\" fill=\"#991b1b\">v&#8321; &#8722; v&#8322;</text>"
                         "<text x=\"320\" y=\"225\" fill=\"#6b7280\" font-size=\"12\">velocity of A seen from B closes tip to tail</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/kinematics/03-equation-of-motion-graphical-treatment.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("v–t graph: slope = a, area = s",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 190 L 500 70\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<line x1=\"100\" y1=\"190\" x2=\"500\" y2=\"190\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M100 190 L 500 70 L 500 190 Z\" fill=\"#eff6ff\" opacity=\"0.6\"/>"
                         "<text x=\"90\" y=\"60\" fill=\"#111827\">v</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">t</text>"
                         "<text x=\"300\" y=\"145\" fill=\"#1d4ed8\">area = s</text>"
                         "<text x=\"430\" y=\"60\" fill=\"#166534\">slope = a</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/kinematics/04-motion-of-a-freely-falling-body.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Free fall: equal steps of time, growing steps of distance",
                         "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"200\" y1=\"40\" x2=\"200\" y2=\"250\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"200\" cy=\"50\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"200\" cy=\"90\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"200\" cy=\"170\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"200\" cy=\"250\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<text x=\"260\" y=\"95\" fill=\"#374151\">d : 3d : 5d</text>"
                         "<text x=\"120\" y=\"55\" fill=\"#6b7280\">t = 0</text>"
                         "<text x=\"120\" y=\"95\" fill=\"#6b7280\">t = 1</text>"
                         "<text x=\"120\" y=\"175\" fill=\"#6b7280\">t = 2</text>"
                         "<text x=\"120\" y=\"255\" fill=\"#6b7280\">t = 3</text>"
                         "<text x=\"460\" y=\"150\" fill=\"#6b7280\">v = gt, h = &#189;gt&#178;</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/kinematics/05-projectile-motion-and-its-applications.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Projectile path — independence of horizontal and vertical motion",
                         "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 220 Q 320 40 540 220\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<line x1=\"100\" y1=\"220\" x2=\"540\" y2=\"220\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"320\" cy=\"80\" r=\"6\" fill=\"#991b1b\"/>"
                         "<path d=\"M320 80 L 400 80\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<path d=\"M320 80 L 320 150\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                         "<text x=\"430\" y=\"75\" fill=\"#166534\">u cos&#952; (constant)</text>"
                         "<text x=\"350\" y=\"160\" fill=\"#a16207\">u sin&#952; &#8722; gt</text>"
                         "<text x=\"320\" y=\"260\" fill=\"#6b7280\" font-size=\"12\">R = u&#178;sin2&#952;/g, H = u&#178;sin&#178;&#952;/2g, T = 2u sin&#952;/g</text>"
                         "</g></svg>"),
                }]},
    # ---------- dynamics ----------
    {"file": "class-11/physics/dynamics/01-linear-momentum-impulse.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Impulse = area under the F–t curve = change in momentum",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 200 C 200 60, 320 60, 420 200\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M120 200 L 420 200 L 420 200 Z\" fill=\"#eff6ff\"/>"
                         "<path d=\"M120 200 C 200 60, 320 60, 420 200 L 420 200 Z\" fill=\"#eff6ff\" opacity=\"0.5\"/>"
                         "<text x=\"90\" y=\"50\" fill=\"#111827\">F</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">t</text>"
                         "<text x=\"280\" y=\"130\" fill=\"#1d4ed8\">area = J = &#916;p</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/dynamics/02-conservation-of-linear-momentum.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Collision: total p before = total p after",
                         "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"150\" cy=\"70\" r=\"16\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"260\" cy=\"70\" r=\"12\" fill=\"#166534\"/>"
                         "<path d=\"M120 70 L 145 70\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<text x=\"200\" y=\"35\" fill=\"#374151\">before</text>"
                         "<circle cx=\"150\" cy=\"160\" r=\"16\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"300\" cy=\"160\" r=\"12\" fill=\"#166534\"/>"
                         "<path d=\"M170 160 L 210 160\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M315 160 L 350 160\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"220\" y=\"125\" fill=\"#374151\">after</text>"
                         "<text x=\"500\" y=\"110\" fill=\"#6b7280\">m&#8321;u&#8321; + m&#8322;u&#8322; =</text>"
                         "<text x=\"500\" y=\"135\" fill=\"#6b7280\">m&#8321;v&#8321; + m&#8322;v&#8322;</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/dynamics/03-application-of-newton-s-laws.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Lift problem — apparent weight changes with acceleration",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<rect x=\"120\" y=\"80\" width=\"120\" height=\"110\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                         "<text x=\"180\" y=\"140\" fill=\"#1d4ed8\">lift a&#8593;</text>"
                         "<text x=\"180\" y=\"215\" fill=\"#1d4ed8\">R = m(g+a)</text>"
                         "<rect x=\"400\" y=\"80\" width=\"120\" height=\"110\" rx=\"8\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                         "<text x=\"460\" y=\"140\" fill=\"#a16207\">lift a&#8595;</text>"
                         "<text x=\"460\" y=\"215\" fill=\"#a16207\">R = m(g&#8722;a)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/dynamics/04-moment-torque-and-equilibrium.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Moments about a pivot — balance when τcw = τccw",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M120 120 L 520 120\" stroke=\"#374151\" stroke-width=\"4\"/>"
                         "<path d=\"M320 120 L 320 190\" stroke=\"#9ca3af\" stroke-width=\"3\"/>"
                         "<path d=\"M180 120 L 180 160\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<circle cx=\"180\" cy=\"165\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M440 120 L 440 160\" stroke=\"#991b1b\" stroke-width=\"2\"/>"
                         "<circle cx=\"440\" cy=\"165\" r=\"12\" fill=\"#991b1b\"/>"
                         "<text x=\"320\" y=\"215\" fill=\"#374151\">F&#8321;d&#8321; = F&#8322;d&#8322; for equilibrium</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/dynamics/05-solid-friction-laws-of-solid-friction-and-their-verifications.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Friction vs applied force — static plateau then kinetic",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<line x1=\"80\" y1=\"210\" x2=\"580\" y2=\"210\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<line x1=\"80\" y1=\"210\" x2=\"80\" y2=\"50\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M90 200 L 300 90 L 310 90 L 560 140\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<line x1=\"300\" y1=\"90\" x2=\"300\" y2=\"210\" stroke=\"#9ca3af\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>"
                         "<text x=\"180\" y=\"70\" fill=\"#1d4ed8\">static (rises with F)</text>"
                         "<text x=\"470\" y=\"120\" fill=\"#166534\">kinetic (constant)</text>"
                         "<text x=\"300\" y=\"235\" fill=\"#374151\">F = &#956;sN at slipping</text>"
                         "<text x=\"90\" y=\"45\" fill=\"#111827\">friction</text>"
                         "<text x=\"590\" y=\"230\" fill=\"#111827\">applied F</text>"
                         "</g></svg>"),
                }]},
    # ---------- circular motion ----------
    {"file": "class-11/physics/circular-motion/01-angular-displacement-velocity-and-acceleration.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Angular displacement θ = s/r",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"220\" cy=\"130\" r=\"90\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M220 130 L 310 130\" stroke=\"#1d4ed8\" stroke-width=\"2.5\"/>"
                         "<path d=\"M220 130 L 285 65\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<path d=\"M310 130 A 90 90 0 0 0 285 65\" fill=\"none\" stroke=\"#991b1b\" stroke-width=\"3\"/>"
                         "<text x=\"270\" y=\"150\" fill=\"#1d4ed8\">r</text>"
                         "<text x=\"330\" y=\"90\" fill=\"#991b1b\">arc s</text>"
                         "<text x=\"250\" y=\"105\" fill=\"#166534\">&#952;</text>"
                         "<text x=\"500\" y=\"130\" fill=\"#6b7280\">&#952; = s/r (radian)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/circular-motion/02-relation-between-angular-and-linear-velocity-and-acceleration.json",
     "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("v = ωr — the rim moves faster than the hub",
                         "<svg viewBox=\"0 0 640 240\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"240\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"250\" cy=\"120\" r=\"90\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"250\" cy=\"120\" r=\"40\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<path d=\"M250 120 L 340 120\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<path d=\"M250 120 L 290 120\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<path d=\"M340 120 L 340 80\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<path d=\"M290 120 L 290 100\" stroke=\"#a16207\" stroke-width=\"2.5\"/>"
                         "<text x=\"380\" y=\"95\" fill=\"#991b1b\">v = &#969;r (rim)</text>"
                         "<text x=\"390\" y=\"125\" fill=\"#a16207\">v = &#969;r/2 (mid)</text>"
                         "<text x=\"540\" y=\"160\" fill=\"#6b7280\">same &#969; for all</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/circular-motion/03-centripetal-acceleration-and-centripetal-force.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Centripetal force points to the centre",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"320\" cy=\"130\" r=\"90\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"410\" cy=\"130\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M410 130 L 330 130\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<path d=\"M410 130 L 410 60\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"370\" y=\"150\" fill=\"#991b1b\">F = mv&#178;/r</text>"
                         "<text x=\"440\" y=\"75\" fill=\"#166534\">v (tangent)</text>"
                         "<text x=\"320\" y=\"245\" fill=\"#6b7280\" font-size=\"12\">force and velocity are perpendicular: speed constant, direction changes</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/circular-motion/04-conical-pendulum.json",
     "blocks": [{"after": "## 8. Exam Zone and self-check",
                 "svg": ("Conical pendulum — T cosθ balances mg, T sinθ is centripetal",
                         "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M320 40 L 320 60\" stroke=\"#374151\" stroke-width=\"3\"/>"
                         "<path d=\"M320 60 L 440 170\" stroke=\"#1d4ed8\" stroke-width=\"2\"/>"
                         "<ellipse cx=\"320\" cy=\"170\" rx=\"120\" ry=\"26\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>"
                         "<circle cx=\"440\" cy=\"170\" r=\"10\" fill=\"#991b1b\"/>"
                         "<path d=\"M440 170 L 440 210\" stroke=\"#166534\" stroke-width=\"2\"/>"
                         "<text x=\"465\" y=\"215\" fill=\"#166534\">mg</text>"
                         "<text x=\"360\" y=\"105\" fill=\"#1d4ed8\">T</text>"
                         "<text x=\"320\" y=\"245\" fill=\"#6b7280\" font-size=\"12\">tan&#952; = v&#178;/rg &#8594; period T = 2&#960;&#8730;(L cos&#952;/g)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/circular-motion/05-motion-in-a-vertical-circle.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Vertical circle — tension largest at the bottom",
                         "<svg viewBox=\"0 0 640 280\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"280\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<circle cx=\"320\" cy=\"140\" r=\"90\" fill=\"none\" stroke=\"#9ca3af\" stroke-width=\"1.5\"/>"
                         "<circle cx=\"320\" cy=\"50\" r=\"8\" fill=\"#1d4ed8\"/>"
                         "<circle cx=\"320\" cy=\"230\" r=\"8\" fill=\"#991b1b\"/>"
                         "<text x=\"390\" y=\"55\" fill=\"#1d4ed8\">top: T = mv&#178;/r &#8722; mg</text>"
                         "<text x=\"390\" y=\"240\" fill=\"#991b1b\">bottom: T = mv&#178;/r + mg</text>"
                         "<text x=\"320\" y=\"265\" fill=\"#6b7280\" font-size=\"12\">minimum top speed: &#8730;(gr)</text>"
                         "</g></svg>"),
                }]},
    {"file": "class-11/physics/circular-motion/06-applications-of-banking.json",
     "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
                 "svg": ("Banked track — normal's horizontal component turns the car",
                         "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                         "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                         "<g text-anchor=\"middle\">"
                         "<path d=\"M100 200 L 540 120\" stroke=\"#374151\" stroke-width=\"8\"/>"
                         "<rect x=\"280\" y=\"120\" width=\"60\" height=\"30\" rx=\"6\" fill=\"#1d4ed8\"/>"
                         "<path d=\"M310 120 L 310 70\" stroke=\"#166534\" stroke-width=\"2.5\"/>"
                         "<text x=\"345\" y=\"75\" fill=\"#166534\">N cos&#952; = mg</text>"
                         "<path d=\"M310 120 L 380 100\" stroke=\"#991b1b\" stroke-width=\"2.5\"/>"
                         "<text x=\"420\" y=\"95\" fill=\"#991b1b\">N sin&#952; = mv&#178;/r</text>"
                         "<text x=\"320\" y=\"240\" fill=\"#6b7280\" font-size=\"12\">tan&#952; = v&#178;/rg — no friction needed at this speed</text>"
                         "</g></svg>"),
                }]},
]
