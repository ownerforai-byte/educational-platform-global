"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Brain,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Image as ImageIcon,
  X,
  Layers,
  Send,
  Compass,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { toast } from "sonner";
import { MathMarkdown } from "@/components/content/math-markdown";
import { apiFetch } from "@/lib/api-client";
import { AiPlanStrip } from "@/components/ai/ai-plan-strip";

interface DeepDiveResponse {
  explanation: string;
  provider: string;
  topic: string;
  depth: string;
  subject: string;
  classLevel: string;
  remaining?: number;
  limit?: number;
}

const PRESETS = [
  {
    label: "Wave-Particle Duality",
    subject: "physics",
    classLevel: "12",
    topic: "De Broglie hypothesis and wave-particle duality: Davisson-Germer experiment and electron diffraction.",
  },
  {
    label: "Aldol Condensation",
    subject: "chemistry",
    classLevel: "12",
    topic: "Aldol condensation and Cannizzaro reaction mechanisms: nucleophilic addition and alpha-hydrogen acidity.",
  },
  {
    label: "DNA Replication Fork",
    subject: "biology",
    classLevel: "12",
    topic: "Semi-conservative DNA replication, leading vs lagging strand synthesis, Okazaki fragments and DNA polymerases.",
  },
  {
    label: "Electromagnetic Induction",
    subject: "physics",
    classLevel: "12",
    topic: "Faraday's laws of electromagnetic induction and Lenz's law: conservation of energy explanation.",
  },
  {
    label: "Photosystem II & Z-Scheme",
    subject: "biology",
    classLevel: "11",
    topic: "Light-dependent reaction in photosynthesis, non-cyclic photophosphorylation, photolysis of water, and Z-scheme.",
  },
];

export default function DeepDiveStudioPage() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("physics");
  const [classLevel, setClassLevel] = useState("12");
  const [depth, setDepth] = useState<"intuitive" | "exam-mastery" | "deep-synthesis">("exam-mastery");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DeepDiveResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size must be under 4MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDeepDive() {
    if (!topic.trim()) {
      toast.error("Please enter a concept or question to deep-dive into.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch<DeepDiveResponse>("/api/ai/deep-dive", {
        method: "POST",
        body: JSON.stringify({
          topic,
          subject,
          classLevel,
          depth,
          images: imagePreview ? [imagePreview] : undefined,
        }),
      });

      setResponse(res);
      toast.success("Deep synthesis complete!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to analyze concept. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!response?.explanation) return;
    navigator.clipboard.writeText(response.explanation);
    setCopied(true);
    toast.success("Concept notes copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-3 sm:px-4 py-6 sm:py-10">
      {/* ── Breadcrumb & Navigation ────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to AI Studio Hub
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          <Brain className="h-3.5 w-3.5" /> Gemini 3.5 Flash Synthesis
        </span>
      </div>

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-sky-500/[0.08] via-card to-card p-6 sm:p-8 shadow-sm">
        <div className="absolute -top-12 -right-8 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
              <Lightbulb className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Veer Deep Concept & Syllabus Studio
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Exhaustive first-principles breakdown, intuitive analogies, multimodal diagram parsing, and board exam trap alerts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AiPlanStrip />

      {/* ── Input Box & Controls ────────────────────────────────────────── */}
      <div className="rounded-3xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm space-y-4">
        {/* Subject & Class Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Subject:</span>
            {["physics", "chemistry", "biology", "mathematics", "computer"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-all ${
                  subject === s
                    ? "bg-sky-600 text-white shadow-sm"
                    : "border border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Class:</span>
            {["11", "12"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setClassLevel(c)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  classLevel === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                Class {c}
              </button>
            ))}
          </div>
        </div>

        {/* Depth Level Selector */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-3">
          <span className="text-xs font-semibold text-muted-foreground">Target Depth:</span>
          {(
            [
              { key: "intuitive", label: "Intuition & Analogies", icon: Lightbulb },
              { key: "exam-mastery", label: "NEB Exam Mastery & Traps", icon: Compass },
              { key: "deep-synthesis", label: "Deep Axiomatic Synthesis", icon: Layers },
            ] as const
          ).map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setDepth(d.key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  depth === d.key
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-border/70 bg-muted/30 text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Presets */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
            <Sparkles className="h-3 w-3 text-sky-500" />
            <span>Curriculum Deep-Dive Topics:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTopic(p.topic);
                  setSubject(p.subject);
                  setClassLevel(p.classLevel);
                }}
                className="rounded-xl border border-border/60 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleDeepDive();
              }
            }}
            placeholder="Type any difficult concept, reaction mechanism, theoretical law, or attach a textbook diagram photo to unpack... (e.g. Why is entropy always increasing in spontaneous processes?)"
            rows={4}
            className="w-full resize-none rounded-2xl border border-border/70 bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Optional Diagram / Image Attachment Preview */}
        {imagePreview && (
          <div className="relative inline-block rounded-2xl border border-border/70 bg-muted/30 p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Attached diagram"
              className="h-28 max-w-xs object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow hover:opacity-90"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-all"
            >
              <ImageIcon className="h-3.5 w-3.5 text-sky-500" />
              {imagePreview ? "Change Diagram" : "Attach Diagram / Photo"}
            </button>
            <span className="text-[11px] text-muted-foreground">
              Gemini Vision parses diagrams, equations & curves
            </span>
          </div>

          <div className="flex items-center gap-2">
            {topic && (
              <button
                type="button"
                onClick={() => {
                  setTopic("");
                  removeImage();
                  setResponse(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleDeepDive}
              disabled={loading || !topic.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-sky-500/20 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Synthesizing with Gemini...
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Deep-Dive Concept
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Solution Output Section ─────────────────────────────────────── */}
      {response && (
        <div className="rounded-3xl border border-sky-500/30 bg-card p-6 shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                <BookOpen className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-foreground">Comprehensive Academic Synthesis</h2>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                Provider: {response.provider}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy Notes
                </>
              )}
            </button>
          </div>

          <div className="rounded-2xl bg-muted/20 p-4 border border-border/30 overflow-x-auto">
            <MathMarkdown content={response.explanation} />
          </div>
        </div>
      )}
    </div>
  );
}

