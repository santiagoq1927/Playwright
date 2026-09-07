package quijano.pages.centyc;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class ClicksPage {
    public static Locator buttonsForm(Page page, String locatorName) {
        return page.locator("//button[contains(text(),'"+ locatorName +"')]");
    }

    public static Locator counterSustainedClickForm(Page page) {
        return page.locator("//span[contains(@class,'ml-2 bg-red-500')]").nth(0);
    }

    public static Locator counterClickForm(Page page) {
        return page.locator("//span[contains(@class,'ml-2 bg-red-500')]").nth(1);
    }

    public static Locator blackBoardLocation(Page page) {
        return page.locator("//canvas[@id='pizarraReal']");
    }
}
