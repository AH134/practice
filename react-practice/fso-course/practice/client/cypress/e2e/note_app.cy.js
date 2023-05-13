describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "bob jones",
      username: "bob",
      password: "123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);

    cy.visit("");
    cy.wait(500);
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, Github AH134");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("user can login", function () {
    cy.contains("log in").click();
    cy.get("#username").type("bob");
    cy.get("#password").type("123");
    cy.get("#login-button").click();

    cy.contains("bob jones logged in");
  });

  it("login fails with wrong pasword", function () {
    cy.contains("log in").click();
    cy.get("#username").type("bob");
    cy.get("#password").type("321");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong Credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "bob jones logged in");
    // cy.contains("bob jones logged in").should("not.exist");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "bob", password: "123" });
    });

    describe("and several note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "first note",
          important: false,
        });
        cy.createNote({
          content: "second note",
          important: false,
        });
        cy.createNote({
          content: "third note",
          important: false,
        });
      });

      it.only("one of those can be made important", function () {
        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
