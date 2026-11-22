# Generates figure components for chemistry rows 85-87 (21 figures).
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

# ---------------- cx85: sodium hydroxide ----------------

FILES["naoh-properties-panel.tsx"] = wrap("NaohPropertiesPanel",
 "Properties panel of sodium hydroxide as strong deliquescent caustic base",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NaOH — caustic soda</text>
      {[
        ["strong, monobasic", "NaOH → Na⁺ + OH⁻ completely", "rgb(239 68 68)"],
        ["deliquescent", "drinks air: H₂O + CO₂ → Na₂CO₃ crust", "rgb(59 130 246)"],
        ["exothermic in water", "dissolving burns — add pellet TO water", "rgb(245 158 11)"],
        ["caustic to skin", "saponifies skin fats — soapy touch", "rgb(139 92 246)"],
        ["mp 318 °C", "white solid, very soluble", "rgb(16 185 129)"],
      ].map(([head, sub, col], i) => (
        <g key={head as string}>
          <rect x="40" y={48 + i * 34} width="580" height="28" rx="6" fill={col as string} opacity="0.1" />
          <text x="58" y={67 + i * 34} fontSize="11" fontWeight="800" fill={col as string}>{head as string}</text>
          <text x="300" y={67 + i * 34} fontSize="10.5" className="fill-current text-muted-foreground">{sub as string}</text>
        </g>
      ))}
""")

FILES["naoh-precipitation-colours.tsx"] = wrap("NaohPrecipitationColours",
 "Colour chart of hydroxide precipitates formed by sodium hydroxide",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The precipitate colour chart</text>
      {[
        ["Cu²⁺", "pale blue Cu(OH)₂", "insoluble in excess", "rgb(96 165 250)", 30],
        ["Fe²⁺", "dirty green Fe(OH)₂", "insoluble in excess", "rgb(101 163 13)", 185],
        ["Fe³⁺", "reddish-brown Fe(OH)₃", "insoluble in excess", "rgb(180 83 9)", 340],
        ["Zn²⁺ Al³⁺ Pb²⁺", "white hydroxides", "SOLUBLE in excess — amphoteric", "rgb(148 163 184)", 495],
      ].map(([ion, ppt, extra, col, x]) => (
        <g key={ion as string}>
          <rect x={x as number} y="60" width="140" height="105" rx="10" fill={col as string} opacity="0.16" stroke={col as string} />
          <text x={(x as number) + 70} y="84" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{ion as string}</text>
          <text x={(x as number) + 70} y="106" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{ppt as string}</text>
          <text x={(x as number) + 70} y="126" fontSize="9" textAnchor="middle" fill={col as string}>{extra as string}</text>
          <text x={(x as number) + 70} y="150" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">+ NaOH</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">NH₄⁺: no precipitate — only pungent NH₃ on warming</text>
""")

FILES["amphoteric-dissolve.tsx"] = wrap("AmphotericDissolve",
 "Zinc hydroxide dissolving in excess sodium hydroxide to form sodium zincate",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Amphoteric — dissolves in its own precipitant</text>
      <rect x="60" y="70" width="200" height="80" rx="10" fill="rgb(148 163 184)" opacity="0.2" stroke="rgb(148 163 184)" />
      <text x="160" y="100" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Zn(OH)₂ white ppt</text>
      <text x="160" y="122" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">from ZnSO₄ + 2NaOH</text>
      <path d="M 265 110 L 340 110" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#ad-a)" />
      <text x="302" y="100" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">+ excess NaOH</text>
      <rect x="345" y="70" width="230" height="80" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="460" y="100" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">clear solution again</text>
      <text x="460" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O</text>
      <text x="460" y="140" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">sodium zincate</text>
      <defs>
        <marker id="ad-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">Cu(OH)₂ refuses — not amphoteric, stays pale blue</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same for Al(OH)₃ → NaAlO₂ and Pb(OH)₂</text>
""")

FILES["naoh-co2-stages.tsx"] = wrap("NaohCo2Stages",
 "Two stage absorption of carbon dioxide by sodium hydroxide",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">CO₂ into NaOH — two stages</text>
      <rect x="40" y="60" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">STAGE 1 · limited CO₂</text>
      <text x="180" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2NaOH + CO₂ → Na₂CO₃ + H₂O</text>
      <text x="180" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the carbonate forms</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(crust on an open pellet)</text>
      <rect x="340" y="60" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">STAGE 2 · excess CO₂</text>
      <text x="480" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃</text>
      <text x="480" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the soluble bicarbonate forms</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">(standard NaOH loses strength)</text>
      <text x="330" y="205" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same chemistry as scrubbing flue gas — OH⁻ is the stronger base and wins CO₂</text>
""")

FILES["chlor-alkali-cell.tsx"] = wrap("ChlorAlkaliCell",
 "Chlor alkali brine electrolysis cell producing sodium hydroxide chlorine and hydrogen",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chlor-alkali — three products, one current</text>
      <rect x="150" y="55" width="360" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">concentrated brine · diaphragm/membrane divides the cell</text>
      <line x1="330" y1="62" x2="330" y2="168" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="5 4" />
      <text x="240" y="100" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CATHODE (steel)</text>
      <text x="240" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2H₂O + 2e⁻ → H₂↑ + 2OH⁻</text>
      <text x="240" y="144" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">NaOH accumulates here</text>
      <text x="422" y="100" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ANODE (graphite/Ti)</text>
      <text x="422" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2Cl⁻ → Cl₂↑ + 2e⁻</text>
      <text x="422" y="144" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">kept off the OH⁻ side</text>
      <text x="330" y="200" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2NaCl + 2H₂O → 2NaOH + H₂↑ + Cl₂↑</text>
      <text x="330" y="220" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">A paper boom raises chlorine prices — the two are chained by this cell</text>
""")

FILES["naoh-uses-map.tsx"] = wrap("NaohUsesMap",
 "Uses of sodium hydroxide from soap making to bauxite purification",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NaOH at work</text>
      {[
        ["Soap — saponification", "fat + 3NaOH → 3RCOONa + glycerol", "rgb(245 158 11)", 30, 55],
        ["Paper pulping", "digests lignin, frees the fibres", "rgb(148 163 184)", 340, 55],
        ["Bayer process", "digests bauxite: Al₂O₃ + 2OH⁻ → 2AlO₂⁻ + H₂O", "rgb(59 130 246)", 30, 115],
        ["Drain cleaner", "saponifies grease, dissolves hair", "rgb(239 68 68)", 340, 115],
        ["Rayon / petroleum", "viscose spinning; refining fractions", "rgb(139 92 246)", 30, 175],
        ["Lab reagent", "standardised, never assumed", "rgb(16 185 129)", 340, 175],
      ].map(([u, why, col, x, y]) => (
        <g key={u as string}>
          <rect x={x as number} y={y as number} width="290" height="48" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 19} fontSize="10.5" fontWeight="800" fill={col as string}>{u as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 37} fontSize="9.5" className="fill-current text-muted-foreground">{why as string}</text>
        </g>
      ))}
""")

FILES["naoh-vs-na2co3.tsx"] = wrap("NaohVsNa2co3",
 "Comparison of sodium hydroxide and sodium carbonate as bases",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Caustic soda vs washing soda</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "NaOH (caustic)", "Na₂CO₃ (washing)"],
        ["strength", "strong base — free OH⁻", "mild base — hydrolysis of CO₃²⁻"],
        ["NH₄⁺ salt (warm)", "liberates NH₃", "no NH₃ — the distinguishing test"],
        ["air uptake", "CO₂ + H₂O → Na₂CO₃ crust", "already carbonate"],
        ["pH (0.1 M)", "~13", "~11"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + c * 195} y={70 + i * 28} fontSize={i ? "10.5" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={78 + i * 28} x2="620" y2={78 + i * 28} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One is a delivered hydroxide; the other manufactures hydroxide by hydrolysis</text>
""")

# ---------------- cx86: sodium carbonate ----------------

FILES["washing-soda-anatomy.tsx"] = wrap("WashingSodaAnatomy",
 "Washing soda decahydrate losing water of crystallisation by efflorescence",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Washing soda — Na₂CO₃·10H₂O</text>
      <rect x="60" y="60" width="230" height="100" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="175" y="88" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">DECAHYDRATE</text>
      <text x="175" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">10 loosely held waters</text>
      <text x="175" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">translucent crystals</text>
      <path d="M 295 110 L 360 110" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#wsa-a)" />
      <text x="327" y="100" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">air takes</text>
      <text x="327" y="122" fontSize="9" textAnchor="middle" fill="rgb(239 68 68)">9 H₂O</text>
      <rect x="365" y="60" width="230" height="100" rx="10" fill="rgb(148 163 184)" opacity="0.15" stroke="rgb(148 163 184)" />
      <text x="480" y="88" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">MONOHYDRATE</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Na₂CO₃·H₂O white powder</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">efflorescence = losing water</text>
      <defs>
        <marker id="wsa-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Efflorescent (loses water) is the opposite of deliquescent (drinks water, like NaOH)</text>
""")

FILES["carbonate-hydrolysis-ph.tsx"] = wrap("CarbonateHydrolysisPh",
 "pH ladder from carbonate hydrolysis comparing sodium carbonate and bicarbonate",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Alkaline without any OH⁻ in the formula</text>
      <text x="330" y="52" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻</text>
      {[
        ["NaOH", "pH ~13", "rgb(239 68 68)", 90],
        ["Na₂CO₃ 0.1 M", "pH ~11", "rgb(245 158 11)", 250],
        ["NaHCO₃", "pH ~8.3", "rgb(16 185 129)", 410],
        ["pure water", "pH 7", "rgb(59 130 246)", 540],
      ].map(([s, v, col, x]) => (
        <g key={s as string}>
          <rect x={x as number} y="80" width={(x as number) > 400 ? 90 : 150} height="40" rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={(x as number) + ((x as number) > 400 ? 45 : 75)} y="98" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{s as string}</text>
          <text x={(x as number) + ((x as number) > 400 ? 45 : 75)} y="113" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="330" y="160" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HCO₃⁻ is an extremely weak acid (pKa ≈ 10.3) — so CO₃²⁻ grabs protons from water</text>
      <text x="330" y="182" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HCO₃⁻ hydrolyses less (conjugate of the stronger H₂CO₃, pKa ≈ 6.4) — hence only pH 8.3</text>
""")

FILES["na2co3-reaction-map.tsx"] = wrap("Na2co3ReactionMap",
 "Reaction map of sodium carbonate with acids carbon dioxide sulphur dioxide and calcium chloride",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na₂CO₃ — the reaction checklist</text>
      {[
        ["acids", "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑", "brisk effervescence", "rgb(239 68 68)", 30, 55],
        ["CO₂ + H₂O", "Na₂CO₃ + CO₂ + H₂O → 2NaHCO₃", "absorbs to bicarbonate", "rgb(59 130 246)", 340, 55],
        ["SO₂", "Na₂CO₃ + SO₂ → Na₂SO₃ + CO₂↑", "SULPHITE — never sulphate", "rgb(148 163 184)", 30, 115],
        ["CaCl₂", "Na₂CO₃ + CaCl₂ → CaCO₃↓ + 2NaCl", "white ppt — hardness removal", "rgb(16 185 129)", 340, 115],
      ].map(([re, eq, note, col, x, y]) => (
        <g key={re as string}>
          <rect x={x as number} y={y as number} width="290" height="48" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 18} fontSize="9.5" fontWeight="800" fill={col as string}>{re as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 34} fontSize="9.5" className="fill-current text-foreground">{eq as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 46} fontSize="8.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">CuSO₄ gives a green-blue BASIC carbonate — the carbonate solution co-precipitates OH⁻</text>
""")

FILES["water-softening-reaction.tsx"] = wrap("WaterSofteningReaction",
 "Washing soda removing permanent hardness by precipitating calcium carbonate",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Softening permanent hardness</text>
      <rect x="40" y="65" width="200" height="75" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="140" y="92" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HARD WATER</text>
      <text x="140" y="114" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dissolved CaSO₄, MgSO₄</text>
      <text x="140" y="130" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">soap scums, no lather</text>
      <path d="M 245 102 L 320 102" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#wsr-a)" />
      <text x="282" y="92" fontSize="9.5" textAnchor="middle" fill="rgb(245 158 11)">+ Na₂CO₃</text>
      <rect x="325" y="65" width="200" height="75" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="425" y="92" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SOFT WATER</text>
      <text x="425" y="114" fontSize="10" textAnchor="middle" className="fill-current text-foreground">Na₂SO₄ left — harmless</text>
      <text x="425" y="130" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">lathers freely</text>
      <text x="330" y="170" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Na₂CO₃ + CaSO₄ → CaCO₃↓ + Na₂SO₄</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">MgSO₄ + Na₂CO₃ → MgCO₃↓ + Na₂SO₄ — same swap for magnesium</text>
      <defs>
        <marker id="wsr-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["na2co3-vs-naoh-nh3.tsx"] = wrap("Na2co3VsNaohNh3",
 "Distinguishing test between sodium hydroxide and sodium carbonate using ammonium salt",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The test that separates them</text>
      <rect x="60" y="70" width="240" height="90" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="95" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">NH₄Cl + NaOH, warm</text>
      <text x="180" y="118" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">NH₄Cl + NaOH → NaCl + NH₃↑ + H₂O</text>
      <text x="180" y="142" fontSize="10" textAnchor="middle" fill="rgb(239 68 68)">pungent gas — turns red litmus blue</text>
      <rect x="360" y="70" width="240" height="90" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="95" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">NH₄Cl + Na₂CO₃, warm</text>
      <text x="480" y="118" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">NO ammonia</text>
      <text x="480" y="142" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">carbonate is too weak a base</text>
      <text x="330" y="195" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Both are alkaline — only the delivered hydroxide can push NH₄⁺ off its proton</text>
""")

FILES["solvay-loop.tsx"] = wrap("SolvayLoop",
 "Solvay process loop from brine ammonia and carbon dioxide to sodium carbonate",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Solvay — the ammonia that comes back</text>
      <rect x="40" y="60" width="230" height="80" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="155" y="86" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">brine + NH₃, CO₂ in</text>
      <text x="155" y="108" fontSize="10" textAnchor="middle" className="fill-current text-foreground">NaHCO₃ precipitates</text>
      <text x="155" y="126" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">(least soluble here)</text>
      <path d="M 275 100 L 335 100" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#sl-a)" />
      <text x="305" y="90" fontSize="9.5" textAnchor="middle" fill="rgb(239 68 68)">heat</text>
      <rect x="340" y="60" width="230" height="80" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="455" y="86" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">2NaHCO₃ → Na₂CO₃</text>
      <text x="455" y="108" fontSize="10" textAnchor="middle" className="fill-current text-foreground">+ CO₂ + H₂O</text>
      <text x="455" y="126" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">soda ash — product</text>
      <path d="M 455 145 C 455 175, 300 185, 160 150" stroke="rgb(16 185 129)" strokeWidth="2" fill="none" strokeDasharray="5 4" markerEnd="url(#sl-a)" />
      <text x="310" y="185" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">CO₂ recycled · NH₃ recovered from NH₄Cl with lime</text>
      <defs>
        <marker id="sl-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["na2co3-uses-map.tsx"] = wrap("Na2co3UsesMap",
 "Uses of sodium carbonate led by the glass industry",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na₂CO₃ at work</text>
      <rect x="40" y="55" width="580" height="52" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="330" y="78" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">GLASS — the biggest customer (~half of world output)</text>
      <text x="330" y="98" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">SiO₂ + Na₂CO₃ melt — every window pane carries its sodium</text>
      {[
        ["Washing soda", "cleaning, degreasing", "rgb(16 185 129)", 40, 125],
        ["Water softening", "precipitates Ca²⁺ Mg²⁺", "rgb(245 158 11)", 235, 125],
        ["Baking soda feed", "→ NaHCO₃ (CO₂ + H₂O)", "rgb(239 68 68)", 430, 125],
        ["Paper", "pulping aid", "rgb(148 163 184)", 40, 185],
        ["Primary standard", "anhydrous — weigh it, trust it", "rgb(139 92 246)", 235, 185],
        ["Dyeing / textiles", "fixes dyes, adjusts pH", "rgb(59 130 246)", 430, 185],
      ].map(([u, why, col, x, y]) => (
        <g key={u as string}>
          <rect x={x as number} y={y as number} width="180" height="44" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 90} y={(y as number) + 18} fontSize="10" fontWeight="800" textAnchor="middle" fill={col as string}>{u as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 34} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{why as string}</text>
        </g>
      ))}
""")

# ---------------- cx87: alkaline earth metals ----------------

FILES["alkaline-earth-family.tsx"] = wrap("AlkalineEarthFamily",
 "Group two alkaline earth metals column with ns two configuration",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Group IIA — two electrons, +2 only</text>
      {["Be [He]2s²", "Mg [Ne]3s²", "Ca [Ar]4s²", "Sr [Kr]5s²", "Ba [Xe]6s²", "Ra [Rn]7s²"].map((m, i) => (
        <g key={m}>
          <rect x="60" y={44 + i * 26} width="220" height="22" rx="5" fill="rgb(16 185 129)" opacity={0.35 - i * 0.04} />
          <text x="75" y={60 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m}</text>
        </g>
      ))}
      <text x="330" y="70" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">ns² — the +2 lattice repays the 2nd IE (~1800 kJ/mol)</text>
      <text x="330" y="94" fontSize="10.5" className="fill-current text-muted-foreground">→ harder, denser, higher-melting than Group IA</text>
      <text x="330" y="118" fontSize="10.5" className="fill-current text-muted-foreground">→ gentler with water; Be ignores even steam</text>
      <text x="330" y="142" fontSize="10.5" className="fill-current text-muted-foreground">→ nitrides M₃N₂ and hydrides MH₂ for the whole group</text>
      <text x="330" y="166" fontSize="10.5" className="fill-current text-muted-foreground">→ Be the dissenter: amphoteric oxide, covalent compounds</text>
""")

FILES["iia-trend-panel.tsx"] = wrap("IiaTrendPanel",
 "Trends down group two with ionisation energies and reactivity",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Down Group IIA</text>
      {[
        ["Be", "899 kJ/mol", 0.95], ["Mg", "738", 0.8], ["Ca", "590", 0.65], ["Sr", "550", 0.55], ["Ba", "503", 0.48],
      ].map(([m, ie, w], i) => (
        <g key={"r" + i}>
          <text x="60" y={58 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m as string}</text>
          <rect x="100" y={46 + i * 26} width={(w as number) * 260} height="14" rx="4" fill="rgb(16 185 129)" opacity="0.55" />
          <text x={110 + (w as number) * 260} y={58 + i * 26} fontSize="9.5" fill="rgb(16 185 129)">{ie as string}</text>
        </g>
      ))}
      <text x="450" y="70" fontSize="11" fontWeight="800" fill="rgb(239 68 68)">IE₁ falls ↓</text>
      <text x="450" y="94" fontSize="10.5" className="fill-current text-muted-foreground">radius grows:</text>
      <text x="450" y="112" fontSize="10.5" className="fill-current text-muted-foreground">Be 111 → Ba 198 pm</text>
      <text x="450" y="146" fontSize="11" fontWeight="800" fill="rgb(16 185 129)">reactivity rises ↓</text>
      <text x="450" y="170" fontSize="10.5" className="fill-current text-muted-foreground">Be none → Ba vigorous</text>
      <text x="450" y="194" fontSize="10.5" className="fill-current text-muted-foreground">mp: NO regular trend!</text>
""")

FILES["iia-water-reaction.tsx"] = wrap("IiaWaterReaction",
 "Escalating reaction of alkaline earth metals with water and steam",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Water — the IIA escalation</text>
      {[
        ["Be", "no reaction — even steam refuses", "rgb(148 163 184)", 30],
        ["Mg", "slow cold; steam: Mg + H₂O → MgO + H₂", "rgb(59 130 246)", 185],
        ["Ca", "brisk cold: Ca + 2H₂O → Ca(OH)₂ + H₂↑", "rgb(245 158 11)", 340],
        ["Sr/Ba", "vigorous", "rgb(239 68 68)", 495],
      ].map(([m, act, col, x]) => (
        <g key={m as string}>
          <rect x={x as number} y="60" width="135" height="90" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 67} y="86" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={(x as number) + 67} y="108" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{act as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Mg(OH)₂ is insoluble — it coats the metal and quenches the reaction until steam strips it</text>
      <text x="330" y="204" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Ca(OH)₂ is moderately soluble — the surface stays clean and the fizz continues</text>
""")

FILES["iia-flame-colours.tsx"] = wrap("IiaFlameColours",
 "Flame colours of group two with beryllium and magnesium showing none",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Flame colours — three glow, two refuse</text>
      {[
        ["Be", "no colour", "rgb(148 163 184)"], ["Mg", "no colour", "rgb(148 163 184)"],
        ["Ca", "brick-red", "rgb(234 88 12)"], ["Sr", "crimson", "rgb(220 38 38)"], ["Ba", "apple-green", "rgb(22 163 74)"],
      ].map(([m, col_name, hex], i) => (
        <g key={m as string}>
          <path d={`M ${50 + i * 124} 170 Q ${112 + i * 124} 60 ${174 + i * 124} 170 Z`} fill={hex as string} opacity={(i < 2 ? 0.15 : 0.5)} />
          <text x={112 + i * 124} y="188" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={112 + i * 124} y="205" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{col_name as string}</text>
        </g>
      ))}
      <text x="330" y="46" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Be and Mg: IE 899 / 738 kJ/mol — flame energy cannot excite their electrons</text>
      <text x="330" y="64" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Sr crimson = emergency flares; Ba green = fireworks</text>
""")

FILES["iia-vs-ia-table.tsx"] = wrap("IiaVsIaTable",
 "Comparison table of alkali metals and alkaline earth metals",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">IA vs IIA — two electrons change everything</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "IA (ns¹)", "IIA (ns²)"],
        ["hardness / mp", "soft, low mp", "harder, higher mp (no trend in IIA)"],
        ["water", "violent even for K", "gentler; Be/Mg need heat"],
        ["oxides", "M₂O / M₂O₂ / KO₂", "MO basic (BeO amphoteric)"],
        ["carbonates", "all soluble", "decreasing down; MgCO₃ sparingly"],
        ["flame", "all coloured", "Be/Mg none; Ca/Sr/Ba coloured"],
        ["nitrides", "only Li₃N", "all M₃N₂"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + c * 195} y={70 + i * 25} fontSize={i ? "10" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={78 + i * 25} x2="620" y2={78 + i * 25} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
""")

FILES["sulphate-ladder.tsx"] = wrap("SulphateLadder",
 "Sulphate solubility ladder from soluble magnesium sulphate to insoluble barium sulphate",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The sulphate ladder — down and down</text>
      {[
        ["MgSO₄", "soluble (Epsom salt)", 0.9, "rgb(16 185 129)"],
        ["CaSO₄", "sparingly (gypsum)", 0.45, "rgb(245 158 11)"],
        ["SrSO₄", "very sparingly", 0.2, "rgb(239 68 68)"],
        ["BaSO₄", "2.4 mg/L — practically insoluble", 0.07, "rgb(59 130 246)"],
      ].map(([s, note, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={60 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="150" y={48 + i * 34} width={(w as number) * 300} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={160 + (w as number) * 300} y={61 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{note as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Lattice (big SO₄²⁻ dominates) barely falls; hydration of M²⁺ falls fast → solubility sinks</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">BaCl₂ test for SO₄²⁻ · BaSO₄ = the safe barium meal</text>
""")

FILES["iia-compounds-panel.tsx"] = wrap("IiaCompoundsPanel",
 "Nitrides and hydrides of alkaline earth metals including hydrolith",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Compounds the whole group makes</text>
      <rect x="40" y="60" width="280" height="115" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">NITRIDES — M₃N₂</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">3M + N₂ → M₃N₂</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">ALL of IIA (unlike IA — only Li₃N)</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">hydrolyse to NH₃ + hydroxide</text>
      <rect x="340" y="60" width="280" height="115" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">HYDRIDES — MH₂</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">M + H₂ → MH₂ (ionic, H⁻)</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-foreground">CaH₂ = "hydrolith"</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">portable H₂ generator: CaH₂ + 2H₂O → Ca(OH)₂ + 2H₂</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The +2 cation stabilises N³⁻ and H⁻ — Group IA (except Li) cannot</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
