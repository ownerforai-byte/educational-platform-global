# Generates figure components for chemistry rows 88-90 (21 figures).
import os
OUT = "frontend/features/docs/figures"

def wrap(name, alt, body):
    return (
        "// " + name + " figure. Theme-aware.\n"
        "export function " + name + "({ className }: { className?: string }) {\n"
        "  return (\n"
        '    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="' + alt + '">\n'
        + body +
        "    </svg>\n"
        "  );\n"
        "}\n"
    )

FILES = {}

# ---------------- cx88: Ca/Mg compounds ----------------

FILES["quick-lime-cycle.tsx"] = wrap("QuickLimeCycle",
 "Lime cycle from limestone through quick lime and slaked lime back to limestone",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The lime cycle</text>
      <rect x="60" y="60" width="160" height="60" rx="10" fill="rgb(148 163 184)" opacity="0.18" stroke="rgb(148 163 184)" />
      <text x="140" y="86" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CaCO₃ limestone</text>
      <text x="140" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">chalk · marble · shell</text>
      <path d="M 225 90 L 290 90" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#qlc-a)" />
      <text x="258" y="80" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">~1000 °C</text>
      <rect x="295" y="60" width="160" height="60" rx="10" fill="rgb(245 158 11)" opacity="0.14" stroke="rgb(245 158 11)" />
      <text x="375" y="86" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CaO quick lime</text>
      <text x="375" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CaCO₃ → CaO + CO₂↑</text>
      <path d="M 460 90 L 520 90" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#qlc-a)" />
      <text x="490" y="80" fontSize="9" textAnchor="middle" fill="rgb(59 130 246)">+ H₂O</text>
      <rect x="440" y="150" width="180" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="530" y="176" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Ca(OH)₂ slaked lime</text>
      <text x="530" y="196" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">exothermic — lump cracks</text>
      <path d="M 440 180 C 300 200, 180 180, 140 125" stroke="rgb(16 185 129)" strokeWidth="2" fill="none" strokeDasharray="5 4" markerEnd="url(#qlc-a)" />
      <text x="255" y="205" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">+ CO₂ slowly → back to CaCO₃ (mortar sets)</text>
      <defs>
        <marker id="qlc-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["bleaching-powder-prep.tsx"] = wrap("BleachingPowderPrep",
 "Hasenclever plant preparing bleaching powder from slaked lime and chlorine",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Bleaching powder — Ca(OH)₂ + Cl₂</text>
      <rect x="120" y="60" width="420" height="70" rx="10" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="330" y="82" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">HASUNCLEVER PLANT — rotating drums</text>
      <text x="330" y="102" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">slaked lime tumbles; dry Cl₂ fed counter-current from below</text>
      <path d="M 120 118 C 200 140, 460 140, 540 118" stroke="rgb(16 185 129)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#bpp-a)" />
      <text x="330" y="148" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">Cl₂ rises against the falling lime</text>
      <rect x="200" y="160" width="260" height="40" rx="8" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="330" y="178" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Ca(OH)₂ + Cl₂ → Ca(OCl)Cl + H₂O</text>
      <text x="330" y="194" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">calcium oxychloride — bleaching powder</text>
      <defs>
        <marker id="bpp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="222" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Store dry and sealed — air CO₂ + moisture slowly decompose it</text>
""")

FILES["available-chlorine-panel.tsx"] = wrap("AvailableChlorinePanel",
 "Available chlorine of bleaching powder and the hypochlorous acid bleaching mechanism",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Available chlorine — and the true bleach</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">AVAILABLE CHLORINE 35–38 %</text>
      <text x="180" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Ca(OCl)Cl + H₂SO₄ →</text>
      <text x="180" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaSO₄ + H₂O + Cl₂↑</text>
      <text x="180" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">% of its mass liberated as Cl₂</text>
      <text x="180" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">— the quality test</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">THE BLEACHING AGENT</text>
      <text x="480" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Cl₂ + H₂O → HCl + HOCl</text>
      <text x="480" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">HOCl → HCl + [O]</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">nascent oxygen oxidises the stain</text>
      <text x="480" y="170" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">never on wool/silk — HOCl eats protein</text>
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The chlorine is the carrier; the oxygen does the bleaching</text>
""")

FILES["plaster-setting-panel.tsx"] = wrap("PlasterSettingPanel",
 "Plaster of Paris preparation at 120 degrees and setting by rehydration",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Plaster of Paris — a 120 °C recipe</text>
      <rect x="40" y="60" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="84" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">MAKE: gypsum at ~120 °C</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">above ~200 °C → dead-burnt anhydrite</text>
      <text x="180" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">(no channels — never sets again)</text>
      <rect x="340" y="60" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="84" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">SET: add water</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">interlocking gypsum needles grow</text>
      <text x="480" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">sets 10–15 min, expands slightly → sharp moulds</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The hemihydrate is a sponge for water — that is the whole trick</text>
""")

FILES["magnesia-panel.tsx"] = wrap("MagnesiaPanel",
 "Magnesia preparation from magnesite and its refractory and antacid uses",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Magnesia — MgO</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">MAKE</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">MgCO₃ → MgO + CO₂ (magnesite)</text>
      <text x="180" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">MgCl₂ + Ca(OH)₂ → Mg(OH)₂↓ + CaCl₂</text>
      <text x="180" y="150" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Mg(OH)₂ → MgO + H₂O</text>
      <text x="180" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">two routes, same white refractory powder</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">USE — mp ~2850 °C</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">basic refractory lining of steel furnaces</text>
      <text x="480" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">milk of magnesia — Mg(OH)₂ suspension</text>
      <text x="480" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">antacid: mild because insoluble</text>
      <text x="480" y="170" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Sorel cement: MgO + MgCl₂ paste</text>
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">A suspension, not a solution — its mildness is its insolubility</text>
""")

FILES["epsom-salt-panel.tsx"] = wrap("EpsomSaltPanel",
 "Epsom salt magnesium sulphate heptahydrate properties and uses",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Epsom salt — MgSO₄·7H₂O</text>
      <rect x="60" y="60" width="240" height="115" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">WHAT IT IS</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">colourless needles, 7 waters</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">very soluble, bitter taste</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">effloresces slowly in air</text>
      <rect x="360" y="60" width="240" height="115" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">WHERE IT WORKS</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">purgative in medicine</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Mg + S fertiliser for crops</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">bath soaks; dyeing flocculant</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Named for Epsom, England — where the bitter spring water made it famous</text>
""")

FILES["five-compounds-table.tsx"] = wrap("FiveCompoundsTable",
 "Formula and use table for quick lime bleaching powder plaster of Paris magnesia and Epsom salt",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Five compounds, five formulae, five jobs</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["COMPOUND", "FORMULA", "USE"],
        ["Quick lime", "CaO", "cement, flux, carbide"],
        ["Bleaching powder", "Ca(OCl)Cl", "bleach cotton/linen, disinfect"],
        ["Plaster of Paris", "CaSO₄·½H₂O", "casts, moulds, dentistry"],
        ["Magnesia", "MgO", "refractory lining, antacid"],
        ["Epsom salt", "MgSO₄·7H₂O", "purgative, Mg–S fertiliser"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + [0, 200, 390][c]} y={72 + i * 28} fontSize={i ? "11" : "10.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 28} x2="620" y2={80 + i * 28} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Write the formula exactly — CaSO₄·½H₂O is a hemihydrate, not a hydrate</text>
""")

# ---------------- cx89: solubility ----------------

FILES["two-energies-balance.tsx"] = wrap("TwoEnergiesBalance",
 "Balance of lattice energy and hydration energy controlling solubility",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Solubility = a two-bill balance</text>
      <rect x="40" y="60" width="280" height="115" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">LATTICE ENERGY — the cost</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">endothermic: tear the crystal apart</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">falls only slightly down the group</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">rate depends on anion size</text>
      <rect x="340" y="60" width="280" height="115" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">HYDRATION ENERGY — the pay</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">exothermic: water hugs the ion</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">falls FAST down the group</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(M²⁺ grows: Be²⁺ 31 → Ba²⁺ 135 pm)</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Whoever falls faster decides the ladder direction — and the anion decides that</text>
""")

FILES["hydroxide-ladder.tsx"] = wrap("HydroxideLadder",
 "Rising solubility ladder of alkaline earth hydroxides",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Hydroxides — the rising ladder</text>
      {[
        ["Be(OH)₂", "insoluble, AMPHOTERIC", 0.08, "rgb(148 163 184)"],
        ["Mg(OH)₂", "sparingly (milk of magnesia)", 0.2, "rgb(59 130 246)"],
        ["Ca(OH)₂", "1.7 g/L — lime water", 0.42, "rgb(245 158 11)"],
        ["Sr(OH)₂", "more", 0.65, "rgb(234 88 12)"],
        ["Ba(OH)₂", "~56 g/L — baryta water", 0.9, "rgb(16 185 129)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={58 + i * 28} fontSize="11" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="170" y={46 + i * 28} width={(w as number) * 320} height="15" rx="4" fill={col as string} opacity="0.6" />
          <text x={180 + (w as number) * 320} y={59 + i * 28} fontSize="9" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Small OH⁻: lattice collapses faster than hydration — dissolution gets easier downward</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" fill="rgb(139 92 246)">Basicity climbs the same ladder: Be(OH)₂ amphoteric → Ba(OH)₂ strongly basic</text>
""")

FILES["sulphate-ladder-detail.tsx"] = wrap("SulphateLadderDetail",
 "Detailed sulphate solubility ladder with solubility product of barium sulphate",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sulphates — the collapsing ladder</text>
      {[
        ["MgSO₄", "soluble", 0.9, "rgb(16 185 129)"],
        ["CaSO₄", "sparingly (gypsum)", 0.4, "rgb(245 158 11)"],
        ["SrSO₄", "very sparingly", 0.15, "rgb(239 68 68)"],
        ["BaSO₄", "2.4 mg/L · Ksp ≈ 10⁻¹⁰", 0.05, "rgb(59 130 246)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={60 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="160" y={48 + i * 34} width={(w as number) * 320} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={170 + (w as number) * 320} y={61 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Large SO₄²⁻ keeps the lattice high while hydration income shrinks — free energy turns positive</text>
      <text x="330" y="214" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">One drop of BaCl₂ precipitates essentially every sulphate ion</text>
""")

FILES["carbonate-ladder.tsx"] = wrap("CarbonateLadder",
 "Falling solubility ladder of alkaline earth carbonates",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbonates — sinking gently</text>
      {[
        ["MgCO₃", "most soluble of the four (magnesite)", 0.75, "rgb(16 185 129)"],
        ["CaCO₃", "sparingly — limestone, scale", 0.4, "rgb(245 158 11)"],
        ["SrCO₃", "less", 0.2, "rgb(234 88 12)"],
        ["BaCO₃", "practically insoluble", 0.08, "rgb(239 68 68)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={62 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="170" y={50 + i * 34} width={(w as number) * 320} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={180 + (w as number) * 320} y={63 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same large-anion logic as sulphates — and the same falling stability ladder follows (next topic)</text>
""")

FILES["anion-size-rule.tsx"] = wrap("AnionSizeRule",
 "Rule relating anion size to the direction of the solubility trend",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One rule to memorise: anion size decides</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SMALL ANION (OH⁻)</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">lattice falls FASTER than hydration</text>
      <text x="180" y="134" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">solubility INCREASES ↓</text>
      <text x="180" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Be(OH)₂ → Ba(OH)₂</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">LARGE ANION (CO₃²⁻, SO₄²⁻)</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">lattice falls SLOWER than hydration</text>
      <text x="480" y="134" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">solubility DECREASES ↓</text>
      <text x="480" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">MgCO₃ → BaCO₃ · MgSO₄ → BaSO₄</text>
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Hydration falls at a fixed rate; the anion sets the lattice rate — direction follows</text>
""")

FILES["baso4-test-panel.tsx"] = wrap("Baso4TestPanel",
 "Barium chloride test for sulphate ions and barium meal X-ray use",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">BaSO₄ — the test and the meal</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">THE TEST</text>
      <text x="180" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Ba²⁺ + SO₄²⁻ → BaSO₄↓</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dense white ppt, insoluble in acid</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Ksp ≈ 10⁻¹⁰ — quantitative</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">THE BARIUM MEAL</text>
      <text x="480" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">insoluble → unabsorbed → safe</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">outlines the gut in X-ray white</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">Ba²⁺ absorbed would be toxic</text>
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Insolubility is the safety — the same ladder that makes the test makes the meal</text>
""")

FILES["hydration-energies-chart.tsx"] = wrap("HydrationEnergiesChart",
 "Hydration enthalpy of divalent cations falling from beryllium to barium",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The engine: hydration energy falls fast</text>
      {[
        ["Be²⁺", "−2494", 0.95, "31 pm"],
        ["Mg²⁺", "−1922", 0.75, "65 pm"],
        ["Ca²⁺", "−1577", 0.6, "99 pm"],
        ["Sr²⁺", "−1443", 0.5, "113 pm"],
        ["Ba²⁺", "−1305", 0.42, "135 pm"],
      ].map(([ion, v, w, r], i) => (
        <g key={ion as string}>
          <text x="55" y={58 + i * 28} fontSize="11" fontWeight="700" className="fill-current text-foreground">{ion as string}</text>
          <rect x="120" y={46 + i * 28} width={(w as number) * 330} height="15" rx="4" fill="rgb(59 130 246)" opacity="0.55" />
          <text x={130 + (w as number) * 330} y={59 + i * 28} fontSize="9.5" fill="rgb(59 130 246)">{v as string} kJ/mol</text>
          <text x="590" y={59 + i * 28} fontSize="9" textAnchor="end" className="fill-current text-muted-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Small ion, big thirst: Be²⁺ holds water twice as tightly as Ba²⁺</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">This falling income is what the three ladders are paid from</text>
""")

# ---------------- cx90: thermal stability ----------------

FILES["carbonate-decomp-ladder.tsx"] = wrap("CarbonateDecompLadder",
 "Decomposition temperature ladder of alkaline earth carbonates",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">MCO₃ → MO + CO₂ — the temperature ladder</text>
      {[
        ["BeCO₃", "below 100 °C", 0.06, "rgb(148 163 184)"],
        ["MgCO₃", "~350 °C", 0.24, "rgb(59 130 246)"],
        ["CaCO₃", "~900 °C (lime kiln)", 0.55, "rgb(245 158 11)"],
        ["SrCO₃", "~1290 °C", 0.8, "rgb(234 88 12)"],
        ["BaCO₃", "~1360 °C", 0.92, "rgb(239 68 68)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="55" y={58 + i * 28} fontSize="11" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="130" y={46 + i * 28} width={(w as number) * 380} height="15" rx="4" fill={col as string} opacity="0.6" />
          <text x={140 + (w as number) * 380} y={59 + i * 28} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Stability increases down the group — all give the oxide plus carbon dioxide</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" fill="rgb(139 92 246)">BeCO₃ is so labile it needs a CO₂ atmosphere just to be kept</text>
""")

FILES["fajans-carbonate-polarisation.tsx"] = wrap("FajansCarbonatePolarisation",
 "Fajans polarisation of the carbonate anion by a small doubly charged cation",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Polarising power = charge ÷ size</text>
      <ellipse cx="200" cy="120" rx="90" ry="55" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" strokeDasharray="5 4" />
      <text x="200" y="115" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CO₃²⁻</text>
      <text x="200" y="135" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">big, polarisable cloud</text>
      <circle cx="330" cy="120" r="14" fill="rgb(239 68 68)" />
      <text x="330" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">M²⁺</text>
      <path d="M 316 120 C 290 105, 275 110, 262 118" stroke="rgb(239 68 68)" strokeWidth="2.5" fill="none" markerEnd="url(#fpp-a)" />
      <text x="290" y="95" fontSize="9.5" fill="rgb(239 68 68)">drags the cloud</text>
      <text x="470" y="80" fontSize="10.5" className="fill-current text-muted-foreground">one C–O bond weakens →</text>
      <text x="470" y="100" fontSize="10.5" className="fill-current text-muted-foreground">anion splits: MO + CO₂</text>
      <text x="470" y="128" fontSize="10.5" fill="rgb(16 185 129)">small M²⁺ (Be) — strong pull,</text>
      <text x="470" y="146" fontSize="10.5" fill="rgb(16 185 129)">low decomposition T</text>
      <text x="470" y="174" fontSize="10.5" fill="rgb(59 130 246)">big M²⁺ (Ba) — weak pull,</text>
      <text x="470" y="192" fontSize="10.5" fill="rgb(59 130 246)">high decomposition T</text>
      <defs>
        <marker id="fpp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
""")

FILES["nitrate-split-panel.tsx"] = wrap("NitrateSplitPanel",
 "Different decomposition products of group two nitrates on heating",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Nitrates — two product families</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="84" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Be, Mg — all the way to OXIDE</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2Mg(NO₃)₂ → 2MgO + 4NO₂↑ + O₂↑</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">brown fumes + splint-relighting gas</text>
      <text x="180" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">even the nitrite cannot survive</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="84" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Ca, Sr, Ba — stop at NITRITE</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Ba(NO₃)₂ → Ba(NO₂)₂ + O₂↑</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">only oxygen is lost</text>
      <text x="480" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">the anion framework survives</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The dividing line sits between Mg and Ca — where polarising power drops below the threshold</text>
""")

FILES["mg-no3-decomp.tsx"] = wrap("MgNo3Decomp",
 "Decomposition of magnesium nitrate with brown nitrogen dioxide and oxygen test",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Heating Mg(NO₃)₂ — read the fumes</text>
      <rect x="200" y="65" width="140" height="70" rx="10" fill="none" stroke="rgb(148 163 184)" strokeWidth="2" />
      <text x="270" y="92" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Mg(NO₃)₂</text>
      <text x="270" y="112" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">heat</text>
      <path d="M 345 90 C 420 70, 480 70, 540 85" stroke="rgb(148 57 57)" strokeWidth="5" fill="none" opacity="0.7" />
      <text x="450" y="60" fontSize="10" fill="rgb(148 57 57)" textAnchor="middle">brown fumes = NO₂</text>
      <path d="M 345 105 C 420 130, 480 135, 540 130" stroke="rgb(16 185 129)" strokeWidth="2.5" fill="none" markerEnd="url(#mnd-a)" />
      <text x="450" y="155" fontSize="10" fill="rgb(16 185 129)" textAnchor="middle">colourless gas relights a glowing splint = O₂</text>
      <text x="270" y="165" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2Mg(NO₃)₂ → 2MgO + 4NO₂ + O₂</text>
      <text x="90" y="100" fontSize="10" className="fill-current text-muted-foreground">white residue</text>
      <text x="90" y="118" fontSize="10" className="fill-current text-muted-foreground">left: MgO</text>
      <defs>
        <marker id="mnd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Two observations, two gases, one equation — quote all three</text>
""")

FILES["li-mg-diagonal.tsx"] = wrap("LiMgDiagonal",
 "Diagonal similarity of lithium and magnesium in thermal behaviour",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The Li–Mg diagonal similarity</text>
      <rect x="70" y="60" width="120" height="46" rx="8" fill="rgb(139 92 246)" opacity="0.15" stroke="rgb(139 92 246)" />
      <text x="130" y="88" fontSize="12" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">Li</text>
      <rect x="200" y="115" width="120" height="46" rx="8" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" />
      <text x="260" y="143" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Mg</text>
      <path d="M 150 105 C 190 125, 200 130, 205 135" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#lmd-a)" />
      <text x="240" y="80" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">similar charge density → similar chemistry</text>
      {[
        ["Li₂CO₃ decomposes; Na₂CO₃, K₂CO₃ never", "MgCO₃ decomposes at ~350 °C"],
        ["LiNO₃ → Li₂O + NO₂ + O₂", "Mg(NO₃)₂ → MgO + NO₂ + O₂"],
        ["LiOH → Li₂O on heating", "Mg(OH)₂ → MgO on heating"],
      ].map(([l, m], i) => (
        <g key={i}>
          <text x="70" y={195 - i * 0 + 0 + (i === 0 ? 0 : 0)} fontSize="0.1"> </text>
        </g>
      ))}
      <text x="70" y="185" fontSize="10" className="fill-current text-foreground">Li₂CO₃ → Li₂O + CO₂ · Na₂CO₃ stable to 851 °C</text>
      <text x="70" y="205" fontSize="10" className="fill-current text-muted-foreground">LiNO₃ → Li₂O + NO₂ + O₂ · NaNO₃ → NaNO₂ + ½O₂</text>
      <text x="70" y="225" fontSize="10" className="fill-current text-muted-foreground">Li behaves like Mg, not like Na — the diagonal rule in action</text>
      <defs>
        <marker id="lmd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["ia-vs-iia-carbonates.tsx"] = wrap("IaVsIiaCarbonates",
 "Comparison of thermal stability of group one and group two carbonates",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why IA carbonates shrug off heat</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">GROUP IA — M⁺</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">single charge, big radius</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">weak polariser → carbonate intact</text>
      <text x="180" y="156" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">Na₂CO₃, K₂CO₃: stable to strong heat</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">GROUP IIA — M²⁺</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">double charge, smaller radius</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">strong polariser → carbonate breaks</text>
      <text x="480" y="156" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">all MCO₃ → MO + CO₂ on heating</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Only Li₂CO₃ breaks ranks — its tiny cation borrows Mg's behaviour</text>
""")

FILES["kiln-temperature-panel.tsx"] = wrap("KilnTemperaturePanel",
 "Comparison of kiln temperatures for magnesite and limestone calcination",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two ores, two kilns</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">MAGNESITE MgCO₃</text>
      <text x="180" y="112" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">~350 °C</text>
      <text x="180" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Mg²⁺ bends the carbonate until it snaps</text>
      <text x="180" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">→ magnesia for refractories</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">LIMESTONE CaCO₃</text>
      <text x="480" y="112" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">~900 °C</text>
      <text x="480" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Ca²⁺ only leans on it — a proper kiln</text>
      <text x="480" y="158" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">→ quick lime; ~0.44 t CO₂ per t of lime</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The Fajans ladder, written in kiln fuel bills</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
