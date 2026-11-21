/** Frog spleen lymph hearts — the auxiliary circulation. Well-detailed. Theme-aware. */
export function FrogSpleenLymphHearts({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Frog spleen lymph hearts auxiliary circulation lymphatic system lymph spaces sinuses lymph hearts push fluid back into veins immune filter red blood cell recycling">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Beyond the heart — spleen and lymph hearts</text>
      {/* spleen */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SPLEEN</text>
      <ellipse cx="195" cy="140" rx="60" ry="30" className="fill-current text-rose-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="144" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">dark red, near stomach</text>
      {[
        "recycles worn-out red cells",
        "stores and releases blood reserves",
        "immune tissue filters the blood",
      ].map((t, i) => (
        <text key={t} x="195" y={186 + i * 16} fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{t}</text>
      ))}
      {/* lymph hearts */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LYMPH HEARTS</text>
      {[
        "lymph fills body spaces (sinuses)",
        "  between organs and skin",
        "no full vessels — fluid just sits",
        "  and drains slowly",
        "two pairs of muscular lymph hearts",
        "  pump lymph back into the veins",
        "unique amphibian hardware —",
        "  mammals manage without them",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Why it matters: a frog's loose, baggy skin needs extra plumbing — lymph hearts are the amphibian's answer to fluid drainage.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: spleen = blood filter and reserve; lymph hearts = pump lymph into veins. Two organs, two jobs.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The frog has one main heart plus two pairs of lymph hearts — three pumps in one body.</text>
    </svg>
  );
}
