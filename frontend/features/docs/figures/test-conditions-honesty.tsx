export function TestConditionsHonesty({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Conditions keep the tests honest</text>
      <rect x="40" y="50" width="280" height="60" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="180" y="72" fontSize="11" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">Bromine water: DARK + cold</text>
      <text x="180" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">UV would let alkanes substitute → false positive</text>
      <rect x="340" y="50" width="280" height="60" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="480" y="72" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">KMnO₄: COLD + dilute</text>
      <text x="480" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">hot/conc would cleave → wrong products</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The discriminating power lives in the contrast: instant addition vs UV-only substitution.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Remove the condition and the negative control — ethane — stops being trustworthy.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">State the conditions in the answer; they carry marks of their own.</text>
    </svg>
  );
}
