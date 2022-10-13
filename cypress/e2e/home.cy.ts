import { USER_TYPE } from '../../const';

describe('home page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('Contain 4 type of customer', () => {
    cy.get('[data-cy="customers"] a').should('have.length', 4)
  });

  it('Navigate to checkout for default user', () => {
    cy.get('[data-cy="default-customer"]').click();
    cy.url().should('include', `/checkout?userType=${USER_TYPE.DEFAULT}`);
  });

  it('Navigate to checkout for Microsoft user', () => {
    cy.get('[data-cy="microsoft-customer"]').click();
    cy.url().should('include', `/checkout?userType=${USER_TYPE.MICROSOFT}`);
  });

  it('Navigate to checkout for Facebook user', () => {
    cy.get('[data-cy="facebook-customer"]').click();
    cy.url().should('include', `/checkout?userType=${USER_TYPE.FACEBOOK}`);
  });

  it('Navigate to checkout for Amazon user', () => {
    cy.get('[data-cy="amazon-customer"]').click();
    cy.url().should('include', `/checkout?userType=${USER_TYPE.AMAZON}`);
  });
})