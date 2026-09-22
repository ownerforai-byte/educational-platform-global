"use client";

import React, { useState, useMemo } from "react";
import {
  HelpCircle,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Zap,
  FlaskConical,
  Dna,
  Atom,
  Award,
} from "lucide-react";

export interface VivaCard {
  id: string;
  subject: "physics" | "chemistry" | "biology";
  experiment: string;
  question: string;
  answer: string;
  examinerTip: string;
  difficulty: "basic" | "intermediate" | "pro";
}

const MASTER_VIVA_QUESTIONS: VivaCard[] = [
  // ==================== PHYSICS VIVA ====================
  {
    id: "phy-1",
    subject: "physics",
    experiment: "Vernier Caliper & Screw Gauge",
    question: "What is Least Count and how is it calculated for Vernier Calipers and Screw Gauge?",
    answer:
      "Least count (LC) is the smallest value that can be measured directly and accurately by an instrument. For Vernier Calipers: LC = 1 Main Scale Division (MSD) - 1 Vernier Scale Division (VSD) = 1 mm - 0.9 mm = 0.1 mm (0.01 cm). For Screw Gauge: LC = Pitch / Total Number of Circular Divisions = 1.0 mm / 100 = 0.01 mm (0.001 cm).",
    examinerTip: "Examiners often ask: 'What happens if you decrease the pitch or increase circular divisions?' Answer: The least count decreases, making the instrument more precise.",
    difficulty: "basic",
  },
  {
    id: "phy-2",
    subject: "physics",
    experiment: "Vernier Caliper & Screw Gauge",
    question: "What is Zero Error, and how is it corrected?",
    answer:
      "Zero error occurs when the zero mark of the movable scale does not coincide with the zero of the main scale when the jaws/studs are closed. Positive zero error (vernier zero to the right): measured value is too large, so it must be SUBTRACTED. Negative zero error (vernier zero to the left): measured value is too small, so its magnitude must be ADDED.",
    examinerTip: "Remember the golden rule: True Reading = Observed Reading - (± Zero Error).",
    difficulty: "basic",
  },
  {
    id: "phy-3",
    subject: "physics",
    experiment: "Simple Pendulum",
    question: "Why should the angular displacement of a simple pendulum be kept small (less than 4° to 10°)?",
    answer:
      "The formula T = 2π√(L/g) is derived assuming simple harmonic motion (SHM), which requires the restoring force to be proportional to displacement (sin θ ≈ θ in radians). For large amplitudes, sin θ ≠ θ, and the motion becomes non-linear and anharmonic, causing the period to increase with amplitude.",
    examinerTip: "State the mathematical approximation sin θ ≈ θ when θ is small in radians.",
    difficulty: "intermediate",
  },
  {
    id: "phy-4",
    subject: "physics",
    experiment: "Simple Pendulum",
    question: "How does the time period of a simple pendulum change if it is taken to the Moon or the top of Mt. Everest?",
    answer:
      "Since T = 2π√(L/g), the period T is inversely proportional to √g. On the Moon (g ≈ 1.62 m/s²) and at the top of Mt. Everest (where g is slightly lower than sea level), g decreases, hence the time period T INCREASES (the pendulum swings slower and loses time).",
    examinerTip: "Explain both the equation and whether the clock gains or loses time.",
    difficulty: "intermediate",
  },
  {
    id: "phy-5",
    subject: "physics",
    experiment: "Prism & Minimum Deviation",
    question: "What are the conditions for a prism to be in minimum deviation position?",
    answer:
      "At minimum deviation (δ = Dm): (1) Angle of incidence equals angle of emergence (i₁ = i₂ = i), (2) Angle of refraction at first surface equals angle of incidence at second surface (r₁ = r₂ = r = A/2), and (3) The refracted ray inside the prism travels parallel to its base for an equilateral prism.",
    examinerTip: "Draw or describe the symmetry of the ray passing through the prism.",
    difficulty: "pro",
  },
  {
    id: "phy-6",
    subject: "physics",
    experiment: "Resonance Tube",
    question: "What is 'End Correction' in a resonance tube, and why is it necessary?",
    answer:
      "Due to the inertia of vibrating air molecules, the displacement antinode does not form exactly at the open boundary of the pipe, but slightly outside it by a distance e = 0.3d (where d is internal diameter). Thus, the effective vibrating air column length is L = l + e.",
    examinerTip: "Formula: e = (l₂ - 3l₁) / 2 = 0.3d. Velocity v = 2f(l₂ - l₁).",
    difficulty: "pro",
  },
  {
    id: "phy-7",
    subject: "physics",
    experiment: "Meter Bridge",
    question: "Why is the null point preferred near the middle (around 50 cm) of the meter bridge wire?",
    answer:
      "The Wheatstone bridge is most sensitive when all four resistance arms (R, S, P = l, Q = 100-l) are nearly equal in magnitude. When the balance point is near 50 cm, the fractional error (Δl / l + Δl / (100-l)) in determining resistance is minimized.",
    examinerTip: "Mention Wheatstone bridge sensitivity and minimizing end resistance errors.",
    difficulty: "intermediate",
  },

  // ==================== CHEMISTRY VIVA ====================
  {
    id: "ch-1",
    subject: "chemistry",
    experiment: "Volumetric Titration",
    question: "What is the difference between an Equivalence Point and an End Point in titration?",
    answer:
      "The Equivalence Point (or stoichiometric point) is the theoretical stage at which the exact stoichiometric amount of titrant has been added to react completely with the analyte. The End Point is the practical point at which an observable physical change (such as indicator color change) signals that the reaction is complete.",
    examinerTip: "The difference between end point and equivalence point is called the Titration Error.",
    difficulty: "basic",
  },
  {
    id: "ch-2",
    subject: "chemistry",
    experiment: "Volumetric Titration",
    question: "Why is KMnO₄ called a 'Self-Indicator' and why is dilute H₂SO₄ used instead of HCl or HNO₃ in KMnO₄ titrations?",
    answer:
      "KMnO₄ acts as a self-indicator because its MnO₄⁻ ions are intense purple, while the reduced Mn²⁺ ions are nearly colorless; one extra drop of KMnO₄ imparts a permanent pale pink color. Dilute H₂SO₄ is used because HCl would be oxidized by KMnO₄ to chlorine gas (consuming extra KMnO₄), while HNO₃ is itself a strong oxidizing agent that would compete with KMnO₄.",
    examinerTip: "This is one of the most frequently asked viva questions in NEB Class 11 and 12 Chemistry.",
    difficulty: "pro",
  },
  {
    id: "ch-3",
    subject: "chemistry",
    experiment: "Preparation of Standard Solution",
    question: "What is a Primary Standard, and why can't NaOH or anhydrous HCl be used as primary standards?",
    answer:
      "A primary standard is a highly pure, stable substance with known chemical composition and high molar mass that does not absorb moisture or react with air (e.g. Oxalic acid, Anhydrous Na₂CO₃, Mohr's salt). NaOH cannot be a primary standard because it is hygroscopic and absorbs atmospheric CO₂ to form Na₂CO₃. HCl is a volatile gas dissolved in water.",
    examinerTip: "List the 4 criteria of a primary standard: 1. High purity, 2. Stability in air, 3. Non-hygroscopic, 4. High molar mass.",
    difficulty: "intermediate",
  },
  {
    id: "ch-4",
    subject: "chemistry",
    experiment: "Qualitative Salt Analysis",
    question: "Why is dilute HCl added before passing H₂S gas in Group II cation analysis?",
    answer:
      "In Group II, cations (e.g. Cu²⁺, Pb²⁺) have extremely low solubility product (Ksp) of their sulphides. Dilute HCl supplies H⁺ ions, which through the Common Ion Effect suppress the degree of ionization of the weak acid H₂S, keeping the [S²⁻] concentration low enough to precipitate ONLY Group II sulphides while preventing Group IV sulphides (Zn²⁺, Ni²⁺, Mn²⁺) from precipitating prematurely.",
    examinerTip: "Keywords to state: Common Ion Effect, Solubility Product (Ksp), Ionic Product.",
    difficulty: "pro",
  },
  {
    id: "ch-5",
    subject: "chemistry",
    experiment: "Organic Chemistry Tests",
    question: "How do you distinguish between an Aldehyde and a Ketone in the laboratory?",
    answer:
      "Aldehydes contain a readily oxidizable formyl hydrogen (-CHO) and reduce Tollens' reagent (ammoniacal AgNO₃) to form a shining Silver Mirror, and Fehling's solution to give a brick-red Cu₂O precipitate. Ketones (R-CO-R) lack this oxidizable hydrogen and give negative Tollens' and Fehling's tests.",
    examinerTip: "Mention that both aldehydes and ketones give positive 2,4-DNP (Brady's reagent) tests because both have a carbonyl group.",
    difficulty: "basic",
  },

  // ==================== BIOLOGY VIVA ====================
  {
    id: "bio-1",
    subject: "biology",
    experiment: "Microscopy & Cell Mount",
    question: "Why is a cover slip lowered onto a biological specimen slide at a 45° angle?",
    answer:
      "Lowering the cover slip gradually at a 45-degree angle using a mounted needle allows the liquid mountant (water/glycerin/stain) to spread evenly and pushes air out, preventing air bubbles from being trapped under the glass. Air bubbles appear as thick dark-ringed circles that obscure cellular structures.",
    examinerTip: "Explain why air bubbles interfere with microscopic observation (refraction artifact).",
    difficulty: "basic",
  },
  {
    id: "bio-2",
    subject: "biology",
    experiment: "Onion Root Tip Mitosis",
    question: "Why are onion root tips chosen to study mitosis, and why is acetocarmine used as the stain?",
    answer:
      "Onion root tips contain the apical meristem where cells are actively and rapidly dividing by mitosis. Acetocarmine is a basic, nuclear stain with high affinity for nucleic acids (DNA/chromatin) because of its positive charge, staining chromosomes bright pink/red while leaving the cytoplasm lightly stained for high contrast.",
    examinerTip: "Root tips are fixed in Carnoy's fluid (1:3 glacial acetic acid:ethanol) and treated with warm 1N HCl to dissolve middle lamella pectins (maceration).",
    difficulty: "intermediate",
  },
  {
    id: "bio-3",
    subject: "biology",
    experiment: "Plant Anatomy (Dicot vs Monocot)",
    question: "How can you distinguish a Dicot stem from a Monocot stem under the microscope?",
    answer:
      "1. Dicot Stem: Vascular bundles are wedge-shaped and arranged in a single ring, bundles are conjoint, collateral, OPEN (contain intrafascicular cambium), and a distinct central pith (medulla) is present. 2. Monocot Stem: Vascular bundles are oval, scattered throughout the ground tissue (closed, NO cambium), with sclerenchymatous bundle sheaths and NO distinct cortex or pith.",
    examinerTip: "The presence of cambium (open bundle) in dicots allows secondary growth.",
    difficulty: "intermediate",
  },
  {
    id: "bio-4",
    subject: "biology",
    experiment: "Potato Osmometer",
    question: "What is the difference between Endosmosis, Exosmosis, and Plasmolysis?",
    answer:
      "Endosmosis is the inward entry of water into a cell/tissue when placed in a hypotonic solution (causes turgidity). Exosmosis is the outward movement of water when placed in a hypertonic solution. Plasmolysis is the extreme shrinkage of the protoplast away from the rigid cell wall when a plant cell is kept in a hypertonic medium due to prolonged exosmosis.",
    examinerTip: "Mention the role of the selectively permeable plasma membrane and vacuolar tonoplast.",
    difficulty: "basic",
  },
  {
    id: "bio-5",
    subject: "biology",
    experiment: "Floral Taxonomy",
    question: "What is meant by a 'Tetradynamous' androecium and in which family is it found?",
    answer:
      "Tetradynamous is an arrangement of 6 stamens where the 4 inner stamens are long and the 2 outer stamens are short (2 + 4 condition). It is the diagnostic floral characteristic of the family Brassicaceae (Mustard family / Cruciferae).",
    examinerTip: "Do not confuse with 'Didynamous' (4 stamens: 2 long + 2 short, found in Lamiaceae).",
    difficulty: "pro",
  },
];

interface VivaVoceMasteryProps {
  subjectFilter?: "all" | "physics" | "chemistry" | "biology";
}

export function VivaVoceMastery({ subjectFilter = "all" }: VivaVoceMasteryProps) {
  const [selectedSubject, setSelectedSubject] = useState<"all" | "physics" | "chemistry" | "biology">(subjectFilter);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studyMode, setStudyMode] = useState<"cards" | "flashcard">("cards");
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [scoreMastered, setScoreMastered] = useState<number>(0);

  const filteredQuestions = useMemo(() => {
    return MASTER_VIVA_QUESTIONS.filter((q) => {
      const matchSubject = selectedSubject === "all" || q.subject === selectedSubject;
      const matchQuery =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.experiment.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchQuery;
    });
  }, [selectedSubject, searchQuery]);

  const currentFlashcard = filteredQuestions[flashcardIndex % Math.max(1, filteredQuestions.length)];

  const handleNextFlashcard = (knewIt: boolean) => {
    if (knewIt) setScoreMastered((s) => s + 1);
    setIsFlipped(false);
    setFlashcardIndex((i) => (i + 1) % filteredQuestions.length);
  };

  return (
    <div className="space-y-6">
      {/* Header & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              Pro Viva Voce Mastery Suite
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                25/25 Exam Readiness
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Master official NEB examiner questions, trap alerts, and scoring keys
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStudyMode("cards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              studyMode === "cards" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
            }`}
          >
            Browse Q&A List
          </button>
          <button
            onClick={() => {
              setStudyMode("flashcard");
              setFlashcardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              studyMode === "flashcard" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
            }`}
          >
            Interactive Flashcard Mode
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(["all", "physics", "chemistry", "biology"] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedSubject === sub
                  ? "bg-muted text-foreground border border-border/80 shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {sub === "all" ? "All Subjects" : sub}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px] flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search viva questions & concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs rounded-xl border border-border bg-card pl-9 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Mode 1: Interactive Flashcard Mode */}
      {studyMode === "flashcard" && currentFlashcard && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
            <span>
              Card {flashcardIndex + 1} of {filteredQuestions.length} ({currentFlashcard.subject.toUpperCase()})
            </span>
            <span className="font-semibold text-emerald-500">Mastered: {scoreMastered}</span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[280px] p-6 rounded-3xl border border-border/80 bg-gradient-to-br from-card to-card/60 shadow-xl flex flex-col justify-between transition-all hover:border-primary/40 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {currentFlashcard.experiment}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground uppercase font-bold">
                  {currentFlashcard.difficulty}
                </span>
              </div>

              {!isFlipped ? (
                <div className="py-6 space-y-3">
                  <h4 className="text-lg font-bold text-foreground leading-snug">
                    {currentFlashcard.question}
                  </h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-4">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Click anywhere on this card to flip and reveal the examiner answer
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-sm text-foreground leading-relaxed">
                    <strong className="text-emerald-500 block mb-1">Model Examiner Answer:</strong>
                    {currentFlashcard.answer}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                    <strong>Examiner Secret Tip: </strong> {currentFlashcard.examinerTip}
                  </div>
                </div>
              )}
            </div>

            <div className="text-[11px] text-muted-foreground text-center pt-2 border-t border-border/40">
              {isFlipped ? "Click to flip back to question" : "Tap card to reveal answer"}
            </div>
          </div>

          {/* Flashcard Action Buttons */}
          {isFlipped && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleNextFlashcard(false)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-500/20 transition-colors"
              >
                <XCircle className="h-4 w-4" /> Need Review
              </button>
              <button
                onClick={() => handleNextFlashcard(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4" /> I Knew It! (+1 Score)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Browse Q&A List */}
      {studyMode === "cards" && (
        <div className="space-y-3">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-border/70 bg-card hover:border-primary/30 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      q.subject === "physics"
                        ? "bg-sky-500"
                        : q.subject === "chemistry"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                  <span className="text-xs font-bold text-muted-foreground uppercase">{q.experiment}</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
                  {q.difficulty}
                </span>
              </div>

              <h4 className="text-sm font-bold text-foreground leading-snug">{q.question}</h4>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/40 text-xs text-foreground leading-relaxed">
                <strong className="text-primary block mb-1">Answer:</strong>
                {q.answer}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                <strong>Examiner Tip: </strong>
                {q.examinerTip}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
