/** East west gradient — why Nepal's zones shift east to west. Well-detailed. Theme-aware. */
export function EastWestGradient({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="East west vegetation gradient Nepal rainfall monsoon moisture west drier sal forest transition species distribution rainfall map">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">East is wetter, west is drier — the hidden second axis</text>

      {/* Nepal outline with gradient */}
      <rect x="30" y="44" width="660" height="130" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <rect x="60" y="70" width="600" height="60" rx="10" className="fill-current text-sky-500/25" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <rect x="360" y="70" width="300" height="60" rx="10" className="fill-current text-sky-500/10" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="120" y="106" fontSize="8" className="fill-current text-sky-700" fontWeight="800">EAST — wet</text>
      <text x="600" y="106" fontSize="8" textAnchor="end" className="fill-current text-amber-700" fontWeight="800">WEST — dry</text>
      <text x="360" y="150" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">monsoon weakens westward; rain-shadow valleys deepen (Mustang, Dolpo)</text>

      {/* consequences */}
      <rect x="30" y="188" width="320" height="76" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="210" fontSize="8" className="fill-current text-foreground" fontWeight="800">Wet east supports</text>
      {["tall sal and mixed forests", "denser broadleaf at every altitude"].map((t, i) => (
        <text key={t} x="46" y={228 + i * 15} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="370" y="188" width="320" height="76" rx="10" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="386" y="210" fontSize="8" className="fill-current text-foreground" fontWeight="800">Dry west shifts to</text>
      {["chir pine and drought-hardy sal", "desert-steppe in trans-Himalayan rain shadow"].map((t, i) => (
        <text key={t} x="386" y={228 + i * 15} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: altitude is the vertical axis, rainfall the horizontal one — Nepal's vegetation map needs both.</text>
    </svg>
  );
}
