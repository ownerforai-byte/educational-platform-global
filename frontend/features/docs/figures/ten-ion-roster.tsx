// TenIonRoster figure. Theme-aware.
export function TenIonRoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Roster of ten biologically important metal ions with one-line roles">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ten ions, ten one-line jobs</text>
      {[
        ["Na⁺", "extracellular fluid, nerve", "rgb(239 68 68)"],
        ["K⁺", "intracellular, resting potential", "rgb(59 130 246)"],
        ["Mg²⁺", "chlorophyll, ATP activator", "rgb(16 185 129)"],
        ["Ca²⁺", "bone, muscle, clotting", "rgb(148 163 184)"],
        ["Fe²⁺", "O₂ transport (Hb)", "rgb(220 38 38)"],
        ["Cu", "haemocyanin, oxidase", "rgb(217 119 6)"],
        ["Zn²⁺", "carbonic anhydrase", "rgb(139 92 246)"],
        ["Ni", "urease", "rgb(20 184 166)"],
        ["Co", "vitamin B₁₂", "rgb(234 88 12)"],
        ["Cr", "glucose tolerance factor", "rgb(101 163 13)"],
      ].map(([m, job, col], i) => {
        const x = 40 + (i % 5) * 118;
        const y = 50 + Math.floor(i / 5) * 80;
        return (
          <g key={m as string}>
            <rect x={x} y={y} width="106" height="70" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
            <text x={x + 53} y={y + 26} fontSize="12.5" fontWeight="800" textAnchor="middle" fill={col as string}>{m as string}</text>
            <text x={x + 53} y={y + 46} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{job as string}</text>
          </g>
        );
      })}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">s-block: charge and gradients · d-block: coordination chemistry</text>
    </svg>
  );
}
