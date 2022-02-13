const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

// Use moment js to format time
const getMyTime = function (dateTime) {
  return moment(dateTime).format("MMMM Do YYYY, h:mm:ss a");
};

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
    get: getMyTime,
  },
});

const Reaction = model("Reaction", reactionSchema);
module.exports = { Reaction, reactionSchema };
