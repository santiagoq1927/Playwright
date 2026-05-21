import {expect } from "@playwright/test";
import { Page } from 'playwright';
import BasePage from "./BasePage";
import { Locator } from 'playwright';

export default class LoginPage extends BasePage{

    private inpUserName: Locator;
    private inpPassword: Locator;
    private btnLogin: Locator;
    private lblProducts: Locator;
    private lblMessageError: Locator;

    constructor(page:Page) {
        super(page);

        this.inpUserName = page.locator('#user-name');
        this.inpPassword = page.locator('#password');
        this.btnLogin = page.locator('#login-button');
        this.lblProducts = page.locator('.title');
        this.lblMessageError = page.locator('//h3[@data-test="error"]');
    }

    async navigate() {
        await this.navigateTo('https://www.saucedemo.com/');
    }

    async enterUsername(username:string){
        await this.fill(this.inpUserName,username);
    }

    async enterPassword(password:string){
        await this.fill(this.inpPassword,password);
    }

    async selectLogin(){
        await this.click(this.btnLogin);
    }

    async login(username:string, password:string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.selectLogin();
    }

    async expectProductsVisible() {
        await this.waitForVisible(this.lblProducts)
    }

    async getMsgError(): Promise<string> {
        return await this.getText(this.lblMessageError);
    }

    async expectErrorMessage(expected: string) {
        await this.waitForToHaveText(this.lblMessageError,expected)
    }
}