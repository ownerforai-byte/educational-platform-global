/** Species threats and conservation actions table. Theme-aware. */
export function SpeciesThreatActions({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Species threats and conservation actions poaching for horn army-assisted anti-poaching translocation census monitoring camera trap surveys insurance schemes captive breeding and release nest protection">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Threat → action — what actually works</text>
      {[
        { y: 48, t: "RHINO", th: "poaching for horn; habitat loss", ac: "army-assisted anti-poaching; translocation to Bardia; census monitoring" },
        { y: 80, t: "TIGER", th: "poaching for bone/skin; prey depletion", ac: "camera-trap national surveys; anti-poaching units; Tx2 goal" },
        { y: 112, t: "SNOW LEOPARD", th: "retaliatory killing; prey decline", ac: "community insurance schemes; GSLEP programme" },
        { y: 144, t: "RED PANDA", th: "habitat loss; pet trade; climate shift", ac: "community forest protection; Panchthar–Ilam corridors" },
        { y: 176, t: "GHARIAL", th: "sand mining; fishing nets; dammed flow", ac: "captive breeding and release (Kasara); nest protection" },
        { y: 208, t: "ARNA", th: "hybridisation with domestic buffalo; disease", ac: "reserve protection; herd monitoring" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 11} width="612" height="24" rx="6" className="fill-current text-emerald-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.6" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="120" y={r.y + 4} fontSize="7" className="fill-current text-muted-foreground">{r.th}</text>
          <text x="360" y={r.y + 4} fontSize="7" className="fill-current text-muted-foreground">{r.ac}</text>
        </g>
      ))}
      <text x="16" y="234" fontSize="9" className="fill-current text-muted-foreground">Pattern: every action pairs a protection measure with a monitoring measure — guarding and counting together.</text>
    </svg>
  );
}
