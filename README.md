# Projeto Cypress BDD 🚀

[![Cypress Tests](https://github.com/Ian%20Charlesson/Projeto_Cypress_BDD/actions/workflows/cypress.yml/badge.svg)](https://github.com/Ian%20Charlesson/Projeto_Cypress_BDD/actions/workflows/cypress.yml)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://nodejs.org/)
[![Cypress Version](https://img.shields.io/badge/cypress-%5E12.0-brightgreen)](https://cypress.io)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

Automação de testes end-to-end usando **Cypress** com **BDD (Behavior-Driven Development)** em Gherkin, focado em validar fluxos críticos de uma aplicação web de e-commerce.

## 📋 Características

- ✅ Testes BDD com Gherkin em português
- ✅ Padrão Page Object Model com Commands customizados
- ✅ Geração de dados dinâmicos com Faker
- ✅ Relatórios visuais com Mochawesome
- ✅ Suporte a múltiplos navegadores (Chrome, Firefox, Edge)
- ✅ Configuração pronta para CI/CD

## 🔧 Pré-requisitos

- **Node.js** 14+ ([Download aqui](https://nodejs.org/))
- **npm** 6+ (incluso no Node.js)
- **Git** (opcional, para clonar o repositório)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Projeto_Cypress_BDD.git
cd Projeto_Cypress_BDD
```

2. Instale as dependências:
```bash
npm install
```

## 🚀 Executando os Testes

### Modo interativo (recomendado para desenvolvimento)
```bash
npm run test:open
```
Abre o Cypress Test Runner onde você pode visualizar e debugar os testes em tempo real.

### Modo headless (recomendado para CI/CD)
```bash
npm test
```
Executa todos os testes sem abrir navegador.

### Outros comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run test:headed` | Executa testes com navegador visível |
| `npm run test:chrome` | Roda apenas no navegador Chrome |
| `npm run test:firefox` | Roda apenas no navegador Firefox |

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/
│   └── features/
│       ├── login.feature           # Testes de login
│       └── register_User.feature   # Testes de registro
├── support/
│   ├── commands_Home.js            # Commands reutilizáveis - Home
│   ├── commands_Login.js           # Commands reutilizáveis - Login
│   ├── commands_Register.js        # Commands reutilizáveis - Registro
│   ├── e2e.js                      # Configuração global de suporte
│   └── step_definitions/
│       ├── login_steps.js          # Steps para testes de login
│       └── register_steps.js       # Steps para testes de registro
├── cypress.config.js               # Configuração do Cypress
└── package.json                    # Dependências do projeto
```

## 🧪 Cenários de Teste

### Login (`login.feature`)
- ✅ Login com email inválido
- ✅ Login com senha inválida
- ✅ Login com sucesso

### Registro (em desenvolvimento)
- Validação de campos obrigatórios
- Confirmação de senha
- Sucesso no registro

## 🛠 Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/)** - Framework de automação
- **[@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)** - Suporte a BDD/Gherkin
- **[@faker-js/faker](https://fakerjs.dev/)** - Geração de dados fictícios
- **[cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)** - Relatórios visuais

## 📊 Relatórios

Após executar os testes, os relatórios são gerados automaticamente em:
```
cypress/reports/
```

Abra o arquivo `index.html` em um navegador para visualizar o relatório detalhado com:
- ✅ Taxa de sucesso/falha
- 📸 Screenshots de testes falhados
- 📈 Gráficos de performance
- 🔍 Logs detalhados de cada passo

## 🔐 Variáveis de Ambiente

1. Copie o arquivo `.env.example`:
```bash
cp .env.example .env
```

2. Preencha as variáveis no arquivo `.env`:
```env
BASE_URL=http://automationpratice.com.br
TEST_USER_EMAIL=seu-email@exemplo.com
TEST_USER_PASSWORD=sua-senha
```

⚠️ **Importante:** Nunca faça commit do arquivo `.env` com dados sensíveis!

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/melhoria`)
3. Commit suas mudanças (`git commit -m 'Adiciona melhoria'`)
4. Push para a branch (`git push origin feature/melhoria`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença **ISC**.

## 👨‍💻 Autor

**Ian Charlesson Gomes Santana**
- GitHub: [@Ian Charlesson](https://github.com/Ian%20Charlesson)
- LinkedIn: [ian-charlesson-gomes-santana](https://www.linkedin.com/in/ian-charlesson-gomes-santana-a78947b6/)
- Email: iansantana02@gmail.com

## 🔗 Links Úteis

- [Documentação Cypress](https://docs.cypress.io/)
- [BDD com Cucumber](https://cucumber.io/docs/gherkin/)
- [Faker.js Documentation](https://fakerjs.dev/)

---

**Última atualização:** Maio 2026
