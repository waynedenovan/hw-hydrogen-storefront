import {test, expect} from '@playwright/test';

test.describe('Storefront API Connection', () => {
  test('homepage loads and renders header', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('header')).toBeVisible();
  });

  test('integration test dashboard loads', async ({page}) => {
    await page.goto('/integration-test');
    await expect(page.locator('h1')).toContainText('Integration Test Dashboard');
  });

  test('integration checks show no failures', async ({page}) => {
    await page.goto('/integration-test');
    await page.waitForLoadState('networkidle');

    const failBadges = page.locator('text=/\\d+ Fail/');
    if (await failBadges.count() > 0) {
      const failText = await failBadges.first().textContent();
      const failCount = parseInt(failText?.match(/(\d+)/)?.[1] ?? '0');
      if (failCount > 0) {
        const failDetails = await page.locator('[style*="rgba(255,0,0"]').allTextContents();
        console.warn('Integration check failures:', failDetails);
      }
      expect(failCount, `Integration checks have ${failCount} failure(s)`).toBe(0);
    }
  });
});
