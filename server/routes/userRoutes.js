const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// === USER ROUTES ===
// Public
router.route("/").get(userController.fetchAllUsers);
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

// Private (user must be logged in)
// router
//   .route("/:id")
//   .get(authenticateToken, verifyOwnership, userController.fetchUserBlogs)
//   .delete(authenticateToken, verifyOwnership, userController.deleteUser);

module.exports = router;
