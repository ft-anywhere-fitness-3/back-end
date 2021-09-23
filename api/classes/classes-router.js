const router = require("express").Router();
const Class = require("./classes-model");
const { restricted, class_idVerification } = require("./classes-middleware");

router.post("/", restricted, (req, res, next) => {
  Class.insert(req.body)
    .then((event) => res.json(event))
    .catch(next);
});

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

router.get("/:class_id", restricted, class_idVerification, (req, res, next) => {
  Class.getById(req.params.class_id)
    .then((event) => res.json(event))
    .catch(next);
});

router.get("/", restricted, (req, res, next) => {
  Class.getAll()
    .then((classes) => res.json(classes))
    .catch(next);
});

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
      .catch(() =>
        next({
          message: "update endpoint does not work",
        })
      );
  }
);

router.delete(
  "/:class_id",
  restricted,
  class_idVerification,
  (req, res, next) => {
    const { class_id } = req.params;

    Class.remove(class_id)
      .then((removedClass) => {
        res.status(204).json(removedClass);
      })
      .catch(() => {
        next({
          message: "This is broken",
        });
      });
  }
);

module.exports = router;
