import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private cartLink = '.shopping_cart_link';

  constructor(page: Page) {
    super(page);
  }

  async addItemToCart(index: number = 1) {
    await this.page.click(`.inventory_item:nth-child(${index}) .btn_inventory`);
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }
}
