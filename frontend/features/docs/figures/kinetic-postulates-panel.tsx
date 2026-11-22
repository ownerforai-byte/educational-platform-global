export function KineticPostulatesPanel({ className }: { className?: string }) {
  const items = [
    { n: "1", t: "Tiny points", d: "Molecular volume negligible vs container" },
    { n: "2", t: "Random flight", d: "Straight lines, collisions change direction" },
    { n: "3", t: "No forces", d: "Independent except at collision instants" },
    { n: "4", t: "Elastic hits", d: "Kinetic energy conserved in every collision" },
    { n: "5", t: "KE - T", d: "Average KE proportional to absolute T" },
  ];
  return (
    <svg viewBox="0 0 560 250" role="img" aria-label="Five postulates of the kinetic molecular theory" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Kinetic Molecular Theory - Five Postulates</text>
      {items.map((it, i) => (
        <g key={i} transform={`translate(20, ${40 + i * 40})`}>
          <rect width="520" height="34" rx="6" className="fill-current opacity-5" />
          <circle cx="22" cy="17" r="13" className="fill-current opacity-20" />
          <text x="22" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{it.n}</text>
          <text x="45" y="15" fontSize="12.5" fontWeight="600" fill="currentColor">{it.t}</text>
          <text x="45" y="29" fontSize="11" className="fill-current opacity-70">{it.d}</text>
        </g>
      ))}
      <text x="280" y="242" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Together these reproduce Boyle, Charles and Dalton - and define the ideal gas</text>
    </svg>
  );
}
