const express = require("express");
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === POST ROUTES ===
// Routes for creating and retrieving posts are public
router
  .route("/")
  .get(postController.getAllPosts) // Fetch all posts
  .post(postController.createPost); // Create a new post

// Routes for actions on a specific post
router
  .route("/:id")
  .get(postController.getPostById) // Fetch a single post by ID
  .delete(authenticateToken, postController.deletePostById) // Delete a post (requires auth)
  .patch(authenticateToken, postController.updatePostById); // Update a post (requires auth)

module.exports = router;
