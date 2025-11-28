const jwt = require("jsonwebtoken");
const { User, Post } = require("../models");
const AppError = require("../utils/appError");
const { verifyUserCredentials } = require("./authController");

// FETCH ALL USERS
// Returns all registered users
exports.fetchAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();

  return res.status(200).json({
    status: "success",
    message: "Fetched all users",
    results: allUsers.length,
    data: allUsers,
  });
};

// REGISTER NEW USER
// Validates input and creates a new user record
exports.registerUser = async (req, res, next) => {
  if (!req.body) {
    return next(new AppError("No data provided.", 400));
  }

  const { username, email, password, passwordConfirmation } = req.body;

  // Ensure required fields are present
  if (!username || !email || !password || !passwordConfirmation) {
    return next(
      new AppError(
        "All fields (username, email, password, passwordConfirmation) are required.",
        400
      )
    );
  }

  // Create a new user in the database
  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirmation,
  });

  // Remove sensitive hash before responding
  delete newUser.dataValues.passwordHash;

  res.status(201).json({
    status: "success",
    message: "User registered successfully.",
    data: {
      user: newUser,
    },
  });
};

// LOGIN USER
// Authenticates credentials, generates JWT, and returns user data
exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Verify username and password
    const user = await verifyUserCredentials(username, password);

    // Prepare safe user data for response
    const userData = user.toJSON();
    delete userData.passwordHash;

    // Build JWT payload
    const payload = {
      id: user.id,
    };

    // Sign access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    res.status(200).json({
      status: "Success",
      message: "User logged in successfully!",
      accessToken,
      data: { userData },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
// Removes a user account by ID
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return next(new AppError("User ID is required.", 400));
  }

  // Look up the user
  const user = await User.findByPk(userId);

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  // Remove user from database
  await user.destroy();

  res.status(200).json({
    status: "success",
    message: "User deleted successfully.",
    user: user,
  });
};

// GET USER POSTS
// Retrieves all posts authored by a specific user
exports.getUserPosts = async (req, res, next) => {
  const userId = req.params.id;

  const userPosts = await Post.findAll({
    where: { user_id: userId },
  });

  res.status(200).json({
    status: "success",
    message: `Fetching posts for user with ID: ${userId}`,
    results: userPosts.length,
    data: userPosts,
  });
};
