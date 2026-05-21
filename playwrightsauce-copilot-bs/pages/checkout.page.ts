import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  // Checkout Information Selectors
  private readonly firstNameInput = 'input[data-test="firstName"]';
  private readonly lastNameInput = 'input[data-test="lastName"]';
  private readonly postalCodeInput = 'input[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly cancelButton = '[data-test="cancel"]';
  private readonly checkoutInfoContainer = '.checkout_info';

  // Checkout Overview Selectors
  private readonly checkoutSummaryContainer = '.checkout_summary_container';
  private readonly cartItems = '.cart_item';
  private readonly itemSubtotal = '.summary_subtotal_label';
  private readonly tax = '.summary_tax_label';
  private readonly total = '.summary_total_label';
  private readonly finishButton = '[data-test="finish"]';

  // Checkout Complete Selectors
  private readonly checkoutCompleteContainer = '.checkout_complete_container';
  private readonly completeHeader = '.complete-header';
  private readonly completeText = '.complete-text';
  private readonly backHomeButton = '[data-test="back-to-products"]';

  // Error Selectors
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  // Checkout Information Page Methods
  async isCheckoutInfoPageVisible(): Promise<boolean> {
    return await this.isVisible(this.checkoutInfoContainer);
  }

  async enterFirstName(firstName: string) {
    await this.fill(this.firstNameInput, firstName);
  }

  async enterLastName(lastName: string) {
    await this.fill(this.lastNameInput, lastName);
  }

  async enterPostalCode(postalCode: string) {
    await this.fill(this.postalCodeInput, postalCode);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  async clickContinue() {
    await this.click(this.continueButton);
    await this.waitForPageLoad();
  }

  async clickCancel() {
    await this.click(this.cancelButton);
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForSelector(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  // Checkout Overview Page Methods
  async isCheckoutOverviewPageVisible(): Promise<boolean> {
    return await this.isVisible(this.checkoutSummaryContainer);
  }

  async getOverviewItemCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }

  async getSubtotal(): Promise<string> {
    return await this.getText(this.itemSubtotal);
  }

  async getTax(): Promise<string> {
    return await this.getText(this.tax);
  }

  async getTotal(): Promise<string> {
    return await this.getText(this.total);
  }

  async clickFinish() {
    await this.click(this.finishButton);
    await this.waitForPageLoad();
  }

  // Checkout Complete Page Methods
  async isCheckoutCompletePageVisible(): Promise<boolean> {
    return await this.isVisible(this.checkoutCompleteContainer);
  }

  async getCompleteHeader(): Promise<string> {
    return await this.getText(this.completeHeader);
  }

  async getCompleteText(): Promise<string> {
    return await this.getText(this.completeText);
  }

  async clickBackHome() {
    await this.click(this.backHomeButton);
    await this.waitForPageLoad();
  }

  // Combined checkout flow
  async completeCheckout(firstName: string, lastName: string, postalCode: string) {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.clickContinue();
    await this.clickFinish();
  }
}
