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

Run all tests with:

```bash
npm test
# or
yarn test
```

## Technologies Used

- Next.js 14+
- TypeScript
- Material UI
- React Hook Form (form management)
- Zod (validation)
- JSON Server (mock backend)
- Next.js Server Actions (backend interaction)
- React Testing Library & Jest (unit tests and component tests)
- Eslint and Prettier (lint and formatting)
