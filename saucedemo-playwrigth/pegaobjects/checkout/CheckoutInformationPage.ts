import { Locator, Page } from "@playwright/test";

export class CheckoutInformationPage{

    private readonly page:Page
    private readonly inpFirstName:Locator
    private readonly inpLastName:Locator
    private readonly inpPostalCode:Locator
    private readonly btnContinue:Locator

    constructor(page:Page){
        this.page = page
        this.inpFirstName = page.locator('//input[@id="first-name"]')
        this.inpLastName = page.locator('//input[@id="last-name"]')
        this.inpPostalCode = page.locator('//input[@id="postal-code"]')
        this.btnContinue = page.locator('//input[@id="continue"]')
    }

    async enterFirsName(firstname:string){
        await this.inpFirstName.fill(firstname)
    }

    async enterLastName(lastname:string){
        await this.inpLastName.fill(lastname)
    }

    async enterPostalCode(postalcode:string){
        await this.inpPostalCode.fill(postalcode)
    }

    async selectContinue(){
        await this.btnContinue.click()
    }

    async enterInformation(firstname:string,lastname:string,postalcode:string){
        await this.enterFirsName(firstname)
        await this.enterLastName(lastname)
        await this.enterPostalCode(postalcode)
        await this.selectContinue()
    }
}