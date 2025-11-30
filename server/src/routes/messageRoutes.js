const express = require("express");
const messageController = require("../controllers/messageController");
// const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === MESSAGE ROUTES ===
// Handle all comment actions for a specific post
router.route("/");
//   .get(messageController.getAllComments)
//   .post(authenticateToken, messageController.createComment)
//   .delete(authenticateToken, messageController.deleteComment);

module.exports = router;
