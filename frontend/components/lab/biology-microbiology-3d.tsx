"use client";

import { useState } from "react";
import { Bug, Radio, Activity } from "lucide-react";

type Tab = "bacteria" | "cyanobacteria" | "virus" | "bacteriophage";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "bacteria", label: "Bacterial Cell", icon: Bug, color: "#ef4444" },
  { id: "cyanobacteria", label: "Cyanobacteria", icon: Bug, color: "#06b6d4" },
  { id: "virus", label: "Virus Structure", icon: Radio, color: "#f59e0b" },
  { id: "bacteriophage", label: "Bacteriophage", icon: Activity, color: "#8b5cf6" },
];

function BacterialCellView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 380" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">BACTERIAL CELL — MONERA</text>
        {/* Cell outline (capsule) */}
        <ellipse cx="200" cy="190" rx="140" ry="100" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="2" />
        {/* Capsule */}
        <ellipse cx="200" cy="190" rx="130" ry="92" fill="none" stroke="#f87171" strokeWidth="1" strokeDasharray="4,2" />
        <text x="200" y="100" textAnchor="middle" fill="#f87171" fontSize="8">Capsule (slime layer)</text>
        {/* Cell wall */}
        <ellipse cx="200" cy="190" rx="115" ry="82" fill="none" stroke="#ef4444" strokeWidth="2" />
        <text x="200" y="115" textAnchor="middle" fill="#ef4444" fontSize="8">Cell wall (peptidoglycan)</text>
        {/* Cell membrane */}
        <ellipse cx="200" cy="190" rx="100" ry="72" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="200" y="128" textAnchor="middle" fill="#94a3b8" fontSize="7">Cell membrane (selectively permeable)</text>
        {/* Cytoplasm */}
        <ellipse cx="200" cy="190" rx="85" ry="60" fill="rgba(239,68,68,0.05)" />
        {/* Nucleoid (DNA) */}
        <path d="M 150 180 Q 170 160 200 175 Q 230 190 250 170 Q 270 150 280 170" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        <text x="215" y="200" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Nucleoid (circular DNA)</text>
        <text x="215" y="215" textAnchor="middle" fill="#94a3b8" fontSize="7">No nuclear membrane · No histones</text>
        {/* Plasmid */}
        <circle cx="160" cy="220" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="160" y="240" textAnchor="middle" fill="#fbbf24" fontSize="7">Plasmid (extra DNA)</text>
        {/* Ribosomes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <circle key={i} cx={150 + Math.random() * 100} cy={150 + Math.random() * 80} r="2" fill="#fbbf24" opacity="0.6" />
        ))}
        <text x="200" y="260" textAnchor="middle" fill="#94a3b8" fontSize="7">70S ribosomes (protein synthesis)</text>
        {/* Mesosome */}
        <path d="M 250 160 Q 260 170 250 180" fill="none" stroke="#f97316" strokeWidth="1.5" />
        <text x="270" y="175" fill="#fb923c" fontSize="7">Mesosome</text>
        {/* Flagellum */}
        <path d="M 340 190 Q 370 180 400 190 Q 430 200 450 190" fill="none" stroke="#ef4444" strokeWidth="2" />
        <text x="420" y="215" textAnchor="middle" fill="#f87171" fontSize="8">Flagellum (locomotion)</text>
        {/* Pili */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={320 + i * 8} y1="270" x2={325 + i * 8} y2="295" stroke="#ef4444" strokeWidth="1" />
        ))}
        <text x="345" y="305" textAnchor="middle" fill="#94a3b8" fontSize="7">Pili (conjugation/f附着)</text>

        {/* Right panel — Features */}
        <rect x="370" y="40" width="210" height="330" rx="12" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1" />
        <text x="475" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">BACTERIAL FEATURES</text>
        {[
          { item: "Prokaryotic", desc: "No nucleus, no membrane-bound organelles" },
          { item: "Cell wall", desc: "Peptidoglycan (murein) — Gram+" },
          { item: "Shape types", desc: "Coccus (round), Bacillus (rod), Vibrio (comma), Spirillum (spiral)" },
          { item: "Reproduction", desc: "Binary fission (asexual) — rapid" },
          { item: " Nutrition", desc: "Autotrophic (photosynthetic/chemosynthetic) or heterotrophic" },
          { item: "Oxygen", desc: "Aerobic, anaerobic, or facultative" },
          { item: "Spores", desc: "Endospores — resistant structures (Bacillus, Clostridium)" },
          { item: "Size", desc: "0.5–5 μm (microscopic)" },
        ].map((f, i) => (
          <g key={i}>
            <text x="385" y={85 + i * 32} fill="#fbbf24" fontSize="9" fontWeight="600">{f.item}</text>
            <text x="385" y={100 + i * 32} fill="#94a3b8" fontSize="7">{f.desc}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: "Coccus", shape: "●", desc: "Single, diplococci, streptococci, staphylococci" },
          { name: "Bacillus", shape: "▬", desc: "Single, diplobacilli, streptobacilli" },
          { name: "Vibrio", shape: ",", desc: "Comma-shaped (e.g., Vibrio cholerae)" },
          { name: "Spirillum", shape: "∿", desc: "Spiral-shaped (e.g., Spirillum volvulus)" },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-center">
            <p className="text-2xl font-serif">{s.shape}</p>
            <p className="text-xs font-bold text-red-400 mt-1">{s.name}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CyanobacteriaView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="700">CYANOBACTERIA — BLUE-GREEN ALGAE</text>
        <rect x="20" y="40" width="560" height="240" rx="12" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" />
        {/* Filament */}
        <line x1="50" y1="120" x2="550" y2="120" stroke="#06b6d4" strokeWidth="3" opacity="0.5" />
        {/* Cells */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <ellipse key={i} cx={70 + i * 45} cy="120" rx="18" ry="12" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" />
        ))}
        {/* Heterocyst */}
        <ellipse cx={260} cy="120" rx="22" ry="14" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="2" />
        <text x="260" y="124" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="600">Heterocyst</text>
        <text x="260" y="155" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="600">Heterocyst — N₂ fixation</text>
        {/* Akinete */}
        <ellipse cx="470" cy="120" rx="20" ry="15" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" />
        <text x="470" y="124" textAnchor="middle" fill="#f87171" fontSize="7" fontWeight="600">Akinete</text>
        <text x="470" y="155" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="600">Akinete — Resting spore</text>
        {/* Labels */}
        <LabelTag x={130} y={160} symbol="Φ" name="Thylakoids" desc="Photosynthetic membranes" color="#06b6d4" />
        <LabelTag x={130} y={180} symbol="HC" name="Hormogonia" desc="Fragment for reproduction" color="#67e8f9" />
        <LabelTag x={350} y={180} symbol="N₂" name="Nitrogen fixation" desc="In heterocysts only" color="#fbbf24" />
        {/* Info box */}
        <rect x="20" y="200" width="560" height="70" rx="8" fill="rgba(6,182,212,0.05)" stroke="#06b6d4" strokeWidth="0.5" />
        <text x="300" y="222" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">KEY FEATURES OF CYANOBACTERIA</text>
        <text x="80" y="242" fill="#94a3b8" fontSize="8">Photosynthetic (Chl a, phycocyanin, phycoerythrin)</text>
        <text x="80" y="257" fill="#94a3b8" fontSize="8">O₂-producing (oxygenic photosynthesis)</text>
        <text x="350" y="242" fill="#94a3b8" fontSize="8">Examples: Nostoc, Oscillatoria, Anabaena, Microcystis</text>
        <text x="350" y="257" fill="#94a3b8" fontSize="8">Economic: soil fertility (N₂ fixation), food (Spirulina), algal blooms</text>
      </svg>
    </div>
  );
}

function VirusView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">VIRUS STRUCTURE</text>
        {/* Icosahedral virus */}
        <polygon points="300,60 360,100 360,170 300,210 240,170 240,100" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="2" />
        <polygon points="300,80 345,110 345,160 300,185 255,160 255,110" fill="rgba(245,158,11,0.1)" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="300" cy="135" r="20" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="300" y="138" textAnchor="middle" fill="#f87171" fontSize="7" fontWeight="600">RNA/DNA</text>
        <text x="300" y="240" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600">Icosahedral Virus (e.g., Adenovirus)</text>
        <LabelTag x={360} y={85} symbol="Capsomere" name="Protein subunit" desc="Forms capsid shell" color="#f59e0b" />
        <LabelTag x={300} y={260} symbol="φ" name="Capsid" desc="Protein coat — protects nucleic acid" color="#fbbf24" />
        {/* Enveloped virus */}
        <rect x="20" y="270" width="280" height="65" rx="8" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="160" y="292" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600">ENVELOPED VIRUS (e.g., Influenza, HIV)</text>
        <text x="160" y="310" textAnchor="middle" fill="#94a3b8" fontSize="8">Lipid bilayer envelope (from host membrane) + spike proteins</text>
        <text x="160" y="325" textAnchor="middle" fill="#94a3b8" fontSize="8">Envelope helps entry but makes virus fragile outside host</text>
        {/* Properties */}
        <rect x="310" y="270" width="270" height="65" rx="8" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="445" y="292" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="600">VIRUS PROPERTIES</text>
        <text x="325" y="310" fill="#94a3b8" fontSize="8">• Acellular — not cells</text>
        <text x="325" y="323" fill="#94a3b8" fontSize="8">• Obligate intracellular parasites</text>
        <text x="460" y="310" fill="#94a3b8" fontSize="8">• No metabolism of their own</text>
        <text x="460" y="323" fill="#94a3b8" fontSize="8">• Crystallisable (inanimate outside host)</text>
        {/* Types */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: "DNA virus", examples: "Herpes, Smallpox, Adeno", color: "#ef4444" },
            { name: "RNA virus", examples: "Influenza, HIV, Rabies, SARS", color: "#f97316" },
            { name: "Bacteriophage", examples: "T4 phage, λ phage", color: "#8b5cf6" },
            { name: "Retrovirus", examples: "HIV — RNA → DNA reverse transcriptase", color: "#ec4899" },
          ].map((v) => (
            <div key={v.name} className="p-2.5 rounded-lg text-center" style={{ borderColor: `${v.color}30`, backgroundColor: `${v.color}08` }}>
              <p className="text-xs font-bold" style={{ color: v.color }}>{v.name}</p>
              <p className="text-[9px] text-muted-foreground mt-1">{v.examples}</p>
            </div>
          ))}
        </div>
      </svg>
    </div>
  );
}

function BacteriophageView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 380" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">BACTERIOPHAGE T4 — STRUCTURE & LIFE CYCLE</text>
        {/* Phage structure */}
        <rect x="20" y="40" width="280" height="260" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">PHAGE T4 STRUCTURE</text>
        {/* Head (capsid) */}
        <polygon points="160,100 200,130 200,180 160,210 120,180 120,130" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="2" />
        <text x="160" y="158" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="600">Head</text>
        <text x="160" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7">(dsDNA)</text>
        {/* Tail sheath */}
        <rect x="145" y="210" width="30" height="50" rx="3" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="190" y="240" textAnchor="start" fill="#c4b5fd" fontSize="8">Tail sheath</text>
        {/* Tail tube */}
        <rect x="152" y="260" width="16" height="25" rx="2" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1" />
        {/* Base plate */}
        <rect x="140" y="285" width="40" height="10" rx="2" fill="rgba(139,92,246,0.25)" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="160" y="305" textAnchor="middle" fill="#c4b5fd" fontSize="8">Base plate</text>
        {/* Tail fibers */}
        <line x1="140" y1="290" x2="110" y2="310" stroke="#8b5cf6" strokeWidth="1.5" />
        <line x1="180" y1="290" x2="210" y2="310" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="230" y="315" fill="#c4b5fd" fontSize="8">Tail fibers (attachment)</text>
        <LabelTag x={120} y={120} symbol="dsDNA" name="Genetic material" desc="Double-stranded DNA" color="#8b5cf6" />
        {/* Life cycle */}
        <rect x="310" y="40" width="270" height="260" rx="12" fill="rgba(139,92,246,0.05)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">LYTIC CYCLE</text>
        {[
          { step: "1. Attachment", desc: "Tail fibers bind to specific receptors on bacterial cell wall", y: 85 },
          { step: "2. Penetration", desc: "Tail sheath contracts, DNA injected into host cell", y: 120 },
          { step: "3. Biosynthesis", desc: "Host machinery makes phage DNA & proteins", y: 155 },
          { step: "4. Assembly", desc: "New phage particles assembled from components", y: 190 },
          { step: "5. Lysis", desc: "Lysozyme breaks cell wall, new phages released", y: 225 },
        ].map((s) => (
          <g key={s.step}>
            <rect x="325" y={s.y} width="240" height="28" rx="4" fill="rgba(139,92,246,0.1)" />
            <text x="335" y={s.y + 12} fill="#c4b5fd" fontSize="8" fontWeight="600">{s.step}</text>
            <text x="335" y={s.y + 24} fill="#94a3b8" fontSize="7">{s.desc}</text>
          </g>
        ))}
        <text x="445" y="330" textAnchor="middle" fill="#fbbf24" fontSize="9">Lysogenic cycle also possible (prophage integration)</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Lytic vs Lysogenic", rows: ["Lytic: phage replicates & lyses host immediately", "Lysogenic: phage DNA integrates as prophage, replicates with host", "Induction: prophage can switch to lytic cycle under stress"] },
          { name: "Economic Importance", rows: ["Phage therapy — alternative to antibiotics", "Bacteriocins — natural antimicrobials", "Genetic engineering tools (restriction enzymes)", "Biological control of bacterial diseases"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
            <p className="text-xs font-bold text-violet-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LabelTag({ x, y, symbol, name, desc: _desc, color }: { x: number; y: number; symbol: string; name: string; desc: string; color: string }) {
  return (
    <g>
      <rect x={x - 55} y={y - 10} width="110" height="20" rx="4" fill="rgba(15,23,42,0.9)" stroke={color} strokeWidth="0.5" />
      <text x={x} y={y - 1} textAnchor="middle" fill={color} fontSize="8" fontWeight="700" fontFamily="Georgia" fontStyle="italic">{symbol}</text>
      <text x={x} y={y + 8} textAnchor="middle" fill="#e2e8f0" fontSize="6">{name}</text>
    </g>
  );
}

export function BiologyMicrobiology3D() {
  const [tab, setTab] = useState<Tab>("bacteria");
  const active = TABS.find((t) => t.id === tab)!;
  const I = active.icon;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><I className="h-5 w-5" style={{ color: active.color }} /></div>
        <div><h2 className="font-semibold text-base">Introductory Microbiology 3D</h2><p className="text-xs text-muted-foreground">NEB XI Unit 3 — Monera (Bacteria, Cyanobacteria), Virus, Bacteriophage</p></div>
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
      <div className="min-h-[350px] rounded-xl border border-border bg-card overflow-auto">
        {tab === "bacteria" && <BacterialCellView />}
        {tab === "cyanobacteria" && <CyanobacteriaView />}
        {tab === "virus" && <VirusView />}
        {tab === "bacteriophage" && <BacteriophageView />}
      </div>
    </div>
  );
}
