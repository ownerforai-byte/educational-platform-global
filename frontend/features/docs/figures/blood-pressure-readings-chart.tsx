/** Blood pressure readings chart — what the numbers mean. Well-detailed. Theme-aware. */
export function BloodPressureReadingsChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Blood pressure readings chart systolic diastolic 120 over 80 normal elevated hypertension stage categories table silent killer risks stroke heart attack measurement cuff lifestyle salt reduction dash diet medication adherence">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Blood pressure — reading the two numbers</text>
      {/* category table */}
      <rect x="30" y="40" width="200" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="130" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CATEGORY (mmHg)</text>
      <rect x="230" y="40" width="220" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="340" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">READING</text>
      <rect x="450" y="40" width="240" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT IT MEANS</text>
      {[
        ["Normal", "<120 / <80", "keep the habits"],
        ["Elevated", "120–129 / <80", "lifestyle correction window"],
        ["Stage 1 hypertension", "130–139 / 80–89", "lifestyle ± medication"],
        ["Stage 2 hypertension", "≥140 / ≥90", "medication + lifestyle"],
        ["Crisis", ">180 / >120", "immediate medical care"],
      ].map(([cat, read, mean], i) => {
        const y = 74 + i * 30;
        const rgb = ["rgb(16 185 129)", "rgb(217 119 6)", "rgb(217 119 6)", "rgb(244 63 94)", "rgb(220 38 38)"][i];
        return (
          <g key={cat}>
            <text x="46" y={y + 10} fontSize="6.6" className="fill-current text-foreground" fontWeight="700">{cat}</text>
            <text x="244" y={y + 10} fontSize="6.6" className="fill-current" style={{ color: rgb }} fontWeight="700">{read}</text>
            <text x="464" y={y + 10} fontSize="6.2" className="fill-current text-muted-foreground">{mean}</text>
          </g>
        );
      })}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The 'silent killer': hypertension has no symptoms until a vessel fails — stroke, heart attack, kidney damage.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 120/80 is the textbook normal — systole over diastole; know the category boundaries, not just the number.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Systolic = pressure during contraction; diastolic = during relaxation — define both terms for the full mark.</text>
    </svg>
  );
}
