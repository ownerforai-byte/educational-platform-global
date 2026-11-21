/** Alcohol liver damage stages — the organ that pays first. Well-detailed. Theme-aware. */
export function AlcoholLiverDamageStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Alcohol liver damage stages fatty liver steatosis alcoholic hepatitis fibrosis cirrhosis progression reversible irreversible detoxification metabolism acetaldehyde NAD ADH enzyme liver function loss portal hypertension">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Alcohol and the liver — three stops to cirrhosis</text>
      {/* progression */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["1. Fatty liver", "fat droplets fill liver cells; reversible if drinking stops", 130],
        ["2. Hepatitis", "inflammation and cell death; partly reversible", 300],
        ["3. Cirrhosis", "scar tissue replaces liver; irreversible, transplant territory", 470],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 80} y="70" width="160" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="94" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="114" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 34)}</text>
          <text x={x as number} y="128" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(34, 68)}</text>
          <text x={x as number} y="158" fontSize="5.8" textAnchor="middle" className="fill-current" fontWeight="700" style={{ color: i < 2 ? "rgb(22 163 74)" : "rgb(220 38 38)" }}>{i < 2 ? "reversible" : "irreversible"}</text>
          {i < 2 && <path d={`M${(x as number) + 82} 120 h${((x as number) + 138) - (x as number) - 82 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="190" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the chemistry: alcohol → acetaldehyde (the toxic middle product) → acetate; the liver does all three jobs</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why the liver pays first: it metabolises ~90% of ingested alcohol — the detox plant takes the industrial damage.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Cirrhosis consequences: portal hypertension, jaundice, clotting failure, encephalopathy — the liver's many jobs fail together.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: fatty liver → hepatitis → cirrhosis; reversible, partly, irreversible — the three-stop ladder.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Alcohol also hits the brain, heart, pancreas and foetus — the liver is just the first casualty.</text>
    </svg>
  );
}
