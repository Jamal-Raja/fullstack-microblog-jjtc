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
// CREATE NEW POST
exports.createPost = async (req, res, next) => {
  const { title, content, imageURL, user_id } = req.body;

  if (!title || !content || !user_id) {
    return next(new AppError("Title, content, and user_id are required", 400));
  }

  const newPost = await Post.create({
    title,
    content,
    imageURL: imageURL ? imageURL : null,
    user_id,
  });

  res.status(201).json({
    status: "success",
    message: "Post created successfully.",
    data: newPost,
  });
};
// UPDATE POST BY ID
exports.updatePostById = async (req, res, next) => {
  const postId = req.params.id;

  const { title, content, imageURL, user_id } = req.body;

  const post = await Post.findByPk(postId);

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  if (!user_id) {
    return next(new AppError("user_id is required to update the post", 400));
  }

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (imageURL !== undefined) post.imageURL = imageURL;

  await post.save();

  res.status(200).json({
    status: "success",
    message: "Post updated successfully.",
    data: post,
  });
};
