import {describe, it, expect} from 'vitest';

/**
 * Tests the MOQ (minimum order quantity) stepping/rounding logic from
 * CartLineItem.tsx's CartLineQuantity component:
 *   - msq falls back to 1 for products with no MOQ (or msq <= 1)
 *   - +/- buttons step by msq, never going below msq
 *   - manual entry rounds to the closest multiple of msq (minimum msq itself)
 */

function resolveMsq(rawValue: string | undefined) {
  const msqValue = Number(rawValue);
  return Number.isFinite(msqValue) && msqValue > 1 ? msqValue : 1;
}

function stepButtons(quantity: number, msq: number) {
  const prevQuantity = Number(Math.max(msq, quantity - msq).toFixed(0));
  const nextQuantity = Number((quantity + msq).toFixed(0));
  return {prevQuantity, nextQuantity};
}

function roundToMsq(rawQty: number, msq: number) {
  if (!Number.isFinite(rawQty)) return null;
  // Floored at msq itself — a MOQ product can never have fewer than msq in
  // the cart while the line still exists, so anything below msq rounds UP to
  // msq rather than down toward 0.
  return Math.max(msq, Math.round(rawQty / msq) * msq);
}

describe('resolveMsq', () => {
  it('falls back to 1 when there is no msq metafield', () => {
    expect(resolveMsq(undefined)).toBe(1);
  });

  it('falls back to 1 when msq is 1 or less', () => {
    expect(resolveMsq('1')).toBe(1);
    expect(resolveMsq('0')).toBe(1);
  });

  it('uses the metafield value when it is a valid MOQ', () => {
    expect(resolveMsq('5')).toBe(5);
  });
});

describe('stepButtons (+/- controls)', () => {
  it('steps by 1 for a non-MOQ product', () => {
    expect(stepButtons(3, 1)).toEqual({prevQuantity: 2, nextQuantity: 4});
  });

  it('steps by msq for a MOQ product', () => {
    expect(stepButtons(10, 5)).toEqual({prevQuantity: 5, nextQuantity: 15});
  });

  it('never decreases below msq', () => {
    expect(stepButtons(5, 5).prevQuantity).toBe(5);
  });
});

describe('roundToMsq (manual entry)', () => {
  it('rounds down to the closest multiple of msq', () => {
    expect(roundToMsq(7, 5)).toBe(5);
  });

  it('rounds up to the closest multiple of msq', () => {
    expect(roundToMsq(8, 5)).toBe(10);
  });

  it('rounds exactly halfway up (standard JS rounding)', () => {
    expect(roundToMsq(7.5, 5)).toBe(10);
  });

  it('rounds an entry below msq UP to msq (never down to 0)', () => {
    expect(roundToMsq(2, 5)).toBe(5);
  });

  it('rounds a very small entry up to msq too', () => {
    expect(roundToMsq(1, 10)).toBe(10);
  });

  it('rejects non-numeric entry (caller re-uses the last valid quantity)', () => {
    expect(roundToMsq(NaN, 5)).toBe(null);
  });

  it('leaves an exact multiple unchanged', () => {
    expect(roundToMsq(15, 5)).toBe(15);
  });

  it('is a no-op for non-MOQ products (msq=1)', () => {
    expect(roundToMsq(7, 1)).toBe(7);
  });
});
