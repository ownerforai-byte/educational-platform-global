// Iodometry endpoint. Theme-aware.
export function IodometryEndpoint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Iodometric titration with thiosulphate reducing iodine to iodide with starch endpoint fading from blue black to colourless">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Iodometry: watch the blue vanish</text>
      <rect x="80" y="56" width="500" height="52" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="330" y="80" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻</text>
      <text x="330" y="100" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">thiosulphate → tetrathionate (S −2 → −1 average)</text>
      <rect x="80" y="122" width="500" height="52" rx="10" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.14" />
      <text x="330" y="146" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">deep blue-black (starch–I₂) → colourless at endpoint</text>
      <text x="330" y="166" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">add starch only near the end — early addition locks the complex</text>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The sulfane sulphur is the electron donor; the S–S couple does the work</text>
    </svg>
  );
}
