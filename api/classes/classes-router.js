const router = require("express").Router();
const Class = require("./classes-model");
const { restricted, class_idVerification } = require("./classes-middleware");
const db = require("../data/db-config");

//create a class
router.post("/", restricted, (req, res, next) => {
  Class.insert(req.body)
    .then((event) => res.json(event))
    .catch(next);
});

//adding attendance to the class
router.post(
  "/:class_id",
  restricted,
  class_idVerification,
  (req, res, next) => {
    const { class_id } = req.params;
    Class.insertAttendance(class_id, req.body.user_id)
      .then((attendees) => res.json(attendees))
      .catch(next);
  }
);

//get the class
router.get("/:class_id", restricted, class_idVerification, (req, res, next) => {
  Class.getById(req.params.class_id)
    .then((event) => res.json(event))
    .catch(next);
});

//get classes
router.get("/", restricted, (req, res, next) => {
  Class.getAll()
    .then((classes) => res.json(classes))
    .catch(next);
});

//update the class
router.put(
  "/:class_id",
  restricted,
  class_idVerification,
  async (req, res, next) => {
    const { class_id } = req.params;
    const changes = req.body;

    Class.update(class_id, changes)
      .then((changed) => {
        res.json(changed);
      })
      .catch(next);
  }
);

router.delete(
  "/:class_id",
  restricted,
  class_idVerification,
  (req, res, next) => {
    const { class_id } = req.params;

    Class.remove(class_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  }
);

module.exports = router;
