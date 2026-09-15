const fs = require('fs');
const path = require('path');

// Content data for Physics topics - organized by slug
const topicContent = {
  // DYNAMICS
  "linear-momentum-impulse": {
    formulas: [
      "Momentum: p = mv [kg·m/s or N·s]",
      "Impulse: J = F·Δt = Δp = m(v_f - v_i)",
      "Average force: F_avg = Δp/Δt",
      "Impulse from graph: J = Area under F-t curve",
      "Conservation: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'"
    ],
    universalFacts: [
      "Momentum is conserved in ALL collisions (elastic and inelastic).",
      "Impulse equals change in momentum — fundamental theorem of mechanics.",
      "Airbags reduce injury by increasing collision time, reducing force.",
      "Rocket propulsion works on the principle of conservation of momentum.",
      "The unit N·s is equivalent to kg·m/s."
    ],
    examples: [
      "A 0.5 kg ball moving at 10 m/s has momentum = 5 kg·m/s.",
      "A car crash: 1000 kg car at 20 m/s stopped in 0.1s → Force = 200,000 N.",
      "Recoil of a gun: If bullet (0.02 kg) leaves at 500 m/s, gun recoils at 2 m/s (for 5 kg gun)."
    ],
    practiceQuestions: [
      "Calculate the impulse delivered to a 0.2 kg ball when hit with a force of 100 N for 0.05 s.",
      "A 60 kg person jumps from a height and lands in 0.3 s with speed 5 m/s. Find average force.",
      "Two objects (2 kg and 3 kg) collide. 2 kg moves at 4 m/s, 3 kg at rest. After collision, 2 kg moves at 1 m/s. Find final velocity of 3 kg.",
      "Explain why a cricket player lowers hands while catching a ball."
    ],
    keyPoints: [
      "Momentum is a vector quantity (has direction).",
      "Impulse = Area under F-t graph.",
      "In collisions: total momentum before = total momentum after.",
      "Force = rate of change of momentum."
    ],
    examShortTricks: [
      "Remember: J = F×t = change in p",
      "For rebound problems: Δp = m(v_f + v_i) — add magnitudes!",
      "Momentum conserved in ALL collisions; KE only in elastic."
    ],
    mcs: [
      {
        question: "The SI unit of momentum is:",
        options: ["N", "kg·m/s", "J", "W"],
        answer: "B"
      },
      {
        question: "Impulse is equal to:",
        options: ["Change in momentum", "Change in kinetic energy", "Force × distance", "Mass × acceleration"],
        answer: "A"
      },
      {
        question: "In an inelastic collision:",
        options: ["Only momentum is conserved", "Only KE is conserved", "Both momentum and KE are conserved", "Neither is conserved"],
        answer: "A"
      },
      {
        question: "A 2 kg object moving at 3 m/s has momentum:",
        options: ["6 kg·m/s", "1.5 kg·m/s", "9 kg·m/s", "0.67 kg·m/s"],
        answer: "A"
      }
    ]
  },
  "conservation-linear-momentum": {
    formulas: [
      "Before collision: m₁u₁ + m₂u₂",
      "After collision: m₁v₁ + m₂v₂",
      "Conservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
      "Elastic collision: KE_before = KE_after",
      "Common velocity (perfectly inelastic): v = (m₁u₁ + m₂u₂)/(m₁ + m₂)"
    ],
    universalFacts: [
      "Conservation of momentum applies to isolated systems (no external forces).",
      "Rocket propulsion is a classic example of momentum conservation.",
      "In nuclear reactions, momentum is conserved even when mass is converted to energy.",
      "The law holds true at both classical and relativistic speeds.",
      "Momentum conservation is a consequence of Newton's third law."
    ],
    examples: [
      "Recoil of a cannon: When a cannon fires a shell, the cannon recoils backward.",
      "Explosion: A bomb at rest explodes into pieces — total momentum remains zero.",
      "Collision of billiard balls: Momentum is transferred between balls.",
      "Jumping from a boat: When you jump forward, the boat moves backward."
    ],
    practiceQuestions: [
      "A 5 kg cannon fires a 0.5 kg shell at 200 m/s. Find the recoil velocity.",
      "Two objects of masses 2 kg and 3 kg moving towards each other at 4 m/s and 2 m/s collide and stick. Find final velocity.",
      "A 60 kg skater throws a 2 kg ball at 10 m/s. Find skater's recoil velocity.",
      "Prove that in elastic collision, relative speed of approach = relative speed of separation."
    ],
    keyPoints: [
      "Momentum conservation: total p before = total p after.",
      "Valid for both elastic and inelastic collisions.",
      "External forces must be zero for conservation.",
      "Use sign convention for direction."
    ],
    examShortTricks: [
      "Remember: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
      "For perfectly inelastic: objects stick together → common velocity.",
      "Direction matters: assign positive/negative signs."
    ],
    mcs: [
      {
        question: "In an isolated system, the total momentum is:",
        options: ["Conserved", "Always increasing", "Always decreasing", "Zero"],
        answer: "A"
      },
      {
        question: "When two objects collide and stick together, the collision is:",
        options: ["Elastic", "Perfectly inelastic", "Partially elastic", "Cannot determine"],
        answer: "B"
      }
    ]
  },
  "application-of-newton-s-laws": {
    formulas: [
      "Newton's 2nd Law: F = ma",
      "Weight: W = mg",
      "Normal force on horizontal surface: N = mg",
      "Normal force on inclined plane: N = mg cos θ",
      "Friction: f = μN = μmg cos θ",
      "Tension in string: T = m(g ± a)"
    ],
    universalFacts: [
      "Newton's laws apply to objects at rest, moving at constant velocity, or accelerating.",
      "The laws are valid in inertial reference frames (non-accelerating).",
      "Free body diagrams are essential for solving Newton's law problems.",
      "Normal force is NOT always equal to weight — it depends on the situation.",
      "Friction opposes relative motion between surfaces."
    ],
    examples: [
      "Elevator problem: Apparent weight = m(g + a) when accelerating up, m(g - a) when accelerating down.",
      "Inclined plane: Block sliding down frictionless plane → a = g sin θ.",
      "Atwood machine: Two masses connected by string over pulley → a = (m₁ - m₂)g/(m₁ + m₂).",
      "Pulling a sled: Tension must overcome friction: T = μmg for constant velocity."
    ],
    practiceQuestions: [
      "Find the tension in a string when a 5 kg mass is suspended and accelerated upward at 2 m/s².",
      "A block of mass 10 kg slides down a frictionless incline of 30°. Find acceleration.",
      "Two masses (3 kg and 5 kg) are connected by a string over a pulley. Find acceleration and tension.",
      "A car of mass 1000 kg accelerates from rest to 20 m/s in 5 s. Find the net force."
    ],
    keyPoints: [
      "Always draw free body diagrams.",
      "Resolve forces into components.",
      "Apply F = ma in each direction separately.",
      "Tension is same throughout massless string."
    ],
    examShortTricks: [
      "Elevator: Up acceleration → heavier (T = m(g+a)); Down → lighter (T = m(g-a)).",
      "Incline: Component parallel = mg sin θ; Perpendicular = mg cos θ.",
      "Atwood machine: a = (m₁-m₂)g/(m₁+m₂), T = 2m₁m₂g/(m₁+m₂)."
    ],
    mcs: [
      {
        question: "The apparent weight of a person in an elevator accelerating upward is:",
        options: ["mg", "m(g+a)", "m(g-a)", "ma"],
        answer: "B"
      },
      {
        question: "On an inclined plane, the component of weight parallel to the plane is:",
        options: ["mg cos θ", "mg sin θ", "mg tan θ", "mg"],
        answer: "B"
      }
    ]
  },
  "moment-torque-equilibrium": {
    formulas: [
      "Torque: τ = F × d = Fd sin θ",
      "Moment of force: M = F × perpendicular distance",
      "Equilibrium: ΣF = 0 and Στ = 0",
      "Clockwise torque = Counter-clockwise torque",
      "Center of gravity: point where weight acts"
    ],
    universalFacts: [
      "Torque is the rotational analog of force.",
      "An object is in equilibrium when net force AND net torque are zero.",
      "The principle of moments states that clockwise moments equal counter-clockwise moments.",
      "Center of gravity determines stability of objects.",
      "Torque depends on both force magnitude and lever arm distance."
    ],
    examples: [
      "Opening a door: Torque = Force × distance from hinge. Larger distance = easier to open.",
      "Seesaw: Two children balance when m₁d₁ = m₂d₂.",
      "Beam balance: Equal torques on both sides for equilibrium.",
      "Spanner: Longer spanner gives more torque for same force."
    ],
    practiceQuestions: [
      "A 10 N force is applied at the end of a 0.5 m spanner. Find the torque.",
      "A uniform beam of length 4 m and weight 100 N is supported at its center. A 50 N weight hangs at one end. Where must a 100 N weight be placed for equilibrium?",
      "A ladder leans against a wall. Explain the forces acting on it.",
      "Find the tension in a cable supporting a 200 N sign at an angle of 30°."
    ],
    keyPoints: [
      "Torque = Force × perpendicular distance.",
      "Equilibrium requires both ΣF = 0 and Στ = 0.",
      "Clockwise torques = Counter-clockwise torques.",
      "Unit of torque: N·m (same as energy but different concept)."
    ],
    examShortTricks: [
      "Remember: τ = Fd (perpendicular distance).",
      "For equilibrium: Σclockwise = Σcounter-clockwise.",
      "Always take moments about a point to eliminate unknown forces."
    ],
    mcs: [
      {
        question: "The SI unit of torque is:",
        options: ["N", "J", "N·m", "Pa"],
        answer: "C"
      },
      {
        question: "For an object to be in rotational equilibrium:",
        options: ["Net force must be zero", "Net torque must be zero", "Both net force and net torque must be zero", "Neither matters"],
        answer: "C"
      }
    ]
  },
  "solid-friction": {
    formulas: [
      "Limiting friction: f = μN",
      "Coefficient of friction: μ = f/N",
      "Angle of friction: tan λ = μ",
      "Angle of repose: tan θ = μ",
      "Friction on incline: f = mg sin θ (at limiting equilibrium)"
    ],
    universalFacts: [
      "Friction opposes relative motion between surfaces in contact.",
      "Limiting friction is the maximum value of static friction.",
      "Coefficient of friction depends on nature of surfaces, not area.",
      "Kinetic friction is usually less than limiting friction.",
      "Friction is both a friend (walking) and a foe (wear and tear)."
    ],
    examples: [
      "Walking: Friction between shoe and ground prevents slipping.",
      "Car brakes: Friction between pads and discs slows the car.",
      "Sliding a box: Need to overcome limiting friction to start motion.",
      "Inclined plane: Box slips when mg sin θ > μmg cos θ."
    ],
    practiceQuestions: [
      "A 10 kg box rests on a horizontal surface. If μ = 0.5, find the limiting friction.",
      "A block just slides down an incline of 30°. Find coefficient of friction.",
      "A 5 kg block is pulled by a force of 20 N on a rough surface (μ = 0.3). Find acceleration.",
      "Explain why it is harder to start moving a heavy object than to keep it moving."
    ],
    keyPoints: [
      "Static friction ≤ μN (variable up to limiting value).",
      "Kinetic friction = μ_k N (constant).",
      "Angle of repose = Angle of friction.",
      "Friction is independent of contact area."
    ],
    examShortTricks: [
      "Remember: f_limiting = μN",
      "On incline: μ = tan θ (at limiting equilibrium).",
      "To start motion: F > f_limiting; to maintain: F = f_kinetic."
    ],
    mcs: [
      {
        question: "The coefficient of static friction is generally:",
        options: ["Less than kinetic friction", "Greater than kinetic friction", "Equal to kinetic friction", "Zero"],
        answer: "B"
      },
      {
        question: "On an inclined plane, a block begins to slide when the angle is θ. The coefficient of friction is:",
        options: ["sin θ", "cos θ", "tan θ", "cot θ"],
        answer: "C"
      }
    ]
  },
  // ELASTICITY
  "hooke-law-force-constant": {
    formulas: [
      "Hooke's Law: F = kx",
      "Force constant: k = F/x",
      "Elastic potential energy: E = ½kx²",
      "Work done in stretching: W = ½kx²"
    ],
    universalFacts: [
      "Hooke's law is valid only within the elastic limit.",
      "The force constant k depends on material and geometry.",
      "Steiffer springs have higher k values.",
      "Beyond elastic limit, permanent deformation occurs.",
      "Hooke discovered this law in 1660."
    ],
    examples: [
      "Spring with k = 100 N/m stretched by 0.1 m: F = 10 N.",
      "Two springs in series: 1/k_eq = 1/k₁ + 1/k₂.",
      "Two springs in parallel: k_eq = k₁ + k₂.",
      "Mass hanging from spring: mg = kx at equilibrium."
    ],
    practiceQuestions: [
      "A spring stretches 5 cm when a 10 N force is applied. Find k.",
      "Calculate the work done in stretching a spring (k = 200 N/m) by 10 cm.",
      "Two springs (k₁ = 100 N/m, k₂ = 200 N/m) are connected in series. Find equivalent k.",
      "A mass of 0.5 kg hangs from a spring (k = 200 N/m). Find extension."
    ],
    keyPoints: [
      "F = kx (force proportional to extension).",
      "k = force constant (N/m).",
      "Valid only within elastic limit.",
      "Energy stored = ½kx²."
    ],
    examShortTricks: [
      "Remember: F = kx → k = F/x.",
      "Series springs: 1/k = 1/k₁ + 1/k₂ (like resistors in parallel).",
      "Parallel springs: k = k₁ + k₂ (like resistors in series)."
    ],
    mcs: [
      {
        question: "Hooke's law states that:",
        options: ["F ∝ x²", "F ∝ 1/x", "F ∝ x", "F is independent of x"],
        answer: "C"
      },
      {
        question: "The SI unit of force constant is:",
        options: ["N", "J", "N/m", "m/N"],
        answer: "C"
      }
    ]
  },
  "stress-strain-elasticity-and-plasticity": {
    formulas: [
      "Stress: σ = F/A [N/m² or Pa]",
      "Strain: ε = ΔL/L [dimensionless]",
      "Young's modulus: Y = σ/ε = FL/AΔL",
      "Proportional limit: stress ∝ strain",
      "Elastic limit: material returns to original shape"
    ],
    universalFacts: [
      "Stress is force per unit area.",
      "Strain is fractional change in dimension.",
      "The stress-strain curve shows material behavior.",
      "Brittle materials fracture soon after elastic limit.",
      "Ductile materials show large plastic deformation."
    ],
    examples: [
      "Wire stretched: Stress = F/A, Strain = ΔL/L.",
      "Steel wire (Y = 2 × 10¹¹ Pa) stretched by 1%: stress = 2 × 10⁹ Pa.",
      "Rubber band: Large strain for small stress (low Y).",
      "Glass: Brittle — fractures without plastic deformation."
    ],
    practiceQuestions: [
      "A wire of length 2 m and area 1 mm² is stretched by 0.1 mm under 100 N force. Find Young's modulus.",
      "Calculate stress and strain in a steel wire (A = 2 mm²) supporting a 500 N load.",
      "Describe the stress-strain curve for a ductile material.",
      "Explain the difference between elastic and plastic deformation."
    ],
    keyPoints: [
      "Stress = Force/Area.",
      "Strain = Change in length/Original length.",
      "Elastic limit: maximum stress before permanent deformation.",
      "Breaking point: stress at which material fractures."
    ],
    examShortTricks: [
      "Remember: Stress = F/A, Strain = ΔL/L.",
      "Young's modulus: Y = (F/A)/(ΔL/L) = FL/AΔL.",
      "Higher Y = stiffer material."
    ],
    mcs: [
      {
        question: "The ratio of stress to strain is called:",
        options: ["Pressure", "Elastic modulus", "Strain energy", "Potential energy"],
        answer: "B"
      },
      {
        question: "A material that obeys Hooke's law has:",
        options: ["Linear stress-strain relationship", "Non-linear relationship", "No relationship", "Variable relationship"],
        answer: "A"
      }
    ]
  },
  "elastic-modulus": {
    formulas: [
      "Young's modulus: Y = FL/AΔL",
      "Bulk modulus: K = -P/(ΔV/V)",
      "Shear modulus: G = F/A / Δx/h",
      "Poisson's ratio: σ = lateral strain/longitudinal strain",
      "Relationship: Y = 3K(1-2σ) = 2G(1+σ)"
    ],
    universalFacts: [
      "Young's modulus measures stiffness of materials.",
      "Bulk modulus measures resistance to volume change.",
      "Shear modulus measures resistance to shape change.",
      "Poisson's ratio is typically 0.2-0.5 for most materials.",
      "Steel has higher Y than aluminum."
    ],
    examples: [
      "Steel: Y ≈ 2 × 10¹¹ Pa.",
      "Aluminum: Y ≈ 7 × 10¹⁰ Pa.",
      "Rubber: Y ≈ 0.01 × 10¹¹ Pa.",
      "Water: K ≈ 2.2 × 10⁹ Pa."
    ],
    practiceQuestions: [
      "Calculate Young's modulus for a wire stretched by 1% under stress of 2 × 10⁹ Pa.",
      "A material has Y = 2 × 10¹¹ Pa and Poisson's ratio = 0.3. Find bulk modulus.",
      "Compare the elongation of steel and copper wires of same dimensions under same load.",
      "Show that Y = 3K(1-2σ)."
    ],
    keyPoints: [
      "Three elastic moduli: Y, K, G.",
      "Poisson's ratio relates lateral and longitudinal strain.",
      "All moduli have units of pressure (Pa).",
      "Larger modulus = stiffer material."
    ],
    examShortTricks: [
      "Remember: Y = stress/strain (for tensile).",
      "K = -pressure/volumetric strain.",
      "G = shear stress/shear strain.",
      "Y = 2G(1+σ) for relationship."
    ],
    mcs: [
      {
        question: "Young's modulus is defined as:",
        options: ["Stress/Strain", "Strain/Stress", "Force/Area", "Force/Length"],
        answer: "A"
      },
      {
        question: "Which material has the highest Young's modulus?",
        options: ["Rubber", "Copper", "Steel", "Aluminum"],
        answer: "C"
      }
    ]
  },
  "poisson-ratio": {
    formulas: [
      "Poisson's ratio: σ = -ε_lateral/ε_longitudinal",
      "Range: -1 < σ < 0.5",
      "For most materials: 0 < σ < 0.5",
      "Volume change: ΔV/V = ε(1-2σ)",
      "Relation with moduli: Y = 3K(1-2σ) = 2G(1+σ)"
    ],
    universalFacts: [
      "Poisson's ratio is named after Siméon Denis Poisson.",
      "Most metals have σ ≈ 0.3.",
      "Cork has σ ≈ 0 (no lateral contraction).",
      "Rubber has σ ≈ 0.5 (nearly incompressible).",
      "Auxetic materials have negative Poisson's ratio."
    ],
    examples: [
      "Steel wire stretched: lateral contraction occurs.",
      "Rubber band: when stretched, becomes thinner.",
      "Cork: compressed vertically but doesn't expand sideways.",
      "Gold: σ ≈ 0.42 (very ductile)."
    ],
    practiceQuestions: [
      "A steel wire (Y = 2 × 10¹¹ Pa) is stretched. If σ = 0.3, find the lateral strain when longitudinal strain is 0.001.",
      "Calculate the change in volume of a cube when subjected to uniform pressure.",
      "Show that for incompressible materials, σ = 0.5.",
      "Explain the physical significance of Poisson's ratio."
    ],
    keyPoints: [
      "Poisson's ratio = -lateral strain/longitudinal strain.",
      "Range: -1 to 0.5.",
      "For most materials: 0.25 to 0.35.",
      "σ = 0.5 means incompressible."
    ],
    examShortTricks: [
      "Remember: σ = -lateral/longitudinal.",
      "For incompressible: σ = 0.5.",
      "For cork: σ ≈ 0."
    ],
    mcs: [
      {
        question: "Poisson's ratio for most metals is approximately:",
        options: ["0", "0.3", "0.5", "1.0"],
        answer: "B"
      },
      {
        question: "If Poisson's ratio is 0.5, the material is:",
        options: ["Highly compressible", "Incompressible", "Brittle", "Elastic"],
        answer: "B"
      }
    ]
  },
  "elastic-potential-energy": {
    formulas: [
      "Elastic PE: U = ½kx²",
      "Energy density: u = ½stress × strain = ½Yε²",
      "Work done in stretching: W = ½kx²",
      "Restoring force: F = -kx"
    ],
    universalFacts: [
      "Elastic potential energy is stored in deformed elastic materials.",
      "Energy density is energy per unit volume.",
      "The energy stored is recoverable (unlike plastic deformation).",
      "Energy density depends on both stress and strain.",
      "Springs store mechanical energy."
    ],
    examples: [
      "Springs in pens: compressed spring stores energy.",
      "Bow and arrow: drawn bow stores elastic PE.",
      "Suspension system: car springs absorb energy.",
      "Trampoline: stretched fabric stores energy."
    ],
    practiceQuestions: [
      "Calculate the energy stored in a spring (k = 200 N/m) stretched by 5 cm.",
      "Find the energy density in a wire stretched by 1% if Y = 2 × 10¹¹ Pa.",
      "A spring stores 10 J when stretched by 10 cm. Find k.",
      "Derive the expression for elastic potential energy."
    ],
    keyPoints: [
      "U = ½kx² for springs.",
      "Energy density = ½Yε².",
      "Energy is stored elastically.",
      "Work done = energy stored."
    ],
    examShortTricks: [
      "Remember: U = ½kx².",
      "Energy density: u = ½Yε².",
      "For springs: more stretch = more energy (quadratic)."
    ],
    mcs: [
      {
        question: "The elastic potential energy stored in a spring is proportional to:",
        options: ["x", "x²", "√x", "1/x"],
        answer: "B"
      },
      {
        question: "The unit of energy density is:",
        options: ["N/m", "J/m³", "Pa", "Both B and C"],
        answer: "D"
      }
    ]
  },
  // GRAVITATION
  "newton-s-law-of-gravitation": {
    formulas: [
      "F = GMm/r²",
      "g = GM/R²",
      "Weight: W = mg",
      "Gravitational potential: V = -GM/r"
    ],
    universalFacts: [
      "Newton's law of gravitation is universal — applies to all masses.",
      "Gravitational force is always attractive.",
      "Gravitational constant G = 6.674 × 10⁻¹¹ N·m²/kg².",
      "Gravity is the weakest fundamental force.",
      "The force follows inverse square law."
    ],
    examples: [
      "Earth-Sun force: F = 6.674 × 10⁻¹¹ × 5.97 × 10²⁴ × 1.99 × 10³⁰ / (1.5 × 10¹¹)² ≈ 3.54 × 10²² N.",
      "Weight on Moon: W_moon = mg_moon = m × 1.62 m/s² ≈ 1/6 of Earth weight.",
      "Two 1 kg masses 1 m apart: F = 6.674 × 10⁻¹¹ N."
    ],
    practiceQuestions: [
      "Calculate the gravitational force between two 1000 kg spheres separated by 1 m.",
      "Find the value of g at height h = R (Earth's radius).",
      "Show that g decreases with altitude.",
      "Calculate the force between Earth and Moon."
    ],
    keyPoints: [
      "F = GMm/r² (inverse square law).",
      "G is universal gravitational constant.",
      "g = GM/R² on Earth's surface.",
      "Gravitational force is always attractive."
    ],
    examShortTricks: [
      "Remember: F = GMm/r².",
      "g varies as 1/r².",
      "At height h: g' = g(1 - 2h/R) for small h."
    ],
    mcs: [
      {
        question: "The gravitational constant G has units of:",
        options: ["N·m²/kg²", "N·kg²/m²", "N/m²/kg", "N·m/kg"],
        answer: "A"
      },
      {
        question: "If distance between two masses is doubled, the gravitational force becomes:",
        options: ["Double", "Half", "One-fourth", "Four times"],
        answer: "C"
      }
    ]
  },
  "gravitational-field-strength": {
    formulas: [
      "g = GM/r²",
      "g = GM/R² at surface",
      "g_h = g(1 - 2h/R) for small h",
      "g_d = g(1 - d/R) inside Earth",
      "Field intensity: E = F/m = g"
    ],
    universalFacts: [
      "Gravitational field strength is force per unit mass.",
      "g decreases with height above Earth's surface.",
      "g also decreases with depth inside Earth.",
      "g is maximum at Earth's surface.",
      "Value of g varies slightly with latitude."
    ],
    examples: [
      "At height h = R: g' = g/4.",
      "At height h = 2R: g' = g/9.",
      "At center of Earth: g = 0.",
      "g at poles > g at equator due to Earth's shape."
    ],
    practiceQuestions: [
      "Calculate g at height equal to Earth's radius.",
      "Find g at depth d = R/2 inside Earth.",
      "Show that g decreases with altitude.",
      "Explain why g is different at poles and equator."
    ],
    keyPoints: [
      "g = GM/r² (general formula).",
      "g decreases with height and depth.",
      "At center of Earth: g = 0.",
      "g at surface ≈ 9.8 m/s²."
    ],
    examShortTricks: [
      "At height h: g' = gR²/(R+h)².",
      "At depth d: g' = g(1 - d/R).",
      "At center: g = 0."
    ],
    mcs: [
      {
        question: "The value of g at the center of Earth is:",
        options: ["9.8 m/s²", "Zero", "Infinity", "Same as surface"],
        answer: "B"
      },
      {
        question: "As we go higher from Earth's surface, g:",
        options: ["Increases", "Decreases", "Remains constant", "First increases then decreases"],
        answer: "B"
      }
    ]
  },
  "gravitational-potential-energy": {
    formulas: [
      "PE = -GMm/r (general)",
      "PE = mgh (near surface)",
      "ΔPE = GMm(1/r₁ - 1/r₂)",
      "Potential: V = -GM/r"
    ],
    universalFacts: [
      "Gravitational PE is negative (zero at infinity).",
      "PE increases as object moves away from Earth.",
      "The reference point is at infinity (PE = 0).",
      "Near Earth's surface: PE = mgh.",
      "Escape velocity relates to gravitational PE."
    ],
    examples: [
      "Object at Earth's surface: PE = -GMm/R.",
      "Object at height h: PE = -GMm/(R+h).",
      "Work done to lift object: ΔPE = mgh (small h).",
      "Satellite in orbit: PE = -GMm/(R+h)."
    ],
    practiceQuestions: [
      "Calculate the gravitational PE of a 1000 kg satellite at height 400 km.",
      "Find the work done in lifting a 10 kg mass from surface to height R.",
      "Derive the expression for gravitational potential energy.",
      "Calculate the change in PE when object moves from r₁ to r₂."
    ],
    keyPoints: [
      "PE = -GMm/r (general formula).",
      "PE = mgh (near surface approximation).",
      "PE is negative (bound system).",
      "Zero PE at infinity."
    ],
    examShortTricks: [
      "Near surface: PE = mgh.",
      "General: PE = -GMm/r.",
      "Change in PE: ΔPE = GMm(1/r₁ - 1/r₂)."
    ],
    mcs: [
      {
        question: "The gravitational potential energy of a satellite is:",
        options: ["Positive", "Negative", "Zero", "Infinite"],
        answer: "B"
      },
      {
        question: "At infinity, the gravitational potential energy is:",
        options: ["Maximum", "Minimum", "Zero", "Negative"],
        answer: "C"
      }
    ]
  },
  "satellite-motion": {
    formulas: [
      "Orbital velocity: v₀ = √(GM/r) = √(gR²/r)",
      "Time period: T = 2π√(r³/GM) = 2π√(r³/gR²)",
      "Total energy: E = -GMm/2r",
      "KE = GMm/2r",
      "PE = -GMm/r"
    ],
    universalFacts: [
      "Satellite is in free fall around Earth.",
      "Orbital velocity is independent of satellite mass.",
      "Geostationary satellite orbits at height 36,000 km.",
      "Period of geostationary satellite = 24 hours.",
      "Orbital velocity decreases with altitude."
    ],
    examples: [
      "Low Earth orbit (h << R): v₀ ≈ 7.9 km/s.",
      "Geostationary orbit: T = 24 h, h ≈ 36,000 km.",
      "ISS orbits at ~400 km: v₀ ≈ 7.7 km/s.",
      "Moon: T ≈ 27.3 days, r ≈ 3.84 × 10⁸ m."
    ],
    practiceQuestions: [
      "Calculate orbital velocity of satellite at height 400 km.",
      "Find the time period of geostationary satellite.",
      "Show that total energy = -KE.",
      "Calculate the escape velocity from Earth."
    ],
    keyPoints: [
      "v₀ = √(GM/r) for circular orbit.",
      "T = 2π√(r³/GM).",
      "E_total = -GMm/2r = -KE.",
      "Geostationary: T = 24 h, h ≈ 36,000 km."
    ],
    examShortTricks: [
      "Orbital velocity: v₀ = √(gR²/r).",
      "For low orbit: v₀ ≈ 7.9 km/s.",
      "Geostationary: T = 24 h."
    ],
    mcs: [
      {
        question: "The orbital velocity of a satellite depends on:",
        options: ["Mass of satellite", "Height of orbit", "Both mass and height", "Neither"],
        answer: "B"
      },
      {
        question: "A geostationary satellite has period:",
        options: ["1 hour", "12 hours", "24 hours", "27.3 days"],
        answer: "C"
      }
    ]
  },
  "escape-velocity": {
    formulas: