/** Nepal's major protected areas and their flagship wildlife. Theme-aware. */
export function MajorProtectedAreas({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Nepal's major protected areas Chitwan Bardia Sagarmatha Langtang Koshi Tappu Dhorpatan Annapurna and Kanchenjunga with their notable biodiversity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where to find what — the flagship map</text>
      {[
        { y: 48, t: "CHITWAN NP (Terai)", s: "one-horned rhinoceros, Bengal tiger, gharial; sal forest and grasslands" },
        { y: 74, t: "BARDIA NP (W Terai)", s: "tiger, wild elephant, Gangetic dolphin in the Karnali" },
        { y: 100, t: "SAGARMATHA NP (Khumbu)", s: "musk deer, snow leopard, Himalayan tahr; World Heritage Site" },
        { y: 126, t: "LANGTANG NP", s: "red panda, Himalayan black bear; alpine flora" },
        { y: 152, t: "KOSHI TAPPU RESERVE", s: "last wild water buffalo (arna); migratory waterbird paradise" },
        { y: 178, t: "DHORPATAN RESERVE", s: "blue sheep; regulated hunting" },
        { y: 204, t: "ANNAPURNA + KANCHENJUNGA CA", s: "largest CA, community-managed; snow leopard corridor, eastern endemism" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 11} width="612" height="24" rx="6" className="fill-current text-emerald-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="240" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
      <text x="16" y="236" fontSize="9" className="fill-current text-muted-foreground">Pattern to remember: Terai = rhino/tiger/gharial; mid-hills = red panda; high Himalaya = snow leopard/tahr.</text>
    </svg>
  );
}
