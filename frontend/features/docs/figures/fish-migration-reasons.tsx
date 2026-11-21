/** Fish migration reasons — why salmon and eels travel. Well-detailed. Theme-aware. */
export function FishMigrationReasons({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fish migration reasons salmon anadromous catadromous eels spawning feeding grounds fresh water sea osmoregulation homing smell spawning upstream journey energy cost">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fish migration — two rivers, two strategies</text>
      {/* salmon route */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SALMON — ANADROMOUS</text>
      <path d="M60 150 h270" className="stroke-current" strokeWidth="10" style={{ color: "rgb(2 132 199 / 0.3)" }} />
      <path d="M280 138 q-60 -10 -110 0 q-60 12 -110 6" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="80" y="130" fontSize="6" className="fill-current text-sky-600" fontWeight="700">spawning gravel (freshwater)</text>
      <text x="300" y="176" fontSize="6" textAnchor="end" className="fill-current text-sky-600" fontWeight="700">feeding sea</text>
      <text x="195" y="186" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">born in streams → feed and grow in the rich sea →</text>
      <text x="195" y="202" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">return to the home stream to spawn and die</text>
      <text x="195" y="220" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">homing by smell: each stream has a chemical signature</text>
      {/* eel route */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EELS — CATADROMOUS</text>
      <path d="M420 150 h240" className="stroke-current" strokeWidth="10" style={{ color: "rgb(16 185 129 / 0.3)" }} />
      <path d="M430 138 q70 -10 120 0 q70 12 110 6" className="fill-none stroke-current" strokeWidth="4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="440" y="130" fontSize="6" className="fill-current text-emerald-600" fontWeight="700">rivers (growth)</text>
      <text x="650" y="176" fontSize="6" textAnchor="end" className="fill-current text-emerald-600" fontWeight="700">Sargasso Sea (spawning)</text>
      <text x="540" y="186" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">the reverse commute: grow in freshwater,</text>
      <text x="540" y="202" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">spawn in the open ocean, larvae drift back</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why migrate at all: feed where food is rich, spawn where eggs are safe — the two places are never the same.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: salmon = sea→river (anadromous); eel = river→sea (catadromous). Name the direction, name the term.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Both journeys demand osmoregulation flips — the body must re-plumb its salt balance en route.</text>
    </svg>
  );
}
