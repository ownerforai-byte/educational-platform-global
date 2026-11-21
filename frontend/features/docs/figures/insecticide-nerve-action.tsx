/** Insecticide nerve action — acetylcholinesterase inhibition. Theme-aware. */
export function InsecticideNerveAction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Organophosphate and carbamate insecticides inhibit acetylcholinesterase causing nerve poison convulsions and respiratory failure in insects and humans">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nerve poisons — how OPs and carbamates kill</text>

      {/* normal synapse */}
      <g>
        <rect x="30" y="56" width="290" height="140" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="175" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NORMAL NERVE SIGNAL</text>
        <circle cx="90" cy="130" r="12" className="fill-current text-emerald-500/60" />
        <path d="M110 130 h120" markerEnd="url(#arrn)" strokeWidth="2.5" className="stroke-current text-emerald-600" />
        <circle cx="250" cy="130" r="12" className="fill-current text-emerald-500/60" />
        <text x="175" y="118" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">acetylcholinesterase clears the messenger — pulse ends</text>
        <defs><marker id="arrn" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" className="fill-current text-emerald-600" /></marker></defs>
        <text x="46" y="180" fontSize="8" className="fill-current text-muted-foreground">signal: on-off-on-off — controlled firing</text>
      </g>

      {/* blocked */}
      <g>
        <rect x="340" y="56" width="290" height="140" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="485" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ENZYME BLOCKED (OP / carbamate)</text>
        <circle cx="400" cy="130" r="12" className="fill-current text-rose-500/60" />
        <path d="M420 130 h80" strokeWidth="2.5" className="stroke-current text-rose-500" />
        <line x1="505" y1="118" x2="525" y2="142" strokeWidth="3" className="stroke-current text-rose-600" />
        <circle cx="545" cy="130" r="12" className="fill-current text-rose-500/60" />
        <text x="485" y="118" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">acetylcholinesterase inhibited — signal never switches off</text>
        <text x="356" y="180" fontSize="8" className="fill-current text-muted-foreground">result: convulsions, respiratory failure — in insects AND humans</text>
      </g>
      <text x="16" y="220" fontSize="10" className="fill-current text-muted-foreground">Farm-worker poisoning (nausea, convulsions) is the same chemistry at the wrong target — dose makes the poison.</text>
    </svg>
  );
}
