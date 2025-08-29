import { Locator, Page } from "@playwright/test";

export class ProductManagment{

    private readonly page:Page
    private readonly btnAddProductOne:Locator
    private readonly btnAddProductTwo:Locator
    private readonly btnAddProductThree:Locator
    private readonly btnViewCar:Locator

    private quantityProductOne:Locator
    private quantityProductTwo:Locator
    private quantityProductThree:Locator

    constructor(page:Page){
        this.page = page;
        this.btnAddProductOne = page.locator('//button[@class="btn btn-primary add-to-cart" and @data-id="1"]');
        this.btnAddProductTwo = page.locator('//button[@data-id="2"]');
        this.btnAddProductThree = page.locator('//button[@data-id="3"]');
        this.btnViewCar = page.locator('//button[@id="view-cart-btn"]');
    }

    async selectAddProductOne(){
        await this.btnAddProductOne.click();
    }

    async selectAddProductTwo(){
        await this.btnAddProductTwo.click();
    }

    async selectAddProductThree(){
        await this.btnAddProductThree.click();
    }

    async selectViewCar(){
        await this.btnViewCar.click();
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