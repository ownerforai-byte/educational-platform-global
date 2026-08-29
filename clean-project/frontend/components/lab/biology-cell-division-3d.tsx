"use client";

import { useState } from "react";
import { Binary } from "lucide-react";

type Tab = "amitosis" | "mitosis" | "meiosis";

const TABS: { id: Tab; label: string }[] = [
  { id: "amitosis", label: "Amitosis" },
  { id: "mitosis", label: "Mitosis" },
  { id: "meiosis", label: "Meiosis" },
];

function AmitosisView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">AMITOSIS — DIRECT CELL DIVISION</text>
        {/* Simple binary fission */}
        <circle cx="150" cy="140" r="60" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="2" />
        <text x="150" y="135" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="600">Parent cell</text>
        <text x="150" y="150" textAnchor="middle" fill="#94a3b8" fontSize="8">Nucleus elongates</text>
        <text x="150" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Cytokinesis occurs</text>

        <text x="250" y="140" textAnchor="middle" fill="#a78bfa" fontSize="20">→</text>

        <circle cx="400" cy="140" r="50" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="2" />
        <circle cx="460" cy="140" r="50" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="2" />
        <text x="400" y="210" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="600">2 Daughter cells</text>
        <text x="400" y="225" textAnchor="middle" fill="#94a3b8" fontSize="8">(identical to parent)</text>

        {/* Features */}
        <rect x="30" y="240" width="540" height="30" rx="6" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="0.5" />
        <text x="300" y="253" textAnchor="middle" fill="#c4b5fd" fontSize="9">Simple division · No spindle fibres · No chromosome condensation · Occurs in prokaryotes & some eukaryotic cells</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
          <p className="text-xs font-bold text-violet-400">Where it occurs</p>
          <p className="text-[10px] text-muted-foreground mt-1">Prokaryotes (binary fission), Amoeba, some protozoans, damaged/aging cells</p>
        </div>
        <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
          <p className="text-xs font-bold text-violet-400">Significance</p>
          <p className="text-[10px] text-muted-foreground mt-1">Rapid reproduction · Maintenance of cell number · Wound healing (some tissues)</p>
        </div>
      </div>
    </div>
  );
}

function MitosisView() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { name: "Interphase", desc: "Cell prepares for division. DNA replicates (S phase). Cell grows.", key: "2n → 2n (duplicated)" },
    { name: "Prophase", desc: "Chromosomes condense. Nuclear envelope breaks down. Spindle fibres form.", key: "Chromatin → visible chromosomes" },
    { name: "Metaphase", desc: "Chromosomes align at metaphase plate (equator). Spindle attaches to centromeres.", key: "Chromosomes at equator" },
    { name: "Anaphase", desc: "Sister chromatids separate. Pull towards opposite poles. Cell elongates.", key: "Chromatids → individual chromosomes" },
    { name: "Telophase", desc: "Chromosomes decondense. Nuclear envelope reforms. Cell begins to pinch.", key: "2 nuclei formed" },
    { name: "Cytokinesis", desc: "Cytoplasm divides. Cell plate (plants) or cleavage furrow (animals) forms.", key: "1 cell → 2 identical diploid cells" },
  ];

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">MITOSIS — EQUATIONAL DIVISION</text>

        {/* Cell outline */}
        <ellipse cx="300" cy="150" rx="200" ry="100" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,3" />
        <text x="300" y="60" textAnchor="middle" fill="#f87171" fontSize="9">Cell</text>

        {/* Phases visualization */}
        {[
          { phase: 0, x: 80, color: "#fbbf24", elements: [{ type: "chromatin", x: 80, y: 140 }] },
          { phase: 1, x: 180, color: "#ef4444", elements: [{ type: "condensed", x: 180, y: 130 }, { type: "condensed", x: 180, y: 160 }] },
          { phase: 2, x: 280, color: "#3b82f6", elements: [{ type: "aligned", x: 280, y: 150 }] },
          { phase: 3, x: 380, color: "#10b981", elements: [{ type: "separating", x: 360, y: 120 }, { type: "separating", x: 400, y: 180 }] },
          { phase: 4, x: 480, color: "#8b5cf6", elements: [{ type: "decondensed", x: 460, y: 130 }, { type: "decondensed", x: 500, y: 170 }] },
        ].map((p) => (
          <g
            key={p.phase}
            onClick={() => setPhase(p.phase)}
            className="cursor-pointer"
            opacity={phase === p.phase ? 1 : 0.5}
          >
            {/* Spindle fibres */}
            {p.phase >= 1 && p.phase <= 4 && (
              <>
                <line x1={p.x} y1={p.phase === 2 ? 100 : 90} x2={p.x} y2={p.phase === 2 ? 200 : 210} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
              </>
            )}
            {/* Chromosomes */}
            {p.elements.map((el, i) => {
              if (el.type === "chromatin") return <circle key={i} cx={el.x} cy={el.y} r="15" fill={`${p.color}30`} stroke={p.color} strokeWidth="1" />;
              if (el.type === "condensed") return <rect key={i} x={el.x - 6} y={el.y - 12} width="12" height="24" rx="3" fill={p.color} opacity="0.8" />;
              if (el.type === "aligned") return <g key={i}>{Array.from({ length: 4 }).map((_, j) => <rect key={j} x={el.x - 20 + j * 13} y={el.y - 8} width="10" height="16" rx="2" fill={p.color} opacity="0.8" />)}</g>;
              if (el.type === "separating") return <rect key={i} x={el.x - 5} y={el.y - 10} width="10" height="20" rx="2" fill={p.color} opacity="0.8" />;
              return <circle key={i} cx={el.x} cy={el.y} r="10" fill={`${p.color}30`} stroke={p.color} strokeWidth="1" />;
            })}
            <text x={p.x} y="230" textAnchor="middle" fill={p.color} fontSize="8" fontWeight={phase === p.phase ? "700" : "400"}>
              {["Inter", "Pro", "Meta", "Ana", "Telo"][p.phase]}
            </text>
          </g>
        ))}
      </svg>

      <div className="flex gap-1 flex-wrap">
        {phases.map((p, i) => (
          <button key={i} onClick={() => setPhase(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${phase === i ? "bg-red-500/20 text-red-600 border border-red-500/40" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
          <p className="text-xs font-bold text-red-400">{phases[phase].name}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{phases[phase].desc}</p>
        </div>
        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs font-bold text-blue-400">Key Event</p>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">{phases[phase].key}</p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <p className="text-xs font-bold text-emerald-400">Result</p>
          <p className="text-[10px] text-muted-foreground mt-1">2 identical diploid (2n) daughter cells</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Mitosis in Plants", desc: "Cell plate forms (no centrioles) · Occurs in meristematic tissue · Apical & lateral meristems" },
          { name: "Mitosis in Animals", desc: "Centrioles present · Cleavage furrow forms · Occurs in somatic cells throughout body" },
        ].map((r) => (
          <div key={r.name} className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
            <p className="text-xs font-bold text-violet-400">{r.name}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeiosisView() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { name: "Interphase", desc: "DNA replication. Cell grows. 2n with duplicated chromosomes (sister chromatids).", key: "2n → 2n (4 chromatids per chromosome)" },
    { name: "Meiosis I — Prophase I", desc: "Chromosomes condense. Homologous pairing (synapsis). Crossing over at chiasmata.", key: "Tetrad formation · Genetic recombination" },
    { name: "Meiosis I — Metaphase I", desc: "Homologous pairs align at equator. Independent assortment.", key: "2n → tetrads at plate" },
    { name: "Meiosis I — Anaphase I", desc: "Homologous chromosomes separate. Reductive division.", key: "n → each pole gets 1 from each pair" },
    { name: "Meiosis I — Telophase I", desc: "Two haploid cells form. Chromosomes still have 2 chromatids.", key: "2 cells · n (diploid chromosomes)" },
    { name: "Meiosis II — Similar to Mitosis", desc: "Sister chromatids separate. No DNA replication between I and II.", key: "n → n (single chromatid chromosomes)" },
    { name: "Final Result", desc: "Four genetically unique haploid gametes from one diploid parent cell.", key: "1 2n cell → 4 unique n cells" },
  ];

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 260" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">MEIOSIS — REDUCTIVE DIVISION</text>

        {/* Parent cell */}
        <circle cx="100" cy="130" r="40" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="2" />
        <text x="100" y="127" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="600">Parent</text>
        <text x="100" y="140" textAnchor="middle" fill="#94a3b8" fontSize="7">(2n)</text>

        <text x="170" y="135" textAnchor="middle" fill="#a78bfa" fontSize="16">→</text>

        {/* After Meiosis I */}
        <circle cx="240" cy="100" r="30" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="240" y="97" textAnchor="middle" fill="#f87171" fontSize="7" fontWeight="600">Cell 1</text>
        <text x="240" y="110" textAnchor="middle" fill="#94a3b8" fontSize="6">(n)</text>
        <circle cx="240" cy="160" r="30" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="240" y="157" textAnchor="middle" fill="#f87171" fontSize="7" fontWeight="600">Cell 2</text>
        <text x="240" y="170" textAnchor="middle" fill="#94a3b8" fontSize="6">(n)</text>

        <text x="300" y="135" textAnchor="middle" fill="#a78bfa" fontSize="14">→</text>

        {/* After Meiosis II */}
        <circle cx="380" cy="75" r="22" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
        <text x="380" y="72" textAnchor="middle" fill="#34d399" fontSize="6" fontWeight="600">Gamete 1</text>
        <circle cx="380" cy="120" r="22" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
        <text x="380" y="117" textAnchor="middle" fill="#34d399" fontSize="6" fontWeight="600">Gamete 2</text>
        <circle cx="380" cy="155" r="22" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
        <text x="380" y="152" textAnchor="middle" fill="#34d399" fontSize="6" fontWeight="600">Gamete 3</text>
        <circle cx="380" cy="195" r="22" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
        <text x="380" y="192" textAnchor="middle" fill="#34d399" fontSize="6" fontWeight="600">Gamete 4</text>

        <text x="440" y="135" textAnchor="middle" fill="#a78bfa" fontSize="14">→</text>

        <text x="530" y="135" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">4 unique</text>
        <text x="530" y="148" textAnchor="middle" fill="#34d399" fontSize="8">haploid cells</text>
      </svg>

      <div className="flex gap-1 flex-wrap">
        {phases.map((p, i) => (
          <button key={i} onClick={() => setPhase(i)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${phase === i ? "bg-violet-500/20 text-violet-600 border border-violet-500/40" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
          <p className="text-xs font-bold text-violet-400">{phases[phase].name}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{phases[phase].desc}</p>
        </div>
        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
          <p className="text-xs font-bold text-blue-400">Key Event</p>
          <p className="text-[10px] text-muted-foreground mt-1 font-mono">{phases[phase].key}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Crossing Over", desc: "Prophase I — exchange of genetic material between homologous chromosomes", color: "#ef4444" },
          { name: "Independent Assortment", desc: "Metaphase I — random alignment of homologous pairs", color: "#3b82f6" },
          { name: "Reduction Division", desc: "Meiosis I — 2n → n (chromosome number halved)", color: "#10b981" },
        ].map((r) => (
          <div key={r.name} className="p-3 rounded-lg" style={{ borderColor: `${r.color}30`, backgroundColor: `${r.color}08` }}>
            <p className="text-xs font-bold" style={{ color: r.color }}>{r.name}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiologyCellDivision3D() {
  const [tab, setTab] = useState<Tab>("mitosis");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><Binary className="h-5 w-5 text-violet-600" /></div>
        <div><h2 className="font-semibold text-base">Cell Division 3D</h2><p className="text-xs text-muted-foreground">NEB XI Unit 1 — Amitosis, Mitosis, Meiosis with interactive phases</p></div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${tab === t.id ? "bg-violet-500/20 text-violet-600 border border-violet-500/40" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="min-h-[320px] rounded-xl border border-border bg-card overflow-auto">
        {tab === "amitosis" && <AmitosisView />}
        {tab === "mitosis" && <MitosisView />}
        {tab === "meiosis" && <MeiosisView />}
      </div>
    </div>
  );
}
