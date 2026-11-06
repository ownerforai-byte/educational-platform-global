"use client";
import dynamic from "next/dynamic";
import type { ReactNode, ComponentType } from "react";
import type { LabVisualIndexEntry } from "@/lib/lab-visual-index";

/** Shared skeleton shown while a 3D visual chunk is loading (mirrors SchematicDiagramLazy). */
function VisualLoading() {
  return <div className="min-h-[380px] animate-pulse rounded-2xl border border-border/60 bg-background/50" />;
}
const visualLoading = { loading: () => <VisualLoading /> } as const;

const ChapterAnimationLazy = dynamic(() => import("@/components/lab/chapter-animation").then((m) => m.ChapterAnimation), { ssr: false, ...visualLoading });
const StraightLineVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/straight-line").then((m) => m.StraightLineVisual), { ssr: false, ...visualLoading });
const CoordinatesSpaceVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/coordinates-space").then((m) => m.CoordinatesSpaceVisual), { ssr: false, ...visualLoading });
const VectorOperationsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-operations").then((m) => m.VectorOperationsVisual), { ssr: false, ...visualLoading });
const VectorAddition3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-addition-3d").then((m) => m.VectorAddition3DVisual), { ssr: false, ...visualLoading });
const VectorScalar3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-scalar-3d").then((m) => m.VectorScalar3DVisual), { ssr: false, ...visualLoading });
const VectorDot3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-dot-3d").then((m) => m.VectorDot3DVisual), { ssr: false, ...visualLoading });
const VectorCross3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-cross-3d").then((m) => m.VectorCross3DVisual), { ssr: false, ...visualLoading });
const VectorTriple3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-triple-3d").then((m) => m.VectorTriple3DVisual), { ssr: false, ...visualLoading });
const VectorCollinear3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-collinear-3d").then((m) => m.VectorCollinear3DVisual), { ssr: false, ...visualLoading });
const VectorCoplanar3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-coplanar-3d").then((m) => m.VectorCoplanar3DVisual), { ssr: false, ...visualLoading });
const VectorScalarQuantities3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-scalar-quantities-3d").then((m) => m.VectorScalarQuantities3DVisual), { ssr: false, ...visualLoading });
const VectorAlgebra3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-algebra-3d").then((m) => m.VectorAlgebra3DVisual), { ssr: false, ...visualLoading });
const VectorApplications3DVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/vector-applications-3d").then((m) => m.VectorApplications3DVisual), { ssr: false, ...visualLoading });
const LimitsConcept3DLazy = dynamic(() => import("@/components/lab/topic-visuals/limits-concept-3d").then((m) => m.LimitsConcept3D), { ssr: false, ...visualLoading });
const LimitsStandard3DLazy = dynamic(() => import("@/components/lab/topic-visuals/limits-standard-3d").then((m) => m.LimitsStandard3D), { ssr: false, ...visualLoading });
const LimitsIndeterminate3DLazy = dynamic(() => import("@/components/lab/topic-visuals/limits-indeterminate-3d").then((m) => m.LimitsIndeterminate3D), { ssr: false, ...visualLoading });
const Continuity3DLazy = dynamic(() => import("@/components/lab/topic-visuals/continuity-3d").then((m) => m.Continuity3D), { ssr: false, ...visualLoading });
const DerivativeGeometric3DLazy = dynamic(() => import("@/components/lab/topic-visuals/derivative-geometric-3d").then((m) => m.DerivativeGeometric3D), { ssr: false, ...visualLoading });
const DerivativeRules3DLazy = dynamic(() => import("@/components/lab/topic-visuals/derivative-rules-3d").then((m) => m.DerivativeRules3D), { ssr: false, ...visualLoading });
const DerivativeParametric3DLazy = dynamic(() => import("@/components/lab/topic-visuals/derivative-parametric-3d").then((m) => m.DerivativeParametric3D), { ssr: false, ...visualLoading });
const DerivativeHigher3DLazy = dynamic(() => import("@/components/lab/topic-visuals/derivative-higher-3d").then((m) => m.DerivativeHigher3D), { ssr: false, ...visualLoading });
const DerivativeLogarithmic3DLazy = dynamic(() => import("@/components/lab/topic-visuals/derivative-logarithmic-3d").then((m) => m.DerivativeLogarithmic3D), { ssr: false, ...visualLoading });
const Differentiability3DLazy = dynamic(() => import("@/components/lab/topic-visuals/differentiability-3d").then((m) => m.Differentiability3D), { ssr: false, ...visualLoading });
const IonicBondVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-ionic-3d").then((m) => m.IonicBondVisual), { ssr: false, ...visualLoading });
const CovalentBondVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-covalent-3d").then((m) => m.CovalentBondVisual), { ssr: false, ...visualLoading });
const LewisDotVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-lewis-3d").then((m) => m.LewisDotVisual), { ssr: false, ...visualLoading });
const VSEPRVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-vsepr-3d").then((m) => m.VSEPRVisual), { ssr: false, ...visualLoading });
const HybridizationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-hybridization-3d").then((m) => m.HybridizationVisual), { ssr: false, ...visualLoading });
const ResonanceVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-resonance-3d").then((m) => m.ResonanceVisual), { ssr: false, ...visualLoading });
const BondCharacteristicsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-characteristics-3d").then((m) => m.BondCharacteristicsVisual), { ssr: false, ...visualLoading });
const MetallicBondVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-metallic-3d").then((m) => m.MetallicBondVisual), { ssr: false, ...visualLoading });
const VanderWaalsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-vdw-3d").then((m) => m.VanderWaalsVisual), { ssr: false, ...visualLoading });
const VBTVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bond-vbt-3d").then((m) => m.VBTVisual), { ssr: false, ...visualLoading });
const OpticsReflection3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-reflection-3d").then((m) => m.OpticsReflection3d), { ssr: false, ...visualLoading });
const OpticsRefraction3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-refraction-3d").then((m) => m.OpticsRefraction3d), { ssr: false, ...visualLoading });
const OpticsTIR3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-tir-3d").then((m) => m.OpticsTIR3d), { ssr: false, ...visualLoading });
const OpticsLens3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-lens-3d").then((m) => m.OpticsLens3d), { ssr: false, ...visualLoading });
const OpticsPrism3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-prism-3d").then((m) => m.OpticsPrism3d), { ssr: false, ...visualLoading });
const OpticsDispersion3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-dispersion-3d").then((m) => m.OpticsDispersion3d), { ssr: false, ...visualLoading });
const OpticsPower3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-power-3d").then((m) => m.OpticsPower3d), { ssr: false, ...visualLoading });
const OpticsLensMaker3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-lens-maker-3d").then((m) => m.OpticsLensMaker3d), { ssr: false, ...visualLoading });
const OpticsTelescope3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-telescope-3d").then((m) => m.OpticsTelescope3d), { ssr: false, ...visualLoading });
const OpticsMicroscope3dLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-microscope-3d").then((m) => m.OpticsMicroscope3d), { ssr: false, ...visualLoading });
const LimitsContinuityVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/limits-continuity").then((m) => m.LimitsContinuityVisual), { ssr: false, ...visualLoading });
const DerivativeVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/derivative-visual").then((m) => m.DerivativeVisual), { ssr: false, ...visualLoading });
const IntegralAreaVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/integral-area").then((m) => m.IntegralAreaVisual), { ssr: false, ...visualLoading });
const ComplexQuadraticVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/complex-quadratic").then((m) => m.ComplexQuadraticVisual), { ssr: false, ...visualLoading });
const ProjectileMotionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/projectile-motion-3d").then((m) => m.ProjectileMotionVisual), { ssr: false, ...visualLoading });
const SHMVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/shm-spring-3d").then((m) => m.SHMVisual), { ssr: false, ...visualLoading });
const CircularMotionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/circular-motion-3d").then((m) => m.CircularMotionVisual), { ssr: false, ...visualLoading });
const GravitationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/gravitation-orbit-3d").then((m) => m.GravitationVisual), { ssr: false, ...visualLoading });
const CapacitorVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/capacitor-3d").then((m) => m.CapacitorVisual), { ssr: false, ...visualLoading });
const DCCircuitsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/dc-circuits-3d").then((m) => m.DCCircuitsVisual), { ssr: false, ...visualLoading });
const NuclearPhysicsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/nuclear-physics-3d").then((m) => m.NuclearPhysicsVisual), { ssr: false, ...visualLoading });
const ElectricFieldVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/electric-field-3d").then((m) => m.ElectricFieldVisual), { ssr: false, ...visualLoading });
const OpticsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/optics-ray-3d").then((m) => m.OpticsVisual), { ssr: false, ...visualLoading });
const WaveOpticsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/wave-optics-3d").then((m) => m.WaveOpticsVisual), { ssr: false, ...visualLoading });
const EMIInductionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/emi-induction-3d").then((m) => m.EMIInductionVisual), { ssr: false, ...visualLoading });
const ACcircuitsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/ac-circuits-3d").then((m) => m.ACcircuitsVisual), { ssr: false, ...visualLoading });
const SemiconductorsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/semiconductors-3d").then((m) => m.SemiconductorsVisual), { ssr: false, ...visualLoading });
const CoulombsLawVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/coulombs-law-3d").then((m) => m.CoulombsLawVisual), { ssr: false, ...visualLoading });
const GaussLawVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/gauss-law-3d").then((m) => m.GaussLawVisual), { ssr: false, ...visualLoading });
const OhmsLawVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/ohms-law-3d").then((m) => m.OhmsLawVisual), { ssr: false, ...visualLoading });
const KirchhoffsLawsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/kirchhoffs-laws-3d").then((m) => m.KirchhoffsLawsVisual), { ssr: false, ...visualLoading });
const BiotSavartVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/biot-savart-3d").then((m) => m.BiotSavartVisual), { ssr: false, ...visualLoading });
const LorentzForceVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/lorentz-force-3d").then((m) => m.LorentzForceVisual), { ssr: false, ...visualLoading });
const LRCircuitVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/lr-circuit-3d").then((m) => m.LRCircuitVisual), { ssr: false, ...visualLoading });
const LCOscillationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/lc-oscillation-3d").then((m) => m.LCOscillationVisual), { ssr: false, ...visualLoading });
const TransformerVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/transformer-3d").then((m) => m.TransformerVisual), { ssr: false, ...visualLoading });
const WheatstoneBridgeVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/wheatstone-bridge-3d").then((m) => m.WheatstoneBridgeVisual), { ssr: false, ...visualLoading });
const PNJunctionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/pn-junction-3d").then((m) => m.PNJunctionVisual), { ssr: false, ...visualLoading });
const LogicGatesVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/logic-gates-3d").then((m) => m.LogicGatesVisual), { ssr: false, ...visualLoading });
const AMFMModulationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/am-fm-modulation-3d").then((m) => m.AMFMModulationVisual), { ssr: false, ...visualLoading });
const CellBiologyVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/cell-biology").then((m) => m.CellBiologyVisual), { ssr: false, ...visualLoading });
const CellDivisionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/cell-division").then((m) => m.CellDivisionVisual), { ssr: false, ...visualLoading });
const FiveKingdomVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/five-kingdom").then((m) => m.FiveKingdomVisual), { ssr: false, ...visualLoading });
const FungiVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/fungi").then((m) => m.FungiVisual), { ssr: false, ...visualLoading });
const AlgaeVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/algae").then((m) => m.AlgaeVisual), { ssr: false, ...visualLoading });
const BryophytaVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/bryophyta").then((m) => m.BryophytaVisual), { ssr: false, ...visualLoading });
const PteridophytaVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/pteridophyta").then((m) => m.PteridophytaVisual), { ssr: false, ...visualLoading });
const GymnospermVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/gymnosperm").then((m) => m.GymnospermVisual), { ssr: false, ...visualLoading });
const AngiospermVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/angiosperm").then((m) => m.AngiospermVisual), { ssr: false, ...visualLoading });
const ProtozoaVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/protozoa").then((m) => m.ProtozoaVisual), { ssr: false, ...visualLoading });
const EarthwormVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/earthworm").then((m) => m.EarthwormVisual), { ssr: false, ...visualLoading });
const FrogVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/frog").then((m) => m.FrogVisual), { ssr: false, ...visualLoading });
const EcosystemVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/ecosystem").then((m) => m.EcosystemVisual), { ssr: false, ...visualLoading });
const BiogeochemicalCyclesVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/biogeochemical-cycles").then((m) => m.BiogeochemicalCyclesVisual), { ssr: false, ...visualLoading });
const EvolutionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/evolution").then((m) => m.EvolutionVisual), { ssr: false, ...visualLoading });
const HumanEvolutionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/human-evolution").then((m) => m.HumanEvolutionVisual), { ssr: false, ...visualLoading });
const DNAStructureVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/dnastucture").then((m) => m.DNAStructureVisual), { ssr: false, ...visualLoading });
const MendelsLawsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/mendels-laws").then((m) => m.MendelsLawsVisual), { ssr: false, ...visualLoading });
const ImmuneSystemVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/immune-system").then((m) => m.ImmuneSystemVisual), { ssr: false, ...visualLoading });
const PCRVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/pcr").then((m) => m.PCRVisual), { ssr: false, ...visualLoading });
const RestrictionEnzymeVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/restriction-enzyme").then((m) => m.RestrictionEnzymeVisual), { ssr: false, ...visualLoading });
const NeuronVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/neuron").then((m) => m.NeuronVisual), { ssr: false, ...visualLoading });
const LenzLawVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/lenz-law-3d").then((m) => m.LenzLawVisual), { ssr: false, ...visualLoading });
const PhotoelectricEffectVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/photoelectric-effect-3d").then((m) => m.PhotoelectricEffectVisual), { ssr: false, ...visualLoading });
const BohrModelVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/bohr-model-3d").then((m) => m.BohrModelVisual), { ssr: false, ...visualLoading });
const NuclearFissionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/nuclear-fission-3d").then((m) => m.NuclearFissionVisual), { ssr: false, ...visualLoading });
const WaveMotionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/wave-motion-3d").then((m) => m.WaveMotionVisual), { ssr: false, ...visualLoading });
const AtomicStructureVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/atomic-structure").then((m) => m.AtomicStructureVisual), { ssr: false, ...visualLoading });
const PeriodicTableVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/periodic-trends").then((m) => m.PeriodicTableVisual), { ssr: false, ...visualLoading });
const ChemicalBondingVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/chemical-bonding").then((m) => m.ChemicalBondingVisual), { ssr: false, ...visualLoading });
const GasLawsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/gas-laws").then((m) => m.GasLawsVisual), { ssr: false, ...visualLoading });
const EquilibriumVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/equilibrium").then((m) => m.EquilibriumVisual), { ssr: false, ...visualLoading });
const CrystalLatticeVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/crystal-lattice").then((m) => m.CrystalLatticeVisual), { ssr: false, ...visualLoading });
const ElectrolysisVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/electrolysis").then((m) => m.ElectrolysisVisual), { ssr: false, ...visualLoading });
const OrganicMoleculesVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/organic-molecules").then((m) => m.OrganicMoleculesVisual), { ssr: false, ...visualLoading });
const BenzeneRingVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/benzene-ring").then((m) => m.BenzeneRingVisual), { ssr: false, ...visualLoading });
const RaoultLawVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/raoult-law").then((m) => m.RaoultLawVisual), { ssr: false, ...visualLoading });
const GalvanicCellVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/galvanic-cell").then((m) => m.GalvanicCellVisual), { ssr: false, ...visualLoading });
const ReactionKineticsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/reaction-kinetics").then((m) => m.ReactionKineticsVisual), { ssr: false, ...visualLoading });
const ArrheniusEquationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/arrhenius-equation").then((m) => m.ArrheniusEquationVisual), { ssr: false, ...visualLoading });
const ProteinStructureVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/protein-structure").then((m) => m.ProteinStructureVisual), { ssr: false, ...visualLoading });
const CoordinationCompoundsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/coordination-compounds").then((m) => m.CoordinationCompoundsVisual), { ssr: false, ...visualLoading });
const LogicSetVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/logic-set").then((m) => m.LogicSetVisual), { ssr: false, ...visualLoading });
const RealNumbersVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/real-numbers").then((m) => m.RealNumbersVisual), { ssr: false, ...visualLoading });
const FunctionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/function-graphs").then((m) => m.FunctionVisual), { ssr: false, ...visualLoading });
const CurveSketchingVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/curve-sketching").then((m) => m.CurveSketchingVisual), { ssr: false, ...visualLoading });
const SequenceSeriesVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/sequence-series").then((m) => m.SequenceSeriesVisual), { ssr: false, ...visualLoading });
const MatricesDeterminantsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/matrices-determinants").then((m) => m.MatricesDeterminantsVisual), { ssr: false, ...visualLoading });
const InverseTrigVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/inverse-trig").then((m) => m.InverseTrigVisual), { ssr: false, ...visualLoading });
const TrigEquationsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/trigonometric-eq").then((m) => m.TrigEquationsVisual), { ssr: false, ...visualLoading });
const MeasureDispersionVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/measure-dispersion").then((m) => m.MeasureDispersionVisual), { ssr: false, ...visualLoading });
const ProbabilityBasicVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/probability-basic").then((m) => m.ProbabilityBasicVisual), { ssr: false, ...visualLoading });
const NumericalComputationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/numerical-computation").then((m) => m.NumericalComputationVisual), { ssr: false, ...visualLoading });
const NumericalIntegrationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/numerical-integration").then((m) => m.NumericalIntegrationVisual), { ssr: false, ...visualLoading });
const StaticsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/statics").then((m) => m.StaticsVisual), { ssr: false, ...visualLoading });
const DynamicsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/dynamics").then((m) => m.DynamicsVisual), { ssr: false, ...visualLoading });
const FormationDEVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/formation-de").then((m) => m.FormationDEVisual), { ssr: false, ...visualLoading });
const VariableSeparableDEVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/variable-separable-de").then((m) => m.VariableSeparableDEVisual), { ssr: false, ...visualLoading });
const GrowthDecayDEVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/growth-decay").then((m) => m.GrowthDecayDEVisual), { ssr: false, ...visualLoading });
const LPPFormulationVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/lpp-formulation").then((m) => m.LPPFormulationVisual), { ssr: false, ...visualLoading });
const LPPGraphicalVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/lpp-graphical").then((m) => m.LPPGraphicalVisual), { ssr: false, ...visualLoading });
const ConditionalProbabilityVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/conditional-prob").then((m) => m.ConditionalProbabilityVisual), { ssr: false, ...visualLoading });
const IndependentEventsVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/independent-events").then((m) => m.IndependentEventsVisual), { ssr: false, ...visualLoading });
const BayesTheoremVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/bayes-theorem").then((m) => m.BayesTheoremVisual), { ssr: false, ...visualLoading });
const RandomVariableVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/random-variable").then((m) => m.RandomVariableVisual), { ssr: false, ...visualLoading });
const MeanVarianceVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/mean-variance").then((m) => m.MeanVarianceVisual), { ssr: false, ...visualLoading });
const BinomialDistVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/binomial-dist").then((m) => m.BinomialDistVisual), { ssr: false, ...visualLoading });
const PoissonDistVisualLazy = dynamic(() => import("@/components/lab/topic-visuals/poisson-dist").then((m) => m.PoissonDistVisual), { ssr: false, ...visualLoading });
const EntranceInsightLazy = dynamic(() => import("@/components/lab/entrance-insight").then((m) => m.EntranceInsight), { ssr: false });

// 142 lazy visual targets (141 topic visuals + ChapterAnimation).
// Repeated symbols across groups share one loader. No fourth catalog/registry/manifest here.
const LOADERS: Record<string, ComponentType<any>> = {
  ChapterAnimation: ChapterAnimationLazy,
  StraightLineVisual: StraightLineVisualLazy,
  CoordinatesSpaceVisual: CoordinatesSpaceVisualLazy,
  VectorOperationsVisual: VectorOperationsVisualLazy,
  VectorAddition3DVisual: VectorAddition3DVisualLazy,
  VectorScalar3DVisual: VectorScalar3DVisualLazy,
  VectorDot3DVisual: VectorDot3DVisualLazy,
  VectorCross3DVisual: VectorCross3DVisualLazy,
  VectorTriple3DVisual: VectorTriple3DVisualLazy,
  VectorCollinear3DVisual: VectorCollinear3DVisualLazy,
  VectorCoplanar3DVisual: VectorCoplanar3DVisualLazy,
  VectorScalarQuantities3DVisual: VectorScalarQuantities3DVisualLazy,
  VectorAlgebra3DVisual: VectorAlgebra3DVisualLazy,
  VectorApplications3DVisual: VectorApplications3DVisualLazy,
  LimitsConcept3D: LimitsConcept3DLazy,
  LimitsStandard3D: LimitsStandard3DLazy,
  LimitsIndeterminate3D: LimitsIndeterminate3DLazy,
  Continuity3D: Continuity3DLazy,
  DerivativeGeometric3D: DerivativeGeometric3DLazy,
  DerivativeRules3D: DerivativeRules3DLazy,
  DerivativeParametric3D: DerivativeParametric3DLazy,
  DerivativeHigher3D: DerivativeHigher3DLazy,
  DerivativeLogarithmic3D: DerivativeLogarithmic3DLazy,
  Differentiability3D: Differentiability3DLazy,
  IonicBondVisual: IonicBondVisualLazy,
  CovalentBondVisual: CovalentBondVisualLazy,
  LewisDotVisual: LewisDotVisualLazy,
  VSEPRVisual: VSEPRVisualLazy,
  HybridizationVisual: HybridizationVisualLazy,
  ResonanceVisual: ResonanceVisualLazy,
  BondCharacteristicsVisual: BondCharacteristicsVisualLazy,
  MetallicBondVisual: MetallicBondVisualLazy,
  VanderWaalsVisual: VanderWaalsVisualLazy,
  VBTVisual: VBTVisualLazy,
  OpticsReflection3d: OpticsReflection3dLazy,
  OpticsRefraction3d: OpticsRefraction3dLazy,
  OpticsTIR3d: OpticsTIR3dLazy,
  OpticsLens3d: OpticsLens3dLazy,
  OpticsPrism3d: OpticsPrism3dLazy,
  OpticsDispersion3d: OpticsDispersion3dLazy,
  OpticsPower3d: OpticsPower3dLazy,
  OpticsLensMaker3d: OpticsLensMaker3dLazy,
  OpticsTelescope3d: OpticsTelescope3dLazy,
  OpticsMicroscope3d: OpticsMicroscope3dLazy,
  LimitsContinuityVisual: LimitsContinuityVisualLazy,
  DerivativeVisual: DerivativeVisualLazy,
  IntegralAreaVisual: IntegralAreaVisualLazy,
  ComplexQuadraticVisual: ComplexQuadraticVisualLazy,
  ProjectileMotionVisual: ProjectileMotionVisualLazy,
  SHMVisual: SHMVisualLazy,
  CircularMotionVisual: CircularMotionVisualLazy,
  GravitationVisual: GravitationVisualLazy,
  CapacitorVisual: CapacitorVisualLazy,
  DCCircuitsVisual: DCCircuitsVisualLazy,
  NuclearPhysicsVisual: NuclearPhysicsVisualLazy,
  ElectricFieldVisual: ElectricFieldVisualLazy,
  OpticsVisual: OpticsVisualLazy,
  WaveOpticsVisual: WaveOpticsVisualLazy,
  EMIInductionVisual: EMIInductionVisualLazy,
  ACcircuitsVisual: ACcircuitsVisualLazy,
  SemiconductorsVisual: SemiconductorsVisualLazy,
  CoulombsLawVisual: CoulombsLawVisualLazy,
  GaussLawVisual: GaussLawVisualLazy,
  OhmsLawVisual: OhmsLawVisualLazy,
  KirchhoffsLawsVisual: KirchhoffsLawsVisualLazy,
  BiotSavartVisual: BiotSavartVisualLazy,
  LorentzForceVisual: LorentzForceVisualLazy,
  LRCircuitVisual: LRCircuitVisualLazy,
  LCOscillationVisual: LCOscillationVisualLazy,
  TransformerVisual: TransformerVisualLazy,
  WheatstoneBridgeVisual: WheatstoneBridgeVisualLazy,
  PNJunctionVisual: PNJunctionVisualLazy,
  LogicGatesVisual: LogicGatesVisualLazy,
  AMFMModulationVisual: AMFMModulationVisualLazy,
  CellBiologyVisual: CellBiologyVisualLazy,
  CellDivisionVisual: CellDivisionVisualLazy,
  FiveKingdomVisual: FiveKingdomVisualLazy,
  FungiVisual: FungiVisualLazy,
  AlgaeVisual: AlgaeVisualLazy,
  BryophytaVisual: BryophytaVisualLazy,
  PteridophytaVisual: PteridophytaVisualLazy,
  GymnospermVisual: GymnospermVisualLazy,
  AngiospermVisual: AngiospermVisualLazy,
  ProtozoaVisual: ProtozoaVisualLazy,
  EarthwormVisual: EarthwormVisualLazy,
  FrogVisual: FrogVisualLazy,
  EcosystemVisual: EcosystemVisualLazy,
  BiogeochemicalCyclesVisual: BiogeochemicalCyclesVisualLazy,
  EvolutionVisual: EvolutionVisualLazy,
  HumanEvolutionVisual: HumanEvolutionVisualLazy,
  DNAStructureVisual: DNAStructureVisualLazy,
  MendelsLawsVisual: MendelsLawsVisualLazy,
  ImmuneSystemVisual: ImmuneSystemVisualLazy,
  PCRVisual: PCRVisualLazy,
  RestrictionEnzymeVisual: RestrictionEnzymeVisualLazy,
  NeuronVisual: NeuronVisualLazy,
  LenzLawVisual: LenzLawVisualLazy,
  PhotoelectricEffectVisual: PhotoelectricEffectVisualLazy,
  BohrModelVisual: BohrModelVisualLazy,
  NuclearFissionVisual: NuclearFissionVisualLazy,
  WaveMotionVisual: WaveMotionVisualLazy,
  AtomicStructureVisual: AtomicStructureVisualLazy,
  PeriodicTableVisual: PeriodicTableVisualLazy,
  ChemicalBondingVisual: ChemicalBondingVisualLazy,
  GasLawsVisual: GasLawsVisualLazy,
  EquilibriumVisual: EquilibriumVisualLazy,
  CrystalLatticeVisual: CrystalLatticeVisualLazy,
  ElectrolysisVisual: ElectrolysisVisualLazy,
  OrganicMoleculesVisual: OrganicMoleculesVisualLazy,
  BenzeneRingVisual: BenzeneRingVisualLazy,
  RaoultLawVisual: RaoultLawVisualLazy,
  GalvanicCellVisual: GalvanicCellVisualLazy,
  ReactionKineticsVisual: ReactionKineticsVisualLazy,
  ArrheniusEquationVisual: ArrheniusEquationVisualLazy,
  ProteinStructureVisual: ProteinStructureVisualLazy,
  CoordinationCompoundsVisual: CoordinationCompoundsVisualLazy,
  LogicSetVisual: LogicSetVisualLazy,
  RealNumbersVisual: RealNumbersVisualLazy,
  FunctionVisual: FunctionVisualLazy,
  CurveSketchingVisual: CurveSketchingVisualLazy,
  SequenceSeriesVisual: SequenceSeriesVisualLazy,
  MatricesDeterminantsVisual: MatricesDeterminantsVisualLazy,
  InverseTrigVisual: InverseTrigVisualLazy,
  TrigEquationsVisual: TrigEquationsVisualLazy,
  MeasureDispersionVisual: MeasureDispersionVisualLazy,
  ProbabilityBasicVisual: ProbabilityBasicVisualLazy,
  NumericalComputationVisual: NumericalComputationVisualLazy,
  NumericalIntegrationVisual: NumericalIntegrationVisualLazy,
  StaticsVisual: StaticsVisualLazy,
  DynamicsVisual: DynamicsVisualLazy,
  FormationDEVisual: FormationDEVisualLazy,
  VariableSeparableDEVisual: VariableSeparableDEVisualLazy,
  GrowthDecayDEVisual: GrowthDecayDEVisualLazy,
  LPPFormulationVisual: LPPFormulationVisualLazy,
  LPPGraphicalVisual: LPPGraphicalVisualLazy,
  ConditionalProbabilityVisual: ConditionalProbabilityVisualLazy,
  IndependentEventsVisual: IndependentEventsVisualLazy,
  BayesTheoremVisual: BayesTheoremVisualLazy,
  RandomVariableVisual: RandomVariableVisualLazy,
  MeanVarianceVisual: MeanVarianceVisualLazy,
  BinomialDistVisual: BinomialDistVisualLazy,
  PoissonDistVisual: PoissonDistVisualLazy,
};

/** True when a lazy loader is registered for this visual identity. */
export function hasLabVisualLoader(labId: string): boolean {
  return Object.prototype.hasOwnProperty.call(LOADERS, labId);
}

/**
 * Build the React node for a lab-visual index entry: the visual component
 * (a chapter-animation with per-entry props, or a bare direct visual) plus the
 * lazy EntranceInsight. Returns null only if the loader is unknown.
 */
export function getLabVisualNode(entry: LabVisualIndexEntry): ReactNode {
  const Visual = LOADERS[entry.labId];
  if (!Visual) return null;
  return (
    <>
      {entry.kind === "chapter-animation" ? <Visual {...entry.chapterProps} /> : <Visual />}
      <EntranceInsightLazy topic={entry.entranceTopic} />
    </>
  );
}

