/** Kidney dialysis machine — the artificial kidney loop. Well-detailed. Theme-aware. */
export function KidneyDialysisMachine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Kidney dialysis machine artificial kidney haemodialysis dialyser semipermeable membrane diffusion blood pump dialysate counter current exchange urea removal arteriovenous fistula hours sessions per week peritoneal alternative transplant option">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dialysis — the artificial kidney, loop by loop</text>
      {/* circuit */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE CIRCUIT</text>
      {/* patient */}
      <rect x="60" y="110" width="50" height="80" rx="10" className="fill-current text-slate-500/15" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="85" y="155" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">patient</text>
      {/* dialyser */}
      <rect x="180" y="110" width="90" height="80" rx="10" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="225" y="140" fontSize="6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">dialyser</text>
      <text x="225" y="156" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">semipermeable</text>
      <text x="225" y="170" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">membrane</text>
      {/* arrows */}
      <path d="M112 130 h64 m-8 -5 l8 5 l-8 5" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <path d="M272 170 h-64 m8 -5 l-8 5 l8 5" className="fill-none stroke-current" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="225" y="100" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">dialysate flows counter-current, pulling urea across</text>
      <text x="195" y="216" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">access via a surgically widened vein (fistula) in the arm — the lifeline</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FACTS</text>
      {[
        "sessions: ~4 hours, three times",
        "  a week, for life — or until",
        "  transplant",
        "waste removed: urea, creatinine,",
        "  excess potassium and water",
        "works by diffusion down the",
        "  concentration gradient — no",
        "  pumping of the blood's own",
        "  pressure across the membrane",
        "peritoneal dialysis uses the",
        "  belly lining as the membrane —",
        "  home-based alternative",
        "Nepal: dialysis is subsidised,",
        "  but transplants remain the",
        "  better long-term option",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: dialysis = diffusion across a semipermeable membrane, counter-current flow, 3 sessions/week.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Dialysis replaces filtration, not hormones — transplant replaces the whole organ's jobs.</text>
    </svg>
  );
}
