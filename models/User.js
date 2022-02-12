const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Thought = require("./Thought");
const passportLocalMongoose = require("passport-local-mongoose");

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
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thoughts" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
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

// Mongoose remove middleware to remove thoughts when user is deleted

userSchema.post("remove", function (next) {
  Thought.remove({ thoughtId: this._id }).exec();
  next();
});

userSchema.plugin(passportLocalMongoose);

// Initialise schema and exporting

const User = model("Users", userSchema);
module.exports = User;
