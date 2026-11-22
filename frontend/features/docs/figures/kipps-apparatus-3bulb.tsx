// Kipps apparatus 3 bulb. Theme-aware.
export function KippsApparatus3bulb({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Kipps apparatus three bulbs with acid reservoir marble and ferrous sulphide lumps stopcock and pressure valve action">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Kipp's apparatus: gas on demand</text>
      <path d="M 200 60 a 60 60 0 0 1 0 120 a 60 60 0 0 1 0 -120" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
      <circle cx="200" cy="120" r="42" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground" />
      <rect x="170" y="150" width="60" height="26" rx="6" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.5" />
      <text x="200" y="167" fontSize="9" textAnchor="middle" className="fill-current text-foreground">FeS + marble</text>
      <text x="290" y="90" fontSize="10.5" className="fill-current text-muted-foreground">top bulb: dil. H₂SO₄ reservoir</text>
      <text x="290" y="130" fontSize="10.5" className="fill-current text-muted-foreground">middle: solid lumps; gas collects</text>
      <text x="290" y="170" fontSize="10.5" className="fill-current text-muted-foreground">bottom: spent acid</text>
      <rect x="255" y="195" width="90" height="24" rx="6" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.3" />
      <text x="300" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">stopcock</text>
      <text x="530" y="90" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)">open tap →</text>
      <text x="530" y="110" fontSize="10" className="fill-current text-muted-foreground">acid rises, meets solid, gas flows</text>
      <text x="530" y="140" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)">close tap →</text>
      <text x="530" y="160" fontSize="10" className="fill-current text-muted-foreground">gas pressure pushes acid back up —</text>
      <text x="530" y="178" fontSize="10" className="fill-current text-muted-foreground">reaction stops by itself</text>
      <text x="330" y="252" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">FeS + H₂SO₄ → FeSO₄ + H₂S↑ — the pressure valve is the whole trick</text>
    </svg>
  );
}
