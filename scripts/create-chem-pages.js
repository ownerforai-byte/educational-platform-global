const fs = require("fs");
const path = require("path");

const BASE = path.join(__dirname, "..", "frontend", "app", "lab");

const labs = [
  { id: "ch-3d-periodic", title: "Periodic Table 3D", desc: "Interactive 3D periodic table with element details, categories, and search.", comp: "ChemistryLab", importPath: "chemistry-lab" },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", desc: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.", comp: "ChemistryModern3D", importPath: "chemistry-modern-3d" },
  { id: "ch-3d-micro", title: "Microscopy 3D", desc: "Atomic structure, electron orbitals, crystal lattice visualization.", comp: "ChemistryAdvanced3D", importPath: "chemistry-advanced-3d" },
  { id: "ch-th-atomic", title: "Atomic Structure Theory", desc: "Bohr model, quantum numbers, electronic configuration.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="atomic"' },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", desc: "Ionic, covalent, metallic bonds, VSEPR theory.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="bonding"' },
  { id: "ch-th-eq", title: "Equilibrium Theory", desc: "Chemical equilibrium, Le Chatelier's principle.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="equilibrium"' },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", desc: "Enthalpy, entropy, Gibbs free energy.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="thermo"' },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", desc: "Reaction rates, order of reaction, activation energy.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="kinetics"' },
  { id: "ch-th-acid", title: "Acid-Base Theory", desc: "pH, pOH, strong/weak acids, buffers.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="acid-base"' },
  { id: "ch-th-redox", title: "Redox Theory", desc: "Oxidation-reduction, electrochemical cells.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="redox"' },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", desc: "Hydrocarbons, functional groups, nomenclature.", comp: "TheoryPanel", importPath: "theory-panel", args: ' subject="chemistry" topic="organic"' },
  { id: "ch-calc-ph", title: "pH Calculator", desc: "Calculate pH from concentration for acids and bases.", comp: "ChemistryInteractive", importPath: "chemistry-interactive", args: ' defaultTab="ph"' },
  { id: "ch-calc-titration", title: "Titration Simulator", desc: "Simulate strong acid-strong base titration and track pH changes.", comp: "ChemistryInteractive", importPath: "chemistry-interactive", args: ' defaultTab="titration"' },
  { id: "ch-calc-gas", title: "Gas Laws Calc", desc: "Boyle's, Charles's, ideal gas law solver.", comp: "ChemistryInteractive", importPath: "chemistry-interactive", args: ' defaultTab="gaslaws"' },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", desc: "Enter a chemical formula and get molar mass.", comp: "ChemistryInteractive", importPath: "chemistry-interactive", args: ' defaultTab="molarmass"' },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", desc: "Moles, percent composition, limiting reagent.", comp: "ChemistryStoichiometry", importPath: "chemistry-stoichiometry" },
];

function createPage(lab) {
  const { id, title, desc, comp, importPath, args } = lab;
  const unit = id.startsWith("ch-3d-") ? "3D Lab" : id.startsWith("ch-th-") ? "Theory" : "Calculator";
  const componentJSX = "<" + comp + args + " />";

  const pageDir = path.join(BASE, "chemistry", id);
  fs.mkdirSync(pageDir, { recursive: true });

  const content = '"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";
import { ' + comp + ' } from "@/components/lab/' + importPath + '";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/lab/chemistry" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Chemistry Lab</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Cuboid className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none">' + title + '</h1>
                <p className="text-[10px] text-muted-foreground mt-0.5">' + unit + ' · ' + desc + '</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All Theory</span>
            </Link>
            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">
              <Cuboid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">All 3D</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-5">
        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, #10b98108, transparent)" }}>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Cuboid className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-base">' + title + '</h2>
              <p className="text-xs text-muted-foreground truncate">' + desc + '</p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">Active</span>
          </div>
          <div className="p-5">
            ' + componentJSX + '
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>
          <div className="flex flex-wrap gap-2">
            {' + JSON.stringify(labs.map(l => l.id)) + '.map((l) => (
              <Link key={l} href={"/lab/" + l} className="stat-pill"><span className="text-muted-foreground">{l}</span></Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
';

  fs.writeFileSync(path.join(pageDir, "page.tsx"), content, "utf8");
  return id;
}

// Create all lab pages
const created = labs.map(createPage);
console.log("Created " + created.length + " chemistry lab pages:");
created.forEach(id => console.log("  " + id));

// Create hub page
const hubContent = `"use client";

import Link from "next/link";
import { FlaskConical, Cuboid, BookOpen, Calculator } from "lucide-react";

const CHEM_LABS = [
  { id: "ch-3d-periodic", title: "Periodic Table 3D", desc: "Interactive 3D periodic table with element details, categories, and search.", type: "3D" },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", desc: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.", type: "3D" },
  { id: "ch-3d-micro", title: "Microscopy 3D", desc: "Atomic structure, electron orbitals, crystal lattice visualization.", type: "3D" },
  { id: "ch-th-atomic", title: "Atomic Structure Theory", desc: "Bohr model, quantum numbers, electronic configuration.", type: "Theory" },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", desc: "Ionic, covalent, metallic bonds, VSEPR theory.", type: "Theory" },
  { id: "ch-th-eq", title: "Equilibrium Theory", desc: "Chemical equilibrium, Le Chatelier's principle.", type: "Theory" },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", desc: "Enthalpy, entropy, Gibbs free energy.", type: "Theory" },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", desc: "Reaction rates, order of reaction, activation energy.", type: "Theory" },
  { id: "ch-th-acid", title: "Acid-Base Theory", desc: "pH, pOH, strong/weak acids, buffers.", type: "Theory" },
  { id: "ch-th-redox", title: "Redox Theory", desc: "Oxidation-reduction, electrochemical cells.", type: "Theory" },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", desc: "Hydrocarbons, functional groups, nomenclature.", type: "Theory" },
  { id: "ch-calc-ph", title: "pH Calculator", desc: "Calculate pH from concentration for acids and bases.", type: "Calc" },
  { id: "ch-calc-titration", title: "Titration Simulator", desc: "Simulate strong acid-strong base titration and track pH changes.", type: "Calc" },
  { id: "ch-calc-gas", title: "Gas Laws Calc", desc: "Boyle's, Charles's, ideal gas law solver.", type: "Calc" },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", desc: "Enter a chemical formula and get molar mass.", type: "Calc" },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", desc: "Moles, percent composition, limiting reagent.", type: "Calc" },
];

const TYPE_CONFIG = {
  "3D": { icon: Cuboid, color: "#10b981", bg: "bg-emerald-500/10", border: "border-emerald-200", text: "text-emerald-700 dark:text-emerald-400 dark:border-emerald-800" },
  "Theory": { icon: BookOpen, color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-200", text: "text-blue-700 dark:text-blue-400 dark:border-blue-800" },
  "Calc": { icon: Calculator, color: "#8b5cf6", bg: "bg-violet-500/10", border: "border-violet-200", text: "text-violet-700 dark:text-violet-400 dark:border-violet-800" },
};

export default function ChemistryHubPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Chemistry Lab</h1>
            <p className="text-sm text-muted-foreground">Interactive 3D visualizations, theory panels, and calculators</p>
          </div>
        </div>
        <Link href="/lab" className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 mt-2">
          {"←"} Back to all labs
        </Link>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-2">
        <span className="stat-pill">
          <span className="text-muted-foreground">Total:</span>
          <span className="stat-pill-value">{CHEM_LABS.length}</span>
        </span>
        <span className="stat-pill">
          <span className="text-muted-foreground">3D:</span>
          <span className="stat-pill-value text-emerald-600 dark:text-emerald-400">{CHEM_LABS.filter(l => l.type === "3D").length}</span>
        </span>
        <span className="stat-pill">
          <span className="text-muted-foreground">Theory:</span>
          <span className="stat-pill-value text-blue-600 dark:text-blue-400">{CHEM_LABS.filter(l => l.type === "Theory").length}</span>
        </span>
        <span className="stat-pill">
          <span className="text-muted-foreground">Calc:</span>
          <span className="stat-pill-value text-violet-600 dark:text-violet-400">{CHEM_LABS.filter(l => l.type === "Calc").length}</span>
        </span>
      </div>

      {/* Labs grid */}
      <div>
        <h2 className="font-semibold text-base mb-3">All Chemistry Labs</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHEM_LABS.map((lab) => {
            const cfg = TYPE_CONFIG[lab.type];
            const Icon = cfg.icon;
            return (
              <Link key={lab.id} href={`/lab/${lab.id}`} className="block group">
                <div className="elev-1 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:elev-2 p-4 flex items-start gap-3 h-full">
                  <div className={"w-9 h-9 rounded-lg flex items-center justify-center shrink-0 " + cfg.bg}>
                    <Icon className="h-4 w-4" style={{ color: cfg.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">{lab.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{lab.desc}</p>
                  </div>
                  <span className={"text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 border " + cfg.border + " " + cfg.text + " " + cfg.bg}>
                    {lab.type}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(BASE, "chemistry", "page.tsx"), hubContent, "utf8");
console.log("\nCreated chemistry hub page:");
console.log("  chemistry/page.tsx");
console.log("\nDone! Total files created: " + (created.length + 1));
