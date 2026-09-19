import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Physics high-yield bank, part 2 — heat, optics, electricity, semiconductors
 * and modern physics.
 *
 * Every entry lists the `unitSlugs` it serves (ids from
 * `frontend/lib/syllabus.ts`); unit-aware callers resolve only through that
 * list. See `high-yield-topic-facts.ts` for the resolution rules.
 */
export const HIGH_YIELD_TOPIC_BANK_PHYSICS_2: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Heat, Temperature & Thermal Expansion
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "heat-and-temperature",
      "thermal-expansion",
      "thermal-equilibrium",
      "zeroth-law",
      "expansion",
      "thermometry",
      "calorimetry",
    ],
    subject: "physics",
    title: "Heat, Temperature & Thermal Expansion",
    unitSlugs: ["heat-and-temperature", "thermal-expansion"],
    category: "Heat & Thermodynamics",
    governingLaws: [
      {
        name: "Zeroth Law of Thermodynamics",
        statement:
          "If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other. This law is what makes temperature a measurable, unambiguous quantity.",
        formula: "A \\sim C, \\; B \\sim C \\implies A \\sim B",
        conditions:
          "Thermal equilibrium means no net heat flows between the bodies, so they share the same temperature.",
      },
      {
        name: "Expansion of Solids",
        statement:
          "For a small rise in temperature the change in length, area or volume of a solid is directly proportional to its original dimension and to the temperature rise.",
        formula:
          "L = L_0(1 + \\alpha\\Delta\\theta), \\quad A = A_0(1 + \\beta\\Delta\\theta), \\quad V = V_0(1 + \\gamma\\Delta\\theta)",
        conditions:
          "For an isotropic solid, alpha : beta : gamma = 1 : 2 : 3 exactly, so gamma = 3 alpha.",
      },
    ],
    speedFormulas: [
      {
        name: "Coefficient Relations and Pendulum Clock Error",
        formula:
          "\\beta = 2\\alpha, \\quad \\gamma = 3\\alpha, \\quad \\frac{\\Delta T}{T} = \\frac{1}{2}\\alpha\\Delta\\theta",
        description:
          "A pendulum clock runs slow in summer (the rod lengthens, T increases) and fast in winter. Fractional time lost per second = (1/2) alpha delta-theta.",
        unit: "K^-1",
      },
      {
        name: "Apparent Expansion of a Liquid",
        formula: "\\gamma_{apparent} = \\gamma_{real} - 3\\alpha_{vessel}",
        description:
          "The vessel also expands, so the observed rise in level is less than the true expansion of the liquid.",
        unit: "K^-1",
      },
      {
        name: "Thermal Stress",
        formula: "\\text{stress} = Y\\alpha\\Delta\\theta",
        description:
          "Developed when a rod is rigidly clamped at both ends and cannot expand when heated or contract when cooled.",
        unit: "Pa",
      },
      {
        name: "Heat, Specific Heat and Latent Heat",
        formula: "Q = mc\\Delta\\theta, \\quad Q = mL",
        description:
          "Latent heat produces a change of state at constant temperature; specific heat produces a temperature change within a state.",
        unit: "J",
      },
    ],
    constantsAndValues: [
      { symbol: "\\alpha_{steel}", name: "Linear expansivity of steel", value: "12 x 10^-6", unit: "K^-1" },
      { symbol: "\\alpha_{copper}", name: "Linear expansivity of copper", value: "17 x 10^-6", unit: "K^-1" },
      { symbol: "\\alpha_{brass}", name: "Linear expansivity of brass", value: "19 x 10^-6", unit: "K^-1" },
      { symbol: "\\alpha_{aluminium}", name: "Linear expansivity of aluminium", value: "23 x 10^-6", unit: "K^-1" },
      { symbol: "\\alpha_{glass}", name: "Linear expansivity of glass", value: "9 x 10^-6", unit: "K^-1" },
      { symbol: "\\alpha_{invar}", name: "Linear expansivity of invar", value: "1 x 10^-6", unit: "K^-1" },
      { symbol: "\\gamma_{water}", name: "Cubical expansivity of water", value: "2.1 x 10^-4", unit: "K^-1" },
      { symbol: "T_{max,\\rho}", name: "Temperature of maximum density of water", value: "4", unit: "deg C" },
    ],
    entranceTraps: [
      {
        trap: "Heat and temperature are the same physical quantity.",
        truth:
          "Heat is energy in transit, measured in joules. Temperature is a measure of the average kinetic energy of the molecules, measured in kelvin. Equal heat added to different masses gives different temperature rises.",
        examRef: "NEB / IOE — heat vs temperature",
      },
      {
        trap: "Water has its maximum density at 0 degrees C.",
        truth:
          "Between 0 and 4 degrees C water contracts on heating. Its density is maximum at 4 degrees C, which is why a pond freezes from the top and fish survive underneath — the anomalous expansion of water.",
        examRef: "IOE/CEE — anomalous expansion",
      },
      {
        trap: "A pendulum clock gains time in summer.",
        truth:
          "In summer the rod lengthens, the period T = 2 pi sqrt(l/g) increases, so the clock runs SLOW and loses time. It gains time in winter, when the rod contracts.",
        examRef: "NEB — thermal expansion applications",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A steel rod of length 1 m is heated through 50 degrees C. Find its increase in length. Take alpha = 12 x 10^-6 K^-1.",
        given: "L_0 = 1 m, \\Delta\\theta = 50 K, \\alpha = 12 \\times 10^{-6} K^{-1}",
        steps: [
          "Complementary expansion: \\Delta L = L_0\\alpha\\Delta\\theta",
          "\\Delta L = 1 \\times 12 \\times 10^{-6} \\times 50",
          "\\Delta L = 6 \\times 10^{-4} m",
        ],
        answer: "\\Delta L = 0.6 \\text{ mm}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Anomalous Expansion of Water",
        definition:
          "Water contracts as it is heated from 0 degrees C to 4 degrees C, reaching maximum density at 4 degrees C, and then expands normally above that.",
        significance:
          "Explains why lakes freeze from the surface downwards, letting aquatic life survive a Nepali winter under the ice.",
      },
      {
        term: "Thermal Equilibrium",
        definition:
          "The state in which two bodies in contact have the same temperature, so there is no net transfer of heat between them.",
        significance:
          "Measured by the zeroth law, and the reason a thermometer can report a body's temperature.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Quantity of Heat (calorimetry, latent heat, cooling)
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "quantity-of-heat",
      "calorimetry",
      "specific-heat",
      "latent-heat",
      "newton-s-law-of-cooling",
      "water-equivalent",
      "heat-capacity",
    ],
    subject: "physics",
    title: "Quantity of Heat, Calorimetry & Newton's Law of Cooling",
    unitSlugs: ["quantity-of-heat"],
    category: "Heat & Thermodynamics",
    governingLaws: [
      {
        name: "Principle of Calorimetry",
        statement:
          "In a thermally isolated system, the total heat lost by the hotter bodies equals the total heat gained by the cooler bodies until they reach a common temperature of mixture.",
        formula: "\\sum m_i c_i (\\theta_i - \\theta_m) = \\sum m_j c_j (\\theta_m - \\theta_j)",
        conditions:
          "Valid only if no heat is lost to the surroundings; a calorimeter is required and its water equivalent must be included.",
      },
      {
        name: "Newton's Law of Cooling",
        statement:
          "For a small temperature difference, the rate of loss of heat of a body is directly proportional to the excess of its temperature over that of the surroundings.",
        formula:
          "\\frac{dQ}{dt} \\propto (\\theta - \\theta_0) \\implies \\frac{d\\theta}{dt} = -k(\\theta - \\theta_0)",
        conditions:
          "Strictly valid only for SMALL excess temperatures (about 30 degrees C or less), otherwise Stefan's law must be used.",
      },
    ],
    speedFormulas: [
      {
        name: "Integral Form of Newton's Law of Cooling",
        formula: "\\frac{\\theta_1 - \\theta_2}{t} = k\\left(\\frac{\\theta_1 + \\theta_2}{2} - \\theta_0\\right)",
        description:
          "The working form in laboratory questions: the average body temperature over the interval is used instead of the instantaneous value.",
        unit: "deg C s^-1",
      },
      {
        name: "Water Equivalent",
        formula: "W = mc",
        description:
          "The mass of water that would gain the same heat as the whole calorimeter for the same temperature rise.",
        unit: "kg",
      },
      {
        name: "Heat for a Change of State",
        formula: "Q = mL_f \\text{ (melting/freezing)}, \\quad Q = mL_v \\text{ (vaporisation/condensation)}",
        description:
          "Ice to water needs 3.34 x 10^5 J/kg; water to steam at 100 degrees C needs 2.26 x 10^6 J/kg, which is about seven times more.",
        unit: "J",
      },
      {
        name: "Heat Capacity and Molar Heat Capacity",
        formula: "C = mc, \\quad C_m = Mc",
        description:
          "Heat capacity is a property of the object; specific heat is a property of the material.",
        unit: "J K^-1 and J mol^-1 K^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "c_{water}", name: "Specific heat capacity of water", value: "4200", unit: "J kg^-1 K^-1" },
      { symbol: "c_{ice}", name: "Specific heat capacity of ice", value: "2100", unit: "J kg^-1 K^-1" },
      { symbol: "c_{steam}", name: "Specific heat capacity of steam", value: "2000", unit: "J kg^-1 K^-1" },
      { symbol: "L_f", name: "Latent heat of fusion of ice", value: "3.34 x 10^5", unit: "J kg^-1" },
      { symbol: "L_v", name: "Latent heat of vaporisation of water", value: "2.26 x 10^6", unit: "J kg^-1" },
      { symbol: "c_{copper}", name: "Specific heat capacity of copper", value: "390", unit: "J kg^-1 K^-1" },
      { symbol: "4.186 J", name: "One calorie in joules", value: "4.186", unit: "J cal^-1" },
    ],
    entranceTraps: [
      {
        trap: "Newton's law of cooling applies to any temperature difference.",
        truth:
          "It is an approximation valid only for small excess temperatures. For large differences the true rate follows Stefan's law, proportional to (T^4 minus T_0^4).",
        examRef: "IOE — law of cooling",
      },
      {
        trap: "Adding heat always raises the temperature.",
        truth:
          "During melting, boiling and sublimation the added heat goes into changing the state and the temperature stays constant. That heat is the latent heat.",
        examRef: "NEB / CEE — latent heat",
      },
      {
        trap: "Water equivalent is the mass of the calorimeter.",
        truth:
          "It is the mass of WATER that has the same heat capacity as the calorimeter, so it is a mass in kg but numerically the product of the calorimeter's mass and specific heat.",
        examRef: "NEB — calorimetry numericals",
      },
    ],
    workedNumericals: [
      {
        problem:
          "How much heat is required to convert 1 kg of ice at 0 degrees C completely into water at 0 degrees C?",
        given: "m = 1 kg, L_f = 3.34 \\times 10^5 J kg^{-1}, temperature constant at 0 deg C",
        steps: [
          "At 0 degrees C the ice melts without any temperature change",
          "Q = mL_f = 1 \\times 3.34 \\times 10^5",
          "Q = 3.34 \\times 10^5 J",
        ],
        answer: "Q = 3.34 \\times 10^5 \\text{ J} \\quad (334 \\text{ kJ})",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Latent Heat",
        definition:
          "The quantity of heat required to change the state of unit mass of a substance at constant temperature, either at its melting or boiling point.",
        significance:
          "Explains why steam burns are far more severe than boiling-water burns, and why ice cools a drink better than water at the same temperature.",
      },
      {
        term: "Water Equivalent",
        definition:
          "The mass of water whose temperature rise by one kelvin would require the same heat as the body itself.",
        significance:
          "Lets the calorimeter be folded into the calculation as an extra mass of water.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Rate of Heat Flow (conduction, convection, radiation)
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "rate-of-heat-flow",
      "conduction",
      "thermal-conductivity",
      "convection",
      "radiation",
      "stefan",
      "wien",
      "searle",
      "emissive-power",
      "solar-constant",
    ],
    subject: "physics",
    title: "Rate of Heat Flow — Conduction, Convection & Radiation",
    unitSlugs: ["rate-of-heat-flow"],
    category: "Heat & Thermodynamics",
    governingLaws: [
      {
        name: "Fourier's Law of Heat Conduction",
        statement:
          "The rate of flow of heat through a conductor is directly proportional to the area of cross-section, to the temperature gradient, and to the time of flow.",
        formula: "\\frac{Q}{t} = \\frac{kA(\\theta_1 - \\theta_2)}{d}",
        conditions:
          "Steady state: the temperature at each point does not change with time and the faces are kept at fixed temperatures.",
      },
      {
        name: "Stefan–Boltzmann Law",
        statement:
          "The total radiant energy emitted per unit area per unit time by a black body is directly proportional to the fourth power of its absolute temperature.",
        formula: "E = \\sigma T^4, \\quad E_{net} = \\sigma(T^4 - T_0^4)",
        conditions:
          "For a non-black body multiply by the emissivity e, giving E = e sigma T^4 with 0 < e <= 1.",
      },
      {
        name: "Wien's Displacement Law",
        statement:
          "The wavelength at which a black body emits maximum energy is inversely proportional to its absolute temperature.",
        formula: "\\lambda_{max} T = b = 2.9 \\times 10^{-3}",
        conditions:
          "Explains why a heated iron bar glows red first and then white as its temperature rises.",
      },
    ],
    speedFormulas: [
      {
        name: "Rods in Series and Parallel",
        formula:
          "\\text{series } \\frac{d_1 + d_2}{k} = \\frac{d_1}{k_1} + \\frac{d_2}{k_2}, \\quad \\text{parallel } k = \\frac{k_1 A_1 + k_2 A_2}{A_1 + A_2}",
        description:
          "Series rods carry the same heat current with a common junction temperature; parallel rods carry the same temperature difference.",
        unit: "W m^-1 K^-1",
      },
      {
        name: "Temperature Gradient and Junction Temperature",
        formula: "\\text{gradient} = -\\frac{d\\theta}{dx}, \\quad \\theta_{junction} = \\frac{k_1\\theta_1 d_2 + k_2\\theta_2 d_1}{k_1 d_2 + k_2 d_1}",
        description:
          "Heat flows from high to low temperature, so the gradient is negative in the direction of flow.",
        unit: "K m^-1",
      },
      {
        name: "Kirchhoff's Law of Radiation",
        formula: "\\text{emissivity} = \\text{absorptivity}",
        description:
          "A good absorber is a good emitter at the same temperature. This is why polished silver reflects and hardly radiates, while a black surface does both strongly.",
        unit: "dimensionless",
      },
      {
        name: "Solar Constant",
        formula: "S = \\frac{E \\cdot 4\\pi r^2}{4\\pi R^2}",
        description:
          "The radiant energy received per unit area per unit time at the mean distance of the Earth from the Sun.",
        unit: "W m^-2",
      },
    ],
    constantsAndValues: [
      { symbol: "k_{silver}", name: "Thermal conductivity of silver", value: "406", unit: "W m^-1 K^-1" },
      { symbol: "k_{copper}", name: "Thermal conductivity of copper", value: "385", unit: "W m^-1 K^-1" },
      { symbol: "k_{aluminium}", name: "Thermal conductivity of aluminium", value: "205", unit: "W m^-1 K^-1" },
      { symbol: "k_{steel}", name: "Thermal conductivity of steel", value: "50", unit: "W m^-1 K^-1" },
      { symbol: "k_{glass}", name: "Thermal conductivity of glass", value: "0.8", unit: "W m^-1 K^-1" },
      { symbol: "k_{water}", name: "Thermal conductivity of water", value: "0.6", unit: "W m^-1 K^-1" },
      { symbol: "k_{air}", name: "Thermal conductivity of air", value: "0.024", unit: "W m^-1 K^-1" },
      { symbol: "\\sigma", name: "Stefan's constant", value: "5.67 x 10^-8", unit: "W m^-2 K^-4" },
      { symbol: "b", name: "Wien's constant", value: "2.9 x 10^-3", unit: "m K" },
      { symbol: "S", name: "Solar constant", value: "1.4 x 10^3", unit: "W m^-2" },
    ],
    entranceTraps: [
      {
        trap: "A perfect black body absorbs all radiation but does not emit.",
        truth:
          "By Kirchhoff's law a perfect absorber is also a perfect emitter. A black body absorbs all incident radiation and, at a given temperature, radiates more strongly than any other surface.",
        examRef: "IOE/CEE — black body radiation",
      },
      {
        trap: "Thermal conductivity depends on the thickness of the slab.",
        truth:
          "k is a material property and does not depend on thickness or area. Thickness changes the rate of heat flow, not the conductivity.",
        examRef: "NEB — conduction",
      },
      {
        trap: "Woolen clothes produce heat and keep us warm.",
        truth:
          "They do not produce heat. Wool is a poor conductor and traps air, which reduces the rate at which the body loses heat, so we feel warm.",
        examRef: "NEB — applications of conduction",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A copper rod of length 0.5 m and cross-sectional area 2 x 10^-4 m^2 has its ends at 100 degrees C and 0 degrees C. Find the rate of heat flow. Take k = 385 W m^-1 K^-1.",
        given: "k = 385, A = 2 \\times 10^{-4} m^2, \\theta_1 - \\theta_2 = 100 K, d = 0.5 m",
        steps: [
          "Fourier's law: \\frac{Q}{t} = \\frac{kA(\\theta_1 - \\theta_2)}{d}",
          "Numerator: 385 \\times 2 \\times 10^{-4} \\times 100 = 7.7",
          "Divide by d: \\frac{7.7}{0.5} = 15.4",
        ],
        answer: "\\frac{Q}{t} = 15.4 \\text{ W}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Thermal Conductivity",
        definition:
          "The rate of heat flow per unit area per unit temperature gradient across the material, with the heat flowing perpendicular to the area.",
        significance:
          "Metals have a high k because free electrons carry energy quickly; gases have the lowest k, which is why air trapped in wool or double glazing insulates.",
      },
      {
        term: "Emissivity",
        definition:
          "The ratio of the radiant energy emitted by a surface to that emitted by a perfect black body at the same temperature.",
        significance:
          "Equal to the absorptivity by Kirchhoff's law, and always between 0 and 1.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Reflection at Curved Mirrors
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "reflection-at-curved-mirror",
      "mirror-formula",
      "concave-mirror",
      "convex-mirror",
      "magnification",
      "spherical-mirror",
      "principal-focus",
      "mirrors",
      "reflection",
    ],
    subject: "physics",
    title: "Reflection at Curved Mirrors — Mirror Formula & Magnification",
    // "optics" is a legacy pooled unit in the content manifests; it is claimed
    // by both this entry and the refraction entry, and keyword scoring decides.
    unitSlugs: ["reflection-at-curved-mirror", "optics"],
    category: "Ray Optics",
    governingLaws: [
      {
        name: "Laws of Reflection",
        statement:
          "The incident ray, the reflected ray and the normal at the point of incidence all lie in the same plane, and the angle of incidence equals the angle of reflection.",
        formula: "i = r",
        conditions:
          "Applies to every reflecting surface, plane or curved; for a curved mirror the normal is along the radius at the point of incidence.",
      },
      {
        name: "Mirror Formula",
        statement:
          "The reciprocal of the focal length of a spherical mirror equals the sum of the reciprocals of the object distance and the image distance.",
        formula: "\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}, \\quad f = \\frac{R}{2}",
        conditions:
          "Requires the paraxial approximation (rays close to the principal axis) and the Cartesian sign convention with distances measured from the pole.",
      },
    ],
    speedFormulas: [
      {
        name: "Linear Magnification",
        formula: "m = -\\frac{v}{u} = \\frac{h_i}{h_o} = \\frac{f}{f - u} = \\frac{f - v}{f}",
        description:
          "Negative m means a real inverted image; positive m means a virtual erect image.",
        unit: "dimensionless",
      },
      {
        name: "Areal Magnification",
        formula: "\\frac{A_i}{A_o} = m^2",
        description:
          "The area of the image is the object area multiplied by the square of the linear magnification.",
        unit: "dimensionless",
      },
      {
        name: "Cartesian Sign Convention",
        formula:
          "\\text{concave: } f < 0, \\quad \\text{convex: } f > 0; \\quad \\text{distances along } -x \\text{ are negative}",
        description:
          "All distances are measured from the pole, positive in the direction of the incident light. Getting this convention wrong is the single most common optics mistake.",
        unit: "m",
      },
      {
        name: "Magnification in Terms of Distances",
        formula: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f} \\implies v = \\frac{uf}{u - f}",
        description:
          "The rearranged mirror formula is faster in exam numericals than solving for 1/v when u and f are known.",
        unit: "m",
      },
    ],
    constantsAndValues: [
      { symbol: "f", name: "Focal length of a concave mirror of R = 20 cm", value: "10", unit: "cm" },
      { symbol: "f", name: "Focal length of a convex mirror of R = 20 cm", value: "-10 (virtual focus)", unit: "cm" },
      { symbol: "n_{air}", name: "Refractive index of air (reference)", value: "1.0003", unit: "dimensionless" },
    ],
    entranceTraps: [
      {
        trap: "A convex mirror can form a real image.",
        truth:
          "A convex mirror always forms a virtual, erect and diminished image, for every real object position. That is exactly why it is used as a rear-view and blind-corner mirror — it gives a wider field of view.",
        examRef: "NEB / IOE — image formation",
      },
      {
        trap: "A concave mirror always forms a magnified image.",
        truth:
          "Concave mirrors magnify only when the object is inside the focus. If the object is beyond the centre of curvature the image is real, inverted and diminished.",
        examRef: "IOE — sign convention",
      },
      {
        trap: "The focal length of a spherical mirror equals its radius of curvature.",
        truth:
          "The focal length is HALF the radius of curvature, f = R/2 for paraxial rays.",
        examRef: "CEE — mirror basics",
      },
    ],
    workedNumericals: [
      {
        problem:
          "An object is placed 15 cm in front of a concave mirror of focal length 10 cm. Find the position, nature and magnification of the image.",
        given: "u = -15 cm, f = -10 cm (both measured against the incident light)",
        steps: [
          "Mirror formula: \\frac{1}{v} = \\frac{1}{f} - \\frac{1}{u}",
          "\\frac{1}{v} = \\frac{1}{-10} - \\frac{1}{-15} = -0.1 + 0.0667",
          "\\frac{1}{v} = -0.0333 \\implies v = -30 cm",
          "Magnification: m = -\\frac{v}{u} = -\\frac{-30}{-15} = -2",
        ],
        answer: "v = -30 \\text{ cm: real, inverted, magnified } 2\\times",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Principal Focus",
        definition:
          "The point on the principal axis at which rays travelling parallel to the axis converge after reflection (concave) or from which they appear to diverge (convex).",
        significance:
          "Fixes the focal length, and through the mirror formula the whole image-forming behaviour of the mirror.",
      },
      {
        term: "Linear Magnification",
        definition:
          "The ratio of the height of the image to the height of the object, equal to the negative ratio of the image distance to the object distance.",
        significance:
          "Its sign tells you whether the image is erect or inverted, and its magnitude tells you whether it is enlarged or diminished.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Refraction at Plane Surfaces
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "refraction-at-plane-surfaces",
      "refraction",
      "snell",
      "critical-angle",
      "total-internal-reflection",
      "refractive-index",
      "apparent-depth",
      "lateral-shift",
    ],
    subject: "physics",
    title: "Refraction at Plane Surfaces & Total Internal Reflection",
    unitSlugs: ["refraction-at-plane-surfaces", "optics"],
    category: "Ray Optics",
    governingLaws: [
      {
        name: "Snell's Law of Refraction",
        statement:
          "For a given pair of media and a given colour of light, the sine of the angle of incidence bears a constant ratio to the sine of the angle of refraction.",
        formula: "\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1} = \\frac{v_1}{v_2}",
        conditions:
          "The ratio depends on the wavelength of light and on the pair of media, and is reciprocal for the reverse path.",
      },
      {
        name: "Condition for Total Internal Reflection",
        statement:
          "When light travels from a denser to a rarer medium and the angle of incidence exceeds the critical angle, the entire light is reflected back into the denser medium.",
        formula: "\\sin C = \\frac{1}{n} = \\frac{n_{rarer}}{n_{denser}}",
        conditions:
          "Both conditions must hold: light must go from denser to rarer, and the angle of incidence must exceed the critical angle.",
      },
    ],
    speedFormulas: [
      {
        name: "Refractive Index in Several Forms",
        formula: "n = \\frac{c}{v} = \\frac{\\text{real depth}}{\\text{apparent depth}} = \\frac{1}{\\sin C} = \\frac{\\lambda_{air}}{\\lambda_{medium}}",
        description:
          'The real-depth form is the fastest route in "coin in a beaker" and "fish in a pond" numericals.',
        unit: "dimensionless",
      },
      {
        name: "Apparent Depth",
        formula: "d_{apparent} = \\frac{d_{real}}{n}",
        description:
          "A pool looks shallower than it really is; an object under water appears raised by d_real minus d_apparent.",
        unit: "m",
      },
      {
        name: "Lateral Shift of a Slab",
        formula: "\\text{shift} = \\frac{t\\sin(i - r)}{\\cos r}",
        description:
          "A ray passing through a parallel-sided glass slab emerges parallel to itself but displaced sideways by this amount.",
        unit: "m",
      },
      {
        name: "Critical Angles of Common Media",
        formula: "C = \\sin^{-1}\\left(\\frac{1}{n}\\right)",
        description:
          "Water 48.8 degrees, ordinary glass 41.1 degrees and diamond 24.4 degrees. Diamond's small critical angle is why it sparkles.",
        unit: "degrees",
      },
    ],
    constantsAndValues: [
      { symbol: "n_{water}", name: "Refractive index of water", value: "1.33", unit: "dimensionless" },
      { symbol: "n_{glass}", name: "Refractive index of crown glass", value: "1.50", unit: "dimensionless" },
      { symbol: "n_{diamond}", name: "Refractive index of diamond", value: "2.42", unit: "dimensionless" },
      { symbol: "C_{water}", name: "Critical angle for water-air", value: "48.8", unit: "degrees" },
      { symbol: "C_{glass}", name: "Critical angle for glass-air", value: "41.1", unit: "degrees" },
      { symbol: "C_{diamond}", name: "Critical angle for diamond-air", value: "24.4", unit: "degrees" },
    ],
    entranceTraps: [
      {
        trap: "Total internal reflection can occur for any angle of incidence.",
        truth:
          "It requires light travelling from denser to rarer AND an angle of incidence greater than the critical angle. Going from rarer to denser, no critical angle exists at all.",
        examRef: "IOE/CEE — TIR conditions",
      },
      {
        trap: "A pool looks deeper than it is because light bends.",
        truth:
          "It looks SHALLOWER: apparent depth equals real depth divided by the refractive index, so a 12 cm deep pool of water appears only about 9 cm deep.",
        examRef: "NEB — apparent depth",
      },
      {
        trap: "The refractive index of a medium is the same for all colours.",
        truth:
          "n varies with wavelength — violet has the largest n, red the smallest. This dispersion is what separates white light in a prism or a rainbow.",
        examRef: "IOE — dispersion",
      },
    ],
    workedNumericals: [
      {
        problem:
          "The real depth of water in a tank is 12 cm. Find the apparent depth as seen from directly above. Take n = 1.33.",
        given: "d_{real} = 12 cm, n = 1.33",
        steps: [
          "Use n = \\frac{\\text{real depth}}{\\text{apparent depth}}",
          "d_{apparent} = \\frac{12}{1.33}",
          "d_{apparent} = 9.02 cm",
        ],
        answer: "d_{apparent} \\approx 9 \\text{ cm}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Critical Angle",
        definition:
          "The angle of incidence in the denser medium for which the angle of refraction in the rarer medium is exactly 90 degrees.",
        significance:
          "Determines whether total internal reflection occurs; the basis of optical fibres, mirages and endoscopes.",
      },
      {
        term: "Total Internal Reflection",
        definition:
          "The complete reflection of light back into a denser medium when the angle of incidence exceeds the critical angle, with no refracted ray at all.",
        significance:
          "Makes optical fibre communication possible, since light can travel along a fibre with almost no loss.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Refraction through Prisms (+ dispersion)
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "refraction-through-prisms",
      "dispersion",
      "prism",
      "minimum-deviation",
      "angle-of-prism",
      "angular-dispersion",
      "dispersive-power",
      "rainbow",
      "cauchy",
    ],
    subject: "physics",
    title: "Refraction through Prisms & Dispersion of Light",
    unitSlugs: ["refraction-through-prisms", "dispersion"],
    category: "Ray Optics",
    governingLaws: [
      {
        name: "Prism Formula (Angle Relations)",
        statement:
          "For a ray passing through a prism, the angle of the prism equals the sum of the two internal refraction angles, and the deviation equals the sum of the external angles minus the angle of the prism.",
        formula: "A = r_1 + r_2, \\quad \\delta = i + e - A",
        conditions:
          "Valid for a ray that actually passes through the prism and emerges from the second face.",
      },
      {
        name: "Minimum Deviation Condition",
        statement:
          "The deviation produced by a prism is minimum when the ray passes symmetrically through it, so that the angle of incidence equals the angle of emergence.",
        formula:
          "i = e, \\; r_1 = r_2 = \\frac{A}{2}, \\quad n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}",
        conditions:
          "Also the position of grazing incidence defines the maximum deviation; between these limits every deviation in between is possible twice.",
      },
      {
        name: "Cauchy's Dispersion Relation",
        statement:
          "The refractive index of a transparent medium decreases as the wavelength of light increases.",
        formula: "n = A + \\frac{B}{\\lambda^2}",
        conditions:
          "Hence violet light (short wavelength) bends most and red least, producing a spectrum with red at the top and violet at the base of the prism.",
      },
    ],
    speedFormulas: [
      {
        name: "Thin Prism Deviation",
        formula: "\\delta = (n - 1)A",
        description:
          "For a small angled prism the deviation is independent of the angle of incidence. This is the standard form for lens and prism numericals.",
        unit: "radians or degrees",
      },
      {
        name: "Angular Dispersion",
        formula: "\\theta = \\delta_v - \\delta_r = (n_v - n_r)A",
        description:
          "The angle between the violet and red rays after passing through the prism.",
        unit: "degrees",
      },
      {
        name: "Dispersive Power",
        formula: "\\omega = \\frac{n_v - n_r}{n_y - 1}",
        description:
          "A pure number that measures the ability of a material to disperse light. Crown glass is about 0.02, flint glass about 0.04.",
        unit: "dimensionless",
      },
      {
        name: "Achromatic Combination of Two Prisms",
        formula: "\\omega_1 A_1 + \\omega_2 A_2 = 0 \\implies \\frac{A_1}{A_2} = -\\frac{\\omega_2}{\\omega_1}",
        description:
          "Two prisms of opposite orientation and matching relative dispersion produce deviation without dispersion.",
        unit: "degrees",
      },
    ],
    constantsAndValues: [
      { symbol: "n_{crown}", name: "Refractive index of crown glass (yellow)", value: "1.52", unit: "dimensionless" },
      { symbol: "n_{flint}", name: "Refractive index of flint glass (yellow)", value: "1.62", unit: "dimensionless" },
      { symbol: "\\omega_{crown}", name: "Dispersive power of crown glass", value: "0.015 - 0.02", unit: "dimensionless" },
      { symbol: "\\omega_{flint}", name: "Dispersive power of flint glass", value: "0.03 - 0.05", unit: "dimensionless" },
      { symbol: "\\delta_m", name: "Minimum deviation, glass prism with A = 60 deg", value: "about 37.2", unit: "degrees" },
    ],
    entranceTraps: [
      {
        trap: "At minimum deviation the prism produces no deviation.",
        truth:
          "At minimum deviation the deviation is the SMALLEST possible but is not zero — about 37 degrees for a 60 degree glass prism. The ray simply passes symmetrically.",
        examRef: "NEB / IOE — prism numericals",
      },
      {
        trap: "Dispersion happens because different colours travel at different speeds in vacuum.",
        truth:
          "In vacuum all colours travel at the same speed c. Dispersion happens because the refractive index, and therefore the speed inside the medium, differs with wavelength.",
        examRef: "IOE — dispersion",
      },
      {
        trap: "In a primary rainbow the violet band is on the outside.",
        truth:
          "In a primary rainbow red is on the OUTSIDE and violet on the inside. A primary rainbow is formed by two refractions and one internal reflection; the secondary rainbow reverses the order and is fainter.",
        examRef: "CEE — rainbow",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A prism of angle 60 degrees produces a minimum deviation of 37.2 degrees. Find the refractive index of the material.",
        given: "A = 60\\text{ deg}, \\delta_m = 37.2\\text{ deg}",
        steps: [
          "Use n = \\frac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin(A/2)}",
          "\\frac{A + \\delta_m}{2} = \\frac{60 + 37.2}{2} = 48.6\\text{ deg}",
          "n = \\frac{\\sin 48.6\\text{ deg}}{\\sin 30\\text{ deg}} = \\frac{0.750}{0.500}",
        ],
        answer: "n = 1.50",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Angle of Minimum Deviation",
        definition:
          "The smallest angle through which a ray is deviated on passing through a prism, occurring when the ray passes symmetrically with i = e.",
        significance:
          "Because it can be measured precisely in a spectrometer, it is the standard laboratory method for finding the refractive index of a transparent material.",
      },
      {
        term: "Dispersive Power",
        definition:
          "The ratio of the difference in refractive indices for violet and red light to the refractive index for the mean (yellow) colour minus one.",
        significance:
          "Determines how strongly a material spreads light into a spectrum — flint glass is preferred for prisms used to disperse light.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Lenses
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "lenses",
      "lens-formula",
      "lens-maker",
      "power-of-lens",
      "focal-length",
      "combination-of-lenses",
      "magnification-lens",
    ],
    subject: "physics",
    title: "Lenses — Lens Formula, Lens Maker's Formula & Power",
    unitSlugs: ["lenses"],
    category: "Ray Optics",
    governingLaws: [
      {
        name: "Thin Lens Formula",
        statement:
          "For a thin lens the reciprocal of the focal length equals the difference between the reciprocals of the image and object distances.",
        formula: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}",
        conditions:
          "Uses the Cartesian sign convention with distances measured from the optical centre; valid for paraxial rays and a thin lens.",
      },
      {
        name: "Lens Maker's Formula",
        statement:
          "The focal length of a lens depends on the refractive index of its material relative to the surrounding medium and on the radii of curvature of its two surfaces.",
        formula: "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        conditions:
          "For a lens in air. For a lens in a medium of refractive index n_m, replace (n - 1) with (n/n_m - 1).",
      },
    ],
    speedFormulas: [
      {
        name: "Power of a Lens",
        formula: "P = \\frac{1}{f(\\text{in metres})}",
        description:
          "The unit is the dioptre. A convex lens has positive power, a concave lens negative. A short focal length means a high power.",
        unit: "D (dioptre)",
      },
      {
        name: "Magnification by a Lens",
        formula: "m = \\frac{v}{u} = \\frac{h_i}{h_o} = \\frac{f}{f + u} = \\frac{f - v}{f}",
        description:
          "Positive m gives an erect image, negative m an inverted image.",
        unit: "dimensionless",
      },
      {
        name: "Lenses in Contact",
        formula: "\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} \\implies P = P_1 + P_2",
        description:
          "Powers add algebraically when the lenses touch. For lenses separated by a distance d: 1/F = 1/f1 + 1/f2 - d/(f1 f2).",
        unit: "D",
      },
      {
        name: "Lens in a Medium",
        formula: "\\frac{1}{f'} = \\left(\\frac{n}{n_m} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
        description:
          "A glass lens in water becomes a weaker converging lens; an air bubble inside water behaves as a diverging lens.",
        unit: "m^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "n_{glass}", name: "Refractive index of crown glass", value: "1.5", unit: "dimensionless" },
      { symbol: "n_{water}", name: "Refractive index of water", value: "1.33", unit: "dimensionless" },
      { symbol: "D_{near}", name: "Near point of a normal human eye", value: "25", unit: "cm" },
      { symbol: "D_{far}", name: "Far point of a normal human eye", value: "infinity", unit: "cm" },
      { symbol: "P_{eye}", name: "Total power of a normal human eye lens", value: "about 60", unit: "D" },
    ],
    entranceTraps: [
      {
        trap: "The focal length of a lens is the same in every medium.",
        truth:
          "Focal length depends on (n_lens/n_medium - 1). A glass lens in water has a much longer focal length — roughly four times that in air for crown glass.",
        examRef: "IOE/CEE — lens in a medium",
      },
      {
        trap: "An air bubble inside water acts as a converging lens.",
        truth:
          "The bubble is rarer than its surroundings, so rays diverge and it behaves as a DIVERGING lens. The focal length formula makes the sign flip.",
        examRef: "IOE — lens maker's formula",
      },
      {
        trap: "Two lenses in contact always shorten the combined focal length.",
        truth:
          "Powers add algebraically. A converging lens of +5 D combined with a diverging lens of -2 D gives +3 D, a WEAKER converging lens than the +5 D alone.",
        examRef: "NEB — combination of lenses",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A convex lens of power +5 D is placed in contact with a concave lens of power -2 D. Find the power and focal length of the combination.",
        given: "P_1 = +5 D, P_2 = -2 D (in contact)",
        steps: [
          "Powers add for lenses in contact: P = P_1 + P_2",
          "P = 5 + (-2) = 3 D",
          "Focal length: f = \\frac{1}{P} = \\frac{1}{3} m",
        ],
        answer: "P = 3 \\text{ D}, \\quad f = 33.3 \\text{ cm (converging)}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Power of a Lens",
        definition:
          "The reciprocal of the focal length of a lens expressed in metres, measured in dioptres, with a positive sign for a converging lens.",
        significance:
          "Opticians prescribe spectacle lenses in dioptres, so the sign of the power directly tells you whether a person is short or long sighted.",
      },
      {
        term: "Lens Maker's Formula",
        definition:
          "The relation giving the focal length of a lens in terms of the refractive index of its material and the radii of curvature of its two surfaces.",
        significance:
          "The design equation for every lens: it shows how grinding different curvatures changes the power of the finished lens.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Electric Charges, Field & Potential
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "electric-charges",
      "electric-field",
      "coulomb",
      "gauss",
      "electric-flux",
      "dipole",
      "field-intensity",
    ],
    subject: "physics",
    title: "Electric Charges, Coulomb's Law & Electric Field",
    unitSlugs: [
      "electric-charges",
      "electric-field",
      "potential-potential-difference-and-potential-energy",
    ],
    category: "Electricity & Magnetism",
    governingLaws: [
      {
        name: "Coulomb's Law",
        statement:
          "The electrostatic force between two point charges is directly proportional to the product of the charges and inversely proportional to the square of the distance between them, acting along the line joining them.",
        formula: "F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2} = k\\frac{q_1 q_2}{r^2}",
        conditions:
          "For point charges at rest in vacuum. In a medium, divide by the dielectric constant K. The inverse-square law fails inside extended charged bodies.",
      },
      {
        name: "Gauss's Law",
        statement:
          "The total electric flux through any closed surface equals 1/eps_0 times the net charge enclosed by that surface.",
        formula: "\\phi = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{enclosed}}{\\varepsilon_0}",
        conditions:
          "Always true, but only useful for computing E when the charge distribution has enough symmetry (spherical, cylindrical or planar).",
      },
    ],
    speedFormulas: [
      {
        name: "Field of Standard Charge Distributions",
        formula:
          "\\text{point: } E = \\frac{kq}{r^2}, \\quad \\text{line: } E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}, \\quad \\text{sheet: } E = \\frac{\\sigma}{2\\varepsilon_0}, \\quad \\text{shell (inside): } E = 0",
        description:
          "The sheet result is independent of distance, and the field inside a uniformly charged shell or a conductor is exactly zero.",
        unit: "N C^-1 or V m^-1",
      },
      {
        name: "Electric Dipole Field and Torque",
        formula:
          "p = q(2a), \\quad E_{axial} = \\frac{2kp}{r^3}, \\quad E_{equatorial} = \\frac{kp}{r^3}, \\quad \\tau = pE\\sin\\theta",
        description:
          "The axial field is exactly twice the equatorial field at the same distance. Net force on a dipole in a uniform field is zero, but the torque is not.",
        unit: "N C^-1 and N m",
      },
      {
        name: "Relation between Field and Potential",
        formula: "E = -\\frac{dV}{dr}, \\quad V = \\frac{kq}{r}, \\quad W = q(V_B - V_A)",
        description:
          "The field points in the direction of decreasing potential. A zero potential does not imply a zero field, and vice versa.",
        unit: "V m^-1 and V",
      },
      {
        name: "Electric Field due to a Charged Conductor",
        formula: "E = \\frac{\\sigma}{\\varepsilon_0} \\text{ (just outside)}, \\quad E = 0 \\text{ (inside)}",
        description:
          "All the charge resides on the outer surface, which is why a car or a metal cage protects its occupants during lightning.",
        unit: "N C^-1",
      },
    ],
    constantsAndValues: [
      { symbol: "k", name: "Coulomb constant", value: "9 x 10^9", unit: "N m^2 C^-2" },
      { symbol: "\\varepsilon_0", name: "Permittivity of free space", value: "8.85 x 10^-12", unit: "C^2 N^-1 m^-2" },
      { symbol: "e", name: "Elementary charge", value: "1.6 x 10^-19", unit: "C" },
      { symbol: "K_{water}", name: "Dielectric constant of water", value: "80", unit: "dimensionless" },
      { symbol: "K_{air}", name: "Dielectric constant of air", value: "1.0006", unit: "dimensionless" },
      { symbol: "E_{breakdown,air}", name: "Dielectric strength of air", value: "3 x 10^6", unit: "V m^-1" },
    ],
    entranceTraps: [
      {
        trap: "The electric field inside a charged conductor is large.",
        truth:
          "It is exactly ZERO in electrostatic equilibrium — free electrons redistribute until the interior field cancels. That is the principle of electrostatic shielding.",
        examRef: "IOE/CEE — conductors",
      },
      {
        trap: "Where the potential is zero the electric field must also be zero.",
        truth:
          "The two are independent. At the midpoint between two equal positive charges V is not zero but E is zero; at the midpoint of an equal positive and negative pair V is zero while E is not.",
        examRef: "IOE — field and potential",
      },
      {
        trap: "Gauss's law fails for unsymmetrical charge distributions.",
        truth:
          "Gauss's law is always valid. What fails for unsymmetrical distributions is only its USE as a shortcut to compute E, because E then varies in magnitude and direction over the surface.",
        examRef: "NEB — Gauss's law",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Two charges of 1 x 10^-6 C each are placed 1 m apart in air. Find the force between them and the field at the midpoint.",
        given: "q_1 = q_2 = 1 \\times 10^{-6} C, r = 1 m, k = 9 \\times 10^9",
        steps: [
          "Force: F = k\\frac{q_1 q_2}{r^2} = 9 \\times 10^9 \\times \\frac{10^{-12}}{1}",
          "F = 9 \\times 10^{-3} N \\quad \\text{(repulsive)}",
          "At the midpoint the two fields are equal (kq/(0.5)^2 each) and opposite",
          "E_{net} = 0 \\text{ at the midpoint, though } V = 2\\times\\frac{kq}{0.5} \\neq 0",
        ],
        answer: "F = 9 \\times 10^{-3} \\text{ N}, \\quad E_{midpoint} = 0",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Electric Flux",
        definition:
          "The number of electric field lines crossing a surface, formally the surface integral of the field over that area.",
        significance:
          "It is a scalar, and by Gauss's law it depends only on the net enclosed charge — not on the shape of the surface or the arrangement of outside charges.",
      },
      {
        term: "Electric Dipole",
        definition:
          "A pair of equal and opposite point charges separated by a small distance, characterised by the dipole moment p = q times the separation, directed from the negative to the positive charge.",
        significance:
          "Explains the behaviour of dielectric materials in a field and the polarity of molecules such as water.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Capacitor
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "capacitor",
      "capacitance",
      "dielectric",
      "parallel-plate",
      "energy-stored",
      "series-parallel",
    ],
    subject: "physics",
    title: "Capacitor — Capacitance, Dielectrics & Combinations",
    unitSlugs: ["capacitor"],
    category: "Electricity & Magnetism",
    governingLaws: [
      {
        name: "Definition of Capacitance",
        statement:
          "The capacitance of a conductor is the ratio of the charge on it to its potential, a measure of how much charge it can hold per unit potential rise.",
        formula: "C = \\frac{Q}{V}",
        conditions:
          "Capacitance is a purely geometric property — it does not change when the charge or the potential changes, only when the shape or the medium changes.",
      },
      {
        name: "Parallel Plate Capacitor with a Dielectric",
        statement:
          "For a parallel plate capacitor the capacitance is directly proportional to the plate area and to the dielectric constant of the medium, and inversely proportional to the plate separation.",
        formula: "C = \\frac{K\\varepsilon_0 A}{d}",
        conditions:
          "Assumes the plate separation is much smaller than the plate dimensions so that edge effects can be neglected.",
      },
    ],
    speedFormulas: [
      {
        name: "Combinations of Capacitors",
        formula:
          "\\text{series } \\frac{1}{C_s} = \\sum \\frac{1}{C_i}, \\quad \\text{parallel } C_p = \\sum C_i",
        description:
          "Note this is the OPPOSITE of resistors: capacitors in parallel add directly. Series capacitors all carry the same charge; parallel capacitors all have the same potential difference.",
        unit: "F",
      },
      {
        name: "Energy Stored in a Capacitor",
        formula: "U = \\frac{1}{2}CV^2 = \\frac{1}{2}QV = \\frac{Q^2}{2C}",
        description:
          "Half the energy supplied by the battery is stored and half is lost as heat in the charging circuit, whatever the resistance.",
        unit: "J",
      },
      {
        name: "Energy Density of an Electric Field",
        formula: "u = \\frac{1}{2}\\varepsilon_0 E^2",
        description:
          "The energy stored per unit volume in the field between the plates; independent of the plate dimensions.",
        unit: "J m^-3",
      },
      {
        name: "Effect of a Dielectric",
        formula:
          "Q \\text{ constant: } C' = KC, \\quad V' = V/K, \\quad U' = U/K",
        description:
          "An isolated charged capacitor loses potential difference and stored energy when a dielectric is inserted, while the charge stays the same.",
        unit: "F, V, J",
      },
    ],
    constantsAndValues: [
      { symbol: "\\varepsilon_0", name: "Permittivity of free space", value: "8.85 x 10^-12", unit: "F m^-1" },
      { symbol: "K_{water}", name: "Dielectric constant of water", value: "80", unit: "dimensionless" },
      { symbol: "K_{mica}", name: "Dielectric constant of mica", value: "6 - 8", unit: "dimensionless" },
      { symbol: "K_{paper}", name: "Dielectric constant of paper", value: "3 - 4", unit: "dimensionless" },
      { symbol: "E_{air}", name: "Dielectric strength of air", value: "3 x 10^6", unit: "V m^-1" },
    ],
    entranceTraps: [
      {
        trap: "Capacitance depends on the charge stored on the plates.",
        truth:
          "Capacitance depends only on the geometry and the medium. Doubling the charge doubles the potential difference, keeping Q/V unchanged.",
        examRef: "NEB / IOE — capacitance",
      },
      {
        trap: "Inserting a dielectric always decreases the capacitance.",
        truth:
          "It INCREASES it by the factor K. If the capacitor stays connected to the battery, the charge increases; if it is isolated, the potential difference falls.",
        examRef: "IOE — dielectrics",
      },
      {
        trap: "A capacitor allows DC current to flow continuously.",
        truth:
          "A capacitor blocks steady DC; it only conducts while charging or discharging. Its reactance falls with frequency, which is why it passes AC and blocks DC.",
        examRef: "CEE — capacitor in circuits",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A 2 microfarad capacitor is charged to 100 V. Find the charge stored and the energy stored.",
        given: "C = 2 \\times 10^{-6} F, V = 100 V",
        steps: [
          "Charge: Q = CV = 2 \\times 10^{-6} \\times 100 = 2 \\times 10^{-4} C",
          "Energy: U = \\frac{1}{2}CV^2 = \\frac{1}{2} \\times 2 \\times 10^{-6} \\times (100)^2",
          "U = 1 \\times 10^{-2} J",
        ],
        answer: "Q = 200\\ \\mu C, \\quad U = 0.01 \\text{ J}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Dielectric Constant (Relative Permittivity)",
        definition:
          "The ratio of the capacitance of a capacitor with the dielectric filling the space between its plates to the capacitance of the same capacitor in vacuum.",
        significance:
          "Quantifies how strongly a material polarises and weakens the field, letting capacitors store more charge for the same voltage.",
      },
      {
        term: "Capacitance",
        definition:
          "The charge required to raise the potential of a conductor by one unit, measured in farads.",
        significance:
          "Governs how long a capacitor can supply a current, and therefore the timing in filters, flash circuits and oscillators.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — DC Circuits / Current Electricity
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "dc-circuits",
      "current-electricity",
      "ohms-law",
      "kirchhoff",
      "wheatstone",
      "potentiometer",
      "drift-velocity",
      "resistivity",
      "emf",
    ],
    subject: "physics",
    title: "DC Circuits — Ohm's Law, Kirchhoff's Laws & Measuring Bridges",
    unitSlugs: ["dc-circuits"],
    category: "Electricity & Magnetism",
    governingLaws: [
      {
        name: "Ohm's Law",
        statement:
          "At constant temperature, the current through a conductor is directly proportional to the potential difference across its ends.",
        formula: "V = IR, \\quad R = \\frac{\\rho l}{A}",
        conditions:
          "Valid only for ohmic conductors at constant temperature. Semiconductors, diodes, filament lamps and electrolytes are non-ohmic.",
      },
      {
        name: "Kirchhoff's Laws",
        statement:
          "Junction rule: the algebraic sum of the currents meeting at a junction is zero (conservation of charge). Loop rule: the algebraic sum of the changes in potential around any closed loop is zero (conservation of energy).",
        formula: "\\sum I = 0, \\quad \\sum \\varepsilon = \\sum IR",
        conditions:
          "Junction rule follows from conservation of CHARGE, loop rule from conservation of ENERGY — a classic exam confusion.",
      },
      {
        name: "Wheatstone Bridge Balance Condition",
        statement:
          "A Wheatstone bridge is balanced when the galvanometer shows no deflection, which happens when the ratio of the resistances in the two arms is equal.",
        formula: "\\frac{P}{Q} = \\frac{R}{S}",
        conditions:
          "At balance the bridge is independent of the resistance of the galvanometer and of the emf of the cell, which is what makes it accurate.",
      },
    ],
    speedFormulas: [
      {
        name: "Cells, emf and Internal Resistance",
        formula: "I = \\frac{\\varepsilon}{R + r}, \\quad V_{terminal} = \\varepsilon - Ir",
        description:
          "The terminal potential difference is less than the emf while discharging and greater than the emf while being charged. Maximum power is delivered when R = r.",
        unit: "A and V",
      },
      {
        name: "Drift Velocity and Current",
        formula: "I = nAev_d, \\quad v_d = \\frac{eE\\tau}{m}",
        description:
          "The drift velocity is only of the order of a fraction of a millimetre per second, yet the current appears instantly because the field is established at nearly the speed of light.",
        unit: "m s^-1",
      },
      {
        name: "Resistivity and Temperature",
        formula: "\\rho = \\frac{m}{ne^2\\tau}, \\quad R = R_0(1 + \\alpha\\Delta T)",
        description:
          "Metals have a positive temperature coefficient of resistance; semiconductors, electrolytes and thermistors have a negative one.",
        unit: "ohm m and K^-1",
      },
      {
        name: "Series and Parallel Resistors",
        formula: "R_s = R_1 + R_2, \\quad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}",
        description:
          "Series resistors carry the same current; parallel resistors have the same potential difference. The parallel combination is always smaller than the smallest resistor.",
        unit: "ohm",
      },
      {
        name: "Potentiometer Principle",
        formula: "\\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{l_1}{l_2}",
        description:
          "The balancing length is directly proportional to the emf, which is why a potentiometer measures emf without drawing current from the cell.",
        unit: "m",
      },
    ],
    constantsAndValues: [
      { symbol: "\\rho_{copper}", name: "Resistivity of copper", value: "1.7 x 10^-8", unit: "ohm m" },
      { symbol: "\\rho_{nichrome}", name: "Resistivity of nichrome", value: "1.1 x 10^-6", unit: "ohm m" },
      { symbol: "\\alpha_{copper}", name: "Temperature coefficient of copper", value: "4 x 10^-3", unit: "K^-1" },
      { symbol: "n_{copper}", name: "Free electron density of copper", value: "8.5 x 10^28", unit: "m^-3" },
      { symbol: "e", name: "Elementary charge", value: "1.6 x 10^-19", unit: "C" },
      { symbol: "m_e", name: "Mass of an electron", value: "9.1 x 10^-31", unit: "kg" },
    ],
    entranceTraps: [
      {
        trap: "Kirchhoff's junction rule is a statement of conservation of energy.",
        truth:
          "The JUNCTION rule follows from conservation of CHARGE — charge does not pile up at a junction. It is the LOOP rule that follows from conservation of energy.",
        examRef: "NEB / IOE — Kirchhoff's laws",
      },
      {
        trap: "Terminal potential difference always equals the emf of the cell.",
        truth:
          "They are equal only on open circuit (I = 0). Under load, V = emf minus Ir, so the terminal voltage is always less while discharging.",
        examRef: "IOE — cells",
      },
      {
        trap: "Electrons travel from the battery to the bulb at nearly the speed of light.",
        truth:
          "The drift velocity of electrons is only about 10^-4 m/s. What travels quickly is the electric field and hence the signal, not the electrons themselves.",
        examRef: "CEE — drift velocity",
      },
      {
        trap: "A balanced Wheatstone bridge draws no current at all.",
        truth:
          "Only the GALVANOMETER draws no current at balance. The main current continues to flow through all four arms of the bridge.",
        examRef: "NEB — Wheatstone bridge",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A cell of emf 2 V and internal resistance 0.5 ohm is connected to an external resistance of 1.5 ohm. Find the current and the terminal potential difference.",
        given: "\\varepsilon = 2 V, r = 0.5 \\Omega, R = 1.5 \\Omega",
        steps: [
          "Current: I = \\frac{\\varepsilon}{R + r} = \\frac{2}{1.5 + 0.5}",
          "I = 1 A",
          "Terminal potential difference: V = \\varepsilon - Ir = 2 - 1\\times 0.5",
          "V = 1.5 V",
        ],
        answer: "I = 1 A, \\quad V = 1.5 V",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Electromotive Force (emf)",
        definition:
          "The work done by the source in carrying a unit positive charge once round the complete circuit, measured in volts.",
        significance:
          "It is a property of the source, not of the circuit — that is why it is unchanged when the external resistance is varied.",
      },
      {
        term: "Drift Velocity",
        definition:
          "The average velocity acquired by the free electrons of a conductor in the direction opposite to the applied electric field.",
        significance:
          "The microscopic origin of Ohm's law: current I = nAe times drift velocity, which links the circuit to electron behaviour.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Solids (semiconductors, energy bands)
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "solids",
      "energy-band",
      "semiconductor",
      "intrinsic",
      "extrinsic",
      "doping",
      "p-n-junction",
      "diode",
    ],
    subject: "physics",
    title: "Solids — Energy Bands & Semiconductors",
    unitSlugs: ["solids"],
    category: "Modern Physics & Electronics",
    governingLaws: [
      {
        name: "Band Theory Classification of Solids",
        statement:
          "Solids are classified by the energy gap between the valence band and the conduction band: metals have overlapping bands, insulators a gap above about 3 eV, and semiconductors a small gap of roughly 1 eV.",
        formula:
          "E_g(\\text{Ge}) \\approx 0.7\\ eV, \\quad E_g(\\text{Si}) \\approx 1.1\\ eV, \\quad E_g(\\text{diamond}) \\approx 6\\ eV",
        conditions:
          "The size of the forbidden gap compared with kT at room temperature decides whether the solid conducts.",
      },
      {
        name: "Intrinsic vs Extrinsic Conduction",
        statement:
          "A pure semiconductor conducts by thermally generated electron–hole pairs, whereas a doped semiconductor conducts mainly through the impurity carriers it contributes.",
        formula: "n_i^2 = n_e n_h \\quad \\text{(mass action law)}",
        conditions:
          "Adding a pentavalent donor gives n-type material with electrons as majority carriers; a trivalent acceptor gives p-type material with holes as majority carriers.",
      },
    ],
    speedFormulas: [
      {
        name: "Conductivity of a Semiconductor",
        formula: "\\sigma = e(n_e\\mu_e + n_h\\mu_h)",
        description:
          "Both electrons and holes contribute to conduction, unlike in a metal where only electrons do.",
        unit: "S m^-1",
      },
      {
        name: "Effect of Temperature",
        formula:
          "n_i \\propto T^{3/2} e^{-E_g/2kT}, \\quad \\text{so } R \\text{ decreases as } T \\text{ rises}",
        description:
          "Semiconductors have a NEGATIVE temperature coefficient of resistance, exactly opposite to metals.",
        unit: "dimensionless",
      },
      {
        name: "Forward and Reverse Bias of a Diode",
        formula: "I = I_0\\left(e^{eV/kT} - 1\\right)",
        description:
          "Forward bias narrows the depletion layer and current rises steeply; reverse bias widens it and only a tiny leakage current flows.",
        unit: "A",
      },
    ],
    constantsAndValues: [
      { symbol: "E_{g,Ge}", name: "Energy gap of germanium", value: "0.72", unit: "eV" },
      { symbol: "E_{g,Si}", name: "Energy gap of silicon", value: "1.1", unit: "eV" },
      { symbol: "E_{g,diamond}", name: "Energy gap of diamond (insulator)", value: "6", unit: "eV" },
      { symbol: "kT", name: "Thermal energy at room temperature", value: "0.026", unit: "eV" },
      { symbol: "\\mu_e/\\mu_h", name: "Mobility ratio in silicon", value: "about 3", unit: "dimensionless" },
    ],
    entranceTraps: [
      {
        trap: "Doping makes a semiconductor charged, giving it a net charge.",
        truth:
          "Doped semiconductors remain electrically NEUTRAL overall. The impurity contributes a carrier plus a fixed ion of opposite charge, so the net charge stays zero.",
        examRef: "IOE/CEE — semiconductors",
      },
      {
        trap: "In a p-type semiconductor the majority carriers are protons.",
        truth:
          "The majority carriers are HOLES — the absence of an electron in a covalent bond, which behaves as a positive charge carrier. There are no free protons involved.",
        examRef: "NEB — extrinsic semiconductors",
      },
      {
        trap: "A semiconductor's resistance increases with temperature, like a metal.",
        truth:
          "It DECREASES. Heating frees far more electron-hole pairs, so the carrier concentration rises faster than the mobility falls. That is the negative temperature coefficient.",
        examRef: "IOE — temperature dependence",
      },
    ],
    workedNumericals: [
      {
        problem:
          "The energy gap of silicon is 1.1 eV. Find the wavelength of light that can just create an electron-hole pair, and compare it with the thermal energy at 300 K.",
        given: "E_g = 1.1 eV = 1.1 \\times 1.6 \\times 10^{-19} J, h = 6.63 \\times 10^{-34} J s, c = 3 \\times 10^8 m s^{-1}",
        steps: [
          "Photon energy must equal the gap: E_g = \\frac{hc}{\\lambda}",
          "\\lambda = \\frac{hc}{E_g} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{1.76 \\times 10^{-19}}",
          "\\lambda = 1.13 \\times 10^{-6} m = 1130 nm",
          "Thermal energy at 300 K is only kT = 0.026 eV, far below 1.1 eV",
        ],
        answer: "\\lambda \\approx 1130 \\text{ nm (infrared)}, \\text{ so heating alone frees very few carriers}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Energy Band Gap",
        definition:
          "The forbidden energy range between the top of the valence band and the bottom of the conduction band, which electrons cannot occupy.",
        significance:
          "Its width is the single property that separates a conductor from a semiconductor from an insulator.",
      },
      {
        term: "Depletion Region",
        definition:
          "The narrow region around a p-n junction that is free of mobile charge carriers because diffusion has exposed the fixed immobile ions.",
        significance:
          "It creates the barrier potential of about 0.7 V for silicon and 0.3 V for germanium, which must be overcome for the diode to conduct.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Nuclear Physics
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "nuclear-physics",
      "radioactivity",
      "half-life",
      "mass-defect",
      "binding-energy",
      "fission",
      "fusion",
      "decay-law",
    ],
    subject: "physics",
    title: "Nuclear Physics — Radioactivity, Mass Defect & Binding Energy",
    unitSlugs: ["nuclear-physics"],
    category: "Modern Physics",
    governingLaws: [
      {
        name: "Radioactive Decay Law",
        statement:
          "The rate of disintegration of a radioactive substance is directly proportional to the number of undecayed nuclei present at that instant.",
        formula: "N = N_0 e^{-\\lambda t}, \\quad \\frac{dN}{dt} = -\\lambda N",
        conditions:
          "Statistical law valid for a large number of nuclei; the decay constant lambda is independent of temperature, pressure and chemical state.",
      },
      {
        name: "Mass–Energy Equivalence",
        statement:
          "Mass and energy are interconvertible, and the binding energy of a nucleus equals the mass defect times the square of the speed of light.",
        formula: "E = \\Delta m c^2, \\quad 1\\ u = 931.5\\ MeV",
        conditions:
          "The mass defect is the difference between the sum of the masses of the free nucleons and the actual mass of the nucleus.",
      },
    ],
    speedFormulas: [
      {
        name: "Half-Life, Mean Life and Decay Constant",
        formula: "T_{1/2} = \\frac{0.693}{\\lambda}, \\quad \\tau = \\frac{1}{\\lambda} = 1.44\\,T_{1/2}",
        description:
          "After n half-lives the fraction remaining is (1/2)^n. Mean life is always greater than half-life.",
        unit: "s",
      },
      {
        name: "Activity",
        formula: "A = \\lambda N = A_0 e^{-\\lambda t}",
        description:
          "The activity also decays exponentially with the same decay constant as the number of nuclei.",
        unit: "Bq (1 Ci = 3.7 x 10^10 Bq)",
      },
      {
        name: "Nuclear Radius and Density",
        formula: "R = R_0 A^{1/3}, \\quad R_0 = 1.2 \\times 10^{-15} m",
        description:
          "Nuclear density is the same for all nuclei (about 2.3 x 10^17 kg/m^3) because volume is proportional to mass number.",
        unit: "m",
      },
      {
        name: "Binding Energy per Nucleon",
        formula: "BE = \\Delta m \\times 931.5\\ MeV, \\quad BE/A \\text{ peaks at } A = 56",
        description:
          "Iron-56 has the highest binding energy per nucleon, which is why fusion releases energy up to iron and fission releases energy beyond it.",
        unit: "MeV",
      },
    ],
    constantsAndValues: [
      { symbol: "1 u", name: "Atomic mass unit in energy", value: "931.5", unit: "MeV" },
      { symbol: "m_p", name: "Mass of a proton", value: "1.007276", unit: "u" },
      { symbol: "m_n", name: "Mass of a neutron", value: "1.008665", unit: "u" },
      { symbol: "T_{1/2}(C\\text{-}14)", name: "Half-life of carbon-14", value: "5730", unit: "years" },
      { symbol: "T_{1/2}(U\\text{-}238)", name: "Half-life of uranium-238", value: "4.5 x 10^9", unit: "years" },
      { symbol: "c", name: "Speed of light in vacuum", value: "3 x 10^8", unit: "m s^-1" },
    ],
    entranceTraps: [
      {
        trap: "The half-life of a radioactive substance changes with temperature and pressure.",
        truth:
          "Half-life is a property of the NUCLEUS alone and is unaffected by temperature, pressure, chemical combination or physical state. That insensitivity is why carbon dating works.",
        examRef: "IOE/CEE — radioactivity",
      },
      {
        trap: "After two half-lives all the nuclei of a radioactive sample have decayed.",
        truth:
          "After two half-lives one quarter — 25 percent — is still undecayed. Radioactive decay is exponential; in principle the fraction never quite reaches zero.",
        examRef: "NEB — decay law",
      },
      {
        trap: "Binding energy per nucleon keeps increasing with mass number.",
        truth:
          "It rises steeply for light nuclei, peaks at about 8.8 MeV per nucleon near iron-56, and then slowly decreases for heavier nuclei.",
        examRef: "IOE — binding energy curve",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A radioactive substance has a half-life of 20 minutes. What fraction of the original sample remains undecayed after one hour?",
        given: "T_{1/2} = 20 min, t = 60 min",
        steps: [
          "Number of half-lives: n = \\frac{t}{T_{1/2}} = \\frac{60}{20} = 3",
          "Fraction remaining: \\frac{N}{N_0} = \\left(\\frac{1}{2}\\right)^n = \\left(\\frac{1}{2}\\right)^3",
          "\\frac{N}{N_0} = \\frac{1}{8} = 0.125",
        ],
        answer: "\\frac{1}{8} \\text{ of the sample remains } (12.5\\%)",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Mass Defect",
        definition:
          "The difference between the sum of the masses of the individual nucleons and the actual measured mass of the nucleus.",
        significance:
          "It converts directly into the binding energy through E = delta-m c squared, and is the reason nuclear reactions release millions of times more energy than chemical ones.",
      },
      {
        term: "Half-Life",
        definition:
          "The time in which half of the nuclei in a radioactive sample decay.",
        significance:
          "It sets the timescale for radioactive dating and for the safe storage of nuclear waste — uranium-238 takes 4.5 billion years.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // PHYSICS — Recent Trends in Physics
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "recent-trends",
      "particle-physics",
      "quark",
      "lepton",
      "big-bang",
      "hubble",
      "dark-matter",
      "black-hole",
      "gravitational-wave",
      "neutrino",
    ],
    subject: "physics",
    title: "Recent Trends — Particles, the Expanding Universe & Modern Astronomy",
    unitSlugs: ["recent-trends-in-physics"],
    category: "Modern Physics & Cosmology",
    governingLaws: [
      {
        name: "Hubble's Law",
        statement:
          "The recessional velocity of a distant galaxy is directly proportional to its distance from us, evidence that the Universe is expanding.",
        formula: "v = H_0 d, \\quad H_0 \\approx 70\\ km\\ s^{-1} Mpc^{-1}",
        conditions:
          "The redshift is interpreted as expansion of space itself, not as motion through space; there is no centre to the expansion.",
      },
      {
        name: "Quark Model of Hadrons",
        statement:
          "Baryons are made of three quarks and mesons of one quark and one antiquark, held together by the strong interaction.",
        formula:
          "p = uud\\ (+2e/3, +2e/3, -e/3), \\quad n = udd, \\quad \\pi^+ = u\\bar{d}",
        conditions:
          "Quarks are never found in isolation — a phenomenon called confinement. Their charges are fractional multiples of the elementary charge.",
      },
    ],
    speedFormulas: [
      {
        name: "Classification of Fundamental Particles",
        formula: "\\text{Fermions} \\to \\text{quarks (6)} + \\text{leptons (6)}; \\quad \\text{Bosons} \\to \\text{force carriers}",
        description:
          "Up, down, strange, charm, bottom, top quarks and the electron, muon, tau plus their three neutrinos make up the twelve fermions of the Standard Model.",
        unit: "dimensionless",
      },
      {
        name: "Redshift and Recession",
        formula: "z = \\frac{\\Delta\\lambda}{\\lambda_0}",
        description:
          "A positive redshift means the source is receding. The most distant observed galaxies have z greater than 10.",
        unit: "dimensionless",
      },
      {
        name: "Black Hole Schwarzschild Radius",
        formula: "R_s = \\frac{2GM}{c^2}",
        description:
          "The radius of the event horizon; escape velocity at this radius equals the speed of light. For the Sun's mass it is about 3 km.",
        unit: "m",
      },
      {
        name: "Age of the Universe from H_0",
        formula: "t_0 \\approx \\frac{1}{H_0}",
        description:
          "Using H_0 about 70 km/s/Mpc gives roughly 14 billion years, close to the measured 13.8 billion years.",
        unit: "years",
      },
    ],
    constantsAndValues: [
      { symbol: "H_0", name: "Hubble constant", value: "about 70", unit: "km s^-1 Mpc^-1" },
      { symbol: "t_0", name: "Age of the Universe", value: "13.8 x 10^9", unit: "years" },
      { symbol: "1 Mpc", name: "One megaparsec", value: "3.26 x 10^6", unit: "light years" },
      { symbol: "T_{CMB}", name: "Temperature of the cosmic microwave background", value: "2.7", unit: "K" },
      { symbol: "R_{s,\\odot}", name: "Schwarzschild radius for the Sun's mass", value: "about 3", unit: "km" },
      { symbol: "m_\\nu", name: "Upper bound on neutrino mass", value: "< 0.1", unit: "eV" },
    ],
    entranceTraps: [
      {
        trap: "The Big Bang was an explosion of matter into empty space from a centre.",
        truth:
          "It was an expansion OF space itself. Every point moves away from every other point, and there is no centre or edge — which is why every galaxy sees the same redshift pattern.",
        examRef: "IOE/CEE — cosmology",
      },
      {
        trap: "Quarks can be isolated and observed as free particles.",
        truth:
          "Quarks are permanently confined inside hadrons. They are known from deep inelastic scattering experiments, not from isolated detection.",
        examRef: "NEB — particle physics",
      },
      {
        trap: "Dark matter and dark energy are the same thing.",
        truth:
          "Dark matter attracts and holds galaxies together, making up about 27 percent of the Universe. Dark energy is a repulsive influence driving accelerating expansion and makes up about 68 percent. Ordinary matter is only about 5 percent.",
        examRef: "IOE — modern physics",
      },
      {
        trap: "Gravitational waves are sound waves in space.",
        truth:
          "They are ripples in the curvature of spacetime itself, travelling at the speed of light, first detected by LIGO in 2015 from merging black holes.",
        examRef: "CEE — recent trends",
      },
    ],
    workedNumericals: [
      {
        problem:
          "A galaxy shows a redshift corresponding to a recessional velocity of 14,000 km/s. Estimate its distance. Take H_0 = 70 km/s/Mpc.",
        given: "v = 14000\\ km\\ s^{-1}, H_0 = 70\\ km\\ s^{-1} Mpc^{-1}",
        steps: [
          "Hubble's law: v = H_0 d",
          "d = \\frac{v}{H_0} = \\frac{14000}{70}",
          "d = 200\\ Mpc",
        ],
        answer: "d = 200 \\text{ Mpc} \\approx 6.5 \\times 10^8 \\text{ light years}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Baryon and Meson",
        definition:
          "A baryon is a hadron made of three quarks (proton, neutron); a meson is a hadron made of a quark and an antiquark (pion, kaon).",
        significance:
          "Baryons are the building blocks of ordinary matter, while mesons are the carriers of the residual strong force that binds the nucleus.",
      },
      {
        term: "Dark Matter",
        definition:
          "Non-luminous matter that interacts gravitationally but not electromagnetically, inferred from galaxy rotation curves and gravitational lensing.",
        significance:
          "About 27 percent of the Universe; without it, galaxies could not hold together at their observed rotation speeds.",
      },
    ],
  },
];
