"use client";

import { useState } from "react";
import { Leaf, TreeDeciduous, Flower2, Bug } from "lucide-react";

type Tab = "five-kingdom" | "fungi" | "algae" | "bryophytes" | "pteridophytes" | "gymnosperms" | "angiosperms";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "five-kingdom", label: "Five Kingdom", icon: Leaf, color: "#22c55e" },
  { id: "fungi", label: "Fungi", icon: Bug, color: "#f59e0b" },
  { id: "algae", label: "Algae", icon: Bug, color: "#06b6d4" },
  { id: "bryophytes", label: "Bryophytes", icon: Leaf, color: "#84cc16" },
  { id: "pteridophytes", label: "Pteridophytes", icon: TreeDeciduous, color: "#14b8a6" },
  { id: "gymnosperms", label: "Gymnosperms", icon: TreeDeciduous, color: "#a3e635" },
  { id: "angiosperms", label: "Angiosperms", icon: Flower2, color: "#f472b6" },
];

function FiveKingdomView() {
  const kingdoms = [
    { name: "Monera", example: "Bacteria, Cyanobacteria", features: "Prokaryotic, unicellular, no organelles", color: "#ef4444" },
    { name: "Protista", example: "Amoeba, Paramecium, Euglena", features: "Eukaryotic, mostly unicellular, diverse", color: "#f97316" },
    { name: "Fungi", example: "Mucor, Yeast, Mushrooms, Lichen", features: "Eukaryotic, heterotrophic, chitin cell wall", color: "#f59e0b" },
    { name: "Plantae", example: "Bryophytes, Pteridophytes, Gymnosperms, Angiosperms", features: "Eukaryotic, autotrophic, cellulose cell wall", color: "#22c55e" },
    { name: "Animalia", example: "Sponges, Insects, Fish, Mammals", features: "Eukaryotic, heterotrophic, no cell wall", color: "#3b82f6" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 200" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="700">FIVE KINGDOM CLASSIFICATION — WHITTAKER (1969)</text>
        <text x="300" y="42" textAnchor="middle" fill="#94a3b8" fontSize="8">Based on: cell structure, body organisation, nutrition, reproduction, phylogenetic relationships</text>
        {kingdoms.map((k, i) => (
          <g key={k.name}>
            <rect x={30 + i * 110} y="60" width="95" height="120" rx="8" fill={`${k.color}15`} stroke={k.color} strokeWidth="1.5" />
            <text x={77 + i * 110} y="80" textAnchor="middle" fill={k.color} fontSize="10" fontWeight="700">{k.name}</text>
            <text x={77 + i * 110} y="95" textAnchor="middle" fill="#e2e8f0" fontSize="7">Ex: {k.example}</text>
            <text x={77 + i * 110} y="115" textAnchor="middle" fill="#94a3b8" fontSize="6">{k.features.split("·")[0]}</text>
            <text x={77 + i * 110} y="127" textAnchor="middle" fill="#94a3b8" fontSize="6">{k.features.split("·")[1] ?? ""}</text>
            <text x={77 + i * 110} y="160" textAnchor="middle" fill="#64748b" fontSize="6">
              {i === 0 ? "Prokaryote" : "Eukaryote"}
            </text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-5 gap-2">
        {kingdoms.map((k) => (
          <div key={k.name} className="p-2 rounded-lg text-center" style={{ borderColor: `${k.color}30`, backgroundColor: `${k.color}08` }}>
            <p className="text-xs font-bold" style={{ color: k.color }}>{k.name}</p>
            <p className="text-[9px] text-muted-foreground mt-1">{k.features}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FungiView() {
  const classes = [
    { name: "Phycomycetes", example: "Mucor, Albugo", features: "Aseptate coenocytic mycelium, asexual zoospores, sexual oospores", color: "#ef4444" },
    { name: "Ascomycetes", example: "Saccharomyces (yeast), Aspergillus, Penicillium", features: "Septate mycelium, ascospores in asci, conidia asexual", color: "#f97316" },
    { name: "Basidiomycetes", example: "Agaricus (mushroom), Puccinia (rust), Ustilago (smut)", features: "Septate mycelium, basidiospores on basidia, complex fruiting body", color: "#f59e0b" },
    { name: "Deuteromycetes", example: "Alternaria, Colletotrichum", features: "Imperfect fungi — no sexual stage known, conidia only", color: "#84cc16" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="700">FUNGI — FIVE KINGDOM</text>
        {/* General features */}
        <rect x="20" y="40" width="260" height="220" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="150" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">GENERAL FEATURES</text>
        {[
          "Heterotrophic (absorbent nutrition)",
          "Cell wall made of chitin (not cellulose)",
          "Body = filamentous mycelium",
          "Mycelium = mass of hyphae",
          "Store food as glycogen & oil",
          "Reproduce by spores (sexual & asexual)",
          " Saprophytic / parasitic / symbiotic",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 20} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Mucor diagram */}
        <rect x="290" y="40" width="290" height="120" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="435" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">MUCOR — PHYCOMYCETES</text>
        {/* Sporangiophore */}
        <line x1="435" y1="160" x2="435" y2="90" stroke="#ef4444" strokeWidth="2" />
        <circle cx="435" cy="85" r="15" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1.5" />
        <text x="435" y="88" textAnchor="middle" fill="#f87171" fontSize="7">Sporangium</text>
        {/* Rhizoids */}
        <path d="M 420 160 L 415 180 M 435 160 L 435 180 M 450 160 L 455 180" stroke="#ef4444" strokeWidth="1.5" />
        <text x="435" y="195" textAnchor="middle" fill="#94a3b8" fontSize="8">Rhizoids (holdfast)</text>
        <text x="435" y="210" textAnchor="middle" fill="#94a3b8" fontSize="8">Stolon (horizontal hyphae)</text>
        <LabelTag x={380} y={120} symbol="Zygosporangium" name=" Sexual structure" desc="Thick-walled resting spore" color="#ef4444" />
        {/* Yeast diagram */}
        <rect x="290" y="170" width="290" height="90" rx="12" fill="rgba(249,115,22,0.08)" stroke="#f97316" strokeWidth="1" />
        <text x="435" y="192" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="700">YEAST — ASCOMYCETES</text>
        <circle cx="380" cy="240" r="15" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1.5" />
        <circle cx="410" cy="230" r="10" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1" />
        <circle cx="445" cy="245" r="12" fill="rgba(249,115,22,0.2)" stroke="#f97316" strokeWidth="1.5" />
        <text x="435" y="275" textAnchor="middle" fill="#94a3b8" fontSize="8">Unicellular · Budding (asexual) · Fermentation</text>
      </svg>
      <div className="grid grid-cols-4 gap-2">
        {classes.map((c) => (
          <div key={c.name} className="p-2.5 rounded-lg" style={{ borderColor: `${c.color}30`, backgroundColor: `${c.color}08` }}>
            <p className="text-xs font-bold" style={{ color: c.color }}>{c.name}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{c.example}</p>
            <p className="text-[9px] text-muted-foreground mt-1">{c.features}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlgaeView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="700">ALGAE — THREE GROUPS</text>
        {/* Green algae */}
        <rect x="20" y="40" width="180" height="270" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">GREEN ALGAE</text>
        <text x="110" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">(Chlorophyta)</text>
        {/* Spirogyra */}
        <path d="M 40 120 Q 70 100 100 120 Q 130 140 160 120" fill="none" stroke="#22c55e" strokeWidth="2" />
        <path d="M 40 150 Q 70 130 100 150 Q 130 170 160 150" fill="none" stroke="#22c55e" strokeWidth="2" />
        <path d="M 40 180 Q 70 160 100 180 Q 130 200 160 180" fill="none" stroke="#22c55e" strokeWidth="2" />
        <text x="110" y="210" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">Spirogyra</text>
        <text x="110" y="225" textAnchor="middle" fill="#94a3b8" fontSize="7">Spiral chloroplast</text>
        <text x="110" y="240" textAnchor="middle" fill="#94a3b8" fontSize="7">Filamentous · Freshwater</text>
        <text x="110" y="260" textAnchor="middle" fill="#fbbf24" fontSize="8">Conjugation (sexual repro.)</text>
        <text x="110" y="285" textAnchor="middle" fill="#94a3b8" fontSize="7">Pigments: Chl a + b</text>
        <text x="110" y="300" textAnchor="middle" fill="#94a3b8" fontSize="7">Food reserve: starch</text>
        {/* Brown algae */}
        <rect x="210" y="40" width="180" height="270" rx="12" fill="rgba(180,130,60,0.08)" stroke="#b4843c" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#d4a84b" fontSize="11" fontWeight="700">BROWN ALGAE</text>
        <text x="300" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">(Phaeophyta)</text>
        <path d="M 240 130 Q 270 110 300 130 Q 330 150 360 130" fill="none" stroke="#b4843c" strokeWidth="2" />
        <path d="M 240 160 Q 270 140 300 160 Q 330 180 360 160" fill="none" stroke="#b4843c" strokeWidth="2" />
        <text x="300" y="210" textAnchor="middle" fill="#d4a84b" fontSize="9" fontWeight="600">Dictyota / Laminaria</text>
        <text x="300" y="230" textAnchor="middle" fill="#94a3b8" fontSize="7">Marine · Large (kelp)</text>
        <text x="300" y="250" textAnchor="middle" fill="#94a3b8" fontSize="7">Pigments: Chl a + c</text>
        <text x="300" y="265" textAnchor="middle" fill="#94a3b8" fontSize="7">Fucoxanthin (brown)</text>
        <text x="300" y="285" textAnchor="middle" fill="#fbbf24" fontSize="8">Food: laminarin & mannitol</text>
        <text x="300" y="305" textAnchor="middle" fill="#94a3b8" fontSize="7">Agar & algin commercially</text>
        {/* Red algae */}
        <rect x="400" y="40" width="180" height="270" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">RED ALGAE</text>
        <text x="490" y="78" textAnchor="middle" fill="#94a3b8" fontSize="8">(Rhodophyta)</text>
        <text x="490" y="130" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="600">Gracilaria / Polysiphonia</text>
        <text x="490" y="160" textAnchor="middle" fill="#94a3b8" fontSize="7">Marine · Deep water</text>
        <text x="490" y="180" textAnchor="middle" fill="#94a3b8" fontSize="7">Pigments: Chl a + d</text>
        <text x="490" y="195" textAnchor="middle" fill="#94a3b8" fontSize="7">Phycoerythrin (red)</text>
        <text x="490" y="215" textAnchor="middle" fill="#fbbf24" fontSize="8">Food: floridian starch</text>
        <text x="490" y="235" textAnchor="middle" fill="#94a3b8" fontSize="7">Coral reef builders</text>
        <text x="490" y="255" textAnchor="middle" fill="#94a3b8" fontSize="7">Agar from Gelidium</text>
        <text x="490" y="285" textAnchor="middle" fill="#94a3b8" fontSize="7">Live at greater depths</text>
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Economic Importance", rows: ["Food: Nori (red), Kombu (brown)", "Agar from Gelidium & Gracilaria", "Algin from brown algae (thickener)", "Irish moss (Chondrus) — carrageenan"] },
          { name: "Spirogyra Conjugation", rows: ["Scalariform: ladder-like connection", "Lateral: side-by-side fusion", "Gametes fuse → zygote (dormant)", "Zygote germinates → new filament"] },
          { name: "Classification Basis", rows: ["Mainly pigment composition", "Food reserve stored", "Flagella (if present): number & position", "Thallus organisation"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <p className="text-xs font-bold text-cyan-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BryophytesView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#84cc16" fontSize="12" fontWeight="700">BRYOPHYTES — AMPHIBIANS OF PLANT KINGDOM</text>
        {/* General features */}
        <rect x="20" y="40" width="280" height="250" rx="12" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">GENERAL FEATURES</text>
        {[
          "Non-vascular plants (no xylem/phloem)",
          "Thalloid or leafy body (gametophyte dominant)",
          "Require water for fertilisation",
          "Alternation of generations: gametophyte → sporophyte",
          "Rhizoids for attachment (not true roots)",
          "Found in moist, shady places",
          "Two groups: Liverworts & Mosses",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 22} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Marchantia */}
        <rect x="310" y="40" width="270" height="250" rx="12" fill="rgba(132,204,22,0.05)" stroke="#84cc16" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">MARCHANTIA — LIVERWORT</text>
        {/* Thallus */}
        <path d="M 350 160 Q 400 120 445 140 Q 490 120 540 160 Q 520 200 445 190 Q 370 200 350 160" fill="rgba(132,204,22,0.2)" stroke="#84cc16" strokeWidth="2" />
        <text x="445" y="165" textAnchor="middle" fill="#a3e635" fontSize="9" fontWeight="600">Dorsiventral thallus</text>
        {/* Gemma cups */}
        <circle cx="400" cy="140" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="490" cy="140" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="400" y="135" textAnchor="middle" fill="#fbbf24" fontSize="6">Gemma</text>
        <text x="490" y="135" textAnchor="middle" fill="#fbbf24" fontSize="6">cup</text>
        <text x="445" y="220" textAnchor="middle" fill="#94a3b8" fontSize="8">Rhizoids on ventral surface</text>
        <text x="445" y="235" textAnchor="middle" fill="#94a3b8" fontSize="8">Scales on ventral surface</text>
        {/* Reproduction */}
        <text x="445" y="265" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Reproduction</text>
        <text x="445" y="280" textAnchor="middle" fill="#94a3b8" fontSize="8">Asexual: gemma cups (gemmae)</text>
        <text x="445" y="295" textAnchor="middle" fill="#94a3b8" fontSize="8">Sexual: antheridia (♂) & archegonia (♀)</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Liverworts vs Mosses", rows: ["Liverworts: thalloid body, simple sporophyte, gemma cups", "Mosses: leafy shoot, complex sporophyte, capsule with peristome teeth", "Both: gametophyte dominant, require water for fertilisation"] },
          { name: "Economic Importance", rows: ["Peat moss (Sphagnum): fuel, soil conditioner, water retention", "Ecological: pioneer species, prevent erosion", "Medicinal: some mosses used traditionally", "Indicator of pollution (sensitive to air quality)"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-lime-500/5 border border-lime-500/20">
            <p className="text-xs font-bold text-lime-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PteridophytesView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#14b8a6" fontSize="12" fontWeight="700">PTERIDOPHYTES — DRYOPTERIS (FERNS)</text>
        {/* General features */}
        <rect x="20" y="40" width="280" height="240" rx="12" fill="rgba(20,184,166,0.08)" stroke="#14b8a6" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="700">GENERAL FEATURES</text>
        {[
          "Vascular plants (have xylem & phloem)",
          "True roots, stems (rhizome), leaves (fronds)",
          "Sporophyte dominant generation",
          "Reproduce by spores (not seeds)",
          "Spores produced in sporangia (sori)",
          " alternation of generations",
          "Seedless vascular plants",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 22} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Dryopteris structure */}
        <rect x="310" y="40" width="270" height="240" rx="12" fill="rgba(20,184,166,0.05)" stroke="#14b8a6" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontWeight="700">DRYOPTERIS STRUCTURE</text>
        {/* Rhizome */}
        <path d="M 350 180 Q 400 170 445 180 Q 490 170 540 180" fill="none" stroke="#14b8a6" strokeWidth="3" />
        <text x="445" y="200" textAnchor="middle" fill="#2dd4bf" fontSize="8" fontWeight="600">Rhizome (underground stem)</text>
        {/* Roots */}
        {[380, 445, 510].map((x) => (
          <line key={x} x1={x} y1="180" x2={x} y2="220" stroke="#14b8a6" strokeWidth="1.5" />
        ))}
        <text x="445" y="235" textAnchor="middle" fill="#94a3b8" fontSize="8">Adventitious roots</text>
        {/* Fronds */}
        <path d="M 380 180 Q 370 130 350 100" fill="none" stroke="#10b981" strokeWidth="2" />
        <path d="M 445 180 Q 445 120 445 80" fill="none" stroke="#10b981" strokeWidth="2" />
        <path d="M 510 180 Q 520 130 540 100" fill="none" stroke="#10b981" strokeWidth="2" />
        {/* Leaflets */}
        {[350, 370, 390, 420, 445, 470, 500, 520, 540].map((x, i) => (
          <line key={i} x1={x} y1={100 + i * 3} x2={x + (i % 2 === 0 ? 20 : -20)} y2={90 + i * 3} stroke="#10b981" strokeWidth="1" />
        ))}
        <text x="445" y="70" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="600">Frond (leaf)</text>
        {/* Sori on underside */}
        <circle cx="400" cy="155" r="4" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" strokeWidth="1" />
        <circle cx="445" cy="140" r="4" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" strokeWidth="1" />
        <circle cx="490" cy="155" r="4" fill="rgba(245,158,11,0.5)" stroke="#f59e0b" strokeWidth="1" />
        <text x="445" y="175" textAnchor="middle" fill="#fbbf24" fontSize="8">Sori (sporangia clusters)</text>
        <text x="445" y="275" textAnchor="middle" fill="#94a3b8" fontSize="8">Spore → Prothallus (gametophyte) → Archegonia + Antheridia</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Dryopteris Life Cycle", rows: ["Sporophyte (2n) produces spores in sori", "Spores germinate → prothallus (gametophyte, n)", "Prothallus has antheridia (♂) & archegonia (♀)", "Sperm swims to egg → zygote → new sporophyte"] },
          { name: "Economic Importance", rows: ["Ornamental: many ferns in gardens", "Medicinal: rhizomes used traditionally", "Ecological: forest floor vegetation", "Some are edible (fiddleheads)", "indicator of humid environments"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-teal-500/5 border border-teal-500/20">
            <p className="text-xs font-bold text-teal-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GymnospermsView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#a3e635" fontSize="12" fontWeight="700">GYMNOSPERMS — PINUS (NAKED SEEDS)</text>
        {/* General features */}
        <rect x="20" y="40" width="280" height="260" rx="12" fill="rgba(163,230,53,0.08)" stroke="#a3e635" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#bef264" fontSize="11" fontWeight="700">GENERAL FEATURES</text>
        {[
          "Seed-bearing plants (naked seeds — no fruit)",
          "Trees & shrubs — woody perennials",
          "Leaves: needle-like (reduced surface area)",
          "Wind-pollinated (anemophily)",
          "Ovules borne on cone scales (strobilus)",
          "Alternation of generations",
          "Seed = embryo + food + seed coat",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 24} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        {/* Pinus cone */}
        <rect x="310" y="40" width="270" height="160" rx="12" fill="rgba(163,230,53,0.05)" stroke="#a3e635" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#bef264" fontSize="11" fontWeight="700">PINUS — CONE STRUCTURE</text>
        {/* Cone scales */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx="445" cy={90 + i * 22} rx={40 - i * 3} ry="10" fill="rgba(163,230,53,0.15)" stroke="#a3e635" strokeWidth="1" />
        ))}
        <text x="445" y="210" textAnchor="middle" fill="#94a3b8" fontSize="8">Microsporophyll (male scale) → pollen sac</text>
        <text x="445" y="225" textAnchor="middle" fill="#94a3b8" fontSize="8">Megasporophyll (female scale) → ovule</text>
        {/* Reproduction cycle */}
        <rect x="310" y="210" width="270" height="90" rx="12" fill="rgba(163,230,53,0.05)" stroke="#a3e635" strokeWidth="1" />
        <text x="445" y="232" textAnchor="middle" fill="#bef264" fontSize="10" fontWeight="600">REPRODUCTIVE CYCLE</text>
        <text x="330" y="252" fill="#94a3b8" fontSize="8">1. Pollen grains (male gametophyte)</text>
        <text x="330" y="268" fill="#94a3b8" fontSize="8">2. Pollen tube grows → archegonium</text>
        <text x="330" y="284" fill="#94a3b8" fontSize="8">3. Sperm fuses with egg → zygote</text>
        <text x="330" y="300" fill="#fbbf24" fontSize="8">4. Seed develops (embryo + endosperm)</text>
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Examples", rows: ["Pinus (pine) — most common", "Cycas (seed palm)", "Ginkgo biloba — living fossil", "Welwitschia — desert plant"] },
          { name: "Economic Importance", rows: ["Timber & plywood production", "Resin → turpentine, rosin", "Pine nuts (edible seeds)", "Ornamental trees", "Paper & pulp industry"] },
          { name: "Why \"Naked Seeds\"?", rows: ["Ovules not enclosed in ovary", "Seeds borne on cone scales", "No fruit develops", "Contrast with angiosperms (covered seeds)"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-lime-500/5 border border-lime-500/20">
            <p className="text-xs font-bold text-lime-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AngiospermsView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="700">ANGIOSPERMS — FLOWERING PLANTS</text>
        {/* Flower parts */}
        <rect x="20" y="40" width="300" height="240" rx="12" fill="rgba(244,114,182,0.08)" stroke="#f472b6" strokeWidth="1" />
        <text x="170" y="62" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="700">FLOWER STRUCTURE</text>
        {/* Cross-section of flower */}
        <ellipse cx="170" cy="160" rx="80" ry="60" fill="none" stroke="#f472b6" strokeWidth="1" opacity="0.3" />
        {/* Sepals */}
        {[0, 1, 2, 3, 4].map((i) => {
          const rad = (i * 72 - 90) * Math.PI / 180;
          return <ellipse key={i} cx={170 + 65 * Math.cos(rad)} cy={160 + 50 * Math.sin(rad)} rx="12" ry="20" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1" transform={`rotate(${i * 72}, ${170 + 65 * Math.cos(rad)}, ${160 + 50 * Math.sin(rad)})`} />;
        })}
        {/* Petals */}
        {[0, 1, 2, 3, 4].map((i) => {
          const rad = (i * 72 - 54) * Math.PI / 180;
          return <ellipse key={i} cx={170 + 50 * Math.cos(rad)} cy={160 + 38 * Math.sin(rad)} rx="10" ry="16" fill="rgba(244,114,182,0.2)" stroke="#f472b6" strokeWidth="1" transform={`rotate(${i * 72}, ${170 + 50 * Math.cos(rad)}, ${160 + 36 * Math.sin(rad)})`} />;
        })}
        {/* Stamen (male) */}
        <line x1="170" y1="130" x2="170" y2="100" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="170" cy="96" r="6" fill="rgba(251,191,36,0.4)" stroke="#fbbf24" strokeWidth="1" />
        <text x="190" y="95" fill="#fbbf24" fontSize="8" fontWeight="600">Stamen</text>
        <text x="190" y="107" fill="#94a3b8" fontSize="7">(Anther + Filament)</text>
        {/* Pistil (female) */}
        <ellipse cx="170" cy="165" rx="12" ry="18" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="170" y1="147" x2="170" y2="120" stroke="#ef4444" strokeWidth="1.5" />
        <ellipse cx="170" cy="118" r="5" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="150" y="170" textAnchor="end" fill="#f87171" fontSize="8" fontWeight="600">Pistil/Carpel</text>
        <text x="150" y="182" textAnchor="end" fill="#94a3b8" fontSize="7">(Stigma + Style + Ovary)</text>
        {/* Labels */}
        <LabelTag x={170} y={200} symbol="Ovary" name="Contains ovules" desc="Develops into fruit" color="#ef4444" />
        <LabelTag x={170} y={215} symbol="Sepals" name="Calyx" desc="Protects bud" color="#22c55e" />
        <LabelTag x={170} y={230} symbol="Petals" name="Corolla" desc="Attracts pollinators" color="#f472b6" />
        <LabelTag x={170} y={245} symbol="Androecium" name="Male part" desc="Produces pollen" color="#fbbf24" />

        {/* Four families */}
        <rect x="330" y="40" width="250" height="240" rx="12" fill="rgba(244,114,182,0.05)" stroke="#f472b6" strokeWidth="1" />
        <text x="455" y="62" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="700">FOUR FAMILIES</text>
        {[
          { name: "Brassicaceae", key: "4 sepals, 4 petals, 6 stamens", examples: "Mustard, Cabbage, Radish", color: "#fbbf24" },
          { name: "Fabaceae", key: "Papilionaceous corolla, 10 stamens", examples: "Pea, Bean, Sesbania", color: "#22c55e" },
          { name: "Solanaceae", key: "5 fused petals, 5 stamens, superior ovary", examples: "Potato, Tomato, Tobacco", color: "#ef4444" },
          { name: "Liliaceae", key: "6 tepals, 6 stamens, superior ovary", examples: "Lily, Onion, Aloe, Wheat", color: "#8b5cf6" },
        ].map((f, i) => (
          <g key={f.name}>
            <rect x="340" y={80 + i * 48} width="230" height="42" rx="6" fill={`${f.color}10`} stroke={f.color} strokeWidth="0.5" />
            <text x="350" y={97 + i * 48} fill={f.color} fontSize="9" fontWeight="600">{f.name}</text>
            <text x="350" y={110 + i * 48} fill="#94a3b8" fontSize="7">{f.key}</text>
            <text x="560" y={105 + i * 48} textAnchor="end" fill="#64748b" fontSize="7">{f.examples}</text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Flower Parts & Function", rows: ["Calyx (sepals) — protection", "Corolla (petals) — attraction", "Androecium (stamens) — male, pollen", "Gynoecium (carpels) — female, ovary"] },
          { name: "Fruit & Seed Development", rows: ["Ovary → Fruit (protects seeds)", "Ovule → Seed (embryo + food)", "Seed coat from integuments", "Endosperm stores food for germination"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-pink-500/5 border border-pink-500/20">
            <p className="text-xs font-bold text-pink-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LabelTag({ x, y, symbol, name, desc, color }: { x: number; y: number; symbol: string; name: string; desc: string; color: string }) {
  return (
    <g>
      <rect x={x - 50} y={y - 10} width="100" height="20" rx="4" fill="rgba(15,23,42,0.9)" stroke={color} strokeWidth="0.5" />
      <text x={x} y={y - 1} textAnchor="middle" fill={color} fontSize="8" fontWeight="700" fontFamily="Georgia" fontStyle="italic">{symbol}</text>
      <text x={x} y={y + 8} textAnchor="middle" fill="#e2e8f0" fontSize="6">{name}</text>
    </g>
  );
}

export function BiologyFloralDiversity3D() {
  const [tab, setTab] = useState<Tab>("five-kingdom");
  const active = TABS.find((t) => t.id === tab)!;
  const I = active.icon;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><I className="h-5 w-5" style={{ color: active.color }} /></div>
        <div><h2 className="font-semibold text-base">Floral Diversity 3D</h2><p className="text-xs text-muted-foreground">NEB XI Unit 2 — Five kingdom, Fungi, Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms</p></div>
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
        {tab === "five-kingdom" && <FiveKingdomView />}
        {tab === "fungi" && <FungiView />}
        {tab === "algae" && <AlgaeView />}
        {tab === "bryophytes" && <BryophytesView />}
        {tab === "pteridophytes" && <PteridophytesView />}
        {tab === "gymnosperms" && <GymnospermsView />}
        {tab === "angiosperms" && <AngiospermsView />}
      </div>
    </div>
  );
}
