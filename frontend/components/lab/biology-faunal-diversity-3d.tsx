"use client";

import { useState } from "react";
import { Network, Activity, Bug } from "lucide-react";

type Tab = "protista" | "phyla" | "earthworm" | "frog";

const TABS: { id: Tab; label: string; icon: any; color: string }[] = [
  { id: "protista", label: "Protista & Protozoa", icon: Bug, color: "#f97316" },
  { id: "phyla", label: "Animal Phyla", icon: Network, color: "#dc2626" },
  { id: "earthworm", label: "Earthworm", icon: Activity, color: "#b91c1c" },
  { id: "frog", label: "Frog", icon: Activity, color: "#991b1b" },
];

function ProtistaView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 320" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="700">PROTOZOA — PARAMECIUM & PLASMODIUM</text>
        {/* Paramecium */}
        <rect x="20" y="40" width="280" height="270" rx="12" fill="rgba(249,115,22,0.08)" stroke="#f97316" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="700">PARAMECIUM CAUDATUM</text>
        <text x="160" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Slipper-shaped ciliate protozoan</text>
        {/* Body outline */}
        <ellipse cx="160" cy="170" rx="100" ry="55" fill="rgba(249,115,22,0.15)" stroke="#f97316" strokeWidth="2" />
        {/* Cilia */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const cx = 160 + 95 * Math.cos(angle);
          const cy = 170 + 50 * Math.sin(angle);
          return <line key={i} x1={cx} y1={cy} x2={cx + 8 * Math.cos(angle)} y2={cy + 8 * Math.sin(angle)} stroke="#f97316" strokeWidth="1" opacity="0.6" />;
        })}
        <text x="160" y="235" textAnchor="middle" fill="#94a3b8" fontSize="7">Cilia (locomotion)</text>
        {/* Oral groove */}
        <path d="M 230 150 Q 240 170 230 190" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <text x="245" y="175" fill="#fbbf24" fontSize="7">Oral groove</text>
        {/* Macronucleus */}
        <ellipse cx="150" cy="165" rx="20" ry="12" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="1" />
        <text x="150" y="168" textAnchor="middle" fill="#f87171" fontSize="6" fontWeight="600">Macro N.</text>
        {/* Micronucleus */}
        <circle cx="175" cy="160" r="5" fill="rgba(139,92,246,0.4)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="190" y="155" fill="#c4b5fd" fontSize="6">Micro N.</text>
        {/* Contractile vacuoles */}
        <circle cx="120" cy="140" r="6" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1" />
        <circle cx="200" cy="140" r="6" fill="rgba(59,130,246,0.3)" stroke="#3b82f6" strokeWidth="1" />
        <text x="120" y="130" textAnchor="middle" fill="#60a5fa" fontSize="6">CV</text>
        <text x="200" y="130" textAnchor="middle" fill="#60a5fa" fontSize="6">CV</text>
        {/* Features */}
        <text x="160" y="260" textAnchor="middle" fill="#fbbf24" fontSize="8">Features: Contractile vacuole, trichocysts, binucleate</text>
        <text x="160" y="275" textAnchor="middle" fill="#94a3b8" fontSize="8">Reproduction: Binary fission (transverse), Conjugation (sexual)</text>

        {/* Plasmodium */}
        <rect x="310" y="40" width="270" height="270" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">PLASMODIUM VIVAX</text>
        <text x="445" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8">Malaria parasite (Apicomplexa)</text>
        {/* Life cycle stages */}
        {[
          { stage: "Sporozoite", where: "Injected by mosquito", color: "#ef4444" },
          { stage: "Merozoite", where: "Ruptured RBCs", color: "#f97316" },
          { stage: "Trophozoite", where: "Feeds in RBC (ring stage)", color: "#f59e0b" },
          { stage: "Gametocyte", where: "Taken up by mosquito", color: "#8b5cf6" },
          { stage: "Sporozoite (again)", where: "Salivary gland of mosquito", color: "#ef4444" },
        ].map((s, i) => (
          <g key={i}>
            <circle cx="360" cy={110 + i * 35} r="10" fill={`${s.color}30`} stroke={s.color} strokeWidth="1.5" />
            <text x="360" y="114 + i * 35" textAnchor="middle" fill={s.color} fontSize="6" fontWeight="600">{i + 1}</text>
            <line x1="370" y1={110 + i * 35} x2="400" y2={110 + i * 35} stroke={s.color} strokeWidth="1" opacity="0.5" />
            <text x="405" y={108 + i * 35} fill={s.color} fontSize="8" fontWeight="600">{s.stage}</text>
            <text x="405" y={120 + i * 35} fill="#94a3b8" fontSize="7">{s.where}</text>
          </g>
        ))}
        <text x="445" y="295" textAnchor="middle" fill="#f87171" fontSize="8">Causes malaria (fever, chills, anaemia)</text>
      </svg>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Protozoa Classification", rows: ["Sarcodina (Amoeba) — pseudopodia", "Mastigophora (Euglena) — flagellum", "Ciliophora (Paramecium) — cilia", "Sporozoa (Plasmodium) — no locomotion, parasitic"] },
          { name: "Economic Importance of Plasmodium", rows: ["Malaria: 200M+ cases/year globally", "P. falciparum most deadly (cerebral malaria)", "Symptoms: cyclic fever, chills, anaemia", "Control: kill mosquitoes, antimalarials, vaccine development"] },
        ].map((s) => (
          <div key={s.name} className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
            <p className="text-xs font-bold text-orange-400">{s.name}</p>
            {s.rows.map((r, i) => (
              <p key={i} className="text-[10px] text-muted-foreground mt-0.5">• {r}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimalPhylaView() {
  const phyla = [
    { name: "Porifera", example: "Sponge", feature: "Cellular level, pores, no true tissues", color: "#ef4444" },
    { name: "Coelenterata", example: "Hydra, Jellyfish", feature: "Tissue level, radial symmetry, cnidocytes", color: "#f97316" },
    { name: "Platyhelminthes", example: "Planaria, Tapeworm", feature: "Organ level, flat body, acoelomate", color: "#f59e0b" },
    { name: "Aschelminthes", example: "Ascaris, Pinworm", feature: "Organ-system level, pseudocoelomate", color: "#84cc16" },
    { name: "Annelida", example: "Earthworm, Nereis", feature: "Metameric segmentation, coelomate", color: "#10b981" },
    { name: "Arthropoda", example: "Insects, Crustaceans, Spiders", feature: "Jointed appendages, exoskeleton, largest phylum", color: "#06b6d4" },
    { name: "Mollusca", example: "Snail, Octopus,clam", feature: "Soft body, muscular foot, mantle", color: "#3b82f6" },
    { name: "Echinodermata", example: "Starfish, Sea urchin", feature: "Radial symmetry (adults), water vascular system", color: "#8b5cf6" },
    { name: "Chordata", example: "Fish, Frog, Bird, Human", feature: "Notochord, dorsal nerve cord, pharyngeal slits", color: "#ec4899" },
  ];
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="700">ANIMALIA PHILA — LEVELS OF ORGANIZATION</text>
        {/* Progression */}
        <rect x="20" y="40" width="560" height="30" rx="6" fill="rgba(220,38,70,0.1)" stroke="#dc2626" strokeWidth="0.5" />
        <text x="300" y="60" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="600">LEVELS: Cellular → Tissue → Organ → Organ-System</text>
        {/* Phyla in order */}
        {phyla.map((p, i) => (
          <g key={p.name}>
            <rect x={20 + i * 62} y="85" width="58" height="240" rx="6" fill={`${p.color}10`} stroke={p.color} strokeWidth="1" />
            <text x={49 + i * 62} y="100" textAnchor="middle" fill={p.color} fontSize="7" fontWeight="700">{p.name}</text>
            <text x={49 + i * 62} y="115" textAnchor="middle" fill="#e2e8f0" fontSize="6">{p.example}</text>
            <text x={49 + i * 62} y="130" textAnchor="middle" fill="#94a3b8" fontSize="5">Sym:{i < 2 ? "No" : i < 4 ? "Radial" : i < 7 ? "Bilateral" : "Bilateral"}</text>
            <text x={49 + i * 62} y="145" textAnchor="middle" fill="#94a3b8" fontSize="5">Coel:{i < 1 ? "None" : i < 3 ? "Acoel" : i < 4 ? "Pseudo" : "True"}</text>
            <text x={49 + i * 62} y="160" textAnchor="middle" fill="#64748b" fontSize="5">{p.feature.split(",")[0]}</text>
            <text x={49 + i * 62} y="310" textAnchor="middle" fill={p.color} fontSize="6" fontWeight="600">
              {i === 8 ? "Subphyla:" : ""}
            </text>
          </g>
        ))}
        {/* Key */}
        <rect x="20" y="320" width="560" height="20" rx="4" fill="rgba(220,38,70,0.05)" />
        <text x="100" y="334" textAnchor="middle" fill="#94a3b8" fontSize="7">Sym = Symmetry · Coel = Body cavity type</text>
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {phyla.slice(0, 6).map((p) => (
          <div key={p.name} className="p-2.5 rounded-lg" style={{ borderColor: `${p.color}30`, backgroundColor: `${p.color}08` }}>
            <p className="text-xs font-bold" style={{ color: p.color }}>{p.name}</p>
            <p className="text-[10px] text-muted-foreground">{p.example} · {p.feature.split(",")[0]}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {phyla.slice(6).map((p) => (
          <div key={p.name} className="p-2.5 rounded-lg" style={{ borderColor: `${p.color}30`, backgroundColor: `${p.color}08` }}>
            <p className="text-xs font-bold" style={{ color: p.color }}>{p.name}</p>
            <p className="text-[10px] text-muted-foreground">{p.example} · {p.feature.split(",")[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EarthwormView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 380" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="700">EARTHWORM (PHERETIMA POSTHUMA)</text>
        {/* External features */}
        <rect x="20" y="40" width="280" height="160" rx="12" fill="rgba(185,28,28,0.08)" stroke="#b91c1c" strokeWidth="1" />
        <text x="160" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">EXTERNAL FEATURES</text>
        {/* Body */}
        <ellipse cx="160" cy="120" rx="100" ry="25" fill="rgba(185,28,28,0.2)" stroke="#b91c1c" strokeWidth="2" />
        {/* Segments */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={80 + i * 18} y1="98" x2={80 + i * 18} y2="142" stroke="#b91c1c" strokeWidth="0.5" opacity="0.5" />
        ))}
        <text x="160" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Metameric segmentation (Annulida)</text>
        <text x="160" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8">Clitellum (saddle) at segments 14-16</text>
        <text x="160" y="195" textAnchor="middle" fill="#94a3b8" fontSize="8">Setae (bristles) on each segment</text>
        <text x="160" y="210" textAnchor="middle" fill="#fb923c" fontSize="8">Ventral blood vessel (red)</text>

        {/* Digestive system */}
        <rect x="310" y="40" width="270" height="160" rx="12" fill="rgba(185,28,28,0.05)" stroke="#b91c1c" strokeWidth="1" />
        <text x="445" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">DIGESTIVE SYSTEM</text>
        {[
          { part: "Mouth", y: 85 },
          { part: "Buccal cavity", y: 100 },
          { part: "Pharynx (suctorial)", y: 115 },
          { part: "Esophagus + Gizzard", y: 130 },
          { part: "Intestine (with typhlosole)", y: 145 },
          { part: "Anus", y: 160 },
        ].map((p) => (
          <g key={p.part}>
            <rect x="330" y={p.y} width="200" height="14" rx="3" fill="rgba(185,28,28,0.15)" stroke="#b91c1c" strokeWidth="0.5" />
            <text x="340" y={p.y + 10} fill="#f87171" fontSize="8">{p.part}</text>
            <text x="520" y={p.y + 10} textAnchor="end" fill="#94a3b8" fontSize="7">
              {p.part === "Intestine (with typhlosole)" ? "Absorption surface" : p.part === "Gizzard" ? "Mechanical grinding" : ""}
            </text>
          </g>
        ))}
        <text x="445" y="215" textAnchor="middle" fill="#94a3b8" fontSize="8">Typhlosole: upward fold increases absorption area</text>

        {/* Nervous system */}
        <rect x="20" y="210" width="280" height="150" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="160" y="232" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">NERVOUS SYSTEM</text>
        {/* Brain */}
        <ellipse cx="100" cy="265" rx="20" ry="12" fill="rgba(139,92,246,0.3)" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="100" y="268" textAnchor="middle" fill="#c4b5fd" fontSize="7" fontWeight="600">Cerebral GG</text>
        <text x="100" y="285" textAnchor="middle" fill="#94a3b8" fontSize="7">(Supra-esophageal)</text>
        {/* Nerve cord */}
        <line x1="100" y1="277" x2="100" y2="340" stroke="#8b5cf6" strokeWidth="2" />
        <text x="125" y="310" fill="#c4b5fd" fontSize="7">Ventral nerve cord</text>
        {/* Ganglia */}
        {[290, 310, 330].map((y, i) => (
          <circle key={i} cx="100" cy={y} r="5" fill="rgba(139,92,246,0.4)" stroke="#8b5cf6" strokeWidth="1" />
        ))}
        <text x="200" y="270" fill="#94a3b8" fontSize="8">Pair of ganglia per segment</text>
        <text x="200" y="285" fill="#94a3b8" fontSize="8">Sub-esophageal ganglion</text>
        <text x="200" y="300" fill="#fbbf24" fontSize="8">Sensitivity: light, touch, chemical</text>

        {/* Circulatory system */}
        <rect x="310" y="210" width="270" height="150" rx="12" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" />
        <text x="445" y="232" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">CIRCULATORY SYSTEM</text>
        <text x="445" y="255" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="600">Closed type — blood in vessels only</text>
        {[
          { vessel: "Dorsal blood vessel", func: "Main collecting vessel — pumps forward", color: "#ef4444" },
          { vessel: "Ventral blood vessel", func: "Main distributing vessel — pumps backward", color: "#3b82f6" },
          { vessel: "Artificial hearts (4 pairs)", func: "Aortic arches — connect dorsal & ventral", color: "#fbbf24" },
          { vessel: "Lateral hearts", func: "In segments 7, 9, 12, 13 — pumping action", color: "#10b981" },
        ].map((v, i) => (
          <g key={i}>
            <rect x="330" y={270 + i * 22} width="240" height="18" rx="3" fill={`${v.color}15`} stroke={v.color} strokeWidth="0.5" />
            <text x="340" y={283 + i * 22} fill={v.color} fontSize="8" fontWeight="600">{v.vessel}</text>
            <text x="560" y={283 + i * 22} textAnchor="end" fill="#94a3b8" fontSize="7">{v.func}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function FrogView() {
  return (
    <div className="space-y-4">
      <svg viewBox="0 0 600 340" className="w-full rounded-xl bg-slate-950 border border-border">
        <text x="300" y="22" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="700">FROG (RANA TIGRINA) — ORGAN SYSTEMS</text>
        {/* Digestive */}
        <rect x="20" y="40" width="180" height="140" rx="12" fill="rgba(185,28,28,0.08)" stroke="#b91c1c" strokeWidth="1" />
        <text x="110" y="62" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="700">DIGESTIVE</text>
        {[
          "Mouth → short esophagus",
          "Stomach → small intestine",
          "Liver + Pancreas (digestive juice)",
          "Cloaca (common chamber)",
          "Short alimentary canal (herbivore→carnivore transition)",
        ].map((f, i) => (
          <text key={i} x="35" y={85 + i * 16} fill="#e2e8f0" fontSize="8">• {f}</text>
        ))}
        {/* Blood vascular */}
        <rect x="210" y="40" width="180" height="140" rx="12" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1" />
        <text x="300" y="62" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="700">CIRCULATORY</text>
        {[
          "Closed type, 3-chambered heart",
          "2 atria + 1 ventricle (partial mixing)",
          "Sinus venosus (receives blood)",
          "Truncus arteriosus (distributes)",
          "RBCs nucleated, biconvex",
        ].map((f, i) => (
          <text key={i} x="225" y="85 + i * 16" fill="#e2e8f0" fontSize="8">• {f}</text>
        ))}
        {/* Respiratory */}
        <rect x="400" y="40" width="180" height="140" rx="12" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1" />
        <text x="490" y="62" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700">RESPIRATORY</text>
        {[
          "Multiple sites: skin, buccal, pulmonary",
          "Cutaneous respiration (moist skin)",
          "Buccal pumping mechanism",
          "Simple sac-like lungs (no alveoli)",
          "No diaphragm — relies on muscle",
        ].map((f, i) => (
          <text key={i} x="415" y="85 + i * 16" fill="#e2e8f0" fontSize="8">• {f}</text>
        ))}
        {/* Reproductive */}
        <rect x="20" y="190" width="280" height="130" rx="12" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1" />
        <text x="160" y="212" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="700">REPRODUCTIVE SYSTEM</text>
        <text x="160" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">Male: Pair of testes → vasa efferentia → kidneys → urinogenital duct → cloaca</text>
        <text x="160" y="255" textAnchor="middle" fill="#94a3b8" fontSize="9">Female: Pair of ovaries → oviducts → cloaca (no uterus)</text>
        <text x="160" y="278" textAnchor="middle" fill="#fbbf24" fontSize="9">External fertilization · Amniotic eggs in water · Tadpole stage</text>
        <text x="160" y="300" textAnchor="middle" fill="#94a3b8" fontSize="8">Nuptial pads on forelimbs (male — gripping female during amplexus)</text>

        {/* Key comparison */}
        <rect x="310" y="190" width="270" height="130" rx="12" fill="rgba(236,72,153,0.08)" stroke="#ec4899" strokeWidth="1" />
        <text x="445" y="212" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="700">FROG — KEY IDENTIFYING FEATURES</text>
        {[
          { item: "Class", value: "Amphibia" },
          { item: "Skin", value: "Moist, glandular, no scales" },
          { item: "Respiration", value: "Cutaneous + buccal + pulmonary" },
          { item: "Heart", value: "3 chambers (2A + 1V)" },
          { item: "Temperature", value: "Poikilothermous (cold-blooded)" },
          { item: "Life cycle", value: "Metamorphosis (tadpole → adult)" },
        ].map((r, i) => (
          <g key={i}>
            <text x="330" y={235 + i * 18} fill="#f472b6" fontSize="8" fontWeight="600">{r.item}:</text>
            <text x="420" y={235 + i * 18} fill="#e2e8f0" fontSize="8">{r.value}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function BiologyFaunalDiversity3D() {
  const [tab, setTab] = useState<Tab>("protista");
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><active.icon className="h-5 w-5" style={{ color: active.color }} /></div>
        <div><h2 className="font-semibold text-base">Faunal Diversity 3D</h2><p className="text-xs text-muted-foreground">NEB XI Unit 8 — Protista, Protozoa, Animal phyla, Earthworm, Frog</p></div>
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
      <div className="min-h-[320px] rounded-xl border border-border bg-card overflow-auto">
        {tab === "protista" && <ProtistaView />}
        {tab === "phyla" && <AnimalPhylaView />}
        {tab === "earthworm" && <EarthwormView />}
        {tab === "frog" && <FrogView />}
      </div>
    </div>
  );
}
