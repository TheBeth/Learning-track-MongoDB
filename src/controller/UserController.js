const User = require("../models/User");
const Pet = require("../models/Pet");

exports.createUser = async (req, res) => {
  try {
    const existUser = await User.findOne({ userName: req.body.userName });
    if (existUser) {
      return res.status(400).json({ Error: "Username already in use" });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.find().populate("pets");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("pets");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowUpdate = ["userName", "firstName", "lastName", "age"];
    const isValidOperation = updates.every((update) =>
      allowUpdate.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).json({ Error: "Invalid to update" });
    }
    const user = await User.findOne({ userName: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    updates.forEach((item) => {
      user[item] = req.body[item];
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    await user.remove();
    res.status(200).json({ message: "User have been deleted" });
  } catch (err) {
    console.log(err);
  }
};

exports.addPet = async (req, res) => {
  try {
    const existuser = await User.findById(req.params.id);
    const pet = await Pet.findOne(req.body);
    if (!existuser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    for (let i = 0; i < existuser.pets.length; i++) {
      if (existuser.pets[i].toString() === pet._id.toString()) {
        return res.status(400).json({ message: "Your pet have this name" });
      }
    }

    await User.updateOne(
      { _id: req.params.id },
      { $push: { pets: pet._id } }
      // ,(err, result) => {
      //   if (err) {
      //     res.status(400).json(err);
      //   } else {
      //     res.status(201).json(existuser);
      //   }
      // }
    );

    res.status(201).json("Pet Added");
  } catch (err) {
    console.log(err);
  }
};

exports.clearPet = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.pets = [];
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};
