import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigate from home to a post via post card', async ({ page }) => {
    await page.goto('/');
    await page.locator('a h2').first().click();
    await expect(page).toHaveURL(/\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigate from a post back to home via header link', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/welcome to RuntimeEscape/)).toBeVisible();
  });
});
