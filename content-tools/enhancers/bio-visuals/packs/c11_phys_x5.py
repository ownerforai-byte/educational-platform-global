# class-11 physics EXTRAS pack x5 — vectors (9) + work-energy-and-power (4)
TOPICS = [
 {"file": "class-11/physics/vectors/01-scalars-and-vectors.json",
  "blocks": [{"after": "**Vector fields vs scalar fields**: a scalar field assigns a number to each point in space (temperature, pressure, potential). A vector field assigns a vector to each point (velocity field, electric field, gravitational field). The gradient of a scalar field is a vector field.",
    "table": ("Scalars vs vectors (classified)",
              ["Property", "Scalar", "Vector"],
              [["Definition", "Magnitude only", "Magnitude + direction"],
               ["Examples", "Mass, time, energy, temperature", "Force, velocity, momentum"],
               ["Addition", "Arithmetic", "Triangle/parallelogram laws"],
               ["Fields", "Scalar field assigns a number", "Vector field assigns an arrow"]]),
   "table1": ("Types of vectors (classified)",
              ["Type", "Meaning", "Example"],
              [["Unit vector", "Magnitude 1, direction only", "î, ĵ, k̂"],
               ["Equal vectors", "Same magnitude and direction", "Parallel arrows"],
               ["Free vector", "Movable, same effect anywhere", "Pure direction arrows"],
               ["Position vector", "From origin to point", "r = xî + yĵ"]]),
   "svg": ("Scalar is a number; vector is an arrow",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="180" cy="90" r="34" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="180" y="96" fill="#1d4ed8" font-size="14">5 kg</text>'
           '<path d="M360 90 L 480 90" stroke="#a16207" stroke-width="3"/>'
           '<path d="M480 90 L 465 83 M480 90 L 465 97" stroke="#a16207" stroke-width="3"/>'
           '<text x="420" y="70" fill="#a16207" font-size="12">5 N east</text>'
           '<text x="320" y="165" fill="#6b7280" font-size="12">same size, different information</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/01-triangle-parallelogram-polygon-laws.json",
  "blocks": [{"after": "**Cross product in 2D:** In 2D, the cross product of $\\vec{A} = A_x\\hat{i} + A_y\\hat{j}$ and $\\vec{B} = B_x\\hat{i} + B_y\\hat{j}$ gives $\\vec{A} \\times \\vec{B} = (A_x B_y - A_y B_x)\\hat{k}$. The scalar $A_x B_y - A_y B_x$ is called the 2D \"perp dot product\" and equals the signed area of the parallelogram.",
    "table": ("Vector addition laws (classified)",
              ["Law", "Statement", "Use"],
              [["Triangle", "Head-to-tail; resultant closes the triangle", "Two vectors"],
               ["Parallelogram", "Diagonal of the parallelogram", "Two vectors at an angle"],
               ["Polygon", "Chain of all vectors; closing side is resultant", "Many vectors"],
               ["R = √(A²+B²+2AB cosθ)", "Parallelogram magnitude", "Numerical work"]]),
   "table1": ("Special resultant values",
              ["Angle θ", "Resultant R", "Note"],
              [["0°", "A + B", "Same direction"],
               ["90°", "√(A²+B²)", "Perpendicular"],
               ["180°", "|A − B|", "Opposite"],
               ["120°, equal A", "A", "Equilateral case"]]),
   "svg": ("Parallelogram law: diagonal is the resultant",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M160 140 L 320 140 L 400 70 L 240 70 Z" fill="none" stroke="#9ca3af" stroke-width="1.5"/>'
           '<path d="M160 140 L 320 140" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M160 140 L 240 70" stroke="#a16207" stroke-width="3"/>'
           '<path d="M160 140 L 400 70" stroke="#166534" stroke-width="3"/>'
           '<text x="300" y="155" fill="#1d4ed8" font-size="12">A</text>'
           '<text x="215" y="85" fill="#a16207" font-size="12">B</text>'
           '<text x="330" y="90" fill="#166534" font-size="12">R</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/02-addition-of-vectors-same-and-opposite-directions--2.json",
  "blocks": [{"after": "The resultant of two equal opposite vectors is zero. The body they act on is then in translational equilibrium if no other force is present.",
    "table": ("Collinear vector addition (classified)",
              ["Case", "Resultant", "Example"],
              [["Same direction", "A + B along same line", "Two tugs pulling one barge"],
               ["Opposite direction", "|A − B| along larger", "Tug of war"],
               ["Equal opposite", "Zero", "Balanced forces"],
               ["Three collinear", "Signed sum", "Net force on a rope"]]),
   "table1": ("Zero resultant meaning",
              ["Situation", "Interpretation", "Exam note"],
              [["Forces sum to zero", "Equilibrium", "Object may still move uniformly"],
               ["Velocities sum to zero", "COM at rest", "Explosion in mid-air"],
               ["Displacement closes polygon", "Returns to start", "Round trip"]]),
   "svg": ("Equal opposites cancel; unequal leave a remainder",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M160 70 L 320 70" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M320 70 L 160 70" stroke="#991b1b" stroke-width="3" stroke-dasharray="8 5"/>'
           '<text x="240" y="50" fill="#1d4ed8" font-size="12">A</text>'
           '<text x="240" y="100" fill="#991b1b" font-size="12">−A: cancels</text>'
           '<path d="M400 140 L 520 140" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M520 140 L 460 140" stroke="#991b1b" stroke-width="3"/>'
           '<text x="540" y="145" fill="#166534" font-size="12">= A/2</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/02-resolution-unit-vectors.json",
  "blocks": [{"after": "**Direction cosines:** cosα=a₁/|a|, cosβ=a₂/|a|, cosγ=a₃/|a|, where α,β,γ are angles with axes.",
    "table": ("Unit vectors and components (classified)",
              ["Item", "Formula", "Use"],
              [["Unit vector", "Â = A/|A|", "Direction only"],
               ["Cartesian form", "A = Aₓî + A_yĵ + A_zk̂", "Component work"],
               ["Magnitude", "|A| = √(Aₓ²+A_y²+A_z²)", "Length"],
               ["Direction cosines", "cosα, cosβ, cosγ", "3-D orientation"]]),
   "table1": ("Component facts",
              ["Fact", "Statement", "Consequence"],
              [["Sum of squares", "Aₓ² + A_y² = A² (2-D)", "Pythagoras"],
               ["Choice of axes", "Any perpendicular pair works", "Pick convenient axes"],
               ["Rotation effect", "Components change, vector does not", "Invariance"]]),
   "svg": ("One vector, two components",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M140 150 L 520 150" stroke="#374151" stroke-width="2"/>'
           '<path d="M140 150 L 140 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M140 150 L 400 60" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M140 150 L 400 150" stroke="#a16207" stroke-width="2.5" stroke-dasharray="6 4"/>'
           '<path d="M400 150 L 400 60" stroke="#166534" stroke-width="2.5" stroke-dasharray="6 4"/>'
           '<text x="270" y="170" fill="#a16207" font-size="12">A cosθ</text>'
           '<text x="440" y="105" fill="#166534" font-size="12">A sinθ</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/03-scalar-vector-products.json",
  "blocks": [{"after": "**NEB exam focus:** state and prove the triangle/parallelogram law; derive $R$ and $\\alpha$; solve numericals on resultant and equilibrium; state Lami's theorem; define equilibrant; find the angle between two equal vectors whose resultant equals either vector ($120°$).",
    "table": ("Dot vs cross product (classified)",
              ["Property", "Dot product (A·B)", "Cross product (A×B)"],
              [["Result", "Scalar", "Vector"],
               ["Magnitude", "AB cosθ", "AB sinθ"],
               ["Zero when", "Perpendicular", "Parallel"],
               ["Max when", "Parallel", "Perpendicular"],
               ["Use", "Work, power", "Torque, magnetic force"]]),
   "table1": ("Product identities",
              ["Identity", "Statement", "Use"],
              [["Commutativity", "A·B = B·A; A×B = −B×A", "Order matters in cross"],
               ["Distribution", "Over addition for both", "Expanding"],
               ["|A×B|² + (A·B)² = A²B²", "Lagrange identity", "Angle derivation"],
               ["Unit vectors", "î·î = 1, î×î = 0", "Component algebra"]]),
   "svg": ("Dot projects; cross rotates out of the plane",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M140 140 L 300 140" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M140 140 L 260 80" stroke="#a16207" stroke-width="3"/>'
           '<path d="M140 140 L 260 140" stroke="#166534" stroke-width="2.5" stroke-dasharray="6 4"/>'
           '<text x="230" y="165" fill="#166534" font-size="12">projection (dot)</text>'
           '<circle cx="450" cy="110" r="14" fill="none" stroke="#991b1b" stroke-width="2.5"/>'
           '<circle cx="450" cy="110" r="3" fill="#991b1b"/>'
           '<text x="450" y="150" fill="#991b1b" font-size="12">cross: out of plane</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/06-resolution-of-a-vector--2.json",
  "blocks": [{"after": "Any pair of perpendicular directions may be chosen. Axes along a slope and perpendicular to it are often easier than horizontal and vertical axes.",
    "table": ("Resolution principles (classified)",
              ["Principle", "Statement", "Consequence"],
              [["Two components", "Any plane vector splits into two", "Choose axes freely"],
               ["Orthogonal components", "Perpendicular pair is independent", "Treat axes separately"],
               ["Oblique axes", "Allowed but messier", "Avoid unless needed"],
               ["Reconstruction", "Components re-add to the vector", "Check sums"]]),
   "table1": ("Common resolutions in physics",
              ["Vector", "Typical axes", "Components"],
              [["Weight on incline", "Along/across slope", "mg sinθ, mg cosθ"],
               ["Tension of pendulum", "Vertical/horizontal", "T cosθ, T sinθ"],
               ["Velocity of boat", "Across/along stream", "Resultant steering"],
               ["Force on banked road", "Normal components", "N sinθ, N cosθ"]]),
   "svg": ("Same vector, two axis choices",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M140 130 L 300 130" stroke="#374151" stroke-width="2"/>'
           '<path d="M140 130 L 140 50" stroke="#374151" stroke-width="2"/>'
           '<path d="M140 130 L 300 60" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M140 130 L 330 150" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="5 4"/>'
           '<text x="320" y="60" fill="#6b7280" font-size="12">tilted axes give different components — same arrow</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/07-resolution-of-vectors-finding-components--2.json",
  "blocks": [{"after": "If the axes are rotated, the components change but the resultant vector does not. Choose axes that set as many angles as possible to 0° or 90°.",
    "table": ("Finding components: method (classified)",
              ["Step", "Action", "Check"],
              [["1", "Draw the vector to scale", "Correct quadrant"],
               ["2", "Drop perpendiculars on chosen axes", "Right angles marked"],
               ["3", "Label A cosθ and A sinθ", "Adjacent = cos"],
               ["4", "Verify: squares add to A²", "Numerical check"]]),
   "table1": ("Worked patterns",
              ["Given", "Components", "Note"],
              [["A at 30°", "(0.87A, 0.5A)", "Memorise ratios"],
               ["A at 60°", "(0.5A, 0.87A)", "Swap of 30°"],
               ["A at 45°", "(0.71A, 0.71A)", "Equal components"],
               ["A along −y", "(0, −A)", "Signs matter"]]),
   "svg": ("30-60-90 component ratios",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M150 130 L 450 130" stroke="#374151" stroke-width="2"/>'
           '<path d="M150 130 L 150 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M150 130 L 400 55" stroke="#1d4ed8" stroke-width="3"/>'
           '<text x="300" y="150" fill="#a16207" font-size="12">0.87A</text>'
           '<text x="440" y="90" fill="#166534" font-size="12">0.5A</text>'
           '<text x="320" y="170" fill="#6b7280" font-size="12">θ = 30°: long horizontal, short vertical</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/08-types-of-vectors--2.json",
  "blocks": [{"after": "A free vector may be drawn anywhere provided its magnitude and direction stay the same. A force on a rigid body is not completely free, because its line of action decides the torque. The class keeps that distinction when moments are being calculated.",
    "table": ("Vector classification (classified)",
              ["Type", "Definition", "Example"],
              [["Zero/null", "Magnitude zero, direction undefined", "Net force in equilibrium"],
               ["Free", "Slide anywhere, same effect", "Pure velocity arrow"],
               ["Localised", "Fixed line of action", "Force on a lever"],
               ["Negative", "Same size, opposite sense", "−A"],
               ["Co-planar", "Lie in one plane", "2-D force systems"]]),
   "table1": ("Position, displacement, and equality",
              ["Concept", "Statement", "Trap"],
              [["Position vector", "Origin to point", "Depends on origin"],
               ["Displacement", "Change in position", "Independent of path"],
               ["Equal vectors", "Same magnitude AND direction", "Position irrelevant"],
               ["Collinear", "Along one line", "Can still differ in size"]]),
   "svg": ("Free vector: same arrow, many homes",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M140 120 L 240 120" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M300 70 L 400 70" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M440 130 L 540 130" stroke="#1d4ed8" stroke-width="3"/>'
           '<text x="320" y="165" fill="#6b7280" font-size="12">shifted, not changed</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/vectors/11-multiplication-of-vectors-vector-cross-product.json",
  "blocks": [{"after": "**Fact.** Triangle/parallelogram/polygon laws: vector sum is independent of order (commutative).",
    "table": ("Cross product mastery (classified)",
              ["Item", "Statement", "Use"],
              [["Direction", "Right-hand rule, ⊥ to both", "Orientation"],
               ["Magnitude", "AB sinθ = area of parallelogram", "Geometry link"],
               ["Anti-commutative", "A×B = −B×A", "Sign discipline"],
               ["2-D shortcut", "AₓB_y − A_yBₓ", "Fast numericals"]]),
   "table1": ("Cross products in physics",
              ["Quantity", "Formula", "Vector nature"],
              [["Torque", "τ = r × F", "Axis of rotation"],
               ["Magnetic force", "F = qv × B", "Perpendicular to v and B"],
               ["Angular momentum", "L = r × p", "Conserved vector"],
               ["Area vector", "A = ½ r₁ × r₂", "Flux calculations"]]),
   "svg": ("Right-hand rule: fingers A to B, thumb gives A×B",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M180 130 L 330 130" stroke="#1d4ed8" stroke-width="3"/>'
           '<path d="M180 130 L 280 70" stroke="#a16207" stroke-width="3"/>'
           '<path d="M180 130 L 180 55" stroke="#166534" stroke-width="3"/>'
           '<text x="345" y="135" fill="#1d4ed8" font-size="12">A</text>'
           '<text x="255" y="60" fill="#a16207" font-size="12">B</text>'
           '<text x="150" y="50" fill="#166534" font-size="12">A×B</text>'
           '<text x="470" y="110" fill="#6b7280" font-size="12">curl fingers A→B</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/work-energy-and-power/01-work-constant-variable-force.json",
  "blocks": [{"after": "**NEB exam focus:** work done by constant force (W = Fd cos θ), work done by a spring (W = ½kx²), work-energy theorem (W_net = ΔK), area under F-x graph for variable forces, and identifying zero-work situations.",
    "table": ("Work: cases and signs (classified)",
              ["Case", "Work", "Example"],
              [["Force along motion", "Positive, W = Fd", "Pushing a box forward"],
               ["Force opposite motion", "Negative", "Friction stopping a slide"],
               ["Force perpendicular", "Zero", "Circular motion, carrying load horizontally"],
               ["Zero displacement", "Zero", "Holding a wall"]]),
   "table1": ("Variable force: graph method",
              ["Situation", "Method", "Result"],
              [["F–x graph", "Area under curve", "Work done"],
               ["Spring (Hooke)", "Trapezoid/triangle", "W = ½kx²"],
               ["General F(x)", "Integration ∫F dx", "Exact work"],
               ["Average force", "W = F_avg·d", "Equivalent constant"]]),
   "svg": ("Area under F–x is the work done",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 60 L 440 60 L 440 160 Z" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="270" y="115" fill="#1d4ed8" font-size="12">area = W</text>'
           '<text x="490" y="70" fill="#a16207" font-size="12">F</text>'
           '<text x="490" y="150" fill="#374151" font-size="12">x</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/work-energy-and-power/03-work-energy-theorem.json",
  "blocks": [{"after": "Key definitions and theorems related to work-energy theorem should be memorized and practiced regularly.",
    "table": ("Work–energy theorem (classified)",
              ["Statement", "Form", "Use"],
              [["Theorem", "W_net = ΔKE = ½mv² − ½mu²", "Speed from work"],
               ["Stopping distance", "½mv² = μmg d", "Braking problems"],
               ["Variable force", "W = ∫mv dv", "General proof"],
               ["Net vs single force", "Use NET work", "Common error"]]),
   "table1": ("Energy bookkeeping across a ride",
              ["Segment", "Energy change", "Track it"],
              [["Climb", "KE → PE", "Speed drops"],
               ["Descend", "PE → KE", "Speed grows"],
               ["Flat with friction", "KE → heat", "Speed falls"],
               ["Loop entry", "PE ↔ KE + minimum speed", "Stay on track"]]),
   "svg": ("Work done changes the speed bank",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="140" y="60" width="140" height="60" rx="8" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="210" y="95" fill="#1d4ed8" font-size="12">KE before</text>'
           '<path d="M285 90 L 355 90" stroke="#a16207" stroke-width="3"/>'
           '<text x="320" y="75" fill="#a16207" font-size="12">+W</text>'
           '<rect x="360" y="45" width="140" height="90" rx="8" fill="#f0fdf4" stroke="#166534"/>'
           '<text x="430" y="95" fill="#166534" font-size="12">KE after</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/work-energy-and-power/04-conservation-energy.json",
  "blocks": [{"after": "**NEB exam focus:** work done by constant force (W = Fd cos θ), work done by a spring (W = ½kx²), work-energy theorem (W_net = ΔK), area under F-x graph for variable forces, and identifying zero-work situations.",
    "table": ("Energy conservation forms (classified)",
              ["Conversion", "From → To", "Example"],
              [["Gravitational", "PE ↔ KE", "Falling apple, roller coaster"],
               ["Elastic", "Spring PE ↔ KE", "Trampoline"],
               ["Dissipative", "KE → heat", "Friction, drag"],
               ["Electrical", "Chemical → electrical → KE", "Motor and battery"]]),
   "table1": ("Conservation equation setups",
              ["Problem", "Equation", "Solves"],
              [["Drop from h", "mgh = ½mv²", "Impact speed"],
               ["Slide down frictionless incline", "mg h = ½mv²", "Speed at bottom (height-based)"],
               ["Pendulum swing", "mgΔh = ½m(v₁²−v₂²)", "Speed at any angle"],
               ["With friction", "mgh = ½mv² + fd", "Energy audit"]]),
   "svg": ("Pendulum: energy swaps position twice per swing",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M320 40 L 200 140" stroke="#374151" stroke-width="2"/>'
           '<path d="M320 40 L 440 140" stroke="#374151" stroke-width="2"/>'
           '<circle cx="200" cy="140" r="9" fill="#1d4ed8"/>'
           '<circle cx="320" cy="150" r="9" fill="#166534"/>'
           '<circle cx="440" cy="140" r="9" fill="#1d4ed8"/>'
           '<text x="200" y="170" fill="#1d4ed8" font-size="11">PE max</text>'
           '<text x="320" y="180" fill="#166534" font-size="11">KE max</text>'
           '<text x="440" y="170" fill="#1d4ed8" font-size="11">PE max</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/work-energy-and-power/05-collisions.json",
  "blocks": [{"after": "**NEB exam focus:** work done by constant force (W = Fd cos θ), work done by a spring (W = ½kx²), work-energy theorem (W_net = ΔK), area under F-x graph for variable forces, and identifying zero-work situations.",
    "table": ("Collision outcomes (equal masses, 1-D) (classified)",
              ["Type", "After collision", "Energy"],
              [["Elastic, moving hits rest", "Moving stops, rest moves off at u", "KE conserved"],
               ["Elastic, both moving", "Velocities exchange (equal m)", "KE conserved"],
               ["Perfectly inelastic", "Common velocity mu/(m+M)", "Max KE loss"],
               ["General inelastic", "Between the extremes", "Some KE lost"]]),
   "table1": ("Collision formulas to carry",
              ["Quantity", "Formula", "Case"],
              [["Final v (perfectly inelastic)", "v = (m₁u₁+m₂u₂)/(m₁+m₂)", "Sticking bodies"],
               ["Elastic v₁&#8217;", "((m₁−m₂)u₁ + 2m₂u₂)/(m₁+m₂)", "General 1-D"],
               ["Elastic v₂&#8217;", "((m₂−m₁)u₂ + 2m₁u₁)/(m₁+m₂)", "General 1-D"],
               ["Heavy hits light", "Light flies at ≈2u", "Bowling pin effect"]]),
   "svg": ("Elastic collision: velocities exchange",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="180" cy="60" r="14" fill="#1d4ed8"/>'
           '<circle cx="300" cy="60" r="14" fill="#991b1b"/>'
           '<path d="M198 60 L 250 60" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="320" y="35" fill="#6b7280" font-size="12">before: → u, at rest</text>'
           '<circle cx="180" cy="150" r="14" fill="#1d4ed8"/>'
           '<circle cx="300" cy="150" r="14" fill="#991b1b"/>'
           '<path d="M282 150 L 230 150" stroke="#991b1b" stroke-width="2.5"/>'
           '<path d="M198 150 L 250 150" stroke="#1d4ed8" stroke-width="2.5" stroke-dasharray="5 4"/>'
           '<text x="420" y="155" fill="#991b1b" font-size="12">after: roles swap</text>'
           '</g></svg>')}]},
]
