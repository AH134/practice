describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    const user = {
      username: "goku",
      name: "son goku",
      password: "123",
    };
    const secondUser = {
      username: "gohan",
      name: "son gohan",
      password: "123",
    };
    cy.request("POST", "http://localhost:3000/api/users", user);
    cy.request("POST", "http://localhost:3000/api/users", secondUser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.get("#login")
      .should("contain", "username")
      .and("contain", "password")
      .and("contain", "Login");
  });

  describe("Login", function () {
    it("suceeds with correct credentials", function () {
      cy.get("#username").type("goku");
      cy.get("#password").type("123");
      cy.get("#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("son goku");
      cy.get("#password").type("321");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3000/api/login", {
        username: "goku",
        password: "123",
      }).then((res) => {
        localStorage.setItem("loggedBlogListUser", JSON.stringify(res.body));
        cy.visit("http://localhost:5173");
      });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("new blog by cypress testing");
      cy.get("#author").type("son goku");
      cy.get("#url").type("cypress.com");
      cy.get("#blog-form").contains("create").click();

      cy.get("#blog-container").should(
        "contain",
        "new blog by cypress testing son goku"
      );
    });

    it("A blog can be liked", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("new blog by cypress testing");
      cy.get("#author").type("son goku");
      cy.get("#url").type("cypress.com");
      cy.get("#blog-form").contains("create").click();

      cy.get(".blog-header")
        .should("contain", "new blog by cypress testing son goku")
        .contains("view")
        .click();

      cy.get(".blog-body").contains("like").click();
      cy.get(".blog-body").contains("likes 1");
    });

    it("Blogs are ordered according to likes", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("most liked blog");
      cy.get("#author").type("son goku");
      cy.get("#url").type("cypress.com");
      cy.get("#blog-form").contains("create").click();

      cy.contains("create new blog").click();
      cy.get("#title").type("second most liked blog");
      cy.get("#author").type("son goku");
      cy.get("#url").type("cypress.com");
      cy.get("#blog-form").contains("create").click();

      cy.get(".blog-card").eq(0).contains("view").click();
      cy.get(".blog-body").eq(0).contains("like").click();
      cy.wait(500);
      cy.get(".blog-body").eq(0).contains("like").click();

      cy.get(".blog-header")
        .eq(0)
        .should("contain", "most liked blog son goku");
      cy.get(".blog-header")
        .eq(1)
        .should("contain", "second most liked blog son goku");
    });
  });

  describe("When another user is logged in", function () {
    beforeEach(function () {
      let userItem = null;

      cy.request("POST", "http://localhost:3000/api/login", {
        username: "goku",
        password: "123",
      }).then((res) => {
        userItem = res.body;

        cy.request({
          url: "http://localhost:3000/api/blogs",
          method: "POST",
          body: {
            title: "cypress blog",
            author: "son goku",
            url: "cypress.com",
          },
          headers: {
            Authorization: `Bearer ${userItem.token}`,
          },
        });
      });

      cy.request("POST", "http://localhost:3000/api/login", {
        username: "gohan",
        password: "123",
      }).then((res) => {
        localStorage.setItem("loggedBlogListUser", JSON.stringify(res.body));
        cy.visit("http://localhost:5173");
      });
    });

    it("Another user is logged in", function () {
      cy.get(".blog-header").contains("view").click();
      cy.get(".blog-body").should("not.contain", "remove");
    });
  });
});
