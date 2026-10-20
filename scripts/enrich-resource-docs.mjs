#!/usr/bin/env node
/**
 * Enrich every paired public/resources document with a concise, cited academic
 * extension. The .doc assets are HTML for Word compatibility, so both formats
 * receive the same accessible content. Safe to rerun: a marked prior section
 * is replaced rather than duplicated.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RESOURCE_DIR = path.join(ROOT, "public", "resources");
const START = "<!-- academic-extension:start -->";
const END = "<!-- academic-extension:end -->";

const SOURCES = {
  english: [
    ["University of York: close reading", "https://www.york.ac.uk/english/about/writing-at-york/writing-resources/close-reading/"],
    ["UW–Madison: close reading", "https://writing.wisc.edu/handbook/academicwriting/closereading/"],
    ["Poetry Foundation: metre", "https://www.poetryfoundation.org/education/glossary/meter"],
    ["Purdue OWL: rhetorical situation", "https://owl.purdue.edu/owl/general_writing/academic_writing/rhetorical_situation/elements_of_rhetorical_situations.html"],
  ],
  nepali: [
    ["University of York: close reading", "https://www.york.ac.uk/english/about/writing-at-york/writing-resources/close-reading/"],
    ["Open Book Publishers: Nepali metre and performance", "https://books.openbookpublishers.com/10.11647/obp.0246/ch1.xhtml"],
    ["UC Santa Barbara: Nepali linguistics resources", "https://www.linguistics.ucsb.edu/research/santa-barbara-papers-linguistics"],
  ],
  physics: [
    ["OpenStax Physics: Newton’s laws", "https://openstax.org/books/college-physics-2e/pages/4-introduction-to-dynamics-newtons-laws-of-motion"],
    ["OpenStax Physics: ideal-gas model", "https://openstax.org/books/college-physics-2e/pages/13-3-the-ideal-gas-law"],
    ["NASA: dark matter", "https://science.nasa.gov/dark-matter/"],
    ["Clay Mathematics Institute: Navier–Stokes problem", "https://www.claymath.org/millennium/navier-stokes-equation/"],
  ],
  math: [
    ["OpenStax: Fundamental Theorem of Calculus", "https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus"],
    ["OpenStax: domain and range", "https://openstax.org/books/college-algebra-2e/pages/3-2-domain-and-range"],
    ["Clay Mathematics Institute: Riemann Hypothesis", "https://www.claymath.org/millennium/riemann-hypothesis/"],
    ["Clay Mathematics Institute: P versus NP", "https://www.claymath.org/millennium/p-vs-np/"],
    ["NIST: measurement uncertainty", "https://physics.nist.gov/cuu/Uncertainty/basic.html"],
  ],
  chemistry: [
    ["OpenStax Chemistry: chemical equilibrium", "https://openstax.org/books/chemistry-2e/pages/13-1-chemical-equilibria"],
    ["OpenStax Chemistry: periodic trends", "https://openstax.org/books/chemistry-2e/pages/6-5-periodic-variations-in-element-properties"],
    ["NASA Astrobiology: research questions", "https://astrobiology.nasa.gov/research/"],
    ["Shao et al. (2023): soot inception study", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10579345/"],
    ["Oak Ridge National Laboratory: superheavy elements", "https://www.ornl.gov/projects/synthesis-new-superheavy-elements-and-nuclei/"],
    ["U.S. Department of Energy: critical materials", "https://www.energy.gov/cmei/ammto/critical-minerals-and-materials"],
  ],
  biology: [
    ["OpenStax Biology: population evolution", "https://openstax.org/books/biology-2e/pages/19-1-population-evolution"],
    ["OpenStax Biology: ecology of ecosystems", "https://openstax.org/books/biology-2e/pages/46-1-ecology-of-ecosystems"],
    ["WHO: vaccines and immunization", "https://www.who.int/health-topics/vaccines-and-immunization"],
    ["NIH/PMC: current understanding of the human microbiome", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7043356/"],
    ["ICIMOD: HI-WISE Hindu Kush Himalaya assessment", "https://hkh.icimod.org/hi-wise/"],
    ["NASA Astrobiology: research questions", "https://astrobiology.nasa.gov/research/"],
    ["NHGRI: ethical concerns in genome editing", "https://www.genome.gov/about-genomics/policy-issues/Genome-Editing/ethical-concerns"],
  ],
  language: [
    ["University of York: close reading", "https://www.york.ac.uk/english/about/writing-at-york/writing-resources/close-reading/"],
    ["UW–Madison: close reading", "https://writing.wisc.edu/handbook/academicwriting/closereading/"],
    ["Poetry Foundation: metre", "https://www.poetryfoundation.org/education/glossary/meter"],
    ["Purdue OWL: rhetorical situation", "https://owl.purdue.edu/owl/general_writing/academic_writing/rhetorical_situation/elements_of_rhetorical_situations.html"],
    ["UC Santa Barbara: Nepali linguistics resources", "https://www.linguistics.ucsb.edu/research/santa-barbara-papers-linguistics"],
    ["Open Book Publishers: Nepali music, metre and performance", "https://books.openbookpublishers.com/10.11647/obp.0246/ch1.xhtml"],
  ],
};

const SETS = {
  physics: `physical-quantities vectors kinematics dynamics work-energy-and-power work-energy-power circular-motion gravitation elasticity heat-and-temperature thermal-expansion quantity-of-heat rate-of-heat-flow ideal-gas reflection-at-curved-mirror refraction-at-plane-surfaces refraction-through-prisms lenses dispersion electric-charges electric-field potential-potential-difference-and-potential-energy capacitor dc-circuits nuclear-physics solids recent-trends-in-physics optics mechanics`.split(" "),
  math: `algebra analytic-geometry calculus limits-and-continuity statistics-and-probability trigonometry computational-methods-or-mechanics`.split(" "),
  chemistry: `applied-chemistry aromatic-hydrocarbons atomic-structure basic-concept-of-organic-chemistry basic-concept-organic bio-inorganic-chemistry chemical-bonding-and-shapes-of-molecules chemical-bonding chemical-equilibrium chemistry-of-metals chemistry-of-non-metals classification-of-elements-and-periodic-table classification-of-elements foundation-and-fundamentals fundamental-principles-of-organic-chemistry fundamental-principles-organic fundamentals-of-applied-chemistry hydrocarbons modern-chemical-manufactures modern-manufactures oxidation-and-reduction oxidation-reduction states-of-matter stoichiometry`.split(" "),
  biology: `biomolecules-and-cell-biology biota-and-environment biotechnology-applications biotechnology-principles conservation-biology ecology environmental-issues evolutionary-biology faunal-diversity floral-diversity heredity-and-evolution human-health-and-diseases introduction-to-biology introductory-microbiology vegetation`.split(" "),
  english: `critical-thinking grammar language-and-grammar language-development literature literature-essays-plays reading-and-comprehension vocabulary writing writing-and-composition`.split(" "),
  nepali: `bhasha-ra-vyakarana bhasha-tatha-vyakaran katha-natak-ra-sanskriti lekhan-koushal lekhan-ra-rachana sahitya-adhyayan sanskriti-tatha-samaj`.split(" "),
};

function topicTitle(stem) {
  return stem.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function chooseDomain(stem) {
  for (const [domain, names] of Object.entries(SETS)) if (names.includes(stem)) return domain;
  throw new Error(`No academic domain is assigned to resource: ${stem}`);
}

function frontierFor(domain, stem) {
  if (domain === "physics") {
    if (/heat|thermal|ideal-gas|quantity-of-heat|rate-of-heat/.test(stem)) return {
      title: "The thermodynamic arrow of time",
      detail: "Macroscopic heat flow has a preferred direction, while many microscopic laws work nearly the same forward and backward in time. How the universe’s low-entropy past underwrites that observed arrow remains a foundational research question; it does not invalidate the second law’s successful predictions.",
      url: "https://plato.stanford.edu/entries/time-thermo/",
      label: "Stanford Encyclopedia of Philosophy: thermodynamic asymmetry",
    };
    if (/solids/.test(stem)) return {
      title: "High-temperature superconductivity",
      detail: "Electrical resistance vanishes in a superconducting state below material-specific critical conditions. A complete microscopic explanation for many high-temperature superconductors remains open; no ordinary room-temperature superconductor has been established.",
      url: "https://www.energy.gov/science/doe-explainssuperconductivity",
      label: "U.S. Department of Energy: superconductivity",
    };
    if (/nuclear/.test(stem)) return {
      title: "Unexpected structure in rare nuclei",
      detail: "Experiments found oxygen-28 to be unbound despite a traditional shell-model expectation of unusual stability. Explaining how nuclear forces and shell structure change in rare isotopes remains an active research challenge.",
      url: "https://www.energy.gov/science/np/articles/not-quite-magic-oxygen-28-observed-first-time",
      label: "U.S. Department of Energy: oxygen-28 observation",
    };
    if (/physical-quantities|vectors|mechanics|kinematics|dynamics|circular|elasticity|work-energy|gravitation/.test(stem)) return {
      title: "The mathematics of fluid turbulence",
      detail: "Turbulent flows are observed and modeled every day, yet a major open mathematical problem asks whether smooth three-dimensional Navier–Stokes solutions always exist and remain smooth. This is a question about general mathematical proof, not whether fluid mechanics works in engineering.",
      url: "https://www.claymath.org/millennium/navier-stokes-equation/",
      label: "Clay Mathematics Institute: Navier–Stokes problem",
    };
    return {
      title: "What is dark matter made of?",
      detail: /electric|capacitor|potential/.test(stem)
        ? "Astronomical evidence suggests that most matter does not interact strongly with light, yet its gravitational effects are measurable. Whether dark matter consists of new particles—and how those particles interact with ordinary matter—remains open; the point-charge electrostatic model remains reliable in its own domain."
        : "Astronomical observations provide strong evidence for unseen mass through gravitational effects, but its particle identity has not been established. Researchers test candidate explanations by looking for distinct signals; an open question about the cosmos does not make established classroom models false.",
      url: "https://science.nasa.gov/dark-matter/",
      label: "NASA: dark matter",
    };
  }
  if (domain === "math") {
    if (/computational-methods/.test(stem)) return {
      title: "P versus NP",
      detail: "The open P-versus-NP problem asks whether every problem whose proposed solution can be checked efficiently can also be solved efficiently. It is a research frontier in algorithms and discrete mathematics, not a missing step in routine school calculations.",
      url: "https://www.claymath.org/millennium/p-vs-np/",
      label: "Clay Mathematics Institute: P versus NP",
    };
    if (/statistics/.test(stem)) return {
      title: "From association to causation",
      detail: "A correlation in sampled data does not by itself establish that one variable causes another. Researchers continue to develop and test causal-inference methods that state assumptions about confounding, selection, measurement and study design explicitly.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5187603/",
      label: "American Statistical Association p-value statement explainer",
    };
    return {
      title: "The Riemann Hypothesis",
      detail: "This unsolved conjecture concerns the non-trivial zeros of the zeta function and has deep connections to the distribution of prime numbers. Checking many cases computationally cannot replace a proof for all cases.",
      url: "https://www.claymath.org/millennium/riemann-hypothesis/",
      label: "Clay Mathematics Institute: Riemann Hypothesis",
    };
  }
  if (domain === "chemistry") {
    if (/aromatic|hydrocarbon|basic-concept|fundamental-principles/.test(stem)) return {
      title: "How soot first forms in flames",
      detail: "Researchers still debate how the first soot particles form. A 2023 study supported physical association of polycyclic aromatic hydrocarbons; a later peer-reviewed response argued the evidence instead supports chemical clustering. The debate illustrates how competing mechanisms are tested against data.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10579345/",
      label: "Shao et al. (2023): soot inception study",
    };
    if (/atomic|classification-of-elements/.test(stem)) return {
      title: "Predicting the chemistry of superheavy elements",
      detail: "The shortest-lived superheavy atoms are produced one at a time, making chemical measurements exceptionally difficult. Relativistic effects may alter expected periodic trends; experiments and calculations continue to test how far familiar patterns extend.",
      url: "https://www.ornl.gov/projects/synthesis-new-superheavy-elements-and-nuclei/",
      label: "Oak Ridge National Laboratory: superheavy elements",
    };
    if (/applied|manufactur|bio-inorganic|states-of-matter/.test(stem)) return {
      title: "Circular materials and selective recycling",
      detail: "Researchers are working to recover and reuse active battery materials at scale. Real waste streams vary in chemistry and condition, so sorting, safe disassembly, purity, energy use and economic viability all constrain the process.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10480636/",
      label: "Peer-reviewed review: direct recycling of lithium-ion batteries",
    };
    return {
      title: "How chemistry led to the first living systems",
      detail: "Life’s existence and subsequent evolution are established, but the detailed sequence by which non-living chemistry produced self-sustaining living systems remains unresolved. Researchers investigate plausible molecules and environments without treating any single pathway as proven.",
      url: "https://astrobiology.nasa.gov/research/",
      label: "NASA Astrobiology: research questions",
    };
  }
  if (domain === "biology") {
    if (/ecolog|biota|faunal|floral|vegetation|conservation|environment/.test(stem)) return {
      title: "How Himalayan ecosystems respond to rapid change",
      detail: "Changes in snow and ice across the Hindu Kush Himalaya are documented, but timing and local consequences for water, habitats and particular species remain uncertain. Scenario-based projections are not guaranteed outcomes; monitoring and stating the scenario are essential.",
      url: "https://hkh.icimod.org/hi-wise/",
      label: "ICIMOD: HI-WISE assessment",
    };
    if (/health|microbiology/.test(stem)) return {
      title: "When microbiome differences cause health effects",
      detail: "Microbial communities are associated with many health conditions, but determining whether a difference causes a condition, follows it, or reflects another factor is an active research challenge. Association alone does not establish mechanism or diagnosis.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7043356/",
      label: "NIH/PMC: current understanding of the human microbiome",
    };
    if (/biotechnology/.test(stem)) return {
      title: "Precision and safety in genome editing",
      detail: "Researchers continue to improve how genome edits are delivered and assessed. Off-target changes, mosaicism, intended tissue, and—in heritable editing—effects on future generations are distinct scientific and ethical considerations.",
      url: "https://www.genome.gov/about-genomics/policy-issues/Genome-Editing/ethical-concerns",
      label: "NHGRI: ethical concerns in genome editing",
    };
    if (/heredity|evolutionary/.test(stem)) return {
      title: "Predicting complex traits",
      detail: "Many traits reflect interactions among multiple genes and environments. How to make predictions that remain accurate across populations and contexts is still a research challenge; a single-gene explanation should not be assumed without evidence.",
      url: "https://www.genome.gov/about-genomics/fact-sheets/Genetics-vs-Genomics",
      label: "NHGRI: genetics and genomics",
    };
    return {
      title: "How non-living chemistry gave rise to life",
      detail: "The detailed pathway from non-living chemistry to the first living systems remains unresolved. This open origin-of-life question is distinct from the extensive evidence for evolution of life after its origin.",
      url: "https://astrobiology.nasa.gov/research/",
      label: "NASA Astrobiology: research questions",
    };
  }
  return {
    title: domain === "nepali" ? "Meaning across language, performance and translation" : "How evidence supports more than one reading",
    detail: domain === "nepali"
      ? "A poem, story or performance can support multiple interpretations when its words, form and context leave meaningful ambiguity. For Nepali texts, distinguish the original wording from a translation, and do not apply an English stress pattern or an unverified metre label as though it were universal."
      : "Literary interpretation is evidence-based rather than a hunt for one hidden answer. A defensible open reading offers at least two text-supported interpretations, cites exact details, and explains what complicates each; authorial intention should not be asserted without evidence.",
    url: domain === "nepali"
      ? "https://books.openbookpublishers.com/10.11647/obp.0246/ch1.xhtml"
      : "https://www.york.ac.uk/english/about/writing-at-york/writing-resources/close-reading/",
    label: domain === "nepali" ? "Open Book Publishers: Nepali metre and performance" : "University of York: close reading and ambiguity",
  };
}

function modelFor(domain, stem) {
  if (domain === "physics") {
    if (/heat|thermal|ideal-gas|quantity-of-heat|rate-of-heat/.test(stem)) return {
      fact: "Energy accounting depends on a stated sign convention. With heat added to a system positive and work done by the system positive, the first law is ΔU = Q − W. Heat and work describe transfers; internal energy is a state property.",
      conditions: "The ideal-gas equation is a model: particles are treated as small and far apart, with negligible intermolecular forces except during collisions. It is most reliable at sufficiently low density and away from condensation; real gases depart from it at high pressure or low temperature.",
      sources: [SOURCES.physics[1]],
    };
    if (/optics|dispersion|lenses|mirror|refraction/.test(stem)) return {
      fact: "Ray optics predicts reflection, image formation and refraction well when apertures and objects are much larger than the wavelength. The wave model explains interference and diffraction that ray diagrams cannot.",
      conditions: "A thin-lens or mirror equation assumes ideal geometry and a paraxial approximation (rays close to the principal axis and making small angles). Real aberrations and finite apertures limit the ideal image.",
      sources: [["OpenStax Physics: ray aspect of light", "https://openstax.org/books/college-physics-2e/pages/25-1-the-ray-aspect-of-light"], ["OpenStax Physics: wave optics", "https://openstax.org/books/college-physics-2e/pages/27-introduction-to-wave-optics"]],
    };
    if (/nuclear|solids|recent-trends/.test(stem)) return {
      fact: "Nuclear binding energy is related to mass defect by E = Δmc². Radioactive half-life describes the statistical decrease of a large population of nuclei, not a predictable countdown for one individual nucleus.",
      conditions: "Use the exponential decay model for a population with a constant decay probability per unit time. Nuclear models and solid-state models have domains: their predictions should be compared with measurements, especially for rare isotopes and unusual materials.",
      sources: [["OpenStax Physics: binding energy", "https://openstax.org/books/college-physics-2e/pages/31-6-binding-energy"], ["OpenStax Physics: half-life", "https://openstax.org/books/college-physics-2e/pages/31-5-half-life-and-activity"]],
    };
    if (/electric|capacitor|potential|dc-circuit/.test(stem)) return {
      fact: "Coulomb’s law models the force between point charges; superposition lets the vector contributions from several charges be added. In circuit problems, charge and energy conservation support Kirchhoff’s rules.",
      conditions: "Ohm’s law V = IR is a useful relation for ohmic materials over conditions where resistance is approximately constant. It is not universal: temperature changes and components such as diodes can produce non-ohmic behaviour.",
      sources: [["OpenStax Physics: Coulomb’s law", "https://openstax.org/books/college-physics-2e/pages/18-3-coulombs-law"], ["OpenStax Physics: Ohm’s law", "https://openstax.org/books/college-physics-2e/pages/20-2-ohms-law-resistance-and-simple-circuits"]],
    };
    return {
      fact: "Newton’s laws predict how net force changes momentum in an inertial reference frame. For an isolated system, total momentum is conserved; this connects individual motion to system-level accounting.",
      conditions: "Classical mechanics is an excellent approximation for macroscopic objects moving much slower than light. State idealizations such as point mass, rigid body, negligible air resistance or frictionless contact; each must be justified for the situation.",
      sources: [SOURCES.physics[0]],
    };
  }
  if (domain === "math") {
    if (/statistics/.test(stem)) return {
      fact: "A statistic calculated from a sample varies from sample to sample. A confidence interval is produced by a method whose long-run coverage depends on its assumptions; a single interval is not a probability statement about a fixed parameter.",
      conditions: "Check how observations were sampled, whether they are independent, what distributional assumptions are used, and how missing data or outliers were handled. A p-value is not the probability that a hypothesis is true.",
      sources: [SOURCES.math[4], ["American Statistical Association p-value explainer", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5187603/"]],
    };
    if (/calculus|limits-and-continuity/.test(stem)) return {
      fact: "The Fundamental Theorem of Calculus links accumulation and rate of change: for continuous f, the derivative of ∫ₐˣ f(t)dt equals f(x). A limit describes a function’s behaviour near a point; the function value itself need not equal that limit.",
      conditions: "Check continuity and the interval before applying the theorem; a correct formula still needs correct limits, units and sign. In applications, the integral accumulates a rate only when the variable and units are defined consistently.",
      sources: [SOURCES.math[0]],
    };
    if (/trigonometry/.test(stem)) return {
      fact: "Sine and cosine encode the coordinates of a point moving around the unit circle, which explains their periodicity and the identity sin²θ + cos²θ = 1. In right-triangle problems the same ratios describe side lengths for acute angles.",
      conditions: "Check whether angles are measured in degrees or radians. Calculus identities and many formulas assume radians; trigonometric arguments must be dimensionless, and inverse-trigonometric functions return principal values unless a broader solution set is requested.",
      sources: [["OpenStax: trigonometric functions", "https://openstax.org/books/precalculus-2e/pages/5-2-unit-circle-sine-and-cosine-functions"], ["OpenStax: trigonometric identities", "https://openstax.org/books/precalculus-2e/pages/5-3-trigonometric-identities"]],
    };
    if (/computational-methods/.test(stem)) return {
      fact: "Numerical methods approximate solutions by a sequence of computable steps. Bisection maintains a sign-changing bracket for a continuous function and halves its width each iteration, giving a predictable error bound on the root’s location.",
      conditions: "Bisection needs a continuous function and an initial interval with opposite endpoint signs. Newton’s method needs a useful derivative and starting value; it can diverge or converge to a different root, so convergence must be checked rather than assumed.",
      sources: [["NIST Digital Library of Mathematical Functions: numerical methods", "https://dlmf.nist.gov/3.8"], ["OpenStax: numerical integration and error", "https://openstax.org/books/calculus-volume-2/pages/3-3-numerical-integration"]],
    };
    if (/analytic-geometry/.test(stem)) return {
      fact: "Coordinate geometry translates geometric conditions into equations. For example, a conic can be defined by a locus condition (such as a constant sum of distances to two foci for an ellipse), then represented algebraically.",
      conditions: "Check the coordinate system, sign convention, non-degenerate parameter values and domain before interpreting an equation as a real curve. Algebraic transformations preserve a locus only when each step is reversible on that domain.",
      sources: [["OpenStax: conic sections", "https://openstax.org/books/college-algebra-2e/pages/8-key-concepts"]],
    };
    return {
      fact: "A function’s domain is part of its definition. For real formulas, denominators cannot be zero and even roots require non-negative radicands; inverse functions require a one-to-one restriction on the chosen domain.",
      conditions: "State the number system and domain before solving. Squaring or multiplying by an expression that may be zero can introduce or remove candidates, so substitute proposed solutions into the original equation.",
      sources: [SOURCES.math[1]],
    };
  }
  if (domain === "chemistry") {
    if (/states-of-matter/.test(stem)) return {
      fact: "A phase diagram summarizes which phase is stable at combinations of temperature and pressure. The triple point is where three phases coexist at equilibrium; the critical point marks the end of the liquid–vapour boundary, beyond which liquid and gas are not distinct phases.",
      conditions: "Simple gas laws assume a dilute gas and approximately ideal behaviour. Real gases deviate most strongly at high pressure and near condensation, where molecular size and intermolecular attractions matter; phase boundaries depend on the substance and measured conditions.",
      sources: [["OpenStax Chemistry: liquids and solids", "https://openstax.org/books/chemistry-2e/pages/10-1-intermolecular-forces"], ["NIST Chemistry WebBook", "https://webbook.nist.gov/chemistry/"]],
    };
    if (/equilibrium|modern-chemical|manufactur/.test(stem)) return {
      fact: "Chemical equilibrium is dynamic: forward and reverse reaction rates are equal, so macroscopic concentrations remain constant, not necessarily equal. The equilibrium constant describes composition at a specified temperature, not the speed of reaching equilibrium.",
      conditions: "The introductory concentration expression is an approximation to activities. Pure solids and liquids are omitted from the usual equilibrium expression; changing temperature changes K, while a catalyst changes the rate of approach rather than the equilibrium position.",
      sources: [SOURCES.chemistry[0]],
    };
    if (/atomic|classification-of-elements|chemical-bonding/.test(stem)) return {
      fact: "Atomic number defines an element; isotopes differ in neutron number. Periodic properties show useful trends, but subshell energies and electron pairing explain exceptions, so a trend is a guide rather than a law without exceptions.",
      conditions: "Lewis structures and the octet rule are electron-accounting models, especially useful for many second-period main-group compounds. Odd-electron, electron-deficient and hypervalent species show why the octet rule is not universal.",
      sources: [SOURCES.chemistry[1], ["OpenStax Chemistry: Lewis structures", "https://openstax.org/books/chemistry-2e/pages/7-3-lewis-symbols-and-structures"]],
    };
    if (/hydrocarbon|aromatic|organic/.test(stem)) return {
      fact: "Molecular formula alone does not determine structure: constitutional isomers have different connectivities, while stereoisomers differ in spatial arrangement. Their properties and reactions depend on structure and conditions.",
      conditions: "The Hückel 4n+2 rule is a school-level test for planar, cyclic, continuously conjugated π systems; it is not a universal definition for every aromatic molecule. Reaction outcomes also depend on reagents, solvent, temperature and mechanism.",
      sources: [["OpenStax Chemistry: hydrocarbons", "https://openstax.org/books/chemistry-2e/pages/20-1-hydrocarbons"], SOURCES.chemistry[3]],
    };
    if (/stoichiometry|oxidation|redox/.test(stem)) return {
      fact: "A balanced chemical equation conserves atoms and charge. Its coefficients give mole ratios, not mass ratios; the limiting reactant sets the maximum theoretical amount of product.",
      conditions: "Theoretical yield assumes the stated reaction and complete conversion. Actual yield may be lower because of incomplete reaction, side reactions or collection losses; oxidation states are formal electron-accounting values, not always literal atomic charges.",
      sources: [["OpenStax Chemistry: reaction stoichiometry", "https://openstax.org/books/chemistry-2e/pages/4-3-reaction-stoichiometry"], ["IUPAC: oxidation-state definition", "https://iupac.org/recommendation/comprehensive-definition-of-oxidation-state/"]],
    };
    return {
      fact: "Chemical properties arise from the arrangement and interaction of electrons and nuclei. Conservation of atoms and charge constrains reactions; molecular structure and energy changes help explain which products form.",
      conditions: "Treat oxidation state, bonding diagrams and reaction equations as models with defined rules. Temperature, pressure, solvent, concentration, particle size and catalysts can alter rates or equilibria; name the conditions whenever comparing results.",
      sources: [SOURCES.chemistry[0], SOURCES.chemistry[1]],
    };
  }
  if (domain === "biology") {
    if (/ecolog|biota|faunal|floral|vegetation|conservation|environment/.test(stem)) return {
      fact: "Ecosystems contain interacting organisms and non-living conditions. Energy flows through food webs and is dissipated as heat, while elements such as carbon and nitrogen cycle; biodiversity includes genetic, species and ecosystem diversity.",
      conditions: "Population or ecosystem trends depend on place, season, sampling method and time scale. Distinguish a measured observation from a projection, and report uncertainty rather than treating one survey as a complete census.",
      sources: [SOURCES.biology[1], SOURCES.biology[4]],
    };
    if (/evolution|heredity/.test(stem)) return {
      fact: "Evolution is change in heritable variation in populations across generations. Natural selection, mutation, genetic drift and gene flow can all change allele frequencies; evolution is not an individual changing during its lifetime.",
      conditions: "Hardy–Weinberg equilibrium is a comparison model that assumes a very large population and no selection, mutation or migration. Real populations may violate assumptions; deviations can motivate investigation but do not identify a cause by themselves.",
      sources: [SOURCES.biology[0], ["NHGRI: human genomic variation", "https://www.genome.gov/about-genomics/educational-resources/fact-sheets/human-genomic-variation"]],
    };
    if (/health|microbiology/.test(stem)) return {
      fact: "Innate immunity provides broad initial defenses; adaptive immunity involves antigen-specific B- and T-cell responses and can form memory. Vaccination trains immune responses against particular infections, but protection and duration vary by vaccine and person.",
      conditions: "A pathogen’s presence, a positive molecular test and clinical disease are not interchangeable claims. Interpret diagnostic results with test sensitivity, sampling time, symptoms and epidemiological context; antimicrobial resistance belongs to microbes, not a person’s body.",
      sources: [SOURCES.biology[2], SOURCES.biology[3], ["WHO: antimicrobial resistance", "https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance"]],
    };
    if (/biotechnology/.test(stem)) return {
      fact: "PCR amplifies a selected DNA region and gel electrophoresis separates fragments by size. These tools support research and diagnosis, but results depend on controls and the specific question asked.",
      conditions: "Detection of genetic material alone does not necessarily show that an organism is alive or caused symptoms. For genome editing, consider off-target changes, mosaicism, delivery to the intended cells and the distinction between somatic and heritable changes.",
      sources: [["OpenStax Biology: biotechnology", "https://openstax.org/books/biology-2e/pages/17-1-biotechnology"], SOURCES.biology[6]],
    };
    return {
      fact: "Cells share core features—plasma membrane, cytoplasm, DNA and ribosomes—but structures vary by organism and cell type. Biological macromolecules include carbohydrates, lipids, proteins and nucleic acids; not all are polymers of repeating identical subunits.",
      conditions: "A microscope image depends on resolution, preparation and contrast. Electron microscopy reveals fine structures but requires non-living prepared samples; light microscopy can observe living specimens at lower resolution.",
      sources: [["OpenStax Biology: studying cells", "https://openstax.org/books/biology-2e/pages/4-1-studying-cells"], ["OpenStax Biology: biological molecules", "https://openstax.org/books/concepts-biology/pages/2-3-biological-molecules"]],
    };
  }
  if (domain === "nepali") {
    if (/bhasha|vyakaran/.test(stem)) return {
      fact: "Grammar describes patterns in how speakers form words and sentences; language also varies with region, community, register and purpose. A standard written convention is useful in formal contexts, while variation is not automatically a grammatical failure.",
      conditions: "Apply a grammar rule to the specific construction and register under study. Separate a descriptive claim about actual usage from a prescriptive rule for a particular school-writing task, and verify technical labels with Nepali-specific references.",
      sources: [["UC Santa Barbara: Nepali linguistics resources", "https://www.linguistics.ucsb.edu/research/santa-barbara-papers-linguistics"], ["University of Wisconsin–Madison: Nepali language resources", "https://wisc.pb.unizin.org/lctlresources/chapter/nepali-language-resources/"]],
    };
    if (/lekhan/.test(stem)) return {
      fact: "Effective writing aligns purpose, audience, genre and evidence. A clear claim supported by relevant details and an organized structure helps readers follow the reasoning; revision improves meaning as well as correctness.",
      conditions: "Register and conventions depend on the task: an application, essay, report and personal narrative have different audiences and structures. Do not treat one template as universal; check prompt constraints, intended readers and the prescribed Nepali conventions.",
      sources: [["NCTE: teaching writing", "https://ncte.org/statement/teaching-writing/"], ["WWC: teaching secondary students to write effectively", "https://ies.ed.gov/ncee/wwc/practiceguide/22"]],
    };
    return {
      fact: "A poem, story or performance can support multiple interpretations when its words, form and context leave meaningful ambiguity. Nepali poetic metre and rhythm are connected to particular linguistic and performance traditions.",
      conditions: "Separate original Nepali wording from a translator’s choices. Identify metre from the poem and relevant tradition rather than importing English stress-based scansion; cite lines and acknowledge evidence that complicates an interpretation.",
      sources: [SOURCES.language[4], SOURCES.language[5]],
    };
  }
  if (/grammar|language-and-grammar|vocabulary/.test(stem)) return {
    fact: "Grammar describes how forms combine to create meaning, while vocabulary choice reflects register, audience and context. Writers can use the same language flexibly across formal, conversational and creative settings.",
    conditions: "Distinguish a task-specific standard convention from a universal rule. Examples should preserve their context, and a dictionary definition alone may not capture a word’s tone, connotation or pragmatic use.",
    sources: [["Purdue OWL: rhetorical situation", "https://owl.purdue.edu/owl/general_writing/academic_writing/rhetorical_situation/elements_of_rhetorical_situations.html"], ["NCTE: teaching writing", "https://ncte.org/statement/teaching-writing/"]],
  };
  if (/writing|reading-and-comprehension/.test(stem)) return {
    fact: "Strong writing and reading use evidence purposefully: a claim should be traceable to textual or factual support, and an explanation should show how that evidence answers the task. Audience and purpose shape structure and register.",
    conditions: "For reading, distinguish what a passage states from inference; for writing, follow the requested genre, audience and word limits. Do not infer an author’s intention or treat a single interpretation as certain without supporting evidence.",
    sources: [["UW–Madison: close reading", "https://writing.wisc.edu/handbook/academicwriting/closereading/"], ["WWC: teaching secondary students to write effectively", "https://ies.ed.gov/ncee/wwc/practiceguide/22"]],
  };
  return {
    fact: "Close reading builds an interpretation from precise details—word choice, syntax, imagery, sound, form and structure. A label such as ‘metaphor’ or ‘alliteration’ is only a starting observation; explain its effect in this particular passage.",
    conditions: "Support claims with accurate, located evidence and distinguish observation from interpretation. When two readings fit, explain evidence for each and acknowledge counterevidence; do not state authorial intention as fact without a source.",
    sources: [SOURCES.language[0], SOURCES.language[1], SOURCES.language[3]],
  };
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function sectionFor(stem, domain) {
  const title = topicTitle(stem);
  const model = modelFor(domain, stem);
  const frontier = frontierFor(domain, stem);
  const sources = [...new Map([...model.sources, [frontier.label, frontier.url]].map(([label, url]) => [url, [label, url]])).values()];
  const question = domain === "english" || domain === "nepali"
    ? `In “${title}”, which two interpretations can the exact wording support, and what detail complicates each? Record the line or passage; leave the issue open if the text does not decide it.`
    : `For “${title}”, identify one assumption in the model, explain what observation would test it, and state what evidence could distinguish the accepted account from the open question “${frontier.title}”.`;
  const links = sources.map(([label, url]) => `<li><a href="${esc(url)}">${esc(label)}</a></li>`).join("");
  return `${START}<section class="academic-extension" aria-labelledby="academic-extension-title"><h2 id="academic-extension-title">Academic Extension: Evidence, Conditions &amp; Open Questions</h2><p><b>Topic bridge — ${esc(title)}.</b> Use this extension to connect the topic’s core material with deeper academic inquiry: state a claim, name the conditions under which it holds, and distinguish established knowledge from an open research or interpretive question.</p><h3>Established academic fact</h3><p>${esc(model.fact)}</p><h3>Conditions, assumptions &amp; limits</h3><p>${esc(model.conditions)}</p><h3>Open research question — ${esc(frontier.title)}</h3><p>${esc(frontier.detail)}</p><h3>Inquiry prompt</h3><p>${esc(question)}</p><h3>Further reading</h3><ul>${links}</ul><p><small>Curriculum note: the research question is an enrichment extension, not a claim that the established school-level model is invalid. Check the prescribed NEB text and syllabus for examinable scope.</small></p></section>${END}`;
}

function replaceSection(html, section, file) {
  const startCount = html.split(START).length - 1;
  const endCount = html.split(END).length - 1;
  if (startCount !== endCount || startCount > 1) throw new Error(`Invalid or duplicate academic-extension markers in ${file}`);
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start !== -1 && end < start) throw new Error(`Reversed academic-extension markers in ${file}`);
  if (start !== -1) html = html.slice(0, start) + html.slice(end + END.length);
  const closing = html.toLowerCase().lastIndexOf("</body>");
  if (closing === -1) throw new Error(`Missing </body> in ${file}`);
  return html.slice(0, closing) + section + html.slice(closing);
}

const resourceNames = fs.readdirSync(RESOURCE_DIR);
const htmlFiles = resourceNames.filter((name) => name.endsWith(".html")).sort();
const docStems = new Set(resourceNames.filter((name) => name.endsWith(".doc")).map((name) => path.basename(name, ".doc")));
if (htmlFiles.length === 0) throw new Error(`No HTML resources found in ${RESOURCE_DIR}`);
for (const stem of docStems) {
  if (!htmlFiles.includes(`${stem}.html`)) throw new Error(`Orphan Word-compatible document without HTML pair: ${stem}.doc`);
}
const checkOnly = process.argv.includes("--check");
let changed = 0;
for (const htmlName of htmlFiles) {
  const stem = path.basename(htmlName, ".html");
  const domain = chooseDomain(stem);
  const docName = `${stem}.doc`;
  const htmlPath = path.join(RESOURCE_DIR, htmlName);
  const docPath = path.join(RESOURCE_DIR, docName);
  if (!docStems.has(stem)) throw new Error(`Missing paired Word-compatible document: ${docName}`);
  const section = sectionFor(stem, domain);
  let referenceSection;
  for (const file of [htmlPath, docPath]) {
    const original = fs.readFileSync(file, "utf8");
    const updated = replaceSection(original, section, file);
    if (checkOnly) {
      if (updated !== original) throw new Error(`Academic extension is missing or outdated: ${file}`);
      const start = original.indexOf(START);
      const end = original.indexOf(END);
      const embedded = original.slice(start, end + END.length);
      if (referenceSection !== undefined && embedded !== referenceSection) throw new Error(`Paired .doc/.html extensions differ for ${stem}`);
      referenceSection = embedded;
    } else if (updated !== original) {
      fs.writeFileSync(file, updated, "utf8");
      changed++;
    }
  }
}
console.log(checkOnly
  ? `Validated academic extensions for all ${htmlFiles.length} paired resource topics.`
  : `Enriched ${htmlFiles.length} resource topics (${changed} paired .html/.doc files).`);
