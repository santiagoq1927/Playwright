import { Page } from '@playwright/test';

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.getByRole('link', { name: 'Add to cart' }).click()
    ]);
    await dialog.accept();
  }

  async goToHome() {
    await this.page.getByRole('link', { name: 'Home' }).click();
  }
}