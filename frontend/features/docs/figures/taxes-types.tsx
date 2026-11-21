/** Taxes types — photo, chemo, thigmo, geotaxis. Theme-aware. */
export function TaxesTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Four types of taxes phototaxis chemotaxis thigmotaxis geotaxis with directional movement toward or away from stimulus and examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Taxes — moving WITH purpose (directional)</text>

      {[
        { x: 100, t: "PHOTOTAXIS", s: "toward/away from light", s2: "earthworm: negative —", s3: "crawls away from light", c: "rgb(245 158 11 / 0.9)" },
        { x: 280, t: "CHEMOTAXIS", s: "toward/away from chemicals", s2: "bacteria swim toward", s3: "a nutrient source", c: "rgb(22 163 74 / 0.9)" },
        { x: 460, t: "THIGMOTAXIS", s: "response to touch", s2: "animals hug surfaces,", s3: "walls and crevices", c: "rgb(14 165 233 / 0.9)" },
        { x: 610, t: "GEOTAXIS", s: "response to gravity", s2: "earthworms: positive —", s3: "burrow downward", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 78} y="56" width="150" height="120" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="80" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="100" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="122" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
          <text x={n.x} y="138" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s3}</text>
        </g>
      ))}

      <text x="16" y="206" fontSize="9.5" className="fill-current text-muted-foreground">Key word: ORIENTATION. The animal steers toward (+) or away (−) from the stimulus — movement with a heading, not a wander.</text>
      <text x="16" y="226" fontSize="9.5" className="fill-current text-muted-foreground">Contrast with kinesis: random, non-directional movement whose rate simply rises with stimulus strength.</text>
    </svg>
  );
}
