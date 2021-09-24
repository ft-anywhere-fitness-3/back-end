const db = require("../data/db-config");

const insert = async (event) => {
  const [insertedEvent] = await db("classes").insert(event, [
    "class_id",
    "instructor_id",
    "class_name",
    "class_type",
    "class_start",
    "class_duration",
    "class_level",
    "class_location",
    "class_max_size",
  ]);

  return insertedEvent;
};

const insertAttendance = (class_id, user_id) => {
  return db("class_users").insert({ class_id, user_id }, [
    "class_id",
    "user_id",
  ]);
};

const removeAttendance = (user_id, class_id) => {
  return db("class_users").where({ class_id, user_id }).del();
};

const getById = async (class_id) => {
  /*
    SELECT 
    classes.class_name,
    count(class_users) as attendees from class_users
    left join classes on class_users.class_id = classes.class_id
    group by classes.class_name;
  */

  return await db("classes")
    .leftJoin("class_users", "classes.class_id", "=", "class_users.class_id")
    .count("class_users.user_id as attendees")
    .select("classes.*")
    .where("classes.class_id", class_id)
    .first()
    .groupBy("classes.class_id");
};

const getAll = async () => {
  return await db("classes")
    .leftJoin("class_users", "classes.class_id", "=", "class_users.class_id")
    .count("class_users.user_id as attendees")
    .select("classes.*")
    .groupBy("classes.class_id");
};

const update = async (class_id, update) => {
  const [updatedClass] = await db("classes")
    .where({ class_id })
    .update(update, [
      "class_id",
      "instructor_id",
      "class_name",
      "class_type",
      "class_start",
      "class_duration",
      "class_level",
      "class_location",
      "class_max_size",
    ]);
  return getById(updatedClass.class_id);
};

const remove = async (class_id) => {
  const removedClass = await db("classes")
    .where({ class_id })
    .del(["classes.*"]);
  return removedClass;
};

module.exports = {
  insert,
  insertAttendance,
  removeAttendance,
  getById,
  getAll,
  update,
  remove,
};
