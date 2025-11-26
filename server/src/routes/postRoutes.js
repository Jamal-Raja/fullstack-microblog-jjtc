const express = require("express");
const postController = require("../controllers/C");
// const { authenticateToken } = require("../middleware/authenticateToken");
// const { verifyOwnership } = require("../middleware/verifyOwnership");

const router = express.Router();

// === POST ROUTES ===
// Public
router.route("/").get(postController.getAllPosts);

// Private (user must be logged in)
router.route("/:id");

module.exports = router;
