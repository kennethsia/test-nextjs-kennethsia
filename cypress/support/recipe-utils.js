// Utility to generate a random recipe using faker and fixture
import { faker } from '@faker-js/faker';

Cypress.Commands.add('generateRecipe', () => {
  cy.fixture('recipe').then((fixture) => {
    const title = faker.commerce.productName() + ' ' + Date.now();
    const cardTestId = `recipe-card-${title.replace(/\s+/g, '-').toLowerCase()}`;
    return {
      name: fixture.user.name,
      email: fixture.user.email,
      title,
      description: faker.lorem.sentence(),
      ingredients: faker.lorem.words(5),
      instructions: faker.lorem.sentences(2),
      cardTestId,
    };
  });
});
