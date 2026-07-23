import { Page } from "@playwright/test";

export class LoginPage{
    private page:Page

    constructor(page:Page){
        this.page=page
    }

    get textBox(){
        return{
            username: this.page.locator('#user-name'),
            password: this.page.locator('#password')
        }
    }

    get button(){
        return{
            login: this.page.locator('#login-button')
        }
    }

    get labelsError() {
        return {
            lblErrorCredentials: this.page.locator('.error-message-container.error')
        }
    }
}