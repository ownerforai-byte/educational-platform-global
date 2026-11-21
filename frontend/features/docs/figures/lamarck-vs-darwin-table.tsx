/** Lamarckism vs Darwinism comparison table. Theme-aware. */
export function LamarckVsDarwinTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Lamarckism versus Darwinism comparison table driving force mechanism direction variation origin giraffe explanation and fate">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lamarckism vs Darwinism (NEB 2024)</text>
      {[
        { y: 58, h: "BASIS", a: "Lamarckism", b: "Darwinism" },
        { y: 88, h: "Driving force", a: "internal urge + environment; use/disuse", b: "natural selection of pre-existing variations" },
        { y: 118, h: "Mechanism", a: "organisms ACQUIRE characters, pass them on", b: "environment SELECTS among random heritable variations" },
        { y: 148, h: "Direction", a: "purposeful, toward need", b: "undirected — local and immediate" },
        { y: 178, h: "Variation origin", a: "acquired during life", b: "pre-existing, heritable, random" },
        { y: 208, h: "Fate", a: "disproved (Weismann, genetics)", b: "confirmed and extended" },
      ].map((r, i) => (
        <g key={r.h}>
          <rect x="30" y={r.y - 18} width="600" height="26" rx="6" className={i === 0 ? "fill-current text-foreground/5" : "fill-current text-muted-foreground/5"} />
          <text x="40" y={r.y} fontSize="7.8" className="fill-current text-foreground" fontWeight={i === 0 ? 800 : 700}>{r.h}</text>
          <text x="180" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="420" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground">{r.b}</text>
        </g>
      ))}
    </svg>
  );
}
