# class-11 physics EXTRAS pack x3 — electric-charges (4) + electric-field (6) + potential (2)
TOPICS = [
 {"file": "class-11/physics/electric-charges/01-electric-charges-and-charging-by-induction.json",
  "blocks": [{"after": "**Gold-Leaf Electroscope & Charge Detection:** The gold-leaf electroscope is a classical electrostatic apparatus comprising a brass rod, brass disc, and two ultra-thin gold leaves housed in an evacuated glass enclosure. Divergence of the leaves signals the presence of charge via mutual electrostatic repulsion. The electroscope can identify charge sign by observing leaf divergence when an unknown charge is brought near a pre-charged electroscope.",
    "table": ("Three ways to charge a body (classified)",
              ["Method", "What happens", "Charge of the body"],
              [["Friction", "Electrons transfer between rubbed surfaces", "Both end up opposite"],
               ["Conduction", "Contact shares charge", "Same sign, shared amount"],
               ["Induction", "Ground touched while charged rod near", "Opposite sign, no contact"],
               ["Polarisation", "Neutral body&#8217;s charges shift", "Stays neutral but attracts"]]),
   "table1": ("Electroscope readings (classified)",
              ["Observation", "Meaning", "Use"],
              [["Leaves diverge", "Charged", "Detects charge"],
               ["Diverge more", "Same-sign charge added", "Sign test"],
               ["Collapse", "Opposite charge neutralised", "Neutralisation"],
               ["Stay collapsed", "Discharged/grounded", "Safety check"]]),
   "svg": ("Induction: rod near, ground touched, rod away",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="12">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="150" y="70" width="90" height="60" rx="6" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="195" y="105" fill="#1d4ed8" font-size="11">−  −</text>'
           '<rect x="330" y="70" width="90" height="60" rx="6" fill="#fef2f2" stroke="#991b1b"/>'
           '<text x="375" y="90" fill="#991b1b" font-size="11">+ +</text>'
           '<text x="375" y="120" fill="#1d4ed8" font-size="11">− −</text>'
           '<path d="M420 130 L 470 130 L 470 160" stroke="#374151" stroke-width="2"/>'
           '<text x="500" y="135" fill="#374151" font-size="11">ground</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">touch while near, remove ground last: opposite charge left</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-charges/01-electric-charges-induction.json",
  "blocks": [{"after": "**Gold-Leaf Electroscope & Charge Detection:** The gold-leaf electroscope is a classical electrostatic apparatus comprising a brass rod, brass disc, and two ultra-thin gold leaves housed in an evacuated glass enclosure. Divergence of the leaves signals the presence of charge via mutual electrostatic repulsion. The electroscope can identify charge sign by observing leaf divergence when an unknown charge is brought near a pre-charged electroscope.",
    "table": ("Charge basics (classified)",
              ["Fact", "Statement", "Consequence"],
              [["Quantisation", "q = ne", "Charge comes in packets"],
               ["Conservation", "Net charge never created/destroyed", "Pair production balances"],
               ["Additivity", "Charges add algebraically", "Signs matter"],
               ["Two kinds", "Positive and negative", "Like repel, unlike attract"]]),
   "table1": ("Charging by induction vs conduction",
              ["Aspect", "Induction", "Conduction"],
              [["Contact", "None", "Required"],
               ["Sign left", "Opposite to rod", "Same as rod"],
               ["Amount", "Depends on geometry", "Shared by contact"],
               ["Ground role", "Essential", "Not needed"]]),
   "svg": ("Quantised charge: steps of e",
           '<svg viewBox="0 0 640 180" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="180" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M120 140 L 540 140" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 140 L 120 40" stroke="#374151" stroke-width="2"/>'
           '<g fill="#1d4ed8">'
           '<circle cx="180" cy="140" r="5"/><circle cx="250" cy="115" r="5"/>'
           '<circle cx="320" cy="90" r="5"/><circle cx="390" cy="65" r="5"/>'
           '<circle cx="460" cy="40" r="5"/></g>'
           '<text x="320" y="165" fill="#6b7280" font-size="12">q = ne — only whole steps allowed</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-charges/02-coulomb-law.json",
  "blocks": [{"after": "**Electrostatic Equilibrium & Earnshaw's Theorem:** A system of charges is in equilibrium if the net electrostatic force on each constituent charge vanishes ($\\sum \\vec{F} = 0$). By Earnshaw's theorem (derived from Gauss's law $\\vec{\\nabla} \\cdot \\vec{E} = 0$ in charge-free regions), a collection of stationary point charges cannot be maintained in a state of stable equilibrium solely under the influence of inverse-square electrostatic interactions.",
    "table": ("Coulomb&#8217;s law structure (classified)",
              ["Element", "Form", "Meaning"],
              [["Force", "F = kq₁q₂/r²", "Along the line joining"],
               ["Constant", "k = 1/4πε₀ ≈ 9×10⁹", "In vacuum"],
               ["Distance law", "Inverse square", "Halve r → 4× force"],
               ["Superposition", "Vector sum of pairs", "Many-charge systems"]]),
   "table1": ("Medium effects",
              ["Medium", "Effect on force", "Reason"],
              [["Vacuum", "Maximum", "ε = ε₀"],
               ["Dielectric", "Reduced by K", "F = F₀/K"],
               ["Water", "Strongly reduced", "High K ≈ 80"],
               ["Metal", "Zero inside", "Free charges screen"]]),
   "svg": ("Inverse square: halve the distance, quadruple the force",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 60 C 240 80, 380 120, 540 150" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<circle cx="180" cy="66" r="5" fill="#991b1b"/>'
           '<circle cx="420" cy="128" r="5" fill="#166534"/>'
           '<text x="180" y="50" fill="#991b1b" font-size="12">r/2 → 4F</text>'
           '<text x="430" y="118" fill="#166534" font-size="12">2r → F/4</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">F ∝ 1/r²</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-charges/02-coulomb-s-law-and-force-between-multiple-charges.json",
  "blocks": [{"after": "**Electrostatic Equilibrium & Earnshaw's Theorem:** A system of charges is in equilibrium if the net electrostatic force on each constituent charge vanishes ($\\sum \\vec{F} = 0$). By Earnshaw's theorem (derived from Gauss's law $\\vec{\\nabla} \\cdot \\vec{E} = 0$ in charge-free regions), a collection of stationary point charges cannot be maintained in a state of stable equilibrium solely under the influence of inverse-square electrostatic interactions.",
    "table": ("Multiple-charge force bookkeeping (classified)",
              ["Step", "Action", "Care point"],
              [["1", "Draw each pair", "All pairs counted"],
               ["2", "Compute each Coulomb force", "Magnitude only"],
               ["3", "Assign directions", "Attract vs repel"],
               ["4", "Add as vectors", "Components, not sizes"]]),
   "table1": ("Symmetric arrangements (results to remember)",
              ["Arrangement", "Net force on centre", "Reason"],
              [["Two equal like charges", "Zero at midpoint", "Equal opposite pulls"],
               ["Square corners, equal q", "Zero at centre", "Four-fold symmetry"],
               ["Equilateral triangle", "Net along median", "Components add"],
               ["Dipole field point", "Along axis/perpendicular", "Pair geometry"]]),
   "svg": ("Three charges: vector sum decides",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="200" cy="70" r="12" fill="#fef2f2" stroke="#991b1b"/>'
           '<circle cx="440" cy="70" r="12" fill="#fef2f2" stroke="#991b1b"/>'
           '<circle cx="320" cy="140" r="12" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<path d="M310 130 L 235 82" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<path d="M330 130 L 405 82" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">two pulls added as vectors, not numbers</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-field/01-electric-field-due-to-point-charges-and-field-lines.json",
  "blocks": [{"after": "**Electric Field of a Dipole at Axial & Equatorial Points:** For a dipole of moment $p = 2qa$ at distances $r \\gg a$: (1) **Axial point (End-on position):** $\\vec{E}_{axial} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2\\vec{p}}{r^3}$, parallel to $\\vec{p}$; (2) **Equatorial point (Broadside-on position):** $\\vec{E}_{equatorial} = -\\frac{1}{4\\pi\\varepsilon_0} \\frac{\\vec{p}}{r^3}$, antiparallel to $\\vec{p}$. Notice that for any dipole, $E \\propto 1/r^3$ (faster fall-off than a point charge's $1/r^2$), and $E_{axial} = 2 E_{equatorial}$ at the same radial distance $r$.",
    "table": ("Field-line rules (classified)",
              ["Rule", "Statement", "Why"],
              [["Origin/end", "Start on +, end on −", "Field direction"],
               ["Never cross", "Two directions at one point impossible", "Uniqueness"],
               ["Density = strength", "Closer lines, stronger field", "Visual measure"],
               ["Perpendicular conductor", "Lines meet surface at 90°", "No tangential E"]]),
   "table1": ("Field of common charge sets",
              ["Source", "Field", "Behaviour"],
              [["Point charge", "E = kq/r²", "Radial, 1/r²"],
               ["Dipole (axial)", "E = 2kp/r³", "Falls as 1/r³"],
               ["Dipole (equatorial)", "E = kp/r³", "Half axial, opposite"],
               ["Uniform field", "E constant", "Parallel lines"]]),
   "svg": ("Field lines: single charge and dipole",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="150" cy="100" r="12" fill="#fef2f2" stroke="#991b1b"/>'
           '<g stroke="#9ca3af" stroke-width="1.5">'
           '<path d="M162 100 L 220 100"/><path d="M158 90 L 210 62"/><path d="M158 110 L 210 138"/></g>'
           '<circle cx="380" cy="100" r="10" fill="#fef2f2" stroke="#991b1b"/>'
           '<circle cx="480" cy="100" r="10" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<g stroke="#9ca3af" stroke-width="1.5">'
           '<path d="M390 100 C 420 70, 440 70, 470 95"/>'
           '<path d="M390 100 C 420 130, 440 130, 470 105"/>'
           '<path d="M390 100 L 470 100"/></g>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">lines run + to −, never cross</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-field/01-electric-field-point-charges.json",
  "blocks": [{"after": "**Electric Field of a Dipole at Axial & Equatorial Points:** For a dipole of moment $p = 2qa$ at distances $r \\gg a$: (1) **Axial point (End-on position):** $\\vec{E}_{axial} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2\\vec{p}}{r^3}$, parallel to $\\vec{p}$; (2) **Equatorial point (Broadside-on position):** $\\vec{E}_{equatorial} = -\\frac{1}{4\\pi\\varepsilon_0} \\frac{\\vec{p}}{r^3}$, antiparallel to $\\vec{p}$. Notice that for any dipole, $E \\propto 1/r^3$ (faster fall-off than a point charge's $1/r^2$), and $E_{axial} = 2 E_{equatorial}$ at the same radial distance $r$.",
    "table": ("Electric field of a point charge (classified)",
              ["Quantity", "Formula", "Unit", "Direction"],
              [["Field", "E = F/q₀ = kq/r²", "N/C", "Away from +, toward −"],
               ["Force on test charge", "F = q₀E", "N", "Along E for +"],
               ["Field of dipole", "p = q(2a)", "C·m", "− to +"],
               ["Torque on dipole", "τ = pE sinθ", "N·m", "Aligns with field"]]),
   "table1": ("Test-charge discipline",
              ["Rule", "Reason", "Exam phrasing"],
              [["q₀ very small", "Must not disturb source", "&#8216;infinitesimal test charge&#8217;"],
               ["Field exists without q₀", "Property of space", "Define E = F/q₀ limit"],
               ["Vector addition", "Fields superpose", "Multiple sources"]]),
   "svg": ("Dipole field: from + around to −",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="260" cy="100" r="12" fill="#fef2f2" stroke="#991b1b"/>'
           '<circle cx="380" cy="100" r="12" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<path d="M272 100 L 368 100" stroke="#374151" stroke-width="2"/>'
           '<g stroke="#9ca3af" stroke-width="1.5" fill="none">'
           '<path d="M260 88 C 300 40, 340 40, 380 88"/>'
           '<path d="M260 112 C 300 160, 340 160, 380 112"/>'
           '<path d="M250 100 C 210 60, 190 100, 210 140"/>'
           '<path d="M390 100 C 430 60, 450 100, 430 140"/></g>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">closed-looking loops from + to −</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-field/02-gauss-law-and-electric-flux.json",
  "blocks": [{"after": "**Selection Criteria for Gaussian Surfaces:** Gauss's law is always fundamentally true, but it is practically useful for calculating electric fields only when the charge configuration exhibits high geometric symmetry (spherical, cylindrical, or planar). A Gaussian surface must satisfy: (1) $\\vec{E}$ is either perpendicular or parallel to the surface; (2) $|\\vec{E}|$ is constant over the portions of the surface where flux is non-zero; (3) The surface passes through the point where the field is to be evaluated.",
    "table": ("Flux and Gauss&#8217;s law (classified)",
              ["Quantity", "Formula", "Meaning"],
              [["Flux (uniform)", "Φ = EA cosθ", "Field lines through area"],
               ["Flux (general)", "Φ = ∮E·dA", "Closed surface integral"],
               ["Gauss&#8217;s law", "Φ = q_enc/ε₀", "Charge inside decides flux"],
               ["No enclosed charge", "Φ = 0", "Lines in = lines out"]]),
   "table1": ("Choosing a Gaussian surface",
              ["Symmetry", "Surface", "Yields"],
              [["Point/sphere", "Concentric sphere", "E = kq/r²"],
               ["Line/wire", "Coaxial cylinder", "E = λ/2πε₀r"],
               ["Sheet", "Pillbox", "E = σ/2ε₀"],
               ["Conductor surface", "Pillbox straddling", "E = σ/ε₀"]]),
   "svg": ("Flux counts lines piercing a surface",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<ellipse cx="320" cy="100" rx="90" ry="55" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<g stroke="#a16207" stroke-width="2">'
           '<path d="M180 80 L 460 80"/><path d="M170 100 L 470 100"/><path d="M180 120 L 460 120"/></g>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">only the charge inside sets the net flux</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-field/02-gauss-law.json",
  "blocks": [{"after": "**Selection Criteria for Gaussian Surfaces:** Gauss's law is always fundamentally true, but it is practically useful for calculating electric fields only when the charge configuration exhibits high geometric symmetry (spherical, cylindrical, or planar). A Gaussian surface must satisfy: (1) $\\vec{E}$ is either perpendicular or parallel to the surface; (2) $|\\vec{E}|$ is constant over the portions of the surface where flux is non-zero; (3) The surface passes through the point where the field is to be evaluated.",
    "table": ("Gauss&#8217;s law facts (classified)",
              ["Fact", "Statement", "Use"],
              [["Flux depends inside", "External charges contribute zero net flux", "Screening arguments"],
               ["Shape independent", "Only enclosed charge matters", "Any surface works"],
               ["Symmetry tool", "Use when E constant on surface", "Derivations"],
               ["Conductors", "E = 0 inside, σ/ε₀ at surface", "Shielding"]]),
   "table1": ("Flux through special cases",
              ["Case", "Net flux", "Reason"],
              [["Charge at centre of sphere", "q/ε₀", "Full lines out"],
               ["Charge off-centre inside", "q/ε₀", "Still enclosed"],
               ["Charge outside", "0", "Lines enter and leave"],
               ["Dipole inside", "0", "Net charge zero"]]),
   "svg": ("Off-centre charge: same flux, harder shape",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M180 60 C 300 30, 460 60, 470 110 C 480 160, 300 175, 200 150 C 130 132, 120 85, 180 60 Z" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<circle cx="300" cy="105" r="9" fill="#fef2f2" stroke="#991b1b"/>'
           '<text x="300" y="140" fill="#991b1b" font-size="12">+q</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">flux = q/ε₀ whatever the surface looks like</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-field/03-applications-of-gauss-law.json",
  "blocks": [{"after": "**Electric Field of a Uniformly Charged Non-Conducting Solid Sphere:** For an insulating solid sphere of radius $R$ with uniform volume charge density $\\rho = \\frac{Q}{\\frac{4}{3}\\pi R^3}$: (1) **Outside ($r \\ge R$):** $E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r^2}$; (2) **Inside ($r < R$):** A concentric Gaussian sphere of radius $r$ encloses charge $Q_{enc} = \\rho \\left(\\frac{4}{3}\\pi r^3\\right) = Q \\left(\\frac{r^3}{R^3}\\right)$. Applying Gauss's law: $E(4\\pi r^2) = \\frac{Q r^3}{\\varepsilon_0 R^3} \\implies E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q r}{R^3} = \\frac{\\rho r}{3\\varepsilon_0}$. Thus, the electric field increases linearly with radial distance $r$ from zero at the center up to maximum at the surface ($E \\propto r$ for $r \\le R$), then decays as $1/r^2$ for $r > R$.",
    "table": ("Standard Gauss-law results (classified)",
              ["Source", "Field", "Falls as"],
              [["Point charge", "kq/r²", "1/r²"],
               ["Infinite line, λ", "λ/2πε₀r", "1/r"],
               ["Infinite sheet, σ", "σ/2ε₀", "Constant"],
               ["Solid sphere (inside)", "kqr/R³", "Linear in r"],
               ["Conductor surface", "σ/ε₀", "Constant"]]),
   "table1": ("Sphere field inside vs outside",
              ["Region", "Non-conducting", "Conducting"],
              [["Inside", "E ∝ r (builds up)", "E = 0"],
               ["Surface", "kq/R²", "σ/ε₀ = kq/R²"],
               ["Outside", "kq/r²", "kq/r²"],
               ["Reason", "Charge distributed", "Charge on surface"]]),
   "svg": ("Field inside a uniformly charged sphere grows linearly",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<path d="M110 160 L 560 160" stroke="#374151" stroke-width="2"/>'
           '<path d="M110 160 L 110 40" stroke="#374151" stroke-width="2"/>'
           '<path d="M120 150 L 300 60" stroke="#166534" stroke-width="2.5"/>'
           '<path d="M300 60 C 360 42, 440 55, 540 90" fill="none" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="200" y="100" fill="#166534" font-size="12">inside: E ∝ r</text>'
           '<text x="430" y="70" fill="#1d4ed8" font-size="12">outside: E ∝ 1/r²</text>'
           '<text x="320" y="190" fill="#6b7280" font-size="12">peak at the surface</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/electric-field/03-gauss-law-applications.json",
  "blocks": [{"after": "**Electric Field of a Uniformly Charged Non-Conducting Solid Sphere:** For an insulating solid sphere of radius $R$ with uniform volume charge density $\\rho = \\frac{Q}{\\frac{4}{3}\\pi R^3}$: (1) **Outside ($r \\ge R$):** $E = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q}{r^2}$; (2) **Inside ($r < R$):** A concentric Gaussian sphere of radius $r$ encloses charge $Q_{enc} = \\rho \\left(\\frac{4}{3}\\pi r^3\\right) = Q \\left(\\frac{r^3}{R^3}\\right)$. Applying Gauss's law: $E(4\\pi r^2) = \\frac{Q r^3}{\\varepsilon_0 R^3} \\implies E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q r}{R^3} = \\frac{\\rho r}{3\\varepsilon_0}$. Thus, the electric field increases linearly with radial distance $r$ from zero at the center up to maximum at the surface ($E \\propto r$ for $r \\le R$), then decays as $1/r^2$ for $r > R$.",
    "table": ("Gauss-law derivations at a glance (classified)",
              ["Target", "Gaussian choice", "Result"],
              [["Wire field", "Cylinder length L, radius r", "E = λ/2πε₀r"],
               ["Sheet field", "Flat pillbox", "E = σ/2ε₀"],
               ["Parallel plates", "Box between plates", "E = σ/ε₀"],
               ["Charged shell", "Sphere r ≥ R / r &lt; R", "kq/r² / 0"]]),
   "table1": ("Capacitor link (preview)",
              ["Setup", "Field", "Note"],
              [["Isolated sheet", "σ/2ε₀ each side", "Two sides share"],
               ["Two opposite sheets", "σ/ε₀ inside, 0 outside", "Fields add inside"],
               ["Use", "Parallel-plate capacitor", "C = ε₀A/d"]]),
   "svg": ("Two sheets: fields cancel outside, add inside",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="220" y="40" width="10" height="120" fill="#fef2f2" stroke="#991b1b"/>'
           '<rect x="410" y="40" width="10" height="120" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<g stroke="#a16207" stroke-width="2">'
           '<path d="M240 100 L 400 100"/><path d="M240 80 L 400 80"/><path d="M240 120 L 400 120"/></g>'
           '<text x="320" y="180" fill="#6b7280" font-size="12">between: σ/ε₀; outside: zero</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/potential-potential-difference-and-potential-energy/01-potential-difference-point-charge.json",
  "blocks": [{"after": "**Electron Volt (eV) — Energy Unit Conversion:** The electron volt is the energy gained by a particle of charge e when accelerated through a potential difference of one volt: $1\\,\\text{eV} = e \\times 1\\,\\text{V} = 1.602 \\times 10^{-19}\\,\\text{C} \\times 1\\,\\text{J/C} = 1.602 \\times 10^{-19}\\,\\text{J}$. Convenient conversion factors: $1\\,\\text{eV} = 1.602 \\times 10^{-19}\\,\\text{J}$ and $1\\,\\text{J} = 6.242 \\times 10^{18}\\,\\text{eV}$. Multiples are commonly used: $1\\,\\text{keV} = 10^3\\,\\text{eV}$ (X-rays), $1\\,\\text{MeV} = 10^6\\,\\text{eV}$ (particle accelerators, nuclear binding), and $1\\,\\text{GeV} = 10^9\\,\\text{eV}$ (collider experiments). Note that electron volt is an energy unit, not a charge or potential unit.",
    "table": ("Potential quantities (classified)",
              ["Quantity", "Formula", "Unit", "Note"],
              [["Potential", "V = kq/r", "V", "Scalar, sign follows q"],
               ["Potential difference", "ΔV = W/q", "V", "Work per unit charge"],
               ["Potential energy", "U = kq₁q₂/r", "J", "Pair energy"],
               ["Electron volt", "1 eV = 1.6×10⁻¹⁹ J", "—", "Atomic-scale unit"]]),
   "table1": ("Potential vs field: two views",
              ["Aspect", "Field E", "Potential V"],
              [["Nature", "Vector", "Scalar"],
               ["Relation", "E = −dV/dr", "V decreases along E"],
               ["Point charge", "1/r²", "1/r"],
               ["Zero choice", "Arbitrary reference", "Usually infinity"]]),
   "svg": ("Equipotential circles around a charge",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<circle cx="200" cy="100" r="10" fill="#fef2f2" stroke="#991b1b"/>'
           '<g fill="none" stroke="#9ca3af" stroke-width="1.5">'
           '<circle cx="200" cy="100" r="30"/><circle cx="200" cy="100" r="55"/>'
           '<circle cx="200" cy="100" r="80"/></g>'
           '<path d="M215 100 L 300 100" stroke="#1d4ed8" stroke-width="2.5"/>'
           '<text x="270" y="90" fill="#1d4ed8" font-size="12">E points downhill in V</text>'
           '<text x="470" y="105" fill="#6b7280" font-size="12">V = kq/r on each ring</text>'
           '</g></svg>')}]},
 {"file": "class-11/physics/potential-potential-difference-and-potential-energy/01-potential-difference-potential-due-to-point-charge-potential-energy-and-electron-volt.json",
  "blocks": [{"after": "**Electron Volt (eV) — Energy Unit Conversion:** The electron volt is the energy gained by a particle of charge e when accelerated through a potential difference of one volt: $1\\,\\text{eV} = e \\times 1\\,\\text{V} = 1.602 \\times 10^{-19}\\,\\text{C} \\times 1\\,\\text{J/C} = 1.602 \\times 10^{-19}\\,\\text{J}$. Convenient conversion factors: $1\\,\\text{eV} = 1.602 \\times 10^{-19}\\,\\text{J}$ and $1\\,\\text{J} = 6.242 \\times 10^{18}\\,\\text{eV}$. Multiples are commonly used: $1\\,\\text{keV} = 10^3\\,\\text{eV}$ (X-rays), $1\\,\\text{MeV} = 10^6\\,\\text{eV}$ (particle accelerators, nuclear binding), and $1\\,\\text{GeV} = 10^9\\,\\text{eV}$ (collider experiments). Note that electron volt is an energy unit, not a charge or potential unit.",
    "table": ("Energy bookkeeping in electrostatics (classified)",
              ["Situation", "Energy change", "Formula"],
              [["Two like charges pushed together", "PE increases", "ΔU = kq₁q₂(1/r₂ − 1/r₁)"],
               ["Opposite charges approach", "PE decreases", "KE gained"],
               ["Charge across ΔV", "W = qΔV", "Battery does work"],
               ["Electron accelerated by 1 V", "Gains 1 eV", "KE = eV"]]),
   "table1": ("eV conversions to memorise",
              ["Energy", "In eV", "In joules"],
              [["Visible photon", "≈ 2–3 eV", "≈ 4×10⁻¹⁹ J"],
               ["Thermal room energy", "≈ 0.025 eV", "≈ 4×10⁻²¹ J"],
               ["X-ray photon", "≈ 10³ eV", "≈ 1.6×10⁻¹⁶ J"],
               ["1 eV", "1", "1.6×10⁻¹⁹ J"]]),
   "svg": ("Charge falling through potential difference gains KE",
           '<svg viewBox="0 0 640 200" font-family="Segoe UI" font-size="13">'
           '<rect x="0" y="0" width="640" height="200" fill="#ffffff"/>'
           '<g text-anchor="middle">'
           '<rect x="140" y="50" width="360" height="26" rx="6" fill="#fef2f2" stroke="#991b1b"/>'
           '<text x="320" y="68" fill="#991b1b" font-size="12">plate A: V₁</text>'
           '<rect x="140" y="130" width="360" height="26" rx="6" fill="#eff6ff" stroke="#1d4ed8"/>'
           '<text x="320" y="148" fill="#1d4ed8" font-size="12">plate B: V₂</text>'
           '<path d="M300 80 L 300 126" stroke="#166534" stroke-width="2.5"/>'
           '<text x="360" y="110" fill="#166534" font-size="12">q falls: KE = q(V₁−V₂)</text>'
           '<text x="320" y="185" fill="#6b7280" font-size="12">potential energy cashes out as motion</text>'
           '</g></svg>')}]},
]
