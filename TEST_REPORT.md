# Test & Coverage Report

## Jest Test Results

All tests are run using Jest. Below is the latest summary:

```
Test Suites: 15 passed, 15 total
Tests:       53 passed, 53 total
Snapshots:   0 total
Time:        ~2 s
```

## Coverage Summary

```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |   95.12 |    82.14 |   91.23 |   95.12 |
 app/actions           |      80 |    88.23 |     100 |      80 |
  recipes.ts           |   73.39 |    91.66 |     100 |   73.39 | 21-49
  upload.ts            |     100 |       80 |     100 |     100 | 33
 components            |   99.26 |    76.47 |   95.23 |   99.26 |
  AddRecipe.tsx        |     100 |      100 |     100 |     100 |
  ErrorComponent.tsx   |     100 |      100 |     100 |     100 |
  FavoriteButton.tsx   |   96.49 |    66.66 |     100 |   96.49 | 34-35
  FavoritesFilter.tsx  |     100 |      100 |     100 |     100 |
  ImageViewer.tsx      |   95.71 |    77.77 |      80 |   95.71 | 26-28
  LoadingComponent.tsx |     100 |      100 |     100 |     100 |
  OrderByAscDesc.tsx   |     100 |       75 |     100 |     100 | 20
  RecipeCard.tsx       |     100 |      100 |     100 |     100 |
  RecipeForm.tsx       |     100 |       50 |     100 |     100 | 76-135
  Search.tsx           |     100 |      100 |     100 |     100 |
  SortBy.tsx           |     100 |    66.66 |     100 |     100 | 20
 lib                   |   95.00 |     100  |    100  |   95.00 |
  client.ts            |   95.00 |     100  |    100  |   95.00 | 18
 models                |     100 |      100 |     100 |     100 |
  index.ts             |     100 |      100 |     100 |     100 |
 utils                 |   94.59 |    88.88 |   66.66 |   94.59 |
  helpers.ts           |   94.59 |    88.88 |   66.66 |   94.59 | 36-37
-----------------------|---------|----------|---------|---------|-------------------
```

- For detailed coverage, see the `coverage/lcov-report/index.html` file after running `npm test` or `npx jest --coverage`.
- JUnit XML report is generated as `junit.xml` in the project root.
