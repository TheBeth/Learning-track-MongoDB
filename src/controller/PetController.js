const Pet = require("../models/Pet");

exports.createPet = async (req, res) => {
  try {
    const existPet = await Pet.find({});
    const isPet = existPet.filter((item) => {
      return (
        item.petName == req.body.petName && item.petType == req.body.petType
      );
    });
    if (isPet != "") {
      return res
        .status(400)
        .json({ message: "petName and petType already in use" });
    }

    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.find({});
    res.status(200).json(pet);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id });
    res.status(200).json(pet);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.updatePet = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowUpdate = ["petName", "petType"];
    const isValidOperation = updates.every((update) =>
      allowUpdate.includes(update)
    );
    if (!isValidOperation) {
      return res.status(404).json({ Error: "Invalid" });
    }
    const pet = await Pet.findOne({ petName: req.params.id });

    //validate same name and same type or not -- req.body only petType
    const existPet = await Pet.find({});
    const isPet = existPet.filter((item) => {
      return (
        (item.petName == req.body.petName &&
          item.petType == req.body.petType) ||
        (item.petName == req.params.id && item.petType == req.body.petType)
      );
    });
    if (isPet != "") {
      return res
        .status(400)
        .json({ message: "petName and petType already in use" });
    }

    updates.forEach((update) => {
      pet[update] = req.body[update];
    });

    await pet.save();

    res.send(pet);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(400).json("Pet not found");
    }
    res.status(200).json("Pet deleted");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
