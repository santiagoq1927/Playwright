import { Locator, Page } from "@playwright/test";

export class CartBuyPage{

    private readonly page:Page
    private readonly btnCheckout:Locator

    constructor(page:Page){
        this.page = page
        this.btnCheckout = page.locator('//button[@id="checkout"]')
    }

    async selectCheckOut(){
        await this.btnCheckout.click()
    }




}