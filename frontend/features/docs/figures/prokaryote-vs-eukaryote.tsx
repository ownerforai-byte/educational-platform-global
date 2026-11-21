/**
 * Prokaryotic vs eukaryotic cell — side-by-side conceptual comparison.
 * Theme-aware via currentColor.
 */
export function ProkaryoteVsEukaryote({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Side-by-side conceptual comparison of a prokaryotic cell with nucleoid cell wall and ribosomes against a eukaryotic cell with nucleus and membrane-bound organelles">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Prokaryote vs eukaryote — the decisive comparison</text>

      {/* prokaryote */}
      <ellipse cx="160" cy="170" rx="120" ry="90" className="fill-current text-teal-500/8" strokeWidth="4" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <ellipse cx="160" cy="170" rx="108" ry="78" fill="none" strokeWidth="2" strokeDasharray="5 3" className="stroke-current text-teal-400" />
      <path d="M110 132 q24 -20 48 -2 q24 18 52 2" fill="none" strokeWidth="3" className="stroke-current text-violet-500" />
      <text x="118" y="122" fontSize="9.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">nucleoid — naked DNA, no envelope</text>
      <g className="fill-current text-slate-500">
        <circle cx="120" cy="200" r="4" /><circle cx="140" cy="212" r="4" /><circle cx="170" cy="206" r="4" /><circle cx="196" cy="192" r="4" /><circle cx="150" cy="180" r="4" />
      </g>
      <text x="104" y="232" fontSize="9.5" className="fill-current text-muted-foreground">70S ribosomes — only organelle</text>
      <text x="60" y="86" fontSize="12" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">PROKARYOTE (bacteria)</text>
      <text x="286" y="120" fontSize="9.5" className="fill-current text-muted-foreground">cell wall + capsule outside membrane</text>
      <text x="286" y="136" fontSize="9.5" className="fill-current text-muted-foreground">1–5 µm · no membrane-bound organelles</text>
      <text x="286" y="152" fontSize="9.5" className="fill-current text-muted-foreground">divides by binary fission</text>

      {/* eukaryote */}
      <ellipse cx="500" cy="170" rx="130" ry="105" className="fill-current text-sky-500/8" strokeWidth="4" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <circle cx="470" cy="140" r="34" className="fill-current text-violet-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="446" y="106" fontSize="9.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">true nucleus</text>
      <ellipse cx="540" cy="200" rx="26" ry="14" className="fill-current text-rose-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="512" y="230" fontSize="9.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">mitochondrion</text>
      <g className="stroke-current text-teal-500" strokeWidth="3" fill="none" style={{ color: "rgb(20 184 166 / 0.8)" }}>
        <path d="M440 210 q14 -12 28 0 q14 12 28 0" />
      </g>
      <text x="420" y="248" fontSize="9.5" className="fill-current text-muted-foreground">ER + Golgi + lysosomes…</text>
      <text x="400" y="86" fontSize="12" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">EUKARYOTE (plants, animals, fungi, protists)</text>
      <text x="400" y="66" fontSize="9.5" className="fill-current text-muted-foreground">10–100 µm · membrane-bound organelles</text>

      <text x="16" y="300" fontSize="10" className="fill-current text-muted-foreground">Shared: plasma membrane, cytoplasm, ribosomes, DNA. Different: compartmentalisation — eukaryotes separate incompatible reactions into organelles.</text>
    </svg>
  );
}
