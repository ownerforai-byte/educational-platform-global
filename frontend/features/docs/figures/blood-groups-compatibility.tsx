/** Blood groups transfusion compatibility — who can give to whom. Well-detailed. Theme-aware. */
export function BloodGroupsCompatibility({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Blood groups transfusion compatibility ABO Rh factor universal donor O negative universal recipient AB positive antigen antibody agglutination reaction table can give can receive matching cross match Nepal distribution frequency">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Blood groups — the give-and-receive matrix</text>
      {/* matrix */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="60" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CAN DONATE TO → (rows = donor, columns = recipient)</text>
      {["O", "A", "B", "AB"].map((col, i) => (
        <text key={col} x={150 + i * 130} y="82" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{col}</text>
      ))}
      {[
        ["O", [1, 1, 1, 1], "universal donor"],
        ["A", [0, 1, 0, 1], ""],
        ["B", [0, 0, 1, 1], ""],
        ["AB", [0, 0, 0, 1], "universal recipient"],
      ].map(([donor, cells, note], r) => (
        <g key={donor as string}>
          <text x="60" y={108 + (r as number) * 26} fontSize="7" className="fill-current text-foreground" fontWeight="800">{donor as string}</text>
          {(cells as number[]).map((ok, c) => (
            <rect key={c} x={120 + c * 130} y={94 + (r as number) * 26} width="60" height="18" rx="4" className="fill-current" style={{ color: ok ? "rgb(16 185 129 / 0.4)" : "rgb(244 63 94 / 0.25)" }} stroke="currentColor" strokeWidth="0.8" />
          ))}
          {note ? <text x="660" y={108 + (r as number) * 26} fontSize="5.6" textAnchor="end" className="fill-current text-emerald-600" fontWeight="700">{note as string}</text> : null}
        </g>
      ))}
      <text x="360" y="212" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">rule: donor's antigens must find no matching antibodies in the recipient — O has none to give, AB has none to object</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Rh adds a second axis: Rh− recipients must not receive Rh+ blood; the danger peaks in pregnancy (haemolytic disease of the newborn).</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: O− = universal donor, AB+ = universal recipient — and say WHY (no antigens vs no antibodies).</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Agglutination is the visible proof of mismatch — clumped blood, failed transfusion.</text>
    </svg>
  );
}
