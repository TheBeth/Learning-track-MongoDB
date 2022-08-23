const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Pet",
    },
  ],
});

userSchema
  .virtual("pet")
  .get(function () {
    return this.petName;
  })
  .set(function (value) {
    this.petName = value;
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
