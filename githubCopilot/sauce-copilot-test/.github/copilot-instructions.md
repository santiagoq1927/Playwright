<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Sauce Demo E-Commerce Automation Project

Project: Playwright TypeScript automation with Page Object Model for SauceDemo

### Project Structure
- `pages/` - Page Object Model classes for different pages
- `tests/` - Test specifications for login, cart, and checkout flows
- `fixtures/` - Playwright fixtures with page objects
- `utils/` - Utility functions and constants
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

### Key Features
- Full TypeScript support with type safety
- Page Object Model pattern for maintainability
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile device testing support
- Comprehensive test coverage for e-commerce workflows
- Automatic screenshots and videos on test failure

### Running Tests
- `npm test` - Run all tests
- `npm run test:ui` - Interactive UI mode
- `npm run test:debug` - Debug mode
- `npm run test:headed` - Browser visible
- `npm run report` - View HTML report

### Test Coverage
- Login flow: 6 tests (TC-001 to TC-006)
- Add to cart flow: 8 tests (TC-101 to TC-108)
- Checkout flow: 8 tests (TC-201 to TC-208)

### Page Objects
- `LoginPage` - Login interactions
- `InventoryPage` - Product browsing and cart management
- `CartPage` - Shopping cart operations
- `CheckoutPage` - Checkout process
- `BasePage` - Common functionality shared by all pages

### Test Users
- standard_user / secret_sauce
- locked_out_user / secret_sauce
- problem_user / secret_sauce
- performance_glitch_user / secret_sauce
