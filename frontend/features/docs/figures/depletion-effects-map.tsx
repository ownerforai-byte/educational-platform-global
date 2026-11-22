// Effects of ozone depletion map. Theme-aware.
export function DepletionEffectsMap({ className }: { className?: string }) {
  const effects: [string, string, string][] = [
    ["human health", "skin cancer, cataracts, immune suppression", "rgb(239 68 68)"],
    ["plants", "photosynthesis and crop yields fall", "rgb(16 185 129)"],
    ["marine life", "plankton die - the food web's base wobbles", "rgb(14 165 233)"],
    ["materials", "plastics, paints, rubber degrade faster", "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four categories of effects from ozone depletion on health, plants, marine life and materials">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">What thinner ozone costs</text>
      {effects.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One molecule of protection, four ledgers of damage</text>
    </svg>
  );
}
