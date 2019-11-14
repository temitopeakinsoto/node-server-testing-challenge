const db = require("../data/dbConfig.js");

module.exports = {
  add,
  remove,
  findById
};

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function findById(id) {
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}
