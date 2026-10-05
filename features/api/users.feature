@api
Feature: Users API
  As an API client
  I want to manage users
  So that user records can be retrieved and created

  Scenario: Retrieve the users list
    When I request the users list
    Then the users response should contain at least one user

  Scenario: Create a user
    When I create a user using the test data
    Then the user should be created successfully
