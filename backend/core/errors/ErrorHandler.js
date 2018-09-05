const logger = require('./../libs/Logger')(module);

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.name) {
      // Validator errors
      case 'SingleError':
        ctx.body = {error: {code: err.httpCode, message: 'SingleError', errors: {message: [err.message]}}};
        ctx.status = err.httpCode;
        break;
      case 'ValidationError':
        ctx.body = {error: {code: err.httpCode, message: 'ValidationError', errors: err.validation_errors.errors}};
        ctx.status = err.httpCode;
        break;
      default:
        ctx.body = {err: err.message};
        ctx.status = 500;
        logger.error(JSON.stringify({ err, req: ctx.request }));
        break;
    }
  }
};
