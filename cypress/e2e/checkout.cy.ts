import { USER_TYPE } from '../../const';

describe('Checkout page', () => {
  it('Load page', () => {
    cy.visit(`/checkout?userType=${USER_TYPE.DEFAULT}`);
  });

  it('Default customer checkout', () => {
    cy.visit(`/checkout?userType=${USER_TYPE.DEFAULT}`);
    cy.intercept({
      method: 'GET',
      url: '/api/items*',
    }, { fixture: 'default_items.json' }).as('getItems');

    cy.get('input[id="Small Pizza"]').type('1');
    cy.get('input[id="Medium Pizza"]').type('1');
    cy.get('input[id="Large Pizza"]').type('1');

    cy.get('[data-cy="checkout-button"]').click();

    cy.get('[data-cy="total-amount"]').should('have.text', '49.97');
  });

  it('Microsoft customer checkout', () => {
    cy.visit(`/checkout?userType=${USER_TYPE.MICROSOFT}`);
    cy.intercept({
      method: 'GET',
      url: '/api/items*',
    }, { fixture: 'microsoft_items.json' }).as('getItems');

    cy.get('input[id="Small Pizza"]').type('3');
    cy.get('input[id="Large Pizza"]').type('1');

    cy.get('[data-cy="checkout-button"]').click();

    cy.get('[data-cy="total-amount"]').should('have.text', '45.97');
  });

  it('Amazon customer checkout', () => {
    cy.visit(`/checkout?userType=${USER_TYPE.AMAZON}`);
    cy.intercept({
      method: 'GET',
      url: '/api/items*',
    }, { fixture: 'amazon_items.json' }).as('getItems');

    cy.get('input[id="Medium Pizza"]').type('3');
    cy.get('input[id="Large Pizza"]').type('1');

    cy.get('[data-cy="checkout-button"]').click();

    cy.get('[data-cy="total-amount"]').should('have.text', '67.96');
  });

  it('Facebook customer checkout', () => {
    cy.visit(`/checkout?userType=${USER_TYPE.FACEBOOK}`);
    cy.intercept({
      method: 'GET',
      url: '/api/items*',
    }, { fixture: 'facebook_items.json' }).as('getItems');

    cy.get('input[id="Small Pizza"]').type('1');
    cy.get('input[id="Medium Pizza"]').type('5');
    cy.get('input[id="Large Pizza"]').type('1');

    cy.get('[data-cy="checkout-button"]').click();

    cy.get('[data-cy="total-amount"]').should('have.text', '97.94');
  });
})