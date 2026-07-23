import test from "@playwright/test";
import { CommonPage } from "../src/pages/CommonPage";
import { LoginPageMethods } from "../src/pages/loginPage/LoginPageMethods";
import { ProductsPageMethods } from "../src/pages/productsPage/ProductPageMethods";
import * as loginInterface from "../src/pages/loginPage/login.interface";
import { HeaderPageMethods } from "../src/pages/headerPage/HeaderPageMethods";
import { CartPageMethods } from "../src/pages/cartPage/CartPageMethods";
import { CheckoutPageMethods } from "../src/pages/checkoutPage/CheckoutPageMethods";
import { CheckoutPageData } from "../src/pages/checkoutPage/CheckoutPageData";
import { OverviewPageMethods } from "../src/pages/overviewPage/OverviewPageMethods";

test.describe('Checkout test cases' , async () => {

    test.only('Checkout process', async({page})=>{
        const commoPage = new CommonPage(page);
        const loginMethods = new LoginPageMethods(page)
        const productsPageMethods = new ProductsPageMethods(page);
        const headerPageMethods = new HeaderPageMethods(page);
        const cartPageMethods = new CartPageMethods(page);
        const checkoutPageMethods = new CheckoutPageMethods(page);
        const checkoutData = new CheckoutPageData();
        const overviewPageMethods = new OverviewPageMethods(page);
        const title = 'Products';   
        const productName = 'Sauce Labs Bolt T-Shirt';
        const finalOrderLabel = 'Thank you for your order!';
    
        await commoPage.navigateTo();
        await loginMethods.login(loginInterface.standartUser);
        await productsPageMethods.verifyTitleLabel(title);
        await productsPageMethods.addToCartByName(productName);
        await headerPageMethods.clickCartButton();
        await cartPageMethods.verifyProductByName(productName);
        await cartPageMethods.clickCheckoutButton();
        await checkoutPageMethods.fillCheckoutForm(checkoutData.checkoutData.name, checkoutData.checkoutData.lastName, checkoutData.checkoutData.postalCode);
        await checkoutPageMethods.clickContinueButton();
        await overviewPageMethods.clickFinishButton();
        await overviewPageMethods.verifyFinalOrderLabel(finalOrderLabel);
    })
})