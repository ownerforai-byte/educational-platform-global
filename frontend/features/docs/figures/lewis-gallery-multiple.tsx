// Lewis gallery: carbon dioxide double bonds and boron trifluoride incomplete octet. Theme-aware.
export function LewisGalleryMultiple({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lewis structures of carbon dioxide with two double bonds and boron trifluoride with an incomplete octet six electrons around boron">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Lewis gallery 2: double bonds and a shortfall</text>
      <g>
        <text x="150" y="70" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CO2 - electron budget 16</text>
        <text x="60" y="130" fontSize="13" className="fill-current text-foreground" fontWeight="800">O</text>
        <text x="330" y="130" fontSize="13" className="fill-current text-foreground" fontWeight="800">O</text>
        <text x="195" y="130" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
        <text x="130" y="112" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">O=C=O, two shared</text>
        <text x="130" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">double bonds, two lone</text>
        <text x="130" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pairs left on each O</text>
        <text x="150" y="186" fontSize="11" textAnchor="middle" className="fill-current text-foreground">linear, 180 degrees</text>
      </g>
      <g>
        <text x="500" y="70" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BF3 - budget 24</text>
        <text x="500" y="130" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">B with three B-F bonds</text>
        <text x="500" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">only 6 electrons around B:</text>
        <text x="500" y="176" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">incomplete octet, stable anyway</text>
        <text x="500" y="200" fontSize="11" textAnchor="middle" className="fill-current text-foreground">trigonal planar, 120 degrees</text>
      </g>
      <text x="330" y="226" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Count electrons first - the budget tells you where multiple bonds must go</text>
    </svg>
  );
}
