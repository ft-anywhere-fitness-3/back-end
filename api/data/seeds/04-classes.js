exports.seed = async function (knex) {
  await knex("classes").insert([
    {
      instructor_id: 2,
      class_name: "Morning Run",
      class_type: "Cardio",
      class_start: "7:00AM",
      class_duration: "2 hours",
      class_level: 5,
      class_location: "123 Street Dr, City STATE",
      class_max_size: 10,
    },
  ]);
};
