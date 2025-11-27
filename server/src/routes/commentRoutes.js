const express = require("express");
const commentController = require("../controllers/commentController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === POST ROUTES ===
// Public
router
  .route("/")
  .post(authenticateToken, commentController.createComment)
  .delete(authenticateToken, commentController.deleteComment);

module.exports = router;
