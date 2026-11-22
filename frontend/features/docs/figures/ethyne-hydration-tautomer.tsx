export function EthyneHydrationTautomer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Hydration of ethyne — the enol detour</text>
      <rect x="40" y="55" width="170" height="55" rx="6" fill="none" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="125" y="77" fontSize="13" textAnchor="middle" fill="currentColor" fontWeight="600">HC≡CH</text>
      <text x="125" y="97" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">ethyne</text>
      <line x1="225" y1="82" x2="265" y2="82" stroke="rgb(245 158 11)" strokeWidth="2" markerEnd="url(#ar117b)" />
      <marker id="ar117b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(245 158 11)" /></marker>
      <text x="245" y="68" fontSize="9" textAnchor="middle" fill="rgb(245 158 11)">H₂O</text>
      <text x="245" y="95" fontSize="8" textAnchor="middle" fill="rgb(148 163 184)">H₂SO₄/HgSO₄</text>
      <rect x="280" y="55" width="170" height="55" rx="6" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" />
      <text x="365" y="77" fontSize="11" textAnchor="middle" fill="currentColor" fontWeight="600">CH₂=CHOH</text>
      <text x="365" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">vinyl alcohol (enol)</text>
      <line x1="465" y1="82" x2="505" y2="82" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ar117b)" />
      <marker id="ar117b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgb(16 185 129)" /></marker>
      <text x="485" y="68" fontSize="9" textAnchor="middle" fill="rgb(16 185 129)">tautomerise</text>
      <rect x="520" y="55" width="110" height="55" rx="6" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="575" y="77" fontSize="11" textAnchor="middle" fill="rgb(16 185 129)" fontWeight="600">CH₃CHO</text>
      <text x="575" y="97" fontSize="9" textAnchor="middle" fill="rgb(148 163 184)">acetaldehyde</text>
      <rect x="60" y="130" width="540" height="50" rx="6" fill="none" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <text x="330" y="152" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">The O–H hydrogen migrates to carbon; the π bond shifts — enol → keto.</text>
      <text x="330" y="172" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Ethyne is the only alkyne giving an aldehyde; all others give ketones.</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Markovnikov addition puts OH on the internal carbon — hence the enol at all.</text>
    </svg>
  );
}
