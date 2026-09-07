package quijano.stepsDefinitions.centyc;

import org.junit.Assert;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import quijano.pages.centyc.RangePage;
import quijano.runners.Manager;

public class Range {

    private final Page page = Manager.setup();

    @Given("I open url page {string}")
    public void openUrlPageClicks(String pageName) {
        page.navigate("https://centyc.cl/pruebas/elementos-web");
        RangePage.buttonsForm(page, pageName).click();
        page.evaluate("window.scrollBy(0, document.body.scrollHeight)");
    }

    @When("I move the range slider to the value {string}")
    public void moveRangeSliderToValue(String value) {
        Locator rangeSlider = RangePage.inputRange(page);
        int sliderValue = Integer.parseInt(value);
        rangeSlider.evaluate("range => {range.value = " + sliderValue + "; range.dispatchEvent(new Event('input'));}");
    }

    @Then("I verify the value of the range slider is {string}")
    public void verifyRangeSliderValue(String expectedValue) {
        Locator rangeSlider = RangePage.inputRange(page);
        int actualValue = Integer.parseInt(rangeSlider.inputValue());
        System.out.println("Actual value: " + actualValue);
        Assert.assertEquals("The range slider value does not match the expected value.", actualValue, Integer.parseInt(expectedValue));            
    }
    
}
