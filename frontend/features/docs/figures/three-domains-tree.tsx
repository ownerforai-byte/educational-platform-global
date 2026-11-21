/** Three domains of life — tree with archaea, bacteria, eukarya. Theme-aware. */
export function ThreeDomainsTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three domain tree of life with bacteria archaea and eukarya branching from a universal ancestor">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three domains — the top of the tree of life</text>
      <circle cx="330" cy="70" r="26" className="fill-current text-slate-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(100 116 139 / 0.9)" }} />
      <text x="330" y="74" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">universal\nancestor</text>
      <g className="stroke-current text-muted-foreground" strokeWidth="2.5">
        <line x1="310" y1="90" x2="130" y2="130" /><line x1="330" y1="96" x2="330" y2="130" /><line x1="350" y1="90" x2="530" y2="130" />
      </g>
      {[
        { x: 130, c: "rgb(14 165 233 / 0.9)", t: "BACTERIA", s: ["peptidoglycan walls", "no nuclear envelope", "E. coli, cyanobacteria"] },
        { x: 330, c: "rgb(245 158 11 / 0.9)", t: "ARCHAEA", s: ["extremophiles", "ether-linked lipids", "methanogens, halophiles"] },
        { x: 530, c: "rgb(22 163 74 / 0.9)", t: "EUKARYA", s: ["true nucleus + organelles", "linear chromosomes", "protists → animals"] },
      ].map((d) => (
        <g key={d.t}>
          <rect x={d.x - 92} y="132" width="184" height="80" rx="12" style={{ color: d.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={d.x} y="154" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{d.t}</text>
          {d.s.map((line, i) => (
            <text key={i} x={d.x} y={172 + i * 13} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
        </g>
      ))}
      <text x="16" y="232" fontSize="10" className="fill-current text-muted-foreground">Domains sit ABOVE kingdoms: rRNA evidence split the old Monera into Bacteria and Archaea, while all eukaryotes share one branch.</text>
    </svg>
  );
}
