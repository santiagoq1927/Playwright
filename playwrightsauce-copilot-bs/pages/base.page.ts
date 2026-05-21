import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string = '') {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async type(selector: string, text: string) {
    await this.page.type(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.innerText(selector);
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async pressKey(key: string) {
    await this.page.press('body', key);
  }

  async getAttributeValue(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }
}
