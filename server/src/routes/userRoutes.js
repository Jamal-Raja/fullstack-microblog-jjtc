const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { verifyOwnership } = require("../middleware/verifyOwnership");

// === USER ROUTES ===

// Public routes for listing users and handling account creation/authentication
router.route("/").get(userController.fetchAllUsers); // Fetch all users
router.route("/register").post(userController.registerUser); // Register a new user
router.route("/login").post(userController.loginUser); // Log in a user and issue token

// Retrieve all posts created by a specific user
router.route("/:id/posts").get(userController.getUserPosts);

// Protected route for deleting a user account
router.route("/:id").delete(
  authenticateToken, // Ensure user is logged in
  verifyOwnership, // Confirm the logged-in user owns the account
  userController.deleteUser // Delete the user account
);

module.exports = router;
