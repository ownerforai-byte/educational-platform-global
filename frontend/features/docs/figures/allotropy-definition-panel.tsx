// Allotropy definition panel with oxygen examples. Theme-aware.
export function AllotropyDefinitionPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Definition of allotropy with oxygen's dioxygen and ozone as the example pair">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Allotropy: one element, several faces</text>
      <rect x="40" y="50" width="580" height="52" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <text x="330" y="74" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Same element, different structural forms in the same physical state</text>
      <text x="330" y="94" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">different atomic arrangement → different properties</text>
      <rect x="60" y="118" width="250" height="60" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.16" />
      <text x="185" y="144" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">O₂ (dioxygen)</text>
      <text x="185" y="164" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">stable, odourless, paramagnetic</text>
      <rect x="350" y="118" width="250" height="60" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="475" y="144" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">O₃ (ozone)</text>
      <text x="475" y="164" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unstable, pungent, stronger oxidant</text>
      <text x="330" y="212" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Carbon's diamond and graphite, phosphorus's white and red - the same story</text>
    </svg>
  );
}
