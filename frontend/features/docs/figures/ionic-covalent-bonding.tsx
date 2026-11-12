/**
 * Ionic vs covalent bonding — electron transfer (Na→Cl) vs shared pair (H₂).
 * Theme-aware: strokes/fills use currentColor with Tailwind color classes.
 */
export function IonicCovalentBonding({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 340" className={className} role="img" aria-label="Ionic bond by electron transfer and covalent bond by shared electron pair">
      {/* ── left panel: ionic ── */}
      <text x="40" y="30" fontSize="15" className="fill-current text-foreground" fontWeight="800">Ionic bond — transfer</text>

      {/* Na atom */}
      <circle cx="120" cy="120" r="34" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.6)" }} />
      <text x="104" y="127" fontSize="16" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="800">Na</text>
      {/* Na valence electron */}
      <circle cx="146" cy="96" r="7" className="fill-current text-sky-500" />
      <text x="86" y="176" fontSize="12" className="fill-current text-muted-foreground">1 valence e⁻</text>

      {/* transfer arrow */}
      <path d="M 168 100 C 220 60 260 60 300 96" fill="none" strokeWidth="2.5" strokeDasharray="6 5" className="stroke-current text-sky-500" />
      <polygon points="292,84 306,100 284,100" className="fill-current text-sky-500" />
      <text x="204" y="52" fontSize="12" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">e⁻ transfers</text>

      {/* Cl atom */}
      <circle cx="330" cy="120" r="42" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.6)" }} />
      <text x="312" y="127" fontSize="16" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="800">Cl</text>
      <circle cx="356" cy="94" r="7" className="fill-current text-sky-500" />

      {/* resulting ions + attraction */}
      <text x="96" y="230" fontSize="18" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="800">Na⁺</text>
      <text x="290" y="230" fontSize="18" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="800">Cl⁻</text>
      <line x1="150" y1="224" x2="280" y2="224" strokeWidth="2.5" strokeDasharray="4 4" className="stroke-current text-rose-500" />
      <text x="176" y="212" fontSize="12" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">electrostatic attraction</text>
      <text x="60" y="272" fontSize="12" className="fill-current text-muted-foreground">Metal loses e⁻ → cation; non-metal gains e⁻ → anion.</text>
      <text x="60" y="292" fontSize="12" className="fill-current text-muted-foreground">High m.p., conducts when molten/aqueous.</text>

      {/* divider */}
      <line x1="470" y1="16" x2="470" y2="320" strokeWidth="1" strokeDasharray="6 6" className="stroke-current text-border" />

      {/* ── right panel: covalent ── */}
      <text x="500" y="30" fontSize="15" className="fill-current text-foreground" fontWeight="800">Covalent bond — sharing</text>

      {/* H atoms overlapping */}
      <circle cx="560" cy="120" r="34" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.6)" }} />
      <circle cx="612" cy="120" r="34" className="fill-current text-sky-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.6)" }} />
      <text x="548" y="127" fontSize="16" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">H</text>
      <text x="604" y="127" fontSize="16" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">H</text>

      {/* shared pair in overlap */}
      <circle cx="578" cy="106" r="7" className="fill-current text-sky-500" />
      <circle cx="594" cy="106" r="7" className="fill-current text-sky-500" />
      <text x="536" y="76" fontSize="12" className="fill-current text-sky-600 dark:text-sky-400" fontWeight="700">shared pair</text>

      <text x="500" y="212" fontSize="12" className="fill-current text-muted-foreground">Both nuclei attract the same pair → bond.</text>
      <text x="500" y="232" fontSize="12" className="fill-current text-muted-foreground">Molecular compounds; low m.p.,</text>
      <text x="500" y="252" fontSize="12" className="fill-current text-muted-foreground">poor conductors.</text>

      {/* bottom takeaway */}
      <rect x="40" y="300" width="560" height="2" className="fill-current text-border" />
    </svg>
  );
}
