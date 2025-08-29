import { Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage{

    private readonly page:Page
    private readonly btnFinish:Locator
    private readonly txtNameProduct:Locator
    private readonly txtPriceItemProduct: Locator

    constructor(page:Page){
        this.page=page
        this.btnFinish = page.locator('//button[@id="finish"]')
        this.txtNameProduct = page.locator('//div[@data-test="inventory-item-name"]')
        this.txtPriceItemProduct = page.locator('//div[@data-test="subtotal-label"]')
    }

    async selectFinish(){
        await this.btnFinish.click()
    }

    async textNameProduct(){
        const text = await this.txtNameProduct.textContent()
        return text
    }

    async textPriceProduct(){
        const text = await this.txtPriceItemProduct.textContent()
        return text
    }

}