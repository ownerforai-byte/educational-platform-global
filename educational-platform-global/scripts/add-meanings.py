import os

files = {
    "components/lab/math-interactive.tsx": {
        "Derivative & Integral Solver": {
            "observation": "The graph shows the function curve. The derivative value tells you the slope at that x; the integral gives the accumulated area under the curve between -10 and 10.",
            "conclusion": "Derivative = instantaneous rate of change (slope). Integral = accumulated area. Numerical methods approximate these when algebraic solutions are hard.",
            "meaning": "Optimization, physics (motion/energy), and machine learning (gradient descent) all rely on derivatives. Integrals compute work, probability, and total change."
        },
        "Statistics Calculator": {
            "observation": "You enter comma-separated numbers and see count, mean, median, mode, standard deviation, and min/max.",
            "conclusion": "Mean is the average; median is the middle value (robust to outliers); mode is the most frequent. Standard deviation measures spread around the mean.",
            "meaning": "Statistics are used in polling, quality control, finance (risk/volatility), and science (error analysis). Low std dev means reliable, repeatable data."
        },
        "Matrix Operations": {
            "observation": "You enter two matrices and choose add, multiply, or transpose. The result matrix appears formatted with tabs.",
            "conclusion": "Addition requires same dimensions; multiplication requires columns of A = rows of B; transpose flips rows and columns. Matrix multiplication is NOT commutative (AB ≠ BA).",
            "meaning": "Matrices solve systems of equations, transform 3D graphics, encode Markov chains, and represent quantum states. They are the language of linear algebra."
        },
        "3D Function Plotter": {
            "observation": "You enter f(x,y) and the 3D surface appears colored by height. Range controls the plot window. Drag to rotate.",
            "conclusion": "Height = function value. Color maps to height. Peaks, valleys, and saddle points are visible. The surface can be smooth, spiky, or fractal-like.",
            "meaning": "3D plots visualize terrain, heat maps, cost functions in optimization, and probability densities in statistics."
        },
        "Limit Calculator": {
            "observation": "You enter f(x) and an approach value. The tool evaluates f(a-h) and f(a+h) for shrinking h and shows the converging limit.",
            "conclusion": "If left and right limits converge to the same number, the limit exists. If they diverge or hit infinity, the limit does not exist.",
            "meaning": "Limits define derivatives, integrals, and continuity. They are the foundation of calculus and appear in asymptotes, optimization, and real-world modeling."
        },
        "System of Equations Solver": {
            "observation": "You enter coefficients for 2×2 or 3×3 linear systems. The tool computes x, y, (z) or reports no unique solution.",
            "conclusion": "Determinant ≠ 0 means a unique solution exists. Determinant = 0 means either no solution or infinitely many solutions (lines/planes coincide).",
            "meaning": "Systems of equations model Kirchhoff's laws, supply-demand equilibria, structural engineering forces, and computer graphics transformations."
        },
        "Vector Operations": {
            "observation": "You enter two 3D vectors and choose addition, dot product, or cross product. Results show components and, for dot product, the angle.",
            "conclusion": "Addition combines displacements. Dot product measures alignment (cosine of angle). Cross product gives a perpendicular vector with magnitude = area of parallelogram.",
            "meaning": "Vectors describe forces, velocities, fields, and 3D rotations. Dot product computes work; cross product computes torque and surface normals."
        }
    },
    "components/lab/physics-3d.tsx": {
        "3D Electric Field Visualizer": {
            "observation": "Red/blue spheres are positive/negative charges. Green arrows show field direction and strength. Arrows denser near charges.",
            "conclusion": "Field lines start on positive charges and end on negative charges. Density of lines = field strength. Opposite charges attract; like charges repel.",
            "meaning": "Electric fields explain capacitor behavior, electron trajectories in CRT/TV, lightning strikes, and molecular bonding. Understanding fields is key to electrical engineering."
        },
        "3D Double Pendulum": {
            "observation": "Two pendulums attached in series swing chaotically. Small changes in initial angle produce wildly different trajectories over time.",
            "conclusion": "The system is deterministic but unpredictable (chaos). Energy sloshes between the two arms. No simple period formula exists.",
            "meaning": "Double pendulums model chaotic systems: weather, stock markets, and heart arrhythmias. Chaos theory shows that simple rules can create complex, seemingly random behavior."
        },
        "3D Gravitational Field": {
            "observation": "A planet sits at center. Yellow arrows point inward toward it. Arrow strength fades with distance. Larger mass = denser arrows.",
            "conclusion": "Gravity follows an inverse-square law: F ∝ 1/r². Field strength decreases rapidly with distance. All objects fall at the same rate regardless of mass (equivalence principle).",
            "meaning": "Gravity governs orbits, tides, satellite motion, and galaxy formation. Understanding the field lets us predict planetary motion and design space missions."
        }
    },
    "components/lab/chemistry-advanced-3d.tsx": {
        "3D Molecular Orbitals": {
            "observation": "Cyan dots form cloud shapes around a red nucleus. s orbital is spherical; p has two lobes; d has four lobes.",
            "conclusion": "Orbitals are probability clouds, not fixed paths. s orbitals are spherically symmetric. p orbitals are directional (x, y, z). d orbitals have complex shapes.",
            "meaning": "Orbital shapes determine chemical bonding geometry, molecular polarity, and spectral lines. This is the basis of quantum chemistry and spectroscopy."
        },
        "3D Crystal Lattice Structures": {
            "observation": "Green spheres arrange in repeating 3D patterns. SC = corners only. FCC = corners + face centers. BCC = corners + body center.",
            "conclusion": "Packing efficiency: SC 52%, BCC 68%, FCC 74%. More close-packed structures have higher density and stronger metallic bonding.",
            "meaning": "Crystal structure determines material properties: strength, conductivity, melting point, and corrosion resistance. FCC metals (Cu, Al, Au) are ductile; BCC (Fe, W) are harder."
        }
    },
    "components/lab/math-advanced-3d.tsx": {
        "3D Parametric Curve Plotter": {
            "observation": "You enter x(t), y(t), z(t) and see a 3D tube curve. Green dot = start, red dot = end. Drag to rotate.",
            "conclusion": "Parametric equations describe curves where x, y, z are each functions of a parameter t. The curve can loop, knot, or spiral in 3D space.",
            "meaning": "Parametric curves model robot arms, roller coaster tracks, particle trajectories, and Bezier curves in computer graphics."
        },
        "3D Vector Field Visualizer": {
            "observation": "Blue arrows fill a 3D grid. Arrow direction = vector direction; length = magnitude. Patterns: vortex, saddle, radial, helix.",
            "conclusion": "Vortex fields have curl (rotation). Radial fields have divergence (source/sink). Saddle points have both. Helix fields twist around an axis.",
            "meaning": "Vector fields model fluid flow, electromagnetic fields, wind patterns, and gradient descent in optimization. Divergence and curl are key concepts in vector calculus."
        },
        "3D Complex Function Plotter": {
            "observation": "A colored 3D surface represents f(z). Hue = argument (angle) of the output; height = magnitude. Domain coloring reveals zeros and poles.",
            "conclusion": "Complex functions map the 2D complex plane to another 2D complex plane. The surface height shows magnitude; color shows phase. Zeros appear as sinks; poles as spikes.",
            "meaning": "Complex analysis underpins signal processing (FFT), quantum mechanics, fluid dynamics, and conformal mapping used in map projections and circuit design."
        }
    }
}

def add_meaning_panels(filepath, meanings):
    p = os.path.join(r"C:\Users\ASUS\Desktop\educational-platform-global", filepath.replace("/", os.sep))
    txt = open(p, "r", encoding="utf-8").read()
    original = txt
    
    for title, content in meanings.items():
        # Find the closing </CardContent> for each Card that contains the title
        # We'll look for the pattern: <CardTitle>title</CardTitle> ... </CardContent>
        # and insert before </CardContent>
        
        title_escaped = title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        
        # Find the last info block before </CardContent> in the relevant Card
        # Strategy: find the CardTitle, then find the next </CardContent>
        
        card_title = f"<CardTitle>{title_escaped}</CardTitle>"
        if card_title not in txt:
            print(f"  WARNING: Could not find card title: {title}")
            continue
        
        # Find position after the last info block in this card
        # Look for the pattern: </div>\n      </CardContent>
        # We want to insert before the last </CardContent> of this card
        
        # Find the CardTitle position
        title_pos = txt.find(card_title)
        if title_pos == -1:
            continue
            
        # Find the next </CardContent> after this title
        card_content_pos = txt.find("</CardContent>", title_pos)
        if card_content_pos == -1:
            continue
            
        # Check if Meaning panel already exists near this card
        # Look backwards from card_content_pos for existing Meaning panel
        look_back = txt.rfind("📘 Observation", 0, card_content_pos)
        if look_back != -1 and look_back > title_pos:
            print(f"  SKIP (already exists): {title}")
            continue
        
        # Insert before </CardContent>
        meaning_html = f'''        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Observation &amp; Conclusion</p>
          <h4 className="mt-1 text-sm font-semibold">What you see</h4>
          <p className="mt-1 text-xs text-muted-foreground">{content["observation"]}</p>
          <h4 className="mt-2 text-sm font-semibold">Conclusion</h4>
          <p className="mt-1 text-xs text-muted-foreground">{content["conclusion"]}</p>
          <h4 className="mt-2 text-sm font-semibold">Why it matters</h4>
          <p className="mt-1 text-xs text-muted-foreground">{content["meaning"]}</p>
        </div>
'''
        
        txt = txt[:card_content_pos] + meaning_html + txt[card_content_pos:]
        print(f"  ADDED: {title}")
    
    if txt != original:
        open(p, "w", encoding="utf-8").write(txt)
        print(f"Updated: {filepath}")
    else:
        print(f"No changes: {filepath}")

for filepath, meanings in files.items():
    print(f"\nProcessing {filepath}...")
    add_meaning_panels(filepath, meanings)
