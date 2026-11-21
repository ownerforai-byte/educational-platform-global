/** Homosporous vs heterosporous — one spore size or two. Well-detailed. Theme-aware. */
export function HomosporousVsHeterosporous({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Spore types", "one kind only", "two: microspore + megaspore"],
    ["Gametophyte", "bisexual prothallus", "two separate, tiny gametophytes"],
    ["Examples", "Dryopteris, Lycopodium", "Selaginella, Salvinia"],
    ["Significance", "the simple ancestral way", "precursor of the seed habit"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Homosporous versus heterosporous pteridophytes one spore versus microspore megaspore Selaginella seed habit precursor bisexual gametophyte">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One spore or two — the seed habit begins</text>

      {/* homosporous side */}
      <rect x="30" y="44" width="290" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="175" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOMOSPOROUS</text>
      {[[110, 110], [145, 100], [180, 112], [215, 102], [240, 114]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="175" y="146" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">identical spores →</text>
      <text x="175" y="160" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">one bisexual prothallus</text>
      <text x="175" y="182" fontSize="7.2" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">both sex organs on it</text>
      <text x="50" y="208" fontSize="7" className="fill-current text-muted-foreground">Dryopteris, Lycopodium</text>

      {/* heterosporous side */}
      <rect x="400" y="44" width="290" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="545" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HETEROSPOROUS</text>
      {[[470, 106], [500, 98], [530, 108]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      {[[580, 106], [620, 100], [655, 110]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="11" className="fill-current text-violet-500/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      ))}
      <text x="500" y="132" fontSize="6.8" textAnchor="middle" className="fill-current text-sky-600">microspores → male</text>
      <text x="618" y="132" fontSize="6.8" textAnchor="middle" className="fill-current text-violet-500">megaspores → female</text>
      <text x="545" y="156" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">two separate tiny gametophytes</text>
      <text x="545" y="178" fontSize="7.2" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">megaspore retained → seed habit</text>
      <text x="420" y="208" fontSize="7" className="fill-current text-muted-foreground">Selaginella, Salvinia</text>

      {/* table */}
      <rect x="30" y="236" width="660" height="54" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="254" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Exam hook: heterospory (two spore sizes) is the first step toward seeds — Selaginella keeps its megaspore on the parent.</text>
      <text x="46" y="274" fontSize="7.2" className="fill-current text-muted-foreground">Match: homosporous = one bisexual gametophyte; heterosporous = microspore + megaspore, two gametophytes.</text>
    </svg>
  );
}
