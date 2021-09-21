const router = require("express").Router();
const Class = require("./classes-model");

//create a class
router.post("/", (req, res, next) => {
  Class.insert(req.body)
    .then((event) => res.json(event))
    .catch(next);
});

//adding attendance to the class
router.post("/:class_id", (req, res, next) => {
  const { class_id } = req.params;
  Class.insertAttendance(class_id, req.body.user_id)
    .then((attendees) => res.json(attendees))
    .catch(next);
});

//get the class
router.get("/:class_id", (req, res, next) => {
  Class.getById(req.params.class_id)
    .then((event) => res.json(event))
    .catch(next);
});

//get classes
router.get("/", (req, res, next) => {
  Class.getAll()
    .then((classes) => res.json(classes))
    .catch(next);
});

module.exports = router;
