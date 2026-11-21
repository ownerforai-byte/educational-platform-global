/** Malaria fever patterns — benign tertian vs malignant cycles. Theme-aware. */
export function MalariaFeverPatterns({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Malaria fever patterns comparing benign tertian vivax fever every third day with malignant falciparum continuous irregular high fever">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The fever tells the species</text>

      {/* axes */}
      <line x1="60" y1="60" x2="60" y2="200" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <line x1="60" y1="200" x2="620" y2="200" strokeWidth="2" className="stroke-current text-muted-foreground" />
      <text x="40" y="70" fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">40°</text>
      <text x="40" y="130" fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">37°</text>
      <text x="620" y="216" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">days</text>

      {/* tertian spikes */}
      <g>
        <path d="M100 200 q10 -120 20 0 M180 200 q10 -120 20 0 M260 200 q10 -120 20 0 M340 200 q10 -120 20 0 M420 200 q10 -120 20 0" fill="none" strokeWidth="3" className="stroke-current text-sky-500" />
        <text x="80" y="248" fontSize="9.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">BENIGN TERTIAN (P. vivax)</text>
        <text x="80" y="264" fontSize="8.5" className="fill-current text-muted-foreground">fever spikes every 3rd day (48 h cycle) — cold, hot, sweating stages</text>
      </g>

      {/* malignant irregular */}
      <g>
        <path d="M460 200 q8 -70 16 -10 q8 -60 16 -20 q10 -90 18 -5 q10 -70 16 -15 q10 -80 16 -10 q10 -60 16 -25 q8 -70 16 -10" fill="none" strokeWidth="3" className="stroke-current text-rose-500" />
        <text x="460" y="248" fontSize="9.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">MALIGNANT (P. falciparum)</text>
        <text x="460" y="264" fontSize="8.5" className="fill-current text-muted-foreground">continuous / irregular high fever, no clean 48 h rhythm</text>
      </g>

      <text x="70" y="52" fontSize="8.5" className="fill-current text-muted-foreground">Each spike = one brood of parasites bursting out of RBCs together</text>
    </svg>
  );
}
