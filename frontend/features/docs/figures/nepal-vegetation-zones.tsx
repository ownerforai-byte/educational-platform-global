/** Vegetation zones of Nepal by altitude. Theme-aware. */
export function NepalVegetationZones({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Vegetation zones of Nepal by altitude tropical sal below 1000 m subtropical chir pine 1000 to 2000 m temperate oak fir rhododendron 2000 to 3000 m subalpine birch juniper 3000 to 4000 m alpine meadows 4000 to 5000 m nival lichens above 5000 m">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal — the vertical garden</text>
      {[
        { y: 216, t: "TROPICAL (below ~1000 m)", s: "sal (Shorea robusta), sissoo, khair, simal; Terai grasslands" },
        { y: 182, t: "SUBTROPICAL (~1000–2000 m)", s: "chir pine (Pinus roxburghii), chilaune, katus, alder" },
        { y: 148, t: "TEMPERATE (~2000–3000 m)", s: "oak (Quercus), blue pine, fir, hemlock, lali gurans, deodar" },
        { y: 114, t: "SUBALPINE (~3000–4000 m)", s: "birch (bhojpatra), fir, juniper, rhododendron shrubs" },
        { y: 80, t: "ALPINE (~4000–5000 m)", s: "Kobresia meadows (bugyals), Primula, Gentiana, cushion plants" },
        { y: 46, t: "NIVAL (above ~5000 m)", s: "snowline — no true vegetation; crustose lichens, mosses" },
      ].map((z) => (
        <g key={z.t}>
          <rect x="30" y={z.y - 16} width="600" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x="42" y={z.y + 4} fontSize="7.6" className="fill-current text-foreground" fontWeight="800">{z.t}</text>
          <text x="280" y={z.y + 4} fontSize="7" className="fill-current text-muted-foreground">{z.s}</text>
        </g>
      ))}
    </svg>
  );
}
