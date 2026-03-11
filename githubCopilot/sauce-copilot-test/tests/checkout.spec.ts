import { test, expect } from '../fixtures/test.fixture';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    // Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Add products to cart
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);

    // Navigate to cart
    await inventoryPage.clickCart();

    // Verify cart has items
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test('TC-201: Complete checkout flow successfully', async ({ cartPage, checkoutPage }) => {
    // Click checkout
    await cartPage.clickCheckout();

    // Verify checkout info page
    const isCheckoutInfoVisible = await checkoutPage.isCheckoutInfoPageVisible();
    expect(isCheckoutInfoVisible).toBe(true);

    // Fill checkout information
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');

    // Click continue
    await checkoutPage.clickContinue();

    // Verify checkout overview page
    const isOverviewVisible = await checkoutPage.isCheckoutOverviewPageVisible();
    expect(isOverviewVisible).toBe(true);

    // Verify items are displayed
    const itemCount = await checkoutPage.getOverviewItemCount();
    expect(itemCount).toBe(2);

    // Verify totals are displayed
    const subtotal = await checkoutPage.getSubtotal();
    expect(subtotal).not.toBeNull();
    expect(subtotal).toContain('Subtotal');

    const tax = await checkoutPage.getTax();
    expect(tax).not.toBeNull();
    expect(tax).toContain('Tax');

    const total = await checkoutPage.getTotal();
    expect(total).not.toBeNull();
    expect(total).toContain('Total');

    // Click finish
    await checkoutPage.clickFinish();

    // Verify order complete page
    const isCompleteVisible = await checkoutPage.isCheckoutCompletePageVisible();
    expect(isCompleteVisible).toBe(true);

    const header = await checkoutPage.getCompleteHeader();
    expect(header).toContain('Thank you');
  });

  test('TC-202: Checkout fails with missing first name', async ({ cartPage, checkoutPage }) => {
    // Click checkout
    await cartPage.clickCheckout();

    // Fill info without first name
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');

    // Try to continue
    await checkoutPage.clickContinue();

    // Verify error message
    const hasError = await checkoutPage.isErrorMessageVisible();
    expect(hasError).toBe(true);

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('First Name is required');
  });

  test('TC-203: Checkout fails with missing last name', async ({ cartPage, checkoutPage }) => {
    // Click checkout
    await cartPage.clickCheckout();

    // Fill info without last name
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterPostalCode('12345');

    // Try to continue
    await checkoutPage.clickContinue();

    // Verify error message
    const hasError = await checkoutPage.isErrorMessageVisible();
    expect(hasError).toBe(true);

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Last Name is required');
  });

  test('TC-204: Checkout fails with missing postal code', async ({ cartPage, checkoutPage }) => {
    // Click checkout
    await cartPage.clickCheckout();

    // Fill info without postal code
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');

    // Try to continue
    await checkoutPage.clickContinue();

    // Verify error message
    const hasError = await checkoutPage.isErrorMessageVisible();
    expect(hasError).toBe(true);

    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Postal Code is required');
  });

  test('TC-205: Cancel checkout returns to cart', async ({ cartPage, checkoutPage }) => {
    // Click checkout
    await cartPage.clickCheckout();

    // Verify checkout info page
    const isCheckoutInfoVisible = await checkoutPage.isCheckoutInfoPageVisible();
    expect(isCheckoutInfoVisible).toBe(true);

    // Click cancel
    await checkoutPage.clickCancel();

    // Verify back on cart page
    const isCartVisible = await cartPage.isCartPageVisible();
    expect(isCartVisible).toBe(true);

    // Verify cart still has items
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
  });

  test('TC-206: Order complete page shows success message', async ({ cartPage, checkoutPage }) => {
    // Complete full checkout
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Verify complete page
    const isCompleteVisible = await checkoutPage.isCheckoutCompletePageVisible();
    expect(isCompleteVisible).toBe(true);

    // Verify success elements
    const header = await checkoutPage.getCompleteHeader();
    expect(header).toContain('Thank you');

    const completeText = await checkoutPage.getCompleteText();
    expect(completeText).toContain('Your order');
  });

  test('TC-207: Back to home from order complete', async ({ cartPage, checkoutPage, inventoryPage }) => {
    // Complete checkout
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('Bob', 'Builder', '99999');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Click back to home
    await checkoutPage.clickBackHome();

    // Verify we're back on inventory page
    const isInventoryVisible = await inventoryPage.isInventoryPageVisible();
    expect(isInventoryVisible).toBe(true);
  });

  test('TC-208: Verify order summary before completion', async ({ cartPage, checkoutPage }) => {
    // Click checkout and fill info
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('Alice', 'Wonder', '11111');
    await checkoutPage.clickContinue();

    // Verify correct number of items in overview
    const itemCount = await checkoutPage.getOverviewItemCount();
    expect(itemCount).toBe(2);

    // Verify all totals are present and not empty
    const subtotal = await checkoutPage.getSubtotal();
    expect(subtotal).not.toBe('');

    const tax = await checkoutPage.getTax();
    expect(tax).not.toBe('');

    const total = await checkoutPage.getTotal();
    expect(total).not.toBe('');
  });
});
