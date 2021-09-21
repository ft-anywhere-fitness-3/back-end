const db = require("../data/db-config");

const getAll = () => {
  return db("users");
};

module.exports = {
  getAll,
};
