import { Locator, Page } from "playwright";
import BasePage from "./BasePage";

export default class HomePage extends BasePage{

    private btnAddElement: Locator;
    private optShopCar: Locator;

    constructor(page:Page){
        super(page);
        this.btnAddElement=page.locator("#add-to-cart-sauce-labs-backpack");
        this.optShopCar=page.locator("#shopping_cart_container");
    }

    async selectElement(){
        await this.click(this.btnAddElement);
    }

    async selectShopCar(){
        await this.click(this.optShopCar);
    }

}