package quijano.stepsDefinitions.centyc;

import org.junit.Assert;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import quijano.pages.centyc.ClicksPage;
import quijano.runners.Manager;

public class Clicks {

    private final Page page = Manager.setup();

    @Given("I open the url page clicks")
    public void openUrlPageClicks() {
        page.navigate("https://centyc.cl/pruebas/elementos-web");
    }

    @When("I press the button {string} for {string} seconds")
    public void pressButtonForSeconds(String buttonName, String seconds) throws InterruptedException {
        int timePress = Integer.parseInt(seconds) * 1000;
        Locator button = ClicksPage.buttonsForm(page, buttonName);
        button.hover();
        page.mouse().down();
        Thread.sleep(timePress);
        page.mouse().up();
    }

    @Then("I verify the counter increases")
    public void verifyCounterIncreasesBy() {
        Locator counter = ClicksPage.counterSustainedClickForm(page);
        int counterValue = Integer.parseInt(counter.textContent());
        Assert.assertTrue("Counter is not visible", counterValue > 15);
    }

    @When("I press the button {string} with double click")
    public void pressButtonWithDoubleClick(String buttonName){
        Locator button = ClicksPage.buttonsForm(page, buttonName);
        button.dblclick();
    }

    @Then("I verify the counter the click increases")
    public void verifyCounterClickIncreases() {
        Locator counter = ClicksPage.counterClickForm(page);
        int counterValue = Integer.parseInt(counter.textContent());
        Assert.assertTrue("Counter not increases", counterValue == 2);
    }

    @When("I press the button {string} with {string} clicks")
    public void pressButtonWithManyClicks(String buttonName, String clickCount){
        Locator button = ClicksPage.buttonsForm(page, buttonName);
        int clickNumber = Integer.parseInt(clickCount);
        button.click(new Locator.ClickOptions().setClickCount(clickNumber));
    }

    @Then("I verify the counter the click increases in {string}")
    public void verifyCounterClickIncreasesIn(String expectedCount) {
        Locator counter = ClicksPage.counterClickForm(page);
        int counterValue = Integer.parseInt(counter.textContent());
        int expectedValue = Integer.parseInt(expectedCount);
        Assert.assertTrue("Counter not increases", counterValue == expectedValue);
    }

    @When( "I am at the {string}")
    public void selectPizarra(String locatorName) {
        Locator button = ClicksPage.buttonsForm(page, locatorName);
        button.click();
    }

    @Then("I draw a line from x to y")
    public void drawLineFromXToY() {
        Locator blackBoard = ClicksPage.blackBoardLocation(page);
        blackBoard.click(new Locator.ClickOptions().setPosition(10, 10));
        page.mouse().down();
        blackBoard.click(new Locator.ClickOptions().setPosition(800, 200)); 
        page.mouse().up();
    }
}
