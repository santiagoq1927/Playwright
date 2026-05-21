import { Locator, Page } from "playwright";
import BasePage from "./BasePage";

export default class OverviewPage extends BasePage{

    private btnFinish: Locator;
        
    constructor(page:Page){
        super(page);
        this.btnFinish=page.locator("#finish");
    }

    async selectFinish(){
        await this.click(this.btnFinish);
    }
}