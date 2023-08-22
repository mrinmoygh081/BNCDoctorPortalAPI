const prismaConnector = require("./../prisma/prismaConnector")
exports.tryCatch = (controller) => async(request, response, next) => {
    try{
        await controller(request, response, next);
    }catch(error){
        await prismaConnector.$disconnect();
        console.log(error);
        error.disMsg = 'Something Error';
        return next(error)
    }
}