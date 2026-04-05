import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigate from home to about via header link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About me' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: 'About Me' })).toBeVisible();
  });

  test('navigate from about back to home via header link', async ({ page }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByText('Hello, I am Jonah')).toBeVisible();
  });
});
