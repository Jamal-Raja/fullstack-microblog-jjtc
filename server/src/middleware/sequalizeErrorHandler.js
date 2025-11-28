const AppError = require("../utils/appError");
const { ValidationError } = require("sequelize");

// Handles Sequelize validation errors and converts them into AppError instances
module.exports = (err, req, res, next) => {
  // If the error comes from Sequelize validation, extract and format messages
  if (err instanceof ValidationError) {
    const message = err.errors.map((e) => e.message).join(", ");
    return next(new AppError(message, 400));
  }

  // Pass all other errors to the next middleware
  next(err);
};
