# Playwright + TypeScript Page Object Model Automation Framework

A comprehensive automation framework for testing the SauceDemo e-commerce website using Playwright with TypeScript and the Page Object Model (POM) design pattern.

## 📦 Project Structure

```
sauce-copilot-test/
├── pages/                  # Page Object Model classes
│   ├── base.page.ts       # Base page class with common methods
│   ├── login.page.ts      # Login page object
│   ├── inventory.page.ts  # Product inventory page object
│   ├── cart.page.ts       # Shopping cart page object
│   └── checkout.page.ts   # Checkout pages object
├── tests/                 # Test specifications
│   ├── login.spec.ts      # Login flow tests
│   ├── add-to-cart.spec.ts # Add to cart flow tests
│   └── checkout.spec.ts   # Complete checkout flow tests
├── fixtures/              # Playwright fixtures and configurations
│   └── test.fixture.ts    # Custom test fixtures with page objects
├── utils/                 # Utility functions and helpers
│   ├── constants.ts       # Test data and constants
│   └── test-utils.ts      # Helper utility functions
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🎯 Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Type-Safe**: Full TypeScript support for better code quality and IDE autocomplete
- **Cross-browser Testing**: Tests run on Chromium, Firefox, and WebKit
- **Mobile Testing**: Includes mobile viewport testing configurations
- **Test Fixtures**: Custom Playwright fixtures for page objects
- **Comprehensive Coverage**: Login, add to cart, and checkout flow tests
- **Error Handling**: Built-in error messages and validation checks
- **Screenshots & Videos**: Automatic capture on failure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests in Headed Mode (Browser Visible)
```bash
npm run test:headed
```

### View Test Report
```bash
npm run report
```

### Run Specific Test File
```bash
npx playwright test tests/login.spec.ts
```

### Run Tests Matching a Pattern
```bash
npx playwright test -g "Login.*valid"
```

## 📋 Test Coverage

### Login Flow Tests (login.spec.ts)
- ✅ TC-001: User sees login page
- ✅ TC-002: Successful login with valid credentials
- ✅ TC-003: Login fails with invalid username
- ✅ TC-004: Login fails with invalid password
- ✅ TC-005: Login fails with empty credentials
- ✅ TC-006: Locked out user cannot login

### Add to Cart Flow Tests (add-to-cart.spec.ts)
- ✅ TC-101: Add single product to cart
- ✅ TC-102: Add multiple products to cart
- ✅ TC-103: Add product by name to cart
- ✅ TC-104: Remove product from cart (inventory page)
- ✅ TC-105: Remove product from cart (cart page)
- ✅ TC-106: Continue shopping returns to inventory
- ✅ TC-107: Cart badge shows correct count
- ✅ TC-108: Add same product multiple times

### Checkout Flow Tests (checkout.spec.ts)
- ✅ TC-201: Complete checkout flow successfully
- ✅ TC-202: Checkout fails with missing first name
- ✅ TC-203: Checkout fails with missing last name
- ✅ TC-204: Checkout fails with missing postal code
- ✅ TC-205: Cancel checkout returns to cart
- ✅ TC-206: Order complete page shows success message
- ✅ TC-207: Back to home from order complete
- ✅ TC-208: Verify order summary before completion

## 📖 Page Object Model Classes

### BasePage
Base class with common methods used by all page objects:
- `goto()` - Navigate to URL
- `click()` - Click element
- `fill()` - Fill input field
- `getText()` - Get element text
- `isVisible()` - Check element visibility
- `waitForSelector()` - Wait for element to appear

### LoginPage
Methods for login interactions:
- `navigate()` - Go to login page
- `login(username, password)` - Perform login
- `getErrorMessage()` - Get error message text

### InventoryPage
Methods for inventory/product page:
- `addProductToCart(index)` - Add product by index
- `addProductToCartByName(name)` - Add product by name
- `getProductCount()` - Get number of products
- `getProductNameByIndex(index)` - Get product name
- `clickCart()` - Navigate to cart

### CartPage
Methods for shopping cart:
- `getCartItemCount()` - Get number of items in cart
- `removeItemFromCart(index)` - Remove item by index
- `clickCheckout()` - Proceed to checkout
- `getAllCartItemNames()` - Get all item names

### CheckoutPage
Methods for checkout process:
- `fillCheckoutInfo(firstName, lastName, postalCode)` - Fill checkout form
- `clickContinue()` - Go to overview page
- `clickFinish()` - Complete order
- `getTotal()` - Get order total

## 🔧 Playwright Configuration

The `playwright.config.ts` includes:
- **Base URL**: https://www.saucedemo.com
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile Devices**: Pixel 5, iPhone 12
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Recorded on first retry
- **Reporter**: HTML report

## 🔐 Test Users

Available test users on SauceDemo:
- `standard_user` - Normal user with no issues
- `locked_out_user` - Account locked
- `problem_user` - Display issues with products
- `performance_glitch_user` - Slow page loads

Password: `secret_sauce`

## 📊 Test Execution

### Test Results
After running tests, view the HTML report:
```bash
npm run report
```

### Debug Information
- Screenshots saved on failure in `test-results/`
- Videos available for failed tests
- Traces for debugging with Playwright Inspector

## 🛠️ Development

### Add New Test
1. Create new `.spec.ts` file in `tests/` directory
2. Import fixtures from `fixtures/test.fixture.ts`
3. Use existing page objects or create new ones
4. Follow naming convention: `TC-XXX: Test Description`

### Add New Page Object
1. Create new file in `pages/` directory extending `BasePage`
2. Define selectors as private properties
3. Implement methods for page interactions
4. Export the class

### Example Test
```typescript
import { test, expect } from '../fixtures/test.fixture';

test.describe('Example Flow', () => {
  test('TC-001: Example test', async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const isVisible = await inventoryPage.isInventoryPageVisible();
    expect(isVisible).toBe(true);
  });
});
```

## 🐛 Troubleshooting

### Tests timing out
Increase timeout in `playwright.config.ts`:
```typescript
use: {
  actionTimeout: 20000,
  navigationTimeout: 30000
}
```

### Selector not found
Use Playwright Inspector to locate elements:
```bash
npm run test:debug
```

### Memory issues
Run tests with fewer workers:
```bash
npx playwright test --workers=1
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [SauceDemo Website](https://www.saucedemo.com/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📝 License

MIT

## ✨ Best Practices Implemented

✅ Page Object Model for maintainability
✅ Separation of concerns (selectors in objects)
✅ Reusable fixtures for test setup
✅ Type-safe with TypeScript
✅ Comprehensive test coverage
✅ Clear test naming conventions
✅ Error handling and validation
✅ Cross-browser testing support
✅ Mobile device testing
✅ Automatic screenshots and videos on failure
