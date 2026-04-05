import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders header with navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About me' })).toBeVisible();
  });

  test('displays welcome text', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Hello, I am Jonah')).toBeVisible();
  });

  test('displays post cards with links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Test Post' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Test Post/ })).toBeVisible();
  });
});
