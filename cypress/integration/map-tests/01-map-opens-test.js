/// <reference types="cypress" />
import { setUser } from "../../../src/redux/features/userSlice";

describe("Map tests", () => {
  // Arrange
  beforeEach(() => {
    cy.viewport(550, 750);
    cy.visit("/");
  });

  it("It should open and display the map correctly", () => {
    //Act
    cy.window()
      .its("store")
      .invoke(
        "dispatch",
        setUser({
          id: 87,
          name: "Alper Altay",
          email: "alp@ida.dk",
          email_verified_at: null,
          created_at: "2022-05-09T13:07:23.000000Z",
          updated_at: "2022-05-13T09:12:04.000000Z",
          phone: "53832812",
          license_plate: null,
          type: null,
          fuel_type: null,
        })
      );

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        cy.expect(state.map.restrictions).to.equal(null);
      });
  });
});
