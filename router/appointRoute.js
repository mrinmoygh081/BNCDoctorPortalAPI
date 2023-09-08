const app = require("express");
const router = app.Router();
const {
  getAppoints,
  addAppointsNew,
  addAppointsOld,
  addFamilyHistory,
  getFamilyHistory,
  addPersonalHistory,
  getPersonalHistory,
  getCravings,
  addCravings,
  getGeneralities,
  addGeneralities,
  addCaseHistory,
} = require("../controllers/appointments/appointments");

router.post("/", getAppoints);
router.post("/new", addAppointsNew);
router.post("/old", addAppointsOld);
router.post("/getFamilyHistory", getFamilyHistory);
router.post("/addFamilyHistory", addFamilyHistory);
router.post("/getPersonalHistory", getPersonalHistory);
router.post("/addPersonalHistory", addPersonalHistory);
router.post("/getCravings", getCravings);
router.post("/addCravings", addCravings);
router.post("/getGeneralities", getGeneralities);
router.post("/addGeneralities", addGeneralities);
router.post("/addCaseHistory", addCaseHistory);

module.exports = router;
