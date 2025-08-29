import { Locator, Page } from "@playwright/test";

export class LoginPage{

    private readonly inpUserName:Locator
    private readonly inpPassword:Locator
    private readonly btnLogin:Locator

    constructor(page:Page){
        this.inpUserName = page.locator('//input[@id="user-name"]')
        this.inpPassword = page.locator('//input[@id="password"]')
        this.btnLogin = page.locator('//input[@id="login-button"]')
    }

    async enterUserName(username:string){
        await this.inpUserName.fill(username)
    }

    async enterPassword(password:string){
        await this.inpPassword.fill(password)
    }

    async selectLogin(){
        await this.btnLogin.click()
    }

    async doLogin(username:string,password:string){
        await this.enterUserName(username)
        await this.enterPassword(password)
        await this.selectLogin()
    }

}