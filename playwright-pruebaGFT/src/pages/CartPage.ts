import { Locator, Page } from "playwright";
import BasePage from "./BasePage";

export default class CartPage extends BasePage{

    private btnCheckout: Locator;
    
    constructor(page:Page){
        super(page);
        this.btnCheckout=page.locator("#checkout");
    }

    async selectCheckout(){
        await this.click(this.btnCheckout);
    }
}