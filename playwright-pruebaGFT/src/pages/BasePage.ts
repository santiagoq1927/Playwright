import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';

export default class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async fill(locator: Locator, value: string) {
        await expect(locator).toBeVisible();
        await locator.fill(value);
    }

    async click(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.click();
    }

    async getText(locator: Locator): Promise<string> {
        await expect(locator).toBeVisible();
        return (await locator.textContent())?.trim() ?? '';
    }


    async waitForVisible(locator: Locator, timeout = 5000) {
        await expect(locator).toBeVisible({timeout});
    }

    async waitForToHaveText(locator: Locator, text:string, timeout = 5000) {
        await expect(locator).toHaveText(text,{timeout});
    }
}