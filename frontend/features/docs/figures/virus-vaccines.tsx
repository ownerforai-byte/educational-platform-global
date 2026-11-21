/** Vaccines — training immunity with a disarmed virus. Well-detailed. Theme-aware. */
export function VirusVaccines({ className }: { className?: string }) {
  const types: [string, string, string][] = [
    ["Live attenuated", "weakened virus that cannot cause disease", "measles, oral polio"],
    ["Inactivated", "killed virus, still recognised by immunity", "rabies, flu shot"],
    ["Subunit / toxoid", "only a harmless piece or toxin is injected", "hepatitis B"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vaccines types live attenuated inactivated subunit toxoid immunity memory B cells antibodies primary secondary response herd immunity">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Vaccines — rehearsal before the real fight</text>
      {types.map(([name, detail, ex], i) => {
        const x = 30 + i * 170;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="140" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + 80} y="66" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <circle cx={x + 80} cy="102" r="16" className="fill-none stroke-current text-sky-500" strokeWidth="2.2" style={{ color: "rgb(2 132 199 / 0.9)" }} strokeDasharray={i === 1 ? "4 3" : i === 2 ? "2 4" : undefined} />
            <text x={x + 80} y="106" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">{["live−", "killed", "piece"][i]}</text>
            <text x={x + 12} y="134" fontSize="6.8" className="fill-current text-muted-foreground">{detail.slice(0, 34)}</text>
            <text x={x + 12} y="148" fontSize="6.8" className="fill-current text-muted-foreground">{detail.slice(34, 68)}</text>
            <text x={x + 12} y="170" fontSize="6.8" className="fill-current text-sky-600">{ex}</text>
          </g>
        );
      })}
      {/* immune response strip */}
      <rect x="30" y="200" width="660" height="92" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="222" fontSize="8.4" className="fill-current text-foreground" fontWeight="800">What the body does with the rehearsal</text>
      {[
        "1. vaccine virus meets immune cells",
        "2. B cells make antibodies, memory cells form",
        "3. real infection → memory fires instantly",
        "4. disease prevented or weakened",
      ].map((t, i) => (
        <text key={t} x={46 + (i % 2) * 330} y={244 + Math.floor(i / 2) * 22} fontSize="7.2" className="fill-current text-muted-foreground">{t}</text>
      ))}
      <text x="46" y="286" fontSize="7" className="fill-current text-emerald-600">Memory cells are why the second exposure never makes you sick — and why vaccination works at all.</text>
    </svg>
  );
}
