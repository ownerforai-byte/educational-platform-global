# class-11 physics EXTRAS pack x1 — circular-motion (5) + dc-circuits (6)
# anchors patched from reports/c11phys-extra-anchors.json
TOPICS = [
 {"file": "class-11/physics/circular-motion/01-angular-displacement-velocity.json",
  "blocks": [{"after": "## 5. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Angular kinematics vs linear kinematics (classified)",
              ["Quantity", "Angular form", "Linear form", "Link"],
              [["Displacement", "θ (radian)", "s (metre)", "s = rθ"],
               ["Velocity", "ω (rad/s)", "v (m/s)", "v = rω"],
               ["Acceleration", "α (rad/s²)", "a (m/s²)", "a = rα"],
               ["Time period", "T = 2π/ω", "—", "ω = 2πf"]]),
   "table1": ("Radian measure facts (exam-ready)",
              ["Fact", "Statement", "Use"],
              [["Definition", "1 rad = angle with arc equal to radius", "Unit conversion"],
               ["Conversion", "180° = π rad", "Degree to radian"],
               ["Full circle", "2π rad = 360°", "Period relations"],
               ["Dimensionless", "radian has no dimension", "Checking units"]]),
   "svg": ("Angular displacement: arc, angle, radius",
           '<svg viewBox="0 0 640 220" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="220" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="220" cy="110" r="70" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M220 110 L 290 110" stroke="#374151" stroke-width="2.5"/>'
           '<path d="M220 110 L 255 50" stroke="#991b1b" stroke-width="2.5"/>'
           '<path d="M290 110 A 70 70 0 0 0 255 50" fill="none" stroke="#a16207" stroke-width="3"/>'
           '<text x="250" y="125" fill="#374151" font-size="12">r</text>'
           '<text x="300" y="75" fill="#a16207" font-size="12">θ</text>'
           '<text x="220" y="200" fill="#6b7280" font-size="12">θ = s/r — one radian: arc equals radius</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/circular-motion/02-centripetal-acceleration-force.json",
  "blocks": [{"after": "**Common NEB trap — direction of acceleration:** students often confuse the direction of centripetal acceleration (toward center) with the direction of velocity (tangential). Remember: a_c changes the DIRECTION of v, not its magnitude. If speed is changing too, there is also a tangential component a_t.",
    "table": ("Centripetal quantities (classified)",
              ["Quantity", "Formula", "Direction", "Source of force"],
              [["Centripetal acceleration", "a = v²/r = ω²r", "Toward centre", "Net inward force"],
               ["Centripetal force", "F = mv²/r", "Toward centre", "Tension, gravity, friction"],
               ["Period", "T = 2πr/v", "—", "—"],
               ["Frequency", "f = 1/T", "—", "—"]]),
   "table1": ("Common misconceptions vs facts",
              ["Misconception", "Fact", "Exam trap"],
              [["Centrifugal force is real", "It is a rotating-frame bookkeeping term", "Do not draw it in inertial frames"],
               ["Force acts along motion", "Force is perpendicular to velocity", "Speed constant, direction changes"],
               ["v²/r is tangential", "It points radially inward", "Resolve carefully"]]),
   "svg": ("Velocity tangent, force inward",
           '<svg viewBox="0 0 640 220" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="220" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="320" cy="110" r="70" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<circle cx="390" cy="110" r="6" fill="#374151"/>'
           '<path d="M390 110 L 455 110" stroke="#166534" stroke-width="2.5"/>'
           '<text x="440" y="98" fill="#166534" font-size="12">v (tangent)</text>'
           '<path d="M390 110 L 330 110" stroke="#991b1b" stroke-width="2.5"/>'
           '<text x="350" y="140" fill="#991b1b" font-size="12">F = mv²/r</text>'
           '<text x="320" y="200" fill="#6b7280" font-size="12">speed constant; direction turns</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/circular-motion/03-conical-pendulum.json",
  "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Conical pendulum force resolution (classified)",
              ["Component", "Expression", "Role"],
              [["Vertical: T cosθ", "Balances mg", "No vertical motion"],
               ["Horizontal: T sinθ", "Provides mv²/r", "Centripetal force"],
               ["Radius of cone", "r = L sinθ", "Geometry"],
               ["Period", "T = 2π√(L cosθ/g)", "Key result"]]),
   "table1": ("Conical pendulum vs simple pendulum",
              ["Aspect", "Conical", "Simple"],
              [["Path", "Horizontal circle", "Arc in a plane"],
               ["Period depends on", "L cosθ and g", "L and g"],
               ["Angle", "Constant θ with vertical", "Varies with time"],
               ["Energy", "KE constant", "KE↔PE exchange"]]),
   "svg": ("Conical pendulum: cone of forces",
           '<svg viewBox="0 0 640 220" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="220" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="220" cy="40" r="5" fill="#374151"/>'
           '<path d="M220 40 L 330 140" stroke="#374151" stroke-width="2"/>'
           '<circle cx="330" cy="140" r="9" fill="#fefce8" stroke="#a16207"/>'
           '<path d="M330 140 L 330 190" stroke="#991b1b" stroke-width="2.5"/>'
           '<path d="M330 140 L 265 140" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M240 40 L 350 140" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="5 4"/>'
           '<text x="345" y="185" fill="#991b1b" font-size="12">mg</text>'
           '<text x="270" y="130" fill="#1d4ed8" font-size="12">T sinθ</text>'
           '<text x="320" y="205" fill="#6b7280" font-size="12">bob traces a horizontal circle; string sweeps a cone</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/circular-motion/04-vertical-circle.json",
  "blocks": [{"after": "**Complete-the-circle condition:** for a string, the condition is v_bottom ≥ √(5gr). For a rod, it is v_bottom ≥ √(2gr). If v_bottom is between √(2gr) and √(5gr), the bob completes the circle with a rod but not with a string.",
    "table": ("Vertical circle: top vs bottom (classified)",
              ["Position", "Forces", "Condition", "Tension/Normal"],
              [["Top", "mg and T both inward", "v_top ≥ √(gr)", "T = mv²/r − mg"],
               ["Bottom", "T inward, mg outward", "always possible", "T = mv²/r + mg"],
               ["Side", "T inward only", "—", "T = mv²/r"],
               ["Minimum at top (string)", "T = 0", "v_top = √(gr)", "Just-complete case"]]),
   "table1": ("Complete-the-circle criteria",
              ["Setup", "Minimum top speed", "Why"],
              [["String/pendulum", "√(gL)", "String cannot push"],
               ["Rigid rod", "≈ 0", "Rod can push"],
               ["Bucket of water", "√(gr)", "Water must not fall"],
               ["Car over hill crest", "v ≤ √(gr)", "Contact lost above this"]]),
   "svg": ("Vertical loop: tension is largest at the bottom",
           '<svg viewBox="0 0 640 220" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="220" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="320" cy="110" r="62" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<circle cx="320" cy="48" r="6" fill="#991b1b"/>'
           '<circle cx="320" cy="172" r="6" fill="#166534"/>'
           '<text x="320" y="35" fill="#991b1b" font-size="12">top: T = mv²/r − mg</text>'
           '<text x="320" y="198" fill="#166534" font-size="12">bottom: T = mv²/r + mg</text>'
           '<text x="450" y="110" fill="#6b7280" font-size="12">string snaps here</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/circular-motion/05-banking-applications.json",
  "blocks": [{"after": "**Why banking reduces tire wear:** on a flat road, friction must provide all centripetal force, causing lateral tire stress. On a banked road at the design speed, the normal force provides the centripetal component — no lateral friction needed. This dramatically reduces tire wear and fuel consumption.",
    "table": ("Banked track cases (classified)",
              ["Case", "Speed", "Friction needed", "Formula"],
              [["Ideal banking", "v = √(rg tanθ)", "None", "N cosθ = mg; N sinθ = mv²/r"],
               ["Below ideal speed", "v &lt; √(rg tanθ)", "Friction acts up the slope", "—"],
               ["Above ideal speed", "v &gt; √(rg tanθ)", "Friction acts down the slope", "—"],
               ["Flat road", "any", "Full friction supplies mv²/r", "f ≤ μmg"]]),
   "table1": ("Banking design facts",
              ["Quantity", "Relation", "Note"],
              [["Angle for given v", "tanθ = v²/rg", "Design equation"],
               ["Max safe speed with friction", "v²max = rg(μ + tanθ)/(1 − μtanθ)", "Full formula"],
               ["Railway outer rail", "Raised by tanθ per gauge", "Practical application"],
               ["Tyre wear", "Reduced at ideal speed", "Friction unneeded"]]),
   "svg": ("Banked curve: normal plus weight gives the inward push",
           '<svg viewBox="0 0 640 220" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="220" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M160 170 L 480 170 L 420 100 L 220 100 Z" fill="#f8fafc" stroke="#374151"/>'
           '<circle cx="320" cy="100" r="8" fill="#374151"/>'
           '<path d="M320 100 L 320 165" stroke="#991b1b" stroke-width="2.5"/>'
           '<path d="M320 100 L 270 60" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="345" y="150" fill="#991b1b" font-size="12">mg</text>'
           '<text x="275" y="65" fill="#1d4ed8" font-size="12">N</text>'
           '<text x="320" y="200" fill="#6b7280" font-size="12">N sinθ points to the centre of the turn</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dc-circuits/01-electric-current-drift-velocity.json",
  "blocks": [{"after": "A current of one ampere in a typical metal wire needs only a tiny drift speed, often a fraction of a millimetre per second. The lamp still lights at once because the electric field, not the drifting electron, carries the signal along the wire.",
    "table": ("Current and drift quantities (classified)",
              ["Quantity", "Symbol/Formula", "Unit", "Typical size"],
              [["Current", "I = Q/t = neAv_d", "A", "1 A in a wire"],
               ["Drift velocity", "v_d = I/(neA)", "m/s", "fraction of a mm/s"],
               ["Number density", "n", "m⁻³", "≈10²⁸ for copper"],
               ["Current density", "J = I/A", "A/m²", "—"]]),
   "table1": ("Why the lamp lights instantly though v_d is tiny",
              ["Step", "Explanation", "Exam line"],
              [["Field travels fast", "EM field propagates near light speed", "The push is instant"],
               ["All electrons drift together", "Every electron starts drifting at once", "Not one electron travelling"],
               ["Charge already in wire", "Electrons fill the whole circuit", "Current is a chain reaction"]]),
   "svg": ("Drift of electrons in a wire: slow walk, fast signal",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="110" y="70" width="420" height="60" fill="#f8fafc" stroke="#374151"/>'
           '<g fill="#1d4ed8">'
           '<circle cx="160" cy="90" r="6"/><circle cx="240" cy="110" r="6"/>'
           '<circle cx="320" cy="90" r="6"/><circle cx="400" cy="110" r="6"/>'
           '<circle cx="480" cy="90" r="6"/></g>'
           '<g stroke="#991b1b" stroke-width="2">'
           '<path d="M166 90 L 186 90"/><path d="M246 110 L 266 110"/>'
           '<path d="M326 90 L 346 90"/><path d="M406 110 L 426 110"/></g>'
           '<path d="M560 100 L 590 100" stroke="#166534" stroke-width="2.5"/>'
           '<text x="575" y="88" fill="#166534" font-size="11">signal</text>'
           '<text x="320" y="175" fill="#6b7280" font-size="12">electrons drift slowly; the field acts everywhere at once</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dc-circuits/02-ohms-law-resistance.json",
  "blocks": [{"after": "Resistance depends on the piece of wire: it is resistivity times length over area. Resistivity depends on the material. Stretching a wire makes it longer and thinner, so its resistance rises even if the resistivity does not.",
    "table": ("Ohm&#8217;s law and resistance factors (classified)",
              ["Factor", "Effect on R", "Formula role"],
              [["Length L", "Doubles when L doubles", "R ∝ L"],
               ["Area A", "Halves when A doubles", "R ∝ 1/A"],
               ["Resistivity ρ", "Material property", "R = ρL/A"],
               ["Temperature", "Metals: R rises", "ρ(T) increases"]]),
   "table1": ("Ohmic vs non-ohmic behaviour",
              ["Behaviour", "V–I graph", "Examples"],
              [["Ohmic", "Straight line through origin", "Metals at constant T"],
               ["Non-ohmic", "Curved", "Diode, filament lamp, thermistor"]]),
   "svg": ("V–I graphs: ohmic line vs lamp curve",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M120 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 160 L 120 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 160 L 420 60" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M120 160 C 260 130, 340 100, 460 45" fill="none" stroke="#a16207" stroke-width="2.5"/>'
           '<text x="430" y="50" fill="#1d4ed8" font-size="12">ohmic</text>'
           '<text x="490" y="85" fill="#a16207" font-size="12">filament lamp</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">slope drops as the filament heats up</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dc-circuits/03-series-parallel-resistors.json",
  "blocks": [{"after": "**Temperature coefficient of filament:** tungsten has $\\\\\\\\alpha \\\\\\\\approx 0.0045$ $^{\\\\\\\\circ}$C$^{-1}$. A 100 W, 230 V bulb has cold resistance of about $50\\\\\\\\,\\\\\\\\Omega$ but hot resistance of $529\\\\\\\\,\\\\\\\\Omega$.",
    "table": ("Series vs parallel rules (classified)",
              ["Property", "Series", "Parallel"],
              [["Current", "Same through all", "Splits among branches"],
               ["Voltage", "Splits across elements", "Same across all"],
               ["Resistance", "R = R₁ + R₂ + ...", "1/R = 1/R₁ + 1/R₂"],
               ["Two-branch shortcut", "—", "R = R₁R₂/(R₁+R₂)"],
               ["Smallest dominates", "Largest R dominates", "Smallest R dominates"]]),
   "table1": ("Worked pattern: three equal resistors R",
              ["Network", "Equivalent", "Ratio"],
              [["All series", "3R", "3×"],
               ["All parallel", "R/3", "1/3×"],
               ["Two parallel + one series", "R + R/2 = 3R/2", "1.5×"],
               ["Two series + one parallel", "2R‖R = 2R/3", "0.67×"]]),
   "svg": ("Series chain vs parallel ladder",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 70 L 520 70" stroke="#374151" stroke-width="2.5"/>'
           '<rect x="190" y="55" width="50" height="30" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<rect x="330" y="55" width="50" height="30" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="320" y="40" fill="#1d4ed8" font-size="12">series: one path</text>'
           '<path d="M110 150 L 200 150 M240 150 L 520 150" stroke="#374151" stroke-width="2.5"/>'
           '<rect x="200" y="135" width="40" height="30" fill="#f0fdf4" stroke="#166534"/>'
           '<rect x="200" y="170" width="40" height="20" fill="#f0fdf4" stroke="#166534"/>'
           '<text x="420" y="160" fill="#166534" font-size="12">parallel: same V, split I</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dc-circuits/04-potential-divider.json",
  "blocks": [{"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
    "table": ("Potential divider relations (classified)",
              ["Quantity", "Formula", "Note"],
              [["Output (unloaded)", "V_out = V R₂/(R₁+R₂)", "Ratio of resistances"],
               ["Loaded output", "V_out = V R₂‖R_L/(R₁+R₂‖R_L)", "Drops when loaded"],
               ["Rheostat use", "V_out sweeps 0 → V", "Slider varies ratio"],
               ["Sensor use", "R₂ = LDR/thermistor", "Voltage senses conditions"]]),
   "table1": ("Divider applications",
              ["Application", "Component chosen", "What changes"],
              [["Volume control", "Rheostat/pot", "Slider position"],
               ["Light sensor", "LDR", "Illumination"],
               ["Temperature sensor", "Thermistor", "Temperature"],
               ["Bias supply", "Fixed pair", "Fixed fraction"]]),
   "svg": ("Divider chain: V shared in ratio of R",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M120 60 L 120 150 M120 60 L 520 60 M120 150 L 520 150" stroke="#374151" stroke-width="2"/>'
           '<rect x="250" y="45" width="90" height="30" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="295" y="38" fill="#1d4ed8" font-size="12">R₁ takes V·R₁/(R₁+R₂)</text>'
           '<rect x="250" y="135" width="90" height="30" fill="#f0fdf4" stroke="#166534"/>'
           '<text x="295" y="185" fill="#166534" font-size="12">R₂ takes V·R₂/(R₁+R₂)</text>'
           '<text x="480" y="110" fill="#a16207" font-size="12">V_out at the join</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dc-circuits/05-emf-internal-resistance.json",
  "blocks": [{"after": "**Practical limits.** Short-circuit current I_s = E/r; the external load receives maximum power when its resistance equals r, which is also why terminal voltage falls under heavy load.",
    "table": ("EMF vs terminal voltage (classified)",
              ["Case", "Terminal V", "Relation"],
              [["Open circuit", "V = ε", "No current, no drop"],
               ["Discharging", "V = ε − Ir", "Cell loses Ir internally"],
               ["Charging", "V = ε + Ir", "External source pushes in"],
               ["Short circuit", "V = 0", "I_short = ε/r"]]),
   "table1": ("Internal resistance effects",
              ["Observation", "Cause", "Exam use"],
              [["Lights dim on heavy load", "Bigger I → bigger Ir", "4-m explanation"],
               ["Max power at R = r", "Matching theorem", "Numerical"],
               ["Battery heats up", "I²r loss inside", "Energy argument"]]),
   "svg": ("EMF, internal drop and terminal voltage",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="150" y="70" width="80" height="50" fill="#fefce8" stroke="#a16207"/>'
           '<text x="190" y="100" fill="#a16207" font-size="12">ε, r</text>'
           '<rect x="380" y="70" width="80" height="50" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="420" y="100" fill="#1d4ed8" font-size="12">R (load)</text>'
           '<path d="M230 85 L 380 85" stroke="#374151" stroke-width="2"/>'
           '<path d="M380 115 L 230 115" stroke="#374151" stroke-width="2"/>'
           '<text x="305" y="75" fill="#166534" font-size="11">V = ε − Ir across R</text>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">the cell keeps Ir for itself</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/dc-circuits/06-work-power-circuits.json",
  "blocks": [{"after": "Electrical power in a resistor is the heat produced per second. A device rated 60 W at 220 V is designed for that voltage. At a lower voltage it draws less current and produces less than 60 W.",
    "table": ("Electrical work, energy, power (classified)",
              ["Quantity", "Formula", "Unit", "Domestic use"],
              [["Work", "W = VIt = I²Rt", "J", "Energy meter (kWh)"],
               ["Power", "P = VI = I²R = V²/R", "W", "Appliance rating"],
               ["Heat", "H = I²Rt (Joule law)", "J", "Heaters, fuses"],
               ["Energy unit", "1 kWh = 3.6 MJ", "—", "Billing"]]),
   "table1": ("Rating-based reasoning",
              ["Situation", "Rule", "Example"],
              [["Same V, different P", "Higher P → lower R", "100 W bulb has less R than 60 W"],
               ["Series bulbs", "Lower P glows brighter", "Smaller R drops more V? No — same I: P = I²R"],
               ["Parallel bulbs", "Higher P glows brighter", "Same V: P = V²/R"],
               ["Fuse choice", "Rated at load current", "I = P/V"]]),
   "svg": ("Power rating ladder: same voltage, different hunger",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<g fill="#fefce8" stroke="#a16207">'
           '<rect x="110" y="120" width="90" height="40" rx="6"/>'
           '<rect x="270" y="90" width="110" height="70" rx="6"/>'
           '<rect x="450" y="55" width="120" height="105" rx="6"/></g>'
           '<g font-size="12" fill="#a16207">'
           '<text x="155" y="145">LED 9 W</text>'
           '<text x="325" y="130">CFL 60 W</text>'
           '<text x="510" y="110">heater 2000 W</text></g>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">P = VI: taller bar, more energy per second</text>'
           '</g></svg>')}]},
]
