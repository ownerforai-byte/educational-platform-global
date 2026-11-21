/** Snakebite first aid protocol — the dos and fatal don'ts. Well-detailed. Theme-aware. */
export function SnakebiteFirstAidProtocol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Snakebite first aid protocol dos don'ts immobilise limb below heart level remove rings watch tourniquet never cut suck ice application hospital antivenom time critical pit viper cobra krait identification photo if safe Nepal Terai monsoon night bites farm workers rubber boots torch empty 20 minute pressurised immobilisation technique">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Snakebite — the first-aid protocol that saves limbs</text>
      {/* dos */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DO</text>
      {[
        "keep the victim calm and still —",
        "  movement pumps venom",
        "immobilise the bitten limb below",
        "  heart level, like a fracture",
        "remove rings, watches, tight",
        "  clothing before swelling",
        "get to a hospital with antivenom",
        "  fast — the clock is the enemy",
        "photograph the snake from a",
        "  safe distance if possible —",
        "  never chase it",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* don'ts */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DON'T</text>
      {[
        "no tourniquets — they concentrate",
        "  venom and destroy tissue",
        "no cutting, sucking or 'traditional",
        "  incisions' — infection and",
        "  worse outcomes",
        "no ice, no electric shocks, no",
        "  herbal pastes on the wound",
        "no delay for traditional healers",
        "  — antivenom is the only",
        "  proven treatment",
        "empty fang marks can still mean",
        "  envenomation — dry bites are",
        "  not safety",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: immobilise below heart level + no tourniquet/cutting/sucking + antivenom fast — the three-part answer.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Most Nepali bites happen at night in the monsoon — a torch and boots are bite prevention.</text>
    </svg>
  );
}
