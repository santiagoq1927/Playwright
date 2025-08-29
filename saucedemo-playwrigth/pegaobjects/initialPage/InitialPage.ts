import { Locator, Page } from "@playwright/test";

export class InitialPage{

    private readonly page:Page
    private readonly txtNameProductOne:Locator
    private readonly txtDescriptionProductOne:Locator
    private readonly txtPriceProductOne:Locator
    private readonly selProductOne:Locator
    private readonly btnCart:Locator

    constructor(page:Page){
        this.page=page
        this.txtNameProductOne = page.locator('//div[@data-test="inventory-item"][1]//div[@data-test="inventory-item-name"]')
        this.txtDescriptionProductOne = page.locator('//div[@data-test="inventory-item"][1]//div[@data-test="inventory-item-desc"]')
        this.txtPriceProductOne = page.locator('//div[@data-test="inventory-item"][1]//div[@data-test="inventory-item-price"]')
        this.selProductOne = page.locator('//a[@id="item_4_title_link"]')
        this.btnCart = page.locator('//a[@data-test="shopping-cart-link"]')
    }

    async textNameProductProductOne(){
        const name = await this.txtNameProductOne.textContent()
        return name
    }

    async textDescriptionProductOne(){
        const description = await this.txtDescriptionProductOne.textContent()
        return description
    }

    async textPriceProductOne(){
        const price = await this.txtPriceProductOne.textContent()
        return price
    }

    async selectProctOne(){
        await this.selProductOne.click()
    }

    async selectCart(){
        await this.btnCart.click()
    }

}