"use client";

import { useState } from "react";
import { Wind, Shield, Activity } from "lucide-react";

type Tab = "adaptation" | "behavior" | "conservation";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "adaptation", label: "Adaptations", icon: Wind, color: "#06b6d4" },
  { id: "behavior", label: "Behavior", icon: Activity, color: "#8b5cf6" },
  { id: "conservation", label: "Conservation", icon: Shield, color: "#22c55e" },
];

function AdaptationsView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 300" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#06b6d4" fontSize="12" fontWeight="700">ANIMAL ADAPTATIONS</text>
        {/* Aquatic */}
        <rect x="20" y="40" width="180" height="240" rx="12" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="700">AQUATIC</text>
        <text x="110" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">(Primary & Secondary)</text>
        {[
          "Streamlined body (reduces drag)",
          "Fins, flippers, webbed feet",
          "Gills for underwater respiration",
          "Lateral line system (sensory)",
          "Swim bladder (buoyancy control)",
          "Countershading (camouflage)",
          "Examples: Fish, Dolphins, Whales",
        ].map((f, i) => (
          <text key={i} x="35" y={100 + i * 22} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}

        {/* Terrestrial */}
        <rect x="210" y="40" width="180" height="240" rx="12" fill="rgba(132,204,22,0.08)" stroke="#84cc16" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">TERRESTRIAL</text>
        <text x="300" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">(Cursorial, Fossorial, Arboreal)</text>
        {[
          "Strong limbs for locomotion",
          "Lungs for air breathing",
          "Waterproof skin (scales, fur)",
          "Kidneys conserve water",
          "Cursorial: long legs (cheetah, deer)",
          "Fossorial: digging claws (mole, earthworm)",
          "Arboreal: grasping hands/tail (monkey)",
        ].map((f, i) => (
          <text key={i} x="225" y={100 + i * 22} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}

        {/* Volant */}
        <rect x="400" y="40" width="180" height="240" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">VOLANT</text>
        <text x="490" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">(Flying adaptation)</text>
        {[
          "Wings (feathers in birds, skin in bats)",
          "Lightweight skeleton (pneumatic bones)",
          "Keel on sternum (flight muscle anchor)",
          "Efficient respiratory system (air sacs)",
          "High metabolic rate",
          "Streamlined body",
          "Examples: Birds, Bats, Insects",
        ].map((f, i) => (
          <text key={i} x="415" y={100 + i * 22} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Migration", rows: ["Fish: salmon return to birth river to spawn", "Birds: seasonal movement between breeding & wintering grounds", "Butterflies: monarch migrates 3000+ miles", "Triggered by: photoperiod, temperature, food availability"] },
          { name: "Hibernate vs Estivate", rows: ["Hibernation: winter dormancy (bear, ground squirrel)", "Estivation: summer dormancy (snail, lungfish)", "Both: reduced metabolism, body temp drops", "Energy conservation during harsh conditions"] },
          { name: "Camouflage", rows: ["Cryptic coloration: blends with environment", "Mimicry: looks like another species (Batesian, Müllerian)", "Disruptive coloration: breaks up body outline", "Examples: chameleon, stick insect, flounder"] },
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

function BehaviorView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 280" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="700">ANIMAL BEHAVIOR</text>
        {/* Reflex action */}
        <rect x="20" y="40" width="180" height="220" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">REFLEX ACTION</text>
        <text x="110" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">Involuntary, rapid response to stimulus</text>
        {/* Arc diagram */}
        <text x="110" y="120" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="600">Reflex Arc:</text>
        {[
          "Receptor → Sensory neuron",
          "Interneuron (spinal cord)",
          "Motor neuron → Effector",
          "Response (muscle/ gland)",
        ].map((f, i) => (
          <text key={i} x="35" y={140 + i * 22} fill="#e2e8f0" fontSize="9">• {f}</text>
        ))}
        <text x="110" y="240" textAnchor="middle" fill="#f87171" fontSize="8">Example: knee-jerk, withdrawal from heat</text>

        {/* Taxes */}
        <rect x="210" y="40" width="180" height="220" rx="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">TAXES</text>
        <text x="300" y="85" textAnchor="middle" fill="#94a3b8" fontSize="8">Directional movement toward/away from stimulus</text>
        {[
          { name: "Positive", desc: "toward stimulus", ex: "Phototaxis → moth to light" },
          { name: "Negative", desc: "away from stimulus", ex: "Chemotaxis → bacteria away from toxin" },
          { name: "Klinotaxis", desc: "comparison-based", ex: "Sniffing with head movement" },
          { name: "Trophotaxis", desc: "food-related", ex: " Amoeba toward food" },
        ].map((t, i) => (
          <g key={i}>
            <rect x="225" y={100 + i * 38} width="150" height="30" rx="4" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="0.5" />
            <text x="235" y={112 + i * 38} fill="#fbbf24" fontSize="8" fontWeight="600">{t.name}</text>
            <text x="235" y="124 + i * 38" fill="#94a3b8" fontSize="7">{t.desc}</text>
            <text x="365" y="118 + i * 38" textAnchor="end" fill="#fb923c" fontSize="7">{t.ex}</text>
          </g>
        ))}

        {/* Social behavior */}
        <rect x="400" y="40" width="180" height="220" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">SOCIAL BEHAVIOR</text>
        {[
          { term: "Dominance", desc: "Hierarchical ranking (pecking order)", ex: "Chickens, wolf packs" },
          { term: "Leadership", desc: "Guided group movement", ex: "Bear leading cubs, elephant matriarch" },
          { term: "Cooperation", desc: "Working together for survival", ex: "Bees, ants, wolves hunting" },
          { term: "Territoriality", desc: "Defending a specific area", ex: "Lions, birds marking territory" },
          { term: "Courtship", desc: "Mating rituals & displays", ex: "Bird songs, peacock tail display" },
        ].map((s, i) => (
          <g key={i}>
            <rect x="415" y={80 + i * 30} width="150" height="24" rx="3" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="0.5" />
            <text x="425" y={90 + i * 30} fill="#4ade80" fontSize="8" fontWeight="600">{s.term}</text>
            <text x="425" y="102 + i * 30" fill="#94a3b8" fontSize="7">{s.desc}</text>
            <text x="555" y="95 + i * 30" textAnchor="end" fill="#fbbf24" fontSize="7">{s.ex}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ConservationView() {
  const parks = [
    { name: "Chitwan National Park", type: "National Park", year: 1973, fauna: "Royal Bengal tiger, one-horned rhino, gharial", color: "#22c55e" },
    { name: "Sagarmatha National Park", type: "National Park", year: 1976, fauna: "Snow leopard, red panda, Himalayan tahr", color: "#22c55e" },
    { name: "Koshi Tappu Wildlife Reserve", type: "Wildlife Reserve", year: 1976, fauna: "Bar-headed goose, wild buffalo, Hog deer", color: "#06b6d4" },
    { name: " Bardia National Park", type: "National Park", year: 1988, fauna: "Tiger, rhino, elephant, gharial", color: "#22c55e" },
    { name: "Shuklaphanta Wildlife Reserve", type: "Wildlife Reserve", year: 1976, fauna: "Swamp deer (phular), tiger, elephant", color: "#06b6d4" },
    { name: "Annapurna Conservation Area", type: "Conservation Area", year: 1986, fauna: "Snow leopard, musk deer, blue sheep", color: "#8b5cf6" },
  ];
  const iucn = [
    { cat: "Extinct (EX)", desc: "No reasonable doubt last individual died", color: "#64748b" },
    { cat: "Critically Endangered (CR)", desc: "Extremely high risk of extinction in wild", color: "#ef4444" },
    { cat: "Endangered (EN)", desc: "Very high risk of extinction", color: "#f97316" },
    { cat: "Vulnerable (VU)", desc: "High risk of extinction in medium term", color: "#f59e0b" },
    { cat: "Near Threatened (NT)", desc: "Close to threatened thresholds", color: "#eab308" },
    { cat: "Least Concern (LC)", desc: "Widespread and abundant", color: "#22c55e" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 260" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="700">CONSERVATION BIOLOGY — NEPAL</text>
        {/* Nepal stats */}
        <rect x="20" y="40" width="280" height="205" rx="12" fill="rgba(34,197,94,0.08)" stroke="#22c55e" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="700">NEPAL CONSERVATION AREAS</text>
        {parks.map((p, i) => (
          <g key={i}>
            <rect x="35" y={80 + i * 26} width="250" height="22" rx="4" fill={`${p.color}15`} stroke={p.color} strokeWidth="0.5" />
            <text x="45" y={95 + i * 26} fill={p.color} fontSize="8" fontWeight="600">{p.name}</text>
            <text x="280" y="95 + i * 26" textAnchor="end" fill="#94a3b8" fontSize="7">{p.type} · {p.year}</text>
          </g>
        ))}
        <text x="160" y="240" textAnchor="middle" fill="#94a3b8" fontSize="8">13 National Parks · 6 Wildlife Reserves · 3 Conservation Areas · 1 Hunting Reserve</text>

        {/* IUCN Categories */}
        <rect x="310" y="40" width="270" height="205" rx="12" fill="rgba(239,68,68,0.05)" stroke="#ef4444" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">IUCN THREATENED CATEGORIES</text>
        {iucn.map((cat, i) => (
          <g key={i}>
            <rect x="325" y={80 + i * 28} width="240" height="24" rx="4" fill={`${cat.color}15`} stroke={cat.color} strokeWidth="0.5" />
            <text x="335" y={91 + i * 28} fill={cat.color} fontSize="8" fontWeight="600">{cat.cat}</text>
            <text x="555" y="95 + i * 28" textAnchor="end" fill="#94a3b8" fontSize="7">{cat.desc}</text>
          </g>
        ))}
        <text x="445" y="250" textAnchor="middle" fill="#fbbf24" fontSize="8">⚠ Endangered species in Nepal: Rhinoceros, Tiger, Snow Leopard, Red Panda</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "In-situ vs Ex-situ Conservation", rows: ["In-situ: protecting species in natural habitat", "Examples: National parks, wildlife reserves, conservation areas", "Ex-situ: protecting species outside natural habitat", "Examples: Zoos, botanical gardens, seed banks, captive breeding"] },
          { name: "Biodiversity Hotspots", rows: ["Area with high endemism + severe habitat loss", "Nepal hotspots: Eastern Himalaya, Indo-Burma", ">70% original habitat must be lost to qualify", "Conservation priority: protects 44% of plant & 35% vertebrate species globally"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
            <p className="text-xs font-bold text-green-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BiologyBiotaConservation3D() {
  const [tab, setTab] = useState<Tab>("adaptation");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center"><active.icon className="h-5 w-5" style={{ color: active.color }} /></div>
        <div><h2 className="font-semibold text-base">Biota & Environment + Conservation 3D</h2><p className="text-xs text-muted-foreground">NEB XI Units 9 & 10 — Adaptations, behavior, pollution, conservation biology</p></div>
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
        {tab === "adaptation" && <AdaptationsView />}
        {tab === "behavior" && <BehaviorView />}
        {tab === "conservation" && <ConservationView />}
      </div>
    </div>
  );
}
