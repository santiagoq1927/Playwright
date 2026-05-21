const { expect } = require('@playwright/test');
const BasePage = require('../base/BasePage');

class HomePage extends BasePage{
    constructor(page){
        super(page);

        this.lblTitle = page.getByText('RA S.A.S');
        this.btnCreate = page.getByRole('button', { name: 'Crear' });
        this.createMenu = page.locator('div.content-create-items');
        this.lknClient = this.createMenu.getByRole('link', {name: 'Clientes',exact: true});
    }

    async validateTitle(title) {
        await expect(this.lblTitle).toBeVisible({ timeout: 15000 });
        await expect(this.lblTitle).toHaveText(title);
    }

    async validateButtonCreate(){
        await expect(this.btnCreate).toBeVisible({ timeout: 15000 });
    }

    async validateMenuCreate(){
        await expect(this.createMenu).toBeVisible({ timeout: 15000 });
    }

    async selectCreate(){
        await this.validateButtonCreate();
        await this.click(this.btnCreate);
        await this.validateMenuCreate();
    }

    async validateLinkClient(){
        await expect(this.lknClient).toBeVisible({ timeout: 15000 });
    }

    async selectClient(){
        await this.validateLinkClient();
        await this.click(this.lknClient);
    }

    async accesClientThird(){
        await this.selectCreate();
        await this.selectClient();
    }

}
module.exports = HomePage;