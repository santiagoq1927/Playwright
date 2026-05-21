import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  // Selectors
  readonly categoryTitle = 'text=CATEGORIES';
  readonly phonesCategory = "text=Phones";
  readonly laptopsCategory = "text=Laptops";
  readonly monitorsCategory = "text=Monitors";
  readonly activeCategory = '.list-group-item.active';
  readonly productItem = '.card-block';
  readonly productName = '.card-block h4';
  readonly productPrice = '.card-block h5';

  constructor(page: Page) {
    super(page);
  }

  async selectPhones(): Promise<void> {
    await this.click(this.phonesCategory);
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async selectLaptops(): Promise<void> {
    await this.click(this.laptopsCategory);
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async selectMonitors(): Promise<void> {
    await this.click(this.monitorsCategory);
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async getProductsByCategory(categoryName: string): Promise<string[]> {
    const products: string[] = [];
    const productElements = await this.page.locator(this.productName).all();
    
    for (const element of productElements) {
      const text = await element.textContent();
      if (text) {
        products.push(text);
      }
    }
    return products;
  }

  async getProductCountInCategory(): Promise<number> {
    return await this.page.locator(this.productItem).count();
  }

  async clickProductInCategory(productName: string): Promise<void> {
    const productLink = this.page.locator(
      `.card-block:has(h4:has-text("${productName}")) a`
    );
    await productLink.first().click();
    await this.waitForPageToLoad();
  }

  async assertCategoryPageLoaded(): Promise<void> {
    await expect(this.page.locator(this.categoryTitle)).toBeVisible();
    await expect(this.page.locator(this.phonesCategory)).toBeVisible();
  }

  async assertProductsDisplayedInCategory(): Promise<void> {
    const count = await this.getProductCountInCategory();
    expect(count).toBeGreaterThan(0);
  }

  async assertActiveCategoryHighlighted(categoryName: string): Promise<void> {
    // Verify the category link is visible and products are displayed
    const categoryLink = this.page.locator(`text=${categoryName}`);
    await expect(categoryLink).toBeVisible();
    
    // Verify products are displayed for the category
    const productCount = await this.getProductCountInCategory();
    expect(productCount).toBeGreaterThan(0);
  }

  async assertProductsHavePrices(): Promise<void> {
    const priceElements = await this.page.locator(this.productPrice).all();
    expect(priceElements.length).toBeGreaterThan(0);
    
    for (const element of priceElements) {
      const text = await element.textContent();
      expect(text).toMatch(/\$\d+/);
    }
  }
}
