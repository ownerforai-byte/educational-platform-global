/**
 * Habitat vs niche — the address vs the profession analogy, shown for
 * one species. Theme-aware via currentColor.
 */
export function HabitatVsNiche({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Habitat versus niche comparison showing habitat as the physical address of a frog in a pond and niche as its functional role covering food activity time and interactions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Habitat vs niche — the address vs the profession</text>

      {/* habitat */}
      <rect x="40" y="60" width="270" height="170" rx="14" className="fill-current text-sky-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="175" y="88" fontSize="11" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">HABITAT — where it lives</text>
      <path d="M70 200 Q175 180 280 200 L280 220 L70 220 Z" className="fill-current text-sky-500/25" stroke="none" />
      <circle cx="175" cy="170" r="16" className="fill-current text-emerald-500/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="175" y="245" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">pond, its physical 'address' — many species share it</text>

      {/* niche */}
      <rect x="350" y="60" width="270" height="170" rx="14" className="fill-current text-amber-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="485" y="88" fontSize="11" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">NICHE — what it does there</text>
      {["what it eats (insects) & what eats it", "when it is active (night — temporal)", "its tolerance to temperature/dryness", "its role: pest controller, prey for birds"].map((s, i) => (
        <text key={i} x="364" y={114 + i * 22} fontSize="9" className="fill-current text-muted-foreground">• {s}</text>
      ))}
      <text x="485" y="245" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">its 'profession' — unique to one species</text>

      <text x="16" y="262" fontSize="10" className="fill-current text-muted-foreground">Gause's competitive exclusion: two species cannot occupy the same niche for long — one drives the other out or they specialise.</text>
    </svg>
  );
}
