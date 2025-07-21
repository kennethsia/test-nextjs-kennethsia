/**
 * E2E: Delete Recipe
 */
describe('Recipe Delete Flow', () => {
  before(() => {
    cy.deleteTestRecipes();
  });
  after(() => {
    cy.deleteTestRecipes();
  });
  it('should create, display, delete a recipe and verify it is removed from the list', () => {
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
      cy.visit('/');
      cy.get(`[data-testid="${recipe.cardTestId}"]`).should('exist').click();
      cy.url().should('match', /\/recipes\/[0-9]+$/);
      cy.get('button')
        .contains(/delete/i)
        .click();
      cy.visit('/');
      cy.get(`[data-testid="${recipe.cardTestId}"]`).should('not.exist');
    });
  });
});
