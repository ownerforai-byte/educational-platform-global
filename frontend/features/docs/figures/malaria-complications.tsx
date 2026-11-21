/** Malaria complications — cerebral malaria, anaemia, blackwater fever. Theme-aware. */
export function MalariaComplications({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Malaria complications cerebral malaria convulsions coma severe anaemia spleen enlargement and blackwater fever with haemoglobin in urine">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">When falciparum turns dangerous — complications</text>

      {[
        { x: 40, c: "rgb(124 58 237 / 0.9)", t: "CEREBRAL MALARIA", items: ["parasite-clogged capillaries in brain", "convulsions, unconsciousness, coma", "kills within 24–48 h if untreated"] },
        { x: 240, c: "rgb(239 68 68 / 0.9)", t: "SEVERE ANAEMIA", items: ["mass RBC destruction", "weakness, breathlessness", "spleen enlarges from clearing debris"] },
        { x: 440, c: "rgb(190 60 60 / 0.9)", t: "BLACKWATER FEVER", items: ["massive haemolysis", "haemoglobin passes into urine", "urine turns dark — 'blackwater'"] },
      ].map((c) => (
        <g key={c.t}>
          <rect x={c.x} y="56" width="180" height="150" rx="12" style={{ color: c.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={c.x + 90} y="82" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{c.t}</text>
          {c.items.map((s, i) => (
            <text key={i} x={c.x + 12} y={108 + i * 24} fontSize="8" className="fill-current text-muted-foreground">• {s}</text>
          ))}
        </g>
      ))}

      <text x="16" y="236" fontSize="10" className="fill-current text-muted-foreground">These complications are why malignant malaria is treated as an emergency — and why early diagnosis saves lives.</text>
    </svg>
  );
}
