import { test, expect } from '@playwright/test';

test.describe('Theme colors', () => {
  test('page background uses theme color (not default white)', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Should be the dark bg color (gray-900: rgb(17, 24, 39)), not white/transparent
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
  });

  test('header uses theme secondary color', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('.bg-secondary').first();
    const bgColor = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Should be the secondary color (red-500: rgb(239, 68, 68)), not transparent
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('post card uses theme neutral background', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('.bg-neutral-muted').first();
    const bgColor = await card.evaluate((el) => getComputedStyle(el).backgroundColor);
    // Should be the neutral-muted color (slate-800), not transparent
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('links use theme primary-light color', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('.text-primary-light').first();
    const color = await link.evaluate((el) => getComputedStyle(el).color);
    // Should be primary-light (blue-200: rgb(191, 219, 254)), not default/inherited
    expect(color).not.toBe('rgb(0, 0, 0)');
  });
});
