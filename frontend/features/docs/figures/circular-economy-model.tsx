/** Circular economy model — closing the loop. Well-detailed. Theme-aware. */
export function CircularEconomyModel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Circular economy model linear take make waste versus circular reduce reuse repair recycle loop diagram materials flow closed loop design durability remanufacture Ellen MacArthur butterfly diagram examples products as services sharing economy take back schemes">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Circular economy — closing the loop</text>
      {/* linear vs circular */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LINEAR (take → make → waste)</text>
      {[
        "extract raw material",
        "manufacture product",
        "consume and discard",
        "landfill or incinerate —",
        "  value destroyed, resources",
        "  gone for good",
        "the model assumes infinite",
        "  inputs and infinite sinks —",
        "  both assumptions are false",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* circular */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CIRCULAR (design out waste)</text>
      {[
        "priority order: reduce, then",
        "  reuse, then repair, then",
        "  remanufacture, then recycle",
        "design for durability and",
        "  disassembly — waste is a",
        "  design failure",
        "products become services:",
        "  leasing, sharing, take-back",
        "  schemes keep ownership",
        "the loop keeps materials at",
        "  their highest value as long",
        "  as possible",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: the 4 R's in priority order — reduce beats reuse beats repair beats recycle; recycling is the LAST resort, not the first.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">A circular economy treats waste as a design flaw, not a management problem.</text>
    </svg>
  );
}
