const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const db = require("../data/db-config");

const checkPayload = (req, res, next) => {
  const { user_username } = req.body;
  const { user_password } = req.body;
  !user_username || !user_password
    ? res.status(400).json({
        message: "username and password required",
      })
    : next();
};

const checkIfUsernameExists = async (req, res, next) => {
  const { user_username } = req.body;
  const exists = await db("users").where({ user_username }).first();
  exists
    ? res.status(500).json({
        message: "username taken",
      })
    : next();
};

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return next({
      status: 401,
      message: "we wants token!!!",
    });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return next({
        status: 401,
        message: "token bad!",
        realErrorMessage: err.message,
      });
    req.decodedJwt = decoded;
    next();
  });
};

module.exports = { checkPayload, checkIfUsernameExists, checkToken };
