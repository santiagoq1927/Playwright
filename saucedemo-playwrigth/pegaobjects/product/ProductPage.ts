import { Locator, Page } from "@playwright/test";

export class ProducPage{

    private readonly page:Page
    private readonly btnAddCart:Locator

    constructor(page:Page){
        this.page=page
        this.btnAddCart = page.locator('//button[@id="add-to-cart"]')
    }

    async selectAddCartProduct(){
        await this.btnAddCart.click()
    }
}