/// <reference types="cypress" />

describe("Desktop view tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads and shows mobile only view", () => {
    cy.contains("Parkii.dk is only available trough a mobile device");
  });

  it("map should be null", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        cy.expect(state.map.restrictions).to.equal(null);
      });
  });
  it("user should be null", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        cy.expect(state.user.user).to.equal(null);
      });
  });
});
