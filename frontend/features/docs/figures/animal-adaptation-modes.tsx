/**
 * Animal adaptations across habitats — aquatic, terrestrial (cursorial,
 * fossorial, arboreal, desert) with examples. Theme-aware.
 */
export function AnimalAdaptationModes({ className }: { className?: string }) {
  const panel = (x: number, y: number, c: string, title: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="300" height="86" rx="10" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 12} y={y + 22} fontSize="10.5" className="fill-current text-foreground" fontWeight="800">{title}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 12} y={y + 40 + i * 15} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Animal adaptation modes aquatic primary and secondary terrestrial cursorial fossorial arboreal and desert with examples">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Animal adaptations — by habitat and lifestyle</text>

      {panel(16, 50, "rgb(14 165 233 / 0.9)", "AQUATIC (primary — fish, whale)", [
        "streamlined body, fins/flippers, lateral line",
        "gills (fish) or blowhole (whale)",
        "swim bladder / blubber for buoyancy",
      ], "a")}
      {panel(340, 50, "rgb(217 119 6 / 0.9)", "CURSORIAL (runners — horse, deer)", [
        "long limbs, reduced digits, hoof",
        "light skeleton, powerful muscles",
        "eyes on the side — wide warning view",
      ], "c")}
      {panel(16, 152, "rgb(120 113 108 / 0.9)", "FOSSORIAL (burrowers — rat, earthworm)", [
        "cylindrical body, reduced eyes",
        "strong claws / burrowing snout",
        "moist skin (earthworm) or thick fur",
      ], "f")}
      {panel(340, 152, "rgb(22 163 74 / 0.9)", "ARBOREAL (climbers — monkey, squirrel)", [
        "grasping hands & prehensile tail",
        "stereoscopic vision judges leaps",
        "claws / adhesive pads for grip",
      ], "r")}
      {panel(16, 254, "rgb(239 68 68 / 0.9)", "DESERT (camel, fennec)", [
        "water conservation: concentrated urine, dry dung",
        "fat stored in hump — not insulation everywhere",
        "long legs keep body off hot sand; nocturnal habits",
      ], "d")}

      <text x="340" y="278" fontSize="9.5" className="fill-current text-muted-foreground">Secondary aquatic animals (whale, seal) are mammals that returned to water — lungs, not gills.</text>
      <text x="16" y="296" fontSize="0">.</text>
    </svg>
  );
}
