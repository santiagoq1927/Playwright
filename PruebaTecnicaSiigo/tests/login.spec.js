const { test } = require('@playwright/test');
const LoginPage = require('../pages/login/LoginPage');
const HomePage = require('../pages/home/HomePage');

test('Login home for create third', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate();
    await loginPage.login('retoautomationsiigo2@yopmail.com','J1h4{zMTV3');
    await homePage.validateTitle('RA S.A.S ');
});