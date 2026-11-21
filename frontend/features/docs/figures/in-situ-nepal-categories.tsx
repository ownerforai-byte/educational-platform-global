/** In-situ conservation protected area categories in Nepal. Theme-aware. */
export function InSituNepalCategories({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="In-situ conservation protected area categories in Nepal national parks Chitwan 1973 Sagarmatha Bardiya Langtang Shey Phoksundo wildlife reserves Parsa Koshi Tappu arna conservation areas Annapurna ACAP Kanchenjunga Manaslu Gaurishankar hunting reserve Dhorpatan biosphere Ramsar sites">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">In-situ conservation — Nepal's protected-area categories</text>
      {[
        { y: 56, t: "NATIONAL PARKS", s: "strict protection, no settlement — Chitwan (1973, first), Sagarmatha, Bardiya, Langtang, Shey-Phoksundo (largest)" },
        { y: 94, t: "WILDLIFE RESERVES", s: "species-focused — Parsa; Koshi Tappu (wild water buffalo, arna)" },
        { y: 132, t: "CONSERVATION AREAS", s: "community-managed multiple use — Annapurna (ACAP, largest), Kanchenjunga, Manaslu, Gaurishankar" },
        { y: 170, t: "HUNTING RESERVE", s: "regulated hunting — Dhorpatan" },
        { y: 208, t: "RAMSAR / BIOSPHERE", s: "wetlands — Koshi Tappu, Bishazari Tal, Ghodaghodi Tal; Himalaya hotspot priority" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="210" y={s.y} fontSize="7" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="240" fontSize="8.4" className="fill-current text-muted-foreground">Principle: protect whole ecosystems so species evolve in their natural setting — genes, species and interactions preserved together.</text>
    </svg>
  );
}
