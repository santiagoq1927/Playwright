import { Locator, Page } from "@playwright/test";

export class SummaryRegister{

    private readonly page:Page

    private actualName:Locator
    private actualLastName:Locator
    private actualAge:Locator

    constructor(page:Page){
        this.page = page;        
    }

    
    async textActualName(){
        this.actualName = this.page.locator("//strong[contains(text(),'Nombre')]/ancestor::p");
        return await this.actualName.textContent();
    }

    async textActualLastaName(){
        this.actualLastName = this.page.locator('//strong[contains(text(),"Apellido")]/ancestor::p');
        return await this.actualLastName.textContent();
    }

    async textActualAge(){
        this.actualAge = this.page.locator('//strong[contains(text(),"Edad")]/ancestor::p');
        return await this.actualAge.textContent();
    }
}