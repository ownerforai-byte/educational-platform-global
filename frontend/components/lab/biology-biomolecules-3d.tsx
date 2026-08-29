"use client";

import { useState } from "react";
import { Beaker, Dna, Microscope, Leaf, TestTube } from "lucide-react";

type Tab =
  | "carbs" | "proteins" | "lipids" | "nucleic"
  | "enzymes" | "water" | "minerals" | "intro";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "intro", label: "Intro to Biomolecules", icon: Beaker, color: "#f59e0b" },
  { id: "carbs", label: "Carbohydrates", icon: Leaf, color: "#f59e0b" },
  { id: "proteins", label: "Proteins", icon: Beaker, color: "#ef4444" },
  { id: "lipids", label: "Lipids", icon: Beaker, color: "#8b5cf6" },
  { id: "nucleic", label: "Nucleic Acids", icon: Dna, color: "#3b82f6" },
  { id: "enzymes", label: "Enzymes", icon: TestTube, color: "#10b981" },
  { id: "water", label: "Water", icon: Beaker, color: "#06b6d4" },
  { id: "minerals", label: "Minerals", icon: Microscope, color: "#ec4899" },
];

function LabelTag({ x, y, symbol, name, desc, color }: { x: number; y: number; symbol: string; name: string; desc: string; color: string }) {
  return (
    <g className="cursor-pointer hover:opacity-80 transition-opacity">
      <line x1={x} y1={y} x2={x + 30} y2={y - 20} stroke={color} strokeWidth="1.5" strokeDasharray="3,2" />
      <circle cx={x} cy={y} r="3" fill={color} />
      <rect x={x + 35} y={y - 30} width="140" height="38" rx="6" fill="rgba(15,23,42,0.9)" stroke={color} strokeWidth="1" />
      <text x={x + 40} y={y - 16} fill={color} fontSize="10" fontWeight="700" fontFamily="Georgia,serif" fontStyle="italic">{symbol}</text>
      <text x={x + 40} y={y - 6} fill="#e2e8f0" fontSize="9" fontWeight="600">{name}</text>
      <text x={x + 40} y={y + 4} fill="#94a3b8" fontSize="7">{desc}</text>
    </g>
  );
}

function IntroView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">BIOMOLECULES — INTRODUCTION</text>
        <text x="300" y="42" textAnchor="middle" fill="#94a3b8" fontSize="8">NEB XI Unit 1 · Organic compounds essential for life processes</text>
        {/* Central concept map */}
        <circle cx="300" cy="160" r="50" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="2" />
        <text x="300" y="155" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="700">BIOMOLECULES</text>
        <text x="300" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7">Essential for life</text>
        {/* Branches */}
        {[
          { label: "Carbohydrates", formula: "(CH₂O)ₙ", color: "#f59e0b", angle: -72, dist: 130 },
          { label: "Proteins", formula: "Polymer of AA", color: "#ef4444", angle: -36, dist: 130 },
          { label: "Lipids", formula: "Hydrophobic", color: "#8b5cf6", angle: 0, dist: 130 },
          { label: "Nucleic Acids", formula: "DNA/RNA", color: "#3b82f6", angle: 36, dist: 130 },
          { label: "Enzymes", formula: "Biocatalysts", color: "#10b981", angle: 72, dist: 130 },
        ].map((b) => {
          const rad = (b.angle * Math.PI) / 180;
          const cx = 300 + b.dist * Math.cos(rad);
          const cy = 160 + b.dist * Math.sin(rad);
          return (
            <g key={b.label}>
              <line x1="300" y1="160" x2={cx} y2={cy} stroke={b.color} strokeWidth="1.5" opacity="0.5" />
              <circle cx={cx} cy={cy} r="35" fill={`${b.color}18`} stroke={b.color} strokeWidth="1.5" />
              <text x={cx} y={cy - 4} textAnchor="middle" fill={b.color} fontSize="8" fontWeight="600">{b.label}</text>
              <text x={cx} y={cy + 8} textAnchor="middle" fill="#94a3b8" fontSize="7">{b.formula}</text>
            </g>
          );
        })}
        {/* Key functions */}
        <rect x="20" y="290" width="560" height="40" rx="8" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="0.5" />
        <text x="300" y="310" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">KEY FUNCTIONS</text>
        <text x="300" y="325" textAnchor="middle" fill="#94a3b8" fontSize="8">
          Energy source · Structural support · Catalysis · Genetic information · Transport · Regulation · Protection
        </text>
      </svg>
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: "Carbohydrates", kcal: "4 kcal/g", role: "Primary energy source", color: "#f59e0b" },
          { name: "Proteins", kcal: "4 kcal/g", role: "Structure, enzymes, transport", color: "#ef4444" },
          { name: "Lipids", kcal: "9 kcal/g", role: "Energy storage, membranes", color: "#8b5cf6" },
          { name: "Nucleic Acids", kcal: "—", role: "Genetic information storage", color: "#3b82f6" },
        ].map((r) => (
          <div key={r.name} className="p-3 rounded-lg text-center" style={{ borderColor: `${r.color}30`, backgroundColor: `${r.color}08` }}>
            <p className="text-xs font-bold" style={{ color: r.color }}>{r.name}</p>
            <p className="text-[10px] font-mono mt-1" style={{ color: r.color }}>{r.kcal}</p>
            <p className="text-[9px] text-muted-foreground mt-1">{r.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CarbsView() {
  const monoSacs = [
    { name: "Glucose", formula: "C₆H₁₂O₆", role: "Blood sugar, cellular fuel", source: "Photosynthesis, digestion" },
    { name: "Fructose", formula: "C₆H₁₂O₆", role: "Fruit sugar, sweetest", source: "Fruits, honey" },
    { name: "Galactose", formula: "C₆H₁₂O₆", role: "Component of lactose", source: "Milk sugar breakdown" },
    { name: "Ribose", formula: "C₅H₁₀O₅", role: "RNA backbone, ATP", source: "Pentose phosphate pathway" },
    { name: "Deoxyribose", formula: "C₅H₁₀O₅", role: "DNA backbone", source: "Ribonucleotide reduction" },
  ];
  const diSacs = [
    { name: "Sucrose", formula: "Glc + Fru", bond: "α-1,2", source: "Sugar cane, beet" },
    { name: "Maltose", formula: "Glc + Glc", bond: "α-1,4", source: "Germinating grain" },
    { name: "Lactose", formula: "Glc + Gal", bond: "β-1,4", source: "Mammalian milk" },
  ];
  const polySacs = [
    { name: "Starch", sub: "Amylose + Amylopectin", role: "Plant energy storage", bond: "α-1,4 (amylose), α-1,6 (branch)" },
    { name: "Glycogen", sub: "Highly branched", role: "Animal energy storage (liver, muscle)", bond: "α-1,4 + α-1,6 (more branches than starch)" },
    { name: "Cellulose", sub: "Linear chains", role: "Plant cell wall structure", bond: "β-1,4 ( Humans can't digest)" },
    { name: "Chitin", sub: "N-acetylglucosamine", role: "Fungal cell wall, arthropod exoskeleton", bond: "β-1,4 with NHCOCH₃ group" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">CARBOHYDRATES — CLASSIFICATION</text>
        {/* Classification tree */}
        <rect x="20" y="40" width="560" height="230" rx="12" fill="rgba(245,158,11,0.05)" stroke="#f59e0b" strokeWidth="1" />
        {/* Simple carbs */}
        <rect x="35" y="55" width="160" height="195" rx="8" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="1" />
        <text x="115" y="75" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="700">SIMPLE (Mono + Di)</text>
        <text x="115" y="95" textAnchor="middle" fill="#94a3b8" fontSize="7">Mono: 1 sugar unit</text>
        <text x="115" y="108" textAnchor="middle" fill="#94a3b8" fontSize="7">Di: 2 sugar units</text>
        {[
          { name: "Monosaccharides", items: "Glucose, Fructose, Galactose (C₆H₁₂O₆)\nRibose, Deoxyribose (C₅H₁₀O₅)", y: 125 },
          { name: "Disaccharides", items: "Sucrose (Glc+Fru)\nMaltose (Glc+Glc)\nLactose (Glc+Gal)", y: 185 },
        ].map((s) => (
          <g key={s.name}>
            <rect x="45" y={s.y} width="140" height={s.name === "Monosaccharides" ? 50 : 55} rx="4" fill="rgba(245,158,11,0.15)" />
            <text x="55" y={s.y + 14} fill="#fbbf24" fontSize="8" fontWeight="600">{s.name}</text>
            <text x="55" y={s.y + 26} fill="#94a3b8" fontSize="7">{s.items.split("\n")[0]}</text>
            <text x="55" y={s.y + 36} fill="#94a3b8" fontSize="7">{s.items.split("\n")[1]}</text>
            {s.items.split("\n").length > 2 && <text x="55" y={s.y + 46} fill="#94a3b8" fontSize="7">{s.items.split("\n")[2]}</text>}
          </g>
        ))}

        {/* Complex carbs */}
        <rect x="210" y="55" width="180" height="195" rx="8" fill="rgba(180,130,60,0.1)" stroke="#b4843c" strokeWidth="1" />
        <text x="300" y="75" textAnchor="middle" fill="#d4a84b" fontSize="10" fontWeight="700">COMPLEX (Polysaccharides)</text>
        {[
          { name: "Starch", desc: "Plant storage\nAmylose (linear)\nAmylopectin (branched)" },
          { name: "Glycogen", desc: "Animal storage\nHighly branched\nLiver + muscle" },
          { name: "Cellulose", desc: "Plant cell wall\nβ-1,4 bonds\nIndigestible by humans" },
        ].map((s, i) => (
          <rect key={s.name} x="220" y={95 + i * 48} width="160" height="42" rx="4" fill="rgba(180,130,60,0.15)" />
        ))}
        {[
          { name: "Starch", y: 95 }, { name: "Glycogen", y: 143 }, { name: "Cellulose", y: 191 },
        ].map((s, i) => (
          <text key={s.name} x="230" y={s.y + 14} fill="#d4a84b" fontSize="8" fontWeight="600">{s.name}</text>
        ))}
        {[
          { desc: "Energy storage in plants", y: 107 },
          { desc: "Energy storage in animals", y: 155 },
          { desc: "Structural support in plants", y: 203 },
        ].map((d, i) => (
          <text key={i} x="230" y={d.y} fill="#94a3b8" fontSize="7">{d.desc}</text>
        ))}

        {/* Other */}
        <rect x="400" y="55" width="170" height="195" rx="8" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="1" />
        <text x="485" y="75" textAnchor="middle" fill="#a3e635" fontSize="10" fontWeight="700">OTHER POLYSACCHARIDES</text>
        {[
          { name: "Chitin", desc: "Fungi cell wall + arthropod exoskeleton" },
          { name: "Heparin", desc: "Anticoagulant (blood)" },
          { name: "Hyaluronic acid", desc: "Joint lubrication, skin" },
          { name: "Dextran", desc: "Blood plasma substitute" },
        ].map((s, i) => (
          <g key={s.name}>
            <rect x="410" y={90 + i * 38} width="150" height="32" rx="4" fill="rgba(132,204,22,0.1)" stroke="#84cc16" strokeWidth="0.5" />
            <text x="420" y="103 + i * 38" fill="#a3e635" fontSize="8" fontWeight="600">{s.name}</text>
            <text x="420" y="115 + i * 38" fill="#94a3b8" fontSize="7">{s.desc}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Monosaccharides", items: monoSacs.map((m) => `${m.name} (${m.formula}) — ${m.role}`).join(" · ") },
          { name: "Disaccharide Bonds", items: diSacs.map((d) => `${d.name}: ${d.bond} glycosidic`).join(" · ") },
          { name: "Key Distinction", items: "Starch (α-bonds, digestible) vs Cellulose (β-bonds, indigestible by humans)\nHumans lack cellulase enzyme" },
        ].map((r) => (
          <div key={r.name} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs font-bold text-amber-500">{r.name}</p>
            <p className="text-[10px] text-muted-foreground mt-1 whitespace-pre-line">{r.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProteinsView() {
  const aminoAcids = [
    { name: "Glycine", abbr: "Gly/G", r: "H (simplest)" },
    { name: "Alanine", abbr: "Ala/A", r: "CH₃" },
    { name: "Valine", abbr: "Val/V", r: "Isopropyl (hydrophobic)" },
    { name: "Leucine", abbr: "Leu/L", r: "Isobutyl (hydrophobic)" },
    { name: "Isoleucine", abbr: "Ile/I", r: "Sec-butyl (hydrophobic)" },
    { name: "Serine", abbr: "Ser/S", r: "CH₂OH (polar)" },
    { name: "Threonine", abbr: "Thr/T", r: "CH(OH)CH₃ (polar)" },
    { name: "Cysteine", abbr: "Cys/C", r: "CH₂SH (disulfide bonds!)" },
    { name: "Methionine", abbr: "Met/M", r: "CH₂CH₂SCH₃ (essential)" },
    { name: "Lysine", abbr: "Lys/K", r: "(CH₂)₄NH₂ (basic, essential)" },
    { name: "Arginine", abbr: "Arg/R", r: "Guanidino group (basic)" },
    { name: "Histidine", abbr: "His/H", r: "Imidazole (basic, pH buffer)" },
    { name: "Aspartic acid", abbr: "Asp/D", r: "COOH (acidic)" },
    { name: "Glutamic acid", abbr: "Glu/E", r: "COOH (acidic)" },
    { name: "Phenylalanine", abbr: "Phe/F", r: "Benzyl (aromatic, essential)" },
    { name: "Tyrosine", abbr: "Tyr/Y", r: "HO-phenyl (polar)" },
    { name: "Tryptophan", abbr: "Trp/W", r: "Indole (aromatic, essential)" },
    { name: "Proline", abbr: "Pro/P", r: "Cyclic (kinks protein chain)" },
    { name: "Asparagine", abbr: "Asn/N", r: "CONH₂ (polar)" },
    { name: "Glutamine", abbr: "Gln/Q", r: "CONH₂ (polar)" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 360" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">PROTEINS — 20 AMINO ACIDS & 4 STRUCTURE LEVELS</text>
        {/* Amino acid grid */}
        <rect x="20" y="40" width="340" height="310" rx="12" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1" />
        <text x="190" y="60" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">20 STANDARD AMINO ACIDS</text>
        {/* Group by property */}
        {[
          { title: "Non-polar / Hydrophobic", color: "#fbbf24", aas: ["Gly", "Ala", "Val", "Leu", "Ile", "Met", "Pro", "Phe", "Trp"] },
          { title: "Polar / Uncharged", color: "#34d399", aas: ["Ser", "Thr", "Cys", "Asn", "Gln", "Tyr"] },
          { title: "Positively Charged (Basic)", color: "#60a5fa", aas: ["Lys", "Arg", "His"] },
          { title: "Negatively Charged (Acidic)", color: "#f472b6", aas: ["Asp", "Glu"] },
        ].map((g, gi) => (
          <g key={gi}>
            <text x="30" y={80 + gi * 68} fill={g.color} fontSize="9" fontWeight="600">{g.title}</text>
            {g.aas.map((a, ai) => (
              <rect key={a} x={30 + ai * 38} y={88 + gi * 68} width="34" height="22" rx="3" fill={`${g.color}20`} stroke={g.color} strokeWidth="0.5" />
            ))}
            {g.aas.map((a, ai) => (
              <text key={a} x={47 + ai * 38} y={103 + gi * 68} textAnchor="middle" fill={g.color} fontSize="8" fontWeight="600">{a}</text>
            ))}
          </g>
        ))}

        {/* 4 levels of protein structure */}
        <rect x="370" y="40" width="210" height="310" rx="12" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1" />
        <text x="475" y="60" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">4 LEVELS OF STRUCTURE</text>
        {[
          { level: "Primary", formula: "—Met-Ala-Gly-Val—", desc: "Linear sequence of amino acids held by peptide bonds", detail: "Determines all higher levels. Mutation in 1 AA can change function (e.g., sickle cell: Glu→Val)", color: "#ef4444" },
          { level: "Secondary", formula: "α-helix / β-pleated sheet", desc: "Local folding stabilized by H-bonds between C=O and N-H", detail: "α-helix: right-handed coil (keratin). β-sheet: parallel or antiparallel strands (silk fibroin)", color: "#f97316" },
          { level: "Tertiary", formula: "3D global folding", desc: "Entire polypeptide chain folds into 3D shape", detail: "Stabilized by: hydrophobic interactions, disulfide bonds (Cys-Cys), ionic bonds, H-bonds, van der Waals", color: "#3b82f6" },
          { level: "Quaternary", formula: "Multiple subunits", desc: "Two or more polypeptide chains assemble", detail: "e.g., Hemoglobin = 2α + 2β subunits. Not all proteins have Q structure (myoglobin = 1 chain)", color: "#8b5cf6" },
        ].map((s, i) => (
          <g key={i}>
            <rect x="380" y={75 + i * 65} width="190" height="58" rx="6" fill={`${s.color}10`} stroke={s.color} strokeWidth="0.5" />
            <text x="390" y={92 + i * 65} fill={s.color} fontSize="9" fontWeight="700">{s.level}</text>
            <text x="390" y="106 + i * 65" fill="#fbbf24" fontSize="7" fontFamily="Georgia" fontStyle="italic">{s.formula}</text>
            <text x="390" y="118 + i * 65" fill="#e2e8f0" fontSize="7">{s.desc}</text>
            <text x="390" y="130 + i * 65" fill="#94a3b8" fontSize="6">{s.detail}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-4 gap-2">
        {[
          { name: "Structural", examples: "Collagen (connective tissue), Keratin (hair/nails), Elastin (lungs/blood vessels), Actin + Myosin (muscle)", color: "#ef4444" },
          { name: "Enzymatic", examples: "Pepsin (protein digestion), Amylase (starch→maltose), DNA polymerase (DNA replication), Catalase (H₂O₂ breakdown)", color: "#f97316" },
          { name: "Transport", examples: "Haemoglobin (O₂ in blood), Lipoproteins (lipids in blood), Membrane channels (ions)", color: "#3b82f6" },
          { name: "Defense +其它", examples: "Immunoglobulins (antibodies), Fibrinogen (blood clotting), Insulin (hormone), Tonoglobin (storage)", color: "#8b5cf6" },
        ].map((r) => (
          <div key={r.name} className="p-3 rounded-lg border" style={{ borderColor: `${r.color}30`, backgroundColor: `${r.color}08` }}>
            <p className="text-xs font-bold" style={{ color: r.color }}>{r.name}</p>
            <p className="text-[9px] text-muted-foreground mt-1">{r.examples}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LipidsView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">LIPIDS — TYPES & STRUCTURES</text>
        {/* Triglyceride */}
        <rect x="20" y="40" width="180" height="150" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">TRIGLYCERIDE</text>
        <text x="110" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">(Fat / Oil — Energy storage)</text>
        {/* Glycerol */}
        <rect x="75" y="95" width="70" height="22" rx="4" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="110" y="110" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="600">Glycerol</text>
        {/* 3 FA chains */}
        {[[-30, -40], [0, -55], [30, -40]].map(([dx, dy], i) => (
          <g key={i}>
            <line x1={110 + dx} y1={95} x2={110 + dx * 0.5} y2={95 + dy} stroke="#8b5cf6" strokeWidth="1.5" />
            <rect x={85 + dx} y={80 + dy} width="50" height="14" rx="3" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="0.5" />
            <text x={110 + dx} y={90 + dy} textAnchor="middle" fill="#c4b5fd" fontSize="7">FA {String.fromCharCode(65 + i)}</text>
          </g>
        ))}
        <LabelTag x={110} y={155} symbol="Ester" name="Ester bond" desc="Glycerol + FA → triglyceride + H₂O" color="#8b5cf6" />
        <text x="110" y="180" textAnchor="middle" fill="#94a3b8" fontSize="7">Saturated: no C=C (fats, solid)</text>
        <text x="110" y="192" textAnchor="middle" fill="#94a3b8" fontSize="7">Unsaturated: C=C present (oils, liquid)</text>

        {/* Phospholipid */}
        <rect x="210" y="40" width="180" height="150" rx="12" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">PHOSPHOLIPID</text>
        <text x="300" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">(Cell membrane component)</text>
        {/* Head */}
        <circle cx="300" cy="110" r="18" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" />
        <text x="300" y="107" textAnchor="middle" fill="#67e8f9" fontSize="7" fontWeight="600">Head</text>
        <text x="300" y="119" textAnchor="middle" fill="#94a3b8" fontSize="6">PO₄⁻ (charged)</text>
        {/* Tails */}
        <line x1="290" y1="128" x2="275" y2="165" stroke="#06b6d4" strokeWidth="2" />
        <line x1="310" y1="128" x2="325" y2="165" stroke="#06b6d4" strokeWidth="2" />
        <text x="260" y="180" textAnchor="middle" fill="#94a3b8" fontSize="6">Tail (hydrophobic)</text>
        <text x="340" y="180" textAnchor="middle" fill="#94a3b8" fontSize="6">Tail (hydrophobic)</text>
        <LabelTag x={300} y={150} symbol=" amphipathic" name="Amphipathic" desc="Hydrophilic head + hydrophobic tails" color="#06b6d4" />
        <text x="300" y="200" textAnchor="middle" fill="#67e8f9" fontSize="8" fontWeight="600">Forms bilayer in water</text>

        {/* Steroid */}
        <rect x="400" y="40" width="180" height="150" rx="12" fill="rgba(236,72,153,0.08)" stroke="#ec4899" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="700">STEROL</text>
        <text x="490" y="80" textAnchor="middle" fill="#94a3b8" fontSize="7">(4 fused carbon rings)</text>
        {/* 4 rings */}
        <polygon points="470,105 490,90 510,105 510,125 490,140 470,125" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="1.5" />
        <polygon points="490,140 510,125 530,140 530,160 510,175 490,160" fill="rgba(236,72,153,0.15)" stroke="#ec4899" strokeWidth="1" />
        <polygon points="470,125 490,140 490,160 470,175 450,160 450,140" fill="rgba(236,72,153,0.15)" stroke="#ec4899" strokeWidth="1" />
        <text x="490" y="205" textAnchor="middle" fill="#f9a8d4" fontSize="8" fontWeight="600">Cholesterol</text>
        <text x="490" y="220" textAnchor="middle" fill="#94a3b8" fontSize="7">Precursor: hormones, vitamin D</text>

        {/* Comparison table */}
        <rect x="20" y="200" width="560" height="130" rx="12" fill="rgba(139,92,246,0.05)" stroke="#8b5cf6" strokeWidth="0.5" />
        <text x="300" y="222" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">LIPID COMPARISON</text>
        {[
          { prop: "Solubility", trigo: "Insoluble in water", phospho: "Amphipathic", steroid: "Insoluble in water" },
          { prop: "Building blocks", trigo: "Glycerol + 3 FA", phospho: "Glycerol + 2 FA + PO₄", steroid: "4 fused rings" },
          { prop: "Main function", trigo: "Energy storage (9 kcal/g)", phospho: "Cell membrane structure", steroid: "Hormone precursor, membrane fluidity" },
          { prop: "Examples", trigo: "Butter, ghee, vegetable oil", phospho: "lecithin, sphingomyelin", steroid: "Cholesterol, testosterone, estrogen" },
          { prop: "Saponifiable?", trigo: "Yes (makes soap)", phospho: "Yes", steroid: "No" },
        ].map((r, i) => (
          <g key={i}>
            <rect x="30" y={235 + i * 20} width="540" height="18" rx="2" fill="rgba(139,92,246,0.08)" />
            <text x="45" y={248 + i * 20} fill="#c4b5fd" fontSize="8" fontWeight="600">{r.prop}</text>
            <text x="200" y={248 + i * 20} fill="#e2e8f0" fontSize="8">{r.trigo}</text>
            <text x="370" y={248 + i * 20} fill="#e2e8f0" fontSize="8">{r.phospho}</text>
            <text x="540" y={248 + i * 20} textAnchor="end" fill="#e2e8f0" fontSize="8">{r.steroid}</text>
          </g>
        ))}
        <text x="120" y="232" textAnchor="middle" fill="#8b5cf6" fontSize="7">Triglyceride</text>
        <text x="310" y="232" textAnchor="middle" fill="#06b6d4" fontSize="7">Phospholipid</text>
        <text x="500" y="232" textAnchor="middle" fill="#ec4899" fontSize="7">Steroid</text>
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Waxes", rows: ["Ester of long-chain FA + long-chain alcohol", "Example: beeswax (palmitic acid + cerotic alcohol)", "Function: waterproof coating ( leaves, skin, feathers)", "Higher melting point than fats"] },
          { name: "Energy Content", rows: ["Lipids: 9 kcal/g (more than 2x carbs/proteins)", "Why? More C-H bonds (more reduced)", "1g fat → ~38 kJ, 1g carb → ~17 kJ", "Fat is compact energy storage (no water attached)"] },
          { name: "Membrane Fluidity", rows: ["Cholesterol inserts between phospholipids", "At high temp: reduces fluidity (restricts movement)", "At low temp: prevents packing (maintains fluidity)", "Essential for proper membrane function"] },
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

function NucleicAcidsView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 360" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="700">NUCLEIC ACIDS — DNA vs RNA</text>
        {/* DNA double helix cross-section */}
        <rect x="20" y="40" width="380" height="300" rx="12" fill="rgba(59,130,246,0.05)" stroke="#3b82f6" strokeWidth="1" />
        <text x="210" y="62" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700">DNA — DOUBLE HELIX STRUCTURE</text>
        {/* Backbone strands */}
        <path d="M 60 90 Q 120 70 180 90 Q 240 110 300 90 Q 360 70 420 90" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,3" />
        <path d="M 60 250 Q 120 270 180 250 Q 240 230 300 250 Q 360 270 420 250" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,3" />
        <text x="50" y="85" fill="#60a5fa" fontSize="8" fontWeight="600">5'</text>
        <text x="50" y="265" fill="#60a5fa" fontSize="8" fontWeight="600">3'</text>
        <text x="435" y="85" fill="#60a5fa" fontSize="8" fontWeight="600">3'</text>
        <text x="435" y="265" fill="#60a5fa" fontSize="8" fontWeight="600">5'</text>
        {/* Base pairs */}
        {[
          { y: 100, pair: "A=T", bonds: 2, color: "#22c55e", label: "Adenine-Thymine" },
          { y: 130, pair: "G≡C", bonds: 3, color: "#ef4444", label: "Guanine-Cytosine" },
          { y: 160, pair: "T=A", bonds: 2, color: "#f59e0b", label: "Thymine-Adenine" },
          { y: 190, pair: "C≡G", bonds: 3, color: "#ef4444", label: "Cytosine-Guanine" },
          { y: 220, pair: "A=T", bonds: 2, color: "#22c55e", label: "Adenine-Thymine" },
        ].map((bp) => (
          <g key={bp.y}>
            {/* Rungs */}
            <line x1="130" y1={bp.y} x2="290" y2={bp.y} stroke={bp.color} strokeWidth={bp.bonds === 3 ? 2.5 : 1.5} opacity="0.7" />
            {Array.from({ length: bp.bonds }).map((_, i) => (
              <circle key={i} cx={200 + (i - 1) * 12} cy={bp.y} r="2.5" fill={bp.color} />
            ))}
            {/* Base labels */}
            <rect x="140" y={bp.y - 8} width="28" height="16" rx="3" fill={`${bp.color}25`} stroke={bp.color} strokeWidth="0.5" />
            <text x="154" y={bp.y + 3} textAnchor="middle" fill={bp.color} fontSize="8" fontWeight="700">{bp.pair.split("")[0]}</text>
            <rect x="232" y={bp.y - 8} width="28" height="16" rx="3" fill={`${bp.color}25`} stroke={bp.color} strokeWidth="0.5" />
            <text x="246" y={bp.y + 3} textAnchor="middle" fill={bp.color} fontSize="8" fontWeight="700">{bp.pair.split("")[2]}</text>
            <text x="310" y={bp.y + 4} fill="#94a3b8" fontSize="7">{bp.label}</text>
          </g>
        ))}
        <LabelTag x={210} y={280} symbol="Antiparallel" name="Strand direction" desc="5'→3' and 3'→5' opposite directions" color="#60a5fa" />
        <LabelTag x={210} y={298} symbol="Complementarity" name="Base pairing" desc="A=T (2H), G≡C (3H) — Chargaff's rule" color="#22c55e" />
        <LabelTag x={210} y={316} symbol="Grooves" name="Major + minor groove" desc="Protein binding sites for regulation" color="#fbbf24" />

        {/* RNA comparison */}
        <rect x="410" y="40" width="170" height="300" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="495" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">RNA TYPES</text>
        {[
          { name: "mRNA", desc: "Messenger RNA\nCarries genetic code from DNA to ribosome\n5' cap + poly-A tail\nCodons: 3-base codes for amino acids", color: "#8b5cf6" },
          { name: "tRNA", desc: "Transfer RNA\nCloverleaf structure (73-93 nt)\nAnticodon loop + amino acid attachment site\nBrings specific amino acid to ribosome", color: "#a78bfa" },
          { name: "rRNA", desc: "Ribosomal RNA\n28S, 18S, 5.8S, 5S in eukaryotes\nForms core of ribosome structure\nPeptidyl transferase activity (ribozyme)", color: "#c4b5fd" },
          { name: "snRNA", desc: "Small nuclear RNA\nSplicing: removes introns from pre-mRNA\nPart of spliceosome complex", color: "#ddd6fe" },
        ].map((r, i) => (
          <g key={r.name}>
            <rect x="420" y={80 + i * 58} width="150" height="50" rx="6" fill={`${r.color}15`} stroke={r.color} strokeWidth="0.5" />
            <text x="430" y={95 + i * 58} fill={r.color} fontSize="9" fontWeight="700">{r.name}</text>
            {r.desc.split("\n").map((line, j) => (
              <text key={j} x="430" y={108 + j * 9 + i * 58} fill="#94a3b8" fontSize="7">{line}</text>
            ))}
          </g>
        ))}

        {/* DNA vs RNA table */}
        <rect x="20" y="350" width="560" height="0" />
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "DNA vs RNA Comparison", rows: ["DNA: double-stranded, deoxyribose, A-T-G-C, nuclear", "RNA: single-stranded, ribose, A-U-G-C, cytoplasmic", "DNA: stable, long-term storage", "RNA: temporary, versatile (messenger, adapter, catalyst)", "DNA: replicated semi-conservatively", "RNA: transcribed from DNA template"] },
          { name: "Nucleotide Structure", rows: ["Phosphate group (PO₄³⁻) — negative charge", "Pentose sugar: deoxyribose (DNA) or ribose (RNA)", "Nitrogenous base: Purines (A,G — double ring) | Pyrimidines (C,T,U — single ring)", "Bond: phosphodiester bond (5'→3' direction)", "Directionality: 5' phosphate end → 3' hydroxyl end"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <p className="text-xs font-bold text-blue-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function EnzymesView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">ENZYMES — BIOCATALYSTS</text>
        {/* Enzyme mechanism */}
        <rect x="20" y="40" width="380" height="270" rx="12" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="1" />
        <text x="210" y="62" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700">ENZYME MECHANISM & MODELS</text>
        {/* Reaction steps */}
        {[
          { step: "E + S", desc: "Enzyme + Substrate bind", x: 50, y: 85, color: "#10b981" },
          { step: "↓", desc: "Active site binding", x: 50, y: 115, color: "#10b981" },
          { step: "ES", desc: "Enzyme-Substrate complex", x: 50, y: 145, color: "#f59e0b" },
          { step: "↓", desc: "Catalysis (lowers Ea)", x: 50, y: 175, color: "#10b981" },
          { step: "EP", desc: "Enzyme-Product complex", x: 50, y: 205, color: "#3b82f6" },
          { step: "↓", desc: "Product release", x: 50, y: 235, color: "#10b981" },
          { step: "E + P", desc: "Enzyme free again (unchanged)", x: 50, y: 265, color: "#10b981" },
        ].map((s) => (
          <g key={s.step}>
            <rect x={s.x} y={s.y} width="160" height="20" rx="4" fill={`${s.color}15`} stroke={s.color} strokeWidth="0.5" />
            <text x={s.x + 8} y={s.y + 9} fill={s.color} fontSize="9" fontWeight="700" fontFamily="Georgia" fontStyle="italic">{s.step}</text>
            <text x={s.x + 8} y={s.y + 18} fill="#94a3b8" fontSize="7">{s.desc}</text>
          </g>
        ))}
        {/* Arrows */}
        {[100, 130, 160, 190, 220, 250].map((y) => (
          <text key={y} x="220" y={y} fill="#64748b" fontSize="12">→</text>
        ))}
        {/* Models */}
        <text x="210" y="295" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Lock & Key (Fischer, 1894) vs Induced Fit (Koshland, 1958)</text>
        <text x="210" y="310" textAnchor="middle" fill="#94a3b8" fontSize="8">Lock & Key: rigid active site · Induced Fit: flexible, changes shape upon substrate binding</text>

        {/* Energy diagram */}
        <rect x="410" y="40" width="170" height="130" rx="12" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1" />
        <text x="495" y="60" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">ENERGY DIAGRAM</text>
        {/* Axes */}
        <line x1="430" y1="150" x2="560" y2="150" stroke="#64748b" strokeWidth="1" />
        <line x1="430" y1="75" x2="430" y2="150" stroke="#64748b" strokeWidth="1" />
        <text x="415" y="115" textAnchor="middle" fill="#94a3b8" fontSize="6" transform="rotate(-90,415,115)">G</text>
        <text x="495" y="165" textAnchor="middle" fill="#94a3b8" fontSize="6">Reaction →</text>
        {/* Without enzyme */}
        <path d="M 445 135 Q 480 90 500 110 Q 520 130 555 120" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="475" y="85" fill="#ef4444" fontSize="6">High Ea</text>
        {/* With enzyme */}
        <path d="M 445 135 Q 480 115 500 118 Q 520 122 555 120" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <text x="475" y="112" fill="#10b981" fontSize="6">Low Ea</text>
        <text x="495" y="178" textAnchor="middle" fill="#94a3b8" fontSize="6">ΔG unchanged — only Ea lowered</text>

        {/* Enzyme classification */}
        <rect x="410" y="180" width="170" height="130" rx="12" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="1" />
        <text x="495" y="200" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">6 ENZYME CLASSES</text>
        {[
          { name: "Oxidoreductases", ex: "Dehydrogenases, oxidases" },
          { name: "Transferases", ex: "Kinases, transaminases" },
          { name: "Hydrolases", ex: "Pepsin, lipase, amylase" },
          { name: "Lyases", ex: "Decarboxylases" },
          { name: "Isomerases", ex: "Phosphoglucose isomerase" },
          { name: "Ligases", ex: "DNA ligase, synthetases" },
        ].map((e, i) => (
          <g key={i}>
            <rect x="420" y={210 + i * 18} width="150" height="15" rx="2" fill="rgba(16,185,129,0.1)" />
            <text x="428" y="221 + i * 18" fill="#34d399" fontSize="7" fontWeight="600">{e.name}</text>
            <text x="565" y="221 + i * 18" textAnchor="end" fill="#94a3b8" fontSize="6">{e.ex}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Enzyme Properties", rows: ["Biological catalysts (mostly proteins, some RNA = ribozymes)", "Lower activation energy (Ea) — speeds up reaction", "Specific to substrate (lock & key / induced fit model)", "Reusable — not consumed in reaction", "Optimum pH & temperature (human enzymes: pH 7, 37°C)", "Inhibited by: competitive (same active site), non-competitive (allosteric site)"] },
          { name: "Factors Affecting Enzyme Activity", rows: ["Temperature: rate doubles per 10°C (Q₁₀) until denaturation", "pH: each enzyme has optimum pH (pepsin=2, trypsin=8)", "Substrate concentration: Vmax reached at saturation", "Enzyme concentration: rate ∝ [E]", "Cofactors: inorganic ions (Zn²⁺, Mg²⁺, Fe²⁺)", "Coenzymes: organic molecules (NAD⁺, FAD, coenzyme A)"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-xs font-bold text-emerald-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function WaterView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="700">WATER — THE SOLVENT OF LIFE</text>
        {/* Water molecule */}
        <rect x="20" y="40" width="280" height="240" rx="12" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">H₂O MOLECULE</text>
        {/* Oxygen */}
        <circle cx="160" cy="130" r="25" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="2" />
        <text x="160" y="134" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="700">O</text>
        <text x="160" y="170" textAnchor="middle" fill="#f87171" fontSize="8">δ— (electronegative)</text>
        {/* Hydrogens */}
        <circle cx="115" cy="155" r="15" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="115" y="159" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="700">H</text>
        <text x="115" y="185" textAnchor="middle" fill="#60a5fa" fontSize="8">δ+</text>
        <circle cx="205" cy="155" r="15" fill="rgba(59,130,212,0.3)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="205" y="159" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="700">H</text>
        <text x="205" y="185" textAnchor="middle" fill="#60a5fa" fontSize="8">δ+</text>
        {/* Bonds */}
        <line x1="140" y1="130" x2="125" y2="148" stroke="#06b6d4" strokeWidth="2" />
        <line x1="180" y1="130" x2="195" y2="148" stroke="#06b6d4" strokeWidth="2" />
        <text x="160" y="210" textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="600">Bent shape · 104.5° bond angle</text>
        <text x="160" y="225" textAnchor="middle" fill="#94a3b8" fontSize="8">Polar covalent bonds · Polar molecule</text>
        <LabelTag x={160} y={245} symbol="H-bond" name="Hydrogen bonding" desc="Between δ+ H and δ— O of adjacent molecules" color="#06b6d4" />

        {/* Properties */}
        <rect x="310" y="40" width="270" height="240" rx="12" fill="rgba(6,182,212,0.05)" stroke="#06b6d4" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">UNIQUE PROPERTIES</text>
        {[
          { prop: "Universal Solvent", desc: "Dissolves polar/ionic substances due to polarity", y: 80 },
          { prop: "High Specific Heat", desc: "Resists temp change — stabilizes organism temp", y: 110 },
          { prop: "High Heat of Vaporization", desc: "Cooling effect through evaporation (sweating)", y: 140 },
          { prop: "Cohesion & Adhesion", desc: "Cohesion: water-water (surface tension). Adhesion: water-surface (capillary action)", y: 170 },
          { prop: "Less Dense as Solid", desc: "Ice floats — insulates aquatic life in winter", y: 200 },
          { prop: "Chemical Reactivity", desc: "Hydrolysis (breaks bonds with H₂O). Photosynthesis uses H₂O as electron donor.", y: 230 },
        ].map((p) => (
          <g key={p.prop}>
            <rect x="325" y={p.y} width="240" height="22" rx="4" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="0.5" />
            <text x="335" y={p.y + 9} fill="#67e8f9" fontSize="8" fontWeight="600">{p.prop}</text>
            <text x="560" y={p.y + 9} textAnchor="end" fill="#94a3b8" fontSize="7">{p.desc}</text>
          </g>
        ))}
      </svg>
      <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
        <p className="text-xs font-bold text-cyan-400">Why Water Matters in Biology</p>
        <p className="text-[10px] text-muted-foreground mt-1">Water makes up ~70% of cell mass. It is the medium for all biochemical reactions, the transport fluid in blood and xylem/phloem, and its hydrogen bonding gives it unique properties essential for life. Without water's polarity, no ionic compounds would dissolve, no proteins would fold correctly, and no cells could exist.</p>
      </div>
    </div>
  );
}

function MineralsView() {
  const macroMinerals = [
    { name: "Calcium (Ca²⁺)", role: "Bone/teeth (hydroxyapatite), muscle contraction, blood clotting, nerve transmission", deficiency: "Osteoporosis, rickets, tetany", source: "Milk, cheese, leafy greens, sardines" },
    { name: "Phosphorus (PO₄³⁻)", role: "ATP, DNA/RNA backbone, phospholipids, bones", deficiency: "Bone disorders, fatigue", source: "Meat, dairy, nuts, grains" },
    { name: "Sodium (Na⁺)", role: "Nerve impulse transmission, osmotic balance, muscle contraction", deficiency: "Hyponatraemia (muscle cramps, confusion)", source: "Table salt (NaCl), processed foods" },
    { name: "Potassium (K⁺)", role: "Nerve impulse, enzyme activation, heart rhythm", deficiency: "Muscle weakness, cardiac arrhythmia", source: "Bananas, potatoes, oranges" },
    { name: "Magnesium (Mg²⁺)", role: "Chlorophyll center, 300+ enzyme cofactor, ATP activation", deficiency: "Chlorosis (plants), muscle cramps (animals)", source: "Leafy greens, nuts, seeds, chocolate" },
    { name: "Chlorine (Cl⁻)", role: "Stomach acid (HCl), osmotic balance, nerve function", deficiency: "Rare (abundant in diet)", source: "Table salt, seawater" },
    { name: "Sulfur (S)", role: "Amino acids (cysteine, methionine), disulfide bonds in proteins", deficiency: "Protein synthesis impairment", source: "Protein-rich foods, eggs" },
  ];
  const microMinerals = [
    { name: "Iron (Fe²⁺/³⁺)", role: "Haemoglobin (O₂ transport), myoglobin, cytochromes (ETC)", deficiency: "Anaemia (fatigue, pale skin)", source: "Red meat, lentils, spinach" },
    { name: "Iodine (I⁻)", role: "Thyroid hormones (thyroxine/T4, triiodothyronine/T3)", deficiency: "Goitre, cretinism (mental retardation)", source: "Iodized salt, seafood" },
    { name: "Zinc (Zn²⁺)", role: "200+ enzymes, wound healing, immune function, DNA binding", deficiency: "Delayed growth, loss of taste/smell", source: "Meat, shellfish, legumes" },
    { name: "Copper (Cu²⁺)", role: "Cytochrome c oxidase, haemoglobin synthesis, melanin", deficiency: "Anaemia, neurological issues", source: "Liver, nuts, seeds" },
    { name: "Manganese (Mn²⁺)", role: "Enzyme cofactor (arginate, SOD), bone formation", deficiency: "Bone defects, impaired growth", source: "Nuts, whole grains, tea" },
    { name: "Fluorine (F⁻)", role: "Tooth enamel (fluorapatite), bone strength", deficiency: "Dental caries (cavities)", source: "Fluoridated water, tea" },
    { name: "Selenium (Se)", role: "Antioxidant (glutathione peroxidase), thyroid function", deficiency: "Keshan disease (cardiomyopathy)", source: "Brazil nuts, seafood" },
    { name: "Cobalt (Co)", role: "Component of vitamin B₁₂ (cobalamin)", deficiency: "Pernicious anaemia", source: "Meat, dairy" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 200" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="700">MINERALS — MACROMINERALS vs MICROMINERALS</text>
        {/* Macrominerals */}
        <rect x="20" y="40" width="280" height="145" rx="12" fill="rgba(236,72,153,0.08)" stroke="#ec4899" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="700">MACROMINERALS (&gt;100 mg/day)</text>
        <text x="160" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Needed in larger amounts</text>
        {["Ca²⁺", "P", "Na⁺", "K⁺", "Mg²⁺", "Cl⁻", "S"].map((m, i) => (
          <g key={m}>
            <rect x={35 + (i % 4) * 68} y={95 + Math.floor(i / 4) * 22} width="60" height="18" rx="3" fill="rgba(236,72,153,0.15)" stroke="#ec4899" strokeWidth="0.5" />
            <text x={65 + (i % 4) * 68} y={108 + Math.floor(i / 4) * 22} textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="600">{m}</text>
          </g>
        ))}
        <text x="160" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Total ~98% of body minerals</text>
        <text x="160" y="180" textAnchor="middle" fill="#f472b6" fontSize="8">Bone mineral = Ca₁₀(PO₄)₆(OH)₂ (hydroxyapatite)</text>

        {/* Microminerals */}
        <rect x="310" y="40" width="270" height="145" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">MICROMINERALS / TRACE (&lt;100 mg/day)</text>
        <text x="445" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Needed in trace amounts but essential</text>
        {["Fe", "I", "Zn", "Cu", "Mn", "F", "Se", "Co"].map((m, i) => (
          <g key={m}>
            <rect x={325 + (i % 4) * 65} y={95 + Math.floor(i / 4) * 22} width="60" height="18" rx="3" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth="0.5" />
            <text x={355 + (i % 4) * 65} y={108 + Math.floor(i / 4) * 22} textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="600">{m}</text>
          </g>
        ))}
        <text x="445" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Act as enzyme cofactors / hormone components</text>
        <text x="445" y="180" textAnchor="middle" fill="#c4b5fd" fontSize="8">Deficiency causes specific diseases (goitre, anaemia)</text>
      </svg>
      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
        {[...macroMinerals.slice(0, 4), ...microMinerals.slice(0, 4)].map((m) => (
          <div key={m.name} className="p-2.5 rounded-lg" style={{ borderColor: m.name.includes("Ca") || m.name.includes("P") ? "#ec4899" : "#8b5cf6", backgroundColor: `${m.name.includes("Ca") || m.name.includes("P") ? "#ec4899" : "#8b5cf6"}08` }}>
            <p className="text-xs font-bold" style={{ color: m.name.includes("Ca") || m.name.includes("P") ? "#ec4899" : "#8b5cf6" }}>{m.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{m.role}</p>
            <p className="text-[9px] text-red-400/80 mt-0.5">Deficiency: {m.deficiency}</p>
            <p className="text-[9px] text-muted-foreground">{m.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiologyBiomolecules3D() {
  const [tab, setTab] = useState<Tab>("intro");
  const active = TABS.find((t) => t.id === tab)!;
  const I = active.icon;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><I className="h-5 w-5" style={{ color: active.color }} /></div>
        <div><h2 className="font-semibold text-base">Biomolecules 3D — Full NEB XI Unit 1</h2><p className="text-xs text-muted-foreground">Carbohydrates, proteins, lipids, nucleic acids, enzymes, water & minerals — all syllabus topics with labelled diagrams</p></div>
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
      <div className="min-h-[420px] rounded-xl border border-border bg-card overflow-auto">
        {tab === "intro" && <IntroView />}
        {tab === "carbs" && <CarbsView />}
        {tab === "proteins" && <ProteinsView />}
        {tab === "lipids" && <LipidsView />}
        {tab === "nucleic" && <NucleicAcidsView />}
        {tab === "enzymes" && <EnzymesView />}
        {tab === "water" && <WaterView />}
        {tab === "minerals" && <MineralsView />}
      </div>
    </div>
  );
}
