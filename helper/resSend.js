const toJson = require("./toJson");
const prismaConnector = require("./../prisma/prismaConnector");

const resSend = async (res, status, statusCode, message, data, token = []) => {
  await prismaConnector.$disconnect();
  const response = {
    status,
    statusCode,
    message,
    data: JSON.parse(toJson(data)),
    token,
  };
  res.status(statusCode).json(response);
};

module.exports = {
  resSend,
};
