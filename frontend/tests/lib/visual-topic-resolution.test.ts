import { describe, expect, it } from 'vitest';
import { matchConceptSchematic } from '@/components/lab/schematic-concepts';
import { getExactUnitConcept, getUnitConcept } from '@/lib/visual-concept-map';

describe('topic and subject safe authored drawings', () => {
  it('does not use a unit keyword as evidence for every sibling topic', () => {
    expect(matchConceptSchematic('physics', 'thermal-equilibrium', 'Thermal equilibrium', 'kinematics')).toBeUndefined();
    expect(matchConceptSchematic('mathematics', 'straight-line', 'Straight line', 'quadratic-equations')).toBeUndefined();
  });
  it('does not treat substrings of ordinary words as scientific keywords', () => {
    expect(getUnitConcept('writing', 'using-evidence', 'Using evidence', 'english')).toBeUndefined();
    expect(getUnitConcept('organic-chemistry', 'carbon-compounds', 'Carbon compounds', 'chemistry')).toBeUndefined();
  });
  it('does not serve physics vectors as mathematics vectors', () => {
    expect(getExactUnitConcept('vectors', 'mathematics')).toBeUndefined();
    expect(getUnitConcept('vectors', 'scalar-product', 'Scalar product', 'mathematics')).toBeUndefined();
    expect(getExactUnitConcept('vectors', 'physics')).toBeDefined();
  });
  it('keeps explicitly matched authored diagrams', () => {
    expect(matchConceptSchematic('mathematics', 'quadratic-equation', 'Quadratic equation', 'algebra')?.name).toContain('Quadratic');
    expect(getUnitConcept('vectors', 'vector-addition', 'Vector addition', 'physics')).toBeDefined();
  });
});
