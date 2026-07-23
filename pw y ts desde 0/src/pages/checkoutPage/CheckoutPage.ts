import { Page } from "@playwright/test";

export class CheckoutPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get inputs() {
        return {
            firstName: this.page.locator('#first-name'),
            lastName: this.page.locator('#last-name'),
            postalCode: this.page.locator('#postal-code')
        }
    }

    get buttons() {
        return {
            continue: this.page.locator('#continue'),
            cancel: this.page.locator('#cancel')
        }
    }
}