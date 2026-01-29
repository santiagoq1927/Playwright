class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async click(locator) {
        await locator.click({ timeout: 15000 });
    }

    async fill(locator, text) {
        await locator.fill(text, { timeout: 15000 });
    }

    async select(locator, label) {
        await locator.waitFor({ state: 'visible'});
        await locator.selectOption(label);
    }

    async getText(locator) {
        return await locator.textContent({ timeout: 15000 });
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async press(locator, option){
        await locator.press(option, { timeout: 15000 });
    }
}

module.exports = BasePage;