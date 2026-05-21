const { expect } = require('@playwright/test');
const BasePage = require("../base/BasePage");
const DataBasicSectionPage = require('../create-third/sections/DataBasicSectionPage');
const BillingShippingSectionPage = require('../create-third/sections/BillingShippingSectionPage');
const BankDetailsSectionPage = require('../create-third/sections/BankDetailsSectionPage');
const ContactSectionPage = require('../create-third/sections/ContactSectionPage');


class CreateThirdUserPage extends BasePage{
    constructor(page){
        super(page);
        //Elementos generales
                this.lblTitleCreateThird = page.getByText('Crear un tercero');
                this.btnSave = page.locator('#sticky').getByRole('button',{name:' Guardar '});

                this.dataBasicSectionPage = new DataBasicSectionPage(page);
                this.billingShippingSectionPage = new BillingShippingSectionPage(page);
                this.bankDetailsSectionPage = new BankDetailsSectionPage(page);
                this.contactSectionPage = new ContactSectionPage(page);
    }

    async validateTitleCreateThird(title) {
        await expect(this.lblTitleCreateThird).toBeVisible({ timeout: 30000 });
        await expect(this.lblTitleCreateThird).toHaveText(title);
    }

    async selectSave(){
        await this.click(this.btnSave);
    }
}
module.exports = CreateThirdUserPage;