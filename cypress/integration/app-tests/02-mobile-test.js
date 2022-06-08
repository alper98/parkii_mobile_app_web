/// <reference types="cypress" />

describe("Mobile view tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(550, 750);
  });

  it("loads the login component", () => {
    cy.contains("Log in");
    cy.contains("Don't have an account? Sign Up");
  });
});
