import { expect, page } from "@playwright/test";
export default class LoginPage {

    Elements ={

    }

    async navigate(){
        await page.goto('https://demoqa.com/');
    }
}