import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Selectors
  readonly checkoutModal = '[role="dialog"]';
  readonly totalLabel = 'text=Total:';
  readonly nameInput = 'input[placeholder="Name"]';
  readonly countryInput = 'input[placeholder="Country"]';
  readonly cityInput = 'input[placeholder="City"]';
  readonly creditCardInput = 'input[placeholder="Credit card"]';
  readonly monthInput = 'input[placeholder="Month"]';
  readonly yearInput = 'input[placeholder="Year"]';
  readonly purchaseButton = "text=Purchase";
  readonly closeButton = "text=Close";
  readonly successMessage = 'text=Thank you for your purchase!';
  readonly transactionId = 'text=Id:';
  readonly okButton = "text=OK";

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutForm(
    name: string,
    country: string,
    city: string,
    creditCard: string,
    month: string,
    year: string
  ): Promise<void> {
    await this.fill(this.nameInput, name);
    await this.fill(this.countryInput, country);
    await this.fill(this.cityInput, city);
    await this.fill(this.creditCardInput, creditCard);
    await this.fill(this.monthInput, month);
    await this.fill(this.yearInput, year);
  }

  async clickPurchase(): Promise<void> {
    await this.click(this.purchaseButton);
  }

  async fillAndCompletePurchase(
    name: string,
    country: string,
    city: string,
    creditCard: string,
    month: string,
    year: string
  ): Promise<void> {
    await this.fillCheckoutForm(name, country, city, creditCard, month, year);
    await this.clickPurchase();
    await this.page.waitForSelector(this.successMessage, { timeout: 5000 });
  }

  async clickOkOnSuccess(): Promise<void> {
    await this.click(this.okButton);
    await this.page.waitForTimeout(2000);
  }

  async getTransactionDetails(): Promise<string> {
    const transactionElement = await this.page.locator(this.transactionId).all();
    const details: string[] = [];
    
    for (const element of transactionElement) {
      const text = await element.textContent();
      if (text) {
        details.push(text);
      }
    }
    return details.join(' | ');
  }

  async assertCheckoutModalDisplayed(): Promise<void> {
    await expect(this.page.locator(this.checkoutModal)).toBeVisible();
    await expect(this.page.locator("text=Place order")).toBeVisible();
  }

  async assertCheckoutFormFieldsVisible(): Promise<void> {
    await expect(this.page.locator(this.nameInput)).toBeVisible();
    await expect(this.page.locator(this.countryInput)).toBeVisible();
    await expect(this.page.locator(this.cityInput)).toBeVisible();
    await expect(this.page.locator(this.creditCardInput)).toBeVisible();
    await expect(this.page.locator(this.monthInput)).toBeVisible();
    await expect(this.page.locator(this.yearInput)).toBeVisible();
  }

  async assertPurchaseButtonVisible(): Promise<void> {
    await expect(this.page.locator(this.purchaseButton)).toBeVisible();
  }

  async assertTotalDisplayed(expectedTotal: string): Promise<void> {
    const totalText = await this.page.locator(this.totalLabel).textContent();
    expect(totalText).toContain(expectedTotal);
  }

  async assertPurchaseSuccessful(): Promise<void> {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
    await expect(this.page.locator(this.transactionId)).toBeVisible();
  }

  async assertSuccessMessageContains(text: string): Promise<void> {
    const successElement = this.page.locator(this.successMessage);
    await expect(successElement).toContainText(text);
  }

  async assertOrderDetailsContainInfo(info: string): Promise<void> {
    const details = await this.getTransactionDetails();
    expect(details).toContain(info);
  }
}
