import type { UnitKit } from './types';
export const CHEMISTRY_11_KITS: Record<string, UnitKit> = {
  'stoichiometry': {
    summary: 'Mole concept, limiting reagent, empirical formula, molarity/molality.',
    formulas: ['n = mass / molar mass', 'Molarity (M) = n / V(L)'],
    constants: ['Avogadro\\'s Number = 6.022×10²³.'],
    shortcuts: ['Molarity changes with temp; Molality does not.'],
    examTricks: ['Limiting reagent gives least product.'],
    memoryAids: ['Mole = amount.'],
    confusion: ['Molarity vs Molality'],
    clarification: ['Molality is temperature independent.'],
    importantNotes: ['Stoichiometric coefficients define molar ratios.'],
    bulletPoints: ['Mass conservation applies.'],
    specialNotes: ['Empirical formula is simplest ratio.'],
    conceptExplanation: ['Stoichiometry is quantitative chemistry.'],
    mistakesToAvoid: ['Confusing mass with moles.'],
  },
};
