import { Locator, Page } from "@playwright/test";

export class HomeTransaction{

    private readonly page:Page
    private readonly btnAddTransaction:Locator
    private readonly inpDate:Locator
    private readonly inpAmount:Locator
    private readonly inpDescription:Locator
    private readonly btnSave:Locator

    private actualDateRow:Locator
    private actualAmountRow:Locator
    private actualDescriptionRow:Locator

    constructor(page:Page){
        this.page = page;
        this.btnAddTransaction = page.locator('//button[@data-target="#transactionModal"]');
        this.inpDate = page.locator('//input[@id="date"]');
        this.inpAmount = page.locator('//input[@id="amount"]');
        this.inpDescription = page.locator('//input[@id="description"]');
        this.btnSave = page.locator('//button[@type="submit"]');
    }

    async selectAddTransaction(){
        await this.btnAddTransaction.click();
    }

    async enterDate(date:string){
        await this.inpDate.fill(date);
    }

    async enterAmount(amount:string){
        await this.inpAmount.fill(amount);
    }

    async enterDescription(description:string){
        await this.inpDescription.fill(description);
    }

    async selectSaveTransaction(){
        await this.btnSave.click();
    }

    async addTrasaction(date:string,amount:string,descripcion:string){
        await this.enterDate(date);
        await this.enterAmount(amount);
        await this.enterDescription(descripcion);
        await this.selectSaveTransaction();
    }
    
    async textActualDate(row:string){
        this.actualDateRow = this.page.locator(`//tbody[@id="transactions-list"]//tr[${row}]//td[1]`);
        return await this.actualDateRow.textContent();
    }

    async textActualAmount(row:string){
        this.actualAmountRow = this.page.locator(`//tbody[@id="transactions-list"]//tr[${row}]//td[2]`);
        return await this.actualAmountRow.textContent();
    }

    async textActualDescription(row:string){
        this.actualDescriptionRow = this.page.locator(`//tbody[@id="transactions-list"]//tr[${row}]//td[3]`);
        return await this.actualDescriptionRow.textContent();
    }
}