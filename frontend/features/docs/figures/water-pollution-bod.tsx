/** BOD and eutrophication — oxygen demand and algal bloom cascade. Theme-aware. */
export function WaterPollutionBod({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="BOD biochemical oxygen demand and eutrophication cascade fertiliser runoff algal bloom oxygen depletion fish kills Phewa Lake with heavy metals mercury Minamata and arsenic in Terai groundwater">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">BOD and eutrophication — how water suffocates</text>

      {/* cascade */}
      {[
        { x: 100, t: "1. NUTRIENT IN", s: "fertiliser runoff adds", s2: "nitrates + phosphates", c: "rgb(22 163 74 / 0.9)" },
        { x: 240, t: "2. ALGAL BLOOM", s: "algae explode across", s2: "the lake surface", c: "rgb(132 204 22 / 0.9)" },
        { x: 380, t: "3. OXYGEN CRASH", s: "bloom decays; microbes", s2: "consume dissolved oxygen", c: "rgb(245 158 11 / 0.9)" },
        { x: 520, t: "4. FISH KILL", s: "aquatic life suffocates;", s3: "water turns anaerobic,", s2: "foul-smelling", c: "rgb(244 63 94 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="60" width="124" height="96" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="82" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="102" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="118" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          {i === 3 && <text x={n.x} y="134" fontSize="6.9" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>}
          {i < 3 && <path d={`M${n.x + 64} 108 h${74}`} markerEnd="url(#arrw)" strokeWidth="2.5" className="stroke-current text-muted-foreground" />}
        </g>
      ))}
      <defs><marker id="arrw" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-muted-foreground" /></marker></defs>

      <rect x="40" y="172" width="580" height="60" rx="10" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="56" y="192" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">BOD (Biochemical Oxygen Demand): O₂ (mg/L) microbes need to decompose organic waste in 5 days at 20 °C — high BOD = heavy organic pollution.</text>
      <text x="56" y="210" fontSize="8.2" className="fill-current text-muted-foreground">Heavy metals ride the same food chain: mercury biomagnifies (Minamata disease); arsenic contaminates Terai groundwater.</text>
      <text x="56" y="226" fontSize="8.2" className="fill-current text-muted-foreground">Nepal's warning case: Phewa Lake's creeping eutrophication.</text>
    </svg>
  );
}
