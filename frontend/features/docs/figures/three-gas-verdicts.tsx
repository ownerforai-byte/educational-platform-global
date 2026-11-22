export function ThreeGasVerdicts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Verdict table — ethane, ethene, ethyne</text>
      <rect x="50" y="45" width="560" height="30" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="120" y="65" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Gas</text>
      <text x="280" y="65" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Br₂ water</text>
      <text x="430" y="65" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Baeyer's</text>
      <text x="560" y="65" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">AgNO₃/NH₃</text>
      <rect x="50" y="75" width="560" height="30" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="120" y="95" fontSize="11" textAnchor="middle" fill="currentColor">Ethane</text>
      <text x="280" y="95" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">no change</text>
      <text x="430" y="95" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">no change</text>
      <text x="560" y="95" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">none</text>
      <rect x="50" y="105" width="560" height="30" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="120" y="125" fontSize="11" textAnchor="middle" fill="currentColor">Ethene</text>
      <text x="280" y="125" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">decolourises</text>
      <text x="430" y="125" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">brown MnO₂</text>
      <text x="560" y="125" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">none</text>
      <rect x="50" y="135" width="560" height="30" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="120" y="155" fontSize="11" textAnchor="middle" fill="currentColor">Ethyne</text>
      <text x="280" y="155" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">decolourises ×2</text>
      <text x="430" y="155" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">brown MnO₂</text>
      <text x="560" y="155" fontSize="10" textAnchor="middle" fill="rgb(139 92 246)" fontWeight="600">white Ag₂C₂</text>
      <text x="330" y="195" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">One glance across the row identifies the gas — the table is the answer.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">NEB 2024: bromine water column separates ethane from the rest; AgNO₃ splits the rest.</text>
    </svg>
  );
}
