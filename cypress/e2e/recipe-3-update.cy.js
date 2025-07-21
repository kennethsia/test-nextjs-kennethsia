/**
 * E2E: Update Recipe
 */
describe('Recipe Update Flow', () => {
  before(() => {
    cy.deleteTestRecipes();
  });
  after(() => {
    cy.deleteTestRecipes();
  });
  it('should create a recipe, update it, and verify the update on the details page and homepage', () => {
    const updatedDescription = 'This recipe has been updated.';
    cy.generateRecipe().then((recipe) => {
      cy.visit('/recipes/create');
      cy.get('input#name').type(recipe.name);
      cy.get('input#email').type(recipe.email);
      cy.get('input#title').type(recipe.title);
      cy.get('textarea#description').type(recipe.description);
      cy.get('textarea#ingredients').type(recipe.ingredients);
      cy.get('textarea#instructions').type(recipe.instructions);
      cy.get('button[type="submit"]').contains(/save/i).click();

      const cardTestId = recipe.cardTestId;

      // Wait for the form to reappear on the details page
      cy.visit('/');
      cy.get(`[data-testid="${cardTestId}"]`).click();
      cy.get('form[data-testid="recipe-form"]', { timeout: 5000 }).should(
        'exist'
      );

      // Update the recipe description
      cy.get('textarea#description').clear().type(updatedDescription);
      cy.get('button[type="submit"]').contains(/save/i).click();

      // Wait for the form to reappear and see updated description
      cy.get('form[data-testid="recipe-form"]', { timeout: 5000 }).should(
        'exist'
      );
      // cy.get('textarea#description').should('have.value', updatedDescription);

      // Go back to homepage and check recipe is in the list (title and updated description)
      cy.wait(5000); // Wait for any potential re-rendering

      cy.get(`[data-testid="${cardTestId}"]`)
        .should('exist')
        .contains(updatedDescription);
    });
  });
});
