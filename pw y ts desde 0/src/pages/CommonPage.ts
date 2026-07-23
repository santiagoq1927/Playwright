import { Page } from '@playwright/test';

export class CommonPage{
    private page;
    constructor(page:Page){
        this.page = page;
    }

    async navigateTo(){
        await this.page.goto('https://www.saucedemo.com/');
    }
}