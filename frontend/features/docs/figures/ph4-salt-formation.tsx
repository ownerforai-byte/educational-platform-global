// PH4 salt formation. Theme-aware.
export function Ph4SaltFormation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Phosphonium salts formed by phosphine with hydrogen iodide and hydrobromic acid">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">A base, but barely</text>
      <rect x="80" y="56" width="500" height="60" rx="10" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.14" />
      <text x="330" y="82" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">PH₃ + HI → PH₄I (phosphonium iodide)</text>
      <text x="330" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">similarly PH₃ + HBr → PH₄Br — only with strong acids</text>
      <text x="330" y="156" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">PH₄I + NaOH → PH₃ + NaI + H₂O (salts hydrolyse back)</text>
      <text x="330" y="184" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">No phosphonium hydroxide exists — P–H bonds lose H⁺ to water instead</text>
    </svg>
  );
}
