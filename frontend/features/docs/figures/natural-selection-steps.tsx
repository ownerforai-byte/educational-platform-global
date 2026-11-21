/** Natural selection steps — mechanism in five moves. Well-detailed. Theme-aware. */
export function NaturalSelectionSteps({ className }: { className?: string }) {
  const steps: [string, string][] = [
    ["Variation appears", "mutations and recombination — no two individuals alike"],
    ["Struggle intervenes", "predators, drought, disease, competition"],
    ["Selection acts", "the best-suited variants survive and reproduce more"],
    ["Genes pass on", "beneficial alleles rise in frequency each generation"],
    ["Adaptation results", "the population fits its environment ever better"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Natural selection steps variation struggle selection inheritance adaptation mechanism five stages differential survival reproduction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Natural selection — the mechanism in five moves</text>
      {steps.map(([name, detail], i) => {
        const x = 30 + i * 136;
        return (
          <g key={name}>
            <rect x={x} y="52" width="122" height="150" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 61} y="74" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <circle cx={x + 61} cy="108" r="16" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} strokeDasharray={i === 2 ? "3 2" : undefined} />
            <text x={x + 61} y="112" fontSize="6.4" textAnchor="middle" className="fill-current" style={{ color: "rgb(2 132 199 / 0.9)" }}>{["V", "S", "✓", "→", "A"][i]}</text>
            <text x={x + 8} y="142" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 26)}</text>
            <text x={x + 8} y="154" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(26, 52)}</text>
            <text x={x + 8} y="166" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(52, 78)}</text>
            {i < 4 && <path d={`M${x + 124} 127 l10 0 m-4 -4 l4 4 l-4 4`} className="fill-none stroke-current text-amber-600" strokeWidth="2" style={{ color: "rgb(217 119 6 / 0.9)" }} />}
          </g>
        );
      })}
      <rect x="30" y="216" width="660" height="74" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="236" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Selection is not 'nature choosing' — it is differential survival and reproduction of variants that already exist.</text>
      <text x="360" y="254" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">It cannot create variation from scratch; it can only screen what mutation and recombination supply.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'selection acts on existing variation' — write this sentence and you have separated Darwinism from Lamarckism.</text>
    </svg>
  );
}
