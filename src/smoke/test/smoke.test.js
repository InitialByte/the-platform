describe('1. Main behavior.', () => {
  const homeRoute = '/';

  it('1.0: should show login popup;', () => {
    cy.visit(homeRoute);

    cy.get('#app').should('exist');
    cy.get('[class*=Container-root-]').should('exist');
  });
});
