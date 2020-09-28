describe('UI', () => {
  it('Homepage', () => {
    cy.visit('/');
    cy.document().toMatchImageSnapshot({
      imageConfig: {
        threshold: 20,
        thresholdType: 'pixel'
      }
    });
  });

  it('Add page', () => {
    cy.visit('/article');
    cy.document().toMatchImageSnapshot();
  });

  it('Edit page', () => {
    cy.visit('/article/1');
    cy.document().toMatchImageSnapshot();
  });
});
