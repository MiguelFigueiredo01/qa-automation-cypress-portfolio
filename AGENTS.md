# Working Agreements

- Use conventional commits (feat, fix, chore, docs, test, ci).
- Run `npm run lint` and `npm run ci` before opening a PR.
- Prefer `data-cy` selectors for UI tests (never CSS classes).
- Avoid fixed waits in Cypress; use assertions and `cy.intercept` + aliases.
- Keep demo app logic simple and local (no external services).
