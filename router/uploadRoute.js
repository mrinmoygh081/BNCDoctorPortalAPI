const express = require("express");
const router = express.Router();
const { upload } = require("../utils/fileUpload");
const { uploadImage } = require("../controllers/upload");

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
