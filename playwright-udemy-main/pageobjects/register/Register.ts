import { Locator, Page } from "@playwright/test";

export class Register{

    private readonly inpName:Locator
    private readonly inpLastName:Locator
    private readonly inpAge:Locator
    private readonly inpCountry:Locator
    private readonly chkGender:Locator
    private readonly inpEmail:Locator
    private readonly chkWorkinDayMonday:Locator
    private readonly btnUploadPicture:Locator
    private readonly btnSaveRegister:Locator

    private actualDateRow:Locator
    private actualAmountRow:Locator
    private actualDescriptionRow:Locator

    constructor(page:Page){
        this.inpName = page.locator('//input[@id="name"]');
        this.inpLastName = page.locator('//input[@id="last-name"]');
        this.inpAge = page.locator('//input[@id="age"]');
        this.inpCountry = page.locator('//select[@id="country"]');
        this.chkGender = page.locator('//input[@id="sex-m"]');
        this.inpEmail = page.locator('//input[@id="email"]');
        this.chkWorkinDayMonday = page.locator('//input[@id="monday"]');
        this.btnUploadPicture = page.locator('//input[@id="picture"]');
        this.btnSaveRegister = page.locator('//button[@id="save-btn"]');
    }


    async enterName(name:string){
        await this.inpName.fill(name);
    }

    async enterLastaName(lastaname:string){
        await this.inpLastName.fill(lastaname);
    }

    async enterAge(age:string){
        await this.inpAge.fill(age);
    }

    async enterCountry(country:string){
        await this.inpCountry.selectOption(country);
    }

    async enterEmail(email:string){
        await this.inpEmail.fill(email);
    }

    async selectGenderM(){
        await this.chkGender.click();
    }

    async selectWorkinDayMonday(){
        await this.chkWorkinDayMonday.click();
    }

    async uploadPcture(){
        await this.btnUploadPicture.setInputFiles('images/luna.jpg');
    }

    async sleectSaveRegister(){
        await this.btnSaveRegister.click();
    }

    async enterDatesRegister(name:string,lastaname:string,age:string,country:string,email:string){
        await this.enterName(name);
        await this.enterLastaName(lastaname);
        await this.enterAge(age);
        await this.enterCountry(country);
        await this.selectGenderM();
        await this.enterEmail(email);
        await this.selectWorkinDayMonday();
        await this.uploadPcture();
    }
}