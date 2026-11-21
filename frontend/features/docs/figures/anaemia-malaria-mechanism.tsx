/** Anaemia malaria mechanism — RBC destruction math. Well-detailed. Theme-aware. */
export function AnaemiaMalariaMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Anaemia malaria mechanism RBC destruction merozoites invade each cycle millions cells lost spleen removal bone marrow cannot keep up pallor fatigue">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Anaemia — the arithmetic of red cell loss</text>
      {/* multiplication chain */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXPONENTIAL DESTRUCTION</text>
      {[[1, 110], [4, 150], [16, 190]].map(([n, x], i) => (
        <g key={i}>
          {Array.from({ length: Math.min(n, 8) }).map((_, j) => (
            <ellipse key={j} cx={x + (j % 4) * 16} cy={110 + Math.floor(j / 4) * 18} rx="7" ry="5" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="0.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          ))}
          <text x={x + 8} y="228" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{`×${n}`}</text>
        </g>
      ))}
      <text x="195" y="252" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">each burst schizont releases 8–32 merozoites — the loss compounds every 48 hours</text>
      {/* consequences */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE BODY'S LEDGER</text>
      {[
        "RBCs destroyed at every 48-h cycle",
        "spleen removes infected and worn",
        "  cells faster still",
        "bone marrow cannot replace them",
        "  quickly enough",
        "result: pallor, fatigue, breathlessness",
        "children and pregnancy suffer most",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 24} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: link the 48-hour cycle to anaemia — the fever and the pallor have one clock.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Severe anaemia plus cerebral malaria are the two great falciparum emergencies.</text>
    </svg>
  );
}
