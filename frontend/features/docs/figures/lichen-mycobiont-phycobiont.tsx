/** Mycobiont + phycobiont roles with nitrogen fixation and reindeer moss. Well-detailed. Theme-aware. */
export function LichenMycobiontPhycobiont({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mycobiont phycobiont roles lichen cyanobacteria nitrogen fixation reindeer moss Cladonia arctic food web tundra ecology">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mycobiont & phycobiont — deep dive</text>

      {/* partner split */}
      <rect x="30" y="44" width="330" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="195" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MYCOBIONT = the fungus</text>
      {[
        "always the 'house' — builds thallus",
        "usually an ascomycete",
        "decides the lichen's shape & name",
        "absorbs water + minerals",
        "gives algae the sheltered slot",
      ].map((t, i) => (
        <text key={t} x="48" y={88 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="390" y="44" width="300" height="150" rx="12" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="540" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PHYCOBIONT = the alga</text>
      {[
        "green alga or cyanobacterium",
        "the 'kitchen' — photosynthesis",
        "cyanobacteria also fix nitrogen",
        "lives in a controlled hyphal nest",
        "leaches sugars to the fungus",
      ].map((t, i) => (
        <text key={t} x="406" y={88 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* arctic ecology card */}
      <rect x="30" y="210" width="400" height="76" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="230" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Reindeer moss (Cladonia) — arctic lifeline</text>
      <text x="50" y="248" fontSize="7.4" className="fill-current text-muted-foreground">• reindeer dig through snow to graze it all winter</text>
      <text x="50" y="264" fontSize="7.4" className="fill-current text-muted-foreground">• grows only ~3–5 mm a year — grazed patches take decades</text>
      <text x="50" y="280" fontSize="7.4" className="fill-current text-muted-foreground">• base of the tundra food web</text>

      {/* nitrogen card */}
      <rect x="450" y="210" width="240" height="76" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="470" y="230" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Nitrogen fixation</text>
      <text x="470" y="248" fontSize="7.4" className="fill-current text-muted-foreground">• cyanobacterial partners fix N₂</text>
      <text x="470" y="264" fontSize="7.4" className="fill-current text-muted-foreground">• enriches bare rock → first soil</text>
      <text x="470" y="280" fontSize="7.4" className="fill-current text-muted-foreground">• kick-starts whole succession</text>
    </svg>
  );
}
