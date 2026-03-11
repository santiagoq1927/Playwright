import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Selectors
  readonly phonesLink = "text=Phones";
  readonly laptopsLink = "text=Laptops";
  readonly monitorsLink = "text=Monitors";
  readonly cartLink = "text=Cart";
  readonly productItem = '.card-block';
  readonly productName = '.card-block h4';
  readonly productPrice = '.card-block h5';
  readonly categoriesSection = '.list-group-item';

  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.navigate('/index.html');
    await this.waitForPageToLoad();
  }

  async clickPhonesCategory(): Promise<void> {
    await this.click(this.phonesLink);
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async clickLaptopsCategory(): Promise<void> {
    await this.click(this.laptopsLink);
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async clickMonitorsCategory(): Promise<void> {
    await this.click(this.monitorsLink);
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async clickCartLink(): Promise<void> {
    await this.click(this.cartLink);
    await this.waitForPageToLoad();
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productItem).count();
  }

  async getProductNameByIndex(index: number): Promise<string> {
    const products = await this.page.locator(this.productName).all();
    return await products[index].textContent() || '';
  }

  async clickProductByIndex(index: number): Promise<void> {
    const products = this.page.locator(this.productItem);
    const product = products.nth(index);
    const productLink = product.locator('a');
    await productLink.first().click();
    await this.waitForPageToLoad();
  }

  async assertHomePageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('STORE');
    await expect(this.page.locator('text=CATEGORIES')).toBeVisible();
    await expect(this.page.locator(this.phonesLink)).toBeVisible();
  }

  async assertCategoryDisplayed(categoryName: string): Promise<void> {
    const categoryLink = this.page.locator(`text=${categoryName}`);
    await expect(categoryLink).toBeVisible();
    // Wait for products to load
    await this.page.waitForSelector(this.productItem, { timeout: 5000 });
  }

  async assertProductsDisplayed(): Promise<void> {
    const products = await this.getProductCount();
    expect(products).toBeGreaterThan(0);
  }
}
