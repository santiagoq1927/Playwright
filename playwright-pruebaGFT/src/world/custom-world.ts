import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import CheckoutInfoPage from '../pages/CheckoutInfoPage';
import OverviewPage from '../pages/OverviewPage';
import CompletePage from '../pages/CompletePage';
import path from 'path';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  homePage!: HomePage;
  cartPage!:CartPage;
  checkoutInfoPage!:CheckoutInfoPage;
  overviewPage!:OverviewPage;
  completePage!:CompletePage;

  videoPath!: string;

  async init(scenarioName?: string) {
    this.browser = await chromium.launch({ headless: false });

    const videoName = `${scenarioName?.replace(/\s+/g, '_') || 'video'}_${Date.now()}.webm`;
    this.videoPath = path.join('reports', 'videos', videoName);

    this.context = await this.browser.newContext({recordVideo: {dir: path.join('reports', 'videos')}});
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(7000);
    this.page.setDefaultNavigationTimeout(10000);
  }

  async close() {
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);