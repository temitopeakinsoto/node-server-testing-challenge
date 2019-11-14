const Users = require("./users-model");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Users model", () => {
  describe("insert function", () => {
    let users;
    it("should add a new user", async () => {
      await Users.add({ username: "sam", password: "test", department: "HR" });
      await Users.add({
        username: "merry",
        password: "test",
        department: "HR"
      });
      users = await db("users");
      expect(users).toHaveLength(2);

      await Users.add({
        username: "gandalf",
        password: "test",
        department: "HR"
      });

      users = await db("users");
      expect(users).toHaveLength(3);
    });
  });
  describe("delete function", () => {
    let users;
    it("deletes correctly", async () => {
      await Users.add({
        username: "gandalfs",
        password: "test",
        department: "HR"
      });
      await Users.add({
        username: "aragorn",
        password: "test",
        department: "HR"
      });
      await Users.remove(1);
      users = await db("users");
      expect(users).toHaveLength(1);
      await Users.remove(2);
      users = await db("users");
      expect(users).toHaveLength(0);
    });
  });
});
