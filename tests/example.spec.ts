import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load variables from .env file
dotenv.config();

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').click()

  let username = process.env.USERNAME1;
  let password = process.env.PASSWORD1;

  if (username !== undefined) {
    await page.locator('[data-test="username"]').fill(username);
  }
  await page.locator('#password').click();

  if (password !== undefined) {
    await page.locator('[data-test="password"]').fill(password);
  }
  
  await page.locator('[data-test="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
});