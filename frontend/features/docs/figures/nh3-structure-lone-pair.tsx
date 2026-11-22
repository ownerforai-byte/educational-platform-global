// Ammonia structure with lone pair. Theme-aware.
export function Nh3StructureLonePair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Pyramidal ammonia structure with 107 degree bond angle and lone pair driving basicity and donor behaviour">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">One lone pair runs the show</text>
      <circle cx="330" cy="90" r="20" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.35" />
      <text x="330" y="96" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">N</text>
      <circle cx="270" cy="150" r="12" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.3" />
      <circle cx="390" cy="150" r="12" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.3" />
      <circle cx="330" cy="170" r="12" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.3" />
      <line x1="318" y1="102" x2="278" y2="142" stroke="currentColor" strokeWidth="2" className="text-foreground" />
      <line x1="342" y1="102" x2="382" y2="142" stroke="currentColor" strokeWidth="2" className="text-foreground" />
      <line x1="330" y1="110" x2="330" y2="158" stroke="currentColor" strokeWidth="2" className="text-foreground" />
      <text x="392" y="60" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">lone pair ↑</text>
      <text x="330" y="206" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">sp³, angle 107° (compressed from 109.5°) · pyramidal</text>
      <text x="330" y="228" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">the pair donates: NH₄⁺, complexes, H-bonds - everything basic about NH₃</text>
    </svg>
  );
}
