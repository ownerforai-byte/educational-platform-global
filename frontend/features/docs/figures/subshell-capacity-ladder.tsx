// Shell capacity ladder with the 2n² rule. Theme-aware.
export function SubshellCapacityLadder({ className }: { className?: string }) {
  const shells: [string, number, string, string][] = [
    ["K (n = 1)", 2, "1s²", "rgb(14 165 233 / 0.9)"],
    ["L (n = 2)", 8, "2s² 2p⁶", "rgb(16 185 129 / 0.9)"],
    ["M (n = 3)", 18, "3s² 3p⁶ 3d¹⁰", "rgb(245 158 11 / 0.9)"],
    ["N (n = 4)", 32, "4s² 4p⁶ 4d¹⁰ 4f¹⁴", "rgb(244 63 94 / 0.9)"],
  ];
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Shell capacity ladder K to N holding 2 8 18 32 electrons by the two n squared rule with subshell breakdown">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Shell capacity — the 2n² rule at work</text>
      {shells.map(([name, cap, subs, color], i) => {
        const w = 40 + cap * 12;
        return (
          <g key={name}>
            <rect x="120" y={44 + i * 40} width={w} height="28" rx="6" className="fill-current" style={{ color }} opacity="0.18" />
            <rect x="120" y={44 + i * 40} width={w} height="28" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color }} />
            <text x="110" y={63 + i * 40} fontSize="9.5" textAnchor="end" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x={128 + w} y={63 + i * 40} fontSize="9" className="fill-current text-muted-foreground">{cap} electrons · {subs}</text>
          </g>
        );
      })}
      <rect x="30" y="182" width="660" height="20" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="196" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">2n²: n = 1 → 2 · n = 2 → 8 · n = 3 → 18 · n = 4 → 32. Subshells contribute 2, 6, 10, 14 (2, 6, 10, 14 = 2(2l + 1)).</text>
    </svg>
  );
}
