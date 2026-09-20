import type { HighYieldTopicData } from "@/lib/high-yield-topic-facts";

/**
 * Chemistry high-yield bank — organic, bio-inorganic and applied chemistry.
 *
 * Physical and inorganic units live in `high-yield-topic-facts-chemistry.ts`.
 * Every entry lists the `unitSlugs` it serves (ids from
 * `frontend/lib/syllabus.ts`); unit-aware callers resolve only through that
 * list.
 */
export const HIGH_YIELD_TOPIC_BANK_CHEMISTRY_ORGANIC: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Basic Concept of Organic Chemistry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "basic-concept-of-organic-chemistry",
      "iupac",
      "nomenclature",
      "hybridisation",
      "isomerism",
      "tetravalency",
      "homologous-series",
      "degree-of-unsaturation",
    ],
    subject: "chemistry",
    title: "Basic Concepts of Organic Chemistry — Nomenclature & Isomerism",
    unitSlugs: ["basic-concept-of-organic-chemistry", "basic-concept-organic"],
    category: "Organic Chemistry",
    governingLaws: [
      {
        name: "Tetravalency and Hybridisation of Carbon",
        statement:
          "Carbon forms four covalent bonds, and the hybridisation of the carbon atom fixes the geometry of the bonds around it.",
        formula:
          "sp^3 \\rightarrow 109.5^\\circ \\text{ tetrahedral}, \\quad sp^2 \\rightarrow 120^\\circ \\text{ planar}, \\quad sp \\rightarrow 180^\\circ \\text{ linear}",
        conditions:
          "The three hybridisations correspond to a single, a double and a triple bond respectively, and determine the bond angles.",
      },
      {
        name: "IUPAC Nomenclature Rules",
        statement:
          "The name of an organic compound gives the longest continuous carbon chain, then the principal functional group by its suffix, then the numbering from the end giving the lowest locants, then the substituents in alphabetical order.",
        formula:
          "\\text{prefix} + \\text{root} + \\text{primary suffix} + \\text{secondary suffix}",
        conditions:
          "When a choice of chain length exists, the chain with the maximum number of substituents is preferred even if it is not the longest.",
      },
    ],
    speedFormulas: [
      {
        name: "General Formulae of Homologous Series",
        formula:
          "\\text{Alkane } C_nH_{2n+2}, \\quad \\text{alkene } C_nH_{2n}, \\quad \\text{alkyne } C_nH_{2n-2}, \\quad \\text{alcohol } C_nH_{2n+1}OH",
        description:
          "Successive members of a homologous series differ by a CH2 unit and 14 in molar mass, and show a gradual change in physical properties.",
        unit: "formula",
      },
      {
        name: "Degree of Unsaturation (Double Bond Equivalent)",
        formula: "DoU = \\frac{2C + 2 + N - H - X}{2}",
        description:
          "Each double bond or ring counts as one, each triple bond or two rings as two. Benzene C6H6 gives (12 + 2 - 6)/2 = 4.",
        unit: "dimensionless",
      },
      {
        name: "Bond Lengths and Strengths",
        formula:
          "C{-}C = 154\\ pm, \\quad C{=}C = 134\\ pm, \\quad C{\\equiv}C = 120\\ pm",
        description:
          "Bond length decreases and bond strength increases as bond order rises, which is why alkenes are more reactive than alkanes.",
        unit: "pm",
      },
    ],
    constantsAndValues: [
      { symbol: "\\angle(HCH)", name: "Tetrahedral bond angle in methane", value: "109.5", unit: "degrees" },
      { symbol: "\\angle", name: "Bond angle in ethene (sp2)", value: "120", unit: "degrees" },
      { symbol: "\\angle", name: "Bond angle in ethyne (sp)", value: "180", unit: "degrees" },
      { symbol: "CH_2", name: "Difference between consecutive homologues", value: "14", unit: "u" },
      { symbol: "M(CH_2)", name: "Molar mass of a CH2 unit", value: "14", unit: "g mol^-1" },
    ],
    entranceTraps: [
      {
        trap: "All organic compounds are obtained from living organisms.",
        truth:
          "That idea was disproved when Wohler synthesised urea in 1828. Organic compounds can be made in the laboratory — the term only means carbon compounds.",
        examRef: "NEB / IOE — organic basics",
      },
      {
        trap: "Isomers always have different molecular formulae.",
        truth:
          "Isomers share the SAME molecular formula but different arrangements of atoms, giving different structures and properties. Different molecular formulae mean different compounds, not isomers.",
        examRef: "IOE — isomerism",
      },
      {
        trap: "Carbon shows only a valency of four.",
        truth:
          "The valency, or combining capacity, of carbon in stable compounds is four, but the OXIDATION NUMBER of carbon in a given compound can range from -4 in methane to +4 in carbon tetrachloride.",
        examRef: "CEE — valency vs oxidation state",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Find the degree of unsaturation of benzene, C6H6, and hence explain its structure.",
        given: "C = 6, H = 6, no nitrogen or halogen present",
        steps: [
          "DoU = \\frac{2C + 2 - H}{2} = \\frac{2(6) + 2 - 6}{2}",
          "DoU = \\frac{12 + 2 - 6}{2} = \\frac{8}{2} = 4",
          "Three of these are the double bonds, and one is the ring",
        ],
        answer: "DoU = 4 \\text{: one ring plus three double bonds (the aromatic sextet)}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Functional Group",
        definition:
          "An atom or group of atoms that defines the characteristic chemical properties of a family of organic compounds, such as -OH for alcohols or -CHO for aldehydes.",
        significance:
          "It determines the reactions of the molecule; the carbon skeleton only modifies the physical properties and reactivity.",
      },
      {
        term: "Isomerism",
        definition:
          "The existence of two or more compounds with the same molecular formula but different structures or spatial arrangements, and therefore different properties.",
        significance:
          "Structural isomerism changes the connectivity; stereoisomerism such as cis-trans and optical isomerism keeps the connectivity but changes the spatial arrangement.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Fundamental Principles of Organic Chemistry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "fundamental-principles-of-organic-chemistry",
      "inductive-effect",
      "resonance",
      "hyperconjugation",
      "carbocation",
      "free-radical",
      "bond-fission",
      "reaction-mechanism",
    ],
    subject: "chemistry",
    title: "Fundamental Principles — Electronic Effects, Intermediates & Mechanisms",
    unitSlugs: ["fundamental-principles-of-organic-chemistry", "fundamental-principles-organic"],
    category: "Organic Chemistry",
    governingLaws: [
      {
        name: "Bond Fission",
        statement:
          "A covalent bond can break homolytically, giving two neutral free radicals, or heterolytically, giving a pair of ions. The mechanism of a reaction is set by which of the two occurs.",
        formula:
          "\\text{Homolysis: } A{:}B \\rightarrow A\\cdot + B\\cdot; \\quad \\text{Heterolysis: } A{:}B \\rightarrow A^+ + B^-",
        conditions:
          "Homolysis needs light or peroxides and gives radical reactions; heterolysis gives ionic (polar) reactions in solution.",
      },
      {
        name: "Inductive Effect",
        statement:
          "A permanent polarisation of a sigma bond caused by the electronegativity difference between the atoms, transmitted along the chain and weakening rapidly with distance.",
        formula: "-I: -NO_2 > -CN > -COOH > -F > -Cl > -Br > -I; \\quad +I: (CH_3)_3C > (CH_3)_2CH > CH_3CH_2 > CH_3",
        conditions:
          "The effect practically vanishes beyond the third carbon in the chain, which is why the acidity of a haloacid falls off sharply along the chain.",
      },
      {
        name: "Resonance and Mesomeric Effect",
        statement:
          "When a molecule can be represented by more than one Lewis structure differing only in the arrangement of electrons, the real molecule is a hybrid of all of them and is more stable than any single form.",
        formula: "\\text{benzene: } 6\\ \\pi\\ e^- \\text{ delocalised} \\implies 150\\ kJ\\ mol^{-1} \\text{ resonance energy}",
        conditions:
          "Resonance forms must have the same arrangement of atoms and the same number of paired electrons; they are not in equilibrium with one another.",
      },
    ],
    speedFormulas: [
      {
        name: "Stability Order of Reaction Intermediates",
        formula:
          "\\text{Carbocation: } 3^\\circ > 2^\\circ > 1^\\circ > CH_3^+; \\quad \\text{Free radical: } 3^\\circ > 2^\\circ > 1^\\circ",
        description:
          "Benzylic and allylic carbocations are even more stable because of resonance. Triply stabilised carbocations such as triphenylmethyl are stable enough to exist in solution.",
        unit: "relative order",
      },
      {
        name: "Classification of Organic Reagents",
        formula:
          "\\text{Electrophile: } NO_2^+, H^+, R^+; \\quad \\text{Nucleophile: } OH^-, CN^-, NH_3, H_2O",
        description:
          "Electrophiles are electron-pair acceptors and are attacked by alkenes and aromatic rings; nucleophiles are electron-pair donors and attack carbonyl carbons.",
        unit: "species",
      },
      {
        name: "Types of Organic Reaction",
        formula:
          "\\text{substitution}, \\text{ addition}, \\text{ elimination}, \\text{ rearrangement}",
        description:
          "Alkanes and arenes undergo substitution, alkenes and alkynes undergo addition, and alkyl halides undergo both substitution and elimination.",
        unit: "reaction type",
      },
      {
        name: "Acidity and Basicity Trends",
        formula:
          "-NO_2 > -CN > -CHO > -COOH > -X > -H \\quad \\text{(electron-withdrawing strength)}",
        description:
          "Electron-withdrawing groups stabilise a negative charge and increase acidity; electron-donating groups such as -CH3 and -OCH3 have the opposite effect.",
        unit: "relative order",
      },
    ],
    constantsAndValues: [
      { symbol: "E_{res}(benzene)", name: "Resonance energy of benzene", value: "150.7", unit: "kJ mol^-1" },
      { symbol: "E_{res}(benzene)", name: "Resonance energy of benzene in kcal", value: "36", unit: "kcal mol^-1" },
      { symbol: "BDE(C{-}H)", name: "Bond dissociation energy of a C-H bond in methane", value: "414", unit: "kJ mol^-1" },
      { symbol: "pK_a", name: "pKa of acetic acid", value: "4.74", unit: "dimensionless" },
      { symbol: "pK_a", name: "pKa of chloroacetic acid", value: "2.86", unit: "dimensionless" },
    ],
    entranceTraps: [
      {
        trap: "Free radicals carry a charge.",
        truth:
          "Free radicals are NEUTRAL species with an unpaired electron. Carbocations are positive and carbanions negative; radicals have no charge at all.",
        examRef: "NEB / IOE — reaction intermediates",
      },
      {
        trap: "A primary carbocation is more stable than a tertiary one.",
        truth:
          "The order is tertiary greater than secondary greater than primary. Nine alkyl groups in the tertiary case push electron density onto the positive carbon, spreading and stabilising the charge.",
        examRef: "IOE — carbocation stability",
      },
      {
        trap: "Resonance forms are in dynamic equilibrium with each other.",
        truth:
          "They are hypothetical structures drawn to describe delocalisation. The real molecule is a single hybrid, and the canonical forms do not exist separately.",
        examRef: "IOE — resonance",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Explain why chloroacetic acid (pKa 2.86) is a much stronger acid than acetic acid (pKa 4.74).",
        given: "pK_a(CH_2ClCOOH) = 2.86, \\quad pK_a(CH_3COOH) = 4.74",
        steps: [
          "The chlorine atom is highly electronegative and has an electron-withdrawing inductive effect",
          "It pulls electron density away from the carboxyl group through the sigma bonds",
          "The resulting carboxylate anion is stabilised because the negative charge is dispersed",
          "A more stable conjugate base means a stronger acid, so the pKa falls",
        ],
        answer: "\\text{The } -I \\text{ effect of Cl stabilises } CH_2ClCOO^- \\text{, lowering pKa by about 1.9 units}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Inductive Effect",
        definition:
          "The permanent polarisation of a sigma bond due to an electronegativity difference, transmitted along the chain and fading rapidly with distance.",
        significance:
          "Explains trends in acid strength, base strength and the reactivity of substituted aromatic rings.",
      },
      {
        term: "Carbocation",
        definition:
          "A positive organic ion with a carbon bearing a sextet of electrons and an empty p orbital, so it is planar and sp2 hybridised.",
        significance:
          "A key intermediate in electrophilic addition, SN1 and rearrangement reactions; its stability order dictates which product dominates.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Hydrocarbons
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "hydrocarbons",
      "alkane",
      "alkene",
      "alkyne",
      "markovnikov",
      "peroxide-effect",
      "wurtz",
      "kolbe",
      "ozonolysis",
    ],
    subject: "chemistry",
    title: "Hydrocarbons — Alkanes, Alkenes and Alkynes",
    unitSlugs: ["hydrocarbons"],
    category: "Organic Chemistry",
    governingLaws: [
      {
        name: "Markovnikov's Rule",
        statement:
          "When a hydrogen halide adds to an unsymmetrical alkene, the hydrogen goes to the carbon carrying the greater number of hydrogen atoms, so that the more stable carbocation is formed.",
        formula: "CH_3{-}CH{=}CH_2 + HBr \\rightarrow CH_3{-}CHBr{-}CH_3 \\ (\\text{major})",
        conditions:
          "Applies only to unsymmetrical alkenes and to polar addition reagents. It does NOT decide the orientation in the presence of peroxides.",
      },
      {
        name: "Peroxide (Kharasch) Effect",
        statement:
          "In the presence of peroxides the addition of hydrogen bromide to an unsymmetrical alkene follows anti-Markovnikov orientation, because the reaction proceeds by a free-radical mechanism.",
        formula: "CH_3{-}CH{=}CH_2 + HBr \\xrightarrow{ROOR} CH_3{-}CH_2{-}CH_2Br",
        conditions:
          "Only hydrogen BROMIDE shows this effect. HF, HCl and HI do not, because the radical chain propagation step is unfavourable for them.",
      },
      {
        name: "Zaitsev (Saytzeff) Rule",
        statement:
          "In a dehydrohalogenation or dehydration, the more substituted, more stable alkene is formed preferentially.",
        formula: "CH_3{-}CH_2{-}CHBr{-}CH_3 \\xrightarrow{alc.KOH} CH_3{-}CH{=}CH{-}CH_3 \\ (\\text{major})",
        conditions:
          "Competes with substitution, so a strong bulky base and higher temperature favour elimination over substitution.",
      },
    ],
    speedFormulas: [
      {
        name: "Preparation of Alkanes",
        formula:
          "\\text{Kolbe: } 2CH_3COO^- \\xrightarrow{electrolysis} C_2H_6 + 2CO_2; \\quad \\text{Wurtz: } 2R{-}X + 2Na \\rightarrow R{-}R + 2NaX",
        description:
          "Both methods are limited to symmetrical products. Decarboxylation of sodium ethanoate with soda lime also gives methane.",
        unit: "reaction",
      },
      {
        name: "Characteristic Reactions of Alkenes",
        formula:
          "\\text{Bromine water test: } CH_2{=}CH_2 + Br_2 \\rightarrow CH_2Br{-}CH_2Br",
        description:
          "The disappearance of the orange-red colour of bromine water is the standard test that confirms a double or triple bond, since alkanes do not decolourise it.",
        unit: "reaction",
      },
      {
        name: "Ozonolysis",
        formula: "R{-}CH{=}CH{-}R' \\xrightarrow[Zn/H_2O]{O_3} R{-}CHO + R'{-}CHO",
        description:
          "Reductive ozonolysis cleaves the double bond and converts each carbon of the double bond into an aldehyde or ketone, which locates the position of the double bond.",
        unit: "reaction",
      },
      {
        name: "Terminal Alkyne Acidity",
        formula: "R{-}C{\\equiv}CH + NaNH_2 \\rightarrow R{-}C{\\equiv}C^-Na^+ + NH_3",
        description:
          "The sp carbon of a terminal alkyne is more electronegative than sp2 or sp3, so its hydrogen is weakly acidic and it reacts with sodium in liquid ammonia but alkenes and alkanes do not.",
        unit: "reaction",
      },
    ],
    constantsAndValues: [
      { symbol: "\\Delta H_{comb}(CH_4)", name: "Heat of combustion of methane", value: "-890", unit: "kJ mol^-1" },
      { symbol: "C_nH_{2n+2}", name: "General formula of alkanes", value: "n >= 1", unit: "formula" },
      { symbol: "C_nH_{2n}", name: "General formula of alkenes", value: "n >= 2", unit: "formula" },
      { symbol: "C_nH_{2n-2}", name: "General formula of alkynes", value: "n >= 2", unit: "formula" },
      { symbol: "M(CH_4)", name: "Molar mass of methane", value: "16", unit: "g mol^-1" },
      { symbol: "M(C_2H_4)", name: "Molar mass of ethene", value: "28", unit: "g mol^-1" },
    ],
    entranceTraps: [
      {
        trap: "Markovnikov's rule applies to every addition reaction of alkenes.",
        truth:
          "It applies only to unsymmetrical alkenes with polar reagents, and it is REVERSED by peroxides for HBr (anti-Markovnikov, the peroxide effect).",
        examRef: "NEB / IOE — alkene addition",
      },
      {
        trap: "Alkanes are highly reactive because they contain many C-H bonds.",
        truth:
          "Alkanes are the least reactive family of organic compounds. Their bonds are strong and non-polar, so they react only under drastic conditions — with light, heat or strong reagents.",
        examRef: "IOE — hydrocarbons",
      },
      {
        trap: "All alkynes give a precipitate with ammoniacal silver nitrate.",
        truth:
          "Only TERMINAL alkynes do, because only they have an acidic hydrogen on the triply bonded carbon. Internal alkynes such as 2-butyne give no precipitate.",
        examRef: "IOE — alkyne tests",
      },
      {
        trap: "Ozonolysis of an alkene gives only carboxylic acids.",
        truth:
          "Reductive ozonolysis gives aldehydes or ketones, one from each carbon of the double bond. Without the zinc-water reduction, the products are oxidised further.",
        examRef: "CEE — hydrocarbon reactions",
      },
    ],
    workedNumericals: [
      {
        problem:
          "An alkene of molecular mass 42 g/mol decolourises bromine water and on reductive ozonolysis gives only ethanal. Identify it and write the reactions.",
        given: "M = 42\\ g\\ mol^{-1}, \\text{ single ozonolysis product}",
        steps: [
          "C_nH_{2n}: 14n = 42 \\implies n = 3, \\text{ so the formula is } C_3H_6",
          "Only one product from ozonolysis means the double bond must be symmetrical",
          "CH_3{-}CH{=}CH{-}CH_3 \\text{ would need } C_4, \\text{ so a 3-carbon symmetrical alkene is not possible directly}",
          "Since the only product is ethanal, the compound is propene, whose ozonolysis gives ethanal plus methanal",
        ],
        answer: "\\text{Propene, } CH_3{-}CH{=}CH_2 \\rightarrow CH_3CHO + HCHO",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Markovnikov's Rule",
        definition:
          "The rule that in the polar addition of HX to an unsymmetrical alkene, the negative part of the reagent goes to the carbon bearing fewer hydrogen atoms.",
        significance:
          "Predicts the major product of electrophilic addition, and is explained by the greater stability of the more substituted carbocation intermediate.",
      },
      {
        term: "Peroxide Effect",
        definition:
          "The reversal of Markovnikov orientation observed for the addition of HBr to an alkene in the presence of a peroxide, proceeding by a free-radical chain mechanism.",
        significance:
          "A classic exam discriminator: only HBr shows it, so HF, HCl and HI always follow Markovnikov's rule.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Aromatic Hydrocarbons
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "aromatic-hydrocarbons",
      "benzene",
      "huckel",
      "electrophilic-substitution",
      "orientation",
      "resonance-energy",
      "nitration",
      "friedel-crafts",
    ],
    subject: "chemistry",
    title: "Aromatic Hydrocarbons — Benzene, Hückel's Rule & Electrophilic Substitution",
    unitSlugs: ["aromatic-hydrocarbons"],
    category: "Organic Chemistry",
    governingLaws: [
      {
        name: "Hückel's Rule of Aromaticity",
        statement:
          "A cyclic, planar, conjugated system with a continuous overlap of p orbitals is aromatic if it contains (4n + 2) pi electrons, where n is a whole number.",
        formula: "\\pi\\ e^- = 4n + 2 \\quad (n = 0, 1, 2, \\dots)",
        conditions:
          "All three requirements are needed: cyclic, planar and fully conjugated with 4n + 2 pi electrons. A system with 4n pi electrons is antiaromatic.",
      },
      {
        name: "Orientation Rules in Electrophilic Substitution",
        statement:
          "An activating group already present on the ring directs the incoming electrophile to the ortho and para positions; a deactivating group directs it to the meta position.",
        formula:
          "\\text{activating: } -OH, -NH_2, -OR, -R \\;(o, p); \\quad \\text{deactivating: } -NO_2, -COOH, -CHO, -SO_3H \\;(m)",
        conditions:
          "Halogens are a special case: they deactivate the ring overall yet still direct ortho and para, because their inductive withdrawal outweighs their resonance donation.",
      },
    ],
    speedFormulas: [
      {
        name: "Electrophilic Substitution Reactions of Benzene",
        formula:
          "\\text{Nitration: } C_6H_6 + HNO_3 \\xrightarrow{H_2SO_4} C_6H_5NO_2; \\quad \\text{Sulphonation: } + H_2SO_4 \\rightarrow C_6H_5SO_3H",
        description:
          "Halogenation needs FeBr3 or AlCl3 as a Lewis-acid carrier, and the Friedel-Crafts alkylation or acylation needs anhydrous AlCl3.",
        unit: "reaction",
      },
      {
        name: "Resonance Energy of Benzene",
        formula: "\\Delta H_{obs} - \\Delta H_{calc} = 150.7\\ kJ\\ mol^{-1}",
        description:
          "Benzene releases far less heat on hydrogenation than the hypothetical cyclohexatriene would, and that difference is the resonance stabilisation that makes benzene aromatic.",
        unit: "kJ mol^-1",
      },
      {
        name: "Structure of Benzene",
        formula: "C{-}C = 139\\ pm \\text{ (all six equal)}, \\quad \\text{sp}^2 \\text{ carbons, } 120^\\circ",
        description:
          "All six carbon-carbon bonds have the same intermediate length, which rules out alternating single and double bonds and confirms a delocalised pi cloud.",
        unit: "pm",
      },
      {
        name: "Friedel–Crafts Limitations",
        formula: "C_6H_6 + R{-}Cl \\xrightarrow{anhyd.\\ AlCl_3} C_6H_5{-}R + HCl",
        description:
          "The reaction fails on strongly deactivated rings such as nitrobenzene, and fails with a vinyl or aryl halide, since the vinyl and aryl carbocations are too unstable.",
        unit: "reaction",
      },
    ],
    constantsAndValues: [
      { symbol: "E_{res}", name: "Resonance energy of benzene", value: "150.7", unit: "kJ mol^-1" },
      { symbol: "C{-}C", name: "Carbon-carbon bond length in benzene", value: "139", unit: "pm" },
      { symbol: "M(C_6H_6)", name: "Molar mass of benzene", value: "78", unit: "g mol^-1" },
      { symbol: "T_b", name: "Boiling point of benzene", value: "80", unit: "deg C" },
      { symbol: "n", name: "Hückel number for benzene", value: "1", unit: "dimensionless" },
    ],
    entranceTraps: [
      {
        trap: "Cyclobutadiene is aromatic because it is cyclic and conjugated.",
        truth:
          "It has 4 pi electrons, which fits 4n with n = 1, so it is ANTI-aromatic and highly unstable. Aromaticity requires 4n + 2, not 4n.",
        examRef: "IOE/CEE — aromaticity",
      },
      {
        trap: "Benzene readily undergoes addition reactions like an alkene.",
        truth:
          "Benzene prefers SUBSTITUTION, because addition would destroy the delocalised aromatic sextet and lose the 150.7 kJ/mol of resonance stabilisation. Addition only occurs under forcing conditions.",
        examRef: "NEB / IOE — benzene chemistry",
      },
      {
        trap: "Halogens activate the benzene ring towards electrophilic substitution.",
        truth:
          "Chlorine and bromine DEACTIVATE the ring — the reaction is slower than with benzene itself — yet they still direct ortho and para because the halonium ion intermediate is stabilised at those positions.",
        examRef: "IOE — orientation effects",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Benzene has 6 pi electrons. Verify that it satisfies Hückel's rule, and predict the mono-nitration product of toluene.",
        given: "Benzene: 6\\ \\pi\\ e^-, \\quad \\text{toluene} = C_6H_5{-}CH_3",
        steps: [
          "6 = 4n + 2 \\implies 4n = 4 \\implies n = 1",
          "Since n is a whole number, benzene is aromatic",
          "The methyl group in toluene is an activating, electron-donating group",
          "It directs the nitro group to the ortho and para positions",
        ],
        answer: "\\text{Aromatic;} \\quad \\text{toluene} \\rightarrow \\text{o- and p-nitrotoluene as major products}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Hückel's Rule",
        definition:
          "The condition that a planar, cyclic and fully conjugated system is aromatic when it contains 4n + 2 pi electrons.",
        significance:
          "It predicts which cyclic systems are aromatic, and therefore which are unusually stable — benzene, naphthalene, cyclopentadienyl anion and tropylium cation all qualify.",
      },
      {
        term: "Electrophilic Substitution",
        definition:
          "A reaction in which an electrophile replaces a hydrogen atom on the aromatic ring while the aromatic sextet is regenerated.",
        significance:
          "The characteristic reaction of benzene: nitration, sulphonation, halogenation and Friedel-Crafts alkylation and acylation.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Bio-inorganic Chemistry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "bio-inorganic-chemistry",
      "metalloporphyrin",
      "trace-element",
      "sodium-potassium-pump",
      "haemoglobin",
      "chlorophyll",
      "metal-poisoning",
    ],
    subject: "chemistry",
    title: "Bio-inorganic Chemistry — Metal Ions in Living Systems",
    unitSlugs: ["bio-inorganic-chemistry"],
    category: "Bio-inorganic Chemistry",
    governingLaws: [
      {
        name: "Metal Ion–Biomolecule Coordination",
        statement:
          "Essential metal ions carry out their biological roles by coordinating to donor atoms (N, O, S) in proteins, porphyrins and nucleic acids, forming metalloproteins and metalloenzymes.",
        formula:
          "\\text{haemoglobin: } Fe(II) \\text{ in porphyrin}; \\quad \\text{chlorophyll: } Mg(II); \\quad \\text{vitamin B}_{12}: Co(III)",
        conditions:
          "The biological function depends on the identity and oxidation state of the metal; replacing Fe with Mg in the same ring changes the function completely.",
      },
      {
        name: "Sodium–Potassium Pump",
        statement:
          "The Na+/K+ ATPase uses the energy of ATP hydrolysis to move three sodium ions out of the cell and two potassium ions in, maintaining the membrane potential.",
        formula: "3Na^+_{(in)} + 2K^+_{(out)} + ATP \\rightarrow 3Na^+_{(out)} + 2K^+_{(in)} + ADP + P_i",
        conditions:
          "It works against the concentration gradient, so it is active transport and consumes a major fraction of the body's resting energy.",
      },
    ],
    speedFormulas: [
      {
        name: "Metal in a Biomolecule",
        formula:
          "Fe \\rightarrow haemoglobin, myoglobin, cytochromes; \\quad Mg \\rightarrow chlorophyll; \\quad Co \\rightarrow vitamin B_{12}; \\quad Zn \\rightarrow carbonic anhydrase",
        description:
          "This table is a repeated exam favourite. Note magnesium is at the centre of chlorophyll, not iron.",
        unit: "association",
      },
      {
        name: "Classification of Essential Elements",
        formula:
          "\\text{bulk: } C, H, O, N, P, S, Na, K, Mg, Ca, Cl; \\quad \\text{trace: } Fe, Cu, Zn, Mn, I, Mo, Co, Se",
        description:
          "Bulk (macro) elements are needed in gram amounts per day; trace elements are needed in milligram or microgram amounts but are still essential.",
        unit: "category",
      },
      {
        name: "Metal Poisoning and Chelation Therapy",
        formula: "Pb^{2+} + EDTA^{4-} \\rightarrow [Pb(EDTA)]^{2-}",
        description:
          "Heavy-metal ions inhibit enzymes by binding to thiol groups. EDTA and BAL are chelating agents used to remove them, but they also remove essential metal ions.",
        unit: "reaction",
      },
      {
        name: "Metal Ions in Enzyme Catalysis",
        formula:
          "Zn^{2+} \\text{ in carbonic anhydrase}; \\quad Mn^{2+} \\text{ in photosystem II}; \\quad Cu^{2+} \\text{ in cytochrome oxidase}",
        description:
          "Metal ions act as Lewis acids, polarise substrate bonds, stabilise charges and shuttle electrons, making reactions possible at body temperature.",
        unit: "association",
      },
    ],
    constantsAndValues: [
      { symbol: "Fe", name: "Metal at the centre of haemoglobin", value: "Fe(II)", unit: "oxidation state" },
      { symbol: "Mg", name: "Metal at the centre of chlorophyll", value: "Mg(II)", unit: "oxidation state" },
      { symbol: "Co", name: "Metal at the centre of vitamin B12", value: "Co(III)", unit: "oxidation state" },
      { symbol: "Zn", name: "Metal in carbonic anhydrase", value: "Zn(II)", unit: "oxidation state" },
      { symbol: "I", name: "Trace element in thyroxine", value: "I", unit: "element" },
      { symbol: "Ca", name: "Metal in bones and teeth as hydroxyapatite", value: "Ca(II)", unit: "oxidation state" },
    ],
    entranceTraps: [
      {
        trap: "Chlorophyll contains iron, which is why leaves are green.",
        truth:
          "Chlorophyll contains MAGNESIUM. Haemoglobin contains iron. Swapping the two is one of the commonest exam errors in bio-inorganic chemistry.",
        examRef: "NEB / IOE — bio-inorganic",
      },
      {
        trap: "Trace elements are unnecessary because they are needed in tiny amounts.",
        truth:
          "They are ESSENTIAL. Iodine deficiency causes goitre, iron deficiency causes anaemia, and zinc deficiency impairs growth and immunity — small quantities still matter critically.",
        examRef: "IOE — essential elements",
      },
      {
        trap: "Carbon monoxide poisoning is caused by carbon monoxide reacting with water in the blood.",
        truth:
          "CO binds to the iron of haemoglobin about 250 times more strongly than oxygen does, forming carboxyhaemoglobin and blocking oxygen transport.",
        examRef: "CEE — bio-inorganic chemistry",
      },
    ],
    workedNumericals: [
      {
        problem:
          "Classify the following as bulk or trace essential elements and name one biological role of each: Fe, Ca, I, Mg.",
        given: "Fe, Ca, I, Mg",
        steps: [
          "Ca is required in grams per day, so it is a BULK element, forming hydroxyapatite in bone",
          "Mg is also a bulk element, the central metal of chlorophyll",
          "Fe is needed in milligrams, so it is a TRACE element, carrying oxygen in haemoglobin",
          "I is needed in micrograms, so it is a TRACE element, present in thyroxine",
        ],
        answer: "\\text{Bulk: Ca (bone), Mg (chlorophyll);} \\quad \\text{Trace: Fe (haemoglobin), I (thyroxine)}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Metalloporphyrin",
        definition:
          "A coordination complex in which a metal ion is held in the centre of a porphyrin ring, a large planar ligand with four nitrogen donor atoms.",
        significance:
          "Haemoglobin (iron), chlorophyll (magnesium) and vitamin B12 (cobalt) are all metalloporphyrins or closely related, showing how the same framework gives different functions.",
      },
      {
        term: "Chelating Agent",
        definition:
          "A ligand that binds to a single metal ion through two or more donor atoms, forming a ring-shaped complex that is unusually stable.",
        significance:
          "EDTA is used in chelation therapy for heavy-metal poisoning and as a titrant for estimating hardness of water.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Fundamentals of Applied Chemistry
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "fundamentals-of-applied-chemistry",
      "hardness",
      "water-treatment",
      "fertilizer",
      "polymer",
      "cement",
      "glass",
      "biodiesel",
    ],
    subject: "chemistry",
    title: "Applied Chemistry — Water Hardness, Fertilizers, Polymers & Materials",
    unitSlugs: ["fundamentals-of-applied-chemistry", "applied-chemistry"],
    category: "Applied Chemistry",
    governingLaws: [
      {
        name: "Cause and Removal of Water Hardness",
        statement:
          "Hardness of water is caused by dissolved calcium and magnesium salts. It is removed by precipitation, ion exchange or complexation, or by softening with washing soda and lime.",
        formula:
          "Ca(HCO_3)_2 \\xrightarrow{boil} CaCO_3\\downarrow + H_2O + CO_2; \\quad CaCl_2 + Na_2CO_3 \\rightarrow CaCO_3\\downarrow + 2NaCl",
        conditions:
          "Bicarbonates cause temporary hardness, removable by boiling. Sulphates, chlorides and nitrates cause permanent hardness, removable only by chemical treatment or ion exchange.",
      },
      {
        name: "Classification of Polymers",
        statement:
          "A polymer is a large molecule built from repeating monomer units. Thermoplastic polymers soften on heating and can be remoulded, while thermosetting polymers set into a permanent cross-linked network.",
        formula:
          "\\text{addition: } n\\,CH_2{=}CH_2 \\rightarrow (CH_2{-}CH_2)_n; \\quad \\text{condensation: } \\text{hexamethylenediamine} + \\text{adipic acid} \\rightarrow \\text{nylon-6,6}",
        conditions:
          "Addition polymers are formed from unsaturated monomers with no by-product; condensation polymers are formed with the elimination of a small molecule such as water.",
      },
    ],
    speedFormulas: [
      {
        name: "Hardness Expressed as CaCO3 Equivalent",
        formula:
          "\\text{hardness (ppm)} = \\frac{\\text{mass of salt}}{\\text{equivalent mass of salt}} \\times 50 \\div \\text{volume in litres}",
        description:
          "The equivalent mass of CaCO3 is 50 because its molar mass is 100 and its n-factor is 2. 1 mg/L expressed as CaCO3 equals 1 ppm.",
        unit: "ppm (mg L^-1)",
      },
      {
        name: "Fertilizer N-P-K Rating",
        formula: "\\text{N}: \\text{P}_2\\text{O}_5 : \\text{K}_2\\text{O} \\text{ by mass percentage}",
        description:
          "Urea supplies 46 percent nitrogen, the highest of the solid nitrogenous fertilizers, while DAP supplies both nitrogen and phosphorus.",
        unit: "%",
      },
      {
        name: "Common Polymers and Their Monomers",
        formula:
          "PVC \\leftarrow \\text{vinyl chloride}; \\quad \\text{teflon} \\leftarrow \\text{tetrafluoroethene}; \\quad \\text{bakelite} \\leftarrow \\text{phenol} + \\text{formaldehyde}",
        description:
          "Nylon-6,6 and Dacron are condensation polymers; polyethylene, PVC and teflon are addition polymers. Bakelite is thermosetting.",
        unit: "monomer",
      },
      {
        name: "Composition of Ordinary Portland Cement",
        formula:
          "\\text{mainly } CaO + SiO_2 + Al_2O_3 + Fe_2O_3",
        description:
          "Typical percentages are CaO about 62-67, SiO2 about 17-25, Al2O3 about 3-8 and Fe2O3 about 1-5. Gypsum is added to regulate the setting time.",
        unit: "% by mass",
      },
    ],
    constantsAndValues: [
      { symbol: "E(CaCO_3)", name: "Equivalent mass of calcium carbonate", value: "50", unit: "g eq^-1" },
      { symbol: "N(urea)", name: "Nitrogen content of urea", value: "46", unit: "%" },
      { symbol: "N(DAP)", name: "Nitrogen content of DAP", value: "18", unit: "%" },
      { symbol: "P_2O_5(DAP)", name: "Phosphate content of DAP as P2O5", value: "46", unit: "%" },
      { symbol: "CaO", name: "Lime content of ordinary Portland cement", value: "62 - 67", unit: "%" },
      { symbol: "BOD", name: "BOD of clean drinking water, upper limit", value: "about 5", unit: "mg L^-1" },
    ],
    entranceTraps: [
      {
        trap: "Water hardness is caused by dissolved sodium salts.",
        truth:
          "It is caused by CALCIUM and MAGNESIUM salts. Sodium salts dissolved in water are harmless for hardness — sodium stearate is even used as a soap additive.",
        examRef: "NEB / IOE — water hardness",
      },
      {
        trap: "Bakelite is a thermoplastic polymer.",
        truth:
          "Bakelite is THERMOSETTING — heavily cross-linked by formaldehyde so it cannot be softened or remoulded by heat. It is used for electrical switches and handles because of that heat resistance.",
        examRef: "IOE — polymers",
      },
      {
        trap: "Boiling removes all hardness from water.",
        truth:
          "Boiling removes only TEMPORARY hardness, by decomposing bicarbonates. Permanent hardness from sulphates, chlorides and nitrates persists through boiling and needs ion exchange or precipitation.",
        examRef: "CEE — water treatment",
      },
      {
        trap: "Soap works as well in hard water as in soft water.",
        truth:
          "In hard water soap first reacts with calcium and magnesium ions to form an insoluble scum, so much more soap is consumed. Detergents work better because they do not form that scum.",
        examRef: "NEB — cleansing agents",
      },
    ],
    workedNumericals: [
      {
        problem:
          "One litre of water contains 162 mg of Ca(HCO3)2. Calculate its hardness expressed as ppm of CaCO3. Take M(Ca(HCO3)2) = 162 and E(CaCO3) = 50.",
        given: "\\text{mass} = 162\\ mg = 0.162\\ g, \\quad V = 1\\ L, \\quad E(Ca(HCO_3)_2) = \\frac{162}{2} = 81",
        steps: [
          "Equivalent mass of Ca(HCO_3)_2 = \\frac{162}{2} = 81\\ g\\ eq^{-1}",
          "A milligram equivalent converts to hardness by the ratio of equivalent masses",
          "Hardness = 162\\,mg\\ times\\ \\frac{50}{81} = 100\\ mg\\ as\\ CaCO_3",
          "100 mg in 1 L = 100 ppm",
        ],
        answer: "\\text{Hardness} = 100\\ ppm \\text{ as } CaCO_3",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Biological Oxygen Demand (BOD)",
        definition:
          "The amount of dissolved oxygen consumed by microorganisms while decomposing the organic matter present in a unit volume of water, measured over five days at 20 degrees C.",
        significance:
          "The standard measure of water pollution. Clean drinking water has a BOD below about 5 ppm, while untreated sewage can exceed 300 ppm.",
      },
      {
        term: "Thermosetting Polymer",
        definition:
          "A polymer that sets irreversibly into a rigid, cross-linked three-dimensional network on heating, and cannot be softened or remoulded again.",
        significance:
          "Bakelite, melamine and vulcanised rubber are thermosetting, which is why they are used for electrical fittings and for tyres where heat resistance matters.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHEMISTRY — Modern Chemical Manufactures
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: [
      "modern-chemical-manufactures",
      "haber-process",
      "ostwald-process",
      "contact-process",
      "solvay-process",
      "industrial-ammonia",
      "industrial-sulphuric-acid",
    ],
    subject: "chemistry",
    title: "Modern Chemical Manufactures — Haber, Ostwald, Contact & Solvay",
    unitSlugs: ["modern-chemical-manufactures", "modern-manufactures"],
    category: "Industrial Chemistry",
    governingLaws: [
      {
        name: "Haber Process for Ammonia",
        statement:
          "Nitrogen and hydrogen combine reversibly to give ammonia with a decrease in the number of moles and a release of heat, so a high pressure and a moderate temperature favour the yield.",
        formula: "N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g), \\quad \\Delta H = -92\\ kJ\\ mol^{-1}",
        conditions:
          "Conditions: 400-500 degrees C, 200-300 atm, finely divided iron catalyst with molybdenum as promoter. A catalyst changes only the rate, never the yield.",
      },
      {
        name: "Ostwald Process for Nitric Acid",
        statement:
          "Ammonia is catalytically oxidised by air to nitric oxide, which is then oxidised to nitrogen dioxide and finally absorbed in water to give nitric acid.",
        formula:
          "4NH_3 + 5O_2 \\xrightarrow{Pt/Rh,\\ 500K} 4NO + 6H_2O; \\quad 2NO + O_2 \\rightarrow 2NO_2; \\quad 3NO_2 + H_2O \\rightarrow 2HNO_3 + NO",
        conditions:
          "The catalyst is a platinum-rhodium gauze at about 500 K under a pressure of a few atmospheres. The NO produced is recycled to improve the yield.",
      },
      {
        name: "Contact Process for Sulphuric Acid",
        statement:
          "Sulphur dioxide is oxidised to sulphur trioxide over a vanadium pentoxide catalyst, and the trioxide is absorbed in concentrated sulphuric acid to give oleum.",
        formula:
          "2SO_2 + O_2 \\xrightarrow{V_2O_5,\\ 400-450^\\circ C} 2SO_3; \\quad SO_3 + H_2SO_4 \\rightarrow H_2S_2O_7 \\xrightarrow{H_2O} 2H_2SO_4",
        conditions:
          "400-450 degrees C at 1-2 atm with excess air; the temperature is kept moderate because the reaction is exothermic and a lower temperature would give a better yield but too slow a rate.",
      },
    ],
    speedFormulas: [
      {
        name: "Solvay Process for Sodium Carbonate",
        formula:
          "NaCl + NH_3 + CO_2 + H_2O \\rightarrow NaHCO_3\\downarrow + NH_4Cl; \\quad 2NaHCO_3 \\xrightarrow{\\Delta} Na_2CO_3 + H_2O + CO_2",
        description:
          "Ammonia is used because it makes the solution alkaline enough for the bicarbonate to precipitate, and it is regenerated from the ammonium chloride, which makes the process economical.",
        unit: "reaction",
      },
      {
        name: "Industrial Conditions Summary",
        formula:
          "NH_3: 400-500^\\circ C, 200-300\\ atm, Fe; \\quad HNO_3: 500\\ K, Pt/Rh; \\quad H_2SO_4: 400-450^\\circ C, V_2O_5",
        description:
          "The single most examinable table in industrial chemistry — memorise the catalyst, temperature and pressure for each process.",
        unit: "conditions",
      },
      {
        name: "Le Chatelier Applied to Ammonia",
        formula:
          "\\text{high } P \\rightarrow \\text{forward shift}; \\quad \\text{high } T \\rightarrow \\text{backward shift}",
        description:
          "High pressure and low temperature both favour the yield, but too low a temperature makes the reaction too slow, so 400-500 degrees C is a compromise. That compromise is the key exam point.",
        unit: "qualitative",
      },
      {
        name: "Manufacture of Sodium Hydroxide and Chlorine",
        formula: "2NaCl + 2H_2O \\xrightarrow{electrolysis} 2NaOH + Cl_2 + H_2",
        description:
          "In the Castner-Kellner cell a mercury cathode and a titanium anode are used with a flowing mercury film, so chlorine and sodium hydroxide are kept apart.",
        unit: "reaction",
      },
    ],
    constantsAndValues: [
      { symbol: "T(Haber)", name: "Temperature for ammonia synthesis", value: "400 - 500", unit: "deg C" },
      { symbol: "P(Haber)", name: "Pressure for ammonia synthesis", value: "200 - 300", unit: "atm" },
      { symbol: "T(Contact)", name: "Temperature for the Contact process", value: "400 - 450", unit: "deg C" },
      { symbol: "P(Contact)", name: "Pressure for the Contact process", value: "1 - 2", unit: "atm" },
      { symbol: "T(Ostwald)", name: "Temperature for the Ostwald process", value: "about 500", unit: "K" },
      { symbol: "\\Delta H", name: "Enthalpy of ammonia formation", value: "-92", unit: "kJ mol^-1" },
      { symbol: "NH_3", name: "Ammonia content of the equilibrium mixture at 300 atm", value: "about 35", unit: "%" },
    ],
    entranceTraps: [
      {
        trap: "A catalyst in the Haber process increases the yield of ammonia.",
        truth:
          "It does not. A catalyst accelerates the forward and backward reactions equally, so equilibrium is reached sooner but the equilibrium yield is unchanged. Raising the PRESSURE raises the yield.",
        examRef: "NEB / IOE — industrial processes",
      },
      {
        trap: "A low temperature is always best for the Haber process because it is exothermic.",
        truth:
          "Low temperature does increase the equilibrium yield, but the rate becomes impractically slow. Industry uses 400-500 degrees C as a compromise between yield and rate.",
        examRef: "IOE — Le Chatelier in industry",
      },
      {
        trap: "The Ostwald process manufactures ammonia.",
        truth:
          "It manufactures NITRIC ACID from ammonia. Ammonia itself comes from the Haber process. Mixing up the two is a very common exam mistake.",
        examRef: "CEE — industrial chemistry",
      },
      {
        trap: "In the Contact process sulphur trioxide is dissolved directly in water.",
        truth:
          "Dissolving SO3 directly in water produces a fine mist of sulphuric acid that is hard to condense. Instead SO3 is absorbed in concentrated sulphuric acid to form oleum, which is then diluted.",
        examRef: "IOE — sulphuric acid manufacture",
      },
    ],
    workedNumericals: [
      {
        problem:
          "For N2 + 3H2 gives 2NH3 with an enthalpy change of -92 kJ/mol, state and justify the effect on the ammonia yield of (a) increasing pressure and (b) increasing temperature.",
        given: "\\Delta n_{gas} = 2 - (1+3) = -2, \\quad \\Delta H = -92\\ kJ\\ mol^{-1}",
        steps: [
          "Pressure: there are 4 moles of gas on the left and 2 on the right, so an increase in pressure shifts equilibrium to the side with fewer moles",
          "The yield of ammonia therefore INCREASES with pressure",
          "Temperature: the forward reaction is exothermic, so raising the temperature shifts equilibrium in the endothermic (backward) direction",
          "The yield of ammonia therefore DECREASES with temperature",
        ],
        answer: "P\\uparrow \\implies NH_3\\uparrow; \\quad T\\uparrow \\implies NH_3\\downarrow \\quad \\text{(so industry uses } 400-500^\\circ C \\text{ as a rate compromise)}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Contact Process",
        definition:
          "The industrial manufacture of sulphuric acid by catalytic oxidation of sulphur dioxide to sulphur trioxide over vanadium pentoxide, followed by absorption in concentrated sulphuric acid.",
        significance:
          "Sulphuric acid is the most produced industrial chemical, so the Contact process is often used as the index of a country's industrial capacity.",
      },
      {
        term: "Promoter",
        definition:
          "A substance added in small quantity to a catalyst to increase its activity, without itself being a catalyst.",
        significance:
          "Molybdenum acts as a promoter for the iron catalyst in the Haber process; the promoted catalyst works at the moderate 400-500 degrees C used industrially.",
      },
    ],
  },
];
