/// <reference types="cypress" />
import { setUser } from "../../../src/redux/features/userSlice";

describe("Authorization tests", () => {
  // Arrange
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(550, 750);
  });

  it("User types wrong credentials", () => {
    //Act
    cy.get('input[name="email"]').type("wrong@wrong.dk");
    cy.get('input[name="password"]').type("12345678");
    cy.get("form#login-form").submit();
    cy.contains("Invalid login details");
  });

  it("User types correct credentials", () => {
    //Act
    cy.get('input[name="email"]').type("tester@alper.dk");
    cy.get('input[name="password"]').type("12345678");
    cy.get("form#login-form").submit();
    cy.url().should("include", "/map");
  });
});
