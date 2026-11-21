/** Animal phyla overview tree — from Porifera to Chordata with key splits. Theme-aware. */
export function PhylaOverviewTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Animal phyla overview tree showing major body plan splits from porifera through cnidaria platyhelminthes nematoda annelida arthropoda mollusca echinodermata to chordata">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The animal family tree — where each phylum branches</text>

      <line x1="60" y1="270" x2="620" y2="60" strokeWidth="4" className="stroke-current text-emerald-600" />
      {[
        { x: 60, y: 270, t: "Porifera", s: "no tissues", c: "rgb(120 113 108 / 0.9)" },
        { x: 130, y: 244, t: "Cnidaria", s: "diploblastic, radial", c: "rgb(20 184 166 / 0.9)" },
        { x: 210, y: 213, t: "Platyhelminthes", s: "triploblastic, acoelom", c: "rgb(14 165 233 / 0.9)" },
        { x: 280, y: 185, t: "Nematoda", s: "pseudocoelom", c: "rgb(16 185 129 / 0.9)" },
        { x: 350, y: 157, t: "Annelida", s: "true coelom", c: "rgb(245 158 11 / 0.9)" },
        { x: 430, y: 124, t: "Arthropoda", s: "jointed legs", c: "rgb(244 63 94 / 0.9)" },
        { x: 500, y: 96, t: "Mollusca", s: "soft body + shell", c: "rgb(124 58 237 / 0.9)" },
        { x: 560, y: 74, t: "Echinodermata", s: "spiny skin", c: "rgb(217 119 6 / 0.9)" },
        { x: 620, y: 52, t: "Chordata", s: "notochord → us", c: "rgb(22 163 74 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <line x1={n.x} y1={n.y} x2={n.x} y2={n.y - 22} strokeWidth="2" className="stroke-current text-muted-foreground" />
          <text x={n.x} y={n.y - 28} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y={n.y + 16} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">Milestones on the climb: tissues → symmetry → 3 germ layers → body cavity → coelom → jointed limbs → backbone.</text>
    </svg>
  );
}
