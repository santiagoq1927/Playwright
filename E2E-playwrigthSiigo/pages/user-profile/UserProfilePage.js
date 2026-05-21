const { expect } = require('@playwright/test');
const BasePage = require("../base/BasePage");

class UserProfilePage extends BasePage {
    constructor(page) {
        super(page);
        this.lblNameUserProfile = page.locator('.menu-tab-title-label');
        this.lblTitleUserProfile = page.getByRole('heading', { name: 'Perfil del tercero' });
        this.lblActiveState = page.locator('app-third-party-header-view').getByText('Activo',{ exact: true });
        this.lblTypeThird = page.locator('siigo-card-web .siigo-components .type_third_party_title_selected').getByText('Clientes',{ exact: true });
        this.lblIDUserProfile = page.locator('app-third-party-header-view p.text-rigth-header.sub-head-size');

        this.basicDataSection={
            lblTypeUser : page.locator('app-third-party-basic-data-view .siigo-components p#tipo').first(),
            lblUserID : page.locator('app-third-party-basic-data-view .siigo-components p#Identification'),
            lblUserName : page.locator('app-third-party-basic-data-view .siigo-components p#FirstName'),
            lblUserLastname : page.locator('app-third-party-basic-data-view .siigo-components p#LastName'),
        }

        this.billinShippingDateSection={
            lblEmailBillingData : page.locator('app-third-party-billing-view .siigo-components p.padding-6').nth(2),
            lblRegimenBillingData : page.locator('app-third-party-billing-view .siigo-components p.padding-6').nth(3),
        }

        this.banksDetailsDateSection={
            lblIDTitularData : page.locator('app-third-party-bank-view .siigo-components p.content').nth(3),
            lblBankTitularData : page.locator('app-third-party-bank-view .siigo-components p.content').nth(4),
            lblNumberAccountTitularData : page.locator('app-third-party-bank-view .siigo-components p.content').nth(5),
        }

        this.contactDateSection={
            lblContactEmailData : page.locator('app-third-party-contact-view .siigo-components p.content').nth(2),
            lblContctPhoneData : page.locator('app-third-party-contact-view .siigo-components p.content').nth(5),
        }
    }

    //metodos de validacion seccion perfil de tercero
    async validateTitle() {
        await this.lblTitleUserProfile.waitFor({ state: 'visible', timeout: 50000 });
        await expect(this.lblTitleUserProfile).toBeVisible();
    }

    async getNameUserProfile() {
        return this.getText(this.lblNameUserProfile);
    }

    async getIDUserProfile() {
        return this.getText(this.lblIDUserProfile);
    }

    async getTypeThird() {
        return this.getText(this.lblTypeThird);
    }

     async validateNameUserProfile(name) {
        await expect(this.lblNameUserProfile).toHaveText(name);
    }

    async validateIDUserProfile(id) {
        await expect(this.lblIDUserProfile).toHaveText(id);
    }

    async validateTypeThird() {
        await this.lblTypeThird.waitFor({ state: 'visible', timeout: 50000 });
        await expect(this.lblTypeThird).toBeVisible();
    }

    async validateActiveState() {
        await this.lblActiveState.waitFor({ state: 'visible', timeout: 50000 });
        await expect(this.lblActiveState).toBeVisible();
    }

    //Meotods validacion datos basicos
    async getTypeBasicData() {
        return this.getText(this.basicDataSection.lblTypeUser);
    }

    async getIDBasicData() {
        return this.getText(this.basicDataSection.lblUserID);
    }

    async getNameBasicData() {
        return this.getText(this.basicDataSection.lblUserName);
    }

    async getLastnameBasicData() {
        return this.getText(this.basicDataSection.lblUserLastname);
    }

    async validaTypeBasicData(typeUser) {
        await expect(this.basicDataSection.lblTypeUser).toHaveText(typeUser);
    }

    async validateIDBasicData(id) {
        await expect(this.basicDataSection.lblUserID).toHaveText(id);
    }

    async validateNameBasicData(name) {
        await expect(this.basicDataSection.lblUserName).toHaveText(name);
    }

    async validateLastNameBasicData(lastname) {
        await expect(this.basicDataSection.lblUserLastname).toHaveText(lastname);
    }

    async validateBasicDataSection(typeUser,id,name,lastname){
        await this.validaTypeBasicData(typeUser);
        await this.validateIDBasicData(id);
        await this.validateNameBasicData(name);
        await this.validateLastNameBasicData(lastname);
    }

    //metodos para facturcion y entrega
    async getEmailBllingData() {
        return this.getText(this.billinShippingDateSection.lblEmailBillingData);
    }

    async getRegimeBillingData() {
        return this.getText(this.billinShippingDateSection.lblRegimenBillingData);
    }

    async validateEmailBillingData(email) {
        await expect(this.billinShippingDateSection.lblEmailBillingData).toHaveText(email);
    }

    async validateLasRegimeBillingData(regime) {
        await expect(this.billinShippingDateSection.lblRegimenBillingData).toHaveText(regime);
    }

    async validateBillingDataSection(email,regime){
        await this.validateEmailBillingData(email);
        await this.validateLasRegimeBillingData(regime);
    }

    //metodos para validcion de datos del banco
    async getIDTitulatBankData() {
        return this.getText(this.banksDetailsDateSection.lblIDTitularData);
    }

    async getBankTitulatData() {
        return this.getText(this.banksDetailsDateSection.lblBankTitularData);
    }

    async getNumberAccountBankData() {
        return this.getText(this.banksDetailsDateSection.lblNumberAccountTitularData);
    }

    async validateIDTitulatBankData(id) {
        await expect(this.banksDetailsDateSection.lblIDTitularData).toHaveText(id);
    }

    async validateBankTitularData(bank) {
        await expect(this.banksDetailsDateSection.lblBankTitularData).toHaveText(bank);
    }

    async validateNumberAccountBankData(number) {
        await expect(this.banksDetailsDateSection.lblNumberAccountTitularData).toHaveText(number);
    }

    async validateBankDataSection(id,bank,number){
        await this.validateIDTitulatBankData(id);
        await this.validateBankTitularData(bank);
        await this.validateNumberAccountBankData(number);

    }
    
    //metodos para validcion de contacto
    async getEmailContactData() {
        return this.getText(this.contactDateSection.lblContactEmailData);
    }

    async getPhoneContactData() {
        return this.getText(this.contactDateSection.lblContctPhoneData);
    }


    async validateEmailContactData(email) {
        await expect(this.contactDateSection.lblContactEmailData).toHaveText(email);
    }

    async validatePhoneContactData(phone) {
        await expect(this.contactDateSection.lblContctPhoneData).toHaveText(phone);
    }

    async validateContactDataSection(email,phone){
        await this.validateEmailContactData(email);
        await this.validatePhoneContactData(phone);
    }

    //////////////////////////////////
    async screenshot(){
        await this.page.screenshot({ path: 'screenshots/e2e-tercero-creado.png', fullPage: true });
    }
}

module.exports = UserProfilePage;