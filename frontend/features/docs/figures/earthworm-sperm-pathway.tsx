/** Earthworm sperm pathway — testis to seminal vesicle to vasa deferentia to male pore. Theme-aware. */
export function EarthwormSpermPathway({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Earthworm sperm pathway from testes to seminal vesicles for maturation through vasa deferentia with prostate glands to male genital pores on segment eighteen">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sperm's journey out</text>

      {[
        { x: 70, t: "TESTES", s: "segments 10–11\nmake spermatozoa", c: "rgb(245 158 11 / 0.9)" },
        { x: 230, t: "SEMINAL VESICLES", s: "segments 11–12\nsperm mature + store", c: "rgb(14 165 233 / 0.9)" },
        { x: 390, t: "VASA DEFERENTIA", s: "two tubes carry\nsperm backward", c: "rgb(16 185 129 / 0.9)" },
        { x: 550, t: "MALE PORES", s: "segment 18\n(prostate adds fluid)", c: "rgb(124 58 237 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 62} y="80" width="124" height="70" rx="12" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="104" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="122" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s.split('\n')[0]}</text>
          <text x={n.x} y="136" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{n.s.split('\n')[1]}</text>
          {i < 3 && <line x1={n.x + 64} y1="115" x2={n.x + 94} y2="115" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      <text x="16" y="180" fontSize="10" className="fill-current text-muted-foreground">During copulation the sperm is injected into the PARTNER's spermathecae (segments 6–9), stored there until the cocoon is formed.</text>
      <text x="16" y="200" fontSize="10" className="fill-current text-muted-foreground">Prostate glands (segments 17–19) add nourishing fluid that activates the sperm just before release.</text>
      <text x="16" y="226" fontSize="9" className="fill-current text-muted-foreground">Sequence to memorise: testes → seminal vesicles → vasa deferentia → prostate → male pore (18).</text>
    </svg>
  );
}
