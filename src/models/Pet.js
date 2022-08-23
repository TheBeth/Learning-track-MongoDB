const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
    required: true,
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
