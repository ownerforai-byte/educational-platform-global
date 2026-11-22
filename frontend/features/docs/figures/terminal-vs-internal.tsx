export function TerminalVsInternal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Terminal vs internal — one hydrogen of difference</text>
      <rect x="40" y="50" width="280" height="60" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="180" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">But-1-yne CH₃CH₂C≡C–H</text>
      <text x="180" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">terminal → Ag₂C₂ white, Cu₂C₂ red</text>
      <rect x="340" y="50" width="280" height="60" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="480" y="72" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">But-2-yne CH₃–C≡C–CH₃</text>
      <text x="480" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">internal → no precipitate, silent</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The ≡C–H hydrogen exists only at a chain end — acidity is positional.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">A negative test is information too: it certifies the internal isomer.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Structure probes: bromine water says unsaturated; ammoniacal tests say terminal.</text>
    </svg>
  );
}
