"use client";

import React, { useEffect, useState, useMemo } from "react";
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
  Info,
} from "lucide-react";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  metal: {
    bg: "bg-blue-500/10 dark:bg-blue-950/40 hover:bg-blue-500/20",
    border: "border-blue-500/30 dark:border-blue-500/40",
    text: "text-blue-600 dark:text-blue-400",
  },
  nonmetal: {
    bg: "bg-emerald-500/10 dark:bg-emerald-950/40 hover:bg-emerald-500/20",
    border: "border-emerald-500/30 dark:border-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  metalloid: {
    bg: "bg-teal-500/10 dark:bg-teal-950/40 hover:bg-teal-500/20",
    border: "border-teal-500/30 dark:border-teal-500/40",
    text: "text-teal-600 dark:text-teal-400",
  },
};

const BLOCK_COLORS: Record<string, string> = {
  s: "text-rose-500 border-rose-500/30 bg-rose-500/10",
  p: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  d: "text-amber-500 border-amber-500/30 bg-amber-500/10",
  f: "text-purple-500 border-purple-500/30 bg-purple-500/10",
};

export function PeriodicTableView() {
  const [elements, setElements] = useState<PeriodicElement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState<string>("all");
  const [hoveredFilter, setHoveredFilter] = useState<PeriodicFilterCategory | null>(null);
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/all_elements.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load elements data");
        return res.json();
      })
      .then((data: PeriodicElement[]) => {
        setElements(data);
        if (data.length > 0) {
          // Default selection to Copper or Hydrogen for quick overview
          setSelectedElement(data.find((e) => e.symbol === "Cu") ?? data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load elements:", err);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-muted-foreground">Loading 118 Elements &amp; CEE Question Bank...</p>
      </div>
    );
  }

  const activeHoverCategory = hoveredFilter ?? activeFilter;

  return (
    <div className="space-y-6">
      {/* ── Top Bar: Title & Search ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Atom className="h-3.5 w-3.5" />
            <span>NEB &amp; CEE Chemistry Mastery</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-foreground">
            Interactive Modern Periodic Table
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
            118 elements categorized with CEE high-yield past questions, melting (ice) &amp; boiling points, electronic configurations, and block characteristics.
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search symbol, name, #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-border/70 bg-card text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
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
      </div>

      {/* ── Filter Buttons with Character Hover ────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            <span>Filter by Nature, Block, or Special Group:</span>
          </span>
          {activeFilterId !== "all" && (
            <button
              onClick={() => {
                setActiveFilterId("all");
                setHoveredFilter(null);
              }}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveFilterId("all")}
            onMouseEnter={() => setHoveredFilter(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
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
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
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

        {/* ── Character Box on Hover / Selection ─────────────────────── */}
        {activeHoverCategory && (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 space-y-3 transition-all animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary text-primary-foreground">
                  {activeHoverCategory.shortBadge}
                </span>
                <h3 className="text-sm font-bold text-foreground">
                  {activeHoverCategory.name} — Classification &amp; Character
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
                  <span>NEB &amp; CEE Traps &amp; Exceptions:</span>
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

      {/* ── Main Interactive Layout: Table Grid + Detail Side Drawer ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left / Main Table View (8 cols on XL) */}
        <div className="xl:col-span-8 overflow-x-auto pb-4">
          <div className="min-w-[760px] space-y-4">
            {/* Standard 18-group header */}
            <div className="grid grid-cols-18 gap-1 text-center text-[10px] font-bold text-muted-foreground">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i + 1} className="py-0.5">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Main 7 periods */}
            <div className="space-y-1">
              {Array.from({ length: 7 }, (_, pIdx) => {
                const period = pIdx + 1;
                return (
                  <div key={period} className="grid grid-cols-18 gap-1">
                    {Array.from({ length: 18 }, (_, gIdx) => {
                      const group = gIdx + 1;

                      // Slot for Lanthanide placeholder in Period 6, Group 3
                      if (period === 6 && group === 3) {
                        return (
                          <div
                            key="lanth-placeholder"
                            className="aspect-square rounded-lg border border-dashed border-purple-500/40 bg-purple-500/5 flex flex-col items-center justify-center text-[9px] font-bold text-purple-400 cursor-pointer hover:bg-purple-500/15"
                            onClick={() => setSelectedElement(lanthanides[0])}
                            title="Click to view Lanthanides (57-71)"
                          >
                            <span>57-71</span>
                            <span className="text-[8px] font-mono">La-Lu</span>
                          </div>
                        );
                      }

                      // Slot for Actinide placeholder in Period 7, Group 3
                      if (period === 7 && group === 3) {
                        return (
                          <div
                            key="act-placeholder"
                            className="aspect-square rounded-lg border border-dashed border-pink-500/40 bg-pink-500/5 flex flex-col items-center justify-center text-[9px] font-bold text-pink-400 cursor-pointer hover:bg-pink-500/15"
                            onClick={() => setSelectedElement(actinides[0])}
                            title="Click to view Actinides (89-103)"
                          >
                            <span>89-103</span>
                            <span className="text-[8px] font-mono">Ac-Lr</span>
                          </div>
                        );
                      }

                      const el = mainGrid[`${period}-${group}`];
                      if (!el) {
                        return <div key={`${period}-${group}`} className="aspect-square" />;
                      }

                      const isMatch = matchingAtomicNumbers.has(el.atomicNumber);
                      const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                      const catStyle = CATEGORY_COLORS[el.category] ?? CATEGORY_COLORS.metal;

                      return (
                        <button
                          key={el.atomicNumber}
                          onClick={() => setSelectedElement(el)}
                          className={`aspect-square rounded-lg border p-1 flex flex-col justify-between text-left transition-all ${
                            catStyle.bg
                          } ${catStyle.border} ${
                            isSelected
                              ? "ring-2 ring-primary scale-105 z-10 shadow-md bg-primary/20"
                              : ""
                          } ${!isMatch ? "opacity-20 grayscale pointer-events-none" : "opacity-100"}`}
                          title={`${el.name} (${el.symbol}) · #${el.atomicNumber} · ${el.block}-block`}
                        >
                          <div className="flex items-center justify-between text-[8px] leading-none text-muted-foreground font-mono">
                            <span>{el.atomicNumber}</span>
                            <span className="uppercase text-[7px]">{el.block}</span>
                          </div>

                          <div className={`text-xs font-black tracking-tight leading-none ${catStyle.text}`}>
                            {el.symbol}
                          </div>

                          <div className="text-[7px] truncate font-medium text-foreground/80 leading-none">
                            {el.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Separated Lanthanides & Actinides */}
            <div className="pt-3 space-y-1 border-t border-border/50">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-1">
                f-Block Inner Transition Elements:
              </div>

              {/* Lanthanides Series */}
              <div className="grid grid-cols-18 gap-1">
                <div className="col-span-3 flex items-center justify-end pr-2 text-[9px] font-bold text-muted-foreground">
                  Lanthanides (4f):
                </div>
                {lanthanides.map((el) => {
                  const isMatch = matchingAtomicNumbers.has(el.atomicNumber);
                  const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                  return (
                    <button
                      key={el.atomicNumber}
                      onClick={() => setSelectedElement(el)}
                      className={`aspect-square rounded-lg border border-purple-500/30 bg-purple-500/10 p-1 flex flex-col justify-between text-left transition-all hover:bg-purple-500/20 ${
                        isSelected ? "ring-2 ring-primary scale-105 z-10 shadow-md" : ""
                      } ${!isMatch ? "opacity-20 grayscale pointer-events-none" : "opacity-100"}`}
                    >
                      <div className="text-[8px] font-mono leading-none text-muted-foreground">
                        {el.atomicNumber}
                      </div>
                      <div className="text-xs font-black text-purple-400 leading-none">{el.symbol}</div>
                      <div className="text-[7px] truncate text-foreground/80 leading-none">{el.name}</div>
                    </button>
                  );
                })}
              </div>

              {/* Actinides Series */}
              <div className="grid grid-cols-18 gap-1">
                <div className="col-span-3 flex items-center justify-end pr-2 text-[9px] font-bold text-muted-foreground">
                  Actinides (5f):
                </div>
                {actinides.map((el) => {
                  const isMatch = matchingAtomicNumbers.has(el.atomicNumber);
                  const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
                  return (
                    <button
                      key={el.atomicNumber}
                      onClick={() => setSelectedElement(el)}
                      className={`aspect-square rounded-lg border border-pink-500/30 bg-pink-500/10 p-1 flex flex-col justify-between text-left transition-all hover:bg-pink-500/20 ${
                        isSelected ? "ring-2 ring-primary scale-105 z-10 shadow-md" : ""
                      } ${!isMatch ? "opacity-20 grayscale pointer-events-none" : "opacity-100"}`}
                    >
                      <div className="text-[8px] font-mono leading-none text-muted-foreground">
                        {el.atomicNumber}
                      </div>
                      <div className="text-xs font-black text-pink-400 leading-none">{el.symbol}</div>
                      <div className="text-[7px] truncate text-foreground/80 leading-none">{el.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side / Bottom Detail Drawer (4 cols on XL) ───────── */}
        <div className="xl:col-span-4">
          {selectedElement ? (
            <div className="rounded-3xl border border-border/80 bg-card shadow-lg p-6 space-y-6 sticky top-20">
              {/* Element Header */}
              <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-xs font-mono font-bold text-primary">#{selectedElement.atomicNumber}</span>
                    <span className="text-2xl font-black text-foreground">{selectedElement.symbol}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground leading-tight">{selectedElement.name}</h2>
                    <span className="text-xs text-muted-foreground">
                      Mass: <strong className="text-foreground">{selectedElement.atomicMass} u</strong>
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                        {selectedElement.subCategory || selectedElement.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${BLOCK_COLORS[selectedElement.block]}`}>
                        {selectedElement.block}-block
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-muted-foreground font-mono">
                  <div>Period: {selectedElement.period}</div>
                  <div>Group: {selectedElement.group}</div>
                </div>
              </div>

              {/* Core Physical & Electronic Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <ThermometerSnowflake className="h-3 w-3 text-cyan-400" />
                    <span>Melting (Ice) Pt:</span>
                  </span>
                  <span className="font-bold text-foreground text-xs mt-0.5 block">
                    {selectedElement.meltingPointC !== null && selectedElement.meltingPointC !== undefined
                      ? `${selectedElement.meltingPointC} °C`
                      : "N/A"}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <ThermometerSun className="h-3 w-3 text-orange-400" />
                    <span>Boiling Pt:</span>
                  </span>
                  <span className="font-bold text-foreground text-xs mt-0.5 block">
                    {selectedElement.boilingPointC !== null && selectedElement.boilingPointC !== undefined
                      ? `${selectedElement.boilingPointC} °C`
                      : "N/A"}
                  </span>
                </div>

                <div className="col-span-2 rounded-xl border border-border/60 bg-muted/20 p-2.5">
                  <span className="text-muted-foreground text-[11px] block">Electronic Configuration:</span>
                  <span className="font-mono font-bold text-foreground text-xs mt-0.5 block">
                    {selectedElement.electronConfig}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                  <span className="text-muted-foreground text-[11px] block">Oxidation States:</span>
                  <span className="font-bold text-foreground text-xs mt-0.5 block">
                    {selectedElement.oxidationStates || "N/A"}
                  </span>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                  <span className="text-muted-foreground text-[11px] block">State at STP:</span>
                  <span className="font-bold text-foreground text-xs mt-0.5 block capitalize">
                    {selectedElement.stateAtSTP}
                  </span>
                </div>
              </div>

              {/* Special High-Yield & CEE Highlights */}
              <div className="space-y-3">
                {selectedElement.highYieldNote && (
                  <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-xs space-y-1">
                    <span className="font-bold text-foreground flex items-center gap-1.5 text-primary">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>NEB High-Yield Note:</span>
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedElement.highYieldNote}
                    </p>
                  </div>
                )}

                {selectedElement.ceeTrapAlert && (
                  <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-3.5 text-xs space-y-1">
                    <span className="font-bold text-amber-500 flex items-center gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5" />
                      <span>CEE Entrance Trap Alert:</span>
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedElement.ceeTrapAlert}
                    </p>
                  </div>
                )}

                {/* CEE Past MCQs */}
                {selectedElement.ceePastMcqs && selectedElement.ceePastMcqs.length > 0 && (
                  <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-3.5 text-xs space-y-2">
                    <span className="font-bold text-sky-500 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5" />
                      <span>CEE Past MCQs:</span>
                    </span>
                    <div className="space-y-2">
                      {selectedElement.ceePastMcqs.map((mcq, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-background/80 border border-border/50 text-[11px] leading-relaxed">
                          {mcq}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NEB Past Exam Questions (PYQs) */}
                {selectedElement.pastExamQuestions && selectedElement.pastExamQuestions.length > 0 && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 text-xs space-y-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>NEB Past Exam Questions:</span>
                    </span>
                    <div className="space-y-2">
                      {selectedElement.pastExamQuestions.map((pyq, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-background/80 border border-border/50 text-[11px] leading-relaxed">
                          {pyq}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border/70 p-8 text-center text-xs text-muted-foreground">
              Select any element from the table to inspect full CEE &amp; NEB details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
