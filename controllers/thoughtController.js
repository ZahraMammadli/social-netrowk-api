const { Thought } = require("../models");

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
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
