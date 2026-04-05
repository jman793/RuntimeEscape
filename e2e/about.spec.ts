import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test('renders header', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About me' })).toBeVisible();
  });

  test('displays About Me heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
  });

  test('displays biographical content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('Jonah Marz')).toBeVisible();
    await expect(page.getByText('University of Missouri')).toBeVisible();
  });
});
