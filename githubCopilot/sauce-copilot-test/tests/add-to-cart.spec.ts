import { test, expect } from '../fixtures/test.fixture';

test.describe('Add to Cart Flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    // Login before each test
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify we're on inventory page
    const isInventoryVisible = await inventoryPage.isInventoryPageVisible();
    expect(isInventoryVisible).toBe(true);
  });

  test('TC-101: Add single product to cart', async ({ inventoryPage, cartPage }) => {
    // Get product details before adding
    const productName = await inventoryPage.getProductNameByIndex(0);
    const productPrice = await inventoryPage.getProductPriceByIndex(0);

    // Add first product to cart
    await inventoryPage.addProductToCart(0);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Verify product is in cart
    const isCartVisible = await cartPage.isCartPageVisible();
    expect(isCartVisible).toBe(true);

    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    const cartItemName = await cartPage.getCartItemNameByIndex(0);
    expect(cartItemName).toBe(productName);

    const cartItemPrice = await cartPage.getCartItemPriceByIndex(0);
    expect(cartItemPrice).toBe(productPrice);
  });

  test('TC-102: Add multiple products to cart', async ({ inventoryPage, cartPage }) => {
    // Add first three products to cart
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);
    await inventoryPage.addProductToCart(2);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Verify all products are in cart
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);
  });

  test('TC-103: Add product by name to cart', async ({ inventoryPage, cartPage }) => {
    const productName = 'Sauce Labs Backpack';

    // Add product by name
    await inventoryPage.addProductToCartByName(productName);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Verify product is in cart
    const cartItemNames = await cartPage.getAllCartItemNames();
    expect(cartItemNames).toContain(productName);
  });

  test('TC-104: Remove product from cart on inventory page', async ({ inventoryPage, cartPage }) => {
    // Add product to cart
    await inventoryPage.addProductToCart(0);

    // Remove it
    await inventoryPage.removeProductFromCart(0);

    // Navigate to cart and verify it's empty
    await inventoryPage.clickCart();

    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('TC-105: Remove product from cart on cart page', async ({ inventoryPage, cartPage }) => {
    const productName1 = await inventoryPage.getProductNameByIndex(0);
    const productName2 = await inventoryPage.getProductNameByIndex(1);

    // Add two products
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Remove first product
    await cartPage.removeItemFromCart(0);

    // Verify only second product remains
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    const remainingItem = await cartPage.getCartItemNameByIndex(0);
    expect(remainingItem).toBe(productName2);
  });

  test('TC-106: Continue shopping returns to inventory', async ({ inventoryPage, cartPage }) => {
    // Add product to cart
    await inventoryPage.addProductToCart(0);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Click continue shopping
    await cartPage.clickContinueShopping();

    // Verify we're back on inventory page
    const isInventoryVisible = await inventoryPage.isInventoryPageVisible();
    expect(isInventoryVisible).toBe(true);
  });

  test('TC-107: Verify cart badge shows correct count', async ({ page, inventoryPage }) => {
    // Add multiple products
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);
    await inventoryPage.addProductToCart(2);

    // Check cart badge - it should show "3"
    const badgeText = await page.locator('.shopping_cart_badge').innerText();
    expect(badgeText).toBe('3');
  });

  test('TC-108: Add same product multiple times', async ({ inventoryPage, cartPage }) => {
    const productName = await inventoryPage.getProductNameByIndex(0);

    // Add first product twice (from inventory page)
    await inventoryPage.addProductToCart(0);

    // Remove the add button was replaced with remove button, so we need to reload or add from different state
    // Go back and add again
    await inventoryPage.addProductToCart(0);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Verify both items are in cart (they should be listed separately)
    const cartItemNames = await cartPage.getAllCartItemNames();
    const productCount = cartItemNames.filter(name => name === productName).length;
    expect(productCount).toBe(2);
  });
});
