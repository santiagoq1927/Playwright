package quijano.pages.centyc;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class FormPage {

    public static Locator inputsForm(Page page, String locatorName) {
        return page.locator("//input[@name='" + locatorName + "']");
    }

    public static Locator textAreaForm(Page page, String locatorName) {
        return page.locator("//textarea[@name='" + locatorName + "']");
    }

    public static Locator selectsForm(Page page, String locatorName) {
        return page.locator("//select[@name='" + locatorName + "']");
    }

    public static Locator colorForm(Page page, String color) {
        return page.locator("//label[contains(text(),'"+ color +"')]");
    }

    public static Locator buttonsForm(Page page, String locatorName) {
        return page.locator("//button[@type='" + locatorName + "']");
    }

    public static Locator finalMessage(Page page, String message) {
        return page.locator("h3:has-text('" + message + "')");
    }


}
