import test from "@playwright/test";
import { NavigateTo } from "../../pegaobjects/navigate/NavigateTo";
import { LoginPage } from "../../pegaobjects/login/LoginPage";
import { InitialPage } from "../../pegaobjects/initialPage/InitialPage";

test('validateProducts',async({page})=>{

    const navigateTo = new NavigateTo(page)
    const loginPage = new LoginPage(page)
    const initialPage = new InitialPage(page)

    const user = 'standard_user'
    const password = 'secret_sauce'

    await navigateTo.loginPage()
    await loginPage.doLogin(user,password)

    const nameProductOne = await initialPage.textNameProductProductOne()
    const descriptionProductOne = await initialPage.textDescriptionProductOne()
    const priceProductOne = await initialPage.textPriceProductOne()
 
    console.log('name product: ', nameProductOne)
    console.log('description product: ', descriptionProductOne)
    console.log('price product: ', priceProductOne)

    await page.pause()

});