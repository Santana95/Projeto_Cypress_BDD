# ========================================================
# FUNCIONALIDADE: REGISTRO DE USUÁRIOS
# ========================================================
# Objetivo: Validar o fluxo de cadastro de novos usuários
# Critério de aceite: Validar campos obrigatórios, formato de email
#                     requisitos de senha e sucesso do cadastro
# ========================================================

Funcionalidade: Registro de Usuários
  Como um cliente
  Quero me registrar na aplicação
  Para fazer um pedido de compra

  Pano de fundo: Acessar tela de registro
    Dado que estou na tela de registro

  @TEST_CT001 @Register @validation
  Cenário: Campo nome vazio
    Quando clico em registrar
    Então vejo a mensagem "O campo nome deve ser prenchido" no registro

  @TEST_CT002 @Register @validation
  Cenário: Campo e-mail vazio
    E preencho o nome
    Quando clico em registrar
    Então vejo a mensagem "O campo e-mail deve ser prenchido corretamente" no registro

  @TEST_CT003 @Register @validation
  Cenário: Campo e-mail inválido
    E preencho o nome
    E preencho um e-mail inválido no registro
    Quando clico em registrar
    Então vejo a mensagem "O campo e-mail deve ser prenchido corretamente" no registro

  @TEST_CT004 @Register @validation
  Cenário: Campo senha vazio
    E preencho o nome
    E preencho o e-mail no registro
    Quando clico em registrar
    Então vejo a mensagem "O campo senha deve ter pelo menos 6 dígitos" no registro 

  @TEST_CT005 @Register @validation
  Cenário: Campo senha inválido
    E preencho o nome
    E preencho o e-mail no registro
    E preencho uma senha inválida no registro
    Quando clico em registrar
    Então vejo a mensagem "O campo senha deve ter pelo menos 6 dígitos" no registro

  @TEST_CT006 @Register @smoke
  Cenário: Registro realizado com sucesso
    E preencho meus dados para registro
    Quando clico em registrar
    Então vejo a mensagem de sucesso "Cadastro realizado!" no registro