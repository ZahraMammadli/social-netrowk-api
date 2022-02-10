const db = require("../config/connection");
const { User, Thought } = require("../models");
const { userData, ThoughtData } = require("./data");
const { connection } = require("mongoose");

// Start the seeding runtime timer
console.time("seeding");

// Create a connection to mongoDb
connection.once("open", async () => {
  // Delete the entries in the collection that exist

  //   await User.deleteMany({});
  await Thought.deleteMany({});

  // Seed the data

  await User.insertMany(userData);
  await Thought.insertMany(ThoughtData);

  // Log out a pretty table for comments and posts

  console.timeEnd("seeding complete 🌱");
  process.exit(0);
});
