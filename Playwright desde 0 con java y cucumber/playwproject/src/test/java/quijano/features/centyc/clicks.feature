Feature: Examples clicks

    @sustained_clicks
    Scenario: Sustained clicks
        Given I open the url page clicks
        When I press the button "Click Sostenido " for "10" seconds
        Then I verify the counter increases

    @double_click
    Scenario: Double click
        Given I open the url page clicks
        When I press the button "Contador de Clicks " with double click
        Then I verify the counter the click increases

    @many_clicks
    Scenario: Many clicks
        Given I open the url page clicks
        When I press the button "Contador de Clicks " with "5" clicks
        Then I verify the counter the click increases in "5"

    @draw_clicks
    Scenario: Draw clicks
        Given I open the url page clicks
        When I am at the "Pizarra"
        Then I draw a line from x to y    