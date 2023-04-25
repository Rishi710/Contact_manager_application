const { constants } = require("../constant");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode){
        case constants.VALIDATION_ERROR:
        res.json({
            tittle: "VALIDATION Failed", 
            message: err.message, 
            stackTrace: err.stack,
        });
        break;
        case constants.UNAUTHORIZED:
        res.json({
            tittle: "Un Authorized", 
            message: err.message, 
            stackTrace: err.stack,
        });
        case constants.FORBIDDEN:
        res.json({
            tittle: "Forbidden", 
            message: err.message, 
            stackTrace: err.stack,
        });
        case constants.NOT_FOUND:
        res.json({
            tittle: "Not Found", 
            message: err.message, 
            stackTrace: err.stack,
        });
        case constants.SERVER_ERROR:
        res.json({
            tittle: "Server Error", 
            message: err.message, 
            stackTrace: err.stack,
        });
        default:
            console.log("All GOOD NO ERROR!")
        break;
    }
};

module.exports = errorHandler;