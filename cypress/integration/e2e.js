describe('E2E', () => {
  it('Visits the app', () => {
    cy.visit('/');
    cy.get('.Title__title').should('contain', 'Articles');
    cy.get('.Article').should('have.length', 3);
  });

  it('Filters articles', () => {
    cy.visit('/');
    cy.get('[name=title]').type('1');
    cy.get('.Article').should('have.length', 1);
    cy.get('[name=title]').clear();
    cy.get('[name=category]').select('1');
    cy.get('.Article').should('have.length', 2);
    cy.get('[name=category]').select('');
    cy.get('[name=published][value=draft]').check();
    cy.get('.Article').should('have.length', 1);
  });

  it('Go to add page', () => {
    cy.visit('/');
    cy.get('.Title__button').click();
    cy.location('pathname').should('eq', '/article');
    cy.get('.Title__title').should('contain', 'Add new article');
  });

  it('Add article', () => {
    cy.visit('/article');
    cy.get('[name=title]').type('Article 4');
    cy.get('[name=category]').select('2');
    cy.get('[name=content]').type('This is a test.');
    cy.get('[name=published]').check();
    cy.get('.ArticleForm__button').click();
    cy.location('pathname').should('eq', '/article/4');
    cy.get('.Title__title').should('contain', 'Edit article (4)');
    cy.get('.Title__button').click();
    cy.location('pathname').should('eq', '/');
    cy.get('.Article').should('have.length', 4);
  });

  it('Go to edit page', () => {
    cy.visit('/');
    cy.get('.Article').eq(3).find('.Article__link').eq(0).click();
    cy.location('pathname').should('eq', '/article/4');
    cy.get('.Title__title').should('contain', 'Edit article (4)');
    cy.get('[name=content]').should('contain', 'This is a test.');
  });

  it('Edit article', () => {
    cy.visit('/article/4');
    cy.get('[name=category]').select('1');
    cy.get('.ArticleForm__button').click();
    cy.get('.Title__button').click();
    cy.location('pathname').should('eq', '/');
    cy.get('.Article').eq(3).find('.Article__cell').eq(1).should('contain', 'News');
  });

  it('Remove article', () => {
    cy.visit('/');
    cy.get('.Article').eq(3).find('.Article__link').eq(1).click();
    cy.get('.Article').should('have.length', 3);
  });

  it('Visits the app with fixtures', () => {
    cy.server();
    cy.route('/categories', 'fixture:getCategories.json').as('getCategories');
    cy.route('/articles', 'fixture:getArticles.json').as('getArticles');
    cy.visit('/');
    cy.get('.Article').should('have.length', 2);
  });
});
