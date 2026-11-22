// NaGlucoseSymport figure. Theme-aware.
export function NaGlucoseSymport({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Sodium glucose symporter carrying glucose against its gradient in the intestine">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na⁺–glucose symport — one rides, one pays</text>
      <rect x="150" y="55" width="360" height="110" rx="14" fill="rgb(59 130 246)" opacity="0.06" stroke="rgb(59 130 246)" strokeDasharray="4 3" />
      <text x="330" y="75" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">intestinal lining (SGLT carrier spans the membrane)</text>
      <text x="220" y="105" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">gut lumen</text>
      <text x="440" y="105" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">inside cell</text>
      <path d="M 250 130 C 300 118, 360 118, 410 130" stroke="rgb(239 68 68)" strokeWidth="3" fill="none" markerEnd="url(#ngs-a)" />
      <text x="330" y="112" fontSize="10" fill="rgb(239 68 68)" textAnchor="middle">Na⁺ DOWN its gradient</text>
      <path d="M 250 150 C 300 162, 360 162, 410 150" stroke="rgb(139 92 246)" strokeWidth="3" fill="none" markerEnd="url(#ngs-b)" />
      <text x="330" y="176" fontSize="10" fill="rgb(139 92 246)" textAnchor="middle">glucose UP its gradient (same carrier)</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same direction, same step = symport · kidney tubules do the same reclaiming</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">the gradient was built by the Na⁺/K⁺ pump with ATP — hence "secondary"</text>
      <defs>
        <marker id="ngs-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
        <marker id="ngs-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(139 92 246)" /></marker>
      </defs>
    </svg>
  );
}
