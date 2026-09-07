package quijano.stepsDefinitions.centyc;

import org.junit.Assert;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.SelectOption;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import quijano.pages.centyc.FormPage;
import quijano.runners.Manager;

public class Form1 {
    private final Page page = Manager.setup();

    @Given("I open the Centyc form")
    public void openCentycForm() {
        page.navigate("https://centyc.cl/practica");
        Locator formOption = page.locator("button:has-text('FORMULARIO')");
        formOption.click();
    }

    @When("I fill the all form fields and submit the form")
    public void fillFormFieldsAndSubmit() {
        page.fill("//input[@name='nombre']", "Juan");
        page.fill("//input[@name='email']", "juan.perez@example.com");
        page.selectOption("//select[@name='motivo']", new SelectOption().setLabel("Reclamo"));
        page.click("text=Rojo");
        page.fill("//input[@name='fecha']", "2026-07-16");
        page.fill("//input[@name='asunto']", "Esto es un asunto de prueba");
        page.fill("//textarea[@name='mensaje']", "Mensaje de prueba");
        page.click("//button[@type='submit']");
    }

    @Then("I should see the success message")
    public void verifySuccessMessage() {
        Locator successMessage = page.locator("h3:has-text('Formulario enviado')");
        Assert.assertTrue("Success message is not visible", successMessage.isVisible());
    }

    @When("I fill {string} in the {string} field")
    public void fillField(String value, String field) {
        FormPage.inputsForm(page, field).fill(value);
    }

    @When("I select {string} in the {string} field")
    public void selectField(String value, String field) {
        FormPage.selectsForm(page, field).selectOption(new SelectOption().setLabel(value));
    }

    @When("I select {string} in the favorite color")
    public void selectColorField(String color) {
        FormPage.colorForm(page, color).click();
    }

    @When("I click the {string} button")
    public void clickSubmitButton(String buttonName) {
        FormPage.buttonsForm(page, buttonName).click();
    }

    @When("I fill message {string} in the {string} field")
    public void fillMessageField(String value, String field) {
        FormPage.textAreaForm(page, field).fill(value);
    }

    @Then("I should see the success message {string}")
    public void verifySuccessMessage(String expectedMessage) {
        Locator successMessage = FormPage.finalMessage(page, expectedMessage);
        Assert.assertTrue("Success message is not visible", successMessage.isVisible());
    }

    
}
