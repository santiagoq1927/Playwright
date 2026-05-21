const BasePage = require("../../base/BasePage");

class ContactSectionPage extends BasePage{
    constructor(page){
        super(page);
        this.contact={
                    sectionContact: page.getByRole('heading', { name: 'Contactos' }),
                    inpContactUserName : page.locator('siigo-textfield-web[name="FirstName"] input[name="FirstName"]'),
                    inpContactUserLastname : page.locator('siigo-textfield-web[name="LastName"] input[name="LastName"]'),
                    inpContactUserEmail : page.locator('siigo-emailinput-web[name="Email"] input#emailinput'),
                    inpContactUserJob : page.locator('siigo-textfield-web[name="Charge"]:has-text("Cargo") input.mdc-text-field__input'),
                    inpContactUserIndicative : page.locator('siigo-textfield-web[name="Indicative"] input[name="Indicative"]'),
                    inpContactUserPhone : page.locator('siigo-textfield-web[name="Number"] input[name="Number"]')
        }
    }

    //Metodos para contactos
    async selectContactSection(){  
        await this.click(this.contact.sectionContact);
        await this.contact.inpContactUserName.waitFor({ state: 'attached' });
    }

    async enterContactUserName(name){  
        await this.fill(this.contact.inpContactUserName,name);
    }

    async enterContactUserLastName(lastname){  
        await this.fill(this.contact.inpContactUserLastname,lastname);
    }

    async enterContactUserEmail(email){  
        await this.fill(this.contact.inpContactUserEmail,email);
    }

    async enterContactUserJob(job){  
        await this.fill(this.contact.inpContactUserJob,job);
    }

    async enterContactUserIndicative(indicative){  
        await this.fill(this.contact.inpContactUserIndicative,indicative);
    }

    async enterContactUserPhone(phone){  
        await this.fill(this.contact.inpContactUserPhone,phone);
    }

    async enterContactData(name,lastname,email,job,indicative,phone){
        await this.enterContactUserName(name);
        await this.enterContactUserLastName(lastname);
        await this.enterContactUserEmail(email);
        await this.enterContactUserJob(job);
        await this.enterContactUserIndicative(indicative);
        await this.enterContactUserPhone(phone);
    }

}
module.exports = ContactSectionPage;