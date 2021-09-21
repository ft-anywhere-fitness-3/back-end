const router = require("express").Router();
const Client = require("./clients-model");

router.get("/", (req, res, next) => {
  Client.getAllClients()
    .then((clients) => res.json(clients))
    .catch(next);
});

module.exports = router;
