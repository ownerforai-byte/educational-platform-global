// CuSO4 two-step colour ladder with ammonia. Theme-aware.
export function Cuso4TwoStepLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Two step reaction of copper sulfate with ammonia: pale blue precipitate then deep blue soluble complex on excess ammonia">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The two-step copper drama</text>
      <rect x="40" y="50" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(96 165 250)" }} opacity="0.16" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">step 1 (little NH₃):</text>
      <text x="60" y="98" fontSize="12" fontWeight="700" fill="rgb(96 165 250)">CuSO₄ + 2NH₄OH → Cu(OH)₂↓ (pale blue ppt) + (NH₄)₂SO₄</text>
      <rect x="40" y="126" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(29 78 216)" }} opacity="0.2" />
      <text x="60" y="152" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">step 2 (excess NH₃):</text>
      <text x="60" y="174" fontSize="12" fontWeight="700" fill="rgb(29 78 216)">Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ deep royal-blue solution</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Precipitate first, complex second - the classic identification sequence</text>
      <text x="330" y="242" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Zn(OH)₂ does the same two-step; Fe(OH)₃ does not dissolve</text>
    </svg>
  );
}
