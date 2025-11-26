const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

/**
 * verifyUserCredentials
 *
 * Validates a user's username and password.
 * Returns the user record (including password) if authentication succeeds.
 */
exports.verifyUserCredentials = async (username, password) => {
  const errorMessage = "Incorrect username or password";

  // Fetch user with password included (default scope excludes it)
  const user = await User.scope("withPassword").findOne({
    where: { username },
  });
  if (!user) {
    throw new AppError(errorMessage, 401);
  }

  // Compare provided password with stored hashed password
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new AppError(errorMessage, 401);
  }

  return user; // Authentication successful
};
