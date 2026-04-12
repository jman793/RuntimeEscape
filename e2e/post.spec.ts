import { test, expect } from '@playwright/test';

test.describe('Post page - Toolbox and Toolshed', () => {
  test('renders header', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('renders title, description, and MDX content', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await expect(page.getByRole('heading', { level: 1, name: 'Toolbox and Toolshed' })).toBeVisible();
    await expect(page.getByText(/My first, most useful, and most successful personal projects/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The Initial Idea' })).toBeVisible();
  });

  test('sets the page title from frontmatter', async ({ page }) => {
    await page.goto('/Toolbox_and_Toolshed');
    await expect(page).toHaveTitle('Toolbox and Toolshed');
  });
});
