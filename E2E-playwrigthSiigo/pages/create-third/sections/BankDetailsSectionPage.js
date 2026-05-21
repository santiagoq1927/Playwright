const BasePage = require("../../base/BasePage");

class BankDetailsSectionPage extends BasePage{
    constructor(page){
        super(page);
        this.banksDetail={
            sectionBanksDetail: page.getByRole('heading', { name: 'Datos bancarios' }),
            inpTitularName : page.locator('siigo-textfield-web.hydrated:has-text("* Nombre del titular") input.mdc-text-field__input'),
            cbxIdentificationType : page.locator('siigo-dropdownlist-web.hydrated:has-text("* Tipo de identificación") div.mdc-ripple-upgraded').nth(1),
            identificationOptions : page.locator('siigo-dropdownlist-web', { hasText: '* Tipo de identificación' }).locator('li.mdc-list-item'),
            inpTitularIdentification : page.locator('siigo-textfield-web.hydrated:has-text("* Número de identificación del titular") input.mdc-text-field__input'),
            cbxBankType : page.locator('siigo-dropdownlist-web.hydrated:has-text("* Banco")'),
            bankOptions : page.locator('siigo-dropdownlist-web',{ hasText: '* Banco' }).locator('li.mdc-list-item'),
            cbxAccountType : page.locator('siigo-dropdownlist-web.hydrated:has-text("* Tipo de cuenta")'),
            accountOptions : page.locator('siigo-dropdownlist-web',{ hasText: '* Tipo de cuenta' }).locator('li.mdc-list-item'),
            inpAccountNumber : page.locator('siigo-textfield-web.hydrated:has-text("* Número de cuenta") input.mdc-text-field__input')
       }
    }

    //Metodos para datos bancarios
    async selectBanksDetail(){  
        await this.click(this.banksDetail.sectionBanksDetail);
    }

    async enterTitularName(name){  
        await this.fill(this.banksDetail.inpTitularName,name);
    }

    async selectIdentificationType(typeID){
        await this.click(this.banksDetail.cbxIdentificationType);
        const option = this.banksDetail.identificationOptions.filter({hasText: typeID}).nth(1);
        await this.press(option,'Enter');
    }

    async enterTitularIdentification(identification){  
        await this.fill(this.banksDetail.inpTitularIdentification,identification);
    }

    async selectBankType(typeBank){
        await this.click(this.banksDetail.cbxBankType);
        const option = this.banksDetail.bankOptions.filter({hasText: typeBank});
        await this.click(option);
    }

    async selectAccountType(typeAccount){
        await this.click(this.banksDetail.cbxAccountType);
        const option = this.banksDetail.accountOptions.filter({hasText: typeAccount});
        await this.click(option);
    }

    async enterAccountNumber(number){  
        await this.fill(this.banksDetail.inpAccountNumber,number);
    }

    async enterBanksDetail(name,typeID,identification,typeBank,typeAccount,number){
        await this.enterTitularName(name);
        await this.selectIdentificationType(typeID);
        await this.enterTitularIdentification(identification);
        await this.selectBankType(typeBank);
        await this.selectAccountType(typeAccount);
        await this.enterAccountNumber(number);
    }

}
module.exports = BankDetailsSectionPage;