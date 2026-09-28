import { pd02Notes } from "./pd02-notes.mjs";

export const pd02 = {
  title: "Equipotential Lines and Surfaces",
  unitSlug: "potential-potential-difference-and-potential-energy",
  topicSlug: "equipotential-lines-and-surfaces",
  topicTitle: "Equipotential lines and surfaces",
  relevance: 100,
  notes: pd02Notes,
  confusion: [
    "Mistaking equipotential surfaces for field lines: Field lines show the direction of the force on a positive test charge; equipotential surfaces join points of equal potential. The two families are always mutually perpendicular, never parallel.",
    "Believing that equipotential surfaces are widely spaced where the field is weak: Spacing is inversely related to field strength. Close spacing means a large potential change over a short distance, i.e. a strong field (E = -ΔV/Δs).",
    "Assuming the potential on the surface of a charged conductor varies with position: In electrostatic equilibrium, free charges redistribute until the interior field is zero, making the entire conductor surface a single equipotential at V = kQ/R."
  ],
  practice: [
    "A point charge q = 4 μC is located at the origin. (a) What is the potential on a sphere of radius 5 cm? (b) What is the work required to move a test charge of 2 μC from that sphere to a sphere of radius 10 cm? Solution: (a) $V = kq/r = (9 \\times 10^9)(4 \\times 10^{-6})/0.05 = 36000/0.05 = 7.2 \\times 10^5\\,\\text{V}$. (b) $W = q_0\\Delta V$ where $\\Delta V = kq(1/r_2 - 1/r_1) = (9 \\times 10^9)(4 \\times 10^{-6})(10 - 20) = 36000 \\times (-10) = -3.6 \\times 10^5\\,\\text{V}$. Thus $W = (2 \\times 10^{-6})(-3.6 \\times 10^5) = -0.72\\,\\text{J}$. The negative sign indicates the field does this work spontaneously as the test charge moves outward against the repulsion of the positive source."
  ],
  universalFacts: [
    "The human heart, whose electrical activity is measured by electrocardiograms (ECGs), depends on the heart muscle cells generating potential differences of about 1 mV at the body surface — an equipotential mapping problem in three dimensions.",
    "Equipotential mapping of underground rock and soil resistivity is a standard geophysical prospecting technique: injecting current into the ground and mapping constant-potential contours reveals buried ore deposits, voids, and groundwater."
  ],
  animation3D: "potential-potential-difference-and-potential-energy",
  motionGraphics: "potential-potential-difference-and-potential-energy"
};
