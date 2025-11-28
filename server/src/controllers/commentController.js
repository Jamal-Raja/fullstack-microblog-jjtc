const { Post, Comment } = require("../models");
const AppError = require("../utils/appError");

// FETCH ALL COMMENTS
// Retrieves all comments belonging to a specific post
exports.getAllComments = async (req, res, next) => {
  const postID = req.params.post_id;

  if (!postID) {
    return next(new AppError("post_id is required in params", 400));
  }

  const comments = await Comment.findAll({
    where: { post_id: Number(postID) },
  });

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: comments,
  });
};

// CREATE NEW COMMENT
// Validates input and adds a new comment to the specified post
exports.createComment = async (req, res, next) => {
  const postID = req.params.post_id;

  // Ensure the post exists before creating a comment
  const postExists = await Post.findByPk(Number(postID));
  if (!postExists) {
    return next(new AppError("Post not found", 404));
  }

  const { comment, user_id } = req.body;

  // Validate required fields
  if (!comment || !user_id) {
    return next(
      new AppError(
        `Missing required fields: ${!comment ? "comment " : ""}${
          !user_id ? "user_id " : ""
        }`,
        400
      )
    );
  }

  // Create the comment entry
  const newComment = await Comment.create({
    comment,
    user_id,
    post_id: Number(postID),
  });

  res.status(201).json({
    status: "success",
    message: "Comment created successfully",
    data: newComment,
  });
};

// DELETE COMMENT
// Deletes a specific comment if both the post and comment exist
exports.deleteComment = async (req, res, next) => {
  const postID = req.params.post_id;

  // Ensure the post exists
  const postExists = await Post.findByPk(Number(postID));
  if (!postExists) {
    return next(new AppError("Post not found", 404));
  }

  const { comment_id } = req.body;

  if (!comment_id) {
    return next(new AppError("comment_id is required", 400));
  }

  // Look up the comment entry
  const comment = await Comment.findByPk(comment_id);
  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  // Delete the comment
  await comment.destroy();

  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
  });
};
