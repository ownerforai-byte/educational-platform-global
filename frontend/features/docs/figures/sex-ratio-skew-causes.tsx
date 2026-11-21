/** Sex ratio skew causes — the missing daughters. Well-detailed. Theme-aware. */
export function SexRatioSkewCauses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sex ratio skew causes missing women natural 105 boys 100 girls son preference dowry system sex selective abortion ultrasound misuse PCPNDT act India Nepal sex ratio at birth distorted districts census data consequences marriage squeeze bride trafficking social instability China one child legacy Korea reversed education campaign success patriarchal norms property inheritance women status policy response">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sex ratio skew — the missing daughters</text>
      {/* biology vs distortion */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOLOGY vs DISTORTION</text>
      {[
        "nature's baseline: ~105 boys born",
        "  per 100 girls — boys' higher",
        "  infant mortality evens it out",
        "the distortion: son preference +",
        "  sex-selective abortion pushes",
        "  ratios far past 105 in some",
        "  regions",
        "census evidence: northwestern",
        "  India, parts of Nepal's Terai,",
        "  and China show the skew —",
        "  wealth didn't fix it; values",
        "  drove it",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* consequences + fixes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CONSEQUENCES AND FIXES</text>
      {[
        "marriage squeeze: millions of",
        "  men who can't find brides —",
        "  a recipe for trafficking and",
        "  unrest",
        "dowry economics: daughters seen",
        "  as costs is the root belief",
        "what worked: South Korea's",
        "  combination of law enforcement,",
        "  media campaigns and women's",
        "  economic rise normalised the",
        "  ratio within a generation",
        "exam hook: 105:100 baseline +",
        "  skew cause (son preference) +",
        "  one consequence + one fix",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: quote the natural 105:100 ratio, then explain the skew as a values problem, not a biology problem.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Technology didn't create son preference — it industrialised it. The fix is social, not technical.</text>
    </svg>
  );
}
