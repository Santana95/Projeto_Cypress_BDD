# language: pt
# ========================================================
# FUNCIONALIDADE: TESTES DE SEGURANÇA
# ========================================================
# Objetivo: Validar boas práticas de segurança na aplicação
# Critério de aceite: Proteção contra injeção, validação de entrada
#                     e armazenamento seguro de dados sensíveis
# ========================================================

@security
Funcionalidade: Segurança
  Como desenvolvedor/tester
  Eu quero validar que a aplicação é segura
  Para proteger os dados dos usuários

  @TEST_SEC_001 @security @input-validation
  Cenario: Campo de senha não exibe texto em plano
    Dado que eu estou na tela de login
    Entao o campo de senha deve ter tipo "password"

  @TEST_SEC_002 @security @input-validation
  Cenario: Campo de email tem validação adequada
    Dado que eu estou na tela de login
    Quando eu preencho o campo email com "<email>"
    Entao devo ver mensagem de validação

  @TEST_SEC_003 @security @injection
  Esquema do Cenario: Proteção contra SQL Injection no login
    Dado que eu estou na tela de login
    Quando eu preencho o campo email com "<payload>"
    E clico em Login
    Entao devo ver mensagem de erro
    E o sistema não deve expor detalhes do banco de dados

    Exemplos:
    | payload           |
    | admin' OR '1'='1  |
    | admin' --         |
    | ' OR 1=1 --       |

  @TEST_SEC_004 @security @xss
  Esquema do Cenario: Proteção contra XSS no registro
    Dado que eu estou na tela de registro
    Quando eu preencho o campo nome com "<payload>"
    E preencho o campo email com "teste@exemplo.com"
    E preencho o campo senha com "senha123"
    E clico em Registrar
    Entao o payload não deve ser executado
    E o conteúdo deve ser escapado corretamente

    Exemplos:
    | payload                            |
    | <script>alert('XSS')</script>      |
    | <img src=x onerror="alert('xss')"> |
    | <svg onload="alert('xss')">        |

  @TEST_SEC_005 @security @storage
  Cenario: Senha não é armazenada em localStorage
    Dado que eu estou na tela de login
    Quando eu preencho o campo email com "usuario@exemplo.com"
    E preencho o campo senha com "senhaValida123"
    E clico em Login
    Entao a senha NÃO deve estar armazenada em localStorage
    E a senha NÃO deve estar armazenada em sessionStorage

  @TEST_SEC_006 @security @validation
  Esquema do Cenario: Validação de força de senha no registro
    Dado que eu estou na tela de registro
    Quando eu preencho o campo nome com "Teste User"
    E preencho o campo email com "teste@exemplo.com"
    E preencho o campo senha com "<senha>"
    E clico em Registrar
    Entao <resultado>

    Exemplos:
    | senha          | resultado                           |
    |                | devo ver erro "senha obrigatória"   |
    | 123            | devo ver erro "mínimo 6 caracteres" |
    | senhaValida123 | registro deve ser bem-sucedido      |

  @TEST_SEC_007 @security @headers
  Cenario: Validar headers de segurança HTTP
    Dado que eu estou na tela de login
    Entao a aplicação deve ter headers de segurança adequados
    E o header "X-Content-Type-Options" deve ser "nosniff"
    E o header "X-Frame-Options" deve estar presente

  @TEST_SEC_008 @security @https
  Cenario: Aplicação deve usar HTTPS
    Dado que eu acesso a aplicação
    Entao a URL deve usar protocolo HTTPS

  @TEST_SEC_009 @security @brute-force
  Cenario: Proteção contra brute force no login
    Dado que eu estou na tela de login
    Quando eu clico em Login "5" vezes com credenciais inválidas
    Entao devo ser informado que excedi o limite de tentativas
    E a aplicação deve bloquear o acesso temporariamente
