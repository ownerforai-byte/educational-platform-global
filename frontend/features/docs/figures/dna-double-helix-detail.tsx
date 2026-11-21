/** DNA double helix detailed — antiparallel strands, base pairs, backbone. Well-detailed. Theme-aware. */
export function DnaDoubleHelixDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 340" className={className} role="img" aria-label="DNA double helix detailed antiparallel strands 5 prime to 3 prime and 3 prime to 5 prime sugar phosphate backbone with base pairs adenine thymine two hydrogen bonds and guanine cytosine three hydrogen bonds major and minor grooves and one full turn 3.4 nanometres">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">DNA double helix — the detailed anatomy</text>

      {/* backbone strands */}
      <path d="M240 60 q60 30 0 60 q-60 30 0 60 q60 30 0 60 q-60 30 0 60" className="fill-none stroke-current text-sky-600" strokeWidth="4" />
      <path d="M400 60 q-60 30 0 60 q60 30 0 60 q-60 30 0 60 q60 30 0 60" className="fill-none stroke-current text-emerald-600" strokeWidth="4" />
      <text x="210" y="55" fontSize="8" className="fill-current text-sky-600" fontWeight="800">5′→3′ strand</text>
      <text x="415" y="55" fontSize="8" className="fill-current text-emerald-600" fontWeight="800">3′→5′ strand (antiparallel)</text>

      {/* base pairs */}
      {[
        { y: 80, l: "A", r: "T", bonds: 2 },
        { y: 125, l: "G", r: "C", bonds: 3 },
        { y: 170, l: "T", r: "A", bonds: 2 },
        { y: 215, l: "C", r: "G", bonds: 3 },
        { y: 260, l: "A", r: "T", bonds: 2 },
      ].map((p) => (
        <g key={p.y}>
          <line x1="244" y1={p.y} x2="396" y2={p.y} strokeWidth="2" className="stroke-current text-violet-500" />
          <circle cx="290" cy={p.y} r="11" className="fill-current text-violet-500/20" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(139 92 246 / 0.9)" }} />
          <text x="290" y={p.y + 3.5} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.l}</text>
          <circle cx="350" cy={p.y} r="11" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(245 158 11 / 0.9)" }} />
          <text x="350" y={p.y + 3.5} fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.r}</text>
          {Array.from({ length: p.bonds }).map((_, i) => (
            <line key={i} x1={316} y1={p.y - 3 + i * 3} x2={324} y2={p.y - 3 + i * 3} strokeWidth="1.2" className="stroke-current text-rose-400" />
          ))}
        </g>
      ))}

      {/* dimension labels */}
      <line x1="470" y1="60" x2="470" y2="300" strokeWidth="1.5" strokeDasharray="5 4" className="stroke-current text-muted-foreground" />
      <text x="478" y="90" fontSize="7.5" className="fill-current text-muted-foreground">A–T: 2 hydrogen bonds</text>
      <text x="478" y="108" fontSize="7.5" className="fill-current text-muted-foreground">G–C: 3 hydrogen bonds (stronger)</text>
      <text x="478" y="132" fontSize="7.5" className="fill-current text-muted-foreground">purine (A, G) + pyrimidine (T, C)</text>
      <text x="478" y="156" fontSize="7.5" className="fill-current text-muted-foreground">one full turn = 10 pairs = 3.4 nm</text>
      <text x="478" y="180" fontSize="7.5" className="fill-current text-muted-foreground">diameter = 2 nm</text>
      <text x="478" y="204" fontSize="7.5" className="fill-current text-muted-foreground">backbone: sugar–phosphate, phosphodiester bonds</text>
      <text x="478" y="228" fontSize="7.5" className="fill-current text-muted-foreground">major + minor grooves = protein binding sites</text>

      <rect x="20" y="312" width="680" height="22" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="36" y="328" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Complementary base pairing is the physical basis of replication and transcription.</text>
    </svg>
  );
}
