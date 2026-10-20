/**
 * Physics XI Academic Companion — the brief itself.
 *
 * One renderer, two surfaces: the reading grid at /resources/physics-xi and
 * the per-unit page at /resources/physics-xi/<unit>. Deliberately free of
 * "use client" so it can be rendered on the server as well.
 *
 * The sections follow the order a student works in: what the model asserts,
 * the conditions it needs, the examinable syllabus topics it covers, the
 * wrong beliefs the exam punishes, the self-test workbook, the numbers worth
 * memorising, what is still open, the prompts to think with, and where to go
 * next — in the platform or in print.
 */
import Link from "next/link";
import type { PhysicsXiUnit } from "@/lib/physics-xi-academic";

interface PhysicsXiUnitBriefProps {
  unit: PhysicsXiUnit;
  /** Compact mode trims the section rhythm for the inline grid expansion. */
  dense?: boolean;
}

export function PhysicsXiUnitBrief({ unit, dense = false }: PhysicsXiUnitBriefProps) {
  const sectionClass = dense ? "space-y-3" : "space-y-6";
  const headingClass =
    "text-xs font-semibold uppercase tracking-wide text-muted-foreground";

  return (
    <div className={sectionClass}>
      <section>
        <h4 className={headingClass}>What the model asserts</h4>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
          {unit.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className={headingClass}>Conditions, assumptions and limits</h4>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground">
          {unit.conditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={headingClass}>
          Exam coverage — {unit.syllabusTopics.length} NEB topics
        </h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          {unit.syllabusTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={headingClass}>
          Common misconceptions — {unit.misconceptions.length} to unlearn
        </h4>
        <ul className="mt-2 space-y-3">
          {unit.misconceptions.map((misconception) => (
            <li key={misconception.claim}>
              <p className="font-medium text-foreground">
                “{misconception.claim}”
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Why it fails: </span>
                {misconception.why}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Correct: </span>
                {misconception.correction}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={headingClass}>
          Workbook — {unit.workbook.length} questions with answers
        </h4>
        <ol className="mt-2 space-y-3">
          {unit.workbook.map((item) => (
            <li key={item.question}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.kind}
              </p>
              <p className="font-medium text-foreground">{item.question}</p>
              <details className="mt-1">
                <summary className="cursor-pointer text-sm font-medium text-primary">
                  Show the worked answer
                </summary>
                <p className="mt-1 text-muted-foreground">{item.answer}</p>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className={headingClass}>Key numbers</h4>
        <dl className="mt-2 space-y-1 text-muted-foreground">
          {unit.keyNumbers.map((item) => (
            <div key={item.label} className="flex justify-between gap-3">
              <dt>{item.label}</dt>
              <dd className="text-right font-medium text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h4 className={headingClass}>Open questions</h4>
        <ul className="mt-2 space-y-2">
          {unit.mysteries.map((mystery) => (
            <li key={mystery.question}>
              <p className="font-medium text-foreground">{mystery.question}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {mystery.status}
              </p>
              <p className="text-muted-foreground">{mystery.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={headingClass}>Inquiry prompts</h4>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
          {unit.prompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className={headingClass}>Next steps on this platform</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
          {unit.nextSteps.map((step) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="text-primary hover:underline"
              >
                {step.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className={headingClass}>Further reading</h4>
        <ul className="mt-2 space-y-1">
          {unit.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
