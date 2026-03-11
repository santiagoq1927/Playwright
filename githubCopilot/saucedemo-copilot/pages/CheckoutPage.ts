import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = '#continue';
  private finishButton = '#finish';

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
  }
}
