/**
 * Ozone depletion — CFC release, chlorine radical catalytic cycle,
 * UV-B consequences. Theme-aware via currentColor.
 */
export function OzoneDepletion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Ozone depletion diagram showing CFC release chlorine radical attacking ozone to form oxygen and the consequence of increased UV B reaching Earth causing skin cancer and cataract">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ozone depletion — one chlorine atom, thousands of holes</text>

      {/* ozone layer */}
      <rect x="40" y="60" width="580" height="50" rx="10" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="330" y="82" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">OZONE LAYER (stratosphere, ~25 km) — O₃</text>
      <text x="330" y="98" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">absorbs UV-B & UV-C — Earth's sunscreen</text>

      {/* CFC source */}
      <rect x="60" y="180" width="150" height="60" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="135" y="202" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CFCs released</text>
      <text x="135" y="218" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">fridges, ACs, aerosols, foams</text>
      <line x1="135" y1="176" x2="200" y2="114" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <polygon points="194,108 208,110 198,124" className="fill-current text-rose-500" />

      {/* catalytic cycle */}
      <rect x="300" y="180" width="220" height="60" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="410" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CFCl₃ → Cl• radical (UV breaks it)</text>
      <text x="410" y="216" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Cl• + O₃ → ClO + O₂ ; ClO + O → Cl• + O₂</text>
      <text x="410" y="232" fontSize="8.5" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">one Cl• destroys ~100,000 O₃ — catalyst!</text>

      {/* consequences */}
      <rect x="40" y="252" width="580" height="34" rx="8" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="330" y="274" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">More UV-B reaches ground → skin cancer, cataract, immune suppression, crop & plankton damage</text>

      <text x="16" y="296" fontSize="0">.</text>
      <text x="560" y="262" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Montreal Protocol (1987) — CFCs phased out; layer recovering.</text>
    </svg>
  );
}
