import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = ''): Promise<void> {
    let url = '/index.html';
    if (path) {
      url = path;
    }
    await this.page.goto(url);
  }

  async waitForPageToLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForTimeout(1000);
    } catch (error) {
      console.log('Page load wait completed or timed out, continuing...');
    }
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async acceptAlert(): Promise<void> {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async getInputValue(selector: string): Promise<string> {
    return await this.page.inputValue(selector) || '';
  }
}
