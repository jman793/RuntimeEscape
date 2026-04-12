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
    const postCardHeadings = page.locator('a h2');
    await expect(postCardHeadings.first()).toBeVisible();
  });
});
