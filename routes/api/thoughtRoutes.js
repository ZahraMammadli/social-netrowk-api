const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

// /api/users/:userId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

module.exports = router;
