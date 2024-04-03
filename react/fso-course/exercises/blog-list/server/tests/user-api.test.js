const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const helper = require("./test-helper");

describe("When user is invalid", () => {
  test("User is not created if usename already exists with a status code 400", async () => {
    const usersAtStart = await helper.userInDb();

    const invalidUser = {
      username: "miuukkai",
      name: "joe",
      password: "123",
    };
    await api.post("/api/users").send(invalidUser).expect(400);

    const userAtEnd = await helper.userInDb();
    expect(usersAtStart.length).toBe(userAtEnd.length);
  });

  test("User is not created if password is less than 3 with a status code of 400", async () => {
    const usersAtStart = await helper.userInDb();

    const invalidUser = {
      username: "bobjones",
      name: "joe",
      password: "12",
    };
    await api.post("/api/users").send(invalidUser).expect(400);

    const userAtEnd = await helper.userInDb();
    expect(usersAtStart.length).toBe(userAtEnd.length);
  });
});
