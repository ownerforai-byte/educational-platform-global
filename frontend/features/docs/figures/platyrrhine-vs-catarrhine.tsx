/** Platyrrhine vs catarrhine nose and tail anatomy. Theme-aware. */
export function PlatyrrhineVsCatarrhine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Platyrrhine versus catarrhine nose flat wide septum nostrils facing sideways versus narrow downward nostrils and prehensile versus non prehensile tail">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The two monkey faces — and two tails</text>

      {/* platyrrhine */}
      <rect x="40" y="50" width="280" height="120" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="180" cy="105" r="34" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <circle cx="168" cy="100" r="4" className="fill-current text-sky-700" />
      <circle cx="192" cy="100" r="4" className="fill-current text-sky-700" />
      <line x1="180" y1="88" x2="180" y2="112" strokeWidth="4" className="stroke-current text-sky-700" />
      <text x="180" y="156" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">PLATYRRHINE — flat, wide septum, nostrils sideways</text>

      {/* catarrhine */}
      <rect x="340" y="50" width="280" height="120" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <circle cx="480" cy="105" r="34" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <ellipse cx="472" cy="104" rx="3.5" ry="5" className="fill-current text-emerald-700" />
      <ellipse cx="488" cy="104" rx="3.5" ry="5" className="fill-current text-emerald-700" />
      <text x="480" y="156" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">CATARRHINE — narrow, downward nostrils</text>

      <text x="16" y="194" fontSize="8.4" className="fill-current text-muted-foreground">Tails: New World — long, often prehensile (grasping: spider, howler); Old World — never prehensile.</text>
    </svg>
  );
}
