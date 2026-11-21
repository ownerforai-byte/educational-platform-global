/** Pesticide classes chart — organochlorines to fungicides. Theme-aware. */
export function PesticideClassesChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Pesticide classes organochlorines DDT organophosphates malathion carbamates pyrethroids herbicides glyphosate fungicides with targets and persistence notes">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The pesticide shelf — six classes</text>
      {[
        { y: 48, t: "ORGANOCHLORINES", s: "insects — DDT, aldrin, dieldrin, endosulfan", n: "highly persistent, lipophilic, mostly banned" },
        { y: 80, t: "ORGANOPHOSPHATES", s: "insects — malathion, parathion, chlorpyrifos", n: "break down faster but acutely toxic nerve poisons" },
        { y: 112, t: "CARBAMATES", s: "insects — carbaryl, aldicarb", n: "also acetylcholinesterase inhibitors; moderate persistence" },
        { y: 144, t: "PYRETHROIDS", s: "insects — permethrin, deltamethrin (from chrysanthemum)", n: "low mammalian toxicity, fast breakdown" },
        { y: 176, t: "HERBICIDES", s: "weeds — 2,4-D, glyphosate, atrazine", n: "some persist in soil and water" },
        { y: 208, t: "FUNGICIDES", s: "fungi — copper compounds, sulphur, carbendazim", n: "orchards and seed treatment" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 12} width="612" height="28" rx="7" className="fill-current text-violet-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x="36" y={r.y + 6} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="200" y={r.y + 6} fontSize="7.4" className="fill-current text-muted-foreground">{r.s}</text>
          <text x="470" y={r.y + 6} fontSize="7" className="fill-current text-muted-foreground" fontStyle="italic">{r.n}</text>
        </g>
      ))}
      <text x="16" y="244" fontSize="9" className="fill-current text-muted-foreground">Read the last column as the exam hook: persistence and toxicity vary inversely across the classes — DDT lasts decades, pyrethroids last days.</text>
      <text x="16" y="262" fontSize="9" className="fill-current text-muted-foreground">DDT is still permitted for malaria control in some settings — a deliberate trade-off.</text>
    </svg>
  );
}
