Feature: Examples range

    @range
    Scenario: Range value
        Given I open url page "Elementos Variados"
        When I move the range slider to the value "70"
        Then I verify the value of the range slider is "70"