// Lewis gallery: expanded octets in PCl5 and SF6. Theme-aware.
export function LewisGalleryExpanded({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lewis structures of phosphorus pentachloride with ten electrons and sulphur hexafluoride with twelve electrons around the central atom showing expanded octets">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Lewis gallery 3: expanded octets (period 3 and beyond)</text>
      <g>
        <text x="180" y="70" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PCl5</text>
        <text x="180" y="120" fontSize="12" textAnchor="middle" className="fill-current text-foreground">P with five P-Cl bonds</text>
        <text x="180" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">10 electrons around P</text>
        <text x="180" y="172" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">trigonal bipyramidal shape</text>
        <text x="180" y="200" fontSize="11" textAnchor="middle" className="fill-current text-foreground">3d orbitals open the door</text>
      </g>
      <g>
        <text x="480" y="70" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SF6</text>
        <text x="480" y="120" fontSize="12" textAnchor="middle" className="fill-current text-foreground">S with six S-F bonds</text>
        <text x="480" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">12 electrons around S</text>
        <text x="480" y="172" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">octahedral shape, 90 degrees</text>
        <text x="480" y="200" fontSize="11" textAnchor="middle" className="fill-current text-foreground">hypervalent but stable</text>
      </g>
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Second-shell atoms can never expand - the octet rule holds only for period 2</text>
    </svg>
  );
}
