import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Selectors
  readonly cartTitle = 'text=Products';
  readonly cartTable = 'table';
  readonly cartRow = 'tbody tr';
  readonly productNameInCart = 'tbody td:nth-child(2)';
  readonly productPriceInCart = 'tbody td:nth-child(3)';
  readonly deleteButton = "text=Delete";
  readonly totalPrice = 'text=Total';
  readonly totalAmount = 'h3';
  readonly placeOrderButton = "text=Place Order";
  readonly emptyCartMessage = 'text=No products in your cart';

  constructor(page: Page) {
    super(page);
  }

  async navigateToCart(): Promise<void> {
    await this.navigate('/cart.html');
    await this.waitForPageToLoad();
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator(this.cartRow).count();
  }

  async getProductsInCart(): Promise<Array<{name: string, price: string}>> {
    const products: Array<{name: string, price: string}> = [];
    const rows = await this.page.locator(this.cartRow).all();
    
    for (const row of rows) {
      const name = await row.locator('td:nth-child(2)').textContent() || '';
      const price = await row.locator('td:nth-child(3)').textContent() || '';
      products.push({name: name.trim(), price: price.trim()});
    }
    return products;
  }

  async getTotalPrice(): Promise<string> {
    const totalElement = await this.page.locator(this.totalAmount).last();
    return await totalElement.textContent() || '';
  }

  async deleteProductFromCart(productName: string): Promise<void> {
    const row = this.page.locator(`tbody tr:has(td:has-text("${productName}"))`);
    const deleteBtn = row.locator("text=Delete");
    await deleteBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async clickPlaceOrder(): Promise<void> {
    await this.click(this.placeOrderButton);
    await this.page.waitForSelector('[role="dialog"]', { timeout: 5000 });
  }

  async assertCartPageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('STORE');
    await expect(this.page.locator(this.cartTitle)).toBeVisible();
  }

  async assertProductsInCart(expectedCount: number): Promise<void> {
    const count = await this.getCartItemCount();
    expect(count).toBe(expectedCount);
  }

  async assertProductInCart(productName: string): Promise<void> {
    const productElement = this.page.locator(`tbody td:has-text("${productName}")`);
    await expect(productElement).toBeVisible();
  }

  async assertTotalPriceCalculatedCorrectly(expectedTotal: string): Promise<void> {
    const total = await this.getTotalPrice();
    expect(total).toContain(expectedTotal);
  }

  async assertPlaceOrderButtonVisible(): Promise<void> {
    await expect(this.page.locator(this.placeOrderButton)).toBeVisible();
  }

  async assertCartEmpty(): Promise<void> {
    const count = await this.getCartItemCount();
    expect(count).toBe(0);
  }
}
