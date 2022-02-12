const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/friends/:userId
router.route("/friends/:userId").post(addFriend);

// /api/users/friends/:friendId/:userId
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
