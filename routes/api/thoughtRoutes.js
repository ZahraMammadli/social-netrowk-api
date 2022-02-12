const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  createReaction,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

// /api/thoughts/reactions/:thoughtId
router.route("/reactions/:thoughtId").post(createReaction);

module.exports = router;
