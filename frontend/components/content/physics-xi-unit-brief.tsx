/**
 * Physics XI Academic Companion — the brief itself.
 *
 * One renderer, two surfaces: the reading grid at /resources/physics-xi and
 * the per-unit page at /resources/physics-xi/<unit>. Deliberately free of
 * "use client" so it can be rendered on the server as well.
 */
import type { PhysicsXiUnit } from "@/lib/physics-xi-academic";

interface PhysicsXiUnitBriefProps {
  unit: PhysicsXiUnit;
  /** Compact mode trims the section rhythm for the inline grid expansion. */
  dense?: boolean;
}

export function PhysicsXiUnitBrief({ unit, dense = false }: PhysicsXiUnitBriefProps) {
  const sectionClass = dense ? "space-y-3" : "space-y-6";

  return (
    <div className={sectionClass}>
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          What the model asserts
        </h4>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
          {unit.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Conditions, assumptions and limits
        </h4>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted-foreground">
          {unit.conditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Key numbers
        </h4>
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
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Open questions
        </h4>
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
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Inquiry prompts
        </h4>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
          {unit.prompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Further reading
        </h4>
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
