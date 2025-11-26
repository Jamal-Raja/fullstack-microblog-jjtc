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

// Private (user must be logged in)
router
  .route("/:id")
  .delete(authenticateToken, verifyOwnership, userController.deleteUser);
//   .get(authenticateToken, verifyOwnership, userController.fetchUserBlogs)

module.exports = router;
