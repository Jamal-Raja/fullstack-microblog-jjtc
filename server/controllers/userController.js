const { User } = require("../src/models");
const AppError = require("../utils/appError");

exports.fetchAllUsers = async (req, res, next) => {
  const allUsers = await User.findAll();

  return res.status(200).json({
    status: "success",
    message: "Fetched all users",
    results: allUsers.length,
    data: allUsers,
  });
};

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

  // //   return res.status(201).json({
  // //     status: "success",
  // //     message: "User registered successfully.",
  // //     data: {
  // //       user: newUser,
  // //     },
  //   });
};
