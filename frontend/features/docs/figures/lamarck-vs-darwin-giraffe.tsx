/** Lamarck vs Darwin giraffe comparison. Theme-aware. */
export function LamarckVsDarwinGiraffe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Lamarck versus Darwin giraffe explanation stretched neck inherited versus long necked variants survived droughts and bred more">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two answers to one giraffe</text>

      <rect x="40" y="50" width="280" height="130" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="180" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LAMARCK</text>
      <path d="M80 160 q20 -70 60 -80" className="fill-none stroke-current text-amber-500" strokeWidth="3" />
      <text x="60" y="100" fontSize="7.4" className="fill-current text-muted-foreground">stretched to reach</text>
      <text x="60" y="114" fontSize="7.4" className="fill-current text-muted-foreground">higher leaves…</text>
      <text x="180" y="146" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">stretched neck INHERITED</text>

      <rect x="340" y="50" width="280" height="130" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="480" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DARWIN</text>
      <text x="360" y="100" fontSize="7.4" className="fill-current text-muted-foreground">necks of every length in the</text>
      <text x="360" y="114" fontSize="7.4" className="fill-current text-muted-foreground">population (heritable variation)…</text>
      <text x="480" y="146" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">long-necked variants survived</text>
      <text x="480" y="162" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground">droughts and bred more</text>

      <text x="16" y="206" fontSize="8.6" className="fill-current text-muted-foreground">Lamarck: organisms acquire characters by need. Darwin: the environment selects among random heritable variations.</text>
    </svg>
  );
}
