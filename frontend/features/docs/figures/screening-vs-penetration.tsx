// Screening vs penetration order. Theme-aware.
export function ScreeningVsPenetration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Screening versus penetration diagram s orbital penetrates closest to nucleus p and d further out giving penetration order s greater p greater d and energy order s lower than p lower than d">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Penetration — why s sits below p sits below d</text>
      <circle cx="200" cy="110" r="14" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <ellipse cx="200" cy="110" rx="52" ry="18" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <ellipse cx="200" cy="110" rx="86" ry="34" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 4" style={{ color: "rgb(16 185 129 / 0.8)" }} />
      <ellipse cx="200" cy="110" rx="118" ry="50" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 5" style={{ color: "rgb(245 158 11 / 0.8)" }} />
      <text x="200" y="180" fontSize="8.4" textAnchor="middle" className="fill-current text-muted-foreground">s penetrates closest · p middle · d outermost</text>
      <rect x="400" y="52" width="290" height="120" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="545" y="76" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Two connected orders</text>
      <text x="545" y="100" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Penetration: s &gt; p &gt; d &gt; f</text>
      <text x="545" y="122" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Energy (same n): s &lt; p &lt; d &lt; f</text>
      <text x="545" y="150" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">closer to the nucleus = better screened from</text>
      <text x="545" y="164" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">nothing = held tighter = lower energy</text>
      <rect x="30" y="196" width="660" height="18" rx="0" />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">This is why 4s can dip below 3d: the s cloud's deep penetration beats d's extra shielding disadvantage.</text>
    </svg>
  );
}
