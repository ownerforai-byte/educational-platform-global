import type { UnitDepth } from "./mindmap-depth";

/** Chemical bonding, VSEPR shapes, hybridisation & polarity. */
export const BONDING_DEPTH: Record<string, UnitDepth> = {
  "chemical-bonding-and-shapes-of-molecules": {
    unitFacts: [
      "Every bond type lowers total energy: ionic trades Coulomb attraction for lattice energy, covalent shares pairs, metallic delocalises electrons. All three are ENERGY arguments, not electron-counting ones.",
      "Ionic and covalent bonds are both DIRECTIONAL, which is why they give fixed shapes; metallic bonding is not, which is exactly why metals are malleable and salts are brittle.",
    ],
    unitEdgeCases: [
      "Bond energies are NOT additive: a double bond is not twice a single bond (C=C 614 vs C–C 348 kJ mol⁻¹), and a triple is not three doubles.",
      "Percentage ionic character is continuous — no bond is 100% ionic or 100% covalent; NaCl at 11% is classified ionic yet remains partly covalent.",
    ],
    unitExamAsked: [
      "NEB: 'Why do two non-metals bond covalently?' — both have high ionisation energies, so neither can donate electrons; sharing is energetically cheaper.",
      "CEE: 'Which has the largest bond angle: NH₃, H₂O or CH₄?' — CH₄, because lone pairs are more repulsive than bonding pairs.",
    ],
    unitCommonMistakes: [
      "Drawing a coordinate (dative) bond as an ordinary covalent bond without the arrow, even though both electrons come from ONE atom; after formation it is indistinguishable from any other covalent bond.",
      "Counting valence electrons for the whole molecule and forgetting the shell capacities of the inner atoms.",
    ],
    leaves: {
      "uc-cb-1": {
        keyFacts: [
          "Ionic bonding is electrostatic attraction between ions formed by electron TRANSFER, favoured when $\\Delta\\text{IE} < \\Delta\\text{EA}$ and lattice energy is large.",
          "The electrostatic lattice term follows $U \\propto \\frac{q^+q^-}{r}$, so size matters: LiF, not NaCl, is the most strongly bound alkali halide.",
        ],
        edgeCases: [
          "Bonding is never purely ionic: even CsF retains a few percent covalent character. Fajans' rules explain this — small, highly charged cations polarise the anion and raise covalent character.",
          "Anhydrous ionic solids conduct when molten or dissolved, never as solids — ions are locked into the lattice until freed.",
        ],
        examAsked: [
          "NEB: 'Why is the lattice energy of Na₂O greater than that of NaCl?' — the charge product is higher, so the electrostatic attraction is stronger.",
          "CEE: 'Why does molten NaCl conduct but solid NaCl not?' — mobile ions exist only in the melt.",
        ],
        commonMistakes: [
          "Saying 'Na transfers an electron' without noting it leaves Na's $3s^1$ and enters a Cl $3p$ orbital.",
          "Explaining a high melting point via 'strong covalent bonds' — the lattice is held by long-range electrostatic attraction, not shared pairs.",
        ],
      },
      "uc-cb-2": {
        keyFacts: [
          "A σ bond forms by head-on overlap along the internuclear axis; a π bond forms by side-on overlap of parallel p orbitals — which is why a π bond cannot exist without a preceding σ bond.",
          "Bond order $= \\frac{n_b - n_a}{2}$, so removing an electron from O₂ (order 2 → 2.5) strengthens the bond and makes the molecule paramagnetic.",
        ],
        edgeCases: [
          "Every double bond is exactly one σ plus one π, and every triple one σ plus two π — never two π in a double bond.",
          "The maximum bond number is set by available orbitals, not by the octet alone: carbon caps at four, oxygen normally at two.",
        ],
        examAsked: [
          "NEB: 'Count σ and π bonds in N₂ and in C₂H₂.' — N₂: 1σ, 1π; C₂H₂: 5σ and 2π.",
          "CEE: 'Why can a π bond not form without a σ bond?' — side-on overlap requires the atoms already aligned along the axis.",
        ],
        commonMistakes: [
          "Saying a double bond is 'twice as strong as' a single bond. It is stronger, not double.",
          "Claiming π bonds form by sideways overlap of s orbitals — only p (or d) orbitals overlap sideways.",
        ],
      },
      "uc-cb-3": {
        keyFacts: [
          "Repulsion order is LP–LP > LP–BP > BP–BP, so lone pairs squeeze bond angles smaller: CH₄ 109.5° > NH₃ 107° > H₂O 104.5°.",
          "That one ordering explains three different geometries, which is why VSEPR questions are solved by counting lone pairs on the central atom.",
        ],
        edgeCases: [
          "A lone pair occupies MORE space because it is attracted to only one nucleus, so it spreads out and pushes bonding pairs closer together.",
          "A multiple bond repels slightly more than a single bond, which is why SO₂'s angle (119°) exceeds that of a comparable all-single-bonded species.",
        ],
        examAsked: [
          "NEB: 'Explain why the NH₃ angle (107°) is smaller than CH₄ (109.5°).' — one lone pair on N repels bonding pairs more strongly.",
          "CEE: 'The angle in H₂O is 104.5°. Justify the order LP–BP > BP–BP.'",
        ],
        commonMistakes: [
          "Counting lone pairs on ALL atoms rather than only the CENTRAL atom; terminal lone pairs affect electronegativity, not geometry.",
          "Expecting tetrahedral angles for any 4-group species without checking whether one group is a lone pair.",
        ],
      },
      "uc-cb-4": {
        keyFacts: [
          "Shapes follow the number of electron GROUPS, not atoms: four groups give a tetrahedral SKELETON, but a trigonal-pyramidal MOLECULE once one group is a lone pair (NH₃ versus CH₄).",
          "Water is the standard counter-intuitive case: four electron groups like CH₄, but two lone pairs leave a BENT shape with a 104.5° angle.",
        ],
        edgeCases: [
          "Square planar (XeF₄) and linear (XeF₂) both have octahedral electron-group arrangements — six groups — so the molecular shape and the electron geometry differ for every AX₄E₂ and AX₂E₃ case.",
          "Two groups always give linear regardless of lone pairs: CO₂, BeCl₂, XeF₂ all sit at 180°, which is why the AX₂E₃ case is linear and not bent.",
        ],
        examAsked: [
          "NEB: 'Give the shape and hybridisation of XeF₄.' — square planar, $sp^3d^2$, with two lone pairs on the central atom.",
          "CEE: 'Why is H₂O bent while CH₄ is tetrahedral?' — H₂O has two lone pairs that replace two bond pairs.",
        ],
        commonMistakes: [
          "Naming the shape after the number of ATOMS (calling XeF₄ 'octahedral' because six electron pairs) instead of after the atom positions.",
          "Forgetting that a linear shape arises from two groups in ALL AX₂Eₙ cases, so the student draws a bent XeF₂.",
        ],
      },
      "uc-cb-5": {
        keyFacts: [
          "Hybridisation count equals the number of electron groups: 2 → sp, 3 → sp², 4 → sp³, 5 → sp³d, 6 → sp³d². Learn it as 'groups = hybrids'.",
          "Hybrid orbitals are constructed only AFTER the shape is known by VSEPR — the reasoning order is mandatory, since hybridisation is a model, not a cause.",
        ],
        edgeCases: [
          "Equal hybridisation does NOT imply equal shape: CH₄ (sp³, tetrahedral) and NH₃ (sp³, pyramidal) are both sp³ yet differ because one group is a lone pair.",
          "For transition metals, dsp² and sp³d² are square planar and d²sp³ octahedral respectively, with the SAME six orbitals — so hybridisation labels are not unique across the periodic table.",
        ],
        examAsked: [
          "NEB: 'Give the hybridisation and shape of PCl₅ and of SF₆.' — sp³d, trigonal bipyramidal; sp³d², octahedral.",
          "CEE: 'Hybridisation of the central atom in NH₃ and in NH₄⁺?' — both sp³, yet the shapes differ.",
        ],
        commonMistakes: [
          "Assigning hybridisation by counting sigma bonds only, ignoring lone pairs, so NH₃ is wrongly called sp².",
          "Treating hybridisation as physically real independent orbitals. It is a mathematical convenience for describing observed shapes.",
        ],
      },
      "uc-cb-6": {
        keyFacts: [
          "A molecule is polar when bond dipoles do NOT cancel. CO₂ and BF₃ have strongly polar bonds yet are non-polar overall, purely because of geometry.",
          "$\\mu = q \\times d$: a polar molecule needs BOTH a charge separation AND a non-zero distance over which it acts, so a large charge on a small separation can give a small $\\mu$.",
        ],
        edgeCases: [
          "Bond polarity is a necessary but NOT sufficient condition for molecular polarity — symmetry alone can cancel every dipole (CO₂, CCl₄, BF₃, SF₆).",
          "The dipole moment of NH₃ (1.47 D) is smaller than that of H₂O (1.85 D) despite one lone pair, because NH₃'s three bond dipoles partly cancel while H₂O's two reinforce.",
        ],
        examAsked: [
          "NEB: 'Explain why CO₂ is non-polar although each C=O bond is polar.' — the linear dipoles are equal and opposite, so $\\vec\\mu_{net} = 0$.",
          "CEE: 'Which is polar: BF₃, NH₃, H₂O, SiCl₄?' — NH₃ and H₂O only.",
        ],
        commonMistakes: [
          "Concluding 'polar bonds → polar molecule' without checking symmetry; CO₂ and BF₃ are the standard counter-examples and appear in almost every paper.",
          "Using a 2D drawing to judge cancellation, when a trigonal-planar or tetrahedral shape must be reasoned in 3D.",
        ],
      },
    },
  },
};