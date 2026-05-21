import { Locator, Page } from "playwright";
import BasePage from "./BasePage";

export default class CheckoutInfoPage extends BasePage{

    private inpFirstname: Locator;
    private inpLastname: Locator;
    private inpPostalCode: Locator;
    private btnContinue: Locator;
        
    constructor(page:Page){
        super(page);
        this.inpFirstname=page.locator("#first-name");
        this.inpLastname=page.locator("#last-name");
        this.inpPostalCode=page.locator("#postal-code");
        this.btnContinue=page.locator("#continue");
    }

    async enterFirstname(firstname:string){
        await this.fill(this.inpFirstname,firstname);
    }

    async enterLastname(lastname:string){
        await this.fill(this.inpLastname,lastname);
    }

    async enterPostalcode(postalcode:string){
        await this.fill(this.inpPostalCode,postalcode);
    }

    async selectContinue(){
        await this.click(this.btnContinue);
    }

    async enterInformationCheckout(firstname:string,lastname:string,postalcode:string){
        await this.enterFirstname(firstname);
        await this.enterLastname(lastname);
        await this.enterPostalcode(postalcode);
        await this.selectContinue();
    }
}