const express = require("express");
const postController = require("../controllers/postController");
// const { authenticateToken } = require("../middleware/authenticateToken");
// const { verifyOwnership } = require("../middleware/verifyOwnership");

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
  .delete(postController.deletePostById)
  .patch(postController.updatePostById);

//   TO DO: Add authentication & ownership verification middleware for delete & update routes
module.exports = router;
