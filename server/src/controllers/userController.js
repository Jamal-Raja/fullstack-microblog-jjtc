const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AppError = require("../utils/appError");
const { verifyUserCredentials } = require("./authController");

// FETCH ALL USERS
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
exports.registerUser = async (req, res, next) => {
  if (!req.body) {
    return next(new AppError("No data provided.", 400));
  }
  const { username, email, password, passwordConfirmation } = req.body;

  if (!username || !email || !password || !passwordConfirmation) {
    return next(
      new AppError(
        "All fields (username, email, password, passwordConfirmation) are required.",
        400
      )
    );
  }
  // Create new user in DB
  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirmation,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully.",
    data: {
      user: newUser,
    },
  });
};
// LOGIN USER
exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Authenticate user credentials
    const user = await verifyUserCredentials(username, password);

    // Remove passwordHash from user data before sending response
    const userData = user.toJSON();
    delete userData.passwordHash;

    // Generate JWT payload
    const payload = {
      id: user.id,
    };

    // Generate access token
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
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  if (!userId) {
    return next(new AppError("User ID is required.", 400));
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  await user.destroy();

  res.status(200).json({
    status: "success",
    message: "User deleted successfully.",
    user: user,
  });
};
