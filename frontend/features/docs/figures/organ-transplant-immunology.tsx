/** Organ transplant immunology — the rejection problem. Well-detailed. Theme-aware. */
export function OrganTransplantImmunology({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Organ transplant immunology rejection HLA matching major histocompatibility complex donor recipient T cells immunosuppressive drugs cyclosporin tissue typing kidney liver cornea graft tolerance blood group matching Nepal transplant program">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Transplants — convincing the immune system to look away</text>
      {/* matching */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE MATCHING GAME</text>
      {[
        "the immune system reads HLA",
        "  (human leukocyte antigen)",
        "  tags on every cell",
        "foreign HLA = 'non-self' —",
        "  T cells attack the graft",
        "matching: blood group + as many",
        "  HLA markers as possible",
        "siblings are the best bets —",
        "  they share half their HLA set",
        "cornea and some grafts escape:",
        "  the eye is immune-privileged",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* immunosuppression */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TRADE-OFF OF SUPPRESSION</text>
      {[
        "cyclosporin and friends calm",
        "  T cells — rejection risk falls",
        "but the shield drops: infections",
        "  and some cancers rise",
        "lifelong adherence: a skipped",
        "  course can cost the organ",
        "xenotransplantation (pig organs",
        "  edited for compatibility) is",
        "  the frontier answer to the",
        "  donor shortage",
        "Nepal performs kidney transplants",
        "  — living related donors lead",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: rejection is HLA mismatch + T-cell attack; the answer is matching + immunosuppression — both halves needed.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Immunosuppression is a bargain: accept infection risk to escape rejection — there is no free option.</text>
    </svg>
  );
}
