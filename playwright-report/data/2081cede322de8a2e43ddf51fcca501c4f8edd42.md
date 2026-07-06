# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: storefront-connection.spec.ts >> Storefront API Connection >> homepage loads and renders header
- Location: e2e/storefront-connection.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('header')
Expected: visible
Error: strict mode violation: locator('header') resolved to 4 elements:
    1) <header>…</header> aka getByText('CART×')
    2) <header>…</header> aka getByText('SEARCH×')
    3) <header>…</header> aka getByText('MENU×')
    4) <header class="header site-header">…</header> aka getByText('HomeCatalogContactZA')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('header')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - link "hw-storefront-ui" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "hw-storefront-ui" [ref=e5]
      - navigation [ref=e6]:
        - link "Home" [ref=e7] [cursor=pointer]:
          - /url: /
        - link "Catalog" [ref=e8] [cursor=pointer]:
          - /url: /collections/all
        - link "Contact" [ref=e9] [cursor=pointer]:
          - /url: /pages/contact
      - navigation [ref=e10]:
        - button "Select country" [ref=e12]:
          - img [ref=e13]
          - text: ZA
        - link "Sign in" [ref=e16] [cursor=pointer]:
          - /url: /account/login
          - img [ref=e17]
        - button "Search" [ref=e20]:
          - img [ref=e21]
        - link "Cart" [ref=e24] [cursor=pointer]:
          - /url: /cart
          - img [ref=e25]
    - paragraph [ref=e29]: PROUDLY SERVING OUR CLIENTS FOR OVER 25 YEARS
  - main [ref=e30]:
    - generic [ref=e31]:
      - heading "Online" [level=2] [ref=e33]
      - separator [ref=e35]
      - link "IRRIGATION PUMPS" [ref=e38] [cursor=pointer]:
        - /url: /collections/irrigation-pumps
        - heading "IRRIGATION PUMPS" [level=3] [ref=e39]
  - contentinfo [ref=e40]:
    - navigation [ref=e41]:
      - link "Search" [ref=e42] [cursor=pointer]:
        - /url: /search
      - link "Your Privacy Choices" [ref=e43] [cursor=pointer]:
        - /url: /pages/data-sharing-opt-out
    - generic [ref=e44]:
      - link "Privacy Policy" [ref=e45] [cursor=pointer]:
        - /url: /policies/privacy-policy
      - link "Terms of Service" [ref=e46] [cursor=pointer]:
        - /url: /policies/terms-of-service
      - link "Refund Policy" [ref=e47] [cursor=pointer]:
        - /url: /policies/refund-policy
      - link "Shipping Policy" [ref=e48] [cursor=pointer]:
        - /url: /policies/shipping-policy
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | 
  3  | test.describe('Storefront API Connection', () => {
  4  |   test('homepage loads and renders header', async ({page}) => {
  5  |     const response = await page.goto('/');
  6  |     expect(response?.status()).toBeLessThan(500);
> 7  |     await expect(page.locator('header')).toBeVisible();
     |                                          ^ Error: expect(locator).toBeVisible() failed
  8  |   });
  9  | 
  10 |   test('integration test dashboard loads', async ({page}) => {
  11 |     await page.goto('/integration-test');
  12 |     await expect(page.locator('h1')).toContainText('Integration Test Dashboard');
  13 |   });
  14 | 
  15 |   test('integration checks show no failures', async ({page}) => {
  16 |     await page.goto('/integration-test');
  17 |     await page.waitForLoadState('networkidle');
  18 | 
  19 |     const failBadges = page.locator('text=/\\d+ Fail/');
  20 |     if (await failBadges.count() > 0) {
  21 |       const failText = await failBadges.first().textContent();
  22 |       const failCount = parseInt(failText?.match(/(\d+)/)?.[1] ?? '0');
  23 |       if (failCount > 0) {
  24 |         const failDetails = await page.locator('[style*="rgba(255,0,0"]').allTextContents();
  25 |         console.warn('Integration check failures:', failDetails);
  26 |       }
  27 |       expect(failCount, `Integration checks have ${failCount} failure(s)`).toBe(0);
  28 |     }
  29 |   });
  30 | });
  31 | 
```