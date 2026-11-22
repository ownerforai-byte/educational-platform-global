# Figures for Fundamental Principles of Organic Chemistry rows 106-108 (21 figures).
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

# ---------------- row 106: structural isomerism types ----------------

FILES["chain-isomerism-demo.tsx"] = wrap("ChainIsomerismDemo",
 "Chain isomerism straight versus branched carbon skeleton",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chain isomerism — the skeleton changes</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">straight chain</text>
      <text x="180" y="110" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C–C–C–C–C (pentane)</text>
      <text x="180" y="140" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">every carbon ends-to-end</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">branched chain</text>
      <text x="480" y="110" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C–C(C)–C–C (2-methylbutane)</text>
      <text x="480" y="140" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">a methyl grows off the middle</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same formula C₅H₁₂ · different carbon framework</text>
""")

FILES["position-isomerism-demo.tsx"] = wrap("PositionIsomerismDemo",
 "Position isomerism same skeleton group moved along chain",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Position isomerism — the group moves</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">propan-1-ol</text>
      <text x="180" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">HO–CH₂–CH₂–CH₃</text>
      <text x="180" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">–OH on carbon 1 (terminal)</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">propan-2-ol</text>
      <text x="480" y="108" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH(OH)–CH₃</text>
      <text x="480" y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">–OH on carbon 2 (middle)</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same skeleton C–C–C, same –OH — only the position differs</text>
""")

FILES["functional-isomerism-demo.tsx"] = wrap("FunctionalIsomerismDemo",
 "Functional isomerism different functional groups same formula",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Functional isomerism — the group itself changes</text>
      {[
        ["C₂H₆O", "alcohol –OH", "ether –O–", "rgb(16 185 129)", "rgb(245 158 11)"],
        ["C₃H₆O", "aldehyde –CHO", "ketone C=O", "rgb(59 130 246)", "rgb(139 92 246)"],
      ].map(([f, a, b, ca, cb], i) => (
        <g key={f as string}>
          <text x="60" y={100 + (i as number) * 70} fontSize="13" fontWeight="800" fill="rgb(148 163 184)">{f as string}</text>
          <rect x="150" y={76 + (i as number) * 70} width="220" height="44" rx="10" fill={ca as string} opacity="0.1" stroke={ca as string} />
          <text x="260" y={103 + (i as number) * 70} fontSize="11" fontWeight="800" textAnchor="middle" fill={ca as string}>{a as string}</text>
          <rect x="390" y={76 + (i as number) * 70} width="220" height="44" rx="10" fill={cb as string} opacity="0.1" stroke={cb as string} />
          <text x="500" y={103 + (i as number) * 70} fontSize="11" fontWeight="800" textAnchor="middle" fill={cb as string}>{b as string}</text>
        </g>
      ))}
      <text x="330" y="222" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the most dramatic isomerism — whole families of reactions change</text>
""")

FILES["metamerism-demo.tsx"] = wrap("MetamerismDemo",
 "Metamerism unequal alkyl groups around a hetero atom",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Metamerism — unequal alkyl halves</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(139 92 246)" opacity="0.1" stroke="rgb(139 92 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(139 92 246)" textAnchor="middle">C₂H₅–O–C₂H₅</text>
      <text x="180" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">diethyl ether</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">2 + 2 split around oxygen</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(20 184 166)" opacity="0.1" stroke="rgb(20 184 166)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(20 184 166)" textAnchor="middle">CH₃–O–C₃H₇</text>
      <text x="480" y="106" fontSize="11" textAnchor="middle" className="fill-current text-foreground">methyl propyl ether</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">1 + 3 split around oxygen</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">same formula C₄H₁₀O · the alkyl groups flanking O are redistributed</text>
""")

FILES["tautomerism-demo.tsx"] = wrap("TautomerismDemo",
 "Tautomerism keto enol dynamic equilibrium with proton shift",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Tautomerism — a live, two-way equilibrium</text>
      <rect x="40" y="60" width="240" height="80" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="160" y="90" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">KETO form</text>
      <text x="160" y="118" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">CH₃–CO–CH₂–R</text>
      <rect x="380" y="60" width="240" height="80" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="500" y="90" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">ENOL form</text>
      <text x="500" y="118" fontSize="11.5" textAnchor="middle" className="fill-current text-foreground">CH₃–C(OH)=CH–R</text>
      <path d="M 285 100 L 375 100" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ttd-a)" />
      <path d="M 375 112 L 285 112" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#ttd-b)" />
      <text x="330" y="92" fontSize="9.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">H shift</text>
      <text x="330" y="170" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a proton migrates carbon → oxygen while a double bond moves — the isomers interconvert</text>
      <text x="330" y="196" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unlike other isomerisms, tautomers coexist in dynamic equilibrium (usually keto dominates)</text>
      <defs>
        <marker id="ttd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
        <marker id="ttd-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["five-types-quick-id.tsx"] = wrap("FiveTypesQuickId",
 "Quick identification table of five structural isomerism types",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Spot the type — the one-question test</text>
      {[
        ["skeleton different?", "CHAIN", "rgb(59 130 246)", 40, 52],
        ["group moved, skeleton same?", "POSITION", "rgb(16 185 129)", 340, 52],
        ["functional group different?", "FUNCTIONAL", "rgb(245 158 11)", 40, 122],
        ["alkyl halves around O/N/S differ?", "METAMERISM", "rgb(139 92 246)", 340, 122],
      ].map(([q, a, col, x, y]) => (
        <g key={q as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 24} fontSize="10" className="fill-current text-muted-foreground">{q as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 46} fontSize="12" fontWeight="800" fill={col as string}>→ {a as string}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">dynamic H-shift equilibrium → TAUTOMERISM (the fifth type)</text>
""")

FILES["structural-vs-stereo-line.tsx"] = wrap("StructuralVsStereoLine",
 "Structural isomers differ in connectivity stereoisomers in arrangement",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One line separates the two great branches</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">STRUCTURAL</text>
      <text x="180" y="110" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">atoms joined to DIFFERENT atoms</text>
      <text x="180" y="136" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">connectivity differs — rewire the molecule</text>
      <text x="180" y="158" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">detectable from the formula + constitution</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">STEREO</text>
      <text x="480" y="110" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">atoms joined to the SAME atoms</text>
      <text x="480" y="136" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">arrangement in space differs — rotate/flip</text>
      <text x="480" y="158" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">needs geometry (cis/trans) or a mirror (d/l)</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">connectivity is the dividing line — everything else follows</text>
""")

# ---------------- row 107: geometrical + optical isomerism ----------------

FILES["cis-trans-but2ene.tsx"] = wrap("CisTransBut2ene",
 "Cis and trans but-2-ene geometrical isomers",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">but-2-ene: locked on either side of C=C</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="76" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">cis-but-2-ene</text>
      <text x="180" y="100" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃      CH₃</text>
      <text x="180" y="118" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  \\    /</text>
      <text x="180" y="136" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">     C=C</text>
      <text x="180" y="154" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  /    \\</text>
      <text x="180" y="166" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">both CH₃ on the SAME side</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="76" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">trans-but-2-ene</text>
      <text x="480" y="100" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃        H</text>
      <text x="480" y="118" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  \\      /</text>
      <text x="480" y="136" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">     C=C</text>
      <text x="480" y="154" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">  /      \\</text>
      <text x="480" y="166" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CH₃ groups on OPPOSITE sides</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">each carbon of the double bond carries two different groups — isomerism becomes possible</text>
""")

FILES["pi-bond-rotation-lock.tsx"] = wrap("PiBondRotationLock",
 "Pi bond prevents free rotation locking geometrical isomers",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Why C=C refuses to rotate</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">C–C single bond</text>
      <text x="180" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">σ bond: cylindrical, free rotation</text>
      <text x="180" y="138" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">conformers interconvert — no isolation</text>
      <text x="180" y="162" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">ethane spins ~10¹¹ times per second</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">C=C double bond</text>
      <text x="480" y="112" fontSize="11" textAnchor="middle" className="fill-current text-foreground">σ + π: the π cloud blocks rotation</text>
      <text x="480" y="138" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">breaking the π bond costs ~250 kJ/mol</text>
      <text x="480" y="162" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">cis and trans are locked — separable compounds</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">restricted rotation is the entire mechanism of geometrical isomerism</text>
""")

FILES["cis-trans-property-contrast.tsx"] = wrap("CisTransPropertyContrast",
 "Physical property contrast between cis and trans but-2-ene",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">cis vs trans — measurable differences</text>
      {[
        ["boiling point", "cis higher (+3.7 °C)", "trans lower", "rgb(59 130 246)", 40],
        ["dipole moment", "cis: net dipole", "trans: zero (symmetry)", "rgb(139 92 246)", 240],
        ["stability", "cis less stable", "trans more stable", "rgb(16 185 129)", 440],
      ].map(([row, c, t, col, x]) => (
        <g key={row as string}>
          <rect x={x as number} y="55" width="180" height="100" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="80" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{row as string}</text>
          <text x={(x as number) + 90} y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">cis: {c as string}</text>
          <text x={(x as number) + 90} y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground">trans: {t as string}</text>
        </g>
      ))}
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">cis: dipoles add (polar, higher b.p.) · trans: dipoles cancel (nonpolar, packs better)</text>
""")

FILES["chiral-centre-lactic.tsx"] = wrap("ChiralCentreLactic",
 "Lactic acid chiral carbon with four different groups",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The chiral carbon of lactic acid</text>
      <rect x="40" y="52" width="580" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃–CH(OH)–COOH — the middle carbon carries FOUR different groups</text>
      <text x="330" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">–H · –OH · –CH₃ · –COOH (all different = chiral / asymmetric carbon)</text>
      {[
        ["4 different groups", "the defining condition", "rgb(16 185 129)", 40],
        ["non-superimposable mirror images", "two enantiomers: d and l", "rgb(139 92 246)", 340],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="140" width="280" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 140} y="163" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 140} y="184" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a carbon with even two identical groups can never be chiral — symmetry kills it</text>
""")

FILES["plane-polarised-light-test.tsx"] = wrap("PlanePolarisedLightTest",
 "Polarimeter test of optical activity with plane polarised light",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The polarimeter — how optical activity is measured</text>
      <rect x="40" y="70" width="90" height="40" rx="8" fill="rgb(245 158 11)" opacity="0.15" stroke="rgb(245 158 11)" />
      <text x="85" y="95" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">light</text>
      <path d="M 135 90 L 230 90" stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ppl-a)" />
      <text x="182" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">polariser</text>
      <rect x="235" y="62" width="180" height="56" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="325" y="86" fontSize="10" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">sample tube</text>
      <text x="325" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">chiral solution rotates the plane</text>
      <path d="M 420 90 L 560 90" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#ppl-b)" />
      <text x="560" y="70" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">analyser reads angle α</text>
      <text x="330" y="160" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">d-isomer: rotates clockwise (+) · l-isomer: anticlockwise (−)</text>
      <text x="330" y="188" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">equal rotation in opposite directions is the experimental fingerprint of enantiomers</text>
      <defs>
        <marker id="ppl-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
        <marker id="ppl-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
""")

FILES["d-l-pair-panel.tsx"] = wrap("DLPairPanel",
 "Dextrorotatory and laevorotatory enantiomer pair properties",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The d/l pair — mirror twins</text>
      <rect x="40" y="52" width="280" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="180" y="78" fontSize="12" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">d-form (dextrorotatory)</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">rotates light clockwise (+)</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">identical b.p., density, reactivity</text>
      <rect x="340" y="52" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="78" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">l-form (laevorotatory)</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">rotates light anticlockwise (−)</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">same properties except rotation</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">d and l are non-superimposable mirror images (enantiomers)</text>
""")

FILES["racemic-mixture-panel.tsx"] = wrap("RacemicMixturePanel",
 "Racemic mixture equal d and l forms optically inactive",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The racemic mixture — optical cancellation</text>
      {[
        ["d-form", "rotates +α", "rgb(245 158 11)", 40],
        ["l-form", "rotates −α", "rgb(59 130 246)", 240],
        ["50 : 50 mixture", "net rotation ZERO", "rgb(16 185 129)", 440],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="76" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="84" fontSize="11.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="110" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">racemic (±) mixture = equal enantiomers = optically INACTIVE</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the rotations cancel exactly — separation (resolution) recovers the active forms</text>
""")

# ---------------- row 108: reaction mechanism, fission ----------------

FILES["bond-fission-two-ways.tsx"] = wrap("BondFissionTwoWays",
 "Homolytic and heterolytic fission of a covalent bond compared",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One bond, two ways to break</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">HOMOLYTIC (equal split)</text>
      <text x="180" y="106" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">A–B → A· + B·</text>
      <text x="180" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">one electron each → free radicals</text>
      <text x="180" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">non-polar bonds, heat or light</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="78" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">HETEROLYTIC (unequal split)</text>
      <text x="480" y="106" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">A–B → A⁺ + :B⁻</text>
      <text x="480" y="130" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">pair to one atom → cation + anion</text>
      <text x="480" y="152" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">polar bonds, polar solvents</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the fission mode decides the intermediate — and the intermediate decides the reaction</text>
""")

FILES["homolysis-radical-birth.tsx"] = wrap("HomolysisRadicalBirth",
 "Chlorine homolysis in sunlight producing two chlorine radicals",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Homolysis in action: Cl₂ meets sunlight</text>
      <rect x="40" y="58" width="180" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="130" y="88" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl–Cl</text>
      <text x="130" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">shared pair, non-polar</text>
      <path d="M 225 92 L 300 92" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#hrb-a)" />
      <text x="262" y="80" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">hν (UV light)</text>
      {[
        ["Cl·", "7 electrons, 1 unpaired", "rgb(59 130 246)", 305],
        ["Cl·", "7 electrons, 1 unpaired", "rgb(239 68 68)", 495],
      ].map(([h, d, col, x]) => (
        <g key={h as string + String(x)}>
          <rect x={x as number} y="58" width="160" height="70" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 80} y="88" fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 80} y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="170" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">two neutral radicals, each hungry for one electron</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">these radicals start the chlorination chain of methane</text>
      <defs>
        <marker id="hrb-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["heterolysis-ion-birth.tsx"] = wrap("HeterolysisIonBirth",
 "Heterolytic fission of tert-butyl chloride producing carbocation and chloride",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Heterolysis in action: tert-butyl chloride in water</text>
      <rect x="40" y="58" width="220" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="150" y="88" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">(CH₃)₃C–Cl</text>
      <text x="150" y="112" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">polar C–Cl bond (Cl pulls harder)</text>
      <path d="M 265 92 L 340 92" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#hib-a)" />
      <text x="302" y="80" fontSize="10" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">polar solvent</text>
      <rect x="345" y="58" width="150" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="420" y="88" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">(CH₃)₃C⁺</text>
      <text x="420" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">carbocation: 6 e⁻, positive</text>
      <rect x="505" y="58" width="115" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" strokeWidth="1.5" />
      <text x="562" y="88" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">:Cl⁻</text>
      <text x="562" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">chloride keeps the pair</text>
      <text x="330" y="170" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">the electron pair leaves WITH chlorine — the carbon is left electron-poor</text>
      <text x="330" y="198" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">HCl → H⁺ + Cl⁻ in water is the same story in miniature</text>
      <defs>
        <marker id="hib-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["radical-vs-ion-species.tsx"] = wrap("RadicalVsIonSpecies",
 "Free radical carbocation and carbanion compared",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Three intermediates, three personalities</text>
      {[
        ["free radical", "Cl·", "neutral · 7 e⁻ · unpaired", "from homolysis", "rgb(16 185 129)", 40],
        ["carbocation", "CH₃⁺", "positive · 6 e⁻ · electron-poor", "electrophile", "rgb(239 68 68)", 240],
        ["carbanion", "CH₃⁻", "negative · 8 e⁻ · electron-rich", "nucleophile", "rgb(59 130 246)", 440],
      ].map(([h, f, d, o, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="110" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="80" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="104" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{f as string}</text>
          <text x={(x as number) + 90} y="128" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          <text x={(x as number) + 90} y="150" fontSize="9" fontWeight="800" textAnchor="middle" fill={col as string}>{o as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">count the electrons and the charge — the behaviour follows automatically</text>
""")

FILES["curly-arrow-notation.tsx"] = wrap("CurlyArrowNotation",
 "Curly arrow notation full head for pairs half head for single electrons",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Reading the arrows of a mechanism</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">full-head arrow ⟶</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">a PAIR of electrons moves</text>
      <text x="180" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">heterolysis, nucleophilic attack</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">half-head (fishhook) ⟶</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">a SINGLE electron moves</text>
      <text x="480" y="134" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">homolysis, radical steps</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">arrows always show ELECTRON movement — never atom movement</text>
""")

FILES["methane-chlorination-chain.tsx"] = wrap("MethaneChlorinationChain",
 "Free radical chain mechanism of methane chlorination three stages",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chlorination of CH₄ — the radical chain</text>
      {[
        ["INITIATION", "Cl₂ → 2Cl·", "light splits the bond", "rgb(239 68 68)", 40, 52],
        ["PROPAGATION", "Cl· + CH₄ → CH₃· + HCl", "then CH₃· + Cl₂ → CH₃Cl + Cl·", "rgb(245 158 11)", 40, 122],
        ["TERMINATION", "Cl· + Cl· → Cl₂", "radicals annihilate", "rgb(59 130 246)", 40, 192],
      ].map(([h, e, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="580" height="56" rx="10" fill={col as string} opacity="0.08" stroke={col as string} strokeWidth="1.5" />
          <text x={20 + (x as number)} y={(y as number) + 24} fontSize="11" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={20 + (x as number)} y={(y as number) + 44} fontSize="10.5" fontWeight="800" className="fill-current text-foreground">{e as string}</text>
          <text x={360} y={(y as number) + 44} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
""")

FILES["fission-condition-map.tsx"] = wrap("FissionConditionMap",
 "Conditions selecting homolytic versus heterolytic fission",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">What decides the split?</text>
      {[
        ["non-polar bond", "Cl–Cl, C–C", "rgb(59 130 246)", 40, 55],
        ["heat or light", "energy input", "rgb(245 158 11)", 240, 55],
        ["non-polar solvent", "gas phase", "rgb(20 184 166)", 440, 55],
        ["→ HOMOLYSIS", "radicals", "rgb(16 185 129)", 140, 140],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <path d="M 130 111 L 200 136" stroke="rgb(16 185 129)" strokeWidth="2" markerEnd="url(#fcm-a)" />
      <rect x="340" y="140" width="280" height="56" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" strokeWidth="1.5" />
      <text x="480" y="164" fontSize="10.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">polar bond + polar solvent → HETEROLYSIS</text>
      <text x="480" y="184" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">ions: cation + anion</text>
      <defs>
        <marker id="fcm-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
