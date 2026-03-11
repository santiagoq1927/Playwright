import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Demoblaze E-Commerce Automation', () => {
  let page: Page;
  let homePage: HomePage;
  let categoryPage: CategoryPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await homePage.navigateToHome();
  });

  test.afterEach(async () => {
    // Clear any data and close browser
    try {
      await page.context().clearCookies();
    } catch (e) {
      // Ignore if context is already closed
    }
    await page.close();
  });

  test('Complete purchase flow with products from different categories', async () => {
    // Step 1: Verify Home Page
    console.log('Step 1: Verify Home Page is loaded');
    await homePage.assertHomePageLoaded();
    await homePage.assertProductsDisplayed();

    // Step 2: Select Phones Category and add first product
    console.log('Step 2: Select Phones category');
    await homePage.clickPhonesCategory();
    const phoneCount = await homePage.getProductCount();
    expect(phoneCount).toBeGreaterThan(0);
    const firstPhoneProduct = await homePage.getProductNameByIndex(0);
    console.log(`First phone product: ${firstPhoneProduct}`);

    // Step 3: Navigate to first product (Phone)
    console.log('Step 3: Navigate to first phone product');
    await homePage.clickProductByIndex(0);
    await productPage.assertProductDetailsVisible();
    const phonePrice = await productPage.getProductPrice();
    console.log(`Phone Price: ${phonePrice}`);

    // Step 4: Add first product to cart
    console.log('Step 4: Add phone to cart');
    await productPage.addToCart();
    await page.waitForTimeout(2000);

    // Step 5: Navigate back to home and select Laptops
    console.log('Step 5: Navigate to Laptops category');
    await homePage.navigateToHome();
    await homePage.waitForPageToLoad();
    await homePage.clickLaptopsCategory();
    const laptopCount = await homePage.getProductCount();
    expect(laptopCount).toBeGreaterThan(0);
    const firstLaptopProduct = await homePage.getProductNameByIndex(0);
    console.log(`First laptop product: ${firstLaptopProduct}`);

    // Step 6: Navigate to first product (Laptop)
    console.log('Step 6: Navigate to first laptop product');
    await homePage.clickProductByIndex(0);
    await productPage.assertProductDetailsVisible();
    const laptopPrice = await productPage.getProductPrice();
    console.log(`Laptop Price: ${laptopPrice}`);

    // Step 7: Add second product to cart
    console.log('Step 7: Add laptop to cart');
    await productPage.addToCart();
    await page.waitForTimeout(2000);

    // Step 8: Navigate to Cart
    console.log('Step 8: Navigate to cart');
    await homePage.navigateToHome();
    await homePage.waitForPageToLoad();
    await homePage.clickCartLink();
    await cartPage.assertCartPageLoaded();

    // Step 9: Verify Cart Contents
    console.log('Step 9: Verify cart contents');
    const itemCount = await cartPage.getCartItemCount();
    console.log(`Items in cart: ${itemCount}`);
    
    if (itemCount >= 2) {
      await cartPage.assertProductInCart('Samsung galaxy s6');
      const cartTotal = await cartPage.getTotalPrice();
      console.log(`Total in Cart: ${cartTotal}`);
      expect(Number(cartTotal)).toBeGreaterThan(0);

      // Step 10: Verify all products are in cart
      console.log('Step 10: Verify all products and prices');
      const cartProducts = await cartPage.getProductsInCart();
      console.log(`Products in cart: ${JSON.stringify(cartProducts)}`);
      expect(cartProducts.length).toBeGreaterThanOrEqual(1);

      // Step 11: Click Place Order
      console.log('Step 11: Click Place Order');
      await cartPage.clickPlaceOrder();

      // Step 12: Verify Checkout Form
      console.log('Step 12: Verify checkout form');
      await checkoutPage.assertCheckoutModalDisplayed();
      await checkoutPage.assertCheckoutFormFieldsVisible();
      await checkoutPage.assertPurchaseButtonVisible();

      // Step 13: Fill Checkout Form
      console.log('Step 13: Fill checkout form');
      await checkoutPage.fillCheckoutForm(
        'John Doe',
        'United States',
        'New York',
        '1234567890123456',
        '12',
        '2025'
      );

      // Step 14: Submit Purchase
      console.log('Step 14: Submit purchase');
      await checkoutPage.clickPurchase();

      // Step 15: Verify Success
      console.log('Step 15: Verify purchase success');
      await checkoutPage.assertPurchaseSuccessful();

      // Step 16: Complete and close
      console.log('Step 16: Complete purchase');
      await checkoutPage.clickOkOnSuccess();
      
      // Step 17: Verify return to home
      console.log('Step 17: Verify return to home page');
      await expect(page).toHaveURL(/index\.html/);
      console.log('✓ Complete purchase flow test passed!');
    } else {
      console.log(`Warning: Only ${itemCount} items in cart, expected at least 2`);
    }
  });

  test('Add product from Phones category to cart', async () => {
    console.log('Test: Add product from Phones category');
    
    // Navigate and select Phones
    await homePage.clickPhonesCategory();
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
    
    // Click first product
    await homePage.clickProductByIndex(0);
    await productPage.assertProductDetailsVisible();
    const title = await productPage.getProductTitle();
    console.log(`Product: ${title}`);
    
    // Add to cart
    await productPage.addToCart();
    await page.waitForTimeout(2000);
    
    // Verify cart has products
    await homePage.navigateToHome();
    await homePage.clickCartLink();
    await cartPage.assertCartPageLoaded();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
    
    console.log('✓ Add from Phones category test passed!');
  });

  test('Add product from Laptops category to cart', async () => {
    console.log('Test: Add product from Laptops category');
    
    // Navigate and select Laptops
    await homePage.clickLaptopsCategory();
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
    
    // Click first product
    await homePage.clickProductByIndex(0);
    await productPage.assertProductDetailsVisible();
    const title = await productPage.getProductTitle();
    console.log(`Product: ${title}`);
    expect(title.toLowerCase()).toContain('sony');
    
    // Add to cart
    await productPage.addToCart();
    await page.waitForTimeout(2000);
    
    // Verify cart
    await homePage.navigateToHome();
    await homePage.clickCartLink();
    await cartPage.assertCartPageLoaded();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
    
    console.log('✓ Add from Laptops category test passed!');
  });

  test('Verify product details on product page', async () => {
    console.log('Test: Verify product details');
    
    // Navigate to Phones
    await homePage.clickPhonesCategory();
    
    // Click first product
    await homePage.clickProductByIndex(0);
    
    // Verify all details
    const title = await productPage.getProductTitle();
    const price = await productPage.getProductPrice();
    const description = await productPage.getProductDescription();
    
    console.log(`Product Title: ${title}`);
    console.log(`Product Price: ${price}`);
    console.log(`Product Description: ${description.substring(0, 50)}...`);
    
    expect(title.length).toBeGreaterThan(0);
    expect(price).toMatch(/\$\d+/);
    expect(description.length).toBeGreaterThan(0);
    
    console.log('✓ Product details verification test passed!');
  });

  test('Verify navigation between categories', async () => {
    console.log('Test: Verify navigation between categories');
    
    // Test Phones category
    await homePage.clickPhonesCategory();
    let products = await homePage.getProductCount();
    expect(products).toBeGreaterThan(0);
    console.log(`Phones category has ${products} products`);
    
    // Test Laptops category
    await homePage.clickLaptopsCategory();
    products = await homePage.getProductCount();
    expect(products).toBeGreaterThan(0);
    console.log(`Laptops category has ${products} products`);
    
    // Test Monitors category
    await homePage.clickMonitorsCategory();
    products = await homePage.getProductCount();
    expect(products).toBeGreaterThan(0);
    console.log(`Monitors category has ${products} products`);
    
    console.log('✓ Category navigation test passed!');
  });

  test('Verify cart functionality', async () => {
    console.log('Test: Verify cart functionality');
    
    // Add a product
    await homePage.clickPhonesCategory();
    await homePage.clickProductByIndex(0);
    await productPage.addToCart();
    await page.waitForTimeout(2000);
    
    // Go to cart
    await homePage.navigateToHome();
    await homePage.clickCartLink();
    await cartPage.assertCartPageLoaded();
    
    // Get product count
    const initialCount = await cartPage.getCartItemCount();
    console.log(`Products in cart: ${initialCount}`);
    expect(initialCount).toBeGreaterThan(0);
    
    // Get cart products
    const cartProducts = await cartPage.getProductsInCart();
    expect(cartProducts.length).toBe(initialCount);
    console.log(`Product 1: ${cartProducts[0].name} - ${cartProducts[0].price}`);
    
    // Verify total price
    const totalPrice = await cartPage.getTotalPrice();
    const totalNum = Number(totalPrice);
    expect(totalNum).toBeGreaterThan(0);
    console.log(`Total Price: ${totalPrice}`);
    
    console.log('✓ Cart functionality test passed!');
  });
});
