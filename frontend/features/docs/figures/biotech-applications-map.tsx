/**
 * Biotechnology applications map — medicine, agriculture, environment,
 * forensics — with flagship examples. Theme-aware via currentColor.
 */
export function BiotechApplicationsMap({ className }: { className?: string }) {
  const panel = (x: number, y: number, c: string, title: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="300" height="96" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 14} y={y + 24} fontSize="11" className="fill-current text-foreground" fontWeight="800">{title}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 14} y={y + 44 + i * 16} fontSize="9" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Biotechnology applications map with four panels covering medicine, agriculture, environment and forensics with flagship examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where biotechnology touches life — four arenas</text>

      {panel(16, 50, "rgb(244 63 94 / 0.9)", "MEDICINE", [
        "human insulin from engineered E. coli (1982 — first GM medicine)",
        "vaccines (hepatitis B), growth hormone, blood clotting factors",
        "gene therapy & PCR-based diagnosis",
      ], "m")}

      {panel(340, 50, "rgb(22 163 74 / 0.9)", "AGRICULTURE", [
        "Bt cotton — bacterial toxin gene kills bollworm, cuts pesticide",
        "golden rice — vitamin A enriched",
        "tissue culture — disease-free clones, faster propagation",
      ], "a")}

      {panel(16, 168, "rgb(14 165 233 / 0.9)", "ENVIRONMENT", [
        "bioremediation — bacteria that eat oil spills",
        "sewage treatment & composting",
        "biofuels and biogas from waste",
      ], "e")}

      {panel(340, 168, "rgb(124 58 237 / 0.9)", "FORENSICS & RESEARCH", [
        "DNA fingerprinting from a single hair root",
        "paternity testing, wildlife smuggling detection",
        "genome sequencing — reading, then editing (CRISPR)",
      ], "f")}

      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">One toolkit, four arenas: restriction enzymes, plasmids, PCR and engineered microbes power them all.</text>
    </svg>
  );
}
