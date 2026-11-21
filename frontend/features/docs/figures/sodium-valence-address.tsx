// Solved NEB 2024: sodium valence electron quantum numbers. Theme-aware.
export function SodiumValenceAddress({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 220" className={className} role="img" aria-label="Solved NEB 2024 sodium electron configuration 1s2 2s2 2p6 3s1 giving valence electron quantum numbers n 3 l 0 m l 0 and m s plus one half">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solved — NEB 2024 (3m): quantum numbers of Na's valence electron</text>
      <rect x="30" y="40" width="320" height="80" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="62" fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">Step 1 — write the configuration</text>
      <text x="46" y="86" fontSize="10" className="fill-current text-foreground" fontWeight="700">Na (Z = 11): 1s² 2s² 2p⁶ 3s¹</text>
      <text x="46" y="106" fontSize="8" className="fill-current text-muted-foreground">The outermost (valence) electron sits in 3s¹</text>
      <rect x="370" y="40" width="320" height="80" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="386" y="62" fontSize="9.5" className="fill-current text-emerald-600" fontWeight="800">Step 2 — read the numbers off the orbital</text>
      <text x="386" y="84" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">n = 3 · l = 0 · mₗ = 0 · mₛ = +½</text>
      <text x="386" y="106" fontSize="8" className="fill-current text-muted-foreground">3 → n; s → l = 0; only one mₗ = 0; spin ±½</text>
      <rect x="30" y="136" width="660" height="66" rx="10" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="158" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">Decoding table: s → l = 0, p → l = 1, d → l = 2, f → l = 3.</text>
      <text x="46" y="176" fontSize="8" className="fill-current text-muted-foreground">l = 0 allows only mₗ = 0, so the 3s orbital holds at most 2 electrons — here it holds 1, and mₛ = +½ is the accepted default.</text>
      <text x="46" y="193" fontSize="8" className="fill-current text-muted-foreground">Same drill works for any configuration the paper gives you — config first, numbers second.</text>
    </svg>
  );
}
