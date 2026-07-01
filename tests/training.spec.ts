import {test} from '@playwright/test';

//page=fixture

test('loginSauceDemo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()

})