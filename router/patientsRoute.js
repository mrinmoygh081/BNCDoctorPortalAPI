const express = require("express");
const router = express.Router();

const {
  getPatients,
  getPatientsById,
  addReporting,
  getReportings,
  deleteReporting,
} = require("../controllers/patients/patients");

router.get("/", getPatients);
router.get("/:id", getPatientsById);
router.post("/getReportings", getReportings);
router.post("/addReporting", addReporting);
router.post("/deleteReporting", deleteReporting);

module.exports = router;
