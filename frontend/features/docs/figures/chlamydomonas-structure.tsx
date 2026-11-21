/** Chlamydomonas structure — the flagellated green alga. Well-detailed. Theme-aware. */
export function ChlamydomonasStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Chlamydomonas structure single cell two flagella cup-shaped chloroplast pyrenoid eyespot red stigma contractile vacuole nucleus motile green alga">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chlamydomonas — a swimming one-cell alga</text>

      {/* big cell */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {/* cell body */}
      <ellipse cx="220" cy="160" rx="80" ry="62" className="fill-current text-emerald-600/15" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {/* cup chloroplast */}
      <path d="M220 112 q-52 8 -50 52 q2 44 50 50 q48 -6 50 -50 q2 -44 -50 -52 M220 130 q-32 6 -31 34 q1 30 31 33 q30 -3 31 -33 q1 -28 -31 -34" className="fill-none stroke-current text-emerald-600" strokeWidth="4" style={{ color: "rgb(22 163 74 / 0.85)" }} />
      <text x="130" y="238" fontSize="7.4" className="fill-current text-emerald-600" fontWeight="700">cup-shaped chloroplast</text>
      {/* pyrenoid */}
      <circle cx="220" cy="160" r="10" className="fill-current text-amber-500/50" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="240" y="164" fontSize="7.2" className="fill-current text-amber-600">pyrenoid (starch centre)</text>
      {/* nucleus */}
      <circle cx="220" cy="196" r="6" className="fill-current text-violet-500/60" />
      <text x="234" y="200" fontSize="6.8" className="fill-current text-violet-500">nucleus</text>
      {/* eyespot */}
      <circle cx="172" cy="130" r="5" className="fill-current text-rose-500/80" />
      <text x="96" y="122" fontSize="7" className="fill-current text-rose-500">eyespot (stigma)</text>
      {/* contractile vacuole */}
      <circle cx="258" cy="126" r="4" className="fill-none stroke-current text-sky-500" strokeWidth="1.6" />
      <text x="272" y="120" fontSize="6.8" className="fill-current text-sky-500">contractile vacuole</text>
      {/* flagella */}
      <path d="M180 106 q-26 -22 -48 -26 M258 104 q26 -24 50 -28" className="fill-none stroke-current text-emerald-700" strokeWidth="3" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <text x="60" y="72" fontSize="7.4" className="fill-current text-emerald-700" fontWeight="700">two equal flagella</text>
      <text x="330" y="66" fontSize="7.4" className="fill-current text-emerald-700" fontWeight="700">two equal flagella</text>
      <text x="50" y="254" fontSize="7.2" className="fill-current text-muted-foreground">Motile — it swims toward light using its eyespot; gametes look just like a miniature parent cell.</text>

      {/* notes card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LABEL CHECKLIST</text>
      {[
        "cell wall + two flagella",
        "cup chloroplast with pyrenoid",
        "red eyespot senses light",
        "contractile vacuole pumps water",
        "single nucleus",
        "reproduces by zoospores and",
        "isogamous sexual fusion",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="252" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: 'motile, unicellular,</text>
      <text x="446" y="266" fontSize="7.2" className="fill-current text-muted-foreground">cup chloroplast' = Chlamydomonas.</text>
    </svg>
  );
}
