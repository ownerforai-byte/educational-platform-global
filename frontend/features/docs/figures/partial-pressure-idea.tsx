// Partial pressure idea from the ideal gas law. Theme-aware.
export function PartialPressureIdea({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Partial pressure of each gas in a mixture equals the pressure it would exert alone, and equals its molar concentration times RT">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Partial pressure: concentration in disguise</text>
      <rect x="60" y="52" width="240" height="110" rx="12" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <circle cx="120" cy="110" r="10" fill="rgb(239 68 68)" />
      <circle cx="170" cy="130" r="10" fill="rgb(59 130 246)" />
      <circle cx="220" cy="100" r="10" fill="rgb(16 185 129)" />
      <circle cx="250" cy="135" r="10" fill="rgb(245 158 11)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">mixed gases, one flask</text>
      <rect x="360" y="52" width="240" height="110" rx="12" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.12" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">each gas alone, same V, same T</text>
      <text x="480" y="112" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(14 165 233)">p(i) = n(i)RT/V = [i]RT</text>
      <text x="330" y="196" fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">Dalton: total P = p1 + p2 + p3 ... and each p is an active mass times RT</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">This single line is why Kp exists and why the bridge Kp = Kc(RT)^dn works</text>
    </svg>
  );
}
