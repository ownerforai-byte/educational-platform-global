/** Mastigophora flagella — Euglena Trypanosoma Giardia. Well-detailed. Theme-aware. */
export function MastigophoraFlagella({ className }: { className?: string }) {
  const members: [string, string, string][] = [
    ["Euglena", "freshwater, chloroplasts + flagellum — plant AND animal traits", "rgb(22 163 74)"],
    ["Trypanosoma", "blood parasite of man, undulating membrane, tsetse fly vector", "rgb(244 63 94)"],
    ["Giardia / Leishmania", "gut or tissue parasites, multiple flagella", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mastigophora flagella Euglena Trypanosoma Giardia Leishmania flagellated protozoa classification examples undulating membrane tsetse vector">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mastigophora — the flagellates</text>
      {/* Euglena */}
      <rect x="30" y="44" width="330" height="100" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <ellipse cx="140" cy="96" rx="52" ry="26" className="fill-current text-emerald-600/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <circle cx="128" cy="92" r="5" className="fill-current text-foreground" />
      <path d="M192 96 q40 -14 70 -6" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="240" y="72" fontSize="7.2" className="fill-current text-foreground" fontWeight="700">Euglena</text>
      <text x="52" y="132" fontSize="6.8" className="fill-current text-muted-foreground">flagellum + chloroplasts — a bridge between kingdoms</text>
      {/* Trypanosoma */}
      <rect x="390" y="44" width="300" height="100" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Trypanosoma in blood</text>
      <path d="M430 120 q40 -18 80 -6 q40 10 90 -14" className="fill-none stroke-current" strokeWidth="2.2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <path d="M430 120 q40 -10 80 -2 q40 8 90 -10" className="fill-none stroke-current" strokeWidth="1.2" strokeDasharray="3 2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="140" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">undulating membrane + tsetse fly vector → sleeping sickness</text>
      {/* members list */}
      <rect x="30" y="160" width="660" height="66" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {members.map(([n, d, rgb], i) => (
        <g key={n}>
          <text x="46" y={182 + i * 20} fontSize="7.2" className="fill-current text-foreground" fontWeight="700">{n}</text>
          <text x="150" y={182 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="236" width="660" height="56" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="256" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Diagnostic: locomotion by one or more flagella; many are parasites transmitted by insect vectors.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Euglena = free-living with chloroplasts; Trypanosoma = blood parasite with an insect vector.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Name the vector (tsetse fly) and the disease (sleeping sickness) for full marks.</text>
    </svg>
  );
}
