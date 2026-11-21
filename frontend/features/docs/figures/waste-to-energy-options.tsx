/** Waste to energy options — from problem to power. Well-detailed. Theme-aware. */
export function WasteToEnergyOptions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Waste to energy options incineration anaerobic digestion biogas landfill gas capture RDF refuse derived fuel pyrolysis electricity heat recovery advantages disadvantages dioxins emissions Nepal suitability organic fraction moisture high calorific value problem">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Waste to energy — four routes from problem to power</text>
      {/* four options */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Incineration", "burn at high heat → electricity; volume falls ~90%; watch dioxins", 130],
        ["Anaerobic digestion", "wet organic → biogas (CH₄) + slurry fertiliser", 300],
        ["Landfill gas capture", "collect CH₄ from existing dumps → burn for energy", 470],
        ["RDF / pyrolysis", "refuse-derived fuel or heat-without-air conversion", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="110" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="124" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="138" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(64, 96)}</text>
          <text x={x as number} y="166" fontSize="5.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{["power + heat", "biogas + fertiliser", "methane, not CO₂", "fuel + oil"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">energy recovery sits below recycling in the hierarchy — it beats landfill, never reuse</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's catch: waste is over half organic and very wet — high moisture means low calorific value, so incineration struggles without sorting first.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four routes (burn, digest, capture, convert) — and the moisture caveat that explains why biogas fits Nepal best.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Energy recovery is the last resort before disposal — never a reason to skip recycling.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The Sisdol and Banchare Danda sites show landfill gas capture as Nepal's practical first step.</text>
    </svg>
  );
}
