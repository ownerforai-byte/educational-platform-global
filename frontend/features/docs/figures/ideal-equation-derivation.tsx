export function IdealEquationDerivation({ className }: { className?: string }) {
  const steps = [
    { l: "Boyle", d: "V proportional to 1/P (T, n fixed)" },
    { l: "Charles", d: "V proportional to T (P, n fixed)" },
    { l: "Avogadro", d: "V proportional to n (T, P fixed)" },
    { l: "Combine", d: "V proportional to nT/P" },
    { l: "Insert R", d: "PV = nRT" },
  ];
  return (
    <svg viewBox="0 0 560 250" role="img" aria-label="Derivation of the ideal gas equation from three laws" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Deriving PV = nRT</text>
      {steps.map((s, i) => (
        <g key={i} transform={`translate(40, ${38 + i * 40})`}>
          <rect width="480" height="34" rx="6" className="fill-current opacity-5" />
          <text x="14" y="22" fontSize="12" fontWeight="700" fill="currentColor">{s.l}</text>
          <text x="110" y="22" fontSize="11.5" fill="currentColor">{s.d}</text>
        </g>
      ))}
      <text x="280" y="242" textAnchor="middle" fontSize="10.5" className="fill-current opacity-60">Each partial law is recovered by holding the other variables constant</text>
    </svg>
  );
}
