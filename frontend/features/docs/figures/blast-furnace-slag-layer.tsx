// BlastFurnaceSlagLayer figure. Theme-aware.
export function BlastFurnaceSlagLayer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Furnace hearth cross section with lighter slag floating above molten metal">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why slag must float</text>
      <rect x="180" y="55" width="300" height="150" rx="10" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="184" y="60" width="292" height="55" fill="rgb(148 163 184)" opacity="0.35" />
      <text x="330" y="82" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">SLAG — CaSiO₃ (lighter)</text>
      <text x="330" y="100" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">drawn off first · shields metal from air</text>
      <rect x="184" y="118" width="292" height="82" fill="rgb(239 68 68)" opacity="0.25" />
      <text x="330" y="150" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">MOLTEN METAL (denser)</text>
      <text x="330" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">tapped from below the slag line</text>
      <text x="80" y="130" fontSize="10.5" className="fill-current text-muted-foreground">immiscible,</text>
      <text x="80" y="148" fontSize="10.5" className="fill-current text-muted-foreground">low-melting,</text>
      <text x="80" y="166" fontSize="10.5" className="fill-current text-muted-foreground">floats —</text>
      <text x="80" y="184" fontSize="10.5" className="fill-current text-muted-foreground">or the furnace chokes</text>
      <text x="560" y="130" fontSize="10.5" className="fill-current text-muted-foreground">ground slag is</text>
      <text x="560" y="148" fontSize="10.5" className="fill-current text-muted-foreground">cement and</text>
      <text x="560" y="166" fontSize="10.5" className="fill-current text-muted-foreground">slag wool —</text>
      <text x="560" y="184" fontSize="10.5" className="fill-current text-muted-foreground">waste no more</text>
    </svg>
  );
}
