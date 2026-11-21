/** Phage infection mechanics — adsorption to injection. Well-detailed. Theme-aware. */
export function PhageInfectionSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["1. Adsorption", "tail fibres dock on host receptors"],
    ["2. Penetration", "sheath contracts, needle pierces wall"],
    ["3. Injection", "DNA travels down the tail tube"],
    ["4. Eclipse", "empty capsid stays outside — only DNA enters"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Phage infection steps adsorption tail fibres penetration sheath contraction injection DNA eclipse phase empty capsid outside T4 mechanism">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">How a phage gets its DNA in — four beats</text>
      {steps.map(([s, d], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={s}>
            <rect x={x} y="44" width="160" height="220" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={cx} y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{s}</text>
            {/* host wall */}
            <rect x={x + 15} y="150" width="130" height="14" rx="4" className="fill-current text-stone-500/30" stroke="currentColor" strokeWidth="1.4" />
            <text x={cx} y="178" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">host cell wall</text>
            {i === 0 && (
              <g>
                <polygon points={`${cx - 9},92 ${cx + 9},92 ${cx + 6},110 ${cx - 6},110`} className="fill-current text-sky-500/50" stroke="currentColor" strokeWidth="1.4" />
                <line x1={cx} y1="110" x2={cx} y2="132" className="stroke-current text-sky-600" strokeWidth="3" />
                <path d={`M${cx - 10} 132 q-8 8 -14 12 M${cx + 10} 132 q8 8 14 12`} className="fill-none stroke-current text-sky-600" strokeWidth="1.6" />
              </g>
            )}
            {i === 1 && (
              <g>
                <polygon points={`${cx - 9},92 ${cx + 9},92 ${cx + 6},104 ${cx - 6},104`} className="fill-current text-sky-500/50" stroke="currentColor" strokeWidth="1.4" />
                <line x1={cx} y1="104" x2={cx} y2="116" className="stroke-current text-sky-600" strokeWidth="3" />
                <line x1={cx - 6} y1="116" x2={cx - 6} y2="146" className="stroke-current text-sky-800" strokeWidth="2.4" />
                <line x1={cx + 6} y1="116" x2={cx + 6} y2="146" className="stroke-current text-sky-800" strokeWidth="2.4" />
                <line x1={cx} y1="112" x2={cx} y2="148" className="stroke-current text-sky-600" strokeWidth="2" />
              </g>
            )}
            {i === 2 && (
              <g>
                <polygon points={`${cx - 9},92 ${cx + 9},92 ${cx + 6},104 ${cx - 6},104`} className="fill-current text-sky-500/50" stroke="currentColor" strokeWidth="1.4" />
                <line x1={cx} y1="104" x2={cx} y2="116" className="stroke-current text-sky-600" strokeWidth="3" />
                <line x1={cx} y1="112" x2={cx} y2="166" className="stroke-current text-rose-500" strokeWidth="2.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
                <text x={cx + 12} y="164" fontSize="6.2" className="fill-current text-rose-500">DNA</text>
              </g>
            )}
            {i === 3 && (
              <g>
                <polygon points={`${cx - 9},92 ${cx + 9},92 ${cx + 6},104 ${cx - 6},104`} className="fill-current text-stone-400/40" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2" />
                <line x1={cx} y1="104" x2={cx} y2="116" className="stroke-current text-stone-400" strokeWidth="3" />
                <text x={cx} y="98" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">empty capsid</text>
                <line x1={cx} y1="120" x2={cx} y2="168" className="stroke-current text-rose-500" strokeWidth="2.6" style={{ color: "rgb(244 63 94 / 0.9)" }} strokeDasharray="4 3" />
              </g>
            )}
            <text x={cx} y="206" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(0, 30)}</text>
            <text x={cx} y="220" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{d.slice(30, 60)}</text>
            <text x={cx} y="246" fontSize="6.6" textAnchor="middle" className="fill-current text-sky-600">{["lock-on", "syringe fires", "payload delivered", "shell is litter"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the eclipse phase — an infected cell early on contains no complete phage, only injected DNA.</text>
    </svg>
  );
}
