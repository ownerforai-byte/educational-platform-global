/** Chloroplast grana detail — thylakoid stacks, stroma, lamellae. Well-detailed. Theme-aware. */
export function ChloroplastGranaDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Chloroplast grana detail outer and inner envelope stroma with circular DNA ribosomes starch granule grana stacks of thylakoid discs stroma lamellae connecting grana light reaction in thylakoid membrane Calvin cycle in stroma">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chloroplast — the photosynthesis factory in detail</text>

      {/* envelope */}
      <ellipse cx="300" cy="160" rx="250" ry="105" className="fill-current text-emerald-500/8" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <ellipse cx="300" cy="160" rx="235" ry="92" className="fill-none stroke-current text-emerald-600" strokeWidth="2" />
      <text x="300" y="288" fontSize="8" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">double envelope (outer + inner) — intermembrane space between</text>

      {/* stroma label */}
      <text x="120" y="105" fontSize="8" className="fill-current text-emerald-700" fontWeight="800">STROMA</text>
      <text x="120" y="120" fontSize="7" className="fill-current text-muted-foreground">Calvin cycle here · circular DNA,</text>
      <text x="120" y="134" fontSize="7" className="fill-current text-muted-foreground">70S ribosomes, starch granule</text>

      {/* grana stacks */}
      {[190, 330, 440].map((gx, gi) => (
        <g key={gx}>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={gx} y={100 + i * 16} width="60" height="9" rx="3" className="fill-current text-emerald-600/60" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          ))}
          <text x={gx + 30} y={92} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">granum {gi + 1}</text>
        </g>
      ))}
      {/* stroma lamellae */}
      <path d="M250 140 L330 140 M390 140 L440 140" strokeWidth="3" className="stroke-current text-emerald-500" />
      <text x="350" y="200" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">stroma lamellae connect the grana</text>

      {/* thylakoid zoom */}
      <rect x="480" y="70" width="210" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="585" y="90" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THYLAKOID MEMBRANE</text>
      <rect x="510" y="110" width="150" height="30" rx="6" className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="585" y="130" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">photosystems II → I + ATP synthase</text>
      <text x="510" y="162" fontSize="7.2" className="fill-current text-muted-foreground">light reaction: H₂O split, O₂ released,</text>
      <text x="510" y="178" fontSize="7.2" className="fill-current text-muted-foreground">NADPH + ATP made (chemiosmosis)</text>
      <text x="510" y="200" fontSize="7.2" className="fill-current text-muted-foreground">lumen = H⁺ reservoir driving ATP synthesis</text>

      <text x="16" y="322" fontSize="8.4" className="fill-current text-muted-foreground">Division of labour: light capture in the membranes, sugar assembly in the stroma — two rooms, one organelle.</text>
    </svg>
  );
}
