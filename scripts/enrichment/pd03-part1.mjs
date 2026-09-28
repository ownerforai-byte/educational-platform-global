import { pd03Notes } from "./pd03-notes.mjs";

export const pd03 = {
  title: "Potential Gradient",
  unitSlug: "potential-potential-difference-and-potential-energy",
  topicSlug: "potential-gradient",
  topicTitle: "Potential gradient",
  relevance: 100,
  notes: pd03Notes,
  confusion: [
    "Omitting the negative sign in E = -dV/dx: The minus sign indicates that the field points toward decreasing potential. Writing E = dV/dx gives the wrong direction whenever V decreases along the chosen axis.",
    "Assuming the potential gradient is a vector while differentiating only with respect to one variable: For a general three-dimensional field the gradient is a vector; the scalar expression dV/dx is valid only along a chosen axis where the field is known to be uniform or one-dimensional.",
    "Confusing the potential gradient with the gradient of a scalar function in general mathematics: In electrostatics the potential gradient carries a minus sign and is identical in magnitude to the electric field, but a generic mathematical gradient is always positive in magnitude and has no such sign convention."
  ],
  practice: [
    "A conducting wire of length 2.0 m and cross-sectional area 1.0 × 10⁻⁶ m² carries a current of 0.5 A. The measured potential drop across its ends is 1.5 V. (a) Find the potential gradient. (b) Find the resistivity of the material. Solution: (a) $K = \\frac{V}{l} = \\frac{1.5}{2.0} = 0.75\\,\\text{V/m}$, which equals the electric field E. (b) From Ohm's law, $R = \\frac{V}{I} = \\frac{1.5}{0.5} = 3.0\\,\\Omega$. The resistivity is $\\rho = \\frac{RA}{l} = \\frac{(3.0)(1.0 \\times 10^{-6})}{2.0} = 1.5 \\times 10^{-6}\\,\\Omega\\cdot\\text{m}$, a value typical of a good conductor such as graphite or a semiconductor."
  ],
  universalFacts: [
    "The steep potential gradient across a neuron axon membrane, roughly 10⁵ V per metre during an action potential, is what causes Na⁺ and K⁺ ions to rush through their channel proteins at 10⁻⁹ second timescales.",
    "In an electron microscope the accelerating field of about 10⁵ V/m, obtained as a uniform potential gradient between the cathode and anode, shapes the electron beam into a fine probe capable of resolving atomic-scale structure."
  ],
  animation3D: "potential-potential-difference-and-potential-energy",
  motionGraphics: "potential-potential-difference-and-potential-energy"
};
