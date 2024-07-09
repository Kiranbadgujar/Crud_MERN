const express = require("express");
const {
  getData,
  createUser,
  updateUser,
  Getdataforupdate,
  Delete,
} = require("../Controllers/crudcontrollers");

const router = express.Router();

// Get Data
router.get("/", getData);

// Insert Data
router.post("/createUser", createUser);

// Updata Data
router.put("/updateUser/:id", updateUser);

//
router.get("/getUser/:id", Getdataforupdate);

// Delete User
router.delete("/deleteUser/:id", Delete);

module.exports = router;
