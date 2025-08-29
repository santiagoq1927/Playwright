import { Locator, Page } from "@playwright/test";

export class NavigateTo{

    private readonly page:Page

    constructor(page:Page){
        this.page = page
    }

    async loginPage(){
        await this.page.goto('https://www.saucedemo.com')
    }
}