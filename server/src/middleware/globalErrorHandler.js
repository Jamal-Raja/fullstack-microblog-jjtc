// GLOBAL ERROR HANDLER MIDDLEWARE
/**
 * Handles all errors that occur in the application.
 * Sends a structured JSON response with error details.
 */
module.exports = (err, req, res, next) => {
  console.error("ERROR", err);
  // Set default status code if not provided
  const status = err.status || 500;

  res.status(status).json({
    status: "Error",
    message: err.isOperational
      ? err.message
      : "Something went wrong. Please try again later.",
  });
};
