/**
 * Eutrophication — nutrient runoff → algal bloom → oxygen crash →
 * fish kill → recovery loop. Theme-aware via currentColor.
 */
export function EutrophicationSequence({ className }: { className?: string }) {
  const step = (x: number, y: number, c: string, t: string, s: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="140" height="58" rx="10" style={{ color: c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 70} y={y + 22} fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      <text x={x + 70} y={y + 38} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Eutrophication sequence from fertiliser runoff through algal bloom oxygen depletion fish death and decomposition back to nutrient release">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Eutrophication — how too much food kills a lake</text>

      {step(16, 60, "rgb(245 158 11 / 0.9)", "① NUTRIENT RUNOFF", "fertiliser N & P wash from fields, sewage in", "s1")}
      {step(190, 60, "rgb(22 163 74 / 0.9)", "② ALGAL BLOOM", "algae explode into a green surface mat", "s2")}
      {step(364, 60, "rgb(14 165 233 / 0.9)", "③ LIGHT BLOCKED", "bloom shades & kills submerged plants", "s3")}
      {step(538, 60, "rgb(244 63 94 / 0.9)", "④ O₂ CRASH", "bloom + dead plants decompose; BOD soars", "s4")}
      {step(538, 170, "rgb(244 63 94 / 0.9)", "⑤ FISH KILL", "hypoxia — gill breathers die first", "s5")}
      {step(364, 170, "rgb(124 58 237 / 0.9)", "⑥ DECOMPOSERS", "bacteria finish the dead biomass", "s6")}
      {step(190, 170, "rgb(245 158 11 / 0.9)", "⑦ NUTRIENTS RELEASED", "…which feed the next bloom — a vicious loop", "s7")}

      <g className="stroke-current text-muted-foreground" strokeWidth="2.5">
        <line x1="156" y1="89" x2="186" y2="89" /><polygon points="180,83 194,89 180,95" className="fill-current text-muted-foreground" />
        <line x1="330" y1="89" x2="360" y2="89" /><polygon points="354,83 368,89 354,95" className="fill-current text-muted-foreground" />
        <line x1="504" y1="89" x2="534" y2="89" /><polygon points="528,83 542,89 528,95" className="fill-current text-muted-foreground" />
        <line x1="608" y1="122" x2="608" y2="166" /><polygon points="602,160 608,174 614,160" className="fill-current text-muted-foreground" />
        <line x1="534" y1="199" x2="510" y2="199" /><polygon points="516,193 502,199 516,205" className="fill-current text-muted-foreground" />
        <line x1="360" y1="199" x2="334" y2="199" /><polygon points="340,193 326,199 340,205" className="fill-current text-muted-foreground" />
        <path d="M190 199 Q100 199 86 122" fill="none" strokeDasharray="6 3" />
      </g>
      <text x="60" y="260" fontSize="9.5" className="fill-current text-muted-foreground">The dashed arrow closes the trap: released nutrients restart the cycle. Fix = cut the input (sewage treatment, fertiliser discipline).</text>
    </svg>
  );
}
