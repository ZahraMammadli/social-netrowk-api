const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction,
  updateThought,
} = require("../../controllers/thoughtController.js");

router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// /api/thoughts/reactions/:thoughtId
router.route("/reactions/:thoughtId").post(createReaction);

// /api/thoughts/reactions/:reactionId/:thoughtId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
