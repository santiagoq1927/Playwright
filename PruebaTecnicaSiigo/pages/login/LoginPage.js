const BasePage = require('../base/BasePage');

class LoginPage extends BasePage{
    constructor(page) {
        super(page);

        this.inpUsername = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.inpPassword = page.getByRole('textbox', { name: 'Contraseña' });
        this.btnContinue = page.getByRole('button', { name: 'Continuar' });
    }

    async navigate() {
        await super.navigate('/');
    }

    async enterEmail(email){
        await this.fill(this.inpUsername,email);
    }

    async enterPassword(password){
        await this.fill(this.inpPassword,password);
    }

    async selectContinue(){
        await this.click(this.btnContinue);
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.selectContinue();
    }
}

module.exports = LoginPage;