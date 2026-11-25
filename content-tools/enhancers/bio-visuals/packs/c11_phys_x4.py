# class-11 physics EXTRAS pack x4 — gravitation (6) + kinematics (6)
TOPICS = [
 {"file": "class-11/physics/gravitation/01-newton-law-gravitation.json",
  "blocks": [{"after": "**Important comparisons:** gravity is the weakest of the four fundamental forces — between two protons the gravitational force is ~10⁻³⁶ times the electric force — yet it dominates cosmology because mass adds up while electric charges cancel.",
    "table": ("Gravitation core facts (classified)",
              ["Item", "Statement", "Exam use"],
              [["Law", "F = Gm₁m₂/r²", "Universal attraction"],
               ["G value", "6.67×10⁻¹¹ N·m²/kg²", "Same everywhere"],
               ["Shell theorem", "Shell acts as point mass outside; zero inside", "Sphere problems"],
               ["Weakest force", "Gravity is 10³⁶ times weaker than electric", "Comparison question"]]),
   "table1": ("g vs G (classic confusion)",
              ["Aspect", "g", "G"],
              [["Value", "9.8 m/s² (varies)", "6.67×10⁻¹¹ (constant)"],
               ["Nature", "Acceleration", "Universal constant"],
               ["Depends on", "Planet and position", "Nothing"],
               ["Units", "m/s²", "N·m²/kg²"]]),
   "svg": ("Two masses attract along the joining line",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="180" cy="90" r="26" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<circle cx="460" cy="90" r="18" fill="#fef2f2" stroke="#991b1b"/>'
           '<path d="M212 90 L 260 90" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M436 90 L 390 90" stroke="#991b1b" stroke-width="2.5"/>'
           '<text x="320" y="60" fill="#374151" font-size="12">F = Gm₁m₂/r²</text>'
           '<text x="320" y="165" fill="#6b7280" font-size="12">equal and opposite — a third-law pair</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/gravitation/03-gravitational-potential-energy.json",
  "blocks": [{"after": "**Superposition:** for multiple masses, $V = \\sum\\left(-\\frac{GM_i}{r_i}\\right)$ and $U = \\sum\\left(-\\frac{GM_i m}{r_i}\\right)$ — potentials add as scalars, which is much simpler than adding force vectors.",
    "table": ("Gravitational energy quantities (classified)",
              ["Quantity", "Formula", "Zero reference"],
              [["PE of pair", "U = −Gm₁m₂/r", "Zero at infinity"],
               ["Potential", "V = −GM/r", "Infinity"],
               ["Near-surface PE", "ΔU = mgh", "Ground level"],
               ["Escape energy", "½mv² = GMm/R", "Just escapes"]]),
   "table1": ("Binding energy ideas",
              ["Concept", "Statement", "Use"],
              [["Bound system", "Total energy negative", "Planet stays"],
               ["Escape speed", "v_e = √(2GM/R)", "11.2 km/s for Earth"],
               ["Orbit energy", "E = −GMm/2r", "Half the PE magnitude"]]),
   "svg": ("Potential well: deeper means more bound",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M100 60 C 200 60, 240 170, 320 170 C 400 170, 440 60, 540 60" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<circle cx="320" cy="170" r="7" fill="#991b1b"/>'
           '<text x="320" y="45" fill="#374151" font-size="12">U = 0 at infinity</text>'
           '<text x="320" y="192" fill="#991b1b" font-size="12">U = −GMm/r at the bottom</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/gravitation/04-variation-g-altitude-depth.json",
  "blocks": [{"after": "**Altitude formula for satellites:** for an orbit at height h, effective r = R + h: v = √(GM/(R+h)) and the orbital g is g' = GM/(R+h)² — the same g formula used at that radius.",
    "table": ("Variation of g (classified)",
              ["Position", "Formula", "Effect"],
              [["Altitude h", "g&#8217; = g(1 − 2h/R) for h≪R", "Decreases"],
               ["Depth d", "g&#8217; = g(1 − d/R)", "Decreases linearly"],
               ["Rotation (latitude)", "g&#8217; = g − ω²R cos²λ", "Least at equator"],
               ["Centre of Earth", "g = 0", "Shell theorem"]]),
   "table1": ("Comparing two locations",
              ["Case", "Which g larger", "Reason"],
              [["Pole vs equator", "Pole", "Smaller radius, no spin term"],
               ["Sea vs mountain", "Sea", "Closer to centre"],
               ["Mine vs surface", "Surface", "Depth reduces g"],
               ["Planet mass doubles, R same", "g doubles", "g = GM/R²"]]),
   "svg": ("g rises from centre, falls with height",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 155 L 300 60" stroke="#166534" stroke-width="2.5"/>'
           '<path d="M300 60 C 380 55, 470 75, 550 110" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="200" y="95" fill="#166534" font-size="12">depth: linear rise</text>'
           '<text x="450" y="85" fill="#1d4ed8" font-size="12">altitude: slow fall</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">surface value is the peak</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/gravitation/05-centre-mass-gravity.json",
  "blocks": [{"after": "**Properties:** (1) The COM of a uniform, symmetric body lies at its geometric centre. (2) The COM of two bodies lies on the line joining them. (3) For irregular bodies the COM can lie OUTSIDE the material (e.g., a ring, a boomerang, a bent L-shape). (4) The total linear momentum of a system equals M·V_cm — external forces alone can change V_cm.",
    "table": ("Centre of mass vs centre of gravity (classified)",
              ["Aspect", "Centre of mass", "Centre of gravity"],
              [["Definition", "Mass-weighted average point", "Point where weight acts"],
               ["Uniform field", "Same point", "Same point"],
               ["Non-uniform field", "Still defined", "Shifts slightly"],
               ["Calculation", "Σmx/Σm", "Same in uniform g"]]),
   "table1": ("COM positions to remember",
              ["Body", "COM location", "Note"],
              [["Uniform rod", "Midpoint", "Symmetry"],
               ["Triangle (lamina)", "Centroid", "Medians meet"],
               ["Two-body system", "Closer to heavier mass", "Lever rule"],
               ["Ring/hollow shell", "Centre (empty space!)", "COM need not be in material"]]),
   "svg": ("COM of two masses sits on the lever rule",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M120 100 L 520 100" stroke="#374151" stroke-width="2.5"/>'
           '<circle cx="160" cy="88" r="14" fill="#1d4ed8"/>'
           '<circle cx="460" cy="88" r="9" fill="#991b1b"/>'
           '<path d="M320 100 L 320 130" stroke="#a16207" stroke-width="3"/>'
           '<text x="320" y="155" fill="#a16207" font-size="12">COM: closer to the heavy one</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/gravitation/06-satellite-motion.json",
  "blocks": [{"after": "**Orbit changes:** to transfer between circular orbits, a Hohmann ellipse uses two engine burns; near perigee/apogee speeds change by $\\Delta v = v_2 - v_1$. Firing thrust ahead slows the satellite and lowers the orbit; firing backward raises it.",
    "table": ("Orbital formulas (classified)",
              ["Quantity", "Formula", "Note"],
              [["Orbital speed", "v = √(GM/r)", "Decreases with r"],
               ["Orbital period", "T = 2π√(r³/GM)", "Kepler&#8217;s third law"],
               ["Kinetic energy", "GMm/2r", "Half of |PE|"],
               ["Total energy", "−GMm/2r", "Negative: bound"]]),
   "table1": ("Orbit changes and transfer",
              ["Manoeuvre", "Effect", "Energy"],
              [["Speed up forward", "Orbit rises", "Higher orbit, slower speed"],
               ["Slow down", "Orbit drops", "Falls inward"],
               ["Hohmann transfer", "Two burns", "Ellipse between circles"],
               ["Air drag", "Orbit decays", "Satellite spirals in"]]),
   "svg": ("Circular orbit: gravity bends, speed sustains",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="220" cy="100" r="30" fill="#fefce8" stroke="#a16207"/>'
           '<text x="220" y="105" fill="#a16207" font-size="11">Earth</text>'
           '<circle cx="220" cy="100" r="75" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-dasharray="6 4"/>'
           '<circle cx="295" cy="100" r="7" fill="#1d4ed8"/>'
           '<path d="M295 100 L 345 70" stroke="#166534" stroke-width="2.5"/>'
           '<path d="M295 100 L 250 100" stroke="#991b1b" stroke-width="2.5"/>'
           '<text x="360" y="65" fill="#166534" font-size="11">v</text>'
           '<text x="230" y="130" fill="#991b1b" font-size="11">gravity</text>'
           '<text x="480" y="105" fill="#6b7280" font-size="12">falling forever, missing the ground</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/gravitation/08-geostationary-satellite.json",
  "blocks": [{"after": "**Energy at geostationary orbit:** for m = 1000 kg, U = −GMm/r ≈ −9.4×10⁹ J, E_total = −GMm/2r ≈ −4.7×10⁹ J. Launching to this height needs a large boost — the standard launch uses a geostationary transfer orbit (GTO) followed by an apogee burn.",
    "table": ("Geostationary requirements (classified)",
              ["Requirement", "Value", "Why"],
              [["Period", "24 h (sidereal day)", "Matches Earth spin"],
               ["Height", "≈ 36,000 km", "Sets the period"],
               ["Orbit", "Equatorial, circular", "Stays over one meridian"],
               ["Direction", "West to east", "Same as rotation"]]),
   "table1": ("Geostationary vs polar orbit",
              ["Aspect", "Geostationary", "Polar"],
              [["Coverage", "One-third of globe, fixed", "Whole globe over time"],
               ["Height", "36,000 km", "500–800 km"],
               ["Period", "24 h", "≈ 100 min"],
               ["Use", "Communication, weather", "Mapping, surveillance"]]),
   "svg": ("Geostationary belt above the equator",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="320" cy="110" r="34" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="320" y="115" fill="#1d4ed8" font-size="11">Earth</text>'
           '<circle cx="320" cy="110" r="90" fill="none" stroke="#a16207" stroke-width="2" stroke-dasharray="6 4"/>'
           '<circle cx="410" cy="110" r="6" fill="#a16207"/>'
           '<circle cx="230" cy="110" r="6" fill="#a16207"/>'
           '<text x="470" y="95" fill="#a16207" font-size="12">24 h parking spots</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">r ≈ 42,000 km from centre</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/kinematics/01-instantaneous-velocity-acceleration.json",
  "blocks": [{"after": "**NEB exam focus:** define instantaneous velocity/acceleration as limits; differentiate a given $x(t)$; find when a particle is at rest or reverses; convert between $x$–$t$, $v$–$t$ and $a$–$t$ graphs (slopes and areas).",
    "table": ("Average vs instantaneous (classified)",
              ["Quantity", "Definition", "Graph meaning"],
              [["Average velocity", "Δx/Δt", "Chord slope on x–t"],
               ["Instantaneous velocity", "dx/dt", "Tangent slope on x–t"],
               ["Average acceleration", "Δv/Δt", "Chord slope on v–t"],
               ["Instantaneous acceleration", "dv/dt", "Tangent slope on v–t"]]),
   "table1": ("Speed vs velocity traps",
              ["Trap", "Correct view", "Example"],
              [["Average speed ≠ |average velocity|", "Speed uses path length", "Round trip: speed 5, velocity 0"],
               ["Zero velocity, moving?", "Only at an instant turnaround", "Ball at top of throw"],
               ["Negative acceleration", "Means direction, not slowing", "Backward speed-up"]]),
   "svg": ("Chord slope vs tangent slope",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 150 C 250 130, 350 90, 520 45" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M140 145 L 480 62" stroke="#a16207" stroke-width="2" stroke-dasharray="6 4"/>'
           '<path d="M360 88 L 440 58" stroke="#166534" stroke-width="2.5"/>'
           '<text x="250" y="120" fill="#a16207" font-size="12">average (chord)</text>'
           '<text x="430" y="45" fill="#166534" font-size="12">instantaneous (tangent)</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/kinematics/01-motion-frame-of-reference-and-branches-of-mechanics.json",
  "blocks": [{"after": "A rest statement is incomplete until the frame is named. Rest in one frame can be motion in another. The laws used to predict the motion are written in an inertial frame.",
    "table": ("Branches of mechanics (classified)",
              ["Branch", "Studies", "Example"],
              [["Kinematics", "Motion without causes", "Trajectory of a throw"],
               ["Dynamics", "Motion and its causes", "Why the car turns"],
               ["Statics", "Bodies at rest, balanced forces", "Bridge loads"],
               ["Kinetics", "Forces and resulting motion", "Rocket thrust analysis"]]),
   "table1": ("Frames of reference",
              ["Frame", "Behaviour", "Example"],
              [["Inertial", "Newton&#8217;s laws hold", "Ground (approximately)"],
               ["Non-inertial", "Fictitious forces appear", "Accelerating bus"],
               ["Relative motion", "Velocities add as vectors", "Boat in river"],
               ["Rest is relative", "Statement needs a frame", "Passenger vs platform"]]),
   "svg": ("Same event, two frames",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="110" y="70" width="180" height="60" rx="8" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="200" y="105" fill="#1d4ed8" font-size="12">bus frame: ball falls straight</text>'
           '<rect x="350" y="70" width="180" height="60" rx="8" fill="#fefce8" stroke="#a16207"/>'
           '<text x="440" y="105" fill="#a16207" font-size="12">ground frame: parabola</text>'
           '<path d="M290 100 L 350 100" stroke="#374151" stroke-width="2.5"/>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">motion described, not absolute</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/kinematics/03-equation-of-motion-graphical.json",
  "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Graph reading rules (classified)",
              ["Graph", "Slope gives", "Area gives"],
              [["x–t", "Velocity", "Nothing useful"],
               ["v–t", "Acceleration", "Displacement"],
               ["a–t", "Jerk (rarely used)", "Change in velocity"]]),
   "table1": ("Shape recognition",
              ["v–t shape", "Motion", "Example"],
              [["Horizontal line", "Uniform velocity", "Cruise"],
               ["Straight sloped line", "Uniform acceleration", "Free fall"],
               ["Curve steepening", "Increasing acceleration", "Rocket"],
               ["Line crossing axis", "Reversal of direction", "Bounce"]]),
   "svg": ("v–t: area below is distance travelled",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 140 L 420 50 L 420 160 Z" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="260" y="115" fill="#1d4ed8" font-size="12">area = displacement</text>'
           '<text x="470" y="90" fill="#a16207" font-size="12">slope = a</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/kinematics/04-equations-of-motion-graphical.json",
  "blocks": [{"after": "A curved path with changing acceleration, such as a spring-mass oscillation, is not a place to drop these three equations in. Constant a is the condition.",
    "table": ("Three equations of motion (classified)",
              ["Equation", "Missing variable", "Best for"],
              [["v = u + at", "s", "Time questions"],
               ["s = ut + ½at²", "v", "Distance questions"],
               ["v² = u² + 2as", "t", "No-time questions"],
               ["s = (u+v)t/2", "a", "Average-speed method"]]),
   "table1": ("Sign conventions that save marks",
              ["Situation", "Take positive", "Result"],
              [["Upward throw", "Up", "a = −g"],
               ["Dropped ball", "Down", "a = +g"],
               ["Braking car", "Direction of motion", "a negative"],
               ["Bounce", "Choose per segment", "Restart each phase"]]),
   "svg": ("Throw up: v decreases, reverses, grows downward",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 110 L 560 110" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 40 L 110 180" stroke="#374151" stroke-width="2"/>'
           '<path d="M130 60 L 330 110 L 530 160" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="200" y="50" fill="#1d4ed8" font-size="12">up: v &gt; 0</text>'
           '<text x="450" y="185" fill="#991b1b" font-size="12">down: v &lt; 0</text>'
           '<text x="320" y="100" fill="#166534" font-size="11">apex: v = 0, a = −g still</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/kinematics/04-freely-falling-body.json",
  "blocks": [{"after": "**NEB exam focus:** state that $g$ is mass-independent (with the Galileo/feather-coin argument); compute maximum height, time of flight, velocity on impact; apply up–down symmetry; solve dropped/thrown-from-lift problems with one consistent sign convention.",
    "table": ("Free fall facts (classified)",
              ["Fact", "Statement", "Evidence"],
              [["g is mass-independent", "All bodies fall alike in vacuum", "Feather–coin demo"],
               ["g ≈ 9.8 m/s²", "Downward acceleration", "Timing experiments"],
               ["No air: a = g always", "Speed grows 9.8 each second", "Strobe photos"],
               ["With air: terminal speed", "Drag balances weight", "Raindrops, parachutes"]]),
   "table1": ("Drop and throw numbers",
              ["Case", "Formula", "Example"],
              [["Dropped from h", "h = ½gt²", "20 m → 2 s"],
               ["Thrown down at u", "h = ut + ½gt²", "Faster landing"],
               ["Thrown up to h", "h = u²/2g", "Max height"],
               ["Time up = time down", "Symmetric flight", "Same speed return"]]),
   "svg": ("Strobe fall: spacing grows with t²",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<g fill="#1d4ed8">'
           '<circle cx="180" cy="50" r="7"/><circle cx="180" cy="72" r="7"/>'
           '<circle cx="180" cy="116" r="7"/><circle cx="180" cy="182" r="7"/></g>'
           '<g stroke="#9ca3af" stroke-width="1.5">'
           '<path d="M195 61 L 230 61"/><path d="M195 94 L 230 94"/><path d="M195 149 L 230 149"/></g>'
           '<g font-size="11" fill="#374151">'
           '<text x="250" y="65">1 unit</text><text x="250" y="98">3 units</text>'
           '<text x="250" y="153">5 units</text></g>'
           '<text x="450" y="110" fill="#6b7280" font-size="12">odd-number spacing: s ∝ t²</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/kinematics/05-projectile-motion.json",
  "blocks": [{"after": "## 6. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Projectile formulas (angle θ, speed u) (classified)",
              ["Quantity", "Formula", "Max value"],
              [["Time of flight", "T = 2u sinθ/g", "2u/g at 90°"],
               ["Max height", "H = u²sin²θ/2g", "u²/2g at 90°"],
               ["Range", "R = u²sin2θ/g", "u²/g at 45°"],
               ["Complementary angles", "θ and 90°−θ", "Same range"]]),
   "table1": ("Independence of components",
              ["Axis", "Motion", "Acceleration"],
              [["Horizontal", "Uniform: x = u cosθ · t", "Zero (no air)"],
               ["Vertical", "Accelerated: y = u sinθ · t − ½gt²", "−g"],
               ["Velocity at apex", "Horizontal only", "v = u cosθ"],
               ["Path shape", "Parabola", "Combination"]]),
   "svg": ("Parabola: horizontal dashes, vertical arrows",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 Q 320 20 530 160" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<circle cx="320" cy="90" r="6" fill="#374151"/>'
           '<path d="M320 90 L 380 90" stroke="#166534" stroke-width="2.5"/>'
           '<path d="M320 90 L 320 130" stroke="#991b1b" stroke-width="2.5"/>'
           '<text x="410" y="95" fill="#166534" font-size="12">u cosθ (constant)</text>'
           '<text x="330" y="150" fill="#991b1b" font-size="12">g pulls down</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">range equal for θ and 90°−θ</text>'
           '</g></svg>')}]},
]
