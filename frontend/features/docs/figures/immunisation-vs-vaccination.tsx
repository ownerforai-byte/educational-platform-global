/** Immunisation vs vaccination terms — sorting the vocabulary. Well-detailed. Theme-aware. */
export function ImmunisationVsVaccination({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Immunisation versus vaccination terms distinction vaccine immunisation active passive natural artificial immunity herd immunity definitions comparison inoculation Edward Jenner cowpox smallpox history terminology">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Vaccination vs immunisation — sorting the vocabulary</text>
      {/* contrast */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE TWO TERMS</text>
      {[
        "vaccination = giving the vaccine",
        "  (the act — an injection or drop)",
        "immunisation = becoming protected",
        "  (the outcome — immunity gained)",
        "you can vaccinate without",
        "  immunising: a failed dose or a",
        "  cold chain break",
        "immunity can also come without",
        "  vaccines: natural infection",
        "  (at a cost) or maternal",
        "  antibodies",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* four quadrants */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOUR ROUTES TO IMMUNITY</text>
      {[
        ["Natural active", "infection then recovery — measles, chickenpox"],
        ["Artificial active", "vaccine trains the body — MMR, BCG"],
        ["Natural passive", "antibodies via placenta and milk — a baby's first shield"],
        ["Artificial passive", "injected antibodies — tetanus antitoxin, antivenom"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 34} fontSize="6.6" className="fill-current text-emerald-600" fontWeight="800">{k}</text>
          <text x="406" y={110 + i * 34} fontSize="6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="540" y="238" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">active = your own antibodies, slow but lasting;</text>
      <text x="540" y="252" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">passive = borrowed antibodies, instant but temporary</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: vaccination is the act; immunisation is the result. Active = lasting, passive = borrowed.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Jenner's 1796 cowpox experiment launched it all — 'vaccine' from vacca, the cow.</text>
    </svg>
  );
}
