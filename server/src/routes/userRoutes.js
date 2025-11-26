const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authenticateToken");
const { verifyOwnership } = require("../middleware/verifyOwnership");

// === USER ROUTES ===
// Public
router.route("/").get(userController.fetchAllUsers);
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

// Get all posts by a specific user
router.route("/:id/posts").get(userController.getUserPosts);

// Private (user must be logged in)
router
  .route("/:id")
  .delete(authenticateToken, verifyOwnership, userController.deleteUser); // protected route

module.exports = router;
