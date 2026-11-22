export function ThermoLyotropicSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Thermotropic versus lyotropic liquid crystals" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Two Ways Into the Mesophase</text>
      <g transform="translate(50, 50)">
        <rect width="220" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        <text x="110" y="30" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="currentColor">Thermotropic</text>
        <text x="110" y="55" textAnchor="middle" fontSize="10.5" fill="currentColor">driver: temperature</text>
        <text x="110" y="75" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">cholesteryl benzoate, PAA</text>
        <text x="110" y="95" textAnchor="middle" fontSize="10" className="fill-current opacity-70">mesophase 145.5-178.5 C</text>
      </g>
      <g transform="translate(290, 50)">
        <rect width="220" height="110" rx="8" className="fill-current opacity-5" stroke="currentColor" strokeWidth="1.2" />
        <text x="110" y="30" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="currentColor">Lyotropic</text>
        <text x="110" y="55" textAnchor="middle" fontSize="10.5" fill="currentColor">driver: solvent concentration</text>
        <text x="110" y="75" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">soap in water, DNA solutions</text>
        <text x="110" y="95" textAnchor="middle" fontSize="10" className="fill-current opacity-70">cell membranes live here</text>
      </g>
      <text x="280" y="195" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Same rod-like molecules, two different dials that order them</text>
    </svg>
  );
}
