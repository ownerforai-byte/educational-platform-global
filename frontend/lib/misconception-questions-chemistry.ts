/**
 * Misconception / confusion-style question bank.
 *
 * Class 11 Chemistry — Chemical Bonding (25 questions).
 * Targets ionic / covalent / metallic bonds, electronegativity,
 * VSEPR, hybridisation, polarity, lattice energy, octet-rule
 * exceptions, hydrogen bonding, dipole-dipole, and London forces.
 */

export type MisconceptionQuestion = {
  id: string;
  prompt: string;
  verdict: "TRUE" | "FALSE";
  truth: string;
  whyWrong: string;
  clarityTip: string;
};

export type TopicMisconception = {
  subject: string;
  classLevel: "class-11" | "class-12";
  topicSlug: string;
  topicTitle: string;
  questions: MisconceptionQuestion[];
};

export const MISCONCEPTION_QUESTIONS: TopicMisconception[] = [
  {
    subject: "chemistry",
    classLevel: "class-11",
    topicSlug: "chemical-bonding",
    topicTitle: "Chemical Bonding",
    questions: [
      {
        id: "cb-01",
        prompt: "Ionic bonds form when atoms share electrons equally.",
        verdict: "FALSE",
        truth:
          "Ionic bonds form by TRANSFER of electrons from a metal (low electronegativity) to a non-metal (high electronegativity). Equal sharing is the covalent case.",
        whyWrong:
          "Students hear 'sharing' for both covalent and 'partial sharing' for polar covalent and blur it with ionic transfer.",
        clarityTip: "Ionic = transfer + full charges. Covalent = share. Polar covalent = unequal share.",
      },
      {
        id: "cb-02",
        prompt: "All covalent bonds are polar.",
        verdict: "FALSE",
        truth:
          "A covalent bond is polar ONLY when the two bonded atoms differ in electronegativity (ΔEN > ~0.4). Two identical atoms (e.g., H–H, Cl–Cl) form non-polar covalent bonds.",
        whyWrong:
          "Every bonding case is taught as 'electrons shift a bit', so students think any bond must have a + and − end.",
        clarityTip: "Same atoms (ΔEN = 0) = non-polar. Different atoms = polar or ionic depending on how big the gap.",
      },
      {
        id: "cb-03",
        prompt: "Electronegativity increases down a group in the periodic table.",
        verdict: "FALSE",
        truth:
          "Electronegativity DECREASES down a group (atomic size grows, the nucleus is further from the bonding pair, so pull weakens). It INCREASES across a period.",
        whyWrong:
          "Students confuse the trend with metallic character, which DOES increase down a group.",
        clarityTip: "Top-right of the periodic table = most electronegative (F is king). Bottom-left = least.",
      },
      {
        id: "cb-04",
        prompt: "A molecule with polar bonds is always a polar molecule.",
        verdict: "FALSE",
        truth:
          "Not always — geometry matters. If bond dipoles cancel by symmetry (e.g., CO₂, CCl₄, BF₃) the molecule is non-polar despite having polar bonds.",
        whyWrong:
          "Students focus on individual bonds and forget to add the dipoles as vectors over the whole shape.",
        clarityTip: "Polar molecule = polar bonds AND a shape that does NOT cancel them (VSEPR decides).",
      },
      {
        id: "cb-05",
        prompt: "NaCl is a molecule — it has a real Na–Cl covalent bond just like HCl.",
        verdict: "FALSE",
        truth:
          "NaCl is an IONIC LATTWORK. There is no discrete NaCl molecule; the formula unit (NaCl) just gives the 1:1 ratio in the crystal. Each Na⁺ is surrounded by 6 Cl⁻ and vice versa.",
        whyWrong:
          "The formula NaCl is read like HCl — students project a single bonded pair where there is a giant repeating crystal.",
        clarityTip: "Molecule = discrete unit (HCl, H₂O). Formula unit = ratio in an ionic crystal (NaCl, MgO).",
      },
      {
        id: "cb-06",
        prompt: "The octet rule must always be followed — no exceptions exist.",
        verdict: "FALSE",
        truth:
          "Many real molecules break the octet rule: incomplete octets (BH₃, BeCl₂), expanded octets (PCl₅, SF₆) using accessible d-orbitals, and odd-electron species (NO, NO₂).",
        whyWrong:
          "The octet rule is drilled as law, and its exceptions are taught only in passing.",
        clarityTip: "Octet rule = default for p-block. Boron, beryllium and period-3+ can leave it behind.",
      },
      {
        id: "cb-07",
        prompt: "Lattice energy increases as ionic size increases.",
        verdict: "FALSE",
        truth:
          "Lattice energy INCREASES as ionic sizes DECREASE (charges packed closer = stronger Coulomb attraction). Small Li⁺ gives a much larger lattice energy than big Cs⁺ for the same anion.",
        whyWrong:
          "Bigger ions feel 'more solid' so students assume stronger attractions. Closer charges = stronger pull.",
        clarityTip: "Lattice energy ∝ (|q⁺|·|q⁻|) / (r⁺ + r⁻). Smaller r and bigger charges = bigger lattice energy.",
      },
      {
        id: "cb-08",
        prompt: "VSEPR theory says electron pairs in a molecule always repel equally, lone pairs and bond pairs alike.",
        verdict: "FALSE",
        truth:
          "Lone pairs repel MORE strongly than bond pairs (lp–lp > lp–bp > bp–bp). That is exactly why H₂O (104.5°) is bent and not tetrahedral, and NH₃ is pyramidal not trigonal.",
        whyWrong:
          "Students learn the basic shapes and forget that lone pairs compress the bond angles around them.",
        clarityTip: "Lone pairs are fat — they squeeze bond angles down. More lone pairs = smaller angles.",
      },
      {
        id: "cb-09",
        prompt: "sp³ hybridisation means the atom has 3 p-orbitals and 1 s-orbital mixed into 4 orbitals.",
        verdict: "FALSE",
        truth:
          "sp³ mixes ONE s with THREE p-orbitals to give FOUR equivalent sp³ orbitals (the '3' refers to the three p's, not three p orbitals inside an sp³).",
        whyWrong:
          "The label 'sp³' reads as 's, p, p, p³' to some students — the superscript counts how many p's were used.",
        clarityTip: "sp = 1 s + 1 p (linear). sp² = 1 s + 2 p (trigonal). sp³ = 1 s + 3 p (tetrahedral).",
      },
      {
        id: "cb-10",
        prompt: "Hydrogen bonding only happens in water.",
        verdict: "FALSE",
        truth:
          "Hydrogen bonding occurs whenever H is bonded to F, O or N and a lone pair on another F/O/N pulls it. So HF, H₂O, NH₃, alcohols, carboxylic acids, DNA base pairs — all show H-bonding.",
        whyWrong:
          "Water is the textbook poster child, so students forget HF and NH₃ — even though HF has stronger H-bonds than water.",
        clarityTip: "H-bond rule: H attached to F, O or N, with another F/O/N nearby to attract. No FON bonded to H = no H-bond.",
      },
      {
        id: "cb-11",
        prompt: "Metals bond by sharing electrons the way non-metals do.",
        verdict: "FALSE",
        truth:
          "Metallic bonding is a 'sea' (or 'cloud') of delocalised valence electrons shared collectively among positively charged metal-ion cores — not pairwise sharing like in covalent bonds.",
        whyWrong:
          "'Sharing' is repeated for covalent and metallic, and the difference between delocalised and local sharing gets lost.",
        clarityTip: "Metal = cation cores in an electron sea. Properties (conductivity, malleability) flow from the sea.",
      },
      {
        id: "cb-12",
        prompt: "Dipole–dipole forces are present in every molecule.",
        verdict: "FALSE",
        truth:
          "Dipole–dipole forces are significant only in POLAR molecules (permanent dipoles). Non-polar molecules lack a permanent dipole, so dipole–dipole forces are essentially zero for them.",
        whyWrong:
          "Once students learn 'molecules attract each other', they assume a single universal force covers everything.",
        clarityTip: "Polar molecules → dipole–dipole + London. Non-polar → only London dispersion forces.",
      },
      {
        id: "cb-13",
        prompt: "London dispersion forces are weak and only matter for very small molecules.",
        verdict: "FALSE",
        truth:
          "London forces exist in EVERY molecule (they come from temporary instantaneous dipoles). For large, heavy, polarisable molecules they become the DOMINANT intermolecular force — they are why I₂ is a solid and big hydrocarbons have high boiling points.",
        whyWrong:
          "London forces are taught as 'the weakest IMF', so students ignore them for big molecules where they actually dominate.",
        clarityTip: "London forces grow with size & electron count. Small molecules = tiny. Large molecules = the boss.",
      },
      {
        id: "cb-14",
        prompt: "CO₂ is a polar molecule because C and O have different electronegativities.",
        verdict: "FALSE",
        truth:
          "CO₂ has polar C=O bonds, but the molecule is LINEAR (O=C=O). The two bond dipoles point in opposite directions and CANCEL, so CO₂ is overall non-polar.",
        whyWrong:
          "Students judge polarity from bonds alone, not from the molecular geometry.",
        clarityTip: "Polar bonds + symmetry that cancels = non-polar molecule (CO₂, CCl₄, BF₃, CH₄).",
      },
      {
        id: "cb-15",
        prompt: "A double bond is twice as strong as a single bond between the same atoms.",
        verdict: "FALSE",
        truth:
          "A double bond is stronger than a single bond, but NOT exactly 2× (e.g., C=C ~614 kJ/mol vs C–C ~347 kJ/mol — closer to 1.8×). The π component is weaker than the σ because of poorer orbital overlap.",
        whyWrong:
          "'Double = 2×' is a tempting arithmetic shortcut students reach for.",
        clarityTip: "Double bond = 1 σ + 1 π. The π bond is the weaker, easier-to-break half — that's why alkenes are reactive.",
      },
      {
        id: "cb-16",
        prompt: "Fajan's rules say a small, highly charged cation will polarise an anion less than a big, low-charge cation.",
        verdict: "FALSE",
        truth:
          "It is the reverse. A SMALL, HIGHLY CHARGED cation (e.g., Al³⁺, Mg²⁺) has a high charge density and polarises an anion MUCH MORE than a large, low-charge cation (e.g., K⁺, Cs⁺). This is what gives AlCl₃ its covalent character.",
        whyWrong:
          "Students mix up which species is doing the polarising vs which is being polarised.",
        clarityTip: "Polarising power grows with charge and shrinks with size. Small + high charge = strong polariser.",
      },
      {
        id: "cb-17",
        prompt: "Ionic compounds always conduct electricity when solid.",
        verdict: "FALSE",
        truth:
          "In the SOLID state, ions are fixed in the lattice and CANNOT move, so ionic solids do NOT conduct (they only conduct when molten or dissolved, when ions are mobile).",
        whyWrong:
          "Students hear 'ionic = charges' and assume charge = automatic conduction regardless of phase.",
        clarityTip: "Conduction needs MOBILE charge carriers. Solid ionic = ions locked = insulator. Molten/dissolved = ions free = conductor.",
      },
      {
        id: "cb-18",
        prompt: "BF₃ follows the octet rule on boron.",
        verdict: "FALSE",
        truth:
          "BF₃ has only 6 electrons around boron — an INCOMPLETE octet. Boron is the classic exception, and that empty p-orbital is what makes BF₃ a strong Lewis acid.",
        whyWrong:
          "The octet rule is so emphasised that students assume every atom in a stable molecule has 8 electrons.",
        clarityTip: "B, Be, Al often run with 6 electrons. Empty orbital = Lewis acid = electron pair acceptor.",
      },
      {
        id: "cb-19",
        prompt: "The shape of a molecule depends only on bond pairs, not lone pairs.",
        verdict: "FALSE",
        truth:
          "Both lone pairs and bond pairs count in VSEPR. The 'electron-pair geometry' includes lone pairs; the 'molecular shape' describes only the atom positions. NH₃ has 4 electron pairs (tetrahedral e⁻ geometry) but a trigonal pyramidal molecular shape because of the lone pair.",
        whyWrong:
          "Students ignore lone pairs when counting 'things around the central atom'.",
        clarityTip: "VSEPR counts ALL electron pairs to get electron geometry, then we drop the lone pairs to name the molecular shape.",
      },
      {
        id: "cb-20",
        prompt: "HCl is held together by a hydrogen bond.",
        verdict: "FALSE",
        truth:
          "HCl has dipole–dipole interactions and London forces, NOT hydrogen bonding. Hydrogen bonding requires H bonded directly to F, O, or N. Cl is too electronegative-poor and lacks the right lone-pair geometry for true H-bonding.",
        whyWrong:
          "Any polar molecule with an H is loosely called 'hydrogen-bonded' in everyday speech.",
        clarityTip: "Real H-bond = H–F, H–O or H–N. HCl, H₂S, PH₃ — none of these count, despite having H and being polar.",
      },
      {
        id: "cb-21",
        prompt: "All bond energies (or bond enthalpies) are positive values.",
        verdict: "FALSE",
        truth:
          "Bond DISSOCIATION energy is always positive (energy required to BREAK the bond). But bond FORMATION releases energy (negative ΔH). Tables list bond enthalpies as positive magnitudes by convention.",
        whyWrong:
          "Students see a single positive number and forget that breaking needs energy while forming releases it.",
        clarityTip: "Break a bond → +energy (endothermic). Form a bond → −energy (exothermic). Same number, opposite sign.",
      },
      {
        id: "cb-22",
        prompt: "Hybridisation occurs only when a molecule is formed.",
        verdict: "FALSE",
        truth:
          "Hybridisation is a MODEL for the LOCALISED bonds in a molecule; isolated atoms don't really 'hybridise'. Different hybridisations can even be invoked for different atoms in the same molecule (e.g., sp² on C=O carbon, sp³ on methyl carbon).",
        whyWrong:
          "Students take hybridisation as a literal atomic event rather than a mathematical/pedagogical model.",
        clarityTip: "Hybridisation = a mixing model for bonding in a molecule, not a thing an isolated atom 'does'.",
      },
      {
        id: "cb-23",
        prompt: "Resonance structures mean the molecule flips back and forth between them.",
        verdict: "FALSE",
        truth:
          "Resonance structures are LIMITING forms we DRAW on paper. The real molecule is a single HYBRID — a weighted average of all the resonance structures, with bond orders and lengths in between. It does not 'flip' or oscillate.",
        whyWrong:
          "Students picture resonance like a light switch toggling between two structures.",
        clarityTip: "Resonance = one real structure that is a hybrid of several drawn ones. Think 'average mule', not 'flipping donkey-horse'.",
      },
      {
        id: "cb-24",
        prompt: "Water's high boiling point is due to its low molecular mass.",
        verdict: "FALSE",
        truth:
          "Water's unusually high boiling point (100 °C vs H₂S at −60 °C) is due to strong HYDROGEN BONDING, not its mass. Low molecular mass would predict a low boiling point, which is exactly why H₂S is a gas.",
        whyWrong:
          "Students notice water is small AND has a high BP and falsely link the two directly.",
        clarityTip: "H-bonding beats mass. H₂O (18 g/mol, BP 100 °C) vs H₂S (34 g/mol, BP −60 °C).",
      },
      {
        id: "cb-25",
        prompt: "Electronegativity is the same as electron affinity.",
        verdict: "FALSE",
        truth:
          "Electronegativity is the ability of a bonded ATOM to attract the shared pair in a covalent bond (a relative, qualitative/quantitative scale, e.g., Pauling). Electron affinity is the measurable energy change when an isolated ATOM gains an electron in the gas phase.",
        whyWrong:
          "Both involve 'attracting electrons', and students use the words interchangeably.",
        clarityTip: "Electronegativity = pull on bonding electrons (in molecules). Electron affinity = energy to add an e⁻ to a gas-phase atom.",
      },
    ],
  },
];