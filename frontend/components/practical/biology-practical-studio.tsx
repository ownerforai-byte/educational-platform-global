"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Microscope,
  Eye,
  Leaf,
  Dna,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  Info,
  Droplets,
  Sun,
  Wind,
} from "lucide-react";

export type BiologyLabMode =
  | "compound-microscope"
  | "plant-physiology"
  | "biochemical-tests"
  | "floral-taxonomy";

interface BiologyPracticalStudioProps {
  initialLab?: BiologyLabMode;
}

export function BiologyPracticalStudio({
  initialLab = "compound-microscope",
}: BiologyPracticalStudioProps) {
  const [activeLab, setActiveLab] = useState<BiologyLabMode>(initialLab);

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-muted/30 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <Microscope className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Virtual Biology Apparatus Workbench
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Ultra-HD Optical & Physiology Simulation
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Virtual compound microscope, live potato osmometer, potometer transpiration, biochemical nutrient tests & floral diagrams
            </p>
          </div>
        </div>

        {/* Lab Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border/50">
          {[
            { id: "compound-microscope", label: "Virtual Microscope", icon: "🔬" },
            { id: "plant-physiology", label: "Osmosis & Transpiration", icon: "🌱" },
            { id: "biochemical-tests", label: "Biomolecule Tests", icon: "🧪" },
            { id: "floral-taxonomy", label: "Floral Diagrams & Keys", icon: "🌸" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLab(item.id as BiologyLabMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeLab === item.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {activeLab === "compound-microscope" && <VirtualMicroscopeSimulator />}
        {activeLab === "plant-physiology" && <PlantPhysiologySimulator />}
        {activeLab === "biochemical-tests" && <BiochemicalTestsSimulator />}
        {activeLab === "floral-taxonomy" && <FloralTaxonomySimulator />}
      </div>
    </div>
  );
}

/* =========================================================================
   1. VIRTUAL HD COMPOUND MICROSCOPE SIMULATOR
   ========================================================================= */
function VirtualMicroscopeSimulator() {
  const [selectedSlide, setSelectedSlide] = useState<string>("onion-root-mitosis");
  const [objective, setObjective] = useState<number>(40); // 4x, 10x, 40x, 100x
  const [fineFocus, setFineFocus] = useState<number>(50); // 0 to 100 (50 is sharp)
  const [lightIntensity, setLightIntensity] = useState<number>(85); // 20 to 100%

  // Focus blur calculation (0 blur when fineFocus == 50)
  const blurPx = Math.abs(fineFocus - 50) * 0.15;

  const slides: Record<
    string,
    {
      title: string;
      category: string;
      description: string;
      structures: string[];
      stain: string;
    }
  > = {
    "onion-root-mitosis": {
      title: "Mitosis in Onion Root Tip (Squash Mount)",
      category: "Cytology",
      description:
        "Meristematic cells exhibiting distinct mitotic stages: Prophase (condensed chromosomes), Metaphase (equatorial plate alignment), Anaphase (sister chromatids pulling apart), and Telophase (daughter nuclei forming).",
      structures: ["Chromosomes", "Equatorial Plate", "Spindle Fibres", "Cell Plate"],
      stain: "Acetocarmine / Feulgen Stain (Pink-Red)",
    },
    "onion-peel": {
      title: "Onion Epidermal Peel Mount",
      category: "Plant Anatomy",
      description:
        "Rectangular epidermal cells arranged in neat rows. Clear prominent cell walls, peripheral cytoplasm, large central vacuole, and distinct stained nuclei.",
      structures: ["Cell Wall", "Nucleus", "Cytoplasm", "Vacuole"],
      stain: "Iodine / Safranin Solution",
    },
    "human-cheek": {
      title: "Human Cheek Squamous Epithelial Cells",
      category: "Animal Histology",
      description:
        "Polygonal, flat animal cells without rigid walls. Prominent dark-blue stained spherical central nucleus and finely granular cytoplasm.",
      structures: ["Plasma Membrane", "Spherical Nucleus", "Granular Cytoplasm"],
      stain: "Methylene Blue Stain",
    },
    "human-blood": {
      title: "Human Blood Smear (Leishman Stain)",
      category: "Human Physiology",
      description:
        "Abundant biconcave enucleated red blood cells (Erythrocytes), multi-lobed neutrophils, large spherical nucleus lymphocytes, bilobed eosinophils, and tiny thrombocytes.",
      structures: ["Erythrocytes (RBC)", "Neutrophils", "Lymphocytes", "Platelets"],
      stain: "Leishman's Stain (Eosin + Methylene Blue)",
    },
    "dicot-stem": {
      title: "Dicot Stem (Helianthus / Sunflower T.S.)",
      category: "Plant Anatomy",
      description:
        "Wedge-shaped open vascular bundles arranged in a neat concentric ring. Prominent pith in center, multilayered cortex, and active vascular cambium layer.",
      structures: ["Epidermis & Cuticle", "Cortex", "Endodermis", "Xylem & Phloem Bundles", "Central Pith"],
      stain: "Safranin and Fast Green Double Stain",
    },
    "stomatal-peel": {
      title: "Stomatal Peel of Leaf (Tradescantia)",
      category: "Plant Physiology",
      description:
        "Kidney/bean-shaped guard cells flanking the stomatal aperture pore. Guard cells contain dense green chloroplasts and are surrounded by irregular epidermal subsidiary cells.",
      structures: ["Guard Cells", "Stomatal Pore", "Chloroplasts", "Subsidiary Cells"],
      stain: "Safranin Stain",
    },
  };

  const current = slides[selectedSlide];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Microscope Ocular Portal (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                Magnification: {objective * 10}× (10× Eyepiece × {objective}× Objective)
              </span>
              <span className="text-xs text-slate-400">
                Focus: <span className={blurPx < 0.5 ? "text-emerald-400 font-bold" : "text-amber-400"}>{blurPx < 0.5 ? "Crystal Sharp ✨" : "Blurry (Adjust Focus)"}</span>
              </span>
            </div>

            {/* Circular Eyepiece Field of View Portal */}
            <div className="relative flex justify-center items-center py-4">
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-slate-900 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-200"
                style={{
                  filter: `blur(${blurPx}px) brightness(${lightIntensity / 100})`,
                }}
              >
                {/* Microscopic Field Rendering */}
                {selectedSlide === "onion-root-mitosis" && (
                  <svg viewBox="0 0 300 300" className="w-full h-full bg-[#fdf2f8]">
                    {/* Rows of cells in different mitosis phases */}
                    {Array.from({ length: 6 }).map((_, r) =>
                      Array.from({ length: 6 }).map((_, c) => {
                        const isMetaphase = (r + c) % 4 === 0;
                        const isAnaphase = (r + c) % 5 === 0;
                        return (
                          <g key={`${r}-${c}`} transform={`translate(${c * 50 + 5}, ${r * 50 + 5})`}>
                            <rect x="0" y="0" width="46" height="46" rx="3" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
                            {isMetaphase ? (
                              <line x1="23" y1="8" x2="23" y2="38" stroke="#be185d" strokeWidth="4" strokeLinecap="round" />
                            ) : isAnaphase ? (
                              <>
                                <line x1="12" y1="8" x2="12" y2="38" stroke="#be185d" strokeWidth="3" />
                                <line x1="34" y1="8" x2="34" y2="38" stroke="#be185d" strokeWidth="3" />
                              </>
                            ) : (
                              <circle cx="23" cy="23" r="9" fill="#db2777" />
                            )}
                          </g>
                        );
                      })
                    )}
                  </svg>
                )}

                {selectedSlide === "onion-peel" && (
                  <svg viewBox="0 0 300 300" className="w-full h-full bg-[#fefce8]">
                    {/* Elongated plant cells with distinct nucleus */}
                    {Array.from({ length: 5 }).map((_, r) =>
                      Array.from({ length: 4 }).map((_, c) => (
                        <g key={`${r}-${c}`} transform={`translate(${c * 75 + (r % 2 ? 15 : 0)}, ${r * 60})`}>
                          <rect x="2" y="2" width="70" height="56" rx="4" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
                          <circle cx="50" cy="30" r="7" fill="#854d0e" />
                          <rect x="10" y="10" width="30" height="36" rx="4" fill="rgba(250, 204, 21, 0.15)" />
                        </g>
                      ))
                    )}
                  </svg>
                )}

                {selectedSlide === "human-cheek" && (
                  <svg viewBox="0 0 300 300" className="w-full h-full bg-[#eff6ff]">
                    {/* Irregular animal cells with methylene blue nucleus */}
                    <path d="M40,50 Q70,30 110,60 Q130,110 80,130 Q30,120 40,50 Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="75" cy="85" r="8" fill="#1e40af" />

                    <path d="M160,120 Q210,90 250,140 Q240,210 180,220 Q130,180 160,120 Z" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="195" cy="165" r="9" fill="#1e40af" />
                  </svg>
                )}

                {selectedSlide === "human-blood" && (
                  <svg viewBox="0 0 300 300" className="w-full h-full bg-[#fff1f2]">
                    {/* Numerous RBCs */}
                    {Array.from({ length: 24 }).map((_, i) => (
                      <circle
                        key={i}
                        cx={30 + (i % 5) * 60 + ((i * 17) % 25)}
                        cy={30 + Math.floor(i / 5) * 55 + ((i * 11) % 20)}
                        r="12"
                        fill="#fecdd3"
                        stroke="#f43f5e"
                        strokeWidth="2"
                      />
                    ))}
                    {/* Multi-lobed Neutrophil */}
                    <g transform="translate(130, 120)">
                      <circle cx="20" cy="20" r="22" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="12" cy="15" r="6" fill="#4338ca" />
                      <circle cx="25" cy="14" r="6" fill="#4338ca" />
                      <circle cx="20" cy="26" r="6" fill="#4338ca" />
                      <line x1="12" y1="15" x2="25" y2="14" stroke="#4338ca" strokeWidth="2" />
                      <line x1="25" y1="14" x2="20" y2="26" stroke="#4338ca" strokeWidth="2" />
                    </g>
                  </svg>
                )}

                {selectedSlide === "stomatal-peel" && (
                  <svg viewBox="0 0 300 300" className="w-full h-full bg-[#f0fdf4]">
                    {/* Stoma with bean-shaped guard cells */}
                    <g transform="translate(100, 100)">
                      {/* Left Guard Cell */}
                      <path d="M30,10 C10,30 10,70 30,90 C20,70 20,30 30,10 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                      {/* Right Guard Cell */}
                      <path d="M40,10 C60,30 60,70 40,90 C50,70 50,30 40,10 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                      {/* Stomatal Pore Aperture */}
                      <ellipse cx="35" cy="50" rx="4" ry="25" fill="#14532d" />
                      {/* Chloroplasts in guard cells */}
                      <circle cx="22" cy="30" r="3" fill="#15803d" />
                      <circle cx="20" cy="50" r="3" fill="#15803d" />
                      <circle cx="22" cy="70" r="3" fill="#15803d" />
                      <circle cx="48" cy="30" r="3" fill="#15803d" />
                      <circle cx="50" cy="50" r="3" fill="#15803d" />
                      <circle cx="48" cy="70" r="3" fill="#15803d" />
                    </g>
                  </svg>
                )}

                {selectedSlide === "dicot-stem" && (
                  <svg viewBox="0 0 300 300" className="w-full h-full bg-[#f0fdf4]">
                    <circle cx="150" cy="150" r="130" fill="none" stroke="#16a34a" strokeWidth="3" />
                    <circle cx="150" cy="150" r="100" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,4" />
                    {/* Concentric vascular bundles */}
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * 2 * Math.PI) / 8;
                      const bx = 150 + 95 * Math.cos(angle);
                      const by = 150 + 95 * Math.sin(angle);
                      return (
                        <g key={i} transform={`translate(${bx - 12}, ${by - 15})`}>
                          <path d="M0,0 L24,0 L18,28 L6,28 Z" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
                          <circle cx="12" cy="8" r="4" fill="#0284c7" />
                        </g>
                      );
                    })}
                    <circle cx="150" cy="150" r="45" fill="#fef08a" opacity="0.6" />
                  </svg>
                )}

                {/* Eyepiece crosshairs overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black" />
                </div>
              </div>
            </div>

            {/* Slide Specimen Bar */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-slate-400">Specimen: </span>
                <span className="font-bold text-emerald-400">{current.title}</span>
              </div>
              <div>
                <span className="text-slate-400">Stain Used: </span>
                <span className="font-mono text-slate-200">{current.stain}</span>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-foreground block mb-1">Select Objective Turret:</label>
                <div className="grid grid-cols-4 gap-1">
                  {[4, 10, 40, 100].map((mag) => (
                    <button
                      key={mag}
                      onClick={() => setObjective(mag)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        objective === mag
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "border border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {mag}×
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-foreground">Fine Focus Knob:</label>
                  <button onClick={() => setFineFocus(50)} className="text-[10px] text-primary hover:underline">
                    Auto-Focus (50)
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fineFocus}
                  onChange={(e) => setFineFocus(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-foreground block mb-1">
                  Substage Iris Diaphragm (Light): {lightIntensity}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-muted rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <label className="text-xs font-bold text-foreground block mb-2">Slide Library (Select Specimen):</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(slides).map(([id, s]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedSlide(id);
                      setFineFocus(50);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all border ${
                      selectedSlide === id
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm"
                        : "border-border/70 hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="truncate font-bold">{s.title}</div>
                    <div className="text-[10px] text-muted-foreground capitalize">{s.category}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Histological & Cytological Analysis Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Microscopic Identification Key
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="font-semibold text-foreground">Diagnostic Features:</span>
                <p className="text-muted-foreground mt-1 leading-relaxed text-[11px]">
                  {current.description}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40">
                <span className="font-semibold text-foreground">Key Structures to Label:</span>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground mt-1">
                  {current.structures.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 mt-2">
                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Examiner Viva Tip</div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  Always focus under low power (10×) first before moving to high power (40×). Never use coarse adjustment knob under 40× or 100× to prevent cracking the slide!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. PLANT PHYSIOLOGY SIMULATOR (Osmosis & Potometer)
   ========================================================================= */
function PlantPhysiologySimulator() {
  const [activeExp, setActiveExp] = useState<"osmometer" | "potometer">("osmometer");
  const [sucroseConcentration, setSucroseConcentration] = useState<number>(20); // %
  const [elapsedMins, setElapsedMins] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(1); // Potometer factor

  // Osmotic rise = 20mm baseline * concentration factor * time
  const osmoticLevelMm = useMemo(() => {
    return Math.min(45, (sucroseConcentration / 20) * Math.sqrt(elapsedMins) * 5);
  }, [sucroseConcentration, elapsedMins]);

  // Transpiration bubble travel cm
  const bubbleTravelCm = useMemo(() => {
    return Math.min(10, elapsedMins * 0.4 * windSpeed);
  }, [elapsedMins, windSpeed]);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedMins((prev) => (prev < 60 ? prev + 1 : prev));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                {activeExp === "osmometer" ? "Potato Osmometer (Endosmosis)" : "Ganong's Potometer (Transpiration)"}
              </span>
              <span className="text-xs font-mono text-slate-300">
                Time Elapsed: <span className="text-emerald-400 font-bold">{elapsedMins} mins</span>
              </span>
            </div>

            {/* Graphic Canvas */}
            <div className="flex justify-center items-center py-6 h-[220px]">
              {activeExp === "osmometer" ? (
                <svg viewBox="0 0 400 200" className="w-full max-w-[360px] h-[180px]">
                  {/* Petri dish containing water */}
                  <rect x="40" y="140" width="320" height="40" rx="6" fill="#0284c7" opacity="0.6" stroke="#38bdf8" />
                  <text x="50" y="165" fontSize="10" fill="#f8fafc">Petri Dish (Water)</text>

                  {/* Peeled Potato Block with Cavity */}
                  <path d="M120,70 L280,70 L260,160 L140,160 Z" fill="#d97706" stroke="#92400e" strokeWidth="2" />
                  <rect x="160" y="70" width="80" height="70" fill="#fef3c7" stroke="#b45309" />

                  {/* Hypertonic sugar solution with rising level */}
                  <rect
                    x="162"
                    y={140 - Math.min(65, 20 + osmoticLevelMm)}
                    width="76"
                    height={Math.min(65, 20 + osmoticLevelMm)}
                    fill="#3b82f6"
                    opacity="0.8"
                  />

                  {/* Marker Pin Initial Level */}
                  <line x1="150" y1="120" x2="170" y2="120" stroke="#ef4444" strokeWidth="2" />
                  <text x="110" y="123" fontSize="8" fill="#ef4444" fontWeight="bold">Initial Pin</text>

                  {/* Marker Pin Final Level */}
                  <line x1="150" y1={140 - Math.min(65, 20 + osmoticLevelMm)} x2="170" y2={140 - Math.min(65, 20 + osmoticLevelMm)} stroke="#22c55e" strokeWidth="2" />
                  <text x="115" y={143 - Math.min(65, 20 + osmoticLevelMm)} fontSize="8" fill="#22c55e" fontWeight="bold">Final Level</text>
                </svg>
              ) : (
                <svg viewBox="0 0 440 180" className="w-full max-w-[400px] h-[160px]">
                  {/* Potometer capillary tube */}
                  <rect x="60" y="100" width="320" height="16" fill="rgba(241, 245, 249, 0.1)" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Water column inside tube */}
                  <rect x="60" y="102" width={60 + bubbleTravelCm * 24} height="12" fill="#38bdf8" opacity="0.8" />
                  {/* Traveling Air Bubble */}
                  <ellipse cx={120 + bubbleTravelCm * 24} cy="108" rx="6" ry="5" fill="#f8fafc" stroke="#dc2626" strokeWidth="2" />

                  {/* Leafy shoot cut stem */}
                  <g transform="translate(340, 30)">
                    <rect x="20" y="50" width="12" height="30" fill="#15803d" />
                    <circle cx="10" cy="40" r="14" fill="#22c55e" />
                    <circle cx="35" cy="35" r="16" fill="#16a34a" />
                    <circle cx="25" cy="20" r="14" fill="#22c55e" />
                  </g>
                </svg>
              )}
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs flex justify-between items-center">
              <span className="text-slate-400">Measured Dynamic Metric:</span>
              <span className="font-bold text-emerald-400 font-mono">
                {activeExp === "osmometer" ? `Liquid Rise: +${osmoticLevelMm.toFixed(1)} mm` : `Bubble Displacement: ${bubbleTravelCm.toFixed(1)} cm`}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveExp("osmometer");
                  setElapsedMins(0);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeExp === "osmometer" ? "bg-emerald-600 text-white" : "border border-border"
                }`}
              >
                Potato Osmometer Lab
              </button>
              <button
                onClick={() => {
                  setActiveExp("potometer");
                  setElapsedMins(0);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeExp === "potometer" ? "bg-emerald-600 text-white" : "border border-border"
                }`}
              >
                Ganong's Potometer Lab
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {activeExp === "osmometer" ? (
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1">
                    Sucrose Sugar Concentration: {sucroseConcentration}%
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={sucroseConcentration}
                    onChange={(e) => {
                      setSucroseConcentration(parseInt(e.target.value));
                      setElapsedMins(0);
                    }}
                    className="w-full accent-emerald-500 h-2 bg-muted rounded-lg cursor-pointer"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1">
                    Wind & Light Speed Factor: {windSpeed}×
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-muted rounded-lg cursor-pointer"
                  />
                </div>
              )}
              <div className="flex items-end">
                <button
                  onClick={() => setElapsedMins(0)}
                  className="w-full py-2 rounded-lg border border-border hover:bg-muted text-xs font-semibold"
                >
                  Restart Experiment (t = 0)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Theory Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Physiological Principle
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Endosmosis:</strong> Net movement of solvent (water) molecules from a region of higher water potential (petri dish) to lower water potential (cavity sugar solution) through the semi-permeable cell membranes of potato cells.
              </p>
              <p className="pt-2 border-t border-border/30">
                <strong className="text-foreground">Transpiration Pull:</strong> Evaporation of water from mesophyll cell surfaces in leaves generates negative hydrostatic tension (transpiration pull) drawing water along the xylem capillary column.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. BIOCHEMICAL NUTRIENT TESTS SIMULATOR
   ========================================================================= */
function BiochemicalTestsSimulator() {
  const [selectedTest, setSelectedTest] = useState<"benedict" | "iodine" | "biuret" | "sudan">("benedict");

  const testDetails = {
    benedict: {
      title: "Benedict's Test for Reducing Sugars",
      sample: "Glucose Solution (1%)",
      reagent: "Benedict's Qualitative Reagent",
      result: "Brick-Red Precipitate of Cu₂O 🧱",
      color: "#dc2626",
      principle: "Alkaline copper(II) sulfate is reduced by free aldehyde/ketone group of reducing sugar to insoluble red copper(I) oxide on heating.",
    },
    iodine: {
      title: "Iodine Test for Starch",
      sample: "Starch Extract (Potato)",
      reagent: "Iodine - Potassium Iodide (IKI) Solution",
      result: "Intense Blue-Black Complex 🌌",
      color: "#1e1b4b",
      principle: "Iodine triiodide ions (I₃⁻) slip into the helical amylose coils of starch forming an intense blue-black charge transfer coordination complex.",
    },
    biuret: {
      title: "Biuret Test for Proteins & Peptides",
      sample: "Egg Albumin / Dilute Milk",
      reagent: "1% CuSO₄ + 40% NaOH (Biuret Reagent)",
      result: "Deep Violet / Purple Coloration 💜",
      color: "#7e22ce",
      principle: "Cu²⁺ ions in alkaline medium coordinate with nitrogen atoms in peptide bonds (-CONH-) forming a characteristic violet chelate complex.",
    },
    sudan: {
      title: "Sudan III Test for Lipids & Fats",
      sample: "Vegetable Oil / Ghee",
      reagent: "Sudan III Dye Solution",
      result: "Bright Red Stained Floating Lipid Layer 🔴",
      color: "#ea580c",
      principle: "Sudan III is a lysochrome (fat-soluble dye) that selectively partitions into non-polar lipid droplets giving a distinct red ring/globules.",
    },
  };

  const current = testDetails[selectedTest];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                {current.title}
              </span>
              <span className="text-xs text-slate-400">Sample: {current.sample}</span>
            </div>

            <div className="flex flex-col items-center justify-center py-8 h-[200px]">
              <div className="w-20 h-36 rounded-b-full border-2 border-slate-400 bg-slate-900/60 p-1 relative overflow-hidden flex flex-col justify-end shadow-2xl">
                <div
                  className="w-full h-3/4 rounded-b-full transition-colors duration-500 opacity-90"
                  style={{ backgroundColor: current.color }}
                />
              </div>
              <div className="mt-4 text-xs font-bold text-emerald-400 text-center">
                Observation: {current.result}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-bold text-foreground">Select Biochemical Test:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "benedict", label: "Benedict's (Sugar)", icon: "🍬" },
                { id: "iodine", label: "Iodine (Starch)", icon: "🥔" },
                { id: "biuret", label: "Biuret (Protein)", icon: "🥩" },
                { id: "sudan", label: "Sudan III (Lipids)", icon: "🧈" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTest(t.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    selectedTest === t.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "border border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <span>{t.icon} </span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Biochemical Reaction Principle
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>{current.principle}</p>
              <div className="p-2.5 rounded-lg bg-muted/60 text-foreground font-mono text-[11px] mt-2 border border-border/40">
                Reagent: {current.reagent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. FLORAL TAXONOMY & FLORAL DIAGRAM SIMULATOR
   ========================================================================= */
function FloralTaxonomySimulator() {
  const [selectedFamily, setSelectedFamily] = useState<"brassicaceae" | "fabaceae" | "solanaceae" | "liliaceae">("solanaceae");

  const families = {
    solanaceae: {
      name: "Solanaceae (Potato / Nightshade Family)",
      formula: "⊕ ⚥ K(5) C(5) A5 G(2)",
      calyx: "5 sepals, gamosepalous (fused), persistent, valvate aestivation",
      corolla: "5 petals, gamopetalous (infundibuliform/rotate), valvate",
      androecium: "5 stamens, epipetalous, alternipetalous, basifixed/dithecous anthers",
      gynoecium: "Bicarpellary, syncarpous, superior ovary, obliquely placed, swollen placenta with numerous ovules (axile placentation)",
      examples: "Solanum tuberosum (Potato), Solanum lycopersicum (Tomato), Nicotiana tabacum (Tobacco)",
    },
    brassicaceae: {
      name: "Brassicaceae / Cruciferae (Mustard Family)",
      formula: "⊕ ⚥ K2+2 C4 A2+4 G(2)",
      calyx: "4 sepals, polysepalous in two whorls (2 outer + 2 inner)",
      corolla: "4 petals, polypetalous, cruciform (cross-shaped) arrangement",
      androecium: "6 stamens, tetradynamous condition (2 outer short + 4 inner long)",
      gynoecium: "Bicarpellary, syncarpous, superior ovary, unilocular becoming bilocular by false septum (replum), parietal placentation",
      examples: "Brassica campestris (Mustard), Raphanus sativus (Radish)",
    },
    fabaceae: {
      name: "Fabaceae / Papilionaceae (Pea / Legume Family)",
      formula: "% ⚥ K(5) C1+2+(2) A(9)+1 G1",
      calyx: "5 sepals, gamosepalous, imbricate or valvate",
      corolla: "5 petals, polypetalous, papilionaceous (1 standard/vexillum + 2 wings/alae + 2 fused keel/carina), vexillary aestivation",
      androecium: "10 stamens, diadelphous condition [(9)+1]",
      gynoecium: "Monocarpellary, superior ovary, unilocular with marginal placentation",
      examples: "Pisum sativum (Pea), Cicer arietinum (Gram), Phaseolus vulgaris",
    },
    liliaceae: {
      name: "Liliaceae (Lily / Monocot Family)",
      formula: "⊕ ⚥ P3+3 A3+3 G(3)",
      calyx: "Perianth 6 tepals in two whorls (3+3), often fused into tube",
      corolla: "Represented as perianth (homochlamydeous)",
      androecium: "6 stamens in two whorls (3+3), epitepalous",
      gynoecium: "Tricarpellary, syncarpous, superior trilocular ovary with axile placentation",
      examples: "Allium cepa (Onion), Allium sativum (Garlic), Aloe vera",
    },
  };

  const curr = families[selectedFamily];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border/80 bg-slate-950 p-6 shadow-inner text-white overflow-hidden select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                {curr.name}
              </span>
              <span className="text-xs text-slate-400">Floral Symmetry: {curr.formula.includes("⊕") ? "Actinomorphic (⊕)" : "Zygomorphic (%)"}</span>
            </div>

            {/* Floral Diagram SVG */}
            <div className="flex justify-center items-center py-4 h-[220px]">
              <svg viewBox="0 0 300 300" className="w-full max-w-[260px] h-[220px]">
                {/* Mother axis dot */}
                <circle cx="150" cy="15" r="4" fill="#f8fafc" />

                {/* Sepal Whorl (Calyx) */}
                <circle cx="150" cy="150" r="110" fill="none" stroke="#22c55e" strokeWidth="2.5" />

                {/* Petal Whorl (Corolla) */}
                <circle cx="150" cy="150" r="80" fill="none" stroke="#eab308" strokeWidth="2.5" />

                {/* Stamen Whorl (Androecium) */}
                {Array.from({ length: selectedFamily === "brassicaceae" ? 6 : selectedFamily === "fabaceae" ? 10 : 5 }).map((_, i) => {
                  const count = selectedFamily === "brassicaceae" ? 6 : selectedFamily === "fabaceae" ? 10 : 5;
                  const ang = (i * 2 * Math.PI) / count;
                  return (
                    <circle key={i} cx={150 + 52 * Math.cos(ang)} cy={150 + 52 * Math.sin(ang)} r="5" fill="#f97316" />
                  );
                })}

                {/* Gynoecium Ovary in Center */}
                <circle cx="150" cy="150" r="22" fill="#ec4899" opacity="0.4" stroke="#db2777" strokeWidth="2" />
                <circle cx="145" cy="150" r="3" fill="#f8fafc" />
                <circle cx="155" cy="150" r="3" fill="#f8fafc" />
              </svg>
            </div>

            <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs flex justify-between items-center">
              <span className="text-slate-400 font-semibold">Standard Floral Formula:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{curr.formula}</span>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3">
            <label className="text-xs font-bold text-foreground">Select Angiosperm Family:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "solanaceae", label: "Solanaceae" },
                { id: "brassicaceae", label: "Brassicaceae" },
                { id: "fabaceae", label: "Fabaceae" },
                { id: "liliaceae", label: "Liliaceae" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFamily(f.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    selectedFamily === f.id
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "border border-border hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-foreground border-b border-border/60 pb-2">
              Diagnostic Floral Characters
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-foreground">Calyx: </span>
                <span className="text-muted-foreground">{curr.calyx}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Corolla: </span>
                <span className="text-muted-foreground">{curr.corolla}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Androecium: </span>
                <span className="text-muted-foreground">{curr.androecium}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Gynoecium: </span>
                <span className="text-muted-foreground">{curr.gynoecium}</span>
              </div>
              <div className="pt-2 border-t border-border/30">
                <span className="font-semibold text-foreground">Common Plants: </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium italic">{curr.examples}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
