import {test, expect} from '@playwright/test'
import { NavigateTo } from '../pageobjects/navigate/NavigateTo';
import { LoginPage } from '../pageobjects/login/LoginPage';

test('add-contacts', async({page}) => {

    const navigateTo = new NavigateTo(page);
    const loginPage = new LoginPage(page);

    navigateTo.loginPageLinkedin();

    await loginPage.doLogin('correo@gmail.com','1234');

    await page.pause();

});
