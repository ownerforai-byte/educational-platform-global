// LithiumExceptions figure. Theme-aware.
export function LithiumExceptions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Panel of lithium anomalies within the alkali metal group">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lithium — the family dissenter</text>
      {[
        ["Burns to the NORMAL oxide", "Li₂O — not a peroxide like Na"],
        ["Forms the nitride directly", "6Li + N₂ → 2Li₃N — no other alkali does"],
        ["Salts poorly soluble", "Li₂CO₃, LiF, Li₃PO₄ — opposite of the group"],
        ["Covalent character", "tiny Li⁺ polarises anions (Fajans)"],
      ].map(([head, sub], i) => (
        <g key={head as string}>
          <rect x="40" y={50 + i * 38} width="580" height="32" rx="7" fill="rgb(139 92 246)" opacity="0.1" />
          <text x="58" y={71 + i * 38} fontSize="11" fontWeight="800" fill="rgb(139 92 246)">{head as string}</text>
          <text x="360" y={71 + i * 38} fontSize="10.5" className="fill-current text-muted-foreground">{sub as string}</text>
        </g>
      ))}
      <text x="330" y="216" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cause: Li⁺ is tiny and heavily hydrated — high charge density, strong polarisation</text>
    </svg>
  );
}
