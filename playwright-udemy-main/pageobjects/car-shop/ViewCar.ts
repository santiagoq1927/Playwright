import { Locator, Page } from "@playwright/test";

export class ViewCar{

    private readonly page:Page
    private readonly btnCheckOut:Locator

    private quantityProductOne:Locator
    private quantityProductTwo:Locator
    private quantityProductThree:Locator

    constructor(page:Page){
        this.page = page;
        this.btnCheckOut = page.locator('//button[@id="checkout-btn"]');
    }

    async selectCheckOut(){
        await this.btnCheckOut.click();
    }

    async textQuantityProductOne(){
        this.quantityProductOne = this.page.locator('//td[contains(text(),"Producto 1")]/ancestor::tr//td[3]');
        return await this.quantityProductOne.textContent();
    }

    async textQuantityProductTwo(){
        this.quantityProductTwo = this.page.locator('//td[contains(text(),"Producto 2")]/ancestor::tr//td[3]');
        return await this.quantityProductTwo.textContent();
    }

    async textQuantityProductThree(){
        this.quantityProductThree = this.page.locator('//td[contains(text(),"Producto 3")]/ancestor::tr//td[3]');
        return await this.quantityProductThree.textContent();
    }
}