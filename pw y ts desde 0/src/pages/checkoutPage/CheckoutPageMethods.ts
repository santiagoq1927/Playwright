import { Page } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";
import { Logger } from "../../../support/logger";

export  class CheckoutPageMethods {
    private page: Page;
    private checkoutPage: CheckoutPage;
    constructor(page: Page) {
        this.page = page;
        this.checkoutPage = new CheckoutPage(page);
    }

    async fillFirstName(firstName: string) {
        await Logger.logStep(`Filling first name: ${firstName}`);
        await this.checkoutPage.inputs.firstName.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await Logger.logStep(`Filling last name: ${lastName}`);
        await this.checkoutPage.inputs.lastName.fill(lastName);
    }

    async fillPostalCode(postalCode: string) {
        await Logger.logStep(`Filling postal code: ${postalCode}`);
        await this.checkoutPage.inputs.postalCode.fill(postalCode);
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await Logger.logStep('Filling checkout form');
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
    }

    async clickContinueButton() {
        await Logger.logStep('Clicking continue button');
        await this.checkoutPage.buttons.continue.click();
    }

    async clickCancelButton() {
        await Logger.logStep('Clicking cancel button');
        await this.checkoutPage.buttons.cancel.click();
    }


}