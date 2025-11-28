const { Post, Comment } = require("../models");
const AppError = require("../utils/appError");

// FETCH ALL COMMENTS
exports.getAllComments = async (req, res, next) => {
  const postID = req.params.id;

  if (!postID) {
    return next(new AppError("postID is required in params", 400));
  }

  const comments = await Comment.findAll({ where: { post_id: postID } });

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: comments,
  });
};
// CREATE NEW COMMENT
exports.createComment = async (req, res, next) => {
  const postID = req.params.id;

  const postExists = await Post.findByPk(postID);

  if (!postExists) {
    return next(new AppError("Post not found", 404));
  }

  const { comment, user_id } = req.body;

  if (!comment || !user_id) {
    return next(
      new AppError(
        `Missing required fields: ${!comment ? "comment " : ""}${
          !user_id ? "user_id " : ""
        }${!postID ? "postID" : ""}`,
        400
      )
    );
  }

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
exports.deleteComment = async (req, res, next) => {
  const postID = req.params.post_id;
  const postExists = await Post.findByPk(Number(postID));

  if (!postExists) {
    return next(new AppError("Post not found", 404));
  }

  const { comment_id } = req.body;

  if (!comment_id) {
    return next(new AppError("comment_id is required", 400));
  }

  const comment = await Comment.findByPk(comment_id);

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  await comment.destroy();

  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
  });
};
