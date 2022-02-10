const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Throught model

const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//  Create a virtual for counting reactions

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
