import { Locator, Page } from "@playwright/test";

export class SummaryShop{

    private readonly page:Page
    private lblPaymentValidation:Locator

    constructor(page:Page){
        this.page = page;
    }

    async textPaymentConfirmation(){
        this.lblPaymentValidation = this.page.locator('//h4[contains(text(),"¡Tu compra fue exitosa!")]');
        return await this.lblPaymentValidation.textContent();
    }
}