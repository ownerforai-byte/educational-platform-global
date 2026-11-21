/** Yeast vs bacteria — unicellular fungus vs prokaryote. Well-detailed. Theme-aware. */
export function YeastVsBacteria({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Yeast versus bacteria comparison eukaryotic versus prokaryotic nucleus present absent chitin wall peptidoglycan 80S 70S ribosomes budding binary fission size 5 to 10 micrometres versus 1 to 2 micrometres table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Yeast vs bacterium — both single cells, different worlds</text>

      {/* yeast */}
      <rect x="30" y="44" width="320" height="160" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">YEAST (eukaryote)</text>
      <ellipse cx="190" cy="118" rx="42" ry="30" className="fill-none stroke-current text-violet-600" strokeWidth="3" />
      <circle cx="178" cy="110" r="10" className="fill-current text-violet-500/40" />
      <circle cx="232" cy="140" r="12" className="fill-none stroke-current text-violet-600" strokeWidth="2" />
      <text x="232" y="166" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">bud</text>
      {["true nucleus + organelles", "chitin wall · 80S ribosomes", "reproduces by budding", "size 5–10 µm"].map((t, i) => (
        <text key={t} x="50" y={188 + i * 0} fontSize="7.2" className="fill-current text-muted-foreground">{t}</text>
      ))}

      {/* bacteria */}
      <rect x="370" y="44" width="320" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BACTERIUM (prokaryote)</text>
      <ellipse cx="530" cy="118" rx="52" ry="22" className="fill-none stroke-current text-sky-600" strokeWidth="3" />
      <path d="M505 118 q25 -18 50 0" className="fill-none stroke-current text-violet-600" strokeWidth="2" />
      <text x="530" y="166" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">naked DNA, no nucleus</text>
      {["no nucleus, no organelles", "peptidoglycan wall · 70S ribosomes", "reproduces by binary fission", "size 1–2 µm"].map((t, i) => (
        <text key={t} x="390" y={188 + i * 0} fontSize="7.2" className="fill-current text-muted-foreground">{t}</text>
      ))}

      {/* comparison rows */}
      <rect x="30" y="216" width="660" height="70" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="50" y="238" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">WHY IT MATTERS: antibiotics that block 70S ribosomes or peptidoglycan walls kill bacteria but spare yeast — and vice versa.</text>
      <text x="50" y="258" fontSize="7.6" className="fill-current text-muted-foreground">Both are unicellular and microscopic, but yeast belongs to Eukarya (domain) while bacteria stand alone with archaea.</text>
      <text x="50" y="276" fontSize="7.6" className="fill-current text-muted-foreground">Exam hook: 'unicellular' does not mean 'simple' — check the nucleus before you classify.</text>
    </svg>
  );
}
