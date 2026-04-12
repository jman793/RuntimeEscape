import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigate from home to a post via post card', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Toolbox and Toolshed/ }).click();
    await expect(page).toHaveURL(/Toolbox_and_Toolshed/);
    await expect(page.getByRole('heading', { level: 1, name: 'Toolbox and Toolshed' })).toBeVisible();
  });

  test('navigate from a post back to home via header link', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/welcome to RuntimeEscape/)).toBeVisible();
  });
});
