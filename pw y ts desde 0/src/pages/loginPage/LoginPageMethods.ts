import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { Logger } from "../../../support/logger";
import { expect } from "@playwright/test";
import { User } from "./login.interface";

export class LoginPageMethods{
    private page: Page
    private loginPage: LoginPage

    constructor(page:Page){
        this.page=page
        this.loginPage = new LoginPage(page)
    }

    async enterUsername(username:string){
        await Logger.logStep('Entering username');
        await this.loginPage.textBox.username.fill(username);
    }

    async enterPassword(password:string){
        await Logger.logStep('Entering password');
        await this.loginPage.textBox.password.fill(password);
    }

    async selectLogin(){
        await Logger.logStep('Selecting login');
        await this.loginPage.button.login.click();
    }

    async login(user:User){
        await Logger.logStep('Logging in');
        await this.enterUsername(user.username)
        await this.enterPassword(user.password)
        await this.selectLogin()
    }

    async verifyErrorMessage(expectedMessage: string) {
        await Logger.logVerification('Verifying error message');
        const actualMessage = await this.loginPage.labelsError.lblErrorCredentials.textContent();
        expect(actualMessage).toBe(expectedMessage);
    }
}