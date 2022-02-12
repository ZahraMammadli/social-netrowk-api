const { Thought, Reaction, User } = require("../models");

module.exports = {
  // Find all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  //  Find single Thought

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        res
          .status(404)
          .json({ message: "Thought created, but no user with that ID" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(400).json({ message: "No thought with this id!" });
      } else {
        res.json({ message: "Thought was successfully deleted!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update thought

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(400).json({ message: "No thought with this id!" });
      } else {
        res.json({ message: "Thought was successfully updated!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create reaction to a thought

  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(400).json({ message: "No thought with this id!" });
      } else {
        res.status(200).json({ message: "Reaction was successfully added" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete reaction

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(400).json({ message: "No thought with this id!" });
      } else {
        res.status(200).json({ message: "Reaction was successfully deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
