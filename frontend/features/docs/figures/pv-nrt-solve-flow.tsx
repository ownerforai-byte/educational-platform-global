export function PvNrtSolveFlow({ className }: { className?: string }) {
  const forms = [
    { f: "n = PV/RT", u: "find moles" },
    { f: "m = nM", u: "find mass" },
    { f: "d = PM/RT", u: "find density" },
    { f: "M = dRT/P", u: "identify the gas" },
  ];
  return (
    <svg viewBox="0 0 560 230" role="img" aria-label="Working forms of the ideal gas equation" className={className}>
      <text x="280" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">PV = nRT - Four Working Forms</text>
      {forms.map((f, i) => (
        <g key={i} transform={`translate(${40 + (i % 2) * 280}, ${50 + Math.floor(i / 2) * 62})`}>
          <rect width="240" height="50" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1" />
          <text x="120" y="22" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor">{f.f}</text>
          <text x="120" y="40" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">{f.u}</text>
        </g>
      ))}
      <text x="280" y="195" textAnchor="middle" fontSize="11" className="fill-current opacity-75">Worked: d = 1.96 g/L at STP gives M = 44 - carbon dioxide</text>
      <text x="280" y="215" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Kelvin temperature, matched R units</text>
    </svg>
  );
}
