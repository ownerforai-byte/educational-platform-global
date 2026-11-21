/** Archaeopteryx mosaic — reptile bird connecting link. Well-detailed. Theme-aware. */
export function ArchaeopteryxMosaic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Archaeopteryx mosaic reptilian bird characters teeth tail clawed wings feathers connecting link fossil Jurassic limestone">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Archaeopteryx — half reptile, half bird</text>
      {/* body */}
      <ellipse cx="300" cy="150" rx="110" ry="55" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <circle cx="400" cy="120" r="26" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <path d="M424 112 l24 -6 l-22 12" className="fill-current" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <circle cx="406" cy="114" r="2.4" className="fill-current text-foreground" />
      {/* feathered wing */}
      <path d="M280 130 q-70 -18 -120 8 q50 22 120 14" className="fill-current text-amber-600/25" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <path d="M285 158 q-60 6 -100 30 q55 4 105 -14" className="fill-current text-amber-600/25" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      {/* long bony tail */}
      <path d="M192 148 q-70 6 -120 26" className="fill-none stroke-current" strokeWidth="8" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      {/* teeth */}
      {[[388, 138], [396, 140], [404, 142], [412, 143]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l4 8 l4 -8`} className="fill-none stroke-current" strokeWidth="1.2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      ))}
      {/* labels */}
      <rect x="470" y="44" width="220" height="100" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="484" y="64" fontSize="8" className="fill-current text-foreground" fontWeight="800">Reptilian characters</text>
      {["teeth in jaws", "long bony tail", "claws on wing fingers", "free vertebrae"].map((t, i) => (
        <text key={t} x="494" y={82 + i * 15} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="470" y="156" width="220" height="100" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="484" y="176" fontSize="8" className="fill-current text-foreground" fontWeight="800">Avian characters</text>
      {["feathers on wings and tail", "fused hand bones for flight", "furcula (wishbone)"].map((t, i) => (
        <text key={t} x="494" y={194 + i * 15} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-amber-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Jurassic (~150 mya), found in the fine limestone of Solnhofen — the classic connecting link between reptiles and birds.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: list two reptilian and two avian characters — that is the full mark scheme.</text>
    </svg>
  );
}
