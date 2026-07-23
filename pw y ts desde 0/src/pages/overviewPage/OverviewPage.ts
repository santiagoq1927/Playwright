import { Page } from "@playwright/test";

export class OverviewPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;       
    }

    get buttons() {
        return {
            finish: this.page.locator('#finish'),
            cancel: this.page.locator('#cancel')
        }
    }

    get labels() {
        return {
            lblFinalOrder: this.page.locator('.complete-header')
        }
    }
}