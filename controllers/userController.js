const { User, Thought } = require("../models");

module.exports = {
  // Find all Users
  async getUsers(req, res) {
    try {
      const users = await User.find({})
        .populate({ path: "thoughts", select: "-__v" })
        // populate user friends
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  //  Find single user

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(400).json({ message: "The user was not found!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userId });
      if (!user) {
        res.status(400).json({ message: "The user was not found!" });
      } else {
        res.json({ message: "User was successfully deleted!" });
      }
      // Delete all thoughts related to the user
      const thoughts = await Thought.deleteMany({
        _id: { $in: user.thoughts },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(400).json({ message: "The user was not found!" });
      } else {
        res.status(200).json({ message: "Friend was added" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove friend

  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(400).json({ message: "The user was not found!" });
      } else {
        res.status(200).json({ message: "Friend was deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
