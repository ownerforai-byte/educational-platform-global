/** Position of man in animal kingdom — classification ladder. Theme-aware. */
export function ManClassificationLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Position of man in animal kingdom classification kingdom Animalia phylum Chordata class Mammalia order Primates family Hominidae genus species Homo sapiens">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where does man sit in the animal kingdom?</text>
      {[
        { y: 56, t: "Kingdom", v: "Animalia" },
        { y: 90, t: "Phylum", v: "Chordata" },
        { y: 124, t: "Class", v: "Mammalia — hair, mammary glands, diaphragm, three ear ossicles" },
        { y: 158, t: "Order", v: "Primates — opposable thumb, stereoscopic vision, nails, flexible limbs" },
        { y: 192, t: "Family", v: "Hominidae — great apes + humans: upright posture, large brain" },
        { y: 226, t: "Genus/Species", v: "Homo sapiens" },
      ].map((r) => (
        <g key={r.t}>
          <text x="30" y={r.y} fontSize="8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="140" y={r.y} fontSize="7.4" className="fill-current text-muted-foreground" fontStyle="italic">{r.v}</text>
        </g>
      ))}
    </svg>
  );
}
