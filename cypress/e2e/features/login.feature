Feature: Login
  me as a customer
  want to login to the application
  To place a purchase order

  Background: Access login screen
    Given I am on login screen

  Scenario: Login with empty email field    
    When I click on Login
    Then I see the message "E-mail inválido."

  Scenario: Login with invalid email field    
    And I fill invalid e-mail
    When I click on Login
    Then I see the message "E-mail inválido."

  Scenario: Login with empty password field
    And I fill e-mail 
    When I click on Login
    Then I see the message "Senha inválida."

  Scenario: Login with invalid password field
    And I fill e-mail 
    And I fill invalid password
    When I click on Login
    Then I see the message "Senha inválida."

  Scenario: login successfully
    And I fill my credentials 
    When I click on Login
    Then I see success message "Login realizado"