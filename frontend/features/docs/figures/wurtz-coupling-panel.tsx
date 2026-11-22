export function WurtzCouplingPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Wurtz reaction — dry ether is non-negotiable</text>
      <text x="180" y="60" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">CH₃Br + 2Na + BrCH₃</text>
      <line x1="300" y1="55" x2="360" y2="55" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar112b)" />
      <marker id="ar112b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="420" y="60" fontSize="12" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₃–CH₃ + 2NaBr</text>
      <text x="330" y="88" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">anhydrous dry ether — heat</text>
      <rect x="60" y="105" width="240" height="70" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="180" y="128" fontSize="12" textAnchor="middle" fill="rgb(239 68 68)">If water is present</text>
      <text x="180" y="150" fontSize="11" textAnchor="middle" fill="rgb(239 68 68)">2Na + 2H₂O → 2NaOH + H₂</text>
      <text x="180" y="166" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Na is consumed → no coupling</text>
      <rect x="360" y="105" width="240" height="70" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="480" y="128" fontSize="12" textAnchor="middle" fill="rgb(59 130 246)">Why dry ether?</text>
      <text x="480" y="150" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">dissolves both RX and Na</text>
      <text x="480" y="166" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">inert — refuses to react with Na</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Ethyl bromide → butane; propyl bromide → hexane: +1 carbon each.</text>
    </svg>
  );
}
