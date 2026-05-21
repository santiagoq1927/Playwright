import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('DemoBlaze automation: add two products to cart and complete purchase', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Navigate to home
  await homePage.goto();

  // Add phone to cart
  await homePage.selectCategory('phones');
  await homePage.selectProduct('Samsung galaxy s6');
  await productPage.addToCart();
  await productPage.goToHome();

  // Add laptop to cart
  await homePage.selectCategory('laptops');
  await homePage.selectProduct('Sony vaio i5');
  await productPage.addToCart();

  // Go to cart
  await cartPage.goto();

  // Verify products in cart
  const expectedProducts = ['Samsung galaxy s6', 'Sony vaio i5'];
  await cartPage.verifyProductsInCart(expectedProducts);

  // Complete purchase
  await cartPage.placeOrder();
  await cartPage.fillOrderForm('John Doe', 'USA', 'New York', '1234567890123456', '12', '2025');
  await cartPage.verifyPurchaseSuccess();
});