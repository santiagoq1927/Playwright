Feature: complete checkout in Saucedemo homepage

    @critical @smoke
    Scenario: Successful E2E adding a product
     Given a user is on login successful SauceDemo website
     And select a product select a product from the pull then select the shopping cart
     When select the checkout option
     And enter the information "firstname", "lastname" and "postalcode" then select continue
     Then the order details are displayed then select finish
     And displays an order confirmation message