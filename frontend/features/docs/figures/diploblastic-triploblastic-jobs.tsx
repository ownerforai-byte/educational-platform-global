/** Diploblastic vs triploblastic tissue jobs. Well-detailed. Theme-aware. */
export function DiploblasticTriploblasticJobs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Diploblastic versus triploblastic tissue jobs ectoderm endoderm mesoderm cnidarian flatworm organ building mesoderm muscle blood bone">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two layers vs three — what the third layer buys</text>
      {/* diploblastic */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DIPLOBLASTIC (cnidarians)</text>
      <ellipse cx="195" cy="140" rx="100" ry="56" className="fill-none stroke-current" strokeWidth="8" style={{ color: "rgb(2 132 199 / 0.6)" }} />
      <ellipse cx="195" cy="140" rx="70" ry="34" className="fill-none stroke-current" strokeWidth="8" style={{ color: "rgb(16 185 129 / 0.6)" }} />
      <text x="195" y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">ectoderm outside, endoderm inside, jelly in between —</text>
      <text x="195" y="242" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">no dedicated muscle or blood layer</text>
      {/* triploblastic */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TRIPOBLASTIC (flatworms onward)</text>
      <ellipse cx="540" cy="140" rx="100" ry="56" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(2 132 199 / 0.6)" }} />
      <ellipse cx="540" cy="140" rx="80" ry="42" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(245 158 11 / 0.7)" }} />
      <ellipse cx="540" cy="140" rx="60" ry="26" className="fill-none stroke-current" strokeWidth="7" style={{ color: "rgb(16 185 129 / 0.6)" }} />
      <text x="540" y="228" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">mesoderm in the middle builds muscle, blood, bone, kidneys —</text>
      <text x="540" y="242" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">every organ you own is mesodermal or layered on it</text>
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: diplo = two, triplo = three — and mesoderm is the layer that makes big bodies possible.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Ectoderm → skin and nerves; endoderm → gut lining; mesoderm → everything that moves and pumps.</text>
    </svg>
  );
}
