/**
 * E2E: Read/Get Recipe
 */
describe('Recipe Details', () => {
  before(() => {
    cy.deleteTestRecipes();
  });
  after(() => {
    cy.deleteTestRecipes();
  });
  it('should create a recipe and navigate to its details page', () => {
    cy.generateRecipe().then((recipe) => {
      cy.visit('/recipes/create');
      cy.get('input#name').type(recipe.name);
      cy.get('input#email').type(recipe.email);
      cy.get('input#title').type(recipe.title);
      cy.get('textarea#description').type(recipe.description);
      cy.get('textarea#ingredients').type(recipe.ingredients);
      cy.get('textarea#instructions').type(recipe.instructions);
      cy.get('button[type="submit"]').contains(/save/i).click();
      cy.url().should('match', /\/recipes\/[0-9]+$/);
      cy.get('[data-testid="recipe-form"]').should('exist');
      cy.get('input#title').should('have.value', recipe.title);
      // Optionally, check the card exists on the homepage
      cy.visit('/');
      cy.get(`[data-testid="${recipe.cardTestId}"]`).should('exist');
    });
  });
});
