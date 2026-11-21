/** Mushroom cultivation steps — compost to cropping. Theme-aware. */
export function MushroomCultivationSteps({ className }: { className?: string }) {
  const steps = [
    { t: "① Compost", s: "straw + manure,\nfermented & pasteurised" },
    { t: "② Spawning", s: "mix pure-culture\nspawn into compost" },
    { t: "③ Casing", s: "cover with moist soil\nlayer to trigger fruiting" },
    { t: "④ Pinning", s: "small pins form at\ncool, humid conditions" },
    { t: "⑤ Cropping", s: "harvest flushes\nevery 7–10 days" },
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Mushroom cultivation five steps compost spawning casing pinning and cropping with conditions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Growing mushrooms — five controlled steps</text>
      {steps.map((st, i) => (
        <g key={st.t}>
          <rect x={16 + i * 128} y="60" width="118" height="90" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x={75 + i * 128} y="84" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{st.t}</text>
          {st.s.split('\n').map((line, j) => (
            <text key={j} x={75 + i * 128} y={104 + j * 14} fontSize="7.3" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
          {i < 4 && <line x1={136 + i * 128} y1="105" x2={146 + i * 128} y2="105" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}
      <text x="16" y="180" fontSize="9.5" className="fill-current text-muted-foreground">Key controls: temperature ~22–27 °C for spawn run, ~16–18 °C for fruiting; high humidity; darkness until casing.</text>
      <text x="16" y="200" fontSize="9.5" className="fill-current text-muted-foreground">Nepal context: Pleurotus (oyster) and Agaricus are grown on rice/wheat straw — a low-cost rural cash crop.</text>
      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Why casing matters: the soil layer holds moisture and provides bacteria that signal the mycelium to fruit.</text>
    </svg>
  );
}
