# Recipe Book App

A Next.js app for managing and sharing recipes. Features include Recipe CRUD, Recipe listing and filtering. Built with TypeScript, Material UI, React Hook Form, Zod and a JSON server backend.

## Features

- View a list of recipes with images and details
- Search and sort recipes list of recipes using query params for better sharing and bookmarking capabilities without complicating internal local state
- Add new recipes via a form with frontend validation on change
- Edit and delete existing recipes
- Mark recipes as favorites and filter by favorites

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the JSON server backend in a seprate terminal:**

   ```bash
   npm run start-server
   # or
   npx json-server --watch db.json --port 3111
   ```

3. **Run the Next.js development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Next.js app directory (pages, layout, actions)
- `src/components/` — UI components (RecipeCard, AddRecipe, FavoriteButton, etc.)
- `src/models/` — TypeScript types and Zod schemas
- `src/utils/` — Utility functions
- `db.json` — JSON server database
- `src/__tests__/` — Unit tests for components and actions

## Testing

### Unit & Component Tests

Run all unit/component tests with:

```bash
npm test
# or
yarn test
```

### E2E Tests (Cypress)

The project uses Cypress for end-to-end (E2E) testing. E2E tests cover the full recipe CRUD flow and run against the local dev server and JSON server backend.

#### How to Run Cypress E2E Tests

1. **Start the JSON server backend:**
   ```bash
   npm run start-server
   ```
2. **Start the Next.js dev server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Run Cypress in interactive mode:**
   ```bash
   npm run e2e:open
   ```
   _or run all E2E tests headlessly:_
   ```bash
   npm run e2e
   ```

#### Run a Specific E2E Test File

```bash
npm run e2e -- --spec cypress/e2e/recipe-1-create.cy.js
```

## Tech Stack

**Frontend & App:**

- Next.js 14+
- TypeScript
- Material UI
- React Hook Form (form management)
- Zod (validation)
- Next.js Server Actions (backend interaction)

**Backend & Mock API:**

- JSON Server (mock backend)

**Testing:**

- React Testing Library & Jest (unit/component tests)
- Cypress (E2E tests)
- @faker-js/faker (random test data for E2E)

**Tooling:**

- Eslint and Prettier (lint and formatting)
