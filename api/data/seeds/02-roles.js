exports.seed = async function (knex) {
  const roles = [{ name: "instructor" }, { name: "client" }];

  await knex("roles").insert(roles);
};
