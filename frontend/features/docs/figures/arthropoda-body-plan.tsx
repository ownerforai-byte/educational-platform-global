/** Arthropoda body plan — exoskeleton, jointed appendages, open circulation. Theme-aware. */
export function ArthropodaBodyPlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Arthropod body plan showing chitinous exoskeleton jointed legs compound eye open circulatory system and book gills or tracheae">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Arthropoda — the armour plan (largest phylum)</text>

      {/* insect */}
      <g>
        <ellipse cx="150" cy="130" rx="60" ry="34" className="fill-current text-amber-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <circle cx="86" cy="124" r="18" className="fill-current text-amber-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
        <circle cx="80" cy="118" r="6" className="fill-current text-slate-500/60" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(100 116 139 / 0.9)" }} />
        <g className="stroke-current text-amber-700" strokeWidth="2.5">
          <line x1="120" y1="158" x2="104" y2="196" /><line x1="146" y1="160" x2="142" y2="198" /><line x1="172" y1="156" x2="182" y2="196" />
          <path d="M196 116 q50 -26 84 -6" fill="none" /><path d="M196 132 q50 20 84 10" fill="none" />
        </g>
        <text x="150" y="222" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">compound eye · jointed legs · wings</text>
      </g>

      {/* features list */}
      {[
        { y: 70, t: "chitinous exoskeleton — armour + leverage; must be MOULTED (ecdysis) to grow" },
        { y: 100, t: "jointed appendages ('arthro-poda' = jointed feet) — legs, antennae, mouthparts" },
        { y: 130, t: "OPEN circulation — haemocoel, heart pumps haemolymph loosely around organs" },
        { y: 160, t: "breathing: tracheae (insects), book lungs (arachnids), book gills (king crab)" },
        { y: 190, t: "sexes separate; metamorphosis (larva → adult) in many groups" },
      ].map((l) => (
        <text key={l.y} x="290" y={l.y} fontSize="9" className="fill-current text-muted-foreground">• {l.t}</text>
      ))}

      <text x="290" y="222" fontSize="9" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">Classes: Insecta (6 legs), Crustacea, Arachnida, Myriapoda</text>
      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Why so many species? The exoskeleton allows conquest of land, and flight + metamorphosis let larvae and adults avoid competing for the same food.</text>
    </svg>
  );
}
