/** Gene bank tissue culture — storing life in glass and nitrogen. Well-detailed. Theme-aware. */
export function GeneBankTissueCulture({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Gene bank tissue culture Khumaltar genebank in vitro propagation meristem cryopreservation liquid nitrogen storage plant conservation ex-situ">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Gene banks and tissue culture — life in glass</text>

      {/* gene bank */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">KHUMALTAR GENE BANK</text>
      {/* shelves of jars */}
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
        <rect key={`${r}${c}`} x={60 + c * 70} y={96 + r * 42} width="50" height="30" rx="4" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      )))}
      <text x="195" y="230" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">seeds of crop varieties stored dry and cold for decades</text>
      <text x="60" y="254" fontSize="7" className="fill-current text-sky-600">protects local landraces against crop failure and war</text>

      {/* tissue culture */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TISSUE CULTURE + CRYO</text>
      {/* flask with plantlets */}
      <path d="M470 100 h30 l-6 60 q-2 20 -9 20 q-7 0 -9 -20 z" className="fill-current text-violet-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      {[0, 1].map((j) => (
        <path key={j} d={`M${485 + (j ? 4 : -4)} 150 q${j ? 8 : -8} -10 0 -20`} className="fill-none stroke-current text-lime-600" strokeWidth="2" />
      ))}
      <text x="485" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">meristem on agar gel</text>
      {/* nitrogen flask */}
      <rect x="560" y="110" width="70" height="70" rx="10" className="fill-current text-sky-400/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="595" y="150" fontSize="7" textAnchor="middle" className="fill-current text-sky-700" fontWeight="800">−196 °C</text>
      <text x="595" y="196" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">liquid nitrogen cryostorage</text>
      {[
        "whole plants regrown from tiny",
        "  sterile pieces — virus-free stock",
        "thousands of clones from one bud",
        "cryopreservation pauses life itself",
      ].map((t, i) => (
        <text key={t} x="406" y={228 + (i % 2) * 0} fontSize="7" className="fill-current text-muted-foreground">{["• whole plants regrown from tiny", "  sterile pieces — virus-free stock", "• thousands of clones from one bud", "• cryopreservation pauses life itself"][i]}</text>
      ))}
    </svg>
  );
}
