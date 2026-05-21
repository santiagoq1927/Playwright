import { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async selectCategory(category: 'phones' | 'laptops' | 'monitors') {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    await this.page.getByRole('link', { name: categoryName }).click();
  }

  async selectProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).click();
  }

  async goToHome() {
    await this.page.getByRole('link', { name: 'Home' }).click();
  }
}