import { expect, test } from '@playwright/test';

test('home page loads and shows the title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('report-tool');
  await expect(page.getByRole('heading', { name: 'report-tool' })).toBeVisible();
});
