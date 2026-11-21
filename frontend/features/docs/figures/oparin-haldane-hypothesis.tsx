/** Oparin–Haldane hypothesis steps — chemical evolution. Theme-aware. */
export function OparinHaldaneHypothesis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Oparin Haldane hypothesis chemical evolution steps simple inorganic molecules to organic molecules to macromolecules to coacervates protobionts to self-replicating RNA to first cells">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Oparin–Haldane hypothesis (1920s) — chemical evolution</text>
      {[
        { y: 56, t: "1. Simple inorganic molecules", s: "CH₄, NH₃, H₂O, H₂ react under UV and lightning" },
        { y: 92, t: "2. Simple organic molecules", s: "amino acids, sugars, fatty acids, nitrogen bases — 'hot dilute soup'" },
        { y: 128, t: "3. Macromolecules", s: "proteins, nucleic acids polymerise (possibly on clay surfaces)" },
        { y: 164, t: "4. Coacervates / protobionts", s: "protein-lipid droplets with internal chemistry — cell precursors" },
        { y: 200, t: "5. First self-replicating systems", s: "RNA-first world (ribozymes), then DNA–protein systems" },
        { y: 236, t: "6. First cells", s: "membrane-bounded anaerobic heterotrophs feeding on the soup" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="230" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
    </svg>
  );
}
