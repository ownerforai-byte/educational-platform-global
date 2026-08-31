"use client";

import { useState } from "react";
import { Activity, Users, Mountain } from "lucide-react";

type Tab = "origin" | "evidence" | "theories" | "human";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "origin", label: "Origin of Life", icon: Activity, color: "#f59e0b" },
  { id: "evidence", label: "Evidence", icon: Mountain, color: "#22c55e" },
  { id: "theories", label: "Theories", icon: Activity, color: "#8b5cf6" },
  { id: "human", label: "Human Evolution", icon: Users, color: "#ef4444" },
];

function OriginOfLifeView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">ORIGIN OF LIFE — OPARIN-HALDANE THEORY</text>
        {/* Early Earth */}
        <rect x="20" y="40" width="280" height="160" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">EARLY EARTH (~4 BYA)</text>
        {[
          "No free oxygen (reducing atmosphere)",
          "Atmosphere: CH₄, NH₃, H₂, H₂O vapour",
          "High temperature, volcanic activity",
          "UV radiation, lightning frequent",
          "No life existed — abiogenesis possible",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 20} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Miller-Urey experiment */}
        <rect x="20" y="210" width="280" height="115" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="160" y="232" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">MILLER-UREY EXPERIMENT (1953)</text>
        <text x="160" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">Simulated early Earth conditions in a closed apparatus</text>
        <text x="50" y="278" fill="#fbbf24" fontSize="8">Chamber 1: CH₄ + NH₃ + H₂ + H₂O (atmosphere)</text>
        <text x="50" y="295" fill="#fbbf24" fontSize="8">Electric sparks (lightning) → energy source</text>
        <text x="50" y="312" fill="#4ade80" fontSize="8">Result: Amino acids (glycine, alanine, etc.) formed!</text>
        <text x="160" y="315" textAnchor="middle" fill="#94a3b8" fontSize="8">→ Organic molecules from inorganic precursors</text>

        {/* Right panel — timeline */}
        <rect x="310" y="40" width="270" height="285" rx="12" fill="rgba(245,158,11,0.05)" stroke="#f59e0b" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">TIMELINE OF LIFE</text>
        {[
          { era: "4.0 BYA", event: "First organic molecules (amino acids)", color: "#fbbf24" },
          { era: "3.8 BYA", event: "First protocells / coacervates", color: "#f59e0b" },
          { era: "3.5 BYA", event: "First prokaryotes (bacteria)", color: "#ef4444" },
          { era: "2.1 BYA", event: "First eukaryotes (endosymbiosis)", color: "#3b82f6" },
          { era: "0.5 BYA", event: "Cambrian explosion — rapid diversification", color: "#8b5cf6" },
          { era: "0.47 BYA", event: "Plants colonize land", color: "#22c55e" },
          { era: "0.36 BYA", event: "Amphibians → first vertebrates on land", color: "#06b6d4" },
          { era: "0.23 BYA", event: "Reptiles dominate (Age of Reptiles)", color: "#f59e0b" },
          { era: "0.065 BYA", event: "Mammals diversify after dinosaur extinction", color: "#ec4899" },
          { era: "0.006 BYA", event: "Hominids appear (human ancestors)", color: "#ef4444" },
        ].map((e, i) => (
          <g key={i}>
            <circle cx="335" cy={85 + i * 22} r="4" fill={e.color} />
            <line x1="339" y1={85 + i * 22} x2="445" y2={85 + i * 22} stroke={e.color} strokeWidth="0.5" opacity="0.4" />
            <text x="345" y={88 + i * 22} fill={e.color} fontSize="8" fontWeight="600">{e.era}</text>
            <text x="455" y={88 + i * 22} fill="#94a3b8" fontSize="7">{e.event}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Key Steps in Origin of Life", rows: ["Inorganic molecules → simple organic (amino acids, sugars)", "Simple organics → complex organics (proteins, nucleic acids)", "Complex organics → protocells (coacervates/oospores)", "Protocells → first living cells (prokaryotes)", "Prokaryotes → eukaryotes (endosymbiotic theory)"] },
          { name: "Evidence Supporting Abiogenesis", rows: ["Miller-Urey: proved organic molecules can form abiotically", "Hydrothermal vent theories: chemosynthetic origins", "RNA world hypothesis: RNA first, then DNA/proteins", "Fossil stromatolites: 3.5 BYA — oldest evidence of life"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs font-bold text-amber-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="700">EVIDENCES OF EVOLUTION</text>
        {/* Morphological */}
        <rect x="20" y="40" width="180" height="150" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">MORPHOLOGICAL</text>
        <text x="110" y="82" textAnchor="middle" fill="#94a3b8" fontSize="8">Homologous structures</text>
        <text x="110" y="100" textAnchor="middle" fill="#94a3b8" fontSize="7">Same basic plan, different function</text>
        <text x="110" y="120" fill="#fbbf24" fontSize="8">Example: forelimb of human, bat, whale</text>
        <text x="110" y="140" fill="#94a3b8" fontSize="7">Indicates common ancestry</text>
        <text x="110" y="165" fill="#f87171" fontSize="8">Analogous: different origin, same function</text>
        <text x="110" y="180" fill="#94a3b8" fontSize="7">(wing of insect vs bird)</text>

        {/* Anatomical */}
        <rect x="210" y="40" width="180" height="150" rx="12" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700">ANATOMICAL</text>
        <text x="300" y="82" textAnchor="middle" fill="#94a3b8" fontSize="8">Vestigial organs</text>
        <text x="300" y="100" fill="#fbbf24" fontSize="8">Appendix, coccyx, wisdom teeth</text>
        <text x="300" y="120" fill="#94a3b8" fontSize="7">Remnants of structures in ancestors</text>
        <text x="300" y="140" fill="#f87171" fontSize="8">Atavism: reappearance of ancestral traits</text>
        <text x="300" y="165" fill="#94a3b8" fontSize="7">e.g., extra toes, tail in humans</text>

        {/* Paleontological */}
        <rect x="400" y="40" width="180" height="150" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">PALEONTOLOGICAL</text>
        <text x="490" y="82" textAnchor="middle" fill="#94a3b8" fontSize="8">Fossil record</text>
        <text x="490" y="100" fill="#fbbf24" fontSize="8">Transitional fossils</text>
        <text x="490" y="120" fill="#94a3b8" fontSize="7">Archaeopteryx (reptile→bird)</text>
        <text x="490" y="140" fill="#94a3b8" fontSize="7">Ichthyostega (fish→amphibian)</text>
        <text x="490" y="165" fill="#f87171" fontSize="8">Shows gradual change over time</text>

        {/* Embryological */}
        <rect x="20" y="200" width="280" height="125" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="160" y="222" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">EMBRYOLOGICAL</text>
        <text x="160" y="242" textAnchor="middle" fill="#94a3b8" fontSize="8">Von Baer's law: early embryos of different vertebrates look similar</text>
        <text x="160" y="262" textAnchor="middle" fill="#fbbf24" fontSize="8">Gill slits in human embryo → evidence of fish ancestry</text>
        <text x="160" y="282" textAnchor="middle" fill="#94a3b8" fontSize="8">Recapitulation (briefly): ontogeny recapitulates phylogeny (modified)</text>
        <text x="160" y="310" textAnchor="middle" fill="#f87171" fontSize="8">Supports common ancestry of vertebrates</text>

        {/* Biochemical */}
        <rect x="310" y="200" width="270" height="125" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="445" y="222" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">BIOCHEMICAL</text>
        <text x="445" y="242" textAnchor="middle" fill="#94a3b8" fontSize="8">DNA & protein similarity</text>
        <text x="445" y="262" textAnchor="middle" fill="#fbbf24" fontSize="8">Human-chimp DNA: 98.7% identical</text>
        <text x="445" y="282" textAnchor="middle" fill="#94a3b8" fontSize="8">Cytochrome c: most similar in primates</text>
        <text x="445" y="310" textAnchor="middle" fill="#f87171" fontSize="8">Universal genetic code → common origin of all life</text>
      </svg>
    </div>
  );
}

function TheoriesView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">THEORIES OF EVOLUTION</text>
        {/* Lamarckism */}
        <rect x="20" y="40" width="180" height="240" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">LAMARCKISM</text>
        <text x="110" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Jean-Baptiste Lamarck (1809)</text>
        {[
          "Use and disuse theory",
          "Inheritance of acquired characters",
          "Giraffe: stretched neck → longer neck",
          "Flaws: acquired chars not inherited",
          "Modern genetics disproves it",
        ].map((f, i) => (
          <text key={i} x="35" y={100 + i * 28} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        <text x="110" y="255" textAnchor="middle" fill="#f87171" fontSize="8">✗ Largely rejected today</text>

        {/* Darwinism */}
        <rect x="210" y="40" width="180" height="240" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">DARWINISM</text>
        <text x="300" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Charles Darwin (1859)</text>
        {[
          "Overproduction → struggle for existence",
          "Variation exists in populations",
          "Natural selection: survival of fittest",
          " favourable variations inherited",
          "Descent with modification",
        ].map((f, i) => (
          <text key={i} x="225" y={100 + i * 28} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        <text x="300" y="255" textAnchor="middle" fill="#4ade80" fontSize="8">✓ Core concept still valid</text>

        {/* Neo-Darwinism */}
        <rect x="400" y="40" width="180" height="240" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">NEO-DARWINISM</text>
        <text x="490" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Modern synthesis (1930s-50s)</text>
        {[
          "Darwin + Mendelian genetics",
          "Mutation = source of variation",
          "Natural selection acts on genes",
          "Population genetics approach",
          "Gene flow, genetic drift",
        ].map((f, i) => (
          <text key={i} x="415" y={100 + i * 28} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        <text x="490" y="255" textAnchor="middle" fill="#c4b5fd" fontSize="8">✓ Current accepted theory</text>
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Key Difference", lamarck: "Acquired traits inherited", darwin: "Natural selection on variation", neo: "Genetics + natural selection" },
          { name: "Source of Change", lamarck: "Use/disuse of organs", darwin: "Random variation + selection", neo: "Mutation + recombination" },
          { name: "Status", lamarck: "Disproven", darwin: "Partially — lacks genetics", neo: "Accepted — modern synthesis" },
        ].map((r) => (
          <div key={r.name} className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
            <p className="text-xs font-bold text-violet-400">{r.name}</p>
            <p className="text-[10px] text-red-400 mt-1">Lamarck: {r.lamarck}</p>
            <p className="text-[10px] text-green-400 mt-0.5">Darwin: {r.darwin}</p>
            <p className="text-[10px] text-violet-400 mt-0.5">Neo: {r.neo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HumanEvolutionView() {
  const hominids = [
    { name: "Australopithecus", period: "4-2 MYA", brain: "~450 cc", feature: "Bipedal, small brain, ape-like face", color: "#92400e" },
    { name: "Homo habilis", period: "2.4-1.4 MYA", brain: "~650 cc", feature: "First tool maker (Oldowan)", color: "#b45309" },
    { name: "Homo erectus", period: "1.9 MYA-140 KYA", brain: "~900 cc", feature: "Controlled fire, migrated out of Africa", color: "#d97706" },
    { name: "Homo neanderthalensis", period: "400-40 KYA", brain: "~1500 cc", feature: "Buried dead, used tools, survived ice age", color: "#f59e0b" },
    { name: "Homo sapiens", period: "300 KYA-present", brain: "~1350 cc", feature: "Modern humans — art, language, civilization", color: "#22c55e" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 200" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">HUMAN EVOLUTION TIMELINE</text>
        {/* Timeline */}
        <line x1="40" y1="80" x2="560" y2="80" stroke="#64748b" strokeWidth="2" />
        {hominids.map((h, i) => (
          <g key={h.name}>
            <circle cx={60 + i * 105} cy="80" r="8" fill={h.color} />
            <line x1={60 + i * 105} y1="88" x2={60 + i * 105} y2="140" stroke={h.color} strokeWidth="1" />
            <text x={60 + i * 105} y="70" textAnchor="middle" fill={h.color} fontSize="8" fontWeight="600">{h.period}</text>
            <text x={60 + i * 105} y="155" textAnchor="middle" fill="#e2e8f0" fontSize="7">{h.name.split(" ")[1]}</text>
            <text x={60 + i * 105} y="170" textAnchor="middle" fill="#94a3b8" fontSize="6">{h.feature}</text>
          </g>
        ))}
        <text x="300" y="195" textAnchor="middle" fill="#64748b" fontSize="8">4 million years ago ← → Present</text>
      </svg>
      <div className="grid grid-cols-5 gap-2">
        {hominids.map((h) => (
          <div key={h.name} className="p-3 rounded-lg text-center" style={{ borderColor: `${h.color}30`, backgroundColor: `${h.color}08` }}>
            <p className="text-xs font-bold font-serif italic" style={{ color: h.color }}>{h.name}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{h.period}</p>
            <p className="text-[10px] font-mono mt-0.5" style={{ color: h.color }}>{h.brain}</p>
            <p className="text-[9px] text-muted-foreground mt-1">{h.feature}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Key Differences", rows: ["New World monkeys: prehensile tail, broad nose", "Old World monkeys: no tail, narrow nose, ischial callosities", "Apes: no tail, larger brain, broader chest", "Humans: bipedal, largest brain, no body hair, complex culture"] },
          { name: "Human Evolution Highlights", rows: ["Bipedalism evolved first (~4 MYA)", "Brain size increased: 450cc → 1350cc", "Tool use: Oldowan (H. habilis) → Acheulean (H. erectus)", "Fire control: H. erectus (~1 MYA)", "Art & language: H. sapiens (~50 KYA)"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
            <p className="text-xs font-bold text-rose-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiologyEvolution3D() {
  const [tab, setTab] = useState<Tab>("origin");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><active.icon className="h-5 w-5 text-amber-600" /></div>
        <div><h2 className="font-semibold text-base">Evolution & Classification 3D</h2><p className="text-xs text-muted-foreground">NEB XI Unit 7 — Origin of life, evidence, theories, human evolution</p></div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {TABS.map((t) => {
          const Ti = t.icon;
          const isActive = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? "shadow-md ring-1" : "bg-muted text-muted-foreground hover:bg-muted/80"}`} style={isActive ? { backgroundColor: `${t.color}18`, color: t.color, borderColor: t.color } : undefined}>
              <Ti className="h-3 w-3" />{t.label}
            </button>
          );
        })}
      </div>
      <div className="min-h-[280px] rounded-xl border border-border bg-card overflow-auto">
        {tab === "origin" && <OriginOfLifeView />}
        {tab === "evidence" && <EvidenceView />}
        {tab === "theories" && <TheoriesView />}
        {tab === "human" && <HumanEvolutionView />}
      </div>
    </div>
  );
}
