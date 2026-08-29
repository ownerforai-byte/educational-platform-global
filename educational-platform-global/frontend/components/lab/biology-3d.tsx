"use client";

import { useState } from "react";
import {
  Dna, Microscope, Leaf, Heart, TreeDeciduous, Users, Beaker,
  Calculator, FlaskConical, Atom, TestTube, Bug, Globe,
  Activity, Wind, Droplets, Mountain, Layers, Puzzle,
  Binary, Hexagon, Octagon, Zap, Scan, Radio, Shield,
  Stethoscope, Network, Waves, Sunrise, Sunset, CloudRain,
  Thermometer, Timer, Scale, Target, Crosshair, Box,
  ChevronRight, ChevronDown,
} from "lucide-react";

type TopicTab =
  | "biomolecules"
  | "cell-structure"
  | "cell-division"
  | "floral-diversity"
  | "fungi"
  | "algae"
  | "bryophytes"
  | "pteridophytes"
  | "gymnosperms"
  | "angiosperms"
  | "microbiology"
  | "ecology"
  | "vegetation"
  | "evolution"
  | "faunal-diversity"
  | "earthworm"
  | "frog"
  | "biota"
  | "conservation";

const BIOLOGY_3D_TITLES: Record<string, { title: string; subtitle: string; color: string }> = {
  biomolecules: { title: "Biomolecules", subtitle: "Carbohydrates, proteins, lipids, nucleic acids", color: "#3b82f6" },
  "cell-structure": { title: "Cell Ultrastructure", subtitle: "Organelles, membranes, nucleus", color: "#22c55e" },
  "cell-division": { title: "Cell Division", subtitle: "Mitosis, meiosis, cell cycle", color: "#8b5cf6" },
  "floral-diversity": { title: "Floral Diversity", subtitle: "Five kingdom classification", color: "#10b981" },
  fungi: { title: "Fungi", subtitle: "Phycomycetes, Ascomycetes, Basidiomycetes", color: "#f59e0b" },
  algae: { title: "Algae", subtitle: "Green, brown, red algae + Spirogyra", color: "#06b6d4" },
  bryophytes: { title: "Bryophytes", subtitle: "Liverworts, mosses — Marchantia", color: "#84cc16" },
  pteridophytes: { title: "Pteridophytes", subtitle: "Ferns — Dryopteris structure", color: "#14b8a6" },
  gymnosperms: { title: "Gymnosperms", subtitle: "Pinus morphology & reproduction", color: "#a3e635" },
  angiosperms: { title: "Angiosperms", subtitle: "Flower, fruit, plant families", color: "#f472b6" },
  microbiology: { title: "Microbiology", subtitle: "Monera, Virus, Bacteriophage", color: "#f97316" },
  ecology: { title: "Ecology", subtitle: "Ecosystems, food webs, cycles", color: "#22c55e" },
  vegetation: { title: "Vegetation", subtitle: "Nepal vegetation types & conservation", color: "#16a34a" },
  evolution: { title: "Evolution", subtitle: "Origin of life, natural selection", color: "#7c3aed" },
  "faunal-diversity": { title: "Faunal Diversity", subtitle: "Protista to Chordata phyla", color: "#dc2626" },
  earthworm: { title: "Earthworm", subtitle: "Pheretima — digestive, nervous, reproductive systems", color: "#b91c1c" },
  frog: { title: "Frog", subtitle: "Rana tigrina — organ systems", color: "#991b1b" },
  biota: { title: "Biota & Environment", subtitle: "Adaptations, behavior, pollution", color: "#c2410c" },
  conservation: { title: "Conservation Biology", subtitle: "Biodiversity, national parks, IUCN categories", color: "#15803d" },
};

function TopicCard({
  id,
  title,
  subtitle,
  icon: Icon,
  color,
  active,
  onClick,
}: {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const I = Icon;
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden transition-all">
      <button
        onClick={() => { onClick(); setOpen(!open); }}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all"
          style={{ backgroundColor: active ? `${color}20` : `${color}10` }}
        >
          <I className="h-4 w-4" style={{ color: active ? color : `${color}80` }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: active ? color : undefined }}>{title}</p>
          <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-3 ml-11 space-y-1.5 border-t border-border/30 pt-2">
          {(() => {
            const topics: Record<string, string[]> = {
              biomolecules: ["Carbohydrates — mono, di, polysaccharides", "Proteins — amino acids, peptide bonds", "Lipids — fats, oils, phospholipids", "Nucleic acids — DNA, RNA structure", "Enzymes — lock & key model", "Water — solvent properties"],
              "cell-structure": ["Cell wall — cellulose structure", "Cell membrane — fluid mosaic model", "Mitochondria — ATP production", "Chloroplast — photosynthesis site", "Nucleus — chromatin, nucleolus", "ER, Golgi, lysosomes, ribosomes"],
              "cell-division": ["Cell cycle — interphase, M phase", "Mitosis — prophase to telophase", "Meiosis — two division rounds", "Amitosis — direct division", "Significance of each type"],
              fungi: ["Phycomycetes — aquatic fungi", "Ascomycetes — yeast, Aspergillus", "Basidiomycetes — mushrooms", "Deuteromycetes — imperfect fungi", "Mucor & Yeast structure", "Economic importance"],
              algae: ["Green algae — Chlorophyta", "Brown algae — Phaeophyta", "Red algae — Rhodophyta", "Spirogyra — structure & reproduction", "Economic importance of algae"],
              bryophytes: ["Liverworts — Marchantia", "Hornworts", "Mosses — Bryum", "Morphological structure", "Reproduction — alternation of generations", "Economic importance"],
              pteridophytes: ["General features", "Dryopteris — structure", "Reproduction — sporophyte", "Economic importance", "Vascular tissue evolution"],
              gymnosperms: ["General features", "Pinus — morphology", "Reproduction — cones, pollination", "Seed development", "Economic importance"],
              angiosperms: ["Root, stem, leaf morphology", "Inflorescence types", "Flower structure", "Fruit development", "Brassicaceae, Fabaceae, Solanaceae, Liliaceae"],
              microbiology: ["Bacterial cell structure", "Cyanobacteria (blue-green algae)", "Virus structure & types", "Bacteriophage lifecycle", "Biotechnology impacts"],
              ecology: ["Biotic & abiotic factors", "Ecosystem structure", "Food chain & food web", "Ecological pyramids", "Carbon & nitrogen cycles", "Succession", "Hydrophytes & xerophytes", "Greenhouse effect, ozone depletion"],
              vegetation: ["Types of vegetation in Nepal", "In-situ conservation", "Ex-situ conservation", "Human impact on vegetation"],
              evolution: ["Oparin-Haldane theory", "Miller-Urey experiment", "Morphological evidence", "Paleontological evidence", "Lamarckism vs Darwinism", "Neo-Darwinism", "Human evolution timeline"],
              "faunal-diversity": ["Protista classification", "Protozoa — Paramecium, Plasmodium", "Animalia body plans", "Phyla: Porifera to Chordata", "Earthworm systems", "Frog systems"],
              earthworm: ["External features", "Digestive system", "Excretory system — nephridia", "Nervous system", "Reproductive system", "Copulation & cocoon"],
              frog: ["External features", "Digestive system", "Blood vascular system", "Respiratory system", "Reproductive system"],
              biota: ["Aquatic adaptations", "Terrestrial adaptations", "Volant adaptations", "Reflex action & taxes", "Pollution — air, water, soil", "Pesticide effects"],
              conservation: ["Biodiversity concepts", "National parks in Nepal", "Wildlife reserves", "IUCN threatened categories", "Endangered species"],
            };
            return (topics[id] ?? []).map((t) => (
              <div key={t} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                {t}
              </div>
            ));
          })()}
        </div>
      )}
    </div>
  );
}

function ContentPanel({ topicId }: { topicId: string }) {
  const info = BIOLOGY_3D_TITLES[topicId];
  if (!info) return null;
  const color = info.color;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: `${color}18` }}>
          <FlaskConical className="h-5 w-5" style={{ color }} />
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color }}>{info.title}</h2>
          <p className="text-xs text-muted-foreground">{info.subtitle}</p>
        </div>
      </div>

      {/* 3D visualization area */}
      <div className="min-h-[260px] rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 30% 40%, ${color}, transparent 70%)` }} />
        <div className="text-center space-y-3 z-10 p-6">
          <div
            className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center animate-pulse-subtle border-2"
            style={{ borderColor: `${color}40`, backgroundColor: `${color}10` }}
          >
            <FlaskConical className="h-8 w-8" style={{ color }} />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{info.title} — 3D Explorer</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
              Interactive visualization coming soon. Explore {info.subtitle.toLowerCase()}.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {["NEB XI", "Interactive", "Syllabus-Aligned"].map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border font-medium" style={{ borderColor: `${color}30`, color, backgroundColor: `${color}08` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Key formulas / facts */}
      <div className="rounded-xl border border-border bg-card p-3 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Key Concepts</p>
        {(() => {
          const facts: Record<string, string[]> = {
            biomolecules: [
              "Carbohydrates: (CH₂O)ₙ — energy source & structural support",
              "Proteins: polymers of amino acids linked by peptide bonds",
              "Lipids: hydrophobic — triglycerides, phospholipids, steroids",
              "DNA: double helix, A-T (2 H-bonds), G≡C (3 H-bonds)",
              "Enzymes: biological catalysts, lower activation energy",
            ],
            "cell-structure": [
              "Cell membrane: phospholipid bilayer + embedded proteins (fluid mosaic)",
              "Mitochondria: powerhouse — aerobic respiration → 38 ATP",
              "Chloroplast: site of photosynthesis — thylakoids + stroma",
              "Nucleus: contains DNA, controls cell activities",
              "Plant cells have cell wall (cellulose); animal cells do not",
            ],
            "cell-division": [
              "Mitosis: 1 division → 2 identical diploid cells (2n → 2n)",
              "Meiosis: 2 divisions → 4 haploid gametes (2n → n)",
              "Cell cycle: G₁ → S (DNA replication) → G₂ → M",
              "Mitotic phases: prophase, metaphase, anaphase, telophase",
            ],
            fungi: [
              "Fungi are heterotrophic — absorb nutrients (saprophytic/parasitic)",
              "Cell wall made of chitin (not cellulose)",
              "Reproduce by spores — sexual & asexual",
              "Yeast (Ascomycetes) used in baking & brewing",
            ],
            algae: [
              "Green algae (Chlorophyta): closest to land plants",
              "Brown algae (Phaeophyta): contain fucoxanthin pigment",
              "Red algae (Rhodophyta): contain phycoerythrin",
              "Spirogyra: filamentous, spiral chloroplasts, conjugation",
            ],
            ecology: [
              "10% energy transfer rule between trophic levels",
              "Carbon cycle: photosynthesis ↔ respiration",
              "Nitrogen cycle: fixation → nitrification → assimilation → denitrification",
              "Logistic growth: dN/dt = rN((K-N)/K)",
            ],
            evolution: [
              "Oparin-Haldane: organic molecules from inorganic precursors",
              "Miller-Urey: CH₄ + NH₃ + H₂ → amino acids (spark discharge)",
              "Darwin: natural selection — survival of the fittest",
              "Human-chimp DNA similarity ≈ 98.7%",
            ],
          };
          return (facts[topicId] ?? ["Interactive 3D visualization in progress"]).map((f) => (
            <div key={f} className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
              {f}
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

export function BiologySyllabus3D() {
  const [activeTopic, setActiveTopic] = useState<string>("biomolecules");

  const topics: { id: string; title: string; subtitle: string; icon: React.ElementType; color: string }[] = [
    { id: "biomolecules", title: "Biomolecules", subtitle: "Carbs, proteins, lipids, DNA", icon: Dna, color: "#3b82f6" },
    { id: "cell-structure", title: "Cell Structure", subtitle: "Organelles, membranes, nucleus", icon: Microscope, color: "#22c55e" },
    { id: "cell-division", title: "Cell Division", subtitle: "Mitosis, meiosis, cell cycle", icon: Binary, color: "#8b5cf6" },
    { id: "floral-diversity", title: "Floral Diversity", subtitle: "Five kingdom classification", icon: Leaf, color: "#10b981" },
    { id: "fungi", title: "Fungi", subtitle: "Phycomycetes to deuteromycetes", icon: MushroomIcon, color: "#f59e0b" },
    { id: "algae", title: "Algae", subtitle: "Green, brown, red algae", icon: Droplets, color: "#06b6d4" },
    { id: "bryophytes", title: "Bryophytes", subtitle: "Liverworts, mosses", icon: Leaf, color: "#84cc16" },
    { id: "pteridophytes", title: "Pteridophytes", subtitle: "Ferns — Dryopteris", icon: TreeDeciduous, color: "#14b8a6" },
    { id: "gymnosperms", title: "Gymnosperms", subtitle: "Pinus — naked seeds", icon: TreeDeciduous, color: "#a3e635" },
    { id: "angiosperms", title: "Angiosperms", subtitle: "Flowers, fruits, families", icon: FlowerIcon, color: "#f472b6" },
    { id: "microbiology", title: "Microbiology", subtitle: "Monera, Virus, Bacteriophage", icon: Bug, color: "#f97316" },
    { id: "ecology", title: "Ecology", subtitle: "Ecosystems, food webs, cycles", icon: Globe, color: "#22c55e" },
    { id: "vegetation", title: "Vegetation", subtitle: "Nepal vegetation types", icon: Mountain, color: "#16a34a" },
    { id: "evolution", title: "Evolution", subtitle: "Origin, evidence, natural selection", icon: Activity, color: "#7c3aed" },
    { id: "faunal-diversity", title: "Faunal Diversity", subtitle: "Protista to Chordata", icon: Network, color: "#dc2626" },
    { id: "earthworm", title: "Earthworm", subtitle: "Pheretima organ systems", icon: Activity, color: "#b91c1c" },
    { id: "frog", title: "Frog", subtitle: "Rana tigrina systems", icon: Activity, color: "#991b1b" },
    { id: "biota", title: "Biota & Environment", subtitle: "Adaptations, pollution", icon: Wind, color: "#c2410c" },
    { id: "conservation", title: "Conservation", subtitle: "Biodiversity, national parks", icon: Shield, color: "#15803d" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-500/20">
          <FlaskConical className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-base">Biology 3D — NEB XI Syllabus</h2>
          <p className="text-xs text-muted-foreground">All 10 units · 19 interactive visualizations</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 min-h-[400px]">
        {/* Topic list */}
        <div className="lg:w-64 shrink-0 space-y-1.5 overflow-y-auto pr-1">
          {topics.map((t) => (
            <TopicCard
              key={t.id}
              id={t.id}
              title={t.title}
              subtitle={t.subtitle}
              icon={t.icon}
              color={t.color}
              active={activeTopic === t.id}
              onClick={() => setActiveTopic(t.id)}
            />
          ))}
        </div>

        {/* Content */}
        <div className="min-w-0 overflow-y-auto flex-1">
          <ContentPanel topicId={activeTopic} />
        </div>
      </div>
    </div>
  );
}

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

export function BiologyCell3D() {
  const [activeOrganelle, setActiveOrganelle] = useState<string>("nucleus");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Microscope className="h-5 w-5 text-green-600" /></div>
        <div><h2 className="font-semibold text-base">Cell Structure 3D</h2><p className="text-xs text-muted-foreground">Plant & animal cell ultrastructure</p></div>
      </div>
      <div className="flex gap-4 min-h-[300px]">
        <div className="w-40 shrink-0 space-y-1.5 overflow-y-auto">
          {["nucleus", "mitochondria", "chloroplast", "er", "golgi", "ribosome", "lysosome", "membrane", "wall"].map((o) => (
            <button key={o} onClick={() => setActiveOrganelle(o)} className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeOrganelle === o ? "bg-green-500/15 text-green-700 border border-green-500/30" : "hover:bg-muted/50 text-muted-foreground"}`}>
              {o.charAt(0).toUpperCase() + o.slice(1)}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[280px]">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center animate-pulse-subtle"><Microscope className="h-7 w-7 text-green-600" /></div>
            <p className="font-semibold text-foreground text-sm capitalize">{activeOrganelle}</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              {(() => {
                const info: Record<string, string> = {
                  nucleus: "Control center — houses DNA, nucleolus produces ribosomes",
                  mitochondria: "Powerhouse — aerobic respiration generates ATP",
                  chloroplast: "Photosynthesis — converts light to chemical energy",
                  er: "Endoplasmic reticulum — protein (RER) & lipid (SER) synthesis",
                  golgi: "Golgi bodies — modify, package, sort proteins",
                  ribosome: "Protein synthesis — free or bound to RER",
                  lysosome: "Intracellular digestion — contains hydrolytic enzymes",
                  membrane: "Phospholipid bilayer — selectively permeable barrier",
                  wall: "Cell wall (plants) — rigid cellulose structure",
                };
                return info[activeOrganelle] ?? "";
              })()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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
      <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[280px]">
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
      <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[280px]">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[280px]">
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
      <div className="rounded-xl bg-muted/30 border border-border/50 dot-pattern flex items-center justify-center min-h-[280px]">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[300px]">
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
