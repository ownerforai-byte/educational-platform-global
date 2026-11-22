# Generates figure components for bio-inorganic rows 94-95 (14 figures).
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

# ---------------- cx94: ion pumps ----------------

FILES["passive-vs-active.tsx"] = wrap("PassiveVsActive",
 "Passive transport down the gradient versus active transport against it",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Downhill is free; uphill costs ATP</text>
      <rect x="40" y="55" width="280" height="125" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">PASSIVE (diffusion)</text>
      <path d="M 100 130 L 260 130" stroke="rgb(16 185 129)" strokeWidth="3" markerEnd="url(#pva-a)" />
      <text x="180" y="120" fontSize="10" textAnchor="middle" className="fill-current text-foreground">down the gradient</text>
      <text x="180" y="155" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">no energy needed (O₂ into blood)</text>
      <rect x="340" y="55" width="280" height="125" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ACTIVE transport</text>
      <path d="M 400 130 L 560 130" stroke="rgb(239 68 68)" strokeWidth="3" markerEnd="url(#pva-b)" />
      <text x="480" y="120" fontSize="10" textAnchor="middle" className="fill-current text-foreground">AGAINST the gradient</text>
      <text x="480" y="155" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">energy required (Na⁺/K⁺ pump, ATP)</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Direction relative to the gradient + energy source = the two test marks</text>
      <defs>
        <marker id="pva-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
        <marker id="pva-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
""")

FILES["primary-vs-secondary.tsx"] = wrap("PrimaryVsSecondary",
 "Primary active transport using ATP versus secondary using an ion gradient",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Primary pays ATP; secondary spends a gradient</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">PRIMARY</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">direct energy: ATP hydrolysis</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na⁺/K⁺ pump — 3 Na⁺ out, 2 K⁺ in</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">both ions against gradients</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">SECONDARY</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">energy: another ion's gradient</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Na⁺–glucose symport — Na⁺ down,</text>
      <text x="480" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">glucose up; ATP was spent upstream</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same family, different paymaster — name which is which</text>
""")

FILES["na-k-pump-cycle.tsx"] = wrap("NaKPumpCycle",
 "Sodium potassium ATPase cycle pumping three sodium out and two potassium in",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na⁺/K⁺ ATPase — one ATP, five ions</text>
      <rect x="120" y="60" width="420" height="90" rx="14" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="82" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">membrane (pump spans it)</text>
      <text x="180" y="110" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">OUT</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">3 Na⁺ expelled ↑</text>
      <text x="480" y="110" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">IN</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2 K⁺ imported ↓</text>
      <path d="M 300 105 L 360 105" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#nkc-a)" />
      <text x="330" y="95" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">ATP → ADP</text>
      <text x="330" y="170" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">3 Na⁺ out : 2 K⁺ in — per ATP</text>
      <text x="330" y="195" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">electrogenic (net +1 out) · runs constantly against the leaks</text>
      <text x="330" y="215" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">maintains resting potential ≈ −70 mV, cell volume, and the Na⁺ gradient</text>
      <defs>
        <marker id="nkc-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["pump-importance-panel.tsx"] = wrap("PumpImportancePanel",
 "Three things the sodium potassium pump maintains",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why the pump never clocks out</text>
      {[
        ["resting potential", "≈ −70 mV — nerves and muscles fire on it", "rgb(59 130 246)", 40, 55],
        ["cell volume", "osmotic balance — stops cells swelling", "rgb(16 185 129)", 340, 55],
        ["the Na⁺ gradient", "the battery that secondary transport spends", "rgb(245 158 11)", 40, 125],
        ["constant running", "ions leak back continuously; stop ATP → gradients collapse in minutes", "rgb(239 68 68)", 340, 125],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One of the body's largest ATP customers — the brain pays the biggest share</text>
""")

FILES["na-glucose-symport.tsx"] = wrap("NaGlucoseSymport",
 "Sodium glucose symporter carrying glucose against its gradient in the intestine",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Na⁺–glucose symport — one rides, one pays</text>
      <rect x="150" y="55" width="360" height="110" rx="14" fill="rgb(59 130 246)" opacity="0.06" stroke="rgb(59 130 246)" strokeDasharray="4 3" />
      <text x="330" y="75" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">intestinal lining (SGLT carrier spans the membrane)</text>
      <text x="220" y="105" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">gut lumen</text>
      <text x="440" y="105" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">inside cell</text>
      <path d="M 250 130 C 300 118, 360 118, 410 130" stroke="rgb(239 68 68)" strokeWidth="3" fill="none" markerEnd="url(#ngs-a)" />
      <text x="330" y="112" fontSize="10" fill="rgb(239 68 68)" textAnchor="middle">Na⁺ DOWN its gradient</text>
      <path d="M 250 150 C 300 162, 360 162, 410 150" stroke="rgb(139 92 246)" strokeWidth="3" fill="none" markerEnd="url(#ngs-b)" />
      <text x="330" y="176" fontSize="10" fill="rgb(139 92 246)" textAnchor="middle">glucose UP its gradient (same carrier)</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same direction, same step = symport · kidney tubules do the same reclaiming</text>
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">the gradient was built by the Na⁺/K⁺ pump with ATP — hence "secondary"</text>
      <defs>
        <marker id="ngs-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
        <marker id="ngs-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(139 92 246)" /></marker>
      </defs>
""")

FILES["ors-panel.tsx"] = wrap("OrsPanel",
 "Oral rehydration solution exploiting sodium glucose co-transport",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">ORS — the pump mechanism at a hospital bedside</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">THE DRINK</text>
      <text x="180" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">water + glucose + sodium (salts)</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">glucose keeps the symporter loaded</text>
      <text x="180" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">water follows osmotically</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">THE RESULT</text>
      <text x="480" y="112" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">absorption continues even in diarrhoea</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">cholera deaths fall dramatically</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">millions of lives a year, pennies a dose</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Sugar + salt together — either alone absorbs poorly. That is the symport, in a sachet</text>
""")

FILES["gradient-economy.tsx"] = wrap("GradientEconomy",
 "Energy economy of ion pumps showing the sodium gradient as currency",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The gradient is a currency</text>
      <rect x="60" y="65" width="180" height="70" rx="10" fill="rgb(245 158 11)" opacity="0.14" stroke="rgb(245 158 11)" />
      <text x="150" y="92" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Na⁺/K⁺ pump</text>
      <text x="150" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">spends ATP</text>
      <text x="150" y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">mints the Na⁺ gradient</text>
      <path d="M 245 100 L 300 100" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#ge-a)" />
      <rect x="305" y="65" width="180" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="395" y="92" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Na⁺ gradient (bank)</text>
      <text x="395" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">high outside, low inside</text>
      <text x="395" y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">stored potential energy</text>
      <path d="M 490 100 L 545 100" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#ge-a)" />
      <rect x="550" y="65" width="80" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="590" y="92" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">spent on:</text>
      <text x="590" y="112" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">glucose uptake,</text>
      <text x="590" y="126" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">nerve signals</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">ATP → gradient → work: the pump is the mint, the membrane is the vault</text>
      <text x="330" y="202" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Every glucose molecule absorbed carries a hidden ATP price tag</text>
      <defs>
        <marker id="ge-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

# ---------------- cx95: metal toxicity ----------------

FILES["toxic-five-table.tsx"] = wrap("ToxicFiveTable",
 "Table of five toxic metals with forms targets diseases and sources",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The toxic five</text>
      <line x1="35" y1="50" x2="625" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["METAL", "TARGET", "DISEASE", "SOURCE"],
        ["Fe (excess)", "liver, gut", "haemochromatosis", "tonics, overload"],
        ["As (As(III))", "enzymes (–SH)", "arsenicosis", "groundwater"],
        ["Hg (MeHg)", "CNS", "Minamata disease", "contaminated fish"],
        ["Pb", "haem enzymes, CNS", "plumbism", "paints, batteries"],
        ["Cd", "kidneys, bone", "itai-itai disease", "batteries, smoke"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2, 3].map((c) => (
            <text key={c} x={40 + [0, 130, 290, 480][c]} y={72 + i * 26} fontSize={i ? "10" : "9.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="35" y1={80 + i * 26} x2="625" y2={80 + i * 26} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Minamata = mercury ate the nerves · itai-itai = cadmium ate the kidneys and bones</text>
""")

FILES["soft-metal-sulphur.tsx"] = wrap("SoftMetalSulphur",
 "Soft metal ions binding thiol groups of enzymes and disabling them",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Mechanism 1: soft metals love soft sulphur</text>
      <rect x="60" y="60" width="200" height="90" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="160" y="86" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">enzyme cysteine</text>
      <text x="160" y="112" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">–SH (thiol)</text>
      <text x="160" y="134" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">the soft target</text>
      <path d="M 265 105 L 320 105" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#sms-a)" />
      <text x="292" y="95" fontSize="9" fill="rgb(239 68 68)" textAnchor="middle">binds</text>
      <rect x="325" y="60" width="140" height="90" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="395" y="92" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Hg²⁺ Pb²⁺</text>
      <text x="395" y="114" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Cd²⁺ As(III)</text>
      <text x="395" y="138" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">soft Lewis acids</text>
      <rect x="490" y="60" width="130" height="90" rx="10" fill="rgb(148 163 184)" opacity="0.15" stroke="rgb(148 163 184)" />
      <text x="555" y="95" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">enzyme</text>
      <text x="555" y="115" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">DISABLED</text>
      <text x="555" y="138" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">many enzymes at once</text>
      <text x="330" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">One preference — for soft –SH sulphur — explains why these metals hit everything</text>
      <text x="330" y="207" fontSize="10.5" textAnchor="middle" fill="rgb(59 130 246)">Antidotes are thiols too (BAL) — they out-compete the enzyme</text>
      <defs>
        <marker id="sms-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
""")

FILES["mimicry-panel.tsx"] = wrap("MimicryPanel",
 "Lead mimicking calcium and cadmium mimicking zinc in biological systems",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Mechanism 2: mimicry — the wrong ion in the right seat</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Pb²⁺ imitates Ca²⁺</text>
      <text x="180" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">same +2 charge, similar size</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ deposits in bone</text>
      <text x="180" y="154" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ blocks haem-synthesis enzymes</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(20 184 166)" opacity="0.1" stroke="rgb(20 184 166)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cd²⁺ imitates Zn²⁺</text>
      <text x="480" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">same group IIB</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ occupies Zn enzyme sites</text>
      <text x="480" y="154" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">→ but cannot do zinc's chemistry</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">They need not be abundant — only similar. That is why traces poison</text>
""")

FILES["minamata-story.tsx"] = wrap("MinamataStory",
 "Minamata disease bioaccumulation pathway from factory to fish to humans",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Minamata — bioaccumulation made it a mass poisoning</text>
      {[
        ["factory", "Hg effluent", "rgb(148 163 184)", 40],
        ["bacteria", "→ methylmercury", "rgb(59 130 246)", 195],
        ["fish chain", "concentrates upward", "rgb(245 158 11)", 350],
        ["people", "CNS destroyed", "rgb(239 68 68)", 505],
      ].map(([s, d, col, x], i) => (
        <g key={s as string}>
          <rect x={x as number} y="70" width="115" height="60" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 57} y="94" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{s as string}</text>
          <text x={(x as number) + 57} y="114" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          {i < 3 && <path d={`M ${(x as number) + 117} 100 L ${(x as number) + 152} 100`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ms-a)" />}
        </g>
      ))}
      <text x="330" y="165" fontSize="11" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">Japan, 1950s — thousands poisoned by one bay's fish</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">tremors, numbness, memory loss, paralysis — the textbook bioaccumulation case</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">lipid-soluble methylmercury climbs every step of the food chain</text>
      <defs>
        <marker id="ms-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["lead-haem-block.tsx"] = wrap("LeadHaemBlock",
 "Lead blocking haem synthesis enzymes causing anaemia and child IQ loss",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lead: anaemia by enzyme sabotage</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Pb²⁺ blocks the haem line</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">ALA dehydratase ✗</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">ferrochelatase ✗</text>
      <text x="180" y="156" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">haem cannot be assembled</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CONSEQUENCES</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">anaemia (no haemoglobin)</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">children: IQ loss, learning harm</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">adults: lead colic, kidney damage</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Sources: old paints, batteries, formerly leaded petrol (now phased out)</text>
""")

FILES["arsenic-groundwater.tsx"] = wrap("ArsenicGroundwater",
 "Arsenic in groundwater exceeding WHO limit causing arsenicosis",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Arsenic — the well-water poison</text>
      <rect x="40" y="60" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="86" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">THE ROUTE</text>
      <text x="180" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">tube-well groundwater, As(III)</text>
      <text x="180" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">WHO limit: 10 ppb (0.01 mg/L)</text>
      <text x="180" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Terai (Nepal) + Gangetic plains affected</text>
      <rect x="340" y="60" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="86" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ARSENICOSIS</text>
      <text x="480" y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">As(III) binds enzyme –SH groups</text>
      <text x="480" y="132" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">skin keratosis, pigmentation</text>
      <text x="480" y="154" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">skin cancer, nerve damage</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Remedy: tested deep wells or arsenic-removal filters — and BAL as antidote</text>
""")

FILES["chelation-therapy-panel.tsx"] = wrap("ChelationTherapyPanel",
 "Chelation therapy ligands gripping toxic metals for excretion",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chelation therapy — out-grip the enzyme</text>
      {[
        ["EDTA", "Pb (lead)", "rgb(59 130 246)", 40, 55],
        ["BAL (dimercaprol)", "As, Hg", "rgb(16 185 129)", 340, 55],
        ["penicillamine", "Cu (Wilson's)", "rgb(139 92 246)", 40, 125],
        ["desferrioxamine", "Fe overload", "rgb(239 68 68)", 340, 125],
      ].map(([d, m, col, x, y]) => (
        <g key={d as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y={(y as number) + 24} fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{d as string}</text>
          <text x={(x as number) + 140} y={(y as number) + 44} fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">removes {m as string}</text>
        </g>
      ))}
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Ligand grips the metal in a soluble complex → excreted in urine</text>
      <text x="330" y="230" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Antidote chemistry is coordination chemistry — grip strength decides</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
