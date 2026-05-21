import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  // Selectors
  private readonly cartContainer = '.cart_list';
  private readonly cartItems = '.cart_item';
  private readonly cartItemName = '.inventory_item_name';
  private readonly cartItemPrice = '.inventory_item_price';
  private readonly removeButton = 'button[data-test*="remove"]';
  private readonly continueShoppingButton = '[data-test="continue-shopping"]';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly emptyCartMessage = '.empty_message';

  constructor(page: Page) {
    super(page);
  }

  async isCartPageVisible(): Promise<boolean> {
    return await this.isVisible(this.cartContainer);
  }

  async getCartItemCount(): Promise<number> {
    const count = await this.page.locator(this.cartItems).count();
    return count;
  }

  async getCartItemNameByIndex(index: number): Promise<string> {
    return await this.page
      .locator(this.cartItems)
      .nth(index)
      .locator(this.cartItemName)
      .innerText();
  }

  async getCartItemPriceByIndex(index: number): Promise<string> {
    return await this.page
      .locator(this.cartItems)
      .nth(index)
      .locator(this.cartItemPrice)
      .innerText();
  }

  async removeItemFromCart(index: number) {
    const removeBtn = this.page
      .locator(this.cartItems)
      .nth(index)
      .locator(this.removeButton);
    await removeBtn.click();
  }

  async removeItemFromCartByName(itemName: string) {
    const item = this.page.locator(this.cartItems).filter({ 
      hasText: itemName 
    });
    await item.locator(this.removeButton).click();
  }

  async clickContinueShopping() {
    await this.click(this.continueShoppingButton);
    await this.waitForPageLoad();
  }

  async clickCheckout() {
    await this.click(this.checkoutButton);
    await this.waitForPageLoad();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.isVisible(this.emptyCartMessage);
  }

  async getAllCartItemNames(): Promise<string[]> {
    const items = this.page.locator(this.cartItems);
    const count = await items.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await items.nth(i).locator(this.cartItemName).innerText();
      names.push(name);
    }
    
    return names;
  }

  async getAllCartItemPrices(): Promise<string[]> {
    const items = this.page.locator(this.cartItems);
    const count = await items.count();
    const prices: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const price = await items.nth(i).locator(this.cartItemPrice).innerText();
      prices.push(price);
    }
    
    return prices;
  }
}
