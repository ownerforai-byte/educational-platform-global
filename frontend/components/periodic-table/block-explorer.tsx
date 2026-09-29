"use client";

import { useState } from "react";
import {
  PERIODIC_FILTERS,
  BLOCK_FILTER_IDS,
  BLOCK_TONES,
  blockFilterIdFor,
  isBlockFilterId,
  type PeriodicElement,
} from "@/lib/periodic-table";
import {
  Layers,
  ShieldAlert,
  TrendingUp,
  GraduationCap,
  Target,
  Check,
  X,
  RotateCcw,
  Filter,
  ChevronRight,
} from "lucide-react";

interface BlockExplorerProps {
  /** All 118 elements, used for live counts and the position chips. */
  elements: PeriodicElement[];
  /** The table's current filter id ("all" when nothing is filtered). */
  activeFilterId: string;
  /** Selecting a block filters the table to that block; "all" clears it. */
  onSelectBlock: (filterId: string) => void;
  /** Opens an element's CEE dossier (used by the symbol chips). */
  onSelectElement?: (element: PeriodicElement) => void;
}

/** Drill question count per round. */
const DRILL_LENGTH = 8;

function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ────────────────────────────────────────────────────────────────────────── *
 * BLOCK DRILL — "which block does this element belong to?" exam practice.
 * ────────────────────────────────────────────────────────────────────────── */

function BlockDrill({
  elements,
  onExit,
  onSelectElement,
}: {
  elements: PeriodicElement[];
  onExit: () => void;
  onSelectElement?: (element: PeriodicElement) => void;
}) {
  const [questions, setQuestions] = useState<PeriodicElement[]>(() =>
    shuffled(elements).slice(0, DRILL_LENGTH),
  );
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const current = questions[index];
  const finished = index >= questions.length;

  const restart = () => {
    setQuestions(shuffled(elements).slice(0, DRILL_LENGTH));
    setIndex(0);
    setPicked(null);
    setScore(0);
  };

  const answer = (block: string) => {
    if (picked) return;
    setPicked(block);
    if (current && block === current.block) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setIndex((i) => i + 1);
  };

  if (!current || questions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-xs text-muted-foreground">
        Load the element list first to start the block drill.
      </div>
    );
  }

  if (finished) {
    const perfect = score === questions.length;
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3 text-center animate-fade-in">
        <Target className="h-6 w-6 mx-auto text-primary" />
        <p className="text-sm font-extrabold text-foreground">
          Score: {score} / {questions.length}
          <span className="block text-[11px] font-semibold text-muted-foreground mt-0.5">
            {perfect
              ? "Perfect — every block identified. Move on to configs."
              : "Recheck the boundary elements: H/He, Ga/Ge, La/Ac, Zn/Cu."}
          </span>
        </p>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={restart}
            className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Play again</span>
          </button>
          <button
            onClick={onExit}
            className="px-3 py-1.5 rounded-xl border border-border/70 text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            Back to block notes
          </button>
        </div>
      </div>
    );
  }

  const correct = picked === current.block;
  const tone = BLOCK_TONES[current.block];

  return (
    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5" />
          <span>Block Drill — Question {index + 1} / {questions.length}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-muted-foreground">
            Score {score}
          </span>
          <button
            onClick={onExit}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Close drill"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`h-14 w-14 rounded-2xl border flex flex-col items-center justify-center ${tone.bg} ${tone.border}`}
        >
          <span className="text-[9px] font-mono text-muted-foreground font-bold">
            #{current.atomicNumber}
          </span>
          <span className={`text-2xl font-black leading-none ${tone.text}`}>
            {current.symbol}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-foreground">{current.name}</p>
          <p className="text-[11px] text-muted-foreground">
            Period {current.period} • Group {current.group} • {current.electronConfig}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BLOCK_FILTER_IDS.map((id) => {
          const block = id.charAt(0);
          const bTone = BLOCK_TONES[block];
          const isPicked = picked === block;
          const isAnswer = current.block === block;
          let state = "border-border/70 bg-card text-foreground hover:border-primary/60";
          if (isPicked && correct) state = `${bTone.bg} border-emerald-500 text-emerald-600 dark:text-emerald-400`;
          else if (isPicked) state = "bg-rose-500/10 border-rose-500 text-rose-500";
          else if (isAnswer) state = `${bTone.bg} border-emerald-500/60 text-emerald-600 dark:text-emerald-400`;
          return (
            <button
              key={id}
              onClick={() => answer(block)}
              disabled={Boolean(picked)}
              className={`px-3 py-2.5 rounded-xl border-2 text-xs font-extrabold uppercase transition-all ${state}`}
            >
              {block}-block
              {isPicked && isAnswer && <Check className="h-3.5 w-3.5 inline ml-1" />}
              {isPicked && !isAnswer && <X className="h-3.5 w-3.5 inline ml-1" />}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="rounded-xl border border-border/70 bg-card p-3 space-y-1.5 text-xs animate-fade-in">
          <p className="font-bold text-foreground">
            {correct ? "Correct — " : "Not quite — "}
            <span className={tone.text}>
              {current.name} is a {current.block}-block element
            </span>
            <span className="text-muted-foreground font-normal">
              {" "}({current.electronConfig}).
            </span>
          </p>
          {!correct && (
            <p className="text-muted-foreground">
              {PERIODIC_FILTERS[blockFilterIdFor(current.block)]?.oneLineSummary}
            </p>
          )}
          <div className="flex items-center justify-between pt-1">
            {onSelectElement ? (
              <button
                onClick={() => onSelectElement(current)}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Open {current.symbol} CEE dossier</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            ) : (
              <span />
            )}
            <button
              onClick={next}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold"
            >
              {index + 1 === questions.length ? "See result" : "Next question"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── *
 * BLOCK EXPLORER
 * ────────────────────────────────────────────────────────────────────────── */

export function BlockExplorer({
  elements,
  activeFilterId,
  onSelectBlock,
  onSelectElement,
}: BlockExplorerProps) {
  const [localTab, setLocalTab] = useState<string>("s_block");
  const [drillOpen, setDrillOpen] = useState(false);

  // The explorer follows the table when a block filter is active, and keeps its
  // own tab when the table is filtered to something else (or to nothing).
  const activeTab = isBlockFilterId(activeFilterId) ? activeFilterId : localTab;
  const filter = PERIODIC_FILTERS[activeTab];
  const block = activeTab.charAt(0);
  const tone = BLOCK_TONES[block] ?? BLOCK_TONES.s;

  const stats = elements.filter((el) => filter?.testCondition(el));
  const metals = stats.filter((el) => el.category === "metal").length;
  const nonmetals = stats.filter((el) => el.category === "nonmetal").length;
  const metalloids = stats.filter((el) => el.category === "metalloid").length;
  const solids = stats.filter((el) => el.stateAtSTP === "solid").length;
  const liquids = stats.filter((el) => el.stateAtSTP === "liquid").length;
  const gases = stats.filter((el) => el.stateAtSTP === "gas").length;
  const periods = [...new Set(stats.map((el) => el.period))].sort((a, b) => a - b);
  const minZ = stats.length ? Math.min(...stats.map((el) => el.atomicNumber)) : null;
  const maxZ = stats.length ? Math.max(...stats.map((el) => el.atomicNumber)) : null;

  const isFilteredHere = activeFilterId === activeTab;

  const pickBlock = (id: string) => {
    setLocalTab(id);
    setDrillOpen(false);
    onSelectBlock(activeFilterId === id ? "all" : id);
  };

  return (
    <section className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-3 sm:p-4 space-y-3 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500 text-[10px] font-bold uppercase tracking-wider border border-violet-500/20">
              <Layers className="h-3 w-3" />
              <span>s · p · d · f</span>
            </div>
            <h2 className="text-sm sm:text-base font-black tracking-tight text-foreground">
              Block Explorer — Full Characteristics &amp; CEE Details
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 max-w-3xl">
            Every block's electron configuration, position, characteristics, periodic trends,
            exam traps and high-frequency CEE facts — plus a drill to test yourself.
          </p>
        </div>

        <button
          onClick={() => setDrillOpen((open) => !open)}
          className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all ${
            drillOpen
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/50"
          }`}
        >
          <Target className="h-3.5 w-3.5" />
          <span>{drillOpen ? "Close drill" : "Block Drill"}</span>
        </button>
      </div>

      {drillOpen && (
        <BlockDrill
          elements={elements}
          onExit={() => setDrillOpen(false)}
          onSelectElement={onSelectElement}
        />
      )}

      {/* Block tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BLOCK_FILTER_IDS.map((id) => {
          const b = id.charAt(0);
          const bTone = BLOCK_TONES[b];
          const cat = PERIODIC_FILTERS[id];
          const count = elements.filter((el) => cat.testCondition(el)).length;
          const isActive = activeTab === id;
          const isFiltering = activeFilterId === id;
          return (
            <button
              key={id}
              onClick={() => pickBlock(id)}
              title={
                isFiltering
                  ? `Showing these ${count} elements on the table — click to clear`
                  : `Show all ${count} ${b}-block elements on the table`
              }
              className={`relative px-3 py-2.5 rounded-xl border text-left transition-all ${
                isActive
                  ? `${bTone.bg} ${bTone.border} ring-2 ring-offset-0 ring-primary/40`
                  : "border-border/70 bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-lg font-black leading-none ${isActive ? bTone.text : "text-foreground"}`}>
                  {b}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {count} el.
                </span>
              </div>
              <p className="text-[10.5px] font-bold text-foreground mt-1 truncate">{cat.name}</p>
              <p className="text-[9.5px] font-mono text-muted-foreground truncate">
                {cat.generalElectronicConfig}
              </p>
              {isFiltering && (
                <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-primary border-2 border-card" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detail: configuration + position + stats */}
      <div className="rounded-2xl border border-border/70 bg-muted/20 p-3.5 sm:p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${tone.chip}`}>
            {filter?.shortBadge}
          </span>
          <h3 className="text-xs sm:text-sm font-extrabold text-foreground">
            {filter?.name} — {filter?.oneLineSummary}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-muted-foreground font-semibold">General configuration:</span>
          <span className="font-mono font-bold text-primary px-2 py-0.5 rounded bg-background border border-border/60">
            {filter?.generalElectronicConfig}
          </span>
          <span className="text-muted-foreground font-semibold">Position:</span>
          <span className="font-mono font-bold text-foreground">
            {minZ !== null && maxZ !== null
              ? minZ === maxZ
                ? `Z = ${minZ}`
                : `Z ${minZ}–${maxZ}`
              : "—"}
            {periods.length > 0 && ` • Period${periods.length > 1 ? "s" : ""} ${periods.join(", ")}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div className="rounded-xl border border-border/60 bg-card p-2.5">
            <span className="text-muted-foreground block text-[10px]">Elements</span>
            <span className="font-black text-foreground text-sm">{stats.length}</span>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-2.5">
            <span className="text-muted-foreground block text-[10px]">Metal / Metalloid / Non-metal</span>
            <span className="font-black text-foreground text-sm">
              {metals} / {metalloids} / {nonmetals}
            </span>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-2.5">
            <span className="text-muted-foreground block text-[10px]">Solid / Liquid / Gas (STP)</span>
            <span className="font-black text-foreground text-sm">
              {solids} / {liquids} / {gases}
            </span>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-2.5">
            <span className="text-muted-foreground block text-[10px]">Table filter</span>
            <button
              onClick={() => onSelectBlock(isFilteredHere ? "all" : activeTab)}
              className={`text-[11px] font-bold flex items-center gap-1 ${
                isFilteredHere ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              <Filter className="h-3 w-3" />
              <span>{isFilteredHere ? "Clear filter" : `Highlight all ${stats.length}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Characteristics + exam traps, side by side */}
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border/70 bg-card p-3.5 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            <span>All Key Characteristics ({filter?.keyCharacteristics.length ?? 0})</span>
          </span>
          <ul className="space-y-2">
            {filter?.keyCharacteristics.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-black mt-0.5 ${tone.chip}`}
                >
                  {idx + 1}
                </span>
                <span>
                  <strong className="text-foreground font-bold">{c.title}:</strong>{" "}
                  <span className="text-muted-foreground">{c.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3.5 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>All Exam Traps &amp; Exceptions ({filter?.examTrapsAndExceptions.length ?? 0})</span>
          </span>
          <ul className="space-y-2 text-xs text-foreground">
            {filter?.examTrapsAndExceptions.map((trap, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-black shrink-0 mt-0.5">⚠</span>
                <span>{trap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trend facts + CEE facts */}
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border/70 bg-card p-3.5 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Precise Periodic-Trend Facts ({filter?.periodicTrendFacts?.length ?? 0})</span>
          </span>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {filter?.periodicTrendFacts?.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-500 font-black shrink-0 mt-0.5">→</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>CEE High-Frequency Facts ({filter?.ceeFrequentFacts?.length ?? 0})</span>
          </span>
          <ul className="space-y-2 text-xs text-foreground">
            {filter?.ceeFrequentFacts?.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-black shrink-0 mt-0.5">✓</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Element chips */}
      <div className="space-y-2 pt-1 border-t border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {stats.length} {block}-block elements (click a symbol for its CEE dossier)
          </span>
          <button
            onClick={() => onSelectBlock(isFilteredHere ? "all" : activeTab)}
            className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold flex items-center gap-1.5"
          >
            <Filter className="h-3 w-3" />
            <span>{isFilteredHere ? "Show all 118" : `Show ${stats.length} on table`}</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {stats.map((el) => (
            <button
              key={el.atomicNumber}
              onClick={() => onSelectElement?.(el)}
              title={`${el.name} (#${el.atomicNumber}) — ${el.electronConfig}`}
              className={`px-1.5 py-1 rounded-lg border text-[11px] font-black leading-none transition-all hover:scale-110 ${tone.chip}`}
            >
              {el.symbol}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
