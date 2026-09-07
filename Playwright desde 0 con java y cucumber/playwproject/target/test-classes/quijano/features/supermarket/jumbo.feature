Feature: Validation origin code

    @originCode
    Scenario: Validate that two products share the same origin code
        Given I open the url first product 40g
        And get the origin code of the first product
        When I open the url second product 80g
        And get the origin code of the second product
        Then I verify that both origin codes are the same "3033"