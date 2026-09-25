"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Workflow,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Filter,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowUpDown,
  GraduationCap,
  Layers,
  Code2,
} from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { getUnitConcept } from "@/lib/visual-concept-map";

export interface MindMapLeafNode {
  id: string;
  title: string;
  description: string;
  formula?: string;
  formulaLatex?: string;
  derivationSnippet?: string;
  examFact?: string;
  highYield?: boolean;
  classLevel?: "Class 11" | "Class 12" | "CEE/IOE" | "All";
  orderIndex: number;
}

export interface MindMapSubBranch {
  id: string;
  title: string;
  description: string;
  classLevel?: "Class 11" | "Class 12" | "CEE/IOE" | "All";
  orderIndex: number;
  nodes: MindMapLeafNode[];
}

export interface MindMapBranch {
  id: string;
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  angle: number; // in degrees from center
  classLevel?: "Class 11" | "Class 12" | "CEE/IOE" | "All";
  orderIndex: number;
  subBranches: MindMapSubBranch[];
  nodes: MindMapLeafNode[];
}

interface TopicMindMapProps {
  subjectSlug: string;
  topicSlug: string;
  topicTitle: string;
  unitId?: string;
  className?: string;
}

type ClassFilterType = "All" | "Class 11" | "Class 12" | "CEE/IOE";
type OrderSortType = "syllabus" | "hierarchy" | "highyield" | "alphabetical";

export function TopicMindMap({
  subjectSlug,
  topicSlug,
  topicTitle,
  unitId,
  className = "",
}: TopicMindMapProps) {
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [classFilter, setClassFilter] = useState<ClassFilterType>("All");
  const [orderSort, setOrderSort] = useState<OrderSortType>("syllabus");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedSubBranches, setCollapsedSubBranches] = useState<Record<string, boolean>>({});
  const [isMindmapFullscreen, setIsMindmapFullscreen] = useState(false);
  const mindmapRootRef = useRef<HTMLDivElement>(null);

  // ── Hold-to-expand hierarchy state ──
  // Press-and-hold a branch capsule (or its tree row) to fan out its full
  // sub-branch → leaf hierarchy on the canvas; hold again (or tap) to fold it back.
  const [heldBranches, setHeldBranches] = useState<Record<string, boolean>>({});
  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({});

  const setBranchExpanded = (id: string, next: boolean) => {
    setHeldBranches((prev) => ({ ...prev, [id]: next }));
    setExpandedBranches((prev) => ({ ...prev, [id]: next }));
  };

  const toggleBranchExpanded = (id: string) => {
    setBranchExpanded(id, !expandedBranches[id]);
  };

  useEffect(() => {
    const onFsChange = () => setIsMindmapFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleSubBranchCollapse = (subId: string) => {
    setCollapsedSubBranches((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  // Determine branches, sub-branches and educational KaTeX facts based on subject and topic
  const rawBranches: MindMapBranch[] = useMemo(() => {
    const s = subjectSlug.toLowerCase();

    // ─────────────────────────────────────────────────────────────
    // 0. UNIT-CONCEPT REGISTRY — topic-aware branches. Every syllabus
    // unit with authored concept data gets its own 3-branch mindmap
    // (definitions → laws → applications), overriding the subject-level
    // generic trees below.
    // ─────────────────────────────────────────────────────────────
    const unitConcept = getUnitConcept(unitId || "", topicSlug, topicTitle);
    if (unitConcept) return unitConcept.branches;

    // ─────────────────────────────────────────────────────────────
    // 1. BIOLOGY TOPICS
    // ─────────────────────────────────────────────────────────────
    if (s.includes("bio")) {
      return [
        {
          id: "branch-fundamentals",
          category: "Structural Anatomy & Cell Type",
          color: "#10b981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10b981",
          angle: -60,
          classLevel: "Class 11",
          orderIndex: 1,
          subBranches: [
            {
              id: "sub-bio-cell",
              title: "Cell Organelles & Compartmentalization",
              description: "Eukaryotic membrane-bound systems and prokaryotic nucleoids.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "bio-1",
                  title: "Cellular Organization",
                  description: "Eukaryotic compartmentalization with double-membrane bound organelles.",
                  formula: "Ribosome: 80S (60S + 40S)",
                  formulaLatex: "$$\\text{Ribosome}_{\\text{eukaryote}} = 80S \\; (60S + 40S), \\quad \\text{Ribosome}_{\\text{organelle}} = 70S \\; (50S + 30S)$$",
                  derivationSnippet: "Sedimentation coefficient $S = \\frac{v}{a} = 10^{-13}\\text{ s}$. The non-additive subunit combination arises because sedimentation depends on surface area and molecular friction, not simple mass summation.",
                  examFact: "NEB: 80S ribosomes in cytoplasm; 70S ribosomes inside mitochondria & plastids.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "bio-2",
                  title: "Plasma Membrane Fluidity",
                  description: "Fluid Mosaic Model (Singer & Nicolson, 1972) with lipid bilayer & integral proteins.",
                  formula: "Thickness: ~7.5 nm (75 Å)",
                  formulaLatex: "$$d \\approx 75\\text{ \\AA} = 7.5\\text{ nm}, \\quad \\Delta G_{\\text{flip-flop}} \\gg \\Delta G_{\\text{lateral}}$$",
                  derivationSnippet: "Membrane fluidity index $\\propto \\frac{\\text{cis-unsaturated fatty acids}}{\\text{saturated fatty acids} \\cdot \\text{cholesterol buffering}}$.",
                  examFact: "CEE: Phospholipids are amphipathic; polar head is hydrophilic, fatty acid tails hydrophobic.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-physiology",
          category: "Biochemical Pathways & Energy",
          color: "#0ea5e9", // Sky Cyan
          bgColor: "rgba(14, 165, 233, 0.15)",
          borderColor: "#0ea5e9",
          angle: 0,
          classLevel: "Class 11",
          orderIndex: 2,
          subBranches: [
            {
              id: "sub-bio-energetics",
              title: "Cellular Respiration & Bioenergetics",
              description: "Glycolysis in cytosol, Krebs cycle in mitochondrial matrix, oxidative phosphorylation.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "bio-3",
                  title: "Cellular Respiration & ATP",
                  description: "Glycolysis in cytosol followed by Krebs Cycle in mitochondrial matrix.",
                  formula: "Net Yield: 36–38 ATP per Glucose molecule",
                  formulaLatex: "$$\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O + 38 ATP}, \\quad \\Delta G^\\circ = -2870\\text{ kJ/mol}$$",
                  derivationSnippet: "1. Glycolysis: $2\\text{ ATP} + 2\\text{ NADH} (\\times 2.5/3) = 8\\text{ ATP}$.\\newline 2. Link Reaction: $2\\text{ NADH} = 6\\text{ ATP}$.\\newline 3. Krebs Cycle: $6\\text{ NADH} (18) + 2\\text{ FADH}_2 (4) + 2\\text{ GTP} (2) = 24\\text{ ATP}$. Total $= 38\\text{ ATP}$ (malate-aspartate shuttle).",
                  examFact: "CEE: Oxygen acts as the final electron acceptor in the Electron Transport System (ETS), forming metabolic water.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "bio-4",
                  title: "Enzyme Catalysis & Kinetics",
                  description: "Proteinaceous biocatalysts lowering activation energy without altering equilibrium.",
                  formula: "v = (Vmax · [S]) / (Km + [S])",
                  formulaLatex: "$$v = \\frac{V_{\\max}[S]}{K_m + [S]}, \\quad \\frac{1}{v} = \\frac{K_m}{V_{\\max}}\\frac{1}{[S]} + \\frac{1}{V_{\\max}}$$",
                  derivationSnippet: "Lineweaver-Burk double reciprocal plot has slope $\\frac{K_m}{V_{\\max}}$ and x-intercept $-\\frac{1}{K_m}$. Competitive inhibitors increase $K_m$ without changing $V_{\\max}$.",
                  examFact: "NEB: Km is the substrate concentration at which velocity is half of Vmax.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-genetics",
          category: "Genetic Code & Molecular Biology",
          color: "#8b5cf6", // Purple
          bgColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          angle: 60,
          classLevel: "Class 12",
          orderIndex: 3,
          subBranches: [
            {
              id: "sub-bio-dna",
              title: "Nucleic Acid Architecture",
              description: "Watson-Crick B-DNA geometry, Chargaff rules, and replication fork dynamics.",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [
                {
                  id: "bio-5",
                  title: "DNA Double Helix",
                  description: "Antiparallel strands connected by hydrogen bonds between complementary base pairs.",
                  formula: "Chargaff's Rule: [A] = [T], [G] = [C]",
                  formulaLatex: "$$\\frac{[A]+[G]}{[T]+[C]} = 1.0, \\quad \\text{Pitch} = 34\\text{ \\AA} \\text{ (10 bp/turn)}$$",
                  derivationSnippet: "Each nucleotide turn has axial rise $= 3.4\\text{ \\AA}$. Distance between adjacent base pairs $= 0.34\\text{ nm}$. Diameter of B-DNA helix $= 20\\text{ \\AA}$ ($2\\text{ nm}$).",
                  examFact: "CEE: 2 H-bonds between A=T; 3 H-bonds between G≡C. Higher GC-content raises melting temperature (Tm).",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 1,
                },
                {
                  id: "bio-6",
                  title: "Central Dogma & Transcription",
                  description: "Unidirectional flow of genetic information: DNA → mRNA → Polypeptide.",
                  formula: "DNA -> mRNA -> Protein",
                  formulaLatex: "$$\\text{DNA} \\xrightarrow{\\text{RNA Pol II}} \\text{hnRNA} \\xrightarrow{\\text{Splicing}} \\text{mRNA} \\xrightarrow{\\text{Ribosome}} \\text{Polypeptide}$$",
                  derivationSnippet: "Transcription initiation requires Pribnow box ($-10$: TATAAT) in prokaryotes and Goldberg-Hogness / TATA box ($-25$) in eukaryotes.",
                  examFact: "NEB: Reverse transcriptase (Temin & Baltimore) violates strict forward Central Dogma.",
                  highYield: false,
                  classLevel: "Class 12",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-traps",
          category: "CEE / Entrance Traps & High-Yield Exceptions",
          color: "#f59e0b", // Amber
          bgColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "#f59e0b",
          angle: 120,
          classLevel: "CEE/IOE",
          orderIndex: 4,
          subBranches: [
            {
              id: "sub-bio-traps",
              title: "Cell Division & Organelle Traps",
              description: "Exceptions in meiotic crossing over, maternal inheritance, and mammalian histology.",
              classLevel: "CEE/IOE",
              orderIndex: 1,
              nodes: [
                {
                  id: "bio-7",
                  title: "Organelle DNA Traps",
                  description: "Mitochondria and Chloroplasts possess maternal inheritance and divide by binary fission.",
                  formula: "Maternal mtDNA inheritance",
                  formulaLatex: "$$\\text{Offspring mtDNA} \\equiv \\text{Maternal mtDNA} \\quad (\\text{Non-Mendelian})$$",
                  derivationSnippet: "Sperm cell contributes only paternal nuclear genome during syngamy; paternal mitochondria in the midpiece are degraded by ubiquitin post-fertilization.",
                  examFact: "TRAP: Mature mammalian RBCs and sieve tube elements lack a nucleus, but are metabolically active!",
                  highYield: true,
                  classLevel: "CEE/IOE",
                  orderIndex: 1,
                },
                {
                  id: "bio-8",
                  title: "Meiotic Prophase I Sub-Stages",
                  description: "Recombination nodules and crossing-over occur exclusively in Pachytene stage.",
                  formula: "Order: L -> Z -> P -> D -> D",
                  formulaLatex: "$$\\text{Leptotene} \\to \\text{Zygotene} \\to \\text{Pachytene} \\to \\text{Diplotene} \\to \\text{Diakinesis}$$",
                  derivationSnippet: "Zygotene forms synaptonemal complex; Pachytene exhibits recombinase-mediated non-sister chromatid exchange; Diplotene dissolves complex revealing chiasmata.",
                  examFact: "CEE TRAP: Synaptonemal complex forms in Zygotene; Chiasmata become visible in Diplotene!",
                  highYield: true,
                  classLevel: "CEE/IOE",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-applications",
          category: "Clinical Pathology & Biotechnology",
          color: "#f43f5e", // Rose
          bgColor: "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          angle: 180,
          classLevel: "Class 12",
          orderIndex: 5,
          subBranches: [
            {
              id: "sub-bio-pcr",
              title: "Molecular Amplification & Genetic Engineering",
              description: "Polymerase Chain Reaction exponential cycles and restriction endonucleases.",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [
                {
                  id: "bio-9",
                  title: "Recombinant DNA & PCR",
                  description: "In vitro amplification of DNA fragments using Taq Polymerase from Thermus aquaticus.",
                  formula: "Amplified Copies: N = N0 · 2^n",
                  formulaLatex: "$$N_n = N_0 \\cdot 2^n, \\quad \\Delta T: 94^\\circ\\text{C} \\to 55^\\circ\\text{C} \\to 72^\\circ\\text{C}$$",
                  derivationSnippet: "After $n = 30$ thermal cycles, amplification factor is $2^{30} \\approx 1.07 \\times 10^9$ folds from a single initial double-stranded DNA template.",
                  examFact: "CEE: Taq polymerase is heat-stable and lacks 3'→5' proofreading exonuclease activity.",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 1,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-diversity",
          category: "Taxonomy & Biodiversity Hierarchies",
          color: "#059669",
          bgColor: "rgba(5, 150, 105, 0.15)",
          borderColor: "#059669",
          angle: -120,
          classLevel: "Class 11",
          orderIndex: 6,
          subBranches: [
            {
              id: "sub-bio-kingdoms",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-animalia",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-plantae",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 3,
              nodes: [],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-plant-physio",
          category: "Plant Physiology & Transport",
          color: "#65a30d",
          bgColor: "rgba(101, 163, 13, 0.15)",
          borderColor: "#65a30d",
          angle: 180,
          classLevel: "Class 11",
          orderIndex: 7,
          subBranches: [
            {
              id: "sub-bio-water",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-photosyn",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-respiration",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 3,
              nodes: [],
            },
            {
              id: "sub-bio-growth",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 4,
              nodes: [],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-human-physio",
          category: "Human Physiology Systems",
          color: "#e11d48",
          bgColor: "rgba(225, 29, 72, 0.15)",
          borderColor: "#e11d48",
          angle: 240,
          classLevel: "Class 11",
          orderIndex: 8,
          subBranches: [
            {
              id: "sub-bio-digestive",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-breathing",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-circulatory",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 3,
              nodes: [],
            },
            {
              id: "sub-bio-excretory",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 4,
              nodes: [],
            },
            {
              id: "sub-bio-muscular",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 5,
              nodes: [],
            },
            {
              id: "sub-bio-neural",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 6,
              nodes: [],
            },
            {
              id: "sub-bio-endocrine",
              title: "",
              description: "",
              classLevel: "Class 11",
              orderIndex: 7,
              nodes: [],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-reprod",
          category: "Reproduction & Developmental Biology",
          color: "#db2777",
          bgColor: "rgba(219, 39, 119, 0.15)",
          borderColor: "#db2777",
          angle: 300,
          classLevel: "Class 12",
          orderIndex: 9,
          subBranches: [
            {
              id: "sub-bio-flower",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-human-reprod",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-embryo",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 3,
              nodes: [],
            },
            {
              id: "sub-bio-contracept",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 4,
              nodes: [],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-evolution-heredity",
          category: "Evolutionary Mechanisms & Heredity Expanded",
          color: "#7c3aed",
          bgColor: "rgba(124, 58, 237, 0.15)",
          borderColor: "#7c3aed",
          angle: 180,
          classLevel: "Class 12",
          orderIndex: 10,
          subBranches: [
            {
              id: "sub-bio-mendel",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-chromosome",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-molecular-basis",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 3,
              nodes: [],
            },
            {
              id: "sub-bio-hardy-weinberg",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 4,
              nodes: [],
            },
            {
              id: "sub-bio-adaptive-radiation",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 5,
              nodes: [],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-ecology-conservation",
          category: "Ecosystem Ecology & Conservation Expanded",
          color: "#15803d",
          bgColor: "rgba(21, 128, 61, 0.15)",
          borderColor: "#15803d",
          angle: 60,
          classLevel: "Class 12",
          orderIndex: 11,
          subBranches: [
            {
              id: "sub-bio-organism-pop",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-ecosystem",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-biogeo",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 3,
              nodes: [],
            },
            {
              id: "sub-bio-biodiversity",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 4,
              nodes: [],
            },
            {
              id: "sub-bio-environ-pollut",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 5,
              nodes: [],
            },
            {
              id: "sub-bio-food-prod",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 6,
              nodes: [],
            },
            {
              id: "sub-bio-microbes",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 7,
              nodes: [],
            },
            {
              id: "sub-bio-health-disease",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 8,
              nodes: [],
            },
            {
              id: "sub-bio-biotech-princ",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 9,
              nodes: [],
            },
            {
              id: "sub-bio-biotech-app",
              title: "",
              description: "",
              classLevel: "Class 12",
              orderIndex: 10,
              nodes: [],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-cee-bio-framework",
          category: "CEE Biology Integrated Framework Block",
          color: "#b45309",
          bgColor: "rgba(180, 83, 9, 0.15)",
          borderColor: "#b45309",
          angle: -60,
          classLevel: "CEE/IOE",
          orderIndex: 12,
          subBranches: [
            {
              id: "sub-bio-cee-cell-biomol",
              title: "",
              description: "",
              classLevel: "CEE/IOE",
              orderIndex: 1,
              nodes: [],
            },
            {
              id: "sub-bio-cee-genetics-biotec",
              title: "",
              description: "",
              classLevel: "CEE/IOE",
              orderIndex: 2,
              nodes: [],
            },
            {
              id: "sub-bio-cee-physio-systems",
              title: "",
              description: "",
              classLevel: "CEE/IOE",
              orderIndex: 3,
              nodes: [],
            },
            {
              id: "sub-bio-cee-eco-evolution",
              title: "",
              description: "",
              classLevel: "CEE/IOE",
              orderIndex: 4,
              nodes: [],
            },
            {
              id: "sub-bio-cee-trap-library",
              title: "",
              description: "",
              classLevel: "CEE/IOE",
              orderIndex: 5,
              nodes: [],
            },
          ],
          nodes: [],
        },
      ];
    }

    // ─────────────────────────────────────────────────────────────
    // 2. CHEMISTRY TOPICS
    // ─────────────────────────────────────────────────────────────
    if (s.includes("chem")) {
      return [
        {
          id: "branch-fundamentals",
          category: "Atomic Structure & Quantum Mechanics",
          color: "#10b981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10b981",
          angle: -60,
          classLevel: "Class 11",
          orderIndex: 1,
          subBranches: [
            {
              id: "sub-ch-bohr",
              title: "Bohr's Orbit & De Broglie Waves",
              description: "Quantized angular momentum and hydrogen spectral emission series.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "ch-1",
                  title: "Bohr's Postulates & Radius",
                  description: "Electrons revolve only in non-radiating stationary orbits with quantized angular momentum.",
                  formula: "mvr = nh / (2π)",
                  formulaLatex: "$$mvr = \\frac{nh}{2\\pi}, \\quad r_n = 0.529\\,\\frac{n^2}{Z}\\text{ \\AA}, \\quad E_n = -13.6\\,\\frac{Z^2}{n^2}\\text{ eV}$$",
                  derivationSnippet: "Balancing Coulomb attraction with centripetal force: $\\frac{m v^2}{r} = \\frac{1}{4\\pi \\epsilon_0}\\frac{Z e^2}{r^2}$. Substituting $v = \\frac{nh}{2\\pi m r}$ yields $r_n = \\frac{n^2 h^2 \\epsilon_0}{\\pi m Z e^2}$.",
                  examFact: "CEE: Chromium (Z=24): [Ar] 3d⁵ 4s¹ and Copper (Z=29): [Ar] 3d¹⁰ 4s¹ due to exchange energy of half/full subshells.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "ch-2",
                  title: "Periodic Trends & Effective Nuclear Charge",
                  description: "Slater's shielding constant, ionization enthalpy trends, and atomic radius contractions.",
                  formula: "Z_eff = Z - σ",
                  formulaLatex: "$$Z_{\\text{eff}} = Z - \\sigma, \\quad \\text{IE}_1(\\ce{N: 2p^3}) > \\text{IE}_1(\\ce{O: 2p^4})$$",
                  derivationSnippet: "Removal of electron from stable half-filled $2p^3$ subshell requires higher energy than paired $2p^4$ electron where inter-electronic repulsion facilitates detachment.",
                  examFact: "NEB: First ionization energy of Nitrogen is greater than Oxygen due to half-filled p-orbital extra stability.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-bonding",
          category: "Chemical Bonding & Molecular Shapes",
          color: "#0ea5e9", // Sky Cyan
          bgColor: "rgba(14, 165, 233, 0.15)",
          borderColor: "#0ea5e9",
          angle: 0,
          classLevel: "Class 11",
          orderIndex: 2,
          subBranches: [
            {
              id: "sub-ch-vsepr",
              title: "Hybridization & Molecular Geometry",
              description: "Steric number formula, lone-pair repulsions, and molecular orbital bond orders.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "ch-3",
                  title: "VSEPR Theory & Steric Number",
                  description: "Electron-pair repulsions minimize potential energy to dictate bond angles.",
                  formula: "Steric No = 1/2 [V + M - C + A]",
                  formulaLatex: "$$\\text{Steric No.} = \\frac{1}{2}(V + M - C + A), \\quad \\text{Bond Order} = \\frac{N_b - N_a}{2}$$",
                  derivationSnippet: "For $\\ce{XeF4}$: Steric $= \\frac{1}{2}(8 + 4) = 6 \\implies sp^3d^2$ octahedral geometry with 2 lone pairs on axial positions, yielding a square planar shape ($90^\\circ$).",
                  examFact: "CEE: XeF₄ is sp³d² (square planar, 2 lone pairs); NH₃ is sp³ (trigonal pyramidal, 107°); H₂O is sp³ (bent, 104.5°).",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "ch-4",
                  title: "Hydrogen Bonding & Dipoles",
                  description: "Intermolecular electrostatic attraction between H and high-electronegativity elements (F, O, N).",
                  formula: "Bond Strength: 8–40 kJ/mol",
                  formulaLatex: "$$\\ce{F-H\\dots F} > \\ce{O-H\\dots O} > \\ce{N-H\\dots N}, \\quad \\mu = q \\times d$$",
                  derivationSnippet: "Boiling points follow $\\ce{H2O} (100^\\circ\\text{C}) > \\ce{HF} (19.5^\\circ\\text{C}) > \\ce{NH3} (-33^\\circ\\text{C})$. Water forms 4 hydrogen bonds per molecule in tetrahedral ice lattice.",
                  examFact: "NEB: H₂O is liquid but H₂S is gas due to extensive intermolecular hydrogen bonding in water.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-thermo",
          category: "Thermodynamics & Equilibrium",
          color: "#8b5cf6", // Purple
          bgColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          angle: 60,
          classLevel: "Class 11",
          orderIndex: 3,
          subBranches: [
            {
              id: "sub-ch-gibbs",
              title: "Gibbs Energy & Equilibrium Constant",
              description: "First and Second laws of thermodynamics, Le Chatelier shifts, and Van 't Hoff relation.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "ch-5",
                  title: "Gibbs Free Energy & Spontaneity",
                  description: "Criterion for spontaneous physical or chemical change at constant temperature and pressure.",
                  formula: "ΔG = ΔH - T·ΔS",
                  formulaLatex: "$$\\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -2.303 R T \\log_{10} K_{\\text{eq}}$$",
                  derivationSnippet: "From $dS_{\\text{univ}} = dS_{\\text{sys}} + dS_{\\text{surr}} \\ge 0$, since $dS_{\\text{surr}} = -\\frac{dH_{\\text{sys}}}{T}$, multiplying by $-T$ gives $dG = dH - TdS \\le 0$.",
                  examFact: "CEE: At standard equilibrium, ΔG° = -2.303·R·T·log(K_eq). If K > 1, ΔG° is negative (favorable).",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "ch-6",
                  title: "Le Chatelier's Principle & Kp vs Kc",
                  description: "Dynamic equilibrium shifts to counteract external changes in temperature, pressure, or concentration.",
                  formula: "Kp = Kc · (RT)^(Δng)",
                  formulaLatex: "$$K_p = K_c(RT)^{\\Delta n_g}, \\quad \\frac{d \\ln K}{dT} = \\frac{\\Delta H^\\circ}{R T^2}$$",
                  derivationSnippet: "For $\\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$, $\\Delta n_g = 2 - (1+3) = -2$. Increasing pressure shifts the equilibrium towards fewer gas moles (forward).",
                  examFact: "NEB: In Haber's process (ΔH < 0), high pressure (200 atm) and moderate temperature (450°C) with Fe/Mo catalyst maximize yield.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-traps",
          category: "High-Yield Entrance Traps & Speed Hacks",
          color: "#f59e0b", // Amber
          bgColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "#f59e0b",
          angle: 120,
          classLevel: "CEE/IOE",
          orderIndex: 4,
          subBranches: [
            {
              id: "sub-ch-traps",
              title: "Inorganic & Solution Traps",
              description: "Inert pair effect oxidation states, amphoteric oxides, and buffer pH shortcuts.",
              classLevel: "CEE/IOE",
              orderIndex: 1,
              nodes: [
                {
                  id: "ch-7",
                  title: "Inert Pair Effect Traps",
                  description: "Reluctance of valence s-electrons to participate in bonding in heavier p-block elements.",
                  formula: "Stability: Pb2+ > Pb4+ ; Tl+ > Tl3+",
                  formulaLatex: "$$\\text{Stability: } \\ce{Pb^{2+} > Pb^{4+}}, \\quad \\ce{Tl+ > Tl^{3+}}, \\quad \\ce{Bi^{3+} > Bi^{5+}}$$",
                  derivationSnippet: "Relativistic contraction of $6s$ orbitals combined with poor shielding by intervening $4f^{14}$ and $5d^{10}$ electrons holds $6s^2$ electrons tightly to the nucleus.",
                  examFact: "CEE TRAP: Pb⁴⁺ is a powerful oxidizing agent because Pb²⁺ is much more stable. Tl⁺ is more stable than Tl³⁺!",
                  highYield: true,
                  classLevel: "CEE/IOE",
                  orderIndex: 1,
                },
                {
                  id: "ch-8",
                  title: "Amphoteric Metals & Oxides",
                  description: "Oxides that react with both strong acids and strong bases to yield salt and water.",
                  formula: "ZnO + 2NaOH -> Na2ZnO2 + H2O",
                  formulaLatex: "$$\\ce{ZnO + 2NaOH -> Na2ZnO2 + H2O}, \\quad \\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}$$",
                  derivationSnippet: "Elements with intermediate electronegativities (Zn, Al, Be, Sn, Pb) dissolve in concentrated $\\ce{NaOH}$ releasing $\\ce{H2}$ gas via zincate/aluminate complex ions.",
                  examFact: "CEE TRAP: Zn, Al, Sn, Pb, Be form amphoteric oxides. Both Zn and Al dissolve in conc. NaOH releasing H₂ gas!",
                  highYield: true,
                  classLevel: "CEE/IOE",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-applications",
          category: "Industrial Metallurgy & Applied Chemistry",
          color: "#f43f5e", // Rose
          bgColor: "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          angle: 180,
          classLevel: "Class 12",
          orderIndex: 5,
          subBranches: [
            {
              id: "sub-ch-metal",
              title: "Metallurgical Principles & Extraction",
              description: "Ellingham diagrams, blast furnace iron extraction, and copper bessemerization.",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [
                {
                  id: "ch-9",
                  title: "Extraction of Iron & Slag Formation",
                  description: "Blast furnace reduction of Hematite (Fe₂O₃) with coke and limestone flux.",
                  formula: "Slag: CaO + SiO2 -> CaSiO3",
                  formulaLatex: "$$\\ce{CaO + SiO2 -> CaSiO3}\\;(\\text{slag}), \\quad \\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$$",
                  derivationSnippet: "Limestone decomposes: $\\ce{CaCO3 -> CaO + CO2}$. Basic $\\ce{CaO}$ combines with acidic silica gangue $\\ce{SiO2}$ to form fusible calcium silicate slag.",
                  examFact: "NEB: Slag is less dense than molten iron and floats on top, preventing re-oxidation of iron by the air blast.",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 1,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-organic-framework",
          category: "Organic Chemistry Expanded Families & Mechanisms",
          color: "#a16207",
          bgColor: "rgba(161, 98, 7, 0.15)",
          borderColor: "#a16207",
          angle: -120,
          classLevel: "Class 12",
          orderIndex: 6,
          subBranches: [
            {
              id: "sub-ch-goc-iupac",
              title: "GOC: Isomerism, Induction & IUPAC Nomenclature",
              description: "Electronic effects (I, +I, -I, +M, -M), hyperconjugation, four isomerism types, and IUPAC priority for naming.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "ch-o1",
                  title: "Inductive & Hyperconjugation Effects",
                  description: "Permanent electron displacement through sigma bonds; hyperconjugation stabilizes carbocations/alkenes.",
                  formula: "Effect strength: -NO2 > -F > -Cl > -CH3",
                  formulaLatex: "$$\\text{Hyperconjugation: } \\ce{C-H} \\;\\sigma \\to p \\text{ (}n\\text{ alpha-H stabilize }+\\ce{C}^{-})$$",
                  derivationSnippet: "Number of alpha-H sets carbocation stability: tert-butyl C+ (9 H) > isopropyl (6 H) > ethyl (3 H) > methyl (0 H). -I groups (NO2, F) push electron density away, +I groups (alkyl, NH2) push toward the reaction center.",
                  examFact: "CEE TRAP: Stability order of C+ = 3-methyl-3-butyl > tertiary > secondary > primary > methyl; vinyl & aryl C+ are UNSTABLE (sp2, no hyperconjugation).",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "ch-o2",
                  title: "IUPAC Naming & Isomerism Hierarchy",
                  description: "Select longest chain, number for lowest locant, name substituents; structural vs stereoisomerism.",
                  formula: "Priority: -COOH > -CHO > >C=O > -OH > -NH2",
                  formulaLatex: "$$\\text{Isomers} = \\text{Structural} + \\text{Geometrical (E/Z, cis/trans)} + \\text{Optical (R/S)}$$",
                  derivationSnippet: "Functional group determines suffix; highest priority group is both principal chain endpoint and parent suffix. Chain numbering minimizes the set of locants, not the total count.",
                  examFact: "NEB: Cis/trans requires same group on each double-bond carbon; E/Z (Cahn-Ingold-Prelog) ranks by atomic number. E = opposite sides of highest-priority group.",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
            { id: "sub-ch-reaction-intermediates", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
            { id: "sub-ch-hydrocarbons-alk", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
            { id: "sub-ch-aromatic-electrophilic", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
            { id: "sub-ch-haloalk-haloar", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
            { id: "sub-ch-alc-phen-ether", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
            { id: "sub-ch-ald-ket-carbox", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
            { id: "sub-ch-amines-amides", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
            { id: "sub-ch-biomolecules-org", title: "", description: "", classLevel: "Class 12", orderIndex: 9, nodes: [] },
            { id: "sub-ch-polymers-org", title: "", description: "", classLevel: "Class 12", orderIndex: 10, nodes: [] },
            { id: "sub-ch-chem-everyday", title: "", description: "", classLevel: "Class 12", orderIndex: 11, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-inorganic-framework",
          category: "Inorganic Chemistry Expanded — s/p/d/f + Qualitative",
          color: "#1d4ed8",
          bgColor: "rgba(29, 78, 216, 0.15)",
          borderColor: "#1d4ed8",
          angle: -180,
          classLevel: "Class 11",
          orderIndex: 7,
          subBranches: [
            { id: "sub-ch-sblock-family", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
            { id: "sub-ch-pblock-family", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
            { id: "sub-ch-pblock-gr13", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
            { id: "sub-ch-pblock-gr14", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
            { id: "sub-ch-pblock-gr15", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
            { id: "sub-ch-pblock-gr16", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
            { id: "sub-ch-pblock-gr17", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
            { id: "sub-ch-pblock-gr18", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
            { id: "sub-ch-dblock-tran", title: "", description: "", classLevel: "Class 12", orderIndex: 9, nodes: [] },
            { id: "sub-ch-fblock-inner", title: "", description: "", classLevel: "Class 12", orderIndex: 10, nodes: [] },
            { id: "sub-ch-coord-complex", title: "", description: "", classLevel: "Class 12", orderIndex: 11, nodes: [] },
            { id: "sub-ch-qual-analysis", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 12, nodes: [] },
            { id: "sub-ch-bioinorg", title: "", description: "", classLevel: "Class 11", orderIndex: 13, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-physical-chem-expanded",
          category: "Physical Chemistry Expanded — Equilibrium, Thermo, Kinetics, Electro, States",
          color: "#be123c",
          bgColor: "rgba(190, 18, 60, 0.15)",
          borderColor: "#be123c",
          angle: 240,
          classLevel: "Class 11",
          orderIndex: 8,
          subBranches: [
            { id: "sub-ch-states-matter-gas", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
            { id: "sub-ch-states-solid", title: "", description: "", classLevel: "Class 12", orderIndex: 2, nodes: [] },
            { id: "sub-ch-solutions-colloid", title: "", description: "", classLevel: "Class 12", orderIndex: 3, nodes: [] },
            { id: "sub-ch-thermodynamics-i", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
            { id: "sub-ch-thermo-ii-spontan", title: "", description: "", classLevel: "Class 11", orderIndex: 5, nodes: [] },
            { id: "sub-ch-equilibrium-chemi", title: "", description: "", classLevel: "Class 11", orderIndex: 6, nodes: [] },
            { id: "sub-ch-equilibrium-ionic", title: "", description: "", classLevel: "Class 11", orderIndex: 7, nodes: [] },
            { id: "sub-ch-redox-electrochem", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
            { id: "sub-ch-chemical-kinetics", title: "", description: "", classLevel: "Class 12", orderIndex: 9, nodes: [] },
            { id: "sub-ch-surface-adsorp", title: "", description: "", classLevel: "Class 12", orderIndex: 10, nodes: [] },
            { id: "sub-ch-nuclear-radio", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 11, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-cee-chemistry-framework",
          category: "CEE Chemistry Integrated Framework Block",
          color: "#78350f",
          bgColor: "rgba(120, 53, 15, 0.15)",
          borderColor: "#78350f",
          angle: 300,
          classLevel: "CEE/IOE",
          orderIndex: 9,
          subBranches: [
            { id: "sub-ch-cee-periodic-trend", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 1, nodes: [] },
            { id: "sub-ch-cee-bonding-vsepr", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 2, nodes: [] },
            { id: "sub-ch-cee-equilibria-buffer", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 3, nodes: [] },
            { id: "sub-ch-cee-electro-kinetics", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 4, nodes: [] },
            { id: "sub-ch-cee-org-named-react", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 5, nodes: [] },
            { id: "sub-ch-cee-inorg-salt-analysis", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 6, nodes: [] },
            { id: "sub-ch-cee-metallurgy-ore", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 7, nodes: [] },
            { id: "sub-ch-cee-exception-trap", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 8, nodes: [] },
          ],
          nodes: [],
        },
      ];
    }

    // ─────────────────────────────────────────────────────────────
    // 3. MATHEMATICS TOPICS
    // ─────────────────────────────────────────────────────────────
    if (s.includes("math")) {
      return [
        {
          id: "branch-fundamentals",
          category: "Definitions & Core Axioms",
          color: "#10b981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.15)",
          borderColor: "#10b981",
          angle: -60,
          classLevel: "Class 11",
          orderIndex: 1,
          subBranches: [
            {
              id: "sub-math-limits",
              title: "Limits, Continuity & First Principles",
              description: "Epsilon-delta definitions, standard trigonometric limits, and differentiation from first principles.",
              classLevel: "Class 11",
              orderIndex: 1,
              nodes: [
                {
                  id: "math-1",
                  title: "Limits & Continuity",
                  description: "Rigorous convergence: limit of f(x) as x approaches c equals L.",
                  formula: "lim [sin x / x] = 1 (x -> 0)",
                  formulaLatex: "$$\\lim_{x \\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0}(1+x)^{1/x} = e, \\quad \\text{LHL} = \\text{RHL} = f(c)$$",
                  derivationSnippet: "From unit circle geometry, for $0 < x < \\frac{\\pi}{2}$: $\\sin x < x < \\tan x$. Dividing by $\\sin x$ gives $1 < \\frac{x}{\\sin x} < \\frac{1}{\\cos x}$. By Squeeze Theorem, $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$.",
                  examFact: "NEB: A function is continuous at x=c iff Left Hand Limit = Right Hand Limit = f(c).",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 1,
                },
                {
                  id: "math-2",
                  title: "First Principles of Derivatives",
                  description: "Instantaneous rate of change derived from the secant limit.",
                  formula: "f'(x) = lim_{h -> 0} [f(x+h) - f(x)] / h",
                  formulaLatex: "$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}, \\quad \\frac{d}{dx}[\\sin x] = \\cos x$$",
                  derivationSnippet: "$\\frac{\\sin(x+h) - \\sin x}{h} = \\frac{2\\cos(x + h/2)\\sin(h/2)}{h} = \\cos(x + h/2) \\cdot \\frac{\\sin(h/2)}{h/2} \\to \\cos x$ as $h \\to 0$.",
                  examFact: "IOE: Geometric meaning of derivative is the slope of the tangent line to the curve at point (x, y).",
                  highYield: true,
                  classLevel: "Class 11",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-calculus",
          category: "Differential & Integral Theorems",
          color: "#0ea5e9", // Sky Cyan
          bgColor: "rgba(14, 165, 233, 0.15)",
          borderColor: "#0ea5e9",
          angle: 0,
          classLevel: "Class 12",
          orderIndex: 2,
          subBranches: [
            {
              id: "sub-math-theorems",
              title: "Mean Value Theorems & Fundamental Calculus",
              description: "Rolle's Theorem, Lagrange's MVT, Cauchy's MVT, and definite integral properties.",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [
                {
                  id: "math-3",
                  title: "Mean Value Theorem (Lagrange's MVT)",
                  description: "If f(x) is continuous on [a, b] and differentiable on (a, b), there exists c ∈ (a, b) where tangent is parallel to secant.",
                  formula: "f'(c) = [f(b) - f(a)] / (b - a)",
                  formulaLatex: "$$f'(c) = \\frac{f(b) - f(a)}{b - a}, \\quad c \\in (a, b)$$",
                  derivationSnippet: "Define auxiliary function $\\phi(x) = f(x) - f(a) - \\frac{f(b)-f(a)}{b-a}(x-a)$. Since $\\phi(a) = \\phi(b) = 0$, by Rolle's Theorem there exists $c \\in (a, b)$ where $\\phi'(c) = 0 \\implies f'(c) = \\frac{f(b)-f(a)}{b-a}$.",
                  examFact: "CEE: Rolle's Theorem is the special case of LMVT where f(a) = f(b), resulting in f'(c) = 0.",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 1,
                },
                {
                  id: "math-4",
                  title: "Fundamental Theorem of Calculus",
                  description: "Connects differentiation and integration as inverse operations for area under a curve.",
                  formula: "d/dx [∫ₐˣ f(t) dt] = f(x)",
                  formulaLatex: "$$\\frac{d}{dx}\\left[\\int_a^x f(t)\\,dt\\right] = f(x), \\quad \\int_a^b f(x)\\,dx = F(b) - F(a)$$",
                  derivationSnippet: "Leibniz Rule for differentiation under the integral: $\\frac{d}{dx}\\left[\\int_{u(x)}^{v(x)} f(t)\\,dt\\right] = f(v(x))v'(x) - f(u(x))u'(x)$.",
                  examFact: "NEB: Leibnitz Rule for differentiating under the integral sign is widely tested in Class 12.",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-vectors",
          category: "Vector Spaces & 3D Geometry",
          color: "#8b5cf6", // Purple
          bgColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          angle: 60,
          classLevel: "Class 12",
          orderIndex: 3,
          subBranches: [
            {
              id: "sub-math-3d",
              title: "Vector Products & Skew Lines",
              description: "Scalar triple products, shortest distance between skew lines, and coplanarity conditions.",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [
                {
                  id: "math-5",
                  title: "Dot & Cross Products & STP",
                  description: "Scalar product yields projection; cross product yields normal vector; scalar triple product yields parallelepiped volume.",
                  formula: "a · b = |a||b| cos θ ; a × b = |a||b| sin θ n̂",
                  formulaLatex: "$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta, \\quad \\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta\\,\\hat{n}, \\quad [\\vec{a}\\;\\vec{b}\\;\\vec{c}] = \\vec{a} \\cdot (\\vec{b} \\times \\vec{c})$$",
                  derivationSnippet: "Three vectors are coplanar if and only if their scalar triple product is zero: $[\\vec{a}\\;\\vec{b}\\;\\vec{c}] = 0$.",
                  examFact: "IOE: Condition for perpendicularity: a · b = 0; Condition for collinearity/parallelism: a × b = 0.",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 1,
                },
                {
                  id: "math-6",
                  title: "Shortest Distance Between Skew Lines",
                  description: "Perpendicular distance between non-intersecting, non-parallel lines in 3D space.",
                  formula: "d = |(a2 - a1) · (b1 × b2)| / |b1 × b2|",
                  formulaLatex: "$$d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$$",
                  derivationSnippet: "The line of shortest distance is perpendicular to both lines, hence parallel to $\\vec{b}_1 \\times \\vec{b}_2$. Distance is the scalar projection of connecting vector $(\\vec{a}_2 - \\vec{a}_1)$ along this unit normal.",
                  examFact: "NEB 5-Mark Question: If lines intersect, shortest distance d = 0.",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-traps",
          category: "IOE / CEE Exam Traps & Short Tricks",
          color: "#f59e0b", // Amber
          bgColor: "rgba(245, 158, 11, 0.15)",
          borderColor: "#f59e0b",
          angle: 120,
          classLevel: "CEE/IOE",
          orderIndex: 4,
          subBranches: [
            {
              id: "sub-math-traps",
              title: "Calculus Shortcuts & Speed Hacks",
              description: "L'Hôpital forms, King's definite integral property, and Leibniz series shortcuts.",
              classLevel: "CEE/IOE",
              orderIndex: 1,
              nodes: [
                {
                  id: "math-7",
                  title: "L'Hôpital's Indeterminate Traps",
                  description: "Applicable ONLY to indeterminate forms 0/0 or ∞/∞.",
                  formula: "lim [f(x)/g(x)] = lim [f'(x)/g'(x)]",
                  formulaLatex: "$$\\lim_{x \\to a}\\frac{f(x)}{g(x)} = \\lim_{x \\to a}\\frac{f'(x)}{g'(x)} \\quad \\left[\\text{Only for } \\frac{0}{0} \\text{ or } \\frac{\\infty}{\\infty}\\right]$$",
                  derivationSnippet: "For forms $0 \\cdot \\infty$, $1^\\infty$, or $0^0$, take natural log first: $y = f(x)^{g(x)} \\implies \\ln y = g(x) \\ln f(x) = \\frac{\\ln f(x)}{1/g(x)}$.",
                  examFact: "TRAP: Do NOT use quotient rule! Differentiate numerator and denominator independently!",
                  highYield: true,
                  classLevel: "CEE/IOE",
                  orderIndex: 1,
                },
                {
                  id: "math-8",
                  title: "King's Rule for Definite Integrals",
                  description: "Integral symmetry shortcut eliminating lengthy trigonometric substitutions.",
                  formula: "∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx",
                  formulaLatex: "$$\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx, \\quad I = \\int_0^{\\pi/2}\\frac{\\sin^n x}{\\sin^n x + \\cos^n x}\\,dx = \\frac{\\pi}{4}$$",
                  derivationSnippet: "Let $t = a + b - x \\implies dt = -dx$. Adding both integrals: $2I = \\int_a^b 1\\,dx = b - a \\implies I = \\frac{b - a}{2}$.",
                  examFact: "IOE SPEED HACK: King's rule solves 90% of periodic fraction integrals in 30 seconds!",
                  highYield: true,
                  classLevel: "CEE/IOE",
                  orderIndex: 2,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-applications",
          category: "Differential Equations & Modelling",
          color: "#f43f5e", // Rose
          bgColor: "rgba(244, 63, 94, 0.15)",
          borderColor: "#f43f5e",
          angle: 180,
          classLevel: "Class 12",
          orderIndex: 5,
          subBranches: [
            {
              id: "sub-math-ode",
              title: "First-Order Linear ODEs & Growth Models",
              description: "Integrating factor methods, separation of variables, and Newton's law of cooling.",
              classLevel: "Class 12",
              orderIndex: 1,
              nodes: [
                {
                  id: "math-9",
                  title: "Linear Differential Equations & I.F.",
                  description: "Standard first-order ODE solution via integrating factor.",
                  formula: "dy/dx + P(x)y = Q(x)",
                  formulaLatex: "$$\\frac{dy}{dx} + P(x)y = Q(x) \\implies y \\cdot e^{\\int P\\,dx} = \\int Q(x) e^{\\int P\\,dx}\\,dx + C$$",
                  derivationSnippet: "Multiplying by integrating factor $I = e^{\\int P\\,dx}$: $\\frac{d}{dx}[y \\cdot I] = Q(x) \\cdot I$. Direct integration gives the closed solution.",
                  examFact: "NEB: Integrating factor for dy/dx + P(x)y = Q(x) is I.F. = e^(∫P dx).",
                  highYield: true,
                  classLevel: "Class 12",
                  orderIndex: 1,
                },
              ],
            },
          ],
          nodes: [],
        },
        {
          id: "branch-algebra-structure",
          category: "Algebraic Structures & Abstract Algebra",
          color: "#4f46e5",
          bgColor: "rgba(79, 70, 229, 0.15)",
          borderColor: "#4f46e5",
          angle: -120,
          classLevel: "Class 11",
          orderIndex: 6,
          subBranches: [
            { id: "sub-math-sets-logic", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
            { id: "sub-math-relations-func", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
            { id: "sub-math-sequence-series", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
            { id: "sub-math-complex-numbers", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
            { id: "sub-math-quadratics-poly", title: "", description: "", classLevel: "Class 11", orderIndex: 5, nodes: [] },
            { id: "sub-math-perm-comb", title: "", description: "", classLevel: "Class 11", orderIndex: 6, nodes: [] },
            { id: "sub-math-binomial", title: "", description: "", classLevel: "Class 11", orderIndex: 7, nodes: [] },
            { id: "sub-math-matrices", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
            { id: "sub-math-determinants", title: "", description: "", classLevel: "Class 12", orderIndex: 9, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-geo-coordinate",
          category: "Geometry Expanded — Coordinate, Vector, 3D & Analytic",
          color: "#0891b2",
          bgColor: "rgba(8, 145, 178, 0.15)",
          borderColor: "#0891b2",
          angle: -180,
          classLevel: "Class 12",
          orderIndex: 7,
          subBranches: [
            { id: "sub-math-straight-lines", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
            { id: "sub-math-circles-conics", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
            { id: "sub-math-parabola-family", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
            { id: "sub-math-ellipse-hyperbola", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
            { id: "sub-math-vectors-2d", title: "", description: "", classLevel: "Class 11", orderIndex: 5, nodes: [] },
            { id: "sub-math-vectors-3d", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
            { id: "sub-math-planes-lines-3d", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
            { id: "sub-math-coord-transform", title: "", description: "", classLevel: "All", orderIndex: 8, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-trig-expansive",
          category: "Trigonometry Expanded — Identities, Inverse & Triangle",
          color: "#7c2d12",
          bgColor: "rgba(124, 45, 18, 0.15)",
          borderColor: "#7c2d12",
          angle: 240,
          classLevel: "Class 11",
          orderIndex: 8,
          subBranches: [
            { id: "sub-math-trig-ratio-ident", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
            { id: "sub-math-trig-eqns", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
            { id: "sub-math-trig-sum-diff", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
            { id: "sub-math-trig-multiple-half", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
            { id: "sub-math-trig-inverse", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
            { id: "sub-math-triangle-solution", title: "", description: "", classLevel: "Class 11", orderIndex: 6, nodes: [] },
            { id: "sub-math-height-distance", title: "", description: "", classLevel: "Class 11", orderIndex: 7, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-probability-stats",
          category: "Probability & Statistics Expanded Hierarchies",
          color: "#a16207",
          bgColor: "rgba(161, 98, 7, 0.15)",
          borderColor: "#a16207",
          angle: 300,
          classLevel: "Class 12",
          orderIndex: 9,
          subBranches: [
            { id: "sub-math-prob-axioms", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
            { id: "sub-math-baye-cond", title: "", description: "", classLevel: "Class 12", orderIndex: 2, nodes: [] },
            { id: "sub-math-random-var", title: "", description: "", classLevel: "Class 12", orderIndex: 3, nodes: [] },
            { id: "sub-math-binomial-dist", title: "", description: "", classLevel: "Class 12", orderIndex: 4, nodes: [] },
            { id: "sub-math-stats-central-tend", title: "", description: "", classLevel: "Class 11", orderIndex: 5, nodes: [] },
            { id: "sub-math-stats-dispersion", title: "", description: "", classLevel: "Class 11", orderIndex: 6, nodes: [] },
            { id: "sub-math-linear-regression", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 7, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-linear-prog-methods",
          category: "Linear Programming & Computational Methods",
          color: "#6b21a8",
          bgColor: "rgba(107, 33, 168, 0.15)",
          borderColor: "#6b21a8",
          angle: 180,
          classLevel: "Class 12",
          orderIndex: 10,
          subBranches: [
            { id: "sub-math-lp-formulation", title: "", description: "", classLevel: "Class 12", orderIndex: 1, nodes: [] },
            { id: "sub-math-lp-graphical", title: "", description: "", classLevel: "Class 12", orderIndex: 2, nodes: [] },
            { id: "sub-math-lp-simplex", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 3, nodes: [] },
            { id: "sub-math-computational-numerical", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 4, nodes: [] },
            { id: "sub-math-newton-raphson-bisection", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 5, nodes: [] },
          ],
          nodes: [],
        },
        {
          id: "branch-cee-math-framework",
          category: "CEE / IOE Mathematics Integrated Framework Block",
          color: "#9f1239",
          bgColor: "rgba(159, 18, 57, 0.15)",
          borderColor: "#9f1239",
          angle: -60,
          classLevel: "CEE/IOE",
          orderIndex: 11,
          subBranches: [
            { id: "sub-math-cee-calc-trap", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 1, nodes: [] },
            { id: "sub-math-cee-geo-vectors", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 2, nodes: [] },
            { id: "sub-math-cee-alg-trig", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 3, nodes: [] },
            { id: "sub-math-cee-prob-stat", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 4, nodes: [] },
            { id: "sub-math-cee-short-hacks", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 5, nodes: [] },
          ],
          nodes: [],
        },
      ];
    }

    // ─────────────────────────────────────────────────────────────
    // 4. PHYSICS TOPICS (Default Mechanics & Dynamics)
    // ─────────────────────────────────────────────────────────────
    return [
      {
        id: "branch-fundamentals",
        category: "Kinematics & Newton's Laws",
        color: "#10b981", // Emerald
        bgColor: "rgba(16, 185, 129, 0.15)",
        borderColor: "#10b981",
        angle: -60,
        classLevel: "Class 11",
        orderIndex: 1,
        subBranches: [
          {
            id: "sub-ph-newton",
            title: "Newton's 2nd Law & Projectile Motion",
            description: "2D trajectory, time of flight, horizontal range, and impulse-momentum theorem.",
            classLevel: "Class 11",
            orderIndex: 1,
            nodes: [
              {
                id: "ph-1",
                title: "Projectile Motion at an Angle",
                description: "Two-dimensional kinematic motion under uniform gravitational acceleration.",
                formula: "T = 2u sin θ / g ; R = u² sin 2θ / g",
                formulaLatex: "$$T = \\frac{2u\\sin\\theta}{g}, \\quad H_{\\max} = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}$$",
                derivationSnippet: "1. Vertical equation: $v_y = u\\sin\\theta - gt = 0 \\implies t_{\\text{up}} = \\frac{u\\sin\\theta}{g} \\implies T = 2t_{\\text{up}}$.\\newline 2. Horizontal: $R = u_x \\cdot T = (u\\cos\\theta)\\left(\\frac{2u\\sin\\theta}{g}\\right) = \\frac{u^2\\sin 2\\theta}{g}$. Max range occurs at $\\theta = 45^\\circ$ where $R_{\\max} = \\frac{u^2}{g} = 4H_{\\max}$.",
                examFact: "NEB: Range is identical for complementary projection angles: θ and (90° - θ).",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 1,
              },
              {
                id: "ph-2",
                title: "Friction & Angle of Repose",
                description: "Electromagnetic contact forces resolving tangential and perpendicular to interface.",
                formula: "f_s ≤ μ_s · N ; tan(θ) = μ_s",
                formulaLatex: "$$f_s \\le \\mu_s N, \\quad f_k = \\mu_k N \\; (\\mu_k < \\mu_s), \\quad \\tan\\lambda = \\mu_s = \\tan\\alpha$$",
                derivationSnippet: "At impending slip on inclined plane: $mg\\sin\\alpha = f_s = \\mu_s mg\\cos\\alpha \\implies \\tan\\alpha = \\mu_s$. Thus angle of repose $\\alpha$ equals angle of friction $\\lambda$.",
                examFact: "CEE: Friction is independent of apparent contact area; Angle of repose equals angle of friction.",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 2,
              },
            ],
          },
        ],
        nodes: [],
      },
      {
        id: "branch-energy",
        category: "Work, Energy & Conservative Fields",
        color: "#0ea5e9", // Sky Cyan
        bgColor: "rgba(14, 165, 233, 0.15)",
        borderColor: "#0ea5e9",
        angle: 0,
        classLevel: "Class 11",
        orderIndex: 2,
        subBranches: [
          {
            id: "sub-ph-work",
            title: "Work-Energy Theorem & Potential Wells",
            description: "Conservative force gradients, spring potential energy, and kinetic energy equivalence.",
            classLevel: "Class 11",
            orderIndex: 1,
            nodes: [
              {
                id: "ph-3",
                title: "Work-Kinetic Energy Theorem",
                description: "Work done by all forces equals change in kinetic energy.",
                formula: "W_total = ΔK = 1/2 m(v² - u²)",
                formulaLatex: "$$W_{\\text{total}} = \\int_{x_i}^{x_f} F_{\\text{net}}\\,dx = \\int m\\frac{dv}{dt}v\\,dt = \\int_{u}^v mv\\,dv = \\frac{1}{2}m(v^2 - u^2) = \\Delta K$$",
                derivationSnippet: "Since $F = m\\frac{dv}{dt} = mv\\frac{dv}{dx}$, integrating $F\\,dx = mv\\,dv$ from $u$ to $v$ directly yields $\\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$.",
                examFact: "IOE: Conservative forces do zero net work along any closed loop: ∮ F·dr = 0.",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 1,
              },
              {
                id: "ph-4",
                title: "Conservative Forces & Potential Gradients",
                description: "Force is the negative spatial gradient of potential energy function.",
                formula: "F = -dU/dx (Stable when d²U/dx² > 0)",
                formulaLatex: "$$\\vec{F} = -\\vec{\\nabla} U = -\\left(\\frac{\\partial U}{\\partial x}\\hat{i} + \\frac{\\partial U}{\\partial y}\\hat{j} + \\frac{\\partial U}{\\partial z}\\hat{k}\\right)$$",
                derivationSnippet: "Stable equilibrium: $\\frac{dU}{dx} = 0$ and $\\frac{d^2U}{dx^2} > 0$ (minimum potential). Unstable: $\\frac{d^2U}{dx^2} < 0$. Neutral: $\\frac{d^2U}{dx^2} = 0$.",
                examFact: "CEE: At stable equilibrium potential energy is minimum; restoring force pulls system back.",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 2,
              },
            ],
          },
        ],
        nodes: [],
      },
      {
        id: "branch-dynamics",
        category: "Circular Dynamics & Rotational Mechanics",
        color: "#8b5cf6", // Purple
        bgColor: "rgba(139, 92, 246, 0.15)",
        borderColor: "#8b5cf6",
        angle: 60,
        classLevel: "Class 11",
        orderIndex: 3,
        subBranches: [
          {
            id: "sub-ph-rot",
            title: "Banking of Roads & Moment of Inertia",
            description: "Centripetal acceleration, optimum banking speed, parallel & perpendicular axis theorems.",
            classLevel: "Class 11",
            orderIndex: 1,
            nodes: [
              {
                id: "ph-5",
                title: "Banking of Curved Tracks",
                description: "Tilting of road surface to provide centripetal force without relying on tire friction.",
                formula: "tan(θ) = v² / (rg)",
                formulaLatex: "$$\\tan\\theta = \\frac{v^2}{rg}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\mu + \\tan\\theta}{1 - \\mu\\tan\\theta}\\right)}$$",
                derivationSnippet: "Resolving forces: $N\\sin\\theta = \\frac{mv^2}{r}$ and $N\\cos\\theta = mg$. Dividing gives $\\frac{N\\sin\\theta}{N\\cos\\theta} = \\tan\\theta = \\frac{v^2}{rg}$.",
                examFact: "NEB Derivation: Optimum speed on banked road without friction is v = √(rg tan θ).",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 1,
              },
              {
                id: "ph-6",
                title: "Moment of Inertia & Conservation of L",
                description: "Rotational inertia resisting angular acceleration about a fixed axis.",
                formula: "I = Σ m r² ; τ = I·α ; L = I·ω",
                formulaLatex: "$$I = \\int r^2\\,dm, \\quad \\vec{\\tau} = I\\vec{\\alpha} = \\frac{d\\vec{L}}{dt}, \\quad I = I_{\\text{cm}} + Md^2$$",
                derivationSnippet: "Parallel Axis Theorem: $I = \\int ((x-d)^2 + y^2) dm = \\int (x^2+y^2)dm - 2d\\int x dm + d^2\\int dm = I_{\\text{cm}} + Md^2$ since $\\int x dm = 0$ at CM.",
                examFact: "CEE: Parallel axis theorem applies to all 3D bodies; Perpendicular axis theorem (Iz = Ix + Iy) applies ONLY to planar 2D laminae.",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 2,
              },
            ],
          },
        ],
        nodes: [],
      },
      {
        id: "branch-traps",
        category: "CEE / IOE Entrance Traps & Critical Limits",
        color: "#f59e0b", // Amber
        bgColor: "rgba(245, 158, 11, 0.15)",
        borderColor: "#f59e0b",
        angle: 120,
        classLevel: "CEE/IOE",
        orderIndex: 4,
        subBranches: [
          {
            id: "sub-ph-traps",
            title: "Vertical Loop & Collision Traps",
            description: "Light rod vs string critical velocities and coefficient of restitution energy losses.",
            classLevel: "CEE/IOE",
            orderIndex: 1,
            nodes: [
              {
                id: "ph-7",
                title: "Vertical Circle Critical Velocities",
                description: "Minimum speed required to complete vertical circle without slack in tension.",
                formula: "Bottom: v = √(5gr) | Top: v = √(gr)",
                formulaLatex: "$$v_{\\text{bottom}} = \\sqrt{5gr}, \\quad v_{\\text{top}} = \\sqrt{gr}, \\quad T_{\\text{bottom}} - T_{\\text{top}} = 6mg$$",
                derivationSnippet: "At top: $T + mg = \\frac{mv^2}{r} \\implies$ For $T \\ge 0$, $v_{\\text{top}} \\ge \\sqrt{gr}$. Conservation of energy between top and bottom: $\\frac{1}{2}mv_b^2 = \\frac{1}{2}mv_t^2 + mg(2r) \\implies v_b = \\sqrt{gr + 4gr} = \\sqrt{5gr}$.",
                examFact: "TRAP: If vertical loop uses a LIGHT ROD instead of a string, velocity at highest point can be zero, so v_bottom = √(4gr)!",
                highYield: true,
                classLevel: "CEE/IOE",
                orderIndex: 1,
              },
              {
                id: "ph-8",
                title: "Collisions & Energy Dissipation",
                description: "Momentum is always conserved. Kinetic energy is conserved ONLY if e = 1.",
                formula: "e = (v2 - v1) / (u1 - u2)",
                formulaLatex: "$$e = \\frac{v_2 - v_1}{u_1 - u_2}, \\quad \\Delta K_{\\text{loss}} = \\frac{1}{2}\\frac{m_1 m_2}{m_1 + m_2}(u_1 - u_2)^2(1 - e^2)$$",
                derivationSnippet: "For perfectly inelastic collision ($e = 0$), objects stick together: $v = \\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$. Energy loss $\\Delta K = \\frac{1}{2}\\mu u_{\\text{rel}}^2$ is maximal.",
                examFact: "CEE TRAP: In perfectly inelastic collision (e=0), bodies stick together, producing MAXIMUM possible kinetic energy loss!",
                highYield: true,
                classLevel: "CEE/IOE",
                orderIndex: 2,
              },
            ],
          },
        ],
        nodes: [],
      },
      {
        id: "branch-applications",
        category: "Gravitation & Orbital Dynamics",
        color: "#f43f5e", // Rose
        bgColor: "rgba(244, 63, 94, 0.15)",
        borderColor: "#f43f5e",
        angle: 180,
        classLevel: "Class 11",
        orderIndex: 5,
        subBranches: [
          {
            id: "sub-ph-orbit",
            title: "Escape Velocity & Kepler's Laws",
            description: "Energy required to unbind from gravitational potential well and orbital satellites.",
            classLevel: "Class 11",
            orderIndex: 1,
            nodes: [
              {
                id: "ph-9",
                title: "Escape Velocity & Orbital Speed",
                description: "Minimum projection speed to escape celestial gravitational field.",
                formula: "v_e = √(2GM/R) = √(2gR) ≈ 11.2 km/s",
                formulaLatex: "$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}, \\quad v_o = \\sqrt{\\frac{GM}{R}} = \\frac{v_e}{\\sqrt{2}}$$",
                derivationSnippet: "Total energy at surface $= \\frac{1}{2}mv_e^2 - \\frac{GMm}{R} = 0$ (at infinity) $\\implies v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$.",
                examFact: "CEE: Escape velocity is independent of the mass of the projected body and the projection angle!",
                highYield: true,
                classLevel: "Class 11",
                orderIndex: 1,
              },
            ],
          },
        ],
        nodes: [],
      },
      {
        id: "branch-waves-osc",
        category: "Waves, Oscillations & Acoustics Expanded",
        color: "#0d9488",
        bgColor: "rgba(13, 148, 136, 0.15)",
        borderColor: "#0d9488",
        angle: -120,
        classLevel: "Class 11",
        orderIndex: 6,
        subBranches: [
          { id: "sub-ph-shm-fundam", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
          { id: "sub-ph-shm-energy-phase", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
          { id: "sub-ph-wave-pulse-trav", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
          { id: "sub-ph-sound-longitudinal", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
          { id: "sub-ph-doppler-beats", title: "", description: "", classLevel: "Class 11", orderIndex: 5, nodes: [] },
          { id: "sub-ph-standing-harmonics", title: "", description: "", classLevel: "Class 11", orderIndex: 6, nodes: [] },
          { id: "sub-ph-interference-superpos", title: "", description: "", classLevel: "Class 11", orderIndex: 7, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-thermo-heat",
        category: "Thermal Physics & Thermodynamics Expanded",
        color: "#b45309",
        bgColor: "rgba(180, 83, 9, 0.15)",
        borderColor: "#b45309",
        angle: -180,
        classLevel: "Class 11",
        orderIndex: 7,
        subBranches: [
          { id: "sub-ph-temp-thermal-exp", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
          { id: "sub-ph-calorimetry", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
          { id: "sub-ph-heat-transfer", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
          { id: "sub-ph-kinetic-theory-gas", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
          { id: "sub-ph-thermo-laws", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
          { id: "sub-ph-carnot-cycle-eff", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
          { id: "sub-ph-ideal-real-gas", title: "", description: "", classLevel: "Class 11", orderIndex: 7, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-ray-wave-optics",
        category: "Optics — Ray & Wave Expanded Hierarchies",
        color: "#7c3aed",
        bgColor: "rgba(124, 58, 237, 0.15)",
        borderColor: "#7c3aed",
        angle: 240,
        classLevel: "Class 12",
        orderIndex: 8,
        subBranches: [
          { id: "sub-ph-reflection-curved", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
          { id: "sub-ph-refraction-plane", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
          { id: "sub-ph-prism-dispersion", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
          { id: "sub-ph-lens-combinations", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
          { id: "sub-ph-optical-instrum", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
          { id: "sub-ph-wavefront-huygens", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
          { id: "sub-ph-young-interfere", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
          { id: "sub-ph-diffraction-polar", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-electrostatics-current",
        category: "Electrostatics & Current Electricity Expanded",
        color: "#2563eb",
        bgColor: "rgba(37, 99, 235, 0.15)",
        borderColor: "#2563eb",
        angle: 300,
        classLevel: "Class 12",
        orderIndex: 9,
        subBranches: [
          { id: "sub-ph-coulomb-field", title: "", description: "", classLevel: "Class 12", orderIndex: 1, nodes: [] },
          { id: "sub-ph-gauss-potential", title: "", description: "", classLevel: "Class 12", orderIndex: 2, nodes: [] },
          { id: "sub-ph-capacitor-dielectric", title: "", description: "", classLevel: "Class 12", orderIndex: 3, nodes: [] },
          { id: "sub-ph-ohm-kirchhoff", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
          { id: "sub-ph-r-c-network", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
          { id: "sub-ph-wheatstone-meter", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
          { id: "sub-ph-potentiometer", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
          { id: "sub-ph-electric-cell-internal", title: "", description: "", classLevel: "Class 11", orderIndex: 8, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-mag-em-induction",
        category: "Magnetism, EMI & Alternating Current Expanded",
        color: "#be185d",
        bgColor: "rgba(190, 24, 93, 0.15)",
        borderColor: "#be185d",
        angle: 120,
        classLevel: "Class 12",
        orderIndex: 10,
        subBranches: [
          { id: "sub-ph-biot-savart-ampere", title: "", description: "", classLevel: "Class 12", orderIndex: 1, nodes: [] },
          { id: "sub-ph-lorentz-cyclotron", title: "", description: "", classLevel: "Class 12", orderIndex: 2, nodes: [] },
          { id: "sub-ph-magnetic-dipole", title: "", description: "", classLevel: "Class 12", orderIndex: 3, nodes: [] },
          { id: "sub-ph-ferro-para-diamag", title: "", description: "", classLevel: "Class 12", orderIndex: 4, nodes: [] },
          { id: "sub-ph-faraday-lenz-emf", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
          { id: "sub-ph-mutual-self-induct", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
          { id: "sub-ph-ac-lcr-resonance", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
          { id: "sub-ph-transformer-power", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
          { id: "sub-ph-em-wave-spectrum", title: "", description: "", classLevel: "Class 12", orderIndex: 9, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-modern-physics",
        category: "Modern Physics — Nuclear, Quantum, Solid & Electronic Expanded",
        color: "#7f1d1d",
        bgColor: "rgba(127, 29, 29, 0.15)",
        borderColor: "#7f1d1d",
        angle: -60,
        classLevel: "Class 12",
        orderIndex: 11,
        subBranches: [
          { id: "sub-ph-photoelectric", title: "", description: "", classLevel: "Class 12", orderIndex: 1, nodes: [] },
          { id: "sub-ph-bohr-hydrogen-spectra", title: "", description: "", classLevel: "Class 12", orderIndex: 2, nodes: [] },
          { id: "sub-ph-debroglie-wave", title: "", description: "", classLevel: "Class 12", orderIndex: 3, nodes: [] },
          { id: "sub-ph-atom-nucleus-model", title: "", description: "", classLevel: "Class 12", orderIndex: 4, nodes: [] },
          { id: "sub-ph-radioactivity-decay", title: "", description: "", classLevel: "Class 12", orderIndex: 5, nodes: [] },
          { id: "sub-ph-fission-fusion", title: "", description: "", classLevel: "Class 12", orderIndex: 6, nodes: [] },
          { id: "sub-ph-semiconductor-pn", title: "", description: "", classLevel: "Class 12", orderIndex: 7, nodes: [] },
          { id: "sub-ph-transistor-logic", title: "", description: "", classLevel: "Class 12", orderIndex: 8, nodes: [] },
          { id: "sub-ph-comm-systems", title: "", description: "", classLevel: "Class 12", orderIndex: 9, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-elastic-fluid-solid",
        category: "Solid Mechanics & Fluid Statics/Dynamics Expanded",
        color: "#4d7c0f",
        bgColor: "rgba(77, 124, 15, 0.15)",
        borderColor: "#4d7c0f",
        angle: 60,
        classLevel: "Class 11",
        orderIndex: 12,
        subBranches: [
          { id: "sub-ph-elastic-moduli", title: "", description: "", classLevel: "Class 11", orderIndex: 1, nodes: [] },
          { id: "sub-ph-fluid-pressure", title: "", description: "", classLevel: "Class 11", orderIndex: 2, nodes: [] },
          { id: "sub-ph-buoyancy-archimedes", title: "", description: "", classLevel: "Class 11", orderIndex: 3, nodes: [] },
          { id: "sub-ph-viscosity-stokes", title: "", description: "", classLevel: "Class 11", orderIndex: 4, nodes: [] },
          { id: "sub-ph-bernoulli-streamline", title: "", description: "", classLevel: "Class 11", orderIndex: 5, nodes: [] },
          { id: "sub-ph-surface-tension", title: "", description: "", classLevel: "Class 11", orderIndex: 6, nodes: [] },
        ],
        nodes: [],
      },
      {
        id: "branch-cee-physics-framework",
        category: "CEE / IOE Physics Integrated Framework Block",
        color: "#92400e",
        bgColor: "rgba(146, 64, 14, 0.15)",
        borderColor: "#92400e",
        angle: 0,
        classLevel: "CEE/IOE",
        orderIndex: 13,
        subBranches: [
          { id: "sub-ph-cee-mech-trap", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 1, nodes: [] },
          { id: "sub-ph-cee-electro-mag", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 2, nodes: [] },
          { id: "sub-ph-cee-modern-nuclear", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 3, nodes: [] },
          { id: "sub-ph-cee-optics-wave", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 4, nodes: [] },
          { id: "sub-ph-cee-thermo-fluid", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 5, nodes: [] },
          { id: "sub-ph-cee-short-hack", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 6, nodes: [] },
          { id: "sub-ph-cee-exception-trap", title: "", description: "", classLevel: "CEE/IOE", orderIndex: 7, nodes: [] },
        ],
        nodes: [],
      },
    ];
  }, [subjectSlug, unitId, topicSlug, topicTitle]);

  // Flatten nodes for canvas and compute filtered branches
  const branches: MindMapBranch[] = useMemo(() => {
    return rawBranches.map((b) => {
      const flattenedNodes: MindMapLeafNode[] = [];
      b.subBranches.forEach((sub) => {
        flattenedNodes.push(...sub.nodes);
      });
      return {
        ...b,
        nodes: flattenedNodes,
      };
    });
  }, [rawBranches]);

  // Filtered branches for left panel based on Class, Search, and Sorting
  const filteredTreeBranches = useMemo(() => {
    let result = branches.map((b) => {
      // Filter sub-branches & nodes
      const filteredSubs = b.subBranches
        .map((sub) => {
          const filteredNodes = sub.nodes.filter((node) => {
            // Class Filter
            if (classFilter !== "All") {
              if (node.classLevel && node.classLevel !== classFilter && node.classLevel !== "All") {
                return false;
              }
            }
            // Search Query Filter
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase();
              const matchesTitle = node.title.toLowerCase().includes(q);
              const matchesDesc = node.description.toLowerCase().includes(q);
              const matchesFormula = (node.formula || "").toLowerCase().includes(q);
              const matchesFact = (node.examFact || "").toLowerCase().includes(q);
              return matchesTitle || matchesDesc || matchesFormula || matchesFact;
            }
            return true;
          });

          return {
            ...sub,
            nodes: filteredNodes,
          };
        })
        .filter((sub) => sub.nodes.length > 0);

      return {
        ...b,
        subBranches: filteredSubs,
        totalNodesCount: filteredSubs.reduce((acc, s) => acc + s.nodes.length, 0),
      };
    }).filter((b) => b.totalNodesCount > 0);

    // Apply Sorting Order
    result.sort((a, b) => {
      if (orderSort === "alphabetical") {
        return a.category.localeCompare(b.category);
      }
      if (orderSort === "highyield") {
        return b.totalNodesCount - a.totalNodesCount;
      }
      if (orderSort === "hierarchy") {
        return a.angle - b.angle;
      }
      // default: syllabus order
      return a.orderIndex - b.orderIndex;
    });

    return result;
  }, [branches, classFilter, searchQuery, orderSort]);

  const activeBranch = branches.find((b) => b.id === activeBranchId) ?? null;
  const activeNode =
    branches
      .flatMap((b) => b.nodes)
      .find((n) => n.id === activeNodeId) ?? null;

  // Center coordinate on 1000 x 600 canvas
  const centerX = 500;
  const centerY = 300;
  const branchRadius = 240;

  // ── Hold-to-expand gesture plumbing (canvas capsules) ──
  const HOLD_MS = 350;
  const holdTimerRef = useRef<number | null>(null);
  const holdFiredRef = useRef(false);

  // ── Pan + deep zoom on the radial canvas ──
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number } | null>(null);
  const canvasPanRef = useRef<HTMLDivElement>(null);

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };
  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!panStartRef.current) return;
    setPan({ x: e.clientX - panStartRef.current.x, y: e.clientY - panStartRef.current.y });
  };
  const handleCanvasPointerUp = () => {
    panStartRef.current = null;
  };
  const handleCanvasWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setZoomLevel((z) => Math.max(0.35, Math.min(2.6, z * (e.deltaY > 0 ? 0.9 : 1.1))));
  };

  // Expand / collapse every branch's full hierarchy at once.
  const setAllBranchesHeld = (held: boolean) => {
    setHeldBranches(Object.fromEntries(filteredTreeBranches.map((b) => [b.id, held])));
    setExpandedBranches(Object.fromEntries(filteredTreeBranches.map((b) => [b.id, held])));
  };
  const heldCount = filteredTreeBranches.filter((b) => heldBranches[b.id]).length;

  /**
   * Compute the 3-level fan-out layout for a branch when it is held open:
   * sub-branch capsules orbit the branch head, leaf capsules orbit each
   * sub-branch, in deterministic syllabus order.
   */
  function computeFan(
    b: MindMapBranch,
    bx: number,
    by: number,
    rad: number,
  ): {
    subPos: { sub: MindMapSubBranch; x: number; y: number }[];
    leafPos: { node: MindMapLeafNode; x: number; y: number; subId: string }[];
  } {
    const subs = b.subBranches.filter((s) => s.nodes.length > 0);
    const subPos = subs.map((sub, i) => {
      const spread = subs.length === 1 ? 0 : (i - (subs.length - 1) / 2) * 0.42;
      const subRad = rad + spread;
      const dist = 105;
      return {
        sub,
        x: bx + Math.cos(subRad) * dist,
        y: by + Math.sin(subRad) * dist,
      };
    });

    const leafPos: { node: MindMapLeafNode; x: number; y: number; subId: string }[] = [];
    subPos.forEach(({ sub, x: sxp, y: syp }) => {
      const outward = Math.atan2(syp - by, sxp - bx);
      const leaves = sub.nodes.slice(0, 4); // cap per-sub leaves for readability
      leaves.forEach((node, li) => {
        const perp = outward + Math.PI / 2;
        const side = li % 2 === 0 ? -1 : 1;
        const row = Math.floor(li / 2);
        const lx = sxp + Math.cos(outward) * 68 + Math.cos(perp) * side * 30;
        const ly = syp + Math.sin(outward) * 68 + Math.sin(perp) * side * 30 + row * 24;
        leafPos.push({ node, x: lx, y: ly, subId: sub.id });
      });
    });
    return { subPos, leafPos };
  }

  return (
    <div ref={mindmapRootRef} className={`rounded-3xl border border-border/80 bg-[#090d16] text-slate-100 shadow-2xl overflow-hidden ${className}`}>
      {/* ── Top Header Toolbar ── */}
      <div className="px-5 py-3.5 border-b border-slate-800 bg-[#0d1322] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Toggle Left Sidebar Button */}
          <button
            onClick={() => setIsLeftPanelOpen((prev) => !prev)}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              isLeftPanelOpen
                ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
            }`}
            title={isLeftPanelOpen ? "Collapse Tree & Filter Panel" : "Expand Tree & Filter Panel"}
          >
            {isLeftPanelOpen ? (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span className="hidden sm:inline">Hide Explorer</span>
              </>
            ) : (
              <>
                <PanelLeftOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Show Explorer</span>
              </>
            )}
          </button>

          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm">
            <Workflow className="h-4 w-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                KaTeX Science Blueprint
              </span>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {topicTitle}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              Branch &bull; Sub-Branch &bull; Leaf Node Hierarchy with step-by-step LaTeX derivations
            </p>
          </div>
        </div>

        {/* Toolbar Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setAllBranchesHeld(true)}
            className={`rounded-lg border px-2 py-1.5 font-bold transition-colors ${
              heldCount === filteredTreeBranches.length && heldCount > 0
                ? "border-slate-700 bg-slate-800/50 text-slate-500"
                : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
            }`}
            title="Fan out every branch's full hierarchy at once"
          >
            <span className="hidden sm:inline">Expand all</span>
            <span className="sm:hidden">+</span>
          </button>
          <button
            onClick={() => setAllBranchesHeld(false)}
            className={`rounded-lg border px-2 py-1.5 font-bold transition-colors ${
              heldCount === 0
                ? "border-slate-700 bg-slate-800/50 text-slate-500"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            }`}
            title="Fold all branches back to their trunks"
          >
            <span className="hidden sm:inline">Collapse all</span>
            <span className="sm:hidden">−</span>
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.6, z + 0.1))}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.35, z - 0.1))}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setPan({ x: 0, y: 0 });
              setActiveBranchId(null);
              setActiveNodeId(null);
            }}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Canvas View"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (document.fullscreenElement) void document.exitFullscreen();
              else void mindmapRootRef.current?.requestFullscreen?.();
            }}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isMindmapFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isMindmapFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ── Main Workspace: Collapsible Left Panel + Interactive SVG Canvas ── */}
      <div className="flex flex-col lg:flex-row min-h-[580px]">
        {/* ── Left Panel: Class Filter, Order Sorting, Tree Navigator with KaTeX ── */}
        {isLeftPanelOpen && (
          <aside className="w-full lg:w-84 xl:w-96 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#0a0f1d] flex flex-col p-4 max-h-[640px] overflow-y-auto">
            {/* Panel Top Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Mindmap Explorer
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {filteredTreeBranches.reduce((acc, b) => acc + b.totalNodesCount, 0)} Concepts
              </span>
            </div>

            {/* Live Search Input */}
            <div className="mt-3 relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, laws, or topics..."
                className="w-full rounded-xl bg-slate-900 border border-slate-700/80 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-[10px] text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Class Level Selector */}
            <div className="mt-3 space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <GraduationCap className="h-3 w-3 text-cyan-400" />
                Class / Curriculum
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(["All", "Class 11", "Class 12", "CEE/IOE"] as ClassFilterType[]).map((cf) => {
                  const isActive = classFilter === cf;
                  return (
                    <button
                      key={cf}
                      onClick={() => setClassFilter(cf)}
                      className={`px-1.5 py-1 rounded-lg text-[10px] font-bold transition-all text-center truncate ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }`}
                    >
                      {cf}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order & Sorting Controls */}
            <div className="mt-3 space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="h-3 w-3 text-amber-400" />
                Hierarchy &amp; Order
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: "syllabus", label: "Syllabus Order" },
                  { id: "highyield", label: "High-Yield First" },
                  { id: "hierarchy", label: "Branch Depth" },
                  { id: "alphabetical", label: "Alphabetical" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setOrderSort(opt.id as OrderSortType)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all text-left truncate ${
                      orderSort === opt.id
                        ? "bg-slate-800 border border-indigo-500/50 text-indigo-300 font-bold"
                        : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    &bull; {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tree Navigator: Branch -> Sub-Branch -> Leaf Nodes with KaTeX Preview */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3 flex-1 overflow-y-auto">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tree Structure (Branch &rarr; Sub-Branch)
              </div>

              {filteredTreeBranches.map((b) => {
                const isBranchActive = activeBranchId === b.id;

                return (
                  <div
                    key={`tree-branch-${b.id}`}
                    className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden"
                  >
                    {/* Branch Title Bar */}
                    <div
                      onPointerDown={() => {
                        holdTimerRef.current = window.setTimeout(() => {
                          holdFiredRef.current = true;
                          setBranchExpanded(b.id, true);
                        }, HOLD_MS);
                      }}
                      onPointerUp={() => {
                        if (holdTimerRef.current !== null) {
                          window.clearTimeout(holdTimerRef.current);
                          holdTimerRef.current = null;
                        }
                        if (holdFiredRef.current) {
                          holdFiredRef.current = false;
                          setBranchExpanded(b.id, false);
                        } else {
                          setActiveBranchId(isBranchActive ? null : b.id);
                          setActiveNodeId(null);
                          toggleBranchExpanded(b.id);
                        }
                      }}
                      onPointerLeave={() => {
                        if (holdTimerRef.current !== null) {
                          window.clearTimeout(holdTimerRef.current);
                          holdTimerRef.current = null;
                        }
                      }}
                      className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition-colors select-none touch-none"
                      style={{ borderLeft: `3px solid ${b.color}` }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                        <span className="text-xs font-bold text-white truncate">{b.category}</span>
                      </div>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
                        style={{ backgroundColor: `${b.color}20`, color: b.color }}
                      >
                        {b.totalNodesCount} nodes
                      </span>
                    </div>

                    {/* Sub-Branches List */}
                    <div className="px-2 pb-2 space-y-2">
                      {b.subBranches.map((sub) => {
                        const isCollapsed = collapsedSubBranches[sub.id];

                        return (
                          <div
                            key={`tree-sub-${sub.id}`}
                            className="rounded-lg bg-slate-950/80 border border-slate-800/60 p-2"
                          >
                            <div
                              onClick={() => toggleSubBranchCollapse(sub.id)}
                              className="flex items-center justify-between cursor-pointer text-slate-300 hover:text-white"
                            >
                              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                                {isCollapsed ? (
                                  <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                                ) : (
                                  <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
                                )}
                                <span className="truncate">{sub.title}</span>
                              </div>
                              <span className="text-[9px] text-slate-500 font-mono">
                                {sub.nodes.length}
                              </span>
                            </div>

                            {/* Leaf Nodes under Sub-Branch */}
                            {!isCollapsed && (
                              <div className="mt-1.5 pl-4 border-l border-slate-800 space-y-1">
                                {sub.nodes.map((node) => {
                                  const isNodeActive = activeNodeId === node.id;

                                  return (
                                    <div
                                      key={`tree-node-${node.id}`}
                                      onClick={() => {
                                        setActiveBranchId(b.id);
                                        setActiveNodeId(node.id);
                                      }}
                                      className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                        isNodeActive
                                          ? "bg-indigo-600/30 border border-indigo-500/60 shadow-sm"
                                          : "hover:bg-slate-800/60 border border-transparent"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-[11px] font-medium text-slate-200 truncate">
                                          {node.title}
                                        </span>
                                        {node.highYield && (
                                          <span className="text-[8px] uppercase font-extrabold px-1 rounded bg-amber-500/20 text-amber-300 shrink-0">
                                            CEE Trap
                                          </span>
                                        )}
                                      </div>

                                      {/* KaTeX formula snippet in tree */}
                                      {node.formulaLatex && (
                                        <div className="mt-0.5 text-[10px] text-cyan-300 font-mono overflow-hidden">
                                          <MathMarkdown content={node.formulaLatex} className="text-[10px] py-0 leading-tight" />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredTreeBranches.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500">
                  No concepts match the selected filters or search query.
                </div>
              )}
            </div>
          </aside>
        )}

        {/* ── Main Canvas Area (Dark Blueprint Non-White Design) ── */}
        <div
          ref={canvasPanRef}
          className="relative flex-1 min-w-0 bg-[#070b14] overflow-hidden select-none"
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerUp}
          onPointerLeave={handleCanvasPointerUp}
          onWheel={handleCanvasWheel}
          style={{ cursor: panStartRef.current ? "grabbing" : "grab" }}
        >
          {/* Category Legend Pill Bar */}
          <div className="px-4 py-2 border-b border-slate-800/80 bg-[#090e1a] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
              <Filter className="h-3 w-3" />
              Branches:
            </span>
            {branches.map((b) => {
              const isSelected = activeBranchId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBranchId(isSelected ? null : b.id);
                    setActiveNodeId(null);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "shadow-md scale-105"
                      : "opacity-80 hover:opacity-100 hover:scale-102"
                  }`}
                  style={{
                    backgroundColor: isSelected ? b.bgColor : "rgba(15, 23, 42, 0.6)",
                    borderColor: b.color,
                    color: b.color,
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: b.color }} />
                  <span>{b.category}</span>
                </button>
              );
            })}
          </div>

          {/* Subtle Engineering Blueprint Background Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* SVG Canvas Container — pan (translate) + zoom (scale) */}
          <div
            className="w-full aspect-[16/10] min-h-[460px] max-h-[640px] transition-transform duration-150 ease-out"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})` }}
          >
            <svg viewBox="0 0 1000 600" className="w-full h-full" style={{ overflow: "visible" }}>
              <defs>
                <filter id="branch-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Branch Curved Connectors from Central Core to Branch Centers */}
              {branches.map((b) => {
                const rad = (b.angle * Math.PI) / 180;
                const bx = centerX + branchRadius * Math.cos(rad);
                const by = centerY + branchRadius * Math.sin(rad);

                const isBranchActive = activeBranchId === null || activeBranchId === b.id;
                const isHeld = !!heldBranches[b.id];

                // Quadratic bezier control point for elegant curved trunk
                const cx = centerX + (branchRadius * 0.45) * Math.cos(rad + 0.15);
                const cy = centerY + (branchRadius * 0.45) * Math.sin(rad + 0.15);

                const trunkPath = `M ${centerX} ${centerY} Q ${cx} ${cy} ${bx} ${by}`;
                const fan = computeFan(b, bx, by, rad);

                return (
                  <g key={`trunk-${b.id}`} opacity={isBranchActive ? 1 : 0.2} className="transition-opacity duration-300">
                    {/* Outer glow trace */}
                    <path
                      d={trunkPath}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="8"
                      strokeOpacity="0.18"
                      strokeLinecap="round"
                    />
                    {/* Distinct Core Branch Trunk */}
                    <path
                      d={trunkPath}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Hierarchy fan-out: Branch → Sub-Branch leader lines (SVG, no arrowheads) */}
                    {isHeld &&
                      fan.subPos.map(({ sub, x: sxp, y: syp }) => {
                        const midX = (bx + sxp) / 2;
                        const midY = (by + syp) / 2 - 14;
                        const subPath = `M ${bx} ${by} Q ${midX} ${midY} ${sxp} ${syp}`;
                        return (
                          <path
                            key={`sub-path-${sub.id}`}
                            d={subPath}
                            fill="none"
                            stroke={b.color}
                            strokeWidth="2"
                            strokeOpacity="0.8"
                            strokeLinecap="round"
                          />
                        );
                      })}

                    {/* Hierarchy fan-out: Sub-Branch → Leaf leader lines with tip terminators */}
                    {isHeld
                      ? fan.leafPos.map(({ node, x: lxp, y: lyp, subId }) => {
                          const sp = fan.subPos.find((s) => s.sub.id === subId);
                          if (!sp) return null;
                          const midX = (sp.x + lxp) / 2;
                          const midY = (sp.y + lyp) / 2 - 8;
                          const leafPath = `M ${sp.x} ${sp.y} Q ${midX} ${midY} ${lxp} ${lyp}`;
                          const isNodeActive = activeNodeId === node.id;
                          // Perpendicular tip terminator at the leaf (never an arrowhead)
                          const ang = Math.atan2(lyp - midY, lxp - midX);
                          const nx = Math.cos(ang);
                          const ny = Math.sin(ang);
                          const th = 4;
                          return (
                            <g key={`leaf-path-${node.id}`}>
                              <path
                                d={leafPath}
                                fill="none"
                                stroke={b.color}
                                strokeWidth={isNodeActive ? "2.4" : "1.2"}
                                strokeOpacity={isNodeActive ? 1 : 0.65}
                                strokeLinecap="round"
                              />
                              <path
                                d={`M ${lxp - ny * th} ${lyp + nx * th} L ${lxp} ${lyp} L ${lxp + ny * th} ${lyp - nx * th}`}
                                fill="none"
                                stroke={b.color}
                                strokeWidth={isNodeActive ? "2.2" : "1.5"}
                                strokeLinecap="round"
                              />
                            </g>
                          );
                        })
                      : b.nodes.map((node, nodeIdx) => {
                          const nodeSpread = (nodeIdx === 0 ? -1 : 1) * 38;
                          const nx = bx + Math.cos(rad) * 90 + Math.sin(rad) * nodeSpread;
                          const ny = by + Math.sin(rad) * 90 - Math.cos(rad) * nodeSpread;

                          const leafPath = `M ${bx} ${by} Q ${(bx + nx) / 2} ${(by + ny) / 2 - 15} ${nx} ${ny}`;
                          const isNodeActive = activeNodeId === node.id;

                          return (
                            <g key={`leaf-path-${node.id}`}>
                              <path
                                d={leafPath}
                                fill="none"
                                stroke={b.color}
                                strokeWidth={isNodeActive ? "3" : "1.8"}
                                strokeDasharray={isNodeActive ? "none" : "4 2"}
                                strokeOpacity={isNodeActive ? 1 : 0.75}
                              />
                              <circle cx={nx} cy={ny} r={isNodeActive ? "6" : "4"} fill={b.color} />
                            </g>
                          );
                        })}
                  </g>
                );
              })}

              {/* 2. Central Root Node */}
              <g
                transform={`translate(${centerX}, ${centerY})`}
                className="cursor-pointer"
                onClick={() => {
                  setActiveBranchId(null);
                  setActiveNodeId(null);
                }}
              >
                <circle r="52" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 3" />
                <circle r="44" fill="#0f172a" stroke="#3b82f6" strokeWidth="3" />
                <text textAnchor="middle" y="-6" fill="#60a5fa" fontSize="11" fontWeight="bold">
                  ROOT CONCEPT
                </text>
                <text textAnchor="middle" y="14" fill="#ffffff" fontSize="12" fontWeight="extrabold">
                  {topicTitle.length > 18 ? topicTitle.slice(0, 16) + "..." : topicTitle}
                </text>
              </g>
            </svg>

            {/* 3. HTML Nodes Overlaid at Exact Coordinates */}
            {branches.map((b) => {
              const rad = (b.angle * Math.PI) / 180;
              const bx = centerX + branchRadius * Math.cos(rad);
              const by = centerY + branchRadius * Math.sin(rad);

              const isBranchActive = activeBranchId === null || activeBranchId === b.id;
              const isHeld = !!heldBranches[b.id];
              const fan = computeFan(b, bx, by, rad);

              return (
                <React.Fragment key={`html-${b.id}`}>
                  {/* Branch Head Capsule — hold to fan out full hierarchy */}
                  <div
                    style={{
                      left: `${(bx / 1000) * 100}%`,
                      top: `${(by / 600) * 100}%`,
                      transform: "translate(-50%, -50%)",
                      borderColor: b.color,
                      boxShadow: activeBranchId === b.id ? `0 0 25px ${b.color}50` : "none",
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      holdTimerRef.current = window.setTimeout(() => {
                        holdFiredRef.current = true;
                        setBranchExpanded(b.id, true);
                      }, HOLD_MS);
                    }}
                    onPointerUp={(e) => {
                      e.stopPropagation();
                      if (holdTimerRef.current !== null) {
                        window.clearTimeout(holdTimerRef.current);
                        holdTimerRef.current = null;
                      }
                      if (holdFiredRef.current) {
                        // After a completed hold, tapping collapses on the next release.
                        holdFiredRef.current = false;
                        setBranchExpanded(b.id, false);
                      } else {
                        setActiveBranchId(b.id);
                        setActiveNodeId(null);
                        toggleBranchExpanded(b.id);
                      }
                    }}
                    onPointerLeave={() => {
                      if (holdTimerRef.current !== null) {
                        window.clearTimeout(holdTimerRef.current);
                        holdTimerRef.current = null;
                      }
                    }}
                    className={`absolute z-20 cursor-pointer rounded-2xl border-2 px-3 py-1.5 backdrop-blur-md transition-all duration-200 select-none touch-none ${
                      isBranchActive ? "opacity-100 scale-105" : "opacity-30 scale-95"
                    } bg-[#0c1220]/95 hover:scale-110`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.color }} />
                      <span className="text-xs font-bold text-white whitespace-nowrap">{b.category}</span>
                      <span
                        className="text-[9px] font-bold ml-0.5"
                        style={{ color: b.color }}
                      >
                        {isHeld ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Held: Sub-Branch capsules fanned around the branch */}
                  {isHeld &&
                    fan.subPos.map(({ sub, x: sxp, y: syp }) => (
                      <div
                        key={`held-sub-${sub.id}`}
                        style={{
                          left: `${(sxp / 1000) * 100}%`,
                          top: `${(syp / 600) * 100}%`,
                          transform: "translate(-50%, -50%)",
                          borderColor: b.color,
                        }}
                        onClick={() => {
                          setActiveBranchId(b.id);
                          setActiveNodeId(null);
                        }}
                        className="absolute z-25 cursor-pointer rounded-xl border px-2 py-1 backdrop-blur-md bg-[#0c1220]/95 transition-all duration-200 hover:scale-105 animate-fade-in"
                      >
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: b.color }} />
                          <span className="text-[10px] font-bold text-white whitespace-nowrap max-w-[140px] truncate">
                            {sub.title || sub.id}
                          </span>
                        </div>
                      </div>
                    ))}

                  {/* Held: Leaf capsules under their sub-branch (full 3-level hierarchy) */}
                  {isHeld &&
                    fan.leafPos.map(({ node, x: lxp, y: lyp }) => {
                      const isNodeSelected = activeNodeId === node.id;
                      return (
                        <div
                          key={`held-leaf-${node.id}`}
                          style={{
                            left: `${(lxp / 1000) * 100}%`,
                            top: `${(lyp / 600) * 100}%`,
                            transform: "translate(-50%, -50%)",
                            borderColor: isNodeSelected ? b.color : "rgba(148, 163, 184, 0.2)",
                          }}
                          onClick={() => {
                            setActiveBranchId(b.id);
                            setActiveNodeId(node.id);
                          }}
                          className={`absolute z-30 cursor-pointer rounded-lg border p-1.5 max-w-[150px] backdrop-blur-md transition-all duration-200 animate-fade-in ${
                            isNodeSelected
                              ? "bg-slate-900 border-2 ring-2 scale-105 shadow-xl"
                              : "bg-slate-950/90 hover:border-slate-500"
                          }`}
                        >
                          <h4 className="text-[10px] font-bold text-white leading-tight truncate">{node.title}</h4>
                        </div>
                      );
                    })}

                  {/* Collapsed: Child Leaf Capsules (two attached directly to the trunk) */}
                  {!isHeld &&
                    b.nodes.slice(0, 2).map((node, nodeIdx) => {
                      const nodeSpread = (nodeIdx === 0 ? -1 : 1) * 38;
                      const nx = bx + Math.cos(rad) * 90 + Math.sin(rad) * nodeSpread;
                      const ny = by + Math.sin(rad) * 90 - Math.cos(rad) * nodeSpread;

                      const isNodeSelected = activeNodeId === node.id;

                      return (
                        <div
                          key={`child-${node.id}`}
                          style={{
                            left: `${(nx / 1000) * 100}%`,
                            top: `${(ny / 600) * 100}%`,
                            transform: "translate(-50%, -50%)",
                            borderColor: isNodeSelected ? b.color : "rgba(148, 163, 184, 0.2)",
                          }}
                          onClick={() => {
                            setActiveBranchId(b.id);
                            setActiveNodeId(node.id);
                          }}
                          className={`absolute z-30 cursor-pointer rounded-xl border p-2 max-w-[170px] backdrop-blur-md transition-all duration-200 ${
                            isNodeSelected
                              ? "bg-slate-900 border-2 ring-2 scale-105 shadow-xl"
                              : "bg-slate-950/90 hover:border-slate-500 hover:scale-102"
                          }`}
                        >
                          <h4 className="text-[11px] font-bold text-white leading-tight truncate">
                            {node.title}
                          </h4>
                          {node.formula && (
                            <div
                              className="mt-1 font-mono text-[9px] font-semibold px-1 rounded truncate"
                              style={{ backgroundColor: `${b.color}20`, color: b.color }}
                            >
                              {node.formula}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── KaTeX Fact, Proof & Exam Insight Drawer (Shows upon clicking node/branch) ── */}
      <div className="p-5 border-t border-slate-800 bg-[#0c1220] min-h-[140px] transition-all">
        {activeNode ? (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: activeBranch?.color || "#38bdf8" }}
                />
                <h4 className="text-sm font-extrabold text-white">{activeNode.title}</h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {activeBranch?.category}
                </span>
                {activeNode.classLevel && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeNode.classLevel}
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveNodeId(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Drawer
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeNode.description}</p>

            {/* KaTeX Governing Formula */}
            {activeNode.formulaLatex && (
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3">
                <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5" />
                  Governing KaTeX Mathematical Law:
                </div>
                <div className="text-sm text-cyan-100 overflow-x-auto py-1">
                  <MathMarkdown content={activeNode.formulaLatex} />
                </div>
              </div>
            )}

            {/* Step-by-Step LaTeX Derivation Proof */}
            {activeNode.derivationSnippet && (
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3">
                <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  Step-by-Step Derivation &amp; Proof:
                </div>
                <div className="text-xs text-slate-300 leading-relaxed overflow-x-auto">
                  <MathMarkdown content={activeNode.derivationSnippet} />
                </div>
              </div>
            )}

            {/* CEE / NEB High-Yield Pointer */}
            {activeNode.examFact && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">CEE / NEB High-Yield Exam Pointer: </span>
                  <span>{activeNode.examFact}</span>
                </div>
              </div>
            )}
          </div>
        ) : activeBranch ? (
          <div className="space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: activeBranch.color }} />
              <h4 className="text-sm font-bold text-white">{activeBranch.category}</h4>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {activeBranch.nodes.length} Concepts &bull; {activeBranch.subBranches.length} Sub-branches
              </span>
            </div>
            <p className="text-xs text-slate-400">
              This branch isolates {activeBranch.nodes.length} core concepts across {activeBranch.subBranches.length} structured sub-branches. Click any sub-branch leaf in the left tree or on the canvas to inspect its full mathematical KaTeX derivation and exam pointers.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Click any node in the left Explorer tree or on the canvas to inspect step-by-step KaTeX derivations and entrance examination traps.</span>
            </span>
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
              Blueprint Mode &bull; 5 Multi-Color Pathways
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
