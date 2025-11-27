const express = require("express");
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// === POST ROUTES ===
// Public
router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

// Private (user must be logged in)
router
  .route("/:id")
  .get(postController.getPostById)
  .delete(authenticateToken, postController.deletePostById)
  .patch(authenticateToken, postController.updatePostById);

module.exports = router;
