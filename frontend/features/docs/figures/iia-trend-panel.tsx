// IiaTrendPanel figure. Theme-aware.
export function IiaTrendPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Trends down group two with ionisation energies and reactivity">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Down Group IIA</text>
      {[
        ["Be", "899 kJ/mol", 0.95], ["Mg", "738", 0.8], ["Ca", "590", 0.65], ["Sr", "550", 0.55], ["Ba", "503", 0.48],
      ].map(([m, ie, w], i) => (
        <g key={"r" + i}>
          <text x="60" y={58 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m as string}</text>
          <rect x="100" y={46 + i * 26} width={(w as number) * 260} height="14" rx="4" fill="rgb(16 185 129)" opacity="0.55" />
          <text x={110 + (w as number) * 260} y={58 + i * 26} fontSize="9.5" fill="rgb(16 185 129)">{ie as string}</text>
        </g>
      ))}
      <text x="450" y="70" fontSize="11" fontWeight="800" fill="rgb(239 68 68)">IE₁ falls ↓</text>
      <text x="450" y="94" fontSize="10.5" className="fill-current text-muted-foreground">radius grows:</text>
      <text x="450" y="112" fontSize="10.5" className="fill-current text-muted-foreground">Be 111 → Ba 198 pm</text>
      <text x="450" y="146" fontSize="11" fontWeight="800" fill="rgb(16 185 129)">reactivity rises ↓</text>
      <text x="450" y="170" fontSize="10.5" className="fill-current text-muted-foreground">Be none → Ba vigorous</text>
      <text x="450" y="194" fontSize="10.5" className="fill-current text-muted-foreground">mp: NO regular trend!</text>
    </svg>
  );
}
