export function HaloformSilverRoute({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Haloform + hot silver — halide scavenging</text>
      <rect x="40" y="50" width="180" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="130" y="72" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">CHCl₃</text>
      <text x="130" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">chloroform</text>
      <line x1="235" y1="77" x2="275" y2="77" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar116d)" />
      <marker id="ar116d" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="255" y="64" fontSize="9" textAnchor="middle" fill="rgb(245 158 11)">2Ag, heat</text>
      <rect x="290" y="50" width="140" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="360" y="72" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">HC≡CH</text>
      <text x="360" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethyne</text>
      <rect x="445" y="50" width="175" height="55" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="532" y="72" fontSize="12" textAnchor="middle" fill="currentColor">+ 2AgCl</text>
      <text x="532" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">white solid</text>
      <rect x="40" y="130" width="580" height="55" rx="6" fill="none" stroke="rgb(20 184 166)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="12" textAnchor="middle" fill="rgb(20 184 166)" fontWeight="600">CHI₃ + 2Ag → HC≡CH + 2AgI — same route, iodoform</text>
      <text x="330" y="172" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">driving force: the stability of the silver halide lattice</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Silver's love of halide pays for the whole dehalogenation.</text>
    </svg>
  );
}
