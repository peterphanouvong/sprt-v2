describe("Login Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("logs into Test account with username", () => {
    cy.findByRole("textbox", {
      name: /username or email/i,
    })
      .clear()
      .type("test");
    cy.findByLabelText(/password/i)
      .clear()
      .type("test");
    cy.findByRole("button", {
      name: /log in/i,
    }).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/feed");
    });
  });

  it("logs into Test account with email", () => {
    cy.visit("http://localhost:3000/login");

    cy.findByRole("textbox", {
      name: /username or email/i,
    })
      .clear()
      .type("test@test.com");
    cy.findByLabelText(/password/i)
      .clear()
      .type("test");
    cy.findByRole("button", {
      name: /log in/i,
    }).click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/feed");
    });
  });

  it("throws error when username/email doesn't exist", () => {
    cy.findByRole("textbox", {
      name: /username or email/i,
    })
      .clear()
      .type("zzz");
    cy.findByLabelText(/password/i)
      .clear()
      .type("zzz");
    cy.findByRole("button", {
      name: /log in/i,
    }).click();
    cy.findByText(/that username or email doesn't exist\./i);
  });

  it("throws error when password is incorrect", () => {
    cy.findByRole("textbox", {
      name: /username or email/i,
    })
      .clear()
      .type("peter");
    cy.findByLabelText(/password/i)
      .clear()
      .type("zzz");
    cy.findByRole("button", {
      name: /log in/i,
    }).click();
    cy.findByText(/incorrect password\./i);
  });
});

describe("Logout", () => {
  it("can logout", () => {
    cy.findByRole("textbox", {
      name: /username or email/i,
    })
      .clear()
      .type("test");
    cy.findByLabelText(/password/i)
      .clear()
      .type("test");
    cy.findByRole("button", {
      name: /log in/i,
    }).click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/feed");
    });

    cy.findByText(/logout/i).click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.not.eq("/feed");
    });
  });
});
