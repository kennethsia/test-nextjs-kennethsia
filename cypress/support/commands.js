// Utility commands for cleaning up test recipes
Cypress.Commands.add('deleteTestRecipes', () => {
  const jsonServerUrl = Cypress.env('jsonServerUrl');
  cy.fixture('recipe').then((fixture) => {
    const testEmail = fixture.user.email;
    cy.request('GET', jsonServerUrl).then((response) => {
      const recipes = response.body;
      recipes.forEach((recipe) => {
        // Delete any recipe created by the test user (faker or static)
        if (recipe.email === testEmail) {
          cy.request('DELETE', `${jsonServerUrl}/${recipe.id}`);
        }
      });
    });
  });
});
