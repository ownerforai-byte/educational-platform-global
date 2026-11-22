export function DehydrationTemperatureFork({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Ethanol dehydration — temperature is the switch</text>
      <rect x="60" y="50" width="220" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="170" y="72" fontSize="14" textAnchor="middle" fill="rgb(245 158 11)" fontWeight="600">~140 °C</text>
      <text x="170" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">excess ethanol, lower T</text>
      <rect x="60" y="130" width="220" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="170" y="152" fontSize="14" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">~170 °C</text>
      <text x="170" y="172" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">excess acid, higher T</text>
      <line x1="280" y1="77" x2="320" y2="77" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="280" y1="157" x2="320" y2="157" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="335" y="50" width="290" height="55" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="480" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">C₂H₅–O–C₂H₅</text>
      <text x="480" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">diethyl ether (substitution)</text>
      <rect x="335" y="130" width="290" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="480" y="152" fontSize="12" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">CH₂=CH₂</text>
      <text x="480" y="172" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethene (elimination)</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Same reagents, one dial: 30 degrees decide between ether and alkene.</text>
    </svg>
  );
}
