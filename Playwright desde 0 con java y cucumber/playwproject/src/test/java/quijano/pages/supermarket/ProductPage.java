package quijano.pages.supermarket;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class ProductPage {

    public static Locator codeProduct(Page page) {
        return page.locator("//p[contains(text(),'Código:')]");
    }
}