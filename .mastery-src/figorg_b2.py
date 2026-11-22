# Figures for Basic Concept of Organic Chemistry rows 99-100 (14 figures).
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

# ---------------- row 99: classification ----------------

FILES["organic-classification-tree.tsx"] = wrap("OrganicClassificationTree",
 "Complete classification tree of organic compounds",
 """      <text x="20" y="24" fontSize="14" fontWeight="800" className="fill-current text-foreground">The family tree of organic compounds</text>
      <rect x="260" y="38" width="140" height="30" rx="8" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" />
      <text x="330" y="58" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ORGANIC</text>
      <line x1="330" y1="68" x2="150" y2="95" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <line x1="330" y1="68" x2="510" y2="95" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <rect x="60" y="95" width="180" height="26" rx="7" fill="rgb(16 185 129)" opacity="0.13" stroke="rgb(16 185 129)" />
      <text x="150" y="113" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">OPEN CHAIN (aliphatic)</text>
      <rect x="420" y="95" width="180" height="26" rx="7" fill="rgb(245 158 11)" opacity="0.13" stroke="rgb(245 158 11)" />
      <text x="510" y="113" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">CLOSED CHAIN (cyclic)</text>
      <line x1="150" y1="121" x2="60" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      <line x1="150" y1="121" x2="240" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      <line x1="510" y1="121" x2="420" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      <line x1="510" y1="121" x2="600" y2="150" stroke="rgb(148 163 184)" strokeWidth="1" />
      {[
        ["saturated (alkanes)", "CH₄, C₃H₈", 40, "rgb(16 185 129)"],
        ["unsaturated", "CH₂=CH₂, HC≡CH", 190, "rgb(16 185 129)"],
        ["alicyclic", "cyclohexane", 390, "rgb(245 158 11)"],
        ["aromatic", "benzene, toluene", 545, "rgb(245 158 11)"],
      ].map(([h, d, x, col]) => (
        <g key={h as string}>
          <rect x={x as number} y="150" width="130" height="40" rx="7" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 65} y="166" fontSize="9.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 65} y="182" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <rect x="250" y="205" width="160" height="30" rx="7" fill="rgb(139 92 246)" opacity="0.12" stroke="rgb(139 92 246)" />
      <text x="330" y="218" fontSize="9.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">HETEROCYCLIC (ring has N/O/S)</text>
      <text x="330" y="231" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">pyridine · furan · pyrrole</text>
""")

FILES["saturation-ladder.tsx"] = wrap("SaturationLadder",
 "Saturated alkane versus unsaturated alkene and alkyne structures",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Saturated vs unsaturated — the bond ladder</text>
      <rect x="40" y="55" width="180" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="130" y="80" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ALKANE (saturated)</text>
      <circle cx="85" cy="120" r="11" fill="rgb(16 185 129)" opacity="0.4" /><circle cx="175" cy="120" r="11" fill="rgb(16 185 129)" opacity="0.4" />
      <line x1="96" y1="120" x2="164" y2="120" stroke="rgb(16 185 129)" strokeWidth="3" />
      <text x="130" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–C single bond · CₙH₂ₙ₊₂ · ethane</text>
      <rect x="240" y="55" width="180" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="330" y="80" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">ALKENE</text>
      <circle cx="285" cy="120" r="11" fill="rgb(245 158 11)" opacity="0.4" /><circle cx="375" cy="120" r="11" fill="rgb(245 158 11)" opacity="0.4" />
      <line x1="296" y1="116" x2="364" y2="116" stroke="rgb(245 158 11)" strokeWidth="3" />
      <line x1="296" y1="126" x2="364" y2="126" stroke="rgb(245 158 11)" strokeWidth="3" />
      <text x="330" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C=C double · CₙH₂ₙ · ethene CH₂=CH₂</text>
      <rect x="440" y="55" width="180" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="530" y="80" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ALKYNE</text>
      <circle cx="485" cy="120" r="11" fill="rgb(239 68 68)" opacity="0.4" /><circle cx="575" cy="120" r="11" fill="rgb(239 68 68)" opacity="0.4" />
      {[112, 120, 128].map((yy) => <line key={yy} x1="496" y1={yy} x2="564" y2={yy} stroke="rgb(239 68 68)" strokeWidth="2.5" />)}
      <text x="530" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C≡C triple · CₙH₂ₙ₋₂ · ethyne HC≡CH</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Saturated = maximum hydrogen per carbon; unsaturated = multiple bond ready to add</text>
""")

FILES["alicyclic-vs-aromatic.tsx"] = wrap("AlicyclicVsAromatic",
 "Cyclohexane alicyclic ring versus benzene aromatic ring",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two rings, two behaviours</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ALICYCLIC — cyclohexane</text>
      <polygon points="180,95 216,116 202,158 158,158 144,116" fill="none" stroke="rgb(59 130 246)" strokeWidth="3" />
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-foreground">C₆H₁₂</text>
      <text x="180" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">ordinary aliphatic ring — adds readily, no π stabilisation</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">AROMATIC — benzene</text>
      <polygon points="480,95 516,116 502,158 458,158 444,116" fill="none" stroke="rgb(245 158 11)" strokeWidth="3" />
      <circle cx="480" cy="126" r="24" fill="none" stroke="rgb(245 158 11)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="480" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">delocalised π ring — extra stability, substitution over addition</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The ring is not the test — the delocalised π electrons are</text>
""")

FILES["heterocycle-trio.tsx"] = wrap("HeterocycleTrio",
 "Pyridine furan and pyrrole heterocyclic ring structures",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Heterocycles — a stranger in the ring</text>
      {[
        ["PYRIDINE", "N", "C₅H₅N", "rgb(59 130 246)", 130, "vitamin niacin's ring"],
        ["FURAN", "O", "C₄H₄O", "rgb(239 68 68)", 330, "furanose sugars"],
        ["PYRROLE", "NH", "C₄H₅N", "rgb(16 185 129)", 530, "chlorophyll + haem"],
      ].map(([n, at, f, col, cx, use]) => (
        <g key={n as string}>
          <rect x={(cx as number) - 85} y="50" width="170" height="130" rx="10" fill={col as string} opacity="0.07" stroke={col as string} />
          <text x={cx as number} y="74" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <polygon points={`${cx},92 ${cx + 30},112 ${cx + 19},148 ${cx - 19},148 ${cx - 30},112`} fill="none" stroke={col as string} strokeWidth="2.5" />
          <circle cx={cx as number} cy={at === "NH" ? 152 : 92} r="12" fill={col as string} opacity="0.25" />
          <text x={cx as number} y={(at === "NH" ? 156 : 96)} fontSize="9.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{at as string}</text>
          <text x={cx as number} y="172" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{f as string}</text>
          <text x={cx as number} y="192" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{use as string}</text>
        </g>
      ))}
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Hetero atom IN the ring (not a substituent) is the defining criterion</text>
""")

FILES["functional-family-map.tsx"] = wrap("FunctionalFamilyMap",
 "Functional groups mapped to their chemical families",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Group → family → example</text>
      <line x1="35" y1="48" x2="625" y2="48" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["GROUP", "FAMILY", "EXAMPLE"],
        ["–OH", "alcohol", "ethanol C₂H₅OH"],
        ["–CHO", "aldehyde", "ethanal CH₃CHO"],
        [">C=O", "ketone", "propanone CH₃COCH₃"],
        ["–COOH", "carboxylic acid", "acetic acid CH₃COOH"],
        ["–COOR", "ester", "ethyl acetate"],
        ["–X", "halide", "C₂H₅Cl"],
        ["–NH₂", "amine", "ethylamine C₂H₅NH₂"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={40 + [0, 180, 400][c]} y={68 + i * 22} fontSize={i ? "10.5" : "9.5"} fontWeight={i ? (c ? "400" : "800") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="35" y1={75 + i * 22} x2="625" y2={75 + i * 22} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="230" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">One group = one family = one set of reactions, whatever the skeleton</text>
""")

FILES["aromatic-stability-note.tsx"] = wrap("AromaticStabilityNote",
 "Delocalised pi electron stability of benzene favouring substitution",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Aromaticity is a stability statement</text>
      <polygon points="330,60 390,96 390,164 330,200 270,164 270,96" fill="none" stroke="rgb(245 158 11)" strokeWidth="3.5" />
      <circle cx="330" cy="130" r="42" fill="rgb(245 158 11)" opacity="0.12" />
      <circle cx="330" cy="130" r="42" fill="none" stroke="rgb(245 158 11)" strokeWidth="2" strokeDasharray="6 4" />
      <text x="330" y="124" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">6 π electrons</text>
      <text x="330" y="140" fontSize="9" fill="rgb(245 158 11)" textAnchor="middle">delocalised all round</text>
      <text x="560" y="80" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)">result 1:</text>
      <text x="560" y="100" fontSize="9.5" className="fill-current text-muted-foreground">extra stability —</text>
      <text x="560" y="118" fontSize="9.5" className="fill-current text-muted-foreground">the ring resists</text>
      <text x="560" y="136" fontSize="9.5" className="fill-current text-muted-foreground">being broken open</text>
      <text x="560" y="164" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)">result 2:</text>
      <text x="560" y="184" fontSize="9.5" className="fill-current text-muted-foreground">SUBSTITUTION preferred</text>
      <text x="560" y="202" fontSize="9.5" className="fill-current text-muted-foreground">over ADDITION</text>
      <text x="330" y="228" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">"Aromatic" = benzene-ring π stability, not any smell</text>
""")

FILES["classification-examples.tsx"] = wrap("ClassificationExamples",
 "Example compounds assigned to their correct classification leaves",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sort these four — where does each live?</text>
      {[
        ["ethyne HC≡CH", "open chain · unsaturated (alkyne)", "rgb(16 185 129)", 40, 55],
        ["cyclohexane", "closed chain · homocyclic · alicyclic", "rgb(245 158 11)", 340, 55],
        ["pyridine", "closed chain · heterocyclic (N)", "rgb(139 92 246)", 40, 125],
        ["naphthalene", "closed chain · aromatic", "rgb(239 68 68)", 340, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Full address = branch + sub-branch + leaf — quote all three levels in answers</text>
""")

# ---------------- row 100: alkyl / functional / homologous ----------------

FILES["alkyl-group-derivation.tsx"] = wrap("AlkylGroupDerivation",
 "Formation of alkyl groups by removing hydrogen from alkanes",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Alkane − one H = alkyl group (R–)</text>
      {[
        ["CH₄ methane", "− H", "CH₃– methyl", "rgb(59 130 246)", 55],
        ["C₂H₆ ethane", "− H", "C₂H₅– ethyl", "rgb(16 185 129)", 125],
        ["C₃H₈ propane", "− H", "C₃H₇– propyl / isopropyl", "rgb(245 158 11)", 195],
      ].map(([a, m, r, col, y]) => (
        <g key={a as string}>
          <text x="60" y={(y as number) + 5} fontSize="11.5" fontWeight="800" className="fill-current text-foreground">{a as string}</text>
          <text x="240" y={(y as number) + 5} fontSize="10.5" fill="rgb(239 68 68)">{m as string}</text>
          <path d="M 290 " + (y as number) + " L 340 " + (y as number) + "\" stroke=\"rgb(148 163 184)\" strokeWidth=\"2\" markerEnd=\"url(#agd-a)\" />
          <text x="360" y={(y as number) + 5} fontSize="11.5" fontWeight="800" fill={col as string}>{r as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">general formula CₙH₂ₙ₊₁ — monovalent, exists only attached inside molecules</text>
      <defs>
        <marker id="agd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["functional-group-gallery.tsx"] = wrap("FunctionalGroupGallery",
 "Gallery of common functional groups with their families",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The reactive patches</text>
      {[
        ["–OH", "alcohol", "rgb(59 130 246)", 40, 55],
        ["–CHO", "aldehyde", "rgb(16 185 129)", 240, 55],
        [">C=O", "ketone", "rgb(245 158 11)", 440, 55],
        ["–COOH", "acid", "rgb(239 68 68)", 40, 125],
        ["–X", "halide", "rgb(139 92 246)", 240, 125],
        ["–NH₂", "amine", "rgb(20 184 166)", 440, 125],
      ].map(([g, f, col, x, y]) => (
        <g key={f as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 26} fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{g as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 46} fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{f as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The C–C/C–H skeleton is inert; the group carries the chemistry — one group, one family</text>
""")

FILES["homologous-ladder-alkanols.tsx"] = wrap("HomologousLadderAlkanols",
 "Alkanol homologous series with rising boiling points",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The alkanol ladder — CₙH₂ₙ₊₁OH</text>
      {[
        ["CH₃OH", "methanol", "65 °C", 80, "rgb(59 130 246)", 60],
        ["C₂H₅OH", "ethanol", "78 °C", 300, "rgb(16 185 129)", 90],
        ["C₃H₇OH", "propan-1-ol", "97 °C", 520, "rgb(245 158 11)", 120],
      ].map(([f, n, bp, x, col, h]) => (
        <g key={n as string}>
          <rect x={(x as number) - 55} y={220 - (h as number)} width="110" height={h as number} rx="8" fill={col as string} opacity="0.35" />
          <text x={x as number} y={210 - (h as number)} fontSize="10" fontWeight="800" fill={col as string} textAnchor="middle">{bp as string}</text>
          <text x={x as number} y="232" fontSize="9.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f as string}</text>
          <text x={x as number} y="246" fontSize="0.1"> </text>
        </g>
      ))}
      <text x="300" y="70" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each rung adds one CH₂ (14 u) — b.p. climbs steadily</text>
      <text x="300" y="92" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">chemical behaviour stays uniform: all alcohols</text>
""")

FILES["ch2-increment-rule.tsx"] = wrap("Ch2IncrementRule",
 "Successive homologues differing by a CH2 unit of 14 mass units",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The CH₂ (14 u) rule</text>
      {["CH₃OH (32)", "+ CH₂ →", "C₂H₅OH (46)", "+ CH₂ →", "C₃H₇OH (60)"].map((t, i) => (
        <g key={i}>
          <text x={40 + i * 125} y="110" fontSize={i % 2 ? "11" : "11.5"} fontWeight={i % 2 ? "400" : "800"} textAnchor="middle" className={i % 2 ? "fill-current text-muted-foreground" : "fill-current text-foreground"}>{t}</text>
        </g>
      ))}
      <text x="330" y="150" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">successive members differ by exactly 14 mass units</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the arithmetic progression that first revealed homologous series</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same functional group throughout — only the skeleton grows</text>
""")

FILES["gradation-vs-uniformity.tsx"] = wrap("GradationVsUniformity",
 "Gradation of physical properties versus uniform chemical properties in a series",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Physics climbs; chemistry stays put</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">GRADATION (physical)</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">m.p. · b.p. · density · viscosity</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">rise smoothly with molecular mass</text>
      <text x="180" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">65 → 78 → 97 °C along the alkanols</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">UNIFORMITY (chemical)</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">same functional group → same reactions</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">all alkanols oxidise, esterify, dehydrate</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">similar preparations for every member</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">"Gradation" belongs to physical properties — chemical properties are similar, not graded</text>
""")

FILES["neb2022-homologue-panel.tsx"] = wrap("Neb2022HomologuePanel",
 "Key points of the NEB 2022 question on functional groups and homologous series",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NEB 2022 asked exactly this</text>
      <rect x="40" y="55" width="580" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeDasharray="5 3" />
      <text x="330" y="80" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">"Define functional group and homologous series. State three characteristics…</text>
      <text x="330" y="100" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">…and write the general formula of the alkanol series with two examples."</text>
      {[
        ["definition pair", "group = reactive patch; series = CH₂ ladder", "rgb(16 185 129)", 40, 130],
        ["3 characteristics", "general formula · 14 u step · gradation", "rgb(245 158 11)", 340, 130],
        ["alkanols", "CₙH₂ₙ₊₁OH — C₂H₅OH, C₃H₇OH", "rgb(139 92 246)", 40, 185, 580],
      ].map(([h, d, col, x, y, w]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width={w as number} height="42" rx="9" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 17} fontSize="10" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 34} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
""")

FILES["r-group-anatomy.tsx"] = wrap("RGroupAnatomy",
 "General structure of an organic molecule as R group plus functional group",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Anatomy of an organic molecule: R + X</text>
      <rect x="120" y="80" width="240" height="60" rx="12" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="240" y="118" fontSize="16" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">R–</text>
      <text x="240" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">alkyl skeleton (CₙH₂ₙ₊₁) — the inert body</text>
      <path d="M 365 110 L 415 110" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#rga-a)" />
      <rect x="420" y="80" width="180" height="60" rx="12" fill="rgb(239 68 68)" opacity="0.12" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="510" y="118" fontSize="16" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">–X</text>
      <text x="510" y="160" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">functional group — the reactive head</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">change R (skeleton length) → homologues of one family</text>
      <text x="330" y="218" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">change X (group) → a different family entirely</text>
      <defs>
        <marker id="rga-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
