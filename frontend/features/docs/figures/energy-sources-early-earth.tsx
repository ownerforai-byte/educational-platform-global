/** Energy sources early Earth — UV lightning volcanism. Well-detailed. Theme-aware. */
export function EnergySourcesEarlyEarth({ className }: { className?: string }) {
  const sources: [string, string, string][] = [
    ["UV radiation", "no ozone shield — hard ultraviolet reached the surface", "rgb(139 92 246)"],
    ["Lightning", "storm discharges pumping energy into the sky", "rgb(245 158 11)"],
    ["Volcanic heat", "fissures and lava heating sea and air", "rgb(244 63 94)"],
    ["Cosmic / shock waves", "meteor impacts delivering energy and material", "rgb(2 132 199)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Energy sources early Earth ultraviolet lightning volcanic heat meteor impacts primordial atmosphere no ozone shield chemical evolution energy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four energy sources that cooked the primordial soup</text>
      {sources.map(([name, detail, rgb], i) => {
        const x = 30 + i * 172;
        return (
          <g key={name}>
            <rect x={x} y="44" width="158" height="180" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 79} y="66" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* icon */}
            {i === 0 && <circle cx={x + 79} cy="106" r="18" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: rgb }} strokeDasharray="4 3" />}
            {i === 1 && <path d={`M${x + 79} 88 l-12 22 h10 l-8 20 l20 -26 h-10 l10 -16`} className="fill-current" style={{ color: rgb, opacity: 0.5 }} />}
            {i === 2 && <path d={`M${x + 61} 128 q18 -34 36 0 q-8 -8 -18 0 q-10 -8 -18 0`} className="fill-current" style={{ color: rgb, opacity: 0.5 }} />}
            {i === 3 && <path d={`M${x + 79} 88 l14 30 h-10 l6 20 l-20 -26 h10 z`} className="fill-current" style={{ color: rgb, opacity: 0.5 }} />}
            <text x={x + 12} y="158" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 26)}</text>
            <text x={x + 12} y="172" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(26, 52)}</text>
            <text x={x + 12} y="196" fontSize="6.4" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{["UV rays", "electric discharge", "volcanic heat", "impact shock"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="238" width="660" height="54" rx="10" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why energy mattered: bonds do not break and re-form for free — every step of chemical evolution needed an energy input.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: with no free O₂ and no ozone, ultraviolet and lightning were the two biggest energy supplies.</text>
    </svg>
  );
}
