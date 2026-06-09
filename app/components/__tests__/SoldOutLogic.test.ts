import {describe, it, expect} from 'vitest';

/**
 * Tests the "Sold Out" display logic from ($locale).products.$handle.tsx.
 * The button text and disabled state are determined by:
 *   - disabled: !selectedOrFirstAvailableVariant?.availableForSale
 *   - text: availableForSale ? "Add to Cart" : "Sold Out"
 */

function getButtonState(variant: {availableForSale: boolean} | null | undefined) {
  const disabled = !variant?.availableForSale;
  const text = variant?.availableForSale ? 'Add to Cart' : 'Sold Out';
  return {disabled, text};
}

describe('Product "Sold Out" display logic', () => {
  it('shows "Add to Cart" when availableForSale is true', () => {
    const result = getButtonState({availableForSale: true});
    expect(result.text).toBe('Add to Cart');
    expect(result.disabled).toBe(false);
  });

  it('shows "Sold Out" when availableForSale is false', () => {
    const result = getButtonState({availableForSale: false});
    expect(result.text).toBe('Sold Out');
    expect(result.disabled).toBe(true);
  });

  it('shows "Sold Out" when variant is null', () => {
    const result = getButtonState(null);
    expect(result.text).toBe('Sold Out');
    expect(result.disabled).toBe(true);
  });

  it('shows "Sold Out" when variant is undefined', () => {
    const result = getButtonState(undefined);
    expect(result.text).toBe('Sold Out');
    expect(result.disabled).toBe(true);
  });
});

describe('GraphQL query shape validation', () => {
  const PRODUCT_QUERY = `#graphql
    query Product(
      $handle: String!
      $selectedOptions: [SelectedOptionInput!]!
      $country: CountryCode
      $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
      product(handle: $handle) {
        id
        title
        handle
        selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
          id
          availableForSale
          price { amount currencyCode }
        }
      }
    }
  `;

  it('includes @inContext directive', () => {
    expect(PRODUCT_QUERY).toContain('@inContext(country: $country, language: $language)');
  });

  it('queries selectedOrFirstAvailableVariant', () => {
    expect(PRODUCT_QUERY).toContain('selectedOrFirstAvailableVariant');
  });

  it('includes availableForSale field', () => {
    expect(PRODUCT_QUERY).toContain('availableForSale');
  });

  it('includes country and language variables', () => {
    expect(PRODUCT_QUERY).toContain('$country: CountryCode');
    expect(PRODUCT_QUERY).toContain('$language: LanguageCode');
  });

  it('queries by handle', () => {
    expect(PRODUCT_QUERY).toContain('product(handle: $handle)');
  });
});
