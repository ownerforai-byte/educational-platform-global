// Lithium exception with nitrogen. Theme-aware.
export function LiExceptionPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Lithium reacting with nitrogen at room temperature forming ruby red lithium nitride unlike other alkali metals">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The exception that proves the wall</text>
      <rect x="60" y="60" width="540" height="70" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="330" y="90" fontSize="14" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">6Li + N₂ → 2Li₃N</text>
      <text x="330" y="114" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">room temperature, ruby-red nitride; Mg needs red heat, other Group IA refuse</text>
      <text x="330" y="170" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Li⁺ is tiny and highly polarising; Li₃N's lattice energy pays the 941 kJ/mol bill</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Also Li is stored under oil, not kerosene - it floats and reacts</text>
    </svg>
  );
}
