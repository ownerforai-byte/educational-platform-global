/** Septal nephridia structure — nephrostome, neck, body, terminal duct. Theme-aware. */
export function SeptalNephridiaStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Septal nephridium structure with ciliated nephrostome funnel neck body loop lobe with nephridiopore opening into intestine">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The septal nephridium — the excretory workhorse</text>

      {/* nephrostome */}
      <path d="M90 130 q-20 -18 4 -30 q22 -10 30 8 q6 14 -12 22 q-14 6 -22 0 Z" className="fill-current text-sky-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="100" y="86" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">nephrostome — ciliated funnel</text>
      <text x="100" y="100" fontSize="8" className="fill-current text-muted-foreground">opens into the coelom of the previous segment</text>

      {/* neck */}
      <path d="M124 118 q30 6 50 6" fill="none" strokeWidth="4" className="stroke-current text-teal-500" />
      <text x="130" y="110" fontSize="8.5" className="fill-current text-muted-foreground">neck → crosses the septum</text>

      {/* body loop */}
      <g>
        <path d="M180 124 q60 -30 110 0 q30 18 0 40 q-60 30 -110 0 q-24 -20 0 -40 Z" fill="none" strokeWidth="5" className="stroke-current text-violet-500" />
        <text x="235" y="130" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">body (loop)</text>
        <text x="235" y="146" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">4 lobes · ciliated + glandular cells</text>
        <text x="235" y="158" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">reabsorb useful salts as fluid flows</text>
      </g>

      {/* terminal duct */}
      <path d="M290 150 q40 16 80 10" fill="none" strokeWidth="4" className="stroke-current text-emerald-600" />
      <text x="375" y="150" fontSize="8.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">terminal duct → nephridiopore</text>

      {/* discharge */}
      <path d="M450 160 q40 4 70 0" fill="none" strokeWidth="3" className="stroke-current text-amber-600" />
      <text x="470" y="146" fontSize="8.5" className="fill-current text-muted-foreground">into the lumen of the intestine</text>
      <text x="470" y="162" fontSize="8" className="fill-current text-muted-foreground">(enteronephric — waste leaves with the castings)</text>

      <text x="16" y="220" fontSize="10" className="fill-current text-muted-foreground">~200–250 septal nephridia per segment from segment 15 onward; plus pharyngeal (integumentary-free) and integumentary types — all doing the same job.</text>
      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Function: filter coelomic fluid & blood, reabsorb essentials, excrete urea/ammonia — the worm's kidney equivalent.</text>
    </svg>
  );
}
