const responseToClient = require("./../helper/response");
const errorHandler = async (error, request, response, next)=>{
    return response.status(400).json({msg: "Something Error", error:error.message});
}

module.exports = errorHandler;