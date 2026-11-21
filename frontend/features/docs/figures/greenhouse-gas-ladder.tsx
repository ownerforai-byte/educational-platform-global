/** Greenhouse gas ladder — who warms what. Well-detailed. Theme-aware. */
export function GreenhouseGasLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Greenhouse gas ladder carbon dioxide methane nitrous oxide CFCs water vapour sources energy agriculture refrigerants warming potential residence time comparison chart">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The greenhouse gas ladder — potency vs volume</text>
      {/* ladder chart */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WARMING POTENTIAL PER MOLECULE (CO₂ = 1)</text>
      {[
        ["CO₂", "fossil fuel, deforestation", "1×", "centuries in air", 60, "rgb(2 132 199)"],
        ["CH₄", "rice paddies, livestock, landfills", "28×", "~12 years", 170, "rgb(217 119 6)"],
        ["N₂O", "nitrogen fertiliser, combustion", "265×", "~110 years", 280, "rgb(139 92 246)"],
        ["CFCs", "old refrigerants (now banned)", "up to 10,000×", "decades–centuries", 390, "rgb(244 63 94)"],
      ].map(([gas, source, potency, life, w, rgb], i) => {
        const y = 92 + i * 32;
        return (
          <g key={gas as string}>
            <text x="46" y={y + 6} fontSize="7" className="fill-current" style={{ color: rgb as string }} fontWeight="800">{gas as string}</text>
            <rect x="90" y={y} width={w as number} height="14" rx="7" className="fill-current" style={{ color: `${rgb as string} / 0.35` }} stroke="currentColor" strokeWidth="1.2" />
            <text x={(90 as number) + (w as number) + 8} y={y + 6} fontSize="6.4" className="fill-current text-foreground" fontWeight="700">{potency as string}</text>
            <text x="480" y={y + 6} fontSize="5.8" className="fill-current text-muted-foreground">{source as string} · {life as string}</text>
          </g>
        );
      })}
      <text x="360" y="204" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">CO₂ dominates by sheer volume; methane dominates per molecule — cutting both needs different policies</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The mechanism: these gases let sunlight in but absorb outgoing infrared — a one-way valve for heat.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name four greenhouse gases with one source each; remember methane ≈ 28× CO₂ over a century.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Water vapour is the biggest greenhouse agent — but humans control it only indirectly, via temperature.</text>
    </svg>
  );
}
