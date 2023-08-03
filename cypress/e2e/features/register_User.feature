Feature: Register
  Me as a customer
  Want to register in the application
  To place a purchase order

  Background: Access register screen
    Given I am on register screen

  Scenario: Empty name field
    When I click on register
    Then I see message "O campo nome deve ser prenchido" on register

  Scenario: Empty e-mail field
    And I fill name
    When I click on register
    Then I see message "O campo e-mail deve ser prenchido corretamente" on register

  Scenario: Invalid e-mail field
    And I fill name
    And I fill invalid e-mail register
    When I click on register
    Then I see message "O campo e-mail deve ser prenchido corretamente" on register

  Scenario: Empty password field
    And I fill name
    And I fill e-mail register
    When I click on register
    Then I see message "O campo senha deve ter pelo menos 6 dígitos" on register 

  Scenario: Invalid password field
    And I fill name
    And I fill e-mail register
    And I fill invalid password register
    When I click on register
    Then I see message "O campo senha deve ter pelo menos 6 dígitos" on register

  Scenario: login successfully
    And I fill my datas of register 
    When I click on register
    Then I see success message "Cadastro realizado!" on register