/** Protozoan reproduction — binary fission, multiple fission, conjugation. Theme-aware. */
export function ProtozoaReproduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Protozoan reproduction showing transverse binary fission of Paramecium multiple fission sporulation of Plasmodium and conjugation between two paramecia">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reproduction — fission mostly, sex occasionally</text>

      {/* binary fission */}
      <g>
        <text x="60" y="56" fontSize="10.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">Binary fission (asexual)</text>
        <ellipse cx="100" cy="100" rx="36" ry="22" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <circle cx="100" cy="100" r="7" className="fill-current text-violet-500/50" />
        <ellipse cx="220" cy="100" rx="40" ry="20" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <line x1="220" y1="80" x2="220" y2="120" strokeWidth="2" className="stroke-current text-emerald-600" />
        <circle cx="206" cy="100" r="5" className="fill-current text-violet-500/50" /><circle cx="234" cy="100" r="5" className="fill-current text-violet-500/50" />
        <text x="290" y="104" fontSize="9" className="fill-current text-muted-foreground">Paramecium divides TRANSVERSELY</text>
        <text x="290" y="118" fontSize="9" className="fill-current text-muted-foreground">(across the bands); Amoeba in any plane</text>
      </g>

      {/* multiple fission */}
      <g>
        <text x="60" y="166" fontSize="10.5" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">Multiple fission / sporulation</text>
        <circle cx="110" cy="200" r="26" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <g className="fill-current text-rose-500/60">
          <circle cx="100" cy="192" r="3" /><circle cx="120" cy="192" r="3" /><circle cx="100" cy="208" r="3" /><circle cx="120" cy="208" r="3" /><circle cx="110" cy="200" r="3" />
        </g>
        <text x="160" y="196" fontSize="9" className="fill-current text-muted-foreground">Plasmodium: one infected cell releases</text>
        <text x="160" y="210" fontSize="9" className="fill-current text-muted-foreground">thousands of sporozoites at once — fever spike</text>
      </g>

      {/* conjugation */}
      <g>
        <text x="420" y="166" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">Conjugation (sexual, ciliates)</text>
        <ellipse cx="470" cy="200" rx="34" ry="18" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <ellipse cx="548" cy="200" rx="34" ry="18" className="fill-current text-violet-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <line x1="504" y1="200" x2="514" y2="200" strokeWidth="3" className="stroke-current text-violet-600" />
        <text x="509" y="238" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">nuclei exchanged, then each divides</text>
      </g>

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">Fission builds numbers fast; conjugation renews the hereditary mix — Paramecium does both depending on conditions.</text>
    </svg>
  );
}
