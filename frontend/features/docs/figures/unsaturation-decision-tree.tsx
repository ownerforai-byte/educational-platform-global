export function UnsaturationDecisionTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Decision tree — three gases, two tests</text>
      <rect x="230" y="40" width="200" height="40" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="65" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Unknown gas</text>
      <line x1="330" y1="80" x2="180" y2="105" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="330" y1="80" x2="480" y2="105" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="60" y="105" width="240" height="45" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="180" y="127" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Br₂ water decolourised?</text>
      <text x="180" y="143" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">dark, cold</text>
      <rect x="360" y="105" width="240" height="45" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="480" y="127" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">Baeyer's: brown MnO₂?</text>
      <text x="480" y="143" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">cold, dilute</text>
      <line x1="180" y1="150" x2="180" y2="170" stroke="rgb(148 163 184)" strokeWidth="2" />
      <line x1="480" y1="150" x2="480" y2="170" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="150" y="182" fontSize="11" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">no → ethane</text>
      <text x="230" y="182" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">yes → unsat.</text>
      <text x="450" y="182" fontSize="11" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">no → ethane</text>
      <text x="530" y="182" fontSize="10" textAnchor="middle" fill="rgb(16 185 129)">yes → unsat.</text>
      <rect x="60" y="195" width="540" height="35" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="330" y="217" fontSize="10" textAnchor="middle" fill="rgb(59 130 246)">Both positive? Split ethene vs ethyne with ammoniacal AgNO₃ (white ppt = ethyne).</text>
    </svg>
  );
}
