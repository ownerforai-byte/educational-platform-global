/** Plasmodium life cycle — human liver/RBC phase + mosquito sporogony. Theme-aware. */
export function PlasmodiumLifeCycle({ className }: { className?: string }) {
  const step = (x: number, y: number, c: string, t: string, s: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="150" height="52" rx="9" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 75} y={y + 20} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      <text x={x + 75} y={y + 36} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{s}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Plasmodium life cycle alternating between human host with liver and red blood cell phases and female Anopheles mosquito with sporogony">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Plasmodium — two hosts, one life cycle</text>

      <text x="16" y="52" fontSize="10.5" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">IN THE HUMAN (definitive disease)</text>
      {step(16, 64, "rgb(244 63 94 / 0.9)", "① Sporozoite injected", "by female Anopheles bite", "s1")}
      {step(190, 64, "rgb(217 119 6 / 0.9)", "② Liver phase (schizogony)", "multiplies asexually 10–14 days", "s2")}
      {step(364, 64, "rgb(239 68 68 / 0.9)", "③ RBC invasion", "ring → trophozoite → schizont", "s3")}
      {step(538, 64, "rgb(148 163 184 / 0.9)", "④ RBCs burst", "merozoites out → fever paroxysm", "s4")}
      <g className="stroke-current text-muted-foreground" strokeWidth="2">
        <line x1="166" y1="90" x2="186" y2="90" /><polygon points="180,84 194,90 180,96" className="fill-current text-muted-foreground" />
        <line x1="340" y1="90" x2="360" y2="90" /><polygon points="354,84 368,90 354,96" className="fill-current text-muted-foreground" />
        <line x1="514" y1="90" x2="534" y2="90" /><polygon points="528,84 542,90 528,96" className="fill-current text-muted-foreground" />
      </g>

      {/* cycle arrow back to RBC */}
      <path d="M613 120 Q640 150 613 176" fill="none" strokeWidth="2" strokeDasharray="5 3" className="stroke-current text-rose-400" />
      <text x="500" y="150" fontSize="8.5" className="fill-current text-muted-foreground">merozoites re-infect RBCs — cycles sync to the fever rhythm</text>

      <text x="16" y="204" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">IN THE MOSQUITO (definitive host — sexual cycle)</text>
      {step(16, 216, "rgb(124 58 237 / 0.9)", "⑤ Gametocytes taken up", "in a blood meal", "s5")}
      {step(190, 216, "rgb(124 58 237 / 0.9)", "⑥ Fertilisation in gut", "gametes fuse (syngamy)", "s6")}
      {step(364, 216, "rgb(124 58 237 / 0.9)", "⑦ Oocyst on gut wall", "sporogony → thousands of sporozoites", "s7")}
      {step(538, 216, "rgb(124 58 237 / 0.9)", "⑧ Sporozoites → salivary gland", "ready for the next bite", "s8")}

      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">Sexual reproduction happens only in the mosquito — that makes Anopheles the definitive host, the human only the intermediate one.</text>
    </svg>
  );
}
