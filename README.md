# Cypress SDET Starter

Starter kit profissional para automação E2E com Cypress + TypeScript e demo app local em Express. O objetivo é demonstrar boas práticas reais de SDET: arquitetura clara, testes estáveis, CI funcional e documentação voltada a portfólio.

## Visão geral (para recrutador)

- **Automação E2E sustentável**: custom commands, page objects enxutos, fixtures e intercepts.
- **App de demonstração local**: login, dashboard e APIs simuladas, tudo rodando localmente.
- **CI pronta**: pipeline de lint + Cypress headless com artefatos em falha.
- **Qualidade**: ESLint + Prettier + Husky + lint-staged.

## Stack e por quê

- **Node.js + Express**: demo app leve, sem dependências externas.
- **Cypress + TypeScript**: testes E2E e API com tipagem e DX moderna.
- **Mochawesome**: relatório HTML/JSON para execução headless.
- **GitHub Actions**: CI simples e confiável.

## Como rodar localmente

```bash
npm ci
npm run demo:start
```

Em outra aba, execute:

```bash
npm run cy:open
```

Para rodar em modo headless:

```bash
npm run cy:run
```

Para validar tudo de uma vez:

```bash
npm run test
```

## Como rodar no CI (localmente)

```bash
npm run ci
```

Esse script levanta o server local e executa o Cypress headless com retries habilitados.

## Estrutura de pastas

```
.
├── apps/demo
│   ├── server.js
│   └── public
├── cypress
│   ├── e2e
│   │   ├── api
│   │   └── ui
│   ├── fixtures
│   ├── pages
│   ├── support
│   └── utils
├── .github/workflows/ci.yml
```

## Convenções

- **Seletores**: sempre use `data-cy` (evita testes frágeis).
- **Naming**: `*.cy.ts` para specs e nomes descritivos nos testes.
- **Flakiness**: sem `wait` fixo; use `cy.intercept` + aliases + assertions.
- **Page Objects**: apenas quando houver ganho real (login e dashboard neste repo).

## Como escrever novos testes

1. Crie um spec em `cypress/e2e/ui` ou `cypress/e2e/api`.
2. Reutilize fixtures em `cypress/fixtures`.
3. Use `cy.selectByCy()` para seleção estável.
4. Use `cy.intercept()` para controlar dependências de API.

Exemplo rápido:

```ts
cy.intercept('GET', '/api/items', { fixture: 'items.json' }).as('getItems');
cy.visit('/dashboard');
cy.wait('@getItems');
cy.selectByCy('item-row').should('have.length', 3);
```

## Relatórios

Após `npm run cy:run`, os relatórios ficam em:

- `cypress/reports/*.html`
- `cypress/reports/*.json`

## Troubleshooting

- **Porta 3000 ocupada**: finalize o processo ou use `PORT=3001 npm run demo:start` e ajuste `baseUrl` no `cypress.config.ts`.
- **Cypress não abre**: verifique permissões de display no seu sistema.
- **Falha no CI**: veja artefatos de screenshots, vídeos e reports enviados pelo workflow.

## Licença

MIT. Veja o arquivo [LICENSE](LICENSE).
