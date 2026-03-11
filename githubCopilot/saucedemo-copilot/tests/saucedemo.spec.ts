import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  { username: 'error_user', password: 'secret_sauce' },
  { username: 'visual_user', password: 'secret_sauce' }
];

users.forEach(({ username, password }) => {
  test(`complete purchase flow with ${username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await loginPage.login(username, password);

    // Add multiple products to cart
    await homePage.addItemToCart(1);
    await homePage.addItemToCart(2);

    await homePage.goToCart();

    // Verify items in cart
    await expect(page.locator('.cart_item')).toHaveCount(2);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.finishCheckout();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
