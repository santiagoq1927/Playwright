import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  // Selectors
  private readonly inventoryContainer = '.inventory_container';
  private readonly inventoryItems = '.inventory_item';
  private readonly addToCartButton = 'button[data-test*="add-to-cart"]';
  private readonly removeButton = 'button[data-test*="remove"]';
  private readonly itemName = '.inventory_item_name';
  private readonly itemPrice = '.inventory_item_price';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartLink = '.shopping_cart_link';
  private readonly sortDropdown = '[data-test="product_sort_container"]';
  private readonly appLogo = '.app_logo';

  constructor(page: Page) {
    super(page);
  }

  async isInventoryPageVisible(): Promise<boolean> {
    return await this.isVisible(this.inventoryContainer);
  }

  async getProductCount(): Promise<number> {
    const count = await this.page.locator(this.inventoryItems).count();
    return count;
  }

  async getProductNameByIndex(index: number): Promise<string> {
    return await this.page
      .locator(this.inventoryItems)
      .nth(index)
      .locator(this.itemName)
      .innerText();
  }

  async getProductPriceByIndex(index: number): Promise<string> {
    return await this.page
      .locator(this.inventoryItems)
      .nth(index)
      .locator(this.itemPrice)
      .innerText();
  }

  async addProductToCart(productIndex: number) {
    const addButton = this.page
      .locator(this.inventoryItems)
      .nth(productIndex)
      .locator(this.addToCartButton);
    await addButton.click();
  }

  async addProductToCartByName(productName: string) {
    const product = this.page.locator(this.inventoryItems).filter({ 
      hasText: productName 
    });
    await product.locator(this.addToCartButton).click();
  }

  async removeProductFromCart(productIndex: number) {
    const removeBtn = this.page
      .locator(this.inventoryItems)
      .nth(productIndex)
      .locator(this.removeButton);
    await removeBtn.click();
  }

  async getCartBadgeCount(): Promise<string | null> {
    const badge = await this.getAttributeValue(this.cartBadge, 'getAttribute');
    return await this.getText(this.cartBadge);
  }

  async clickCart() {
    await this.click(this.cartLink);
    await this.waitForPageLoad();
  }

  async sortBy(sortOption: string) {
    await this.selectOption(this.sortDropdown, sortOption);
    await this.waitForPageLoad();
  }

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page
      .locator(this.inventoryItems)
      .filter({ hasText: productName })
      .isVisible();
  }
}
