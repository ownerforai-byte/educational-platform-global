/** Protozoa classification — four classes with locomotion, examples, habitat. Theme-aware. */
export function ProtozoaClassification({ className }: { className?: string }) {
  const card = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="146" height="150" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 73} y="80" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 12} y={102 + i * 22} fontSize="8" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Protozoa classification into Sarcodina Mastigophora Ciliata and Sporozoa with locomotion nutrition and examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Phylum Protozoa — four classes</text>
      {card(16, "rgb(14 165 233 / 0.9)", "Sarcodina", ["locomotion: pseudopodia", "nutrition: holozoic", "Amoeba, Entamoeba", "(amoebic dysentery)"], "a")}
      {card(178, "rgb(16 185 129 / 0.9)", "Mastigophora", ["locomotion: flagella", "many photosynthetic", "Euglena, Trypanosoma", "(sleeping sickness)"], "b")}
      {card(340, "rgb(245 158 11 / 0.9)", "Ciliata", ["locomotion: cilia", "most complex protozoa", "Paramecium, Vorticella", "two nuclei (macro/micro)"], "c")}
      {card(502, "rgb(244 63 94 / 0.9)", "Sporozoa", ["no locomotion — parasitic", "spore-like infective stage", "Plasmodium (malaria)", "Monocystis (earthworm)"], "d")}
      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">All unicellular eukaryotes; reproduction by binary fission, multiple fission (sporulation) or conjugation (ciliates).</text>
    </svg>
  );
}
