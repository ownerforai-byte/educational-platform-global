# Figures for Basic Concept of Organic Chemistry rows 101-102 (14 figures).
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

# ---------------- row 101: formula notations ----------------

FILES["formula-notation-ladder.tsx"] = wrap("FormulaNotationLadder",
 "Ladder of chemical formula notations from molecular to bond line",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Four notations, one molecule (ethanol)</text>
      {[
        ["MOLECULAR", "C₂H₆O", "atom counts only — isomer-blind", "rgb(148 163 184)", 55],
        ["CONDENSED", "CH₃CH₂OH", "groups in sequence — connectivity kept", "rgb(59 130 246)", 100],
        ["STRUCTURAL", "H–C–C–O–H (all bonds drawn)", "complete but slow", "rgb(16 185 129)", 145],
        ["BOND-LINE", "zig-zag lines, C and H implied", "fastest — literature standard", "rgb(245 158 11)", 190],
      ].map(([h, f, d, col, y]) => (
        <g key={h as string}>
          <rect x="40" y={y as number} width="580" height="36" rx="9" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x="56" y={(y as number) + 23} fontSize="10.5" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x="180" y={(y as number) + 23} fontSize="11" fontWeight="800" className="fill-current text-foreground">{f as string}</text>
          <text x="440" y={(y as number) + 23} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
""")

FILES["c2h6o-isomer-test.tsx"] = wrap("C2H6OIsomerTest",
 "Molecular formula C2H6O hiding two different compounds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Where the molecular formula fails</text>
      <rect x="200" y="55" width="260" height="44" rx="10" fill="rgb(148 163 184)" opacity="0.14" stroke="rgb(148 163 184)" />
      <text x="330" y="83" fontSize="14" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C₂H₆O  =  ???</text>
      <path d="M 250 105 L 180 140" stroke="rgb(59 130 246)" strokeWidth="2.5" markerEnd="url(#cit-a)" />
      <path d="M 410 105 L 480 140" stroke="rgb(239 68 68)" strokeWidth="2.5" markerEnd="url(#cit-a)" />
      <rect x="40" y="145" width="280" height="60" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="168" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">ethanol CH₃CH₂OH</text>
      <text x="180" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–C–O–H · liquid · b.p. 78 °C</text>
      <rect x="340" y="145" width="280" height="60" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="168" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">dimethyl ether CH₃OCH₃</text>
      <text x="480" y="192" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C–O–C · gas · different chemistry</text>
      <text x="330" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Only the condensed formula restores the identity</text>
      <defs>
        <marker id="cit-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["bond-line-conventions.tsx"] = wrap("BondLineConventions",
 "Four conventions for reading bond line skeletal formulas",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Bond-line rules of the road</text>
      {[
        ["1", "every line end / vertex = a carbon atom", "rgb(59 130 246)", 55],
        ["2", "H on carbon is implied (valency 4) — never drawn", "rgb(16 185 129)", 95],
        ["3", "hetero atoms (O, N, S, X) shown, with their H (O–H, N–H)", "rgb(239 68 68)", 135],
        ["4", "double / triple bonds drawn as 2 / 3 parallel lines", "rgb(245 158 11)", 175],
      ].map(([n, d, col, y]) => (
        <g key={n as string}>
          <circle cx="62" cy={(y as number) + 14} r="13" fill={col as string} opacity="0.2" />
          <text x="62" y={(y as number) + 19} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{n as string}</text>
          <text x="88" y={(y as number) + 19} fontSize="10.5" className="fill-current text-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a five-point zig-zag reads as pentane; the same skeleton ending in –OH reads as pentan-1-ol</text>
""")

FILES["ethanol-three-ways.tsx"] = wrap("EthanolThreeWays",
 "Ethanol written as condensed structural and bond line formulas",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ethanol three ways</text>
      <rect x="40" y="55" width="180" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="130" y="80" fontSize="11" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CONDENSED</text>
      <text x="130" y="118" fontSize="14" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CH₃CH₂OH</text>
      <text x="130" y="145" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">(also written C₂H₅OH)</text>
      <rect x="240" y="55" width="180" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="330" y="80" fontSize="11" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">STRUCTURAL</text>
      <text x="285" y="115" fontSize="10.5" className="fill-current text-foreground">H</text>
      <text x="330" y="115" fontSize="10.5" className="fill-current text-foreground">H</text>
      <text x="375" y="115" fontSize="10.5" className="fill-current text-foreground">H</text>
      <line x1="292" y1="122" x2="322" y2="122" stroke="rgb(16 185 129)" strokeWidth="2" />
      <line x1="338" y1="122" x2="368" y2="122" stroke="rgb(16 185 129)" strokeWidth="2" />
      <line x1="382" y1="122" x2="402" y2="122" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="285" y="140" fontSize="10.5" className="fill-current text-foreground">H–C</text>
      <text x="327" y="140" fontSize="10.5" className="fill-current text-foreground">C–O–H</text>
      <text x="330" y="162" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">every bond drawn</text>
      <rect x="440" y="55" width="180" height="110" rx="10" fill="rgb(245 158 11)" opacity="0.08" stroke="rgb(245 158 11)" />
      <text x="530" y="80" fontSize="11" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">BOND-LINE</text>
      <line x1="480" y1="130" x2="515" y2="105" stroke="rgb(245 158 11)" strokeWidth="3" />
      <line x1="515" y1="105" x2="550" y2="130" stroke="rgb(245 158 11)" strokeWidth="3" />
      <text x="558" y="135" fontSize="10.5" fontWeight="800" className="fill-current text-foreground">OH</text>
      <text x="530" y="162" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">two carbons implied</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Same molecule, three speeds of writing — fluency in all three is basic literacy</text>
""")

FILES["zigzag-reading-drill.tsx"] = wrap("ZigzagReadingDrill",
 "Reading a pentane zig zag skeleton into a condensed formula",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Read the zig-zag</text>
      <line x1="90" y1="120" x2="150" y2="90" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      <line x1="150" y1="90" x2="210" y2="120" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      <line x1="210" y1="120" x2="270" y2="90" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      <line x1="270" y1="90" x2="330" y2="120" stroke="rgb(59 130 246)" strokeWidth="3.5" />
      {[90, 150, 210, 270, 330].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i % 2 ? 90 : 120} r="9" fill="rgb(59 130 246)" opacity="0.35" />
      ))}
      <text x="90" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C1 (CH₃)</text>
      <text x="210" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C3 (CH₂)</text>
      <text x="330" y="150" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">C5 (CH₃)</text>
      <path d="M 380 105 L 430 105" stroke="rgb(148 163 184)" strokeWidth="2.5" markerEnd="url(#zrd-a)" />
      <text x="405" y="93" fontSize="9.5" fill="rgb(148 163 184)" textAnchor="middle">reads as</text>
      <text x="445" y="112" fontSize="14" fontWeight="800" className="fill-current text-foreground">CH₃CH₂CH₂CH₂CH₃</text>
      <text x="545" y="132" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)">pentane C₅H₁₂</text>
      <text x="330" y="190" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">5 vertices = 5 carbons; hydrogens supplied by valency 4 — no atoms needed on the page</text>
      <defs>
        <marker id="zrd-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["condensed-formula-examples.tsx"] = wrap("CondensedFormulaExamples",
 "Condensed formulas of ethane ethanol and acetic acid",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Condensed formulas — the working notation</text>
      {[
        ["ethane", "CH₃–CH₃", "C₂H₆", "rgb(59 130 246)", 55],
        ["ethanol", "CH₃CH₂OH", "C₂H₆O", "rgb(16 185 129)", 115],
        ["acetic acid", "CH₃COOH", "C₂H₄O₂", "rgb(239 68 68)", 175],
      ].map(([n, c, m, col, y]) => (
        <g key={n as string}>
          <rect x="40" y={y as number} width="580" height="46" rx="10" fill={col as string} opacity="0.09" stroke={col as string} strokeWidth="1.5" />
          <text x="60" y={(y as number) + 29} fontSize="11.5" fontWeight="800" fill={col as string}>{n as string}</text>
          <text x="260" y={(y as number) + 29} fontSize="13" fontWeight="800" className="fill-current text-foreground">{c as string}</text>
          <text x="480" y={(y as number) + 29} fontSize="10.5" className="fill-current text-muted-foreground">molecular: {m as string}</text>
        </g>
      ))}
      <text x="330" y="234" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">groups written together; order of attachment preserved — unique identity at writing speed</text>
""")

FILES["multiple-bond-lines.tsx"] = wrap("MultipleBondLines",
 "Drawing double and triple bonds in line formulas",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One line, two lines, three lines</text>
      {[
        ["single C–C", "ethane", 1, "rgb(16 185 129)", 75],
        ["double C=C", "ethene CH₂=CH₂", 2, "rgb(245 158 11)", 130],
        ["triple C≡C", "ethyne HC≡CH", 3, "rgb(239 68 68)", 190],
      ].map(([n, ex, k, col, y]) => (
        <g key={n as string}>
          <text x="70" y={(y as number) + 5} fontSize="11" fontWeight="800" fill={col as string}>{n as string}</text>
          {[0, 1, 2].map((i) => (i < (k as number) ? (
            <line key={i} x1="220" y1={(y as number) - 6 + i * 8} x2="330" y2={(y as number) - 6 + i * 8} stroke={col as string} strokeWidth="3" />
          ) : null))}
          <text x="360" y={(y as number) + 5} fontSize="10" className="fill-current text-muted-foreground">{ex as string}</text>
        </g>
      ))}
      <text x="330" y="228" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">unsaturation lives in the parallel lines — each extra pair is a reactive site</text>
""")

# ---------------- row 102: cracking / reforming / octane ----------------

FILES["cracking-vs-reforming.tsx"] = wrap("CrackingVsReforming",
 "Cracking changes molecular size while reforming changes shape",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Cracking cuts; reforming reshapes</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="180" y="80" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CRACKING — size down</text>
      <text x="180" y="110" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C₁₀H₂₂ → C₈H₁₈ + C₂H₄</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">heat ~500–700 °C (thermal)</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">or zeolite ~450–500 °C (catalytic)</text>
      <text x="180" y="170" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">petrol-range alkanes + alkene feedstock</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="480" y="80" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">REFORMING — shape change</text>
      <text x="480" y="110" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-hexane → benzene + 4H₂</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">Pt catalyst, ~500 °C (platforming)</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chains → branched + aromatic</text>
      <text x="480" y="170" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">same carbon number, new skeleton</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Different jobs: cracking supplies molecules, reforming upgrades them</text>
""")

FILES["catalytic-cracking-flow.tsx"] = wrap("CatalyticCrackingFlow",
 "Catalytic cracking of heavy petroleum fractions over zeolite catalyst",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Catalytic cracking — the refinery workhorse</text>
      {[
        ["heavy fraction", "long chains, low value", "rgb(120 113 108)", 40],
        ["zeolite catalyst", "~450–500 °C", "rgb(59 130 246)", 200],
        ["cracking", "C–C bonds split", "rgb(245 158 11)", 360],
        ["products", "petrol + alkenes", "rgb(16 185 129)", 520],
      ].map(([h, d, col, x], i) => (
        <g key={h as string}>
          <rect x={x as number} y="70" width="110" height="64" rx="10" fill={col as string} opacity="0.12" stroke={col as string} />
          <text x={(x as number) + 55} y="96" fontSize="9.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 55} y="116" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          {i < 3 && <path d={`M ${(x as number) + 112} 102 L ${(x as number) + 147} 102`} stroke="rgb(148 163 184)" strokeWidth="2" markerEnd="url(#ccf-a)" />}
        </g>
      ))}
      <text x="330" y="170" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">C₁₀H₂₂ → C₈H₁₈ + C₂H₄</text>
      <text x="330" y="196" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">catalyst = lower temperature + better yields of branched alkanes and aromatics</text>
      <text x="330" y="218" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">alkenes (ethene, propene) feed the polymer and chemical industries</text>
      <defs>
        <marker id="ccf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(148 163 184)" /></marker>
      </defs>
""")

FILES["reforming-platforming.tsx"] = wrap("ReformingPlatforming",
 "Platinum catalysed reforming converting straight chains into aromatics",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Platforming — same size, better shape</text>
      <rect x="40" y="70" width="180" height="70" rx="10" fill="rgb(120 113 108)" opacity="0.12" stroke="rgb(120 113 108)" />
      <text x="130" y="98" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-hexane (straight)</text>
      <text x="130" y="120" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">low octane, knocks</text>
      <path d="M 225 105 L 285 105" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#rpf-a)" />
      <text x="255" y="92" fontSize="9.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">Pt, ~500 °C</text>
      <rect x="290" y="70" width="130" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="355" y="98" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">REFORMER</text>
      <text x="355" y="120" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">(platforming)</text>
      <path d="M 425 105 L 485 105" stroke="rgb(245 158 11)" strokeWidth="3" markerEnd="url(#rpf-a)" />
      <text x="455" y="92" fontSize="9.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">+ 4H₂</text>
      <rect x="490" y="70" width="130" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.12" stroke="rgb(16 185 129)" />
      <text x="555" y="98" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">benzene (ring)</text>
      <text x="555" y="120" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">high octane</text>
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chains → branched alkanes + aromatics, same carbon number</text>
      <text x="330" y="203" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">octane number rises without additives and without changing the boiling range</text>
      <text x="330" y="225" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the H₂ by-product feeds hydrotreating across the refinery</text>
      <defs>
        <marker id="rpf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["octane-scale-panel.tsx"] = wrap("OctaneScalePanel",
 "Octane number scale from n-heptane zero to iso-octane hundred",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Octane number — petrol's knock resistance</text>
      <line x1="80" y1="120" x2="580" y2="120" stroke="rgb(148 163 184)" strokeWidth="4" />
      <circle cx="80" cy="120" r="10" fill="rgb(239 68 68)" />
      <text x="80" y="150" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">0</text>
      <text x="80" y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-heptane</text>
      <text x="80" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chain, knocks</text>
      <circle cx="580" cy="120" r="10" fill="rgb(16 185 129)" />
      <text x="580" y="150" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">100</text>
      <text x="580" y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">iso-octane</text>
      <text x="580" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">2,2,4-trimethylpentane</text>
      <circle cx="330" cy="120" r="8" fill="rgb(59 130 246)" />
      <text x="330" y="150" fontSize="10" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">pump petrol 87–95</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">rating = % iso-octane in the matching mixture with n-heptane</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">branched + aromatic = high · straight = low</text>
""")

FILES["cetane-scale-panel.tsx"] = wrap("CetaneScalePanel",
 "Cetane number scale from alpha methylnaphthalene zero to n-cetane hundred",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Cetane number — diesel's ignition readiness</text>
      <line x1="80" y1="120" x2="580" y2="120" stroke="rgb(148 163 184)" strokeWidth="4" />
      <circle cx="80" cy="120" r="10" fill="rgb(239 68 68)" />
      <text x="80" y="150" fontSize="10.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">0</text>
      <text x="80" y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">α-methylnaphthalene</text>
      <text x="80" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">aromatic, resists ignition</text>
      <circle cx="580" cy="120" r="10" fill="rgb(16 185 129)" />
      <text x="580" y="150" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">100</text>
      <text x="580" y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">n-cetane (C₁₆)</text>
      <text x="580" y="170" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chain, ignites readily</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">diesel ignites by COMPRESSION — it must fire easily, the opposite of petrol</text>
      <text x="330" y="226" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">straight chains = high cetane (good diesel, bad petrol)</text>
""")

FILES["knocking-mechanism.tsx"] = wrap("KnockingMechanism",
 "Knocking in engines caused by premature auto-ignition of straight chain fuel",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Knocking — the premature bang</text>
      <rect x="40" y="55" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.08" stroke="rgb(239 68 68)" />
      <text x="180" y="80" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">STRAIGHT-chain fuel</text>
      <text x="180" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">compression + heat → auto-ignites</text>
      <text x="180" y="128" fontSize="10" textAnchor="middle" className="fill-current text-foreground">BEFORE the spark</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">pressure spike = knock, power loss,</text>
      <text x="180" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">engine damage</text>
      <rect x="340" y="55" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.08" stroke="rgb(16 185 129)" />
      <text x="480" y="80" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">BRANCHED fuel</text>
      <text x="480" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">burns smoothly behind the flame front</text>
      <text x="480" y="128" fontSize="10" textAnchor="middle" className="fill-current text-foreground">waits for the spark</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">uniform burn = high octane,</text>
      <text x="480" y="170" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">no knock</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Cracking, reforming and additives all pursue one goal: more branching, less knock</text>
""")

FILES["fuel-additive-timeline.tsx"] = wrap("FuelAdditiveTimeline",
 "History of gasoline additives from tetraethyl lead to ethanol blending",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Octane on tap: the additive story</text>
      <line x1="60" y1="110" x2="600" y2="110" stroke="rgb(148 163 184)" strokeWidth="3" />
      {[
        ["1920s", "TEL Pb(C₂H₅)₄ — cheap octane", "rgb(239 68 68)", 100],
        ["1970s–", "lead phased out: poisoning + catalysts", "rgb(245 158 11)", 300],
        ["today", "MTBE (restricted) · ethanol blends", "rgb(16 185 129)", 500],
      ].map(([yr, d, col, x], i) => (
        <g key={i}>
          <circle cx={x as number} cy="110" r="7" fill={col as string} />
          <text x={x as number} y="88" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{yr as string}</text>
          <text x={x as number} y="140" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">TEL raised octane at parts-per-thousand doses — and laced the world's cities with lead</text>
      <text x="330" y="203" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">modern octane comes from reforming, branching, and renewable ethanol blending</text>
      <text x="330" y="225" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">MTBE is itself being restricted for groundwater contamination</text>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
