Feature: login, filters with categories and sorting with price

Scenario: Unsuccessfull login with invalid credentials
    Given I should see the "login" text
    When I enter the name
    * I enter the password 
    Then I click on the login button
    And I should see a message stated as "invalid username or password"


Scenario: Unsuccessfull login with empty fields
    Given I should see the "login" text
    When I enter the name as " "
    * I enter the password as " "
    Then I click on the login button
    And I should see a message stated as "empty username and password"


Scenario: product not found within the price range
    Given I should see the "login" text
    When I enter the name as "nisha"
    * I enter the password as "Nisha@123"
    Then I click on the login button
    And I should see the home page
    When I click on the categories
    * I select the "mobile" option
    Then I see a list of mobiles
    When I enter the price as "10000" and "20000"
    Then I should not see the product within the range


#happy pass
Scenario: Successfull login with valid credentials
    Given I should see the "login" text
    When I enter the name as "nisha"
    * I enter the password as "Nisha@123"
    Then I click on the login button
    And I can see the home page
   
Scenario: Filtering data
    When I click on the categories
    * I select the "mobile" option
    Then I see a list of mobiles
    When I enter the price as 10000 and 30000
    Then I see the list of mobile within the filtered price

Scenario: Sorting the data with low to high option
    When I sort the list by clicking "low to high"
    Then the items are sorted in the ascending order

Scenario: Sorting the data with high to low option
    When I sort the list by clicking "high to low"
    Then the items are sorted in the decending order







