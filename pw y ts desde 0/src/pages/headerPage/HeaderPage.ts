import { Page } from "@playwright/test";

export class HeaderPage {
    private page:Page;
    constructor(page:Page) {
        this.page = page;
    }

    get buttons() {
        return {
            menu: this.page.locator('#react-burger-menu-btn'),
            cart: this.page.locator('.shopping_cart_link')
        }
    }

    get leftMenuOptions() {
        return {
            allItems: this.page.locator('#inventory_sidebar_link'),
            about: this.page.locator('#about_sidebar_link'),
            logout: this.page.locator('#logout_sidebar_link'),
            resetAppState: this.page.locator('#reset_sidebar_link')
        }
    }
}