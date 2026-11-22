# Figures for Basic Concept of Organic Chemistry rows 96-98 (21 figures).
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

# ---------------- row 96: introduction ----------------

FILES["wohler-urea-experiment.tsx"] = wrap("WohlerUreaExperiment",
 "Wohler 1828 conversion of ammonium cyanate into urea",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Wöhler 1828 — the experiment that killed vitalism</text>
      <rect x="40" y="55" width="250" height="90" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="165" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">INORGANIC salt</text>
      <text x="165" y="108" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">NH₄OCN</text>
      <text x="165" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ammonium cyanate</text>
      <path d="M 295 100 L 360 100" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#wue-a)" />
      <text x="328" y="90" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">heat</text>
      <rect x="365" y="55" width="250" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="490" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ORGANIC compound</text>
      <text x="490" y="108" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">NH₂CONH₂ (urea)</text>
      <text x="490" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">found in urine</text>
      <text x="330" y="175" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Same molecular formula CH₄N₂O — isomerism demonstrated</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Berzelius's "vital force" theory refuted: one flask, no living cell</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the same chemistry rules inside and outside organisms</text>
      <defs>
        <marker id="wue-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["organic-compound-sources.tsx"] = wrap("OrganicCompoundSources",
 "Sources of organic compounds from living things coal petroleum and synthesis",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Where organic compounds come from</text>
      {[
        ["plants", "carbohydrates, oils, dyes", "rgb(16 185 129)", 40, 55],
        ["animals", "proteins, fats, urea", "rgb(239 68 68)", 240, 55],
        ["coal tar", "benzene, phenol, dyes", "rgb(120 113 108)", 440, 55],
        ["petroleum + natural gas", "the great industrial feedstock", "rgb(59 130 246)", 40, 125],
        ["laboratory synthesis", "built from simple molecules upward", "rgb(139 92 246)", 240, 125],
        ["fermentation", "ethanol, antibiotics", "rgb(245 158 11)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">After Wöhler, synthesis rivalled extraction — most organics are now made, not gathered</text>
""")

FILES["organic-vs-inorganic-props.tsx"] = wrap("OrganicVsInorganicProps",
 "Property contrast between organic and inorganic compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two families, opposite personalities</text>
      <line x1="35" y1="48" x2="625" y2="48" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["PROPERTY", "ORGANIC", "INORGANIC"],
        ["bonding", "covalent, molecular", "often ionic"],
        ["m.p. / b.p.", "low, volatile", "high, crystalline"],
        ["flammability", "burn to CO₂ + H₂O", "mostly do not burn"],
        ["conductivity", "non-conductors", "conduct molten/aqueous"],
        ["solubility", "organic solvents", "water"],
        ["isomerism", "common", "rare"],
        ["reactions", "slow, catalysed", "fast, ionic"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={40 + [0, 220, 440][c]} y={68 + i * 22} fontSize={i ? "10" : "9.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="35" y1={75 + i * 22} x2="625" y2={75 + i * 22} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="230" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Every row follows from one cause: discrete covalent molecules vs ionic lattices</text>
""")

FILES["carbon-compound-exclusions.tsx"] = wrap("CarbonCompoundExclusions",
 "Carbon compounds excluded from organic chemistry by convention",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbon-containing but NOT organic</text>
      {[
        ["carbonates", "CO₃²⁻ (CaCO₃)", "rgb(59 130 246)", 40, 55],
        ["bicarbonates", "HCO₃⁻ (NaHCO₃)", "rgb(59 130 246)", 240, 55],
        ["carbides", "CaC₂, SiC", "rgb(239 68 68)", 440, 55],
        ["cyanides", "CN⁻ (KCN)", "rgb(139 92 246)", 40, 125],
        ["carbon monoxide", "CO", "rgb(245 158 11)", 240, 125],
        ["carbon dioxide", "CO₂", "rgb(245 158 11)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Salt-like or oxide chemistry, no C–H framework — convention files them under inorganic</text>
""")

FILES["vital-force-timeline.tsx"] = wrap("VitalForceTimeline",
 "Timeline from Berzelius vital force theory to Wohler urea synthesis",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">From vital force to synthetic chemistry</text>
      <line x1="60" y1="110" x2="600" y2="110" stroke="rgb(148 163 184)" strokeWidth="3" />
      {[
        ["~1807", "Berzelius: vital force theory — organics need life", "rgb(59 130 246)", 60],
        ["1828", "Wöhler: NH₄OCN → urea in a flask", "rgb(16 185 129)", 300],
        ["after", "synthetic era: acetic acid, dyes, plastics…", "rgb(245 158 11)", 520],
      ].map(([yr, d, col, x], i) => (
        <g key={i}>
          <circle cx={x as number} cy="110" r="7" fill={col as string} />
          <text x={x as number} y="88" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{yr as string}</text>
          <text x={x as number} y={i === 1 ? 140 : 140} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">The doctrine: "organic compounds can only be made by living things"</text>
      <text x="330" y="203" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One gentle heating rearranged atoms and ended a philosophy</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">NH₄OCN and urea share the formula CH₄N₂O — isomerism's debut</text>
""")

FILES["organic-property-six.tsx"] = wrap("OrganicPropertySix",
 "Six characteristic properties of organic compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Six signatures of an organic compound</text>
      {[
        ["covalent molecules", "low m.p./b.p.", "rgb(59 130 246)", 40, 55],
        ["flammable", "burn to CO₂ + H₂O", "rgb(239 68 68)", 240, 55],
        ["non-conductors", "no ions to carry charge", "rgb(245 158 11)", 440, 55],
        ["organic-solvent soluble", "water-insoluble mostly", "rgb(16 185 129)", 40, 125],
        ["isomerism", "one formula, many compounds", "rgb(139 92 246)", 240, 125],
        ["slow reactions", "molecular, need catalysts", "rgb(20 184 166)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">All six trace back to covalent molecular structure — quote the cause, not just the list</text>
""")

FILES["isomer-pair-c2h6o.tsx"] = wrap("IsomerPairC2H6O",
 "Two isomers sharing molecular formula C2H6O ethanol and dimethyl ether",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One formula, two compounds: C₂H₆O</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ETHANOL</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃CH₂OH</text>
      <text x="180" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–C–O–H connectivity</text>
      <text x="180" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">liquid, b.p. 78 °C, a drinkable alcohol</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">DIMETHYL ETHER</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃OCH₃</text>
      <text x="480" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–O–C connectivity</text>
      <text x="480" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">gas, different reactivity entirely</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Molecular formula counts atoms; condensed formula reveals identity</text>
""")

# ---------------- row 97: separate study ----------------

FILES["separate-study-reasons.tsx"] = wrap("SeparateStudyReasons",
 "Three reasons for the separate study of organic compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why organic chemistry gets its own shelf</text>
      {[
        ["1 · NUMBERS", "tens of millions — catenation + isomerism multiply every formula", "rgb(59 130 246)", 40, 55, 560],
        ["2 · PROPERTIES", "covalent molecular: low m.p./b.p., flammable, non-conducting, isomer-rich", "rgb(16 185 129)", 40, 115, 560],
        ["3 · METHODS", "extraction, distillation, chromatography, stepwise synthesis, mechanisms", "rgb(245 158 11)", 40, 175, 560],
      ].map(([h, d, col, x, y, w]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width={w as number} height="48" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 20} fontSize="11" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 38} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="236" fontSize="0.1"> </text>
""")

FILES["catenation-count-contrast.tsx"] = wrap("CatenationCountContrast",
 "Vast difference in the number of known organic versus inorganic compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The count gap</text>
      <rect x="60" y="60" width="180" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="150" y="90" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">inorganic</text>
      <rect x="90" y="105" width="120" height="10" rx="4" fill="rgb(148 163 184)" opacity="0.5" />
      <text x="150" y="140" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">~ hundreds of thousands</text>
      <rect x="300" y="60" width="180" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="390" y="90" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">organic</text>
      <rect x="330" y="105" width="120" height="10" rx="4" fill="rgb(16 185 129)" />
      <text x="390" y="132" fontSize="13" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">tens of MILLIONS</text>
      <text x="390" y="155" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">growing by millions per decade</text>
      <text x="530" y="90" fontSize="10" fontWeight="800" fill="rgb(59 130 246)">the engine:</text>
      <text x="530" y="110" fontSize="9.5" className="fill-current text-muted-foreground">catenation</text>
      <text x="530" y="126" fontSize="9.5" className="fill-current text-muted-foreground">functional groups</text>
      <text x="530" y="142" fontSize="9.5" className="fill-current text-muted-foreground">isomerism</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Carbon chains of unlimited length × attachable groups × many skeletons = the explosion</text>
""")

FILES["covalent-vs-ionic-lattice.tsx"] = wrap("CovalentVsIonicLattice",
 "Discrete covalent molecules versus ionic lattice structures",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Molecules vs lattices — the root difference</text>
      <rect x="40" y="55" width="280" height="130" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ORGANIC: discrete molecules</text>
      {[[110, 120], [170, 105], [230, 130], [140, 155], [210, 165]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="13" fill="rgb(59 130 246)" opacity="0.35" />
          <circle cx={cx + 16} cy={cy + 4} r="7" fill="rgb(16 185 129)" opacity="0.35" />
        </g>
      ))}
      <text x="180" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">weak forces between molecules → low m.p./b.p.</text>
      <rect x="340" y="55" width="280" height="130" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">INORGANIC: ionic lattice</text>
      {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => (
        <circle key={r + "-" + c} cx={390 + c * 60} cy={100 + r * 26} r="10" fill={(r + c) % 2 ? "rgb(239 68 68)" : "rgb(59 130 246)"} opacity="0.45" />
      )))}
      <text x="480" y="200" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">strong electrostatics throughout → high m.p./b.p.</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One structural fact explains the whole comparison table</text>
""")

FILES["study-methods-toolkit.tsx"] = wrap("StudyMethodsToolkit",
 "Special methods used to study organic compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The organic toolkit</text>
      {[
        ["extraction", "pull compounds from plants, coal, petroleum", "rgb(16 185 129)", 40, 55],
        ["crystallisation", "purify by solubility and crystal growth", "rgb(59 130 246)", 240, 55],
        ["distillation", "separate by boiling point", "rgb(245 158 11)", 440, 55],
        ["chromatography", "separate by differential adsorption", "rgb(139 92 246)", 40, 125],
        ["structure determination", "spectroscopy + chemical tests", "rgb(239 68 68)", 240, 125],
        ["stepwise synthesis", "build the skeleton group by group", "rgb(20 184 166)", 440, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Reason 3 of the separate study: molecular compounds need molecular methods</text>
""")

FILES["reaction-speed-contrast.tsx"] = wrap("ReactionSpeedContrast",
 "Slow molecular organic reactions versus fast ionic inorganic reactions",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Fast ions, slow molecules</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">IONIC (inorganic)</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Ag⁺ + Cl⁻ → AgCl↓ instantly</text>
      <text x="180" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ions meet in solution, react at once</text>
      <text x="180" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">no bonds to break inside particles</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">MOLECULAR (organic)</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">C–H / C–C bonds must first break</text>
      <text x="480" y="132" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">high activation barrier → slow, heated,</text>
      <text x="480" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">often catalysed; mechanisms matter</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Slow ≠ weak: the products are perfectly stable — the barrier is the point</text>
""")

FILES["border-compounds-panel.tsx"] = wrap("BorderCompoundsPanel",
 "Boundary compounds kept in inorganic chemistry despite containing carbon",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The conventional border</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ORGANIC side</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">C–H framework, catenated skeletons,</text>
      <text x="180" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">covalent molecular families</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CH₄, C₂H₅OH, CH₃COOH, benzene…</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">INORGANIC side (though C is present)</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">carbonates, bicarbonates, carbides,</text>
      <text x="480" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">cyanides, CO, CO₂</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">salt-like / oxide chemistry, no chains</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The border is behavioural: chains and C–H make the organic family</text>
""")

FILES["wohler-verdict-panel.tsx"] = wrap("WohlerVerdictPanel",
 "What Wohler's synthesis disproved and what distinction survived",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Wöhler's verdict: what died, what survived</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">DIED in 1828</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">vital force theory</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">"organics need a living force"</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">origin no longer defines the subject</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">SURVIVES today</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">the behavioural distinction</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">numbers, properties, methods</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">still justify the separate study</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The border moved from "where compounds come from" to "how they behave"</text>
""")

# ---------------- row 98: tetravalency + catenation ----------------

FILES["carbon-excited-state.tsx"] = wrap("CarbonExcitedState",
 "Excitation of carbon from 2s2 2p2 to 2s1 2p3 giving four unpaired electrons",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ground state → excited state: carbon finds a fourth hand</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(148 163 184)" opacity="0.1" stroke="rgb(148 163 184)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">GROUND: 1s² 2s² 2p²</text>
      <rect x="120" y="95" width="34" height="30" rx="4" fill="rgb(148 163 184)" opacity="0.3" />
      <text x="137" y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑↓</text>
      <text x="170" y="115" fontSize="10" className="fill-current text-muted-foreground">2s  paired</text>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={230 + i * 40} y="95" width="34" height="30" rx="4" fill="rgb(59 130 246)" opacity="0.3" />
          <text x={247 + i * 40} y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑</text>
        </g>
      ))}
      <text x="315" y="115" fontSize="10" className="fill-current text-muted-foreground">2p  2 unpaired</text>
      <path d="M 325 110 L 355 110" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#ces-a)" />
      <text x="340" y="98" fontSize="9" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">~406 kJ/mol</text>
      <rect x="360" y="55" width="260" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="490" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">EXCITED: 1s² 2s¹ 2p³</text>
      <rect x="410" y="95" width="34" height="30" rx="4" fill="rgb(148 163 184)" opacity="0.3" />
      <text x="427" y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑</text>
      <text x="452" y="115" fontSize="10" className="fill-current text-muted-foreground">2s</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={490 + i * 40} y="95" width="34" height="30" rx="4" fill="rgb(16 185 129)" opacity="0.3" />
          <text x={507 + i * 40} y="115" fontSize="10" textAnchor="middle" className="fill-current text-foreground">↑</text>
        </g>
      ))}
      <text x="590" y="115" fontSize="10" className="fill-current text-muted-foreground">2p</text>
      <text x="490" y="152" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">4 unpaired → VALENCY 4</text>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The promotion cost is repaid by two extra strong bonds — thermodynamic profit</text>
      <text x="330" y="216" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">in methane the four bonds are equivalent (sp³, tetrahedral, 109.5°)</text>
      <defs>
        <marker id="ces-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["tetravalency-energy-ledger.tsx"] = wrap("TetravalencyEnergyLedger",
 "Energy account showing excitation cost repaid by two extra bonds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The energy ledger of tetravalency</text>
      <rect x="40" y="60" width="240" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="160" y="88" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">COST: promotion ≈ 406 kJ/mol</text>
      <text x="160" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">2s electron → empty 2p orbital</text>
      <path d="M 285 95 L 335 95" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#tel-a)" />
      <rect x="340" y="60" width="280" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="88" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">GAIN: 2 extra bonds × ≈413 kJ/mol</text>
      <text x="480" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">each C–H bond ≈ 413 kJ/mol released</text>
      <text x="330" y="160" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">net profit ≈ 420 kJ/mol → tetravalent bonding wins</text>
      <text x="330" y="188" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Carbon borrows energy to earn more — that is why valency 2 never happens in practice</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">CH₄, CCl₄, and every organic skeleton are tetravalent compounds</text>
      <defs>
        <marker id="tel-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["methane-tetrahedral.tsx"] = wrap("MethaneTetrahedral",
 "Methane molecule with four equivalent bonds in tetrahedral geometry",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">CH₄ — four equivalent bonds, one geometry</text>
      <circle cx="330" cy="115" r="26" fill="rgb(59 130 246)" opacity="0.25" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="121" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C</text>
      {[[330, 55], [408, 145], [252, 145], [330, 190]].map(([hx, hy], i) => (
        <g key={i}>
          <line x1="330" y1="115" x2={hx} y2={hy} stroke="rgb(16 185 129)" strokeWidth="3" />
          <circle cx={hx} cy={hy} r="14" fill="rgb(16 185 129)" opacity="0.25" stroke="rgb(16 185 129)" />
          <text x={hx} y={hy + 4} fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">H</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">all four C–H bonds identical · 109.5° · sp³ hybridised</text>
      <text x="560" y="90" fontSize="10.5" fontWeight="800" className="fill-current text-foreground">why equivalent?</text>
      <text x="560" y="112" fontSize="9.5" className="fill-current text-muted-foreground">one 2s + three 2p orbitals</text>
      <text x="560" y="130" fontSize="9.5" className="fill-current text-muted-foreground">mix into four sp³ hybrids</text>
      <text x="560" y="148" fontSize="9.5" className="fill-current text-muted-foreground">→ tetrahedron, no distinct</text>
      <text x="560" y="166" fontSize="9.5" className="fill-current text-muted-foreground">"s-bond" or "p-bond"</text>
""")

FILES["catenation-chain-types.tsx"] = wrap("CatenationChainTypes",
 "Straight branched and cyclic chains formed by carbon catenation",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Catenation: chains, branches, rings</text>
      <rect x="40" y="55" width="180" height="90" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="130" y="78" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">STRAIGHT</text>
      {[70, 105, 140, 175].map((cx) => (
        <g key={cx}><circle cx={cx} cy="115" r="9" fill="rgb(59 130 246)" opacity="0.4" />{cx > 70 && <line x1={cx - 35} y1="115" x2={cx - 9} y2="115" stroke="rgb(59 130 246)" strokeWidth="2.5" />}</g>
      ))}
      <text x="130" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">n-pentane skeleton</text>
      <rect x="240" y="55" width="180" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="330" y="78" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">BRANCHED</text>
      <circle cx="300" cy="120" r="9" fill="rgb(16 185 129)" opacity="0.4" /><circle cx="335" cy="105" r="9" fill="rgb(16 185 129)" opacity="0.4" />
      <circle cx="335" cy="135" r="9" fill="rgb(16 185 129)" opacity="0.4" /><circle cx="370" cy="120" r="9" fill="rgb(16 185 129)" opacity="0.4" />
      <line x1="309" y1="116" x2="326" y2="108" stroke="rgb(16 185 129)" strokeWidth="2.5" /><line x1="309" y1="124" x2="326" y2="132" stroke="rgb(16 185 129)" strokeWidth="2.5" />
      <line x1="344" y1="108" x2="361" y2="116" stroke="rgb(16 185 129)" strokeWidth="2.5" /><line x1="344" y1="132" x2="361" y2="124" stroke="rgb(16 185 129)" strokeWidth="2.5" />
      <text x="330" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">isopentane skeleton</text>
      <rect x="440" y="55" width="180" height="90" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="530" y="78" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CYCLIC</text>
      <polygon points="530,95 558,112 548,142 512,142 502,112" fill="none" stroke="rgb(245 158 11)" strokeWidth="2.5" />
      <text x="530" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">cyclopentane skeleton</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">strong C–C bonds (≈348 kJ/mol) + small atoms + tetravalency = unlimited self-linking</text>
      <text x="330" y="202" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">silicon tries and fails: Si–Si ≈ 226 kJ/mol → silanes stop at a few units</text>
      <text x="330" y="224" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">every chain carbon still has valencies free for H or functional groups</text>
""")

FILES["cc-vs-sisi-ladder.tsx"] = wrap("CcVsSisiLadder",
 "Bond energy comparison of carbon carbon versus silicon silicon self bonding",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why carbon wins the catenation race</text>
      <text x="80" y="70" fontSize="11" fontWeight="800" fill="rgb(16 185 129)">C–C ≈ 348 kJ/mol</text>
      <rect x="80" y="80" width="430" height="26" rx="6" fill="rgb(16 185 129)" opacity="0.75" />
      <text x="80" y="140" fontSize="11" fontWeight="800" fill="rgb(59 130 246)">Si–Si ≈ 226 kJ/mol</text>
      <rect x="80" y="150" width="280" height="26" rx="6" fill="rgb(59 130 246)" opacity="0.75" />
      <text x="80" y="205" fontSize="10.5" className="fill-current text-muted-foreground">strong self-bond → chains of unlimited length (polyethylene: ~10⁵ carbons)</text>
      <text x="80" y="226" fontSize="10.5" className="fill-current text-muted-foreground">weak self-bond → silanes stop at a few units and are reactive</text>
""")

FILES["isomer-explosion-chart.tsx"] = wrap("IsomerExplosionChart",
 "Growth in the number of isomers with increasing carbon count",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The isomer explosion</text>
      {[
        ["C₄H₁₀", 2, 60, "rgb(59 130 246)"],
        ["C₅H₁₂", 3, 90, "rgb(16 185 129)"],
        ["C₆H₁₄", 5, 120, "rgb(245 158 11)"],
        ["C₁₀H₂₂", 75, 150, "rgb(239 68 68)"],
      ].map(([f, n, y, col]) => (
        <g key={f as string}>
          <text x="60" y={(y as number) + 14} fontSize="10.5" fontWeight="800" className="fill-current text-foreground">{f as string}</text>
          <rect x="120" y={y as number} width={Math.min((n as number) * 3.2, 320)} height="18" rx="4" fill={col as string} opacity="0.75" />
          <text x={130 + Math.min((n as number) * 3.2, 320)} y={(y as number) + 14} fontSize="10.5" fontWeight="800" fill={col as string}>{n as string}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">C₂₀H₄₂: over 300,000 isomers — catenation + branching = a library per formula</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">this combinatorial growth is why organic chemistry is the largest branch</text>
""")

FILES["allotrope-variety.tsx"] = wrap("AllotropeVariety",
 "Allotropic forms of carbon diamond graphite and fullerene",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One element, many architectures</text>
      <rect x="40" y="55" width="180" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="130" y="80" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">DIAMOND</text>
      {[[95, 115], [130, 100], [165, 115], [130, 145]].map(([cx, cy], i) => (
        <g key={i}><circle cx={cx} cy={cy} r="7" fill="rgb(59 130 246)" opacity="0.5" />
          {i > 0 && <line x1={i === 1 ? 102 : 130} y1={i === 1 ? 112 : i === 2 ? 115 : 132} x2={i === 1 ? 124 : 158} y2={i === 1 ? 104 : i === 2 ? 112 : 138} stroke="rgb(59 130 246)" strokeWidth="1.5" />}
        </g>
      ))}
      <text x="130" y="165" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">sp³ network, hardest natural solid</text>
      <rect x="240" y="55" width="180" height="120" rx="10" fill="rgb(120 113 108)" opacity="0.1" stroke="rgb(120 113 108)" />
      <text x="330" y="80" fontSize="11" fontWeight="800" fill="rgb(120 113 108)" textAnchor="middle">GRAPHITE</text>
      {[0, 1].map((l) => (
        <g key={l}>
          <ellipse cx="330" cy={115 + l * 34} rx="55" ry="10" fill="none" stroke="rgb(120 113 108)" strokeWidth="2" opacity="0.7" />
        </g>
      ))}
      <text x="330" y="165" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">sp² layers, sliding, conducts</text>
      <rect x="440" y="55" width="180" height="120" rx="10" fill="rgb(139 92 246)" opacity="0.08" stroke="rgb(139 92 246)" />
      <text x="530" y="80" fontSize="11" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">FULLERENE C₆₀</text>
      <circle cx="530" cy="120" r="30" fill="none" stroke="rgb(139 92 246)" strokeWidth="2" />
      <circle cx="530" cy="120" r="17" fill="none" stroke="rgb(139 92 246)" strokeWidth="1.5" opacity="0.7" />
      <text x="530" y="165" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">caged football of 60 carbons</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Tetravalency's versatility shown in elemental form — same atom, three architectures</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
