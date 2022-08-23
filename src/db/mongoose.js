const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user-pet-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
