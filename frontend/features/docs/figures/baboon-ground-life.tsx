/** Baboon ground life — terrestrial Old World monkey. Well-detailed. Theme-aware. */
export function BaboonGroundLife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Baboon ground life terrestrial Old World monkey troops savanna dog-like face foraging omnivore contrast arboreal New World">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Baboon — the Old World monkey that left the trees</text>
      {/* baboon profile */}
      <ellipse cx="200" cy="150" rx="90" ry="48" className="fill-current text-stone-500/25" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <circle cx="286" cy="128" r="26" className="fill-current text-stone-500/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <path d="M310 122 q16 4 12 14 q-6 8 -18 4" className="fill-current text-stone-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <circle cx="292" cy="122" r="2.2" className="fill-current text-foreground" />
      <path d="M130 196 l-8 44 M270 196 l10 42" className="stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(120 113 108 / 0.7)" }} />
      <text x="200" y="264" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">dog-like long muzzle — hence 'dog-headed' baboons</text>
      {/* facts */}
      <rect x="380" y="44" width="310" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="535" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GROUND LIFE, OLD WORLD STYLE</text>
      {[
        "troops of dozens — safety in numbers",
        "forage on the ground for hours daily",
        "omnivorous: fruit, seeds, insects, small prey",
        "ischial callosities and cheek pouches present",
        "savanna and rocky hills, not canopy",
        "contrast: New World monkeys stay arboreal",
      ].map((t, i) => (
        <text key={t} x="396" y={92 + i * 24} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Ground-living monkeys face big-cat predation — the troop, not the tree, is their defence.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: baboon = Old World, terrestrial, troop-living — three descriptors in one line.</text>
    </svg>
  );
}
