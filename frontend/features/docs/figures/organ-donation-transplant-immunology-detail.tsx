/** Organ donation transplant immunology — the matching problem. Well-detailed. Theme-aware. */
export function OrganDonationTransplantImmunologyDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Organ donation transplant immunology matching problem HLA tissue typing blood group cross match rejection hyperacute acute chronic immune system recognises foreign immunosuppressant drugs calcineurin inhibitors ciclosporin tacrolimus infection cancer trade off lifelong living donor deceased donor brain death kidney liver cornea waiting list organ trafficking black market India Nepal transplant act regulation opt in consent">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Transplants — the matching problem and its price</text>
      {/* immunology */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE IMMUNOLOGY</text>
      {[
        "the immune system reads HLA",
        "  molecules like fingerprints —",
        "  a mismatched organ is an",
        "  intruder",
        "rejection: hyperacute (minutes,",
        "  pre-existing antibodies), acute",
        "  (weeks, T cells), chronic",
        "  (months-years, vessels narrow)",
        "the price of protection:",
        "  immunosuppressants blunt the",
        "  immune system — infection and",
        "  cancer risk rise in trade",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* donation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DONATION SIDE</text>
      {[
        "living donors: one kidney, part",
        "  of a liver — the donor survives",
        "  on the remainder",
        "deceased donors: brain death",
        "  criteria make the gift possible",
        "the shortage: waiting lists",
        "  outstrip organs everywhere —",
        "  and trafficking fills the gap",
        "  unethically",
        "Nepal's law regulates donation",
        "  (no commerce); kidney villages",
        "  in the Terai show what the",
        "  black market costs",
        "exam hook: HLA matching + three",
        "  rejection types + the",
        "  immunosuppression trade-off",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: HLA mismatch → rejection; immunosuppression → infection risk — the trade-off is the transplant story in one line.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Every successful transplant is a negotiated truce — the immune system bribed, not defeated.</text>
    </svg>
  );
}
