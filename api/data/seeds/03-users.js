const bcrypt = require("bcryptjs");

const hashGenerator = (password) => {
  return bcrypt.hashSync(password, 8);
};

exports.seed = async function (knex) {
  await knex("users").insert([
    {
      user_name: "Vaibhavi Balar",
      user_username: "vaibhavibalar",
      user_email: "vaibhavi@something.com",
      user_password: hashGenerator("vaibhavi"),
      user_role: 2,
    },
    {
      user_name: "Fernando Martinez",
      user_username: "fernando817mm",
      user_email: "fernando@something.com",
      user_password: hashGenerator("fernando"),
      user_role: 1,
    },
    {
      user_name: "Jim Halpert",
      user_username: "jimhalpert",
      user_email: "jim@something.com",
      user_password: hashGenerator("jim"),
      user_role: 2,
    },
    {
      user_name: "Pam Beasley",
      user_username: "pambeasley",
      user_email: "pam@something.com",
      user_password: hashGenerator("pam"),
    },
    {
      user_name: "Dwight Schrute",
      user_username: "dwightschrute",
      user_email: "dwight@something.com",
      user_password: hashGenerator("dwight"),
    },
  ]);
};
