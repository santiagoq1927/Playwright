import { Page } from "@playwright/test";

export class ProductsPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;   
    }

    addCartByName(productName: string) {
        return this.page.locator(`//div[.="${productName}"]//ancestor::div[@class="inventory_item"]//button`);
    }

    get buttons() {
        return {
            addToCart: this.page.locator('.btn_inventory')
        }
    }

    get labels() {
        return {
            lblProduct: this.page.locator('.title')
        }
    }
}