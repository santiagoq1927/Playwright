import { Locator, Page } from "@playwright/test";

export class CheckoutCompletePage{

    private readonly page:Page
    private readonly txtMessageFinal:Locator
    private readonly txtComplete:Locator
    private readonly txtNamePage:Locator

    constructor(page:Page){
        this.page = page
        this.txtMessageFinal = page.locator('//h2[@data-test="complete-header"]')
        this.txtComplete = page.locator('//span[@data-test="title"]')
        this.txtNamePage = page.locator('//div[@class="app_logo"]')
    }

    async textFinal(){
        const text = await this.txtMessageFinal.textContent()
        return text
    }

    async textComplete(){
        const text = await this.txtComplete.textContent()
        return text
    }

    async textNamePage(){
        const text = await this.txtNamePage.textContent()
        return text
    }
    
}