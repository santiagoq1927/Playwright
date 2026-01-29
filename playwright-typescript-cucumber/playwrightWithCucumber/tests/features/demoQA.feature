#Navigate to textbox page sucessful
Feature: Navidate to textBox page

    Background: Navigate to demoQA page
        Given the user navigate to demoQA page

    Scenario: Navigate to textBox page succesful
    When select elements opcion
    And select textbox opcion
    Then the user look title "textbox"    
