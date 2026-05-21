import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = 'input[data-test="username"]';
  private readonly passwordInput = 'input[data-test="password"]';
  private readonly loginButton = 'input[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly loginContainer = '.login_container';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.goto();
    await this.waitForPageLoad();
  }

  async isLoginPageVisible(): Promise<boolean> {
    return await this.isVisible(this.loginContainer);
  }

  async enterUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForSelector(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}
