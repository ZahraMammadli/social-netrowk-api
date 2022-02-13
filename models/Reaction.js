const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

//Schema to create Reaction Model
const reactionSchema = new Schema({
  reactionId: {
    type: Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: String,
    default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

const Reaction = model("Reaction", reactionSchema);
module.exports = { Reaction, reactionSchema };
