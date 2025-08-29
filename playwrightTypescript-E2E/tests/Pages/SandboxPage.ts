import{type Locator,type Page} from '@playwright/test'

export class SandboxPage{
    readonly page:Page;
    readonly chkPasta:Locator

    constructor(page:Page){
        this.page=page;
        this.chkPasta = page.getByRole('checkbox', {name:'Pasta 🍝'});
    }

    async checkPasta(){
        await this.chkPasta.check();
    }
}