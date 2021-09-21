const db = require("../data/db-config");

const getAllClients = () => {
  return db("users").where({ user_role: 2 });
};

module.exports = {
  getAllClients,
};
