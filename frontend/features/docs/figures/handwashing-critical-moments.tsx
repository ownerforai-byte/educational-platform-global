/** Handwashing critical moments — the five times that count. Well-detailed. Theme-aware. */
export function HandwashingCriticalMoments({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Handwashing critical moments five times before eating after toilet after changing nappies before cooking after handling animals raw food 20 seconds soap friction disease transmission diarrhoea respiratory F-diagram faeces fingers fluids fields fences prevention cheap intervention soap availability behaviour change nudges">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Handwashing — the five moments that break the chain</text>
      {/* moments */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1", "after the toilet", 130],
        ["2", "before eating or feeding a child", 230],
        ["3", "before cooking / handling food", 330],
        ["4", "after handling animals or raw meat", 430],
        ["5", "after nappy change or caring for the sick", 530],
      ].map(([n, label, x], i) => (
        <g key={n as string}>
          <circle cx={x as number} cy="110" r="26" className="fill-current text-sky-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="114" fontSize="9" textAnchor="middle" className="fill-current text-sky-700" fontWeight="800">{n as string}</text>
          <text x={x as number} y="156" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(label as string).slice(0, 26)}</text>
          <text x={x as number} y="168" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(label as string).slice(26, 52)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">soap + 20 seconds of friction — the mechanical action, not the soap's chemistry, does the removal</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The F-diagram (Curtis): faeces reach mouths via fingers, fluids, fields, floors and food — handwashing cuts the finger route, the busiest of the five.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Effect sizes: handwashing with soap cuts diarrhoea risk by roughly a third and respiratory infections by about a fifth.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name three of the five moments and the F-diagram routes — the classic sanitation answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The cheapest vaccine ever invented is a bar of soap used five times a day.</text>
    </svg>
  );
}
