const express = require("express");
const postController = require("../controllers/postController");
// const { authenticateToken } = require("../middleware/authenticateToken");
// const { verifyOwnership } = require("../middleware/verifyOwnership");

const router = express.Router();

// === POST ROUTES ===
// Public
router.route("/").get(postController.getAllPosts);

// Private (user must be logged in)
router
  .route("/:id")
  .get(postController.getPostById)
  .delete(postController.deletePostById); // TODO: Add authentication & authorization middleware

module.exports = router;
