const express = require("express");
const {
  getPet,
  createPet,
  updatePet,
  deletePet,
  getPetById,
} = require("../controller/PetController");

const router = express.Router();

router.get("/", getPet);
router.get("/:id", getPetById);
router.post("/", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
