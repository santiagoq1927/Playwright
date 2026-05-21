const BasePage = require("../../base/BasePage");

class DataBasicSectionPage extends BasePage{
    constructor(page){
        super(page);
        this.basicData={
            inputIdentification : page.locator('siigo-identification-input-web').locator('input.input-identification'),
            inputCV : page.locator('siigo-identification-input-web.hydrated input#input-check-digit'),
            inpBranchCode : page.locator('siigo-textfield-web.hydrated:has-text("Código de la sucursal") input'),            
            inpName : page.locator('siigo-textfield-web.hydrated:has-text("* Nombres") input.mdc-text-field__input'),
            inpLastName : page.locator('siigo-textfield-web.hydrated:has-text("* Apellidos") input.mdc-text-field__input'),
            inpTradeName : page.locator('siigo-textfield-web.hydrated:has-text("Nombre comercial") input.mdc-text-field__input'),
            inpAddress : page.locator('siigo-textfield-web.hydrated:has-text("Dirección") input.mdc-text-field__input'),
            inpIndivativePhone : page.locator('siigo-phone-web.hydrated').locator('input[name="Indicativo"]'),
            inpNumberPhone : page.locator('siigo-phone-web.hydrated').locator('input[name="# de Teléfono"]'),
            inpExtensionPhone : page.locator('siigo-phone-web.hydrated').locator('input[name="Extensión"]'),
            btnAddPhone : page.locator('siigo-phone-web').getByRole('button', {name: 'Agregar otro Teléfono'}),
            inpIndicativeSecondPhone : page.locator('siigo-phone-web.hydrated .siigo-components.siigo-phone-web').nth(1).locator('input[name="Indicativo"]'),
            inpNumberSecondPhone : page.locator('siigo-phone-web.hydrated .siigo-components.siigo-phone-web').nth(1).locator('input[name="# de Teléfono"]'),
            inpExtensionSecondPhone : page.locator('siigo-phone-web.hydrated .siigo-components.siigo-phone-web').nth(1).locator('input[name="Extensión"]')
        }
    }

    //Metodos para datos basicos
    async enterIdentification(identification) {
        await this.fill(this.basicData.inputIdentification,identification);
    }

    async enterCV(cv) {
        await this.fill(this.basicData.inputCV,cv);
    }

    async enterCodeBranch(code) {
        await this.fill(this.basicData.inpBranchCode,code);
    }

    async enterName(name){
        await this.fill(this.basicData.inpName,name);
    }

    async enterLastName(lastname){
        await this.fill(this.basicData.inpLastName,lastname);
    }

    async enterTradeName(tradeName){
        await this.fill(this.basicData.inpTradeName,tradeName);
    }

    async enterAddrress(address){
        await this.fill(this.basicData.inpAddress,address);
    }

    async enterIndicativePhone(indicatvePhone){
        await this.fill(this.basicData.inpIndivativePhone,indicatvePhone);
    }

    async enterNumberPhone(numberPhone){
        await this.fill(this.basicData.inpNumberPhone,numberPhone);
    }

    async enterExtensionPhone(extensionPhone){
        await this.fill(this.basicData.inpExtensionPhone,extensionPhone);
    }

    async selectAddPhone(){
        await this.click(this.basicData.btnAddPhone);
    }

    async enterIndicativeSecondPhone(number){
        await this.fill(this.basicData.inpIndicativeSecondPhone, number);
    }

    async enterNumberSecondPhone(number){
        await this.fill(this.basicData.inpNumberSecondPhone, number);
    }

    async enterExtensionSecondPhone(number){
        await this.fill(this.basicData.inpExtensionSecondPhone, number);
    }

    async enterBasicDataPerson(identification,cv,code,name,lastname,tradeName,address){
        await this.enterIdentification(identification);
        await this.enterCV(cv);
        await this.enterCodeBranch(code);
        await this.enterName(name);
        await this.enterLastName(lastname)
        await this.enterTradeName(tradeName);
        await this.enterAddrress(address);
    }

    async enterPrincipalPhone(indicatvePhone,numberPhone,extensionPhone){
       await this.enterIndicativePhone(indicatvePhone);
       await this.enterNumberPhone(numberPhone);
       await this.enterExtensionPhone(extensionPhone);
    }

    async enterSecondPhone(indicatvePhone,numberPhone,extensionPhone){
       await this.selectAddPhone();
       await this.enterIndicativeSecondPhone(indicatvePhone);
       await this.enterNumberSecondPhone(numberPhone);
       await this.enterExtensionSecondPhone(extensionPhone);
    }
}
module.exports = DataBasicSectionPage;