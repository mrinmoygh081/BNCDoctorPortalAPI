const { PrismaClient } = require("@prisma/client");
const prismaConnector = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prismaConnector.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

module.exports = prismaConnector;
