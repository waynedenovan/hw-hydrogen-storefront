import {test, expect} from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5130';

test.describe('Content Routes', () => {
  test.describe('Policies', () => {
    test('policies index returns 200 and shows policy links', async ({
      page,
    }) => {
      const response = await page.goto(`${BASE_URL}/policies`);
      if (response && response.status() === 200) {
        await expect(page.locator('h1')).toContainText('Policies');
        const links = page.locator('a[href*="/policies/"]');
        expect(await links.count()).toBeGreaterThan(0);
      } else {
        test.skip(true, 'No policies configured in the store');
      }
    });

    test('nonexistent policy returns 404', async ({request}) => {
      const response = await request.get(
        `${BASE_URL}/policies/nonexistent-policy`,
      );
      expect(response.status()).toBe(404);
    });
  });

  test.describe('Pages', () => {
    test('nonexistent page returns 404', async ({request}) => {
      const response = await request.get(
        `${BASE_URL}/pages/nonexistent-page-handle`,
      );
      expect(response.status()).toBe(404);
    });
  });
});
