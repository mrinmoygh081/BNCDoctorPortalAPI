const responseToClient = require("../helper/response");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tryCatch } = require("../utils/tryCatch");
const prismaConnector = require("../prisma/prismaConnector");
const { resSend } = require("../helper/resSend");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expiresIn: "1d",
  });
};
exports.auth = async (req, res) => {
  const { username, password } = req.body;

  let sql = `SELECT * FROM users WHERE username= '${username}' and password='${password}'`;
  let result = await prismaConnector.$queryRawUnsafe(sql);

  if (result && result.length > 0) {
    const token = generateToken(result[0]?.user_id);
    resSend(res, true, 200, "You have logged in successfully", null, token);
  } else {
    resSend(
      res,
      false,
      200,
      "Please check your username and password",
      null,
      null
    );
  }
};
