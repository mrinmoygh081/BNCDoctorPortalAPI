const express = require("express");
const router = express.Router();

const {
  getPatients,
  getPatientsById,
  addReporting,
  getReportings,
  deleteReporting,
  editPatientId,
  editPatientInfo,
  editReporting,
} = require("../controllers/patients/patients");

router.get("/", getPatients);
router.get("/:id", getPatientsById);
router.post("/getReportings", getReportings);
router.post("/addReporting", addReporting);
router.post("/editReporting", editReporting);
router.post("/deleteReporting", deleteReporting);
router.post("/editPatientId", editPatientId);
router.post("/editPatientInfo", editPatientInfo);

module.exports = router;
