import {test, expect} from '@playwright/test';

test.describe('Collections', () => {
  test('/collections/all does not return 404', async ({page}) => {
    const response = await page.goto('/collections/all');
    expect(response?.status()).not.toBe(404);
    expect(response?.status()).toBeLessThan(500);
  });

  test('/collections/all displays "All Products" heading', async ({page}) => {
    await page.goto('/collections/all');
    await expect(page.locator('h1')).toContainText(/all products/i);
  });

  test('/collections/all shows product cards', async ({page}) => {
    await page.goto('/collections/all');
    await page.waitForLoadState('networkidle');

    const productCards = page.locator('.products-grid > *');
    const count = await productCards.count();
    expect(count, 'Expected at least 1 product on /collections/all').toBeGreaterThan(0);
  });

  test('product cards have non-zero prices', async ({page}) => {
    await page.goto('/collections/all');
    await page.waitForLoadState('networkidle');

    const priceElements = page.locator('.products-grid [class*="price"], .products-grid [data-price]');
    const count = await priceElements.count();
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const text = await priceElements.nth(i).textContent();
        expect(text, `Price element ${i} should not show 0.00`).not.toMatch(/\b0[.,]00\b/);
      }
    }
  });
});
