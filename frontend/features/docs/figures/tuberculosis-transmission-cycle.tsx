/** Tuberculosis transmission cycle — the airborne route. Well-detailed. Theme-aware. */
export function TuberculosisTransmissionCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Tuberculosis transmission cycle airborne droplets Mycobacterium cough latent active infection difference immune system containment Ghon focus lungs diagnosis mantoux chest X-ray sputum DOTS treatment months compliance MDR Nepal burden">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Tuberculosis — the airborne lifecycle</text>
      {/* cycle */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["1. Inhale", "droplet nuclei from a coughing patient", 130],
        ["2. Settle", "bacilli lodge in lung alveoli", 300],
        ["3. Battle", "immune wall forms (latent, usually) — or active disease", 470],
        ["4. Cough out", "active TB spreads via droplets again", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">most infections stay latent — only ~10% ever activate, usually when immunity drops (HIV, malnutrition, diabetes)</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Treatment is the hard part: 6+ months of combined drugs — stopping early breeds MDR-TB, costlier and harder to cure.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">DOTS strategy: watch every dose swallowed — compliance by design, not by hope.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: latent ≠ active — no symptoms, not contagious vs cough, fever, weight loss, contagious. One line separates them.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Ventilation and sunlight cut transmission — TB is a disease of crowded, dark, still air.</text>
    </svg>
  );
}
