/**
 * Root Lab Components Barrel File
 * Central export for all lab components
 */

// Physics
export { PhysicsLab } from "@/components/lab/physics-lab";
export { PhysicsDynamics3D } from "@/components/lab/physics-dynamics-3d";
export { Physics3DAdvanced } from "@/components/lab/physics-advanced-3d";

// Chemistry
export { ChemistryLab } from "@/components/lab/chemistry-lab";

// Biology
export { BiologyLab } from "@/components/lab/biology-lab";
export {
  BiologyAdvanced3D,
  BiologyEvolution3D,
  BiologyPunnettCalculator,
  BiologyPopulationCalculator,
  BiologyPhotosynthesisCalculator,
} from "@/components/lab/biology-3d";

// Math - re-export from respective files
export { MathModern3D } from "@/components/lab/math-modern-3d";
export { MathAdvancedMotionLab } from "@/components/lab/math-motion-3d";
export { MathInteractive } from "@/components/lab/math-interactive";
export { MathGeometry3D } from "@/components/lab/math-geometry-3d";

// Math symbols - default export
export { default as MathSymbols } from "@/components/lab/math-3d-symbols";
export { MathSeriesLab } from "@/components/lab/math-series-lab";

// Class 11
export { Class11Math3DPlus } from "@/components/lab/class11/class11-math-3d-plus";

// Theory
export { TheoryPanel } from "@/components/lab/theory-panel";

// Premium
export { PremiumEquationSolver } from "@/components/lab/premium-equation-solver";
export { PremiumAdvancedCircuitSimulator } from "@/components/lab/premium-advanced-circuit";
export { PremiumPlaceholder } from "@/components/lab/premium-placeholder";

// Lab UI Components
export { LabCard } from "@/components/lab/lab-card";
export {
  LabWorkspace,
  LabContainer,
  Lab3DContainer,
  LabTheoryContainer,
  LabCalcContainer,
} from "@/components/lab/lab-workspace";
export { LabDashboard } from "@/components/lab/lab-dashboard";
export { InteractiveTemplate } from "@/components/lab/interactive-3d-template";
