import {describe, it, expect} from 'vitest';
import {policyHandleToFieldName} from '../($locale).policies.$handle';

describe('policyHandleToFieldName', () => {
  it('converts privacy-policy to privacyPolicy', () => {
    expect(policyHandleToFieldName('privacy-policy')).toBe('privacyPolicy');
  });

  it('converts shipping-policy to shippingPolicy', () => {
    expect(policyHandleToFieldName('shipping-policy')).toBe('shippingPolicy');
  });

  it('converts terms-of-service to termsOfService', () => {
    expect(policyHandleToFieldName('terms-of-service')).toBe('termsOfService');
  });

  it('converts refund-policy to refundPolicy', () => {
    expect(policyHandleToFieldName('refund-policy')).toBe('refundPolicy');
  });

  it('returns single-word handles unchanged', () => {
    expect(policyHandleToFieldName('privacy')).toBe('privacy');
  });
});
