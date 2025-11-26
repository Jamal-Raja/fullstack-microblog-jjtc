const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

/**
 * authenticateToken
 *
 * Verifies the client's JWT and attaches the decoded user data
 * to req.user. Used to protect routes that require authentication.
 */
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return next(
      new AppError("Please include a valid bearer token in your request", 401)
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return next(new AppError("This token is no longer valid", 403));
    }

    req.user = decodedUser; // Attach authenticated user to the request
    next();
  });
};
