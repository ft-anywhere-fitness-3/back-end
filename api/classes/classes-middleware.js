const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const db = require("../data/db-config");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(500).json({
      message: "token required",
    });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err)
        res.status(500).json({
          message: "token invalid",
        });
      req.decodedJWT = decoded;
      next();
    });
  }
};

const class_idVerification = async (req, res, next) => {
  const { class_id } = req.params;
  const existing = await db("classes").where({ class_id }).first();

  existing
    ? next()
    : next({
        message: `Class with class_id: ${class_id} does not exist in the database.`,
        status: 404,
      });
};

module.exports = {
  restricted,
  class_idVerification,
};
