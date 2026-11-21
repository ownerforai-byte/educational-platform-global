/** Independent sporophyte — the fern generation that left home. Well-detailed. Theme-aware. */
export function PteridophyteSporophyteIndependent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Independent sporophyte fern young sporophyte grows free from prothallus gametophyte dies contrast moss dependent generation evolution land plants">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The fern's secret: its sporophyte can live alone</text>

      {/* fern sequence */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">YOUNG SPOROPHYTE LEAVING THE PROTHALLUS</text>
      {/* prothallus */}
      <path d="M100 210 q-24 -20 0 -34 q24 -14 44 0 q22 14 -2 34 q-20 8 -42 0" className="fill-current text-lime-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="122" y="236" fontSize="7" textAnchor="middle" className="fill-current text-lime-600">prothallus (gametophyte)</text>
      {/* young sporophyte growing from it */}
      <path d="M144 196 L156 150" className="stroke-current text-emerald-700" strokeWidth="3" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <path d="M156 150 q-16 -12 -24 -10 M156 150 q16 -12 24 -10" className="fill-none stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="196" y="146" fontSize="7.2" className="fill-current text-emerald-700" fontWeight="700">first frond + first true root</text>
      {/* arrow to independent adult */}
      <path d="M250 190 q40 -10 70 0" className="fill-none stroke-current text-emerald-700" strokeWidth="2" markerEnd="url(#arrhl)" />
      {/* adult fern */}
      <rect x="330" y="120" width="8" height="70" rx="3" className="fill-current text-emerald-700/40" />
      {[-1, 1].map((k) => (
        <g key={k}>
          <path d={`M334 128 q${k * 30} -20 ${k * 44} -14`} className="stroke-current text-emerald-600" strokeWidth="2.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          {[0, 1, 2].map((j) => (
            <ellipse key={j} cx={334 + k * (12 + j * 12)} cy={124 - j * 4} rx="7" ry="4" className="fill-current text-emerald-600/40" />
          ))}
        </g>
      ))}
      <text x="334" y="212" fontSize="7" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">adult sporophyte — fully independent</text>
      <text x="50" y="252" fontSize="7.2" className="fill-current text-muted-foreground">Once roots and fronds form, the prothallus withers — the diploid generation feeds itself.</text>

      {/* contrast card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONTRAST WITH MOSS</text>
      {[
        "moss sporophyte: brown, no",
        "chlorophyll, stuck to parent",
        "fern sporophyte: green, rooted,",
        "photosynthesises on its own",
        "this independence is what",
        "vascular tissue made possible",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="240" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: 'independent sporophyte</text>
      <text x="466" y="254" fontSize="7.2" className="fill-current text-muted-foreground">with vascular tissue' = the defining</text>
      <text x="466" y="268" fontSize="7.2" className="fill-current text-muted-foreground">pteridophyte feature.</text>
    </svg>
  );
}
