exports.errorResponse = (res,
    { statusCode = 400, message = 'Something is wrong for your request' }) => {
    return res.status(statusCode).send({
        success: false,
        message: message
    })
};

exports.successResponse = (res,
    { statusCode = 200, message = 'Successfull', payload = {} }) => {
    return res.status(statusCode).send({
        success: true,
        message,
        payload
    })
};
