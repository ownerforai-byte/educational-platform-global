// The four visible Balmer lines on a spectrum bar. Theme-aware.
export function BalmerVisibleLines({ className }: { className?: string }) {
  const lines: [string, number, string][] = [
    ["Hδ", 410.2, "rgb(99 102 241 / 0.95)"],
    ["Hγ", 434.0, "rgb(59 130 246 / 0.95)"],
    ["Hβ", 486.1, "rgb(16 185 129 / 0.95)"],
    ["Hα", 656.3, "rgb(239 68 68 / 0.95)"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Visible Balmer series spectrum with four emission lines H alpha 656.3 nanometres H beta 486.1 H gamma 434 H delta 410.2 on a wavelength scale">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Balmer series — the only series the eye can see</text>
      <rect x="60" y="60" width="600" height="46" rx="6" className="fill-current text-foreground/5" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 120 130 / 0.7)" }} />
      {lines.map(([name, nm, color]) => {
        const x = 60 + ((nm - 390) / (700 - 390)) * 600;
        return (
          <g key={name}>
            <line x1={x} y1="60" x2={x} y2="106" className="stroke-current" strokeWidth="5" style={{ color }} />
            <text x={x} y="126" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name}</text>
            <text x={x} y="140" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{nm} nm</text>
          </g>
        );
      })}
      <text x="60" y="170" fontSize="8" className="fill-current text-muted-foreground">390 nm (violet)</text>
      <text x="640" y="170" fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">700 nm (red)</text>
      <rect x="30" y="180" width="660" height="22" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="195" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">All four are 3→2, 4→2, 5→2, 6→2 jumps: Hα 656.3 nm (red) is the first Balmer line; lines crowd toward the 364.6 nm series limit.</text>
    </svg>
  );
}
