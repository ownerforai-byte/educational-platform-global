export function ThreeBehaviourTable({ className }: { className?: string }) {
  const rows = [
    { b: "Water movement", e: "loses lattice water", h: "absorbs on surface", d: "absorbs and dissolves" },
    { b: "Final state", e: "powder", h: "damp solid", d: "solution puddle" },
    { b: "Example", e: "Na2CO3.10H2O", h: "CaO, silica gel", d: "CaCl2.6H2O, KOH" },
  ];
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Efflorescent hygroscopic and deliquescent comparison" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Three Behaviours, One Gradient</text>
      <text x="200" y="46" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">Efflorescent</text>
      <text x="360" y="46" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">Hygroscopic</text>
      <text x="490" y="46" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="currentColor">Deliquescent</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(40, ${58 + i * 42})`}>
          <rect width="480" height="36" rx="6" className="fill-current opacity-5" />
          <text x="12" y="23" fontSize="10.5" fontWeight="600" fill="currentColor">{r.b}</text>
          <text x="200" y="23" textAnchor="middle" fontSize="10.5" fill="currentColor">{r.e}</text>
          <text x="360" y="23" textAnchor="middle" fontSize="10.5" fill="currentColor">{r.h}</text>
          <text x="490" y="23" textAnchor="middle" fontSize="10.5" fill="currentColor">{r.d}</text>
        </g>
      ))}
      <text x="280" y="228" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Direction of water travel separates the trio</text>
    </svg>
  );
}
