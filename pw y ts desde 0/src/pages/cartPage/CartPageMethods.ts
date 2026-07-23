import { Page } from "@playwright/test";
import { CartPage } from "./CartPage"
import { Logger } from "../../../support/logger";
import { expect } from "@playwright/test";

export class CartPageMethods {
    private page:Page
    private cartPage: CartPage;

    constructor(page:Page){
        this.page = page; 
        this.cartPage = new CartPage(page);
    }

    async clickCheckoutButton() {
        await Logger.logStep('Clicking on checkout button');
        await this.cartPage.buttons.checkout.click();
    }

    async clickContinueShoppingButton() {
        await Logger.logStep('Clicking on continue shopping button');
        await this.cartPage.buttons.continueShopping.click();
    }

    async removeProductByName(productName: string) {
        await Logger.logStep(`Removing product: ${productName}`);
        await this.cartPage.removeProductByName(productName).click();
    }

    async removeProductByIndex(index: number) {
        await Logger.logStep(`Removing product at index: ${index}`);
        await this.cartPage.buttons.remove.nth(index).click();
    }

    async selectProductByName(productName: string) {
        await Logger.logStep(`Selecting product: ${productName}`);
        await this.cartPage.cartItemName(productName).click();
    }

    async verifyProductByName(productName: string) {
        await Logger.logStep(`Verifying product: ${productName}`);
        const productCount = await this.cartPage.cartItemName(productName).count();
        expect(productCount).toBe(1);
    }

    async verifyProductRemove(productName: string) {
        await Logger.logStep(`Verifying product removal: ${productName}`);
        const productCount = await this.cartPage.cartItemName(productName).count();
        expect(productCount).toBe(0);
    }
}