import { Page } from "@playwright/test";

export class CartPage {
    private page:Page
    constructor(page:Page){
        this.page = page; 
    }

    get buttons() {
        return {
            checkout: this.page.locator('#checkout'),
            continueShopping: this.page.locator('#continue-shopping'), 
            remove: this.page.locator('.cart_button')
        }
    }

    cartItemName(productName: string) {
        return this.page.locator(`.cart_item:has-text("${productName}")`);
    }

    removeProductByName(productName: string) {
        //return this.page.locator(`.cart_item:has-text("${productName}") .cart_button`);
        return this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="cart_item_label"]//button`);
    }
}