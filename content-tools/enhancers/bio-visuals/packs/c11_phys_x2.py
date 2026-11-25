# class-11 physics EXTRAS pack x2 — dispersion (4) + dynamics (7) + elasticity (4)
TOPICS = [
 {"file": "class-11/physics/dispersion/01-dispersive-power-2.json",
  "blocks": [{"after": "**Rainbow formation:** a natural example of dispersion — sunlight undergoes refraction, internal reflection, and a second refraction inside water droplets, separating into the seven colours of the spectrum.",
    "table": ("Dispersion quantities (classified)",
              ["Quantity", "Formula", "Meaning"],
              [["Angular dispersion", "δ_v − δ_r = (μ_v − μ_r)A", "Spread of violet from red"],
               ["Mean deviation", "δ = (μ_y − 1)A", "Deviation of yellow"],
               ["Dispersive power", "ω = (μ_v − μ_r)/(μ_y − 1)", "Spread per unit mean deviation"],
               ["Prism angle", "A", "Controls both effects"]]),
   "table1": ("Colour order through a prism",
              ["Colour", "Refractive index", "Deviation"],
              [["Violet", "Highest", "Largest"],
               ["Yellow", "Middle", "Mean"],
               ["Red", "Lowest", "Smallest"],
               ["Cause", "μ varies with λ", "Cauchy relation"]]),
   "svg": ("White light fanned into a spectrum",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M320 60 L 260 150 L 380 150 Z" fill="none" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 110 L 268 100" stroke="#6b7280" stroke-width="2.5"/>'
           '<path d="M372 96 L 540 70" stroke="#7c3aed" stroke-width="2.5"/>'
           '<path d="M372 100 L 540 100" stroke="#a16207" stroke-width="2.5"/>'
           '<path d="M372 104 L 540 130" stroke="#dc2626" stroke-width="2.5"/>'
           '<text x="470" y="60" fill="#7c3aed" font-size="12">violet: most bent</text>'
           '<text x="470" y="150" fill="#dc2626" font-size="12">red: least bent</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">one angle in, many angles out</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dispersion/01-dispersive-power.json",
  "blocks": [{"after": "Dispersive power compares the spread of colours with the mean deviation. A flint glass can have a larger dispersive power than crown glass even when a particular prism of flint deviates the mean ray less, because the ratio, not the deviation alone, is ω.",
    "table": ("Dispersive power essentials (classified)",
              ["Item", "Statement", "Exam use"],
              [["Definition", "Ratio of angular dispersion to mean deviation", "2-m define"],
               ["Depends on", "Material (μ_v − μ_r)/(μ_y − 1), not on angle A", "4-m conceptual"],
               ["Typical values", "Crown ≈ 0.02, flint ≈ 0.04", "Numerical support"],
               ["Use", "Choosing prism pairs for achromatism", "8-m design"]]),
   "table1": ("Deviation without dispersion vs dispersion without deviation",
              ["Combination", "Condition", "Result"],
              [["Achromatic combination", "ω₁A₁ + ω₂A₂ = 0", "No spread, net deviation remains"],
               ["Direct-vision prism", "A₁δ₁ + A₂δ₂ = 0", "No net deviation, spread remains"],
               ["Materials", "Crown + flint", "Opposite behaviours pair up"]]),
   "svg": ("Two prisms cancel spread but keep bending",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M260 60 L 220 150 L 300 150 Z" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<path d="M340 60 L 380 150 L 300 150 Z" fill="#fefce8" stroke="#a16207"/>'
           '<path d="M110 105 L 240 100" stroke="#6b7280" stroke-width="2.5"/>'
           '<path d="M380 105 L 530 95" stroke="#dc2626" stroke-width="2.5"/>'
           '<path d="M380 108 L 530 112" stroke="#7c3aed" stroke-width="2.5"/>'
           '<text x="470" y="80" fill="#6b7280" font-size="11">slight spread</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">crown + flint: angles chosen to cancel colour</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dispersion/02-chromatic-aberration.json",
  "blocks": [{"after": "A single lens focuses violet closer to the lens than red, because violet has the higher index and a shorter focal length. The gap between those foci along the axis is the longitudinal chromatic aberration, about ω times the mean focal length.",
    "table": ("Chromatic vs spherical aberration (classified)",
              ["Type", "Cause", "Remedy"],
              [["Chromatic", "μ depends on λ", "Achromatic doublet"],
               ["Spherical", "Marginal rays bend more", "Stop down / parabolic surface"],
               ["Both degrade", "Blur and colour fringes", "Compound lens design"]]),
   "table1": ("Chromatic aberration facts",
              ["Fact", "Statement", "Use"],
              [["Violet focuses nearer", "f_v &lt; f_r", "Fringe order"],
               ["Longitudinal measure", "f_r − f_v", "Numerical"],
               ["Achromatic doublet", "ω₁/f₁ + ω₂/f₂ = 0", "Design condition"],
               ["Effect on image", "Coloured edges", "Describe defect"]]),
   "svg": ("Violet and red focus at different depths",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<ellipse cx="320" cy="100" rx="14" ry="60" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<path d="M110 70 C 240 85, 300 92, 380 95 L 470 97" fill="none" stroke="#7c3aed" stroke-width="2"/>'
           '<path d="M110 130 C 240 115, 300 108, 380 105 L 540 103" fill="none" stroke="#dc2626" stroke-width="2"/>'
           '<text x="420" y="85" fill="#7c3aed" font-size="12">violet focus</text>'
           '<text x="500" y="120" fill="#dc2626" font-size="12">red focus</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">one lens, two focal lengths</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dispersion/03-achromatism.json",
  "blocks": [{"after": "The contact condition uses powers, so the dispersive powers are divided by the focal lengths. If the two lenses are separated by a distance, the condition changes and a Huygens eyepiece uses that separated arrangement. Quoting the contact rule for a separated pair gives the wrong flint lens.",
    "table": ("Achromatic combination conditions (classified)",
              ["Goal", "Condition", "Meaning"],
              [["No colour spread", "ω₁δ₁ + ω₂δ₂ = 0", "Dispersions cancel"],
               ["Equivalent focal length", "1/F = 1/f₁ + 1/f₂", "Thin lenses in contact"],
               ["Material choice", "Crown + flint", "Different ω values"],
               ["Angle ratio", "A₁/A₂ = −ω₂/ω₁", "Opposite signs"]]),
   "table1": ("Achromatism vs direct vision",
              ["Property", "Achromatism", "Direct vision"],
              [["Cancelled", "Dispersion", "Deviation"],
               ["Kept", "Deviation", "Dispersion"],
               ["Use", "Telescope objectives", "Spectroscope prism trains"],
               ["Condition on", "ωA sum zero", "Aδ sum zero"]]),
   "svg": ("Achromatic doublet: two powers, one focus",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M300 60 Q 320 100 300 140 M340 60 Q 320 100 340 140" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M340 60 Q 322 100 340 140" fill="none" stroke="#a16207" stroke-width="2.5"/>'
           '<path d="M110 85 C 220 92, 280 96, 420 99 L 520 100" fill="none" stroke="#7c3aed" stroke-width="2"/>'
           '<path d="M110 115 C 220 108, 280 104, 420 101 L 520 100" fill="none" stroke="#dc2626" stroke-width="2"/>'
           '<text x="470" y="85" fill="#6b7280" font-size="12">colours reunite</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">crown converges, flint corrects</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/01-newtons-laws-of-motion.json",
  "blocks": [{"after": "The normal force from a table and the weight of a book are not a third-law pair. The third-law partner of the book's weight is the gravitational pull of the book on the Earth.",
    "table": ("Newton&#8217;s three laws (classified)",
              ["Law", "Statement", "Everyday example"],
              [["First (inertia)", "Body keeps state unless net force acts", "Passengers lurch when bus brakes"],
               ["Second", "F = ma; rate of change of momentum", "Push a loaded trolley"],
               ["Third", "Equal and opposite reaction pairs", "Walking pushes ground back"],
               ["Frame note", "First law defines inertial frames", "Accelerating bus is non-inertial"]]),
   "table1": ("Force pairs bookkeeping",
              ["Pair", "Action", "Reaction"],
              [["Book–table", "Weight of book on table", "Normal force on book? No — contact pair"],
               ["Book–Earth", "Earth pulls book", "Book pulls Earth"],
               ["Walking", "Foot pushes ground backward", "Ground pushes foot forward"],
               ["Rocket", "Gas pushed down", "Rocket pushed up"]]),
   "svg": ("Third law pair: two bodies, two forces, one interaction",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="180" y="80" width="110" height="50" rx="8" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<rect x="350" y="80" width="110" height="50" rx="8" fill="#fef2f2" stroke="#991b1b"/>'
           '<path d="M295 105 L 345 105" stroke="#374151" stroke-width="2.5"/>'
           '<path d="M345 125 L 295 125" stroke="#374151" stroke-width="2.5"/>'
           '<text x="320" y="95" fill="#374151" font-size="12">F₁₂</text>'
           '<text x="320" y="145" fill="#374151" font-size="12">F₂₁</text>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">equal, opposite, on different bodies — never cancel</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/02-conservation-linear-momentum.json",
  "blocks": [{"after": "**NEB exam focus:** state the law with its condition (no net external force); derive it from the third law; solve recoil and explosion numericals; explain rocket propulsion and the gun recoil by momentum conservation.",
    "table": ("Momentum conservation (classified)",
              ["Case", "Condition", "Result"],
              [["Isolated system", "No net external force", "Total p constant"],
               ["Explosion", "Internal forces only", "Fragments carry vector sum zero"],
               ["Recoil", "Gun + bullet system", "MV = −mv"],
               ["Rocket", "Mass ejects backward", "Forward momentum gain"]]),
   "table1": ("Collision types compared",
              ["Type", "Momentum", "Kinetic energy", "Example"],
              [["Elastic", "Conserved", "Conserved", "Gas molecules"],
               ["Inelastic", "Conserved", "Partly lost", "Clay balls"],
               ["Perfectly inelastic", "Conserved", "Maximum loss", "Coupling of coaches"]]),
   "svg": ("Before and after: vector sum unchanged",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="180" cy="70" r="14" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<circle cx="460" cy="70" r="18" fill="#fef2f2" stroke="#991b1b"/>'
           '<path d="M200 70 L 300 70" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="320" y="45" fill="#6b7280" font-size="12">before: p = m₁v₁ + m₂v₂</text>'
           '<circle cx="260" cy="150" r="16" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<circle cx="420" cy="150" r="16" fill="#fef2f2" stroke="#991b1b"/>'
           '<path d="M280 150 L 330 150" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M398 150 L 350 150" stroke="#991b1b" stroke-width="2.5"/>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">after: vector sum identical</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/02-momentum-impulse-and-conservation.json",
  "blocks": [{"after": "Kinetic energy is conserved only in an elastic collision. Momentum conservation does not need that extra condition. In a perfectly inelastic collision the bodies stick, and you still use momentum conservation, with a shared final velocity.",
    "table": ("Impulse relations (classified)",
              ["Quantity", "Formula", "Unit", "Meaning"],
              [["Impulse", "J = FΔt = Δp", "N·s", "Force integrated over time"],
               ["Momentum", "p = mv", "kg·m/s", "Quantity of motion"],
               ["Average force", "F = Δp/Δt", "N", "Smaller Δt → larger F"],
               ["Area under F–t", "Equals impulse", "—", "Graph reading"]]),
   "table1": ("Impulse in safety design",
              ["Design", "Strategy", "Physics"],
              [["Airbag", "Increases Δt", "Same Δp, smaller F"],
               ["Crumple zone", "Extends stopping distance", "Force spread over time"],
               ["Bending knees", "Longer landing time", "Reduces peak force"],
               ["Cricket follow-through", "Longer contact", "Gentler catch"]]),
   "svg": ("Same Δp, different Δt: force spike vs force spread",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M140 160 L 180 40 L 220 160 Z" fill="#fef2f2" stroke="#991b1b"/>'
           '<path d="M340 160 C 400 60, 500 60, 560 160" fill="none" stroke="#166534" stroke-width="2.5"/>'
           '<text x="180" y="30" fill="#991b1b" font-size="12">hard stop: big F, tiny Δt</text>'
           '<text x="450" y="45" fill="#166534" font-size="12">airbag: small F, long Δt</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">areas equal — same impulse</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/03-moment-torque-and-equilibrium.json",
  "blocks": [{"after": "## 5. Exam Orientation",
    "table": ("Torque essentials (classified)",
              ["Quantity", "Formula", "Unit", "Note"],
              [["Torque", "τ = rF sinθ", "N·m", "Turning effect"],
               ["Moment arm", "r sinθ", "m", "Perpendicular distance"],
               ["Couple", "τ = Fd", "N·m", "Two equal opposite forces"],
               ["Equilibrium", "Στ = 0 and ΣF = 0", "—", "Both conditions needed"]]),
   "table1": ("Equilibrium types",
              ["Type", "After small tilt", "Example"],
              [["Stable", "Returns", "Cone on its base"],
               ["Unstable", "Moves further", "Cone on its tip"],
               ["Neutral", "Stays", "Ball on floor"],
               ["Condition", "Centre of gravity behaviour", "Height rises/falls/stays"]]),
   "svg": ("See-saw balance: τ = rF on both sides",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M140 100 L 500 100" stroke="#374151" stroke-width="3"/>'
           '<path d="M320 100 L 320 150" stroke="#374151" stroke-width="3"/>'
           '<circle cx="180" cy="88" r="12" fill="#1d4ed8"/>'
           '<circle cx="440" cy="88" r="9" fill="#991b1b"/>'
           '<text x="180" y="70" fill="#1d4ed8" font-size="12">F₁ at r₁</text>'
           '<text x="440" y="70" fill="#991b1b" font-size="12">F₂ at r₂</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">balanced when r₁F₁ = r₂F₂</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/03-newton-laws-application.json",
  "blocks": [{"after": "**NEB exam focus:** elevator problems, Atwood's machine, connected bodies on horizontal surfaces, inclined plane with/without friction, apparent weight in accelerating systems — all use the same FBD → ΣF = ma framework.",
    "table": ("Applied dynamics setups (classified)",
              ["Setup", "Key equation", "Watch for"],
              [["Lift accelerating up", "N = m(g + a)", "Apparent weight rises"],
               ["Lift accelerating down", "N = m(g − a)", "N = 0 at a = g"],
               ["Atwood machine", "a = (m₂−m₁)g/(m₁+m₂)", "Tension same both sides"],
               ["Body on incline", "a = g(sinθ − μcosθ)", "Sign of motion"]]),
   "table1": ("Free-body diagram discipline",
              ["Step", "Action", "Error avoided"],
              [["1", "Isolate the body", "Mixing systems"],
               ["2", "Draw only real forces", "Inventing ma arrows"],
               ["3", "Choose axes along motion", "Extra algebra"],
               ["4", "Apply F = ma per axis", "Sign slips"]]),
   "svg": ("Lift frame: real forces only",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="240" y="90" width="160" height="70" rx="8" fill="#f8fafc" stroke="#374151"/>'
           '<circle cx="320" cy="125" r="12" fill="#fefce8" stroke="#a16207"/>'
           '<path d="M320 113 L 320 55" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M320 137 L 320 180" stroke="#991b1b" stroke-width="2.5"/>'
           '<text x="360" y="60" fill="#1d4ed8" font-size="12">N = m(g±a)</text>'
           '<text x="360" y="178" fill="#991b1b" font-size="12">mg</text>'
           '<text x="320" y="30" fill="#6b7280" font-size="12">two real forces; nothing else</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/04-torque-equilibrium.json",
  "blocks": [{"after": "**Practical examples:** opening a door (push at the handle, not near the hinge — larger r gives more τ), using a spanner (longer handle = more torque for the same force), a wheelbarrow (load CG near the wheel reduces the lifting torque).",
    "table": ("Rigid-body equilibrium (classified)",
              ["Condition", "Statement", "Use"],
              [["Translational", "ΣF = 0", "No acceleration of CM"],
               ["Rotational", "Στ = 0 about any axis", "No angular acceleration"],
               ["Choice of axis", "Any point works", "Pick point with unknown forces"],
               ["Ladder problem", "Wall smooth: only normal", "Classic NEB setup"]]),
   "table1": ("Centre of gravity facts",
              ["Fact", "Statement", "Application"],
              [["Definition", "Point where weight effectively acts", "Simplify bodies"],
               ["Uniform body", "At geometric centre", "Rod, disc"],
               ["Stability", "Topples when CoG line leaves base", "Vehicle design"],
               ["Lower CoG", "More stable", "Racing cars"]]),
   "svg": ("Ladder against a smooth wall: three forces decide",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M180 160 L 460 40" stroke="#374151" stroke-width="3"/>'
           '<path d="M160 160 L 500 160" stroke="#78350f" stroke-width="3"/>'
           '<path d="M460 40 L 460 100" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M320 100 L 320 160" stroke="#991b1b" stroke-width="2.5"/>'
           '<path d="M180 160 L 180 110" stroke="#166534" stroke-width="2.5"/>'
           '<text x="487" y="80" fill="#1d4ed8" font-size="11">N_wall</text>'
           '<text x="330" y="130" fill="#991b1b" font-size="11">W at CoG</text>'
           '<text x="150" y="130" fill="#166534" font-size="11">friction + N_floor</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dynamics/05-solid-friction.json",
  "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Friction types and laws (classified)",
              ["Type", "When it acts", "Size"],
              [["Static", "Before sliding starts", "Adjusts up to μ_sN"],
               ["Kinetic", "During sliding", "μ_kN, roughly constant"],
               ["Rolling", "Wheel contact", "Much smaller"],
               ["Limiting", "Just at slip", "Maximum static value"]]),
   "table1": ("Angle of repose and inclination",
              ["Quantity", "Relation", "Meaning"],
              [["Angle of repose", "tanθ = μ_s", "Slide begins at θ"],
               ["On incline at rest", "f = mg sinθ", "Friction equals pull"],
               ["Sliding down", "a = g(sinθ − μ_k cosθ)", "Net acceleration"],
               ["Just slipping", "μ_s = tanθ_limit", "Measurement method"]]),
   "svg": ("Friction grows to a limit, then drops",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 300 60" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M300 75 L 540 75" stroke="#a16207" stroke-width="2.5"/>'
           '<text x="330" y="60" fill="#a16207" font-size="12">kinetic μ_kN</text>'
           '<text x="310" y="45" fill="#1d4ed8" font-size="12">limiting μ_sN</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">static adjusts; kinetic holds steady</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/elasticity/01-hooke-law-force-constant.json",
  "blocks": [{"after": "**Conditions for Hooke's law to hold:** the deformation must be small, elastic (the body returns to original shape when the load is removed), and within the proportional limit. Overstretching a spring permanently changes its k.",
    "table": ("Hooke&#8217;s law quantities (classified)",
              ["Quantity", "Formula", "Unit", "Meaning"],
              [["Extension", "x", "m", "Change in length"],
               ["Spring constant", "k = F/x", "N/m", "Stiffness"],
               ["Series springs", "1/k = 1/k₁ + 1/k₂", "—", "Softer"],
               ["Parallel springs", "k = k₁ + k₂", "—", "Stiffer"]]),
   "table1": ("Hooke&#8217;s law limits",
              ["Region", "Behaviour", "On graph"],
              [["Proportional limit", "F ∝ x exactly", "Straight line"],
               ["Elastic limit", "Returns, not proportional", "Curve starts"],
               ["Yield point", "Permanent set", "Plastic region"],
               ["Breaking point", "Fracture", "End of curve"]]),
   "svg": ("F–x graph: straight, then yield, then break",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 300 70 C 360 45, 420 55, 470 40 C 500 33, 520 30, 535 28" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="200" y="80" fill="#1d4ed8" font-size="12">Hooke region</text>'
           '<text x="450" y="65" fill="#991b1b" font-size="12">plastic → break</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">slope = k while the line is straight</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/elasticity/02-stress-strain-elasticity.json",
  "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Stress and strain types (classified)",
              ["Type", "Formula", "Shape change"],
              [["Longitudinal (tensile)", "F/A, ΔL/L", "Stretch"],
               ["Compressive", "F/A, ΔL/L", "Squeeze"],
               ["Shear", "F/A, x/y", "Angle change"],
               ["Volume (bulk)", "Pressure, ΔV/V", "Uniform squeeze"]]),
   "table1": ("Material behaviour vocabulary",
              ["Term", "Meaning", "Example material"],
              [["Ductile", "Large plastic stretch", "Copper wire"],
               ["Brittle", "Fractures with little strain", "Glass, chalk"],
               ["Elastomer", "Very large strain, returns", "Rubber"],
               ["Fatigue", "Failure after repeated load", "Springs, aircraft parts"]]),
   "svg": ("Stress–strain map of a ductile metal",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 35" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 260 60 C 330 30, 390 45, 440 38 C 480 33, 520 30, 545 28" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="190" y="70" fill="#166534" font-size="11">elastic</text>'
           '<text x="380" y="60" fill="#a16207" font-size="11">plastic</text>'
           '<text x="540" y="20" fill="#991b1b" font-size="11">fracture</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">slope in the elastic region = Young&#8217;s modulus</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/elasticity/03-elastic-modulus.json",
  "blocks": [{"after": "**Which modulus to use?** stretching a wire → Young's modulus; squeezing a sphere → bulk modulus; twisting/sliding layers → shear modulus. Choose by the type of deformation.",
    "table": ("Three moduli (classified)",
              ["Modulus", "Ratio", "Situation"],
              [["Young&#8217;s Y", "(F/A)/(ΔL/L)", "Wire stretched"],
               ["Bulk B", "−P/(ΔV/V)", "Pressure all sides"],
               ["Shear (rigidity) η", "(F/A)/(x/y)", "Cuboid twisted"],
               ["Relation", "Solids have all three; liquids only B", "State test"]]),
   "table1": ("Modulus reasoning for exams",
              ["Question type", "Use", "Trap"],
              [["Which wire stretches more?", "ΔL = FL/AY", "Longer/thinner stretches more"],
               ["Which compresses less?", "Larger B", "Liquids have huge B"],
               ["Twist a rod", "Use η", "Not Y"],
               ["Units", "All moduli in N/m²", "Same as pressure"]]),
   "svg": ("Three ways to deform one block",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="12">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="90" y="70" width="110" height="60" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="145" y="155" fill="#1d4ed8" font-size="11">pull: Y</text>'
           '<path d="M200 70 L 215 60" stroke="#1d4ed8" stroke-width="2"/>'
           '<rect x="270" y="80" width="110" height="45" fill="#f0fdf4" stroke="#166534"/>'
           '<text x="325" y="155" fill="#166534" font-size="11">squeeze: B</text>'
           '<path d="M400 70 L 500 70 L 515 130 L 415 130 Z" fill="#fefce8" stroke="#a16207"/>'
           '<text x="465" y="155" fill="#a16207" font-size="11">shear: η</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/elasticity/04-poisson-ratio.json",
  "blocks": [{"after": "**Applications:** σ matters in designing cables, stretching films, and geological materials; cork (σ≈0) is chosen for bottle stoppers because it doesn't change width when squeezed, so it seals without expanding.",
    "table": ("Poisson&#8217;s ratio facts (classified)",
              ["Item", "Statement", "Range"],
              [["Definition", "σ = −(lateral strain)/(longitudinal strain)", "—"],
               ["Theoretical limits", "−1 to 0.5", "Isotropic materials"],
               ["Typical values", "Metals ≈ 0.25–0.35", "Steel ≈ 0.3"],
               ["Cork", "σ ≈ 0", "Why cork stops bottles"]]),
   "table1": ("Stretch a wire: what changes",
              ["Quantity", "Change", "Formula link"],
              [["Length", "Increases", "Longitudinal strain"],
               ["Diameter", "Decreases", "Lateral strain"],
               ["Volume", "Slightly changes", "Depends on σ"],
               ["Auxetic materials", "Get fatter", "Negative σ"]]),
   "svg": ("Stretch: longer and thinner",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="140" y="85" width="150" height="34" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<rect x="350" y="92" width="180" height="20" fill="#fefce8" stroke="#a16207"/>'
           '<path d="M290 102 L 350 102" stroke="#9ca3af" stroke-width="2"/>'
           '<text x="215" y="140" fill="#1d4ed8" font-size="12">before</text>'
           '<text x="440" y="140" fill="#a16207" font-size="12">after: longer, thinner</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">σ ties the two strains together</text>'
           '</g></svg>')}]},
]
