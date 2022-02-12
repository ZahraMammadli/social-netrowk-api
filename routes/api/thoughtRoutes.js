const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);

// /api/thoughts/reactions/:thoughtId
router.route("/reactions/:thoughtId").post(createReaction);

// /api/thoughts/reactions/:reactionId/:thoughtId
router.route("/reactions/:reactionId/:thoughtId").delete(deleteReaction);

module.exports = router;
