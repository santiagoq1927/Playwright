Feature: Login in SauceDemo website

  Background: 
    Given a user is on login SauceDemo website

  @regression 
  Scenario: Successful login
    When enter credentials "standard_user" and "secret_sauce"
    Then display the product homepage

  @negative @regression
  Scenario Outline: Login failed
    When enter credentials "<username>" and "<password>"
    Then display error "<message>"
    Examples:
        | username       | password     |message                                                                   |
        | standard_user  |              |Epic sadface: Password is required                                        |
        |                | secret_sauce |Epic sadface: Username is required                                        |
        | incorrecto     | incorrecto   |Epic sadface: Username and password do not match any user in this service |

  @regression
  Scenario Outline: Login data drive
    When enter credentials "<username>" and "<password>"
    Then display the product homepage
    Examples:
        | username                | password      |
        | standard_user           | secret_sauce  |
        | problem_user            | secret_sauce  |
        | performance_glitch_user | secret_sauce  |      
