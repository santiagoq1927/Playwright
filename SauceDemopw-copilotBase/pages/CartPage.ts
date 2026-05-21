import { Page, expect } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.locator('#cartur').click();
  }

  async verifyProductsInCart(expectedProducts: string[]) {
    await this.page.waitForSelector('#tbodyid tr');
    const rows = this.page.locator('#tbodyid tr');
    await expect(rows).toHaveCount(expectedProducts.length);
    for (const product of expectedProducts) {
      await expect(this.page.locator('#tbodyid')).toContainText(product);
    }
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
    await this.page.waitForSelector('#orderModal', { state: 'visible' });
  }

  async fillOrderForm(name: string, country: string, city: string, card: string, month: string, year: string) {
    await this.page.fill('#name', name);
    await this.page.fill('#country', country);
    await this.page.fill('#city', city);
    await this.page.fill('#card', card);
    await this.page.fill('#month', month);
    await this.page.fill('#year', year);
    await this.page.locator('#orderModal .btn-primary').click();
  }

  async verifyPurchaseSuccess() {
    await expect(this.page.locator('.sweet-alert')).toContainText('Thank you for your purchase!');
  }
}