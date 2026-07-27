import {describe, it, expect} from 'vitest';
import {computeChildTier} from '../($locale).collections.$handle';

function node(title: string, parent?: string) {
  return {
    id: `gid://shopify/Collection/${title}`,
    title,
    handle: title.toLowerCase().replace(/\s+/g, '-'),
    parent: parent ? {value: parent} : null,
  };
}

describe('computeChildTier', () => {
  it('shows Sub Collection tiles when a Main has multiple Subs (h3, unchanged)', () => {
    const plumbing = {title: 'Plumbing', role: {value: 'main'}};
    const allNodes = [
      node('Fittings (HF)', 'Plumbing'),
      node('Valves (HL)', 'Plumbing'),
    ];
    const {subCollections, childHeadingLevel} = computeChildTier(plumbing, allNodes);
    expect(subCollections.map((c: any) => c.title)).toEqual(['Fittings (HF)', 'Valves (HL)']);
    expect(childHeadingLevel).toBe('h3');
  });

  it('skips the lone Sub and shows its Sub-Cat children when a Main has exactly one Sub', () => {
    const welding = {title: 'Welding', role: {value: 'main'}};
    const allNodes = [
      node('Welding (RB)', 'Welding'),
      node('Welding Electrodes', 'Welding (RB)'),
      node('Welding Accessories', 'Welding (RB)'),
    ];
    const {subCollections, childHeadingLevel} = computeChildTier(welding, allNodes);
    expect(subCollections.map((c: any) => c.title)).toEqual([
      'Welding Accessories',
      'Welding Electrodes',
    ]);
    expect(childHeadingLevel).toBe('h4');
  });

  it('falls back to no tiles (products) when the lone Sub also has no children', () => {
    const solo = {title: 'Solo Main', role: {value: 'main'}};
    const allNodes = [node('Solo Sub', 'Solo Main')];
    const {subCollections} = computeChildTier(solo, allNodes);
    expect(subCollections).toEqual([]);
  });

  it('returns no tiles for a Main with zero Subs', () => {
    const empty = {title: 'Empty Main', role: {value: 'main'}};
    const {subCollections} = computeChildTier(empty, []);
    expect(subCollections).toEqual([]);
  });

  it('a Sub Collection page always falls through to products, even with multiple Sub-Cat children (task 2607271535)', () => {
    const sub = {title: 'Welding (RB)', role: {value: 'sub'}};
    const allNodes = [
      node('Welding Electrodes', 'Welding (RB)'),
      node('Welding Accessories', 'Welding (RB)'),
    ];
    const {subCollections} = computeChildTier(sub, allNodes);
    expect(subCollections).toEqual([]);
  });

  it('a Sub Collection page falls through to products even with exactly one Sub-Cat child', () => {
    const sub = {title: 'Fittings (HF)', role: {value: 'sub'}};
    const allNodes = [node('Fittings Accessories', 'Fittings (HF)')];
    const {subCollections} = computeChildTier(sub, allNodes);
    expect(subCollections).toEqual([]);
  });

  it('a Sub-Cat Collection page (leaf) always falls through to products', () => {
    const subCat = {title: 'Welding Electrodes', role: {value: 'subcat'}};
    const allNodes = [node('Welding Electrodes', 'Welding (RB)')];
    const {subCollections} = computeChildTier(subCat, allNodes);
    expect(subCollections).toEqual([]);
  });
});
