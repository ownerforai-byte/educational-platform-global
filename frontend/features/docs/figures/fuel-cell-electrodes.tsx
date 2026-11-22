// Fuel cell electrode reactions. Theme-aware.
export function FuelCellElectrodes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Hydrogen oxygen fuel cell with anode and cathode half reactions and electron flow through the external circuit">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The H₂–O₂ fuel cell</text>
      <rect x="60" y="70" width="120" height="120" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="120" y="100" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">anode (−)</text>
      <text x="120" y="128" fontSize="11.5" textAnchor="middle" fill="rgb(239 68 68)">H₂ → 2H⁺ + 2e⁻</text>
      <text x="120" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">oxidation</text>
      <rect x="480" y="70" width="120" height="120" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
      <text x="540" y="100" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">cathode (+)</text>
      <text x="540" y="128" fontSize="11.5" textAnchor="middle" fill="rgb(14 165 233)">½O₂ + 2H⁺ + 2e⁻ → H₂O</text>
      <text x="540" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">reduction</text>
      <path d="M 185 110 L 475 110" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#are)" />
      <text x="330" y="100" fontSize="11" textAnchor="middle" fill="rgb(245 158 11)">electrons through the wire = the current</text>
      <path d="M 475 160 L 185 160" stroke="rgb(16 185 129)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#are2)" />
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">H⁺ crosses the electrolyte membrane</text>
      <defs>
        <marker id="are" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
        <marker id="are2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="234" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Overall: 2H₂ + O₂ → 2H₂O - direct conversion, 60-70% efficient</text>
    </svg>
  );
}
