/** Yeast cell structure — oval cell with bud, vacuole, ascospore potential. Theme-aware. */
export function YeastCellStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Yeast cell oval unicellular with cell wall nucleus large vacuole glycogen granules and emerging bud with bud scar">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Yeast (Saccharomyces) — a fungus that gave up filaments</text>

      {/* mother cell */}
      <ellipse cx="220" cy="130" rx="80" ry="56" className="fill-current text-amber-500/12" strokeWidth="3.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      {/* bud */}
      <circle cx="296" cy="106" r="26" className="fill-current text-amber-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="330" y="102" fontSize="9" className="fill-current text-foreground" fontWeight="700">BUD — daughter cell forming</text>
      <text x="330" y="118" fontSize="8" className="fill-current text-muted-foreground">nucleus divides, one copy moves in</text>

      {/* organelles */}
      <circle cx="190" cy="112" r="14" className="fill-current text-violet-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="120" y="92" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">nucleus</text>
      <ellipse cx="230" cy="158" rx="26" ry="13" className="fill-current text-emerald-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="120" y="196" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">large vacuole</text>
      <circle cx="272" cy="150" r="5" className="fill-current text-sky-600/70" />
      <text x="272" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">glycogen</text>

      {/* facts panel */}
      <rect x="420" y="60" width="220" height="140" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="436" y="86" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Quick facts</text>
      {["single oval cells (unicellular fungus)", "reproduces by budding (asexual)", "ferments sugar → alcohol + CO₂", "used in bread & brewing", "ascospores when conditions turn harsh"].map((s, i) => (
        <text key={i} x="436" y={106 + i * 18} fontSize="8.3" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Bud scars mark every division — a mother cell can bud 20+ times before retiring.</text>
    </svg>
  );
}
