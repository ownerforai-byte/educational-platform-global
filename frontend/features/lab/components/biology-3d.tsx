"use client";

import { useState, createElement } from "react";
import {
  Dna, Microscope, Leaf, Heart, TreeDeciduous, Users, Beaker,
  FlaskConical, Bug, Globe,
  Activity, Wind, Droplets, Mountain,
  Binary, Shield,
  Network,
  ChevronDown,
} from "lucide-react";
import { BiologyCellScene, type BiologyCellSceneProps } from "@/components/lab/3d-rig/biology-cell-scene";



// Small icon helpers to avoid extra imports
function MushroomIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a6 6 0 0 0-12 0v2z" />
      <path d="M6 16V10a6 6 0 0 1 12 0v6" />
      <path d="M12 4v2" />
    </svg>
  );
}

function FlowerIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5M12 7.5a4.5 4.5 0 0 0-4.5 4.5M12 7.5V3m0 4.5a4.5 4.5 0 0 0-4.5 4.5M12 7.5V3m0 13.5a4.5 4.5 0 0 1 4.5-4.5M12 21a4.5 4.5 0 0 0-4.5-4.5M12 21V16.5M12 21a4.5 4.5 0 0 0 4.5-4.5" />
      <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  );
}

/**
 * Cell Structure 3D — upgraded in Task 4 to the shared 3D pipeline
 * (`components/lab/3d-rig/biology-cell-scene.tsx`: Shared3DScene rig, PBR cell
 * model, plant/animal toggle, 7 concept-JSON hotspots).
 *
 * Kept as a thin delegate so every existing importer of this module keeps
 * working unchanged, and so `<BiologyCell3D />` no longer renders a 2D stub.
 */
export function BiologyCell3D(props: BiologyCellSceneProps = {}) {
  return <BiologyCellScene {...props} />;
}

export function BiologyDNA3D() {
  const [mode, setMode] = useState<"structure" | "replication" | "transcription" | "translation">("structure");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Dna className="h-5 w-5 text-emerald-600" /></div>
        <div><h2 className="font-semibold text-base">DNA & Genetics 3D</h2><p className="text-xs text-muted-foreground">Double helix, replication, transcription, translation</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {(["structure", "replication", "transcription", "translation"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${mode === m ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30" : "hover:bg-muted/50 text-muted-foreground border border-border"}`}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[clamp(320px,60vh,640px)]">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center"><Dna className="h-7 w-7 text-emerald-600" /></div>
          <p className="font-semibold text-foreground text-sm capitalize">{mode}</p>
          <p className="text-xs text-muted-foreground max-w-xs">
            {mode === "structure" && "A=T (2 H-bonds), G≡C (3 H-bonds). Antiparallel strands 5'→3' and 3'→5'."}
            {mode === "replication" && "Semi-conservative: DNA polymerase adds nucleotides 5'→3'. Helicase unwinds the helix."}
            {mode === "transcription" && "RNA polymerase reads template strand → mRNA. A→U pairing in RNA."}
            {mode === "translation" && "Ribosome reads mRNA codons. tRNA delivers amino acids. 64 codons → 20 amino acids."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BiologyEcology3D() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center"><TreeDeciduous className="h-5 w-5 text-lime-600" /></div>
        <div><h2 className="font-semibold text-base">Ecology & Ecosystem 3D</h2><p className="text-xs text-muted-foreground">Food chains, biogeochemical cycles, population dynamics</p></div>
      </div>
      <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[clamp(320px,60vh,640px)]">
        <div className="text-center space-y-3 p-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-lime-500/10 border-2 border-lime-500/30 flex items-center justify-center animate-pulse-subtle"><TreeDeciduous className="h-7 w-7 text-lime-600" /></div>
          <p className="font-semibold text-foreground">Ecosystem Explorer</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Interactive food webs, energy pyramids, carbon & nitrogen cycles.</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["Producers", "Consumers", "Decomposers", "Cycles", "Pyramids", "Succession"].map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-500/20 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BiologyHuman3D() {
  const [system, setSystem] = useState("circulatory");
  const systems = [
    { id: "circulatory", label: "Circulatory", color: "#ef4444" },
    { id: "respiratory", label: "Respiratory", color: "#3b82f6" },
    { id: "digestive", label: "Digestive", color: "#f59e0b" },
    { id: "nervous", label: "Nervous", color: "#8b5cf6" },
    { id: "excretory", label: "Excretory", color: "#10b981" },
  ];
  const info: Record<string, string[]> = {
    circulatory: ["Heart: 4 chambers — 2 atria, 2 ventricles", "Double circulation: pulmonary + systemic", "Blood: RBC (O₂ transport), WBC (immunity), platelets (clotting)", "Cardiac output = HR × SV = 70 × 70 = 4900 mL/min"],
    respiratory: ["Alveoli: ~300M gas exchange surfaces", "O₂ diffuses into blood, CO₂ diffuses out", "Diaphragm-driven ventilation", "Hemoglobin: O₂ + 4Hb ⇌ Hb₄O₈"],
    digestive: ["Mechanical + chemical breakdown", "Enzymes: amylase (carbs), pepsin (protein), lipase (fats)", "~9m GI tract length", "Starch → Maltose → Glucose"],
    nervous: ["Neuron: dendrite → soma → axon → terminal", "Action potential: -70mV resting → +30mV peak", "Synaptic transmission via neurotransmitters", "CNS (brain + spinal cord) + PNS"],
    excretory: ["Nephron: functional unit of kidney (~1M per kidney)", "GFR ≈ 125 mL/min", "Ultrafiltration → reabsorption → secretion", "Urine: water, urea, salts"],
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center"><Heart className="h-5 w-5 text-rose-600" /></div>
        <div><h2 className="font-semibold text-base">Human Body Systems 3D</h2><p className="text-xs text-muted-foreground">Interactive organ systems</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {systems.map((s) => (
          <button key={s.id} onClick={() => setSystem(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${system === s.id ? "text-white border-transparent" : "hover:bg-muted/50 text-muted-foreground border-border"}`} style={system === s.id ? { backgroundColor: s.color } : {}}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[clamp(320px,60vh,640px)]">
        <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <Heart className="h-10 w-10 mx-auto mb-2" style={{ color: systems.find(s => s.id === system)?.color }} />
            <p className="font-semibold text-foreground capitalize">{system} System</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 space-y-1.5">
          {(info[system] ?? []).map((f) => (
            <div key={f} className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: systems.find(s => s.id === system)?.color }} />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BiologyEvolution3D() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Users className="h-5 w-5 text-amber-600" /></div>
        <div><h2 className="font-semibold text-base">Evolution & Classification 3D</h2><p className="text-xs text-muted-foreground">Phylogenetic trees, taxonomy, natural selection</p></div>
      </div>
      <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[clamp(320px,60vh,640px)]">
        <div className="text-center space-y-3 p-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center"><Users className="h-7 w-7 text-amber-600" /></div>
          <p className="font-semibold text-foreground">Evolution Explorer</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Trace evolutionary relationships through phylogenetic trees and classification hierarchies.</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["Natural Selection", "Phylogeny", "Taxonomy", "Adaptation", "Speciation", "Fossil Record"].map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BiologyAdvanced3D() {
  const [activeModule, setActiveModule] = useState<string>("biomolecules");
  const modules = [
    { id: "biomolecules", label: "Biomolecules", icon: Dna, color: "#3b82f6" },
    { id: "cell-structure", label: "Cell Ultrastructure", icon: Microscope, color: "#22c55e" },
    { id: "cell-division", label: "Cell Division", icon: Binary, color: "#8b5cf6" },
    { id: "floral-diversity", label: "Floral Diversity", icon: Leaf, color: "#10b981" },
    { id: "fungi", label: "Fungi", icon: MushroomIcon, color: "#f59e0b" },
    { id: "algae", label: "Algae", icon: Droplets, color: "#06b6d4" },
    { id: "bryophytes", label: "Bryophytes", icon: Leaf, color: "#84cc16" },
    { id: "pteridophytes", label: "Pteridophytes", icon: TreeDeciduous, color: "#14b8a6" },
    { id: "gymnosperms", label: "Gymnosperms", icon: TreeDeciduous, color: "#a3e635" },
    { id: "angiosperms", label: "Angiosperms", icon: FlowerIcon, color: "#f472b6" },
    { id: "microbiology", label: "Microbiology", icon: Bug, color: "#f97316" },
    { id: "ecology", label: "Ecology", icon: Globe, color: "#22c55e" },
    { id: "vegetation", label: "Vegetation", icon: Mountain, color: "#16a34a" },
    { id: "evolution", label: "Evolution", icon: Activity, color: "#7c3aed" },
    { id: "faunal-diversity", label: "Faunal Diversity", icon: Network, color: "#dc2626" },
    { id: "earthworm", label: "Earthworm", icon: Activity, color: "#b91c1c" },
    { id: "frog", label: "Frog", icon: Activity, color: "#991b1b" },
    { id: "biota", label: "Biota & Environment", icon: Wind, color: "#c2410c" },
    { id: "conservation", label: "Conservation", icon: Shield, color: "#15803d" },
  ];
  const current = modules.find((m) => m.id === activeModule)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-500/20">
          <FlaskConical className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-base">Biology 3D Advanced</h2>
          <p className="text-xs text-muted-foreground">Complete NEB XI syllabus — 19 interactive modules</p>
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {modules.map((m) => {
          const I = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button key={m.id} onClick={() => setActiveModule(m.id)} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? "shadow-md elev-2 ring-1" : "bg-muted text-muted-foreground hover:elev-1"}`} style={isActive ? { backgroundColor: `${m.color}18`, color: m.color, borderColor: m.color } : undefined}>
              <I className="h-3 w-3" />
              {m.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[clamp(320px,60vh,640px)]">
        <div className="min-h-[240px] rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center">
          <div className="text-center space-y-3 p-6">
            <div className="w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center animate-pulse-subtle" style={{ borderColor: `${current.color}40`, backgroundColor: `${current.color}10` }}>
              <current.icon className="h-8 w-8" style={{ color: current.color }} />
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">{current.label}</p>
              <p className="text-sm text-muted-foreground mt-1">Interactive 3D visualization</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Syllabus Topics</p>
          <div className="space-y-1.5">
            {(
              {
                biomolecules: ["Carbohydrates", "Proteins", "Lipids", "Nucleic acids", "Enzymes", "Water"],
                "cell-structure": ["Cell wall", "Cell membrane", "Mitochondria", "Chloroplast", "Nucleus", "ER, Golgi, lysosomes"],
                "cell-division": ["Cell cycle", "Mitosis phases", "Meiosis stages", "Amitosis", "Significance"],
                "floral-diversity": ["Three domains", "Five kingdom system", "Binomial nomenclature", "Classification"],
                fungi: ["Phycomycetes", "Ascomycetes", "Basidiomycetes", "Deuteromycetes", "Mucor & Yeast"],
                algae: ["Green algae", "Brown algae", "Red algae", "Spirogyra", "Economic importance"],
                bryophytes: ["Liverworts", "Hornworts", "Mosses", "Marchantia", "Reproduction"],
                pteridophytes: ["General features", "Dryopteris", "Reproduction", "Economic importance"],
                gymnosperms: ["General features", "Pinus morphology", "Reproduction", "Naked seeds"],
                angiosperms: ["Root, stem, leaf", "Inflorescence", "Flower structure", "4 families"],
                microbiology: ["Bacterial cell", "Cyanobacteria", "Virus structure", "Bacteriophage"],
                ecology: ["Ecosystem", "Food chain/web", "Cycles", "Succession", "Adaptation", "Pollution"],
                vegetation: ["Nepal vegetation types", "In-situ conservation", "Ex-situ conservation"],
                evolution: ["Origin of life", "Evidence", "Theories", "Human evolution"],
                "faunal-diversity": ["Protista", "Animalia phyla", "Earthworm", "Frog"],
                earthworm: ["Digestive system", "Excretory system", "Nervous system", "Reproductive system"],
                frog: ["Digestive system", "Circulatory system", "Respiratory system", "Reproductive system"],
                biota: ["Aquatic adaptation", "Terrestrial adaptation", "Behavior", "Pollution"],
                conservation: ["Biodiversity", "National parks", "IUCN categories", "Endangered species"],
              } as Record<string, string[]>
            )[activeModule]?.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: `${current.color}18`, color: current.color }}>{idx + 1}</span>
                {fact}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BiologyPunnettCalculator() {
  const [allele1, setAllele1] = useState("Aa");
  const [allele2, setAllele2] = useState("Aa");
  const results = (() => {
    const p1 = allele1.split("");
    const p2 = allele2.split("");
    const grid: string[] = [];
    for (const a of p1) for (const b of p2) grid.push(a + b);
    const counts: Record<string, number> = {};
    grid.forEach(g => { const s = g.split("").sort().join(""); counts[s] = (counts[s] || 0) + 1; });
    return Object.entries(counts).map(([genotype, count]) => ({ genotype, pct: Math.round((count / grid.length) * 100) }));
  })();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Beaker className="h-5 w-5 text-green-600" /></div>
        <div><h2 className="font-semibold text-base">Punnett Square Solver</h2><p className="text-xs text-muted-foreground">Predict offspring genotypes from parental crosses</p></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Parent 1 (e.g. Aa)</label><input value={allele1} onChange={(e) => setAllele1(e.target.value)} className="input w-full" maxLength={4} /></div>
        <div><label className="text-xs font-medium text-muted-foreground mb-1 block">Parent 2 (e.g. Aa)</label><input value={allele2} onChange={(e) => setAllele2(e.target.value)} className="input w-full" maxLength={4} /></div>
      </div>
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-sm font-semibold mb-3">Offspring Ratios</p>
        <div className="grid grid-cols-2 gap-2">
          {results.map(({ genotype, pct }) => (
            <div key={genotype} className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border">
              <span className="font-mono text-sm font-bold text-green-600 w-12">{genotype}</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs font-semibold text-muted-foreground w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BiologyPopulationCalculator() {
  const [N0, setN0] = useState(100);
  const [r, setr] = useState(0.05);
  const [t, setT] = useState(10);
  const exponential = Math.round(N0 * Math.exp(r * t));
  const logisticK = 1000;
  const logistic = Math.round((logisticK * N0 * Math.exp(r * t)) / (logisticK + N0 * (Math.exp(r * t) - 1)));
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Users className="h-5 w-5 text-emerald-600" /></div>
        <div><h2 className="font-semibold text-base">Population Growth Calculator</h2><p className="text-xs text-muted-foreground">Exponential & logistic growth models</p></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "Initial Pop (N₀)", value: N0, set: setN0 }, { label: "Growth Rate (r)", value: r, set: setr }, { label: "Time (t)", value: t, set: setT }].map(({ label, value, set }) => (
          <div key={label}><label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label><input type="number" value={value} onChange={(e) => set(Number(e.target.value))} className="input w-full" /></div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20"><p className="text-xs font-semibold text-emerald-600 mb-1">Exponential (dN/dt = rN)</p><p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{exponential.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-1">After {t} time units</p></div>
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20"><p className="text-xs font-semibold text-blue-600 mb-1">Logistic (K = {logisticK})</p><p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{logistic.toLocaleString()}</p><p className="text-xs text-muted-foreground mt-1">Carrying capacity limited</p></div>
      </div>
    </div>
  );
}

export function BiologyPhotosynthesisCalculator() {
  const [light, setLight] = useState(500);
  const [co2, setCO2] = useState(400);
  const [temp, setTemp] = useState(25);
  const lightFactor = Math.min(light / 1000, 1);
  const co2Factor = Math.min(co2 / 1000, 1);
  const tempFactor = Math.max(0, 1 - Math.abs(temp - 25) / 30);
  const rate = (lightFactor * co2Factor * tempFactor * 100).toFixed(1);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center"><Leaf className="h-5 w-5 text-lime-600" /></div>
        <div><h2 className="font-semibold text-base">Photosynthesis Rate Calculator</h2><p className="text-xs text-muted-foreground">Rate under varying light, CO₂, and temperature</p></div>
      </div>
      <div className="space-y-3">
        {[{ label: "Light Intensity (μmol/m²/s)", value: light, set: setLight, min: 0, max: 2000 }, { label: "CO₂ Concentration (ppm)", value: co2, set: setCO2, min: 0, max: 2000 }, { label: "Temperature (°C)", value: temp, set: setTemp, min: 0, max: 50 }].map(({ label, value, set, min, max }) => (
          <div key={label}><div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></div><input type="range" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full accent-green-600" /></div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-lime-500/5 border border-lime-500/20 text-center"><p className="text-xs font-semibold text-lime-600 mb-1">Estimated Photosynthesis Rate</p><p className="text-3xl font-bold text-lime-700 dark:text-lime-400">{rate}</p><p className="text-xs text-muted-foreground mt-1">μmol O₂/m²/s (relative)</p></div>
    </div>
  );
}
