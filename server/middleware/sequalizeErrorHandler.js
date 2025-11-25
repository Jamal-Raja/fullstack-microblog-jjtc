const AppError = require("../utils/appError");
const { ValidationError } = require("sequelize");

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const message = err.errors.map((e) => e.message).join(", ");
    return next(new AppError(message, 400));
  }

  next(err);
};
