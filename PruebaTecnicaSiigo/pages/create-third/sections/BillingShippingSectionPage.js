const BasePage = require("../../base/BasePage");

class BillingShippingSectionPage extends BasePage{
    constructor(page){
        super(page);
        this.billingShipping={
            inpContactEmail : page.locator('siigo-textfield-web[name="contactemail"] input[name="contactemail"]'),
            inpIndicativeSendPhone : page.locator('siigo-textfield-web[name="indicativephone"] input[name="indicativephone"]'),
            inpNumberSendPhone : page.locator('siigo-textfield-web[name="contactphone"] input[name="contactphone"]'),
            inpPostalCode : page.locator('siigo-textfield-web.hydrated:has-text("Código postal") input.mdc-text-field__input'),
            cbxRegimeVAT : page.locator('siigo-dropdownlist-web.hydrated:has-text("Tipo de régimen IVA")'),
            regimenOptions : page.locator('siigo-dropdownlist-web', {hasText: 'Tipo de régimen IVA'}).locator('li.mdc-list-item'),
        }
    }

    //Metodos para datos de facturacion y envio
    async enterContactEmail(contactEmail){
        await this.fill(this.billingShipping.inpContactEmail,contactEmail);
    }

    async enterIdicativeSendPhone(indicative){
        await this.fill(this.billingShipping.inpIndicativeSendPhone,indicative);
    }

    async enterNumberSendPhone(number){
        await this.fill(this.billingShipping.inpNumberSendPhone,number);
    }

    async enterPostalCode(code){
        await this.fill(this.billingShipping.inpPostalCode,code);
    }

    async selectRegimeVAT(value){
        await this.click(this.billingShipping.cbxRegimeVAT);
        const option = this.billingShipping.cbxRegimeVAT.locator(`li.mdc-list-item[data-value*='"value":${value}']`);
        //const option = this.billingShipping.regimenOptions.filter(`[data-value*='"value":${value}')]`).nth(2);
        await this.click(option);
    }

    async enterBillingShipping(contactEmail,indicative,number,value,code){
       await this.enterContactEmail(contactEmail);
       await this.enterIdicativeSendPhone(indicative);
       await this.enterNumberSendPhone(number);
       await this.selectRegimeVAT(value);
       await this.enterPostalCode(code);        
    }
}
module.exports = BillingShippingSectionPage;