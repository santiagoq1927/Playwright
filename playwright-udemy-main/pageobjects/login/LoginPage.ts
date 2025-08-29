import { Locator, Page } from "@playwright/test";

export class LoginPage{

    private readonly inpUserName:Locator
    private readonly inpPassword:Locator
    private readonly btnLogin:Locator

    constructor(page:Page){
        this.inpUserName = page.locator('//input[@id="username"]');
        this.inpPassword = page.locator('//input[@id="password"]');
        this.btnLogin = page.locator('//button[@type="submit"]');
    }

    async enterUserName(username: string){
        await this.inpUserName.fill(username);
    }

    async enterPasword(password: string){
        await this.inpPassword.fill(password);
    }

    async selectLogin(){
        await this.btnLogin.click();
    }

    async doLogin(username: string, password: string){
        await this.enterUserName(username);
        await this.enterPasword(password);
        await this.selectLogin();
    }
}