import { test, expect } from '../fixtures/test.fixture';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-001: User should see login page', async ({ loginPage }) => {
    // Verify login page is visible
    const isLoginPageVisible = await loginPage.isLoginPageVisible();
    expect(isLoginPageVisible).toBe(true);
  });

  test('TC-002: Successful login with valid credentials', async ({ loginPage, inventoryPage }) => {
    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify navigation to inventory page
    const isInventoryVisible = await inventoryPage.isInventoryPageVisible();
    expect(isInventoryVisible).toBe(true);
  });

  test('TC-003: Login fails with invalid username', async ({ loginPage }) => {
    // Insert invalid username
    await loginPage.enterUsername('invalid_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();

    // Verify error message appears
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('do not match');
  });

  test('TC-004: Login fails with invalid password', async ({ loginPage }) => {
    // Insert invalid password
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('invalid_password');
    await loginPage.clickLoginButton();

    // Verify error message appears
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('do not match');
  });

  test('TC-005: Login fails with empty credentials', async ({ loginPage }) => {
    // Click login without entering credentials
    await loginPage.clickLoginButton();

    // Verify error message appears
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });

  test('TC-006: Locked out user cannot login', async ({ loginPage }) => {
    // Try login with locked out user
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Verify error message appears for locked out user
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  });
});
