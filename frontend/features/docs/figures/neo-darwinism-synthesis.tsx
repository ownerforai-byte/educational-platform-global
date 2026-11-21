/** Neo-Darwinism modern synthesis five pillars. Theme-aware. */
export function NeoDarwinismSynthesis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Neo Darwinism modern synthesis Darwin's selection plus Mendelian genetics genetic variation by mutation recombination gene flow natural selection changes allele frequencies genetic drift reproductive isolation speciation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Neo-Darwinism — the modern synthesis</text>
      {[
        { y: 56, t: "1. Genetic variation", s: "mutation, recombination, gene flow — random with respect to need" },
        { y: 92, t: "2. Natural selection", s: "changes allele frequencies non-randomly — the directional filter" },
        { y: 128, t: "3. Genetic drift", s: "random change, strongest in small populations" },
        { y: 164, t: "4. Reproductive isolation", s: "geographic then genetic — completes speciation" },
        { y: 200, t: "5. Evolution = change in allele frequencies", s: "measured by Hardy–Weinberg (Topic 36)" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="320" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="228" fontSize="8" className="fill-current text-muted-foreground">Darwin's selection + Mendelian genetics + population genetics (Dobzhansky, Mayr, Huxley, Fisher).</text>
    </svg>
  );
}
