@ui
Feature: Login
  As a registered user
  I want to sign in
  So that I can view the products dashboard

  Scenario: Log in with valid credentials
    Given I am on the login page
    When I log in as the standard user
    Then I should see the "Products" dashboard
