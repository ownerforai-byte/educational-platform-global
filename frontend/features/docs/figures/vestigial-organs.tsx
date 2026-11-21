/** Vestigial organs in humans and whales. Theme-aware. */
export function VestigialOrgans({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Vestigial organs human appendix coccyx wisdom teeth nictitating membrane and whale pelvic bones showing reduced functionless remnants of ancestral organs">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Vestigial organs — history written in the body</text>
      {[
        { x: 100, t: "APPENDIX", s: "human digestive remnant" },
        { x: 220, t: "COCCYX", s: "tail remnant" },
        { x: 340, t: "WISDOM TEETH", s: "jaw too small now" },
        { x: 460, t: "NICTITATING", s: "membrane (third eyelid)" },
        { x: 580, t: "WHALE PELVIS", s: "bones from land ancestors" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 55} y="52" width="110" height="100" rx="10" className="fill-current text-stone-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
          <text x={n.x} y="76" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="96" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="140" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontStyle="italic">ancestors used them</text>
        </g>
      ))}
      <text x="16" y="180" fontSize="9" className="fill-current text-muted-foreground">Vestigial organs are reduced, functionless remnants of useful ancestral organs — history written in the body.</text>
    </svg>
  );
}
