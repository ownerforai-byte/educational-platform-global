/** Volant flight adaptations — the flying body plan. Well-detailed. Theme-aware. */
export function VolantFlightAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Volant flight adaptations hollow pneumatic bones fused keeled sternum air sacs feathers wing shape weight reduction streamlining powered flight gliding birds bats">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Volant adaptations — engineering a flyer</text>
      {/* bird with labels */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FLIER'S BODY PLAN</text>
      <ellipse cx="195" cy="140" rx="70" ry="30" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M195 118 l14 -18 l14 18" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="209" y="92" fontSize="5.8" textAnchor="middle" className="fill-current text-amber-600">keeled sternum: big anchor for flight muscles</text>
      <path d="M150 132 q-40 -18 -60 -4 q30 14 60 12" className="fill-current text-sky-500/25" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="105" y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-sky-600">wing = modified forelimb</text>
      <text x="195" y="182" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">hollow, air-filled (pneumatic) bones cut weight</text>
      <text x="195" y="198" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">air sacs push air through lungs twice — one breath, two exchanges</text>
      {/* checklist */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FLIGHT'S FOUR DEMANDS</text>
      {[
        "LIFT — wing surface shaped as",
        "  an aerofoil; feathers fine-tune it",
        "POWER — huge pectoral muscles",
        "  on a keeled sternum",
        "LIGHTNESS — pneumatic bones,",
        "  no teeth, no bladder, one ovary",
        "STEERING — tail feathers and",
        "  rapid wing-angle control",
        "bats solve it differently: a",
        "  membrane wing, no feathers",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: volant = flight — list one item per demand (lift, power, lightness, steering) and the mark is yours.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Flight is the most expensive lifestyle in biology — every gram is audited.</text>
    </svg>
  );
}
