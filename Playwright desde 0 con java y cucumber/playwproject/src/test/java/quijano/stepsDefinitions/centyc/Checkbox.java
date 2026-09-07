package quijano.stepsDefinitions.centyc;

import org.junit.Assert;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.SelectOption;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import quijano.pages.centyc.CheckboxPage;
import quijano.runners.Manager;

public class Checkbox {

    private final Page page = Manager.setup();

    @Given("I open the url page {string}")
    public void openUrlPageClicks(String pageName) {
        page.navigate("https://centyc.cl/pruebas/elementos-web");
        CheckboxPage.buttonsForm(page, pageName).click();
        page.evaluate("window.scrollBy(0, document.body.scrollHeight)");
    }

    @When("I select the value {string} from the dropdown")
    public void selectValueFromDropdown(String value) {
        Locator selectElement = CheckboxPage.selectForm(page);
        //selectElement.selectOption(value);
        selectElement.selectOption(new SelectOption().setLabel(value));
        //selectElement.selectOption(new SelectOption().setIndex(2));
        //selectElement.selectOption(new SelectOption().setValue(value));
    }

    @Then("I verify the selected value is {string}")
    public void verifySelectedValue(String expectedValue) {
        Locator selectElement = CheckboxPage.selectForm(page);
        String selectedValue = selectElement.inputValue();
        System.out.println("Selected value: " + selectedValue);
        System.out.println("Expected value: " + expectedValue);
        Assert.assertEquals( "The selected value does not match the expected value.",expectedValue, selectedValue);
    }
    
}
