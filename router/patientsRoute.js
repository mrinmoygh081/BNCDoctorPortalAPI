const express = require("express");
const router = express.Router();

const {
  getPatients,
  getPatientsById,
  addReporting,
} = require("../controllers/patients/patients");

router.get("/", getPatients);
router.get("/:id", getPatientsById);
router.post("/addReporting", addReporting);

module.exports = router;
