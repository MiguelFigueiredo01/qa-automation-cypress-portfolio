# QA Automation Cypress Portfolio

![CI](https://github.com/SEU_USUARIO/qa-automation-cypress-portfolio/actions/workflows/ci.yml/badge.svg)

Portfólio profissional de automação E2E com Cypress, incluindo uma aplicação demo local em Node.js + Express. Este repositório demonstra boas práticas de testes, organização em Page Objects, comandos customizados, uso de fixtures e intercepts, além de pipeline CI com relatórios e artifacts.

## Visão geral
Este projeto foi pensado para recrutadores e líderes técnicos que buscam avaliar maturidade em automação. Ele entrega:
- App local e isolada (zero dependências externas).
- Testes E2E e API em JavaScript.
- Boas práticas: data-cy, intercepts, sem `cy.wait` fixo.
- CI com lint, Cypress headless e artifacts em caso de falha.

## Stack e decisões
- **Cypress** para testes E2E e API (JavaScript, CommonJS).
- **Express** para app demo local.
- **Mochawesome** como reporter leve em JSON (outputs em `reports/`).
- **ESLint + Prettier** para padronização.
- **start-server-and-test** para orquestrar servidor + Cypress em CI e local.

## Como rodar localmente
1. Instale as dependências:
   ```bash
   npm ci
   ```
2. Suba o app demo:
   ```bash
   npm run demo:start
   ```
3. Em outro terminal, execute os testes:
   ```bash
   npm run cy:run
   ```

### Execução completa (lint + server + Cypress)
```bash
npm run ci
```

## Scripts disponíveis
- `npm run demo:start` — inicia o servidor Express em `http://localhost:3000`.
- `npm run cy:open` — abre o Cypress UI.
- `npm run cy:run` — executa Cypress headless.
- `npm run lint` — executa ESLint.
- `npm run format` — aplica Prettier.
- `npm run test` — lint + execução completa.
- `npm run ci` — sobe o server e roda Cypress headless.

## Estrutura de pastas
```
.
├── apps
│   └── demo
│       ├── public
│       └── server.js
├── cypress
│   ├── e2e
│   │   ├── api
│   │   └── ui
│   ├── fixtures
│   ├── pages
│   ├── support
│   └── utils
├── reports
└── .github/workflows
```

## Convenções adotadas
- **data-cy:** todos os elementos usados nos testes possuem `data-cy`.
- **Sem waits fixos:** usamos `cy.intercept` + `cy.wait('@alias')`.
- **Page Objects:** encapsulam interações da UI.
- **Custom Commands:** `cy.selectByCy` e `cy.loginViaApi`.

## Como adicionar novos testes
1. Crie um spec em `cypress/e2e/ui` ou `cypress/e2e/api`.
2. Utilize fixtures em `cypress/fixtures` quando possível.
3. Centralize seletores em `cypress/utils/selectors.js`.
4. Use Page Objects para fluxos de UI reutilizáveis.

## Troubleshooting
- **Erro de porta ocupada:** finalize processos em `3000` antes de rodar.
- **Cypress não abre:** remova `node_modules` e rode `npm ci` novamente.
- **Falhas flakey:** confirme que está usando intercepts e asserts, sem `cy.wait` fixo.

## Sobre o repositório (GitHub About)
**Descrição sugerida:**
Portfólio de automação E2E com Cypress, app demo local e CI completo.

**Topics sugeridos:**
`cypress`, `qa`, `automation`, `e2e`, `testing`, `javascript`, `express`, `ci`, `mochawesome`, `portfolio`

---

> **Nota:** lembre-se de atualizar o badge do CI substituindo `SEU_USUARIO` pelo seu usuário/organização no GitHub.
