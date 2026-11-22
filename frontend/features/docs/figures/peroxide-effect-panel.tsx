export function PeroxideEffectPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">The peroxide effect — HBr's private reversal</text>
      <rect x="40" y="50" width="260" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="170" y="72" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)" fontWeight="600">No peroxide (Markovnikov)</text>
      <text x="170" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">propene + HBr → 2-bromopropane</text>
      <rect x="360" y="50" width="260" height="55" rx="6" fill="none" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="490" y="72" fontSize="11" textAnchor="middle" fill="rgb(239 68 68)" fontWeight="600">With peroxides (anti-M)</text>
      <text x="490" y="92" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">propene + HBr → 1-bromopropane</text>
      <rect x="60" y="125" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="147" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Peroxides homolyse → radicals → Br· adds FIRST → radical chain.</text>
      <text x="330" y="167" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The stabler radical puts Br on the H-rich carbon — opposite of the ionic path.</text>
      <rect x="60" y="185" width="540" height="40" rx="6" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" />
      <text x="330" y="207" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">Only HBr flips: Cl· too fast, I· too weak — bond energetics police the exception.</text>
    </svg>
  );
}
