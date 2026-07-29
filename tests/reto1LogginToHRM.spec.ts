import { expect } from '@playwright/test';
import { test } from './hooks';

test('logginCorrecto', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await page.close();
});

test('noLogginConUsuarioIncorrecto', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('UsuarioNoValido');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
  await page.close();
});

test('noLogginConPasswordIncorrecto', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin12345');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
  await page.close();
});

test('noLogginConCaracteresEspeciales', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin$%!@');
  await page.getByRole('textbox', { name: 'Password' }).fill('id=1');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
  await page.close();
});

test('noLogginConCamposObligatoriosVacios', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required').first()).toBeVisible();
  await page.close();
});
