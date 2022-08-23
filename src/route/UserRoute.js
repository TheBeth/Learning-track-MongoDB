const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addPet,
  clearPet,
  getUserById,
} = require("../controller/UserController");

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/addPet/:id", addPet);
router.put("/clearPet/:id", clearPet);

module.exports = router;
