import { Locator, Page } from "playwright";
import {expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class CompletePage extends BasePage{
    private lblMessageOk: Locator;
            
    constructor(page:Page){
        super(page);
        this.lblMessageOk=page.locator("//h2[@data-test='complete-header']");
    }

    async expectMessageCompleteVisible() {
        await this.waitForVisible(this.lblMessageOk);
    }
}