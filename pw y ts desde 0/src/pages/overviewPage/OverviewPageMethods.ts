import { expect, Page } from "@playwright/test";
import { OverviewPage } from "./OverviewPage";
import { Logger } from "../../../support/logger";

export  class OverviewPageMethods {
    private page: Page;
    private overviewPage: OverviewPage;

    constructor(page: Page) {
        this.page = page;
        this.overviewPage = new OverviewPage(page);
    }

    async clickFinishButton() {
        await Logger.logStep('Clicking finish button');
        await this.overviewPage.buttons.finish.click();
    }

    async clickCancelButton() {
        await Logger.logStep('Clicking cancel button');
        await this.overviewPage.buttons.cancel.click();
    }

    async verifyFinalOrderLabel(title: string) {
            await Logger.logVerification(`Verifying final order label`);
            const actualTitle = await this.overviewPage.labels.lblFinalOrder.textContent();
            expect(actualTitle).toBe(title);
        }
}