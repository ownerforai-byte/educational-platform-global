/** Frog hibernation winter mud — the shutdown sequence. Well-detailed. Theme-aware. */
export function FrogHibernationWinterMud({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["Temperature drops", "pond edges cool; activity fades"],
    ["Burrowing", "frog digs into pond-bottom mud or leaf litter"],
    ["Metabolic shutdown", "heart rate and oxygen use fall to a trickle"],
    ["Fuel reserve", "body fat and liver glycogen last the winter"],
    ["Spring revival", "warm water restarts the system; breeding follows"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog hibernation winter mud shutdown sequence burrowing pond bottom cold blooded metabolism slows glycogen spring revival cold blooded ectotherm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Hibernation — the shutdown sequence</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {steps.map(([title, detail], i) => {
        const x = 90 + (i % 3) * 220;
        const y = 90 + Math.floor(i / 3) * 84;
        return (
          <g key={title}>
            <rect x={x - 70} y={y - 22} width="180" height="66" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
            <text x={x + 20} y={y - 4} fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {title}</text>
            <text x={x + 20} y={y + 12} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 40)}</text>
            <text x={x + 20} y={y + 26} fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(40, 80)}</text>
          </g>
        );
      })}
      <text x="360" y="218" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">cold-blooded means the pond's temperature sets the frog's pace — no internal heater to fall back on</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Hibernation is not sleep — it is a survival state where the body runs on standby, burning reserves weeks at a time.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: hibernation = winter dormancy; aestivation = summer dormancy. Both are responses to an ectotherm's limits.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's hill frogs face colder winters — deeper mud, longer shutdown.</text>
    </svg>
  );
}
