import { test, expect } from '@playwright/test';

test.describe('404 page', () => {
  test('renders 404 heading on unknown route', async ({ page }) => {
    const response = await page.goto('/this-route-definitely-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
  });

  test('navigates back home from 404', async ({ page }) => {
    await page.goto('/this-route-definitely-does-not-exist');
    await page.getByRole('link', { name: 'cd ~' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/welcome to RuntimeEscape/)).toBeVisible();
  });
});
