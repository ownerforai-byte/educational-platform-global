// Chlorine water equilibrium. Theme-aware.
export function ChlorineWaterEquilibrium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Chlorine water equilibrium forming hydrochloric and hypochlorous acids with nascent oxygen bleaching">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Chlorine water is really HOCl in disguise</text>
      <rect x="60" y="60" width="540" height="50" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.13" />
      <text x="330" y="82" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl₂ + H₂O ⇌ HCl + HOCl</text>
      <text x="330" y="100" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pale green-yellow solution; HOCl the star</text>
      <rect x="60" y="126" width="540" height="50" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="330" y="148" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">HOCl → HCl + [O]</text>
      <text x="330" y="166" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">nascent oxygen destroys dye chromophores — permanent bleaching</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Dry Cl₂ bleaches nothing — water is the co-reagent</text>
    </svg>
  );
}
