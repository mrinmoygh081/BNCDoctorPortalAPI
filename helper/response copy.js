import { toJson } from "./toJson.js";
import prismaConnector from "./../prisma/prismaConnector.js"
export function responseToClient(statusCode, value, response) {
    prismaConnector.$disconnect();
    return response(null, {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers" : "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: toJson(value),
    });
}
