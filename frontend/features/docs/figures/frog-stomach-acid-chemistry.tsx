/** Frog stomach acid chemistry — pepsin environment. Well-detailed. Theme-aware. */
export function FrogStomachAcidChemistry({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog stomach acid chemistry pepsin HCl pH 2 protein digestion whole prey insects worm enzyme activation optimum temperature fever regulation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The stomach — a whole-prey acid vat</text>
      {/* stomach zoom */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INSIDE THE STOMACH</text>
      <path d="M100 100 q95 -40 190 10 q-30 70 -120 66 q-80 -6 -70 -76" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="150" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">pH ~2 + pepsin</text>
      <text x="195" y="168" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">HCl activates pepsinogen → pepsin and kills</text>
      <text x="195" y="184" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">most swallowed microbes outright</text>
      <text x="195" y="212" fontSize="6.4" textAnchor="middle" className="fill-current text-rose-600">whole insects, worms, snails — no chewing needed</text>
      {/* chemistry table */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DIGESTION CHEMISTRY</text>
      {[
        ["Stomach", "pepsin + HCl → proteins"],
        ["Bile (liver)", "emulsifies fat, no enzyme"],
        ["Pancreas", "amylase, lipase, trypsin"],
        ["Intestine", "maltase, peptidase finish"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 30} fontSize="7" className="fill-current text-sky-600" fontWeight="700">{k}</text>
          <text x="470" y={96 + i * 30} fontSize="6.8" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="406" y="226" fontSize="6.6" className="fill-current text-emerald-600">frog stomach temperature follows the frog —</text>
      <text x="406" y="240" fontSize="6.6" className="fill-current text-emerald-600">a cold-blooded vat, warm only when the frog is</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: pepsin needs acid — HCl has two jobs (activate + disinfect). Name both for the mechanism mark.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Digestion slows when the frog is cold — another cost of life without a thermostat.</text>
    </svg>
  );
}
