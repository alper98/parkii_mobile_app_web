/// <reference types="cypress" />
import { setUser } from "../../../src/redux/features/userSlice";

describe("Route tests", () => {
  beforeEach(() => {
    cy.viewport(550, 750);
  });

  it("Redirects to login, if user is not set, when trying to access restricted route", () => {
    cy.visit("/map");
    cy.contains("Log in");
  });

  it("Redirects to correct page, if user is set, when trying to access restricted route", () => {
    cy.visit("/map");
  });
});
