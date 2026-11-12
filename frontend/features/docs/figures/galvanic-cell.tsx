/**
 * Galvanic (electrochemical) cell — anode oxidation, cathode reduction,
 * electron flow through the wire and ion flow through the salt bridge.
 * Theme-aware via currentColor.
 */
export function GalvanicCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Galvanic cell with zinc anode, copper cathode, salt bridge and electron flow through the external circuit">
      {/* left beaker (Zn / Zn2+) */}
      <path d="M 70 160 L 70 320 L 250 320 L 250 160" fill="none" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
      <rect x="72" y="200" width="176" height="118" className="fill-current text-sky-500/15" />
      <text x="160" y="248" fontSize="12" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">ZnSO₄ (aq)</text>

      {/* right beaker (Cu / Cu2+) */}
      <path d="M 390 160 L 390 320 L 570 320 L 570 160" fill="none" strokeWidth="2.5" className="stroke-current text-muted-foreground" />
      <rect x="392" y="200" width="176" height="118" className="fill-current text-amber-500/15" />
      <text x="480" y="248" fontSize="12" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300">CuSO₄ (aq)</text>

      {/* electrodes */}
      <rect x="143" y="110" width="34" height="170" rx="4" className="fill-current text-slate-400" />
      <text x="160" y="98" fontSize="13" textAnchor="middle" fontWeight="700" className="fill-current text-foreground">Zn</text>
      <rect x="463" y="110" width="34" height="170" rx="4" className="fill-current text-orange-500" />
      <text x="480" y="98" fontSize="13" textAnchor="middle" fontWeight="700" className="fill-current text-foreground">Cu</text>

      {/* external wire with electron arrow */}
      <path d="M 160 110 L 160 62 L 480 62 L 480 110" fill="none" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="306,55 330,62 306,69" className="fill-current text-rose-500" />
      <text x="318" y="48" fontSize="12" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">e⁻ flow (wire)</text>

      {/* voltmeter */}
      <circle cx="320" cy="62" r="0" />
      <text x="318" y="88" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">voltmeter / bulb</text>

      {/* salt bridge */}
      <path d="M 210 190 C 250 140 390 140 430 190" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-current text-violet-400" />
      <text x="320" y="128" fontSize="12" textAnchor="middle" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">salt bridge (KCl)</text>
      <text x="320" y="146" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">cations → cathode · anions → anode</text>

      {/* electrode captions */}
      <text x="160" y="300" fontSize="12" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">ANODE (−)</text>
      <text x="160" y="316" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">oxidation</text>
      <text x="480" y="300" fontSize="12" textAnchor="middle" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="700">CATHODE (+)</text>
      <text x="480" y="316" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">reduction</text>

      {/* half equations */}
      <g>
        <rect x="40" y="334" width="560" height="38" rx="10" className="fill-current text-card" stroke="currentColor" style={{ color: "rgb(0 0 0 / 0.12)" }} />
        <text x="58" y="358" fontSize="12" className="fill-current text-foreground" fontWeight="700">Zn → Zn²⁺ + 2e⁻   (oxidation)</text>
        <text x="330" y="358" fontSize="12" className="fill-current text-foreground" fontWeight="700">Cu²⁺ + 2e⁻ → Cu   (reduction)</text>
      </g>
    </svg>
  );
}
