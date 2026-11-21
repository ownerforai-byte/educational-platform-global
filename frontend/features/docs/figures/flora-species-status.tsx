/** Endemic vs exotic vs threatened — species status categories. Theme-aware. */
export function FloraSpeciesStatus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Species status categories endemic native exotic threatened endangered vulnerable and rare defined for flora study">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Status vocabulary — the words exams test</text>
      {[
        { x: 16, c: "rgb(22 163 74 / 0.9)", t: "ENDEMIC", s: ["found ONLY here", "(Nepal's ~2% flowering", "plants are endemic)"] },
        { x: 178, c: "rgb(14 165 233 / 0.9)", t: "NATIVE / INDIGENOUS", s: ["arrived without humans,", "now a natural part", "of the flora"] },
        { x: 340, c: "rgb(245 158 11 / 0.9)", t: "EXOTIC / INTRODUCED", s: ["brought by people,", "may escape and", "turn invasive"] },
        { x: 502, c: "rgb(239 68 68 / 0.9)", t: "THREATENED", s: ["vulnerable, endangered,", "rare — IUCN risk ladder", "toward extinction"] },
      ].map((g) => (
        <g key={g.t}>
          <rect x={g.x} y="56" width="150" height="130" rx="12" style={{ color: g.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={g.x + 75} y="82" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{g.t}</text>
          {g.s.map((s, i) => (
            <text key={i} x={g.x + 75} y={104 + i * 22} fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
          ))}
        </g>
      ))}
      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Representation means: how Nepal's flora compares with the world's — high endemism + high threat = a conservation priority.</text>
    </svg>
  );
}
