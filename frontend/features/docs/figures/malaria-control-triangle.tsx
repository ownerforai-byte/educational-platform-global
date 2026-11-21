/** Malaria control triangle — parasite, vector, host: the three attack lines. Theme-aware. */
export function MalariaControlTriangle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Malaria control triangle attacking the parasite with drugs the vector with mosquito control and the host with protection and awareness">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Fighting malaria — attack all three corners</text>

      {/* triangle */}
      <polygon points="330,70 130,220 530,220" fill="none" strokeWidth="3" strokeDasharray="8 4" className="stroke-current text-muted-foreground" />

      {/* parasite corner */}
      <rect x="230" y="50" width="200" height="60" rx="10" className="fill-current text-violet-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
      <text x="330" y="72" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PARASITE (Plasmodium)</text>
      <text x="330" y="90" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">drugs: chloroquine, artemisinin; treat cases fast</text>

      {/* vector corner */}
      <rect x="30" y="200" width="200" height="60" rx="10" className="fill-current text-emerald-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="130" y="222" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VECTOR (Anopheles)</text>
      <text x="130" y="240" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">drain breeding water, larvivorous fish, DDT/ITN nets</text>

      {/* host corner */}
      <rect x="430" y="200" width="200" height="60" rx="10" className="fill-current text-sky-500/12" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="222" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOST (human)</text>
      <text x="530" y="240" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">bed nets, repellents, screens, early diagnosis (RDT/smear)</text>

      <text x="16" y="276" fontSize="10" className="fill-current text-muted-foreground">Break any corner and transmission fails — but resistance (drug-resistant parasites, insecticide-resistant mosquitoes) forces integrated management.</text>
    </svg>
  );
}
