describe("Register Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("first name error", () => {
    cy.findByRole("textbox", {
      name: /first name/i,
    })
      .click()
      .blur();

    expect(cy.findByTestId("firstname-register-form-error"));
  });
});
