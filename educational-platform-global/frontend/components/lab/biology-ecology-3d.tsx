"use client";

import { useState } from "react";
import { Globe, TreeDeciduous, CloudRain, Wind } from "lucide-react";

type Tab = "ecosystem" | "foodweb" | "cycles" | "adaptation" | "pollution";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "ecosystem", label: "Ecosystem", icon: Globe, color: "#22c55e" },
  { id: "foodweb", label: "Food Chain & Web", icon: TreeDeciduous, color: "#10b981" },
  { id: "cycles", label: "Biogeochemical Cycles", icon: CloudRain, color: "#3b82f6" },
  { id: "adaptation", label: "Adaptation", icon: Wind, color: "#84cc16" },
  { id: "pollution", label: "Pollution", icon: Wind, color: "#ef4444" },
];

function EcosystemView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="700">ECOSYSTEM — STRUCTURE & FUNCTION</text>
        {/* Pond ecosystem */}
        <rect x="20" y="40" width="280" height="260" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">POND ECOSYSTEM</text>
        {/* Sun */}
        <circle cx="60" cy="90" r="20" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="60" y="135" textAnchor="middle" fill="#fbbf24" fontSize="7">Sun</text>
        {/* Water */}
        <rect x="40" y="140" width="240" height="140" rx="6" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="1" />
        {/* Producers */}
        <text x="160" y="165" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">PRODUCERS</text>
        <ellipse cx="100" cy="190" rx="25" ry="12" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1" />
        <ellipse cx="160" cy="200" rx="30" ry="10" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1" />
        <ellipse cx="220" cy="190" rx="20" ry="10" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1" />
        <text x="160" y="220" textAnchor="middle" fill="#94a3b8" fontSize="7">Algae, aquatic plants</text>
        {/* Primary consumers */}
        <text x="160" y="245" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">PRIMARY CONSUMERS</text>
        <ellipse cx="120" cy="265" rx="15" ry="8" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1" />
        <ellipse cx="200" cy="265" rx="12" ry="7" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1" />
        <text x="160" y="285" textAnchor="middle" fill="#94a3b8" fontSize="7">Snails, small fish, zooplankton</text>
        {/* Decomposers */}
        <text x="160" y="300" textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="600">DECOMPOSERS</text>
        <text x="160" y="315" textAnchor="middle" fill="#94a3b8" fontSize="7">Bacteria, fungi (bottom mud)</text>
        {/* Arrows */}
        <path d="M 160 140 L 160 155" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 160 225 L 160 240" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M 160 275 L 160 290" stroke="#fbbf24" strokeWidth="1.5" />

        {/* Forest ecosystem */}
        <rect x="310" y="40" width="270" height="260" rx="12" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">FOREST ECOSYSTEM</text>
        {/* Trees */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={340 + i * 45} y="130" width="6" height="50" fill="#92400e" />
            <circle cx={343 + i * 45} cy="120" r="25" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1" />
          </g>
        ))}
        <text x="445" y="170" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">Producers: Trees, shrubs, herbs</text>
        <text x="445" y="190" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Consumers: Insects, deer, birds, tigers</text>
        <text x="445" y="210" textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="600">Decomposers: Fungi, bacteria in soil</text>
        <text x="445" y="240" textAnchor="middle" fill="#94a3b8" fontSize="8">Abiotic: Soil, water, sunlight, temperature, minerals</text>
        {/* Components box */}
        <rect x="310" y="255" width="270" height="40" rx="6" fill="rgba(132,204,22,0.1)" stroke="#84cc16" strokeWidth="0.5" />
        <text x="445" y="275" textAnchor="middle" fill="#a3e635" fontSize="9" fontWeight="600">BIOTIC = Producers + Consumers + Decomposers</text>
        <text x="445" y="290" textAnchor="middle" fill="#94a3b8" fontSize="8">ABIOTIC = Sunlight, water, soil, temperature, gases</text>
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Biotic Components", items: ["Producers (autotrophs)", "Consumers (heterotrophs)", "Decomposers (saprotrophs)"], color: "#22c55e" },
          { name: "Abiotic Components", items: ["Sunlight, temperature, water", "Soil, minerals, gases", "pH, humidity, wind"], color: "#3b82f6" },
          { name: "Energy Flow", items: ["Unidirectional: Sun → Producer → Consumer", "10% rule", "Lost as heat at each level"], color: "#f59e0b" },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg" style={{ borderColor: `${s.color}30`, backgroundColor: `${s.color}08` }}>
            <p className="text-xs font-bold" style={{ color: s.color }}>{s.name}</p>
            {s.items.map((item, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {item}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodWebView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="700">FOOD CHAIN & FOOD WEB</text>
        {/* Food chain */}
        <rect x="20" y="40" width="280" height="260" rx="12" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700">FOOD CHAIN</text>
        {/* Chain */}
        <g>
          <rect x="40" y="90" width="60" height="35" rx="6" fill="rgba(34,197,94,0.3)" stroke="#22c55e" strokeWidth="1.5" />
          <text x="70" y="107" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="600">Grass</text>
          <text x="70" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Producer</text>
          <text x="115" y="112" textAnchor="middle" fill="#34d399" fontSize="14">→</text>

          <rect x="140" y="90" width="60" height="35" rx="6" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="170" y="107" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="600">Grasshopper</text>
          <text x="170" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Primary</text>
          <text x="215" y="112" textAnchor="middle" fill="#34d399" fontSize="14">→</text>

          <rect x="240" y="90" width="60" height="35" rx="6" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1.5" />
          <text x="270" y="107" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="600">Frog</text>
          <text x="270" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Secondary</text>
          <text x="315" y="112" textAnchor="middle" fill="#34d399" fontSize="14">→</text>

          <rect x="320" y="90" width="60" height="35" rx="6" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="350" y="107" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="600">Snake</text>
          <text x="350" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Tertiary</text>
          <text x="395" y="112" textAnchor="middle" fill="#34d399" fontSize="14">→</text>

          <rect x="400" y="90" width="60" height="35" rx="6" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="1.5" />
          <text x="430" y="107" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="600">Eagle</text>
          <text x="430" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Quaternary</text>
        </g>
        {/* Decomposer */}
        <text x="250" y="155" textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="600">↓ All levels → Decomposers (bacteria, fungi)</text>
        <text x="250" y="175" textAnchor="middle" fill="#94a3b8" fontSize="8">Return nutrients to soil → reused by producers</text>

        {/* Trophic levels */}
        <text x="160" y="205" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="600">TROPHIC LEVELS</text>
        {[
          { level: "T1 — Producers", energy: "10,000 kJ", desc: "Grass, plants", color: "#22c55e" },
          { level: "T2 — Primary consumers", energy: "1,000 kJ", desc: "Herbivores", color: "#fbbf24" },
          { level: "T3 — Secondary consumers", energy: "100 kJ", desc: "Carnivores", color: "#ef4444" },
          { level: "T4 — Tertiary consumers", energy: "10 kJ", desc: "Top predators", color: "#8b5cf6" },
        ].map((t, i) => (
          <g key={i}>
            <rect x="40" y={220 + i * 20} width={280 - i * 40} height="16" rx="3" fill={`${t.color}20`} stroke={t.color} strokeWidth="0.5" />
            <text x="50" y={232 + i * 20} fill={t.color} fontSize="7" fontWeight="600">{t.level}</text>
            <text x="280" y={232 + i * 20} textAnchor="end" fill="#94a3b8" fontSize="7">{t.energy}</text>
          </g>
        ))}
        <text x="160" y="310" textAnchor="middle" fill="#94a3b8" fontSize="8">10% Energy Transfer Rule — only ~10% passes to next level</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Ecological Pyramid", rows: ["Pyramid of numbers: # of organisms at each level", "Pyramid of biomass: total mass at each level", "Pyramid of energy: always upright (10% rule)", "All pyramids are upright for stable ecosystems"] },
          { name: "Food Web vs Chain", rows: ["Food chain: linear sequence of eating", "Food web: interconnected food chains", "Food webs are more realistic", "Greater stability in food webs"] },
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

function CyclesView() {
  const [cycle, setCycle] = useState("carbon");
  const cycles: Record<string, { title: string; steps: string[]; equation: string; color: string }> = {
    carbon: {
      title: "Carbon Cycle",
      equation: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (photosynthesis)",
      color: "#3b82f6",
      steps: [
        "Photosynthesis: CO₂ + H₂O → glucose + O₂ (producers)",
        "Respiration: glucose + O₂ → CO₂ + H₂O + energy (all organisms)",
        "Decomposition: dead matter → CO₂ (decomposers)",
        "Combustion: burning fossil fuels → CO₂",
        "Ocean absorption: CO₂ dissolves in seawater",
        "Fossilization: ancient matter → coal, oil, gas (long-term storage)",
      ],
    },
    nitrogen: {
      title: "Nitrogen Cycle",
      equation: "N₂ → NH₃ → NO₂⁻ → NO₃⁻ (nitrification)",
      color: "#10b981",
      steps: [
        "Nitrogen fixation: N₂ → NH₃ (by Rhizobium, cyanobacteria, lightning)",
        "Nitrification: NH₃ → NO₂⁻ → NO₃⁻ (by Nitrosomonas, Nitrobacter)",
        "Assimilation: plants absorb NO₃⁻ → proteins, nucleic acids",
        "Ammonification: dead matter → NH₃ (decomposers)",
        "Denitrification: NO₃⁻ → N₂ (by Pseudomonas — returns to atmosphere)",
      ],
    },
  };
  const c = cycles[cycle];
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {Object.keys(cycles).map((k) => (
          <button key={k} onClick={() => setCycle(k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${cycle === k ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/40" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {cycles[k].title}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill={c.color} fontSize="12" fontWeight="700">{c.title}</text>
        {/* Central reservoir */}
        <circle cx="300" cy="100" r="50" fill={`${c.color}15`} stroke={c.color} strokeWidth="2" />
        <text x="300" y="95" textAnchor="middle" fill={c.color} fontSize="10" fontWeight="600">{cycle === "carbon" ? "CO₂" : "N₂"}</text>
        <text x="300" y="112" textAnchor="middle" fill="#94a3b8" fontSize="7">Atmosphere</text>
        {/* Pathways */}
        {[
          { label: cycle === "carbon" ? "Photosynthesis" : "Fixation", x: 150, y: 160, color: "#22c55e" },
          { label: cycle === "carbon" ? "Respiration" : "Nitrification", x: 450, y: 160, color: "#ef4444" },
          { label: "Decomposition", x: 150, y: 220, color: "#f59e0b" },
          { label: cycle === "carbon" ? "Combustion" : "Denitrification", x: 450, y: 220, color: "#8b5cf6" },
        ].map((p) => (
          <g key={p.label}>
            <line x1="300" y1="100" x2={p.x} y2={p.y} stroke={p.color} strokeWidth="1.5" strokeDasharray="4,2" opacity="0.6" />
            <circle cx={p.x} cy={p.y} r="25" fill={`${p.color}15`} stroke={p.color} strokeWidth="1" />
            <text x={p.x} y={p.y + 3} textAnchor="middle" fill={p.color} fontSize="7" fontWeight="600">{p.label}</text>
          </g>
        ))}
        {/* Producers */}
        <rect x="100" y="250" width="100" height="20" rx="4" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1" />
        <text x="150" y="264" textAnchor="middle" fill="#4ade80" fontSize="8">Producers</text>
        {/* Consumers */}
        <rect x="400" y="250" width="100" height="20" rx="4" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
        <text x="450" y="264" textAnchor="middle" fill="#f87171" fontSize="8">Consumers</text>
      </svg>
      <div className="p-3 rounded-lg" style={{ borderColor: `${c.color}30`, backgroundColor: `${c.color}08` }}>
        <p className="text-xs font-bold font-mono" style={{ color: c.color }}>{c.equation}</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {c.steps.map((s, i) => (
            <p key={i} className="text-[10px] text-muted-foreground">• {s}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdaptationView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="700">ECOLOGICAL ADAPTATION</text>
        {/* Hydrophyte */}
        <rect x="20" y="40" width="180" height="240" rx="12" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">HYDROPHYTES</text>
        <text x="110" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">(Water plants)</text>
        {[
          "Thin cuticle (no water loss concern)",
          "Large air spaces (aerenchyma) for buoyancy",
          "Reduced/rootless or poorly developed root system",
          "Flexible stems (move with water currents)",
          "Stomata on upper epidermis only",
          "Examples: Water hyacinth, Pistia, Lotus",
        ].map((f, i) => (
          <text key={i} x="35" y={100 + i * 26} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Xerophyte */}
        <rect x="210" y="40" width="180" height="240" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">XEROPHYTES</text>
        <text x="300" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">(Dry plants)</text>
        {[
          "Thick cuticle to reduce transpiration",
          "Sunken stomata (in pits)",
          "Reduced leaves (spines) or no leaves",
          "Deep/extensive root system",
          "Succulent stems (water storage)",
          "Examples: Cactus, Opuntia, Kikar",
        ].map((f, i) => (
          <text key={i} x="225" y={100 + i * 26} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Comparison */}
        <rect x="400" y="40" width="180" height="240" rx="12" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">COMPARISON</text>
        {[
          { prop: "Cuticle", hydro: "Thin/absent", xero: "Thick/waxy" },
          { prop: "Stomata", hydro: "Many, upper surface", xero: "Few, sunken" },
          { prop: "Roots", hydro: "Poor/absent", xero: "Deep/extensive" },
          { prop: "Leaves", hydro: "Broad, thin", xero: "Spines/small" },
          { prop: "Water storage", hydro: "Aerenchyma", xero: "Succulent tissue" },
        ].map((r, i) => (
          <g key={i}>
            <text x="415" y={90 + i * 35} fill="#94a3b8" fontSize="8">{r.prop}</text>
            <text x="460" y={90 + i * 35} fill="#67e8f9" fontSize="8">{r.hydro}</text>
            <text x="555" y={90 + i * 35} textAnchor="end" fill="#fbbf24" fontSize="8">{r.xero}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Greenhouse Effect", rows: ["CO₂, CH₄, N₂O trap infrared radiation", "Global temperature rise → climate change", "Melting ice caps, sea level rise", "Nepal: glacial lake outburst floods (GLOFs)"] },
          { name: "Ozone Depletion", rows: ["CFCs break down O₃ → O₂ in stratosphere", "More UV-B reaches Earth → skin cancer, cataracts", "Montreal Protocol (1987) phased out CFCs", "Ozone hole over Antarctica"] },
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

function PollutionView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 260" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">ENVIRONMENTAL POLLUTION</text>
        {/* Air pollution */}
        <rect x="20" y="40" width="180" height="200" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">AIR POLLUTION</text>
        {[
          "Sources: vehicles, factories, burning",
          "Pollutants: SO₂, NOₓ, CO, PM₂.₅",
          "Acid rain: SO₂ + NOₓ + rainwater",
          "Effects: respiratory diseases, crop damage",
          "Control: catalytic converters, scrubbers",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 24} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Water pollution */}
        <rect x="210" y="40" width="180" height="200" rx="12" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700">WATER POLLUTION</text>
        {[
          "Sources: industrial waste, sewage, agrochemicals",
          "Pollutants: heavy metals, pathogens, nitrates",
          "Eutrophication: nutrient overload → algal bloom",
          "Effects: waterborne diseases, dead zones",
          "Control: treatment plants, reducing runoff",
        ].map((f, i) => (
          <text key={i} x="225" y={85 + i * 24} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Soil pollution */}
        <rect x="400" y="40" width="180" height="200" rx="12" fill="rgba(180,130,60,0.08)" stroke="#b4843c" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#d4a84b" fontSize="11" fontWeight="700">SOIL POLLUTION</text>
        {[
          "Sources: pesticides, fertilizers, plastics",
          "Pollutants: DDT, heavy metals, radioactive",
          "Bioaccumulation & biomagnification",
          "Effects: soil infertility, food contamination",
          "Control: organic farming, bioremediation",
        ].map((f, i) => (
          <text key={i} x="415" y={85 + i * 24} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Pesticide Effects", rows: ["DDT biomagnification: 0.0003 → 25 ppm in food chain", "Thins eggshells (raptors), causes reproductive failure", "Banned in many countries but still used in Nepal", "Integrated pest management (IPM) as alternative"] },
          { name: "Nepal Context", rows: ["Kathmandu: severe air pollution (PM₂.₅ > WHO limit)", "Bagmati River: highly polluted by sewage & industry", "Terai: pesticide contamination from intensive farming", "Climate change: glacial retreat, altered monsoon patterns"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
            <p className="text-xs font-bold text-red-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiologyEcology3D() {
  const [tab, setTab] = useState<Tab>("ecosystem");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><active.icon className="h-5 w-5 text-green-600" /></div>
        <div><h2 className="font-semibold text-base">Ecology & Ecosystem 3D</h2><p className="text-xs text-muted-foreground">NEB XI Unit 4 — Ecosystems, food webs, biogeochemical cycles, adaptations, pollution</p></div>
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
      <div className="min-h-[300px] rounded-xl border border-border bg-card overflow-auto">
        {tab === "ecosystem" && <EcosystemView />}
        {tab === "foodweb" && <FoodWebView />}
        {tab === "cycles" && <CyclesView />}
        {tab === "adaptation" && <AdaptationView />}
        {tab === "pollution" && <PollutionView />}
      </div>
    </div>
  );
}
