'use client';

/**
 * Biology Python Lab — the 'Biology' 3D lab.
 *
 * Lists every NEB biology syllabus unit (Class 11 + Class 12, straight from
 * `lib/syllabus.ts`), each with its Python-generated 3D scene on top and its
 * full theory (origin, discovery date, working mechanism, details, features,
 * properties) plus per-topic theory below.
 *
 * 3D scenes:  visuals-py/gen_bio.py  → /public/data/visuals/py/bio-py-*
 * Theory:     /public/data/bio-lab/bio-theory-11.json + bio-theory-12.json
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Dna, FlaskConical } from 'lucide-react';
import { PythonVisuals } from '@/components/lab/python-visuals';
import { getSubjectSyllabus } from '@/lib/syllabus';
import { loadData } from '@/lib/data-loader';

/* ------------------------------------------------------------------ *
 * Theory JSON shapes (mirrors bio-theory-11/12.json)
 * ------------------------------------------------------------------ */
export interface BioTopicTheory {
  title: string;
  origin: string;
  mechanism: string;
  keyPoints: string[];
}
export interface BioUnitTheory {
  id: string;
  title: string;
  hours: number;
  assetId: string;
  origin: string;
  discovered: string;
  mechanism: string;
  features: string[];
  properties: string[];
  details: string;
  topics: BioTopicTheory[];
}
interface BioTheoryFile {
  class: string;
  subject: string;
  units: BioUnitTheory[];
}

const THEORY_FILES = ['bio-lab/bio-theory-11', 'bio-lab/bio-theory-12'] as const;

function useBioTheory() {
  const [units, setUnits] = useState<BioUnitTheory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    Promise.all(THEORY_FILES.map((f) => loadData<BioTheoryFile>(f).catch(() => null)))
      .then((files) => {
        if (cancelled) return;
        setUnits(files.flatMap((f) => f?.units ?? []));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);
  return { units, loading };
}

/** Syllabus unit id → theory entry (ids match syllabus.ts unit ids). */
export function useBioUnitTheory(unitId: string) {
  const { units, loading } = useBioTheory();
  return { theory: units.find((u) => u.id === unitId), loading };
}

/* ------------------------------------------------------------------ *
 * Hub — 'Biology': every syllabus unit, grouped by class
 * ------------------------------------------------------------------ */
export function BioPythonLabHub() {
  const { units: theoryUnits } = useBioTheory();
  const classes = useMemo(() => ([
    { slug: 'class-11-notes', label: 'Class 11', syllabus: getSubjectSyllabus('class-11-notes', 'biology') },
    { slug: 'class-12-notes', label: 'Class 12', syllabus: getSubjectSyllabus('class-12-notes', 'biology') },
  ]), []);
  const theoryById = useMemo(() => new Map(theoryUnits.map((u) => [u.id, u])), [theoryUnits]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Python-powered · 3D + theory</p>
        <h2 className="mt-1 text-2xl font-bold flex items-center gap-2">
          <Dna className="h-6 w-6 text-green-500" /> Biology — Every Unit in 3D
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          All {classes.reduce((n, c) => n + (c.syllabus?.units.length ?? 0), 0)} NEB biology units.
          Open a unit for its Python 3D scene plus full theory — origin, discovery, working mechanism, features, properties — for every topic.
        </p>
      </div>
      {classes.map((c) => (
        <section key={c.slug}>
          <h3 className="mb-3 text-lg font-semibold">{c.label} · {c.syllabus?.units.length ?? 0} units</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(c.syllabus?.units ?? []).map((u, i) => {
              const th = theoryById.get(u.id);
              return (
                <Link key={u.id} href={`/lab/py-bio-${u.id}`} className="block group h-full">
                  <div className="rounded-2xl border border-border bg-card p-4 h-full hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-sm font-bold text-green-600">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{u.title}</h4>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                          {th ? `${th.topics.length} topics · 3D: ${th.assetId}` : `${u.topics.length} topics`}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground/70">
                      {u.hours ? `${u.hours} hrs` : ''} · {u.topics.length} topics · Python 3D
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Unit page — 3D scene on top, unit theory + per-topic theory below
 * ------------------------------------------------------------------ */
export function BioPythonUnitLab({ unitId }: { unitId: string }) {
  const { theory, loading } = useBioUnitTheory(unitId);
  const syllabusUnit = useMemo(() => {
    for (const cls of ['class-11-notes', 'class-12-notes'] as const) {
      const hit = getSubjectSyllabus(cls, 'biology')?.units.find((u) => u.id === unitId);
      if (hit) return { ...hit, classSlug: cls };
    }
    return null;
  }, [unitId]);

  if (loading) return <div className="p-6 text-sm text-muted-foreground">Loading unit theory…</div>;
  if (!theory || !syllabusUnit) {
    return <div className="p-6 text-sm text-muted-foreground">No theory found for unit “{unitId}”. Check the syllabus unit id.</div>;
  }

  return (
    <div className="space-y-6">
      <PythonVisuals assetId={theory.assetId} />

      <article className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {syllabusUnit.classSlug === 'class-11-notes' ? 'Class 11' : 'Class 12'} · {theory.hours} teaching hours
          </p>
          <h2 className="mt-1 text-xl font-bold">{theory.title} — Theory</h2>
        </div>
        <TheoryBlock icon="🌱" title="Origin" text={theory.origin} />
        <TheoryBlock icon="📅" title="Discovery / Date" text={theory.discovered} />
        <TheoryBlock icon="⚙️" title="Working Mechanism" text={theory.mechanism} />
        <TheoryBlock icon="📝" title="Details" text={theory.details} />
        <div className="grid gap-4 md:grid-cols-2">
          <TheoryList icon="✨" title="Features" items={theory.features} />
          <TheoryList icon="🧪" title="Properties" items={theory.properties} />
        </div>
      </article>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-green-500" />
          All {theory.topics.length} topics — 3D + theory each
        </h3>
        {theory.topics.map((t, i) => (
          <details key={t.title} className="rounded-2xl border border-border bg-card p-5 group">
            <summary className="cursor-pointer text-sm font-semibold hover:text-primary transition-colors">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-xs text-primary">{i + 1}</span>
              {t.title}
            </summary>
            <div className="mt-4 space-y-3">
              <PythonVisuals assetId={theory.assetId} />
              <TheoryBlock icon="🌱" title="Origin" text={t.origin} small />
              <TheoryBlock icon="⚙️" title="Working Mechanism" text={t.mechanism} small />
              <TheoryList icon="📌" title="Key points" items={t.keyPoints} small />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function TheoryBlock({ icon, title, text, small }: { icon: string; title: string; text: string; small?: boolean }) {
  return (
    <div>
      <p className={`${small ? 'text-xs' : 'text-sm'} font-semibold`}>{icon} {title}</p>
      <p className={`mt-1 ${small ? 'text-xs' : 'text-sm'} text-muted-foreground leading-relaxed`}>{text}</p>
    </div>
  );
}

function TheoryList({ icon, title, items, small }: { icon: string; title: string; items: string[]; small?: boolean }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
      <p className={`${small ? 'text-xs' : 'text-sm'} font-semibold`}>{icon} {title}</p>
      <ul className={`mt-2 space-y-1.5 ${small ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
        {items.map((it) => (
          <li key={it} className="flex gap-1.5"><span className="text-primary">•</span><span>{it}</span></li>
        ))}
      </ul>
    </div>
  );
}
