const { Post } = require("../models");
const AppError = require("../utils/appError");

// FETCH ALL POSTS
exports.getAllPosts = async (req, res, next) => {
  const posts = await Post.findAll();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: posts,
  });
};

// FETCH POST BY ID
exports.getPostById = async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findByPk(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
};

// DELETE POST BY ID
exports.deletePostById = async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findByPk(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  await post.destroy();

  res.status(200).json({
    status: "success",
    message: "Post deleted successfully.",
  });
};

exports.createPost = async (req, res, next) => {
  const { title, content, imageURL, user_id } = req.body;

  if (!title || !content || !user_id) {
    return next(new AppError("Title, content, and user_id are required", 400));
  }

  const newPost = await Post.create({
    title,
    content,
    imageURL,
    user_id,
  });

  res.status(201).json({
    status: "success",
    message: "Post created successfully.",
    data: newPost,
  });
};
