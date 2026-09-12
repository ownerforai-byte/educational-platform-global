"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  PERIODIC_FILTERS,
  type PeriodicElement,
  type PeriodicFilterCategory,
} from "@/lib/periodic-table";
import {
  Atom,
  Search,
  X,
  Sparkles,
  Flame,
  Zap,
  BookOpen,
  HelpCircle,
  ThermometerSnowflake,
  ThermometerSun,
  ShieldAlert,
  GraduationCap,
  Layers,
  ChevronRight,
  ChevronLeft,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Scale,
  Sparkle,
} from "lucide-react";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  metal: {
    bg: "bg-blue-500/10 dark:bg-blue-950/40 hover:bg-blue-500/25",
    border: "border-blue-500/30 dark:border-blue-500/50",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  nonmetal: {
    bg: "bg-emerald-500/10 dark:bg-emerald-950/40 hover:bg-emerald-500/25",
    border: "border-emerald-500/30 dark:border-emerald-500/50",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  metalloid: {
    bg: "bg-teal-500/10 dark:bg-teal-950/40 hover:bg-teal-500/25",
    border: "border-teal-500/30 dark:border-teal-500/50",
    text: "text-teal-600 dark:text-teal-400",
    badge: "bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30",
  },
};

const BLOCK_COLORS: Record<string, string> = {
  s: "text-rose-500 border-rose-500/30 bg-rose-500/10",
  p: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  d: "text-amber-500 border-amber-500/30 bg-amber-500/10",
  f: "text-purple-500 border-purple-500/30 bg-purple-500/10",
};

// Traditional Roman group labels for the 18 groups
const GROUP_ROMAN_LABELS = [
  "IA", "IIA", "IIIB", "IVB", "VB", "VIB", "VIIB",
  "VIIIB", "VIIIB", "VIIIB", "IB", "IIB",
  "IIIA", "IVA", "VA", "VIA", "VIIA", "VIIIA"
];

export function PeriodicTableView() {
  const [elements, setElements] = useState<PeriodicElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState<string>("all");
  const [hoveredFilter, setHoveredFilter] = useState<PeriodicFilterCategory | null>(null);

  // Active elements
  const [hoveredElement, setHoveredElement] = useState<PeriodicElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [activeDossierTab, setActiveDossierTab] = useState<"pyqs" | "reactions" | "facts" | "properties">("pyqs");

  const [searchQuery, setSearchQuery] = useState("");

  // Responsive Zoom / Screen Fitting
  const [zoom, setZoom] = useState<number>(1);
  const [fitScreen, setFitScreen] = useState<boolean>(true);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/all_elements.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load elements data");
        return res.json();
      })
      .then((data: PeriodicElement[]) => {
        setElements(data);
        if (data.length > 0) {
          // Default selection to Copper (Cu #29) as a prime CEE example
          const copper = data.find((e) => e.symbol === "Cu") ?? data[0];
          setSelectedElement(copper);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load elements:", err);
        setLoading(false);
      });
  }, []);

  // Screen Auto-Fit logic: automatically scale table so all 18 columns fit without overflow
  useEffect(() => {
    if (!fitScreen) return;
    const calculateScale = () => {
      if (tableContainerRef.current) {
        const containerW = tableContainerRef.current.clientWidth;
        // Base unscaled table ideal width is 1140px
        const optimalScale = Math.max(0.62, Math.min(1.15, (containerW - 24) / 1140));
        setZoom(optimalScale);
      }
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [fitScreen]);

  const activeFilter = activeFilterId !== "all" ? PERIODIC_FILTERS[activeFilterId] : null;

  // Filter & Search Logic
  const matchingAtomicNumbers = useMemo(() => {
    const set = new Set<number>();
    elements.forEach((el) => {
      const matchesFilter = !activeFilter || activeFilter.testCondition(el);
      const matchesSearch =
        !searchQuery ||
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(el.atomicNumber) === searchQuery.trim();

      if (matchesFilter && matchesSearch) {
        set.add(el.atomicNumber);
      }
    });
    return set;
  }, [elements, activeFilter, searchQuery]);

  // Main 7x18 grid elements vs Lanthanides & Actinides
  const { mainGrid, lanthanides, actinides } = useMemo(() => {
    const main: Record<string, PeriodicElement> = {};
    const lanth: PeriodicElement[] = [];
    const act: PeriodicElement[] = [];

    elements.forEach((el) => {
      if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
        lanth.push(el);
      } else if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
        act.push(el);
      } else {
        main[`${el.period}-${el.group}`] = el;
      }
    });

    lanth.sort((a, b) => a.atomicNumber - b.atomicNumber);
    act.sort((a, b) => a.atomicNumber - b.atomicNumber);

    return { mainGrid: main, lanthanides: lanth, actinides: act };
  }, [elements]);

  // The active element for inspection: hovered element takes precedence, otherwise selected
  const inspectionElement = hoveredElement || selectedElement || elements[0];

  // Navigate to previous/next element
  const handleNavigateElement = (direction: -1 | 1) => {
    if (!inspectionElement) return;
    const nextZ = inspectionElement.atomicNumber + direction;
    if (nextZ >= 1 && nextZ <= elements.length) {
      const nextEl = elements.find((e) => e.atomicNumber === nextZ);
      if (nextEl) {
        setSelectedElement(nextEl);
        setHoveredElement(null);
      }
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDossierOpen) return;
      if (e.key === "Escape") setIsDossierOpen(false);
      if (e.key === "ArrowLeft") handleNavigateElement(-1);
      if (e.key === "ArrowRight") handleNavigateElement(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDossierOpen, inspectionElement, elements]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading 118 Elements, CEE Question Bank, Hallmark Reactions &amp; Ores...
        </p>
      </div>
    );
  }

  const activeHoverCategory = hoveredFilter ?? activeFilter;

  return (
    <div className="space-y-6">
      {/* ── 1. TOP HEADER & SEARCH ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider border border-teal-500/20">
            <Atom className="h-3.5 w-3.5" />
            <span>118 Elements · CEE &amp; NEB High-Yield Syllabus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-foreground">
            Modern Periodic Table &amp; CEE Examination Bank
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 max-w-3xl">
            Hover any element to preview live electronic configurations and melting/boiling points. Click to access complete CEE past MCQs, hallmark chemical equations, and mineral ores.
          </p>
        </div>

        {/* Quick Search & Zoom Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search symbol, name, #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-7 rounded-xl border border-border/80 bg-card text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Screen Fit & Zoom Controls */}
          <div className="flex items-center gap-1 bg-card border border-border/80 rounded-xl p-1 shadow-sm text-xs">
            <button
              onClick={() => {
                setFitScreen(true);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                fitScreen
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Scale table to automatically fit inside the screen without horizontal overflow"
            >
              Fit Screen
            </button>
            <button
              onClick={() => {
                setFitScreen(false);
                setZoom((z) => Math.max(0.55, z - 0.1));
              }}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Zoom out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold px-1 text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => {
                setFitScreen(false);
                setZoom((z) => Math.min(1.4, z + 0.1));
              }}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Zoom in"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {
                setFitScreen(false);
                setZoom(1);
              }}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Reset to 100%"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. FILTER PILLS BAR ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            <span>Interactive Classification Filters:</span>
          </span>
          {activeFilterId !== "all" && (
            <button
              onClick={() => {
                setActiveFilterId("all");
                setHoveredFilter(null);
              }}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Reset to All (118)
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveFilterId("all")}
            onMouseEnter={() => setHoveredFilter(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeFilterId === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            All Elements (118)
          </button>

          {Object.values(PERIODIC_FILTERS).map((cat) => {
            const isSelected = activeFilterId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilterId(isSelected ? "all" : cat.id)}
                onMouseEnter={() => setHoveredFilter(cat)}
                onMouseLeave={() => setHoveredFilter(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                  isSelected
                    ? "bg-foreground text-background shadow-sm ring-2 ring-primary"
                    : "bg-card border border-border/70 text-foreground/80 hover:text-foreground hover:border-primary/60"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Character Box on Filter Hover/Select */}
        {activeHoverCategory && (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-3 transition-all animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary text-primary-foreground">
                  {activeHoverCategory.shortBadge}
                </span>
                <h3 className="text-sm font-bold text-foreground">
                  {activeHoverCategory.name} — Properties &amp; Examination Traps
                </h3>
              </div>
              <div className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-muted text-foreground">
                Config: {activeHoverCategory.generalElectronicConfig}
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {activeHoverCategory.oneLineSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-border/50 text-xs">
              <div>
                <span className="font-bold text-foreground block mb-1">Key Characteristics:</span>
                <ul className="space-y-1 text-muted-foreground">
                  {activeHoverCategory.keyCharacteristics.slice(0, 3).map((kc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong className="text-foreground">{kc.title}:</strong> {kc.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-amber-500 dark:text-amber-400 block mb-1 flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>NEB &amp; CEE Traps:</span>
                </span>
                <ul className="space-y-1 text-muted-foreground">
                  {activeHoverCategory.examTrapsAndExceptions.slice(0, 3).map((trap, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">⚠</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. LIVE ELEMENT INSPECTION DECK (Hover & Click Live Banner) ───── */}
      {inspectionElement && (
        <div className="rounded-3xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-4 min-w-0">
            {/* Giant Element Badge */}
            <div
              className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-md ${
                CATEGORY_COLORS[inspectionElement.category]?.border ?? "border-border"
              } ${CATEGORY_COLORS[inspectionElement.category]?.bg ?? "bg-card"}`}
            >
              <div className="flex items-center justify-between w-full px-2 text-[10px] font-mono text-muted-foreground">
                <span>#{inspectionElement.atomicNumber}</span>
                <span className="uppercase font-bold">{inspectionElement.block}</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none my-0.5">
                {inspectionElement.symbol}
              </span>
              <span className="text-[9px] font-semibold text-muted-foreground truncate px-1">
                {inspectionElement.atomicMass} u
              </span>
            </div>

            {/* Element Core Details */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground truncate">
                  {inspectionElement.name}
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    CATEGORY_COLORS[inspectionElement.category]?.badge ?? ""
                  }`}
                >
                  {inspectionElement.subCategory || inspectionElement.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-semibold">
                  Period {inspectionElement.period}, Group {inspectionElement.group} ({GROUP_ROMAN_LABELS[inspectionElement.group - 1]})
                </span>
              </div>

              {/* Electron config & physical values */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span className="font-mono text-primary font-bold">
                  Config: {inspectionElement.electronConfig}
                </span>
                <span>•</span>
                <span>
                  Melting: <strong className="text-foreground">{inspectionElement.meltingPointC ?? "N/A"} °C</strong>
                </span>
                <span>•</span>
                <span>
                  Boiling: <strong className="text-foreground">{inspectionElement.boilingPointC ?? "N/A"} °C</strong>
                </span>
                {inspectionElement.electronegativity && (
                  <>
                    <span>•</span>
                    <span>
                      Electronegativity: <strong className="text-foreground">{inspectionElement.electronegativity}</strong>
                    </span>
                  </>
                )}
              </div>

              {/* Counts Pills */}
              <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-500 font-semibold flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  {inspectionElement.ceePastMcqs?.length || 0} CEE Past MCQs
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <FlaskConical className="h-3 w-3" />
                  {inspectionElement.hallmarkReactions?.length || 0} Hallmark Reactions
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 font-semibold flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {inspectionElement.keyOresAndCompounds?.length || 0} Key Ores &amp; Compounds
                </span>
              </div>
            </div>
          </div>

          {/* Action to open full CEE Dossier */}
          <button
            onClick={() => {
              setSelectedElement(inspectionElement);
              setIsDossierOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <span>Open Full CEE Dossier (PYQs, Reactions, Facts)</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── 4. FULL PERIODIC TABLE GRID (Fit-in-Screen Scaling) ───────────── */}
      <div
        ref={tableContainerRef}
        className="rounded-3xl border border-border/80 bg-card p-3 sm:p-5 shadow-sm overflow-hidden flex flex-col items-center"
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            width: "1120px",
          }}
          className="transition-transform duration-200 select-none pb-4"
        >
          {/* Group Numbers 1-18 Header with Roman Labels */}
          <div className="grid grid-cols-18 gap-1.5 text-center text-[9px] font-bold text-muted-foreground mb-1.5">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i + 1} className="py-0.5 flex flex-col items-center">
                <span className="text-[10px] text-foreground font-mono">{i + 1}</span>
                <span className="text-[8px] text-muted-foreground font-normal">{GROUP_ROMAN_LABELS[i]}</span>
              </div>
            ))}
          </div>

          {/* Main 7 Periods */}
          <div className="space-y-1.5">
            {Array.from({ length: 7 }, (_, pIdx) => {
              const period = pIdx + 1;
              return (
                <div key={period} className="grid grid-cols-18 gap-1.5">
                  {Array.from({ length: 18 }, (_, gIdx) => {
                    const group = gIdx + 1;

                    // Lanthanide Placeholder in Period 6, Group 3
                    if (period === 6 && group === 3) {
                      return (
                        <div
                          key="lanth-placeholder"
                          onClick={() => {
                            setSelectedElement(lanthanides[0]);
                            setIsDossierOpen(true);
                          }}
                          className="aspect-square rounded-xl border border-dashed border-purple-500/50 bg-purple-500/10 flex flex-col items-center justify-center text-[10px] font-bold text-purple-400 cursor-pointer hover:bg-purple-500/20 transition-all shadow-sm"
                          title="Click to view Lanthanides (57-71)"
                        >
                          <span className="text-[9px]">57-71</span>
                          <span className="text-[9px] font-black">La-Lu</span>
                        </div>
                      );
                    }

                    // Actinide Placeholder in Period 7, Group 3
                    if (period === 7 && group === 3) {
                      return (
                        <div
                          key="act-placeholder"
                          onClick={() => {
                            setSelectedElement(actinides[0]);
                            setIsDossierOpen(true);
                          }}
                          className="aspect-square rounded-xl border border-dashed border-pink-500/50 bg-pink-500/10 flex flex-col items-center justify-center text-[10px] font-bold text-pink-400 cursor-pointer hover:bg-pink-500/20 transition-all shadow-sm"
                          title="Click to view Actinides (89-103)"
                        >
                          <span className="text-[9px]">89-103</span>
                          <span className="text-[9px] font-black">Ac-Lr</span>
                        </div>
                      );
                    }

                    const el = mainGrid[`${period}-${group}`];
                    if (!el) {
                      return <div key={`${period}-${group}`} className="aspect-square" />;
                    }

                    const isMatch = matchingAtomicNumbers.has(el.atomicNumber);
                    const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                    const isHovered = hoveredElement?.atomicNumber === el.atomicNumber;
                    const catStyle = CATEGORY_COLORS[el.category] ?? CATEGORY_COLORS.metal;

                    return (
                      <button
                        key={el.atomicNumber}
                        onClick={() => {
                          setSelectedElement(el);
                          setIsDossierOpen(true);
                        }}
                        onMouseEnter={() => setHoveredElement(el)}
                        onMouseLeave={() => setHoveredElement(null)}
                        className={`aspect-square rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all ${
                          catStyle.bg
                        } ${catStyle.border} ${
                          isHovered || isSelected
                            ? "ring-2 ring-primary scale-110 z-30 shadow-lg bg-primary/20"
                            : ""
                        } ${!isMatch ? "opacity-15 grayscale pointer-events-none" : "opacity-100"}`}
                        title={`${el.name} (${el.symbol}) · #${el.atomicNumber} · Click for CEE Questions`}
                      >
                        <div className="flex items-center justify-between text-[8px] leading-none text-muted-foreground font-mono">
                          <span className="font-bold">{el.atomicNumber}</span>
                          <span className="uppercase text-[7px] font-extrabold">{el.block}</span>
                        </div>

                        <div className={`text-sm sm:text-base font-black tracking-tight leading-none text-center ${catStyle.text}`}>
                          {el.symbol}
                        </div>

                        <div className="text-[7px] truncate font-medium text-foreground/85 leading-none text-center">
                          {el.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Separated Lanthanides & Actinides (4f & 5f Series) */}
          <div className="mt-5 pt-3 border-t border-border/60 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-1 flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              <span>f-Block Inner Transition Metals (Lanthanides &amp; Actinides):</span>
            </div>

            {/* Lanthanides */}
            <div className="grid grid-cols-18 gap-1.5">
              <div className="col-span-3 flex items-center justify-end pr-3 text-[10px] font-bold text-purple-400">
                Lanthanides (4f):
              </div>
              {lanthanides.map((el) => {
                const isMatch = matchingAtomicNumbers.has(el.atomicNumber);
                const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                const isHovered = hoveredElement?.atomicNumber === el.atomicNumber;

                return (
                  <button
                    key={el.atomicNumber}
                    onClick={() => {
                      setSelectedElement(el);
                      setIsDossierOpen(true);
                    }}
                    onMouseEnter={() => setHoveredElement(el)}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`aspect-square rounded-xl border border-purple-500/30 bg-purple-500/10 p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all hover:bg-purple-500/25 ${
                      isHovered || isSelected ? "ring-2 ring-primary scale-110 z-30 shadow-lg" : ""
                    } ${!isMatch ? "opacity-15 grayscale pointer-events-none" : "opacity-100"}`}
                  >
                    <div className="text-[8px] font-mono leading-none text-muted-foreground font-bold">
                      {el.atomicNumber}
                    </div>
                    <div className="text-sm font-black text-purple-400 leading-none text-center">
                      {el.symbol}
                    </div>
                    <div className="text-[7px] truncate text-foreground/85 leading-none text-center">
                      {el.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actinides */}
            <div className="grid grid-cols-18 gap-1.5">
              <div className="col-span-3 flex items-center justify-end pr-3 text-[10px] font-bold text-pink-400">
                Actinides (5f):
              </div>
              {actinides.map((el) => {
                const isMatch = matchingAtomicNumbers.has(el.atomicNumber);
                const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                const isHovered = hoveredElement?.atomicNumber === el.atomicNumber;

                return (
                  <button
                    key={el.atomicNumber}
                    onClick={() => {
                      setSelectedElement(el);
                      setIsDossierOpen(true);
                    }}
                    onMouseEnter={() => setHoveredElement(el)}
                    onMouseLeave={() => setHoveredElement(null)}
                    className={`aspect-square rounded-xl border border-pink-500/30 bg-pink-500/10 p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all hover:bg-pink-500/25 ${
                      isHovered || isSelected ? "ring-2 ring-primary scale-110 z-30 shadow-lg" : ""
                    } ${!isMatch ? "opacity-15 grayscale pointer-events-none" : "opacity-100"}`}
                  >
                    <div className="text-[8px] font-mono leading-none text-muted-foreground font-bold">
                      {el.atomicNumber}
                    </div>
                    <div className="text-sm font-black text-pink-400 leading-none text-center">
                      {el.symbol}
                    </div>
                    <div className="text-[7px] truncate text-foreground/85 leading-none text-center">
                      {el.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. DEEP-DIVE CEE ELEMENT DOSSIER MODAL / OVERLAY ─────────────── */}
      {isDossierOpen && selectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header Bar */}
            <div className="p-5 border-b border-border/60 bg-muted/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {/* Element Tile */}
                <div
                  className={`h-14 w-14 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-inner ${
                    CATEGORY_COLORS[selectedElement.category]?.border ?? "border-border"
                  } ${CATEGORY_COLORS[selectedElement.category]?.bg ?? "bg-card"}`}
                >
                  <span className="text-[9px] font-mono text-muted-foreground font-bold">
                    #{selectedElement.atomicNumber}
                  </span>
                  <span className="text-2xl font-black text-foreground leading-none">
                    {selectedElement.symbol}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-foreground truncate">
                      {selectedElement.name}
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        CATEGORY_COLORS[selectedElement.category]?.badge ?? ""
                      }`}
                    >
                      {selectedElement.subCategory || selectedElement.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Atomic Mass: <strong className="text-foreground">{selectedElement.atomicMass} u</strong> • Period {selectedElement.period} • Group {selectedElement.group} • {selectedElement.block}-block
                  </p>
                </div>
              </div>

              {/* Prev / Next navigation & Close */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleNavigateElement(-1)}
                  disabled={selectedElement.atomicNumber <= 1}
                  className="p-2 rounded-xl border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                  title="Previous element (Z-1)"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleNavigateElement(1)}
                  disabled={selectedElement.atomicNumber >= elements.length}
                  className="p-2 rounded-xl border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                  title="Next element (Z+1)"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="p-2 rounded-xl border border-border/70 hover:bg-rose-500/20 text-muted-foreground hover:text-rose-500 transition-colors ml-1"
                  title="Close dossier (Esc)"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center border-b border-border/60 bg-muted/10 px-5 gap-2 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveDossierTab("pyqs")}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeDossierTab === "pyqs"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>CEE Past MCQs &amp; Traps ({selectedElement.ceePastMcqs?.length || 0})</span>
              </button>
              <button
                onClick={() => setActiveDossierTab("reactions")}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeDossierTab === "reactions"
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FlaskConical className="h-4 w-4" />
                <span>Hallmark Reactions ({selectedElement.hallmarkReactions?.length || 0})</span>
              </button>
              <button
                onClick={() => setActiveDossierTab("facts")}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeDossierTab === "facts"
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Key Ores &amp; Facts ({selectedElement.keyOresAndCompounds?.length || 0})</span>
              </button>
              <button
                onClick={() => setActiveDossierTab("properties")}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeDossierTab === "properties"
                    ? "border-sky-500 text-sky-500"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Scale className="h-4 w-4" />
                <span>Physical &amp; Electronic Constants</span>
              </button>
            </div>

            {/* Dossier Body Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* ── TAB 1: CEE PAST MCQS & TRAPS ───────────────────────────── */}
              {activeDossierTab === "pyqs" && (
                <div className="space-y-4">
                  {/* CEE Trap Alert */}
                  {selectedElement.ceeTrapAlert && (
                    <div className="rounded-2xl border border-rose-500/40 bg-rose-500/5 p-4 text-xs space-y-1">
                      <span className="font-extrabold text-rose-500 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <ShieldAlert className="h-4 w-4" />
                        <span>CEE Negative Marking Trap Alert:</span>
                      </span>
                      <p className="text-foreground font-semibold leading-relaxed">
                        {selectedElement.ceeTrapAlert}
                      </p>
                    </div>
                  )}

                  {/* Future Exam Traps */}
                  {selectedElement.futureExamTraps && selectedElement.futureExamTraps.length > 0 && (
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span>Entrance Traps &amp; Anomalies:</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-foreground">
                        {selectedElement.futureExamTraps.map((tr, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold shrink-0">⚠️</span>
                            <span>{tr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CEE Past MCQs with options and answers */}
                  {selectedElement.ceePastMcqs && selectedElement.ceePastMcqs.length > 0 ? (
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-500 flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4" />
                        <span>CEE / IOM / KU / MOE Past Examination Questions:</span>
                      </span>
                      <div className="space-y-3">
                        {selectedElement.ceePastMcqs.map((mcq, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-sky-500/20 bg-muted/20 p-4 space-y-2 text-xs leading-relaxed"
                          >
                            <div className="flex items-start gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-sky-500 text-[10px] font-bold shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-foreground font-medium">{mcq}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No past MCQs recorded for this element yet.</p>
                  )}

                  {/* NEB Past Questions */}
                  {selectedElement.pastExamQuestions && selectedElement.pastExamQuestions.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        <span>NEB Class 11/12 Past Board Questions &amp; Solutions:</span>
                      </span>
                      <div className="space-y-2.5">
                        {selectedElement.pastExamQuestions.map((q, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-border/70 bg-card p-4 space-y-1.5 text-xs leading-relaxed"
                          >
                            <span className="font-bold text-primary block">NEB Question #{idx + 1}:</span>
                            <p className="text-foreground">{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CEE Speed Formulas */}
                  {selectedElement.ceeSpeedFormulas && selectedElement.ceeSpeedFormulas.length > 0 && (
                    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2 text-xs">
                      <span className="font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        <span>CEE Calculation Speed Formulas:</span>
                      </span>
                      <ul className="space-y-1 text-foreground font-mono">
                        {selectedElement.ceeSpeedFormulas.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">→</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB 2: HALLMARK CHEMICAL REACTIONS ─────────────────────── */}
              {activeDossierTab === "reactions" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <FlaskConical className="h-4 w-4" />
                    <span>Characteristic Chemical Reactions &amp; Balanced Equations:</span>
                  </span>

                  {selectedElement.hallmarkReactions && selectedElement.hallmarkReactions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedElement.hallmarkReactions.map((rxn, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                              Reaction #{idx + 1}
                            </span>
                            <Sparkle className="h-3.5 w-3.5 text-emerald-500" />
                          </div>
                          <div className="font-mono text-xs sm:text-sm font-semibold text-foreground p-3 rounded-xl bg-background/80 border border-border/50">
                            {rxn}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-xs text-muted-foreground">
                      No hallmark reaction equations listed for this element.
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB 3: ORES, MINERALS & FACTS ─────────────────────────── */}
              {activeDossierTab === "facts" && (
                <div className="space-y-4">
                  {/* High Yield Note */}
                  {selectedElement.highYieldNote && (
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-xs space-y-1.5">
                      <span className="font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Core High-Yield Note:</span>
                      </span>
                      <p className="text-foreground leading-relaxed font-medium">
                        {selectedElement.highYieldNote}
                      </p>
                    </div>
                  )}

                  {/* CEE High-Yield Summary */}
                  {selectedElement.ceeHighYieldNotes && (
                    <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4 text-xs space-y-1.5">
                      <span className="font-bold uppercase tracking-wider text-sky-500 flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>CEE Entrance High-Yield Summary:</span>
                      </span>
                      <p className="text-foreground leading-relaxed">
                        {selectedElement.ceeHighYieldNotes}
                      </p>
                    </div>
                  )}

                  {/* Key Ores & Minerals */}
                  {selectedElement.keyOresAndCompounds && selectedElement.keyOresAndCompounds.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        <span>Principal Ores, Minerals &amp; Commercial Compounds:</span>
                      </span>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {selectedElement.keyOresAndCompounds.map((ore, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl border border-amber-500/20 bg-card p-3.5 text-xs space-y-1"
                          >
                            <span className="text-amber-500 font-bold block text-[11px]">Mineral #{idx + 1}</span>
                            <p className="text-foreground font-medium leading-relaxed">{ore}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Exam Quick Rule */}
                  {selectedElement.examQuickRule && (
                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 text-xs space-y-1">
                      <span className="font-bold text-foreground">10-Second Quick Rule:</span>
                      <p className="text-muted-foreground">{selectedElement.examQuickRule}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB 4: PHYSICAL & ELECTRONIC CONSTANTS ─────────────────── */}
              {activeDossierTab === "properties" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">Electron Configuration:</span>
                      <span className="font-mono font-bold text-primary text-xs block">
                        {selectedElement.electronConfig}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">Oxidation States:</span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.oxidationStates || "N/A"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">Electronegativity:</span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.electronegativity ?? "N/A"} (Pauling)
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] flex items-center gap-1">
                        <ThermometerSnowflake className="h-3 w-3 text-cyan-400" />
                        <span>Melting Point:</span>
                      </span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.meltingPointC !== null && selectedElement.meltingPointC !== undefined
                          ? `${selectedElement.meltingPointC} °C`
                          : "N/A"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] flex items-center gap-1">
                        <ThermometerSun className="h-3 w-3 text-orange-400" />
                        <span>Boiling Point:</span>
                      </span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.boilingPointC !== null && selectedElement.boilingPointC !== undefined
                          ? `${selectedElement.boilingPointC} °C`
                          : "N/A"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">1st Ionization Energy:</span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.ionizationEnergy ? `${selectedElement.ionizationEnergy} kJ/mol` : "N/A"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">Atomic Radius:</span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.atomicRadiusPm ? `${selectedElement.atomicRadiusPm} pm` : "N/A"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">Density:</span>
                      <span className="font-bold text-foreground text-xs block">
                        {selectedElement.density || "N/A"}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                      <span className="text-muted-foreground text-[11px] block">State at STP:</span>
                      <span className="font-bold text-foreground text-xs block capitalize">
                        {selectedElement.stateAtSTP}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border/60 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-primary" />
                <span>Use keyboard arrows (← / →) to step through elements. Esc to close.</span>
              </span>
              <span className="font-semibold text-primary">
                CEE &amp; NEB Exam Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
