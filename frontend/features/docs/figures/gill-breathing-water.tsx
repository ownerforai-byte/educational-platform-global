/** Gills water breathing — counting the efficiency cost. Well-detailed. Theme-aware. */
export function GillBreathingWater({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gills water breathing countercurrent exchange lamellae oxygen extraction efficiency water flows opposite blood large surface thin epithelium two chambered heart single pass">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gills — extracting oxygen from 800× less of it</text>
      {/* countercurrent diagram */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COUNTERCURRENT EXCHANGE</text>
      <path d="M70 110 h250 m-10 -6 l10 6 l-10 6" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="98" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">water flows this way →</text>
      <path d="M320 150 h-250 m10 6 l-10 -6 l10 -6" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(220 38 38 / 0.9)" }} />
      <text x="195" y="172" fontSize="6.4" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">← blood flows the opposite way</text>
      <text x="195" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">water meets blood that is always slightly oxygen-poor,</text>
      <text x="195" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">so diffusion keeps working along the whole lamella — up to 80–90% uptake</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DESIGN FOR WATER</text>
      {[
        "water holds ~1/800th the oxygen",
        "  of air — so area must be huge",
        "gill filaments carry stacks of",
        "  thin lamellae: enormous surface",
        "epithelium is one cell thick —",
        "  a short diffusion path",
        "cost: gills collapse in air, so",
        "  fish suffocate out of water",
        "buccal pump keeps water flowing",
        "  even when the fish stands still",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: countercurrent flow = water and blood run opposite ways — the trick that makes gill extraction efficient.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Huge area + thin barrier + countercurrent = the gill's three-part formula.</text>
    </svg>
  );
}
