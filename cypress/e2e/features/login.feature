      # language: pt
      # ========================================================
      # FUNCIONALIDADE: LOGIN
      # ========================================================
      # Objetivo: Validar o fluxo de autenticação do usuário
      # Critério de aceite: Validar emails inválidos, senhas inválidas
      #                     e login bem-sucedido com credenciais válidas
      # ========================================================

      @login
      Funcionalidade: Login
      Como um cliente
      Eu quero realizar login na aplicação
      Para que eu possa fazer pedidos de compra

      Contexto: Acessar tela de login
      Dado que eu estou na tela de login

      @TEST_CT005 @Login @validation
      Esquema do Cenario: <id> Login com email invalido
      Quando eu preencho o campo email com "<email>"
      E clico em Login
      Entao devo ver a mensagem de erro "E-mail inválido."

      Exemplos:
      | id    | email          |
      | CT001 |                |
      | CT002 | email-invalido |

      @TEST_CT003 @Login @validation
      Esquema do Cenario: <id> Login com senha invalida
      Quando eu preencho o campo email com "usuario@exemplo.com"
      E preencho o campo senha com "<senha>"
      E clico em Login
      Entao devo ver a mensagem de erro "Senha inválida."

      Exemplos:
      | id    | senha |
      | CT003 |       |
      | CT004 | 123   |

      @TEST_CT005 @Login @smoke
      Cenario: Login com sucesso
      Quando eu preencho o campo email com "usuario@exemplo.com"
      E preencho o campo senha com "senhaValida123"
      E clico em Login
      Entao devo ver a mensagem de sucesso "Login realizado"