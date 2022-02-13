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
    type: Date,
    default: Date.now,
    get: (createdAtVal) =>
      moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
  },
});

const Reaction = model("Reaction", reactionSchema);
module.exports = { Reaction, reactionSchema };
