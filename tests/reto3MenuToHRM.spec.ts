import { expect } from '@playwright/test';
import { test } from './hooks';

test('navigateMenuItems', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  const menuItems = page.getByLabel('Sidepanel').getByRole('listitem');
  const menuItemsCount = await menuItems.count();
  console.log('Numero de elementos en el menu:', menuItemsCount);

  const currentMenuItems: string[] = [];

  for (let i = 0; i < menuItemsCount; i++) {
    const menuItem = await menuItems.nth(i).innerText();
    currentMenuItems.push(menuItem);
  }

  console.log(currentMenuItems);

  const realMenuItems = [
    'Admin',
    'PIM',
    'Leave',
    'Time',
    'Recruitment',
    'My Info',
    'Performance',
    'Dashboard',
    'Directory',
    'Maintenance',
    'Claim',
    'Buzz',
  ];

  expect(currentMenuItems).toEqual(realMenuItems);
  expect(currentMenuItems[0]).toEqual(realMenuItems[0]);
  console.log(
    'El primer item del menu encontrado es:',
    currentMenuItems[0],
    'y el item real es:',
    realMenuItems[0],
  );
});
