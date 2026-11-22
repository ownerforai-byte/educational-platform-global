// Halide test flowchart. Theme-aware.
export function HalideTestFlowchart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Flowchart for identifying chloride bromide and iodide using silver nitrate colour and ammonia solubility">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Which halide? Follow the ladder</text>
      <rect x="230" y="44" width="200" height="40" rx="9" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.15" />
      <text x="330" y="69" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">unknown halide + AgNO₃</text>
      <rect x="60" y="120" width="160" height="70" rx="9" className="fill-current" style={{ color: "rgb(148 163 184)" }} opacity="0.16" />
      <text x="140" y="146" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">white ppt</text>
      <text x="140" y="166" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dissolves in dil NH₃</text>
      <text x="140" y="182" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(148 163 184)">Cl⁻</text>
      <rect x="250" y="120" width="160" height="70" rx="9" className="fill-current" style={{ color: "rgb(180 83 9)" }} opacity="0.16" />
      <text x="330" y="146" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">cream ppt</text>
      <text x="330" y="166" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">conc NH₃ only</text>
      <text x="330" y="182" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(180 83 9)">Br⁻</text>
      <rect x="440" y="120" width="160" height="70" rx="9" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.16" />
      <text x="520" y="146" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">yellow ppt</text>
      <text x="520" y="166" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">insoluble in NH₃</text>
      <text x="520" y="182" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">I⁻</text>
      <text x="330" y="236" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Colour first, ammonia second — two checks, one answer</text>
    </svg>
  );
}
