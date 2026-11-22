// P4 strain tetrahedron. Theme-aware.
export function P4StrainTetrahedron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="White phosphorus P4 tetrahedron with 60 degree bond angles versus normal 109.5 degrees showing strain">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">P₄: a spring compressed into a tetrahedron</text>
      <polygon points="330,60 430,130 330,200 230,130" fill="none" stroke="rgb(245 158 11)" strokeWidth="3" />
      <line x1="330" y1="60" x2="330" y2="200" stroke="rgb(245 158 11)" strokeWidth="2" opacity="0.7" />
      <line x1="230" y1="130" x2="430" y2="130" stroke="rgb(245 158 11)" strokeWidth="2" opacity="0.7" />
      {[[330, 60], [430, 130], [330, 200], [230, 130]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.6" />
      ))}
      <text x="330" y="136" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">60°</text>
      <text x="500" y="110" fontSize="11.5" className="fill-current text-muted-foreground">normal sp³: 109.5°</text>
      <text x="500" y="132" fontSize="11.5" className="fill-current text-muted-foreground">P₄ forced: 60°</text>
      <text x="500" y="154" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)">→ high strain energy</text>
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Strained bonds snap easily — hence spontaneous ignition at ~35 °C</text>
    </svg>
  );
}
