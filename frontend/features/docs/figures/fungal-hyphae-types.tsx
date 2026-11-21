/** Fungal hyphae types — septate vs coenocytic mycelium. Theme-aware. */
export function FungalHyphaeTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Fungal hyphae septate with cross walls versus coenocytic aseptate multinucleate mycelium and hyphal growth at tips">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The fungal body — threads, not tissue</text>

      {/* septate */}
      <rect x="20" y="50" width="300" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="170" y="76" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SEPTATE hypha</text>
      <path d="M60 140 q60 -30 240 0" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-current text-sky-500/50" />
      {[110, 160, 210, 260].map((x) => (
        <line key={x} x1={x} y1="128" x2={x} y2="146" strokeWidth="2.5" className="stroke-current text-sky-700" />
      ))}
      {["cross-walls (septa) divide cells", "one or two nuclei per cell", "Ascomycetes, Basidiomycetes"].map((s, i) => (
        <text key={i} x="36" y={172 + i * 18} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      {/* coenocytic */}
      <rect x="340" y="50" width="300" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="490" y="76" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">COENOCYTIC hypha</text>
      <path d="M380 140 q60 -30 240 0" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-current text-amber-500/50" />
      {[[410, 130], [470, 138], [530, 130], [580, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" className="fill-current text-amber-700" />
      ))}
      {["no septa — one giant multinucleate cell", "cytoplasm streams freely", "Phycomycetes (Mucor)"].map((s, i) => (
        <text key={i} x="356" y={172 + i * 18} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="226" fontSize="10" className="fill-current text-muted-foreground">Hyphae grow only at their tips; a mass of them = mycelium. Walls are built of chitin — the same polymer as insect skeletons.</text>
    </svg>
  );
}
