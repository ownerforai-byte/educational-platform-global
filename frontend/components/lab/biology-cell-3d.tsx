"use client";

import { useState } from "react";
import { Microscope, Dna, Leaf, Heart } from "lucide-react";

type Tab =
  | "overview" | "prokaryotic" | "membrane" | "nucleus" | "mitochondria"
  | "chloroplast" | "er" | "golgi" | "ribosome" | "lysosome" | "wall"
  | "cilia" | "plastids" | "inclusions";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "overview", label: "Cell Overview", icon: Microscope, color: "#22c55e" },
  { id: "prokaryotic", label: "Prokaryotic Cell", icon: Microscope, color: "#ef4444" },
  { id: "membrane", label: "Cell Membrane", icon: Dna, color: "#3b82f6" },
  { id: "nucleus", label: "Nucleus", icon: Dna, color: "#8b5cf6" },
  { id: "mitochondria", label: "Mitochondria", icon: Heart, color: "#ef4444" },
  { id: "chloroplast", label: "Chloroplast", icon: Leaf, color: "#10b981" },
  { id: "plastids", label: "Plastids", icon: Leaf, color: "#84cc16" },
  { id: "er", label: "Endoplasmic Reticulum", icon: Microscope, color: "#f59e0b" },
  { id: "golgi", label: "Golgi Bodies", icon: Microscope, color: "#ec4899" },
  { id: "ribosome", label: "Ribosomes", icon: Dna, color: "#14b8a6" },
  { id: "lysosome", label: "Lysosomes", icon: Microscope, color: "#f97316" },
  { id: "wall", label: "Cell Wall", icon: Leaf, color: "#84cc16" },
  { id: "cilia", label: "Cilia & Flagella", icon: Microscope, color: "#a3e635" },
  { id: "inclusions", label: "Cell Inclusions", icon: Microscope, color: "#d97706" },
];

function OrganelleSVG({ type }: { type: Tab }) {
  switch (type) {
    case "overview":
      return (
        <svg viewBox="0 0 600 420" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="700">EUKARYOTIC CELL — COMPLETE ORGANELLE MAP</text>
          <text x="300" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8">NEB XI Unit 1 · Plant & Animal cell comparison</text>
          {/* Plant cell (left) */}
          <rect x="20" y="50" width="270" height="350" rx="12" fill="rgba(34,197,94,0.05)" stroke="#22c55e" strokeWidth="1" />
          <text x="155" y="72" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">PLANT CELL</text>
          {/* Cell wall */}
          <rect x="35" y="85" width="240" height="300" rx="8" fill="none" stroke="#84cc16" strokeWidth="3" />
          <text x="285" y="100" fill="#a3e635" fontSize="7">Cell wall (cellulose)</text>
          {/* Membrane */}
          <rect x="40" y="90" width="230" height="290" rx="6" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1.5" />
          <text x="275" y="115" fill="#4ade80" fontSize="7">Cell membrane</text>
          {/* Large central vacuole */}
          <ellipse cx="150" cy="220" rx="70" ry="90" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,2" />
          <text x="150" y="217" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="600">Central Vacuole</text>
          <text x="150" y="230" textAnchor="middle" fill="#94a3b8" fontSize="6">(90% cell volume)</text>
          {/* Nucleus */}
          <ellipse cx="210" cy="150" rx="35" ry="28" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="215" cy="148" r="8" fill="rgba(139,92,246,0.4)" stroke="#8b5cf6" strokeWidth="1" />
          <text x="210" y="153" textAnchor="middle" fill="#c4b5fd" fontSize="6" fontWeight="600">N.</text>
          <text x="210" y="185" textAnchor="middle" fill="#c4b5fd" fontSize="7" fontWeight="600">Nucleus</text>
          {/* Chloroplasts */}
          {[
            { cx: 70, cy: 140 }, { cx: 80, cy: 280 }, { cx: 230, cy: 260 }, { cx: 60, cy: 320 },
          ].map((p, i) => (
            <ellipse key={i} cx={p.cx} cy={p.cy} rx="18" ry="10" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="1" />
          ))}
          <text x="150" y="310" textAnchor="middle" fill="#34d399" fontSize="7">Chloroplasts (photosynthesis)</text>
          {/* Mitochondria */}
          {[
            { cx: 90, cy: 180 }, { cx: 230, cy: 130 },
          ].map((m, i) => (
            <ellipse key={i} cx={m.cx} cy={m.cy} rx="14" ry="7" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
          ))}
          <text x="150" y="330" textAnchor="middle" fill="#f87171" fontSize="7">Mitochondria (respiration)</text>
          {/* Golgi */}
          <g transform="translate(80, 350)">
            {[0, 1, 2].map((i) => (
              <ellipse key={i} cx="30" cy={i * 8} rx={20 - i * 3} ry="4" fill="none" stroke="#ec4899" strokeWidth="1" />
            ))}
          </g>
          <text x="150" y="375" textAnchor="middle" fill="#f472b6" fontSize="7">Golgi bodies</text>
          {/* Labels */}
          <LabelTag x={230} y={100} symbol="φ" name="Cell Wall" desc="Cellulose, rigid structure" color="#84cc16" />
          <LabelTag x={230} y={115} symbol="双层" name="Double membrane" desc="Nuclear envelope with pores" color="#8b5cf6" />
          <LabelTag x={230} y={130} symbol="ATP" name="Mitochondria" desc="Powerhouse — aerobic respiration" color="#ef4444" />
          <LabelTag x={230} y={145} symbol="φ₂" name="Chloroplast" desc="Photosynthesis — thylakoids" color="#10b981" />
          <LabelTag x={230} y={160} symbol=" vac" name="Vacuole" desc="Turgor pressure, storage" color="#3b82f6" />

          {/* Animal cell (right) */}
          <rect x="310" y="50" width="270" height="350" rx="12" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1" />
          <text x="445" y="72" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">ANIMAL CELL</text>
          {/* Cell membrane only (no wall) */}
          <ellipse cx="445" cy="210" rx="110" ry="140" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="2" />
          <text x="550" y="100" fill="#f87171" fontSize="7">No cell wall</text>
          {/* Nucleus */}
          <ellipse cx="445" cy="190" rx="40" ry="32" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.5" />
          <circle cx="450" cy="188" r="10" fill="rgba(139,92,246,0.4)" stroke="#8b5cf6" strokeWidth="1" />
          <text x="445" y="193" textAnchor="middle" fill="#c4b5fd" fontSize="6" fontWeight="600">N.</text>
          <text x="445" y="235" textAnchor="middle" fill="#c4b5fd" fontSize="7" fontWeight="600">Nucleus</text>
          {/* Mitochondria */}
          {[
            { cx: 370, cy: 150 }, { cx: 520, cy: 140 }, { cx: 360, cy: 260 }, { cx: 530, cy: 270 },
          ].map((m, i) => (
            <ellipse key={i} cx={m.cx} cy={m.cy} rx="14" ry="7" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
          ))}
          {/* Centrioles */}
          <g transform="translate(430, 290)">
            <rect x="0" y="0" width="16" height="6" rx="2" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
            <rect x="6" y="-6" width="16" height="6" rx="2" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          </g>
          <text x="445" y="315" textAnchor="middle" fill="#c4b5fd" fontSize="7">Centrioles</text>
          {/* Lysosomes */}
          {[
            { cx: 380, cy: 320 }, { cx: 510, cy: 330 },
          ].map((l, i) => (
            <circle key={i} cx={l.cx} cy={l.cy} r="8" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1" />
          ))}
          <text x="445" y="355" textAnchor="middle" fill="#fb923c" fontSize="7">Lysosomes</text>
          {/* Small vacuoles */}
          <circle cx="390" cy="130" r="10" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,1" />
          <text x="390" y="133" textAnchor="middle" fill="#60a5fa" fontSize="5">v</text>
          <text x="445" y="375" textAnchor="middle" fill="#94a3b8" fontSize="7">Small, temporary vacuoles</text>
          {/* ER */}
          <path d="M 500 160 Q 520 150 540 160 Q 550 170 540 180" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
          <text x="550" y="195" fill="#fbbf24" fontSize="6">Rough ER</text>
          {/* Golgi */}
          <g transform="translate(500, 230)">
            {[0, 1, 2].map((i) => (
              <ellipse key={i} cx="20" cy={i * 6} rx={15 - i * 2} ry="3" fill="none" stroke="#ec4899" strokeWidth="0.8" />
            ))}
          </g>
          <text x="540" y="260" fill="#f472b6" fontSize="6">Golgi</text>
        </svg>
      );

    case "prokaryotic":
      return (
        <svg viewBox="0 0 600 380" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">PROKARYOTIC vs EUKARYOTIC CELL COMPARISON</text>
          {/* Prokaryotic */}
          <rect x="20" y="40" width="280" height="320" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
          <text x="160" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">PROKARYOTIC CELL</text>
          <text x="160" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">(Bacteria, Cyanobacteria — Monera)</text>
          {/* Capsule */}
          <ellipse cx="160" cy="180" rx="100" ry="70" fill="none" stroke="#f87171" strokeWidth="1" strokeDasharray="4,2" />
          <text x="160" y="115" textAnchor="middle" fill="#f87171" fontSize="7">Capsule (slime layer)</text>
          {/* Cell wall */}
          <ellipse cx="160" cy="180" rx="85" ry="60" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="160" y="130" textAnchor="middle" fill="#ef4444" fontSize="7">Cell wall (peptidoglycan)</text>
          {/* Membrane */}
          <ellipse cx="160" cy="180" rx="72" ry="50" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5" />
          {/* Nucleoid */}
          <path d="M 120 170 Q 140 155 160 170 Q 180 185 200 170" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <text x="160" y="200" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="600">Nucleoid (circular DNA)</text>
          <text x="160" y="215" textAnchor="middle" fill="#94a3b8" fontSize="7">No nuclear membrane · No histones</text>
          {/* Plasmid */}
          <circle cx="110" cy="225" r="6" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="110" y="240" textAnchor="middle" fill="#fbbf24" fontSize="6">Plasmid</text>
          {/* Ribosomes */}
          {Array.from({ length: 15 }).map((_, i) => (
            <circle key={i} cx={100 + Math.random() * 120} cy={150 + Math.random() * 80} r="2" fill="#fbbf24" opacity="0.5" />
          ))}
          <text x="160" y="260" textAnchor="middle" fill="#94a3b8" fontSize="7">70S ribosomes</text>
          {/* Flagellum */}
          <path d="M 260 180 Q 290 170 320 180 Q 350 190 370 180" fill="none" stroke="#ef4444" strokeWidth="2" />
          <text x="340" y="200" fill="#f87171" fontSize="7">Flagellum</text>
          {/* Pili */}
          {[300, 310, 320].map((x, i) => (
            <line key={i} x1={x} y1="240" x2={x} y2="260" stroke="#ef4444" strokeWidth="1" />
          ))}
          <text x="310" y="275" textAnchor="middle" fill="#94a3b8" fontSize="7">Pili (conjugation)</text>
          <text x="160" y="300" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="600">Size: 0.5–5 μm</text>
          <text x="160" y="315" textAnchor="middle" fill="#94a3b8" fontSize="7">No membrane-bound organelles</text>
          <text x="160" y="335" textAnchor="middle" fill="#94a3b8" fontSize="7">Reproduce by binary fission</text>
          <text x="160" y="355" textAnchor="middle" fill="#94a3b8" fontSize="7">Examples: E. coli, Bacillus, Streptococcus</text>

          {/* Eukaryotic */}
          <rect x="310" y="40" width="270" height="320" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
          <text x="445" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">EUKARYOTIC CELL</text>
          <text x="445" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">(Protista, Fungi, Plantae, Animalia)</text>
          {/* Comparison table */}
          {[
            { feature: "Size", pro: "0.1–5 μm", euk: "10–100 μm" },
            { feature: "Nucleus", pro: "Absent (nucleoid)", euk: "Present (membrane-bound)" },
            { feature: "Organelles", pro: "None membrane-bound", euk: "Present (mito, chloro, etc.)" },
            { feature: "Ribosomes", pro: "70S", euk: "80S (60S+40S)" },
            { feature: "DNA form", pro: "Circular, no histones", euk: "Linear, with histones" },
            { feature: "Cell wall", pro: "Peptidoglycan", euk: "Cellulose (plants) / absent (animals)" },
            { feature: "Reproduction", pro: "Binary fission", euk: "Mitosis / Meiosis" },
            { feature: "Example", pro: "Bacteria, Cyanobacteria", euk: "Amoeba, Yeast, Plant, Animal" },
          ].map((r, i) => (
            <g key={i}>
              <rect x="325" y={95 + i * 28} width="240" height="24" rx="3" fill="rgba(34,197,94,0.08)" />
              <text x="335" y={111 + i * 28} fill="#4ade80" fontSize="8" fontWeight="600">{r.feature}</text>
              <text x="390" y={111 + i * 28} fill="#f87171" fontSize="7">{r.pro}</text>
              <text x="545" y={111 + i * 28} textAnchor="end" fill="#4ade80" fontSize="7">{r.euk}</text>
            </g>
          ))}
        </svg>
      );

    case "membrane":
      return (
        <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="700">CELL MEMBRANE — FLUID MOSAIC MODEL (Singer & Nicolson, 1972)</text>
          {/* Phospholipid bilayer */}
          <rect x="30" y="45" width="540" height="100" rx="8" fill="rgba(59,130,246,0.05)" stroke="#3b82f6" strokeWidth="1" />
          {/* Top layer */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`top-${i}`}>
              <circle cx={55 + i * 38} cy="70" r="9" fill="rgba(59,130,246,0.3)" stroke="#60a5fa" strokeWidth="1" />
              <line x1={55 + i * 38} y1="79" x2={55 + i * 38} y2="125" stroke="#60a5fa" strokeWidth="2" />
              <circle cx={55 + i * 38} cy="133" r="9" fill="rgba(59,130,246,0.3)" stroke="#60a5fa" strokeWidth="1" />
              <line x1={55 + i * 38} y1="124" x2={55 + i * 38} y2="76" stroke="#60a5fa" strokeWidth="2" />
            </g>
          ))}
          <text x="300" y="160" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="600">PHOSPHOLIPID BILAYER</text>
          <text x="300" y="175" textAnchor="middle" fill="#94a3b8" fontSize="8">Hydrophilic heads (outer/inner) · Hydrophobic tails (interior) · Selectively permeable</text>
          {/* Embedded proteins */}
          <rect x="30" y="185" width="540" height="80" rx="8" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="0.5" />
          <text x="300" y="205" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="600">PROTEINS IN THE MEMBRANE</text>
          {[
            { x: 80, label: "Integral\nprotein", desc: "Span entire bilayer", color: "#ef4444" },
            { x: 200, label: "Channel\nprotein", desc: "Hydrophilic pore for ions", color: "#f97316" },
            { x: 320, label: "Carrier\nprotein", desc: "Change shape to transport", color: "#f59e0b" },
            { x: 440, label: "Receptor\nprotein", desc: "Signal transduction", color: "#8b5cf6" },
            { x: 530, label: "Enzymatic\nprotein", desc: "Catalyse reactions", color: "#10b981" },
          ].map((p) => (
            <g key={p.label}>
              <rect x={p.x - 25} y="215" width="50" height="40" rx="6" fill={`${p.color}20`} stroke={p.color} strokeWidth="1" />
              <text x={p.x} y="232" textAnchor="middle" fill={p.color} fontSize="7" fontWeight="600">{p.label.split("\n")[0]}</text>
              <text x={p.x} y="244" textAnchor="middle" fill={p.color} fontSize="6">{p.label.split("\n")[1]}</text>
              <text x={p.x} y="270" textAnchor="middle" fill="#94a3b8" fontSize="6">{p.desc}</text>
            </g>
          ))}
          {/* Cholesterol */}
          <rect x="30" y="275" width="540" height="55" rx="8" fill="rgba(245,158,11,0.05)" stroke="#f59e0b" strokeWidth="0.5" />
          <text x="300" y="295" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600">OTHER COMPONENTS</text>
          {[
            { label: "Cholesterol", desc: "Regulates fluidity — prevents packing at low temp, restrains movement at high temp", x: 80 },
            { label: "Glycocalyx", desc: "Carbohydrate coating (glycoproteins + glycolipids) — cell recognition, protection, adhesion", x: 280 },
            { label: "Peripheral proteins", desc: "Attached to surface (inner/outer) — enzyme activity, structural support", x: 480 },
          ].map((c) => (
            <g key={c.label}>
              <circle cx={c.x} cy="315" r="12" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1" />
              <text x={c.x} y="335" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="600">{c.label}</text>
              <text x={c.x} y="350" textAnchor="middle" fill="#94a3b8" fontSize="6">{c.desc}</text>
            </g>
          ))}
        </svg>
      );

    case "nucleus":
      return (
        <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">NUCLEUS — CONTROL CENTER OF THE CELL</text>
          {/* Nuclear envelope */}
          <ellipse cx="300" cy="150" rx="170" ry="120" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="2" />
          <ellipse cx="300" cy="150" rx="160" ry="112" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
          <text x="300" y="42" textAnchor="middle" fill="#c4b5fd" fontSize="8">Outer nuclear membrane (continuous with RER)</text>
          <text x="300" y="285" textAnchor="middle" fill="#c4b5fd" fontSize="8">Inner nuclear membrane (nuclear lamina)</text>
          {/* Nuclear pores */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 300 + 172 * Math.cos(rad);
            const cy = 150 + 122 * Math.sin(rad);
            return <circle key={i} cx={cx} cy={cy} r="7" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1.5" />;
          })}
          <text x="480" y="55" fill="#a78bfa" fontSize="7">Nuclear pores (8nm diameter)</text>
          <text x="480" y="68" fill="#94a3b8" fontSize="6">Allow mRNA, proteins, ions transport</text>
          {/* Chromatin */}
          <path d="M 200 140 Q 230 110 270 135 Q 310 160 350 130 Q 390 100 420 130" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.6" />
          <path d="M 210 170 Q 250 190 290 175 Q 330 160 370 180 Q 400 195 430 175" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.4" />
          <text x="300" y="200" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="600">Chromatin (DNA + histone proteins)</text>
          <text x="300" y="215" textAnchor="middle" fill="#94a3b8" fontSize="7">Euchromatin (active, loose) · Heterochromatin (inactive, condensed)</text>
          {/* Nucleolus */}
          <ellipse cx="300" cy="240" rx="55" ry="38" fill="rgba(139,92,246,0.35)" stroke="#8b5cf6" strokeWidth="2" />
          <text x="300" y="237" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="700">Nucleolus</text>
          <text x="300" y="252" textAnchor="middle" fill="#c4b5fd" fontSize="7">rRNA synthesis + ribosome assembly</text>
          <text x="300" y="268" textAnchor="middle" fill="#94a3b8" fontSize="6">No membrane · Disappears during cell division</text>
          {/* Functions */}
          <rect x="20" y="295" width="560" height="38" rx="8" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="0.5" />
          <text x="300" y="312" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="600">FUNCTIONS: Controls all cell activities · Stores genetic information (DNA) · Site of transcription (DNA→mRNA) · Ribosome synthesis (nucleolus) · Cell division regulation</text>
          <text x="300" y="326" textAnchor="middle" fill="#94a3b8" fontSize="7">Human nucleus: ~6 feet of DNA per cell · 46 chromosomes (23 pairs) · Diploid (2n)</text>
        </svg>
      );

    case "mitochondria":
      return (
        <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">MITOCHONDRIA — POWERHOUSE OF THE CELL</text>
          <text x="300" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8">Site of aerobic respiration · Produces ATP · Own DNA (maternal inheritance)</text>
          {/* Outer membrane */}
          <ellipse cx="300" cy="130" rx="150" ry="75" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="2" />
          <text x="300" y="65" textAnchor="middle" fill="#f87171" fontSize="8">Outer membrane (smooth, porous)</text>
          {/* Inner membrane with cristae */}
          <path d="M 170 130 Q 200 80 240 120 Q 280 160 320 120 Q 360 80 400 120 Q 440 160 460 130" fill="none" stroke="#ef4444" strokeWidth="2.5" />
          <path d="M 190 130 Q 220 100 260 130 Q 300 160 340 130 Q 380 100 420 130" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
          <text x="300" y="185" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="600">Inner membrane — folded into CRISTAE</text>
          <text x="300" y="200" textAnchor="middle" fill="#94a3b8" fontSize="7">Cristae increase surface area for electron transport chain</text>
          {/* Matrix */}
          <text x="300" y="225" textAnchor="middle" fill="#94a3b8" fontSize="7">Matrix: contains circular DNA, 70S ribosomes, Krebs cycle enzymes</text>
          {/* ATP Synthase */}
          <g transform="translate(250, 110)">
            <rect x="0" y="0" width="8" height="22" rx="2" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="4" cy="26" r="6" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" strokeWidth="1" />
            <text x="15" y="30" fill="#fbbf24" fontSize="7">ATP Synthase</text>
          </g>
          {/* Labels */}
          <LabelTag x={150} y={90} symbol="φ" name="Outer membrane" desc="Porins allow small molecules" color="#ef4444" />
          <LabelTag x={450} y={90} symbol="∿" name="Cristae" desc="Increase surface area for ETC" color="#ef4444" />
          <LabelTag x={300} y={250} symbol="mtDNA" name="Mitochondrial DNA" desc="Circular, 16,569 bp, maternal inheritance" color="#f87171" />
          <LabelTag x={300} y={270} symbol="70S" name="70S Ribosomes" desc="Protein synthesis (bacterial-like)" color="#fbbf24" />
          {/* Equation */}
          <rect x="20" y="285" width="560" height="45" rx="8" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
          <text x="300" y="305" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="600">AEROBIC RESPIRATION</text>
          <text x="300" y="322" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="Georgia" fontStyle="italic">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP</text>
          <text x="300" y="335" textAnchor="middle" fill="#94a3b8" fontSize="7">Glycolysis (cytoplasm) → Krebs cycle (matrix) → ETC (cristae) → Oxidative phosphorylation</text>
        </svg>
      );

    case "chloroplast":
      return (
        <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">CHLOROPLAST — SITE OF PHOTOSYNTHESIS</text>
          {/* Double membrane */}
          <ellipse cx="300" cy="100" rx="130" ry="55" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
          <ellipse cx="300" cy="100" rx="122" ry="48" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4,2" opacity="0.4" />
          <text x="300" y="60" textAnchor="middle" fill="#34d399" fontSize="8">Double membrane (outer + inner)</text>
          {/* Grana */}
          <g transform="translate(200, 85)">
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx="50" cy={i * 14} rx="35" ry="6" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="1" />
            ))}
            <text x="50" y="85" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="600">Granum</text>
          </g>
          <text x="300" y="155" textAnchor="middle" fill="#94a3b8" fontSize="7">Thylakoids stacked into grana · Connected by stroma lamellae</text>
          {/* Stroma */}
          <text x="300" y="175" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="600">Stroma (fluid matrix)</text>
          <text x="300" y="190" textAnchor="middle" fill="#94a3b8" fontSize="7">Contains: Calvin cycle enzymes, circular DNA, 70S ribosomes, starch grains</text>
          {/* Pigments */}
          <rect x="20" y="205" width="280" height="120" rx="12" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1" />
          <text x="160" y="227" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700">PHOTOSYNTHETIC PIGMENTS</text>
          {[
            { name: "Chlorophyll a", color: "#22c55e", abs: "Blue (430nm) + Red (662nm)", func: "Primary pigment — reaction center" },
            { name: "Chlorophyll b", color: "#84cc16", abs: "Blue (453nm) + Orange (642nm)", func: "Accessory — transfers energy to Chl a" },
            { name: "Carotene", color: "#f59e0b", abs: "Blue-green (450-500nm)", func: "Accessory + photoprotection" },
            { name: "Xanthophyll", color: "#fbbf24", abs: "Blue (400-500nm)", func: "Accessory + photoprotection" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={50 + i * 65} cy="265" r="14" fill={`${p.color}40`} stroke={p.color} strokeWidth="1.5" />
              <text x={50 + i * 65} cy="295" textAnchor="middle" fill={p.color} fontSize="7" fontWeight="600">{p.name}</text>
              <text x={50 + i * 65} cy="310" textAnchor="middle" fill="#94a3b8" fontSize="6">{p.abs}</text>
              <text x={50 + i * 65} cy="322" textAnchor="middle" fill="#64748b" fontSize="5">{p.func}</text>
            </g>
          ))}
          {/* Equations */}
          <rect x="310" y="205" width="270" height="120" rx="12" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1" />
          <text x="445" y="227" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700">PHOTOSYNTHESIS EQUATIONS</text>
          <text x="445" y="250" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="Georgia" fontStyle="italic">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</text>
          <text x="445" y="270" textAnchor="middle" fill="#94a3b8" fontSize="8">Light reactions (thylakoid): H₂O → O₂ + ATP + NADPH</text>
          <text x="445" y="288" textAnchor="middle" fill="#94a3b8" fontSize="8">Calvin cycle (stroma): CO₂ + ATP + NADPH → Glucose</text>
          <text x="445" y="308" textAnchor="middle" fill="#f87171" fontSize="8">C₃ plant (Calvin cycle) · C₄ (Kranz anatomy) · CAM (night opening)</text>
          <text x="445" y="325" textAnchor="middle" fill="#94a3b8" fontSize="7">Rubisco: most abundant enzyme on Earth · Fixes CO₂ to RuBP</text>
        </svg>
      );

    case "plastids":
      return (
        <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="700">PLASTIDS — PLANT-SPECIFIC ORGANELLES</text>
          {[
            { name: "Chloroplast", color: "#22c55e", desc: "Green pigment (chlorophyll)\nPhotosynthesis\nDouble membrane, thylakoids, grana", examples: "Leaf mesophyll, stem cortex" },
            { name: "Chromoplast", color: "#ef4444", desc: "Colored pigments (carotenoids)\nAttracts pollinators & seed dispersers\nNo photosynthesis", examples: "Flower petals, ripe fruits (tomato, carrot)" },
            { name: "Leucoplast", color: "#e2e8f0", desc: "Colorless, stores food\nAmyloplasts (starch)\nElaioplasks (oils)\nProteinoplasts (proteins)", examples: "Potato tubers, seeds, roots" },
          ].map((p, i) => (
            <rect key={i} x={20 + i * 195} y="40" width="180" height="240" rx="12" fill={`${p.color}08`} stroke={p.color} strokeWidth="1" />
          ))}
          {[
            { name: "Chloroplast", x: 110, y: 60, color: "#22c55e" },
            { name: "Chromoplast", x: 305, y: 60, color: "#ef4444" },
            { name: "Leucoplast", x: 500, y: 60, color: "#e2e8f0" },
          ].map((p) => (
            <text key={p.name} x={p.x} y={p.y} textAnchor="middle" fill={p.color} fontSize="11" fontWeight="700">{p.name}</text>
          ))}
          {[
            { desc: "Green pigment\n(Chlorophyll a+b)\n\nDouble membrane\nThylakoids + grana\nStroma\nOwn DNA (70S ribosomes)", x: 110, y: 100, color: "#22c55e" },
            { desc: "Red/orange pigments\n(Carotenoids: carotene,\nxanthophyll)\n\nNo thylakoids\n\nConverts from chloroplast\nor formed de novo", x: 305, y: 100, color: "#ef4444" },
            { desc: "Colorless\n\nStorage function\n\n3 types:\n• Amyloplasts (starch)\n• Elaioplasks (oils)\n• Proteinoplasts (protein)", x: 500, y: 100, color: "#e2e8f0" },
          ].map((p, i) => (
            <text key={i} x={p.x} y={p.y} fill="#94a3b8" fontSize="8" dangerouslySetInnerHTML={{ __html: p.desc.replace(/\n/g, "<tspan x='" + p.x + "' dy='14'>") }} />
          ))}
          {/* Interconversion */}
          <rect x="20" y="290" width="560" height="35" rx="8" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="0.5" />
          <text x="300" y="312" textAnchor="middle" fill="#a3e635" fontSize="10" fontWeight="600">PLASTID INTERCONVERSION</text>
          <text x="300" y="328" textAnchor="middle" fill="#94a3b8" fontSize="8">Chloroplast ↔ Chromoplast (tomato ripening) · Amyloplast ↔ Chloroplast (potato exposed to light) · All derived from proplastid</text>
        </svg>
      );

    case "er":
      return (
        <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">ENDOPLASMIC RETICULUM — TRANSPORT SYSTEM</text>
          {/* Rough ER */}
          <rect x="20" y="40" width="280" height="245" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
          <text x="160" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">ROUGH ER (RER)</text>
          <text x="160" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Studded with ribosomes · Connected to nuclear envelope</text>
          {/* Folded membranes with ribosomes */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <path d={`M ${40 + i * 55} ${100 + i * 5} Q ${70 + i * 55} ${80 + i * 5} ${100 + i * 55} ${100 + i * 5} Q ${130 + i * 55} ${120 + i * 5} ${160 + i * 55} ${100 + i * 5}`} fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
              {Array.from({ length: 5 }).map((_, j) => (
                <circle key={j} cx={50 + i * 55 + j * 12} cy={95 + i * 5} r="2.5" fill="#fbbf24" />
              ))}
            </g>
          ))}
          <text x="160" y="190" textAnchor="middle" fill="#94a3b8" fontSize="8">Functions: Protein synthesis & folding · Glycosylation (adds sugars) · Quality control</text>
          <text x="160" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">Makes: Secretory proteins, membrane proteins, lysosomal enzymes</text>
          <LabelTag x={160} y={230} symbol="RER" name="Rough ER" desc="Ribosomes → protein synthesis" color="#f59e0b" />
          <LabelTag x={160} y={250} symbol="GS" name="Glycosylation" desc="Adds carbohydrate chains" color="#fbbf24" />

          {/* Smooth ER */}
          <rect x="310" y="40" width="270" height="245" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
          <text x="445" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">SMOOTH ER (SER)</text>
          <text x="445" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">No ribosomes · Tubular network</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M ${330 + i * 50} ${110} Q ${355 + i * 50} ${90} ${380 + i * 50} ${110} Q ${405 + i * 50} ${130} ${430 + i * 50} ${110}`} fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.6" />
          ))}
          <text x="445" y="190" textAnchor="middle" fill="#94a3b8" fontSize="8">Functions: Lipid synthesis · Detoxification · Ca²⁺ storage</text>
          <text x="445" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">In liver: drug detox · In muscle: sarcoplasmic reticulum (Ca²⁺)</text>
          <LabelTag x={445} y={230} symbol="SER" name="Smooth ER" desc="Lipid synthesis, detox" color="#8b5cf6" />
          <LabelTag x={445} y={250} symbol="Ca²⁺" name="Calcium storage" desc="Muscle contraction trigger" color="#a78bfa" />
        </svg>
      );

    case "golgi":
      return (
        <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#ec4899" fontSize="12" fontWeight="700">GOLGI APPARATUS — POST OFFICE OF THE CELL</text>
          {/* Stack of cisternae */}
          <g transform="translate(100, 50)">
            {[
              { label: "Cis face\n(receiving)", y: 0, color: "#67e8f9" },
              { label: "Medial", y: 45, color: "#fbbf24" },
              { label: "Trans face\n(shipping)", y: 90, color: "#f472b6" },
            ].map((c) => (
              <g key={c.label}>
                <ellipse cx="100" cy={c.y} rx="80" ry="12" fill={`${c.color}15`} stroke={c.color} strokeWidth="1.5" />
                <ellipse cx="100" cy={c.y + 15} rx="75" ry="11" fill={`${c.color}10`} stroke={c.color} strokeWidth="1" opacity="0.6" />
                <text x="100" y={c.y + 5} textAnchor="middle" fill={c.color} fontSize="9" fontWeight="600">{c.label.split("\n")[0]}</text>
                {c.label.includes("\n") && <text x="100" y={c.y + 17} textAnchor="middle" fill="#94a3b8" fontSize="7">{c.label.split("\n")[1]}</text>}
              </g>
            ))}
            <text x="100" y="130" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="600">Golgi Stack</text>
            <text x="100" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">4-8 flattened membrane sacs (cisternae)</text>
          </g>
          {/* Vesicles */}
          <circle cx="30" cy="100" r="15" fill="rgba(103,232,249,0.2)" stroke="#67e8f9" strokeWidth="1.5" />
          <text x="30" y="104" textAnchor="middle" fill="#67e8f9" fontSize="6" fontWeight="600">TFV</text>
          <text x="30" y="130" textAnchor="middle" fill="#94a3b8" fontSize="7">Transport</text>
          <text x="30" y="140" textAnchor="middle" fill="#94a3b8" fontSize="7">vesicle</text>
          <line x1="45" y1="100" x2="85" y2="50" stroke="#67e8f9" strokeWidth="1" strokeDasharray="3,2" />
          <circle cx="190" cy="100" r="12" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="190" y="104" textAnchor="middle" fill="#fbbf24" fontSize="5" fontWeight="600">SV</text>
          <text x="190" y="130" textAnchor="middle" fill="#94a3b8" fontSize="7">Secretory</text>
          <text x="190" y="140" textAnchor="middle" fill="#94a3b8" fontSize="7">vesicle</text>
          <circle cx="190" cy="180" r="10" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1.5" />
          <text x="190" y="184" textAnchor="middle" fill="#fb923c" fontSize="5" fontWeight="600">LYS</text>
          <text x="190" y="210" textAnchor="middle" fill="#94a3b8" fontSize="7">Lysosome</text>
          <text x="190" y="220" textAnchor="middle" fill="#94a3b8" fontSize="7">formation</text>
          {/* Functions */}
          <rect x="240" y="40" width="340" height="265" rx="12" fill="rgba(236,72,153,0.05)" stroke="#ec4899" strokeWidth="1" />
          <text x="410" y="62" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="700">FUNCTIONS OF GOLGI APPARATUS</text>
          {[
            { f: "Protein modification", d: "Glycosylation — adds sugar chains to proteins", color: "#f472b6" },
            { f: "Protein packaging", d: "Packages proteins into vesicles for transport", color: "#f472b6" },
            { f: "Sorting & directed transport", d: "Directs proteins to correct cellular destination", color: "#f472b6" },
            { f: "Lysosome formation", d: "Produces lysosomes containing hydrolytic enzymes", color: "#f97316" },
            { f: "Carbohydrate synthesis", d: "Makes pectin & cellulose for plant cell wall", color: "#22c55e" },
            { f: "Acrosome formation", d: "Modifies sperm acrosome (contains hyaluronidase)", color: "#3b82f6" },
            { f: "Protein sulfation", d: "Adds sulfate groups (e.g., mucus glycoproteins)", color: "#8b5cf6" },
          ].map((item, i) => (
            <g key={i}>
              <rect x="255" y={80 + i * 28} width="310" height="24" rx="4" fill={`${item.color}10`} stroke={item.color} strokeWidth="0.5" />
              <text x="265" y={96 + i * 28} fill={item.color} fontSize="8" fontWeight="600">{item.f}</text>
              <text x="560" y={96 + i * 28} textAnchor="end" fill="#94a3b8" fontSize="7">{item.d}</text>
            </g>
          ))}
        </svg>
      );

    case "ribosome":
      return (
        <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="700">RIBOSOMES — PROTEIN SYNTHESIS FACTORIES</text>
          {/* Structure */}
          <rect x="20" y="40" width="280" height="220" rx="12" fill="rgba(20,184,166,0.08)" stroke="#14b8a6" strokeWidth="1" />
          <text x="160" y="62" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="700">RIBOSOME STRUCTURE</text>
          {/* Large subunit */}
          <ellipse cx="160" cy="120" rx="70" ry="40" fill="rgba(20,184,166,0.2)" stroke="#14b8a6" strokeWidth="2" />
          <text x="160" y="117" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="600">Large subunit</text>
          <text x="160" y="132" textAnchor="middle" fill="#94a3b8" fontSize="7">(60S — 28S rRNA + 5S rRNA + 34 proteins)</text>
          {/* Small subunit */}
          <ellipse cx="160" cy="165" rx="55" ry="30" fill="rgba(20,184,166,0.15)" stroke="#14b8a6" strokeWidth="2" />
          <text x="160" y="162" textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="600">Small subunit</text>
          <text x="160" y="177" textAnchor="middle" fill="#94a3b8" fontSize="7">(40S — 18S rRNA + 33 proteins)</text>
          <text x="160" y="215" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="600">80S total (eukaryotic cytoplasm)</text>
          <text x="160" y="232" textAnchor="middle" fill="#94a3b8" fontSize="8">70S in prokaryotes (50S+30S) & organelles</text>
          <text x="160" y="250" textAnchor="middle" fill="#f87171" fontSize="8">Antibiotics target 70S (selective toxicity)</text>
          <LabelTag x={160} y={265} symbol="rRNA" name="Ribozyme" desc="Peptidyl transferase is RNA, not protein!" color="#14b8a6" />

          {/* Types */}
          <rect x="310" y="40" width="270" height="220" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
          <text x="445" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">TYPES & LOCATIONS</text>
          {[
            { name: "Free ribosomes", loc: "Float in cytoplasm", makes: "Cytoplasmic proteins (enzyme, structural)", color: "#fbbf24" },
            { name: "Bound ribosomes", loc: "Attached to RER", makes: "Secretory, membrane, lysosomal proteins", color: "#f59e0b" },
            { name: "Mitochondrial", loc: "Inside mitochondria", makes: "Some mitochondrial proteins (70S)", color: "#ef4444" },
            { name: "Chloroplastic", loc: "Inside chloroplasts", makes: "Some photosynthetic proteins (70S)", color: "#22c55e" },
          ].map((r, i) => (
            <g key={i}>
              <rect x="325" y={80 + i * 42} width="240" height="36" rx="6" fill={`${r.color}15`} stroke={r.color} strokeWidth="0.5" />
              <text x="335" y="97 + i * 42" fill={r.color} fontSize="9" fontWeight="600">{r.name}</text>
              <text x="335" y="110 + i * 42" fill="#94a3b8" fontSize="7">Location: {r.loc}</text>
              <text x="555" y="105 + i * 42" textAnchor="end" fill="#64748b" fontSize="7">{r.makes}</text>
            </g>
          ))}
        </svg>
      );

    case "lysosome":
      return (
        <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="700">LYSOSOMES — CELLULAR STOMACH</text>
          {/* Structure */}
          <circle cx="180" cy="130" r="70" fill="rgba(249,115,22,0.1)" stroke="#f97316" strokeWidth="2" />
          <circle cx="180" cy="130" r="55" fill="rgba(249,115,22,0.15)" stroke="#f97316" strokeWidth="1" strokeDasharray="4,2" />
          <text x="180" y="127" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="600">Hydrolytic enzymes</text>
          <text x="180" y="142" textAnchor="middle" fill="#94a3b8" fontSize="7">(acid pH ~5 inside)</text>
          <text x="180" y="215" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="600">Lysosome</text>
          <LabelTag x={180} y={235} symbol="H⁺ pump" name="Proton pump" desc="Maintains acidic pH (5) inside" color="#f97316" />
          <LabelTag x={180} y={255} symbol="φ" name="Single membrane" desc="Prevents enzyme leakage into cytoplasm" color="#f97316" />

          {/* Enzyme types */}
          <rect x="300" y="40" width="280" height="130" rx="12" fill="rgba(249,115,22,0.08)" stroke="#f97316" strokeWidth="1" />
          <text x="440" y="62" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="700">HYDROLYTIC ENZYMES (40+ types)</text>
          {[
            { name: "Proteases", desc: "Proteins → amino acids" },
            { name: "Lipases", desc: "Lipids → fatty acids + glycerol" },
            { name: "Nucleases", desc: "DNA/RNA → nucleotides" },
            { name: "Carbohydrases", desc: "Carbs → simple sugars" },
            { name: "Phosphatases", desc: "Removes phosphate groups" },
            { name: "Acid phosphatase", desc: "Marker enzyme of lysosome" },
          ].map((e, i) => (
            <g key={i}>
              <rect x="315" y={80 + i * 18} width="250" height="15" rx="3" fill="rgba(249,115,22,0.1)" />
              <text x="325" y={91 + i * 18} fill="#fb923c" fontSize="8" fontWeight="600">{e.name}</text>
              <text x="555" y={91 + i * 18} textAnchor="end" fill="#94a3b8" fontSize="7">{e.desc}</text>
            </g>
          ))}

          {/* Functions */}
          <rect x="300" y="180" width="280" height="110" rx="12" fill="rgba(249,115,22,0.05)" stroke="#f97316" strokeWidth="0.5" />
          <text x="440" y="202" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="700">FUNCTIONS</text>
          {[
            { name: "Intracellular digestion", desc: "Breaks down food particles (phagocytosis)" },
            { name: "Autophagy", desc: "Recycles worn-out organelles (self-eating)" },
            { name: "Autolysis", desc: "Self-digestion — cell death when lysosome ruptures" },
            { name: "Fertilization", desc: "Acrosome (modified lysosome) digests egg membrane" },
            { name: "Defense", desc: "Destroys invading bacteria in phagocytes" },
          ].map((f, i) => (
            <g key={i}>
              <rect x="315" y={215 + i * 16} width="250" height="13" rx="2" fill="rgba(249,115,22,0.08)" />
              <text x="325" y="225 + i * 16" fill="#fb923c" fontSize="7" fontWeight="600">{f.name}</text>
              <text x="560" y="225 + i * 16" textAnchor="end" fill="#94a3b8" fontSize="6">{f.desc}</text>
            </g>
          ))}
        </svg>
      );

    case "wall":
      return (
        <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="700">CELL WALL — PLANT STRUCTURAL SUPPORT</text>
          {/* Layers */}
          <rect x="20" y="40" width="280" height="245" rx="12" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="1" />
          <text x="160" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">LAYERS OF CELL WALL</text>
          {[
            { name: "Middle lamella", desc: "Pectin layer — cements adjacent cells together", y: 85, color: "#a3e635" },
            { name: "Primary wall", desc: "Thin, flexible — cellulose + hemicellulose + pectin + proteins", y: 120, color: "#84cc16" },
            { name: "Secondary wall", desc: "Thick, rigid — cellulose + lignin (dead cells only)", y: 155, color: "#65a30d" },
          ].map((l) => (
            <g key={l.name}>
              <rect x="35" y={l.y} width="250" height="26" rx="4" fill={`${l.color}20`} stroke={l.color} strokeWidth="1" />
              <text x="45" y={l.y + 12} fill={l.color} fontSize="9" fontWeight="600">{l.name}</text>
              <text x="45" y={l.y + 23} fill="#94a3b8" fontSize="7">{l.desc}</text>
            </g>
          ))}
          <LabelTag x={160} y={195} symbol="(C₆H₁₀O₅)ₙ" name="Cellulose" desc="β-1,4 linked glucose chains → microfibrils" color="#84cc16" />
          <LabelTag x={160} y={215} symbol="Lignin" name="Lignin" desc="Provides rigidity (secondary wall)" color="#65a30d" />
          <LabelTag x={160} y={235} symbol="Hemi" name="Hemicellulose" desc="Bridges cellulose microfibrils" color="#a3e635" />
          <LabelTag x={160} y={255} symbol="Pectin" name="Pectin" desc="Gel-like, middle lamella component" color="#d9f99d" />

          {/* Plasmodesmata */}
          <rect x="310" y="40" width="270" height="245" rx="12" fill="rgba(132,204,22,0.05)" stroke="#84cc16" strokeWidth="1" />
          <text x="445" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">PLASMODESMATA</text>
          <text x="445" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Cytoplasmic channels through cell walls</text>
          {/* Diagram */}
          <rect x="330" y="95" width="60" height="70" rx="4" fill="rgba(132,204,22,0.2)" stroke="#84cc16" strokeWidth="1" />
          <text x="360" y="135" textAnchor="middle" fill="#a3e635" fontSize="7">Cell 1</text>
          <rect x="450" y="95" width="60" height="70" rx="4" fill="rgba(132,204,22,0.2)" stroke="#84cc16" strokeWidth="1" />
          <text x="480" y="135" textAnchor="middle" fill="#a3e635" fontSize="7">Cell 2</text>
          <line x1="390" y1="130" x2="450" y2="130" stroke="#a3e635" strokeWidth="2" />
          <circle cx="420" cy="130" r="5" fill="rgba(132,204,22,0.4)" stroke="#84cc16" strokeWidth="1" />
          <text x="420" y="160" textAnchor="middle" fill="#2dd4bf" fontSize="8" fontWeight="600">Plasmodesma</text>
          <text x="420" y="178" textAnchor="middle" fill="#94a3b8" fontSize="7">Allows transport & communication</text>
          <text x="420" y="193" textAnchor="middle" fill="#94a3b8" fontSize="7">Between adjacent plant cells</text>
          <text x="445" y="220" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="600">Functions:</text>
          <text x="445" y="235" textAnchor="middle" fill="#94a3b8" fontSize="7">Symplast pathway · Cell signaling</text>
          <text x="445" y="250" textAnchor="middle" fill="#94a3b8" fontSize="7">Viral movement · Nutrient distribution</text>
          {/* Cell wall functions */}
          <rect x="310" y="260" width="270" height="20" rx="4" fill="rgba(132,204,22,0.1)" />
          <text x="445" y="274" textAnchor="middle" fill="#a3e635" fontSize="8">Protection · Support · Prevents bursting (turgor) · Determines cell shape</text>
        </svg>
      );

    case "cilia":
      return (
        <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#a3e635" fontSize="12" fontWeight="700">CILIA & FLAGELLA — CELL MOBILITY</text>
          {/* Cilia */}
          <rect x="20" y="40" width="280" height="225" rx="12" fill="rgba(163,230,53,0.08)" stroke="#a3e635" strokeWidth="1" />
          <text x="160" y="62" textAnchor="middle" fill="#bef264" fontSize="11" fontWeight="700">CILIA</text>
          <text x="160" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Short, numerous, coordinated beating</text>
          {/* Cell surface */}
          <line x1="40" y1="150" x2="280" y2="150" stroke="#a3e635" strokeWidth="2" />
          <text x="160" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7">Cell surface</text>
          {/* Individual cilia */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={55 + i * 23} y1="150" x2={55 + i * 23} y2="95" stroke="#a3e635" strokeWidth="2" />
          ))}
          <text x="160" y="200" textAnchor="middle" fill="#bef264" fontSize="8">Short (5-10 μm), hundreds per cell</text>
          <text x="160" y="215" textAnchor="middle" fill="#94a3b8" fontSize="7">Move fluid/mucus over cell surface</text>
          <text x="160" y="230" textAnchor="middle" fill="#94a3b8" fontSize="7">Example: human respiratory tract</text>
          <LabelTag x={160} y={250} symbol="9+2" name="Microtubule arrangement" desc="9 outer doublets + 2 central (axoneme)" color="#a3e635" />

          {/* Flagella */}
          <rect x="310" y="40" width="270" height="225" rx="12" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1" />
          <text x="445" y="62" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700">FLAGELLUM</text>
          <text x="445" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Long, few (1-2), undulating motion</text>
          <line x1="330" y1="150" x2="560" y2="150" stroke="#3b82f6" strokeWidth="2" />
          <path d="M 445 150 Q 420 110 445 70 Q 470 30 445 20" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <circle cx="445" cy="18" r="5" fill="#60a5fa" />
          <text x="445" y="200" textAnchor="middle" fill="#60a5fa" fontSize="8">Long (15-200 μm), 1-2 per cell</text>
          <text x="445" y="215" textAnchor="middle" fill="#94a3b8" fontSize="7">Propels entire cell through liquid</text>
          <text x="445" y="230" textAnchor="middle" fill="#94a3b8" fontSize="7">Example: sperm cell, Euglena</text>
          <LabelTag x={445} y={250} symbol="9+2" name="Same arrangement" desc="Identical microtubule structure" color="#3b82f6" />
        </svg>
      );

    case "inclusions":
      return (
        <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
          <text x="300" y="22" textAnchor="middle" fill="#d97706" fontSize="12" fontWeight="700">CELL INCLUSIONS — STORAGE GRAINS & DEPOSITS</text>
          {[
            { name: "Glycogen granules", color: "#f59e0b", desc: "Animal starch — glucose storage in liver & muscle", example: "Liver cells, muscle cells" },
            { name: "Starch grains", color: "#fbbf24", desc: "Plant glucose storage — amylose + amylopectin", example: "Potato tuber, cereal endosperm" },
            { name: "Lipid droplets", color: "#8b5cf6", desc: "Triglyceride storage — energy reserve", example: "Adipose tissue, seed endosperm" },
            { name: "Protein crystals", color: "#ec4899", desc: "Crystalloid bodies — storage proteins", example: "Seed endosperm (aleurone layer)" },
            { name: "Secretory products", color: "#06b6d4", desc: "Hormones, enzymes, mucus stored before release", example: "Pancreatic acinar cells" },
            { name: "Pigments", color: "#22c55e", desc: "Melanin (skin/hair), hemoglobin (RBC), lipofuscin (aging)", example: "Melanocytes, RBCs" },
            { name: "Calcium oxalate", color: "#a3e635", desc: "Crystalline deposits — waste product", example: "Plant cells, kidney stones" },
            { name: "Mucin", color: "#f97316", desc: "Glycoprotein — lubrication & protection", example: "Goblet cells, salivary glands" },
          ].map((inc, i) => (
            <g key={i}>
              <rect x={20 + (i % 4) * 148} y={40 + Math.floor(i / 4) * 115} width="140" height="105" rx="8" fill={`${inc.color}10`} stroke={inc.color} strokeWidth="1" />
              <circle cx={90 + (i % 4) * 148} cy={60 + Math.floor(i / 4) * 115} r="8" fill={`${inc.color}40`} stroke={inc.color} strokeWidth="1" />
              <text x={90 + (i % 4) * 148} y={78 + Math.floor(i / 4) * 115} textAnchor="middle" fill={inc.color} fontSize="8" fontWeight="600">{inc.name}</text>
              <text x={30 + (i % 4) * 148} y={95 + Math.floor(i / 4) * 115} fill="#94a3b8" fontSize="7">{inc.desc}</text>
              <text x={30 + (i % 4) * 148} y="110" fill="#64748b" fontSize="6">{inc.example}</text>
            </g>
          ))}
        </svg>
      );

    default:
      return null;
  }
}

function LabelTag({ x, y, symbol, name, desc, color }: { x: number; y: number; symbol: string; name: string; desc: string; color: string }) {
  return (
    <g>
      <rect x={x - 60} y={y - 12} width="120" height="24" rx="4" fill="rgba(15,23,42,0.9)" stroke={color} strokeWidth="0.5" />
      <text x={x} y={y - 2} textAnchor="middle" fill={color} fontSize="9" fontWeight="700" fontFamily="Georgia" fontStyle="italic">{symbol}</text>
      <text x={x} y={y + 10} textAnchor="middle" fill="#e2e8f0" fontSize="7">{name}</text>
    </g>
  );
}

export function BiologyCell3D() {
  const [tab, setTab] = useState<Tab>("overview");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><active.icon className="h-5 w-5" style={{ color: active.color }} /></div>
        <div><h2 className="font-semibold text-base">Cell Ultrastructure 3D — Complete NEB XI Unit 1</h2><p className="text-xs text-muted-foreground">Prokaryotic vs Eukaryotic · 13 organelles with full labelled diagrams · All syllabus topics covered</p></div>
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
        <OrganelleSVG type={tab} />
      </div>
    </div>
  );
}
