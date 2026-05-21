import { Page } from '@playwright/test';

/**
 * Utility functions for test helpers
 */

export class TestUtils {
  /**
   * Wait for a specific amount of time
   */
  static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Extract price value from a price string
   * e.g., "$49.99" -> 49.99
   */
  static extractPrice(priceString: string): number {
    const match = priceString.match(/\$?([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Generate random email address
   */
  static generateRandomEmail(): string {
    return `test_${Date.now()}@example.com`;
  }

  /**
   * Generate random number
   */
  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get current timestamp
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format currency amount
   */
  static formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  /**
   * Compare two price strings
   */
  static comparePrices(price1: string, price2: string): boolean {
    const p1 = this.extractPrice(price1);
    const p2 = this.extractPrice(price2);
    return p1 === p2;
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Take screenshot if test fails
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/${name}_${timestamp}.png` });
  }
}
