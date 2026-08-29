var fs = require("fs");
var path = require("path");
var base = path.join(__dirname, "..", "frontend", "app", "lab");

var labs = [
  { id: "ch-3d-periodic", title: "Periodic Table 3D", desc: "Interactive 3D periodic table with element details, categories, and search.", comp: "ChemistryLab", imp: "chemistry-lab" },
  { id: "ch-3d-advanced", title: "Chemistry 3D Advanced", desc: "Molecular dynamics, crystallography, spectroscopy, SN1/SN2, DNA, VSEPR.", comp: "ChemistryModern3D", imp: "chemistry-modern-3d" },
  { id: "ch-3d-micro", title: "Microscopy 3D", desc: "Atomic structure, electron orbitals, crystal lattice visualization.", comp: "ChemistryAdvanced3D", imp: "chemistry-advanced-3d" },
  { id: "ch-th-atomic", title: "Atomic Structure Theory", desc: "Bohr model, quantum numbers, electronic configuration.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"atomic\"" },
  { id: "ch-th-bonding", title: "Chemical Bonding Theory", desc: "Ionic, covalent, metallic bonds, VSEPR theory.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"bonding\"" },
  { id: "ch-th-eq", title: "Equilibrium Theory", desc: "Chemical equilibrium, Le Chatelier-s principle.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"equilibrium\"" },
  { id: "ch-th-thermo", title: "Thermochemistry Theory", desc: "Enthalpy, entropy, Gibbs free energy.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"thermo\"" },
  { id: "ch-th-kinetics", title: "Chemical Kinetics Theory", desc: "Reaction rates, order of reaction, activation energy.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"kinetics\"" },
  { id: "ch-th-acid", title: "Acid-Base Theory", desc: "pH, pOH, strong/weak acids, buffers.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"acid-base\"" },
  { id: "ch-th-redox", title: "Redox Theory", desc: "Oxidation-reduction, electrochemical cells.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"redox\"" },
  { id: "ch-th-organic", title: "Organic Chemistry Theory", desc: "Hydrocarbons, functional groups, nomenclature.", comp: "TheoryPanel", imp: "theory-panel", args: " subject=\"chemistry\" topic=\"organic\"" },
  { id: "ch-calc-ph", title: "pH Calculator", desc: "Calculate pH from concentration for acids and bases.", comp: "ChemistryInteractive", imp: "chemistry-interactive", args: " defaultTab=\"ph\"" },
  { id: "ch-calc-titration", title: "Titration Simulator", desc: "Simulate strong acid-strong base titration and track pH changes.", comp: "ChemistryInteractive", imp: "chemistry-interactive", args: " defaultTab=\"titration\"" },
  { id: "ch-calc-gas", title: "Gas Laws Calc", desc: "Boyle-s, Charles-s, ideal gas law solver.", comp: "ChemistryInteractive", imp: "chemistry-interactive", args: " defaultTab=\"gaslaws\"" },
  { id: "ch-calc-molarmass", title: "Molar Mass Calc", desc: "Enter a chemical formula and get molar mass.", comp: "ChemistryInteractive", imp: "chemistry-interactive", args: " defaultTab=\"molarmass\"" },
  { id: "ch-calc-stoich", title: "Stoichiometry Lab", desc: "Moles, percent composition, limiting reagent.", comp: "ChemistryStoichiometry", imp: "chemistry-stoichiometry" }
];

function mkPage(l) {
  var unit = l.id.indexOf("ch-3d-") === 0 ? "3D Lab" : l.id.indexOf("ch-th-") === 0 ? "Theory" : "Calculator";
  var jsx = "<" + l.comp + l.args + " />";
  var dir = path.join(base, "chemistry", l.id);
  fs.mkdirSync(dir, { recursive: true });
  var rel = JSON.stringify(labs.map(function(x){ return x.id; }));
  var lines = [];
  lines.push('"use client";');
  lines.push("");
  lines.push('import Link from "next/link";');
  lines.push('import { ArrowLeft, BookOpen, Cuboid } from "lucide-react";');
  lines.push('import { ' + l.comp + ' } from "@/components/lab/' + l.imp + '";');
  lines.push("");
  lines.push("export default function Page() {");
  lines.push("  return (");
  lines.push('    <div className="min-h-screen bg-background">');
  lines.push('      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">');
  lines.push('        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">');
  lines.push('          <div className="flex items-center gap-3">');
  lines.push('            <Link href="/lab/chemistry" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">');
  lines.push('              <ArrowLeft className="h-4 w-4" />');
  lines.push('              <span className="hidden sm:inline">Back to Chemistry Lab</span>');
  lines.push("            </Link>");
  lines.push('            <div className="h-5 w-px bg-border" />');
  lines.push('            <div className="flex items-center gap-2">');
  lines.push('              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">');
  lines.push('                <Cuboid className="h-4 w-4 text-emerald-600" />');
  lines.push("              </div>");
  lines.push("              <div>");
  lines.push('                <h1 className="text-sm font-semibold leading-none">' + l.title + '</h1>');
  lines.push('                <p className="text-[10px] text-muted-foreground mt-0.5">' + unit + " \u00b7 " + l.desc + '</p>');
  lines.push("              </div>");
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push('          <div className="flex items-center gap-2">');
  lines.push('            <Link href="/lab/theory" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">');
  lines.push('              <BookOpen className="h-3.5 w-3.5" />');
  lines.push('              <span className="hidden sm:inline">All Theory</span>');
  lines.push("            </Link>");
  lines.push('            <Link href="/lab/3d" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-sm transition-all">');
  lines.push('              <Cuboid className="h-3.5 w-3.5" />');
  lines.push('              <span className="hidden sm:inline">All 3D</span>');
  lines.push("            </Link>");
  lines.push("          </div>");
  lines.push("        </div>");
  lines.push("      </div>");
  lines.push('      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 py-5">');
  lines.push('        <div className="elev-2 rounded-2xl border border-border overflow-hidden bg-card">');
  lines.push('          <div className="flex items-center gap-3 px-5 py-3 border-b border-border" style={{ background: "linear-gradient(to right, #10b98108, transparent)" }}>');
  lines.push('            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">');
  lines.push('              <Cuboid className="h-4 w-4 text-emerald-600" />');
  lines.push("            </div>");
  lines.push('            <div className="flex-1 min-w-0">');
  lines.push('              <h2 className="font-semibold text-base">' + l.title + '</h2>');
  lines.push('              <p className="text-xs text-muted-foreground truncate">' + l.desc + '</p>');
  lines.push("            </div>");
  lines.push('            <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">Active</span>');
  lines.push("          </div>");
  lines.push('          <div className="p-5">');
  lines.push("            " + jsx);
  lines.push("          </div>");
  lines.push("        </div>");
  lines.push('        <div className="mt-5">');
  lines.push('          <h3 className="font-semibold text-sm text-muted-foreground mb-3">Related Labs</h3>');
  lines.push('          <div className="flex flex-wrap gap-2">');
  lines.push("            {" + rel + ".map((l) => (");
  lines.push('              <Link key={l} href={"/lab/" + l} className="stat-pill"><span className="text-muted-foreground">{l}</span></Link>');
  lines.push("            ))}");
  lines.push("          </div>");
  lines.push("        </div>");
  lines.push("      </div>");
  lines.push("    </div>");
  lines.push("  );");
  lines.push("}");
  fs.writeFileSync(path.join(dir, "page.tsx"), lines.join("\n") + "\n", "utf8");
  return l.id;
}

var ids = labs.map(mkPage);
console.log("Created " + ids.length + " pages:");
ids.forEach(function(id){ console.log("  " + id); });