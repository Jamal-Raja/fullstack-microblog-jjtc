const express = require("express");
const messageController = require("../controllers/messageController");
// const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === MESSAGE ROUTES ===
// Handle all message actions for a specific post
router.route("/");

module.exports = router;
