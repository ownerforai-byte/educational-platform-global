// Fuming hydrogen halides. Theme-aware.
export function FumingHxMist({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Hydrogen halide gas meeting moist air to form white acidic mist of hydrohalic acid droplets">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why the bottle mouth smokes</text>
      <rect x="120" y="80" width="90" height="70" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.16" />
      <text x="165" y="120" fontSize="11" textAnchor="middle" className="fill-current text-foreground">HX gas</text>
      <ellipse cx="300" cy="115" rx="70" ry="28" className="fill-current" style={{ color: "rgb(226 232 240)" }} opacity="0.75" />
      <text x="300" y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">white mist</text>
      <text x="470" y="115" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">HX(g) + H₂O(moist air) → acid droplets</text>
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">All HCl, HBr and HI fume — the acidic mist is the gas dissolving in air's moisture</text>
    </svg>
  );
}
