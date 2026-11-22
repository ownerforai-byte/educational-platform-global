# Generates figure components for chemistry rows 79-81 (21 figures).
import os
OUT = "frontend/features/docs/figures"

def wrap(name, alt, body):
    return (
        "// " + name.replace("Panel", "") + " figure. Theme-aware.\n"
        "export function " + name + "({ className }: { className?: string }) {\n"
        "  return (\n"
        '    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="' + alt + '">\n'
        + body +
        "    </svg>\n"
        "  );\n"
        "}\n"
    )

FILES = {}

# ---------------- cx79: metallurgy ----------------

FILES["metallurgy-three-routes.tsx"] = wrap("MetallurgyThreeRoutes",
 "Three branches of metallurgy hydrometallurgy pyrometallurgy and electrometallurgy with example equations",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Metallurgy — three routes to the metal</text>
      {[
        ["HYDRO", "aqueous chemistry", "2Au + 4CN⁻ + O₂ + 2H₂O →", "2[Au(CN)₂]⁻ + 4OH⁻", "rgb(59 130 246)", 30],
        ["PYRO", "heat + coke", "Fe₂O₃ + 3CO → 2Fe + 3CO₂", "blast furnace, 1500 °C", "rgb(239 68 68)", 250],
        ["ELECTRO", "molten salt + current", "2NaCl(l) → 2Na + Cl₂", "Downs cell, 600 °C", "rgb(16 185 129)", 470],
      ].map(([tag, sub, eq1, eq2, col, x]) => (
        <g key={tag as string}>
          <rect x={x as number} y="50" width="180" height="120" rx="10" fill="none" stroke={col as string} strokeWidth="2" />
          <text x={(x as number) + 90} y="76" fontSize="14" fontWeight="800" textAnchor="middle" fill={col as string}>{tag as string}</text>
          <text x={(x as number) + 90} y="94" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{sub as string}</text>
          <text x={(x as number) + 90} y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{eq1 as string}</text>
          <text x={(x as number) + 90} y="140" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{eq2 as string}</text>
          <text x={(x as number) + 90} y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Au · Ag · Cu</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Route chosen by height in the activity series: top → electrolysis, middle → coke, bottom → leaching</text>
""")

FILES["activity-series-routing.tsx"] = wrap("ActivitySeriesRouting",
 "Activity series ladder routing each metal to its extraction route",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One ladder, three doors</text>
      {["Na", "K", "Ca", "Mg", "Al", "Zn", "Fe", "Pb", "Cu", "Ag", "Au"].map((m, i) => (
        <g key={m}>
          <text x="60" y={48 + i * 16} fontSize="11" fontWeight="700" className="fill-current text-foreground">{m}</text>
          <rect x="90" y={38 + i * 16} width="120" height="12" rx="3" fill="rgb(59 130 246)" opacity={i < 5 ? 0.75 : 0.15} />
        </g>
      ))}
      <rect x="230" y="40" width="180" height="76" rx="8" fill="rgb(16 185 129)" opacity="0.12" />
      <text x="320" y="62" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Electrometallurgy</text>
      <text x="320" y="80" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">molten-salt electrolysis</text>
      <text x="320" y="96" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na · Mg · Ca · Al</text>
      <rect x="230" y="120" width="180" height="56" rx="8" fill="rgb(239 68 68)" opacity="0.12" />
      <text x="320" y="142" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Pyrometallurgy</text>
      <text x="320" y="160" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">coke / CO reduction: Zn Fe Pb Cu</text>
      <rect x="230" y="180" width="180" height="52" rx="8" fill="rgb(59 130 246)" opacity="0.12" />
      <text x="320" y="200" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Hydrometallurgy</text>
      <text x="320" y="218" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">leaching + displacement: Ag Au</text>
      <text x="520" y="70" fontSize="10.5" className="fill-current text-muted-foreground">ΔG of oxide decides:</text>
      <text x="520" y="88" fontSize="10.5" className="fill-current text-muted-foreground">the more negative,</text>
      <text x="520" y="106" fontSize="10.5" className="fill-current text-muted-foreground">the harder coke must fight —</text>
      <text x="520" y="124" fontSize="10.5" className="fill-current text-muted-foreground">electrons replace coke.</text>
""")

FILES["cyanide-leaching-loop.tsx"] = wrap("CyanideLeachingLoop",
 "Cyanide leaching of gold followed by zinc displacement with both equations",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Gold by hydrometallurgy — the cyanide route</text>
      <rect x="30" y="55" width="270" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="165" y="80" fontSize="12.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">1 · LEACH</text>
      <text x="165" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2Au + 4CN⁻ + O₂ + 2H₂O →</text>
      <text x="165" y="124" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2[Au(CN)₂]⁻ + 4OH⁻</text>
      <text x="165" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dilute NaCN, air blown in; 1 g per tonne dissolves</text>
      <path d="M 305 110 L 355 110" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#cll-a)" />
      <text x="330" y="100" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">Zn</text>
      <rect x="360" y="55" width="270" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="495" y="80" fontSize="12.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">2 · DISPLACE</text>
      <text x="495" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2[Au(CN)₂]⁻ + Zn →</text>
      <text x="495" y="124" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2Au↓ + [Zn(CN)₄]²⁻</text>
      <text x="495" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">zinc shavings; gold cemented out, melted to a button</text>
      <defs>
        <marker id="cll-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Tonnes of rock in — one button of gold out</text>
""")

FILES["blast-furnace-route.tsx"] = wrap("BlastFurnaceRoute",
 "Blast furnace pyrometallurgy with in-situ carbon monoxide formation and reduction equation",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Pyrometallurgy — the blast furnace</text>
      <path d="M 200 50 L 460 50 L 430 210 L 230 210 Z" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="330" y="75" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">charge: ore + coke + limestone</text>
      <text x="330" y="115" fontSize="11" textAnchor="middle" className="fill-current text-foreground">CO₂ + C → 2CO  (in situ)</text>
      <text x="330" y="140" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Fe₂O₃ + 3CO → 2Fe + 3CO₂</text>
      <text x="330" y="165" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">CaCO₃ → CaO + CO₂ · CaO + SiO₂ → CaSiO₃ (slag)</text>
      <text x="330" y="195" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">molten iron tapped at the hearth</text>
      <text x="110" y="120" fontSize="10.5" className="fill-current text-muted-foreground">coke burns,</text>
      <text x="110" y="138" fontSize="10.5" className="fill-current text-muted-foreground">CO is born,</text>
      <text x="110" y="156" fontSize="10.5" className="fill-current text-muted-foreground">CO steals the</text>
      <text x="110" y="174" fontSize="10.5" className="fill-current text-muted-foreground">oxygen.</text>
      <text x="545" y="120" fontSize="10.5" className="fill-current text-muted-foreground">limestone only</text>
      <text x="545" y="138" fontSize="10.5" className="fill-current text-muted-foreground">carries the sand</text>
      <text x="545" y="156" fontSize="10.5" className="fill-current text-muted-foreground">away as slag —</text>
      <text x="545" y="174" fontSize="10.5" className="fill-current text-muted-foreground">it never reduces.</text>
""")

FILES["molten-salt-electrolysis.tsx"] = wrap("MoltenSaltElectrolysis",
 "Molten salt electrolysis cell producing sodium at cathode and chlorine at anode",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Electrometallurgy — electrons replace coke</text>
      <rect x="180" y="60" width="300" height="130" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="330" y="86" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">molten NaCl, 600 °C — no water allowed</text>
      <rect x="210" y="100" width="14" height="70" fill="rgb(59 130 246)" />
      <text x="217" y="188" fontSize="10.5" fill="rgb(59 130 246)" textAnchor="middle">cathode</text>
      <text x="255" y="112" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)">Na⁺ + e⁻ → Na</text>
      <circle cx="262" cy="140" r="7" fill="rgb(147 197 253)" stroke="rgb(59 130 246)" />
      <text x="262" y="163" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">floats up</text>
      <rect x="436" y="100" width="14" height="70" fill="rgb(16 185 129)" />
      <text x="443" y="188" fontSize="10.5" fill="rgb(16 185 129)" textAnchor="middle">anode</text>
      <text x="420" y="112" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="end">2Cl⁻ → Cl₂ + 2e⁻</text>
      <circle cx="408" cy="140" r="7" fill="rgb(110 231 183)" stroke="rgb(16 185 129)" />
      <text x="408" y="163" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">bubbles off</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Water would hydrogen-evolve first — only the molten salt lets the metal ion win</text>
""")

FILES["ore-vs-mineral-test.tsx"] = wrap("OreVsMineralTest",
 "Contrast between bauxite as a profitable ore and clay as a mineral that is not an ore",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ore = mineral + profit</text>
      <rect x="40" y="55" width="270" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="175" y="82" fontSize="13" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">BAUXITE — an ORE</text>
      <text x="175" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Al₂O₃ · 2H₂O</text>
      <text x="175" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">aluminium-rich, separable,</text>
      <text x="175" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">extraction pays → mined worldwide</text>
      <rect x="350" y="55" width="270" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="485" y="82" fontSize="13" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CLAY — a mineral, not an ore</text>
      <text x="485" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">aluminosilicate chemistry</text>
      <text x="485" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same metal, hopeless separation,</text>
      <text x="485" y="146" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">extraction loses money → not mined</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every ore is a mineral; only profitable minerals become ores</text>
""")

FILES["five-steps-of-metallurgy.tsx"] = wrap("FiveStepsOfMetallurgy",
 "Five common steps of metallurgy from crushing to refining",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The five steps every metal walks</text>
      {["1 · CRUSH", "2 · CONCENTRATE", "3 · CALCINE / ROAST", "4 · REDUCE", "5 · REFINE"].map((s, i) => (
        <g key={s}>
          <rect x={25 + i * 126} y="70" width="118" height="70" rx="8" fill={["rgb(59 130 246)", "rgb(16 185 129)", "rgb(245 158 11)", "rgb(239 68 68)", "rgb(139 92 246)"][i]} opacity="0.14" stroke={["rgb(59 130 246)", "rgb(16 185 129)", "rgb(245 158 11)", "rgb(239 68 68)", "rgb(139 92 246)"][i]} strokeWidth="1.5" />
          <text x={84 + i * 126} y="98" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{s}</text>
          <text x={84 + i * 126} y="118" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{["jaw crushers", "float / wash / magnet", "oxide form", "coke or current", "electrolysis"][i]}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Rock in at step 1 — 99.99 % pure metal out at step 5</text>
""")

# ---------------- cx80: ore, gangue, flux, slag, alloy, amalgam ----------------

FILES["ore-gangue-flux-slag-map.tsx"] = wrap("OreGangueFluxSlagMap",
 "Flow map from ore with gangue through flux addition to floating slag and purified metal",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Gangue in, slag out</text>
      <rect x="30" y="60" width="150" height="90" rx="10" fill="rgb(148 163 184)" opacity="0.2" stroke="rgb(148 163 184)" />
      <text x="105" y="88" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">ORE</text>
      <text x="105" y="108" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">wanted mineral</text>
      <text x="105" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">+ gangue (sand, clay)</text>
      <path d="M 185 105 L 240 105" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ogf-a)" />
      <rect x="245" y="60" width="150" height="90" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="320" y="88" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">+ FLUX</text>
      <text x="320" y="108" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">binds the gangue</text>
      <text x="320" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">acidic ↔ basic pairing</text>
      <path d="M 400 105 L 455 105" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#ogf-a)" />
      <rect x="460" y="60" width="170" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="545" y="88" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SLAG floats</text>
      <text x="545" y="108" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">fusible, immiscible, lighter</text>
      <text x="545" y="126" fontSize="10" textAnchor="middle" className="fill-current text-foreground">CaO + SiO₂ → CaSiO₃</text>
      <defs>
        <marker id="ogf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="195" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The flux never reduces anything — it only chemically carries the gangue away</text>
""")

FILES["flux-families-panel.tsx"] = wrap("FluxFamiliesPanel",
 "Table of acidic flux silica and basic flux limestone with the gangue each removes",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Pick the flux by the gangue</text>
      <rect x="40" y="50" width="280" height="150" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="76" fontSize="13" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ACIDIC FLUX — SiO₂</text>
      <text x="180" y="100" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">removes BASIC gangue</text>
      <text x="180" y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">(lime, metal oxides)</text>
      <text x="180" y="145" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">forms silicate slags</text>
      <text x="180" y="165" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">used in Cu, Fe extraction</text>
      <rect x="340" y="50" width="280" height="150" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="76" fontSize="13" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">BASIC FLUX — CaCO₃ / CaO</text>
      <text x="480" y="100" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">removes ACIDIC gangue</text>
      <text x="480" y="120" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">(silica, alumina)</text>
      <text x="480" y="145" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CaCO₃ → CaO + CO₂</text>
      <text x="480" y="165" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaO + SiO₂ → CaSiO₃</text>
      <text x="330" y="225" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Acid-base neutralisation at 1500 °C</text>
""")

FILES["blast-furnace-slag-layer.tsx"] = wrap("BlastFurnaceSlagLayer",
 "Furnace hearth cross section with lighter slag floating above molten metal",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why slag must float</text>
      <rect x="180" y="55" width="300" height="150" rx="10" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <rect x="184" y="60" width="292" height="55" fill="rgb(148 163 184)" opacity="0.35" />
      <text x="330" y="82" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">SLAG — CaSiO₃ (lighter)</text>
      <text x="330" y="100" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">drawn off first · shields metal from air</text>
      <rect x="184" y="118" width="292" height="82" fill="rgb(239 68 68)" opacity="0.25" />
      <text x="330" y="150" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">MOLTEN METAL (denser)</text>
      <text x="330" y="172" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">tapped from below the slag line</text>
      <text x="80" y="130" fontSize="10.5" className="fill-current text-muted-foreground">immiscible,</text>
      <text x="80" y="148" fontSize="10.5" className="fill-current text-muted-foreground">low-melting,</text>
      <text x="80" y="166" fontSize="10.5" className="fill-current text-muted-foreground">floats —</text>
      <text x="80" y="184" fontSize="10.5" className="fill-current text-muted-foreground">or the furnace chokes</text>
      <text x="560" y="130" fontSize="10.5" className="fill-current text-muted-foreground">ground slag is</text>
      <text x="560" y="148" fontSize="10.5" className="fill-current text-muted-foreground">cement and</text>
      <text x="560" y="166" fontSize="10.5" className="fill-current text-muted-foreground">slag wool —</text>
      <text x="560" y="184" fontSize="10.5" className="fill-current text-muted-foreground">waste no more</text>
""")

FILES["alloy-composition-table.tsx"] = wrap("AlloyCompositionTable",
 "Composition and use table for brass bronze stainless steel and solder",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Alloys — composition is the answer</text>
      <line x1="40" y1="52" x2="620" y2="52" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["ALLOY", "COMPOSITION", "WHY / USE"],
        ["Brass", "Cu + Zn (60–90 % Cu)", "gold-like, machinable — instruments, fittings"],
        ["Bronze", "Cu + Sn (~88 : 12)", "hard, corrosion-proof — statues, bells"],
        ["Stainless steel", "Fe + Cr (≥10.5 %) + Ni, C", "passive Cr₂O₃ film — cutlery, plant"],
        ["Solder", "Pb + Sn", "low melting — joins wires"]].map((row, i) => (
        <g key={i}>
          <text x="45" y={74 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "700" : "800"} className="fill-current text-foreground">{row[0]}</text>
          <text x="180" y={74 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "400" : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[1]}</text>
          <text x="380" y={74 + i * 34} fontSize={i ? "10.5" : "10.5"} className={i ? "fill-current text-muted-foreground" : "fill-current text-muted-foreground"}>{row[2]}</text>
          <line x1="40" y1={82 + i * 34} x2="620" y2={82 + i * 34} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
""")

FILES["amalgam-panel.tsx"] = wrap("AmalgamPanel",
 "Amalgam panel showing sodium amalgam dental amalgam and the iron exception",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Amalgam — the mercury alloys</text>
      <rect x="30" y="55" width="190" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="125" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Na–Hg</text>
      <text x="125" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">sodium tamed by dilution</text>
      <text x="125" y="122" fontSize="10" textAnchor="middle" className="fill-current text-foreground">Na–Hg + H₂O →</text>
      <text x="125" y="140" fontSize="10" textAnchor="middle" className="fill-current text-foreground">NaOH + Hg + ½H₂</text>
      <text x="125" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Hg recovered</text>
      <rect x="235" y="55" width="190" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="330" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Ag–Sn–Hg</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dental amalgam</text>
      <text x="330" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">sets in the tooth,</text>
      <text x="330" y="144" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">wears for decades</text>
      <rect x="440" y="55" width="190" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="535" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Fe — the exception</text>
      <text x="535" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">iron wets not, dissolves not</text>
      <text x="535" y="126" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">→ mercury ships in</text>
      <text x="535" y="144" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">iron flasks</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">An amalgam is an alloy in which one component is mercury</text>
""")

FILES["alloy-why-better.tsx"] = wrap("AlloyWhyBetter",
 "Pure metal layers slipping versus alloy atoms pinning the lattice",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why alloys beat pure metals</text>
      <rect x="40" y="55" width="270" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="175" y="78" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">PURE METAL</text>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3, 4, 5].map((c) => (
            <circle key={c} cx={75 + c * 36} cy={100 + r * 24} r="6" fill="rgb(148 163 184)" />
          ))}
        </g>
      ))}
      <path d="M 60 112 L 290 112" stroke="rgb(239 68 68)" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#awb-a)" />
      <text x="175" y="165" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">planes slip — soft, bends</text>
      <rect x="350" y="55" width="270" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="485" y="78" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ALLOY</text>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3, 4, 5].map((c) => (
            (r + c) % 3 === 0
              ? <rect key={c} x={385 + c * 36 - 6} y={100 + r * 24 - 6} width="12" height="12" fill="rgb(245 158 11)" />
              : <circle key={c} cx={385 + c * 36} cy={100 + r * 24} r="6" fill="rgb(148 163 184)" />
          ))}
        </g>
      ))}
      <text x="485" y="165" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">different atoms pin the planes — hard</text>
      <defs>
        <marker id="awb-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Plus the Cr₂O₃ passive film on stainless — chemistry added to mechanics</text>
""")

FILES["limestone-journey.tsx"] = wrap("LimestoneJourney",
 "Equation chain of limestone decomposing to lime and capturing silica as slag",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The limestone journey</text>
      <rect x="30" y="65" width="180" height="80" rx="10" fill="rgb(148 163 184)" opacity="0.15" stroke="rgb(148 163 184)" />
      <text x="120" y="95" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CaCO₃ (limestone)</text>
      <text x="120" y="118" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">rides down the furnace</text>
      <path d="M 215 105 L 265 105" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#lj-a)" />
      <text x="240" y="95" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">heat</text>
      <rect x="270" y="65" width="150" height="80" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="345" y="95" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CaO + CO₂↑</text>
      <text x="345" y="118" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the basic flux is born</text>
      <path d="M 425 105 L 475 105" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#lj-a)" />
      <text x="450" y="95" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">+ SiO₂</text>
      <rect x="480" y="65" width="150" height="80" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="555" y="95" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CaSiO₃ (slag)</text>
      <text x="555" y="118" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">floats off, drawn away</text>
      <defs>
        <marker id="lj-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="185" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">~0.25 t of limestone per tonne of iron — not for the iron, for the sand</text>
""")

# ---------------- cx81: extraction ----------------

FILES["concentration-three-ways.tsx"] = wrap("ConcentrationThreeWays",
 "Three ore concentration methods gravity washing magnetic separation and froth flotation",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Concentration — three ways to lose the gangue</text>
      {[
        ["GRAVITY / WASH", "water carries the light gangue away", "oxides, gold", "rgb(59 130 246)", 30],
        ["MAGNETIC", "magnet belt lifts Fe₃O₄ from silica", "magnetite ores", "rgb(239 68 68)", 250],
        ["FROTH FLOTATION", "oil-wetted sulphides ride bubbles", "ZnS PbS CuFeS₂", "rgb(16 185 129)", 470],
      ].map(([tag, how, ores, col, x]) => (
        <g key={tag as string}>
          <rect x={x as number} y="55" width="180" height="115" rx="10" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 90} y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{tag as string}</text>
          <text x={(x as number) + 90} y="104" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{how as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="10" textAnchor="middle" className="fill-current text-foreground">{ores as string}</text>
        </g>
      ))}
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Concentrate first — the furnace should melt metal, not sand</text>
""")

FILES["froth-flotation-cell.tsx"] = wrap("FrothFlotationCell",
 "Froth flotation tank with sulphide particles carried up by oil-coated bubbles and gangue sinking",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Froth flotation — surface chemistry sorts the powder</text>
      <rect x="200" y="55" width="260" height="145" rx="12" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="78" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">water + pine oil + powdered ore</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={240 + i * 45} cy={170 - (i % 3) * 22} r="9" fill="none" stroke="rgb(16 185 129)" strokeWidth="1.5" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={250 + i * 60} y={118 - i * 8} width="9" height="9" fill="rgb(245 158 11)" />
      ))}
      <text x="410" y="125" fontSize="9.5" fill="rgb(245 158 11)">sulphide rides the froth ↑</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={230 + i * 55} y={185} width="10" height="10" fill="rgb(148 163 184)" />
      ))}
      <text x="330" y="212" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">water-wetted silica sinks ↓</text>
      <text x="90" y="120" fontSize="10.5" className="fill-current text-muted-foreground">air blown</text>
      <text x="90" y="138" fontSize="10.5" className="fill-current text-muted-foreground">from below;</text>
      <text x="90" y="156" fontSize="10.5" className="fill-current text-muted-foreground">froth skimmed</text>
      <text x="540" y="120" fontSize="10.5" className="fill-current text-muted-foreground">works for</text>
      <text x="540" y="138" fontSize="10.5" className="fill-current text-muted-foreground">ZnS, PbS,</text>
      <text x="540" y="156" fontSize="10.5" className="fill-current text-muted-foreground">CuFeS₂ only</text>
""")

FILES["calcination-vs-roasting.tsx"] = wrap("CalcinationVsRoasting",
 "Side by side comparison of calcination without air and roasting in excess air",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Calcination vs roasting — the air is the difference</text>
      <rect x="30" y="50" width="290" height="140" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="175" y="76" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CALCINATION</text>
      <text x="175" y="96" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">NO air (or limited)</text>
      <text x="175" y="120" fontSize="11" textAnchor="middle" className="fill-current text-foreground">carbonates, hydrates</text>
      <text x="175" y="142" fontSize="11" textAnchor="middle" className="fill-current text-foreground">ZnCO₃ → ZnO + CO₂↑</text>
      <text x="175" y="162" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Al₂O₃·2H₂O → Al₂O₃ + 2H₂O</text>
      <rect x="340" y="50" width="290" height="140" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="485" y="76" fontSize="13" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ROASTING</text>
      <text x="485" y="96" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">EXCESS air, below mp</text>
      <text x="485" y="120" fontSize="11" textAnchor="middle" className="fill-current text-foreground">sulphides</text>
      <text x="485" y="142" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2ZnS + 3O₂ → 2ZnO + 2SO₂↑</text>
      <text x="485" y="162" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">oxidation; As, Sb volatilise off</text>
      <text x="330" y="220" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Both deliver the same product: a porous oxide ready for reduction</text>
""")

FILES["carbon-reduction-furnace.tsx"] = wrap("CarbonReductionFurnace",
 "Carbon reduction smelter with coke converting oxide to metal through carbon monoxide",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbon reduction — coke does the chemistry</text>
      <rect x="220" y="55" width="220" height="130" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="330" y="80" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">roasted oxide + coke, 1000–1500 °C</text>
      <text x="330" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">C + O₂ → CO₂ · CO₂ + C → 2CO</text>
      <text x="330" y="132" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">ZnO + C → Zn + CO</text>
      <text x="330" y="156" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Fe₂O₃ + 3CO → 2Fe + 3CO₂</text>
      <text x="330" y="178" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn distils out at 907 °C — self-refining</text>
      <text x="80" y="120" fontSize="10.5" className="fill-current text-muted-foreground">CO is made</text>
      <text x="80" y="138" fontSize="10.5" className="fill-current text-muted-foreground">inside the</text>
      <text x="80" y="156" fontSize="10.5" className="fill-current text-muted-foreground">furnace —</text>
      <text x="80" y="174" fontSize="10.5" className="fill-current text-muted-foreground">no delivery needed</text>
      <text x="545" y="120" fontSize="10.5" className="fill-current text-muted-foreground">works for</text>
      <text x="545" y="138" fontSize="10.5" className="fill-current text-muted-foreground">Zn Fe Pb Cu;</text>
      <text x="545" y="156" fontSize="10.5" className="fill-current text-muted-foreground">fails for Na Mg Al</text>
""")

FILES["thermite-reaction.tsx"] = wrap("ThermiteReaction",
 "Thermite reaction of aluminium with iron oxide welding a railway rail",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Thermite — 2Al + Fe₂O₃ → Al₂O₃ + 2Fe</text>
      <rect x="230" y="50" width="200" height="60" rx="8" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="330" y="72" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">crucible: Al powder + Fe₂O₃</text>
      <text x="330" y="92" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">Mg fuse ignites it</text>
      <path d="M 300 112 C 300 150, 260 160, 230 175" stroke="rgb(239 68 68)" strokeWidth="4" fill="none" opacity="0.85" />
      <rect x="120" y="175" width="240" height="22" rx="4" fill="rgb(148 163 184)" opacity="0.4" />
      <rect x="215" y="168" width="50" height="14" fill="rgb(239 68 68)" opacity="0.8" />
      <text x="240" y="212" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">molten iron pours into the rail gap</text>
      <text x="520" y="90" fontSize="10.5" className="fill-current text-muted-foreground">ΔH ≈ −850 kJ —</text>
      <text x="520" y="108" fontSize="10.5" className="fill-current text-muted-foreground">self-heated past</text>
      <text x="520" y="126" fontSize="10.5" className="fill-current text-muted-foreground">1538 °C;</text>
      <text x="520" y="144" fontSize="10.5" className="fill-current text-muted-foreground">also the proof Al</text>
      <text x="520" y="162" fontSize="10.5" className="fill-current text-muted-foreground">loves O more than Fe</text>
""")

FILES["hall-heroult-cell.tsx"] = wrap("HallHeroultCell",
 "Hall Heroult electrolytic cell for aluminium with cryolite melt carbon lining and anodes",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Hall–Héroult — aluminium from cryolite</text>
      <rect x="150" y="60" width="360" height="120" rx="8" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" strokeWidth="2" />
      <rect x="154" y="150" width="352" height="26" fill="rgb(59 130 246)" opacity="0.6" />
      <text x="330" y="168" fontSize="9.5" fill="rgb(255 255 255)" textAnchor="middle">molten Al layer — tapped from here (cathode = carbon lining)</text>
      <text x="330" y="82" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Al₂O₃ 2–5 % in molten cryolite Na₃AlF₆ + CaF₂, ~950 °C</text>
      {[250, 330, 410].map((x) => (
        <rect key={x} x={x - 8} y="90" width="16" height="52" fill="rgb(56 56 56)" stroke="rgb(148 163 184)" />
      ))}
      <text x="330" y="112" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">carbon anodes — burn away: C + O₂ → CO₂</text>
      <text x="330" y="198" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">cathode: Al³⁺ + 3e⁻ → Al · anode: 2O²⁻ → O₂ + 4e⁻ · overall 2Al₂O₃ → 4Al + 3O₂</text>
      <text x="80" y="120" fontSize="10.5" className="fill-current text-muted-foreground">cryolite drops</text>
      <text x="80" y="138" fontSize="10.5" className="fill-current text-muted-foreground">2050 °C to 950 °C</text>
      <text x="80" y="156" fontSize="10.5" className="fill-current text-muted-foreground">and boosts</text>
      <text x="80" y="174" fontSize="10.5" className="fill-current text-muted-foreground">conductivity</text>
""")

FILES["reduction-method-map.tsx"] = wrap("ReductionMethodMap",
 "Table matching metals to their reduction method with the reason",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Which reductant for which metal?</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["METAL", "REDUCTANT", "WHY"],
        ["Fe Zn Pb Cu", "C / CO (furnace)", "oxide reducible at furnace temperature"],
        ["Cr Mn", "Al — thermite", "coke gives carbides; Al is the stronger lover of O"],
        ["Na K Mg Ca", "electrolysis of molten salt", "ΔG too negative for carbon to ever win"],
        ["Al", "electrolysis in cryolite", "2000 °C needed + Al₄C₃ forms with coke"]].map((row, i) => (
        <g key={i}>
          <text x="45" y={72 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "700" : "800"} className="fill-current text-foreground">{row[0]}</text>
          <text x="185" y={72 + i * 34} fontSize={i ? "11" : "10.5"} fontWeight={i ? "400" : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[1]}</text>
          <text x="360" y={72 + i * 34} fontSize="10" className="fill-current text-muted-foreground">{row[2]}</text>
          <line x1="40" y1={80 + i * 34} x2="620" y2={80 + i * 34} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
