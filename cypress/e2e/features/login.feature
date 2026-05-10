# language: pt

@login
Funcionalidade: Login
    Como um cliente
    Eu quero realizar login na aplicação
    Para que eu possa fazer pedidos de compra

    Contexto: Acessar tela de login
        Dado que eu estou na tela de login

    @ct01
Esquema do Cenario: Login com email invalido
Quando eu preencho o campo email com "<email>"
E clico em Login
Entao devo ver a mensagem de erro "E-mail inválido."

Exemplos:
| email         |
|               |
| email-invalido|
| teste@        |
| @semdominio   |

    @ct02
Esquema do Cenario: Login com senha invalida
Quando eu preencho o campo email com "usuario@exemplo.com"
E preencho o campo senha com "<senha>"
E clico em Login
Entao devo ver a mensagem de erro "Senha inválida."

Exemplos:
      | id    | senha      |
      | CT004 |            |
      | CT005 | 123        |
| abc    |
| senhacurta |

    @ct05
    Cenario: Login com sucesso
        Quando eu preencho o campo email com "usuario@exemplo.com"
        E preencho o campo senha com "senhaValida123"
        E clico em Login
        Entao devo ver a mensagem de sucesso "Login realizado"