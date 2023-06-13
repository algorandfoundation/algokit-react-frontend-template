import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/')
})

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Algorand front-end template/)
})

test('get started link', async ({ page }) => {
  await expect(page.getByTestId('getting-started')).toHaveText('Getting started')
})
