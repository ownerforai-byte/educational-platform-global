// Shell address drill across periods. Theme-aware.
export function ShellAddressDrill({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["H (Z = 1)", "1s¹", "n = 1", "shell K"],
    ["C (Z = 6)", "1s² 2s² 2p²", "n = 2", "shell L"],
    ["Cl (Z = 17)", "…3s² 3p⁵", "n = 3", "shell M"],
    ["Ca (Z = 20)", "…4s²", "n = 4", "shell N"],
  ];
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Shell address drill reading the highest occupied shell from configurations of hydrogen carbon chlorine calcium with K L M N labels">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reading the shell from a configuration</text>
      {rows.map(([el, cfg, n, shell], i) => (
        <g key={el}>
          <rect x="30" y={40 + i * 38} width="660" height="32" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.3" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={61 + i * 38} fontSize="9.5" className="fill-current text-foreground" fontWeight="800">{el}</text>
          <text x="180" y={61 + i * 38} fontSize="9" className="fill-current text-emerald-600" fontWeight="700">{cfg}</text>
          <text x="470" y={61 + i * 38} fontSize="9" className="fill-current text-foreground" fontWeight="800">{n}</text>
          <text x="674" y={61 + i * 38} fontSize="9" textAnchor="end" className="fill-current text-muted-foreground">{shell}</text>
        </g>
      ))}
      <rect x="30" y="196" width="660" height="18" rx="0" />
      <text x="360" y="210" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">The highest n in the configuration names the shell: K = 1, L = 2, M = 3, N = 4 — the valence shell carries the chemistry.</text>
    </svg>
  );
}
