// AlkalineEarthFamily figure. Theme-aware.
export function AlkalineEarthFamily({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Group two alkaline earth metals column with ns two configuration">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Group IIA — two electrons, +2 only</text>
      {["Be [He]2s²", "Mg [Ne]3s²", "Ca [Ar]4s²", "Sr [Kr]5s²", "Ba [Xe]6s²", "Ra [Rn]7s²"].map((m, i) => (
        <g key={m}>
          <rect x="60" y={44 + i * 26} width="220" height="22" rx="5" fill="rgb(16 185 129)" opacity={0.35 - i * 0.04} />
          <text x="75" y={60 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m}</text>
        </g>
      ))}
      <text x="330" y="70" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">ns² — the +2 lattice repays the 2nd IE (~1800 kJ/mol)</text>
      <text x="330" y="94" fontSize="10.5" className="fill-current text-muted-foreground">→ harder, denser, higher-melting than Group IA</text>
      <text x="330" y="118" fontSize="10.5" className="fill-current text-muted-foreground">→ gentler with water; Be ignores even steam</text>
      <text x="330" y="142" fontSize="10.5" className="fill-current text-muted-foreground">→ nitrides M₃N₂ and hydrides MH₂ for the whole group</text>
      <text x="330" y="166" fontSize="10.5" className="fill-current text-muted-foreground">→ Be the dissenter: amphoteric oxide, covalent compounds</text>
    </svg>
  );
}
