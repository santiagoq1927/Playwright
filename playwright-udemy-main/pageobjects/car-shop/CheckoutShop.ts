import { Locator, Page } from "@playwright/test";
import exp from "constants";

export class CheckoutShop{

    private readonly page:Page
    private readonly inpFullname:Locator
    private readonly inpEmail:Locator
    private readonly inpAddress:Locator
    private readonly selPaymentInformation:Locator
    private readonly inpNumberCard:Locator
    private readonly inpExpiryCard:Locator
    private readonly inpCVCCard:Locator
    private readonly btnPayment:Locator

    private quantityProductOne:Locator
    private quantityProductTwo:Locator
    private quantityProductThree:Locator

    constructor(page:Page){
        this.page = page;
        this.inpFullname = page.locator('//input[@id="name"]');
        this.inpEmail = page.locator('//input[@id="email"]');
        this.inpAddress = page.locator('//input[@id="address"]');
        this.selPaymentInformation = page.getByRole('link', { name: 'Información de pago' });
        this.inpNumberCard = page.locator('//input[@id="card-number"]');
        this.inpExpiryCard = page.locator('//input[@id="card-expiry"]');
        this.inpCVCCard = page.locator('//input[@id="card-cvc"]');
        this.btnPayment = page.locator('//button[@id="place-order-btn"]');
    }

    async enterNumberCard(numberCard:string){
        await this.inpNumberCard.fill(numberCard);
    }

    async enterExpiryCard(expiry:string){
        await this.inpExpiryCard.fill(expiry);
    }

    async enterCVCCard(cvc:string){
        await this.inpCVCCard.fill(cvc);
    }

    async enterFullname(fullname:string){
        await this.inpFullname.fill(fullname);
    }

    async enterEmail(email:string){
        await this.inpEmail.fill(email);
    }

    async enterAddress(address:string){
        await this.inpAddress.fill(address);
    }

    async selectPayment(){
        await this.btnPayment.click();
    }

    async selectPaumentInformation(){
        await this.page.waitForTimeout(2000);
        await this.selPaymentInformation.click();
    }

    async enterPersonalInformation(fullName:string, email:string, address:string){
        await this.enterFullname(fullName);
        await this.enterEmail(email);
        await this.enterAddress(address);
    }

    async enterPaymentInformation(numberCard:string, expiryCard:string, cvcCard:string){
        await this.enterNumberCard(numberCard);
        await this.enterExpiryCard(expiryCard);
        await this.enterCVCCard(cvcCard);
    }
}