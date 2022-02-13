const { Schema, model } = require("mongoose");
const { reactionSchema } = require("./Reaction");
const moment = require("moment");

// Schema to create Throught model

const thoughtSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
      default: () => moment().format("MMM DD, YYYY [at] hh:mm a"),
      // get: (createdAtVal) =>
      //   moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
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

// Initialise schema and exporting

const Thought = model("Thoughts", thoughtSchema);
module.exports = Thought;
