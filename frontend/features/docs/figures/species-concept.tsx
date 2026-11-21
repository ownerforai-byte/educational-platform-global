/** Species concept & binomial naming — what defines a species. Theme-aware. */
export function SpeciesConcept({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Species concept defining biological species as interbreeding population reproductively isolated with genus and specific epithet naming">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Species — the only real rung on the ladder</text>

      {/* venn */}
      <circle cx="180" cy="110" r="60" className="fill-current text-sky-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="180" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">one interbreeding</text>
      <text x="180" y="116" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">population</text>
      <circle cx="250" cy="110" r="60" className="fill-current text-rose-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="270" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">reproductive</text>
      <text x="270" y="116" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">isolation from others</text>

      {/* facts */}
      <rect x="380" y="56" width="260" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="396" y="82" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">Species criteria:</text>
      {["similar form & structure", "interbreed → fertile offspring", "reproductively isolated from others", "share a common gene pool", "named as Genus + specific epithet"].map((s, i) => (
        <text key={i} x="396" y={102 + i * 18} fontSize="8.3" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Higher ranks (genus, family…) are human groupings of convenience; the species is a biological fact — defined by who can breed with whom.</text>
    </svg>
  );
}
