import { Page } from "@playwright/test";
import { HeaderPage } from "./HeaderPage";
import { Logger } from "../../../support/logger";

export class HeaderPageMethods {
    private page:Page;
    private headerPage: HeaderPage;
    constructor(page:Page) {
        this.page = page;
        this.headerPage = new HeaderPage(page);
    }
    
    async clickMenuButton() {
        await Logger.logStep('Clicking menu button');
        await this.headerPage.buttons.menu.click();
    }

    async clickCartButton() {
        await Logger.logStep('Clicking cart button');
        await this.headerPage.buttons.cart.click();
    }   

    async clickAllItems() {
        await Logger.logStep('Clicking all items');
        await this.headerPage.leftMenuOptions.allItems.click();
    }

    async clickAbout() {
        await Logger.logStep('Clicking about');
        await this.headerPage.leftMenuOptions.about.click();
    }   

    async clickLogout() {
        await Logger.logStep('Clicking logout');
        await this.headerPage.leftMenuOptions.logout.click();
    }

    async clickResetAppState() {
        await Logger.logStep('Clicking reset app state');
        await this.headerPage.leftMenuOptions.resetAppState.click();
    }   

}