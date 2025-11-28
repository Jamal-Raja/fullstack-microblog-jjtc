// src/utils/upgradedError.js

// Create a custom error class for handling API errors in a clean, structured way.
// This class extends the built-in JavaScript Error class so it behaves like a normal error,
// but allows us to add extra useful information (like HTTP status codes).

class AppError extends Error {
  constructor(message, statusCode) {
    // Call the parent Error constructor so "message" and the internal error behaviour work correctly.
    super(message);

    // Store the HTTP status code (e.g. 400, 404, 500)
    // This lets the global error handler know what response to send.
    this.status = statusCode;

    // Mark this error as "operational"
    // Operational errors = errors we expect (bad input, not found, no permission)
    // Non-operational errors = real bugs (undefined variable, database failure)
    // This helps us decide what error details to show in production.
    this.isOperational = true;

    // Clean up the stack trace so it shows only where the error actually occurred,
    // and not the internals of the constructor call. Makes debugging MUCH easier.
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export the class so it can be used in any controller, middleware, or router.
module.exports = AppError;
