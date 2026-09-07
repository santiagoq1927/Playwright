package quijano.stepsDefinitions.supermarket;

import org.junit.Assert;

import com.microsoft.playwright.Page;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import quijano.pages.supermarket.ProductPage;
import quijano.runners.Manager;

public class Jumbo {
    private final Page page = Manager.setup();
    private  Page pageTab;
    private String originCodeFirstProduct;
    private String originCodeSecondProduct;

    @Given("I open the url first product 40g")
    public void openFirstProductPage() {
        page.navigate("https://www.jumbo.cl/queso-parmesano-colun-rallado-40-g-2/p");
    }

    @Given("get the origin code of the first product")
    public void getFirstProductOriginCode() {
        String firstProductOriginCode = ProductPage.codeProduct(page).textContent();
        String onlyCode = firstProductOriginCode.replaceAll("[^0-9]", "");
        originCodeFirstProduct = onlyCode.substring(0, 4);
    }

    @When("I open the url second product 80g")
    public void openSecondProductPage() {
        pageTab = Manager.browserContext.newPage();
        pageTab.navigate("https://www.jumbo.cl/queso-parmesano-colun-80-g-2/p");
    }

    @When("get the origin code of the second product")
    public void getSecondProductOriginCode() {
        String secondProductOriginCode = ProductPage.codeProduct(pageTab).textContent();
        String onlyCode = secondProductOriginCode.replaceAll("[^0-9]", "");
        originCodeSecondProduct = onlyCode.substring(0, 4);
    }

    @Then("I verify that both origin codes are the same {string}")
    public void verifyOriginCodes(String expectedOriginCode) {
        Assert.assertEquals("Origin codes do not match", expectedOriginCode, originCodeFirstProduct);
        Assert.assertEquals("Origin codes do not match", expectedOriginCode, originCodeSecondProduct);
        page.bringToFront();
        pageTab.bringToFront();
    }
}
