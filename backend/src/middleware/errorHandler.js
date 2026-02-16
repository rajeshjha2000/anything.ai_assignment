const sendResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError') {
        message = 'Resource not found';
        statusCode = 404;
    }

    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        statusCode = 400;
    }

    if (err.name === 'ValidationError') {
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
        statusCode = 400;
    }

    sendResponse(res, statusCode, false, message);
};

module.exports = errorHandler;
