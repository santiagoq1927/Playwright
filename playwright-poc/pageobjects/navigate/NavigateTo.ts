import { Locator, Page } from "@playwright/test";

export class NavigateTo{

    private readonly page:Page

    constructor(page:Page){
        this.page = page;
    }

    async loginPage(){
        await this.page.goto('http://127.0.0.1:5500/login.html');
    }

    async loginPageRegister(){
        await this.page.goto('http://127.0.0.1:5500/register.html');
    }

    async loginPageCarShop(){
        await this.page.goto('http://127.0.0.1:5500/index.html');
    }

    async loginPageLinkedin(){
        await this.page.goto('https://www.linkedin.com/feed/');
    }
}