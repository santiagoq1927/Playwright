# SauceDemo Playwright Automation

This project automates the SauceDemo website using Playwright with TypeScript and the Page Object Model pattern.

## Setup

1. Install dependencies: 
pm install
2. Install browsers: 
px playwright install

## Running Tests

- Run all tests: 
pm test
- Run tests in UI mode: 
pm run test:ui
- Show report: 
pm run report

## Project Structure

- pages/: Page Object Model classes
  - BasePage.ts: Base class for all pages
  - LoginPage.ts: Login page
  - HomePage.ts: Products page
  - CartPage.ts: Shopping cart page
  - CheckoutPage.ts: Checkout process
- 	ests/: Test files
  - saucedemo.spec.ts: End-to-end test for complete purchase flow
