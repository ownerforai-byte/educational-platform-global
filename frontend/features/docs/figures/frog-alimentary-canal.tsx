/** Frog alimentary canal — buccal cavity to cloaca with glands. Theme-aware. */
export function FrogAlimentaryCanal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog alimentary canal from buccal cavity through oesophagus stomach small intestine large intestine cloaca with liver gall bladder and pancreas">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Frog alimentary canal — short and simple</text>

      {[
        { x: 40, w: 90, c: "rgb(14 165 233 / 0.9)", t: "buccal cavity" },
        { x: 140, w: 60, c: "rgb(20 184 166 / 0.9)", t: "oesophagus" },
        { x: 210, w: 90, c: "rgb(249 115 22 / 0.9)", t: "stomach" },
        { x: 310, w: 150, c: "rgb(22 163 74 / 0.9)", t: "small intestine (duodenum + ileum)" },
        { x: 470, w: 70, c: "rgb(120 113 108 / 0.9)", t: "large intestine" },
        { x: 550, w: 60, c: "rgb(124 58 237 / 0.9)", t: "cloaca" },
      ].map((s) => (
        <rect key={s.t} x={s.x} y="90" width={s.w} height="36" rx="10" style={{ color: s.c }} className="fill-current opacity-15" strokeWidth="2.5" stroke="currentColor" />
      ))}

      {/* liver + pancreas */}
      <ellipse cx="250" cy="170" rx="50" ry="20" className="fill-current text-rose-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="250" y="206" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">liver (3 lobes) + gall bladder → bile (no enzymes, emulsifies)</text>
      <ellipse cx="380" cy="170" rx="40" ry="14" className="fill-current text-amber-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="380" y="206" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">pancreas → amylase, lipase, trypsin</text>

      {[
        { x: 85, y: 150, t: "teeth: maxillary + vomerine — grip prey, don't chew" },
        { x: 85, y: 166, t: "tongue: forked, sticky, flipped forward to catch insects" },
        { x: 255, y: 150, t: "stomach: HCl + pepsin; digestion of protein starts here" },
        { x: 385, y: 150, t: "ileum: main absorption; internal folds raise surface" },
        { x: 505, y: 150, t: "cloaca: urinary + genital + digestive exit in one" },
      ].map((l) => (
        <text key={l.t} x={l.x} y={l.y} fontSize="8" className="fill-current text-muted-foreground">• {l.t}</text>
      ))}

      <text x="16" y="236" fontSize="10" className="fill-current text-muted-foreground">Carnivore's canal: short (because protein digests fast), no caecum to speak of — herbivore lengths come from cellulose, which frogs never eat.</text>
    </svg>
  );
}
