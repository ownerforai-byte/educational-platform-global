/** Pine needle cross-section — xerophyte engineering. Well-detailed. Theme-aware. */
export function PinusNeedleCrossSection({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pinus needle cross-section thick cuticle sunken stomata hypodermis resin canal transfusion tissue mesophyll xerophyte adaptations evergreen conifer">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Slice a pine needle — drought engineering</text>

      {/* cross-section */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NEEDLE IN CROSS-SECTION</text>
      {/* needle outline (semi-circle) */}
      <path d="M80 200 a150 150 0 0 1 300 0 Z" className="fill-current text-emerald-600/15" stroke="currentColor" strokeWidth="2.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {/* cuticle + epidermis */}
      <path d="M80 200 a150 150 0 0 1 300 0" className="fill-none stroke-current text-emerald-800" strokeWidth="5" style={{ color: "rgb(6 46 27 / 0.9)" }} />
      <text x="390" y="120" fontSize="7" className="fill-current text-emerald-800" fontWeight="700">thick cuticle + epidermis</text>
      {/* hypodermis */}
      <path d="M92 200 a138 138 0 0 1 276 0" className="fill-none stroke-current text-amber-700" strokeWidth="3" strokeDasharray="5 3" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="90" y="132" fontSize="7" className="fill-current text-amber-700">hypodermis (sclerenchyma)</text>
      {/* sunken stomata */}
      {[[130, 168], [190, 138], [270, 138], [330, 168]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 6} ${y} h12 M${x} ${y} v-8`} className="stroke-current text-sky-600" strokeWidth="2" />
          <circle cx={x} cy={y - 10} r="2.6" className="fill-none stroke-current text-sky-600" strokeWidth="1.2" />
        </g>
      ))}
      <text x="120" y="106" fontSize="7" className="fill-current text-sky-600">sunken stomata — trapped humid air</text>
      {/* mesophyll */}
      {[[160, 176], [200, 160], [240, 176], [300, 180], [220, 190]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="1" />
      ))}
      <text x="200" y="216" fontSize="7" className="fill-current text-emerald-700">mesophyll + transfusion tissue</text>
      {/* resin canals */}
      {[[110, 190], [350, 190]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" className="fill-none stroke-current text-amber-600" strokeWidth="2.4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <circle cx={x} cy={y} r="4" className="fill-current text-amber-500/50" />
        </g>
      ))}
      <text x="60" y="242" fontSize="7.2" className="fill-current text-amber-600" fontWeight="700">resin canals — seal wounds, deter insects</text>

      {/* notes card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">XEROPHYTE CHECKLIST</text>
      {[
        "needle shape — low surface area",
        "thick cuticle slows water loss",
        "sunken stomata hold humid air",
        "hypodermis = mechanical armour",
        "resin canals heal and defend",
        "evergreen — photosynthesises",
        "whenever winter allows",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="248" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: 'sunken stomata + resin</text>
      <text x="466" y="262" fontSize="7.2" className="fill-current text-muted-foreground">canal' in a needle = Pinus.</text>
    </svg>
  );
}
