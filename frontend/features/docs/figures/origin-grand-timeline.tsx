/** Grand timeline from Earth's formation to Cambrian explosion. Theme-aware. */
export function OriginGrandTimeline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Grand timeline from Earth's formation 4.6 bya through chemical evolution first prokaryotic cells stromatolites cyanobacteria Great Oxidation Event eukaryotes endosymbiosis multicellular life and Cambrian explosion">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">From molecules to cells — the grand timeline</text>

      <line x1="60" y1="120" x2="620" y2="120" strokeWidth="4" className="stroke-current text-muted-foreground" />
      {[
        { x: 80, t: "4.6 bya", s: "Earth forms" },
        { x: 200, t: "4.0–3.8 bya", s: "oceans condense; chemical evolution begins" },
        { x: 340, t: "~3.8–3.5 bya", s: "first prokaryote cells (stromatolite fossils)" },
        { x: 470, t: "~3.0–2.5 bya", s: "cyanobacteria → Great Oxidation Event" },
        { x: 600, t: "~2.0–1.5 bya", s: "eukaryotes (endosymbiosis)" },
      ].map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy="120" r="5" className="fill-current text-rose-500" />
          <text x={p.x} y="100" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{p.t}</text>
          <text x={p.x} y="142" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{p.s}</text>
        </g>
      ))}
      <text x="60" y="180" fontSize="8" className="fill-current text-muted-foreground">~1.0 bya: multicellular life → Cambrian explosion (~540 mya)</text>
      <text x="16" y="160" fontSize="8" className="fill-current text-muted-foreground">O₂ from cyanobacterial photosynthesis transformed the atmosphere, enabling aerobic life.</text>
    </svg>
  );
}
