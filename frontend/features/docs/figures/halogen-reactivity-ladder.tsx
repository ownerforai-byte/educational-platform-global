export function HalogenReactivityLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-hidden="true">
      <rect x="0" y="0" width="660" height="240" fill="none" />
      <text x="330" y="24" fontSize="14" textAnchor="middle" fill="currentColor" fontWeight="600">Halogen reactivity toward alkanes</text>
      <circle cx="120" cy="110" r="32" fill="none" stroke="rgb(239 68 68)" strokeWidth="3" />
      <text x="120" y="115" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">F₂</text>
      <circle cx="250" cy="110" r="32" fill="none" stroke="rgb(245 158 11)" strokeWidth="3" />
      <text x="250" y="115" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">Cl₂</text>
      <circle cx="380" cy="110" r="32" fill="none" stroke="rgb(16 185 129)" strokeWidth="3" />
      <text x="380" y="115" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">Br₂</text>
      <circle cx="510" cy="110" r="32" fill="none" stroke="rgb(148 163 184)" strokeWidth="3" />
      <text x="510" y="115" fontSize="15" textAnchor="middle" fill="currentColor" fontWeight="600">I₂</text>
      <text x="120" y="165" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">explosive</text>
      <text x="250" y="165" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">hν / heat</text>
      <text x="380" y="165" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">hν, slow</text>
      <text x="510" y="165" fontSize="10" textAnchor="middle" fill="rgb(148 163 184)">reversible</text>
      <text x="330" y="50" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight="600">reactivity falls: F₂ &gt; Cl₂ &gt; Br₂ &gt; I₂</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" fill="rgb(148 163 184)">Fluorine needs no activation at all; iodine must be coaxed with oxidant (HNO₃/HIO₃).</text>
    </svg>
  );
}
