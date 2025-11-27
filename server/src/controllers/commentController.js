const { Post, Comment } = require("../models");
const AppError = require("../utils/appError");

// CREATE NEW COMMENT
exports.createComment = async (req, res, next) => {
  const { comment, user_id, post_id } = req.body;

  if (!comment || !user_id || !post_id) {
    return next(
      new AppError(
        `Missing required fields: ${!comment ? "comment " : ""}${
          !user_id ? "user_id " : ""
        }${!post_id ? "post_id" : ""}`,
        400
      )
    );
  }

  const newComment = await Comment.create({
    comment,
    user_id,
    post_id,
  });

  res.status(201).json({
    status: "success",
    message: "Comment created successfully",
    data: newComment,
  });
};
// DELETE COMMENT
exports.deleteComment = async (req, res, next) => {
  const { commentId } = req.body;

  if (!commentId) {
    return next(new AppError("commentId is required", 400));
  }

  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  await comment.destroy();

  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
  });
};
