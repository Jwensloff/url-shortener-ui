describe('User interacting with the site from pageload', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'fake_url_data.json',
    }).as('fakeData');
    cy.visit('http://localhost:3000/');
  });

  it('should get the urls', () => {
    cy.get('h1').should('contain', 'URL Shortener');
    cy.get('form').should('exist');
    cy.get('.url-container').should('exist');
    cy.get('.url').should('have.length', 1);
    cy.get('.url').should('contain', 'Awesome photo');
    cy.get('.url').should('contain', 'http://localhost:3001/useshorturl/1');
    cy.get('.url').should(
      'contain',
      'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
    );
  });

  it('should allow a user to add a new url', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        long_url: 'https://unsplash.com/photos/atOlntWcO4k',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'Cute photo',
      },
    }).as('postUrl');
    cy.get('form').get("input[name='title']").type('Cute photo');
    cy.get('form')
      .get("input[name='title']")
      .should('have.value', 'Cute photo');
    cy.get('form')
      .get("input[name='urlToShorten']")
      .type('https://unsplash.com/photos/atOlntWcO4k');
    cy.get('form')
      .get("input[name='urlToShorten']")
      .should('have.value', 'https://unsplash.com/photos/atOlntWcO4k');
    cy.get('.submit-btn').click();
    cy.wait('@postUrl');
    cy.get('.url').should('have.length', 2);
    cy.get('.url').first().should('contain', 'Awesome photo');
    cy.get('.url').last().should('contain', 'Cute photo');
  });
});
