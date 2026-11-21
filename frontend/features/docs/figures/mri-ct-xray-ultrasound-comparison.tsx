/** MRI CT X-ray ultrasound comparison — seeing inside. Well-detailed. Theme-aware. */
export function MriCtXrayUltrasoundComparison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="MRI CT X-ray ultrasound comparison imaging modalities ionising radiation vs magnetic resonance vs sound waves best uses bone fracture soft tissue brain pregnancy safe foetus cost availability Nepal district hospitals contrast agents choice of scan">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Seeing inside — four scans, four physics</text>
      {/* four modalities */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["X-ray", "ionising rays pass through; bone blocks — fractures, chest", "fast, cheap, small dose", 130],
        ["CT", "X-rays rotated + computer reconstruction — cross-sections", "detail, higher dose", 300],
        ["MRI", "magnetic fields + radio waves; no ionising radiation", "soft tissue, brain, spine", 470],
        ["Ultrasound", "high-frequency sound echoes — real-time images", "pregnancy, safe, portable", 620],
      ].map(([name, how, best, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="66" width="156" height="120" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="88" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="108" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(how as string).slice(0, 32)}</text>
          <text x={x as number} y="122" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(how as string).slice(32, 64)}</text>
          <text x={x as number} y="142" fontSize="5.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">{best as string}</text>
          <text x={x as number} y="172" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{["radiation: yes", "radiation: yes", "radiation: no", "radiation: no"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the choice is clinical: broken arm → X-ray; stroke → CT; spinal cord or pregnancy → MRI/ultrasound</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The radiation rule: X-ray and CT use ionising radiation — MRI and ultrasound do not; pregnancy favours the radiation-free pair.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Access gap: CT and MRI concentrate in cities — district hospitals rely on X-ray and ultrasound; portability is closing the gap.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match modality to physics and to use — one line each is the full-mark pattern.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Ultrasound's real-time view let medicine watch a beating heart — and a foetus — without a single ray.</text>
    </svg>
  );
}
