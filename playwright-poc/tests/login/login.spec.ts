import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pageobjects/login/LoginPage';
import { HomeTransaction } from '../../pageobjects/homeTransaction/HomeTransaction';
import {faker} from '@faker-js/faker'
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';

test('login', async({page}) => {

    const navigateTo = new NavigateTo(page);
    const loginPage = new LoginPage(page);
    const homeTransaction = new HomeTransaction(page);
    const user = 'user';
    const password = 'pass'
    const date = '2024-09-27';
    const amount = faker.number.int({min:50,max:2000}).toString();
    const description = faker.food.description();

    await navigateTo.loginPage();
    await loginPage.doLogin(user,password);
    await page.waitForTimeout(2000);
    await homeTransaction.selectAddTransaction();
    await homeTransaction.addTrasaction(date,amount,description);   
    expect(await homeTransaction.textActualDate('1')).toEqual(date);
    expect(await homeTransaction.textActualAmount('1')).toEqual(amount);
    expect(await homeTransaction.textActualDescription('1')).toEqual(description);
    
    await page.pause();

});
