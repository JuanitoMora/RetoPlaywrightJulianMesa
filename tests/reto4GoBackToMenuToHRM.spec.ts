import { expect } from '@playwright/test';
import { test } from './hooks';

test('clickMenuItems', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  const menuItems = page.locator('.oxd-sidepanel-body').getByRole('listitem');
  const menuItemsCount = await menuItems.count();

  for (let i = 0; i < menuItemsCount; i++) {
    const menuItem = menuItems.nth(i);
    const menuText = await menuItem.innerText();

    console.log('Click en el menu:', menuText);

    if (menuText == 'Maintenance') {
      await menuItem.click();
      await page.goBack({ timeout: 1000 });
    } else {
      await menuItem.click();
    }
  }
});
