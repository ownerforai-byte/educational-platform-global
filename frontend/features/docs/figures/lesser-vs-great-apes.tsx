/** Lesser vs great apes. Theme-aware. */
export function LesserVsGreatApes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Lesser apes versus great apes gibbon family Hylobatidae small brachiating monogamous versus orangutan gorilla chimpanzee family Hominidae large with humans">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lesser apes vs great apes</text>

      <rect x="40" y="50" width="280" height="100" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="180" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LESSER APE — Hylobatidae</text>
      <text x="180" y="94" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">gibbon — small, brachiating,</text>
      <text x="180" y="112" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">monogamous pairs</text>

      <rect x="340" y="50" width="280" height="100" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="480" y="72" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GREAT APES — Hominidae</text>
      <text x="480" y="94" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">orangutan, gorilla, chimpanzee —</text>
      <text x="480" y="112" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">large, and with humans</text>

      <text x="16" y="180" fontSize="8.4" className="fill-current text-muted-foreground">Apes: no tail, semi-erect, arms longer than legs, brachiation, simple tool use in the wild.</text>
    </svg>
  );
}
