const toJson = require("./toJson");
const prismaConnector = require("./../prisma/prismaConnector");
const responseToClient = async (status, value, response) => {
  await prismaConnector.$disconnect();
  return response.status(status).json(JSON.parse(toJson(value)));
};

module.exports = responseToClient;
