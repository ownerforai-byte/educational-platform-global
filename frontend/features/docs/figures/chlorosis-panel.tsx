// ChlorosisPanel figure. Theme-aware.
export function ChlorosisPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Magnesium deficiency causing chlorosis in plant leaves">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chlorosis — the plant's anaemia</text>
      <ellipse cx="180" cy="115" rx="105" ry="45" fill="rgb(16 185 129)" opacity="0.55" stroke="rgb(16 185 129)" />
      <text x="180" y="112" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">healthy leaf</text>
      <text x="180" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Mg²⁺ in chlorophyll</text>
      <ellipse cx="450" cy="115" rx="105" ry="45" fill="rgb(250 204 21)" opacity="0.45" stroke="rgb(202 138 4)" />
      <text x="450" y="112" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(161 98 7)">Mg-deficient leaf</text>
      <text x="450" y="130" fontSize="9.5" textAnchor="middle" fill="rgb(161 98 7)">yellow = CHLOROSIS</text>
      <text x="315" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">No Mg²⁺ → no chlorophyll → no photosynthesis → stunted growth</text>
      <text x="315" y="208" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">remedy: magnesium salts in the soil (e.g. MgSO₄, Epsom salt)</text>
    </svg>
  );
}
