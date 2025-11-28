const express = require("express");
const commentController = require("../controllers/commentController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === COMMENT ROUTES ===
// Public & Private Routes
router
  .route("/:post_id")
  .get(commentController.getAllComments)
  .post(authenticateToken, commentController.createComment)
  .delete(authenticateToken, commentController.deleteComment);

module.exports = router;
