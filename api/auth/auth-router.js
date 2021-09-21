const router = require("express").Router();
const User = require("./auth-model");
const bcrypt = require("bcryptjs");
const tokenBuilder = require("./token-builder");
const { checkPayload, checkIfUsernameExists } = require("./auth-middleware");

router.post(
  "/register",
  checkPayload,
  checkIfUsernameExists,
  async (req, res, next) => {
    try {
      const registeringUser = req.body;

      const hash = bcrypt.hashSync(registeringUser.user_password, 8);
      const newUser = { ...registeringUser, user_password: hash };
      const user = await User.add(newUser);
      res.status(201).json({
        message: `u have successfully created an account with ${user.user_username} username`,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", (req, res, next) => {
  const user = req.body;
  console.log(user);
  User.findBy(user.user_username)
    .then((existingUser) => {
      if (
        existingUser &&
        bcrypt.compareSync(user.user_password, existingUser.user_password)
      ) {
        User.findById(existingUser.user_id)
          .then((user) => {
            console.log(user);
            const token = tokenBuilder(existingUser);
            const role = user.user_role;
            res.status(201).json({
              message: `Welcome back ${existingUser.user_username}`,
              token,
              user_role: role,
            });
          })
          .catch(next);
      } else {
        next({ status: 401, message: "bad credentials" });
      }
    })
    .catch(next);
});

// router.post("/login", payload, credentials, (req, res) => {
//   if (bcrypt.compareSync(req.body.password, req.user.password)) {
//     const token = tokenBuilder(req.user);
//     res.status(200).json({
//       message: `welcome, ${req.user.username}`,
//       token,
//     });
//   } else {
//     res.status(500).json({
//       message: "invalid credentials",
//     });
//   }
// });
module.exports = router;
