export function DoubleEliminationLogic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Why the second elimination is harder</text>
      <rect x="60" y="50" width="240" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="180" y="72" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">Step 1: sp³ → sp²</text>
      <text x="180" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">HBr leaves, alkene forms — easy</text>
      <rect x="360" y="50" width="240" height="55" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="480" y="72" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">Step 2: sp² → sp</text>
      <text x="480" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">HBr leaves the vinyl carbon — hard</text>
      <rect x="60" y="125" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="147" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">s-character rises 25% → 33% → 50%: the carbon holds its H ever tighter.</text>
      <text x="330" y="167" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Ordinary alc. KOH stalls at the vinyl halide; NaNH₂ finishes the job.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Difficulty tracks s-character — the same principle that makes ≡C–H acidic.</text>
    </svg>
  );
}
