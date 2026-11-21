/** Seed vs spore — why seeds changed everything. Well-detailed. Theme-aware. */
export function SeedVsSpore({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Starting package", "one cell, no supplies", "embryo + food + coat"],
    ["Water needed", "yes, for fertilisation", "no — pollen tube delivers"],
    ["Waiting ability", "must germinate at once", "dormant for months or years"],
    ["Parental care", "none", "nucellus feeds, integument shields"],
    ["Who has it", "bryophytes, pteridophytes", "gymnosperms, angiosperms"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Seed versus spore comparison embryo food reserve coat dormancy pollen tube removes water need spore one cell evolution advantage">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Spore vs seed — the upgrade that freed plants</text>

      {/* spore */}
      <rect x="30" y="44" width="290" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="175" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SPORE</text>
      {[[120, 116], [160, 106], [200, 116], [240, 108]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" className="fill-none stroke-current text-sky-500" strokeWidth="2" />
      ))}
      <text x="175" y="146" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">single cell, thin wall, no food store</text>
      <text x="175" y="164" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">germinates immediately or dies</text>
      <text x="175" y="186" fontSize="7.2" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">a gamble on the weather</text>
      <text x="50" y="210" fontSize="7" className="fill-current text-muted-foreground">ferns, mosses release millions</text>

      {/* seed */}
      <rect x="400" y="44" width="290" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="545" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SEED</text>
      <ellipse cx="545" cy="120" rx="44" ry="34" className="fill-current text-amber-700/25" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <ellipse cx="545" cy="120" rx="24" ry="18" className="fill-current text-lime-500/30" />
      <text x="545" y="124" fontSize="6.6" textAnchor="middle" className="fill-current text-emerald-800">embryo</text>
      <text x="600" y="112" fontSize="6.8" className="fill-current text-amber-700">food reserve</text>
      <text x="600" y="140" fontSize="6.8" className="fill-current text-amber-700">seed coat</text>
      <text x="545" y="170" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">packaged embryo + packed lunch + armour</text>
      <text x="545" y="188" fontSize="7.2" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">waits for its season, travels dry</text>
      <text x="420" y="210" fontSize="7" className="fill-current text-muted-foreground">gymnosperms invented it</text>

      {/* table */}
      <rect x="30" y="236" width="660" height="54" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="254" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Exam hook: seeds removed water from fertilisation (pollen tube), added dormancy and parental provisioning — three upgrades in one structure.</text>
      <text x="46" y="274" fontSize="7.2" className="fill-current text-muted-foreground">Gymnosperm = 'naked seed': the package exists, but no ovary wraps it.</text>
    </svg>
  );
}
