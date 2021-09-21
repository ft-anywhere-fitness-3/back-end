const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users as u")
    .join("roles as r", "u.role", "=", "r.id")
    .select("u.id", "u.username", "r.name as role");
}

function findBy(user_username) {
  return db("users").where("user_username", user_username).first();
}

async function add(user) {
  const [newUser] = await db("users").insert(user, ["user_username"]);
  return newUser;
}

function findById(id) {
  return db("users").where({ user_id: id }).first();
}
