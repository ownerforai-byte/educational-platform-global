// Nascent oxygen release from ozone. Theme-aware.
export function NascentORelease({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Ozone splitting into oxygen and nascent oxygen which performs all oxidising work">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">O₃ → O₂ + [O]: the workhorse split</text>
      <rect x="70" y="70" width="180" height="60" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.2" />
      <text x="160" y="106" fontSize="15" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">O₃</text>
      <path d="M 255 100 L 340 100" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" markerEnd="url(#arno)" />
      <rect x="350" y="70" width="110" height="60" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.18" />
      <text x="405" y="106" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">O₂</text>
      <rect x="480" y="70" width="120" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.18" />
      <text x="540" y="106" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">[O]</text>
      <defs><marker id="arno" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="180" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">Bleaching, disinfection, ozonolysis, iodide oxidation - all are [O] doing one job</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">while O₂ merely watches</text>
    </svg>
  );
}
