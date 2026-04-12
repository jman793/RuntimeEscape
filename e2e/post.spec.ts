import { test, expect } from '@playwright/test';

test.describe('Post page - Toolbox and Toolshed', () => {
  test('renders header', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('renders title heading and MDX content area', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('sets the page title from frontmatter', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await expect(page).toHaveTitle(/.+/);
  });
});
