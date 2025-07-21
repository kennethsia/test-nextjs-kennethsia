# Cypress E2E Test Report

## Latest Results (Mochawesome)

Cypress E2E tests are run using the Mochawesome reporter. Below is the latest summary:

```
Spec                                              Tests  Passing  Failing  Pending  Skipped  Duration
────────────────────────────────────────────────────────────────────────────────────────────────────
✔  recipe-1-create.cy.js                    1      1        0        0        0        ~3s
✔  recipe-2-read.cy.js                      1      1        0        0        0        ~4s
✔  recipe-3-update.cy.js                    1      1        0        0        0        ~10s
✔  recipe-4-delete.cy.js                    1      1        0        0        0        ~4s
────────────────────────────────────────────────────────────────────────────────────────────────────
✔  All specs passed!                        4      4        0        0        0        ~23s
```

- Full HTML and JSON reports are generated in `cypress/reports/` after running Cypress with Mochawesome.
- Open `cypress/reports/mochawesome.html` in your browser for a detailed, interactive report.

## How to Generate This Report

Run all E2E tests and generate a Mochawesome report:

```bash
npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports,overwrite=false,html=true,json=true
```

Or use the provided npm script (if available):

```bash
npm run e2e:report
```

## Example Report Location

- HTML: `cypress/reports/mochawesome.html`
- JSON: `cypress/reports/mochawesome.json`
