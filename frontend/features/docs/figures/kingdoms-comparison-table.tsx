/** Kingdom comparison — Monera vs Protista vs Fungi boundary cases. Theme-aware. */
export function KingdomsComparisonTable({ className }: { className?: string }) {
  const row = (y: number, f: string, a: string, b: string, c: string, k: string) => (
    <g key={k}>
      <text x="30" y={y} fontSize="8.5" className="fill-current text-muted-foreground">{f}</text>
      <text x="230" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{a}</text>
      <text x="400" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{b}</text>
      <text x="565" y={y} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground">{c}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Kingdom comparison table of monera protista and fungi across nuclear material cell wall organelles and nutrition">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Drawing the kingdom boundaries</text>
      {row(58, "FEATURE", "MONERA", "PROTISTA", "FUNGI", "h")}
      <line x1="20" y1="66" x2="640" y2="66" strokeWidth="1.5" className="stroke-current text-muted-foreground" />
      {row(88, "nucleus", "absent (nucleoid)", "true nucleus", "true nucleus", "r1")}
      {row(112, "cell wall", "peptidoglycan", "varies / absent", "chitin", "r2")}
      {row(136, "organelles", "none membrane-bound", "mitochondria etc.", "mitochondria etc.", "r3")}
      {row(160, "body", "single cell / colony", "single cell", "hyphal mycelium", "r4")}
      {row(184, "nutrition", "auto- or heterotrophic", "auto- or heterotrophic", "absorptive heterotroph", "r5")}
      {row(208, "examples", "bacteria, cyanobacteria", "Amoeba, Plasmodium", "Mucor, mushroom", "r6")}
      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">The three 'difficult' kingdoms: Monera lacks a nucleus, Protista is a single eukaryotic cell, Fungi is multicellular but absorbs its food.</text>
    </svg>
  );
}
