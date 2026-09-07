Feature: Examples clicks

    @selectValue
    Scenario: Select value
        Given I open the url page "Elementos Variados"
        When I select the value "21 a 30 - A agarrar la pala!" from the dropdown
        Then I verify the selected value is "21 a 30 - A agarrar la pala!"