import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('create transactions', async({page}) => {

    await page.goto('http://127.0.0.1:5500/login.html');
    await page.locator('//input[@id="username"]').fill('user');
    await page.locator('//input[@id="password"]').fill('pass');
    await page.locator('//button[@type="submit"]').click();

    for(let i=0;i<5;i++){
        await page.locator('//button[@data-target="#transactionModal"]').click();
        await page.locator('//input[@id="date"]').fill('2024-09-27');
        await page.locator('//input[@id="amount"]').fill(faker.number.int({min:100,max:200}).toString());
        await page.locator('//input[@id="description"]').fill(faker.person.firstName());
        await page.locator('//button[@type="submit"]').click();
    }

    await page.pause();

});
