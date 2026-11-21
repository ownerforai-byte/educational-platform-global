/** Method principles — control, falsifiability, theory, verification. Theme-aware. */
export function MethodPrinciples({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Key principles of the biological method controlled experiment falsifiability theory and verification and repetition">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Key principles of the biological method</text>
      {[
        { y: 54, t: "CONTROLLED EXPERIMENT", s: "only one variable differs between groups; everything else constant" },
        { y: 84, t: "FALSIFIABILITY", s: "a hypothesis must be capable of being proven wrong — that is what makes it scientific" },
        { y: 114, t: "THEORY", s: "a hypothesis confirmed repeatedly by many independent tests (cell theory, evolution) — not a guess" },
        { y: 144, t: "VERIFICATION & REPETITION", s: "results must be reproducible by others" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 13} width="612" height="26" rx="7" className="fill-current text-violet-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="230" y={r.y + 4} fontSize="7.2" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
      <text x="16" y="180" fontSize="9" className="fill-current text-muted-foreground">Together these make the biological method the shared logic of all science — observation to publication.</text>
      <text x="16" y="198" fontSize="9" className="fill-current text-muted-foreground">A theory is not a guess: it has survived every independent test thrown at it.</text>
    </svg>
  );
}
