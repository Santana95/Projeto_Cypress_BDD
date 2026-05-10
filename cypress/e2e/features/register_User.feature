# ========================================================
# FUNCIONALIDADE: REGISTRO DE USUÁRIOS
# ========================================================
# Objetivo: Validar o fluxo de cadastro de novos usuários
# Critério de aceite: Validar campos obrigatórios, formato de email
#                     requisitos de senha e sucesso do cadastro
# ========================================================

Feature: Register
  As a customer
  I want to register in the application
  To place a purchase order

  Background: Access register screen
    Given I am on register screen

  @TEST_CT001 @Register @validation
  Scenario: Empty name field
    When I click on register
    Then I see message "O campo nome deve ser prenchido" on register

  @TEST_CT002 @Register @validation
  Scenario: Empty e-mail field
    And I fill name
    When I click on register
    Then I see message "O campo e-mail deve ser prenchido corretamente" on register

  @TEST_CT003 @Register @validation
  Scenario: Invalid e-mail field
    And I fill name
    And I fill invalid e-mail register
    When I click on register
    Then I see message "O campo e-mail deve ser prenchido corretamente" on register

  @TEST_CT004 @Register @validation
  Scenario: Empty password field
    And I fill name
    And I fill e-mail register
    When I click on register
    Then I see message "O campo senha deve ter pelo menos 6 dígitos" on register 

  @TEST_CT005 @Register @validation
  Scenario: Invalid password field
    And I fill name
    And I fill e-mail register
    And I fill invalid password register
    When I click on register
    Then I see message "O campo senha deve ter pelo menos 6 dígitos" on register

  @TEST_CT006 @Register @smoke
  Scenario: Register successfully
    And I fill my datas of register 
    When I click on register
    Then I see success message "Cadastro realizado!" on register