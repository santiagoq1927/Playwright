import test, { expect } from "@playwright/test";
import { NavigateTo } from "../../pegaobjects/navigate/NavigateTo";
import { LoginPage } from "../../pegaobjects/login/LoginPage";
import { InitialPage } from "../../pegaobjects/initialPage/InitialPage";
import { ProducPage } from "../../pegaobjects/product/ProductPage";
import { CartBuyPage } from "../../pegaobjects/cartbuy/CartBuyPage";
import { CheckoutInformationPage } from "../../pegaobjects/checkout/CheckoutInformationPage";
import {fa, faker} from '@faker-js/faker'
import { CheckoutOverviewPage } from "../../pegaobjects/checkout/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../../pegaobjects/checkout/CheckoutCompletePage";
import { exec } from "child_process";

test('buystore',async({page})=>{

    const navigateTo = new NavigateTo(page)
    const loginPage = new LoginPage(page)
    const initialPage = new InitialPage(page)
    const productPage = new ProducPage(page)
    const cartBuyPage = new CartBuyPage(page)
    const checkoutInformationPage = new CheckoutInformationPage(page)
    const checkoutOverviewPage = new CheckoutOverviewPage(page)
    const checkoutCompletePage = new CheckoutCompletePage(page)

    const user = 'standard_user'
    const password = 'secret_sauce'
    const postalcode = '190002'

    await navigateTo.loginPage()
    await loginPage.doLogin(user,password)
    await page.waitForTimeout(1000)

    const nameProductOne = await initialPage.textNameProductProductOne()
    const priceProductOne = await initialPage.textPriceProductOne()

    await initialPage.selectProctOne()

    await productPage.selectAddCartProduct()
    await initialPage.selectCart()

    await cartBuyPage.selectCheckOut()

    await checkoutInformationPage.enterInformation(faker.person.firstName(),faker.person.lastName(),postalcode)

    const nameProductOverview = await checkoutOverviewPage.textNameProduct()
    const priceProductOverview = await checkoutOverviewPage.textPriceProduct()

    await checkoutOverviewPage.selectFinish()

    expect(nameProductOne).toEqual(nameProductOverview)
    expect(priceProductOverview).toContain(priceProductOne)
    expect(await checkoutCompletePage.textFinal()).
    toEqual('Thank you for your order!')
    expect(await checkoutCompletePage.textComplete()).toEqual('Checkout: Complete!')
    expect(await checkoutCompletePage.textNamePage()).toEqual('Swag Labs')

    await page.waitForTimeout(2000)
    await page.pause()

});