import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders header with navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('displays welcome text', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/welcome to RuntimeEscape/)).toBeVisible();
  });

  test('displays post cards with links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Toolbox and Toolshed' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Toolbox and Toolshed/ })).toBeVisible();
  });
});
