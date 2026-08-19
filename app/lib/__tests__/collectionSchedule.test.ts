import {describe, it, expect} from 'vitest';
import {
  getMinCollectionDate,
  getWorkingHoursFor,
  validateCollectionDateTime,
} from '~/lib/collectionSchedule';

// A fixed Wednesday, well clear of any DST/month-boundary edge cases.
const WEDNESDAY = new Date('2026-08-19T00:00:00');

describe('getMinCollectionDate', () => {
  it('skips weekends when counting 4 working days ahead from a Wednesday', () => {
    // Wed -> Thu(1), Fri(2), Mon(3), Tue(4)
    expect(getMinCollectionDate(WEDNESDAY)).toBe('2026-08-25');
  });

  it('skips weekends when counting from a Friday', () => {
    const friday = new Date('2026-08-21T00:00:00');
    // Fri -> Mon(1), Tue(2), Wed(3), Thu(4)
    expect(getMinCollectionDate(friday)).toBe('2026-08-27');
  });
});

describe('getWorkingHoursFor', () => {
  it('returns Mon-Thu hours', () => {
    expect(getWorkingHoursFor('2026-08-20')).toEqual({min: '08:00', max: '16:30'});
  });

  it('returns shortened Friday hours', () => {
    expect(getWorkingHoursFor('2026-08-21')).toEqual({min: '08:00', max: '15:30'});
  });

  it('returns null for a weekend date', () => {
    expect(getWorkingHoursFor('2026-08-22')).toBeNull();
    expect(getWorkingHoursFor('2026-08-23')).toBeNull();
  });
});

describe('validateCollectionDateTime', () => {
  it('rejects a date sooner than 4 working days out', () => {
    const result = validateCollectionDateTime('2026-08-20', '09:00', WEDNESDAY);
    expect(result.valid).toBe(false);
  });

  it('rejects a weekend date even if far enough out', () => {
    const result = validateCollectionDateTime('2026-09-05', '09:00', WEDNESDAY);
    expect(result.valid).toBe(false);
  });

  it('rejects a time outside working hours', () => {
    const result = validateCollectionDateTime('2026-08-25', '17:00', WEDNESDAY);
    expect(result.valid).toBe(false);
  });

  it('rejects a time after the shortened Friday close', () => {
    const result = validateCollectionDateTime('2026-08-28', '16:00', WEDNESDAY);
    expect(result.valid).toBe(false);
  });

  it('accepts a valid weekday date and time', () => {
    const result = validateCollectionDateTime('2026-08-25', '09:00', WEDNESDAY);
    expect(result.valid).toBe(true);
  });

  it('accepts the Friday close boundary exactly', () => {
    const result = validateCollectionDateTime('2026-08-28', '15:30', WEDNESDAY);
    expect(result.valid).toBe(true);
  });
});
