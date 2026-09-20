"use client";
/* Physics 3D Syllabus Suite — all NEB Physics XI+XII units in order. */
import { useState, type ReactNode } from "react";
import { useLabScene, CanvasMount, TheoryPanel, type SuiteKit } from "./physics-syllabus-suite-3d-kit";
import { SuiteHeader, useAccordion, type UnitMeta } from "./physics-suite-shell";
import { buildPhysicalQuantities, buildVectors, buildKinematics, buildDynamics, buildWorkEnergy, buildCircular, buildGravitation, buildElasticity } from "./physics-suite-units-a";
import { buildHeatTemp, buildThermalExpansion, buildQuantityHeat, buildHeatFlow, buildIdealGas, buildCurvedMirror, buildRefractionPlane, buildPrism, buildLenses, buildDispersion } from "./physics-suite-units-b";
import { buildElectricCharges, buildElectricField, buildPotential, buildCapacitor, buildDcCircuits, buildNuclear, buildSolids, buildRecentTrends } from "./physics-suite-units-c";
import { buildElectrostatics, buildCurrentElectricity, buildMagnetism, buildEMI, buildAC, buildRayOptics, buildWaveOptics, buildModernPhysics, buildSemiconductor, buildCommunication } from "./physics-suite-units-d";
const UNITS: UnitMeta[] = [
  { id: "physical-quantities", title: "Physical Quantities", cls: "Class 11", hours: 3, summary: "Precision, significant figures, dimensions" },
  { id: "vectors", title: "Vectors", cls: "Class 11", hours: 4, summary: "Triangle/parallelogram laws, dot/cross" },
  { id: "kinematics", title: "Kinematics", cls: "Class 11", hours: 5, summary: "Velocity, acceleration, projectile" },
  { id: "dynamics", title: "Dynamics", cls: "Class 11", hours: 6, summary: "Momentum, Newton laws, friction" },
  { id: "work-energy-and-power", title: "Work, Energy and Power", cls: "Class 11", hours: 6, summary: "Work-energy theorem, collisions" },
  { id: "circular-motion", title: "Circular Motion", cls: "Class 11", hours: 6, summary: "Centripetal, conical pendulum, banking" },
  { id: "gravitation", title: "Gravitation", cls: "Class 11", hours: 10, summary: "Newton law, satellites, escape velocity" },
  { id: "elasticity", title: "Elasticity", cls: "Class 11", hours: 5, summary: "Hooke law, moduli, elastic PE" },
  { id: "heat-and-temperature", title: "Heat and Temperature", cls: "Class 11", hours: 3, summary: "Zeroth law, thermometer" },
  { id: "thermal-expansion", title: "Thermal Expansion", cls: "Class 11", hours: 4, summary: "Linear, cubical, liquid expansion" },
  { id: "quantity-of-heat", title: "Quantity of Heat", cls: "Class 11", hours: 6, summary: "Newton cooling, latent heat" },
  { id: "rate-of-heat-flow", title: "Rate of Heat Flow", cls: "Class 11", hours: 5, summary: "Conduction, convection, radiation" },
  { id: "ideal-gas", title: "Ideal Gas", cls: "Class 11", hours: 8, summary: "PV = nRT, kinetic model" },
  { id: "reflection-at-curved-mirror", title: "Reflection at Curved Mirror", cls: "Class 11", hours: 2, summary: "Real/virtual images, mirror formula" },
  { id: "refraction-at-plane-surfaces", title: "Refraction at Plane Surfaces", cls: "Class 11", hours: 4, summary: "Snell law, lateral shift, TIR" },
  { id: "refraction-through-prisms", title: "Refraction through Prisms", cls: "Class 11", hours: 4, summary: "Minimum deviation, refractive index" },
  { id: "lenses", title: "Lenses", cls: "Class 11", hours: 3, summary: "Lens maker formula, power" },
  { id: "dispersion", title: "Dispersion", cls: "Class 11", hours: 3, summary: "Pure spectrum, aberrations" },
  { id: "electric-charges", title: "Electric Charges", cls: "Class 11", hours: 3, summary: "Coulomb law, multiple charges" },
  { id: "electric-field", title: "Electric Field", cls: "Class 11", hours: 3, summary: "Field lines, Gauss law" },
  { id: "potential-potential-difference-and-potential-energy", title: "Potential & Potential Energy", cls: "Class 11", hours: 4, summary: "Equipotentials, gradient" },
  { id: "capacitor", title: "Capacitor", cls: "Class 11", hours: 5, summary: "Parallel plate, energy, dielectric" },
  { id: "dc-circuits", title: "DC Circuits", cls: "Class 11", hours: 10, summary: "Ohm law, Kirchhoff, EMF" },
  { id: "nuclear-physics", title: "Nuclear Physics", cls: "Class 11", hours: 4, summary: "BE per nucleon, fission/fusion" },
  { id: "solids", title: "Solids", cls: "Class 11", hours: 3, summary: "Band theory, semiconductors" },
  { id: "recent-trends-in-physics", title: "Recent Trends in Physics", cls: "Class 11", hours: 6, summary: "Particles, Big Bang, black holes" },
];
const UNITS12: UnitMeta[] = [
  { id: "electrostatics", title: "Electrostatics", cls: "Class 12", hours: 10, summary: "Dipole field, potential, capacitors" },
  { id: "current-electricity", title: "Current Electricity", cls: "Class 12", hours: 10, summary: "Bridge, potentiometer, Kirchhoff" },
  { id: "magnetism-and-magnetic-effect", title: "Magnetism & Magnetic Effect", cls: "Class 12", hours: 12, summary: "Biot-Savart, Ampere, Lorentz" },
  { id: "electromagnetic-induction", title: "Electromagnetic Induction", cls: "Class 12", hours: 8, summary: "Faraday, Lenz, LR circuits" },
  { id: "alternating-current", title: "Alternating Current", cls: "Class 12", hours: 8, summary: "LC/LCR resonance, transformer" },
  { id: "ray-optics", title: "Ray Optics", cls: "Class 12", hours: 10, summary: "Mirrors, TIR, prisms, lenses" },
  { id: "wave-optics", title: "Wave Optics", cls: "Class 12", hours: 8, summary: "Interference, diffraction" },
  { id: "modern-physics", title: "Modern Physics", cls: "Class 12", hours: 10, summary: "Photoelectric, Bohr, X-rays" },
  { id: "semiconductor", title: "Semiconductor", cls: "Class 12", hours: 6, summary: "p-n junction, diode, gates" },
  { id: "communication-systems", title: "Communication Systems", cls: "Class 12", hours: 4, summary: "AM/FM, bandwidth, propagation" },
];
const ALL = [...UNITS, ...UNITS12];
const BUILDERS: Record<string, (kit: SuiteKit) => void | ((t: number) => void)> = {
  "physical-quantities": buildPhysicalQuantities, "vectors": buildVectors, "kinematics": buildKinematics,
  "dynamics": buildDynamics, "work-energy-and-power": buildWorkEnergy, "circular-motion": buildCircular,
  "gravitation": buildGravitation, "elasticity": buildElasticity, "heat-and-temperature": buildHeatTemp,
  "thermal-expansion": buildThermalExpansion, "quantity-of-heat": buildQuantityHeat, "rate-of-heat-flow": buildHeatFlow,
  "ideal-gas": buildIdealGas, "reflection-at-curved-mirror": buildCurvedMirror, "refraction-at-plane-surfaces": buildRefractionPlane,
  "refraction-through-prisms": buildPrism, "lenses": buildLenses, "dispersion": buildDispersion,
  "electric-charges": buildElectricCharges, "electric-field": buildElectricField,
  "potential-potential-difference-and-potential-energy": buildPotential, "capacitor": buildCapacitor,
  "dc-circuits": buildDcCircuits, "nuclear-physics": buildNuclear, "solids": buildSolids,
  "recent-trends-in-physics": buildRecentTrends, "electrostatics": buildElectrostatics,
  "current-electricity": buildCurrentElectricity, "magnetism-and-magnetic-effect": buildMagnetism,
  "electromagnetic-induction": buildEMI, "alternating-current": buildAC, "ray-optics": buildRayOptics,
  "wave-optics": buildWaveOptics, "modern-physics": buildModernPhysics, "semiconductor": buildSemiconductor,
  "communication-systems": buildCommunication,
};
function UnitScene({ id }: { id: string }) {
  const build = BUILDERS[id] ?? BUILDERS["gravitation"];
  const meta = ALL.find((u) => u.id === id);
  const { mountRef, webGL, vizTargetRef } = useLabScene(build, [id]);
  return (
    <div className="space-y-3">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} title={meta?.title ?? id} desc={meta?.summary ?? "Labelled 3D scene."} />
      <TheoryPanel title={`Theory — ${meta?.title ?? id}`} look={meta?.summary ?? ""} principle="Labels point at the exact part via arrow-free SVG leader lines. Use the reveal bar (top-left) to show labels one by one." why="Matches the official NEB unit order so class flow and 3D flow stay in sync." />
    </div>
  );
}
export const Physics3DSyllabusSuite: React.FC = () => {
  const { open, setOpen, hidden, setHidden, toggle, toggleHidden } = useAccordion(ALL.length, 0);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = ALL.map((u, i) => ({ ...u, index: i })).filter((u) => !q || u.title.toLowerCase().includes(q) || u.summary.toLowerCase().includes(q) || u.id.includes(q));
  return (
    <div className="space-y-3">
      <SuiteHeader openCount={open.length} total={ALL.length} query={query} setQuery={setQuery}
        expandAll={() => setOpen(visible.map((u) => u.index).slice(0, 4))} contractAll={() => setOpen([])} unhide={() => setHidden([])} />
      {visible.map((u) => {
        const isOpen = open.includes(u.index);
        const isHidden = hidden.includes(u.id);
        return (
          <section key={u.id} id={`unit-${u.id}`} className="overflow-hidden rounded-xl border border-border/60 bg-card">
            <header className="flex flex-wrap items-center gap-2 p-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-[11px] font-bold text-primary">{String(u.index + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold">{u.title}
                  <span className="ml-2 rounded-full border border-border px-2 py-0.5 align-middle text-[10px] font-semibold text-muted-foreground">{u.cls}{typeof u.hours === "number" ? ` · ${u.hours}h` : ""}</span>
                </h3>
                <p className="truncate text-[11px] text-muted-foreground">{u.summary}</p>
              </div>
              <button type="button" onClick={() => toggleHidden(u.id)} className="rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:border-primary hover:text-foreground" title={isHidden ? "Reveal scene" : "Hide scene"}>{isHidden ? "Reveal" : "Hide"}</button>
              <button type="button" onClick={() => toggle(u.index)} aria-expanded={isOpen} className={isOpen ? "rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground" : "rounded-md border border-border px-3 py-1.5 text-[11px] font-bold hover:border-primary"}>{isOpen ? "Contract ▴" : "Expand ▾"}</button>
            </header>
            {isOpen && !isHidden && <div className="border-t border-border/50 p-3"><UnitScene id={u.id} /></div>}
            {isOpen && isHidden && <p className="border-t border-border/50 p-3 text-[11px] text-muted-foreground">Hidden — press Reveal to show this 3D scene.</p>}
          </section>
        );
      })}
      {visible.length === 0 && <p className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">No units match. Clear the filter.</p>}
    </div>
  );
};
export default Physics3DSyllabusSuite;
export function PhysicsSuiteUnitScene({ unitId }: { unitId: string }): ReactNode {
  return <UnitScene id={unitId} />;
}



