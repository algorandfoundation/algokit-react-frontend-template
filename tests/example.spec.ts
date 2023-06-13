/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('Connect to wallet', () => {
  test('Connect to KMD wallet', async ({ page }) => {
    await page.getByTestId('connect-wallet').click()
    await page.getByTestId('KMD').click()

    // page.on('dialog', dialog => dialog.accept());
    // await page.getByRole('button').click();
    await expect((await page.locator("div#address").innerText()).length).toBeGreaterThan(0)
  });
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Algorand front-end template/);
});

test('get started link', async ({ page }) => {
  await expect(page.getByTestId('learn-algorand')).toHaveText("Learn Algorand")
});
