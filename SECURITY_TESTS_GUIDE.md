/**
 * GUIA: TESTES DE SEGURANÇA BÁSICOS
 * ===================================
 * 
 * Este documento explica os principais tipos de testes de segurança
 * que você pode realizar com Cypress.
 * 
 * 1. SQL INJECTION
 * ================
 * O que é: Tentativa de inserir código SQL malicioso em campos de entrada
 * para acessar ou modificar dados do banco de dados.
 * 
 * Exemplo malicioso:
 *   Email: admin' OR '1'='1
 *   Esperado: Login falha ou mostra erro apropriado
 * 
 * Como testar:
 * - Tentar logins com strings de SQL injection comuns
 * - Verificar que a aplicação rejeita ou não expõe dados sensíveis
 * - Validar mensagens de erro (não devem revelar estrutura do DB)
 * 
 * 
 * 2. CROSS-SITE SCRIPTING (XSS)
 * ==============================
 * O que é: Injeção de código JavaScript malicioso que é executado
 * no navegador de outros usuários.
 * 
 * Exemplo malicioso:
 *   Nome: <script>alert('XSS')</script>
 *   Esperado: O script não é executado e o texto é escapado
 * 
 * Como testar:
 * - Inserir tags <script> em campos de entrada
 * - Inserir event handlers: <img src=x onerror="alert('xss')">
 * - Verificar que o conteúdo é escapado corretamente
 * - Validar que alerts ou eventos não são disparados
 * 
 * 
 * 3. CAMPOS SENSÍVEIS (Password)
 * ===============================
 * O que é: Garantir que campos de senha têm tipo "password"
 * para não aparecer em texto plano.
 * 
 * Como testar:
 * - Verificar que input type="password" (não type="text")
 * - Confirmar que o valor não é visível no HTML
 * - Testar que browser não oferece autocomplete inadequado
 * 
 * 
 * 4. VALIDAÇÃO DE EMAIL
 * =====================
 * O que é: Garantir que apenas emails válidos são aceitos
 * 
 * Emails inválidos para testar:
 * - (vazio)
 * - teste
 * - teste@
 * - teste@dominio
 * - teste@.com
 * - teste..duplo@dominio.com
 * 
 * 
 * 5. FORÇA DE SENHA
 * =================
 * O que é: Validar requisitos mínimos de senha
 * 
 * Validações comuns:
 * - Mínimo de caracteres (geralmente 6-12)
 * - Deve conter maiúsculas
 * - Deve conter números
 * - Deve conter caracteres especiais
 * 
 * 
 * 6. RATE LIMITING
 * =================
 * O que é: Proteger contra brute force (múltiplas tentativas de login)
 * 
 * Como testar:
 * - Fazer múltiplas tentativas de login falhadas
 * - Verificar se o sistema bloqueia/atrasa após N tentativas
 * - Validar se há mensagem de \"tente novamente mais tarde\"
 * 
 * 
 * 7. PROTEÇÃO CSRF (Cross-Site Request Forgery)
 * ===============================================
 * O que é: Evitar requisições não autorizadas originadas de outros sites
 * 
 * Como testar:
 * - Verificar se o formulário tem token CSRF
 * - Testar alteração do token invalida requisição
 * - Verificar se métodos POST/PUT/DELETE têm proteção
 * 
 * 
 * 8. HTTPS & HEADERS DE SEGURANÇA
 * ================================
 * O que é: Garantir conexão segura e headers apropriados
 * 
 * Como testar:
 * - Verificar se URL começa com https://
 * - Testar headers de segurança:
 *   • X-Frame-Options
 *   • X-Content-Type-Options
 *   • Strict-Transport-Security
 *   • Content-Security-Policy
 * 
 * 
 * 9. ARMAZENAMENTO SEGURO
 * =======================
 * O que é: Verificar que dados sensíveis não ficam no localStorage/sessionStorage
 * 
 * Como testar:
 * - Após login, verificar que senhas NÃO estão em localStorage
 * - Verificar que tokens são httpOnly (não acessíveis via JS)
 * - Validar que dados sensíveis são limpos no logout
 * 
 * 
 * 10. VALIDAÇÃO DO LADO DO CLIENTE vs SERVIDOR
 * ==============================================
 * O que é: Garantir validações também no servidor, não apenas no cliente
 * 
 * Como testar com Cypress:
 * - Desabilitar validação JavaScript
 * - Tentar enviar dados inválidos diretamente
 * - Verificar que servidor rejeita
 * 
 * Exemplo:
 *   cy.get('input').then(el => el.removeAttribute('required'));
 *   cy.get('form').submit();
 */

// EXEMPLOS PRÁTICOS DE TESTES EM CYPRESS
// =======================================

// Exemplo 1: Testar SQL Injection
export const sqlInjectionPayloads = [
  "admin' OR '1'='1",
  "admin' --",
  "' OR 1=1 --",
  "admin' /*",
  "' or 'a'='a",
];

// Exemplo 2: Testar XSS
export const xssPayloads = [
  "<script>alert('XSS')</script>",
  "<img src=x onerror=\"alert('xss')\">",
  "<svg onload=\"alert('xss')\">",
  "<body onload=\"alert('xss')\">",
  "javascript:alert('xss')",
  "<iframe src=\"javascript:alert('xss')\"></iframe>",
];

// Exemplo 3: Emails inválidos
export const invalidEmails = [
  "",
  "teste",
  "teste@",
  "teste@dominio",
  "teste@.com",
  "teste..duplo@dominio.com",
  "teste @dominio.com",
];

// Exemplo 4: Senhas fracas
export const weakPasswords = [
  "",
  "1",
  "12345",
  "123",
  "pass",
  "abc",
];

// Exemplo 5: Senhas fortes (exemplo de validação)
export const strongPasswords = [
  "SenhaForte123!",
  "P@ssw0rd2024",
  "MySecure#Pass123",
];
