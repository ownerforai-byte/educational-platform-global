import { pd01 } from "./pd01-part1.mjs";
import { pd01Meta } from "./pd01-meta.mjs";

export const fullPd01 = {
  ...pd01,
  ...pd01Meta,
  summary: "Electrostatic potential V is the work done per unit positive charge in bringing a test charge from infinity, given by V = -∫E·dr, with SI unit the volt. A point charge Q produces V = kQ/r, falling as 1/r (compared with the field's 1/r²), and fields and potentials are linked by E = -∇V. The potential energy of a charge system is U = kΣqᵢqⱼ/rᵢⱼ, positive for like charges and negative for unlike charges, with ΔU = -W_electric. The electron volt is an energy unit where 1 eV = 1.602 × 10⁻¹⁹ J.",
  specialNotes: [
    "Electric potential can be zero at a point even where the field is non-zero (the equatorial point of a dipole, and the null point of a dipole field). Only the electric field is guaranteed to be non-zero wherever a charge feels a force.",
    "Inside a hollow charged conductor the potential is constant (not zero): V = kQ/R, whereas the electric field there is zero. Zero field does not imply zero potential.",
    "Because V depends on position but not on the path taken, a charge can reach a point via any route with identical work done, which is why parallel-plate capacitor calculations ignore the fringing geometry at the edges."
  ],
  importantStatements: [
    "Statement 1: Electric potential at a point is defined as the work done per unit positive charge in bringing a test charge from infinity to that point.",
    "Statement 2: The potential due to a point charge varies inversely with distance (V ∝ 1/r), whereas the electric field varies inversely with distance squared (E ∝ 1/r²).",
    "Statement 3: The electric field at any point is the negative gradient of the potential at that point (E = -∇V).",
    "Statement 4: The potential energy of two like charges is positive, indicating a repulsive, unbound configuration, whereas for two unlike charges it is negative, indicating an attractive, bound configuration.",
    "Statement 5: One electron volt is the energy gained by an electron accelerated through a potential difference of one volt, equal to 1.602 × 10⁻¹⁹ J."
  ],
  importantNotes: [
    "The SI unit of potential is the volt (V), where 1 V = 1 J/C, and its dimensional formula is [M L² T⁻³ I⁻¹], identical to that of energy per unit charge."
  ],
  examShortTricks: [
    "Field-to-potential conversion trick: whenever E ∝ 1/r², the corresponding potential is V ∝ 1/r; whenever E ∝ 1/r, the potential is V ∝ ln r.",
    "Sign check: a positive charge always moves toward lower V, while a negative charge moves toward higher V, since force always acts to reduce potential energy.",
    "eV conversion: multiply eV by 1.602 × 10⁻¹⁹ to get joules, or divide joules by 1.602 × 10⁻¹⁹ to get eV."
  ],
  examNotes: [
    "Derivation of potential due to a point charge and of potential energy of a charge system, together with the eV-J conversion, forms a frequently asked 5-mark long question in NEB Class 11 Physics."
  ],
  mcs: [
    {
      question: "An electron is accelerated through a potential difference of 100 V. The energy gained in joules is:",
      options: [
        "100 J",
        "1.602 × 10⁻¹⁷ J",
        "1.602 × 10⁻²¹ J",
        "6.242 × 10¹⁹ J"
      ],
      answer: "B",
      explanation: "Energy gained = qV = (1.602 × 10⁻¹⁹ C)(100 V) = 1.602 × 10⁻¹⁷ J, which is equivalent to 100 eV."
    },
    {
      question: "Two charges +2 μC and -2 μC are separated by 1 m. The potential energy of the system is:",
      options: [
        "positive",
        "negative",
        "zero",
        "infinite"
      ],
      answer: "B",
      explanation: "U = kq₁q₂/r. Since q₁q₂ = (2 × 10⁻⁶)(−2 × 10⁻⁶) < 0, the product is negative, so U is negative, corresponding to an attractive and bound configuration."
    },
    {
      question: "The potential at a point where the electric field is zero must be:",
      options: [
        "zero",
        "finite and non-zero",
        "infinite",
        "undefined"
      ],
      answer: "B",
      explanation: "E = 0 means the field has no local variation of potential, but the potential itself can take any value. At the midpoint between two equal positive charges, E = 0 yet V = 2kQ/r ≠ 0."
    }
  ],
  importantConcepts: [
    "Definition of electrostatic potential and potential difference with units and dimensions.",
    "Derivation of potential due to a point charge and superposition of potentials.",
    "Field–potential gradient relation E = -∇V.",
    "Potential energy of discrete charge systems and its sign interpretation.",
    "Electron volt as an energy unit and its conversion to joules."
  ],
  importantTasks: [
    "Derive V = kQ/r for an isolated point charge from first principles.",
    "Calculate the potential and potential energy of a two-charge configuration.",
    "Convert energy values between joules, electron volts, and multiples (keV, MeV)."
  ],
  duplicateType: 1,
  visualType: "potential"
};
