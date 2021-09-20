exports.up = async (knex) => {
  await knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("name", 50).unique().notNullable();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("user_name", 100).notNullable();
      users.string("user_username", 100).unique().notNullable();
      users.string("user_email", 100).unique().notNullable();
      users.string("user_password", 200).notNullable();
      users
        .integer("user_role")
        .unsigned()
        .references("role_id")
        .inTable("roles")
        .defaultTo(2)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .createTable("classes", (classes) => {
      classes.increments("class_id");
      classes.string("class_name").notNullable();
      classes.string("class_type").notNullable();
      classes.string("class_start").notNullable();
      classes.string("class_duration").notNullable();
      classes.integer("class_level").notNullable();
      classes.string("class_location").notNullable();
      classes.integer("class_max_size").notNullable();
      classes
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("classes")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
