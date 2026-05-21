import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/custom-world';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import CheckoutInfoPage from '../pages/CheckoutInfoPage';
import OverviewPage from '../pages/OverviewPage';
import CompletePage from '../pages/CompletePage';

Given('a user is on login successful SauceDemo website', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login("standard_user","secret_sauce")
});

Given('select a product select a product from the pull then select the shopping cart', async function (this: CustomWorld) {
  this.homePage = new HomePage(this.page);
  await this.homePage.selectElement();
  await this.homePage.selectShopCar();
});

When('select the checkout option', async function (this: CustomWorld) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.selectCheckout();
});

When('enter the information {string}, {string} and {string} then select continue', async function (this: CustomWorld, firstname: string,lastname: string,postalcode: string) {
  this.checkoutInfoPage = new CheckoutInfoPage(this.page);
  await this.checkoutInfoPage.enterInformationCheckout(firstname,lastname,postalcode);
});

Then('the order details are displayed then select finish', async function (this: CustomWorld) {
  this.overviewPage = new OverviewPage(this.page);
  await this.overviewPage.selectFinish();
});

Then('displays an order confirmation message', async function (this: CustomWorld) {
  const completePage = new CompletePage(this.page);
  await completePage.expectMessageCompleteVisible();
});