const express = require("express");
const commentController = require("../controllers/commentController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === COMMENT ROUTES ===
// Handle all comment actions for a specific post
router
  .route("/:post_id")
  .get(commentController.getAllComments)                 // Fetch all comments for a post
  .post(authenticateToken, commentController.createComment) // Add a new comment (requires auth)
  .delete(authenticateToken, commentController.deleteComment); // Delete a comment (requires auth)

module.exports = router;
