# Figures for Fundamental Principles of Organic Chemistry rows 103-105 (21 figures).
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

# ---------------- row 103: IUPAC nomenclature ----------------

FILES["iupac-naming-workflow.tsx"] = wrap("IupacNamingWorkflow",
 "IUPAC naming workflow from structure to name",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">IUPAC naming — the five-step workflow</text>
      {[
        ["1. Find the longest chain", "parent hydrocarbon", "rgb(59 130 246)", 40, 55],
        ["2. Number for lowest locants", "start at the nearer substituent", "rgb(16 185 129)", 240, 55],
        ["3. Name substituents", "alkyl prefixes, di/tri", "rgb(245 158 11)", 440, 55],
        ["4. Add the suffix", "functional group ending", "rgb(139 92 246)", 140, 130],
        ["5. Assemble alphabetically", "substituents before parent", "rgb(20 184 166)", 340, 130],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Every IUPAC name is built by the same five moves — up to six carbons or beyond</text>
""")

FILES["carbon-root-ladder.tsx"] = wrap("CarbonRootLadder",
 "IUPAC root names from meth to hex for one to six carbons",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Root names: count the carbons</text>
      {[
        ["C1", "meth-", "rgb(59 130 246)"], ["C2", "eth-", "rgb(16 185 129)"], ["C3", "prop-", "rgb(245 158 11)"],
        ["C4", "but-", "rgb(239 68 68)"], ["C5", "pent-", "rgb(139 92 246)"], ["C6", "hex-", "rgb(20 184 166)"],
      ].map(([c, r, col], i) => (
        <g key={c as string}>
          <rect x={40 + (i as number) * 98} y="55" width="88" height="80" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={84 + (i as number) * 98} y="88" fontSize="12" fontWeight="800" textAnchor="middle" fill={col as string}>{c as string}</text>
          <text x={84 + (i as number) * 98} y="112" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">root + ane = alkane · root + ene = alkene · root + yne = alkyne</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">methane, ethane, propane, butane, pentane, hexane — the six-carbon ladder of the syllabus</text>
""")

FILES["suffix-priority-panel.tsx"] = wrap("SuffixPriorityPanel",
 "Suffix ladder for functional groups in IUPAC names",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Suffix ladder — which ending wins</text>
      {[
        ["–COOH", "–oic acid", "highest", "rgb(239 68 68)", 40],
        ["–CHO", "–al", "high", "rgb(245 158 11)", 190],
        ["C=O (ketone)", "–one", "mid", "rgb(139 92 246)", 340],
        ["–OH", "–ol", "mid", "rgb(16 185 129)", 490],
      ].map(([g, s, t, col, x]) => (
        <g key={g as string}>
          <rect x={x as number} y="55" width="130" height="72" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 65} y="80" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{g as string}</text>
          <text x={(x as number) + 65} y="102" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{s as string}</text>
          <text x={(x as number) + 65} y="119" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{t as string}</text>
        </g>
      ))}
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">When two groups compete, the higher one takes the suffix</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the loser drops to a prefix (hydroxy-, oxo-, chloro-)</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">example: HOCH₂CH₂OH → ethane-1,2-diol (both –OH kept in one name)</text>
""")

FILES["locant-rule-demo.tsx"] = wrap("LocantRuleDemo",
 "Lowest locant rule demonstrated on two numberings of pentane",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The lowest-locant rule</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">WRONG direction</text>
      <text x="180" y="105" fontSize="12" textAnchor="middle" className="fill-current text-foreground">C5 C4 C3 C2 C1 → 4-methylpentane</text>
      <text x="180" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">locant set (4) — high, rejected</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">CORRECT direction</text>
      <text x="480" y="105" fontSize="12" textAnchor="middle" className="fill-current text-foreground">C1 C2 C3 C4 C5 → 2-methylpentane</text>
      <text x="480" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">locant set (2) — lowest wins</text>
      <text x="330" y="200" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Number from the end that gives substituents the smallest numbers</text>
""")

FILES["butan-2-ol-naming.tsx"] = wrap("Butan2olNaming",
 "NEB 2024 verified PYQ naming CH3CH(OH)CH2CH3 as butan-2-ol",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NEB 2024 (verified PYQ): name CH₃CH(OH)CH₂CH₃</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Step 1–2: chain + numbering</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C1–C2–C3–C4, –OH on C2</text>
      <text x="180" y="135" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">four-carbon chain → root "but-"</text>
      <text x="180" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">lowest locant puts –OH at C2</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Step 3–5: suffix + assembly</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">but- + an- + 2-ol</text>
      <text x="480" y="135" fontSize="13" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">= butan-2-ol</text>
      <text x="480" y="156" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">(not butan-3-ol — count the other way)</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">alcohol suffix "-ol" with its locant joined directly: butan-2-ol</text>
""")

FILES["neb-2023-name-walkthrough.tsx"] = wrap("Neb2023NameWalkthrough",
 "NEB 2023 verified PYQ IUPAC name 2-ethyl-5-methylhexan-1-ol",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">NEB 2023 (verified PYQ): the long-chain alcohol</text>
      <rect x="40" y="52" width="580" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="76" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃CH(CH₃)CH₂CH₂CH(CH₂CH₃)CH₂OH — find the longest chain (6 C) holding the –OH</text>
      <text x="330" y="98" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">number from the –OH end: C1 bears –OH, C2 bears –CH₂CH₃, C5 bears –CH₃</text>
      {[
        ["hexan-1-ol", "parent: 6 C + –OH at C1", "rgb(16 185 129)", 40],
        ["2-ethyl", "ethyl at C2", "rgb(245 158 11)", 240],
        ["5-methyl", "methyl at C5", "rgb(139 92 246)", 440],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="130" width="180" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="152" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="172" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">2-ethyl-5-methylhexan-1-ol (substituents alphabetical)</text>
""")

FILES["common-vs-iupac-names.tsx"] = wrap("CommonVsIupacNames",
 "Common names versus IUPAC names for familiar compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Common name vs IUPAC name</text>
      {[
        ["CH₃OH", "methyl alcohol", "methanol", "rgb(59 130 246)", 40, 55],
        ["CH₃CH₂OH", "ethyl alcohol", "ethanol", "rgb(16 185 129)", 340, 55],
        ["HCOOH", "formic acid", "methanoic acid", "rgb(245 158 11)", 40, 125],
        ["CH₃COOH", "acetic acid", "ethanoic acid", "rgb(139 92 246)", 340, 125],
      ].map(([f, c, iu, col, x, y]) => (
        <g key={c as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 22} fontSize="11" fontWeight="800" fill={col as string}>{f as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 40} fontSize="9.5" className="fill-current text-muted-foreground">common: {c as string} → IUPAC: {iu as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">IUPAC names are systematic — any chemist can rebuild the structure from them</text>
""")

# ---------------- row 104: Lassaigne's test ----------------

FILES["lassaigne-test-flow.tsx"] = wrap("LassaigneTestFlow",
 "Lassaigne sodium fusion test workflow for detecting elements",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lassaigne's test — the workflow</text>
      {[
        ["1. Fuse organic compound + Na", "red-hot ignition tube", "rgb(239 68 68)", 40, 55],
        ["2. Quench in water, boil, filter", "clear extract", "rgb(59 130 246)", 240, 55],
        ["3. Split extract into portions", "N, S, X tested separately", "rgb(245 158 11)", 440, 55],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="70" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 28} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 50} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="160" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Na + C + N → NaCN · 2Na + S → Na₂S · Na + X → NaX</text>
      <text x="330" y="186" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">covalent elements are converted to ionic salts the standard tests can see</text>
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">why sodium? — a strong reducer that converts everything at red heat</text>
""")

FILES["sodium-fusion-extract.tsx"] = wrap("SodiumFusionExtract",
 "Sodium fusion extract preparation and contents",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The fusion extract — what is in the water</text>
      <rect x="40" y="52" width="270" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="175" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">IGNITION TUBE</text>
      <text x="175" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">organic compound + sodium metal</text>
      <text x="175" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">red-hot → fused mass → drop in water</text>
      <text x="175" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">boil + filter → the Lassaigne extract</text>
      <rect x="350" y="52" width="270" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="485" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">EXTRACT CONTAINS</text>
      <text x="485" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">NaCN (if N) · Na₂S (if S) · NaX (if X)</text>
      <text x="485" y="128" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each anion now has its own colour test</text>
      <text x="485" y="152" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unused Na destroyed by the boiling</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">safety: excess sodium must be destroyed — it reacts violently with water</text>
""")

FILES["nitrogen-prussian-blue.tsx"] = wrap("NitrogenPrussianBlue",
 "Nitrogen detection giving prussian blue ferric ferrocyanide",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Nitrogen test — the Prussian blue finale</text>
      <rect x="40" y="52" width="580" height="66" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="76" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">extract (NaCN) + FeSO₄ → Na₄[Fe(CN)₆] · then + Fe³⁺ (dilute H₂SO₄, boil)</text>
      <text x="330" y="100" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">sodium ferrocyanide forms first; ferric ion is added second</text>
      <rect x="150" y="135" width="360" height="60" rx="10" fill="rgb(30 64 175)" opacity="0.25" stroke="rgb(30 64 175)" strokeWidth="2" />
      <text x="330" y="160" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(147 197 253)">Prussian blue precipitate</text>
      <text x="330" y="182" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Fe₄[Fe(CN)₆]₃ — ferric ferrocyanide = nitrogen present</text>
""")

FILES["sulphur-tests-panel.tsx"] = wrap("SulphurTestsPanel",
 "Two sulphur tests violet sodium sulphide lead sulphide black",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Sulphur — two independent confirmations</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">Route 1: sodium nitroprusside</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">extract (Na₂S) + nitroprusside</text>
      <text x="180" y="128" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(196 181 253)">violet colour</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">instant, no heating</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(120 113 108)" opacity="0.1" stroke="rgb(120 113 108)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(120 113 108)" textAnchor="middle">Route 2: lead acetate</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">acidified extract + (CH₃COO)₂Pb</text>
      <text x="480" y="128" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">black PbS precipitate</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">sulphide ion meets lead ion</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">either colour alone confirms sulphur; both together are unanswerable</text>
""")

FILES["halide-silver-tests.tsx"] = wrap("HalideSilverTests",
 "Silver nitrate colour ladder for chloride bromide iodide",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Halogens — the silver nitrate colour ladder</text>
      {[
        ["Cl⁻", "white ppt", "soluble in NH₃", "rgb(148 163 184)", 40],
        ["Br⁻", "pale yellow ppt", "partly soluble", "rgb(245 158 11)", 240],
        ["I⁻", "yellow ppt", "insoluble in NH₃", "rgb(139 92 246)", 440],
      ].map(([ion, c, s, col, x]) => (
        <g key={ion as string}>
          <rect x={x as number} y="55" width="180" height="90" rx="10" fill={col as string} opacity="0.12" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="82" fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{ion as string}</text>
          <text x={(x as number) + 90} y="106" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{c as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{s as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">acidify the extract with dilute HNO₃ first</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">acidification destroys CN⁻ and S²⁻ so they cannot fake a halide result</text>
""")

FILES["blood-red-complication.tsx"] = wrap("BloodRedComplication",
 "N and S together giving sodium thiocyanate blood red test",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The trap: N and S in the same compound</text>
      <rect x="40" y="52" width="580" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="330" y="78" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Na + C + N + S → NaSCN (sodium thiocyanate) — no NaCN, no Na₂S</text>
      <text x="330" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">both elements locked into one ion: the separate N and S tests fail</text>
      <rect x="150" y="140" width="360" height="58" rx="10" fill="rgb(220 38 38)" opacity="0.2" stroke="rgb(220 38 38)" strokeWidth="2" />
      <text x="330" y="164" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(252 165 165)">Fe³⁺ + SCN⁻ → blood-red [Fe(SCN)]²⁺</text>
      <text x="330" y="186" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the blood-red colour is itself the proof that BOTH N and S are present</text>
""")

FILES["element-detection-map.tsx"] = wrap("ElementDetectionMap",
 "Summary map of element detection by Lassaigne test",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Lassaigne's test — the complete map</text>
      {[
        ["N", "Prussian blue", "rgb(59 130 246)", 40, 55],
        ["S", "violet / black PbS", "rgb(139 92 246)", 240, 55],
        ["X (Cl,Br,I)", "AgX colour ladder", "rgb(16 185 129)", 440, 55],
        ["N + S together", "blood red NaSCN", "rgb(239 68 68)", 140, 135],
        ["neither detected", "element absent (or C,H only)", "rgb(148 163 184)", 380, 135],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">one fusion, one extract, four verdicts — the most efficient test in qualitative organic analysis</text>
""")

# ---------------- row 105: isomerism definition + classification ----------------

FILES["isomerism-definition-panel.tsx"] = wrap("IsomerismDefinitionPanel",
 "Isomerism definition same molecular formula different properties",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Isomerism — the definition</text>
      <rect x="40" y="52" width="580" height="80" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="82" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Two or more compounds with the SAME molecular formula</text>
      <text x="330" y="110" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">but DIFFERENT arrangements → different properties</text>
      {[
        ["isomers", "the compounds themselves", "rgb(16 185 129)", 40],
        ["isomerism", "the phenomenon they display", "rgb(245 158 11)", 340],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="150" width="280" height="52" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y="172" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Greek: isos = equal, meros = part — "equal parts, different whole"</text>
""")

FILES["isomerism-family-tree.tsx"] = wrap("IsomerismFamilyTree",
 "Classification tree of isomerism into structural and stereoisomerism",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The isomerism family tree</text>
      <rect x="230" y="46" width="200" height="40" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="330" y="71" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">ISOMERISM</text>
      <path d="M 330 86 L 170 122" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <path d="M 330 86 L 490 122" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <rect x="60" y="122" width="220" height="46" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="170" y="142" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">STRUCTURAL</text>
      <text x="170" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">different connectivity</text>
      <rect x="380" y="122" width="220" height="46" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="490" y="142" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">STEREOISOMERISM</text>
      <text x="490" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">same connectivity, different spatial arrangement</text>
      <text x="170" y="200" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">chain · position · functional · metamerism · tautomerism</text>
      <text x="490" y="200" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">geometrical (cis–trans) · optical (d/l)</text>
""")

FILES["structural-branch-overview.tsx"] = wrap("StructuralBranchOverview",
 "Five types of structural isomerism overview",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Structural isomerism — five types</text>
      {[
        ["chain", "different carbon skeleton", "rgb(59 130 246)", 40, 55],
        ["position", "same skeleton, group moved", "rgb(16 185 129)", 240, 55],
        ["functional", "different functional group", "rgb(245 158 11)", 440, 55],
        ["metamerism", "unequal alkyl split", "rgb(139 92 246)", 140, 130],
        ["tautomerism", "dynamic H-shift equilibrium", "rgb(20 184 166)", 340, 130],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">all five share one signature: the atoms are wired differently</text>
""")

FILES["stereo-branch-overview.tsx"] = wrap("StereoBranchOverview",
 "Two types of stereoisomerism geometrical and optical",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Stereoisomerism — two types</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">GEOMETRICAL (cis–trans)</text>
      <text x="180" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">restricted rotation (C=C)</text>
      <text x="180" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">groups locked on the same or opposite side</text>
      <text x="180" y="154" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">example: but-2-ene</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">OPTICAL (d / l)</text>
      <text x="480" y="106" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">a chiral carbon (4 different groups)</text>
      <text x="480" y="130" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">mirror images rotate plane-polarised light</text>
      <text x="480" y="154" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">example: lactic acid</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">stereo-isomers are wired identically — only the 3-D arrangement differs</text>
""")

FILES["c4h10-isomer-pair.tsx"] = wrap("C4H10IsomerPair",
 "Butane and isobutane the two chain isomers of C4H10",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">C₄H₁₀ — one formula, two compounds</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">n-butane (straight chain)</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH₂–CH₂–CH₃</text>
      <text x="180" y="138" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">b.p. −0.5 °C · unbranched skeleton</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">2-methylpropane (branched)</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH(CH₃)–CH₃</text>
      <text x="480" y="138" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">b.p. −11.7 °C · branched skeleton</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Same formula, different skeletons — chain isomerism</text>
""")

FILES["c2h6o-functional-pair.tsx"] = wrap("C2H6OFunctionalPair",
 "Ethanol and dimethyl ether functional isomers of C2H6O",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">C₂H₆O — same atoms, different function</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ethanol CH₃CH₂OH</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">functional group: –OH (alcohol)</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">liquid, b.p. 78 °C, reacts with Na</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">dimethyl ether CH₃–O–CH₃</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">functional group: –O– (ether)</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">gas, b.p. −24 °C, inert to Na</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Different functional group → different chemistry entirely</text>
""")

FILES["isomer-count-ladder.tsx"] = wrap("IsomerCountLadder",
 "Number of isomers rising with carbon count",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why isomerism explodes with carbon count</text>
      {[
        ["C₄H₁₀", "2", "rgb(59 130 246)"], ["C₅H₁₂", "3", "rgb(16 185 129)"], ["C₆H₁₄", "5", "rgb(245 158 11)"],
        ["C₈H₁₈", "18", "rgb(239 68 68)"], ["C₁₀H₂₂", "75", "rgb(139 92 246)"],
      ].map(([f, n, col], i) => (
        <g key={f as string}>
          <rect x={40 + (i as number) * 120} y={160 - (i as number) * 22} width="90" height={(i as number) * 22 + 40} rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={85 + (i as number) * 120} y={150 - (i as number) * 22} fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <text x={85 + (i as number) * 120} y={222} fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f as string}</text>
        </g>
      ))}
      <text x="330" y="45" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">more carbons → more possible skeletons → more isomers</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
