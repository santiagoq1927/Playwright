package quijano.runners;
import com.microsoft.playwright.Playwright;

import java.util.ArrayList;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.BrowserType;

public class Manager {
    public static Playwright playwright;
    public static Browser browser;
    public static Page page;
    public static BrowserContext browserContext;

    public static Page setup() {
        if(page == null) {
            playwright = Playwright.create();

            ArrayList<String> options = new ArrayList<>();
            options.add("--start-maximized");

            browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setChannel("chrome").setHeadless(false).setArgs(options));
            browserContext = browser.newContext(new Browser.NewContextOptions().setViewportSize(null));

            page = browserContext.newPage();
        }
        return page;
    }

    public static void tearDown() {        
        page = null;
        browser.close();
        playwright.close();
    }
}
