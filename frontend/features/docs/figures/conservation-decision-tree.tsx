/** Conservation decision tree — which method for which case. Well-detailed. Theme-aware. */
export function ConservationDecisionTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Conservation decision tree in-situ versus ex-situ which method when habitat intact species critical breeding program seed storage flowchart">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Which conservation, when? A decision map</text>

      <rect x="250" y="44" width="220" height="40" rx="10" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="69" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Species needs saving</text>
      <line x1="360" y1="84" x2="360" y2="104" className="stroke-current text-stone-500" strokeWidth="2" markerEnd="url(#arrhl)" />
      <rect x="230" y="108" width="260" height="40" rx="10" className="fill-current text-amber-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="133" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Is its habitat still intact?</text>
      <line x1="290" y1="148" x2="180" y2="188" className="stroke-current text-emerald-600" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <line x1="430" y1="148" x2="540" y2="188" className="stroke-current text-rose-500" strokeWidth="2.2" style={{ color: "rgb(244 63 94 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="230" y="172" fontSize="7.4" className="fill-current text-emerald-600" fontWeight="700">YES</text>
      <text x="470" y="172" fontSize="7.4" className="fill-current text-rose-500" fontWeight="700">NO / too few left</text>

      <rect x="60" y="192" width="240" height="72" rx="10" className="fill-current text-emerald-500/15" strokeWidth="2.2" stroke="currentColor" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="180" y="214" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">IN-SITU</text>
      {["national park / reserve / cons. area", "protect habitat + anti-poaching", "evolution continues naturally"].map((t, i) => (
        <text key={t} x="76" y={232 + i * 14} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="420" y="192" width="240" height="72" rx="10" className="fill-current text-rose-500/15" strokeWidth="2.2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="214" fontSize="8.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EX-SITU</text>
      {["zoo / botanical garden / seed bank", "breed and store, then reintroduce", "last resort for the nearly lost"].map((t, i) => (
        <text key={t} x="436" y={232 + i * 14} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="274" width="660" height="18" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="287" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: habitat intact → in-situ first; habitat gone or population critical → ex-situ, then return.</text>
    </svg>
  );
}
