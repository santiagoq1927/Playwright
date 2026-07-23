import test from "@playwright/test";
import { CommonPage } from "../src/pages/CommonPage";
import { LoginPageMethods } from "../src/pages/loginPage/LoginPageMethods";
import { ProductsPageMethods } from "../src/pages/productsPage/ProductPageMethods";
import * as loginInterface from "../src/pages/loginPage/login.interface";
import { HeaderPageMethods } from "../src/pages/headerPage/HeaderPageMethods";
import { CartPageMethods } from "../src/pages/cartPage/CartPageMethods";

test.describe('Cart test cases' , async () => {

    test('Add item to cart', async({page})=>{
        const commoPage = new CommonPage(page);
        const loginMethods = new LoginPageMethods(page)
        const productsPageMethods = new ProductsPageMethods(page);
        const headerPageMethods = new HeaderPageMethods(page);
        const cartPageMethods = new CartPageMethods(page);
        const title = 'Products';   
        const productName = 'Sauce Labs Bolt T-Shirt';
    
        await commoPage.navigateTo();
        await loginMethods.login(loginInterface.standartUser);
        await productsPageMethods.verifyTitleLabel(title);
        await productsPageMethods.addToCartByName(productName);
        await headerPageMethods.clickCartButton();
        await cartPageMethods.verifyProductByName(productName);
    })

    test('Remove item from cart', async({page})=>{
        const commoPage = new CommonPage(page);
        const loginMethods = new LoginPageMethods(page)
        const productsPageMethods = new ProductsPageMethods(page);
        const headerPageMethods = new HeaderPageMethods(page);
        const cartPageMethods = new CartPageMethods(page);
        const title = 'Products';   
        const productName = 'Sauce Labs Bolt T-Shirt';
    
        await commoPage.navigateTo();
        await loginMethods.login(loginInterface.standartUser);
        await productsPageMethods.verifyTitleLabel(title);
        await productsPageMethods.addToCartByName(productName);
        await headerPageMethods.clickCartButton();
        await cartPageMethods.verifyProductByName(productName);
        await cartPageMethods.removeProductByName(productName);
        await cartPageMethods.verifyProductRemove(productName);
    })
})