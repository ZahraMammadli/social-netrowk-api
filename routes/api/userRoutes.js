const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

module.exports = router;
