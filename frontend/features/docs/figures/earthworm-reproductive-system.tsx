/** Earthworm reproductive systems — male & female organs in one body. Theme-aware. */
export function EarthwormReproductiveSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Earthworm hermaphrodite reproductive system with testes seminal vesicles spermathecae ovaries oviduct and male and female genital pores in anterior segments">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">One worm, both systems — the hermaphrodite kit</text>

      {/* body outline */}
      <path d="M60 130 q60 -22 130 -18 q80 4 140 0 q90 -6 160 4 q50 6 50 14 q0 10 -50 14 q-70 10 -160 4 q-60 -4 -140 0 q-70 4 -130 -18 Z" className="fill-current text-rose-500/8" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(190 90 90 / 0.7)" }} />

      {/* male system */}
      <g>
        <circle cx="200" cy="112" r="10" className="fill-current text-sky-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="200" y="92" fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">testes (10–11)</text>
        <ellipse cx="250" cy="112" rx="34" ry="14" className="fill-current text-sky-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="250" y="92" fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">seminal vesicles (11–12)</text>
        <circle cx="180" cy="150" r="9" className="fill-current text-sky-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="150" y="176" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">spermathecae ×4 (6–9)</text>
        <text x="250" y="176" fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">male pores on segment 18</text>
      </g>

      {/* female system */}
      <g>
        <circle cx="330" cy="112" r="9" className="fill-current text-rose-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="330" y="92" fontSize="8.5" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">ovaries (13)</text>
        <path d="M330 120 q30 10 60 8" fill="none" strokeWidth="3" className="stroke-current text-rose-400" />
        <text x="400" y="112" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">oviduct → female pore (14)</text>
        <text x="400" y="128" fontSize="8.5" className="fill-current text-muted-foreground">prostates (17–19) add fluid to sperm</text>
      </g>

      {/* segment markers */}
      {[10, 11, 12, 13, 14, 18].map((s) => (
        <text key={s} x={120 + s * 22} y="212" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
      ))}
      <text x="120" y="228" fontSize="8" className="fill-current text-muted-foreground">segment →</text>

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">All reproductive organs crowd the anterior third — sperm made in testes, matured in vesicles, stored in the partner's spermathecae until cocoon time.</text>
    </svg>
  );
}
