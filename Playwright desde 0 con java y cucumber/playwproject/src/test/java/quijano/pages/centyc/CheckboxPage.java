package quijano.pages.centyc;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class CheckboxPage {
    public static Locator buttonsForm(Page page, String locatorName) {
        return page.locator("//button[contains(text(),'"+ locatorName +"')]");
    }

    public static Locator selectForm(Page page) {
        return page.locator("//select[@id='sel1']");
    }
}
