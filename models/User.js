const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//  Function to validate email using regex
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to retrieve count of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//  To validate uniqueness of the username i use uniqueValidator plugin
userSchema.plugin(uniqueValidator);

// Initialise schema and exporting

const User = model("User", userSchema);
module.exports = User;
