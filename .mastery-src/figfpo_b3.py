# Figures for Fundamental Principles of Organic Chemistry rows 109-111 (21 figures).
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

# ---------------- row 109: electrophiles, nucleophiles, radicals ----------------

FILES["three-attacker-classes.tsx"] = wrap("ThreeAttackerClasses",
 "Electrophiles nucleophiles and free radicals as three reagent classes",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The three attackers of organic chemistry</text>
      {[
        ["ELECTROPHILE", "electron-LOVING", "accepts a pair; attacks π bonds & lone pairs", "rgb(239 68 68)", 40],
        ["NUCLEOPHILE", "nucleus-LOVING", "donates a pair; attacks δ+ centres", "rgb(59 130 246)", 240],
        ["FREE RADICAL", "unpaired electron", "neutral; strips atoms from bonds", "rgb(16 185 129)", 440],
      ].map(([h, sub, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="110" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="80" fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="100" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{sub as string}</text>
          <text x={(x as number) + 90} y={126} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">identify the attacker and the target it seeks — the reaction predicts itself</text>
""")

FILES["electrophile-roster.tsx"] = wrap("ElectrophileRoster",
 "Charged and neutral electrophiles with incomplete octets",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Electrophile roster — charged and neutral</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">CHARGED (cations)</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">H⁺ · NO₂⁺ · CH₃⁺ · Br⁺ · Cl⁺</text>
      <text x="180" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">NO₂⁺ attacks benzene in nitration</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CH₃⁺ = the carbocation of substitution</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(245 158 11)" opacity="0.1" stroke="rgb(245 158 11)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">NEUTRAL (incomplete octet)</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">BF₃ · AlCl₃ · SO₃</text>
      <text x="480" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">empty orbitals accept electron pairs</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">AlCl₃ catalyses Friedel–Crafts</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">charge is not the criterion — electron deficiency is</text>
""")

FILES["nucleophile-roster.tsx"] = wrap("NucleophileRoster",
 "Charged and neutral nucleophiles with lone pairs",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Nucleophile roster — charged and neutral</text>
      <rect x="40" y="52" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CHARGED (anions)</text>
      <text x="180" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">OH⁻ · CN⁻ · Cl⁻ · CH₃O⁻ · H⁻</text>
      <text x="180" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">CN⁻ extends chains; OH⁻ substitutes</text>
      <text x="180" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">a lone pair plus a negative charge</text>
      <rect x="340" y="52" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">NEUTRAL (lone pairs)</text>
      <text x="480" y="104" fontSize="11" textAnchor="middle" className="fill-current text-foreground">H₂O · NH₃ · ROH · RNH₂</text>
      <text x="480" y="130" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">lone pairs make them donors</text>
      <text x="480" y="152" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">NH₃ → amines; H₂O → alcohols</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">a nucleophile is a Lewis base in action</text>
""")

FILES["radical-chain-stages.tsx"] = wrap("RadicalChainStages",
 "Initiation propagation termination stages of radical chain reaction",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The radical chain — three stages</text>
      {[
        ["1 · INITIATION", "Cl₂ → 2Cl·", "light creates the first radicals", "rgb(239 68 68)", 40, 52],
        ["2 · PROPAGATION", "Cl· + CH₄ → CH₃· + HCl; CH₃· + Cl₂ → CH₃Cl + Cl·", "each step makes the next radical — the chain sustains itself", "rgb(245 158 11)", 40, 122],
        ["3 · TERMINATION", "Cl· + Cl· → Cl₂ (or CH₃· + Cl·, CH₃· + CH₃·)", "radicals combine; the chain dies", "rgb(59 130 246)", 40, 192],
      ].map(([h, e, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="580" height="58" rx="10" fill={col as string} opacity="0.08" stroke={col as string} strokeWidth="1.5" />
          <text x={20 + (x as number)} y={(y as number) + 22} fontSize="10.5" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={20 + (x as number)} y={(y as number) + 42} fontSize="9.5" fontWeight="800" className="fill-current text-foreground">{e as string}</text>
          <text x={20 + (x as number)} y={(y as number) + 55} fontSize="8.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
""")

FILES["attacker-target-match.tsx"] = wrap("AttackerTargetMatch",
 "Matching each reagent class to its preferred target site",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Attacker meets target</text>
      {[
        ["E⁺ electrophile", "→ electron-rich sites", "π bonds, lone pairs, aromatic rings", "rgb(239 68 68)", 40, 55],
        ["Nu⁻ nucleophile", "→ electron-poor sites", "δ+ carbons (C=O, C–X), cations", "rgb(59 130 246)", 40, 125],
        ["X· radical", "→ any σ bond", "abstracts H, adds to C=C", "rgb(16 185 129)", 40, 195],
      ].map(([h, m, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="580" height="58" rx="10" fill={col as string} opacity="0.08" stroke={col as string} strokeWidth="1.5" />
          <text x={60} y={(y as number) + 24} fontSize="11.5" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={260} y={(y as number) + 24} fontSize="11" fontWeight="800" className="fill-current text-foreground">{m as string}</text>
          <text x={60} y={(y as number) + 44} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
""")

FILES["lewis-acid-base-link.tsx"] = wrap("LewisAcidBaseLink",
 "Electrophiles as Lewis acids and nucleophiles as Lewis bases",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The Lewis connection</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ELECTROPHILE = Lewis ACID</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">accepts an electron pair</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">BF₃, AlCl₃, H⁺, carbocations</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">NUCLEOPHILE = Lewis BASE</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">donates an electron pair</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">OH⁻, NH₃, CN⁻, H₂O</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">same definitions, reaction-flavoured vocabulary — acid/base theory in motion</text>
""")

FILES["neutral-member-examples.tsx"] = wrap("NeutralMemberExamples",
 "Neutral electrophiles and nucleophiles showing charge is not the criterion",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Neutral but active — the counter-examples</text>
      {[
        ["BF₃", "no charge, empty p orbital", "strong electrophile", "rgb(245 158 11)", 40],
        ["AlCl₃", "no charge, electron-poor Al", "Friedel–Crafts catalyst", "rgb(139 92 246)", 240],
        ["NH₃", "no charge, one lone pair", "good nucleophile", "rgb(16 185 129)", 440],
      ].map(([h, d, r, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="55" width="180" height="100" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="84" fontSize="13" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="108" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          <text x={(x as number) + 90} y="132" fontSize="10" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="190" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">judge by electrons, not by charge</text>
""")

# ---------------- row 110: inductive effect ----------------

FILES["inductive-effect-concept.tsx"] = wrap("InductiveEffectConcept",
 "Inductive effect permanent sigma electron displacement along a chain",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The inductive effect — polarisation that travels</text>
      <rect x="40" y="55" width="580" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" />
      <text x="330" y="80" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl ← CH₂ ← CH₂ ← CH₃  (σ-electrons pulled toward Cl)</text>
      <text x="330" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">δ− at Cl · δ+ δ+ δ+ fading along the chain</text>
      {[
        ["permanent", "a ground-state polarisation", "rgb(16 185 129)", 40],
        ["through σ bonds", "no π system needed", "rgb(245 158 11)", 240],
        ["fades fast", "negligible after ~3 carbons", "rgb(239 68 68)", 440],
      ].map(([h, d, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="140" width="180" height="56" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y="163" fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y="184" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
""")

FILES["minus-i-group-roster.tsx"] = wrap("MinusIGroupRoster",
 "Electron withdrawing minus I effect groups list",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">−I groups — the electron withdrawers</text>
      {[
        ["−NO₂", "strongest of the common set", "rgb(239 68 68)", 40],
        ["−CN", "nitrile pulls hard", "rgb(245 158 11)", 240],
        ["−COOH · −CHO", "carbonyl family", "rgb(139 92 246)", 440],
        ["−F · −Cl · −Br · −I", "the halogens", "rgb(59 130 246)", 140, 130],
        ["−OH", "oxygen electronegativity", "rgb(16 185 129)", 380, 130],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="180" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 90} y={(y as number) + 24} fontSize="11" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 90} y={(y as number) + 44} fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="215" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">all more electronegative than carbon — they pull σ-electrons toward themselves</text>
""")

FILES["plus-i-group-roster.tsx"] = wrap("PlusIGroupRoster",
 "Electron releasing plus I effect alkyl groups",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">+I groups — the electron releasers</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ALKYL GROUPS</text>
      <text x="180" y="108" fontSize="11" textAnchor="middle" className="fill-current text-foreground">−CH₃ · −C₂H₅ · −CH(CH₃)₂</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">less electronegative than carbon</text>
      <text x="180" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">push σ-electrons toward the chain</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">METALS</text>
      <text x="480" y="108" fontSize="11" textAnchor="middle" className="fill-current text-foreground">Na · Mg · Li (organometallic C–M)</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">strongly electropositive partners</text>
      <text x="480" y="156" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">carbon becomes δ− — nucleophilic</text>
      <text x="330" y="200" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">the more alkyl groups on a centre, the more electron density is pushed onto it</text>
""")

FILES["distance-decay-panel.tsx"] = wrap("DistanceDecayPanel",
 "Inductive effect fading with distance along the chain",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The effect dies with distance</text>
      {[
        ["α-carbon", "strong", "rgb(239 68 68)", 60, 110],
        ["β-carbon", "weak", "rgb(245 158 11)", 200, 140],
        ["γ-carbon", "faint", "rgb(59 130 246)", 340, 165],
        ["δ-carbon", "≈ nothing", "rgb(148 163 184)", 480, 180],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="110" height="40" rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={(x as number) + 55} y={(y as number) + 17} fontSize="10" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 55} y={(y as number) + 33} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="60" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Cl–CH₂–CH₂–CH₂–CH₃ : the pull fades bond by bond</text>
      <text x="330" y="90" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">α-chloro acids are far more acidic than β-chloro ones — distance is measurable</text>
""")

FILES["acidity-ladder-ccx.tsx"] = wrap("AcidityLadderCcx",
 "Acidity order acetic chloroacetic dichloroacetic trichloroacetic acid",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Acidity ladder — chlorines strengthen the acid</text>
      {[
        ["CH₃COOH", "baseline", 190, "rgb(148 163 184)"],
        ["ClCH₂COOH", "one −I", 150, "rgb(59 130 246)"],
        ["CHCl₂COOH", "two −I", 110, "rgb(245 158 11)"],
        ["CCl₃COOH", "three −I", 70, "rgb(239 68 68)"],
      ].map(([f, d, y, col], i) => (
        <g key={f as string}>
          <rect x={60 + (i as number) * 145} y={y as number} width="130" height={230 - (y as number)} rx="8" fill={col as string} opacity="0.15" stroke={col as string} />
          <text x={125 + (i as number) * 145} y={(y as number) + 22} fontSize="10.5" fontWeight="800" textAnchor="middle" fill={col as string}>{f as string}</text>
          <text x={125 + (i as number) * 145} y={(y as number) + 40} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="46" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">each −I chlorine stabilises the carboxylate anion → stronger acid</text>
""")

FILES["carbocation-stability-order.tsx"] = wrap("CarbocationStabilityOrder",
 "Carbocation stability order tertiary secondary primary methyl",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Carbocation stability: 3° > 2° > 1° > CH₃⁺</text>
      {[
        ["3°", "three alkyl +I donors", "most stable", "rgb(16 185 129)", 40],
        ["2°", "two alkyl donors", "stable", "rgb(245 158 11)", 220],
        ["1°", "one alkyl donor", "less stable", "rgb(239 68 68)", 400],
        ["CH₃⁺", "no donors at all", "least stable", "rgb(148 163 184)", 540],
      ].map(([h, d, r, col, x]) => (
        <g key={h as string}>
          <rect x={x as number} y="60" width={(h === "CH₃⁺" ? 80 : 140)} height="90" rx="10" fill={col as string} opacity="0.12" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + (h === "CH₃⁺" ? 40 : 70)} y="92" fontSize="14" fontWeight="800" textAnchor="middle" fill={col as string}>{h as string}</text>
          <text x={(x as number) + (h === "CH₃⁺" ? 40 : 70)} y="114" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{d as string}</text>
          <text x={(x as number) + (h === "CH₃⁺" ? 40 : 70)} y="136" fontSize="8.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{r as string}</text>
        </g>
      ))}
      <text x="330" y="185" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">+I alkyl groups disperse the positive charge — more donors, more dispersal, more stability</text>
""")

FILES["charge-dispersal-logic.tsx"] = wrap("ChargeDispersalLogic",
 "Charge dispersal logic stabilises ions in both directions",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">One physics, two directions</text>
      <rect x="40" y="55" width="280" height="110" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="82" fontSize="12" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">negative centre</text>
      <text x="180" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">−I groups spread the charge</text>
      <text x="180" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">carboxylate stabilised → acid stronger</text>
      <rect x="340" y="55" width="280" height="110" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="480" y="82" fontSize="12" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">positive centre</text>
      <text x="480" y="108" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">+I groups spread the charge</text>
      <text x="480" y="134" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">carbocation stabilised → forms easier</text>
      <text x="330" y="200" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">dispersed charge = stabilised ion — always</text>
""")

# ---------------- row 111: resonance effect ----------------

FILES["resonance-hybrid-idea.tsx"] = wrap("ResonanceHybridIdea",
 "Resonance hybrid of canonical structures concept",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Resonance — one molecule, several drawings</text>
      <rect x="40" y="55" width="160" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="120" y="86" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">canonical 1</text>
      <text x="120" y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">one valid Lewis form</text>
      <text x="215" y="95" fontSize="16" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">↔</text>
      <rect x="240" y="55" width="160" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="320" y="86" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">canonical 2</text>
      <text x="320" y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">same atoms, electrons moved</text>
      <text x="415" y="95" fontSize="16" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">=</text>
      <rect x="440" y="55" width="180" height="70" rx="10" fill="rgb(245 158 11)" opacity="0.12" stroke="rgb(245 158 11)" strokeWidth="2" />
      <text x="530" y="86" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">REAL HYBRID</text>
      <text x="530" y="108" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">more stable than any form</text>
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">the molecule does NOT flip between forms — it IS the hybrid</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">electrons move between drawings; atoms never do (arrow ↔, never ⇌)</text>
""")

FILES["canonical-rules-panel.tsx"] = wrap("CanonicalRulesPanel",
 "Rules for drawing valid canonical resonance structures",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Rules of the resonance game</text>
      {[
        ["electrons move", "π pairs and lone pairs shift", "rgb(59 130 246)", 40, 52],
        ["atoms NEVER move", "the σ skeleton is frozen", "rgb(239 68 68)", 340, 52],
        ["charges appear where electrons land", "bookkeeping stays honest", "rgb(245 158 11)", 40, 122],
        ["arrow is ↔ not ⇌", "resonance is not equilibrium", "rgb(16 185 129)", 340, 122],
      ].map(([h, d, col, x, y]) => (
        <g key={h as string}>
          <rect x={x as number} y={y as number} width="280" height="58" rx="10" fill={col as string} opacity="0.1" stroke={col as string} strokeWidth="1.5" />
          <text x={(x as number) + 14} y={(y as number) + 24} fontSize="11" fontWeight="800" fill={col as string}>{h as string}</text>
          <text x={(x as number) + 14} y={(y as number) + 44} fontSize="9.5" className="fill-current text-muted-foreground">{d as string}</text>
        </g>
      ))}
      <text x="330" y="212" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">if you find yourself moving an atom, you are drawing a different compound — not a canonical form</text>
""")

FILES["ozone-canonical-structures.tsx"] = wrap("OzoneCanonicalStructures",
 "Ozone resonance structures with formal charges",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Ozone: two drawings, one molecule</text>
      <rect x="40" y="55" width="280" height="100" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="88" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">⁻O–O⁺=O</text>
      <text x="180" y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">negative on the left oxygen, double bond right</text>
      <rect x="340" y="55" width="280" height="100" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="88" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">O=O⁺–O⁻</text>
      <text x="480" y="116" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">mirror image: double bond left, negative right</text>
      <text x="330" y="185" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">reality: both O–O bonds IDENTICAL, each between single and double</text>
      <text x="330" y="210" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">neither drawing alone is true — the hybrid is</text>
""")

FILES["benzene-kekule-pair.tsx"] = wrap("BenzeneKekulePair",
 "Benzene two Kekule structures resonating to equal bonds",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Benzene: the two Kekulé forms</text>
      <rect x="40" y="50" width="280" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="180" y="78" fontSize="11.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">Kekulé I</text>
      <circle cx="180" cy="120" r="42" fill="none" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="180" y="126" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">=–=</text>
      <text x="180" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">alternating double bonds, set A</text>
      <rect x="340" y="50" width="280" height="120" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="480" y="78" fontSize="11.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">Kekulé II</text>
      <circle cx="480" cy="120" r="42" fill="none" stroke="rgb(16 185 129)" strokeWidth="2" />
      <text x="480" y="126" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">–=–</text>
      <text x="480" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">the double bonds swap positions</text>
      <text x="330" y="196" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">hybrid: all six C–C bonds equal at 1.39 Å</text>
""")

FILES["resonance-energy-bar.tsx"] = wrap("ResonanceEnergyBar",
 "Resonance energy of benzene about 150 kJ per mole",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Resonance energy — the stability dividend</text>
      <rect x="60" y="70" width="240" height="46" rx="8" fill="rgb(148 163 184)" opacity="0.2" stroke="rgb(148 163 184)" />
      <text x="180" y="98" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">imagined cyclohexatriene</text>
      <rect x="60" y="130" width="420" height="46" rx="8" fill="rgb(16 185 129)" opacity="0.2" stroke="rgb(16 185 129)" />
      <text x="270" y="158" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">real benzene (delocalised π cloud)</text>
      <path d="M 300 116 L 480 126" stroke="rgb(245 158 11)" strokeWidth="2.5" markerEnd="url(#reb-a)" />
      <text x="395" y="112" fontSize="10.5" fontWeight="800" fill="rgb(245 158 11)" textAnchor="middle">≈ 150 kJ/mol gained</text>
      <text x="330" y="205" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">this is why benzene substitutes instead of adding — addition would destroy the delocalisation</text>
      <defs>
        <marker id="reb-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(245 158 11)" /></marker>
      </defs>
""")

FILES["plus-r-group-flow.tsx"] = wrap("PlusRGroupFlow",
 "Plus R electron donating groups enrich ortho para positions",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">+R effect — lone-pair donors</text>
      <rect x="40" y="55" width="240" height="70" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="160" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">+R groups</text>
      <text x="160" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">−OH · −OR · −NH₂ · −NR₂ · −X</text>
      <path d="M 285 90 L 360 90" stroke="rgb(16 185 129)" strokeWidth="3" markerEnd="url(#prf-a)" />
      <text x="322" y="78" fontSize="9.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">lone pair in</text>
      <rect x="365" y="55" width="255" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="492" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">ring enriched at o/p</text>
      <text x="492" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">activated toward electrophiles</text>
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">phenol brominates instantly at ortho/para — +R at work</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">halogens donate by resonance even while withdrawing inductively — two-faced</text>
      <defs>
        <marker id="prf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(16 185 129)" /></marker>
      </defs>
""")

FILES["minus-r-group-flow.tsx"] = wrap("MinusRGroupFlow",
 "Minus R electron withdrawing groups deplete ring direct meta",
 """      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">−R effect — π-electron withdrawers</text>
      <rect x="40" y="55" width="240" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="160" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">−R groups</text>
      <text x="160" y="106" fontSize="10" textAnchor="middle" className="fill-current text-foreground">−NO₂ · −CN · −CHO · −COOH · C=O</text>
      <path d="M 285 90 L 360 90" stroke="rgb(239 68 68)" strokeWidth="3" markerEnd="url(#mrf-a)" />
      <text x="322" y="78" fontSize="9.5" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">π electrons out</text>
      <rect x="365" y="55" width="255" height="70" rx="10" fill="rgb(59 130 246)" opacity="0.1" stroke="rgb(59 130 246)" />
      <text x="492" y="82" fontSize="11" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">ring depleted at o/p</text>
      <text x="492" y="106" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">deactivated; substitution goes meta</text>
      <text x="330" y="165" fontSize="11" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">nitrobenzene nitrates slowly — and only at the meta position</text>
      <text x="330" y="192" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">meta stays relatively electron-rich when o/p are drained</text>
      <defs>
        <marker id="mrf-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="rgb(239 68 68)" /></marker>
      </defs>
""")

for fn, content in FILES.items():
    with open(os.path.join(OUT, fn), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
print("wrote", len(FILES), "figures")
