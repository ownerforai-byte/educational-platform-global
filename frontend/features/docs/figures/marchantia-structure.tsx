/** Marchantia structure — thallus with gemma cups, rhizoids, archegoniophore. Theme-aware. */
export function MarchantiaStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Marchantia thallus with dichotomous branching dorsal pores gemma cups rhizoids below and umbrella shaped archegoniophore and antheridiophore">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Marchantia — the liverwort body plan</text>

      {/* thallus */}
      <path d="M100 160 q60 -30 130 -10 q60 16 130 0 q60 -14 120 10 q-70 22 -190 18 q-120 4 -190 -18 Z" className="fill-current text-emerald-500/30" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      {/* dichotomous midrib */}
      <path d="M130 158 q70 -6 140 0 q80 6 160 -4" fill="none" strokeWidth="2" className="stroke-current text-emerald-700" />
      {/* gemma cups */}
      {[[190, 140], [300, 136], [400, 144]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="fill-current text-amber-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        </g>
      ))}
      <text x="440" y="140" fontSize="8.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">gemma cups — asexual buds</text>

      {/* rhizoids */}
      <g className="stroke-current text-stone-500" strokeWidth="1.5">
        <path d="M180 168 q-4 14 -10 20 M240 170 q0 16 2 22 M360 168 q6 14 12 18 M420 166 q2 16 0 22" fill="none" />
      </g>
      <text x="470" y="184" fontSize="8.5" className="fill-current text-muted-foreground">rhizoids (single-celled 'roots')</text>

      {/* archegoniophore */}
      <line x1="250" y1="128" x2="250" y2="70" strokeWidth="3" className="stroke-current text-emerald-700" />
      <path d="M210 70 q40 -18 80 0 q-40 12 -80 0 Z" className="fill-current text-rose-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="250" y="56" fontSize="8.5" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">archegoniophore (female umbrella)</text>

      {/* antheridiophore */}
      <line x1="380" y1="132" x2="380" y2="84" strokeWidth="3" className="stroke-current text-emerald-700" />
      <circle cx="380" cy="76" r="12" className="fill-current text-sky-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="380" y="62" fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">antheridiophore (male disc)</text>

      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">Dorsal pores breathe, ventral scales protect, gemma cups clone — and the umbrella stalks carry the sex organs high above the thallus.</text>
    </svg>
  );
}
