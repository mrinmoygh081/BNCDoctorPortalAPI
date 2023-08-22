const express = require("express");
const router = express.Router();

const {
  getPatients,
  getPatientsById,
} = require("../controllers/patients/patients");

router.get("/", getPatients);
router.get("/:id", getPatientsById);

module.exports = router;
