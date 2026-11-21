// Slater-style contribution chart for sigma. Theme-aware.
export function SlaterContributions({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Same-group electrons (n)", "0.35 each", "the one other ns/np electron barely blocks"],
    ["(n−1) shell", "0.85 each", "the 8 inner electrons do most of the screening"],
    ["(n−2) and deeper", "1.00 each", "deep cores screen almost perfectly"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Slater rules contribution table point three five for same shell point eight five for previous shell one point zero for deeper shells computing screening constant sigma">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Building σ — who screens, and how well</text>
      {rows.map(([who, val, note], i) => (
        <g key={who}>
          <rect x="30" y={40 + i * 42} width="660" height="36" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={58 + i * 42} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{who}</text>
          <text x="440" y={58 + i * 42} fontSize="10" className="fill-current text-sky-600" fontWeight="800">{val}</text>
          <text x="46" y={72 + i * 42} fontSize="7.8" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <rect x="30" y="170" width="660" height="30" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="189" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Worked: Na 3s electron → σ = 8(0.85) + 1(0.35) = 7.15 → Z_eff = 11 − 7.15 = 3.85 (simple model uses ≈ 1; state which model you use).</text>
    </svg>
  );
}
