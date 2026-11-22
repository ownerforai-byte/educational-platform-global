# Generates figure components for chemistry rows 82-84 (21 figures).
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

# ---------------- cx82: refining ----------------

FILES["refining-method-picker.tsx"] = wrap("RefiningMethodPicker",
 "Decision map choosing a refining method from the metal property",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Pick the refining method by the property</text>
      {[
        ["volatile?", "DISTILLATION", "Zn (907 °C) · Hg · Cd", "rgb(59 130 246)", 30],
        ["low melting?", "LIQUATION", "Sn (232 °C) · Pb — sloping hearth", "rgb(16 185 129)", 250],
        ["oxide in melt?", "POLING", "crude Cu — green wood poles", "rgb(245 158 11)", 470],
      ].map(([q, method, detail, col, x]) => (
        <g key={method as string}>
          <rect x={x as number} y="55" width="180" height="115" rx="10" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 90} y="80" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">{q as string}</text>
          <text x={(x as number) + 90} y="104" fontSize="12" fontWeight="800" textAnchor="middle" fill={col as string}>{method as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{detail as string}</text>
        </g>
      ))}
      <rect x="180" y="180" width="300" height="42" rx="8" fill="rgb(139 92 246)" opacity="0.12" stroke="rgb(139 92 246)" />
      <text x="330" y="198" fontSize="11.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">need 99.99 %? → ELECTROREFINING</text>
      <text x="330" y="214" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Cu · Ag · Au · Ni</text>
""")

FILES["distillation-refining.tsx"] = wrap("DistillationRefining",
 "Retort distillation refining of volatile zinc",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Distillation — volatility is the filter</text>
      <rect x="120" y="70" width="180" height="80" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="210" y="98" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">RETORT · 1000 °C</text>
      <text x="210" y="120" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">impure Zn + Fe, Pb</text>
      <path d="M 300 110 L 420 110" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#dr-a)" />
      <text x="360" y="100" fontSize="9.5" textAnchor="middle" fill="rgb(59 130 246)">Zn vapour</text>
      <rect x="425" y="75" width="150" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="500" y="100" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CONDENSER</text>
      <text x="500" y="122" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pure Zn collects</text>
      <text x="210" y="185" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Fe (bp 2861 °C) and Pb (bp 1749 °C) stay behind</text>
      <defs>
        <marker id="dr-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
      </defs>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Zinc boils 907 °C — a thousand degrees below its impurities</text>
""")

FILES["liquation-hearth.tsx"] = wrap("LiquationHearth",
 "Liquation furnace with inclined hearth letting low melting tin flow away from impurities",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Liquation — let the metal flow away</text>
      <path d="M 150 80 L 480 150" stroke="rgb(148 163 184)" strokeWidth="10" strokeLinecap="round" />
      <rect x="160" y="58" width="90" height="26" rx="5" fill="rgb(148 163 184)" opacity="0.5" />
      <text x="205" y="50" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">impure Sn block</text>
      <path d="M 250 92 C 300 110, 380 128, 470 146" stroke="rgb(16 185 129)" strokeWidth="5" fill="none" opacity="0.8" />
      <rect x="470" y="140" width="120" height="50" rx="8" fill="rgb(16 185 129)" opacity="0.15" stroke="rgb(16 185 129)" />
      <text x="530" y="162" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">pure Sn</text>
      <text x="530" y="180" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">collects below</text>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">hearth held just above 232 °C — Fe and C stay put on the slope</text>
      <text x="80" y="110" fontSize="10.5" className="fill-current text-muted-foreground">Sn melts at</text>
      <text x="80" y="128" fontSize="10.5" className="fill-current text-muted-foreground">232 °C —</text>
      <text x="80" y="146" fontSize="10.5" className="fill-current text-muted-foreground">gravity is</text>
      <text x="80" y="164" fontSize="10.5" className="fill-current text-muted-foreground">the refiner</text>
""")

FILES["poling-green-wood.tsx"] = wrap("PolingGreenWood",
 "Poling of molten crude copper with green wood poles releasing reducing hydrocarbons",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Poling — green wood as reducing agent</text>
      <rect x="200" y="80" width="260" height="100" rx="10" fill="rgb(239 68 68)" opacity="0.2" stroke="rgb(239 68 68)" strokeWidth="2" />
      <text x="330" y="105" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">molten crude Cu (with Cu₂O)</text>
      <line x1="260" y1="45" x2="290" y2="110" stroke="rgb(101 67 33)" strokeWidth="7" strokeLinecap="round" />
      <line x1="400" y1="45" x2="370" y2="110" stroke="rgb(101 67 33)" strokeWidth="7" strokeLinecap="round" />
      <text x="330" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">stirring collects dross</text>
      <text x="70" y="100" fontSize="10.5" className="fill-current text-muted-foreground">green wood gives:</text>
      <text x="70" y="120" fontSize="10.5" fill="rgb(16 185 129)">hydrocarbons →</text>
      <text x="70" y="138" fontSize="10.5" fill="rgb(16 185 129)">reduce Cu₂O → Cu</text>
      <text x="70" y="160" fontSize="10.5" fill="rgb(59 130 246)">steam → stirs +</text>
      <text x="70" y="178" fontSize="10.5" fill="rgb(59 130 246)">shields from air</text>
      <text x="545" y="110" fontSize="10.5" className="fill-current text-muted-foreground">dry wood would</text>
      <text x="545" y="128" fontSize="10.5" className="fill-current text-muted-foreground">only stir —</text>
      <text x="545" y="146" fontSize="10.5" className="fill-current text-muted-foreground">green is the point</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">2Cu₂O + C → 4Cu + CO₂ (via wood gases)</text>
""")

FILES["copper-electrorefining.tsx"] = wrap("CopperElectrorefining",
 "Electrolytic refining tank for copper with impure anode pure cathode and anode mud",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Electrolytic refining of copper</text>
      <rect x="140" y="55" width="380" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">electrolyte: acidified CuSO₄ solution</text>
      <rect x="170" y="80" width="16" height="75" fill="rgb(239 68 68)" opacity="0.8" />
      <text x="178" y="172" fontSize="9.5" fill="rgb(239 68 68)" textAnchor="middle">impure Cu ANODE</text>
      <rect x="474" y="80" width="16" height="75" fill="rgb(59 130 246)" opacity="0.8" />
      <text x="482" y="172" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">pure Cu CATHODE</text>
      <path d="M 190 110 L 470 110" stroke="rgb(245 158 11)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#cer-a)" />
      <text x="330" y="102" fontSize="10" textAnchor="middle" fill="rgb(245 158 11)">Cu²⁺ shuttles across</text>
      <ellipse cx="200" cy="160" rx="26" ry="7" fill="rgb(245 158 11)" opacity="0.6" />
      <text x="200" y="196" fontSize="9.5" fill="rgb(245 158 11)" textAnchor="middle">anode mud: Ag, Au, Pt</text>
      <defs>
        <marker id="cer-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">anode: Cu → Cu²⁺ + 2e⁻ · cathode: Cu²⁺ + 2e⁻ → Cu (99.99 %)</text>
""")

FILES["anode-mud-value.tsx"] = wrap("AnodeMudValue",
 "Anode mud composition showing noble metals recovered from copper refining",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The mud that pays the bill</text>
      <rect x="60" y="60" width="540" height="60" rx="10" fill="rgb(148 163 184)" opacity="0.15" />
      <text x="330" y="85" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">impure copper anode — 99 % Cu plus passengers:</text>
      <text x="330" y="106" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Zn · Fe · Ni · Ag · Au · Pt</text>
      <path d="M 200 125 L 140 170" stroke="rgb(239 68 68)" strokeWidth="2" markerEnd="url(#amv-a)" />
      <path d="M 330 125 L 330 170" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#amv-a)" />
      <path d="M 460 125 L 520 170" stroke="rgb(59 130 246)" strokeWidth="2" markerEnd="url(#amv-a)" />
      <rect x="60" y="175" width="160" height="46" rx="8" fill="rgb(239 68 68)" opacity="0.12" />
      <text x="140" y="194" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">baser → stay dissolved</text>
      <text x="140" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn²⁺ Fe²⁺ Ni²⁺ in electrolyte</text>
      <rect x="250" y="175" width="160" height="46" rx="8" fill="rgb(16 185 129)" opacity="0.12" />
      <text x="330" y="194" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Cu → plates on cathode</text>
      <text x="330" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">99.99 % electrolytic copper</text>
      <rect x="440" y="175" width="160" height="46" rx="8" fill="rgb(59 130 246)" opacity="0.12" />
      <text x="520" y="194" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">noble → anode mud</text>
      <text x="520" y="211" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Ag Au Pt — sold, funds refining</text>
      <defs>
        <marker id="amv-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["electrorefining-selectivity.tsx"] = wrap("ElectrorefiningSelectivity",
 "Electrode potential sorting explaining why only copper transfers in electrorefining",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One tank, three-way sorting</text>
      <line x1="80" y1="60" x2="580" y2="60" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      {[
        ["Zn²⁺/Zn", "−0.76", "baser — ionises, never deposits", "rgb(239 68 68)", 150],
        ["Cu²⁺/Cu", "+0.34", "the shuttle — leaves anode, lands cathode", "rgb(16 185 129)", 330],
        ["Ag⁺/Ag", "+0.80", "nobler — refuses to ionise → mud", "rgb(59 130 246)", 500],
      ].map(([pair, v, role, col, x]) => (
        <g key={pair as string}>
          <circle cx={x as number} cy="60" r="6" fill={col as string} />
          <text x={x as number} y="84" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{pair as string}</text>
          <text x={x as number} y="100" fontSize="10" textAnchor="middle" fill={col as string}>{v as string} V</text>
          <text x={x as number} y="120" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{role as string}</text>
        </g>
      ))}
      <text x="330" y="160" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Cu is the only metal that both leaves the anode and accepts electrons at the cathode</text>
      <text x="330" y="184" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Baser ions wait in solution; nobler atoms fall as mud — selectivity by electrode potential</text>
""")

# ---------------- cx83: alkali metals ----------------

FILES["alkali-metal-family.tsx"] = wrap("AlkaliMetalFamily",
 "Group one alkali metals column with outer ns one configuration",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Group IA — one electron defines the family</text>
      {["Li [He]2s¹", "Na [Ne]3s¹", "K [Ar]4s¹", "Rb [Kr]5s¹", "Cs [Xe]6s¹", "Fr [Rn]7s¹"].map((m, i) => (
        <g key={m}>
          <rect x="60" y={44 + i * 26} width="220" height="22" rx="5" fill="rgb(59 130 246)" opacity={0.35 - i * 0.04} />
          <text x="75" y={60 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m}</text>
        </g>
      ))}
      <text x="330" y="70" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">one ns¹ electron over a noble-gas core</text>
      <text x="330" y="94" fontSize="10.5" className="fill-current text-muted-foreground">→ lost easily, +1 only, no other state</text>
      <text x="330" y="122" fontSize="10.5" className="fill-current text-muted-foreground">→ soft, low-melting, light metals</text>
      <text x="330" y="150" fontSize="10.5" className="fill-current text-muted-foreground">→ strongest reducing agents; MOH strongest bases</text>
      <text x="330" y="178" fontSize="10.5" className="fill-current text-muted-foreground">→ compounds ionic, colourless, water-soluble</text>
""")

FILES["alkali-trend-ladder.tsx"] = wrap("AlkaliTrendLadder",
 "Trends down group one with ionisation energies falling and reactivity rising",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Down the group: everything loosens</text>
      {[
        ["Li", "520 kJ/mol", 0.85],
        ["Na", "496", 0.72],
        ["K", "419", 0.58],
        ["Rb", "403", 0.45],
        ["Cs", "376", 0.32],
      ].map(([m, ie, w]) => (
        <g key={m as string}>
          <text x="60" y={0} />
          <rect x="70" y="0" width="0" height="0" />
        </g>
      ))}
      {[
        ["Li", "520 kJ/mol", 0.85], ["Na", "496", 0.72], ["K", "419", 0.58], ["Rb", "403", 0.45], ["Cs", "376", 0.32],
      ].map(([m, ie, w], i) => (
        <g key={"r" + i}>
          <text x="60" y={58 + i * 26} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{m as string}</text>
          <rect x="100" y={46 + i * 26} width={(w as number) * 260} height="14" rx="4" fill="rgb(59 130 246)" opacity="0.55" />
          <text x={110 + (w as number) * 260} y={58 + i * 26} fontSize="9.5" fill="rgb(59 130 246)">{ie as string}</text>
        </g>
      ))}
      <text x="450" y="70" fontSize="11" fontWeight="800" fill="rgb(239 68 68)">IE falls ↓</text>
      <text x="450" y="94" fontSize="10.5" className="fill-current text-muted-foreground">new shell, more</text>
      <text x="450" y="112" fontSize="10.5" className="fill-current text-muted-foreground">shielding, farther out</text>
      <text x="450" y="146" fontSize="11" fontWeight="800" fill="rgb(16 185 129)">reactivity rises ↓</text>
      <text x="450" y="170" fontSize="10.5" className="fill-current text-muted-foreground">fizz → burn → explode</text>
      <text x="450" y="194" fontSize="10.5" className="fill-current text-muted-foreground">mp 181 → 28 °C</text>
""")

FILES["alkali-water-reaction.tsx"] = wrap("AlkaliWaterReaction",
 "Escalating reaction of alkali metals with water from lithium fizz to caesium explosion",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">2M + 2H₂O → 2MOH + H₂ — the escalation</text>
      {[
        ["Li", "steady fizz", 30], ["Na", "melts, skates, yellow flame", 155], ["K", "ignites instantly, lilac", 300],
        ["Rb", "explodes", 445], ["Cs", "explodes violently", 560],
      ].map(([m, act, x]) => (
        <g key={m as string}>
          <rect x={x as number} y="60" width="115" height="80" rx="8" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
          <text x={(x as number) + 57} y="86" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={(x as number) + 57} y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{act as string}</text>
          <text x={(x as number) + 57} y="126" fontSize="9" textAnchor="middle" fill="rgb(16 185 129)">MOH + H₂↑</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Products are the strongest bases in common chemistry; H₂ ignites from reaction heat</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Escalation driver: ionisation energy falls 520 → 376 kJ/mol down the group</text>
""")

FILES["alkali-flame-colours.tsx"] = wrap("AlkaliFlameColours",
 "Flame colours of the alkali metals from crimson lithium to blue caesium",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The flame tells you who is burning</text>
      {[
        ["Li", "crimson", "rgb(220 38 38)"], ["Na", "golden-yellow 589 nm", "rgb(250 204 21)"],
        ["K", "lilac", "rgb(167 139 250)"], ["Rb", "red-violet", "rgb(192 132 252)"], ["Cs", "blue", "rgb(96 165 250)"],
      ].map(([m, col_name, hex], i) => (
        <g key={m as string}>
          <path d={`M ${50 + i * 124} 170 Q ${112 + i * 124} 60 ${174 + i * 124} 170 Z`} fill={hex as string} opacity="0.5" />
          <text x={112 + i * 124} y="188" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
          <text x={112 + i * 124} y="205" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{col_name as string}</text>
        </g>
      ))}
      <text x="330" y="46" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Excited s-electron falls back and emits its line spectrum</text>
      <text x="330" y="64" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na D-lines overwhelm everything — view K through cobalt glass</text>
""")

FILES["oxide-ladder-ia.tsx"] = wrap("OxideLadderIa",
 "Oxide ladder of alkali metals from normal oxide through peroxide to superoxide",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Burning in air — the oxide ladder</text>
      {[
        ["Li", "Li₂O", "normal oxide O²⁻", "4Li + O₂ → 2Li₂O", "rgb(59 130 246)", 30],
        ["Na", "Na₂O₂", "peroxide O₂²⁻", "2Na + O₂ → Na₂O₂", "rgb(245 158 11)", 250],
        ["K", "KO₂", "superoxide O₂⁻", "K + O₂ → KO₂", "rgb(239 68 68)", 470],
      ].map(([m, f, ion, eq, col, x]) => (
        <g key={m as string}>
          <rect x={x as number} y="55" width="180" height="115" rx="10" fill={col as string} opacity="0.1" stroke={col as string} />
          <text x={(x as number) + 90} y="80" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string} → {f as string}</text>
          <text x={(x as number) + 90} y="102" fontSize="10" textAnchor="middle" fill={col as string}>{ion as string}</text>
          <text x={(x as number) + 90} y="126" fontSize="10" textAnchor="middle" className="fill-current text-foreground">{eq as string}</text>
          <text x={(x as number) + 90} y="152" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{["smallest cation", "bleaches, O₂ source", "paramagnetic, O₂ masks"][x === 30 ? 0 : x === 250 ? 1 : 2]}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Bigger cation stabilises bigger oxygen anion</text>
""")

FILES["lithium-exceptions.tsx"] = wrap("LithiumExceptions",
 "Panel of lithium anomalies within the alkali metal group",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lithium — the family dissenter</text>
      {[
        ["Burns to the NORMAL oxide", "Li₂O — not a peroxide like Na"],
        ["Forms the nitride directly", "6Li + N₂ → 2Li₃N — no other alkali does"],
        ["Salts poorly soluble", "Li₂CO₃, LiF, Li₃PO₄ — opposite of the group"],
        ["Covalent character", "tiny Li⁺ polarises anions (Fajans)"],
      ].map(([head, sub], i) => (
        <g key={head as string}>
          <rect x="40" y={50 + i * 38} width="580" height="32" rx="7" fill="rgb(139 92 246)" opacity="0.1" />
          <text x="58" y={71 + i * 38} fontSize="11" fontWeight="800" fill="rgb(139 92 246)">{head as string}</text>
          <text x="360" y={71 + i * 38} fontSize="10.5" className="fill-current text-muted-foreground">{sub as string}</text>
        </g>
      ))}
      <text x="330" y="216" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cause: Li⁺ is tiny and heavily hydrated — high charge density, strong polarisation</text>
""")

FILES["alkali-property-table.tsx"] = wrap("AlkaliPropertyTable",
 "Physical property table of the alkali metals with melting points and densities",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Physical facts of Group IA</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["M", "mp °C", "g/mL", "flame", "on water"],
        ["Li", "181", "0.53", "crimson", "floats, fizzes"],
        ["Na", "98", "0.97", "golden-yellow", "floats, burns"],
        ["K", "63", "0.86", "lilac", "floats, ignites"],
        ["Rb", "39", "1.53", "red-violet", "sinks, explodes"],
        ["Cs", "28", "1.93", "blue", "sinks, explodes"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2, 3, 4].map((c) => (
            <text key={c} x={45 + c * 118} y={72 + i * 26} fontSize={i ? "11" : "10.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 26} x2="620" y2={80 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="224" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">mp falls steadily; density rises with the famous Na/K dip below 1 — they float</text>
""")

# ---------------- cx84: sodium ----------------

FILES["downs-cell-diagram.tsx"] = wrap("DownsCellDiagram",
 "Labelled Downs cell for sodium extraction with anode cathode diaphragm and collectors",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The Downs cell</text>
      <rect x="150" y="55" width="360" height="125" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">fused NaCl + CaCl₂ (42 : 58), ~600 °C</text>
      <rect x="322" y="82" width="16" height="60" fill="rgb(56 56 56)" stroke="rgb(148 163 184)" />
      <text x="330" y="158" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">graphite ANODE · 2Cl⁻ → Cl₂ + 2e⁻</text>
      <path d="M 300 90 L 300 145" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 360 90 L 360 145" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="330" y="98" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">steel gauze diaphragm</text>
      <rect x="220" y="88" width="40" height="30" rx="4" fill="rgb(147 197 253)" stroke="rgb(59 130 246)" />
      <text x="240" y="82" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">Na bell — floats up</text>
      <text x="240" y="136" fontSize="9.5" fill="rgb(59 130 246)" textAnchor="middle">steel CATHODE · Na⁺ + e⁻ → Na</text>
      <path d="M 470 100 L 500 100" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#dcd-a)" />
      <text x="512" y="104" fontSize="9.5" fill="rgb(16 185 129)">Cl₂ out</text>
      <defs>
        <marker id="dcd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Diaphragm keeps Na from Cl₂ (they would recombine); Ca²⁺ stays unreduced in the melt</text>
      <text x="330" y="224" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">overall: 2NaCl(l) → 2Na + Cl₂</text>
""")

FILES["downs-why-cacl2.tsx"] = wrap("DownsWhyCacl2",
 "Temperature margin panel showing calcium chloride lowering the melting point of sodium chloride",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why CaCl₂? A 200-degree life line</text>
      {[
        ["pure NaCl", "mp 801 °C", "rgb(239 68 68)", 70],
        ["NaCl + CaCl₂ 42:58", "mp ≈ 600 °C", "rgb(16 185 129)", 70],
      ].map(([label, v, col, x], i) => (
        <g key={label as string}>
          <rect x={x as number} y={60 + i * 55} width={(i ? 400 : 530)} height="34" rx="6" fill={col as string} opacity="0.18" />
          <text x={(x as number) + 12} y={82 + i * 55} fontSize="11" fontWeight="800" fill={col as string}>{label as string}</text>
          <text x={(x as number) + (i ? 410 : 540)} y={82 + i * 55} fontSize="11" textAnchor="end" className="fill-current text-foreground">{v as string}</text>
        </g>
      ))}
      <line x1="70" y1="180" x2="600" y2="180" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      <text x="600" y="196" fontSize="9.5" textAnchor="end" fill="rgb(239 68 68)">Na boils at 883 °C</text>
      <text x="70" y="196" fontSize="9.5" fill="rgb(59 130 246)">eutectic melt 600 °C</text>
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The eutectic buys the safety margin; CaCl₂ also boosts conductivity — and Ca²⁺ is never discharged</text>
""")

FILES["sodium-reactions-map.tsx"] = wrap("SodiumReactionsMap",
 "Reaction map of sodium with oxygen water acids hydrogen chlorine and ammonia",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sodium — the reaction checklist</text>
      {[
        ["O₂ limited", "4Na + O₂ → 2Na₂O", "rgb(148 163 184)", 30, 55],
        ["O₂ excess", "2Na + O₂ → Na₂O₂", "rgb(245 158 11)", 340, 55],
        ["H₂O", "2Na + 2H₂O → 2NaOH + H₂↑", "rgb(59 130 246)", 30, 110],
        ["HCl", "2Na + 2HCl → 2NaCl + H₂↑", "rgb(139 92 246)", 340, 110],
        ["H₂", "2Na + H₂ → 2NaH (H⁻)", "rgb(16 185 129)", 30, 165],
        ["NH₃(l), Fe cat", "Na + NH₃ → NaNH₂ + ½H₂", "rgb(239 68 68)", 340, 165],
      ].map(([re, eq, col, x, y]) => (
        <g key={re as string}>
          <rect x={x as number} y={y as number} width="290" height="42" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 17} fontSize="9.5" fontWeight="800" fill={col as string}>{re as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 34} fontSize="10" className="fill-current text-foreground">{eq as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">NH₃ gas + Na at room temperature: no reaction — needs the liquid route or heat</text>
""")

FILES["sodium-water-skate.tsx"] = wrap("SodiumWaterSkate",
 "Sodium skating on water surface melting from reaction heat and pushed by hydrogen jets",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sodium on water — physics meets chemistry</text>
      <rect x="120" y="120" width="420" height="55" rx="6" fill="rgb(59 130 246)" opacity="0.15" stroke="rgb(59 130 246)" />
      <text x="330" y="190" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">water trough</text>
      <ellipse cx="260" cy="118" rx="22" ry="9" fill="rgb(245 158 11)" opacity="0.85" />
      <text x="260" y="104" fontSize="9.5" fill="rgb(245 158 11)" textAnchor="middle">molten Na ball (mp 98 °C)</text>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M ${252 + i * 8} 112 L ${248 + i * 8} ${92 - i * 4}`} stroke="rgb(148 163 184)" strokeWidth="1.5" markerEnd="url(#sws-a)" />
      ))}
      <text x="330" y="72" fontSize="9.5" textAnchor="middle" fill="rgb(148 163 184)">H₂ jets push it along; reaction heat keeps it molten</text>
      <text x="545" y="100" fontSize="10" className="fill-current text-muted-foreground">yellow flame as</text>
      <text x="545" y="118" fontSize="10" className="fill-current text-muted-foreground">H₂ ignites in air</text>
      <defs>
        <marker id="sws-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2Na + 2H₂O → 2NaOH + H₂↑ — strongly exothermic, self-accelerating</text>
""")

FILES["na2o2-bleach.tsx"] = wrap("Na2o2Bleach",
 "Sodium peroxide bleaching and oxygen generation chemistry",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na₂O₂ — bleach and breath</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">BLEACHING</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">peroxide ion O₂²⁻</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">liberates nascent oxygen</text>
      <text x="180" y="154" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">oxidises colouring matter</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">OXYGEN MASKS</text>
      <text x="480" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2Na₂O₂ + 2CO₂ → 2Na₂CO₃ + O₂</text>
      <text x="480" y="134" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">exhaled CO₂ feeds the O₂ release</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">closed-loop breathing apparatus</text>
      <text x="330" y="215" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One compound, two jobs: oxidise stains, regenerate air</text>
""")

FILES["sodium-uses-map.tsx"] = wrap("SodiumUsesMap",
 "Uses of sodium metal mapped to the property that enables each",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sodium at work</text>
      {[
        ["Na vapour lamp", "589 nm D-lines — the amber street light", "rgb(250 204 21)", 30, 55],
        ["Reactor coolant", "liquid metal, huge heat capacity, mp 98 °C", "rgb(239 68 68)", 340, 55],
        ["Reducing agent", "Ti from TiCl₄, Zr from ZrCl₄", "rgb(59 130 246)", 30, 115],
        ["Na₂O₂ / NaOH source", "peroxide bleach; chlor-alkali feedstock", "rgb(16 185 129)", 340, 115],
        ["Lab desiccant", "dries ethers — reacts, not adsorbs", "rgb(139 92 246)", 30, 175],
        ["NaPb alloy", "antiknock lead additive precursor", "rgb(148 163 184)", 340, 175],
      ].map(([u, why, col, x, y]) => (
        <g key={u as string}>
          <rect x={x as number} y={y as number} width="290" height="48" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
          <text x={(x as number) + 12} y={(y as number) + 19} fontSize="10.5" fontWeight="800" fill={col as string}>{u as string}</text>
          <text x={(x as number) + 12} y={(y as number) + 37} fontSize="9.5" className="fill-current text-muted-foreground">{why as string}</text>
        </g>
      ))}
""")

FILES["nacl-vs-mgcl2-cells.tsx"] = wrap("NaclVsMgcl2Cells",
 "Comparison of Downs sodium cell with fused magnesium chloride electrolysis",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Downs cell vs Mg cell — same idea, two temperatures</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "Na (Downs)", "Mg"],
        ["electrolyte", "NaCl + CaCl₂ 42:58", "fused MgCl₂ + NaCl, CaCl₂"],
        ["temperature", "~600 °C", "~700 °C"],
        ["cathode", "steel; Na⁺ + e⁻ → Na (bell)", "iron pot; Mg²⁺ + 2e⁻ → Mg"],
        ["anode", "graphite; Cl₂", "graphite; Cl₂"],
        ["separator", "steel gauze diaphragm", "diaphragm + prompt withdrawal"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + c * 195} y={70 + i * 26} fontSize={i ? "10.5" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={78 + i * 26} x2="620" y2={78 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Both float their metal; both keep Cl₂ away from it chemically, not physically alone</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
