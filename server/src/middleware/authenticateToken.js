const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

/**
 * authenticateToken
 *
 * Validates a JWT sent in the request header and attaches
 * the decoded user payload to req.user for downstream use.
 */
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Extract the token from "Bearer <token>"

  // Require a token for protected routes
  if (!token) {
    return next(
      new AppError("Please include a valid bearer token in your request", 401)
    );
  }

  // Verify JWT and attach decoded data to the request
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return next(new AppError("This token is no longer valid", 403));
    }

    req.user = decodedUser; // Store user info for route handlers
    next();
  });
};
