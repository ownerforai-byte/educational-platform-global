/** The four grand trends of human evolution. Theme-aware. */
export function FourGrandTrends({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Four grand trends of human evolution posture quadrupedal to bipedal hands knuckle support to precision grip brain and face 450 to 1400 cc culture none to civilisation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The four grand trends (the exam's conceptual core)</text>
      {[
        { y: 58, t: "1. POSTURE", s: "quadrupedal → habitual bipedal → fully erect striding (S-spine, bowl pelvis, arched foot)" },
        { y: 96, t: "2. HANDS", s: "knuckle support → free precision grip → tool manufacture" },
        { y: 134, t: "3. BRAIN AND FACE", s: "~450 cc → ~1400 cc; prognathous muzzle → flat face, chin, parabolic dental arch" },
        { y: 172, t: "4. CULTURE", s: "none → tools → fire → language → art → agriculture → civilisation (cumulative)" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8.2" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="180" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <rect x="24" y="192" width="612" height="36" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="40" y="216" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Feedback loop: bipedalism freed hands → tools → intelligence → better tools and language → bigger brains.</text>
    </svg>
  );
}
