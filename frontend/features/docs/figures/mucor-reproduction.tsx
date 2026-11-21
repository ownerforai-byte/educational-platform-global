/** Mucor reproduction — asexual sporangiospores and sexual conjugation to zygospore. Theme-aware. */
export function MucorReproduction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Mucor reproduction asexual sporangiospore release and sexual conjugation of plus and minus strains forming progametangia gametangia and dark zygospore">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two reproductive modes of Mucor</text>

      {/* asexual */}
      <rect x="20" y="50" width="290" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="165" y="76" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ASEXUAL — the fast lane</text>
      <line x1="120" y1="160" x2="120" y2="106" strokeWidth="4" className="stroke-current text-amber-600" />
      <circle cx="120" cy="96" r="20" className="fill-current text-sky-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <g className="stroke-current text-sky-600" strokeWidth="1.5">
        <line x1="120" y1="70" x2="120" y2="56" /><line x1="140" y1="80" x2="152" y2="70" /><line x1="100" y1="80" x2="88" y2="70" />
      </g>
      {["sporangium bursts → sporangiospores", "each spore grows a new mycelium", "runs all season — rapid spread"].map((s, i) => (
        <text key={i} x="36" y={182 + i * 18} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      {/* sexual */}
      <rect x="340" y="50" width="300" height="170" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="490" y="76" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">SEXUAL — conjugation (+ × −)</text>
      <path d="M400 140 q30 -20 60 0" fill="none" strokeWidth="4" className="stroke-current text-violet-500" />
      <path d="M580 140 q-30 -20 -60 0" fill="none" strokeWidth="4" className="stroke-current text-rose-500" />
      <circle cx="470" cy="140" r="9" className="fill-current text-violet-600/70" />
      <circle cx="510" cy="140" r="9" className="fill-current text-rose-600/70" />
      <circle cx="490" cy="140" r="11" className="fill-current text-slate-700/70" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(51 65 85 / 0.9)" }} />
      <text x="490" y="176" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">progametangia → gametangia → zygospore (dark, thick-walled)</text>
      {["+ and − strains must meet", "zygospore survives harsh conditions", "meiosis on germination → new mycelium"].map((s, i) => (
        <text key={i} x="356" y={192 + i * 18} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Asexual = quantity; sexual = quality (new gene combinations + a survival capsule for bad times).</text>
    </svg>
  );
}
