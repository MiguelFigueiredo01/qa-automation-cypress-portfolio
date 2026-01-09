# QA Automation Cypress Portfolio

[![CI](https://github.com/MiguelFigueiredo01/qa-automation-cypress-portfolio/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/MiguelFigueiredo01/qa-automation-cypress-portfolio/actions/workflows/ci.yml)

Projeto de automação de testes E2E e API com Cypress, utilizando uma aplicação demo local em Node.js/Express para validar fluxos reais sem dependências externas.

## Como rodar localmente

```bash
npm ci
npm run demo:start
```

Em outro terminal:

```bash
npm run cy:run
```

Execução completa (lint + Cypress headless com servidor):

```bash
npm run ci
```

## Estrutura de pastas

```
apps/
  demo/              # Aplicação demo local (Node.js + Express)
    public/          # HTML/CSS/JS da UI
    src/             # Servidor e rotas da API
cypress/
  e2e/               # Testes E2E (ui e api)
  fixtures/          # Dados de teste
  pages/             # Page Objects
  support/           # Commands e setup do Cypress
  utils/             # Helpers compartilhados
.github/workflows/   # Pipeline de CI
```

## Convenções adotadas

- Seletores estáveis com `data-cy`.
- Sincronização via `cy.intercept` + aliases (sem `cy.wait` fixo).
- Page Objects para encapsular ações e elementos.
- Custom commands para reduzir repetição.

## O que este projeto demonstra

- Arquitetura de automação com separação entre UI, API e utilitários.
- Boas práticas de confiabilidade (intercepts, aliases e seletores estáveis).
- Pipeline de CI executando lint e Cypress headless.
- Aplicação demo local para testes determinísticos.

## Scripts úteis

- `npm run demo:start` — inicia a aplicação demo.
- `npm run cy:open` — abre o Cypress em modo interativo.
- `npm run cy:run` — executa os testes em headless.
- `npm run lint` — roda ESLint.
- `npm run format` — aplica Prettier.
- `npm run test` — lint + execução completa.
- `npm run ci` — servidor + Cypress headless.
