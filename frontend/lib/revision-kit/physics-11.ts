import type { UnitKit } from './types';
export const PHYSICS_11_KITS: Record<string, UnitKit> = {
  'physical-quantities': {
    summary: 'Study of fundamental and derived units, dimensions, and error analysis.',
    formulas: ['Area=l*b, V=l*b*h, ρ=m/V, v=s/t, a=(v-u)/t, F=ma, W=Fs, P=F/A', 'Relative error: ΔZ/Z = Δx/x + Δy/y'],
    constants: ['7 base units.'],
    shortcuts: ['Dimensional analysis checks for consistency.'],
    examTricks: ['Leading zeros never count in sig figs.'],
    memoryAids: ['Mighty King Served A King\\'s Meal Cold.'],
    confusion: ['Distance vs Displacement', 'Speed vs Velocity'],
    clarification: ['Dimensions represent fundamental nature (M, L, T).'],
    importantNotes: ['All physical equations must be dimensionally homogeneous.'],
    bulletPoints: ['Base SI Units: 7'],
    specialNotes: ['Dimensional analysis cannot find dimensionless constants.'],
    conceptExplanation: ['Base quantities are independent.'],
    mistakesToAvoid: ['Not converting units to SI.'],
  },
};
