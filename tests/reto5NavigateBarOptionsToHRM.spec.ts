import { expect } from '@playwright/test';
import { test } from './hooks';

//Ejemplo 5
test('clickBarOptionsQualifications', async ({ page }) => {
  const basePath = '/web/index.php/admin';
  const expectedPages = [
    { menu: 'Skills', url: '/viewSkills' },
    { menu: 'Education', url: '/viewEducation' },
    { menu: 'Licenses', url: '/viewLicenses' },
  ];

  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Admin' }).click();

  await page
    .getByRole('navigation', { name: 'Topbar Menu' })
    .getByText('Qualifications')
    .click();

  const qualificationsOptions = page.getByRole('menu').locator('li');

  for (let expectedPage of expectedPages) {
    const menuOptions = qualificationsOptions.filter({
      hasText: expectedPage.menu,
    });

    await menuOptions.click();
    await expect(page).toHaveURL(new RegExp(basePath + expectedPage.url));

    await page
      .getByRole('navigation', { name: 'Topbar Menu' })
      .getByText('Qualifications')
      .click();
  }
});

//Reto 5
test('clickBarOptionsOrganization', async ({ page }) => {
  const basePath = '/web/index.php/admin';
  const expectedPages = [
    {
      menu: 'General Information',
      url: '/viewOrganizationGeneralInformation',
    },
    { menu: 'Locations', url: '/viewLocations' },
    { menu: 'Structure', url: '/viewCompanyStructure' },
  ];

  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Admin' }).click();

  await page
    .getByRole('navigation', { name: 'Topbar Menu' })
    .getByText('Organization')
    .click();

  const organizationsOptions = page.getByRole('menu').locator('li');

  for (let expectedPage of expectedPages) {
    const menuOptions = organizationsOptions.filter({
      hasText: expectedPage.menu,
    });

    await menuOptions.click();
    await expect(page).toHaveURL(new RegExp(expectedPage.url));

    await page
      .getByRole('navigation', { name: 'Topbar Menu' })
      .getByText('Organization')
      .click();
  }
});
