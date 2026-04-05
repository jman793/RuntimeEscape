import { test, expect } from '@playwright/test';

test.describe('Post page - TestPost', () => {
  test('renders header', async ({ page }) => {
    await page.goto('/TestPost');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('renders MDX content', async ({ page }) => {
    await page.goto('/TestPost');
    await expect(page.getByRole('heading', { name: 'Testing Testing 123' })).toBeVisible();
    await expect(page.getByText('This is me testing how MD renders here')).toBeVisible();
  });

  test('sets the page title from frontmatter', async ({ page }) => {
    await page.goto('/TestPost');
    await expect(page).toHaveTitle('Test Post');
  });
});
