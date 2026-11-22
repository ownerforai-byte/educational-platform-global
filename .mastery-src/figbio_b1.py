# Generates figure components for bio-inorganic rows 91-93 (21 figures).
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

# ---------------- cx91: introduction ----------------

FILES["essential-element-tiers.tsx"] = wrap("EssentialElementTiers",
 "Three tiers of essential elements from bulk CHON to trace elements",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">~25 essential elements, three tiers</text>
      <rect x="40" y="55" width="580" height="46" rx="8" fill="rgb(59 130 246)" opacity="0.14" stroke="rgb(59 130 246)" />
      <text x="56" y="76" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)">BULK — C, H, O, N</text>
      <text x="56" y="93" fontSize="10" className="fill-current text-muted-foreground">~99 % of body mass: framework, water, fuels</text>
      <rect x="40" y="107" width="580" height="46" rx="8" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="56" y="128" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)">MACRO-MINERALS — Ca, P, K, S, Na, Cl, Mg</text>
      <text x="56" y="145" fontSize="10" className="fill-current text-muted-foreground">grams per day: bones, electrolytes, enzymes</text>
      <rect x="40" y="159" width="580" height="46" rx="8" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="56" y="180" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)">TRACE — Fe, Zn, Cu, I, Co, Mn, Mo, Cr, Se, F</text>
      <text x="56" y="197" fontSize="10" className="fill-current text-muted-foreground">mg–µg per day: catalysts, hormones, O₂ carrier</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Of ~90 natural elements, only about 25 made the cut</text>
""")

FILES["metal-jobs-map.tsx"] = wrap("MetalJobsMap",
 "Four jobs of metal ions in biological systems with examples",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Four jobs for a metal ion</text>
      {[
        ["TRANSPORT", "Fe²⁺ in haemoglobin carries O₂", "rgb(239 68 68)", 40, 55],
        ["STRUCTURE", "Ca²⁺ builds bone (hydroxyapatite)", "rgb(148 163 184)", 340, 55],
        ["CATALYSIS", "Zn²⁺ in carbonic anhydrase", "rgb(59 130 246)", 40, 125],
        ["LIGHT + SIGNAL", "Mg²⁺ chlorophyll; Ca²⁺ triggers muscle", "rgb(16 185 129)", 340, 125],
      ].map(([j, ex, col, x, y]) => (
        <g key={j as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{j as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{ex as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">s-block ions work by charge and gradients; d-block ions by coordination chemistry</text>
""")

FILES["tier-need-chart.tsx"] = wrap("TierNeedChart",
 "Daily requirement comparison of bulk macro and trace elements on a log scale",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The requirement spans seven orders of magnitude</text>
      {[
        ["bulk (C,H,O,N)", "kg/day", 6.4, "rgb(59 130 246)"],
        ["macro-minerals", "grams/day", 5.0, "rgb(16 185 129)"],
        ["Fe, Zn, Cu", "mg/day", 3.2, "rgb(245 158 11)"],
        ["iodine", "150 µg/day", 2.0, "rgb(239 68 68)"],
      ].map(([s, v, w, col], i) => (
        <g key={s as string}>
          <text x="60" y={62 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{s as string}</text>
          <rect x="230" y={50 + i * 34} width={(w as number) * 58} height="16" rx="4" fill={col as string} opacity="0.6" />
          <text x={240 + (w as number) * 58} y={63 + i * 34} fontSize="9.5" className="fill-current text-muted-foreground">{v as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Log scale — each step is ×100. Trace means tiny, not trivial</text>
""")

FILES["metalloenzyme-panel.tsx"] = wrap("MetalloenzymePanel",
 "Carbonic anhydrase zinc active site catalysing carbon dioxide hydration",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Metalloenzyme: the metal does the chemistry</text>
      <rect x="40" y="55" width="300" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="190" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CARBONIC ANHYDRASE</text>
      <circle cx="190" cy="120" r="16" fill="rgb(148 163 184)" />
      <text x="190" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground">Zn²⁺</text>
      <text x="190" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">held by histidine residues</text>
      <text x="190" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">activates water → OH⁻ attacks CO₂</text>
      <path d="M 345 115 L 395 115" stroke="rgb(16 185 129)" strokeWidth="2.5" markerEnd="url(#mp-a)" />
      <rect x="400" y="55" width="220" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="510" y="82" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CO₂ + H₂O ⇌ H₂CO₃</text>
      <text x="510" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">⇌ HCO₃⁻ + H⁺</text>
      <text x="510" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">millions× faster than uncatalysed</text>
      <text x="510" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">blood CO₂ transport + lungs</text>
      <defs>
        <marker id="mp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Also: carboxypeptidase (Zn²⁺), catalase (Fe), nitrogenase (Fe–Mo)</text>
""")

FILES["chelate-ring-panel.tsx"] = wrap("ChelateRingPanel",
 "Chelate ring gripping a metal ion in chlorophyll haem and vitamin B12",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chelation — the ring that grips the metal</text>
      <ellipse cx="200" cy="125" rx="95" ry="60" fill="none" stroke="rgb(59 130 246)" strokeWidth="3" strokeDasharray="7 5" />
      <text x="200" y="70" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">porphyrin-type ring</text>
      {[[200, 65], [295, 125], [200, 185], [105, 125]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="rgb(59 130 246)" />
      ))}
      <circle cx="200" cy="125" r="14" fill="rgb(16 185 129)" />
      <text x="200" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">M</text>
      <text x="200" y="218" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">several donor atoms = one claw</text>
      {[
        ["chlorophyll", "Mg²⁺", "rgb(16 185 129)", 340],
        ["haem (Hb)", "Fe²⁺", "rgb(239 68 68)", 425],
        ["vitamin B₁₂", "Co", "rgb(245 158 11)", 510],
      ].map(([n, m, col, x]) => (
        <g key={n as string}>
          <rect x={(x as number) - 60} y="95" width="115" height="60" rx="8" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={x as number} y="118" fontSize="10" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <text x={x as number} y="140" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{m as string}</text>
        </g>
      ))}
      <text x="455" y="195" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">corrin ring</text>
""")

FILES["flagship-complexes.tsx"] = wrap("FlagshipComplexes",
 "Comparison of chlorophyll and haemoglobin as metal chelate complexes",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The two flagship complexes</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CHLOROPHYLL — Mg²⁺</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">chlorophyll a: C₅₅H₇₂O₅N₄Mg</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">absorbs red + blue light</text>
      <text x="180" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">drives photosynthesis</text>
      <text x="180" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">in chloroplasts</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HAEMOGLOBIN — Fe²⁺</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">4 haem groups → 4 O₂ per molecule</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">reversible O₂ binding</text>
      <text x="480" y="148" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">loads in lungs, unloads in tissues</text>
      <text x="480" y="168" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">in red blood cells</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same ring idea, different metal, opposite jobs — transport vs light</text>
""")

FILES["dose-window.tsx"] = wrap("DoseWindow",
 "Window of safety showing deficiency toxicity and essential dose range",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The window of safety</text>
      <path d="M 60 170 L 60 170" stroke="none" />
      <rect x="60" y="80" width="150" height="60" rx="0" fill="rgb(239 68 68)" opacity="0.15" />
      <rect x="210" y="60" width="240" height="80" rx="0" fill="rgb(16 185 129)" opacity="0.18" />
      <rect x="450" y="80" width="150" height="60" rx="0" fill="rgb(239 68 68)" opacity="0.15" />
      <text x="135" y="115" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">too little</text>
      <text x="135" y="133" fontSize="9.5" fill="rgb(239 68 68)" textAnchor="middle">deficiency disease</text>
      <text x="330" y="95" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">the window</text>
      <text x="330" y="113" fontSize="9.5" fill="rgb(16 185 129)" textAnchor="middle">essential and safe</text>
      <text x="525" y="115" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">too much</text>
      <text x="525" y="133" fontSize="9.5" fill="rgb(239 68 68)" textAnchor="middle">toxicity</text>
      <path d="M 60 160 L 600 160" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#dw-a)" />
      <text x="330" y="182" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">dose →</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Pb, Hg, Cd, As have NO window — no useful role at any dose</text>
      <defs>
        <marker id="dw-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

# ---------------- cx92: micro and macro nutrients ----------------

FILES["macro-seven-panel.tsx"] = wrap("MacroSevenPanel",
 "Seven macro minerals with their biological functions",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The macro seven — more than 100 mg/day</text>
      {[
        ["Ca", "bones, clotting, muscle", "rgb(59 130 246)"],
        ["P", "ATP, DNA, bones", "rgb(16 185 129)"],
        ["K", "intracellular cation, nerves", "rgb(245 158 11)"],
        ["Na", "extracellular cation, fluids", "rgb(239 68 68)"],
        ["Cl", "gastric HCl", "rgb(148 163 184)"],
        ["Mg", "chlorophyll, enzymes", "rgb(139 92 246)"],
        ["S", "proteins (Cys, Met)", "rgb(20 184 166)"],
      ].map(([m, job, col], i) => {
        const x = 40 + (i % 4) * 152;
        const y = 55 + Math.floor(i / 4) * 78;
        return (
          <g key={m as string}>
            <rect x={x} y={y} width="140" height="66" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
            <text x={x + 70} y={y + 24} fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{m as string}</text>
            <text x={x + 70} y={y + 44} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{job as string}</text>
          </g>
        );
      })}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Structure (Ca, P), electricity (Na, K, Cl), catalysis (Mg), protein (S)</text>
""")

FILES["trace-element-roster.tsx"] = wrap("TraceElementRoster",
 "Ten trace elements with their biological roles",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The trace ten — under 100 mg/day</text>
      {[
        ["Fe", "O₂ carrier (Hb)"], ["Zn", "carbonic anhydrase"], ["Cu", "haemocyanin"], ["I", "thyroxine"], ["Co", "vitamin B₁₂"],
        ["Mn", "enzymes"], ["Mo", "nitrogenase"], ["Cr", "glucose tolerance"], ["Se", "antioxidant"], ["F", "tooth enamel"],
      ].map(([m, job], i) => {
        const x = 40 + (i % 5) * 118;
        const y = 55 + Math.floor(i / 5) * 78;
        return (
          <g key={m as string}>
            <rect x={x} y={y} width="106" height="66" rx="8" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" strokeWidth="1" />
            <text x={x + 53} y={y + 24} fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">{m as string}</text>
            <text x={x + 53} y={y + 42} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{job as string}</text>
            <text x={x + 53} y={y + 56} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground"> </text>
          </g>
        );
      })}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Catalysts and switches — used over and over, never consumed in bulk</text>
""")

FILES["deficiency-disease-table.tsx"] = wrap("DeficiencyDiseaseTable",
 "Table of deficiency diseases with element function and prevention",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The deficiency disease table</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["ELEMENT", "NEEDED FOR", "DEFICIENCY DISEASE"],
        ["Fe", "haemoglobin", "anaemia"],
        ["I (~150 µg/day)", "thyroxine", "goitre"],
        ["Co (B₁₂)", "red blood cells", "pernicious anaemia"],
        ["Mg (plants)", "chlorophyll", "chlorosis"],
        ["F", "tooth enamel", "dental caries"],
        ["Cr", "glucose tolerance factor", "impaired glucose use"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + [0, 180, 380][c]} y={72 + i * 26} fontSize={i ? "10.5" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 26} x2="620" y2={80 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Each pair (element → disease) is worth a mark — learn them as couples</text>
""")

FILES["iodine-thyroxine-flow.tsx"] = wrap("IodineThyroxineFlow",
 "Iodine to thyroxine pathway and goitre prevention by iodised salt",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Iodine: ~150 µg/day runs the metabolism</text>
      {[
        ["dietary I", "iodised salt, seafood", "rgb(59 130 246)", 40],
        ["thyroid", "concentrates I", "rgb(245 158 11)", 205],
        ["thyroxine T₄/T₃", "metabolic rate hormone", "rgb(16 185 129)", 370],
        ["healthy body", "growth + development", "rgb(139 92 246)", 535],
      ].map(([s, d, col, x], i) => (
        <g key={s as string}>
          <rect x={x as number} y="70" width="120" height="60" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 60} y="94" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{s as string}</text>
          <text x={(x as number) + 60} y="114" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          {i < 3 && <path d={`M ${(x as number) + 122} 100 L ${(x as number) + 160} 100`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#itf-a)" />}
        </g>
      ))}
      <text x="330" y="165" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">no iodine → thyroid swells = GOITRE</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">fix: iodised common salt (KI/KIO₃ in NaCl) — chemistry's cheapest public-health win</text>
      <defs>
        <marker id="itf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["two-anaemias-panel.tsx"] = wrap("TwoAnaemiasPanel",
 "Iron deficiency anaemia versus pernicious anaemia from vitamin B12",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two anaemias, two different metals</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">IRON-DEFICIENCY ANAEMIA</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">missing metal: Fe²⁺ of haem</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">too little haemoglobin made</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pallor, fatigue, breathlessness</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">PERNICIOUS ANAEMIA</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">missing metal: Co of vitamin B₁₂</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">red cells fail to mature properly</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">immature, oversized cells</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cobalt never sits in haemoglobin — it works one step earlier, in cell division</text>
""")

FILES["chlorosis-panel.tsx"] = wrap("ChlorosisPanel",
 "Magnesium deficiency causing chlorosis in plant leaves",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chlorosis — the plant's anaemia</text>
      <ellipse cx="180" cy="115" rx="105" ry="45" fill="rgb(16 185 129)" opacity="0.55" stroke="rgb(16 185 129)" />
      <text x="180" y="112" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">healthy leaf</text>
      <text x="180" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Mg²⁺ in chlorophyll</text>
      <ellipse cx="450" cy="115" rx="105" ry="45" fill="rgb(250 204 21)" opacity="0.45" stroke="rgb(202 138 4)" />
      <text x="450" y="112" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(161 98 7)">Mg-deficient leaf</text>
      <text x="450" y="130" fontSize="9.5" textAnchor="middle" fill="rgb(161 98 7)">yellow = CHLOROSIS</text>
      <text x="315" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">No Mg²⁺ → no chlorophyll → no photosynthesis → stunted growth</text>
      <text x="315" y="208" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">remedy: magnesium salts in the soil (e.g. MgSO₄, Epsom salt)</text>
""")

FILES["macro-vs-micro-table.tsx"] = wrap("MacroVsMicroTable",
 "Comparison of macro nutrients and micro nutrients by requirement and role",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Macro vs micro — quantity, not importance</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "MACRO-NUTRIENTS", "MICRO-NUTRIENTS"],
        ["daily need", "> 100 mg/day", "< 100 mg/day"],
        ["members", "Ca, P, K, S, Na, Cl, Mg", "Fe, Zn, Cu, I, Co, Mn, Mo, Cr, Se, F"],
        ["typical role", "structure, bulk electrolytes", "catalysis, hormones"],
        ["deficiency e.g.", "hypocalcaemia, chlorosis", "anaemia, goitre, B₁₂ anaemia"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + [0, 165, 395][c]} y={72 + i * 30} fontSize={i ? "10" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 30} x2="620" y2={80 + i * 30} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="216" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">A million-fold dose gap between the tiers — and both are compulsory</text>
""")

# ---------------- cx93: ten-ion roster ----------------

FILES["ten-ion-roster.tsx"] = wrap("TenIonRoster",
 "Roster of ten biologically important metal ions with one-line roles",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ten ions, ten one-line jobs</text>
      {[
        ["Na⁺", "extracellular fluid, nerve", "rgb(239 68 68)"],
        ["K⁺", "intracellular, resting potential", "rgb(59 130 246)"],
        ["Mg²⁺", "chlorophyll, ATP activator", "rgb(16 185 129)"],
        ["Ca²⁺", "bone, muscle, clotting", "rgb(148 163 184)"],
        ["Fe²⁺", "O₂ transport (Hb)", "rgb(220 38 38)"],
        ["Cu", "haemocyanin, oxidase", "rgb(217 119 6)"],
        ["Zn²⁺", "carbonic anhydrase", "rgb(139 92 246)"],
        ["Ni", "urease", "rgb(20 184 166)"],
        ["Co", "vitamin B₁₂", "rgb(234 88 12)"],
        ["Cr", "glucose tolerance factor", "rgb(101 163 13)"],
      ].map(([m, job, col], i) => {
        const x = 40 + (i % 5) * 118;
        const y = 50 + Math.floor(i / 5) * 80;
        return (
          <g key={m as string}>
            <rect x={x} y={y} width="106" height="70" rx="8" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1" />
            <text x={x + 53} y={y + 26} fontSize="12.5" fontWeight="800" textAnchor="middle" fill={col as string}>{m as string}</text>
            <text x={x + 53} y={y + 46} fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">{job as string}</text>
          </g>
        );
      })}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">s-block: charge and gradients · d-block: coordination chemistry</text>
""")

FILES["na-k-pair-panel.tsx"] = wrap("NaKPairPanel",
 "Sodium outside potassium inside with the pump maintaining gradients",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na⁺ outside, K⁺ inside — the membrane battery</text>
      <rect x="60" y="55" width="540" height="120" rx="12" fill="rgb(59 130 246)" opacity="0.06" stroke="rgb(59 130 246)" strokeDasharray="4 3" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">cell membrane</text>
      <text x="140" y="105" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">OUTSIDE (blood/tissue fluid)</text>
      <text x="140" y="127" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Na⁺ HIGH — fluid balance, osmosis</text>
      <text x="140" y="147" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">carries the nerve impulse inward</text>
      <text x="520" y="105" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">INSIDE (cytoplasm)</text>
      <text x="520" y="127" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">K⁺ HIGH — resting potential</text>
      <text x="520" y="147" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">≈ −70 mV across the membrane</text>
      <path d="M 300 95 C 330 85, 330 85, 360 95" stroke="rgb(239 68 68)" strokeWidth="2.5" fill="none" markerEnd="url(#nkp-a)" />
      <text x="330" y="82" fontSize="9" fill="rgb(239 68 68)" textAnchor="middle">3 Na⁺ out</text>
      <path d="M 360 145 C 330 155, 330 155, 300 145" stroke="rgb(59 130 246)" strokeWidth="2.5" fill="none" markerEnd="url(#nkp-a)" />
      <text x="330" y="165" fontSize="9" fill="rgb(59 130 246)" textAnchor="middle">2 K⁺ in (per ATP)</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">The Na⁺/K⁺ pump keeps both gradients steep — nerves run on this battery</text>
      <defs>
        <marker id="nkp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["calcium-jobs-panel.tsx"] = wrap("CalciumJobsPanel",
 "Calcium roles from hydroxyapatite bone to blood clotting",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ca²⁺ — four careers</text>
      {[
        ["~99 % in bone", "hydroxyapatite Ca₁₀(PO₄)₆(OH)₂ — teeth too", "rgb(148 163 184)", 40, 55],
        ["muscle trigger", "the ion that says 'contract now'", "rgb(239 68 68)", 340, 55],
        ["blood clotting", "factor IV — citrate removes it, clotting stops", "rgb(59 130 246)", 40, 125],
        ["cell messenger", "short-lived intracellular signal", "rgb(16 185 129)", 340, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Deficiency: weak bones, poor clotting — excess never helps</text>
""")

FILES["hb-vs-chlorophyll-fig.tsx"] = wrap("HbVsChlorophyllFig",
 "Side by side comparison of haemoglobin iron and chlorophyll magnesium",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Function picks the metal</text>
      <ellipse cx="185" cy="120" rx="90" ry="55" fill="none" stroke="rgb(239 68 68)" strokeWidth="3" strokeDasharray="7 5" />
      <circle cx="185" cy="120" r="13" fill="rgb(220 38 38)" />
      <text x="185" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">Fe²⁺</text>
      <text x="185" y="196" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HAEM — transport</text>
      <text x="185" y="214" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">d-orbitals bind O₂ reversibly</text>
      <ellipse cx="475" cy="120" rx="90" ry="55" fill="none" stroke="rgb(16 185 129)" strokeWidth="3" strokeDasharray="7 5" />
      <circle cx="475" cy="120" r="13" fill="rgb(16 185 129)" />
      <text x="475" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">Mg²⁺</text>
      <text x="475" y="196" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CHLORIN — light</text>
      <text x="475" y="214" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">conjugated ring absorbs red + blue</text>
      <text x="330" y="75" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">both porphyrin-type chelate rings</text>
      <text x="330" y="95" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">swap the metals and neither works</text>
""")

FILES["co-hijack-panel.tsx"] = wrap("CoHijackPanel",
 "Carbon monoxide binding iron in carboxyhaemoglobin causing poisoning",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">CO hijacks the O₂ seat — ~200–250× tighter</text>
      <circle cx="200" cy="120" r="15" fill="rgb(220 38 38)" />
      <text x="200" y="125" fontSize="9" fill="rgb(255 255 255)" textAnchor="middle">Fe²⁺</text>
      <path d="M 218 112 C 250 95, 270 95, 295 108" stroke="rgb(59 130 246)" strokeWidth="2.5" fill="none" markerEnd="url(#chp-a)" />
      <text x="258" y="88" fontSize="10" fill="rgb(59 130 246)">O₂ (normal)</text>
      <path d="M 218 130 C 250 148, 270 148, 295 136" stroke="rgb(120 53 15)" strokeWidth="4" fill="none" markerEnd="url(#chp-b)" />
      <text x="258" y="163" fontSize="10" fill="rgb(120 53 15)">CO wins the seat</text>
      <rect x="305" y="95" width="130" height="55" rx="8" fill="rgb(120 53 15)" opacity="0.15" stroke="rgb(120 53 15)" />
      <text x="370" y="118" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(120 53 15)">carboxyhaemoglobin</text>
      <text x="370" y="138" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">cannot bind or release O₂</text>
      <rect x="460" y="70" width="160" height="105" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="540" y="94" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">POISONING</text>
      <text x="540" y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">tissues starved of O₂</text>
      <text x="540" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">headache → unconsciousness</text>
      <text x="540" y="154" fontSize="9.5" textAnchor="middle" fill="rgb(16 185 129)">treat: breathe pure O₂</text>
      <defs>
        <marker id="chp-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(59 130 246)" /></marker>
        <marker id="chp-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(120 53 15)" /></marker>
      </defs>
""")

FILES["d-block-vs-s-block.tsx"] = wrap("DBlockVsSBlock",
 "Division of biological metal roles between s-block and d-block ions",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Two toolkits in the metal drawer</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">s-BLOCK — charge + gradients</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Na⁺, K⁺, Mg²⁺, Ca²⁺</text>
      <text x="180" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">no redox — pure electricity,</text>
      <text x="180" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">structure and enzyme switching</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">d-BLOCK — coordination chemistry</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">Fe, Cu, Zn, Ni, Co, Cr</text>
      <text x="480" y="132" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">bind O₂, substrates, ligands</text>
      <text x="480" y="150" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">at specific sites; redox capable</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Nerves are s-block physics; enzymes are d-block chemistry</text>
""")

FILES["zinc-ni-cr-panel.tsx"] = wrap("ZincNiCrPanel",
 "Zinc nickel and chromium biological roles panel",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Zn²⁺, Ni and Cr — the quiet specialists</text>
      {[
        ["Zn²⁺", "carbonic anhydrase + carboxypeptidase; stores insulin; heals wounds", "rgb(139 92 246)", 40, 55],
        ["Ni", "urease — the enzyme that hydrolyses urea", "rgb(20 184 166)", 40, 125],
        ["Cr", "glucose tolerance factor — assists insulin in glucose uptake", "rgb(101 163 13)", 40, 195],
      ].map(([m, d, col, x, y]) => (
        <g key={m as string}>
          <rect x={x as number} y={y as number} width="580" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 20} y={(y as number) + 35} fontSize="13" fontWeight="800" fill={col as string}>{m as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 35} fontSize="10.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Zn²⁺ is d¹⁰ — it works as a Lewis acid, never by redox</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
