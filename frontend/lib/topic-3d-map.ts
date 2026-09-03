"use client";

import React from "react";
import { ChapterAnimation } from "@/components/lab/chapter-animation";
import { StraightLineVisual } from "@/components/lab/topic-visuals/straight-line";
import { CoordinatesSpaceVisual } from "@/components/lab/topic-visuals/coordinates-space";
import { VectorOperationsVisual } from "@/components/lab/topic-visuals/vector-operations";
import { VectorAddition3DVisual } from "@/components/lab/topic-visuals/vector-addition-3d";
import { VectorScalar3DVisual } from "@/components/lab/topic-visuals/vector-scalar-3d";
import { VectorDot3DVisual } from "@/components/lab/topic-visuals/vector-dot-3d";
import { VectorCross3DVisual } from "@/components/lab/topic-visuals/vector-cross-3d";
import { VectorTriple3DVisual } from "@/components/lab/topic-visuals/vector-triple-3d";
import { VectorCollinear3DVisual } from "@/components/lab/topic-visuals/vector-collinear-3d";
import { VectorCoplanar3DVisual } from "@/components/lab/topic-visuals/vector-coplanar-3d";
import { VectorScalarQuantities3DVisual } from "@/components/lab/topic-visuals/vector-scalar-quantities-3d";
import { VectorAlgebra3DVisual } from "@/components/lab/topic-visuals/vector-algebra-3d";
import { VectorApplications3DVisual } from "@/components/lab/topic-visuals/vector-applications-3d";
import { LimitsConcept3D } from "@/components/lab/topic-visuals/limits-concept-3d";
import { LimitsStandard3D } from "@/components/lab/topic-visuals/limits-standard-3d";
import { LimitsIndeterminate3D } from "@/components/lab/topic-visuals/limits-indeterminate-3d";
import { Continuity3D } from "@/components/lab/topic-visuals/continuity-3d";
import { DerivativeGeometric3D } from "@/components/lab/topic-visuals/derivative-geometric-3d";
import { DerivativeRules3D } from "@/components/lab/topic-visuals/derivative-rules-3d";
import { DerivativeParametric3D } from "@/components/lab/topic-visuals/derivative-parametric-3d";
import { DerivativeHigher3D } from "@/components/lab/topic-visuals/derivative-higher-3d";
import { DerivativeLogarithmic3D } from "@/components/lab/topic-visuals/derivative-logarithmic-3d";
import { Differentiability3D } from "@/components/lab/topic-visuals/differentiability-3d";
import { IonicBondVisual } from "@/components/lab/topic-visuals/chemical-bond-ionic-3d";
import { CovalentBondVisual } from "@/components/lab/topic-visuals/chemical-bond-covalent-3d";
import { LewisDotVisual } from "@/components/lab/topic-visuals/chemical-bond-lewis-3d";
import { VSEPRVisual } from "@/components/lab/topic-visuals/chemical-bond-vsepr-3d";
import { HybridizationVisual } from "@/components/lab/topic-visuals/chemical-bond-hybridization-3d";
import { ResonanceVisual } from "@/components/lab/topic-visuals/chemical-bond-resonance-3d";
import { BondCharacteristicsVisual } from "@/components/lab/topic-visuals/chemical-bond-characteristics-3d";
import { MetallicBondVisual } from "@/components/lab/topic-visuals/chemical-bond-metallic-3d";
import { VanderWaalsVisual } from "@/components/lab/topic-visuals/chemical-bond-vdw-3d";
import { VBTVisual } from "@/components/lab/topic-visuals/chemical-bond-vbt-3d";
import { OpticsReflection3d } from "@/components/lab/topic-visuals/optics-reflection-3d";
import { OpticsRefraction3d } from "@/components/lab/topic-visuals/optics-refraction-3d";
import { OpticsTIR3d } from "@/components/lab/topic-visuals/optics-tir-3d";
import { OpticsLens3d } from "@/components/lab/topic-visuals/optics-lens-3d";
import { OpticsPrism3d } from "@/components/lab/topic-visuals/optics-prism-3d";
import { OpticsDispersion3d } from "@/components/lab/topic-visuals/optics-dispersion-3d";
import { OpticsPower3d } from "@/components/lab/topic-visuals/optics-power-3d";
import { OpticsLensMaker3d } from "@/components/lab/topic-visuals/optics-lens-maker-3d";
import { OpticsTelescope3d } from "@/components/lab/topic-visuals/optics-telescope-3d";
import { OpticsMicroscope3d } from "@/components/lab/topic-visuals/optics-microscope-3d";
import { LimitsContinuityVisual } from "@/components/lab/topic-visuals/limits-continuity";
import { DerivativeVisual } from "@/components/lab/topic-visuals/derivative-visual";
import { IntegralAreaVisual } from "@/components/lab/topic-visuals/integral-area";
import { ComplexQuadraticVisual } from "@/components/lab/topic-visuals/complex-quadratic";
import { ProjectileMotionVisual } from "@/components/lab/topic-visuals/projectile-motion-3d";
import { SHMVisual } from "@/components/lab/topic-visuals/shm-spring-3d";
import { CircularMotionVisual } from "@/components/lab/topic-visuals/circular-motion-3d";
import { GravitationVisual } from "@/components/lab/topic-visuals/gravitation-orbit-3d";
import { CapacitorVisual } from "@/components/lab/topic-visuals/capacitor-3d";
import { DCCircuitsVisual } from "@/components/lab/topic-visuals/dc-circuits-3d";
import { NuclearPhysicsVisual } from "@/components/lab/topic-visuals/nuclear-physics-3d";
import { ElectricFieldVisual } from "@/components/lab/topic-visuals/electric-field-3d";
import { OpticsVisual } from "@/components/lab/topic-visuals/optics-ray-3d";
import { WaveOpticsVisual } from "@/components/lab/topic-visuals/wave-optics-3d";
import { EMIInductionVisual } from "@/components/lab/topic-visuals/emi-induction-3d";
import { ACcircuitsVisual } from "@/components/lab/topic-visuals/ac-circuits-3d";
import { SemiconductorsVisual } from "@/components/lab/topic-visuals/semiconductors-3d";
import { CoulombsLawVisual } from "@/components/lab/topic-visuals/coulombs-law-3d";
import { GaussLawVisual } from "@/components/lab/topic-visuals/gauss-law-3d";
import { OhmsLawVisual } from "@/components/lab/topic-visuals/ohms-law-3d";
import { KirchhoffsLawsVisual } from "@/components/lab/topic-visuals/kirchhoffs-laws-3d";
import { BiotSavartVisual } from "@/components/lab/topic-visuals/biot-savart-3d";
import { CellBiologyVisual } from "@/components/lab/topic-visuals/cell-biology";
import { CellDivisionVisual } from "@/components/lab/topic-visuals/cell-division";
import { FiveKingdomVisual } from "@/components/lab/topic-visuals/five-kingdom";
import { FungiVisual } from "@/components/lab/topic-visuals/fungi";
import { AlgaeVisual } from "@/components/lab/topic-visuals/algae";
import { BryophytaVisual } from "@/components/lab/topic-visuals/bryophyta";
import { PteridophytaVisual } from "@/components/lab/topic-visuals/pteridophyta";
import { GymnospermVisual } from "@/components/lab/topic-visuals/gymnosperm";
import { AngiospermVisual } from "@/components/lab/topic-visuals/angiosperm";
import { ProtozoaVisual } from "@/components/lab/topic-visuals/protozoa";
import { EarthwormVisual } from "@/components/lab/topic-visuals/earthworm";
import { FrogVisual } from "@/components/lab/topic-visuals/frog";
import { EcosystemVisual } from "@/components/lab/topic-visuals/ecosystem";
import { BiogeochemicalCyclesVisual } from "@/components/lab/topic-visuals/biogeochemical-cycles";
import { EvolutionVisual } from "@/components/lab/topic-visuals/evolution";
import { HumanEvolutionVisual } from "@/components/lab/topic-visuals/human-evolution";
import { DNAStructureVisual } from "@/components/lab/topic-visuals/dnastucture";
import { MendelsLawsVisual } from "@/components/lab/topic-visuals/mendels-laws";
import { ImmuneSystemVisual } from "@/components/lab/topic-visuals/immune-system";
import { PCRVisual } from "@/components/lab/topic-visuals/pcr";
import { RestrictionEnzymeVisual } from "@/components/lab/topic-visuals/restriction-enzyme";
import { LenzLawVisual } from "@/components/lab/topic-visuals/lenz-law-3d";
import { PhotoelectricEffectVisual } from "@/components/lab/topic-visuals/photoelectric-effect-3d";
import { BohrModelVisual } from "@/components/lab/topic-visuals/bohr-model-3d";
import { NuclearFissionVisual } from "@/components/lab/topic-visuals/nuclear-fission-3d";
import { WaveMotionVisual } from "@/components/lab/topic-visuals/wave-motion-3d";
import { AtomicStructureVisual } from "@/components/lab/topic-visuals/atomic-structure";
import { PeriodicTableVisual } from "@/components/lab/topic-visuals/periodic-trends";
import { ChemicalBondingVisual } from "@/components/lab/topic-visuals/chemical-bonding";
import { GasLawsVisual } from "@/components/lab/topic-visuals/gas-laws";
import { EquilibriumVisual } from "@/components/lab/topic-visuals/equilibrium";
import { CrystalLatticeVisual } from "@/components/lab/topic-visuals/crystal-lattice";
import { ElectrolysisVisual } from "@/components/lab/topic-visuals/electrolysis";
import { OrganicMoleculesVisual } from "@/components/lab/topic-visuals/organic-molecules";
import { BenzeneRingVisual } from "@/components/lab/topic-visuals/benzene-ring";
import { RaoultLawVisual } from "@/components/lab/topic-visuals/raoult-law";
import { GalvanicCellVisual } from "@/components/lab/topic-visuals/galvanic-cell";
import { ReactionKineticsVisual } from "@/components/lab/topic-visuals/reaction-kinetics";
import { ArrheniusEquationVisual } from "@/components/lab/topic-visuals/arrhenius-equation";
import { ProteinStructureVisual } from "@/components/lab/topic-visuals/protein-structure";
import { CoordinationCompoundsVisual } from "@/components/lab/topic-visuals/coordination-compounds";
import { LogicSetVisual } from "@/components/lab/topic-visuals/logic-set";
import { RealNumbersVisual } from "@/components/lab/topic-visuals/real-numbers";
import { FunctionVisual } from "@/components/lab/topic-visuals/function-graphs";
import { CurveSketchingVisual } from "@/components/lab/topic-visuals/curve-sketching";
import { SequenceSeriesVisual } from "@/components/lab/topic-visuals/sequence-series";
import { MatricesDeterminantsVisual } from "@/components/lab/topic-visuals/matrices-determinants";
import { InverseTrigVisual } from "@/components/lab/topic-visuals/inverse-trig";
import { TrigEquationsVisual } from "@/components/lab/topic-visuals/trigonometric-eq";
import { MeasureDispersionVisual } from "@/components/lab/topic-visuals/measure-dispersion";
import { ProbabilityBasicVisual } from "@/components/lab/topic-visuals/probability-basic";
import { NumericalComputationVisual } from "@/components/lab/topic-visuals/numerical-computation";
import { NumericalIntegrationVisual } from "@/components/lab/topic-visuals/numerical-integration";
import { StaticsVisual } from "@/components/lab/topic-visuals/statics";
import { DynamicsVisual } from "@/components/lab/topic-visuals/dynamics";
import { FormationDEVisual } from "@/components/lab/topic-visuals/formation-de";
import { VariableSeparableDEVisual } from "@/components/lab/topic-visuals/variable-separable-de";
import { GrowthDecayDEVisual } from "@/components/lab/topic-visuals/growth-decay";
import { LPPFormulationVisual } from "@/components/lab/topic-visuals/lpp-formulation";
import { LPPGraphicalVisual } from "@/components/lab/topic-visuals/lpp-graphical";
import { ConditionalProbabilityVisual } from "@/components/lab/topic-visuals/conditional-prob";
import { IndependentEventsVisual } from "@/components/lab/topic-visuals/independent-events";
import { BayesTheoremVisual } from "@/components/lab/topic-visuals/bayes-theorem";
import { RandomVariableVisual } from "@/components/lab/topic-visuals/random-variable";
import { MeanVarianceVisual } from "@/components/lab/topic-visuals/mean-variance";
import { BinomialDistVisual } from "@/components/lab/topic-visuals/binomial-dist";
import { PoissonDistVisual } from "@/components/lab/topic-visuals/poisson-dist";

type LabComponentMap = Record<string, () => React.ReactNode>;

const make = (slug: string, title: string, unit?: string, subject?: string) => {
  const TopicLab = () =>
    React.createElement(ChapterAnimation, { topicSlug: slug, topicTitle: title, unitSlug: unit, subjectSlug: subject });
  TopicLab.displayName = `TopicLab(${slug})`;
  return TopicLab;
};

/** Create a topic-specific 3D visual component. */
const makeTopic = (Component: React.FC, title: string) => {
  const TopicLab = () => React.createElement(Component);
  TopicLab.displayName = `TopicLab(${title})`;
  return TopicLab;
};

const PHYSICS_11: LabComponentMap = {
  // Physical Quantities and Measurement
  "physical-quantities": make("physical-quantities", "Physical Quantities", "physical-quantities", "physics"),
  "precision-and-significant-figures": make("precision", "Precision and Significant Figures", "physical-quantities", "physics"),
  "dimensions-and-uses-of-dimensional-analysis": make("dimensions", "Dimensions and Dimensional Analysis", "physical-quantities", "physics"),

  // Vectors
  "vectors": make("vectors", "Vectors", "vectors", "physics"),
  "triangle-parallelogram-and-polygon-laws-of-vectors": make("triangle", "Triangle Parallelogram Polygon Laws", "vectors", "physics"),
  "resolution-of-vectors-unit-vectors": make("resolution", "Resolution of Vectors", "vectors", "physics"),
  "scalar-and-vector-products": make("dot product", "Scalar and Vector Products", "vectors", "physics"),

  // Kinematics
  "kinematics": make("kinematics", "Kinematics", "kinematics", "physics"),
  "instantaneous-velocity-and-acceleration": make("instantaneous velocity", "Instantaneous Velocity & Acceleration", "kinematics", "physics"),
  "relative-velocity": make("relative velocity", "Relative Velocity", "kinematics", "physics"),
  "equation-of-motion-graphical-treatment": make("equation of motion", "Equation of Motion", "kinematics", "physics"),
  "motion-of-a-freely-falling-body": make("freely falling", "Freely Falling Body", "kinematics", "physics"),
  "projectile-motion-and-its-applications": makeTopic(ProjectileMotionVisual, "Projectile Motion"),
  "dynamics": make("dynamics", "Dynamics", "dynamics", "physics"),
  "linear-momentum-impulse": make("momentum", "Linear Momentum and Impulse", "dynamics", "physics"),
  "conservation-of-linear-momentum": make("momentum", "Conservation of Linear Momentum", "dynamics", "physics"),
  "application-of-newtons-laws": make("newton", "Application of Newton's Laws", "dynamics", "physics"),
  "moment-torque-and-equilibrium": make("torque", "Moment, Torque & Equilibrium", "dynamics", "physics"),
  "solid-friction-laws-of-solid-friction-and-their-verifications": make("friction", "Solid Friction", "dynamics", "physics"),
  "work-energy-and-power": make("work", "Work, Energy and Power", "work-energy-and-power", "physics"),
  "work-done-by-a-constant-force-and-a-variable-force": make("work", "Work Done", "work-energy-and-power", "physics"),
  "power": make("power", "Power", "work-energy-and-power", "physics"),
  "work-energy-theorem-kinetic-and-potential-energy": make("kinetic energy", "Work-Energy Theorem", "work-energy-and-power", "physics"),
  "conservation-of-energy": make("conservation of energy", "Conservation of Energy", "work-energy-and-power", "physics"),
  "conservative-and-non-conservative-forces": make("conservative", "Conservative Forces", "work-energy-and-power", "physics"),
  "elastic-and-inelastic-collisions": make("elastic collision", "Elastic and Inelastic Collisions", "work-energy-and-power", "physics"),
  "circular-motion": makeTopic(CircularMotionVisual, "Circular Motion"),
  "angular-displacement-velocity-and-acceleration": makeTopic(CircularMotionVisual, "Angular Motion"),
  "relation-between-angular-and-linear-velocity-and-acceleration": makeTopic(CircularMotionVisual, "Angular vs Linear"),
  "centripetal-acceleration-and-centripetal-force": makeTopic(CircularMotionVisual, "Centripetal Force"),
  "conical-pendulum": make("conical pendulum", "Conical Pendulum", "circular-motion", "physics"),
  "motion-in-a-vertical-circle": make("vertical circle", "Motion in Vertical Circle", "circular-motion", "physics"),
  "applications-of-banking": make("banking", "Banking of Roads", "circular-motion", "physics"),
  "gravitation": makeTopic(GravitationVisual, "Gravitation"),
  "newtons-law-of-gravitation": makeTopic(GravitationVisual, "Newton's Law of Gravitation"),
  "gravitational-field-strength": makeTopic(GravitationVisual, "Gravitational Field"),
  "gravitational-potential-gravitational-potential-energy": makeTopic(GravitationVisual, "Gravitational Potential"),
  "variation-in-value-of-g-due-to-altitude-and-depth": make("altitude", "Variation of g", "gravitation", "physics"),
  "centre-of-mass-and-centre-of-gravity": make("centre of mass", "Centre of Mass", "gravitation", "physics"),
  "motion-of-a-satellite-orbital-velocity-and-time-period-of-the-satellite": makeTopic(GravitationVisual, "Satellite Motion"),
  "escape-velocity": make("escape velocity", "Escape Velocity", "gravitation", "physics"),
  "potential-and-kinetic-energy-of-the-satellite": make("satellite", "Satellite Energy", "gravitation", "physics"),
  "geostationary-satellite": make("geostationary", "Geostationary Satellite", "gravitation", "physics"),
  "gps": make("satellite", "GPS", "gravitation", "physics"),
  "elasticity": make("elastic", "Elasticity", "elasticity", "physics"),
  "hookes-law-force-constant": makeTopic(SHMVisual, "Hooke's Law & SHM"),
  "shm-and-elastic-potential-energy": makeTopic(SHMVisual, "Simple Harmonic Motion"),
  "stress-strain-elasticity-and-plasticity": make("stress", "Stress & Strain", "elasticity", "physics"),
  "elastic-modulus-young-modulus-bulk-modulus-shear-modulus": make("young", "Elastic Modulus", "elasticity", "physics"),
  "poissons-ratio": make("poisson", "Poisson's Ratio", "elasticity", "physics"),
  "elastic-potential-energy": make("elastic potential", "Elastic Potential Energy", "elasticity", "physics"),
  "heat-and-temperature": make("heat", "Heat and Temperature", "heat-and-temperature", "physics"),
  "molecular-concept-of-thermal-energy-heat-and-temperature-cause-and-direction-of-heat-flow": make("thermal", "Thermal Energy", "heat-and-temperature", "physics"),
  "meaning-of-thermal-equilibrium-and-zeroth-law-of-thermodynamics": make("zeroth law", "Zeroth Law", "heat-and-temperature", "physics"),
  "thermal-equilibrium-as-a-working-principle-of-a-mercury-thermometer": make("mercury thermometer", "Mercury Thermometer", "heat-and-temperature", "physics"),
  "thermal-expansion": make("thermal expansion", "Thermal Expansion", "thermal-expansion", "physics"),
  "linear-expansion-and-its-measurement": make("linear expansion", "Linear Expansion", "thermal-expansion", "physics"),
  "cubical-expansion-superficial-expansion-and-their-relation-with-linear-expansion": make("cubical expansion", "Cubical Expansion", "thermal-expansion", "physics"),
  "liquid-expansion-absolute-and-apparent": make("liquid expansion", "Liquid Expansion", "thermal-expansion", "physics"),
  "dulong-and-petit-method-of-determining-expansivity-of-liquid": make("dulong", "Dulong-Petit", "thermal-expansion", "physics"),
  "quantity-of-heat": make("specific heat", "Quantity of Heat", "quantity-of-heat", "physics"),
  "newtons-law-of-cooling": make("newtons law of cooling", "Newton's Law of Cooling", "quantity-of-heat", "physics"),
  "measurement-of-specific-heat-capacity-of-solids-and-liquids": make("specific heat", "Specific Heat Capacity", "quantity-of-heat", "physics"),
  "change-of-phases-latent-heat": make("change of phase", "Change of Phases", "quantity-of-heat", "physics"),
  "specific-latent-heat-of-fusion-and-vaporization": make("specific latent", "Specific Latent Heat", "quantity-of-heat", "physics"),
  "measurement-of-specific-latent-heat-of-fusion-and-vaporization": make("specific latent", "Latent Heat Measurement", "quantity-of-heat", "physics"),
  "triple-point": make("triple point", "Triple Point", "quantity-of-heat", "physics"),
  "rate-of-heat-flow": make("conduction", "Rate of Heat Flow", "rate-of-heat-flow", "physics"),
  "conduction-thermal-conductivity-and-measurement": make("thermal conductivity", "Thermal Conductivity", "rate-of-heat-flow", "physics"),
  "convection": make("convection", "Convection", "rate-of-heat-flow", "physics"),
  "radiation-ideal-radiator": make("radiation", "Radiation", "rate-of-heat-flow", "physics"),
  "black-body-radiation": make("black body", "Black-body Radiation", "rate-of-heat-flow", "physics"),
  "stefan-boltzmann-law": make("stefan", "Stefan-Boltzmann Law", "rate-of-heat-flow", "physics"),
  "ideal-gas": make("ideal gas", "Ideal Gas", "ideal-gas", "physics"),
  "ideal-gas-equation": make("ideal gas", "Ideal Gas Equation", "ideal-gas", "physics"),
  "molecular-properties-of-matter": make("molecular", "Molecular Properties", "ideal-gas", "physics"),
  "kinetic-molecular-model-of-an-ideal-gas": make("kinetic theory", "Kinetic-molecular Model", "ideal-gas", "physics"),
  "derivation-of-pressure-exerted-by-gas": make("kinetic theory", "Pressure Derivation", "ideal-gas", "physics"),
  "average-translational-kinetic-energy-of-gas-molecule": make("kinetic energy", "Translational KE", "ideal-gas", "physics"),
  "boltzmann-constant-root-mean-square-speed": make("boltzmann", "Boltzmann Constant", "ideal-gas", "physics"),
  "heat-capacities-of-gases-and-solids": make("heat capacity", "Heat Capacities", "ideal-gas", "physics"),
  "reflection-at-curved-mirror": makeTopic(OpticsVisual, "Reflection at Curved Mirror"),
  "real-and-virtual-images": makeTopic(OpticsVisual, "Real & Virtual Images"),
  "mirror-formula": makeTopic(OpticsVisual, "Mirror Formula"),
  "refraction-at-plane-surfaces": makeTopic(OpticsVisual, "Refraction at Plane Surfaces"),
  "laws-of-refraction-refractive-index": makeTopic(OpticsVisual, "Laws of Refraction"),
  "relation-between-refractive-indices": make("refraction", "Refractive Indices", "refraction-at-plane-surfaces", "physics"),
  "lateral-shift": make("lateral shift", "Lateral Shift", "refraction-at-plane-surfaces", "physics"),
  "total-internal-reflection": makeTopic(OpticsVisual, "Total Internal Reflection"),
  "refraction-through-prisms": makeTopic(OpticsVisual, "Refraction through Prisms"),
  "minimum-deviation-condition": makeTopic(OpticsVisual, "Minimum Deviation"),
  "relation-between-the-angle-of-prism-minimum-deviation-and-refractive-index": make("prism", "Prism Formula", "refraction-through-prisms", "physics"),
  "deviation-in-small-angle-prism": make("small-angle prism", "Small-Angle Prism", "refraction-through-prisms", "physics"),
  "lenses": makeTopic(OpticsVisual, "Lenses"),
  "spherical-lenses-angular-magnification": makeTopic(OpticsVisual, "Spherical Lenses"),
  "lens-makers-formula": makeTopic(OpticsVisual, "Lens Maker's Formula"),
  "power-of-a-lens": makeTopic(OpticsVisual, "Power of a Lens"),
  "dispersion": makeTopic(WaveOpticsVisual, "Dispersion"),
  "pure-spectrum-and-dispersive-power": make("pure spectrum", "Pure Spectrum", "dispersion", "physics"),
  "chromatic-and-spherical-aberration": make("chromatic", "Aberration", "dispersion", "physics"),
  "achromatism-and-its-applications": make("achromatism", "Achromatism", "dispersion", "physics"),
  "electric-charges": make("electric charge", "Electric Charges", "electric-charges", "physics"),
  "coulombs-law-force-between-two-point-charges": makeTopic(CoulombsLawVisual, "Coulomb's Law"),
  "force-between-multiple-electric-charges": make("coulomb", "Force Between Charges", "electric-charges", "physics"),
  "charging-by-induction": make("induction", "Charging by Induction", "electric-charges", "physics"),
  "electric-field": makeTopic(ElectricFieldVisual, "Electric Field"),
  "electric-field-due-to-point-charges-field-lines": makeTopic(ElectricFieldVisual, "Electric Field Lines"),
  "gauss-law-electric-flux": makeTopic(GaussLawVisual, "Gauss's Law"),
  "application-of-gauss-law-field-of-a-charge-sphere-and-line-charge-and-charged-plane-conductor": make("gauss", "Gauss Applications", "electric-field", "physics"),
  "potential-potential-difference-and-potential-energy": make("potential", "Potential & Potential Energy", "potential-potential-difference-and-potential-energy", "physics"),
  "potential-difference-potential-due-to-a-point-charge-potential-energy-electron-volt": make("potential", "Potential Difference", "potential-potential-difference-and-potential-energy", "physics"),
  "equipotential-lines-and-surfaces": make("equipotential", "Equipotential Surfaces", "potential-potential-difference-and-potential-energy", "physics"),
  "potential-gradient": make("potential gradient", "Potential Gradient", "potential-potential-difference-and-potential-energy", "physics"),
  "capacitor": makeTopic(CapacitorVisual, "Capacitor"),
  "capacitance-and-capacitor": makeTopic(CapacitorVisual, "Capacitance & Capacitor"),
  "parallel-plate-capacitor": makeTopic(CapacitorVisual, "Parallel Plate Capacitor"),
  "combination-of-capacitors": make("capacit", "Combination of Capacitors", "capacitor", "physics"),
  "energy-of-a-charged-capacitor": make("capacit", "Energy of a Capacitor", "capacitor", "physics"),
  "effect-of-a-dielectric-polarization-and-displacement": make("dielectric", "Dielectric", "capacitor", "physics"),
  "dc-circuits": makeTopic(DCCircuitsVisual, "DC Circuits"),
  "electric-currents-drift-velocity-and-its-relation-with-current": makeTopic(DCCircuitsVisual, "Drift Velocity"),
  "ohms-law-electrical-resistance-resistivity-conductivity": makeTopic(DCCircuitsVisual, "Ohm's Law"),
  "current-voltage-relations-ohmic-and-non-ohmic-resistance": make("ohmic", "Ohmic and Non-ohmic", "dc-circuits", "physics"),
  "resistances-in-series-and-parallel": make("series and parallel", "Series & Parallel", "dc-circuits", "physics"),
  "potential-divider": make("potential divider", "Potential Divider", "dc-circuits", "physics"),
  "electromotive-force-of-a-source-internal-resistance": make("emf", "EMF & Internal Resistance", "dc-circuits", "physics"),
  "work-and-power-in-electrical-circuits": make("power", "Work & Power in Circuits", "dc-circuits", "physics"),
  "nuclear-physics": makeTopic(NuclearPhysicsVisual, "Nuclear Physics"),
  "nucleus-discovery-of-nucleus": makeTopic(NuclearPhysicsVisual, "Discovery of Nucleus"),
  "nuclear-density-mass-number-atomic-number": make("nuclear", "Nuclear Density", "nuclear-physics", "physics"),
  "atomic-mass-isotopes": make("isotope", "Atomic Mass & Isotopes", "nuclear-physics", "physics"),
  "einsteins-mass-energy-relation": make("einstein", "Einstein's Mass-Energy Relation", "nuclear-physics", "physics"),
  "mass-defect-packing-factor-binding-energy-per-nucleon": make("binding energy", "Mass Defect", "nuclear-physics", "physics"),
  "creation-and-annihilation": make("creation", "Creation & Annihilation", "nuclear-physics", "physics"),
  "nuclear-fission-and-fusion": makeTopic(NuclearFissionVisual, "Nuclear Fission & Fusion"),
  "solids": makeTopic(SemiconductorsVisual, "Solids"),
  "energy-bands-in-solids-qualitative-ideas": makeTopic(SemiconductorsVisual, "Energy Bands"),
  "intrinsic-and-extrinsic-semiconductors": makeTopic(SemiconductorsVisual, "Semiconductors"),
  "recent-trends-in-physics": make("particle", "Recent Trends in Physics", "recent-trends-in-physics", "physics"),
  "particle-physics-particles-and-antiparticles-quarks-baryons-and-mesons-and-leptons-neutrinos": make("quark", "Particle Physics", "recent-trends-in-physics", "physics"),
  "universe-big-bang-and-hubble-law-expansion-of-the-universe": make("big bang", "Big Bang & Hubble", "recent-trends-in-physics", "physics"),
  "dark-matter-black-hole-and-gravitational-wave": make("dark matter", "Dark Matter & Black Holes", "recent-trends-in-physics", "physics"),
  "application-of-gauss-law-field-of-a-charge-sphere-line-charge-charged-plane-conductor": makeTopic(GaussLawVisual, "Applications of Gauss's Law"),
  "energy-of-charged-capacitor": makeTopic(CapacitorVisual, "Energy of a Charged Capacitor"),
};

export { PHYSICS_11 };
const CHEMISTRY_11: LabComponentMap = {
  "foundation-and-fundamentals": make("atom", "Foundation & Fundamentals", "foundation-and-fundamentals", "chemistry"),
  "general-introduction-of-chemistry": make("atom", "General Introduction", "foundation-and-fundamentals", "chemistry"),
  "importance-and-scope-of-chemistry": make("atom", "Scope of Chemistry", "foundation-and-fundamentals", "chemistry"),
  "basic-concepts-of-chemistry-atoms-molecules-relative-masses-of-atoms-and-molecules-atomic-mass-unit-amu-radicals-molecular-formula-empirical-formula": make("atom", "Basic Concepts", "foundation-and-fundamentals", "chemistry"),
  "percentage-composition-from-molecular-formula": make("molecular formula", "Percentage Composition", "foundation-and-fundamentals", "chemistry"),
  "stoichiometry": make("stoichi", "Stoichiometry", "stoichiometry", "chemistry"),
  "daltons-atomic-theory-and-its-postulates": make("dalton", "Dalton's Atomic Theory", "stoichiometry", "chemistry"),
  "laws-of-stoichiometry": make("law of conservation", "Laws of Stoichiometry", "stoichiometry", "chemistry"),
  "avogadros-law-and-some-deductions-molecular-mass-and-vapour-density-molecular-mass-and-volume-of-gas-molecular-mass-and-number-of-particles": make("avogadro", "Avogadro's Law", "stoichiometry", "chemistry"),
  "mole-and-its-relation-with-mass-volume-and-number-of-particles": make("mole", "Mole Concept", "stoichiometry", "chemistry"),
  "calculations-based-on-mole-concept": make("mole", "Mole Calculations", "stoichiometry", "chemistry"),
  "limiting-reactant-and-excess-reactant": make("limiting reactant", "Limiting Reactant", "stoichiometry", "chemistry"),
  "theoretical-yield-experimental-yield-and-yield": make("yield", "Yields", "stoichiometry", "chemistry"),
  "calculation-of-empirical-and-molecular-formula-from-composition-solving-related-numerical-problems": make("empirical formula", "Empirical & Molecular Formula", "stoichiometry", "chemistry"),
  "atomic-structure": makeTopic(AtomicStructureVisual, "Atomic Structure"),
  "rutherfords-atomic-model-and-its-limitations": makeTopic(AtomicStructureVisual, "Rutherford's Model"),
  "postulates-of-bohrs-atomic-model-and-its-application": makeTopic(AtomicStructureVisual, "Bohr's Model"),
  "spectrum-of-hydrogen-atom": makeTopic(AtomicStructureVisual, "Hydrogen Spectrum"),
  "defects-of-bohrs-theory": makeTopic(AtomicStructureVisual, "Defects of Bohr's Theory"),
  "elementary-idea-of-quantum-mechanical-model-de-broglies-wave-equation": makeTopic(AtomicStructureVisual, "Quantum Mechanical Model"),
  "heisenbergs-uncertainty-principle-and-concept-of-probability": makeTopic(AtomicStructureVisual, "Uncertainty Principle"),
  "quantum-numbers": makeTopic(AtomicStructureVisual, "Quantum Numbers"),
  "orbitals-and-shape-of-s-and-p-orbitals-only": makeTopic(AtomicStructureVisual, "Orbitals"),
  "aufbau-principle-paulis-exclusion-principle-hunds-rule-and-electronic-configurations-of-atoms-and-ions-up-to-atomic-no-30": makeTopic(AtomicStructureVisual, "Aufbau Principle"),
  "classification-of-elements-and-periodic-table": makeTopic(PeriodicTableVisual, "Periodic Table"),
  "modern-periodic-law-and-modern-periodic-table": makeTopic(PeriodicTableVisual, "Modern Periodic Law"),
  "classification-of-elements-into-different-groups-periods-and-blocks": makeTopic(PeriodicTableVisual, "Groups Periods Blocks"),
  "iupac-classification-of-elements": makeTopic(PeriodicTableVisual, "IUPAC Classification"),
  "nuclear-charge-and-effective-nuclear-charge": makeTopic(PeriodicTableVisual, "Nuclear Charge"),
  "periodic-trend-and-periodicity-atomic-radii-ionic-radii-ionization-energy-electron-affinity-electronegativity-metallic-characters-general-trend-and-explanation-only": makeTopic(PeriodicTableVisual, "Periodic Trends"),
  "chemical-bonding-and-shapes-of-molecules": makeTopic(BondCharacteristicsVisual, "Chemical Bonding"),
  "valence-shell-valence-electron-and-octet-theory": makeTopic(HybridizationVisual, "Octet Theory"),
  "ionic-bond-and-its-properties": makeTopic(IonicBondVisual, "Ionic Bond"),
  "covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds": makeTopic(CovalentBondVisual, "Covalent Bond"),
  "lewis-dot-structure-of-some-common-compounds-of-s-and-p-block-elements": makeTopic(LewisDotVisual, "Lewis Dot Structures"),
  "resonance": makeTopic(ResonanceVisual, "Resonance"),
  "vsepr-theory-and-shapes-of-simple-molecules-bef2-bf3-ch4-ch3cl-pcl5-sf6-h2o-nh3-co2-h2s-ph3": makeTopic(VSEPRVisual, "VSEPR Theory"),
  "elementary-idea-of-valence-bond-theory": makeTopic(VBTVisual, "Valence Bond Theory"),
  "hybridization-involving-s-and-p-orbitals-only": makeTopic(HybridizationVisual, "Hybridization"),
  "bond-characteristics-bond-length-ionic-character-dipole-moment": makeTopic(BondCharacteristicsVisual, "Bond Characteristics"),
  "vander-waals-force-and-molecular-solids-hydrogen-bonding-and-its-application": makeTopic(VanderWaalsVisual, "Vander Waals & H-bond"),
  "metallic-bonding-and-properties-of-metallic-solids": makeTopic(MetallicBondVisual, "Metallic Bonding"),
  "oxidation-and-reduction": make("oxidation", "Oxidation & Reduction", "oxidation-and-reduction", "chemistry"),
  "general-and-electronic-concept-of-oxidation-and-reduction": make("oxidation", "Concepts of Redox", "oxidation-and-reduction", "chemistry"),
  "oxidation-number-and-rules-for-assigning-oxidation-number": make("oxidation number", "Oxidation Number", "oxidation-and-reduction", "chemistry"),
  "balancing-redox-reactions-by-oxidation-number-and-ion-electron-half-reaction-method": make("redox", "Balancing Redox", "oxidation-and-reduction", "chemistry"),
  "electrolysis-qualitative-aspect": makeTopic(ElectrolysisVisual, "Electrolysis Qualitative"),
  "electrolysis-quantitative-aspect-faradays-laws-of-electrolysis": makeTopic(ElectrolysisVisual, "Faraday's Laws"),
  "states-of-matter": makeTopic(GasLawsVisual, "States of Matter"),
  "gaseous-state-kinetic-theory-of-gas-and-its-postulates": makeTopic(GasLawsVisual, "Kinetic Theory"),
  "gas-laws-boyles-law-charles-law-avogadros-law-combined-gas-equation-daltons-law-of-partial-pressure-grahams-law-of-diffusion": makeTopic(GasLawsVisual, "Gas Laws"),
  "ideal-gas-and-ideal-gas-equation-universal-gas-constant-and-its-significance": makeTopic(GasLawsVisual, "Ideal Gas Equation"),
  "deviation-of-real-gas-from-ideality-solving-related-numerical-problems-based-on-gas-laws": makeTopic(GasLawsVisual, "Real Gas Deviation"),
  "liquid-state-physical-properties-of-liquids-evaporation-and-condensation-vapour-pressure-and-boiling-point-surface-tension-and-viscosity-qualitative-idea-only": makeTopic(GasLawsVisual, "Liquid Properties"),
  "liquid-crystals-and-their-applications": makeTopic(GasLawsVisual, "Liquid Crystals"),
  "solid-state-types-of-solids-amorphous-and-crystalline-solids": makeTopic(CrystalLatticeVisual, "Amorphous & Crystalline"),
  "efflorescent-deliquescent-and-hygroscopic-solids-crystallization-and-crystal-growth-water-of-crystallization": makeTopic(CrystalLatticeVisual, "Crystallization"),
  "introduction-to-unit-crystal-lattice-and-unit-cell": makeTopic(CrystalLatticeVisual, "Crystal Lattice"),
  "chemical-equilibrium": makeTopic(EquilibriumVisual, "Chemical Equilibrium"),
  "physical-and-chemical-equilibrium-dynamic-nature-of-chemical-equilibrium": makeTopic(EquilibriumVisual, "Dynamic Equilibrium"),
  "law-of-mass-action": makeTopic(EquilibriumVisual, "Law of Mass Action"),
  "expression-for-equilibrium-constant-and-its-importance": makeTopic(EquilibriumVisual, "Equilibrium Constant"),
  "relationship-between-kp-and-kc": makeTopic(EquilibriumVisual, "Kp and Kc"),
  "le-chateliers-principle-numericals-not-required": makeTopic(EquilibriumVisual, "Le Chatelier's Principle"),
  "sodium-carbonate-properties-action-with-co2-so2-water-precipitation-reactions-and-uses": make("sodium carbonate", "Sodium Carbonate", "chemistry-of-metals", "chemistry"),
  "alkynes-preparation-from-carbon-and-hydrogen-1-2-dibromoethane-chloroform-iodoform-only": makeTopic(OrganicMoleculesVisual, "Alkynes"),
};

const CHEMISTRY_11_NONMETALS = [
  "chemistry-of-non-metals",
  "hydrogen-chemistry-of-atomic-and-nascent-hydrogen-isotopes-of-hydrogen-and-their-uses",
  "application-of-hydrogen-as-fuel-heavy-water-and-its-applications",
  "allotropes-of-oxygen-definition-of-allotropy-and-examples-oxygen-types-of-oxides-acidic-basic-neutral-amphoteric-peroxide-and-mixed-oxides",
  "applications-of-hydrogen-peroxide-medical-and-industrial-application-of-oxygen",
  "ozone-occurrence-preparation-of-ozone-from-oxygen-structure-of-ozone-test-for-ozone-uses-of-ozone",
  "ozone-layer-depletion-causes-effects-and-control-measures",
  "nitrogen-reason-for-inertness-of-nitrogen-and-active-nitrogen",
  "chemical-properties-of-ammonia-action-with-cuso4-solution-water-fecl3-solution-conc-hcl-mercurous-nitrate-paper-o2-applications-and-harmful-effects-of-ammonia",
  "oxy-acids-of-nitrogen-name-and-formula",
  "chemical-properties-of-nitric-acid-hno3-as-an-acid-and-oxidizing-agent-action-with-zinc-magnesium-iron-copper-sulphur-carbon-so2-and-h2s-ring-test-for-nitrate-ion",
  "halogens-general-characteristics-of-halogens-comparative-study-on-preparation-chemical-properties-with-water-alkali-ammonia-oxidizing-character-bleaching-action-and-uses-of-cl2-br2-and-i2",
  "test-for-cl2-br2-and-i2",
  "haloacids-hcl-hbr-and-hi-comparative-study-on-preparation-properties-reducing-strength-acidic-nature-and-solubility-and-uses",
  "carbon-allotropes-of-carbon-crystalline-and-amorphous-including-fullerenes-structure-general-properties-and-uses-only",
  "properties-reducing-action-reaction-with-metals-and-nonmetals-and-uses-of-carbon-monoxide",
  "phosphorus-allotropes-of-phosphorus-name-only",
  "phosphine-preparation-properties-basic-nature-reducing-nature-action-with-halogens-and-oxygen-and-uses",
  "sulphur-allotropes-of-sulphur-name-only-and-uses-of-sulphur",
  "hydrogen-sulphide-preparation-from-kipps-apparatus-with-diagram-properties-acidic-nature-reducing-nature-analytical-reagent-and-uses",
  "sulphur-dioxide-properties-acidic-nature-reducing-nature-oxidising-nature-and-bleaching-action-and-uses",
  "sulphuric-acid-properties-acidic-nature-oxidising-nature-dehydrating-nature-and-uses",
  "sodium-thiosulphate-formula-and-uses",
];
const CHEMISTRY_11_METALS = [
  "chemistry-of-metals",
  "metals-and-metallurgical-principles-definition-of-metallurgy-and-its-types-hydrometallurgy-pyrometallurgy-electrometallurgy",
  "introduction-of-ores-gangue-or-matrix-flux-and-slag-alloy-and-amalgam",
  "general-principles-of-extraction-of-metals-concentration-calcination-and-roasting-smelting-carbon-reduction-thermite-and-electrochemical-reduction",
  "refining-of-metals-poling-and-electro-refinement",
  "alkali-metals-general-characteristics-of-alkali-metals",
  "sodium-extraction-from-downs-process-properties-action-with-oxygen-water-acids-nonmetals-and-ammonia-and-uses",
  "sodium-hydroxide-properties-precipitation-reaction-and-action-with-carbon-monoxide-and-uses",
  "sodium-carbonate-properties-action-with-co2o-so2-water-precipitation-reactions-and-uses",
  "alkaline-earth-metals-general-characteristics-of-alkaline-earth-metals",
  "molecular-formula-and-uses-of-quick-lime-bleaching-powder-magnesia-plaster-of-paris-and-epsom-salt",
  "solubility-of-hydroxides-carbonates-and-sulphates-of-alkaline-earth-metals-general-trend-with-explanation",
  "stability-of-carbonate-and-nitrate-of-alkaline-earth-metals-general-trend-with-explanation",
];
const CHEMISTRY_11_BIO = [
  "bio-inorganic-chemistry", "introduction-to-bio-inorganic-chemistry", "micro-and-macro-nutrients",
  "importance-of-metal-ions-in-biological-systems-ions-of-na-k-mg-ca-fe-cu-zn-ni-co-cr",
  "ion-pumps-sodium-potassium-and-sodium-glucose-pump", "metal-toxicity-toxicity-due-to-iron-arsenic-mercury-lead-and-cadmium",
];
const CHEMISTRY_11_ORGANIC = [
  "basic-concept-of-organic-chemistry", "introduction-to-organic-chemistry-and-organic-compounds",
  "reasons-for-the-separate-study-of-organic-compounds-from-inorganic-compounds",
  "tetra-covalency-and-catenation-properties-of-carbon", "classification-of-organic-compounds",
  "alkyl-groups-functional-groups-and-homologous-series",
  "idea-of-structural-formula-contracted-formula-and-bond-line-structural-formula",
  "preliminary-idea-of-cracking-and-reforming-quality-of-gasoline-octane-number-cetane-number-and-gasoline-additive",
];
const CHEMISTRY_11_PRINCIPLES = [
  "fundamental-principles-of-organic-chemistry", "iupac-nomenclature-of-organic-compounds-up-to-chain-having-6-carbon-atoms",
  "qualitative-analysis-of-organic-compounds-detection-of-n-s-and-halogens-by-lassaignes-test",
  "isomerism-in-organic-compounds-definition-and-classification-of-isomerism",
  "structural-isomerism-and-its-types-chain-isomerism-position-isomerism-functional-isomerism-metamerism-and-tautomerism",
  "concept-of-geometrical-isomerism-cis-and-trans-and-optical-isomerism-d-and-l-form",
  "preliminary-idea-of-reaction-mechanism-homolytic-and-heterolytic-fission",
  "electrophiles-nucleophiles-and-free-radicals", "inductive-effect-i-and-i-effect", "resonance-effect-r-and-r-effect",
];
const CHEMISTRY_11_HYDRO = [
  "hydrocarbons",
  "saturated-hydrocarbons-alkanes-preparation-from-haloalkanes-reduction-and-wurtz-reaction-decarboxylation-catalytic-hydrogenation-of-alkene-and-alkyne",
  "chemical-properties-of-alkanes-substitution-reactions-halogenation-nitration-and-sulphonation-only-oxidation-of-ethane",
  "unsaturated-hydrocarbons-alkenes-preparation-by-dehydration-of-alcohol-dehydrohalogenation-catalytic-hydrogenation-of-alkyne",
  "chemical-properties-of-alkenes-addition-reaction-with-hx-markovnikovs-addition-and-peroxide-effect-h2o-o3-h2so4-only",
  "alkynes-preparation-from-carbon-and-hydrogen-12-dibromoethane-chloroform-iodoform-only",
  "chemical-properties-of-alkynes-addition-reaction-with-h2-hx-h2o-acidic-nature-action-with-sodium-ammoniacal-agno3-and-ammoniacal-cu2cl2",
  "test-of-unsaturation-ethene-and-ethyne-bromine-water-test-and-baeyers-test",
  "comparative-studies-of-physical-properties-of-alkane-alkene-and-alkyne",
  "kolbes-electrolysis-methods-for-the-preparation-of-alkanes-alkenes-and-alkynes",
];
const CHEMISTRY_11_AROMATIC = [
  "aromatic-hydrocarbons", "introduction-and-characteristics-of-aromatic-compounds", "huckels-rule-of-aromaticity",
  "kekule-structure-of-benzene", "resonance-and-isomerism-in-benzene",
  "preparation-of-benzene-from-decarboxylation-of-sodium-benzoate-phenol-and-ethyne-only",
  "physical-properties-of-benzene",
  "chemical-properties-of-benzene-addition-reactions-hydrogen-halogen-electrophilic-substitution-reactions-orientation-of-benzene-derivatives-o-m-and-p-nitration-sulphonation-halogenation-friedel-crafts-reaction-alkylation-and-acylation",
  "combustion-of-benzene-free-combustion-only-and-uses",
];
const CHEMISTRY_11_APPLIED = [
  "fundamentals-of-applied-chemistry", "fundamentals-of-applied-chemistry-chemical-industry-and-its-importance",
  "stages-in-producing-a-new-product", "economics-of-production-cash-flow-in-the-production-cycle",
  "running-a-chemical-plant-designing-a-chemical-plant", "continuous-and-batch-processing",
  "environmental-impact-of-the-chemical-industry",
];
const CHEMISTRY_11_MANUFACTURE = [
  "modern-chemical-manufactures", "manufacture-of-ammonia-by-habers-process-principle-and-flow-sheet-diagram-only",
  "manufacture-of-nitric-acid-by-ostwalds-process", "manufacture-of-sulphuric-acid-by-contact-process",
  "manufacture-of-sodium-hydroxide-by-diaphragm-cell",
  "manufacture-of-sodium-carbonate-by-ammonia-soda-or-solvay-process",
  "fertilizers-chemical-fertilizers-types-of-chemical-fertilizers-production-of-urea-with-flow-sheet-diagram",
];

CHEMISTRY_11_NONMETALS.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "non-metal" : "hydrogen", i === 0 ? "Chemistry of Non-metals" : "Non-metals Topic", "chemistry-of-non-metals", "chemistry"); });
CHEMISTRY_11_METALS.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "metal" : "metallurgy", i === 0 ? "Chemistry of Metals" : "Metals Topic", "chemistry-of-metals", "chemistry"); });
CHEMISTRY_11_BIO.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "bio-inorganic" : "metal ion", i === 0 ? "Bio-inorganic Chemistry" : "Bio-inorganic Topic", "bio-inorganic-chemistry", "chemistry"); });
CHEMISTRY_11_ORGANIC.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "organic" : "tetra-covalency", i === 0 ? "Basic Concept of Organic Chemistry" : "Organic Topic", "basic-concept-of-organic-chemistry", "chemistry"); });
CHEMISTRY_11_PRINCIPLES.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "iupac" : "isomerism", i === 0 ? "Fundamental Principles of Organic Chemistry" : "Organic Principles Topic", "fundamental-principles-of-organic-chemistry", "chemistry"); });
CHEMISTRY_11_HYDRO.forEach((slug, i) => { CHEMISTRY_11[slug] = makeTopic(OrganicMoleculesVisual, i === 0 ? "Hydrocarbons" : "Hydrocarbons Topic"); });
CHEMISTRY_11_AROMATIC.forEach((slug, i) => { CHEMISTRY_11[slug] = makeTopic(BenzeneRingVisual, i === 0 ? "Aromatic Hydrocarbons" : "Aromatic Topic"); });
CHEMISTRY_11_APPLIED.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "applied chemistry" : "continuous processing", i === 0 ? "Applied Chemistry" : "Applied Chemistry Topic", "fundamentals-of-applied-chemistry", "chemistry"); });
CHEMISTRY_11_MANUFACTURE.forEach((slug, i) => { CHEMISTRY_11[slug] = make(i === 0 ? "haber" : "contact process", i === 0 ? "Modern Chemical Manufactures" : "Manufacture Topic", "modern-chemical-manufactures", "chemistry"); });

export { CHEMISTRY_11 };

// BIOLOGY — CONFUSION CLARIFIED / CORE LEVEL
// Not surface: 5 precise levels (molecular→cellular→organismal→ecosystem→evolution) mapped to 3D
const BIOLOGY_11: LabComponentMap = {
  "biomolecules-and-cell-biology": makeTopic(CellBiologyVisual, "Biomolecules & Cell Biology"),
  "biomolecules-introduction-and-functions-of-carbohydrates-proteins-lipids-nucleic-acids-minerals-enzymes-and-water": makeTopic(CellBiologyVisual, "Biomolecules"),
  "cell-introduction-of-cell-concepts-of-prokaryotic-and-eukaryotic-cells": makeTopic(CellBiologyVisual, "Cell Introduction"),
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-reticulum-golgi-bodies-lysosomes-ribosomes-nucleus-chromosomes-cilia-flagella-and-cell-inclusions": makeTopic(CellBiologyVisual, "Eukaryotic Cell"),
  "cell-division-concept-of-cell-cycle-types-of-cell-division-amitosis-mitosis-and-meiosis-and-significances": makeTopic(CellDivisionVisual, "Cell Division"),
  "floral-diversity": makeTopic(FiveKingdomVisual, "Floral Diversity"),
  "introduction-three-domains-of-life-binomial-nomenclature-five-kingdom-classification-system-monera-protista-fungi-plae-and-animalia": makeTopic(FiveKingdomVisual, "Five Kingdom Classification"),
  "status-of-flora-in-nepal-and-world-representation": make("floral diversity", "Flora in Nepal", "floral-diversity", "biology"),
  "fungi-general-introduction-and-characteristic-features-of-phycomycetes-ascomycetes-basidiomycetes-and-deuteromycetes": makeTopic(FungiVisual, "Fungi"),
  "structure-and-reproduction-of-mucor-and-yeast": makeTopic(FungiVisual, "Mucor & Yeast"),
  "introduction-of-mushrooms-poisonous-and-non-poisonous-mushrooms-economic-importance-of-fungi": make("mushroom", "Mushrooms", "floral-diversity", "biology"),
  "lichen-general-introduction-characteristic-features-and-economic-importance-of-lichen": make("lichen", "Lichen", "floral-diversity", "biology"),
  "algae-general-introduction-and-characteristic-features-of-green-brown-and-red-algae-structure-and-reproduction-of-spirogyra-economic-importance-of-algae": makeTopic(AlgaeVisual, "Algae"),
  "bryophyta-general-introduction-characteristic-features-of-liverworts-hornworts-and-moss-morphological-structure-and-reproduction-of-marchantia-economic-importance-of-bryophytes": makeTopic(BryophytaVisual, "Bryophyta"),
  "pteridophyta-general-introduction-characteristic-features-of-pteridophytes-morphological-structure-and-reproduction-of-dryopteris-economic-importance-of-pteridophytes": makeTopic(PteridophytaVisual, "Pteridophyta"),
  "gymnosperm-general-introduction-characteristic-features-of-gymnosperms-morphology-and-reproduction-of-pinus-economic-importance-of-gymnosperm": makeTopic(GymnospermVisual, "Gymnosperm"),
  "angiosperm-morphology-of-root-stem-leaves-inflorescences-flowers-and-fruit": makeTopic(AngiospermVisual, "Angiosperm Morphology"),
  "taxonomic-study-definition-taxonomic-hierarchy-classification-systems-artificial-natural-and-phylogenetic-of-angiosperms": make("taxonomic", "Taxonomic Study", "floral-diversity", "biology"),
  "angiosperm-families-with-economic-importance-brassicaceae-fabaceae-solanaceae-and-liliaceae": make("angiosperm families", "Angiosperm Families", "floral-diversity", "biology"),
  "introductory-microbiology": make("microbiology", "Introductory Microbiology", "introductory-microbiology", "biology"),
  "monera-general-introduction-structure-of-bacterial-cell-mode-of-nutrition-bacterial-growth-cyanobacteria-blue-green-algae": make("monera", "Monera", "introductory-microbiology", "biology"),
  "virus-general-introduction-structure-and-importance-of-virus-bacteriophage": make("virus", "Virus & Bacteriophage", "introductory-microbiology", "biology"),
  "impacts-of-biotechnology-in-the-field-of-microbiology": make("biotechnology", "Biotechnology in Microbiology", "introductory-microbiology", "biology"),
  "ecology": makeTopic(EcosystemVisual, "Ecology"),
  "ecosystem-ecology-concept-of-ecology-biotic-and-abiotic-factors-species-interactions": makeTopic(EcosystemVisual, "Ecosystem Ecology"),
  "concept-of-ecosystem-structural-and-functional-aspects-of-pond-and-forest-ecosystem": makeTopic(EcosystemVisual, "Pond & Forest Ecosystem"),
  "food-chain-food-web-trophic-level-ecological-pyramids-productivity": makeTopic(EcosystemVisual, "Food Chain & Web"),
  "biogeochemical-cycles-carbon-and-nitrogen-cycles-concept-of-succession": makeTopic(BiogeochemicalCyclesVisual, "Biogeochemical Cycles"),
  "ecological-adaptation-concept-of-adaptation-hydrophytes-and-xerophytes": make("hydrophyte", "Ecological Adaptation", "ecology", "biology"),
  "ecological-imbalances-greenhouse-effects-and-climate-change-depletion-of-ozone-layer-acid-rain-and-biological-invasion": make("greenhouse", "Ecological Imbalances", "ecology", "biology"),
  "vegetation": make("vegetation", "Vegetation", "vegetation", "biology"),
  "vegetation-introduction-types-of-vegetation-in-nepal": make("vegetation", "Vegetation in Nepal", "vegetation", "biology"),
  "in-situ-protected-areas-and-ex-situ-botanical-garden-seed-bank-conservation": make("in-situ", "Conservation Methods", "vegetation", "biology"),
  "natural-environment-vegetation-and-human-activities": make("vegetation", "Natural Environment", "vegetation", "biology"),
  "introduction-to-biology": make("cell", "Introduction to Biology", "introduction-to-biology", "biology"),
  "introduction-to-biology-scope-and-fields-of-biology": make("cell", "Scope of Biology", "introduction-to-biology", "biology"),
  "relation-of-biology-with-other-sciences": make("cell", "Biology and Other Sciences", "introduction-to-biology", "biology"),
  "evolutionary-biology": makeTopic(EvolutionVisual, "Evolutionary Biology"),
  "life-and-its-origin-oparin-haldane-theory-miller-and-ureys-experiment": make("oparin", "Origin of Life", "evolutionary-biology", "biology"),
  "evidences-of-evolution-morphological-anatomical-paleontological-embryological-and-biochemical": make("morphological", "Evidences of Evolution", "evolutionary-biology", "biology"),
  "theories-of-evolution-lamarckism-darwinism-and-concept-of-neo-darwinism": make("darwinism", "Theories of Evolution", "evolutionary-biology", "biology"),
  "human-evolution-position-of-man-in-animal-kingdom": makeTopic(HumanEvolutionVisual, "Human Evolution"),
  "differences-between-new-world-monkeys-and-old-world-monkeys-apes-and-man": make("apes", "Monkeys & Apes", "evolutionary-biology", "biology"),
  "evolution-of-modern-man-starting-from-anthropoid-ancestor": make("anthropoid", "Modern Man", "evolutionary-biology", "biology"),
};

const BIOLOGY_11_FAUNAL = [
  "faunal-diversity",
  "protista-outline-classification-protozoa-diagnostic-features-and-classification-up-to-class-with-examples",
  "paramecium-caudatum-plasmodium-vivax-habits-and-habitat-structure-reproduction-life-cycle",
  "economic-importance-of-p-falciparum",
  "animalia-level-of-organization-body-plan-body-symmetry-body-cavity-and-segmentation-in-animals",
  "diagnostic-features-and-classification-of-phyla-up-to-class-porifera-coelenterata-cnidaria-platyhelminthes-aschelminthes-nemathelminthes-annelida-arthropoda-mollusca-echinodermata-and-chordata",
  "earthworm-pheretima-posthuma-habit-and-habitat-external-features-digestive-system-alimentary-canal-and-physiology-of-digestion",
  "earthworm-excretory-system-types-of-nephridia-structure-and-arrangement-of-septal-nephridia-nervous-system-central-and-peripheral-working-mechanism",
  "earthworm-reproductive-systems-male-and-female-reproductive-organs-copulation-cocoon-formation-and-economic-importance",
  "frog-rana-tigrina-habit-and-habitat-external-features-digestive-system-alimentary-canal-digestive-glands-and-physiology-of-digestion",
  "frog-blood-vascular-system-structure-and-working-mechanism-of-heart-respiratory-system-respiratory-organs-and-physiology-of-respiration",
  "frog-reproductive-system-male-and-female-reproductive-organs",
];
const BIOLOGY_11_BIOTA = [
  "biota-and-environment",
  "animal-adaptation-aquatic-primary-and-secondary-terrestrial-cursorial-fossorial-and-arboreal-and-volant-adaptation",
  "animal-behavior-reflex-action-taxes-dominance-and-leadership",
  "fish-and-bird-migration",
  "environmental-pollution-sources-effects-and-control-measures-of-air-water-and-soil-pollution",
  "pesticides-and-their-effects",
];
const BIOLOGY_11_CONSERVATION = [
  "conservation-biology",
  "conservation-biology-concept-of-biodiversity-biodiversity-conservation",
  "national-parks-wildlife-reserves-conservation-areas-biodiversity-hotspots-wetland-and-ramsar-sites-wildlife-importance-causes-of-extinction-and-conservation-strategies-iucn-categories-of-threatened-species-endangered-species-in-nepal",
  "wildlife-importance-causes-of-extinction-and-conservation-strategies",
  "iucn-categories-of-threatened-species-meaning-of-extinct-endangered-vulnerable-rare-and-threatened-species",
  "endangered-species-in-nepal",
];
BIOLOGY_11_FAUNAL.forEach((slug, i) => {
  if (i === 0) BIOLOGY_11[slug] = makeTopic(FiveKingdomVisual, "Faunal Diversity");
  else if (i === 1 || i === 2) BIOLOGY_11[slug] = makeTopic(ProtozoaVisual, "Protozoa");
  else if (i >= 6 && i <= 8) BIOLOGY_11[slug] = makeTopic(EarthwormVisual, "Earthworm");
  else if (i >= 9 && i <= 11) BIOLOGY_11[slug] = makeTopic(FrogVisual, "Frog");
  else BIOLOGY_11[slug] = make("faunal", "Faunal Topic", "faunal-diversity", "biology");
});
BIOLOGY_11_BIOTA.forEach((slug, i) => { BIOLOGY_11[slug] = make(i === 0 ? "biota" : "pollution", i === 0 ? "Biota & Environment" : "Biota Topic", "biota-and-environment", "biology"); });
BIOLOGY_11_CONSERVATION.forEach((slug, i) => { BIOLOGY_11[slug] = make(i === 0 ? "conservation" : "iucn", i === 0 ? "Conservation Biology" : "Conservation Topic", "conservation-biology", "biology"); });

export { BIOLOGY_11 };

const MATH_11: LabComponentMap = {
  "algebra": make("function", "Algebra", "algebra", "mathematics"),
  "logic-and-set-statements-logical-connectives-truth-tables-theorems-based-on-set-operations": makeTopic(LogicSetVisual, "Logic & Sets"),
  "real-numbers-geometric-representation-of-real-numbers-interval-absolute-value": makeTopic(RealNumbersVisual, "Real Numbers"),
  "function-domain-and-range-of-a-function-inverse-function-composite-function-algebraic-linear-quadratic-and-cubic-and-transcendental-trigonometric-exponential-logarithmic-functions": makeTopic(FunctionVisual, "Functions"),
  "curve-sketching-odd-and-even-functions-periodicity-symmetry-about-origin-x-and-y-axis-monotonicity-graphs-of-quadratic-cubic-and-rational-functions-trigonometric-asinbx-and-acosbx-exponential-ex-lnx": makeTopic(CurveSketchingVisual, "Curve Sketching"),
  "sequence-and-series-arithmetic-geometric-harmonic-sequences-and-series-and-their-properties-am-gm-hm-and-their-relations-sum-of-infinite-geometric-series": makeTopic(SequenceSeriesVisual, "Sequences & Series"),
  "matrices-and-determinants-transpose-of-a-matrix-and-its-properties-minors-and-cofactors-adjoint-inverse-matrix-determinant-properties-of-determinants-without-proof": makeTopic(MatricesDeterminantsVisual, "Matrices & Determinants"),
  "quadratic-equation-nature-and-roots-of-a-quadratic-equation-relation-between-roots-and-coefficient-formation-of-a-quadratic-equation-symmetric-roots-one-or-both-roots-common": makeTopic(ComplexQuadraticVisual, "Quadratic & Complex"),
  "complex-number-imaginary-unit-algebra-of-complex-numbers-geometric-representation-absolute-modulus-value-and-conjugate-of-complex-numbers-and-their-properties-square-root-of-a-complex-number": makeTopic(ComplexQuadraticVisual, "Complex Numbers"),
  "trigonometry": make("trigonometric function", "Trigonometry", "trigonometry", "mathematics"),
  "inverse-circular-functions": makeTopic(InverseTrigVisual, "Inverse Circular Functions"),
  "trigonometric-equations-and-general-values": makeTopic(TrigEquationsVisual, "Trigonometric Equations"),
  "analytic-geometry": make("straight line", "Analytic Geometry", "analytic-geometry", "mathematics"),
  "straight-line-length-of-perpendicular-from-a-given-point-to-a-given-line-bisectors-of-the-angles-between-two-straight-lines": makeTopic(StraightLineVisual, "Straight Line"),
  "pair-of-straight-lines-general-equation-of-second-degree-in-x-and-y-condition-for-representing-a-pair-of-lines-homogenous-second-degree-equation-in-x-and-y-angle-between-pair-of-lines-bisectors-of-the-angles-between-pair-of-lines": makeTopic(StraightLineVisual, "Pair of Straight Lines"),
  "coordinates-in-space-points-in-space-distance-between-two-points-direction-cosines-and-ratios-of-a-line": makeTopic(CoordinatesSpaceVisual, "Coordinates in Space"),
  "vectors": makeTopic(VectorOperationsVisual, "Vectors"),
  "vector-addition-and-scalar-multiplication": makeTopic(VectorAddition3DVisual, "Vector Addition"),
  "scalar-vectors-and-its-applications": makeTopic(VectorScalar3DVisual, "Scalar & Vector"),
  "dot-product-scalar-product-and-its-applications": makeTopic(VectorDot3DVisual, "Dot Product"),
  "cross-product-vector-product-and-its-applications": makeTopic(VectorCross3DVisual, "Cross Product"),
  "scalar-and-vector-triple-products": makeTopic(VectorTriple3DVisual, "Triple Products"),
  "collinear-and-non-collinear-vectors-coplanar-and-non-coplanar-vectors": makeTopic(VectorCollinear3DVisual, "Collinear & Coplanar"),
  "coplanar-vectors": makeTopic(VectorCoplanar3DVisual, "Coplanar Vectors"),
  "types-of-vectors": makeTopic(VectorScalarQuantities3DVisual, "Types of Vectors"),
  "algebra-of-vectors": makeTopic(VectorAlgebra3DVisual, "Vector Algebra"),
  "applications-of-vectors": makeTopic(VectorApplications3DVisual, "Vector Applications"),
  "linear-combination-of-vectors-linearly-dependent-and-independent-vectors": makeTopic(VectorOperationsVisual, "Linear Combination"),
  "statistics-and-probability": make("measure of dispersion", "Statistics & Probability", "statistics-and-probability", "mathematics"),
  "measure-of-dispersion-standard-deviation-variance-coefficient-of-variation-skewness-karl-pearsons-coefficient-of-skewness": makeTopic(MeasureDispersionVisual, "Measure of Dispersion"),
  "probability-independent-cases-mathematical-and-empirical-definition-of-probability-two-basic-laws-of-probability-without-proof": makeTopic(ProbabilityBasicVisual, "Probability"),
  "calculus": make("calculus", "Calculus", "calculus", "mathematics"),
  "limits-and-continuity-limits-of-a-function-indeterminate-forms-alal-form-algebraic-properties-of-limits-without-proof-basic-theorems-on-limits-of-algebraic-trigonometric-exponential-and-logarithal-functions": makeTopic(LimitsConcept3D, "Limits"),
  "continuity-of-a-function-types-of-discontinuity-graphs-of-discontinuous-function": makeTopic(Continuity3D, "Continuity"),
  "standard-limits-and-evaluation-algebraic-trigonometric-exponential-logarithmic": makeTopic(LimitsStandard3D, "Standard Limits"),
  "indeterminate-forms": makeTopic(LimitsIndeterminate3D, "Indeterminate Forms"),
  "differentiability-and-its-relation-with-continuity": makeTopic(Differentiability3D, "Differentiability"),
  "differentiation": makeTopic(DerivativeRules3D, "Differentiation"),
  "derivatives-of-algebraic-trigonometric-inverse-trigonometric-exponential-and-logarithmic-functions": makeTopic(DerivativeGeometric3D, "Derivatives"),
  "rules-of-differentiation-product-rule-quotient-rule-chain-rule": makeTopic(DerivativeRules3D, "Differentiation Rules"),
  "derivatives-of-parametric-and-implicit-functions": makeTopic(DerivativeParametric3D, "Parametric & Implicit"),
  "higher-order-derivatives": makeTopic(DerivativeHigher3D, "Higher Order Derivatives"),
  "logarithmic-differentiation": makeTopic(DerivativeLogarithmic3D, "Logarithmic Differentiation"),
  "geometric-interpretation-tangent-and-normal": makeTopic(DerivativeGeometric3D, "Tangent & Normal"),
  "monotonicity-maxima-and-minima-first-and-second-derivative-tests": makeTopic(DerivativeGeometric3D, "Maxima & Minima"),
  "applications-rate-of-change-approximation-error-estimation": makeTopic(DerivativeGeometric3D, "Applications"),
  "anti-derivatives-integration-using-basic-integrals-integration-by-substitution-and-by-parts-methods": makeTopic(IntegralAreaVisual, "Anti-derivatives"),
  "the-definite-integral-the-definite-integral-as-an-area-under-the-given-curve-area-between-two-curves": makeTopic(IntegralAreaVisual, "Definite Integrals"),
  "computational-methods-or-mechanics": makeTopic(NumericalComputationVisual, "Computational Methods"),
  "numerical-computation-roots-of-algebraic-and-transcendental-equations-bisection-and-newton-raphson-method": makeTopic(NumericalComputationVisual, "Roots of Equations"),
  "numerical-integration-trapezoidal-rule-and-simpsons-rule": makeTopic(NumericalIntegrationVisual, "Numerical Integration"),
  "mechanics-optional-statics-forces-and-resultant-forces-parallelogram-law-of-forces-composition-and-resolution-of-forces-resultant-of-coplanar-forces-acting-on-a-point": makeTopic(StaticsVisual, "Statics"),
  "mechanics-optional-dynamics-motion-of-particle-in-a-straight-line-motion-with-uniform-acceleration-motion-under-gravity-motion-down-a-smooth-inclined-plane": makeTopic(DynamicsVisual, "Dynamics"),
  "sequence-and-series-arithmetic-geometric-harmonic-sequences-and-series-and-their-properties-a-m-": makeTopic(SequenceSeriesVisual, "Sequence & Series"),
};

export { MATH_11 };

const PHYSICS_12: LabComponentMap = {
  "electrostatics": make("coulomb", "Electrostatics", "electrostatics", "physics"),
  "coulombs-law-and-its-applications": make("coulomb", "Coulomb's Law", "electrostatics", "physics"),
  "electric-field-and-electric-field-intensity-due-to-point-charges-line-charges-and-charged-sheets": make("electric field", "Electric Field", "electrostatics", "physics"),
  "electric-potential-and-potential-difference": make("potential", "Potential Difference", "electrostatics", "physics"),
  "capacitance-and-capacitors-parallel-plate-series-and-parallel-combination": make("capacit", "Capacitance", "electrostatics", "physics"),
  "dielectric-and-dielectric-constant": make("dielectric", "Dielectric", "electrostatics", "physics"),
  "energy-stored-in-a-capacitor": make("capacit", "Energy in Capacitor", "electrostatics", "physics"),
  "current-electricity": make("circuit", "Current Electricity", "current-electricity", "physics"),
  "electric-current-drift-velocity-and-relaxation-time": make("drift velocity", "Drift Velocity", "current-electricity", "physics"),
  "ohms-law-and-its-limitations": make("ohm", "Ohm's Law", "current-electricity", "physics"),
  "resistance-and-resistivity-temperature-dependence": make("resistivity", "Resistance & Resistivity", "current-electricity", "physics"),
  "series-and-parallel-combination-of-resistors": make("series and parallel", "Resistor Combination", "current-electricity", "physics"),
  "kirchhoffs-laws-and-their-applications": make("kirchhoff", "Kirchhoff's Laws", "current-electricity", "physics"),
  "electromotive-force-emf-internal-resistance-and-cells-in-combination": make("emf", "EMF", "current-electricity", "physics"),
  "wheatstone-bridge-and-meter-bridge": make("wheatstone", "Wheatstone Bridge", "current-electricity", "physics"),
  "potentiometer-and-its-applications": make("potentiometer", "Potentiometer", "current-electricity", "physics"),
  "magnetism-and-magnetic-effect-of-current": make("magnetic", "Magnetism", "magnetism-and-magnetic-effect", "physics"),
  "magnetic-field-and-magnetic-force-on-moving-charges": make("magnetic field", "Magnetic Force", "magnetism-and-magnetic-effect", "physics"),
  "lorentz-force-and-motion-of-charged-particles-in-magnetic-fields": make("lorentz", "Lorentz Force", "magnetism-and-magnetic-effect", "physics"),
  "biot-savart-law-and-its-applications-straight-wire-circular-loop-solenoid": makeTopic(BiotSavartVisual, "Biot-Savart Law"),
  "amperes-circuital-law-and-its-applications": make("ampere", "Ampere's Law", "magnetism-and-magnetic-effect", "physics"),
  "force-between-two-parallel-current-carrying-conductors": make("parallel current", "Force Between Conductors", "magnetism-and-magnetic-effect", "physics"),
  "moving-coil-galvanometer-ammeter-and-voltmeter": make("galvanometer", "Galvanometer", "magnetism-and-magnetic-effect", "physics"),
  "electromagnetic-induction": makeTopic(EMIInductionVisual, "Electromagnetic Induction"),
  "faradays-laws-of-electromagnetic-induction": makeTopic(EMIInductionVisual, "Faraday's Laws"),
  "lenzs-law-and-conservation-of-energy": makeTopic(LenzLawVisual, "Lenz's Law"),
  "self-induction-and-self-inductance": make("self-inductance", "Self Induction", "electromagnetic-induction", "physics"),
  "mutual-induction-and-mutual-inductance": make("mutual", "Mutual Induction", "electromagnetic-induction", "physics"),
  "growing-and-decaying-current-in-lr-circuits": make("lr circuit", "LR Circuits", "electromagnetic-induction", "physics"),
  "alternating-current": makeTopic(ACcircuitsVisual, "Alternating Current"),
  "ac-voltage-applied-to-resistor-inductor-and-capacitor": makeTopic(ACcircuitsVisual, "AC Voltage"),
  "lc-oscillations-and-resonance": make("lc oscillation", "LC Oscillations", "alternating-current", "physics"),
  "lcr-series-circuit-and-power-factor": make("lcr", "LCR Circuit", "alternating-current", "physics"),
  "transformer-principle-types-and-losses": make("transformer", "Transformer", "alternating-current", "physics"),
  "ray-optics": makeTopic(OpticsVisual, "Ray Optics"),
  "reflection-at-plane-and-curved-surfaces-mirrors": makeTopic(OpticsReflection3d, "Reflection at Mirrors"),
  "laws-of-refraction-refractive-index": makeTopic(OpticsRefraction3d, "Laws of Refraction"),
  "total-internal-reflection": makeTopic(OpticsTIR3d, "Total Internal Reflection"),
  "spherical-lenses-angular-magnification": makeTopic(OpticsLens3d, "Spherical Lenses"),
  "refraction-through-prisms": makeTopic(OpticsPrism3d, "Refraction through Prisms"),
  "dispersion-and-chromatic-aberration": makeTopic(OpticsDispersion3d, "Dispersion"),
  "power-of-lens-and-mirror": makeTopic(OpticsPower3d, "Power of Lens"),
  "lens-makers-formula": makeTopic(OpticsLensMaker3d, "Lens Maker's Formula"),
  "telescope-and-microscope": makeTopic(OpticsTelescope3d, "Telescope"),
  "optical-instruments-microscope-and-telescope": makeTopic(OpticsMicroscope3d, "Microscope"),
  "refraction-at-plane-surfaces-total-internal-reflection": makeTopic(OpticsVisual, "TIR"),
  "refraction-through-prisms-angle-of-deviation-and-minimum-deviation": makeTopic(OpticsVisual, "Prism Deviation"),
  "thin-lenses-lens-maker-s-formula-and-power-of-lens": makeTopic(OpticsVisual, "Thin Lenses"),
  "combination-of-lenses-and-mirrors": makeTopic(OpticsVisual, "Lens & Mirror Combinations"),
  "optical-instruments-microscope-and-telescope": make("microscope", "Optical Instruments", "ray-optics", "physics"),
  "wave-optics": makeTopic(WaveOpticsVisual, "Wave Optics"),
  "wavefront-and-huygens-principle": makeTopic(WaveMotionVisual, "Huygens' Principle"),
  "interference-of-light-youngs-double-slit-experiment": makeTopic(WaveOpticsVisual, "Young's Double Slit"),
  "diffraction-of-light-single-slit-diffraction": makeTopic(WaveOpticsVisual, "Diffraction"),
  "polarization-brewsters-law-and-polaroids": make("polarization", "Polarization", "wave-optics", "physics"),
  "modern-physics": make("photoelectric", "Modern Physics", "modern-physics", "physics"),
  "photoelectric-effect-and-einsteins-photoelectric-equation": makeTopic(PhotoelectricEffectVisual, "Photoelectric Effect"),
  "de-broglie-wavelength-and-matter-waves": makeTopic(WaveMotionVisual, "De Broglie Wavelength"),
  "atom-bohrs-model-and-hydrogen-spectrum": makeTopic(BohrModelVisual, "Bohr's Model"),
  "nucleus-binding-energy-nuclear-fission-and-fusion": make("binding energy", "Binding Energy", "modern-physics", "physics"),
  "semiconductors-intrinsic-and-extrinsic-p-n-junction-diode-transistor": make("semiconductor", "Semiconductors", "modern-physics", "physics"),
  "logic-gates-and-or-not-nand-nor": make("logic gate", "Logic Gates", "modern-physics", "physics"),
  "communication-systems": make("modulation", "Communication Systems", "communication-systems", "physics"),
  "elements-of-a-communication-system": make("communication", "Communication Elements", "communication-systems", "physics"),
  "modulation-amplitude-modulation-and-frequency-modulation": make("modulation", "Modulation", "communication-systems", "physics"),
  "bandwidth-and-propagation-of-electromagnetic-waves": make("bandwidth", "Bandwidth", "communication-systems", "physics"),
  "mass-defect-packing-fraction-binding-energy-per-nucleon": make("binding energy", "Mass Defect & Binding Energy", "modern-physics", "physics"),
  "difference-between-metals-insulators-and-semiconductors-using-band-theory": makeTopic(SemiconductorsVisual, "Band Theory"),
};
export { PHYSICS_12 };

const CHEMISTRY_12: LabComponentMap = {
  "solutions": make("solution", "Solutions", "solutions", "chemistry"),
  "types-of-solutions-and-expression-of-concentration": make("concentration", "Types of Solutions", "solutions", "chemistry"),
  "solubility-of-gases-and-solids-in-liquids": make("solubility", "Solubility", "solutions", "chemistry"),
  "vapour-pressure-of-solutions-raoults-law": makeTopic(RaoultLawVisual, "Raoult's Law"),
  "colligative-properties-relative-lowering-of-vapour-pressure-elevation-of-boiling-point-depression-of-freezing-point-osmosis-and-osmotic-pressure": makeTopic(RaoultLawVisual, "Colligative Properties"),
  "vant-hoff-factor-and-abnormal-molar-masses": makeTopic(RaoultLawVisual, "Van't Hoff Factor"),
  "electro-chemistry": makeTopic(GalvanicCellVisual, "Electrochemistry"),
  "oxidation-and-reduction-electrode-reactions": make("oxidation", "Electrode Reactions", "electro-chemistry", "chemistry"),
  "electrochemical-cells-galvanic-cell-cell-potential-standard-electrode-potential": makeTopic(GalvanicCellVisual, "Galvanic Cell"),
  "nernst-equation-and-its-applications": makeTopic(GalvanicCellVisual, "Nernst Equation"),
  "conductance-of-electrolytic-solutions": makeTopic(GalvanicCellVisual, "Conductance"),
  "electrolysis-and-faradays-laws": makeTopic(GalvanicCellVisual, "Electrolysis"),
  "batteries-primary-and-secondary-cells": makeTopic(GalvanicCellVisual, "Batteries"),
  "fuel-cells": makeTopic(GalvanicCellVisual, "Fuel Cells"),
  "chemical-kinetics": make("kinetics", "Chemical Kinetics", "chemical-kinetics", "chemistry"),
  "rate-of-reaction-average-and-instantaneous-rate": makeTopic(ReactionKineticsVisual, "Rate of Reaction"),
  "factors-affecting-rate-of-reaction": makeTopic(ReactionKineticsVisual, "Factors Affecting Rate"),
  "rate-law-and-order-of-reaction": makeTopic(ReactionKineticsVisual, "Rate Law"),
  "integrated-rate-equations-zero-order-and-first-order-reactions": makeTopic(ReactionKineticsVisual, "Integrated Rate"),
  "arrhenius-equation-and-activation-energy": makeTopic(ArrheniusEquationVisual, "Arrhenius Equation"),
  "general-and-organic-fundamentals": make("organic", "General & Organic Fundamentals", "general-and-organic-fundamentals", "chemistry"),
  "purification-and-qualitative-quantitative-analysis-of-organic-compounds": make("qualitative analysis", "Organic Analysis", "general-and-organic-fundamentals", "chemistry"),
  "inductive-effect-resonance-hyperconjugation": make("hyperconjugation", "Inductive & Resonance", "general-and-organic-fundamentals", "chemistry"),
  "electrophilic-and-nucleophilic-substitution-reactions": make("electrophilic substitution", "Substitution Reactions", "general-and-organic-fundamentals", "chemistry"),
  "free-radical-reactions": make("free radical", "Free Radical Reactions", "general-and-organic-fundamentals", "chemistry"),
  "important-organic-reactions-oxidation-reduction-addition-elimination": make("oxidation", "Important Organic Reactions", "general-and-organic-fundamentals", "chemistry"),
  "hydrocarbons": makeTopic(OrganicMoleculesVisual, "Hydrocarbons"),
  "alkanes-conformations-combustion-free-radical-halogenation": makeTopic(OrganicMoleculesVisual, "Alkanes"),
  "alkenes-preparation-geometrical-isomerism-electrophilic-addition-markovnikov-anti-markovnikov-ozonolysis-polymerisation": makeTopic(OrganicMoleculesVisual, "Alkenes"),
  "alkynes-preparation-acidic-character-addition-reactions": makeTopic(OrganicMoleculesVisual, "Alkynes"),
  "aromatic-hydrocarbons-benzene-resonance-aromaticity-electrophilic-substitution-halogenation-nitration-sulphonation-friedel-crafts": makeTopic(BenzeneRingVisual, "Aromatic Hydrocarbons"),
  "alcohols-phenols-ethers": make("alcohol", "Alcohols, Phenols, Ethers", "alcohols-phenols-ethers", "chemistry"),
  "alcohols-classification-preparation-physical-and-chemical-properties": make("alcohol", "Alcohols", "alcohols-phenols-ethers", "chemistry"),
  "phenols-acidity-electrophilic-substitution-kolbes-reaction-reimer-tiemann-reaction": make("phenol", "Phenols", "alcohols-phenols-ethers", "chemistry"),
  "ethers-preparation-and-chemical-reactions-cleavage-by-hi": make("ether", "Ethers", "alcohols-phenols-ethers", "chemistry"),
  "aldehydes-ketones-carboxylic-acids": make("aldehyde", "Aldehydes, Ketones, Carboxylic Acids", "aldehydes-ketones-carboxylic-acids", "chemistry"),
  "aldehydes-and-ketones-preparation-physical-properties-nucleophilic-addition-reactions": make("aldehyde", "Aldehydes & Ketones", "aldehydes-ketones-carboxylic-acids", "chemistry"),
  "carboxylic-acids-preparation-physical-properties-acidic-character-reactions": make("carboxylic acid", "Carboxylic Acids", "aldehydes-ketones-carboxylic-acids", "chemistry"),
  "name-reactions-aldol-condensation-cannizzaro-reaction-hvz-reaction": make("aldol", "Name Reactions", "aldehydes-ketones-carboxylic-acids", "chemistry"),
  "amines": make("amine", "Amines", "amines", "chemistry"),
  "classification-nomenclature-and-preparation": make("amine", "Classification of Amines", "amines", "chemistry"),
  "physical-and-chemical-properties": make("amine", "Properties of Amines", "amines", "chemistry"),
  "basic-character-of-amines": make("basic character", "Basic Character", "amines", "chemistry"),
  "reactions-diazotisation-coupling-reactions-hinsberg-test": make("diazotisation", "Diazotisation", "amines", "chemistry"),
  "biomolecules": make("biomolecule", "Biomolecules", "biomolecules", "chemistry"),
  "carbohydrates-monosaccharides-glucose-fructose-disaccharides-polysaccharides": make("carbohydrate", "Carbohydrates", "biomolecules", "chemistry"),
  "proteins-amino-acids-peptide-bond-primary-to-quaternary-structure-denaturation": makeTopic(ProteinStructureVisual, "Proteins"),
  "enzymes-definition-classification-enzyme-action": make("enzyme", "Enzymes", "biomolecules", "chemistry"),
  "vitamins-classification-and-functions": make("vitamin", "Vitamins", "biomolecules", "chemistry"),
  "hormones-definition-types-functions": make("hormone", "Hormones", "biomolecules", "chemistry"),
  "chemistry-in-everyday-life": make("everyday", "Chemistry in Everyday Life", "chemistry-in-everyday-life", "chemistry"),
  "medicinal-chemicals-analgesics-tranquilizers-antipyretics-antibiotics-antihistamines-antacids": make("analgesic", "Medicinal Chemicals", "chemistry-in-everyday-life", "chemistry"),
  "chemical-cleansers-soaps-and-detergents": make("soap", "Soaps & Detergents", "chemistry-in-everyday-life", "chemistry"),
  "food-additives-preservatives-and-artificial-sweetening-agents": make("preservative", "Food Additives", "chemistry-in-everyday-life", "chemistry"),
  "chemistry-of-element": make("p-block", "Chemistry of Elements", "chemistry-of-element", "chemistry"),
  "p-block-elements-group-15-18-important-compounds-trends-in-properties": make("p-block", "p-block Elements", "chemistry-of-element", "chemistry"),
  "d-block-elements-general-characteristics-important-compounds-kmno4-k2cr2o7": make("d-block", "d-block Elements", "chemistry-of-element", "chemistry"),
  "f-block-elements-lanthanoids-and-actinoids": make("f-block", "f-block Elements", "chemistry-of-element", "chemistry"),
  "coordination-compounds-werners-theory-iupac-nomenclature-vbt-cft-qualitative-isomerism": makeTopic(CoordinationCompoundsVisual, "Coordination Compounds"),
  "van-t-hoff-factor-and-abnormal-molar-masses": makeTopic(RaoultLawVisual, "Van't Hoff Factor"),
  "p-block-elements-group-1518-important-compounds-trends-in-properties": make("p-block", "p-block Elements", "chemistry-of-element", "chemistry"),
};

const MATH_12: LabComponentMap = {
  "limits-and-continuity": makeTopic(LimitsConcept3D, "Limits & Continuity"),
  "concept-of-limit-geometric-and-physical-interpretation": makeTopic(LimitsConcept3D, "Concept of Limit"),
  "standard-limits-and-evaluation-algebraic-trigonometric-exponential-logarithmic": makeTopic(LimitsStandard3D, "Standard Limits"),
  "indeterminate-forms": makeTopic(LimitsIndeterminate3D, "Indeterminate Forms"),
  "continuity-of-algebraic-trigonometric-exponential-logarithmic-functions": makeTopic(Continuity3D, "Continuity"),
  "differentiability-and-its-relation-with-continuity": makeTopic(Differentiability3D, "Differentiability"),
  "differentiation": makeTopic(DerivativeRules3D, "Differentiation"),
  "derivatives-of-algebraic-trigonometric-inverse-trigonometric-exponential-and-logarithmic-functions": makeTopic(DerivativeGeometric3D, "Derivatives"),
  "rules-of-differentiation-product-rule-quotient-rule-chain-rule": makeTopic(DerivativeRules3D, "Differentiation Rules"),
  "derivatives-of-parametric-and-implicit-functions": makeTopic(DerivativeParametric3D, "Parametric & Implicit"),
  "higher-order-derivatives": makeTopic(DerivativeHigher3D, "Higher Order Derivatives"),
  "logarithmic-differentiation": makeTopic(DerivativeLogarithmic3D, "Logarithmic Differentiation"),
  "leibnizs-theorem-for-nth-derivative": makeTopic(DerivativeVisual, "Leibniz's Theorem"),
  "geometric-interpretation-tangent-and-normal": makeTopic(DerivativeGeometric3D, "Tangent & Normal"),
  "monotonicity-maxima-and-minima-first-and-second-derivative-tests": makeTopic(DerivativeGeometric3D, "Maxima & Minima"),
  "applications-rate-of-change-approximation-error-estimation": makeTopic(DerivativeGeometric3D, "Applications"),
  "integration": makeTopic(IntegralAreaVisual, "Integration"),
  "integration-as-inverse-of-differentiation": makeTopic(IntegralAreaVisual, "Integration Basics"),
  "standard-integrals-and-methods-substitution-parts-partial-fractions": makeTopic(IntegralAreaVisual, "Integration Methods"),
  "definite-integrals-and-properties": makeTopic(IntegralAreaVisual, "Definite Integrals"),
  "integration-of-trigonometric-functions": makeTopic(IntegralAreaVisual, "Trigonometric Integration"),
  "applications-area-under-curve-area-between-two-curves": makeTopic(IntegralAreaVisual, "Area Applications"),
  "differential-equations": makeTopic(FormationDEVisual, "Differential Equations"),
  "formation-of-differential-equations": makeTopic(FormationDEVisual, "Formation"),
  "solving-first-order-first-degree-equations-variable-separable-homogeneous-linear": makeTopic(VariableSeparableDEVisual, "Solving DE"),
  "applications-growth-and-decay-population-dynamics": makeTopic(GrowthDecayDEVisual, "Growth & Decay"),
  "vector-algebra": makeTopic(VectorOperationsVisual, "Vector Algebra"),
  "scalar-and-vector-quantities-types-of-vectors": makeTopic(VectorOperationsVisual, "Scalar & Vector"),
  "addition-subtraction-and-scalar-multiplication-of-vectors": makeTopic(VectorOperationsVisual, "Vector Operations"),
  "dot-product-scalar-product-and-its-applications": makeTopic(VectorOperationsVisual, "Dot Product"),
  "cross-product-vector-product-and-its-applications": makeTopic(VectorOperationsVisual, "Cross Product"),
  "scalar-and-vector-triple-products": makeTopic(VectorOperationsVisual, "Triple Products"),
  "applications-work-torque-angular-momentum": makeTopic(VectorOperationsVisual, "Applications"),
  "three-dimensional-geometry": makeTopic(CoordinatesSpaceVisual, "3D Geometry"),
  "direction-cosines-and-direction-ratios-of-a-line": makeTopic(CoordinatesSpaceVisual, "Direction Cosines"),
  "equation-of-a-line-in-space-standard-and-general-form": makeTopic(CoordinatesSpaceVisual, "Line in Space"),
  "equation-of-a-plane-normal-form-general-form": makeTopic(CoordinatesSpaceVisual, "Plane Equation"),
  "angle-between-two-lines-two-planes-and-a-line-and-a-plane": makeTopic(CoordinatesSpaceVisual, "Angles"),
  "distance-of-a-point-from-a-plane-and-line": makeTopic(CoordinatesSpaceVisual, "Distance"),
  "linear-programming": makeTopic(LPPFormulationVisual, "Linear Programming"),
  "linear-programming-formulation-of-lpp": makeTopic(LPPFormulationVisual, "Formulation of LPP"),
  "graphical-method-for-solving-lpp-with-two-variables": makeTopic(LPPGraphicalVisual, "Graphical Method"),
  "maximization-and-minimization-problems": makeTopic(LPPGraphicalVisual, "Max/Min Problems"),
  "probability": makeTopic(RandomVariableVisual, "Probability"),
  "conditional-probability-and-multiplication-theorem": makeTopic(ConditionalProbabilityVisual, "Conditional Probability"),
  "independent-events": makeTopic(IndependentEventsVisual, "Independent Events"),
  "bayes-theorem-and-its-applications": makeTopic(BayesTheoremVisual, "Bayes' Theorem"),
  "random-variable-and-its-probability-distribution": makeTopic(RandomVariableVisual, "Random Variable"),
  "mean-variance-and-standard-deviation-of-a-random-variable": makeTopic(MeanVarianceVisual, "Mean & Variance"),
  "binomial-distribution-definition-mean-variance": makeTopic(BinomialDistVisual, "Binomial Distribution"),
  "poisson-distribution-definition-mean-variance": makeTopic(PoissonDistVisual, "Poisson Distribution"),
};

export { CHEMISTRY_12, MATH_12 };

const BIOLOGY_12: LabComponentMap = {
  "heredity-and-evolution": makeTopic(DNAStructureVisual, "Heredity & Evolution"),
  "mendels-laws-of-inheritance-monochromo-and-dihybrid-cross": makeTopic(MendelsLawsVisual, "Mendel's Laws"),
  "incomplete-dominance-and-codominance": make("incomplete dominance", "Incomplete Dominance", "heredity-and-evolution", "biology"),
  "linkage-and-crossing-over": make("linkage", "Linkage", "heredity-and-evolution", "biology"),
  "sex-determination-and-sex-linked-disorders": make("sex determination", "Sex Determination", "heredity-and-evolution", "biology"),
  "chromosome-theory-of-inheritance": make("chromosome theory", "Chromosome Theory", "heredity-and-evolution", "biology"),
  "molecular-basis-of-inheritance-dna-structure-replication-transcription-translation-gene-regulation": makeTopic(DNAStructureVisual, "Molecular Basis"),
  "human-genome-project-objectives-and-significance": make("human genome", "Human Genome Project", "heredity-and-evolution", "biology"),
  "evolution-evidences-adaptive-radiation-hardy-weinberg-equilibrium-human-evolution": makeTopic(EvolutionVisual, "Evolution"),
  "human-health-and-diseases": makeTopic(ImmuneSystemVisual, "Health & Diseases"),
  "pathogens-and-diseases-malaria-dengue-filariasis-ascariasis-pneumonia-typhoid-tuberculosis-common-cold-aids-ringworm": make("pathogen", "Pathogens", "human-health-and-diseases", "biology"),
  "immune-system-innate-and-adaptive-immunity": makeTopic(ImmuneSystemVisual, "Immune System"),
  "antigens-and-antibodies-immune-response": makeTopic(ImmuneSystemVisual, "Antigens & Antibodies"),
  "vaccination-and-immunization": make("vaccination", "Vaccination", "human-health-and-diseases", "biology"),
  "allergy-and-autoimmune-diseases": make("allergy", "Allergy", "human-health-and-diseases", "biology"),
  "strategies-for-food-production": make("plant breeding", "Food Production", "strategies-for-food-production", "biology"),
  "plant-breeding-methods-and-examples": make("plant breeding", "Plant Breeding", "strategies-for-food-production", "biology"),
  "single-cell-protein-scp": make("scp", "Single Cell Protein", "strategies-for-food-production", "biology"),
  "animal-husbandry-breeds-and-management": make("animal husbandry", "Animal Husbandry", "strategies-for-food-production", "biology"),
  "biofertilizers-and-sustainable-agriculture": make("biofertilizer", "Biofertilizers", "strategies-for-food-production", "biology"),
  "microbes-in-human-welfare": make("microbes", "Microbes in Welfare", "microbes-in-human-welfare", "biology"),
  "microorganisms-in-household-products": make("microbes", "Household Microbes", "microbes-in-human-welfare", "biology"),
  "industrial-production-of-antibiotics-alcoholic-beverages-citric-acid": make("antibiotics", "Industrial Production", "microbes-in-human-welfare", "biology"),
  "microbes-as-biocontrol-agents-and-biofertilizers": make("biocontrol", "Biocontrol", "microbes-in-human-welfare", "biology"),
  "bioremediation-biogas": make("bioremediation", "Bioremediation", "microbes-in-human-welfare", "biology"),
  "biotechnology-principles": makeTopic(RestrictionEnzymeVisual, "Biotechnology Principles"),
  "principles-of-biotechnology-recombinant-dna-technology": makeTopic(RestrictionEnzymeVisual, "Principles of Biotech"),
  "tools-restriction-enzymes-vectors-competent-host": makeTopic(RestrictionEnzymeVisual, "Restriction Enzymes & Vectors"),
  "processes-dna-isolation-pcr-gel-electrophoresis-gene-transfer": makeTopic(PCRVisual, "PCR & Gene Transfer"),
  "applications-of-recombinant-dna-technology": make("recombinant", "Applications", "biotechnology-principles", "biology"),
  "biotechnology-applications": make("biotechnology applications", "Biotechnology Applications", "biotechnology-applications", "biology"),
  "biotechnological-applications-in-agriculture-bt-cotton-nematode-resistant-tobacco": make("bt cotton", "Agriculture Applications", "biotechnology-applications", "biology"),
  "biotechnological-applications-in-medicine-insulin-gene-therapy-therapeutic-proteins": make("insulin", "Medicine Applications", "biotechnology-applications", "biology"),
  "transgenic-animals": make("transgenic", "Transgenic Animals", "biotechnology-applications", "biology"),
  "biopiracy-and-patent-issues": make("biopiracy", "Biopiracy", "biotechnology-applications", "biology"),
  "organisms-and-environment": makeTopic(BiogeochemicalCyclesVisual, "Organisms & Environment"),
  "adaptations-of-organisms-to-environmental-conditions": make("adaptation", "Adaptations", "organisms-and-environment", "biology"),
  "population-ecology-growth-regulation-interactions": make("population ecology", "Population Ecology", "organisms-and-environment", "biology"),
  "ecosystem-structure-and-function-productivity-decomposition": makeTopic(EcosystemVisual, "Ecosystem Structure"),
  "ecological-succession": make("succession", "Ecological Succession", "organisms-and-environment", "biology"),
  "nutrient-cycling-carbon-nitrogen-phosphorus": makeTopic(BiogeochemicalCyclesVisual, "Nutrient Cycling"),
  "ecological-pyramids-and-energy-flow": makeTopic(EcosystemVisual, "Ecological Pyramids"),
  "biodiversity-and-conservation": make("biodiversity", "Biodiversity & Conservation", "biodiversity-and-conservation", "biology"),
  "biodiversity-genetic-species-and-ecosystem-levels": make("biodiversity", "Levels of Biodiversity", "biodiversity-and-conservation", "biology"),
  "patterns-of-biodiversity-global-and-nepal": make("patterns of biodiversity", "Biodiversity Patterns", "biodiversity-and-conservation", "biology"),
  "biodiversity-loss-causes-and-consequences": make("biodiversity loss", "Biodiversity Loss", "biodiversity-and-conservation", "biology"),
  "conservation-strategies-in-situ-and-ex-situ": make("conservation", "Conservation Strategies", "biodiversity-and-conservation", "biology"),
  "red-data-book-and-iucn-categories": make("red data book", "Red Data Book", "biodiversity-and-conservation", "biology"),
  "environmental-issues": make("environmental issues", "Environmental Issues", "environmental-issues", "biology"),
  "air-pollution-causes-effects-and-control": make("air pollution", "Air Pollution", "environmental-issues", "biology"),
  "water-pollution-causes-effects-and-control": make("water pollution", "Water Pollution", "environmental-issues", "biology"),
  "solid-waste-management": make("solid waste", "Solid Waste", "environmental-issues", "biology"),
  "nuclear-radiation-hazards": make("nuclear radiation", "Nuclear Hazards", "environmental-issues", "biology"),
  "greenhouse-effect-global-warming-climate-change": make("greenhouse", "Greenhouse Effect", "environmental-issues", "biology"),
  "ozone-layer-depletion": make("ozone", "Ozone Depletion", "environmental-issues", "biology"),
  "rainwater-harvesting-and-wasteland-development": make("rainwater harvesting", "Rainwater Harvesting", "environmental-issues", "biology"),
};

export const TOPIC_3D_MAP: LabComponentMap = {
  ...PHYSICS_11, ...PHYSICS_12,
  ...CHEMISTRY_11, ...CHEMISTRY_12,
  ...BIOLOGY_11, ...BIOLOGY_12,
  ...MATH_11, ...MATH_12,
};

/** De-apostrophized normalization so "hooke-s-law..." matches "hookes-law...". */
function normalizeSlugKey(slug: string): string {
  return slug.replace(/-s-/g, "s-").replace(/-s$/, "s");
}

/**
 * Resolve a canonical syllabus topic slug (from slugifySyllabusTopic) to a
 * TOPIC_3D_MAP key. The syllabus slugifier turns apostrophes into "-s-"
 * ("newton's law" -> "newton-s-law-of-...") while map keys use "newtons-law-...",
 * and combined syllabus topics are truncated at 96 chars. This resolver handles:
 *  1. exact key match
 *  2. apostrophe-variant match on either side
 *  3. prefix match — a combined syllabus topic beginning with a granular map key
 *  4. reverse-prefix match — a truncated syllabus slug that a full map key starts with
 * Returns the resolved map key, or null when no visual exists for the topic.
 */
export function resolveTopic3DKey(topicSlug: string): string | null {
  const normalized = topicSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (TOPIC_3D_MAP[normalized]) return normalized;
  const deAp = normalizeSlugKey(normalized);
  const allKeys = Object.keys(TOPIC_3D_MAP);
  const normHit = allKeys.find((k) => normalizeSlugKey(k) === deAp);
  if (normHit) return normHit;
  const prefixHit = allKeys
    .filter((k) => deAp.startsWith(normalizeSlugKey(k)) && k.length >= 10)
    .sort((a, b) => normalizeSlugKey(b).length - normalizeSlugKey(a).length)[0];
  if (prefixHit) return prefixHit;
  const revHit = allKeys
    .filter((k) => normalizeSlugKey(k).startsWith(deAp) && deAp.length >= 10)
    .sort((a, b) => normalizeSlugKey(a).length - normalizeSlugKey(b).length)[0];
  if (revHit) return revHit;
  return null;
}

export function get3DComponentForTopic(topicSlug: string) {
  const key = resolveTopic3DKey(topicSlug);
  return key ? TOPIC_3D_MAP[key] : null;
}
