import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  PERIODIC_FILTERS,
  BLOCK_FILTER_IDS,
  type PeriodicElement,
} from '../../lib/periodic-table';

const elements = JSON.parse(
  readFileSync(join(process.cwd(), 'public', 'all_elements.json'), 'utf8'),
) as PeriodicElement[];

const filters = Object.values(PERIODIC_FILTERS);

/**
 * The classifications used to be hollow placeholders: clicking a filter chip
 * filtered the table but showed an empty summary, no characteristics and no
 * traps. These tests are the gate that keeps every classification populated.
 */
describe('periodic table classification content', () => {
  it('gives every classification a summary and a general configuration', () => {
    for (const filter of filters) {
      expect(filter.oneLineSummary.trim().length, `${filter.id}: summary`).toBeGreaterThan(40);
      expect(
        filter.generalElectronicConfig.trim().length,
        `${filter.id}: general config`,
      ).toBeGreaterThan(0);
      expect(filter.shortBadge.trim().length, `${filter.id}: badge`).toBeGreaterThan(0);
    }
  });

  it('gives every classification at least three full characteristics', () => {
    for (const filter of filters) {
      expect(filter.keyCharacteristics.length, `${filter.id}: characteristics`).toBeGreaterThanOrEqual(3);
      for (const characteristic of filter.keyCharacteristics) {
        expect(characteristic.title.trim().length, `${filter.id}: characteristic title`).toBeGreaterThan(0);
        expect(
          characteristic.detail.trim().length,
          `${filter.id}: characteristic detail "${characteristic.title}"`,
        ).toBeGreaterThan(30);
      }
    }
  });

  it('gives every classification at least two exam traps', () => {
    for (const filter of filters) {
      expect(filter.examTrapsAndExceptions.length, `${filter.id}: traps`).toBeGreaterThanOrEqual(2);
      for (const trap of filter.examTrapsAndExceptions) {
        expect(trap.trim().length, `${filter.id}: trap`).toBeGreaterThan(30);
      }
    }
  });

  it('gives every classification trend facts and CEE high-frequency facts', () => {
    for (const filter of filters) {
      expect(filter.periodicTrendFacts?.length ?? 0, `${filter.id}: trend facts`).toBeGreaterThanOrEqual(3);
      expect(filter.ceeFrequentFacts?.length ?? 0, `${filter.id}: CEE facts`).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('periodic table classification data alignment', () => {
  it('loads all 118 elements from the live dataset', () => {
    expect(elements).toHaveLength(118);
  });

  it('lists no element twice inside one classification', () => {
    for (const filter of filters) {
      expect(
        new Set(filter.elementSymbols).size,
        `${filter.id}: duplicate symbols`,
      ).toBe(filter.elementSymbols.length);
    }
  });

  it('keeps the hardcoded symbol lists in step with the live data', () => {
    const mismatches: string[] = [];
    for (const filter of filters) {
      const live = elements.filter((element) => filter.testCondition(element)).length;
      if (live !== filter.elementSymbols.length) {
        mismatches.push(`${filter.id}: hardcoded ${filter.elementSymbols.length} vs live ${live}`);
      }
    }
    expect(mismatches, mismatches.join('\n')).toEqual([]);
  });

  it('keeps the four block tabs aligned with the element blocks', () => {
    for (const id of BLOCK_FILTER_IDS) {
      const filter = PERIODIC_FILTERS[id];
      const live = elements.filter((element) => filter.testCondition(element));
      expect(live.length, `${id}: live matches`).toBeGreaterThan(0);
      expect(filter.elementSymbols.length, `${id}: hardcoded symbols`).toBe(live.length);
    }
  });
});
