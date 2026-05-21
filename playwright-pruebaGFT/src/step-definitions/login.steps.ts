import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../world/custom-world';
import LoginPage from '../pages/LoginPage'

Given('a user is on login SauceDemo website', async function (this: CustomWorld) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

When('enter credentials {string} and {string}', async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
});

Then('display the product homepage', async function (this: CustomWorld) {
  await this.loginPage.expectProductsVisible();
});

Then('display error {string}', async function (this: CustomWorld,message: string) {
    await this.loginPage.expectErrorMessage(message);
});