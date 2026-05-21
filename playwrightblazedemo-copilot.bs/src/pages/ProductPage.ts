import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Selectors
  readonly productTitle = 'h2';
  readonly productPrice = 'h3';
  readonly productDescription = '.description p';
  readonly addToCartButton = "text=Add to cart";
  readonly productImage = '.product-details img';

  constructor(page: Page) {
    super(page);
  }

  async navigateToProduct(productId: number): Promise<void> {
    await this.navigate(`/prod.html?idp_=${productId}`);
    await this.waitForPageToLoad();
  }

  async getProductTitle(): Promise<string> {
    return await this.getText(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async getProductDescription(): Promise<string> {
    return await this.getText(this.productDescription);
  }

  async addToCart(): Promise<void> {
    await this.acceptAlert();
    await this.click(this.addToCartButton);
    // Wait for dialog to appear
    await this.page.waitForFunction(() => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      return dialogs.length > 0;
    });
  }

  async assertProductPageLoaded(productName: string): Promise<void> {
    await expect(this.page).toHaveTitle('STORE');
    const title = await this.getProductTitle();
    expect(title.toLowerCase()).toContain(productName.toLowerCase());
  }

  async assertProductDetailsVisible(): Promise<void> {
    await expect(this.page.locator(this.productTitle)).toBeVisible();
    await expect(this.page.locator(this.productPrice)).toBeVisible();
    await expect(this.page.locator(this.productDescription)).toBeVisible();
  }

  async assertAddToCartButtonVisible(): Promise<void> {
    await expect(this.page.locator(this.addToCartButton)).toBeVisible();
  }

  async assertProductTitle(expectedTitle: string): Promise<void> {
    const title = await this.getProductTitle();
    expect(title.toLowerCase()).toContain(expectedTitle.toLowerCase());
  }

  async assertProductPrice(expectedPrice: string): Promise<void> {
    const price = await this.getProductPrice();
    expect(price).toContain(expectedPrice);
  }
}
