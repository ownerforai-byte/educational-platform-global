import { ec02Notes } from "./ec02-notes.mjs";

export const ec02 = {
  title: "Coulomb's Law and Force Between Multiple Charges",
  unitSlug: "electric-charges",
  topicSlug: "coulomb-s-law-and-force-between-multiple-charges",
  topicTitle: "Coulomb's law; force between multiple charges",
  relevance: 100,
  notes: ec02Notes,
  confusion: [
    "Adding electrostatic forces as scalar algebraic quantities: Electric forces are vectors! When calculating the net force exerted by multiple charges, one must resolve each pairwise force into Cartesian orthogonal components ($F_x, F_y$) before summing: $F_{net} = \\sqrt{(\\sum F_x)^2 + (\\sum F_y)^2}$.",
    "Ignoring the medium's dielectric screening: In water ($\\kappa \\approx 80$), the electrostatic force between ions drops to $\\frac{1}{80}$ of its vacuum value, explaining why table salt ($NaCl$) spontaneously dissociates into hydrated $Na^+$ and $Cl^-$ ions in water.",
    "Applying Coulomb's law to extended charge distributions at close range: Coulomb's inverse-square formula applies strictly to point charges or non-overlapping spherical charge distributions (via Shell Theorem). At close range, induction distorts charge distribution on real conductors."
  ],
  practice: [
    "Two identical positive point charges $q_1 = q_2 = +2.0\\,\\mu\\text{C}$ are placed at coordinates $(0, 0.3\\text{ m})$ and $(0, -0.3\\text{ m})$ along the y-axis. A third point charge $q_0 = +4.0\\,\\mu\\text{C}$ is placed on the x-axis at $(0.4\\text{ m}, 0)$. Find the magnitude and direction of the net electrostatic force acting on $q_0$. Solution: Distance from each charge to $q_0$ is $r = \\sqrt{0.4^2 + 0.3^2} = 0.5\\text{ m}$. Force magnitude from one charge: $F_1 = \\frac{(9 \\times 10^9)(2 \\times 10^{-6})(4 \\times 10^{-6})}{(0.5)^2} = \\frac{0.072}{0.25} = 0.288\\text{ N}$. Angle with x-axis: $\\cos\\theta = 0.4 / 0.5 = 0.8$, $\\sin\\theta = 0.3 / 0.5 = 0.6$. By symmetry, vertical components cancel ($F_{1y} - F_{2y} = 0$). Net horizontal force: $F_{net} = 2 F_1 \\cos\\theta = 2(0.288)(0.8) = 0.461\\text{ N}$ directed along $+x$ axis."
  ],
  universalFacts: [
    "The electrostatic force between two protons inside a nucleus is approximately $10^{36}$ times stronger than the gravitational force between them: $\\frac{F_e}{F_g} = \\frac{e^2 / (4\\pi\\varepsilon_0 r^2)}{G m_p^2 / r^2} \\approx 1.24 \\times 10^{36}$, showing the colossal dominance of electromagnetism over gravity at microscopic scales.",
    "Coulomb's law has been tested experimentally to an accuracy of better than 1 part in $10^{16}$, establishing the inverse power $r^{-(2+\\delta)}$ with $|\delta| < 10^{-16}$, proving the photon has zero rest mass."
  ],
  animation3D: "electric-charges",
  motionGraphics: "electric-charges"
};
