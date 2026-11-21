/** Tissue culture micropropagation — a plant from a speck. Well-detailed. Theme-aware. */
export function TissueCultureMicropropagation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Tissue culture micropropagation explant selection sterilisation surface disinfect nutrient medium MS auxin cytokinin ratio callus organogenesis shoot root regeneration hardening off acclimatisation greenhouse thousands clones disease free banana potato orchid rapid multiplication somaclonal variation advantages disadvantages cost skilled labour sterile technique laminar flow cabinet Nepal banana tissue culture labs">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Tissue culture — a thousand plants from one speck</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["1. Explant", "a small piece (shoot tip, leaf) cut from a disease-free mother plant", 130],
        ["2. Sterilise", "surface-sterilise; everything happens aseptically from here", 250],
        ["3. Culture", "nutrient medium + auxin:cytokinin ratio steers callus → shoots → roots", 370],
        ["4. Multiply", "subculture every few weeks — thousands of identical plantlets", 490],
        ["5. Harden off", "gradual move to soil and greenhouse — the plantlets learn the real world", 610],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 62} y="70" width="124" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 28)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(28, 56)}</text>
          {i < 4 && <path d={`M${(x as number) + 64} 118 h${((x as number) + 120) - (x as number) - 64 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the auxin:cytokinin ratio is the steering wheel — high auxin → roots, high cytokinin → shoots</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it matters: virus-free stock (shoot tips escape systemic infection), rapid clonal multiplication, and conservation of rare species in vitro.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">The costs: sterile facilities, trained hands, and electricity — tissue culture labs are capital-intensive; Nepal runs a few for banana, orchid and potato.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: five steps in order + the auxin:cytokinin steering + one advantage (virus-free) — the complete micropropagation answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Totipotency is the underlying marvel — every plant cell remembers how to be a whole plant.</text>
    </svg>
  );
}
