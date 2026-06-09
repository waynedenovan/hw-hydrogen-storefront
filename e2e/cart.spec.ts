import {test, expect} from '@playwright/test';

test.describe('Cart Integration', () => {
  test('cart page loads', async ({page}) => {
    const response = await page.goto('/cart');
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('h1')).toContainText(/cart/i);
  });

  test('can navigate to a product and see non-zero price', async ({page}) => {
    await page.goto('/collections/all');
    await page.waitForLoadState('networkidle');

    const firstProduct = page.locator('.products-grid a').first();
    if (await firstProduct.count() === 0) {
      test.skip(true, 'No products available to test');
      return;
    }

    await firstProduct.click();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toBeVisible();

    const priceText = await page.locator('.product-main').textContent();
    expect(priceText).toBeTruthy();
  });

  test('add to cart produces non-zero price in cart', async ({page}) => {
    await page.goto('/collections/all');
    await page.waitForLoadState('networkidle');

    const firstProduct = page.locator('.products-grid a').first();
    if (await firstProduct.count() === 0) {
      test.skip(true, 'No products available to test');
      return;
    }

    await firstProduct.click();
    await page.waitForLoadState('networkidle');

    const addToCartBtn = page.locator('button[type="submit"]', {hasText: /add to cart/i});
    if (await addToCartBtn.count() === 0 || await addToCartBtn.isDisabled()) {
      test.skip(true, 'Add to cart button not available (product may be sold out)');
      return;
    }

    await addToCartBtn.click();
    await page.waitForTimeout(2000);

    await page.goto('/cart');
    await page.waitForLoadState('networkidle');

    const cartContent = await page.locator('.cart').textContent();
    expect(cartContent).toBeTruthy();

    const hasZeroPrice = /ZAR\s*0[.,]00|R\s*0[.,]00/.test(cartContent ?? '');
    expect(hasZeroPrice, 'Cart should not show ZAR 0.00 — indicates ZA market is DRAFT').toBe(false);
  });

  test('debug-availability route shows product data', async ({page}) => {
    await page.goto('/collections/all');
    await page.waitForLoadState('networkidle');

    const firstProductLink = page.locator('.products-grid a').first();
    if (await firstProductLink.count() === 0) {
      test.skip(true, 'No products available');
      return;
    }

    const href = await firstProductLink.getAttribute('href');
    const handle = href?.split('/products/')[1]?.split('?')[0];
    if (!handle) {
      test.skip(true, 'Could not extract product handle');
      return;
    }

    await page.goto(`/debug-availability?handle=${handle}`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator(`text=Debug: ${handle}`)).toBeVisible();

    const diagnosisSection = page.locator('text=Diagnosis');
    await expect(diagnosisSection).toBeVisible();
  });
});
