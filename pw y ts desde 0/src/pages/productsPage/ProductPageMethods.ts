import { Page } from "@playwright/test";
import { ProductsPage } from "./ProductsPage";
import { Logger } from "../../../support/logger";
import { expect } from "@playwright/test";

export class ProductsPageMethods {
    private page: Page;
    private productsPage: ProductsPage;
    constructor(page: Page) {
        this.page = page;
        this.productsPage = new ProductsPage(page);
    }
    
    async addToCartByName(productName: string) {
        await Logger.logStep(`Adding product to cart by name: ${productName}`);
        await this.productsPage.addCartByName(productName).click();
    }

    async addToCartByIndex(index: number) {
        await Logger.logStep(`Adding product to cart by index: ${index}`);
        await this.productsPage.buttons.addToCart.nth(index).click();
    }

    async verifyTitleLabel(title: string) {
        await Logger.logVerification(`Verifying product page title show`);
        const actualTitle = await this.productsPage.labels.lblProduct.textContent();
        expect(actualTitle).toBe(title);
    }

}