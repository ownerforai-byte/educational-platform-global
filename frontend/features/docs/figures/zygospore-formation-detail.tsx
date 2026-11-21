/** Zygospore formation detail — conjugation close-up. Well-detailed. Theme-aware. */
export function ZygosporeFormationDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Zygospore formation detail plus and minus strains hyphae touch progametangia suspensors gametangia fuse plasmogamy karyogamy thick walled zygospore with warty surface meiosis on germination">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Conjugation close-up — how a zygospore forms</text>

      {/* plus strain */}
      <text x="60" y="70" fontSize="8.4" className="fill-current text-emerald-600" fontWeight="800">+ strain</text>
      <path d="M40 90 q60 -20 120 0 q40 14 80 6" className="fill-none stroke-current text-emerald-600" strokeWidth="3.5" />
      {/* minus strain */}
      <text x="60" y="240" fontSize="8.4" className="fill-current text-sky-600" fontWeight="800">− strain</text>
      <path d="M40 210 q60 20 120 0 q40 -14 80 -6" className="fill-none stroke-current text-sky-600" strokeWidth="3.5" />

      {/* progametangia + suspensors */}
      <path d="M240 96 q10 30 0 60" className="fill-none stroke-current text-emerald-600" strokeWidth="3" />
      <path d="M240 204 q10 -30 0 -60" className="fill-none stroke-current text-sky-600" strokeWidth="3" />
      <text x="270" y="90" fontSize="6.8" className="fill-current text-muted-foreground">suspensor cells anchor each hypha</text>

      {/* gametangia */}
      <rect x="228" y="136" width="24" height="28" rx="6" className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <rect x="228" y="166" width="24" height="28" rx="6" className="fill-current text-sky-600/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="300" y="152" fontSize="6.8" className="fill-current text-muted-foreground">gametangia touch → walls dissolve</text>

      {/* zygospore */}
      <circle cx="330" cy="165" r="26" className="fill-current text-amber-500/30" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      {[[315, 150], [345, 155], [320, 180], [345, 178]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" className="fill-current text-amber-700" />
      ))}
      <text x="380" y="160" fontSize="7.6" className="fill-current text-amber-600" fontWeight="800">thick warty zygospore (2n)</text>
      <text x="380" y="178" fontSize="7" className="fill-current text-muted-foreground">survives drying, heat, starvation</text>

      {/* steps */}
      <rect x="470" y="44" width="220" height="240" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="490" y="66" fontSize="8.2" className="fill-current text-foreground" fontWeight="800">SEQUENCE</text>
      {[
        "1. + and − hyphae grow close",
        "2. progametangia + suspensors form",
        "3. gametangia pinch off",
        "4. walls fuse — plasmogamy",
        "5. nuclei fuse — karyogamy",
        "6. zygospore matures (2n)",
        "7. on germination: meiosis,",
        "   new sporangium, haploid spores",
      ].map((t, i) => (
        <text key={t} x="490" y={90 + i * 24} fontSize="7" className="fill-current text-muted-foreground">{t}</text>
      ))}
    </svg>
  );
}
