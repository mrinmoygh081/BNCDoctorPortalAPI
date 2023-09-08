const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const appointRoute = require("./router/appointRoute");
const patientsRoute = require("./router/patientsRoute");
const authRoute = require("./router/authRoute");
const uploadRoute = require("./router/uploadRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/appointments", appointRoute);
app.use("/api/v1/patients", patientsRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/upload", uploadRoute);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(200).json({
    status: 0,
    data: "Page not found",
  });
});

module.exports = app;
