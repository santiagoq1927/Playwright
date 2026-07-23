import test from "@playwright/test";
import { CommonPage } from "../src/pages/CommonPage";
import { LoginPageMethods } from "../src/pages/loginPage/LoginPageMethods";
import { ProductsPageMethods } from "../src/pages/productsPage/ProductPageMethods";
import * as loginInterface from "../src/pages/loginPage/login.interface";
import { HeaderPageMethods } from "../src/pages/headerPage/HeaderPageMethods";
import { CartPageMethods } from "../src/pages/cartPage/CartPageMethods";

test.describe('Login test cases' , async () => {
    test('Login', async({page})=>{
        //console.log('Login test case');
        //console.log('Login test case');
        const commoPage = new CommonPage(page);
        const loginMethods = new LoginPageMethods(page)
        const prodoctsPageMethods = new ProductsPageMethods(page);
    
        await commoPage.navigateTo();
        await loginMethods.login(loginInterface.standartUser);
        await prodoctsPageMethods.verifyTitleLabel('Products');
    })

    test('Login invalid', async({page})=>{
        const commoPage = new CommonPage(page);
        const loginMethods = new LoginPageMethods(page)
    
        await commoPage.navigateTo();
        await loginMethods.login(loginInterface.invalidUser);
        await loginMethods.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service')
    })

    test('Login without credentials', async({page})=>{
        const commoPage = new CommonPage(page);
        const loginMethods = new LoginPageMethods(page)
    
        await commoPage.navigateTo();
        await loginMethods.selectLogin();
        await loginMethods.verifyErrorMessage('Epic sadface: Username is required')
    })
})