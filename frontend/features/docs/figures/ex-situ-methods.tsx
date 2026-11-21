/** Ex-situ conservation methods with Nepali examples. Theme-aware. */
export function ExSituMethods({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 270" className={className} role="img" aria-label="Ex-situ conservation methods botanical gardens Godawari zoos Central Zoo Jawalakhel seed banks Khumaltar genebank Svalbard tissue culture orchids cryopreservation liquid nitrogen captive breeding gharial">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ex-situ conservation — protecting species outside their habitat</text>
      {[
        { y: 56, t: "BOTANICAL GARDENS", s: "living labelled collections — National Botanical Garden, Godawari (Lalitpur)" },
        { y: 92, t: "ZOOS", s: "living populations + breeding — Central Zoo, Jawalakhel" },
        { y: 128, t: "SEED BANKS", s: "dormant seeds at low temp/humidity — Genebank, Khumaltar; Svalbard (global model)" },
        { y: 164, t: "TISSUE / ORGAN CULTURE", s: "cells and meristems in vitro — orchid and endangered-plant propagation" },
        { y: 200, t: "CRYOPRESERVATION", s: "seeds, pollen, embryos at −196 °C (liquid nitrogen) — long-term genes" },
        { y: 236, t: "CAPTIVE BREEDING", s: "breeding endangered animals in captivity for release" },
      ].map((s) => (
        <g key={s.t}>
          <text x="30" y={s.y} fontSize="8" className="fill-current text-foreground" fontWeight="800">{s.t}</text>
          <text x="230" y={s.y} fontSize="7.2" className="fill-current text-muted-foreground">{s.s}</text>
        </g>
      ))}
      <text x="16" y="260" fontSize="8" className="fill-current text-muted-foreground">Best for critically endangered species and crop wild relatives — but evolution is effectively paused.</text>
    </svg>
  );
}
