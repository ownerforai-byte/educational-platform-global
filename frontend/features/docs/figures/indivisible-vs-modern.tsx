// Indivisible atom vs modern subatomic view. Theme-aware.
export function IndivisibleVsModern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Dalton indivisible billiard ball atom versus modern atom with nucleus protons neutrons and electrons">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Postulate 1 vs reality — the atom came apart</text>
      <circle cx="180" cy="110" r="44" className="fill-current text-slate-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 120 130 / 0.9)" }} />
      <text x="180" y="180" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Dalton: a solid, indivisible billiard ball</text>
      <circle cx="520" cy="110" r="20" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="520" y="86" fontSize="7.6" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">nucleus: p⁺ + n⁰</text>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + 0.5;
        return (
          <g key={i}>
            <circle cx={520 + 52 * Math.cos(a)} cy={110 + 52 * Math.sin(a)} r="5" className="fill-current text-sky-500" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          </g>
        );
      })}
      <text x="520" y="180" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Modern: electrons, protons, neutrons — divisible</text>
      <rect x="30" y="188" width="660" height="16" rx="0" />
      <text x="360" y="202" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Electron (1897), proton (1919), neutron (1932) — each discovery dismantled one Dalton claim without touching his ratios.</text>
    </svg>
  );
}
