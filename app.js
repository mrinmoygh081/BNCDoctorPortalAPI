const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
// const helmet = require("helmet");
const errorHandler = require("./middleware/errorHandler");
const appointRoute = require("./router/appointRoute");
const patientsRoute = require("./router/patientsRoute");

app.use(express.json());
app.use(cors());
// app.use(helmet());

app.use("/api/v1/appointments", appointRoute);
app.use("/api/v1/patients", patientsRoute);

app.use(errorHandler);
// app.use((req, res, next) => {
//   res.status(200).json({
//     status: 0,
//     data: "Page not found",
//   });
// });

module.exports = app;
