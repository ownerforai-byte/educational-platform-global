/** Balanced diet plate — proportions on a plate. Well-detailed. Theme-aware. */
export function BalancedDietPlate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Balanced diet plate proportions carbohydrate half vegetables quarter protein quarter dairy water energy giving body building protective foods functions dal bhat model">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The balanced plate — proportions, not perfection</text>
      {/* plate */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <circle cx="195" cy="150" r="70" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(120 113 108 / 0.5)" }} />
      <path d="M195 150 L195 80 A70 70 0 0 1 259 185 Z" className="fill-current" style={{ color: "rgb(217 119 6 / 0.45)" }} />
      <path d="M195 150 L259 185 A70 70 0 0 1 125 185 Z" className="fill-current" style={{ color: "rgb(220 38 38 / 0.4)" }} />
      <path d="M195 150 L125 185 A70 70 0 0 1 131 115 Z" className="fill-current" style={{ color: "rgb(22 163 74 / 0.4)" }} />
      <path d="M195 150 L131 115 A70 70 0 0 1 195 80 Z" className="fill-current" style={{ color: "rgb(132 204 22 / 0.4)" }} />
      <text x="232" y="120" fontSize="6" className="fill-current text-foreground" fontWeight="700">carbs ½</text>
      <text x="228" y="188" fontSize="6" className="fill-current text-foreground" fontWeight="700">protein ¼</text>
      <text x="140" y="172" fontSize="6" className="fill-current text-foreground" fontWeight="700">veg ¼</text>
      <text x="150" y="110" fontSize="6" className="fill-current text-foreground" fontWeight="700">fruit</text>
      <text x="195" y="240" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">plus dairy and water on the side — the plate model beats memorising food groups</text>
      {/* three functions */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THREE JOBS OF FOOD</text>
      {[
        ["Energy-giving", "carbohydrates and fats — rice, ghee, oil"],
        ["Body-building", "proteins — dal, egg, meat, milk"],
        ["Protective", "vitamins and minerals — vegetables, fruit"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 34} fontSize="7" className="fill-current text-sky-600" fontWeight="800">{k}</text>
          <text x="406" y={112 + i * 34} fontSize="6.4" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="540" y="210" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">dal-bhat-tarkari already follows the plate:</text>
      <text x="540" y="226" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">rice (energy), dal (building), tarkari (protective)</text>
      <text x="540" y="248" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">no single food contains all nutrients —</text>
      <text x="540" y="262" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">balance comes from combination</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: classify foods into energy-giving, body-building, protective — and give one example of each.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A balanced diet varies with age, work and pregnancy — needs are not one-size-fits-all.</text>
    </svg>
  );
}
